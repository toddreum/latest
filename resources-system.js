// ============================================
// BIRDTURDS v40.5 - RESOURCES SYSTEM
// Gaming testimonies, youth group guidance
// Curated videos, auto-updating content
// ============================================

const ResourcesSystem = {
    // Gaming Addiction & Recovery Videos
    gamingTestimonies: [
        {
            id: 1,
            title: "I Was Addicted to Video Games - My Testimony",
            youtubeId: "Y5gPpw5z3nI",
            category: "testimony",
            summary: "A powerful story of how gaming addiction took over one young man's life, leading to isolation, failed relationships, and depression - until he found freedom through Christ.",
            tags: ["addiction", "testimony", "freedom"]
        },
        {
            id: 2,
            title: "How God Delivered Me from Gaming Addiction",
            youtubeId: "q3nh8fhxQUM",
            category: "testimony",
            summary: "This testimony shares the dark path of excessive gaming - skipping school, lying to parents, losing friends - and how God's love brought restoration and purpose.",
            tags: ["deliverance", "testimony", "hope"]
        },
        {
            id: 3,
            title: "From Pro Gamer to Pastor - My Story",
            youtubeId: "dL3ZVdknfvM",
            category: "testimony",
            summary: "A former competitive gamer shares how chasing gaming fame led to emptiness, but finding Jesus gave him a purpose greater than any high score.",
            tags: ["purpose", "career", "transformation"]
        },
        {
            id: 4,
            title: "Gaming Almost Destroyed My Life",
            youtubeId: "hSV0dLNB-lg",
            category: "warning",
            summary: "A raw, honest look at how gaming can become an idol - playing 12+ hours daily, neglecting health, relationships, and responsibilities.",
            tags: ["warning", "balance", "health"]
        },
        {
            id: 5,
            title: "Finding Balance: A Christian Gamer's Guide",
            youtubeId: "qTp_EcTFsYQ",
            category: "guidance",
            summary: "Practical wisdom for enjoying games without letting them control you. Sets healthy boundaries while still having fun.",
            tags: ["balance", "practical", "wisdom"]
        },
        {
            id: 6,
            title: "Video Game Addiction: A Parent's Guide",
            youtubeId: "JFHwXeMq7Nw",
            category: "parents",
            summary: "For parents concerned about their child's gaming habits - signs of addiction, how to help, and maintaining family connection.",
            tags: ["parents", "help", "family"]
        },
        {
            id: 7,
            title: "Why I Quit Gaming for 1 Year (Christian Perspective)",
            youtubeId: "v8mVz_qVOQA",
            category: "testimony",
            summary: "A Christian shares his experience taking a year-long break from gaming and what God taught him during that time.",
            tags: ["fasting", "discipline", "growth"]
        },
        {
            id: 8,
            title: "Gaming & Mental Health: What the Bible Says",
            youtubeId: "LDM0hy1Yz2Y",
            category: "teaching",
            summary: "Biblical principles for mental health and how they apply to our gaming habits. Addresses anxiety, escapism, and finding peace.",
            tags: ["mental-health", "bible", "peace"]
        }
    ],
    
    // Youth Group Resources
    youthGroupGuide: {
        intro: {
            title: "Finding Your Youth Group",
            content: `
                <p>Youth group can be one of the best experiences of your life! It's a place to make friends 
                who share your faith, learn about God, and have fun. But we know it can feel scary to walk 
                into a room full of people you don't know. Here's how to take that first step!</p>
            `
        },
        
        findingGroups: {
            title: "How to Find a Youth Group",
            tips: [
                {
                    title: "Ask at Your Church",
                    detail: "If your family attends a church, they probably have a youth group! Ask a parent to help you find out when they meet."
                },
                {
                    title: "Search Online",
                    detail: "Google 'youth group near me' or 'teen church [your city]'. Many churches list their youth programs online."
                },
                {
                    title: "Ask Friends",
                    detail: "Do you have any friends who go to church? Ask if you can come to their youth group with them!"
                },
                {
                    title: "Try Multiple Churches",
                    detail: "Different churches have different vibes. It's okay to visit a few before finding the right fit."
                },
                {
                    title: "School Connections",
                    detail: "Some schools have Christian clubs like FCA (Fellowship of Christian Athletes) or Young Life. These are great entry points!"
                },
                {
                    title: "Community Centers",
                    detail: "YMCAs and community centers sometimes host youth faith programs."
                }
            ]
        },
        
        forShyKids: {
            title: "Tips for Shy or Nervous Kids",
            tips: [
                {
                    title: "Bring a Friend",
                    detail: "Everything is easier with a buddy! Ask a friend or sibling to come with you the first time.",
                    icon: "👫"
                },
                {
                    title: "Arrive Early",
                    detail: "It's easier to meet people one-on-one before the crowd arrives. Youth leaders love chatting with new kids!",
                    icon: "⏰"
                },
                {
                    title: "Talk to a Leader First",
                    detail: "Email or message the youth pastor before you visit. They can introduce you and make you feel welcome.",
                    icon: "📧"
                },
                {
                    title: "Start Small",
                    detail: "You don't have to talk to everyone! Just try to have one conversation with one person each time.",
                    icon: "💬"
                },
                {
                    title: "Join an Activity",
                    detail: "Games, sports, or service projects are great ice-breakers. Focus on the activity and conversation flows naturally!",
                    icon: "🎮"
                },
                {
                    title: "Give It Time",
                    detail: "It takes about 3-4 visits before you start feeling comfortable. Don't give up after just one time!",
                    icon: "📅"
                },
                {
                    title: "Be Yourself",
                    detail: "You don't have to be someone you're not. Real friendships form when you're authentic.",
                    icon: "🌟"
                },
                {
                    title: "Remember Why You're There",
                    detail: "You're there to grow closer to God and make friends. Everyone else is probably nervous too!",
                    icon: "🙏"
                },
                {
                    title: "Ask Questions",
                    detail: "People love talking about themselves! Ask others about their hobbies, school, or favorite games.",
                    icon: "❓"
                },
                {
                    title: "Pray About It",
                    detail: "Ask God to help you feel brave and to connect you with good friends. He cares about this!",
                    icon: "✝️"
                }
            ]
        },
        
        whatToExpect: {
            title: "What Happens at Youth Group?",
            items: [
                "Games and fun activities to break the ice",
                "Worship music together",
                "A short message or Bible study",
                "Small group discussions",
                "Snacks! (Usually lots of pizza 🍕)",
                "Prayer time",
                "Hanging out and making friends"
            ]
        },
        
        scriptures: [
            { text: "For where two or three gather in my name, there am I with them.", ref: "Matthew 18:20" },
            { text: "Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another.", ref: "Hebrews 10:25" },
            { text: "As iron sharpens iron, so one person sharpens another.", ref: "Proverbs 27:17" },
            { text: "Two are better than one... If either of them falls down, one can help the other up.", ref: "Ecclesiastes 4:9-10" }
        ]
    },
    
    // Points
    points: {
        watchVideo: 25,
        completeVideo: 50,
        readGuide: 15,
        shareResource: 40
    },
    
    // Track viewed content
    viewedVideos: [],
    viewedGuides: [],
    
    init: function() {
        this.loadProgress();
    },
    
    loadProgress: function() {
        const saved = localStorage.getItem('birdturds_resources');
        if (saved) {
            const data = JSON.parse(saved);
            this.viewedVideos = data.viewedVideos || [];
            this.viewedGuides = data.viewedGuides || [];
        }
    },
    
    saveProgress: function() {
        localStorage.setItem('birdturds_resources', JSON.stringify({
            viewedVideos: this.viewedVideos,
            viewedGuides: this.viewedGuides
        }));
    },
    
    // Open resources hub
    openResourcesHub: function() {
        const html = `
            <div class="resources-hub">
                <div class="resources-header">
                    <h2>📚 Resources & Support</h2>
                    <button class="close-btn" onclick="ResourcesSystem.closeResources()">✕</button>
                </div>
                
                <div class="resources-tabs">
                    <button class="res-tab active" onclick="ResourcesSystem.showTab('videos')">🎬 Gaming Stories</button>
                    <button class="res-tab" onclick="ResourcesSystem.showTab('youth')">⛪ Youth Groups</button>
                    <button class="res-tab" onclick="ResourcesSystem.showTab('help')">💚 Get Help</button>
                </div>
                
                <div class="resources-content" id="resources-content">
                    ${this.renderVideosTab()}
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    showTab: function(tab) {
        document.querySelectorAll('.res-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        let content = '';
        switch(tab) {
            case 'videos':
                content = this.renderVideosTab();
                break;
            case 'youth':
                content = this.renderYouthTab();
                break;
            case 'help':
                content = this.renderHelpTab();
                break;
        }
        
        document.getElementById('resources-content').innerHTML = content;
    },
    
    renderVideosTab: function() {
        return `
            <div class="videos-section">
                <div class="section-intro">
                    <h3>🎮 Gaming Testimonies & Guidance</h3>
                    <p>Real stories from people who struggled with gaming and found freedom, balance, and purpose through faith.</p>
                </div>
                
                <div class="video-grid">
                    ${this.gamingTestimonies.map(v => this.renderVideoCard(v)).join('')}
                </div>
                
                <div class="section-note">
                    <p>💡 <strong>Remember:</strong> Gaming isn't evil - but like anything, it can become unhealthy when it controls us instead of us controlling it.</p>
                </div>
            </div>
        `;
    },
    
    renderVideoCard: function(video) {
        const isWatched = this.viewedVideos.includes(video.id);
        
        return `
            <div class="video-card ${isWatched ? 'watched' : ''}" onclick="ResourcesSystem.playVideo(${video.id})">
                <div class="video-thumb">
                    <img src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="">
                    <div class="play-btn">▶</div>
                    ${isWatched ? '<span class="watched-badge">✓ Watched</span>' : ''}
                </div>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>${video.summary.substring(0, 100)}...</p>
                    <div class="video-tags">
                        ${video.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    },
    
    playVideo: function(videoId) {
        const video = this.gamingTestimonies.find(v => v.id === videoId);
        if (!video) return;
        
        const html = `
            <div class="video-player">
                <div class="player-header">
                    <button onclick="ResourcesSystem.openResourcesHub()">← Back</button>
                    <button class="close-btn" onclick="ResourcesSystem.closeResources()">✕</button>
                </div>
                
                <div class="player-embed">
                    <iframe 
                        width="100%" 
                        height="400" 
                        src="https://www.youtube.com/embed/${video.youtubeId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                
                <div class="player-details">
                    <h2>${video.title}</h2>
                    <p class="video-summary">${video.summary}</p>
                    
                    <div class="video-actions">
                        <button onclick="SocialSystem.openShareDialog('video', {title: '${video.title}'})">
                            📤 Share This Video
                        </button>
                    </div>
                    
                    <div class="reflection-box">
                        <h4>🤔 Reflection Questions</h4>
                        <ul>
                            <li>What part of this story resonated with you?</li>
                            <li>Is there anything you want to change about your gaming habits?</li>
                            <li>How can you apply this to your own life?</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
        
        // Track view
        if (!this.viewedVideos.includes(videoId)) {
            this.viewedVideos.push(videoId);
            this.saveProgress();
            
            if (typeof ScoreSystem !== 'undefined') {
                ScoreSystem.add(this.points.watchVideo, 'Watched testimony!');
            }
        }
    },
    
    renderYouthTab: function() {
        const guide = this.youthGroupGuide;
        
        return `
            <div class="youth-section">
                <div class="section-intro">
                    <h3>⛪ Finding Your Youth Group</h3>
                    ${guide.intro.content}
                </div>
                
                <!-- Scripture -->
                <div class="youth-scripture">
                    ${guide.scriptures.map(s => `
                        <div class="scripture-item">
                            <p>"${s.text}"</p>
                            <span>— ${s.ref}</span>
                        </div>
                    `).join('')}
                </div>
                
                <!-- How to Find -->
                <div class="guide-section">
                    <h3>🔍 ${guide.findingGroups.title}</h3>
                    <div class="tips-grid">
                        ${guide.findingGroups.tips.map(tip => `
                            <div class="tip-card">
                                <h4>${tip.title}</h4>
                                <p>${tip.detail}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- For Shy Kids -->
                <div class="guide-section shy-section">
                    <h3>😊 ${guide.forShyKids.title}</h3>
                    <p class="shy-intro">We get it - walking into a room of strangers is hard! Here are tips that really help:</p>
                    <div class="shy-tips">
                        ${guide.forShyKids.tips.map(tip => `
                            <div class="shy-tip">
                                <span class="tip-icon">${tip.icon}</span>
                                <div class="tip-content">
                                    <strong>${tip.title}</strong>
                                    <p>${tip.detail}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- What to Expect -->
                <div class="guide-section">
                    <h3>📋 ${guide.whatToExpect.title}</h3>
                    <ul class="expect-list">
                        ${guide.whatToExpect.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="encourage-box">
                    <p>💛 <strong>You've got this!</strong> God wants you to have a community. He'll help you find your people!</p>
                </div>
            </div>
        `;
    },
    
    renderHelpTab: function() {
        return `
            <div class="help-section">
                <div class="section-intro">
                    <h3>💚 Need Help?</h3>
                    <p>If you're struggling with gaming addiction, mental health, or just need someone to talk to - help is available.</p>
                </div>
                
                <div class="crisis-resources">
                    <h4>🆘 Crisis Resources</h4>
                    <div class="hotline-grid">
                        <div class="hotline-card">
                            <h5>National Suicide Prevention</h5>
                            <p class="hotline-number">📞 988</p>
                            <p>Available 24/7</p>
                        </div>
                        <div class="hotline-card">
                            <h5>Crisis Text Line</h5>
                            <p class="hotline-number">📱 Text HOME to 741741</p>
                            <p>Text anytime</p>
                        </div>
                        <div class="hotline-card">
                            <h5>SAMHSA Helpline</h5>
                            <p class="hotline-number">📞 1-800-662-4357</p>
                            <p>Substance abuse & mental health</p>
                        </div>
                    </div>
                </div>
                
                <div class="gaming-help">
                    <h4>🎮 Gaming-Specific Help</h4>
                    <ul>
                        <li><strong>Game Quitters</strong> - Online community for gaming addiction recovery</li>
                        <li><strong>CGAA (Computer Gaming Addicts Anonymous)</strong> - 12-step program for gaming</li>
                        <li><strong>Talk to a school counselor</strong> - They can help and it's confidential</li>
                        <li><strong>Talk to your parents</strong> - They love you and want to help</li>
                        <li><strong>Talk to a pastor/youth leader</strong> - They've seen this before and can guide you</li>
                    </ul>
                </div>
                
                <div class="prayer-help">
                    <h4>🙏 Prayer for Freedom</h4>
                    <div class="prayer-text">
                        <p>Lord, I confess that gaming has become more important to me than it should be. 
                        I ask for Your help to find balance. Give me strength to set boundaries and 
                        wisdom to use my time well. Replace my need to escape with Your peace. 
                        Help me find my identity in You, not in games. Thank You for loving me 
                        and helping me grow. In Jesus' name, Amen.</p>
                    </div>
                    <button onclick="PrayerSystem.offerPrayerMoment('addiction')">🙏 Pray Now</button>
                </div>
                
                <div class="hope-box">
                    <h4>✨ There Is Hope!</h4>
                    <p>"I can do all things through Christ who strengthens me." - Philippians 4:13</p>
                    <p>Many people have found freedom from gaming addiction. You can too. You're not alone, and you're not broken. God sees you, loves you, and wants to help you live a full, balanced life.</p>
                </div>
            </div>
        `;
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('resources-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'resources-overlay';
            overlay.className = 'resources-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeResources: function() {
        const overlay = document.getElementById('resources-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const resourcesStyles = `
<style>
.resources-overlay {
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
.resources-hub, .video-player {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4ecdc4;
    border-radius: 20px;
    padding: 25px;
    max-width: 900px;
    width: 100%;
    color: white;
    margin: 20px auto;
}
.resources-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.resources-header h2 { color: #4ecdc4; margin: 0; }
.resources-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}
.res-tab {
    background: rgba(255,255,255,0.1);
    border: none;
    padding: 12px 20px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
}
.res-tab.active, .res-tab:hover {
    background: #4ecdc4;
    color: #1a1a2e;
}
.section-intro {
    margin-bottom: 25px;
}
.section-intro h3 { color: #ffd700; }
.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}
.video-card {
    background: rgba(255,255,255,0.1);
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;
}
.video-card:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.15);
}
.video-card.watched { opacity: 0.7; }
.video-thumb {
    position: relative;
    aspect-ratio: 16/9;
}
.video-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.play-btn {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 60px; height: 60px;
    background: rgba(255,215,0,0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    color: #1a1a2e;
    opacity: 0;
    transition: opacity 0.3s;
}
.video-card:hover .play-btn { opacity: 1; }
.watched-badge {
    position: absolute;
    top: 10px; right: 10px;
    background: #4ecdc4;
    color: #1a1a2e;
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 0.8em;
}
.video-info {
    padding: 15px;
}
.video-info h4 { color: #ffd700; margin-bottom: 8px; }
.video-info p { color: rgba(255,255,255,0.7); font-size: 0.9em; }
.video-tags {
    display: flex;
    gap: 5px;
    margin-top: 10px;
    flex-wrap: wrap;
}
.tag {
    background: rgba(78,205,196,0.3);
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 0.75em;
}
.guide-section {
    margin: 30px 0;
    padding: 20px;
    background: rgba(255,255,255,0.05);
    border-radius: 15px;
}
.guide-section h3 { color: #4ecdc4; margin-bottom: 15px; }
.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}
.tip-card {
    background: rgba(255,255,255,0.1);
    padding: 15px;
    border-radius: 10px;
}
.tip-card h4 { color: #ffd700; margin-bottom: 8px; }
.shy-section {
    background: linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1));
}
.shy-tips {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.shy-tip {
    display: flex;
    gap: 15px;
    align-items: flex-start;
    background: rgba(255,255,255,0.05);
    padding: 15px;
    border-radius: 10px;
}
.tip-icon {
    font-size: 1.5em;
    min-width: 40px;
    text-align: center;
}
.tip-content strong { color: #ffd700; display: block; margin-bottom: 5px; }
.expect-list {
    list-style: none;
    padding: 0;
}
.expect-list li {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.expect-list li::before {
    content: "✓ ";
    color: #4ecdc4;
}
.youth-scripture {
    display: grid;
    gap: 10px;
    margin: 20px 0;
}
.scripture-item {
    background: rgba(255,215,0,0.1);
    padding: 15px;
    border-radius: 10px;
    border-left: 4px solid #ffd700;
}
.scripture-item p { font-style: italic; margin-bottom: 5px; }
.scripture-item span { color: rgba(255,255,255,0.6); }
.encourage-box, .hope-box {
    background: linear-gradient(90deg, rgba(78,205,196,0.2), rgba(255,215,0,0.2));
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    margin-top: 20px;
}
.crisis-resources { margin: 25px 0; }
.hotline-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
}
.hotline-card {
    background: rgba(255,107,107,0.1);
    border: 2px solid rgba(255,107,107,0.3);
    padding: 20px;
    border-radius: 15px;
    text-align: center;
}
.hotline-number {
    font-size: 1.3em;
    color: #4ecdc4;
    font-weight: bold;
    margin: 10px 0;
}
.gaming-help ul {
    list-style: none;
    padding: 0;
}
.gaming-help li {
    padding: 10px;
    margin: 5px 0;
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
}
.prayer-help {
    background: rgba(255,215,0,0.1);
    padding: 20px;
    border-radius: 15px;
    margin: 20px 0;
}
.prayer-text {
    background: rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 10px;
    font-style: italic;
    margin: 15px 0;
}
.prayer-help button {
    background: linear-gradient(145deg, #ffd700, #ffaa00);
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    color: #1a1a2e;
    font-weight: bold;
    cursor: pointer;
}
.player-embed {
    border-radius: 15px;
    overflow: hidden;
    margin: 20px 0;
}
.player-details h2 { color: #ffd700; }
.video-summary {
    color: rgba(255,255,255,0.8);
    line-height: 1.6;
    margin: 15px 0;
}
.reflection-box {
    background: rgba(78,205,196,0.1);
    padding: 20px;
    border-radius: 15px;
    margin-top: 20px;
}
.reflection-box h4 { color: #4ecdc4; margin-bottom: 10px; }
.reflection-box ul { margin-left: 20px; }
.reflection-box li { margin: 8px 0; }
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', resourcesStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = ResourcesSystem;
}
