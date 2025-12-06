// ============================================
// BIRDTURDS v41.0 - BREAK REMINDER SYSTEM
// Promotes healthy gaming with timed break suggestions
// ============================================

const BreakReminderSystem = {
    // Configuration
    config: {
        // Time intervals in milliseconds
        firstReminder: 20 * 60 * 1000,      // 20 minutes
        subsequentReminder: 15 * 60 * 1000,  // Every 15 minutes after
        
        // Snooze options (in milliseconds)
        snoozeOptions: [
            { label: '5 more minutes', time: 5 * 60 * 1000 },
            { label: '10 more minutes', time: 10 * 60 * 1000 }
        ],
        
        // Messages rotate for variety
        messages: [
            {
                title: "⏰ Time for a Break!",
                body: "You've been playing for a while! Your eyes, body, and mind will thank you for a short rest.",
                tip: "Try the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.",
                icon: "👁️"
            },
            {
                title: "🧘 Stretch Break!",
                body: "Gaming is fun, but so is moving! Stand up, stretch your arms, roll your shoulders.",
                tip: "Even 30 seconds of stretching can reduce muscle tension and boost energy!",
                icon: "🙆"
            },
            {
                title: "💧 Hydration Check!",
                body: "When's the last time you had some water? Staying hydrated helps you focus better!",
                tip: "Keep a water bottle nearby while gaming. Your brain is 75% water!",
                icon: "🚰"
            },
            {
                title: "🌟 You're Doing Great!",
                body: "Nice gaming session! But even champions take breaks. Step away for a few minutes.",
                tip: "Taking breaks actually improves your gaming performance when you return!",
                icon: "🏆"
            },
            {
                title: "👀 Rest Your Eyes",
                body: "Screens are tough on eyes. Give them a mini vacation!",
                tip: "Look out a window, blink slowly 10 times, or close your eyes for 30 seconds.",
                icon: "😌"
            },
            {
                title: "🚶 Move Around!",
                body: "Your body was made to move! A quick walk does wonders.",
                tip: "Walk to the kitchen, grab a healthy snack, say hi to someone in your house!",
                icon: "🍎"
            }
        ],
        
        // Scripture to include
        scriptures: [
            { text: "A joyful heart is good medicine.", ref: "Proverbs 17:22" },
            { text: "Do you not know that your body is a temple?", ref: "1 Corinthians 6:19" },
            { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
            { text: "Come to me, all who are weary, and I will give you rest.", ref: "Matthew 11:28" }
        ]
    },
    
    // State
    state: {
        sessionStartTime: null,
        lastReminderTime: null,
        reminderCount: 0,
        isReminderShowing: false,
        timerId: null,
        isPaused: false,
        totalPlayTime: 0  // Persists across sessions (stored in localStorage)
    },
    
    // Initialize the system
    init: function() {
        this.state.sessionStartTime = Date.now();
        this.state.lastReminderTime = Date.now();
        this.state.reminderCount = 0;
        
        // Load total play time from storage
        try {
            const saved = localStorage.getItem('birdturds_totalPlayTime');
            if (saved) {
                this.state.totalPlayTime = parseInt(saved, 10);
            }
        } catch (e) {
            // localStorage not available
        }
        
        // Start the reminder timer
        this.startTimer();
        
        // Create the reminder modal
        this.createReminderModal();
        
        console.log('[BreakReminder] System initialized');
    },
    
    // Start the reminder timer
    startTimer: function() {
        if (this.state.timerId) {
            clearTimeout(this.state.timerId);
        }
        
        const delay = this.state.reminderCount === 0 
            ? this.config.firstReminder 
            : this.config.subsequentReminder;
        
        this.state.timerId = setTimeout(() => {
            if (!this.state.isPaused && !this.state.isReminderShowing) {
                this.showReminder();
            }
        }, delay);
    },
    
    // Create the reminder modal HTML
    createReminderModal: function() {
        // Remove existing if present
        const existing = document.getElementById('break-reminder-modal');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.id = 'break-reminder-modal';
        modal.innerHTML = `
            <div class="break-reminder-overlay"></div>
            <div class="break-reminder-content">
                <div class="break-reminder-header">
                    <span class="break-reminder-icon">⏰</span>
                    <h2 class="break-reminder-title">Time for a Break!</h2>
                </div>
                <div class="break-reminder-body">
                    <p class="break-reminder-message">You've been playing for a while!</p>
                    <div class="break-reminder-tip">
                        <span class="tip-icon">💡</span>
                        <p class="tip-text">Tip goes here</p>
                    </div>
                    <div class="break-reminder-stats">
                        <span class="stat-label">Session time:</span>
                        <span class="stat-value" id="break-session-time">0 min</span>
                    </div>
                    <div class="break-reminder-scripture">
                        <p class="scripture-text">"A joyful heart is good medicine."</p>
                        <span class="scripture-ref">— Proverbs 17:22</span>
                    </div>
                </div>
                <div class="break-reminder-actions">
                    <button class="break-btn break-btn-primary" onclick="BreakReminderSystem.takeBreak()">
                        ✓ I'll Take a Break
                    </button>
                    <div class="break-snooze-options">
                        <button class="break-btn break-btn-snooze" onclick="BreakReminderSystem.snooze(5)">
                            5 more min
                        </button>
                        <button class="break-btn break-btn-snooze" onclick="BreakReminderSystem.snooze(10)">
                            10 more min
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            #break-reminder-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, sans-serif;
            }
            #break-reminder-modal.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .break-reminder-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                animation: fadeIn 0.3s ease;
            }
            .break-reminder-content {
                position: relative;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border-radius: 20px;
                padding: 30px;
                max-width: 420px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                border: 2px solid #4ecdc4;
                animation: slideIn 0.3s ease;
            }
            .break-reminder-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .break-reminder-icon {
                font-size: 3em;
                display: block;
                margin-bottom: 10px;
            }
            .break-reminder-title {
                color: #ffd700;
                font-size: 1.6em;
                margin: 0;
                text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
            }
            .break-reminder-body {
                color: white;
            }
            .break-reminder-message {
                font-size: 1.1em;
                text-align: center;
                margin-bottom: 20px;
                color: rgba(255,255,255,0.9);
            }
            .break-reminder-tip {
                background: rgba(78, 205, 196, 0.15);
                border-radius: 12px;
                padding: 15px;
                display: flex;
                align-items: flex-start;
                gap: 10px;
                margin-bottom: 15px;
            }
            .tip-icon {
                font-size: 1.5em;
            }
            .tip-text {
                margin: 0;
                font-size: 0.95em;
                color: rgba(255,255,255,0.85);
            }
            .break-reminder-stats {
                text-align: center;
                margin-bottom: 15px;
                color: rgba(255,255,255,0.7);
            }
            .stat-value {
                color: #4ecdc4;
                font-weight: bold;
            }
            .break-reminder-scripture {
                background: rgba(255, 215, 0, 0.1);
                border-left: 3px solid #ffd700;
                padding: 12px 15px;
                margin-bottom: 20px;
                border-radius: 0 8px 8px 0;
            }
            .scripture-text {
                font-style: italic;
                margin: 0 0 5px 0;
                color: rgba(255,255,255,0.9);
            }
            .scripture-ref {
                color: #ffd700;
                font-size: 0.9em;
            }
            .break-reminder-actions {
                text-align: center;
            }
            .break-btn {
                border: none;
                border-radius: 25px;
                padding: 12px 25px;
                font-size: 1em;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            }
            .break-btn-primary {
                background: linear-gradient(145deg, #4ecdc4, #3db8b0);
                color: #1a1a2e;
                width: 100%;
                margin-bottom: 15px;
                font-size: 1.1em;
                padding: 15px;
            }
            .break-btn-primary:hover {
                transform: scale(1.02);
                box-shadow: 0 5px 20px rgba(78, 205, 196, 0.4);
            }
            .break-snooze-options {
                display: flex;
                gap: 10px;
                justify-content: center;
            }
            .break-btn-snooze {
                background: rgba(255,255,255,0.1);
                color: rgba(255,255,255,0.8);
                border: 1px solid rgba(255,255,255,0.2);
                font-size: 0.9em;
            }
            .break-btn-snooze:hover {
                background: rgba(255,255,255,0.15);
                color: white;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @media (max-width: 480px) {
                .break-reminder-content {
                    padding: 20px;
                    margin: 10px;
                }
                .break-reminder-title {
                    font-size: 1.3em;
                }
                .break-snooze-options {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(modal);
    },
    
    // Show the break reminder
    showReminder: function() {
        this.state.isReminderShowing = true;
        this.state.reminderCount++;
        
        const modal = document.getElementById('break-reminder-modal');
        if (!modal) {
            this.createReminderModal();
        }
        
        // Pick random message and scripture
        const msg = this.config.messages[Math.floor(Math.random() * this.config.messages.length)];
        const scripture = this.config.scriptures[Math.floor(Math.random() * this.config.scriptures.length)];
        
        // Calculate session time
        const sessionMinutes = Math.round((Date.now() - this.state.sessionStartTime) / 60000);
        
        // Update modal content
        document.querySelector('.break-reminder-icon').textContent = msg.icon;
        document.querySelector('.break-reminder-title').textContent = msg.title;
        document.querySelector('.break-reminder-message').textContent = msg.body;
        document.querySelector('.tip-text').textContent = msg.tip;
        document.getElementById('break-session-time').textContent = sessionMinutes + ' min';
        document.querySelector('.scripture-text').textContent = '"' + scripture.text + '"';
        document.querySelector('.scripture-ref').textContent = '— ' + scripture.ref;
        
        // Show modal
        document.getElementById('break-reminder-modal').classList.add('active');
        
        // Pause game if possible
        if (typeof game !== 'undefined' && game.scene && game.scene.pause) {
            game.scene.pause('GameScene');
        }
        
        console.log('[BreakReminder] Showing reminder #' + this.state.reminderCount);
    },
    
    // User chose to take a break
    takeBreak: function() {
        this.hideReminder();
        
        // Show appreciation message
        this.showThankYou();
        
        // Reset session
        this.state.sessionStartTime = Date.now();
        this.state.reminderCount = 0;
        
        // Restart timer
        this.startTimer();
    },
    
    // User chose to snooze
    snooze: function(minutes) {
        this.hideReminder();
        
        // Set custom timer for snooze duration
        if (this.state.timerId) {
            clearTimeout(this.state.timerId);
        }
        
        this.state.timerId = setTimeout(() => {
            if (!this.state.isPaused && !this.state.isReminderShowing) {
                this.showReminder();
            }
        }, minutes * 60 * 1000);
        
        console.log('[BreakReminder] Snoozed for ' + minutes + ' minutes');
    },
    
    // Hide the reminder modal
    hideReminder: function() {
        this.state.isReminderShowing = false;
        
        const modal = document.getElementById('break-reminder-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // Resume game if possible
        if (typeof game !== 'undefined' && game.scene && game.scene.resume) {
            game.scene.resume('GameScene');
        }
    },
    
    // Show thank you message
    showThankYou: function() {
        const toast = document.createElement('div');
        toast.className = 'break-thank-you';
        toast.innerHTML = '🌟 Great choice! Enjoy your break!';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(145deg, #4ecdc4, #3db8b0);
            color: #1a1a2e;
            padding: 15px 30px;
            border-radius: 30px;
            font-weight: bold;
            font-size: 1.1em;
            z-index: 10001;
            animation: slideDown 0.3s ease, fadeOut 0.5s ease 2s forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            @keyframes fadeOut {
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 2500);
    },
    
    // Pause the system (e.g., when game is paused)
    pause: function() {
        this.state.isPaused = true;
        if (this.state.timerId) {
            clearTimeout(this.state.timerId);
        }
    },
    
    // Resume the system
    resume: function() {
        this.state.isPaused = false;
        this.startTimer();
    },
    
    // Get current session time in minutes
    getSessionTime: function() {
        return Math.round((Date.now() - this.state.sessionStartTime) / 60000);
    },
    
    // Cleanup
    destroy: function() {
        if (this.state.timerId) {
            clearTimeout(this.state.timerId);
        }
        
        const modal = document.getElementById('break-reminder-modal');
        if (modal) modal.remove();
        
        // Save total play time
        try {
            const sessionTime = Date.now() - this.state.sessionStartTime;
            this.state.totalPlayTime += sessionTime;
            localStorage.setItem('birdturds_totalPlayTime', this.state.totalPlayTime.toString());
        } catch (e) {
            // localStorage not available
        }
    }
};

// Auto-initialize when script loads (can be disabled by setting window.BREAK_REMINDER_MANUAL_INIT = true)
if (typeof window !== 'undefined' && !window.BREAK_REMINDER_MANUAL_INIT) {
    document.addEventListener('DOMContentLoaded', function() {
        // Delay init slightly to ensure game is ready
        setTimeout(function() {
            BreakReminderSystem.init();
        }, 1000);
    });
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BreakReminderSystem };
}
if (typeof window !== 'undefined') {
    window.BreakReminderSystem = BreakReminderSystem;
}
