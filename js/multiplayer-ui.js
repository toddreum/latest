/**
 * BirdTurds Multiplayer UI v43
 * Room creation, joining, and lobby interface
 */

(function() {
  'use strict';

  class MultiplayerUI {
    constructor() {
      this.isOpen = false;
      this.currentView = 'menu'; // menu, create, join, lobby, matchmaking
    }

    open() {
      this.isOpen = true;
      this.currentView = 'menu';
      this.render();
    }

    close() {
      this.isOpen = false;
      const modal = document.getElementById('multiplayer-modal');
      if (modal) modal.remove();
    }

    render() {
      const existing = document.getElementById('multiplayer-modal');
      if (existing) existing.remove();

      const modal = document.createElement('div');
      modal.id = 'multiplayer-modal';
      modal.innerHTML = this.getModalHTML();
      document.body.appendChild(modal);

      this.attachEventListeners();
    }

    getModalHTML() {
      return `
        <style>
          #multiplayer-modal {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.95); z-index: 99999;
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
          }
          .mp-container {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border-radius: 20px; border: 3px solid #3b82f6;
            max-width: 500px; width: 100%; overflow: hidden;
          }
          .mp-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            padding: 20px; display: flex; justify-content: space-between;
            align-items: center;
          }
          .mp-header h2 { color: #fff; font-size: 22px; margin: 0; }
          .mp-close {
            background: rgba(255,255,255,0.2); border: none; color: #fff;
            width: 36px; height: 36px; border-radius: 50%;
            font-size: 20px; cursor: pointer;
          }
          .mp-content { padding: 25px; }
          .mp-menu-btn {
            width: 100%; padding: 18px; margin-bottom: 12px;
            background: linear-gradient(135deg, #374151, #1f2937);
            border: 2px solid #4b5563; border-radius: 12px;
            color: #fff; font-size: 16px; font-weight: bold;
            cursor: pointer; transition: all 0.3s;
            display: flex; align-items: center; gap: 12px;
          }
          .mp-menu-btn:hover {
            border-color: #3b82f6; transform: translateY(-2px);
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          }
          .mp-menu-btn .icon { font-size: 28px; }
          .mp-menu-btn .desc { font-size: 11px; color: #9ca3af; font-weight: normal; }
          .mp-input {
            width: 100%; padding: 15px; margin-bottom: 12px;
            background: #1f2937; border: 2px solid #374151;
            border-radius: 10px; color: #fff; font-size: 16px;
            text-align: center; letter-spacing: 4px;
            text-transform: uppercase;
          }
          .mp-input:focus { border-color: #3b82f6; outline: none; }
          .mp-input::placeholder { letter-spacing: normal; }
          .mp-btn {
            width: 100%; padding: 15px; border: none;
            border-radius: 10px; font-size: 16px; font-weight: bold;
            cursor: pointer; margin-bottom: 10px;
          }
          .mp-btn-primary {
            background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff;
          }
          .mp-btn-secondary {
            background: #374151; color: #fff;
          }
          .mp-error {
            background: rgba(239,68,68,0.2); border: 1px solid #ef4444;
            color: #fca5a5; padding: 12px; border-radius: 8px;
            margin-bottom: 15px; font-size: 13px; text-align: center;
          }
          .mp-lobby { padding: 20px; }
          .mp-room-code {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            padding: 20px; border-radius: 12px; text-align: center;
            margin-bottom: 20px;
          }
          .mp-room-code .label { color: rgba(255,255,255,0.8); font-size: 12px; }
          .mp-room-code .code {
            color: #fff; font-size: 36px; font-weight: bold;
            letter-spacing: 8px; font-family: monospace;
          }
          .mp-players-list { margin-bottom: 20px; }
          .mp-players-list h3 { color: #fff; font-size: 14px; margin-bottom: 10px; }
          .mp-player {
            background: rgba(255,255,255,0.05); padding: 12px 15px;
            border-radius: 10px; margin-bottom: 8px;
            display: flex; justify-content: space-between; align-items: center;
          }
          .mp-player-name { color: #fff; font-weight: bold; }
          .mp-player-status {
            padding: 4px 10px; border-radius: 20px; font-size: 11px;
          }
          .mp-player-status.ready { background: #22c55e; color: #fff; }
          .mp-player-status.waiting { background: #f59e0b; color: #fff; }
          .mp-player-status.host { background: #3b82f6; color: #fff; }
          .mp-settings {
            background: rgba(0,0,0,0.3); padding: 15px;
            border-radius: 10px; margin-bottom: 20px;
          }
          .mp-settings h4 { color: #9ca3af; font-size: 12px; margin-bottom: 10px; }
          .mp-setting-row {
            display: flex; justify-content: space-between;
            align-items: center; margin-bottom: 8px;
          }
          .mp-setting-row label { color: #e5e7eb; font-size: 13px; }
          .mp-toggle {
            width: 50px; height: 26px; background: #374151;
            border-radius: 13px; position: relative; cursor: pointer;
          }
          .mp-toggle.active { background: #22c55e; }
          .mp-toggle::after {
            content: ''; position: absolute; top: 3px; left: 3px;
            width: 20px; height: 20px; background: #fff;
            border-radius: 50%; transition: left 0.3s;
          }
          .mp-toggle.active::after { left: 27px; }
          .mp-loading {
            text-align: center; padding: 40px;
          }
          .mp-spinner {
            width: 50px; height: 50px; border: 4px solid #374151;
            border-top-color: #3b82f6; border-radius: 50%;
            animation: mp-spin 1s linear infinite;
            margin: 0 auto 15px;
          }
          @keyframes mp-spin { to { transform: rotate(360deg); } }
          .mp-back { color: #60a5fa; cursor: pointer; margin-bottom: 15px; display: block; }
        </style>
        <div class="mp-container">
          <div class="mp-header">
            <h2>🌐 MULTIPLAYER</h2>
            <button class="mp-close" onclick="multiplayerUI.close()">✕</button>
          </div>
          <div class="mp-content" id="mp-view-content">
            ${this.getViewHTML()}
          </div>
        </div>
      `;
    }

    getViewHTML() {
      switch (this.currentView) {
        case 'menu': return this.getMenuHTML();
        case 'create': return this.getCreateHTML();
        case 'join': return this.getJoinHTML();
        case 'lobby': return this.getLobbyHTML();
        case 'matchmaking': return this.getMatchmakingHTML();
        default: return this.getMenuHTML();
      }
    }

    getMenuHTML() {
      return `
        <button class="mp-menu-btn" onclick="multiplayerUI.showCreate()">
          <span class="icon">🎮</span>
          <div>
            <div>CREATE ROOM</div>
            <div class="desc">Start a new game and invite friends</div>
          </div>
        </button>
        <button class="mp-menu-btn" onclick="multiplayerUI.showJoin()">
          <span class="icon">🚪</span>
          <div>
            <div>JOIN ROOM</div>
            <div class="desc">Enter a room code to join friends</div>
          </div>
        </button>
        <button class="mp-menu-btn" onclick="multiplayerUI.quickMatch()">
          <span class="icon">⚡</span>
          <div>
            <div>QUICK MATCH</div>
            <div class="desc">Find a random game to join</div>
          </div>
        </button>
        <div style="margin-top:20px;padding:15px;background:rgba(59,130,246,0.1);border-radius:10px;border:1px solid #3b82f6;">
          <p style="color:#93c5fd;font-size:12px;margin:0;">
            🎯 <strong>Tip:</strong> Up to 4 players can hunt together! 
            Share your room code with friends to team up.
          </p>
        </div>
      `;
    }

    getCreateHTML() {
      return `
        <span class="mp-back" onclick="multiplayerUI.showMenu()">← Back</span>
        <h3 style="color:#fff;margin-bottom:20px;">Create New Room</h3>
        
        <div class="mp-settings">
          <h4>GAME SETTINGS</h4>
          <div class="mp-setting-row">
            <label>Max Players</label>
            <select id="mp-max-players" style="background:#1f2937;border:1px solid #374151;color:#fff;padding:8px;border-radius:6px;">
              <option value="2">2 Players</option>
              <option value="3">3 Players</option>
              <option value="4" selected>4 Players</option>
            </select>
          </div>
          <div class="mp-setting-row">
            <label>Difficulty</label>
            <select id="mp-difficulty" style="background:#1f2937;border:1px solid #374151;color:#fff;padding:8px;border-radius:6px;">
              <option value="beginner">Beginner</option>
              <option value="intermediate" selected>Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div class="mp-setting-row">
            <label>Boss Mode</label>
            <div class="mp-toggle" id="mp-boss-mode" onclick="this.classList.toggle('active')"></div>
          </div>
        </div>
        
        <div id="mp-create-error" class="mp-error" style="display:none;"></div>
        
        <button class="mp-btn mp-btn-primary" onclick="multiplayerUI.createRoom()">
          🎮 CREATE ROOM
        </button>
      `;
    }

    getJoinHTML() {
      return `
        <span class="mp-back" onclick="multiplayerUI.showMenu()">← Back</span>
        <h3 style="color:#fff;margin-bottom:20px;">Join Room</h3>
        
        <p style="color:#9ca3af;font-size:13px;margin-bottom:15px;">
          Enter the 6-character room code shared by your friend:
        </p>
        
        <input type="text" id="mp-room-code" class="mp-input" placeholder="XXXXXX" maxlength="6">
        
        <div id="mp-join-error" class="mp-error" style="display:none;"></div>
        
        <button class="mp-btn mp-btn-primary" onclick="multiplayerUI.joinRoom()">
          🚪 JOIN ROOM
        </button>
      `;
    }

    getLobbyHTML() {
      const mp = window.multiplayer;
      const players = mp?.players || {};
      const roomCode = mp?.roomId || 'XXXXXX';
      const isHost = mp?.isHost || false;

      let playersHTML = '';
      for (const [id, player] of Object.entries(players)) {
        const status = player.isHost ? 'host' : (player.ready ? 'ready' : 'waiting');
        const statusText = player.isHost ? '👑 HOST' : (player.ready ? '✓ READY' : '⏳ WAITING');
        playersHTML += `
          <div class="mp-player">
            <span class="mp-player-name">🎮 ${player.name}</span>
            <span class="mp-player-status ${status}">${statusText}</span>
          </div>
        `;
      }

      const allReady = Object.values(players).every(p => p.ready || p.isHost);
      const canStart = isHost && Object.keys(players).length >= 2 && allReady;

      return `
        <div class="mp-room-code">
          <div class="label">ROOM CODE</div>
          <div class="code">${roomCode}</div>
          <button onclick="navigator.clipboard.writeText('${roomCode}');this.textContent='Copied!'" 
            style="background:rgba(255,255,255,0.2);border:none;color:#fff;padding:8px 16px;border-radius:6px;cursor:pointer;margin-top:10px;">
            📋 Copy Code
          </button>
        </div>
        
        <div class="mp-players-list">
          <h3>👥 PLAYERS (${Object.keys(players).length}/4)</h3>
          ${playersHTML || '<p style="color:#9ca3af;">Waiting for players...</p>'}
        </div>
        
        ${isHost ? `
          <button class="mp-btn mp-btn-primary" onclick="multiplayerUI.startGame()" ${canStart ? '' : 'disabled style="opacity:0.5;cursor:not-allowed;"'}>
            ▶ START GAME
          </button>
          <p style="color:#9ca3af;font-size:11px;text-align:center;">
            ${canStart ? 'All players ready! Click to start.' : 'Waiting for all players to ready up...'}
          </p>
        ` : `
          <button class="mp-btn mp-btn-primary" id="mp-ready-btn" onclick="multiplayerUI.toggleReady()">
            ✓ READY UP
          </button>
        `}
        
        <button class="mp-btn mp-btn-secondary" onclick="multiplayerUI.leaveRoom()">
          🚪 Leave Room
        </button>
      `;
    }

    getMatchmakingHTML() {
      return `
        <div class="mp-loading">
          <div class="mp-spinner"></div>
          <p style="color:#fff;font-size:16px;margin-bottom:10px;">Finding Game...</p>
          <p style="color:#9ca3af;font-size:12px;">Looking for other hunters to team up with</p>
        </div>
        <button class="mp-btn mp-btn-secondary" onclick="multiplayerUI.cancelMatchmaking()">
          Cancel
        </button>
      `;
    }

    // =========================================================================
    // VIEW SWITCHING
    // =========================================================================

    showMenu() {
      this.currentView = 'menu';
      this.updateView();
    }

    showCreate() {
      this.currentView = 'create';
      this.updateView();
    }

    showJoin() {
      this.currentView = 'join';
      this.updateView();
    }

    showLobby() {
      this.currentView = 'lobby';
      this.updateView();
    }

    updateView() {
      const content = document.getElementById('mp-view-content');
      if (content) {
        content.innerHTML = this.getViewHTML();
        this.attachEventListeners();
      }
    }

    attachEventListeners() {
      // Auto-uppercase room code input
      const codeInput = document.getElementById('mp-room-code');
      if (codeInput) {
        codeInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        });
      }
    }

    // =========================================================================
    // ACTIONS
    // =========================================================================

    async createRoom() {
      const maxPlayers = parseInt(document.getElementById('mp-max-players')?.value || 4);
      const difficulty = document.getElementById('mp-difficulty')?.value || 'intermediate';
      const bossMode = document.getElementById('mp-boss-mode')?.classList.contains('active') || false;

      const result = await window.multiplayer.createRoom({
        maxPlayers,
        difficulty,
        bossMode
      });

      if (result.success) {
        this.showLobby();
        this.startLobbyRefresh();
      } else {
        this.showError('mp-create-error', result.error || 'Failed to create room');
      }
    }

    async joinRoom() {
      const code = document.getElementById('mp-room-code')?.value?.trim();
      
      if (!code || code.length !== 6) {
        this.showError('mp-join-error', 'Please enter a valid 6-character room code');
        return;
      }

      const result = await window.multiplayer.joinRoom(code);

      if (result.success) {
        this.showLobby();
        this.startLobbyRefresh();
      } else {
        this.showError('mp-join-error', result.error || 'Failed to join room');
      }
    }

    async quickMatch() {
      this.currentView = 'matchmaking';
      this.updateView();

      const result = await window.multiplayer.findMatch({
        difficulty: 'intermediate'
      });

      if (result.success) {
        this.showLobby();
        this.startLobbyRefresh();
      } else {
        this.showError('mp-join-error', result.error || 'No games found');
        this.showMenu();
      }
    }

    cancelMatchmaking() {
      this.showMenu();
    }

    async toggleReady() {
      const mp = window.multiplayer;
      const player = mp.players[mp.playerId];
      const newReady = !player?.ready;
      
      await mp.setReady(newReady);
      
      const btn = document.getElementById('mp-ready-btn');
      if (btn) {
        btn.textContent = newReady ? '✗ CANCEL READY' : '✓ READY UP';
        btn.style.background = newReady ? '#ef4444' : '';
      }
    }

    async startGame() {
      const success = await window.multiplayer.startGame();
      if (success) {
        this.close();
        // Navigate to play.html or start game
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
          window.location.href = '/play.html?multiplayer=true&room=' + window.multiplayer.roomId;
        } else {
          // Already on play page, start the game
          if (window.startBirdTurdsGame) {
            window.startBirdTurdsGame();
          }
        }
      }
    }

    async leaveRoom() {
      await window.multiplayer.leaveRoom();
      this.stopLobbyRefresh();
      this.showMenu();
    }

    // =========================================================================
    // LOBBY REFRESH
    // =========================================================================

    startLobbyRefresh() {
      this.lobbyInterval = setInterval(() => {
        if (this.currentView === 'lobby') {
          this.updateView();
        }
      }, 1000);
    }

    stopLobbyRefresh() {
      if (this.lobbyInterval) {
        clearInterval(this.lobbyInterval);
        this.lobbyInterval = null;
      }
    }

    // =========================================================================
    // UTILITY
    // =========================================================================

    showError(elementId, message) {
      const el = document.getElementById(elementId);
      if (el) {
        el.textContent = message;
        el.style.display = 'block';
      }
    }
  }

  // =============================================================================
  // GLOBAL INSTANCE
  // =============================================================================

  const multiplayerUI = new MultiplayerUI();
  window.multiplayerUI = multiplayerUI;

  // Override the showMultiplayerModal function
  window.showMultiplayerModal = function() {
    multiplayerUI.open();
  };

  console.log('🌐 Multiplayer UI loaded');

})();
