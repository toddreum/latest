// ============================================
// BIRDTURDS v40.5 - COMMUNITY BLOG SYSTEM
// Share good deeds, testimonies, earn points
// ============================================

const CommunitySystem = {
    // Point values for community actions
    points: {
        shareGoodDeed: 75,
        shareTestimony: 100,
        sharePrayer: 50,
        shareVerse: 50,
        likePost: 5,
        firstPostBonus: 200,
        dailyShareBonus: 50,
        weeklyStreak: 500
    },
    
    // Categories for sharing
    categories: [
        { id: 'gooddeed', name: '🤝 Good Deed', description: 'Share something kind you did today' },
        { id: 'testimony', name: '✨ Testimony', description: 'Share how God worked in your life' },
        { id: 'prayer', name: '🙏 Prayer Request', description: 'Ask the community to pray with you' },
        { id: 'verse', name: '📖 Favorite Verse', description: 'Share a scripture that encouraged you' },
        { id: 'encouragement', name: '💛 Encouragement', description: 'Lift up another player' }
    ],
    
    // Sample prompts to inspire sharing
    prompts: {
        gooddeed: [
            "Did you help someone today?",
            "Any random acts of kindness?",
            "Did you volunteer or donate?",
            "Did you encourage a friend?",
            "Did you forgive someone?"
        ],
        testimony: [
            "How did God answer a prayer?",
            "What are you thankful for?",
            "How has your faith grown?",
            "What miracle did you witness?",
            "How did God provide for you?"
        ],
        prayer: [
            "What do you need prayer for?",
            "Who can we pray for together?",
            "What burden can we help carry?"
        ],
        verse: [
            "What verse spoke to you today?",
            "What scripture are you memorizing?",
            "What passage gives you strength?"
        ],
        encouragement: [
            "Who deserves recognition?",
            "What player inspired you?",
            "Share some positive words!"
        ]
    },
    
    // Local storage keys
    storageKeys: {
        posts: 'birdturds_community_posts',
        playerPosts: 'birdturds_player_posts',
        streak: 'birdturds_share_streak',
        lastShare: 'birdturds_last_share'
    },
    
    init: function() {
        this.loadFromStorage();
    },
    
    loadFromStorage: function() {
        // Load player's sharing history
        const streak = localStorage.getItem(this.storageKeys.streak);
        this.shareStreak = streak ? parseInt(streak) : 0;
        
        const lastShare = localStorage.getItem(this.storageKeys.lastShare);
        this.lastShareDate = lastShare ? new Date(lastShare) : null;
        
        // Check if streak should reset
        this.checkStreak();
    },
    
    checkStreak: function() {
        if (!this.lastShareDate) return;
        
        const now = new Date();
        const daysSince = Math.floor((now - this.lastShareDate) / (1000 * 60 * 60 * 24));
        
        if (daysSince > 1) {
            // Streak broken
            this.shareStreak = 0;
            localStorage.setItem(this.storageKeys.streak, '0');
        }
    },
    
    // Open the share dialog
    openShareDialog: function(onComplete) {
        this.onShareComplete = onComplete;
        this.renderShareDialog();
    },
    
    renderShareDialog: function() {
        // Get random prompt
        const promptIdx = Math.floor(Math.random() * this.prompts.gooddeed.length);
        
        const dialogHTML = `
            <div class="community-dialog">
                <div class="dialog-header">
                    <h2>🌟 Share & Earn Points!</h2>
                    <button class="close-btn" onclick="CommunitySystem.closeDialog()">✕</button>
                </div>
                
                <div class="share-streak">
                    🔥 Sharing Streak: ${this.shareStreak} days
                    ${this.shareStreak >= 7 ? '(+500 Weekly Bonus!)' : ''}
                </div>
                
                <div class="category-select">
                    <label>What would you like to share?</label>
                    <div class="categories">
                        ${this.categories.map(cat => `
                            <button class="category-btn" data-category="${cat.id}" onclick="CommunitySystem.selectCategory('${cat.id}')">
                                ${cat.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div id="share-form" style="display:none;">
                    <div class="prompt" id="share-prompt"></div>
                    <textarea id="share-content" placeholder="Share your thoughts..." maxlength="500"></textarea>
                    <div class="char-count"><span id="char-count">0</span>/500</div>
                    
                    <div class="share-options">
                        <label>
                            <input type="checkbox" id="share-anonymous"> Share anonymously
                        </label>
                    </div>
                    
                    <div class="point-preview">
                        Points you'll earn: <span id="points-preview">+75</span>
                    </div>
                    
                    <button class="submit-btn" onclick="CommunitySystem.submitShare()">
                        📤 Share & Earn Points!
                    </button>
                </div>
                
                <div class="community-feed" id="community-feed">
                    <h3>💬 Recent Community Posts</h3>
                    <div id="feed-posts">Loading...</div>
                </div>
            </div>
        `;
        
        // Create overlay
        let overlay = document.getElementById('community-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'community-overlay';
            overlay.className = 'community-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = dialogHTML;
        overlay.style.display = 'flex';
        
        // Load feed
        this.loadCommunityFeed();
        
        // Character counter
        const textarea = document.getElementById('share-content');
        if (textarea) {
            textarea.addEventListener('input', function() {
                document.getElementById('char-count').textContent = this.value.length;
            });
        }
    },
    
    selectCategory: function(categoryId) {
        this.selectedCategory = categoryId;
        
        // Show form
        document.getElementById('share-form').style.display = 'block';
        
        // Update prompt
        const prompts = this.prompts[categoryId] || this.prompts.gooddeed;
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        document.getElementById('share-prompt').textContent = prompt;
        
        // Update points preview
        let points = this.points.shareGoodDeed;
        if (categoryId === 'testimony') points = this.points.shareTestimony;
        if (categoryId === 'prayer') points = this.points.sharePrayer;
        if (categoryId === 'verse') points = this.points.shareVerse;
        
        // Add streak bonus
        if (this.shareStreak > 0) {
            points += this.points.dailyShareBonus;
        }
        if (this.shareStreak >= 7 && this.shareStreak % 7 === 0) {
            points += this.points.weeklyStreak;
        }
        
        document.getElementById('points-preview').textContent = `+${points}`;
        
        // Highlight selected category
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.category === categoryId) {
                btn.classList.add('selected');
            }
        });
    },
    
    submitShare: function() {
        const content = document.getElementById('share-content').value.trim();
        const anonymous = document.getElementById('share-anonymous').checked;
        
        if (content.length < 10) {
            alert('Please write at least 10 characters!');
            return;
        }
        
        // Calculate points
        let points = this.calculateSharePoints();
        
        // Create post object
        const post = {
            id: Date.now(),
            category: this.selectedCategory,
            content: content,
            author: anonymous ? 'Anonymous Hunter' : (PlayerSystem?.character || 'Hunter'),
            timestamp: new Date().toISOString(),
            likes: 0
        };
        
        // Save post (would normally go to server)
        this.savePost(post);
        
        // Update streak
        this.updateStreak();
        
        // Award points
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(points, 'Community Share Bonus!');
        }
        
        // Show confirmation
        this.showShareConfirmation(points);
        
        // Callback
        if (this.onShareComplete) {
            this.onShareComplete(points);
        }
    },
    
    calculateSharePoints: function() {
        let points = 0;
        
        // Base points by category
        switch (this.selectedCategory) {
            case 'testimony':
                points = this.points.shareTestimony;
                break;
            case 'prayer':
                points = this.points.sharePrayer;
                break;
            case 'verse':
                points = this.points.shareVerse;
                break;
            default:
                points = this.points.shareGoodDeed;
        }
        
        // First post bonus
        const playerPosts = JSON.parse(localStorage.getItem(this.storageKeys.playerPosts) || '[]');
        if (playerPosts.length === 0) {
            points += this.points.firstPostBonus;
        }
        
        // Daily share bonus
        const today = new Date().toDateString();
        if (this.lastShareDate?.toDateString() !== today) {
            points += this.points.dailyShareBonus;
        }
        
        // Weekly streak bonus
        if (this.shareStreak > 0 && this.shareStreak % 7 === 6) {
            points += this.points.weeklyStreak;
        }
        
        return points;
    },
    
    savePost: function(post) {
        // Save to local storage (in real app, would send to server)
        const posts = JSON.parse(localStorage.getItem(this.storageKeys.posts) || '[]');
        posts.unshift(post);
        
        // Keep last 100 posts
        if (posts.length > 100) {
            posts.pop();
        }
        
        localStorage.setItem(this.storageKeys.posts, JSON.stringify(posts));
        
        // Track player's posts
        const playerPosts = JSON.parse(localStorage.getItem(this.storageKeys.playerPosts) || '[]');
        playerPosts.push(post.id);
        localStorage.setItem(this.storageKeys.playerPosts, JSON.stringify(playerPosts));
    },
    
    updateStreak: function() {
        const today = new Date();
        const todayStr = today.toDateString();
        
        if (this.lastShareDate?.toDateString() !== todayStr) {
            this.shareStreak++;
            localStorage.setItem(this.storageKeys.streak, this.shareStreak.toString());
        }
        
        this.lastShareDate = today;
        localStorage.setItem(this.storageKeys.lastShare, today.toISOString());
    },
    
    showShareConfirmation: function(points) {
        const feedDiv = document.getElementById('community-feed');
        feedDiv.innerHTML = `
            <div class="share-success">
                <h2>✅ Shared Successfully!</h2>
                <div class="points-earned">+${points} Points!</div>
                <p>Thank you for sharing! Your post will encourage others.</p>
                <p>🔥 Current Streak: ${this.shareStreak} days</p>
                <button onclick="CommunitySystem.closeDialog()">Continue Playing</button>
            </div>
        `;
    },
    
    loadCommunityFeed: function() {
        const posts = JSON.parse(localStorage.getItem(this.storageKeys.posts) || '[]');
        const feedDiv = document.getElementById('feed-posts');
        
        if (posts.length === 0) {
            feedDiv.innerHTML = '<p class="no-posts">No posts yet. Be the first to share!</p>';
            return;
        }
        
        // Show last 5 posts
        const recentPosts = posts.slice(0, 5);
        
        feedDiv.innerHTML = recentPosts.map(post => {
            const category = this.categories.find(c => c.id === post.category);
            const timeAgo = this.getTimeAgo(new Date(post.timestamp));
            
            return `
                <div class="feed-post">
                    <div class="post-header">
                        <span class="post-category">${category?.name || '🌟'}</span>
                        <span class="post-author">${post.author}</span>
                        <span class="post-time">${timeAgo}</span>
                    </div>
                    <div class="post-content">${this.escapeHtml(post.content)}</div>
                    <div class="post-actions">
                        <button onclick="CommunitySystem.likePost(${post.id})">
                            ❤️ ${post.likes || 0}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    likePost: function(postId) {
        const posts = JSON.parse(localStorage.getItem(this.storageKeys.posts) || '[]');
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            post.likes = (post.likes || 0) + 1;
            localStorage.setItem(this.storageKeys.posts, JSON.stringify(posts));
            
            // Small point bonus for liking
            if (typeof ScoreSystem !== 'undefined') {
                ScoreSystem.add(this.points.likePost, 'Liked a post!');
            }
            
            // Refresh feed
            this.loadCommunityFeed();
        }
    },
    
    getTimeAgo: function(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
        return date.toLocaleDateString();
    },
    
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    closeDialog: function() {
        const overlay = document.getElementById('community-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
};

// CSS for community dialog
const communityStyles = `
<style>
.community-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    overflow-y: auto;
    padding: 20px;
}
.community-dialog {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 3px solid #ffd700;
    border-radius: 20px;
    padding: 30px;
    max-width: 700px;
    width: 100%;
    color: white;
    max-height: 90vh;
    overflow-y: auto;
}
.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.dialog-header h2 { color: #ffd700; margin: 0; }
.close-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5em;
    cursor: pointer;
}
.share-streak {
    background: rgba(255,215,0,0.2);
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
    color: #ffd700;
}
.categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
    margin: 15px 0;
}
.category-btn {
    background: rgba(255,255,255,0.1);
    border: 2px solid rgba(255,255,255,0.2);
    padding: 15px 10px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
}
.category-btn:hover, .category-btn.selected {
    background: rgba(78,205,196,0.3);
    border-color: #4ecdc4;
}
.prompt {
    color: #4ecdc4;
    font-size: 1.1em;
    margin-bottom: 10px;
    font-style: italic;
}
#share-content {
    width: 100%;
    height: 120px;
    padding: 15px;
    border-radius: 10px;
    border: 2px solid rgba(255,255,255,0.2);
    background: rgba(0,0,0,0.3);
    color: white;
    font-size: 1em;
    resize: none;
}
.char-count {
    text-align: right;
    color: #888;
    margin-top: 5px;
}
.share-options {
    margin: 15px 0;
}
.share-options label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
.point-preview {
    background: rgba(78,205,196,0.2);
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    margin: 15px 0;
}
.point-preview span {
    color: #4ecdc4;
    font-size: 1.3em;
    font-weight: bold;
}
.submit-btn {
    width: 100%;
    background: linear-gradient(145deg, #ffd700, #ffaa00);
    border: none;
    padding: 15px;
    border-radius: 25px;
    font-size: 1.2em;
    font-weight: bold;
    color: #1a1a2e;
    cursor: pointer;
    transition: all 0.3s;
}
.submit-btn:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(255,215,0,0.4);
}
.community-feed {
    margin-top: 30px;
    border-top: 2px solid rgba(255,255,255,0.1);
    padding-top: 20px;
}
.community-feed h3 { color: #ffd700; }
.feed-post {
    background: rgba(0,0,0,0.3);
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0;
}
.post-header {
    display: flex;
    gap: 10px;
    font-size: 0.9em;
    margin-bottom: 10px;
}
.post-category { color: #ffd700; }
.post-author { color: #4ecdc4; }
.post-time { color: #888; margin-left: auto; }
.post-content { line-height: 1.5; }
.post-actions { margin-top: 10px; }
.post-actions button {
    background: none;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 5px 15px;
    border-radius: 15px;
    color: white;
    cursor: pointer;
}
.post-actions button:hover {
    background: rgba(255,107,107,0.2);
}
.share-success {
    text-align: center;
    padding: 30px;
}
.share-success h2 { color: #4ecdc4; }
.points-earned {
    font-size: 2.5em;
    color: #ffd700;
    margin: 20px 0;
}
.share-success button {
    background: #ffd700;
    color: #1a1a2e;
    border: none;
    padding: 15px 40px;
    border-radius: 25px;
    font-size: 1.2em;
    cursor: pointer;
    margin-top: 20px;
}
.no-posts {
    text-align: center;
    color: #888;
    padding: 30px;
}
</style>
`;

// Inject styles
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', communityStyles);
    });
}

// Export
if (typeof module !== 'undefined') {
    module.exports = CommunitySystem;
}
