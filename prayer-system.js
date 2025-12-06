// ============================================
// BIRDTURDS v40.5 - PRAYER SYSTEM
// Meaningful prayer moments with gentle verification
// Not intrusive - opt-in and encouraging
// ============================================

const PrayerSystem = {
    // Prayer tracking
    prayerLog: [],
    dailyPrayers: 0,
    totalPrayers: 0,
    prayerStreak: 0,
    
    // Points (generous but meaningful)
    points: {
        quickPrayer: 50,        // 30 second moment
        focusedPrayer: 150,     // 2 minute prayer
        deepPrayer: 300,        // 5+ minute prayer
        prayerForOther: 100,    // Praying for community member
        dailyPrayerGoal: 200,   // Complete 3 prayers in a day
        streakBonus: 50,        // Per day of streak
        firstPrayer: 500        // First time bonus
    },
    
    // Prayer types/prompts
    prayerTypes: [
        {
            id: 'gratitude',
            name: '🙏 Gratitude',
            prompt: 'Take a moment to thank God for something good in your life...',
            duration: 30,
            scripture: 'Give thanks in all circumstances. - 1 Thessalonians 5:18'
        },
        {
            id: 'strength',
            name: '💪 Strength',
            prompt: 'Ask God for strength in an area where you\'re struggling...',
            duration: 60,
            scripture: 'I can do all things through Christ who strengthens me. - Philippians 4:13'
        },
        {
            id: 'peace',
            name: '☮️ Peace',
            prompt: 'Bring your worries to God and ask for His peace...',
            duration: 60,
            scripture: 'Cast all your anxiety on Him because He cares for you. - 1 Peter 5:7'
        },
        {
            id: 'others',
            name: '❤️ For Others',
            prompt: 'Pray for someone who needs God\'s help right now...',
            duration: 45,
            scripture: 'Pray for one another. - James 5:16'
        },
        {
            id: 'guidance',
            name: '🧭 Guidance',
            prompt: 'Ask God for wisdom and direction in a decision you\'re facing...',
            duration: 60,
            scripture: 'Trust in the Lord with all your heart. - Proverbs 3:5'
        },
        {
            id: 'forgiveness',
            name: '🕊️ Forgiveness',
            prompt: 'Is there anyone you need to forgive? Bring it to God...',
            duration: 90,
            scripture: 'Forgive as the Lord forgave you. - Colossians 3:13'
        },
        {
            id: 'worship',
            name: '👑 Worship',
            prompt: 'Simply tell God how amazing He is...',
            duration: 45,
            scripture: 'The Lord is great and greatly to be praised. - Psalm 145:3'
        }
    ],
    
    // Current prayer session
    currentPrayer: null,
    prayerTimer: 0,
    isInPrayer: false,
    
    // Reflection questions (asked after prayer to verify engagement)
    reflectionQuestions: [
        "What did you thank God for?",
        "What did you ask God for help with?",
        "Who did you pray for?",
        "What scripture spoke to you?",
        "How do you feel after praying?",
        "What is one thing you'll trust God with today?"
    ],
    
    init: function() {
        this.loadProgress();
        this.checkDailyReset();
    },
    
    loadProgress: function() {
        const saved = localStorage.getItem('birdturds_prayer_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.totalPrayers = data.totalPrayers || 0;
            this.prayerStreak = data.prayerStreak || 0;
            this.prayerLog = data.prayerLog || [];
            this.lastPrayerDate = data.lastPrayerDate ? new Date(data.lastPrayerDate) : null;
        }
    },
    
    saveProgress: function() {
        localStorage.setItem('birdturds_prayer_progress', JSON.stringify({
            totalPrayers: this.totalPrayers,
            prayerStreak: this.prayerStreak,
            prayerLog: this.prayerLog.slice(-100), // Keep last 100
            lastPrayerDate: this.lastPrayerDate?.toISOString()
        }));
    },
    
    checkDailyReset: function() {
        const today = new Date().toDateString();
        const lastDate = this.lastPrayerDate?.toDateString();
        
        if (lastDate !== today) {
            this.dailyPrayers = 0;
            
            // Check if streak broken (more than 1 day gap)
            if (this.lastPrayerDate) {
                const daysSince = Math.floor((new Date() - this.lastPrayerDate) / (1000 * 60 * 60 * 24));
                if (daysSince > 1) {
                    this.prayerStreak = 0;
                }
            }
        }
    },
    
    // Open prayer moment (gentle invitation)
    offerPrayerMoment: function(context) {
        // Don't interrupt gameplay - only offer at natural pauses
        const contexts = {
            'game_start': 'Would you like to start with a quick prayer?',
            'game_over': 'Take a moment to reflect and pray?',
            'after_bible': 'The Word reminds us to pray. Would you like to?',
            'voluntary': 'Ready to spend a moment with God?'
        };
        
        this.showPrayerInvitation(contexts[context] || contexts.voluntary);
    },
    
    showPrayerInvitation: function(message) {
        const html = `
            <div class="prayer-invitation">
                <div class="prayer-glow"></div>
                <h2>🙏 Prayer Moment</h2>
                <p>${message}</p>
                
                <div class="prayer-stats">
                    <span>🔥 ${this.prayerStreak} day streak</span>
                    <span>📿 ${this.totalPrayers} total prayers</span>
                </div>
                
                <div class="prayer-options">
                    ${this.prayerTypes.slice(0, 4).map(type => `
                        <button class="prayer-type-btn" onclick="PrayerSystem.startPrayer('${type.id}')">
                            ${type.name}
                        </button>
                    `).join('')}
                </div>
                
                <button class="prayer-skip" onclick="PrayerSystem.closePrayerUI()">
                    Maybe later
                </button>
                
                <p class="prayer-note">No pressure - this is between you and God 💛</p>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    startPrayer: function(typeId) {
        const prayerType = this.prayerTypes.find(t => t.id === typeId);
        if (!prayerType) return;
        
        this.currentPrayer = {
            type: prayerType,
            startTime: Date.now(),
            minDuration: prayerType.duration * 1000
        };
        this.isInPrayer = true;
        this.prayerTimer = 0;
        
        this.showPrayerSession(prayerType);
    },
    
    showPrayerSession: function(prayerType) {
        const html = `
            <div class="prayer-session">
                <div class="prayer-ambient"></div>
                
                <div class="prayer-header">
                    <span>${prayerType.name}</span>
                    <span id="prayer-timer">0:00</span>
                </div>
                
                <div class="prayer-scripture">
                    "${prayerType.scripture}"
                </div>
                
                <div class="prayer-prompt">
                    ${prayerType.prompt}
                </div>
                
                <div class="prayer-space">
                    <p>Close your eyes if you'd like...</p>
                    <p>God is listening.</p>
                </div>
                
                <div class="prayer-progress">
                    <div class="progress-bar" id="prayer-progress-bar"></div>
                    <span id="prayer-status">Take your time...</span>
                </div>
                
                <button class="prayer-done-btn" id="prayer-done-btn" onclick="PrayerSystem.completePrayer()" disabled>
                    Amen 🙏
                </button>
                
                <p class="prayer-tip">The button will enable after ${prayerType.duration} seconds</p>
            </div>
        `;
        
        this.showOverlay(html);
        this.startPrayerTimer();
        
        // Play soft ambient sound if available
        if (typeof AudioManager !== 'undefined') {
            AudioManager.playLoop('sounds/prayer_ambient.mp3', 0.2);
        }
    },
    
    startPrayerTimer: function() {
        this.prayerInterval = setInterval(() => {
            if (!this.isInPrayer) {
                clearInterval(this.prayerInterval);
                return;
            }
            
            const elapsed = Date.now() - this.currentPrayer.startTime;
            const minDuration = this.currentPrayer.minDuration;
            
            // Update timer display
            const seconds = Math.floor(elapsed / 1000);
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            document.getElementById('prayer-timer').textContent = 
                `${mins}:${secs.toString().padStart(2, '0')}`;
            
            // Update progress bar
            const progress = Math.min(100, (elapsed / minDuration) * 100);
            document.getElementById('prayer-progress-bar').style.width = progress + '%';
            
            // Enable done button when minimum time reached
            if (elapsed >= minDuration) {
                const btn = document.getElementById('prayer-done-btn');
                btn.disabled = false;
                btn.classList.add('enabled');
                document.getElementById('prayer-status').textContent = 'Ready when you are...';
            }
            
        }, 1000);
    },
    
    completePrayer: function() {
        if (!this.currentPrayer) return;
        
        clearInterval(this.prayerInterval);
        this.isInPrayer = false;
        
        const elapsed = Date.now() - this.currentPrayer.startTime;
        const duration = Math.floor(elapsed / 1000);
        
        // Stop ambient sound
        if (typeof AudioManager !== 'undefined') {
            AudioManager.stopAll();
        }
        
        // Show reflection (gentle verification)
        this.showReflection(duration);
    },
    
    showReflection: function(duration) {
        const question = this.reflectionQuestions[
            Math.floor(Math.random() * this.reflectionQuestions.length)
        ];
        
        const html = `
            <div class="prayer-reflection">
                <h2>✨ Reflection</h2>
                
                <p class="reflection-question">${question}</p>
                
                <textarea id="reflection-input" placeholder="Share your thoughts (optional)..." maxlength="300"></textarea>
                
                <p class="reflection-note">This is private - just for you and God.</p>
                
                <button class="reflection-submit" onclick="PrayerSystem.submitReflection(${duration})">
                    Complete Prayer 🙏
                </button>
                
                <button class="reflection-skip" onclick="PrayerSystem.submitReflection(${duration}, true)">
                    Skip reflection
                </button>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    submitReflection: function(duration, skipped = false) {
        const reflection = document.getElementById('reflection-input')?.value || '';
        
        // Calculate points based on duration and engagement
        let points = 0;
        let bonus = '';
        
        if (duration >= 300) { // 5+ minutes
            points = this.points.deepPrayer;
            bonus = 'Deep Prayer';
        } else if (duration >= 120) { // 2+ minutes
            points = this.points.focusedPrayer;
            bonus = 'Focused Prayer';
        } else {
            points = this.points.quickPrayer;
            bonus = 'Prayer Moment';
        }
        
        // Bonus for reflection
        if (reflection.length > 20 && !skipped) {
            points += 50;
            bonus += ' + Reflection';
        }
        
        // First prayer bonus
        if (this.totalPrayers === 0) {
            points += this.points.firstPrayer;
            bonus += ' + First Prayer!';
        }
        
        // Update stats
        this.totalPrayers++;
        this.dailyPrayers++;
        this.lastPrayerDate = new Date();
        
        // Update streak
        this.updateStreak();
        
        // Daily goal check
        if (this.dailyPrayers === 3) {
            points += this.points.dailyPrayerGoal;
            bonus += ' + Daily Goal!';
        }
        
        // Log prayer
        this.prayerLog.push({
            type: this.currentPrayer.type.id,
            duration: duration,
            reflection: reflection.substring(0, 100), // Keep brief
            date: new Date().toISOString()
        });
        
        this.saveProgress();
        
        // Award points
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(points, bonus);
        }
        
        // Show completion
        this.showPrayerComplete(points, bonus);
    },
    
    updateStreak: function() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const lastDate = this.lastPrayerDate?.toDateString();
        
        if (lastDate === yesterday) {
            this.prayerStreak++;
        } else if (lastDate !== today) {
            this.prayerStreak = 1;
        }
    },
    
    showPrayerComplete: function(points, bonus) {
        const html = `
            <div class="prayer-complete">
                <div class="prayer-complete-glow"></div>
                
                <h2>🙏 Amen!</h2>
                
                <div class="prayer-verse">
                    "The prayer of a righteous person is powerful and effective."
                    <span>- James 5:16</span>
                </div>
                
                <div class="prayer-points">
                    +${points} Points!
                </div>
                <div class="prayer-bonus">${bonus}</div>
                
                <div class="prayer-stats-final">
                    <div>🔥 ${this.prayerStreak} Day Streak</div>
                    <div>📿 ${this.totalPrayers} Total Prayers</div>
                    <div>📅 ${this.dailyPrayers}/3 Today</div>
                </div>
                
                <button class="prayer-close-btn" onclick="PrayerSystem.closePrayerUI()">
                    Continue
                </button>
            </div>
        `;
        
        this.showOverlay(html);
        
        // Play completion sound
        if (typeof AudioManager !== 'undefined') {
            AudioManager.play('sounds/prayer_complete.mp3');
        }
    },
    
    // Quick prayer option (during gameplay)
    offerQuickPrayer: function(trigger) {
        // Triggers: low_health, demon_appeared, struggling
        const quickPrompts = {
            'low_health': 'Quick prayer for strength?',
            'demon_appeared': 'Quick prayer for protection?',
            'struggling': 'Quick prayer for help?',
            'victory': 'Quick prayer of thanks?'
        };
        
        // Don't interrupt - just show subtle button
        this.showQuickPrayerButton(quickPrompts[trigger] || quickPrompts.victory);
    },
    
    showQuickPrayerButton: function(text) {
        // Non-intrusive button in corner
        let btn = document.getElementById('quick-prayer-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'quick-prayer-btn';
            btn.className = 'quick-prayer-btn';
            document.body.appendChild(btn);
        }
        
        btn.innerHTML = `🙏 ${text}`;
        btn.onclick = () => this.offerPrayerMoment('voluntary');
        btn.style.display = 'block';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            btn.style.display = 'none';
        }, 10000);
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('prayer-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'prayer-overlay';
            overlay.className = 'prayer-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closePrayerUI: function() {
        const overlay = document.getElementById('prayer-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        this.isInPrayer = false;
        this.currentPrayer = null;
    }
};

