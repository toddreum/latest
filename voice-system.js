// ============================================
// BIRDTURDS v40.5 - VOICE SYSTEM
// Light humor, not preachy, well-spaced
// ============================================

const VoiceSystem = {
    // Timers to prevent spam
    lastPastorComment: 0,
    lastScripture: 0,
    lastHunterComment: 0,
    
    // Intervals (in ms) - well spaced!
    intervals: {
        pastorMin: 60000,      // At least 1 minute between pastor comments
        pastorMax: 120000,     // Up to 2 minutes
        scripture: 300000,      // 5 minutes between scripture
        hunterMin: 45000,      // 45 seconds between hunter comments
        hunterMax: 90000       // Up to 90 seconds
    },
    
    // ==========================================
    // PASTOR COMMENTS
    // Triggered by bad tractor driver presence
    // Light, humorous, sympathetic tone
    // ==========================================
    pastorLines: [
        "Bless his heart, that fella's havin' a rough day!",
        "Someone woke up on the wrong side of the barn!",
        "Well now, that's an angry tractor if I ever saw one!",
        "Lord give me patience... and hurry it up!",
        "That man needs a hug. A real long one.",
        "Looks like someone skipped breakfast AND coffee!",
        "I'll be prayin' for that one. Might take a while.",
        "Easy there, friend! It's just birds!"
    ],
    
    // ==========================================
    // HUNTER COMMENTS - DEMON APPEARS
    // Casual, surprised, funny reactions
    // ==========================================
    hunterDemonLines: [
        "Well, that ain't somethin' you see every day!",
        "What in tarnation is THAT?!",
        "Hey ugly! Yeah, I'm talkin' to you!",
        "Now THAT'S what I call a varmint!",
        "Did that thing come with the tractor?",
        "That's the ugliest bird I ever seen!",
        "Git! Go on now, GIT!",
        "Somebody call a priest... or pest control!"
    ],
    
    // ==========================================
    // HUNTER COMMENTS - DEMON HIT
    // Celebratory, victorious
    // ==========================================
    hunterDemonHitLines: [
        "Got 'im!",
        "Take THAT!",
        "Run away, ya varmint!",
        "And don't come back!",
        "That's what I thought!",
        "Yeehaw!",
        "Not in MY county!"
    ],
    
    // ==========================================
    // SCRIPTURE QUOTES
    // Very occasional, short, punchy
    // Only when demon is actively present
    // ==========================================
    scriptureLines: [
        { 
            text: "Resist the devil and he will flee!", 
            ref: "James 4:7",
            short: true
        },
        { 
            text: "Greater is He in you than he in the world!", 
            ref: "1 John 4:4",
            short: true
        },
        { 
            text: "No weapon formed against you shall prosper!", 
            ref: "Isaiah 54:17",
            short: true
        },
        { 
            text: "Be strong and courageous!", 
            ref: "Joshua 1:9",
            short: true
        },
        { 
            text: "The Lord is my shepherd!", 
            ref: "Psalm 23:1",
            short: true
        }
    ],
    
    // Currently queued line (prevent overlap)
    currentLine: null,
    lineTimer: 0,
    
    init: function() {
        this.lastPastorComment = Date.now();
        this.lastScripture = Date.now();
        this.lastHunterComment = Date.now();
        this.currentLine = null;
    },
    
    update: function(deltaTime) {
        const now = Date.now();
        
        // Clear expired line
        if (this.currentLine) {
            this.lineTimer -= deltaTime;
            if (this.lineTimer <= 0) {
                this.currentLine = null;
            }
        }
        
        // Only trigger comments if demon/bad tractor is present
        if (!DemonSystem.isActive) return;
        
        // Pastor comments (random interval)
        const pastorInterval = this.intervals.pastorMin + 
            Math.random() * (this.intervals.pastorMax - this.intervals.pastorMin);
        
        if (now - this.lastPastorComment > pastorInterval) {
            if (!this.currentLine) { // Don't overlap
                this.playPastorComment();
                this.lastPastorComment = now;
            }
        }
        
        // Scripture (every 5 min, ONLY if demon visible)
        if (now - this.lastScripture > this.intervals.scripture) {
            if (!this.currentLine && DemonSystem.demon) {
                this.playScripture();
                this.lastScripture = now;
            }
        }
    },
    
    playPastorComment: function() {
        const line = this.getRandomLine(this.pastorLines);
        this.showSpeechBubble('Pastor Earl', line, 3500);
        
        // Play audio if available (from ElevenLabs on server)
        // AudioManager.playVoice('pastor', line);
    },
    
    playHunterComment: function(type) {
        const now = Date.now();
        
        // Check cooldown
        const hunterInterval = this.intervals.hunterMin + 
            Math.random() * (this.intervals.hunterMax - this.intervals.hunterMin);
        
        if (now - this.lastHunterComment < 5000) return; // At least 5s gap
        
        let line;
        if (type === 'demon') {
            line = this.getRandomLine(this.hunterDemonLines);
        } else if (type === 'demon_hit') {
            line = this.getRandomLine(this.hunterDemonHitLines);
        }
        
        if (line && !this.currentLine) {
            this.showSpeechBubble('Hunter', line, 2500);
            this.lastHunterComment = now;
        }
    },
    
    playScripture: function() {
        const scripture = this.scriptureLines[
            Math.floor(Math.random() * this.scriptureLines.length)
        ];
        
        const text = `"${scripture.text}"\n- ${scripture.ref}`;
        this.showSpeechBubble('📖', text, 4000);
    },
    
    getRandomLine: function(lines) {
        return lines[Math.floor(Math.random() * lines.length)];
    },
    
    showSpeechBubble: function(speaker, text, duration) {
        this.currentLine = { speaker, text };
        this.lineTimer = duration;
        
        // Tell UI to display
        if (typeof UIManager !== 'undefined') {
            UIManager.showSpeechBubble(speaker, text, duration);
        } else {
            console.log(`[${speaker}]: ${text}`);
        }
    },
    
    // Render speech bubble (if UIManager doesn't handle it)
    render: function(ctx) {
        if (!this.currentLine) return;
        
        const { speaker, text } = this.currentLine;
        
        // Background bubble
        const bubbleX = 20;
        const bubbleY = 80;
        const bubbleWidth = 350;
        const bubbleHeight = 70;
        
        // Draw bubble
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        
        // Rounded rectangle
        ctx.beginPath();
        ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
        ctx.fill();
        ctx.stroke();
        
        // Speaker name
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(speaker, bubbleX + 10, bubbleY + 20);
        
        // Text
        ctx.font = '13px Arial';
        ctx.fillStyle = '#555';
        
        // Word wrap
        const words = text.split(' ');
        let line = '';
        let y = bubbleY + 40;
        
        words.forEach(word => {
            const testLine = line + word + ' ';
            if (ctx.measureText(testLine).width > bubbleWidth - 20) {
                ctx.fillText(line, bubbleX + 10, y);
                line = word + ' ';
                y += 16;
            } else {
                line = testLine;
            }
        });
        ctx.fillText(line, bubbleX + 10, y);
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = VoiceSystem;
}
