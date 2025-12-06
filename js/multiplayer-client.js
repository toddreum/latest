/**
 * BirdTurds Multiplayer Client
 * 
 * Handles connection to game servers, input sending, and snapshot handling.
 * Integrates with Phaser game instance.
 * 
 * Usage:
 *   1. Include socket.io client: <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
 *   2. Include this file: <script src="/js/multiplayer-client.js"></script>
 *   3. Call MultiplayerClient.connect() after user logs in
 */

const MultiplayerClient = {
  // Connection state
  socket: null,
  matchId: null,
  isConnected: false,
  isHost: false,
  
  // Player state
  localPlayerId: null,
  localPlayerName: null,
  players: new Map(),
  
  // Game state
  gameStarted: false,
  lastServerTick: 0,
  serverTimeOffset: 0,
  latency: 0,
  
  // Input handling
  inputSeq: 0,
  pendingInputs: [],
  lastInputTime: 0,
  INPUT_RATE: 50, // Send input every 50ms (20Hz)
  
  // Interpolation
  interpolationBuffer: new Map(),
  INTERPOLATION_DELAY: 100, // 100ms interpolation buffer
  
  // Callbacks
  onPlayersUpdate: null,
  onGameStart: null,
  onGameEnd: null,
  onSnapshot: null,
  onError: null,
  
  // Configuration
  matchmakerUrl: '/api/matchmaker', // Cloud Function URL
  
  /**
   * Initialize multiplayer with Firebase user
   */
  async init(user) {
    if (!user) {
      console.error('User required for multiplayer');
      return false;
    }
    
    this.localPlayerId = user.uid;
    this.localPlayerName = user.displayName || user.email?.split('@')[0] || 'Player';
    
    try {
      this.idToken = await user.getIdToken();
      console.log('🎮 Multiplayer client initialized');
      return true;
    } catch (err) {
      console.error('Failed to get ID token:', err);
      return false;
    }
  },
  
  /**
   * Create a private room
   */
  async createRoom(roomCode = null) {
    if (!this.idToken) {
      throw new Error('Not initialized - call init() first');
    }
    
    const code = roomCode || this.generateRoomCode();
    
    try {
      const response = await fetch(this.matchmakerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.idToken}`
        },
        body: JSON.stringify({
          mode: 'private',
          roomCode: code,
          character: localStorage.getItem('birdturds_character') || 'buck'
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'created' || data.status === 'ok') {
        this.matchId = data.matchId;
        this.isHost = true;
        await this.connectToServer(data.serverEndpoint);
        return {
          success: true,
          roomCode: data.roomCode,
          matchId: data.matchId
        };
      } else {
        return { success: false, error: data.error || 'Failed to create room' };
      }
    } catch (err) {
      console.error('Create room error:', err);
      return { success: false, error: err.message };
    }
  },
  
  /**
   * Join an existing room by code
   */
  async joinRoom(roomCode) {
    if (!this.idToken) {
      throw new Error('Not initialized - call init() first');
    }
    
    try {
      const response = await fetch(this.matchmakerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.idToken}`
        },
        body: JSON.stringify({
          mode: 'private',
          roomCode: roomCode.toUpperCase(),
          character: localStorage.getItem('birdturds_character') || 'buck'
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'joined' || data.status === 'ok') {
        this.matchId = data.matchId;
        this.isHost = false;
        await this.connectToServer(data.serverEndpoint);
        return {
          success: true,
          roomCode: data.roomCode,
          matchId: data.matchId,
          players: data.players
        };
      } else {
        return { success: false, error: data.error || 'Room not found' };
      }
    } catch (err) {
      console.error('Join room error:', err);
      return { success: false, error: err.message };
    }
  },
  
  /**
   * Quick match - auto-find a game
   */
  async quickMatch() {
    if (!this.idToken) {
      throw new Error('Not initialized - call init() first');
    }
    
    try {
      const response = await fetch(this.matchmakerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.idToken}`
        },
        body: JSON.stringify({
          mode: 'quickmatch',
          character: localStorage.getItem('birdturds_character') || 'buck'
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'created' || data.status === 'joined') {
        this.matchId = data.matchId;
        this.isHost = data.status === 'created';
        await this.connectToServer(data.serverEndpoint);
        return {
          success: true,
          roomCode: data.roomCode,
          matchId: data.matchId,
          players: data.players,
          isHost: this.isHost
        };
      } else if (data.status === 'waiting') {
        return { success: false, waiting: true, error: 'No servers available' };
      } else {
        return { success: false, error: data.error || 'Matchmaking failed' };
      }
    } catch (err) {
      console.error('Quick match error:', err);
      return { success: false, error: err.message };
    }
  },
  
  /**
   * Connect to game server via WebSocket
   */
  async connectToServer(serverEndpoint) {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        this.socket.disconnect();
      }
      
      console.log(`Connecting to ${serverEndpoint}...`);
      
      this.socket = io(serverEndpoint, {
        auth: { token: this.idToken },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });
      
      this.socket.on('connect', () => {
        console.log('✅ Connected to game server');
        this.isConnected = true;
        
        // Join the match
        this.socket.emit('join_match', {
          matchId: this.matchId,
          character: localStorage.getItem('birdturds_character') || 'buck'
        });
      });
      
      this.socket.on('joined', (data) => {
        console.log('✅ Joined match:', data.matchId);
        
        // Initialize players
        data.players.forEach(p => {
          this.players.set(p.uid, p);
        });
        
        if (this.onPlayersUpdate) {
          this.onPlayersUpdate(this.players);
        }
        
        resolve(true);
      });
      
      this.socket.on('player_joined', (data) => {
        console.log(`Player joined: ${data.displayName}`);
        this.players.set(data.uid, data);
        
        if (this.onPlayersUpdate) {
          this.onPlayersUpdate(this.players);
        }
      });
      
      this.socket.on('player_left', (data) => {
        console.log(`Player left: ${data.uid}`);
        this.players.delete(data.uid);
        
        if (this.onPlayersUpdate) {
          this.onPlayersUpdate(this.players);
        }
      });
      
      this.socket.on('countdown', (data) => {
        console.log(`Game starting in ${data.seconds}...`);
      });
      
      this.socket.on('game_start', (data) => {
        console.log('🎮 Game started!');
        this.gameStarted = true;
        
        // Start input loop
        this.startInputLoop();
        
        if (this.onGameStart) {
          this.onGameStart(data);
        }
      });
      
      this.socket.on('snapshot', (snapshot) => {
        this.handleSnapshot(snapshot);
      });
      
      this.socket.on('ack_input', (data) => {
        // Remove acknowledged inputs from pending
        this.pendingInputs = this.pendingInputs.filter(i => i.seq > data.lastProcessedSeq);
      });
      
      this.socket.on('game_end', (data) => {
        console.log('🏁 Game ended!');
        this.gameStarted = false;
        
        if (this.onGameEnd) {
          this.onGameEnd(data);
        }
      });
      
      this.socket.on('error', (data) => {
        console.error('Server error:', data.message);
        if (this.onError) {
          this.onError(data);
        }
        reject(new Error(data.message));
      });
      
      this.socket.on('disconnect', (reason) => {
        console.log('Disconnected:', reason);
        this.isConnected = false;
      });
      
      this.socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
        reject(err);
      });
      
      // Timeout
      setTimeout(() => {
        if (!this.isConnected) {
          reject(new Error('Connection timeout'));
        }
      }, 10000);
    });
  },
  
  /**
   * Handle server snapshot
   */
  handleSnapshot(snapshot) {
    this.lastServerTick = snapshot.tick;
    
    // Update players
    snapshot.players.forEach(serverPlayer => {
      if (serverPlayer.uid === this.localPlayerId) {
        // Reconcile local player
        this.reconcileLocalPlayer(serverPlayer);
      } else {
        // Buffer for interpolation
        if (!this.interpolationBuffer.has(serverPlayer.uid)) {
          this.interpolationBuffer.set(serverPlayer.uid, []);
        }
        const buffer = this.interpolationBuffer.get(serverPlayer.uid);
        buffer.push({
          ...serverPlayer,
          timestamp: snapshot.ts
        });
        
        // Keep only last 1 second of data
        while (buffer.length > 0 && snapshot.ts - buffer[0].timestamp > 1000) {
          buffer.shift();
        }
      }
      
      // Update player data
      const player = this.players.get(serverPlayer.uid);
      if (player) {
        Object.assign(player, serverPlayer);
      }
    });
    
    if (this.onSnapshot) {
      this.onSnapshot(snapshot);
    }
  },
  
  /**
   * Reconcile local player with server state
   */
  reconcileLocalPlayer(serverState) {
    // Get local predicted position
    const localPlayer = this.players.get(this.localPlayerId);
    if (!localPlayer) return;
    
    // Calculate position difference
    const dx = serverState.x - localPlayer.x;
    const dy = serverState.y - localPlayer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // If difference is small, ignore (within prediction error)
    if (dist < 5) return;
    
    // If difference is large, snap to server position
    if (dist > 50) {
      localPlayer.x = serverState.x;
      localPlayer.y = serverState.y;
      return;
    }
    
    // Smooth correction
    localPlayer.x += dx * 0.3;
    localPlayer.y += dy * 0.3;
    
    // Re-apply pending inputs
    for (const input of this.pendingInputs) {
      localPlayer.x += input.vx * 0.05;
      localPlayer.y += input.vy * 0.05;
    }
  },
  
  /**
   * Get interpolated position for a remote player
   */
  getInterpolatedPosition(uid) {
    const buffer = this.interpolationBuffer.get(uid);
    if (!buffer || buffer.length < 2) {
      const player = this.players.get(uid);
      return player ? { x: player.x, y: player.y } : null;
    }
    
    const renderTime = Date.now() - this.INTERPOLATION_DELAY;
    
    // Find two states to interpolate between
    let before = null;
    let after = null;
    
    for (let i = 0; i < buffer.length - 1; i++) {
      if (buffer[i].timestamp <= renderTime && buffer[i + 1].timestamp >= renderTime) {
        before = buffer[i];
        after = buffer[i + 1];
        break;
      }
    }
    
    if (!before || !after) {
      return { x: buffer[buffer.length - 1].x, y: buffer[buffer.length - 1].y };
    }
    
    // Interpolate
    const t = (renderTime - before.timestamp) / (after.timestamp - before.timestamp);
    return {
      x: before.x + (after.x - before.x) * t,
      y: before.y + (after.y - before.y) * t
    };
  },
  
  /**
   * Start input loop (20Hz)
   */
  startInputLoop() {
    if (this.inputInterval) {
      clearInterval(this.inputInterval);
    }
    
    this.inputInterval = setInterval(() => {
      this.sendInput();
    }, this.INPUT_RATE);
  },
  
  /**
   * Send current input to server
   */
  sendInput() {
    if (!this.socket || !this.gameStarted) return;
    
    // Get current input from game
    const gameScene = window.gameInstance?.scene?.scenes[0];
    if (!gameScene || !gameScene.hunter) return;
    
    const hunter = gameScene.hunter;
    const input = {
      seq: ++this.inputSeq,
      tick: this.lastServerTick,
      x: hunter.x,
      y: hunter.y,
      vx: hunter.body?.velocity?.x || 0,
      vy: hunter.body?.velocity?.y || 0,
      aim: gameScene.aimAngle || 0,
      fire: gameScene.isFiring || false,
      ts: Date.now()
    };
    
    // Store for reconciliation
    this.pendingInputs.push(input);
    if (this.pendingInputs.length > 30) {
      this.pendingInputs.shift();
    }
    
    // Send to server
    this.socket.emit('input', input);
    
    // Apply locally (prediction)
    // The game already handles local movement
  },
  
  /**
   * Signal ready to start
   */
  setReady() {
    if (this.socket) {
      this.socket.emit('player_ready');
    }
  },
  
  /**
   * Start game (host only)
   */
  startGame() {
    if (this.socket && this.isHost) {
      this.socket.emit('start_game');
    }
  },
  
  /**
   * Disconnect and cleanup
   */
  disconnect() {
    if (this.inputInterval) {
      clearInterval(this.inputInterval);
      this.inputInterval = null;
    }
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    this.isConnected = false;
    this.gameStarted = false;
    this.matchId = null;
    this.players.clear();
    this.interpolationBuffer.clear();
    this.pendingInputs = [];
  },
  
  /**
   * Measure latency
   */
  pingServer() {
    if (!this.socket) return;
    
    const start = Date.now();
    this.socket.emit('ping', { ts: start });
    
    this.socket.once('pong', (data) => {
      this.latency = Date.now() - data.ts;
      this.serverTimeOffset = data.serverTs - Date.now() + (this.latency / 2);
    });
  },
  
  /**
   * Generate random room code
   */
  generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MultiplayerClient;
}
if (typeof window !== 'undefined') {
  window.MultiplayerClient = MultiplayerClient;
}

console.log('🎮 Multiplayer client loaded');
