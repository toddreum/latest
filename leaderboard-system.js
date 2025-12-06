// ============================================
// BIRDTURDS v40.5 - LEADERBOARD SYSTEM
// Global leaderboards with backend tracking
// Multiple categories for different achievements
// ============================================

const LeaderboardSystem = {
    // Leaderboard categories
    categories: [
        { id: 'score', name: '🏆 High Score', description: 'Highest single game score' },
        { id: 'total', name: '📊 Total Points', description: 'All-time points earned' },
        { id: 'spiritual', name: '🙏 Faith Points', description: 'Prayer, devotional, scripture points' },
        { id: 'wellness', name: '🌿 Wellness Score', description: 'Health and balance points' },
        { id: 'social', name: '📤 Social Impact', description: 'Shares, testimonies, encouragement' },
        { id: 'streak', name: '🔥 Longest Streak', description: 'Consecutive days active' }
    ],
    
    // Player data
    playerId: null,
    playerName: null,
    playerScores: {},
    
    // Cached leaderboard data
    leaderboards: {},
    lastFetch: null,
    
    // Backend API (configure for your server)
    apiEndpoint: '/api/leaderboard',
    
    init: function() {
        this.loadPlayerData();
        this.fetchLeaderboards();
    },
    
    loadPlayerData: function() {
        const saved = localStorage.getItem('birdturds_player');
        if (saved) {
            const data = JSON.parse(saved);
            this.playerId = data.id;
            this.playerName = data.name;
            this.playerScores = data.scores || {};
        } else {
            // Generate new player ID
            this.playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            this.playerName = 'Anonymous Hunter';
            this.savePlayerData();
        }
    },
    
    savePlayerData: function() {
        localStorage.setItem('birdturds_player', JSON.stringify({
            id: this.playerId,
            name: this.playerName,
            scores: this.playerScores
        }));
    },
    
    // Set player name
    setPlayerName: function(name) {
        this.playerName = name.substring(0, 20).replace(/[<>]/g, '');
        this.savePlayerData();
        this.syncToBackend();
    },
    
    // Update a score
    updateScore: function(category, score, add = false) {
        if (!this.playerScores[category]) {
            this.playerScores[category] = 0;
        }
        
        if (add) {
            this.playerScores[category] += score;
        } else {
            // Only update if new high score
            if (score > this.playerScores[category]) {
                this.playerScores[category] = score;
            }
        }
        
        this.savePlayerData();
        this.syncToBackend();
    },
    
    // Sync player data to backend
    syncToBackend: function() {
        const payload = {
            playerId: this.playerId,
            playerName: this.playerName,
            scores: this.playerScores,
            timestamp: new Date().toISOString()
        };
        
        // Store for sync
        const pending = JSON.parse(localStorage.getItem('birdturds_pending_leaderboard') || '[]');
        pending.push(payload);
        localStorage.setItem('birdturds_pending_leaderboard', JSON.stringify(pending.slice(-10)));
        
        // In production, this would be an API call:
        /*
        fetch(this.apiEndpoint + '/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                localStorage.removeItem('birdturds_pending_leaderboard');
            }
        });
        */
        
        console.log('Leaderboard sync ready - API endpoint:', this.apiEndpoint);
    },
    
    // Fetch leaderboards from backend
    fetchLeaderboards: function() {
        // In production, fetch from API
        /*
        fetch(this.apiEndpoint + '/all')
            .then(response => response.json())
            .then(data => {
                this.leaderboards = data;
                this.lastFetch = Date.now();
            });
        */
        
        // For now, use mock data
        this.leaderboards = this.getMockLeaderboards();
        this.lastFetch = Date.now();
    },
    
    getMockLeaderboards: function() {
        // Mock data for demo
        const mockNames = [
            'BirdSlayer99', 'HolyHunter', 'FaithfulShot', 'GracefulAim',
            'PraiseAndShoot', 'BlessedBarrel', 'SpiritSniper', 'DivineDuck',
            'AngelAimer', 'GospelGunner'
        ];
        
        const generateScores = (max) => {
            return mockNames.map((name, i) => ({
                rank: i + 1,
                playerId: 'mock_' + i,
                playerName: name,
                score: Math.floor(max * (1 - i * 0.08) + Math.random() * 100)
            }));
        };
        
        return {
            score: generateScores(50000),
            total: generateScores(500000),
            spiritual: generateScores(10000),
            wellness: generateScores(5000),
            social: generateScores(3000),
            streak: mockNames.map((name, i) => ({
                rank: i + 1,
                playerId: 'mock_' + i,
                playerName: name,
                score: Math.floor(100 - i * 8)
            }))
        };
    },
    
    // Open leaderboard UI
    openLeaderboard: function(category = 'score') {
        const html = `
            <div class="leaderboard-container">
                <div class="leaderboard-header">
                    <h2>🏆 Leaderboards</h2>
                    <button class="close-btn" onclick="LeaderboardSystem.closeLeaderboard()">✕</button>
                </div>
                
                <div class="leaderboard-player">
                    <div class="player-name">
                        <span>Playing as:</span>
                        <input type="text" id="player-name-input" value="${this.playerName}" 
                               onchange="LeaderboardSystem.setPlayerName(this.value)" maxlength="20">
                    </div>
                    <div class="player-rank" id="player-rank">
                        Loading your rank...
                    </div>
                </div>
                
                <div class="leaderboard-tabs">
                    ${this.categories.map(cat => `
                        <button class="lb-tab ${cat.id === category ? 'active' : ''}" 
                                onclick="LeaderboardSystem.showCategory('${cat.id}')">
                            ${cat.name}
                        </button>
                    `).join('')}
                </div>
                
                <div class="leaderboard-content" id="leaderboard-content">
                    ${this.renderLeaderboard(category)}
                </div>
                
                <div class="leaderboard-footer">
                    <button onclick="LeaderboardSystem.refreshLeaderboards()">🔄 Refresh</button>
                    <span>Last updated: ${this.lastFetch ? new Date(this.lastFetch).toLocaleTimeString() : 'Never'}</span>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
        this.updatePlayerRank(category);
    },
    
    showCategory: function(category) {
        // Update tabs
        document.querySelectorAll('.lb-tab').forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update content
        document.getElementById('leaderboard-content').innerHTML = this.renderLeaderboard(category);
        this.updatePlayerRank(category);
    },
    
    renderLeaderboard: function(category) {
        const data = this.leaderboards[category] || [];
        const catInfo = this.categories.find(c => c.id === category);
        
        if (data.length === 0) {
            return `<p class="no-data">No scores yet. Be the first!</p>`;
        }
        
        return `
            <div class="leaderboard-list">
                <div class="lb-header-row">
                    <span class="lb-rank">Rank</span>
                    <span class="lb-name">Player</span>
                    <span class="lb-score">${catInfo?.name.split(' ')[1] || 'Score'}</span>
                </div>
                ${data.slice(0, 20).map(entry => `
                    <div class="lb-row ${entry.playerId === this.playerId ? 'is-you' : ''} ${entry.rank <= 3 ? 'top-3' : ''}">
                        <span class="lb-rank">
                            ${entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                        </span>
                        <span class="lb-name">${entry.playerName}</span>
                        <span class="lb-score">${this.formatScore(entry.score)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    updatePlayerRank: function(category) {
        const data = this.leaderboards[category] || [];
        const myScore = this.playerScores[category] || 0;
        
        // Find player's rank
        let rank = data.findIndex(e => e.playerId === this.playerId);
        if (rank === -1) {
            rank = data.filter(e => e.score > myScore).length + 1;
        } else {
            rank += 1;
        }
        
        const rankDiv = document.getElementById('player-rank');
        if (rankDiv) {
            rankDiv.innerHTML = `
                <span>Your ${this.categories.find(c => c.id === category)?.name || 'Score'}: 
                <strong>${this.formatScore(myScore)}</strong></span>
                <span>Rank: <strong>#${rank}</strong></span>
            `;
        }
    },
    
    formatScore: function(score) {
        if (score >= 1000000) return (score / 1000000).toFixed(1) + 'M';
        if (score >= 1000) return (score / 1000).toFixed(1) + 'K';
        return score.toString();
    },
    
    refreshLeaderboards: function() {
        UIManager?.showMessage('Refreshing leaderboards...', 1500);
        this.fetchLeaderboards();
        setTimeout(() => {
            this.openLeaderboard();
        }, 500);
    },
    
    // Get player's rank in a category
    getPlayerRank: function(category) {
        const data = this.leaderboards[category] || [];
        const myScore = this.playerScores[category] || 0;
        return data.filter(e => e.score > myScore).length + 1;
    },
    
    // Submit a score (called from game systems)
    submitScore: function(category, score) {
        this.updateScore(category, score);
        
        // Check for leaderboard achievements
        const rank = this.getPlayerRank(category);
        
        if (rank <= 10) {
            UIManager?.showMessage(`🏆 Top 10 in ${category}!`, 3000);
        } else if (rank <= 50) {
            UIManager?.showMessage(`📈 Top 50 in ${category}!`, 2000);
        }
    },
    
    // Integration with other systems
    recordGameScore: function(score) {
        this.submitScore('score', score);
        this.updateScore('total', score, true);
    },
    
    recordSpiritualPoints: function(points) {
        this.updateScore('spiritual', points, true);
    },
    
    recordWellnessPoints: function(points) {
        this.updateScore('wellness', points, true);
    },
    
    recordSocialPoints: function(points) {
        this.updateScore('social', points, true);
    },
    
    recordStreak: function(days) {
        this.updateScore('streak', days);
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('leaderboard-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'leaderboard-overlay';
            overlay.className = 'leaderboard-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeLeaderboard: function() {
        const overlay = document.getElementById('leaderboard-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const leaderboardStyles = `
<style>
.leaderboard-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 20000;
}
.leaderboard-container {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ffd700;
    border-radius: 20px;
    padding: 25px;
    max-width: 700px;
    width: 95%;
    color: white;
    max-height: 90vh;
    overflow-y: auto;
}
.leaderboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.leaderboard-header h2 { color: #ffd700; margin: 0; }
.leaderboard-player {
    background: rgba(255,255,255,0.1);
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}
.player-name {
    display: flex;
    align-items: center;
    gap: 10px;
}
.player-name input {
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.3);
    padding: 8px 12px;
    border-radius: 10px;
    color: white;
    font-size: 1em;
}
.player-rank {
    display: flex;
    gap: 20px;
    color: #ffd700;
}
.leaderboard-tabs {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}
.lb-tab {
    background: rgba(255,255,255,0.1);
    border: none;
    padding: 8px 12px;
    border-radius: 15px;
    color: white;
    cursor: pointer;
    font-size: 0.85em;
    transition: all 0.3s;
}
.lb-tab.active, .lb-tab:hover {
    background: #ffd700;
    color: #1a1a2e;
}
.leaderboard-list {
    background: rgba(0,0,0,0.3);
    border-radius: 15px;
    overflow: hidden;
}
.lb-header-row {
    display: grid;
    grid-template-columns: 60px 1fr 100px;
    padding: 12px 15px;
    background: rgba(255,215,0,0.2);
    font-weight: bold;
    color: #ffd700;
}
.lb-row {
    display: grid;
    grid-template-columns: 60px 1fr 100px;
    padding: 12px 15px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s;
}
.lb-row:hover {
    background: rgba(255,255,255,0.1);
}
.lb-row.is-you {
    background: rgba(78,205,196,0.2);
    border-left: 4px solid #4ecdc4;
}
.lb-row.top-3 {
    background: rgba(255,215,0,0.1);
}
.lb-rank {
    font-weight: bold;
    text-align: center;
}
.lb-score {
    text-align: right;
    font-weight: bold;
    color: #4ecdc4;
}
.leaderboard-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid rgba(255,255,255,0.1);
}
.leaderboard-footer button {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 10px 20px;
    border-radius: 15px;
    color: white;
    cursor: pointer;
}
.leaderboard-footer span {
    color: rgba(255,255,255,0.5);
    font-size: 0.85em;
}
.no-data {
    text-align: center;
    padding: 40px;
    color: rgba(255,255,255,0.5);
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', leaderboardStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = LeaderboardSystem;
}
