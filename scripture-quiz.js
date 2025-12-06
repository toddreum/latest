// ============================================
// BIRDTURDS v40.5 - SCRIPTURE QUIZ SYSTEM
// Track scriptures shown, quiz player for bonus points
// ============================================

const ScriptureQuizSystem = {
    // Scriptures shown this round
    shownScriptures: [],
    maxTracked: 5,
    
    // Quiz state
    quizActive: false,
    currentQuiz: null,
    quizResults: [],
    
    // Points
    points: {
        correctAnswer: 100,
        partialAnswer: 50,
        perfectRound: 500,  // All correct!
        bonusStreak: 25     // Per consecutive correct
    },
    
    // Current streak
    streak: 0,
    
    init: function() {
        this.shownScriptures = [];
        this.quizResults = [];
        this.streak = 0;
        this.quizActive = false;
    },
    
    // Called when a scripture is displayed to player
    recordScripture: function(scripture) {
        // Don't duplicate
        const exists = this.shownScriptures.find(s => s.ref === scripture.ref);
        if (exists) return;
        
        // Add to tracking (max 5)
        if (this.shownScriptures.length >= this.maxTracked) {
            this.shownScriptures.shift(); // Remove oldest
        }
        
        this.shownScriptures.push({
            text: scripture.text,
            ref: scripture.ref,
            category: scripture.category,
            timestamp: Date.now()
        });
        
        console.log('Scripture recorded:', scripture.ref);
    },
    
    // Get count of scriptures to quiz on
    getQuizCount: function() {
        return Math.min(this.shownScriptures.length, 3); // Quiz on up to 3
    },
    
    // Start the quiz (called at end of round)
    startQuiz: function(onComplete) {
        if (this.shownScriptures.length === 0) {
            console.log('No scriptures to quiz on');
            if (onComplete) onComplete(0);
            return;
        }
        
        this.quizActive = true;
        this.quizResults = [];
        this.streak = 0;
        this.onQuizComplete = onComplete;
        
        // Shuffle and pick up to 3
        const shuffled = [...this.shownScriptures].sort(() => Math.random() - 0.5);
        this.quizQueue = shuffled.slice(0, 3);
        
        this.showNextQuestion();
    },
    
    showNextQuestion: function() {
        if (this.quizQueue.length === 0) {
            this.finishQuiz();
            return;
        }
        
        const scripture = this.quizQueue.shift();
        this.currentQuiz = this.generateQuestion(scripture);
        
        // Render quiz UI
        this.renderQuizUI();
    },
    
    // Generate a quiz question
    generateQuestion: function(scripture) {
        // Randomly choose question type
        const types = ['reference', 'completion', 'category'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        switch (type) {
            case 'reference':
                // "What scripture says: [quote]?"
                return {
                    type: 'reference',
                    question: `What scripture says: "${scripture.text}"`,
                    correctAnswer: scripture.ref,
                    options: this.generateReferenceOptions(scripture.ref),
                    scripture: scripture
                };
                
            case 'completion':
                // "Complete: [partial quote]..."
                const words = scripture.text.split(' ');
                const partial = words.slice(0, Math.ceil(words.length / 2)).join(' ');
                return {
                    type: 'completion',
                    question: `Complete the verse: "${partial}..."`,
                    correctAnswer: scripture.text,
                    options: this.generateCompletionOptions(scripture.text),
                    scripture: scripture
                };
                
            case 'category':
                // "This verse is about: [strength/light/etc]"
                return {
                    type: 'category',
                    question: `"${scripture.text}" - This verse is about:`,
                    correctAnswer: scripture.category,
                    options: ['strength', 'light', 'goodnews', 'awakening', 'protection'],
                    scripture: scripture
                };
        }
    },
    
    generateReferenceOptions: function(correctRef) {
        const allRefs = [
            'John 3:16', 'Psalm 23:1', 'Philippians 4:13', 'Romans 8:28',
            'Jeremiah 29:11', 'Proverbs 3:5', 'Isaiah 40:31', 'Matthew 6:33',
            'Joshua 1:9', 'Psalm 46:1', 'Ephesians 6:11', '1 John 4:4',
            'James 4:7', 'Psalm 27:1', 'John 8:32', 'Psalm 119:105'
        ];
        
        // Remove correct answer and pick 3 random
        const others = allRefs.filter(r => r !== correctRef);
        const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
        
        // Add correct answer and shuffle
        const options = [...shuffled, correctRef].sort(() => Math.random() - 0.5);
        return options;
    },
    
    generateCompletionOptions: function(correctText) {
        // Generate plausible but wrong completions
        const wrongEndings = [
            '...and the darkness has not overcome it!',
            '...for He is good, His love endures forever!',
            '...and all these things will be added unto you!',
            '...for I am with you always!',
            '...and you will find rest for your souls!'
        ];
        
        const others = wrongEndings
            .filter(e => !correctText.includes(e.substring(3, 20)))
            .slice(0, 3);
        
        const options = [...others, correctText].sort(() => Math.random() - 0.5);
        return options;
    },
    
    // Submit answer
    submitAnswer: function(answer) {
        if (!this.currentQuiz) return;
        
        const correct = answer === this.currentQuiz.correctAnswer ||
                       answer.toLowerCase() === this.currentQuiz.correctAnswer.toLowerCase();
        
        // Record result
        this.quizResults.push({
            question: this.currentQuiz,
            playerAnswer: answer,
            correct: correct
        });
        
        // Update streak
        if (correct) {
            this.streak++;
        } else {
            this.streak = 0;
        }
        
        // Show feedback
        this.showFeedback(correct, this.currentQuiz.correctAnswer);
        
        // Next question after delay
        setTimeout(() => {
            this.showNextQuestion();
        }, 2000);
    },
    
    showFeedback: function(correct, correctAnswer) {
        const feedbackDiv = document.getElementById('quiz-feedback');
        if (feedbackDiv) {
            if (correct) {
                feedbackDiv.innerHTML = `<div class="correct">✅ Correct! +${this.points.correctAnswer + (this.streak * this.points.bonusStreak)} points!</div>`;
            } else {
                feedbackDiv.innerHTML = `<div class="incorrect">❌ The answer was: ${correctAnswer}</div>`;
            }
        }
    },
    
    finishQuiz: function() {
        this.quizActive = false;
        
        // Calculate total points
        let totalPoints = 0;
        let correctCount = 0;
        
        this.quizResults.forEach((result, idx) => {
            if (result.correct) {
                correctCount++;
                totalPoints += this.points.correctAnswer;
                // Streak bonus (based on position)
                totalPoints += idx * this.points.bonusStreak;
            }
        });
        
        // Perfect round bonus
        if (correctCount === this.quizResults.length && this.quizResults.length > 0) {
            totalPoints += this.points.perfectRound;
        }
        
        // Award points
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(totalPoints, 'Scripture Quiz Bonus!');
        }
        
        // Show results
        this.showQuizResults(correctCount, this.quizResults.length, totalPoints);
        
        // Callback
        if (this.onQuizComplete) {
            this.onQuizComplete(totalPoints);
        }
        
        // Clear for next round
        this.shownScriptures = [];
    },
    
    showQuizResults: function(correct, total, points) {
        const resultsHTML = `
            <div class="quiz-results">
                <h2>📖 Scripture Quiz Results!</h2>
                <div class="score">${correct}/${total} Correct</div>
                ${correct === total && total > 0 ? '<div class="perfect">🌟 PERFECT! +500 Bonus!</div>' : ''}
                <div class="points">+${points} Points!</div>
                <button onclick="ScriptureQuizSystem.closeQuiz()">Continue</button>
            </div>
        `;
        
        const overlay = document.getElementById('quiz-overlay');
        if (overlay) {
            overlay.innerHTML = resultsHTML;
        }
    },
    
    renderQuizUI: function() {
        if (!this.currentQuiz) return;
        
        const q = this.currentQuiz;
        
        let optionsHTML = '';
        q.options.forEach((opt, idx) => {
            optionsHTML += `<button class="quiz-option" onclick="ScriptureQuizSystem.submitAnswer('${opt.replace(/'/g, "\\'")}')">${opt}</button>`;
        });
        
        const quizHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <span>📖 Scripture Quiz</span>
                    <span>Question ${this.quizResults.length + 1}/${this.quizQueue.length + this.quizResults.length + 1}</span>
                </div>
                <div class="quiz-question">${q.question}</div>
                <div class="quiz-options">${optionsHTML}</div>
                <div id="quiz-feedback"></div>
                ${this.streak > 1 ? `<div class="streak">🔥 ${this.streak} Streak!</div>` : ''}
            </div>
        `;
        
        // Create or update overlay
        let overlay = document.getElementById('quiz-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'quiz-overlay';
            overlay.className = 'quiz-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = quizHTML;
        overlay.style.display = 'flex';
    },
    
    closeQuiz: function() {
        const overlay = document.getElementById('quiz-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    },
    
    // Skip quiz (player opts out)
    skipQuiz: function() {
        this.quizActive = false;
        this.closeQuiz();
        if (this.onQuizComplete) {
            this.onQuizComplete(0);
        }
    }
};

// CSS for quiz (injected)
const quizStyles = `
<style>
.quiz-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}
.quiz-container {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 3px solid #ffd700;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    text-align: center;
    color: white;
}
.quiz-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: #ffd700;
    font-size: 1.2em;
}
.quiz-question {
    font-size: 1.4em;
    margin: 20px 0;
    line-height: 1.5;
}
.quiz-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.quiz-option {
    background: linear-gradient(145deg, #4ecdc4, #44a3a0);
    border: none;
    padding: 15px;
    border-radius: 10px;
    font-size: 1.1em;
    cursor: pointer;
    transition: all 0.3s;
    color: white;
}
.quiz-option:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(78,205,196,0.4);
}
#quiz-feedback {
    margin: 20px 0;
    font-size: 1.3em;
}
.correct { color: #4ecdc4; }
.incorrect { color: #ff6b6b; }
.streak { color: #ffd700; font-size: 1.2em; margin-top: 10px; }
.quiz-results h2 { color: #ffd700; }
.quiz-results .score { font-size: 2em; margin: 20px 0; }
.quiz-results .perfect { color: #ffd700; font-size: 1.5em; }
.quiz-results .points { color: #4ecdc4; font-size: 1.8em; margin: 15px 0; }
.quiz-results button {
    background: #ffd700;
    color: #1a1a2e;
    border: none;
    padding: 15px 40px;
    border-radius: 25px;
    font-size: 1.2em;
    cursor: pointer;
    margin-top: 20px;
}
</style>
`;

// Inject styles on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', quizStyles);
    });
}

// Export
if (typeof module !== 'undefined') {
    module.exports = ScriptureQuizSystem;
}
