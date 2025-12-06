/**
 * BirdTurds Multiplayer Server
 * WebSocket server using Socket.io
 * 
 * SETUP:
 * 1. cd server
 * 2. npm init -y
 * 3. npm install express socket.io cors
 * 4. node server.js
 * 
 * Server runs on port 3001 by default
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const CONFIG = {
  PORT: process.env.PORT || 3001,
  MAX_PLAYERS: 8,
  MIN_PLAYERS: 2,
  GAME_DURATION: 180,
  ROOM_TIMEOUT: 300000,
};

const CHARACTER_TYPES = [
  { id: 'hunter_m1', name: 'Hunter', gender: 'male', skin: 'light' },
  { id: 'hunter_m2', name: 'Marcus', gender: 'male', skin: 'dark' },
  { id: 'hunter_f1', name: 'Sarah', gender: 'female', skin: 'light' },
  { id: 'hunter_f2', name: 'Keisha', gender: 'female', skin: 'dark' },
  { id: 'hunter_m3', name: 'Carlos', gender: 'male', skin: 'tan' },
  { id: 'hunter_f3', name: 'Maria', gender: 'female', skin: 'tan' },
];

const rooms = new Map();
const players = new Map();

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  players.set(socket.id, { id: socket.id, roomCode: null });

  socket.on('createRoom', (data, cb) => {
    let code;
    do { code = generateCode(); } while (rooms.has(code));
    
    const room = {
      code, hostId: socket.id, isPrivate: data.isPrivate !== false,
      players: new Map(), bots: [], state: 'waiting',
      settings: { maxPlayers: CONFIG.MAX_PLAYERS, gameDuration: CONFIG.GAME_DURATION }
    };
    
    const char = CHARACTER_TYPES[Math.floor(Math.random() * CHARACTER_TYPES.length)];
    const player = { id: socket.id, name: data.playerName || 'Player', character: char, x: 300, y: 580, score: 0, kills: 0, health: 100, isReady: false };
    room.players.set(socket.id, player);
    rooms.set(code, room);
    socket.join(code);
    players.get(socket.id).roomCode = code;
    
    cb({ success: true, roomCode: code, player, room: getPublicState(room) });
    io.to(code).emit('roomUpdate', getPublicState(room));
  });

  socket.on('joinRoom', (data, cb) => {
    const code = data.roomCode?.toUpperCase();
    const room = rooms.get(code);
    if (!room) return cb({ success: false, error: 'Room not found' });
    if (room.state !== 'waiting') return cb({ success: false, error: 'Game in progress' });
    if (room.players.size >= room.settings.maxPlayers) return cb({ success: false, error: 'Room full' });
    
    const usedChars = Array.from(room.players.values()).map(p => p.character.id);
    const availChars = CHARACTER_TYPES.filter(c => !usedChars.includes(c.id));
    const char = availChars.length > 0 ? availChars[0] : CHARACTER_TYPES[0];
    
    const player = { id: socket.id, name: data.playerName || 'Player', character: char, x: 300 + room.players.size * 100, y: 580, score: 0, kills: 0, health: 100, isReady: false };
    room.players.set(socket.id, player);
    socket.join(code);
    players.get(socket.id).roomCode = code;
    
    cb({ success: true, player, room: getPublicState(room) });
    io.to(code).emit('playerJoined', { player, room: getPublicState(room) });
  });

  socket.on('quickMatch', (data, cb) => {
    let room = Array.from(rooms.values()).find(r => !r.isPrivate && r.state === 'waiting' && r.players.size < r.settings.maxPlayers);
    
    if (!room) {
      let code;
      do { code = generateCode(); } while (rooms.has(code));
      room = { code, hostId: socket.id, isPrivate: false, players: new Map(), bots: [], state: 'waiting', settings: { maxPlayers: CONFIG.MAX_PLAYERS, gameDuration: CONFIG.GAME_DURATION } };
      rooms.set(code, room);
    }
    
    const char = CHARACTER_TYPES[room.players.size % CHARACTER_TYPES.length];
    const player = { id: socket.id, name: data.playerName || 'Player', character: char, x: 300 + room.players.size * 100, y: 580, score: 0, kills: 0, health: 100, isReady: false };
    room.players.set(socket.id, player);
    socket.join(room.code);
    players.get(socket.id).roomCode = room.code;
    
    cb({ success: true, roomCode: room.code, player, room: getPublicState(room) });
    io.to(room.code).emit('playerJoined', { player, room: getPublicState(room) });
  });

  socket.on('playerReady', (isReady) => {
    const p = players.get(socket.id);
    if (!p?.roomCode) return;
    const room = rooms.get(p.roomCode);
    if (!room) return;
    const ps = room.players.get(socket.id);
    if (ps) ps.isReady = isReady;
    io.to(room.code).emit('roomUpdate', getPublicState(room));
  });

  socket.on('startGame', () => {
    const p = players.get(socket.id);
    if (!p?.roomCode) return;
    const room = rooms.get(p.roomCode);
    if (!room || room.hostId !== socket.id) return;
    startCountdown(room);
  });

  socket.on('playerUpdate', (data) => {
    const p = players.get(socket.id);
    if (!p?.roomCode) return;
    const room = rooms.get(p.roomCode);
    if (!room || room.state !== 'playing') return;
    const ps = room.players.get(socket.id);
    if (ps) { ps.x = data.x; ps.y = data.y; ps.score = data.score; ps.kills = data.kills; ps.health = data.health; }
    socket.to(room.code).emit('playerMoved', { playerId: socket.id, ...data });
  });

  socket.on('playerShoot', (data) => {
    const p = players.get(socket.id);
    if (!p?.roomCode) return;
    io.to(p.roomCode).emit('playerShot', { playerId: socket.id, ...data });
  });

  socket.on('birdKill', (data) => {
    const p = players.get(socket.id);
    if (!p?.roomCode) return;
    const room = rooms.get(p.roomCode);
    if (!room) return;
    const ps = room.players.get(socket.id);
    if (ps) { ps.score += data.points; ps.kills++; }
    io.to(room.code).emit('birdKilled', { playerId: socket.id, ...data, playerScore: ps?.score });
  });

  socket.on('chatMessage', (msg) => {
    const p = players.get(socket.id);
    if (!p?.roomCode) return;
    const room = rooms.get(p.roomCode);
    if (!room) return;
    const ps = room.players.get(socket.id);
    io.to(room.code).emit('chatMessage', { playerId: socket.id, playerName: ps?.name || 'Player', message: msg.substring(0, 200), timestamp: Date.now() });
  });

  socket.on('disconnect', () => {
    const p = players.get(socket.id);
    if (p?.roomCode) {
      const room = rooms.get(p.roomCode);
      if (room) {
        room.players.delete(socket.id);
        if (room.hostId === socket.id && room.players.size > 0) room.hostId = room.players.keys().next().value;
        io.to(room.code).emit('playerLeft', { playerId: socket.id, room: getPublicState(room) });
        if (room.players.size === 0) rooms.delete(p.roomCode);
      }
    }
    players.delete(socket.id);
  });
});

function getPublicState(room) {
  return {
    code: room.code, hostId: room.hostId, state: room.state,
    playerCount: room.players.size, maxPlayers: room.settings.maxPlayers,
    players: Array.from(room.players.values()).map(p => ({ id: p.id, name: p.name, character: p.character, score: p.score, kills: p.kills, isReady: p.isReady })),
    bots: room.bots.map(b => ({ id: b.id, name: b.name, score: b.score, kills: b.kills })),
  };
}

function startCountdown(room) {
  if (room.state !== 'waiting') return;
  room.state = 'countdown';
  let count = 5;
  io.to(room.code).emit('countdown', { seconds: count });
  const int = setInterval(() => {
    count--;
    if (count > 0) io.to(room.code).emit('countdown', { seconds: count });
    else { clearInterval(int); room.state = 'playing'; room.startTime = Date.now(); io.to(room.code).emit('gameStart', { room: getPublicState(room) }); setTimeout(() => endGame(room), room.settings.gameDuration * 1000); }
  }, 1000);
}

function endGame(room) {
  if (room.state !== 'playing') return;
  room.state = 'ended';
  const standings = [...Array.from(room.players.values()), ...room.bots].sort((a, b) => b.score - a.score);
  io.to(room.code).emit('gameEnd', { standings, winner: standings[0] });
  setTimeout(() => { room.state = 'waiting'; room.players.forEach(p => { p.isReady = false; p.score = 0; p.kills = 0; }); io.to(room.code).emit('roomUpdate', getPublicState(room)); }, 10000);
}

app.get('/api/rooms', (req, res) => res.json({ rooms: Array.from(rooms.values()).filter(r => !r.isPrivate && r.state === 'waiting').map(getPublicState) }));
app.get('/api/characters', (req, res) => res.json({ characters: CHARACTER_TYPES }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

server.listen(CONFIG.PORT, () => console.log(`BirdTurds Server on port ${CONFIG.PORT}`));
