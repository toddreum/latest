// ============================================
// BIRDTURDS v40.5 - FAMILY & RESPONSIBILITY SYSTEM
// Clean room, chores, family dinner, honor parents
// Build good habits while gaming
// ============================================

const FamilySystem = {
    // Daily tasks
    tasks: [
        {
            id: 'clean_room',
            name: '🛏️ Clean Your Room',
            description: 'Make your bed, pick up clothes, tidy up',
            points: 50,
            category: 'chores',
            scripture: 'Whatever you do, work at it with all your heart - Colossians 3:23'
        },
        {
            id: 'family_dinner',
            name: '🍽️ Family Dinner',
            description: 'Eat a meal with your family (no screens!)',
            points: 75,
            category: 'family',
            scripture: 'How good and pleasant it is when God\'s people live together in unity! - Psalm 133:1'
        },
        {
            id: 'help_chores',
            name: '🧹 Help With Chores',
            description: 'Do dishes, take out trash, help clean',
            points: 50,
            category: 'chores',
            scripture: 'Serve one another humbly in love - Galatians 5:13'
        },
        {
            id: 'honor_parents',
            name: '💝 Honor Your Parents',
            description: 'Say thank you, help without being asked, be respectful',
            points: 75,
            category: 'family',
            scripture: 'Honor your father and your mother - Exodus 20:12'
        },
        {
            id: 'homework',
            name: '📚 Finish Homework',
            description: 'Complete your schoolwork before gaming',
            points: 50,
            category: 'responsibility',
            scripture: 'Whatever your hand finds to do, do it with all your might - Ecclesiastes 9:10'
        },
        {
            id: 'kind_sibling',
            name: '👫 Be Kind to Siblings',
            description: 'No fighting, share, be helpful',
            points: 40,
            category: 'family',
            scripture: 'Be kind and compassionate to one another - Ephesians 4:32'
        },
        {
            id: 'pet_care',
            name: '🐕 Care for Pets',
            description: 'Feed, walk, or care for family pets',
            points: 40,
            category: 'chores',
            scripture: 'The righteous care for the needs of their animals - Proverbs 12:10'
        },
        {
            id: 'gratitude',
            name: '🙏 Express Gratitude',
            description: 'Thank someone in your family for something',
            points: 30,
            category: 'family',
            scripture: 'Give thanks in all circumstances - 1 Thessalonians 5:18'
        }
    ],
    
    // Schedule reminders (gentle, not naggy)
    scheduleReminders: {
        morning: {
            time: '07:00',
            tasks: ['clean_room'],
            message: 'Good morning! Start the day right - make your bed! 🌅'
        },
        afterSchool: {
            time: '15:30',
            tasks: ['homework', 'help_chores'],
            message: 'Homework first, then gaming! You got this! 📚'
        },
        dinner: {
            time: '18:00',
            tasks: ['family_dinner'],
            message: 'Family dinner time! Put down the games and connect! 🍽️'
        },
        evening: {
            time: '20:00',
            tasks: ['honor_parents', 'gratitude'],
            message: 'Before bed, thank your parents for something today! 💝'
        }
    },
    
    // Points
    points: {
        completeTask: 50,        // Base (overridden by task)
        dailyAllComplete: 200,   // All tasks done
        weeklyStreak: 500,       // 7 days of completing tasks
        familyChampion: 1000     // Special achievement
    },
    
    // Progress tracking
    completedToday: [],
    taskHistory: [],
    familyStreak: 0,
    lastCompletionDate: null,
    
    init: function() {
        this.loadProgress();
        this.checkDailyReset();
        this.setupReminders();
    },
    
    loadProgress: function() {
        const saved = localStorage.getItem('birdturds_family');
        if (saved) {
            const data = JSON.parse(saved);
            this.completedToday = data.completedToday || [];
            this.taskHistory = data.taskHistory || [];
            this.familyStreak = data.familyStreak || 0;
            this.lastCompletionDate = data.lastCompletionDate ? new Date(data.lastCompletionDate) : null;
        }
    },
    
    saveProgress: function() {
        localStorage.setItem('birdturds_family', JSON.stringify({
            completedToday: this.completedToday,
            taskHistory: this.taskHistory.slice(-100),
            familyStreak: this.familyStreak,
            lastCompletionDate: this.lastCompletionDate?.toISOString()
        }));
    },
    
    checkDailyReset: function() {
        const today = new Date().toDateString();
        const lastReset = localStorage.getItem('family_last_reset');
        
        if (lastReset !== today) {
            // Check if yesterday was complete (for streak)
            if (this.lastCompletionDate) {
                const yesterday = new Date(Date.now() - 86400000).toDateString();
                if (this.lastCompletionDate.toDateString() === yesterday && 
                    this.completedToday.length >= 3) {
                    this.familyStreak++;
                } else if (this.lastCompletionDate.toDateString() !== today) {
                    // Streak broken
                    this.familyStreak = 0;
                }
            }
            
            this.completedToday = [];
            localStorage.setItem('family_last_reset', today);
            this.saveProgress();
        }
    },
    
    setupReminders: function() {
        // Check reminders periodically
        setInterval(() => {
            this.checkReminders();
        }, 60000); // Every minute
        
        // Check immediately
        this.checkReminders();
    },
    
    checkReminders: function() {
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                           now.getMinutes().toString().padStart(2, '0');
        
        Object.values(this.scheduleReminders).forEach(reminder => {
            // Check if within 5 minutes of reminder time
            if (this.isNearTime(currentTime, reminder.time, 5)) {
                // Only remind once per time slot
                const reminderKey = 'family_reminded_' + reminder.time + '_' + now.toDateString();
                if (!sessionStorage.getItem(reminderKey)) {
                    this.showGentleReminder(reminder);
                    sessionStorage.setItem(reminderKey, 'true');
                }
            }
        });
    },
    
    isNearTime: function(current, target, withinMinutes) {
        const [ch, cm] = current.split(':').map(Number);
        const [th, tm] = target.split(':').map(Number);
        
        const currentMins = ch * 60 + cm;
        const targetMins = th * 60 + tm;
        
        return Math.abs(currentMins - targetMins) <= withinMinutes;
    },
    
    showGentleReminder: function(reminder) {
        // Don't interrupt gameplay - show subtle notification
        const notif = document.createElement('div');
        notif.className = 'family-reminder';
        notif.innerHTML = `
            <div class="reminder-icon">👨‍👩‍👧‍👦</div>
            <div class="reminder-content">
                <strong>Family Reminder</strong>
                <p>${reminder.message}</p>
            </div>
            <button onclick="FamilySystem.openFamilyDashboard(); this.parentElement.remove();">View Tasks</button>
            <button class="dismiss" onclick="this.parentElement.remove();">✕</button>
        `;
        
        document.body.appendChild(notif);
        
        // Auto-dismiss after 15 seconds
        setTimeout(() => {
            if (notif.parentElement) notif.remove();
        }, 15000);
    },
    
    // Open family dashboard
    openFamilyDashboard: function() {
        const completedCount = this.completedToday.length;
        const totalTasks = this.tasks.length;
        
        const html = `
            <div class="family-dashboard">
                <div class="family-header">
                    <h2>👨‍👩‍👧‍👦 Family & Responsibilities</h2>
                    <button class="close-btn" onclick="FamilySystem.closeDashboard()">✕</button>
                </div>
                
                <div class="family-verse">
                    "Children, obey your parents in the Lord, for this is right. Honor your father and mother."
                    <span>— Ephesians 6:1-2</span>
                </div>
                
                <div class="family-stats">
                    <div class="stat">
                        <span class="stat-value">${completedCount}/${totalTasks}</span>
                        <span class="stat-label">Today</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">🔥 ${this.familyStreak}</span>
                        <span class="stat-label">Day Streak</span>
                    </div>
                </div>
                
                <div class="task-categories">
                    <div class="category-section">
                        <h3>🧹 Chores</h3>
                        ${this.renderTasks('chores')}
                    </div>
                    
                    <div class="category-section">
                        <h3>👨‍👩‍👧 Family Time</h3>
                        ${this.renderTasks('family')}
                    </div>
                    
                    <div class="category-section">
                        <h3>📚 Responsibility</h3>
                        ${this.renderTasks('responsibility')}
                    </div>
                </div>
                
                ${completedCount >= 3 ? `
                    <div class="family-bonus">
                        🌟 Great job! You're being responsible today!
                    </div>
                ` : `
                    <div class="family-encourage">
                        Complete at least 3 tasks to build your streak!
                    </div>
                `}
                
                <div class="family-tips">
                    <h4>💡 Why This Matters</h4>
                    <ul>
                        <li>Gaming is more fun when responsibilities are done first!</li>
                        <li>Your family appreciates when you help out</li>
                        <li>Good habits now = successful life later</li>
                        <li>Honoring parents is one of the Ten Commandments!</li>
                    </ul>
                </div>
            </div>
        `;
        
        this.showOverlay(html);
    },
    
    renderTasks: function(category) {
        const categoryTasks = this.tasks.filter(t => t.category === category);
        
        return categoryTasks.map(task => {
            const isComplete = this.completedToday.includes(task.id);
            
            return `
                <div class="task-item ${isComplete ? 'complete' : ''}" onclick="FamilySystem.toggleTask('${task.id}')">
                    <div class="task-checkbox">${isComplete ? '✅' : '⬜'}</div>
                    <div class="task-info">
                        <strong>${task.name}</strong>
                        <p>${task.description}</p>
                        <span class="task-points">+${task.points} pts</span>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    toggleTask: function(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        const index = this.completedToday.indexOf(taskId);
        
        if (index > -1) {
            // Already complete - uncheck
            this.completedToday.splice(index, 1);
        } else {
            // Mark complete
            this.completedToday.push(taskId);
            
            // Award points
            if (typeof ScoreSystem !== 'undefined') {
                ScoreSystem.add(task.points, task.name);
            }
            
            // Record in history
            this.taskHistory.push({
                taskId: taskId,
                date: new Date().toISOString()
            });
            
            // Show scripture
            UIManager?.showMessage('📖 ' + task.scripture, 3000);
            
            // Update last completion
            this.lastCompletionDate = new Date();
            
            // Check daily completion bonus
            if (this.completedToday.length === 3) {
                if (typeof ScoreSystem !== 'undefined') {
                    ScoreSystem.add(this.points.dailyAllComplete, 'Responsible Kid Bonus!');
                }
            }
            
            // Check streak bonus
            if (this.completedToday.length >= 3 && this.familyStreak > 0 && this.familyStreak % 7 === 0) {
                if (typeof ScoreSystem !== 'undefined') {
                    ScoreSystem.add(this.points.weeklyStreak, 'Weekly Family Champion!');
                }
            }
        }
        
        this.saveProgress();
        
        // Refresh display
        this.openFamilyDashboard();
    },
    
    // Get incomplete priority task (for gentle reminders during game)
    getPriorityReminder: function() {
        const hour = new Date().getHours();
        
        // Morning - room
        if (hour < 12 && !this.completedToday.includes('clean_room')) {
            return this.tasks.find(t => t.id === 'clean_room');
        }
        
        // Afternoon - homework
        if (hour >= 14 && hour < 18 && !this.completedToday.includes('homework')) {
            return this.tasks.find(t => t.id === 'homework');
        }
        
        // Evening - family dinner
        if (hour >= 17 && hour < 20 && !this.completedToday.includes('family_dinner')) {
            return this.tasks.find(t => t.id === 'family_dinner');
        }
        
        return null;
    },
    
    showOverlay: function(html) {
        let overlay = document.getElementById('family-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'family-overlay';
            overlay.className = 'family-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = html;
        overlay.style.display = 'flex';
    },
    
    closeDashboard: function() {
        const overlay = document.getElementById('family-overlay');
        if (overlay) overlay.style.display = 'none';
    }
};

// Styles
const familyStyles = `
<style>
.family-overlay {
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
.family-dashboard {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ff6b6b;
    border-radius: 20px;
    padding: 25px;
    max-width: 600px;
    width: 100%;
    color: white;
    max-height: 90vh;
    overflow-y: auto;
}
.family-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.family-header h2 { color: #ff6b6b; margin: 0; }
.family-verse {
    background: rgba(255,107,107,0.1);
    padding: 15px;
    border-radius: 10px;
    font-style: italic;
    margin-bottom: 20px;
    text-align: center;
}
.family-verse span {
    display: block;
    margin-top: 8px;
    color: rgba(255,255,255,0.6);
}
.family-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 25px;
}
.family-stats .stat {
    text-align: center;
}
.stat-value {
    display: block;
    font-size: 2em;
    color: #ffd700;
}
.stat-label {
    color: rgba(255,255,255,0.6);
}
.category-section {
    margin-bottom: 20px;
}
.category-section h3 {
    color: #4ecdc4;
    margin-bottom: 10px;
    font-size: 1.1em;
}
.task-item {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255,255,255,0.1);
    padding: 12px 15px;
    border-radius: 10px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s;
}
.task-item:hover {
    background: rgba(255,255,255,0.15);
}
.task-item.complete {
    background: rgba(78,205,196,0.2);
    opacity: 0.8;
}
.task-checkbox {
    font-size: 1.5em;
}
.task-info strong {
    display: block;
    color: #ffd700;
}
.task-info p {
    font-size: 0.9em;
    color: rgba(255,255,255,0.7);
    margin: 3px 0;
}
.task-points {
    color: #4ecdc4;
    font-size: 0.85em;
}
.family-bonus {
    background: linear-gradient(90deg, rgba(255,215,0,0.2), rgba(78,205,196,0.2));
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.1em;
    color: #ffd700;
    margin: 20px 0;
}
.family-encourage {
    background: rgba(255,255,255,0.1);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    margin: 20px 0;
}
.family-tips {
    background: rgba(255,255,255,0.05);
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
}
.family-tips h4 {
    color: #ffd700;
    margin-bottom: 10px;
}
.family-tips ul {
    margin-left: 20px;
}
.family-tips li {
    margin-bottom: 5px;
    color: rgba(255,255,255,0.8);
}
.family-reminder {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ff6b6b;
    border-radius: 15px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 9000;
    max-width: 400px;
    animation: slideInLeft 0.5s ease;
}
@keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
.reminder-icon { font-size: 2em; }
.reminder-content strong { color: #ff6b6b; display: block; }
.reminder-content p { color: white; font-size: 0.9em; margin-top: 3px; }
.family-reminder button {
    background: #ff6b6b;
    border: none;
    padding: 8px 15px;
    border-radius: 15px;
    color: white;
    cursor: pointer;
}
.family-reminder .dismiss {
    background: none;
    padding: 5px;
}
</style>
`;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', familyStyles);
    });
}

if (typeof module !== 'undefined') {
    module.exports = FamilySystem;
}