// Prayer System Styles
const prayerStyles = `
<style>
.prayer-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,30,0.97), rgba(20,0,40,0.97));
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 20000;
}
.prayer-invitation, .prayer-session, .prayer-reflection, .prayer-complete {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 25px;
    padding: 40px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
}
.prayer-glow, .prayer-ambient, .prayer-complete-glow {
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(255,255,200,0.1) 0%, transparent 50%);
    animation: prayerGlow 8s ease-in-out infinite;
    pointer-events: none;
}
@keyframes prayerGlow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
}
.prayer-invitation h2, .prayer-session h2, .prayer-complete h2 { 
    color: #fff; 
    font-size: 2em;
    margin-bottom: 20px;
    text-shadow: 0 0 20px rgba(255,255,200,0.5);
}
.prayer-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 20px 0;
    color: rgba(255,255,255,0.7);
}
.prayer-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin: 25px 0;
}
.prayer-type-btn {
    background: linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
    border: 1px solid rgba(255,255,255,0.3);
    padding: 20px;
    border-radius: 15px;
    color: white;
    font-size: 1.1em;
    cursor: pointer;
    transition: all 0.3s;
}
.prayer-type-btn:hover {
    background: linear-gradient(145deg, rgba(255,255,200,0.3), rgba(255,255,200,0.2));
    transform: scale(1.03);
    box-shadow: 0 0 30px rgba(255,255,200,0.3);
}
.prayer-skip {
    background: none;
    border: none;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    padding: 10px;
    margin-top: 15px;
}
.prayer-note {
    color: rgba(255,255,255,0.5);
    font-size: 0.9em;
    margin-top: 20px;
}
.prayer-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    font-size: 1.2em;
}
.prayer-scripture {
    background: rgba(255,255,200,0.1);
    padding: 20px;
    border-radius: 15px;
    font-style: italic;
    margin: 20px 0;
    line-height: 1.6;
}
.prayer-prompt {
    font-size: 1.3em;
    margin: 30px 0;
    line-height: 1.5;
}
.prayer-space {
    padding: 40px;
    color: rgba(255,255,255,0.6);
}
.prayer-progress {
    margin: 30px 0;
}
.progress-bar {
    height: 6px;
    background: linear-gradient(90deg, #ffd700, #fff);
    border-radius: 3px;
    width: 0%;
    transition: width 1s;
}
#prayer-status {
    display: block;
    margin-top: 10px;
    color: rgba(255,255,255,0.6);
}
.prayer-done-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    padding: 15px 50px;
    border-radius: 30px;
    color: rgba(255,255,255,0.5);
    font-size: 1.2em;
    cursor: not-allowed;
    transition: all 0.3s;
}
.prayer-done-btn.enabled {
    background: linear-gradient(145deg, #ffd700, #ffaa00);
    color: #1a1a2e;
    cursor: pointer;
    box-shadow: 0 0 30px rgba(255,215,0,0.5);
}
.prayer-tip {
    color: rgba(255,255,255,0.4);
    font-size: 0.85em;
    margin-top: 15px;
}
.reflection-question {
    font-size: 1.3em;
    margin: 20px 0;
    color: #ffd700;
}
#reflection-input {
    width: 100%;
    height: 100px;
    padding: 15px;
    border-radius: 15px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(0,0,0,0.3);
    color: white;
    resize: none;
    font-size: 1em;
}
.reflection-note {
    color: rgba(255,255,255,0.5);
    font-size: 0.85em;
    margin: 15px 0;
}
.reflection-submit {
    background: linear-gradient(145deg, #ffd700, #ffaa00);
    border: none;
    padding: 15px 40px;
    border-radius: 25px;
    color: #1a1a2e;
    font-size: 1.1em;
    cursor: pointer;
    margin: 10px;
}
.reflection-skip {
    background: none;
    border: none;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
}
.prayer-verse {
    background: rgba(255,255,200,0.1);
    padding: 20px;
    border-radius: 15px;
    margin: 20px 0;
    font-style: italic;
}
.prayer-verse span {
    display: block;
    margin-top: 10px;
    color: rgba(255,255,255,0.6);
}
.prayer-points {
    font-size: 3em;
    color: #ffd700;
    margin: 20px 0;
    text-shadow: 0 0 30px rgba(255,215,0,0.5);
}
.prayer-bonus {
    color: #4ecdc4;
    font-size: 1.2em;
}
.prayer-stats-final {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin: 30px 0;
    flex-wrap: wrap;
}
.prayer-stats-final div {
    background: rgba(255,255,255,0.1);
    padding: 10px 20px;
    border-radius: 20px;
}
.prayer-close-btn {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 15px 50px;
    border-radius: 25px;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
}
.quick-prayer-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(145deg, rgba(255,255,200,0.9), rgba(255,215,0,0.9));
    border: none;
    padding: 12px 25px;
    border-radius: 25px;
    color: #1a1a2e;
    font-size: 1em;
    cursor: pointer;
    z-index: 5000;
    animation: gentlePulse 2s infinite;
    display: none;
}
@keyframes gentlePulse {
    0%, 100% { box-shadow: 0 0 10px rgba(255,215,0,0.5); }
    50% { box-shadow: 0 0 25px rgba(255,215,0,0.8); }
}
</style>
`;

// Inject styles
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', prayerStyles);
    });
}

// Export
if (typeof module !== 'undefined') {
    module.exports = PrayerSystem;
}
