/**
 * BirdTurds Multiplayer System v43
 * Real-time multiplayer using Firebase Realtime Database
 * 
 * Features:
 * - Create/Join game rooms
 * - Real-time player sync
 * - Matchmaking
 * - Leaderboards
 * 
 * "For where two or three gather in my name, there am I with them." - Matthew 18:20
 */

(function() {
  'use strict';

  // =============================================================================
  // MULTIPLAYER MANAGER
  // =============================================================================

  class MultiplayerManager {
    constructor() {
      this.db = null;
      this.rtdb = null; // Realtime Database
      this.roomId = null;
      this.playerId = null;
      this.playerName = null;
      this.isHost = false;
      this.players = {};
      this.gameState = null;
      this.listeners = [];
      this.pingInterval = null;
      this.lastPing = Date.now();
      
      this.MAX_PLAYERS = 4;
      this.ROOM_TIMEOUT = 60000; // 1 minute timeout for inactive rooms
      
      this.init();
    }

    init() {
      if (typeof firebase !== 'undefined') {
        if (firebase.firestore) {
          this.db = firebase.firestore();
        }
        if (firebase.database) {
          this.rtdb = firebase.database();
          console.log('🌐 Multiplayer: Connected to Firebase Realtime Database');
        } else {
          console.warn('🌐 Multiplayer: Firebase Realtime Database not loaded');
        }
      }
      
      // Get player name from localStorage or auth
      this.playerName = localStorage.getItem('birdturds_playerName') || 
                        (window.currentUser?.displayName) || 
                        'Player_' + Math.random().toString(36).substr(2, 6);
    }

    // =========================================================================
    // ROOM MANAGEMENT
    // =========================================================================

    generateRoomCode() {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    }

    async createRoom(options = {}) {
      if (!this.rtdb) {
        console.error('Realtime Database not available');
        return { success: false, error: 'Database not available' };
      }

      try {
        this.roomId = this.generateRoomCode();
        this.playerId = this.generatePlayerId();
        this.isHost = true;

        const roomData = {
          code: this.roomId,
          hostId: this.playerId,
          hostName: this.playerName,
          status: 'waiting', // waiting, playing, finished
          maxPlayers: options.maxPlayers || this.MAX_PLAYERS,
          difficulty: options.difficulty || 'intermediate',
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
          settings: {
            friendlyFire: options.friendlyFire || false,
            bossMode: options.bossMode || false,
            timeLimit: options.timeLimit || 0 // 0 = no limit
          }
        };

        // Create room
        await this.rtdb.ref(`rooms/${this.roomId}`).set(roomData);

        // Add host as first player
        await this.addPlayerToRoom(this.playerId, {
          name: this.playerName,
          isHost: true,
          score: 0,
          kills: 0,
          health: 100,
          x: 100,
          y: 500,
          character: localStorage.getItem('birdturds_character') || 'buck',
          ready: false,
          lastUpdate: firebase.database.ServerValue.TIMESTAMP
        });

        // Start listening for room updates
        this.startListeners();
        this.startPingInterval();

        console.log('🎮 Room created:', this.roomId);
        return { success: true, roomCode: this.roomId };

      } catch (error) {
        console.error('Error creating room:', error);
        return { success: false, error: error.message };
      }
    }

    async joinRoom(roomCode) {
      if (!this.rtdb) {
        return { success: false, error: 'Database not available' };
      }

      try {
        roomCode = roomCode.toUpperCase().trim();
        
        // Check if room exists
        const roomSnapshot = await this.rtdb.ref(`rooms/${roomCode}`).once('value');
        const roomData = roomSnapshot.val();

        if (!roomData) {
          return { success: false, error: 'Room not found' };
        }

        if (roomData.status !== 'waiting') {
          return { success: false, error: 'Game already in progress' };
        }

        // Count current players
        const playersSnapshot = await this.rtdb.ref(`rooms/${roomCode}/players`).once('value');
        const playerCount = playersSnapshot.numChildren();

        if (playerCount >= roomData.maxPlayers) {
          return { success: false, error: 'Room is full' };
        }

        this.roomId = roomCode;
        this.playerId = this.generatePlayerId();
        this.isHost = false;

        // Add player to room
        await this.addPlayerToRoom(this.playerId, {
          name: this.playerName,
          isHost: false,
          score: 0,
          kills: 0,
          health: 100,
          x: 200 + (playerCount * 100),
          y: 500,
          character: localStorage.getItem('birdturds_character') || 'buck',
          ready: false,
          lastUpdate: firebase.database.ServerValue.TIMESTAMP
        });

        // Start listening
        this.startListeners();
        this.startPingInterval();

        console.log('🎮 Joined room:', this.roomId);
        return { success: true, roomCode: this.roomId, roomData };

      } catch (error) {
        console.error('Error joining room:', error);
        return { success: false, error: error.message };
      }
    }

    async addPlayerToRoom(playerId, playerData) {
      await this.rtdb.ref(`rooms/${this.roomId}/players/${playerId}`).set(playerData);
    }

    generatePlayerId() {
      return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // =========================================================================
    // REAL-TIME SYNC
    // =========================================================================

    startListeners() {
      if (!this.rtdb || !this.roomId) return;

      // Listen for player changes
      const playersRef = this.rtdb.ref(`rooms/${this.roomId}/players`);
      playersRef.on('value', (snapshot) => {
        this.players = snapshot.val() || {};
        this.onPlayersUpdate(this.players);
      });
      this.listeners.push({ ref: playersRef, event: 'value' });

      // Listen for game state changes
      const gameStateRef = this.rtdb.ref(`rooms/${this.roomId}/gameState`);
      gameStateRef.on('value', (snapshot) => {
        this.gameState = snapshot.val();
        this.onGameStateUpdate(this.gameState);
      });
      this.listeners.push({ ref: gameStateRef, event: 'value' });

      // Listen for room status changes
      const statusRef = this.rtdb.ref(`rooms/${this.roomId}/status`);
      statusRef.on('value', (snapshot) => {
        const status = snapshot.val();
        this.onStatusChange(status);
      });
      this.listeners.push({ ref: statusRef, event: 'value' });

      // Handle disconnection
      const playerRef = this.rtdb.ref(`rooms/${this.roomId}/players/${this.playerId}`);
      playerRef.onDisconnect().remove();
    }

    stopListeners() {
      this.listeners.forEach(({ ref, event }) => {
        ref.off(event);
      });
      this.listeners = [];

      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
      }
    }

    startPingInterval() {
      // Send position/state updates every 50ms
      this.pingInterval = setInterval(() => {
        this.sendPlayerUpdate();
      }, 50);
    }

    // =========================================================================
    // PLAYER UPDATES
    // =========================================================================

    sendPlayerUpdate() {
      if (!this.rtdb || !this.roomId || !this.playerId) return;

      const scene = window.gameInstance?.scene?.scenes?.[0];
      if (!scene?.hunter) return;

      const update = {
        x: Math.round(scene.hunter.x),
        y: Math.round(scene.hunter.y),
        health: window.btState?.health || 100,
        score: window.btState?.score || 0,
        kills: window.btState?.kills || 0,
        animation: scene.hunter.anims?.currentAnim?.key || 'idle',
        flipX: scene.hunter.flipX || false,
        lastUpdate: firebase.database.ServerValue.TIMESTAMP
      };

      this.rtdb.ref(`rooms/${this.roomId}/players/${this.playerId}`).update(update);
    }

    async setReady(ready = true) {
      if (!this.rtdb || !this.roomId || !this.playerId) return;
      await this.rtdb.ref(`rooms/${this.roomId}/players/${this.playerId}/ready`).set(ready);
    }

    // =========================================================================
    // GAME CONTROL
    // =========================================================================

    async startGame() {
      if (!this.isHost) {
        console.warn('Only host can start the game');
        return false;
      }

      try {
        // Check all players ready
        const allReady = Object.values(this.players).every(p => p.ready || p.isHost);
        if (!allReady) {
          console.warn('Not all players are ready');
          return false;
        }

        await this.rtdb.ref(`rooms/${this.roomId}`).update({
          status: 'playing',
          startedAt: firebase.database.ServerValue.TIMESTAMP
        });

        // Initialize shared game state
        await this.rtdb.ref(`rooms/${this.roomId}/gameState`).set({
          currentLevel: 1,
          bossActive: false,
          sharedEnemies: {},
          sharedItems: {}
        });

        return true;
      } catch (error) {
        console.error('Error starting game:', error);
        return false;
      }
    }

    async endGame(results) {
      if (!this.rtdb || !this.roomId) return;

      try {
        await this.rtdb.ref(`rooms/${this.roomId}`).update({
          status: 'finished',
          endedAt: firebase.database.ServerValue.TIMESTAMP,
          results: results
        });

        // Save to leaderboard
        if (this.db) {
          await this.saveToLeaderboard(results);
        }
      } catch (error) {
        console.error('Error ending game:', error);
      }
    }

    async leaveRoom() {
      if (!this.rtdb || !this.roomId) return;

      try {
        // Remove player from room
        await this.rtdb.ref(`rooms/${this.roomId}/players/${this.playerId}`).remove();

        // If host, either transfer or delete room
        if (this.isHost) {
          const remainingPlayers = Object.keys(this.players).filter(id => id !== this.playerId);
          if (remainingPlayers.length > 0) {
            // Transfer host
            const newHostId = remainingPlayers[0];
            await this.rtdb.ref(`rooms/${this.roomId}`).update({
              hostId: newHostId
            });
            await this.rtdb.ref(`rooms/${this.roomId}/players/${newHostId}/isHost`).set(true);
          } else {
            // Delete room
            await this.rtdb.ref(`rooms/${this.roomId}`).remove();
          }
        }

        this.stopListeners();
        this.roomId = null;
        this.playerId = null;
        this.isHost = false;
        this.players = {};

      } catch (error) {
        console.error('Error leaving room:', error);
      }
    }

    // =========================================================================
    // SHARED GAME EVENTS
    // =========================================================================

    async spawnEnemy(enemyData) {
      if (!this.isHost || !this.rtdb || !this.roomId) return;

      const enemyId = 'enemy_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      await this.rtdb.ref(`rooms/${this.roomId}/gameState/sharedEnemies/${enemyId}`).set({
        ...enemyData,
        id: enemyId,
        spawnedAt: firebase.database.ServerValue.TIMESTAMP
      });
    }

    async killEnemy(enemyId, killerId) {
      if (!this.rtdb || !this.roomId) return;

      await this.rtdb.ref(`rooms/${this.roomId}/gameState/sharedEnemies/${enemyId}`).update({
        killed: true,
        killedBy: killerId,
        killedAt: firebase.database.ServerValue.TIMESTAMP
      });
    }

    async spawnItem(itemData) {
      if (!this.isHost || !this.rtdb || !this.roomId) return;

      const itemId = 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      await this.rtdb.ref(`rooms/${this.roomId}/gameState/sharedItems/${itemId}`).set({
        ...itemData,
        id: itemId,
        spawnedAt: firebase.database.ServerValue.TIMESTAMP
      });
    }

    async collectItem(itemId, playerId) {
      if (!this.rtdb || !this.roomId) return;

      await this.rtdb.ref(`rooms/${this.roomId}/gameState/sharedItems/${itemId}`).update({
        collected: true,
        collectedBy: playerId,
        collectedAt: firebase.database.ServerValue.TIMESTAMP
      });
    }

    // =========================================================================
    // MATCHMAKING
    // =========================================================================

    async findMatch(options = {}) {
      if (!this.rtdb) {
        return { success: false, error: 'Database not available' };
      }

      try {
        // Find rooms that are waiting for players
        const roomsSnapshot = await this.rtdb.ref('rooms')
          .orderByChild('status')
          .equalTo('waiting')
          .once('value');

        const rooms = roomsSnapshot.val() || {};
        
        for (const [roomCode, roomData] of Object.entries(rooms)) {
          // Check if room matches criteria and has space
          if (roomData.difficulty === (options.difficulty || 'intermediate')) {
            const playersSnapshot = await this.rtdb.ref(`rooms/${roomCode}/players`).once('value');
            const playerCount = playersSnapshot.numChildren();
            
            if (playerCount < roomData.maxPlayers) {
              // Found a match!
              return this.joinRoom(roomCode);
            }
          }
        }

        // No match found, create new room
        console.log('No match found, creating new room...');
        return this.createRoom(options);

      } catch (error) {
        console.error('Matchmaking error:', error);
        return { success: false, error: error.message };
      }
    }

    // =========================================================================
    // LEADERBOARD
    // =========================================================================

    async saveToLeaderboard(results) {
      if (!this.db) return;

      try {
        const teamScore = Object.values(results.players || {}).reduce((sum, p) => sum + (p.score || 0), 0);

        await this.db.collection('multiplayer_leaderboard').add({
          roomCode: this.roomId,
          teamScore: teamScore,
          players: results.players,
          duration: results.duration,
          difficulty: results.difficulty,
          completedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      } catch (error) {
        console.error('Error saving to leaderboard:', error);
      }
    }

    async getLeaderboard(limit = 20) {
      if (!this.db) return [];

      try {
        const snapshot = await this.db.collection('multiplayer_leaderboard')
          .orderBy('teamScore', 'desc')
          .limit(limit)
          .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
      }
    }

    // =========================================================================
    // EVENT CALLBACKS (override these in game)
    // =========================================================================

    onPlayersUpdate(players) {
      // Override in game to handle player updates
      if (window.onMultiplayerPlayersUpdate) {
        window.onMultiplayerPlayersUpdate(players);
      }
    }

    onGameStateUpdate(gameState) {
      // Override in game to handle game state updates
      if (window.onMultiplayerGameStateUpdate) {
        window.onMultiplayerGameStateUpdate(gameState);
      }
    }

    onStatusChange(status) {
      // Override in game to handle status changes
      if (window.onMultiplayerStatusChange) {
        window.onMultiplayerStatusChange(status);
      }
    }

    // =========================================================================
    // CHAT
    // =========================================================================

    async sendChat(message) {
      if (!this.rtdb || !this.roomId) return;

      await this.rtdb.ref(`rooms/${this.roomId}/chat`).push({
        playerId: this.playerId,
        playerName: this.playerName,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
    }

    // =========================================================================
    // UTILITY
    // =========================================================================

    getPlayerCount() {
      return Object.keys(this.players).length;
    }

    getOtherPlayers() {
      const others = {};
      for (const [id, player] of Object.entries(this.players)) {
        if (id !== this.playerId) {
          others[id] = player;
        }
      }
      return others;
    }

    isInRoom() {
      return !!this.roomId;
    }

    getRoomCode() {
      return this.roomId;
    }
  }

  // =============================================================================
  // CREATE GLOBAL INSTANCE
  // =============================================================================

  const multiplayer = new MultiplayerManager();
  window.multiplayer = multiplayer;
  window.MultiplayerManager = MultiplayerManager;

  console.log('🌐 Multiplayer System loaded - "For where two or three gather..."');

})();
