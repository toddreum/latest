// ============================================
// BIRDTURDS v40.5 - NEWS & ARTICLES SYSTEM
// Curated content on wellness, faith, balance
// Frontend display with backend content management
// ============================================

const NewsSystem = {
    // Article categories
    categories: [
        { id: 'wellness', name: '🌿 Wellness', color: '#4ecdc4' },
        { id: 'faith', name: '✝️ Faith', color: '#ffd700' },
        { id: 'gaming', name: '🎮 Gaming Balance', color: '#ff6b6b' },
        { id: 'nutrition', name: '🍎 Nutrition', color: '#7bed9f' },
        { id: 'sleep', name: '😴 Sleep', color: '#a29bfe' },
        { id: 'exercise', name: '💪 Exercise', color: '#fd79a8' }
    ],
    
    // Curated articles (in production, fetched from backend)
    articles: [
        // GAMING BALANCE
        {
            id: 1,
            category: 'gaming',
            title: 'When Gaming Becomes an Escape',
            summary: 'How to recognize when gaming is helping you vs. hurting you',
            content: `
                <h3>Signs Gaming Might Be an Escape</h3>
                <p>Gaming is a wonderful hobby, but it becomes problematic when:</p>
                <ul>
                    <li>You play to avoid dealing with problems</li>
                    <li>Real life feels less interesting than games</li>
                    <li>You neglect responsibilities to play</li>
                    <li>You feel empty or anxious when not playing</li>
                    <li>Gaming replaces real relationships</li>
                </ul>
                
                <h3>Healthy vs. Unhealthy Gaming</h3>
                <p><strong>Healthy:</strong> Gaming as one of many hobbies, social gaming with friends, 
                taking breaks, maintaining responsibilities.</p>
                <p><strong>Unhealthy:</strong> Gaming as only hobby, isolation, ignoring needs, 
                using games to numb emotions.</p>
                
                <h3>What To Do</h3>
                <ol>
                    <li>Be honest with yourself about why you play</li>
                    <li>Set reasonable time limits</li>
                    <li>Address the issues you're avoiding</li>
                    <li>Build other interests and relationships</li>
                    <li>Talk to someone you trust</li>
                    <li>Seek professional help if needed</li>
                </ol>
                
                <blockquote>
                    "Everything is permissible for me, but not everything is beneficial." - 1 Corinthians 10:23
                </blockquote>
            `,
            readTime: 4,
            featured: true
        },
        {
            id: 2,
            category: 'gaming',
            title: 'Gaming as an Idol: A Faith Perspective',
            summary: 'What does the Bible say about putting anything before God?',
            content: `
                <h3>What is an Idol?</h3>
                <p>An idol is anything that takes God's rightful place in our hearts. 
                It doesn't have to be a statue - it can be money, relationships, success, or yes, gaming.</p>
                
                <h3>Signs Gaming Has Become an Idol</h3>
                <ul>
                    <li>You think about gaming constantly</li>
                    <li>Gaming brings more joy than time with God</li>
                    <li>You sacrifice spiritual disciplines to play</li>
                    <li>Your identity is wrapped up in gaming</li>
                    <li>You feel you "need" to play</li>
                </ul>
                
                <h3>Finding Balance</h3>
                <p>Gaming isn't inherently sinful - it's about priorities. Ask yourself:</p>
                <ul>
                    <li>Do I spend more time gaming than with God?</li>
                    <li>Does gaming help me or hurt my walk with Christ?</li>
                    <li>Could I give it up if God asked?</li>
                </ul>
                
                <h3>Practical Steps</h3>
                <ol>
                    <li>Pray before playing - invite God into your gaming</li>
                    <li>Set a timer and honor it</li>
                    <li>Read your Bible first, game second</li>
                    <li>Fast from gaming periodically</li>
                    <li>Use gaming to connect with others</li>
                </ol>
                
                <blockquote>
                    "You shall have no other gods before me." - Exodus 20:3
                </blockquote>
            `,
            readTime: 5,
            featured: true
        },
        
        // NUTRITION
        {
            id: 3,
            category: 'nutrition',
            title: 'Brain Food: Eating for Focus & Energy',
            summary: 'The best foods to fuel your mind while gaming',
            content: `
                <h3>Foods That Boost Brain Power</h3>
                <p><strong>Omega-3 Rich Foods:</strong></p>
                <ul>
                    <li>Salmon, tuna, sardines</li>
                    <li>Walnuts, flaxseeds, chia seeds</li>
                    <li>Great for memory and focus</li>
                </ul>
                
                <p><strong>Antioxidant Berries:</strong></p>
                <ul>
                    <li>Blueberries (best for brain!)</li>
                    <li>Strawberries, raspberries</li>
                    <li>Protect brain cells</li>
                </ul>
                
                <p><strong>Complex Carbs:</strong></p>
                <ul>
                    <li>Whole grains, oatmeal</li>
                    <li>Sweet potatoes</li>
                    <li>Steady energy release</li>
                </ul>
                
                <h3>Gaming Snacks to AVOID</h3>
                <ul>
                    <li>Sugary drinks - crash later</li>
                    <li>Candy - quick spike, quick drop</li>
                    <li>Chips - no real nutrition</li>
                    <li>Energy drinks - caffeine overload</li>
                </ul>
                
                <h3>Better Snack Choices</h3>
                <ul>
                    <li>Nuts (almonds, walnuts)</li>
                    <li>Dark chocolate (small amount)</li>
                    <li>Greek yogurt</li>
                    <li>Apple slices with peanut butter</li>
                    <li>Cheese and whole grain crackers</li>
                </ul>
                
                <blockquote>
                    "So whether you eat or drink or whatever you do, do it all for the glory of God." - 1 Corinthians 10:31
                </blockquote>
            `,
            readTime: 4
        },
        
        // SLEEP
        {
            id: 4,
            category: 'sleep',
            title: 'Sleep & Gaming: Breaking the Cycle',
            summary: 'How to stop sacrificing sleep for "one more game"',
            content: `
                <h3>The Gaming-Sleep Problem</h3>
                <p>We've all been there: "Just one more game..." and suddenly it's 2 AM. 
                Here's why this matters:</p>
                <ul>
                    <li>Screen blue light suppresses melatonin</li>
                    <li>Exciting games activate stress response</li>
                    <li>Sleep debt affects everything - focus, mood, health</li>
                    <li>Poor sleep actually hurts gaming performance!</li>
                </ul>
                
                <h3>The Science of Sleep</h3>
                <p>Adults need 7-9 hours per night. Less than this causes:</p>
                <ul>
                    <li>Slower reaction time</li>
                    <li>Worse decision making</li>
                    <li>Mood problems</li>
                    <li>Weakened immune system</li>
                    <li>Weight gain</li>
                </ul>
                
                <h3>Practical Tips</h3>
                <ol>
                    <li><strong>Set an alarm</strong> - Not to wake up, but to stop gaming</li>
                    <li><strong>Stop 1 hour before bed</strong> - Do something calming</li>
                    <li><strong>Use blue light filters</strong> - Night mode on devices</li>
                    <li><strong>Keep a consistent schedule</strong> - Even weekends</li>
                    <li><strong>Make your room a sleep sanctuary</strong> - Dark, cool, quiet</li>
                </ol>
                
                <h3>A Bedtime Routine</h3>
                <ol>
                    <li>Stop gaming 1 hour before bed</li>
                    <li>Dim the lights</li>
                    <li>Read a book or Bible</li>
                    <li>Pray - give the day to God</li>
                    <li>Practice gratitude</li>
                </ol>
                
                <blockquote>
                    "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety." - Psalm 4:8
                </blockquote>
            `,
            readTime: 5,
            featured: true
        },
        
        // EXERCISE
        {
            id: 5,
            category: 'exercise',
            title: 'Gamer Fitness: Staying Active',
            summary: 'Simple exercises for people who spend hours gaming',
            content: `
                <h3>Why Gamers Need to Move</h3>
                <p>Extended sitting leads to:</p>
                <ul>
                    <li>Back and neck pain</li>
                    <li>Carpal tunnel syndrome</li>
                    <li>Eye strain</li>
                    <li>Weight gain</li>
                    <li>Cardiovascular issues</li>
                </ul>
                
                <h3>Between-Game Exercises (2-5 min)</h3>
                <p><strong>Neck Stretches:</strong> Tilt head side to side, hold 15 seconds each.</p>
                <p><strong>Shoulder Rolls:</strong> 10 forward, 10 backward.</p>
                <p><strong>Wrist Circles:</strong> 10 each direction, both hands.</p>
                <p><strong>Stand & Stretch:</strong> Reach high, then touch toes.</p>
                
                <h3>Gaming Break Workout (10 min)</h3>
                <ol>
                    <li>20 jumping jacks</li>
                    <li>10 squats</li>
                    <li>10 push-ups (or wall push-ups)</li>
                    <li>30-second plank</li>
                    <li>20 high knees</li>
                    <li>Repeat once</li>
                </ol>
                
                <h3>Daily Movement Goals</h3>
                <ul>
                    <li>Walk 10,000 steps (or start with 5,000)</li>
                    <li>Take stairs instead of elevator</li>
                    <li>Stand every hour</li>
                    <li>Consider a standing desk</li>
                </ul>
                
                <blockquote>
                    "Do you not know that your bodies are temples of the Holy Spirit?" - 1 Corinthians 6:19
                </blockquote>
            `,
            readTime: 4
        },
        
        // FAITH
        {
            id: 6,
            category: 'faith',
            title: 'Using Gaming Time for God',
            summary: 'How to honor God in your gaming habits',
            content: `
                <h3>Gaming as Stewardship</h3>
                <p>God has given us time, energy, and resources. How we use them matters - including our leisure time.</p>
                
                <h3>Questions to Consider</h3>
                <ul>
                    <li>Does my gaming glorify God?</li>
                    <li>Am I a good witness to other gamers?</li>
                    <li>Do the games I play align with my values?</li>
                    <li>Is my gaming time reasonable?</li>
                </ul>
                
                <h3>Ways to Honor God While Gaming</h3>
                <ol>
                    <li><strong>Pray first</strong> - Invite God into your time</li>
                    <li><strong>Be a light</strong> - Show grace to other players</li>
                    <li><strong>Watch your words</strong> - No rage, cursing, or toxicity</li>
                    <li><strong>Include others</strong> - Use gaming to build relationships</li>
                    <li><strong>Share your faith</strong> - When appropriate</li>
                    <li><strong>Set limits</strong> - Honor other responsibilities</li>
                </ol>
                
                <h3>Games That Build Faith</h3>
                <p>Consider playing games that:</p>
                <ul>
                    <li>Teach biblical stories</li>
                    <li>Encourage positive values</li>
                    <li>Build community</li>
                    <li>Like BIRDTURDS - combine fun with faith! 😉</li>
                </ul>
                
                <blockquote>
                    "Whatever you do, work at it with all your heart, as working for the Lord." - Colossians 3:23
                </blockquote>
            `,
            readTime: 4,
            featured: true
        },
        
        // WELLNESS
        {
            id: 7,
            category: 'wellness',
            title: 'Mental Health & Gaming',
            summary: 'The connection between how we play and how we feel',
            content: `
                <h3>Gaming Can Be Good for Mental Health</h3>
                <ul>
                    <li>Stress relief and relaxation</li>
                    <li>Social connection with friends</li>
                    <li>Sense of achievement</li>
                    <li>Problem-solving skills</li>
                    <li>Creative expression</li>
                </ul>
                
                <h3>When Gaming Hurts Mental Health</h3>
                <ul>
                    <li>Isolation from real relationships</li>
                    <li>Escaping problems instead of facing them</li>
                    <li>Sleep deprivation</li>
                    <li>Comparison and competition anxiety</li>
                    <li>Toxic gaming communities</li>
                </ul>
                
                <h3>Warning Signs</h3>
                <ul>
                    <li>Gaming to numb feelings</li>
                    <li>Increased anxiety or depression</li>
                    <li>Anger when you can't play</li>
                    <li>Lying about how much you play</li>
                    <li>Neglecting self-care</li>
                </ul>
                
                <h3>Getting Help</h3>
                <p>If you're struggling, please reach out:</p>
                <ul>
                    <li>Talk to a trusted friend or family member</li>
                    <li>Speak with a pastor or counselor</li>
                    <li>National Suicide Prevention: 988</li>
                    <li>Crisis Text Line: Text HOME to 741741</li>
                </ul>
                
                <blockquote>
                    "Cast all your anxiety on him because he cares for you." - 1 Peter 5:7
                </blockquote>
            `,
            readTime: 5,
            featured: true
        }
    ],
    
    // Track read articles
    readArticles: [],
    
    init: function() {
        this.loadProgress();
    },
    
    loadProgress: function() {
        const saved = localStorage.getItem('birdturds_read_articles');
        if (saved) {
            this.readArticles = JSON.parse(saved);
        }
    },
    
    saveProgress: function() {
        localStorage.setItem('birdturds_read_articles', JSON.stringify(this.readArticles));
    },
    
    // Open news hub
    openNewsHub: function() {
        const featured = this.articles.filter(a => a.featured);
        
        const html = `
            <div class="news-hub">
                <div class="news-header">
                    <h2>📰 Wellness News & Articles</h2>
                    <button class="close-btn" onclick="NewsSystem.closeNews()">✕</button>
                </div>
                
                <div class="news-categories">
                    <button class="cat-btn active" onclick="NewsSystem.filterCategory('all')">All</button>
                    ${this.categories.map(c => `
                        <button class="cat-btn" style="--cat-color: ${c.color}" 
                                onclick="NewsSystem.filterCategory('${c.id}')">${c.name}</button>
                    `).join('')}
                </div>
                
                <div class="featured-section">
                    <h3>⭐ Featured</h3>
                    <div class="featured-articles">
                        ${featured.slice(0, 3).map(a => this.renderArticleCard(a)).join('')}
                    </div>
                </div>
                
                <div class="all-articles" id="articles-container">
                    <h3>📚 All Articles</h3>
                    <div class="articles-grid">
                        ${this.articles.map(a => this.renderArticleCard(a)).join('')}
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    renderArticleCard: function(article) {
        const category = this.categories.find(c => c.id === article.category);
        const isRead = this.readArticles.includes(article.id);
        
        return `
            <div class="article-card ${isRead ? 'read' : ''}" onclick="NewsSystem.openArticle(${article.id})">
                <span class="article-category" style="background: ${category?.color || '#666'}">${category?.name || ''}</span>
                <h4>${article.title}</h4>
                <p>${article.summary}</p>
                <span class="read-time">📖 ${article.readTime} min read</span>
                ${isRead ? '<span class="read-badge">✓ Read</span>' : ''}
            </div>
        `;
    },
    
    filterCategory: function(categoryId) {
        const filtered = categoryId === 'all' 
            ? this.articles 
            : this.articles.filter(a => a.category === categoryId);
        
        document.getElementById('articles-container').innerHTML = `
            <h3>📚 ${categoryId === 'all' ? 'All Articles' : this.categories.find(c => c.id === categoryId)?.name}</h3>
            <div class="articles-grid">
                ${filtered.map(a => this.renderArticleCard(a)).join('')}
            </div>
        `;
        
        // Update active button
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    },
    
    openArticle: function(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;
        
        const category = this.categories.find(c => c.id === article.category);
        
        const html = `
            <div class="article-view">
                <div class="article-header">
                    <button onclick="NewsSystem.openNewsHub()">← Back</button>
                    <span class="article-category" style="background: ${category?.color}">${category?.name}</span>
                </div>
                
                <h1>${article.title}</h1>
                <p class="article-meta">📖 ${article.readTime} min read</p>
                
                <div class="article-content">
                    ${article.content}
                </div>
                
                <div class="article-actions">
                    <button onclick="SocialSystem.openShareDialog('article', {title: '${article.title}'})">
                        📤 Share This Article
                    </button>
                    <button onclick="NewsSystem.openNewsHub()">
                        📚 More Articles
                    </button>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
        
        // Mark as read
        if (!this.readArticles.includes(articleId)) {
            this.readArticles.push(articleId);
            this.saveProgress();
            
            // Points for reading
            if (typeof ScoreSystem !== 'undefined') {
                ScoreSystem.add(25, 'Article Read!');
            }
        }
    },
    
    // Get a random tip to show
    getRandomArticleTip: function() {
        const article = this.articles[Math.floor(Math.random() * this.articles.length)];
        return {
            title: article.title,
            summary: article.summary,
            id: article.id
        };
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('news-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'news-overlay';
            overlay.className = 'news-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeNews: function() {
        const overlay = document.getElementById('news-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const newsStyles = `
<style>
.news-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95);
    display: none;
    justify-content: center;
    align-items: flex-start;
    z-index: 20000;
    overflow-y: auto;
    padding: 20px;
}
.news-hub, .article-view {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4ecdc4;
    border-radius: 20px;
    padding: 25px;
    max-width: 900px;
    width: 100%;
    color: white;
    margin: 20px auto;
}
.news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.news-header h2 { color: #ffd700; margin: 0; }
.news-categories {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 25px;
}
.cat-btn {
    background: rgba(255,255,255,0.1);
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
}
.cat-btn.active, .cat-btn:hover {
    background: var(--cat-color, #4ecdc4);
    color: #1a1a2e;
}
.featured-articles, .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 15px 0;
}
.article-card {
    background: rgba(255,255,255,0.1);
    border-radius: 15px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}
.article-card:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.15);
}
.article-card.read {
    opacity: 0.7;
}
.article-category {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 10px;
    font-size: 0.8em;
    margin-bottom: 10px;
}
.article-card h4 {
    color: #ffd700;
    margin-bottom: 10px;
}
.article-card p {
    color: rgba(255,255,255,0.8);
    font-size: 0.9em;
    line-height: 1.4;
}
.read-time {
    display: block;
    margin-top: 10px;
    color: rgba(255,255,255,0.5);
    font-size: 0.85em;
}
.read-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #4ecdc4;
    color: #1a1a2e;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.8em;
}
.article-view h1 {
    color: #ffd700;
    margin: 20px 0;
}
.article-meta {
    color: rgba(255,255,255,0.6);
    margin-bottom: 25px;
}
.article-content {
    line-height: 1.8;
}
.article-content h3 {
    color: #4ecdc4;
    margin: 25px 0 15px;
}
.article-content ul, .article-content ol {
    margin-left: 20px;
    margin-bottom: 15px;
}
.article-content li {
    margin-bottom: 8px;
}
.article-content blockquote {
    background: rgba(255,255,200,0.1);
    border-left: 4px solid #ffd700;
    padding: 15px 20px;
    margin: 20px 0;
    font-style: italic;
}
.article-actions {
    display: flex;
    gap: 10px;
    margin-top: 30px;
    flex-wrap: wrap;
}
.article-actions button {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 12px 25px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
.featured-section h3, .all-articles h3 {
    color: #ffd700;
    margin-bottom: 15px;
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', newsStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = NewsSystem;
}
