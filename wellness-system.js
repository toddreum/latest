// ============================================
// BIRDTURDS v40.5 - WELLNESS SYSTEM
// Healthy gaming habits, nutrition, sleep, exercise
// Prevent gaming from becoming an idol/escape
// ============================================

const WellnessSystem = {
    // Session tracking
    sessionStart: null,
    totalPlayTime: 0,
    sessionsToday: 0,
    
    // Wellness goals
    goals: {
        maxSessionMinutes: 60,    // Recommend break after 1 hour
        maxDailyMinutes: 180,     // Warn at 3 hours daily
        waterReminder: 30,        // Remind to drink water every 30 min
        stretchReminder: 45,      // Remind to stretch every 45 min
        bedtimeHour: 22           // Suggest stopping at 10 PM
    },
    
    // Health tracking
    healthLog: {
        water: 0,
        meals: [],
        sleep: null,
        exercise: null,
        mood: null
    },
    
    // Points for healthy habits
    points: {
        drinkWater: 10,
        logMeal: 25,
        healthyMeal: 50,
        logSleep: 30,
        goodSleep: 75,    // 7-9 hours
        logExercise: 50,
        takeBreak: 25,
        completeWellnessCheck: 100,
        weeklyWellnessStreak: 500
    },
    
    // Wellness streak
    wellnessStreak: 0,
    lastWellnessDate: null,
    
    // Gaming balance messages
    balanceMessages: {
        sessionWarning: [
            "You've been playing for a while! Remember to take breaks. 🧘",
            "Time for a quick stretch? Your body will thank you! 💪",
            "Gaming is fun, but so is moving around! Quick break? 🚶"
        ],
        dailyWarning: [
            "You've played quite a bit today. How about some offline time? 🌳",
            "Remember: games are meant to enhance life, not replace it. 💛",
            "Your real-world adventures matter too! Take a break? 🌟"
        ],
        idolWarning: [
            "Just a gentle reminder: Is gaming becoming an escape? It's okay to take a step back. 🙏",
            "God wants us to enjoy life in balance. How's your balance today? ⚖️",
            "If you're avoiding something, gaming won't fix it. Need to talk? 💬"
        ],
        bedtimeWarning: [
            "It's getting late! Good sleep is important for your health. 😴",
            "Your body needs rest to function well tomorrow. Consider wrapping up? 🌙",
            "Sleep is a gift - don't shortchange yourself! 💤"
        ]
    },
    
    // Meal plan suggestions
    mealPlans: {
        quick: {
            name: 'Quick & Healthy',
            description: 'For busy gamers who need fast nutrition',
            meals: [
                { time: 'Breakfast', options: ['Overnight oats', 'Greek yogurt + fruit', 'Whole grain toast + eggs'] },
                { time: 'Lunch', options: ['Salad with protein', 'Whole grain wrap', 'Soup + sandwich'] },
                { time: 'Dinner', options: ['Grilled protein + veggies', 'Stir fry', 'Sheet pan meal'] },
                { time: 'Snacks', options: ['Nuts', 'Fruit', 'Veggies + hummus', 'Cheese + crackers'] }
            ]
        },
        energy: {
            name: 'Gaming Fuel',
            description: 'Foods that boost focus and energy',
            meals: [
                { time: 'Breakfast', options: ['Eggs + avocado', 'Smoothie bowl', 'Protein pancakes'] },
                { time: 'Lunch', options: ['Salmon + quinoa', 'Buddha bowl', 'Grilled chicken salad'] },
                { time: 'Dinner', options: ['Lean protein + sweet potato', 'Fish + brown rice', 'Turkey stir fry'] },
                { time: 'Snacks', options: ['Blueberries', 'Dark chocolate', 'Trail mix', 'Edamame'] }
            ],
            tips: ['Stay hydrated!', 'Avoid sugary drinks', 'Eat omega-3 rich foods for brain health']
        }
    },
    
    // Sleep recommendations
    sleepGuidelines: {
        recommended: { min: 7, max: 9 },
        tips: [
            "Stop screens 1 hour before bed",
            "Keep your room cool and dark",
            "Stick to a consistent sleep schedule",
            "Avoid caffeine after 2 PM",
            "Try reading or praying before sleep"
        ]
    },
    
    // Exercise suggestions
    exerciseSuggestions: {
        quick: [
            { name: 'Desk Stretches', duration: 5, description: 'Stretch neck, shoulders, wrists, back' },
            { name: 'Walk Around', duration: 10, description: 'Get up and walk around the house/block' },
            { name: 'Jumping Jacks', duration: 5, description: 'Get your heart rate up quickly' }
        ],
        gaming_breaks: [
            { name: 'Eye Rest', duration: 2, description: 'Look at something 20ft away for 20 seconds' },
            { name: 'Hand Stretches', duration: 3, description: 'Stretch fingers, wrists, forearms' },
            { name: 'Posture Check', duration: 1, description: 'Sit up straight, adjust chair' }
        ],
        full: [
            { name: 'Morning Walk', duration: 30, description: 'Start your day with movement' },
            { name: 'Bodyweight Workout', duration: 20, description: 'Push-ups, squats, planks' },
            { name: 'Yoga/Stretching', duration: 15, description: 'Flexibility and relaxation' }
        ]
    },
    
    init: function() {
        this.loadProgress();
        this.startSession();
        this.setupReminders();
    },
    
    loadProgress: function() {
        const saved = localStorage.getItem('birdturds_wellness');
        if (saved) {
            const data = JSON.parse(saved);
            this.totalPlayTime = data.totalPlayTime || 0;
            this.wellnessStreak = data.wellnessStreak || 0;
            this.lastWellnessDate = data.lastWellnessDate ? new Date(data.lastWellnessDate) : null;
            this.healthLog = data.healthLog || this.healthLog;
        }
        
        // Reset daily tracking
        this.checkDailyReset();
    },
    
    saveProgress: function() {
        localStorage.setItem('birdturds_wellness', JSON.stringify({
            totalPlayTime: this.totalPlayTime,
            wellnessStreak: this.wellnessStreak,
            lastWellnessDate: this.lastWellnessDate?.toISOString(),
            healthLog: this.healthLog
        }));
    },
    
    checkDailyReset: function() {
        const today = new Date().toDateString();
        const lastReset = localStorage.getItem('wellness_last_reset');
        
        if (lastReset !== today) {
            this.sessionsToday = 0;
            this.healthLog = {
                water: 0,
                meals: [],
                sleep: null,
                exercise: null,
                mood: null
            };
            localStorage.setItem('wellness_last_reset', today);
        }
    },
    
    startSession: function() {
        this.sessionStart = Date.now();
        this.sessionsToday++;
        
        // Check if it's late
        this.checkBedtime();
    },
    
    setupReminders: function() {
        // Water reminder
        this.waterInterval = setInterval(() => {
            if (this.isPlaying()) {
                this.showReminder('water');
            }
        }, this.goals.waterReminder * 60 * 1000);
        
        // Stretch reminder
        this.stretchInterval = setInterval(() => {
            if (this.isPlaying()) {
                this.showReminder('stretch');
            }
        }, this.goals.stretchReminder * 60 * 1000);
        
        // Session length check
        this.sessionInterval = setInterval(() => {
            this.checkSessionLength();
        }, 60 * 1000); // Check every minute
    },
    
    isPlaying: function() {
        return this.sessionStart !== null;
    },
    
    getSessionMinutes: function() {
        if (!this.sessionStart) return 0;
        return Math.floor((Date.now() - this.sessionStart) / 60000);
    },
    
    checkSessionLength: function() {
        const minutes = this.getSessionMinutes();
        
        if (minutes >= this.goals.maxSessionMinutes && minutes % 15 === 0) {
            this.showBalanceReminder('session');
        }
        
        const dailyMinutes = this.totalPlayTime + minutes;
        if (dailyMinutes >= this.goals.maxDailyMinutes) {
            this.showBalanceReminder('daily');
        }
    },
    
    checkBedtime: function() {
        const hour = new Date().getHours();
        if (hour >= this.goals.bedtimeHour) {
            setTimeout(() => {
                this.showBalanceReminder('bedtime');
            }, 5000);
        }
    },
    
    showReminder: function(type) {
        let message = '';
        let action = '';
        
        switch (type) {
            case 'water':
                message = '💧 Time for water! Stay hydrated while gaming.';
                action = `<button onclick="WellnessSystem.logWater()">I drank water! (+${this.points.drinkWater} pts)</button>`;
                break;
            case 'stretch':
                message = '🧘 Quick stretch break? Your body will thank you!';
                action = `<button onclick="WellnessSystem.showStretchGuide()">Show stretches</button>`;
                break;
        }
        
        this.showNotification(message, action);
    },
    
    showBalanceReminder: function(type) {
        const messages = this.balanceMessages[type + 'Warning'];
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        let extra = '';
        if (type === 'daily') {
            extra = '<p class="balance-note">Remember: Gaming should enhance life, not be an escape from it.</p>';
        }
        
        const html = `
            <div class="balance-reminder">
                <h3>⏰ Gentle Reminder</h3>
                <p>${message}</p>
                ${extra}
                <div class="balance-actions">
                    <button onclick="WellnessSystem.takeBreak()">Take a Break (+${this.points.takeBreak} pts)</button>
                    <button class="secondary" onclick="WellnessSystem.closeNotification()">Continue Playing</button>
                </div>
                <p class="balance-verse">
                    "Everything is permissible, but not everything is beneficial." - 1 Corinthians 10:23
                </p>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    logWater: function() {
        this.healthLog.water++;
        this.saveProgress();
        
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(this.points.drinkWater, 'Hydration!');
        }
        
        UIManager?.showMessage('💧 +' + this.points.drinkWater + ' pts! ' + this.healthLog.water + ' glasses today!', 2000);
        this.closeNotification();
    },
    
    takeBreak: function() {
        // Pause the game
        if (typeof GameCore !== 'undefined') {
            GameCore.pause();
        }
        
        // Award points
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(this.points.takeBreak, 'Healthy Break!');
        }
        
        this.showBreakScreen();
    },
    
    showBreakScreen: function() {
        const exercise = this.exerciseSuggestions.quick[
            Math.floor(Math.random() * this.exerciseSuggestions.quick.length)
        ];
        
        const html = `
            <div class="break-screen">
                <h2>🌟 Break Time!</h2>
                <p>Great choice! Your body and mind will thank you.</p>
                
                <div class="break-suggestion">
                    <h3>💪 Try This:</h3>
                    <div class="exercise-card">
                        <h4>${exercise.name}</h4>
                        <p>${exercise.description}</p>
                        <span>${exercise.duration} minutes</span>
                    </div>
                </div>
                
                <div class="break-checklist">
                    <h3>Quick Wellness Check:</h3>
                    <label><input type="checkbox" id="break-water"> 💧 Drink some water</label>
                    <label><input type="checkbox" id="break-stretch"> 🧘 Stretch your body</label>
                    <label><input type="checkbox" id="break-eyes"> 👀 Rest your eyes</label>
                    <label><input type="checkbox" id="break-snack"> 🍎 Healthy snack?</label>
                </div>
                
                <button onclick="WellnessSystem.endBreak()">Return to Game</button>
                
                <p class="break-verse">
                    "Do you not know that your bodies are temples of the Holy Spirit?" - 1 Corinthians 6:19
                </p>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    endBreak: function() {
        // Count completed items
        let completed = 0;
        if (document.getElementById('break-water')?.checked) {
            this.logWater();
            completed++;
        }
        if (document.getElementById('break-stretch')?.checked) completed++;
        if (document.getElementById('break-eyes')?.checked) completed++;
        if (document.getElementById('break-snack')?.checked) {
            this.healthLog.meals.push({ type: 'snack', time: new Date().toISOString() });
            completed++;
        }
        
        // Bonus for completing wellness check
        if (completed >= 3) {
            if (typeof ScoreSystem !== 'undefined') {
                ScoreSystem.add(this.points.completeWellnessCheck, 'Wellness Check Complete!');
            }
        }
        
        this.closeNotification();
        
        // Resume game
        if (typeof GameCore !== 'undefined') {
            GameCore.resume();
        }
    },
    
    // Full wellness dashboard
    openWellnessDashboard: function() {
        const html = `
            <div class="wellness-dashboard">
                <div class="wellness-header">
                    <h2>🌿 Your Wellness</h2>
                    <button class="close-btn" onclick="WellnessSystem.closeOverlay()">✕</button>
                </div>
                
                <div class="wellness-tabs">
                    <button class="tab active" onclick="WellnessSystem.showTab('today')">Today</button>
                    <button class="tab" onclick="WellnessSystem.showTab('nutrition')">Nutrition</button>
                    <button class="tab" onclick="WellnessSystem.showTab('sleep')">Sleep</button>
                    <button class="tab" onclick="WellnessSystem.showTab('exercise')">Exercise</button>
                    <button class="tab" onclick="WellnessSystem.showTab('balance')">Balance</button>
                </div>
                
                <div id="wellness-content">
                    ${this.renderTodayTab()}
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    showTab: function(tab) {
        // Update tab buttons
        document.querySelectorAll('.wellness-tabs .tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        let content = '';
        switch (tab) {
            case 'today':
                content = this.renderTodayTab();
                break;
            case 'nutrition':
                content = this.renderNutritionTab();
                break;
            case 'sleep':
                content = this.renderSleepTab();
                break;
            case 'exercise':
                content = this.renderExerciseTab();
                break;
            case 'balance':
                content = this.renderBalanceTab();
                break;
        }
        
        document.getElementById('wellness-content').innerHTML = content;
    },
    
    renderTodayTab: function() {
        return `
            <div class="today-wellness">
                <div class="wellness-stats">
                    <div class="stat-card">
                        <span class="stat-icon">🎮</span>
                        <span class="stat-value">${this.getSessionMinutes()} min</span>
                        <span class="stat-label">This Session</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">💧</span>
                        <span class="stat-value">${this.healthLog.water}</span>
                        <span class="stat-label">Glasses of Water</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">🍽️</span>
                        <span class="stat-value">${this.healthLog.meals.length}</span>
                        <span class="stat-label">Meals Logged</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">🔥</span>
                        <span class="stat-value">${this.wellnessStreak}</span>
                        <span class="stat-label">Day Streak</span>
                    </div>
                </div>
                
                <div class="quick-actions">
                    <button onclick="WellnessSystem.logWater()">💧 Log Water</button>
                    <button onclick="WellnessSystem.showTab('nutrition')">🍽️ Log Meal</button>
                    <button onclick="WellnessSystem.showStretchGuide()">🧘 Stretch</button>
                </div>
                
                <div class="daily-tip">
                    <h4>💡 Tip of the Day</h4>
                    <p>${this.getRandomTip()}</p>
                </div>
            </div>
        `;
    },
    
    renderNutritionTab: function() {
        return `
            <div class="nutrition-tab">
                <h3>🍎 Nutrition Tracking</h3>
                
                <div class="meal-log">
                    <h4>Log a Meal</h4>
                    <select id="meal-type">
                        <option value="breakfast">🌅 Breakfast</option>
                        <option value="lunch">☀️ Lunch</option>
                        <option value="dinner">🌙 Dinner</option>
                        <option value="snack">🍿 Snack</option>
                    </select>
                    <textarea id="meal-description" placeholder="What did you eat?"></textarea>
                    <label>
                        <input type="checkbox" id="meal-healthy"> This was a healthy choice
                    </label>
                    <button onclick="WellnessSystem.logMeal()">Log Meal (+${this.points.logMeal} pts)</button>
                </div>
                
                <div class="meal-plans">
                    <h4>📋 Meal Plan Ideas</h4>
                    ${Object.values(this.mealPlans).map(plan => `
                        <div class="plan-card">
                            <h5>${plan.name}</h5>
                            <p>${plan.description}</p>
                            <button onclick="WellnessSystem.showMealPlan('${plan.name}')">View Plan</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    renderSleepTab: function() {
        return `
            <div class="sleep-tab">
                <h3>😴 Sleep Tracking</h3>
                
                <div class="sleep-log">
                    <h4>Log Last Night's Sleep</h4>
                    <label>Hours slept:
                        <input type="number" id="sleep-hours" min="0" max="24" step="0.5" value="7">
                    </label>
                    <label>Quality:
                        <select id="sleep-quality">
                            <option value="poor">😫 Poor</option>
                            <option value="fair">😐 Fair</option>
                            <option value="good" selected>😊 Good</option>
                            <option value="great">😴 Great</option>
                        </select>
                    </label>
                    <button onclick="WellnessSystem.logSleep()">Log Sleep (+${this.points.logSleep} pts)</button>
                </div>
                
                <div class="sleep-tips">
                    <h4>💤 Sleep Tips</h4>
                    <ul>
                        ${this.sleepGuidelines.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                    <p class="recommendation">
                        Recommended: ${this.sleepGuidelines.recommended.min}-${this.sleepGuidelines.recommended.max} hours per night
                    </p>
                </div>
            </div>
        `;
    },
    
    renderExerciseTab: function() {
        return `
            <div class="exercise-tab">
                <h3>💪 Exercise & Movement</h3>
                
                <div class="exercise-sections">
                    <div class="exercise-section">
                        <h4>🎮 Gaming Breaks (2-5 min)</h4>
                        ${this.exerciseSuggestions.gaming_breaks.map(e => `
                            <div class="exercise-item">
                                <strong>${e.name}</strong> - ${e.duration} min
                                <p>${e.description}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="exercise-section">
                        <h4>⚡ Quick Exercises (5-15 min)</h4>
                        ${this.exerciseSuggestions.quick.map(e => `
                            <div class="exercise-item">
                                <strong>${e.name}</strong> - ${e.duration} min
                                <p>${e.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="log-exercise">
                    <h4>Log Exercise</h4>
                    <input type="text" id="exercise-name" placeholder="What did you do?">
                    <input type="number" id="exercise-duration" placeholder="Minutes" min="1">
                    <button onclick="WellnessSystem.logExercise()">Log (+${this.points.logExercise} pts)</button>
                </div>
            </div>
        `;
    },
    
    renderBalanceTab: function() {
        return `
            <div class="balance-tab">
                <h3>⚖️ Gaming Balance</h3>
                
                <div class="balance-warning">
                    <h4>🙏 A Word About Balance</h4>
                    <p>Gaming is a wonderful hobby, but like anything, it can become unhealthy when:</p>
                    <ul>
                        <li>It becomes an <strong>escape</strong> from real problems</li>
                        <li>It replaces <strong>real relationships</strong></li>
                        <li>It interferes with <strong>responsibilities</strong></li>
                        <li>It becomes an <strong>idol</strong> - more important than God</li>
                        <li>You feel <strong>anxious or angry</strong> when you can't play</li>
                    </ul>
                </div>
                
                <div class="balance-check">
                    <h4>Honest Check-In</h4>
                    <p>Ask yourself:</p>
                    <ul>
                        <li>Am I using games to avoid dealing with something?</li>
                        <li>Have I neglected important relationships?</li>
                        <li>Am I taking care of my body?</li>
                        <li>When did I last spend quality time with God?</li>
                    </ul>
                </div>
                
                <div class="balance-help">
                    <h4>💛 Need Help?</h4>
                    <p>If you're struggling with gaming balance, consider:</p>
                    <ul>
                        <li>Setting time limits (we can help remind you!)</li>
                        <li>Talking to someone you trust</li>
                        <li>Seeking professional help if needed</li>
                        <li>Praying about it - God cares!</li>
                    </ul>
                    <button onclick="PrayerSystem.offerPrayerMoment('balance')">🙏 Pray About This</button>
                </div>
                
                <div class="balance-verse">
                    "No one can serve two masters. Either you will hate the one and love the other, 
                    or you will be devoted to the one and despise the other." - Matthew 6:24
                </div>
            </div>
        `;
    },
    
    logMeal: function() {
        const type = document.getElementById('meal-type').value;
        const description = document.getElementById('meal-description').value;
        const healthy = document.getElementById('meal-healthy').checked;
        
        this.healthLog.meals.push({
            type: type,
            description: description,
            healthy: healthy,
            time: new Date().toISOString()
        });
        
        let points = this.points.logMeal;
        if (healthy) points += this.points.healthyMeal - this.points.logMeal;
        
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(points, healthy ? 'Healthy Meal!' : 'Meal Logged');
        }
        
        this.saveProgress();
        UIManager?.showMessage('🍽️ Meal logged! +' + points + ' pts', 2000);
    },
    
    logSleep: function() {
        const hours = parseFloat(document.getElementById('sleep-hours').value);
        const quality = document.getElementById('sleep-quality').value;
        
        this.healthLog.sleep = { hours, quality, date: new Date().toISOString() };
        
        let points = this.points.logSleep;
        const { min, max } = this.sleepGuidelines.recommended;
        
        if (hours >= min && hours <= max) {
            points = this.points.goodSleep;
        }
        
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(points, hours >= min ? 'Great Sleep!' : 'Sleep Logged');
        }
        
        this.saveProgress();
        UIManager?.showMessage('😴 Sleep logged! +' + points + ' pts', 2000);
    },
    
    logExercise: function() {
        const name = document.getElementById('exercise-name').value;
        const duration = parseInt(document.getElementById('exercise-duration').value);
        
        if (!name || !duration) {
            UIManager?.showMessage('Please fill in exercise details', 2000);
            return;
        }
        
        this.healthLog.exercise = { name, duration, date: new Date().toISOString() };
        
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(this.points.logExercise, 'Exercise Complete!');
        }
        
        this.saveProgress();
        UIManager?.showMessage('💪 Exercise logged! +' + this.points.logExercise + ' pts', 2000);
    },
    
    getRandomTip: function() {
        const tips = [
            "Take a 5-minute break every hour to rest your eyes and stretch.",
            "Drinking water helps you stay focused and alert!",
            "Good posture prevents back pain - sit up straight!",
            "Natural light is better for your eyes than just screen light.",
            "A healthy snack beats junk food for sustained energy.",
            "Exercise improves both physical AND mental health!",
            "Sleep deprivation affects gaming performance too.",
            "Your body is a temple - treat it well! (1 Cor 6:19)"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    },
    
    showStretchGuide: function() {
        const html = `
            <div class="stretch-guide">
                <h3>🧘 Quick Stretches</h3>
                <ol>
                    <li><strong>Neck:</strong> Slowly tilt head side to side, hold 10 seconds each</li>
                    <li><strong>Shoulders:</strong> Roll shoulders backward 10 times</li>
                    <li><strong>Wrists:</strong> Extend arm, pull fingers back gently, 15 seconds each</li>
                    <li><strong>Back:</strong> Stand, reach arms up high, then touch toes</li>
                    <li><strong>Eyes:</strong> Look away from screen, focus on distant object for 20 seconds</li>
                </ol>
                <button onclick="WellnessSystem.closeNotification()">Done!</button>
            </div>
        `;
        this.showNotification('', html);
    },
    
    showNotification: function(message, html) {
        let notif = document.getElementById('wellness-notification');
        if (!notif) {
            notif = document.createElement('div');
            notif.id = 'wellness-notification';
            notif.className = 'wellness-notification';
            document.body.appendChild(notif);
        }
        
        notif.innerHTML = message ? `<p>${message}</p>${html}` : html;
        notif.style.display = 'block';
    },
    
    closeNotification: function() {
        const notif = document.getElementById('wellness-notification');
        if (notif) notif.style.display = 'none';
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('wellness-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'wellness-overlay';
            overlay.className = 'wellness-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeOverlay: function() {
        const overlay = document.getElementById('wellness-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const wellnessStyles = `
<style>
.wellness-overlay {
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
.wellness-dashboard {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4ecdc4;
    border-radius: 20px;
    padding: 25px;
    max-width: 800px;
    width: 100%;
    color: white;
    max-height: 90vh;
    overflow-y: auto;
}
.wellness-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.wellness-header h2 { color: #4ecdc4; margin: 0; }
.wellness-tabs {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}
.wellness-tabs .tab {
    background: rgba(255,255,255,0.1);
    border: none;
    padding: 10px 15px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
.wellness-tabs .tab.active {
    background: #4ecdc4;
    color: #1a1a2e;
}
.wellness-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}
.stat-card {
    background: rgba(255,255,255,0.1);
    padding: 15px;
    border-radius: 15px;
    text-align: center;
}
.stat-icon { font-size: 2em; display: block; }
.stat-value { font-size: 1.5em; color: #ffd700; display: block; margin: 5px 0; }
.stat-label { font-size: 0.85em; color: rgba(255,255,255,0.7); }
.quick-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.quick-actions button {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
.daily-tip {
    background: rgba(255,215,0,0.1);
    padding: 15px;
    border-radius: 10px;
    border-left: 4px solid #ffd700;
}
.daily-tip h4 { color: #ffd700; margin-bottom: 10px; }
.wellness-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4ecdc4;
    border-radius: 15px;
    padding: 20px;
    max-width: 350px;
    color: white;
    z-index: 15000;
    display: none;
}
.wellness-notification button {
    background: #4ecdc4;
    border: none;
    padding: 8px 20px;
    border-radius: 15px;
    color: #1a1a2e;
    cursor: pointer;
    margin-top: 10px;
}
.balance-reminder {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ffd700;
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    text-align: center;
    color: white;
}
.balance-reminder h3 { color: #ffd700; }
.balance-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px 0;
}
.balance-actions button {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 12px 25px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
.balance-actions button.secondary {
    background: rgba(255,255,255,0.2);
}
.balance-verse {
    font-style: italic;
    color: rgba(255,255,255,0.7);
    margin-top: 15px;
    font-size: 0.9em;
}
.break-screen {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4ecdc4;
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    text-align: center;
    color: white;
}
.break-screen h2 { color: #4ecdc4; }
.exercise-card {
    background: rgba(255,255,255,0.1);
    padding: 15px;
    border-radius: 10px;
    margin: 15px 0;
}
.break-checklist {
    text-align: left;
    margin: 20px 0;
}
.break-checklist label {
    display: block;
    padding: 8px;
    cursor: pointer;
}
.balance-tab .balance-warning {
    background: rgba(255,107,107,0.1);
    border: 1px solid rgba(255,107,107,0.3);
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
}
.balance-tab .balance-verse {
    background: rgba(255,255,200,0.1);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', wellnessStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = WellnessSystem;
}
