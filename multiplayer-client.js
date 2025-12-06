/**
 * BirdTurds Multiplayer Client
 * Connects to WebSocket server for online play
 * 
 * Include Socket.io client: <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
 */

class MultiplayerClient {
  constructor(serverUrl = 'http://localhost:3001') {
    this.serverUrl = serverUrl;
    this.socket = null;
    this.roomCode = null;
    this.playerId = null;
    this.playerData = null;
    this.otherPlayers = new Map();
    this.isConnected = false;
    this.isHost = false;
    this.gameScene = null;
    
    // Callbacks
    this.onConnect = null;
    this.onDisconnect = null;
    this.onRoomUpdate = null;
    this.onPlayerJoined = null;
    this.onPlayerLeft = null;
    this.onGameStart = null;
    this.onGameEnd = null;
    this.onPlayerMoved = null;
    this.onPlayerShot = null;
    this.onBirdKilled = null;
    this.onChatMessage = null;
    this.onCountdown = null;
    this.onError = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (typeof io === 'undefined') {
        reject(new Error('Socket.io not loaded'));
        return;
      }

      this.socket = io(this.serverUrl, {
        transports: ['websocket', 'polling'],
        timeout: 10000,
      });

      this.socket.on('connect', () => {
        console.log('Connected to multiplayer server');
        this.isConnected = true;
        this.playerId = this.socket.id;
        if (this.onConnect) this.onConnect();
        resolve();
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
        this.isConnected = false;
        if (this.onDisconnect) this.onDisconnect();
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        if (this.onError) this.onError('Connection failed');
        reject(error);
      });

      // Room events
      this.socket.on('roomUpdate', (data) => {
        if (this.onRoomUpdate) this.onRoomUpdate(data);
      });

      this.socket.on('playerJoined', (data) => {
        this.addOtherPlayer(data.player);
        if (this.onPlayerJoined) this.onPlayerJoined(data);
      });

      this.socket.on('playerLeft', (data) => {
        this.removeOtherPlayer(data.playerId);
        if (this.onPlayerLeft) this.onPlayerLeft(data);
      });

      // Game events
      this.socket.on('countdown', (data) => {
        if (this.onCountdown) this.onCountdown(data.seconds);
      });

      this.socket.on('gameStart', (data) => {
        if (this.onGameStart) this.onGameStart(data);
      });

      this.socket.on('gameEnd', (data) => {
        if (this.onGameEnd) this.onGameEnd(data);
      });

      // Player updates
      this.socket.on('playerMoved', (data) => {
        this.updateOtherPlayer(data);
        if (this.onPlayerMoved) this.onPlayerMoved(data);
      });

      this.socket.on('playerShot', (data) => {
        if (data.playerId !== this.playerId) {
          if (this.onPlayerShot) this.onPlayerShot(data);
        }
      });

      this.socket.on('birdKilled', (data) => {
        if (this.onBirdKilled) this.onBirdKilled(data);
      });

      this.socket.on('chatMessage', (data) => {
        if (this.onChatMessage) this.onChatMessage(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnected = false;
    this.roomCode = null;
    this.otherPlayers.clear();
  }

  // Room management
  createRoom(playerName, isPrivate = true) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected'));
        return;
      }
      
      // Get selected character from localStorage
      const characterId = localStorage.getItem('birdturds_character') || 'buck';
      this.localPlayerName = playerName;

      this.socket.emit('createRoom', { playerName, isPrivate, characterId }, (response) => {
        if (response.success) {
          this.roomCode = response.roomCode;
          this.playerData = response.player;
          this.isHost = true;
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }

  joinRoom(roomCode, playerName) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected'));
        return;
      }
      
      // Get selected character from localStorage
      const characterId = localStorage.getItem('birdturds_character') || 'buck';
      this.localPlayerName = playerName;

      this.socket.emit('joinRoom', { roomCode, playerName, characterId }, (response) => {
        if (response.success) {
          this.roomCode = roomCode;
          this.playerData = response.player;
          this.isHost = false;
          
          // Add existing players
          response.room.players.forEach(p => {
            if (p.id !== this.playerId) {
              this.addOtherPlayer(p);
            }
          });
          
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }

  quickMatch(playerName) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('Not connected'));
        return;
      }
      
      // Get selected character from localStorage
      const characterId = localStorage.getItem('birdturds_character') || 'buck';
      this.localPlayerName = playerName;

      this.socket.emit('quickMatch', { playerName, characterId }, (response) => {
        if (response.success) {
          this.roomCode = response.roomCode;
          this.playerData = response.player;
          
          response.room.players.forEach(p => {
            if (p.id !== this.playerId) {
              this.addOtherPlayer(p);
            }
          });
          
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }

  leaveRoom() {
    if (this.socket && this.roomCode) {
      this.socket.emit('leaveRoom');
      this.roomCode = null;
      this.isHost = false;
      this.otherPlayers.clear();
    }
  }

  // Game controls
  setReady(isReady) {
    if (this.socket) {
      this.socket.emit('playerReady', isReady);
    }
  }

  startGame() {
    if (this.socket && this.isHost) {
      this.socket.emit('startGame');
    }
  }

  // Gameplay updates
  sendPosition(x, y, direction, animation) {
    if (this.socket && this.roomCode) {
      this.socket.emit('playerUpdate', {
        x, y, direction, animation,
        score: btState?.score || 0,
        kills: btState?.kills || 0,
        health: btState?.health || 100,
      });
    }
  }

  sendShoot(x, y, targetX, targetY, weapon) {
    if (this.socket && this.roomCode) {
      this.socket.emit('playerShoot', { x, y, targetX, targetY, weapon });
    }
  }

  sendBirdKill(birdId, points) {
    if (this.socket && this.roomCode) {
      this.socket.emit('birdKill', { birdId, points });
    }
  }

  sendChat(message) {
    if (this.socket && this.roomCode) {
      this.socket.emit('chatMessage', message);
    }
  }

  // Other player management
  addOtherPlayer(playerData) {
    if (playerData.id === this.playerId) return;
    this.otherPlayers.set(playerData.id, {
      ...playerData,
      sprite: null,
      nameTag: null,
    });
  }

  removeOtherPlayer(playerId) {
    const player = this.otherPlayers.get(playerId);
    if (player) {
      if (player.sprite) player.sprite.destroy();
      if (player.nameTag) player.nameTag.destroy();
      this.otherPlayers.delete(playerId);
    }
  }

  updateOtherPlayer(data) {
    const player = this.otherPlayers.get(data.playerId);
    if (player) {
      player.x = data.x;
      player.y = data.y;
      player.direction = data.direction;
      player.score = data.score || player.score;
      player.kills = data.kills || player.kills;
      player.health = data.health || player.health;
    }
  }

  // Create sprites for other players in Phaser scene
  createPlayerSprites(scene) {
    this.gameScene = scene;
    
    this.otherPlayers.forEach((player, id) => {
      this.createSpriteForPlayer(player);
    });
  }

  createSpriteForPlayer(player) {
    if (!this.gameScene || player.sprite) return;
    
    // Get character sprite key (buck or daisy)
    const charId = player.character?.id || 'buck';
    const spriteKey = (charId === 'daisy' || charId === 'buck') ? `${charId}_idle` : 'buck_idle';
    
    // Create sprite using the new animated characters
    player.sprite = this.gameScene.add.sprite(player.x, player.y, spriteKey)
      .setOrigin(0.5, 1)
      .setScale(0.15)
      .setAlpha(0.9)
      .setDepth(9);
    
    // Get player initials (first letter of each word, max 3)
    const initials = this.getInitials(player.name);
    
    // Name tag with initials - floating above head
    player.nameTag = this.gameScene.add.text(player.x, player.y - 100, initials, {
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: '#3b82f6dd',
      padding: { x: 6, y: 3 },
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5).setDepth(15);
    
    // Add subtle floating animation to name tag
    this.gameScene.tweens.add({
      targets: player.nameTag,
      y: player.nameTag.y - 5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
  
  // Get initials from player name (max 3 characters)
  getInitials(name) {
    if (!name) return '?';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      // Single word - take first 3 chars
      return name.substring(0, 3).toUpperCase();
    }
    // Multiple words - take first letter of each (max 3)
    return words.slice(0, 3).map(w => w[0]).join('').toUpperCase();
  }

  getCharacterTint(character) {
    const tints = {
      'hunter_m1': 0xffffff, // Default
      'hunter_m2': 0x8b6914, // Dark skin
      'hunter_f1': 0xffc0cb, // Light female
      'hunter_f2': 0xdaa520, // Dark female
      'hunter_m3': 0xd2691e, // Tan male
      'hunter_f3': 0xf4a460, // Tan female
    };
    return tints[character?.id] || 0x3b82f6;
  }

  // Update sprites each frame
  updatePlayerSprites() {
    this.otherPlayers.forEach((player, id) => {
      if (!player.sprite && this.gameScene) {
        this.createSpriteForPlayer(player);
      }
      
      if (player.sprite) {
        // Smooth interpolation
        player.sprite.x += (player.x - player.sprite.x) * 0.2;
        player.sprite.y += (player.y - player.sprite.y) * 0.2;
        player.sprite.setFlipX(player.direction < 0);
      }
      
      if (player.nameTag) {
        player.nameTag.setPosition(player.sprite?.x || player.x, (player.sprite?.y || player.y) - 80);
        player.nameTag.setText(`${player.name} (${player.score})`);
      }
    });
  }
}

// Global instance
window.multiplayerClient = new MultiplayerClient();

// Helper to get server URL based on environment
function getMultiplayerServerUrl() {
  // Check for production
  if (window.location.hostname === 'birdturds.com') {
    return 'https://mp.birdturds.com'; // Your production server
  }
  // Development
  return 'http://localhost:3001';
}
