// ============================================
// BIRDTURDS v40.5 - COMIC SPEECH BUBBLE SYSTEM
// Comic book style speech bubbles from good farmer
// Scripture, prayers, comments about red tractor
// ============================================

const ComicBubbleSystem = {
    currentBubble: null,
    bubbleTimer: null,
    
    // Points
    points: {
        readScripture: 15,      // Let it display fully
        closeEarly: 0,          // No points if closed early
        readMultiple: 5,        // Bonus per additional read
        neverClosed: 100        // End of round bonus if never closed any
    },
    
    // Tracking
    bubblesShown: 0,
    bubblesClosed: 0,
    
    // Display settings
    displayDuration: 8000,      // 8 seconds before auto-fade
    minTimeBetween: 30000,      // 30 seconds minimum between bubbles
    lastBubbleTime: 0,
    
    // Messages when demon is near
    demonEncounter: {
        farmerResponses: [
            { text: "Get behind me, Satan!", ref: "Matthew 16:23" },
            { text: "Get thee behind me, devil, in the name of Jesus!", ref: "Luke 4:8" },
            { text: "Resist the devil and he will flee!", ref: "James 4:7" },
            { text: "Greater is He that is in me than he that is in the world!", ref: "1 John 4:4" },
            { text: "No weapon formed against me shall prosper!", ref: "Isaiah 54:17" },
            { text: "The Lord rebuke you, Satan!", ref: "Zechariah 3:2" },
            { text: "I am covered by the blood of Jesus!", ref: "Revelation 12:11" },
            { text: "Submit to God, resist the devil!", ref: "James 4:7" }
        ],
        hunterResponses: [
            "Get behind me, Satan!",
            "In Jesus' name, be gone!",
            "The Lord is my shield!",
            "I plead the blood of Jesus!",
            "You have no power here, devil!",
            "Jesus is Lord!"
        ]
    },
    
    // Show demon encounter response
    showDemonResponse: function(entityType, x, y) {
        // Clear any existing bubble first
        if (this.currentBubble) {
            this.closeBubble(false);
        }
        
        let message;
        if (entityType === 'farmer') {
            const response = this.demonEncounter.farmerResponses[
                Math.floor(Math.random() * this.demonEncounter.farmerResponses.length)
            ];
            message = response;
        } else {
            const text = this.demonEncounter.hunterResponses[
                Math.floor(Math.random() * this.demonEncounter.hunterResponses.length)
            ];
            message = { text: text };
        }
        
        this.createDemonResponseBubble(x, y, message, entityType);
    },
    
    createDemonResponseBubble: function(x, y, message, entityType) {
        const bubble = document.createElement('div');
        bubble.className = 'comic-bubble demon-response';
        bubble.id = 'demon-response-bubble';
        
        bubble.style.left = (x - 50) + 'px';
        bubble.style.top = (y - 100) + 'px';
        
        const content = `
            <span class="bubble-category demon-cat">⚔️ Spiritual Battle!</span>
            <button class="bubble-close" onclick="ComicBubbleSystem.closeBubble(true)">✕</button>
            <div class="bubble-text" style="color: #ff6b6b; font-weight: bold;">"${message.text}"</div>
            ${message.ref ? `<span class="bubble-ref">— ${message.ref}</span>` : ''}
            <div class="bubble-progress" style="animation-duration: 5000ms"></div>
        `;
        
        bubble.innerHTML = content;
        
        const container = document.getElementById('game-container') || document.body;
        container.appendChild(bubble);
        
        this.currentBubble = bubble;
        
        // Shorter duration for battle cries
        this.bubbleTimer = setTimeout(() => {
            this.closeBubble(false);
        }, 5000);
        
        // Award points for witnessing spiritual battle
        if (typeof ScoreSystem !== 'undefined') {
            ScoreSystem.add(25, 'Spiritual Warfare!');
        }
    },
        // Scripture quotes
        scripture: [
            { text: "The Lord is my shepherd, I shall not want!", ref: "Psalm 23:1" },
            { text: "This is the day the Lord has made - let us rejoice!", ref: "Psalm 118:24" },
            { text: "Give thanks to the Lord, for He is good!", ref: "Psalm 107:1" },
            { text: "Trust in the Lord with all your heart!", ref: "Proverbs 3:5" },
            { text: "The joy of the Lord is my strength!", ref: "Nehemiah 8:10" },
            { text: "Be strong and courageous!", ref: "Joshua 1:9" },
            { text: "Cast your cares on Him - He cares for you!", ref: "1 Peter 5:7" },
            { text: "I can do all things through Christ!", ref: "Philippians 4:13" },
            { text: "God is our refuge and strength!", ref: "Psalm 46:1" },
            { text: "The Lord is good to all!", ref: "Psalm 145:9" },
            { text: "His mercies are new every morning!", ref: "Lamentations 3:23" },
            { text: "Delight yourself in the Lord!", ref: "Psalm 37:4" }
        ],
        
        // Praise and worship
        praise: [
            "Hallelujah! What a beautiful day to praise the Lord!",
            "Thank You Jesus for this beautiful creation!",
            "Glory to God in the highest!",
            "Bless the Lord, O my soul!",
            "How great is our God!",
            "Jesus is Lord! Amen!",
            "Praise the Lord for His goodness!",
            "Thank You Father for Your blessings!",
            "What a mighty God we serve!",
            "To God be the glory!"
        ],
        
        // Comments about red tractor/demon
        prayingForRed: [
            "I'm prayin' for that fella on the red tractor... he seems so troubled.",
            "Lord, bring peace to that angry man's heart!",
            "That poor soul... anger comes from not knowing Jesus' love.",
            "I pray that demon leaves him alone. Jesus is stronger!",
            "Bless his heart... he just needs the Lord's peace.",
            "Father, help that man find Your joy!",
            "Anger can't win when Jesus is on your side!",
            "I'm prayin' he finds what only Jesus can give.",
            "That demon's got no power over those who trust in God!",
            "Lord, shine Your light on that troubled soul!"
        ],
        
        // Encouragement to player
        encouragement: [
            "Keep shootin' straight, friend! God's got your back!",
            "You're doin' great! The Lord is with you!",
            "Don't give up! Greater is He that is in you!",
            "Stay strong in the Lord!",
            "Remember - you're more than a conqueror!",
            "God's watchin' over you, friend!",
            "Keep your eyes on Jesus!",
            "You've got this - with God's help!"
        ],
        
        // Wisdom and life advice
        wisdom: [
            "Remember to honor your mama and papa today!",
            "A cheerful heart is good medicine!",
            "Be kind to everyone you meet - they're fightin' battles too.",
            "Hard work honors God - don't be lazy!",
            "Help out around the house - bless your family!",
            "Spend time with your family at supper tonight!",
            "Keep your room tidy - it honors the Lord!",
            "Do your chores with a joyful heart!",
            "Love your neighbor as yourself!",
            "Be quick to listen, slow to speak!"
        ]
    },
    
    init: function() {
        this.bubblesShown = 0;
        this.bubblesClosed = 0;
        this.currentBubble = null;
        this.injectStyles();
    },
    
    injectStyles: function() {
        if (document.getElementById('comic-bubble-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'comic-bubble-styles';
        styles.textContent = `
            .comic-bubble {
                position: absolute;
                background: white;
                border: 3px solid #333;
                border-radius: 20px;
                padding: 15px 20px;
                max-width: 280px;
                font-family: 'Comic Sans MS', 'Chalkboard', cursive;
                color: #333;
                z-index: 1000;
                animation: bubbleAppear 0.5s ease;
                box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
            }
            
            @keyframes bubbleAppear {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            .comic-bubble::after {
                content: '';
                position: absolute;
                bottom: -20px;
                left: 30px;
                border: 10px solid transparent;
                border-top-color: #333;
            }
            
            .comic-bubble::before {
                content: '';
                position: absolute;
                bottom: -14px;
                left: 33px;
                border: 7px solid transparent;
                border-top-color: white;
                z-index: 1;
            }
            
            /* Cloud style for scripture */
            .comic-bubble.cloud {
                border-radius: 50px;
                background: 
                    radial-gradient(circle at 20% 80%, white 20%, transparent 20%),
                    radial-gradient(circle at 80% 80%, white 20%, transparent 20%),
                    radial-gradient(circle at 50% 100%, white 30%, transparent 30%),
                    white;
                border: none;
                box-shadow: 
                    0 0 0 3px #333,
                    inset 0 0 20px rgba(200,200,255,0.3);
            }
            
            .comic-bubble.cloud::after,
            .comic-bubble.cloud::before {
                display: none;
            }
            
            .cloud-tail {
                position: absolute;
                bottom: -25px;
                left: 40px;
            }
            
            .cloud-tail span {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: white;
                border: 2px solid #333;
                border-radius: 50%;
                margin-left: -5px;
            }
            
            .cloud-tail span:nth-child(1) { transform: scale(1); }
            .cloud-tail span:nth-child(2) { transform: scale(0.7); }
            .cloud-tail span:nth-child(3) { transform: scale(0.5); }
            
            .bubble-close {
                position: absolute;
                top: 5px;
                right: 8px;
                background: none;
                border: none;
                font-size: 1.2em;
                cursor: pointer;
                color: #999;
                line-height: 1;
            }
            
            .bubble-close:hover {
                color: #333;
            }
            
            .bubble-text {
                font-size: 1em;
                line-height: 1.4;
                margin-right: 15px;
            }
            
            .bubble-ref {
                display: block;
                margin-top: 8px;
                font-size: 0.85em;
                color: #666;
                font-style: italic;
            }
            
            .bubble-category {
                position: absolute;
                top: -10px;
                left: 15px;
                background: #ffd700;
                color: #333;
                padding: 2px 10px;
                border-radius: 10px;
                font-size: 0.75em;
                font-weight: bold;
            }
            
            .bubble-category.demon-cat {
                background: linear-gradient(90deg, #ff6b6b, #ffd700);
                animation: demonGlow 0.5s ease infinite alternate;
            }
            
            @keyframes demonGlow {
                from { box-shadow: 0 0 5px #ff6b6b; }
                to { box-shadow: 0 0 15px #ffd700; }
            }
            
            .comic-bubble.demon-response {
                border-color: #ff6b6b;
                animation: bubbleAppear 0.3s ease, demonShake 0.5s ease;
            }
            
            @keyframes demonShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            .bubble-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: #4ecdc4;
                border-radius: 0 0 20px 20px;
                animation: bubbleProgress linear forwards;
            }
            
            @keyframes bubbleProgress {
                from { width: 100%; }
                to { width: 0%; }
            }
            
            .bubble-fade {
                animation: bubbleFade 0.5s ease forwards;
            }
            
            @keyframes bubbleFade {
                to { transform: scale(0.8); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    },
    
    // Show a bubble from the good farmer
    showBubble: function(tractorX, tractorY, messageType = null) {
        // Check cooldown
        const now = Date.now();
        if (now - this.lastBubbleTime < this.minTimeBetween) return;
        
        // Don't show if one is already visible
        if (this.currentBubble) return;
        
        // Pick message type if not specified
        if (!messageType) {
            const types = ['scripture', 'praise', 'encouragement', 'wisdom'];
            
            // If red tractor is nearby, sometimes comment on it
            if (typeof TractorSystem !== 'undefined' && TractorSystem.hasRedTractor()) {
                types.push('prayingForRed', 'prayingForRed'); // Higher chance
            }
            
            messageType = types[Math.floor(Math.random() * types.length)];
        }
        
        // Get message
        const messages = this.messages[messageType];
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        // Create bubble element
        this.createBubble(tractorX, tractorY, message, messageType);
        
        this.lastBubbleTime = now;
        this.bubblesShown++;
    },
    
    createBubble: function(x, y, message, type) {
        const bubble = document.createElement('div');
        bubble.className = 'comic-bubble' + (type === 'scripture' ? ' cloud' : '');
        bubble.id = 'farmer-bubble';
        
        // Position above tractor
        bubble.style.left = (x - 50) + 'px';
        bubble.style.top = (y - 120) + 'px';
        
        // Category label
        const categoryLabels = {
            scripture: '📖 Scripture',
            praise: '🙏 Praise',
            prayingForRed: '❤️ Prayer',
            encouragement: '💪 Encouragement',
            wisdom: '💡 Wisdom'
        };
        
        // Build content
        let content = '';
        
        if (type === 'scripture') {
            content = `
                <span class="bubble-category">${categoryLabels[type]}</span>
                <button class="bubble-close" onclick="ComicBubbleSystem.closeBubble(true)">✕</button>
                <div class="bubble-text">"${message.text}"</div>
                <span class="bubble-ref">— ${message.ref}</span>
                <div class="cloud-tail"><span></span><span></span><span></span></div>
                <div class="bubble-progress" style="animation-duration: ${this.displayDuration}ms"></div>
            `;
        } else {
            content = `
                <span class="bubble-category">${categoryLabels[type] || '💬'}</span>
                <button class="bubble-close" onclick="ComicBubbleSystem.closeBubble(true)">✕</button>
                <div class="bubble-text">${message}</div>
                <div class="bubble-progress" style="animation-duration: ${this.displayDuration}ms"></div>
            `;
        }
        
        bubble.innerHTML = content;
        
        // Add to game container or body
        const container = document.getElementById('game-container') || document.body;
        container.appendChild(bubble);
        
        this.currentBubble = bubble;
        
        // Record scripture for quiz if applicable
        if (type === 'scripture' && typeof ScriptureQuizSystem !== 'undefined') {
            ScriptureQuizSystem.recordScripture(message);
        }
        
        // Auto-hide after duration
        this.bubbleTimer = setTimeout(() => {
            this.closeBubble(false);
        }, this.displayDuration);
    },
    
    closeBubble: function(wasManual) {
        if (!this.currentBubble) return;
        
        clearTimeout(this.bubbleTimer);
        
        if (wasManual) {
            // Closed early - no points, track it
            this.bubblesClosed++;
        } else {
            // Let it display fully - award points!
            if (typeof ScoreSystem !== 'undefined') {
                ScoreSystem.add(this.points.readScripture, 'Read Scripture!');
            }
        }
        
        // Fade out animation
        this.currentBubble.classList.add('bubble-fade');
        
        setTimeout(() => {
            if (this.currentBubble) {
                this.currentBubble.remove();
                this.currentBubble = null;
            }
        }, 500);
    },
    
    // Called at end of round
    getEndOfRoundBonus: function() {
        if (this.bubblesClosed === 0 && this.bubblesShown > 0) {
            // Never closed any - bonus!
            return this.points.neverClosed;
        }
        return 0;
    },
    
    // Update position if tractor moves
    updatePosition: function(x, y) {
        if (this.currentBubble) {
            this.currentBubble.style.left = (x - 50) + 'px';
            this.currentBubble.style.top = (y - 120) + 'px';
        }
    },
    
    // Force show a specific type (for testing or events)
    forceShow: function(type, x, y) {
        this.lastBubbleTime = 0; // Reset cooldown
        if (this.currentBubble) {
            this.closeBubble(false);
        }
        setTimeout(() => {
            this.showBubble(x || 300, y || 400, type);
        }, 100);
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = ComicBubbleSystem;
}
