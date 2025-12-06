// ============================================
// BIRDTURDS v40.5 - SOCIAL SHARING SYSTEM
// Share to social media, earn leaderboard points
// Backend tracking ready
// ============================================

const SocialSystem = {
    // Points for sharing
    points: {
        shareScore: 50,
        shareTestimony: 100,
        shareVerse: 75,
        shareVictory: 100,
        dailyShareBonus: 25,
        firstShare: 200,
        viralBonus: 500  // If shared content gets engagement
    },
    
    // Track shares
    shareHistory: [],
    totalShares: 0,
    
    // Social platforms
    platforms: [
        { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877f2' },
        { id: 'twitter', name: 'X (Twitter)', icon: '🐦', color: '#1da1f2' },
        { id: 'instagram', name: 'Instagram', icon: '📷', color: '#e4405f' },
        { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' },
        { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25d366' },
        { id: 'copy', name: 'Copy Link', icon: '🔗', color: '#666666' }
    ],
    
    // Share templates
    templates: {
        score: {
            text: "🎯 Just scored {score} points in BIRDTURDS! Can you beat me? 🐦💩",
            hashtags: "#BIRDTURDS #Gaming #HighScore"
        },
        testimony: {
            text: "✨ {content}\n\nSharing my testimony from BIRDTURDS - a game that helps you grow! 🙏",
            hashtags: "#Testimony #Faith #BIRDTURDS"
        },
        verse: {
            text: "📖 \"{verse}\" - {reference}\n\nFound this in BIRDTURDS today! 🙏",
            hashtags: "#BibleVerse #Faith #Scripture"
        },
        victory: {
            text: "🏆 Victory Report: {content}\n\nCelebrating wins with BIRDTURDS! 🎉",
            hashtags: "#Victory #Faith #Blessed"
        },
        invite: {
            text: "🎮 Come play BIRDTURDS with me! It's a fun game that also helps you grow spiritually! 🙏🐦",
            hashtags: "#BIRDTURDS #Gaming #Faith"
        },
        devotional: {
            text: "📖 Just completed Day {day} of my devotional plan in BIRDTURDS!\n\n{reflection}\n\n🙏",
            hashtags: "#Devotional #Bible #Faith"
        }
    },
    
    init: function() {
        this.loadHistory();
    },
    
    loadHistory: function() {
        const saved = localStorage.getItem('birdturds_share_history');
        if (saved) {
            const data = JSON.parse(saved);
            this.shareHistory = data.history || [];
            this.totalShares = data.total || 0;
        }
    },
    
    saveHistory: function() {
        localStorage.setItem('birdturds_share_history', JSON.stringify({
            history: this.shareHistory.slice(-100),
            total: this.totalShares
        }));
    },
    
    // Open share dialog
    openShareDialog: function(type, data = {}) {
        const template = this.templates[type];
        if (!template) return;
        
        let text = template.text;
        
        // Replace placeholders
        Object.keys(data).forEach(key => {
            text = text.replace(`{${key}}`, data[key]);
        });
        
        const html = `
            <div class="share-dialog">
                <div class="share-header">
                    <h2>📤 Share & Earn Points!</h2>
                    <button class="close-btn" onclick="SocialSystem.closeDialog()">✕</button>
                </div>
                
                <div class="share-preview">
                    <textarea id="share-text" maxlength="280">${text}</textarea>
                    <div class="char-count"><span id="share-char-count">${text.length}</span>/280</div>
                </div>
                
                <div class="share-hashtags">
                    <label>
                        <input type="checkbox" id="include-hashtags" checked>
                        Include hashtags: ${template.hashtags}
                    </label>
                </div>
                
                <div class="share-platforms">
                    ${this.platforms.map(p => `
                        <button class="platform-btn" style="background: ${p.color}" 
                                onclick="SocialSystem.shareToPlat('${p.id}', '${type}')">
                            ${p.icon} ${p.name}
                        </button>
                    `).join('')}
                </div>
                
                <div class="share-points-preview">
                    Sharing earns you: <strong>+${this.points['share' + type.charAt(0).toUpperCase() + type.slice(1)] || 50} points!</strong>
                </div>
                
                <p class="share-note">
                    Share your faith journey with friends! 🙏
                </p>
            </div>
        `;
        
        this.showOverlay(html);
        
        // Character counter
        document.getElementById('share-text').addEventListener('input', function() {
            document.getElementById('share-char-count').textContent = this.value.length;
        });
    },
    
    shareToPlat: function(platformId, shareType) {
        const text = document.getElementById('share-text').value;
        const includeHashtags = document.getElementById('include-hashtags')?.checked;
        const template = this.templates[shareType];
        
        let fullText = text;
        if (includeHashtags && template?.hashtags) {
            fullText += '\n\n' + template.hashtags;
        }
        
        const url = encodeURIComponent(window.location.origin);
        const encodedText = encodeURIComponent(fullText);
        
        let shareUrl = '';
        
        switch (platformId) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedText}%20${url}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(fullText + '\n\n' + window.location.origin);
                UIManager?.showMessage('Copied to clipboard!', 2000);
                this.recordShare(platformId, shareType);
                return;
            default:
                // For platforms without direct share (Instagram, TikTok)
                navigator.clipboard.writeText(fullText);
                UIManager?.showMessage('Copied! Paste in ' + platformId, 2000);
                this.recordShare(platformId, shareType);
                return;
        }
        
        // Open share window
        window.open(shareUrl, '_blank', 'width=600,height=400');
        
        // Record the share
        this.recordShare(platformId, shareType);
    },
    
    recordShare: function(platform, type) {
        // Calculate points
        let points = this.points.shareScore;
        
        switch (type) {
            case 'testimony':
                points = this.points.shareTestimony;
                break;
            case 'verse':
                points = this.points.shareVerse;
                break;
            case 'victory':
                points = this.points.shareVictory;
                break;
        }
        
        // First share bonus
        if (this.totalShares === 0) {
            points += this.points.firstShare;
        }
        
        // Daily share bonus
        const today = new Date().toDateString();
        const sharedToday = this.shareHistory.some(s => 
            new Date(s.date).toDateString() === today
        );
        if (!sharedToday) {
            points += this.points.dailyShareBonus;
        }
        
        // Record
        this.shareHistory.push({
            platform: platform,
            type: type,
            date: new Date().toISOString(),
            points: points
        });
        this.totalShares++;
        this.saveHistory();
        
        // Award points
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(points, 'Social Share Bonus!');
        }
        
        // Send to backend for leaderboard
        this.sendToBackend({
            action: 'share',
            platform: platform,
            type: type,
            points: points
        });
        
        // Show confirmation
        this.showShareConfirmation(points, platform);
    },
    
    showShareConfirmation: function(points, platform) {
        const html = `
            <div class="share-success">
                <h2>🎉 Shared Successfully!</h2>
                <div class="share-points">+${points} Points!</div>
                <p>Thanks for spreading the word! 🙏</p>
                <div class="share-stats">
                    <span>📤 Total Shares: ${this.totalShares}</span>
                </div>
                <button onclick="SocialSystem.closeDialog()">Continue</button>
            </div>
        `;
        this.showOverlay(html);
    },
    
    // Quick share buttons (for use throughout the game)
    getQuickShareButton: function(type, data) {
        return `
            <button class="quick-share-btn" onclick="SocialSystem.openShareDialog('${type}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">
                📤 Share
            </button>
        `;
    },
    
    // Send data to backend for leaderboard tracking
    sendToBackend: function(data) {
        // In production, this would be an API call
        const payload = {
            ...data,
            playerId: this.getPlayerId(),
            timestamp: new Date().toISOString()
        };
        
        // Store locally for now (backend integration ready)
        const pending = JSON.parse(localStorage.getItem('birdturds_pending_sync') || '[]');
        pending.push(payload);
        localStorage.setItem('birdturds_pending_sync', JSON.stringify(pending.slice(-100)));
        
        // Attempt to sync with backend
        this.syncWithBackend();
    },
    
    syncWithBackend: function() {
        // Backend API integration point
        // In production:
        /*
        fetch('/api/social/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId: this.getPlayerId(),
                shares: pending
            })
        }).then(response => {
            if (response.ok) {
                localStorage.removeItem('birdturds_pending_sync');
            }
        });
        */
        console.log('Backend sync ready - API endpoint needed');
    },
    
    getPlayerId: function() {
        let id = localStorage.getItem('birdturds_player_id');
        if (!id) {
            id = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('birdturds_player_id', id);
        }
        return id;
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('social-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'social-overlay';
            overlay.className = 'social-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeDialog: function() {
        const overlay = document.getElementById('social-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const socialStyles = `
<style>
.social-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 20000;
}
.share-dialog, .share-success {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4ecdc4;
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    color: white;
    text-align: center;
}
.share-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.share-header h2 { color: #ffd700; margin: 0; }
.share-preview textarea {
    width: 100%;
    height: 100px;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(0,0,0,0.3);
    color: white;
    resize: none;
}
.char-count {
    text-align: right;
    color: #888;
    font-size: 0.85em;
}
.share-hashtags {
    margin: 15px 0;
    text-align: left;
}
.share-hashtags label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
.share-platforms {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 20px 0;
}
.platform-btn {
    border: none;
    padding: 12px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.3s;
}
.platform-btn:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
}
.share-points-preview {
    background: rgba(78,205,196,0.2);
    padding: 10px;
    border-radius: 10px;
    margin: 15px 0;
}
.share-points-preview strong { color: #4ecdc4; }
.share-note {
    color: rgba(255,255,255,0.6);
    font-size: 0.9em;
}
.share-success h2 { color: #4ecdc4; }
.share-points {
    font-size: 3em;
    color: #ffd700;
    margin: 20px 0;
}
.share-success button {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 15px 40px;
    border-radius: 25px;
    color: white;
    font-size: 1.1em;
    cursor: pointer;
    margin-top: 20px;
}
.quick-share-btn {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 8px 15px;
    border-radius: 15px;
    color: white;
    cursor: pointer;
    font-size: 0.9em;
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', socialStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = SocialSystem;
}
