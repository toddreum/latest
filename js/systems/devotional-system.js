// ============================================
// BIRDTURDS v40.5 - DEVOTIONAL SYSTEM
// Daily devotions, reading plans, gentle nudges
// Integrates with gameplay naturally
// ============================================

const DevotionalSystem = {
    // User progress
    currentPlan: null,
    dayInPlan: 0,
    completedDevotions: 0,
    devotionStreak: 0,
    lastDevotionDate: null,
    
    // Points
    points: {
        completeReading: 100,
        completeDevotional: 200,
        dailyStreak: 50,
        weeklyCompletion: 500,
        planCompletion: 1000
    },
    
    // Reading Plans
    readingPlans: [
        {
            id: 'new_believer',
            name: '🌱 New Believer Basics',
            description: 'Start your faith journey with core truths',
            duration: 7,
            days: [
                { title: 'God Loves You', reading: 'John 3:16-21', reflection: 'How does it feel to know God loves you unconditionally?' },
                { title: 'You Are Forgiven', reading: 'Romans 8:1-4', reflection: 'What burdens can you release knowing you are forgiven?' },
                { title: 'New Life in Christ', reading: '2 Corinthians 5:17-21', reflection: 'What does it mean to be a new creation?' },
                { title: 'The Holy Spirit', reading: 'John 14:15-27', reflection: 'How can the Holy Spirit help you daily?' },
                { title: 'Prayer', reading: 'Matthew 6:5-15', reflection: 'What do you want to talk to God about?' },
                { title: 'The Bible', reading: 'Psalm 119:105-112', reflection: 'How can God\'s Word guide your life?' },
                { title: 'Living It Out', reading: 'James 1:22-27', reflection: 'What\'s one way you can live out your faith today?' }
            ]
        },
        {
            id: 'strength',
            name: '💪 Finding Strength',
            description: 'For when life gets hard',
            duration: 7,
            days: [
                { title: 'God Is Your Strength', reading: 'Isaiah 40:28-31', reflection: 'Where do you need God\'s strength right now?' },
                { title: 'Don\'t Be Afraid', reading: 'Joshua 1:9', reflection: 'What fear can you give to God?' },
                { title: 'Peace in Storms', reading: 'Mark 4:35-41', reflection: 'What storm is Jesus calming in your life?' },
                { title: 'He Carries You', reading: 'Psalm 55:22', reflection: 'What burden do you need to cast on God?' },
                { title: 'Never Alone', reading: 'Deuteronomy 31:6', reflection: 'How does God\'s presence comfort you?' },
                { title: 'Joy in Trials', reading: 'James 1:2-4', reflection: 'What good might come from your struggles?' },
                { title: 'Victory Through Christ', reading: 'Romans 8:37-39', reflection: 'How are you more than a conqueror?' }
            ]
        },
        {
            id: 'anxiety',
            name: '☮️ Overcoming Anxiety',
            description: 'Finding peace in a worried world',
            duration: 7,
            days: [
                { title: 'Cast Your Cares', reading: '1 Peter 5:6-7', reflection: 'What worries can you cast on God today?' },
                { title: 'Don\'t Worry', reading: 'Matthew 6:25-34', reflection: 'What does "seek first the kingdom" look like for you?' },
                { title: 'Peace of God', reading: 'Philippians 4:6-7', reflection: 'Practice turning anxiety into prayer right now.' },
                { title: 'Trust Not Fear', reading: 'Psalm 56:3-4', reflection: 'When you are afraid, what will you choose?' },
                { title: 'God\'s Plans', reading: 'Jeremiah 29:11', reflection: 'How does knowing God has plans change your worry?' },
                { title: 'Rest in Him', reading: 'Matthew 11:28-30', reflection: 'What rest is Jesus offering you?' },
                { title: 'Perfect Love', reading: '1 John 4:18', reflection: 'How does God\'s love cast out your fear?' }
            ]
        },
        {
            id: 'purpose',
            name: '🎯 Finding Your Purpose',
            description: 'Discover why you\'re here',
            duration: 7,
            days: [
                { title: 'Created With Purpose', reading: 'Ephesians 2:10', reflection: 'What good works might God have prepared for you?' },
                { title: 'Wonderfully Made', reading: 'Psalm 139:13-16', reflection: 'How does God see you?' },
                { title: 'Gifts to Use', reading: '1 Peter 4:10-11', reflection: 'What gifts has God given you?' },
                { title: 'Serve Others', reading: 'Mark 10:42-45', reflection: 'How can you serve someone this week?' },
                { title: 'Light to the World', reading: 'Matthew 5:14-16', reflection: 'Where can your light shine brightest?' },
                { title: 'Follow God\'s Lead', reading: 'Proverbs 3:5-6', reflection: 'What path is God directing you toward?' },
                { title: 'Eternal Impact', reading: 'Matthew 28:19-20', reflection: 'How can you make a difference that lasts?' }
            ]
        }
    ],
    
    // Audio Bible API (using Bible.is or similar)
    audioBibleConfig: {
        enabled: true,
        defaultVersion: 'ESV',
        autoPlay: false
    },
    
    init: function() {
        this.loadProgress();
        this.checkNudge();
    },
    
    loadProgress: function() {
        const saved = localStorage.getItem('birdturds_devotional_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentPlan = data.currentPlan;
            this.dayInPlan = data.dayInPlan || 0;
            this.completedDevotions = data.completedDevotions || 0;
            this.devotionStreak = data.devotionStreak || 0;
            this.lastDevotionDate = data.lastDevotionDate ? new Date(data.lastDevotionDate) : null;
        }
    },
    
    saveProgress: function() {
        localStorage.setItem('birdturds_devotional_progress', JSON.stringify({
            currentPlan: this.currentPlan,
            dayInPlan: this.dayInPlan,
            completedDevotions: this.completedDevotions,
            devotionStreak: this.devotionStreak,
            lastDevotionDate: this.lastDevotionDate?.toISOString()
        }));
    },
    
    // Check if we should show a gentle nudge
    checkNudge: function() {
        // Only nudge once per session and if they've been playing
        if (sessionStorage.getItem('devotion_nudge_shown')) return;
        
        const now = new Date();
        const hour = now.getHours();
        
        // Good times for devotion nudges (morning, evening)
        const goodTimes = (hour >= 6 && hour <= 9) || (hour >= 18 && hour <= 21);
        
        if (goodTimes && this.shouldNudge()) {
            // Delay nudge so it doesn't interrupt immediately
            setTimeout(() => {
                this.showGentleNudge();
            }, 60000); // After 1 minute of play
        }
    },
    
    shouldNudge: function() {
        if (!this.lastDevotionDate) return true; // Never done one
        
        const today = new Date().toDateString();
        const lastDate = this.lastDevotionDate.toDateString();
        
        return today !== lastDate; // Haven't done one today
    },
    
    showGentleNudge: function() {
        sessionStorage.setItem('devotion_nudge_shown', 'true');
        
        // Very gentle, non-intrusive notification
        const nudge = document.createElement('div');
        nudge.className = 'devotion-nudge';
        nudge.innerHTML = `
            <div class="nudge-icon">📖</div>
            <div class="nudge-text">
                <strong>Daily Devotion Available</strong>
                <span>${this.getNudgeMessage()}</span>
            </div>
            <button onclick="DevotionalSystem.openDevotional(); this.parentElement.remove();">Read</button>
            <button class="nudge-dismiss" onclick="this.parentElement.remove();">✕</button>
        `;
        document.body.appendChild(nudge);
        
        // Auto-dismiss after 15 seconds
        setTimeout(() => {
            if (nudge.parentElement) nudge.remove();
        }, 15000);
    },
    
    getNudgeMessage: function() {
        if (!this.currentPlan) {
            return 'Start a reading plan to grow your faith!';
        }
        if (this.devotionStreak > 0) {
            return `${this.devotionStreak} day streak! Keep it going!`;
        }
        return 'Take 5 minutes with God today';
    },
    
    openDevotional: function() {
        if (!this.currentPlan) {
            this.showPlanSelection();
        } else {
            this.showTodaysDevotional();
        }
    },
    
    showPlanSelection: function() {
        const html = `
            <div class="devotional-container">
                <div class="devotional-header">
                    <h2>📖 Choose a Reading Plan</h2>
                    <button class="close-btn" onclick="DevotionalSystem.closeDevotional()">✕</button>
                </div>
                
                <p class="devotional-intro">
                    Pick a plan that speaks to where you are right now. 
                    Each day takes about 5-10 minutes.
                </p>
                
                <div class="plan-grid">
                    ${this.readingPlans.map(plan => `
                        <div class="plan-card" onclick="DevotionalSystem.selectPlan('${plan.id}')">
                            <h3>${plan.name}</h3>
                            <p>${plan.description}</p>
                            <span class="plan-duration">${plan.duration} days</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="devotional-stats">
                    <span>📿 ${this.completedDevotions} Devotions Completed</span>
                    <span>🔥 ${this.devotionStreak} Day Streak</span>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    selectPlan: function(planId) {
        const plan = this.readingPlans.find(p => p.id === planId);
        if (!plan) return;
        
        this.currentPlan = planId;
        this.dayInPlan = 0;
        this.saveProgress();
        
        this.showTodaysDevotional();
    },
    
    showTodaysDevotional: function() {
        const plan = this.readingPlans.find(p => p.id === this.currentPlan);
        if (!plan) {
            this.showPlanSelection();
            return;
        }
        
        const day = plan.days[this.dayInPlan];
        if (!day) {
            this.showPlanCompletion();
            return;
        }
        
        const html = `
            <div class="devotional-container">
                <div class="devotional-header">
                    <div>
                        <h2>📖 ${plan.name}</h2>
                        <span>Day ${this.dayInPlan + 1} of ${plan.duration}</span>
                    </div>
                    <button class="close-btn" onclick="DevotionalSystem.closeDevotional()">✕</button>
                </div>
                
                <div class="devotional-progress">
                    <div class="progress-fill" style="width: ${((this.dayInPlan) / plan.duration) * 100}%"></div>
                </div>
                
                <div class="devotional-content">
                    <h3>${day.title}</h3>
                    
                    <div class="reading-section">
                        <div class="reading-header">
                            <span>📜 Today's Reading: ${day.reading}</span>
                            <button class="audio-btn" onclick="DevotionalSystem.playAudioBible('${day.reading}')">
                                🔊 Listen
                            </button>
                        </div>
                        <div id="scripture-text" class="scripture-text">
                            <p>Loading scripture...</p>
                        </div>
                    </div>
                    
                    <div class="reflection-section">
                        <h4>💭 Reflection Question</h4>
                        <p class="reflection-question">${day.reflection}</p>
                        
                        <textarea id="devotion-journal" placeholder="Write your thoughts here (private)..."></textarea>
                    </div>
                </div>
                
                <button class="complete-devotion-btn" onclick="DevotionalSystem.completeDevotional()">
                    ✅ Complete Today's Devotion
                </button>
            </div>
        `;
        
        this.showOverlay(html);
        this.loadScriptureText(day.reading);
    },
    
    loadScriptureText: function(reference) {
        // In production, this would call a Bible API
        // For now, show placeholder with common verses
        const scriptureDiv = document.getElementById('scripture-text');
        
        // Sample scriptures (would be API call in production)
        const sampleScriptures = {
            'John 3:16-21': 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. For God did not send his Son into the world to condemn the world, but to save the world through him.',
            'Isaiah 40:28-31': 'Do you not know? Have you not heard? The Lord is the everlasting God, the Creator of the ends of the earth. He will not grow tired or weary, and his understanding no one can fathom. He gives strength to the weary and increases the power of the weak. Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
            'Philippians 4:6-7': 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
        };
        
        const text = sampleScriptures[reference] || 
            `Read ${reference} in your Bible or use the Listen button to hear it read aloud.`;
        
        scriptureDiv.innerHTML = `<p>${text}</p>`;
    },
    
    playAudioBible: function(reference) {
        // Would integrate with Bible.is, YouVersion API, or embedded audio
        // For now, show message
        UIManager?.showMessage('Audio Bible: Coming Soon!', 2000);
        
        // In production:
        // window.open(`https://www.bible.com/bible/59/${reference.replace(' ', '.')}`, '_blank');
    },
    
    completeDevotional: function() {
        const journal = document.getElementById('devotion-journal')?.value || '';
        
        // Save journal entry (private)
        if (journal.length > 10) {
            const entries = JSON.parse(localStorage.getItem('devotion_journal') || '[]');
            entries.push({
                date: new Date().toISOString(),
                plan: this.currentPlan,
                day: this.dayInPlan,
                entry: journal.substring(0, 500)
            });
            localStorage.setItem('devotion_journal', JSON.stringify(entries.slice(-50)));
        }
        
        // Update progress
        this.dayInPlan++;
        this.completedDevotions++;
        this.updateStreak();
        this.lastDevotionDate = new Date();
        this.saveProgress();
        
        // Calculate points
        let points = this.points.completeDevotional;
        let bonus = 'Daily Devotion';
        
        // Streak bonus
        if (this.devotionStreak > 1) {
            points += this.points.dailyStreak * Math.min(this.devotionStreak, 7);
            bonus += ` + ${this.devotionStreak} Day Streak`;
        }
        
        // Week completion bonus
        if (this.completedDevotions % 7 === 0) {
            points += this.points.weeklyCompletion;
            bonus += ' + Weekly Goal!';
        }
        
        // Plan completion
        const plan = this.readingPlans.find(p => p.id === this.currentPlan);
        if (this.dayInPlan >= plan.duration) {
            points += this.points.planCompletion;
            bonus += ' + Plan Complete!';
        }
        
        // Award points
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(points, bonus);
        }
        
        this.showCompletionMessage(points, bonus);
    },
    
    updateStreak: function() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const lastDate = this.lastDevotionDate?.toDateString();
        
        if (lastDate === yesterday) {
            this.devotionStreak++;
        } else if (lastDate !== today) {
            this.devotionStreak = 1;
        }
    },
    
    showCompletionMessage: function(points, bonus) {
        const plan = this.readingPlans.find(p => p.id === this.currentPlan);
        const isComplete = this.dayInPlan >= plan.duration;
        
        const html = `
            <div class="devotional-complete">
                <h2>${isComplete ? '🎉 Plan Complete!' : '✨ Devotion Complete!'}</h2>
                
                <div class="devotion-points">+${points}</div>
                <div class="devotion-bonus">${bonus}</div>
                
                <div class="devotion-stats">
                    <div>🔥 ${this.devotionStreak} Day Streak</div>
                    <div>📖 ${this.completedDevotions} Total</div>
                </div>
                
                <div class="devotion-verse">
                    "Your word is a lamp to my feet and a light to my path."
                    <span>- Psalm 119:105</span>
                </div>
                
                ${isComplete ? `
                    <p>Amazing! You completed the ${plan.name} plan!</p>
                    <button onclick="DevotionalSystem.showPlanSelection()">Start New Plan</button>
                ` : `
                    <p>See you tomorrow for Day ${this.dayInPlan + 1}!</p>
                `}
                
                <button class="devotion-close" onclick="DevotionalSystem.closeDevotional()">
                    Continue
                </button>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    showPlanCompletion: function() {
        this.currentPlan = null;
        this.dayInPlan = 0;
        this.saveProgress();
        this.showPlanSelection();
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('devotional-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'devotional-overlay';
            overlay.className = 'devotional-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeDevotional: function() {
        const overlay = document.getElementById('devotional-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const devotionalStyles = `
<style>
.devotion-nudge {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 2px solid #ffd700;
    border-radius: 15px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 9000;
    max-width: 350px;
    animation: slideIn 0.5s ease;
    box-shadow: 0 5px 30px rgba(0,0,0,0.5);
}
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
.nudge-icon { font-size: 2em; }
.nudge-text { color: white; }
.nudge-text strong { display: block; color: #ffd700; }
.nudge-text span { font-size: 0.9em; color: rgba(255,255,255,0.7); }
.devotion-nudge button {
    background: #ffd700;
    border: none;
    padding: 8px 20px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: bold;
}
.nudge-dismiss {
    background: none !important;
    color: rgba(255,255,255,0.5) !important;
    padding: 5px !important;
}
.devotional-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 20000;
    overflow-y: auto;
    padding: 20px;
}
.devotional-container {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ffd700;
    border-radius: 20px;
    padding: 30px;
    max-width: 700px;
    width: 100%;
    color: white;
    max-height: 90vh;
    overflow-y: auto;
}
.devotional-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}
.devotional-header h2 { color: #ffd700; margin: 0; }
.close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
}
.devotional-progress {
    height: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
}
.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #ffd700, #4ecdc4);
    border-radius: 4px;
    transition: width 0.5s;
}
.plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin: 20px 0;
}
.plan-card {
    background: rgba(255,255,255,0.1);
    border: 2px solid rgba(255,255,255,0.2);
    border-radius: 15px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
}
.plan-card:hover {
    border-color: #ffd700;
    transform: translateY(-3px);
}
.plan-card h3 { color: #ffd700; margin-bottom: 10px; }
.plan-duration {
    display: inline-block;
    background: rgba(78,205,196,0.3);
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 0.9em;
    margin-top: 10px;
}
.reading-section {
    background: rgba(255,255,200,0.1);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
}
.reading-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.audio-btn {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 8px 20px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
.scripture-text {
    line-height: 1.8;
    font-size: 1.1em;
}
.reflection-section {
    margin: 25px 0;
}
.reflection-section h4 { color: #ffd700; margin-bottom: 15px; }
.reflection-question {
    font-size: 1.2em;
    color: #4ecdc4;
    margin-bottom: 15px;
}
#devotion-journal {
    width: 100%;
    height: 100px;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(0,0,0,0.3);
    color: white;
    resize: none;
}
.complete-devotion-btn {
    width: 100%;
    background: linear-gradient(145deg, #ffd700, #ffaa00);
    border: none;
    padding: 18px;
    border-radius: 25px;
    font-size: 1.2em;
    font-weight: bold;
    color: #1a1a2e;
    cursor: pointer;
    margin-top: 20px;
}
.devotional-complete {
    text-align: center;
    padding: 40px;
    color: white;
}
.devotional-complete h2 { color: #ffd700; font-size: 2em; }
.devotion-points {
    font-size: 3em;
    color: #ffd700;
    margin: 20px 0;
}
.devotion-bonus { color: #4ecdc4; font-size: 1.2em; }
.devotion-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 25px 0;
}
.devotion-stats div {
    background: rgba(255,255,255,0.1);
    padding: 10px 25px;
    border-radius: 20px;
}
.devotion-verse {
    background: rgba(255,255,200,0.1);
    padding: 20px;
    border-radius: 15px;
    margin: 25px 0;
    font-style: italic;
}
.devotion-verse span { display: block; margin-top: 10px; color: rgba(255,255,255,0.6); }
.devotion-close {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 15px 50px;
    border-radius: 25px;
    color: white;
    font-size: 1.1em;
    cursor: pointer;
    margin-top: 15px;
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', devotionalStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = DevotionalSystem;
}
