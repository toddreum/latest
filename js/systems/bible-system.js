// ============================================
// BIRDTURDS v40.5 - BIBLE SYSTEM
// Holy Scripture pickups for health, points, and protection
// ============================================

const BibleSystem = {
    bibles: [],
    maxBibles: 3,
    spawnTimer: 0,
    spawnInterval: 45000,  // 45 seconds between spawns
    
    // Player's bible power
    playerBiblePower: 0,
    maxBiblePower: 100,
    powerDecayRate: 0.5,  // Decays over time
    
    // Protection aura
    protectionRadius: 150,  // Demon can't get within this range
    
    config: {
        sprite: 'sprites/items/bible.png',
        width: 35,
        height: 45,
        
        // Rewards
        healthRestore: 25,
        pointsReward: 50,
        powerGain: 35,  // Bible power gained per pickup
        
        // Visual
        glowColor: 'rgba(255, 255, 200, 0.6)',
        auraColor: 'rgba(255, 255, 255, 0.3)',
        
        // Sound
        pickupSound: 'sounds/bible_pickup.mp3'
    },
    
    // ==========================================
    // SCRIPTURE QUOTES - Strength, Light, Good News, Awakening
    // ==========================================
    scriptures: [
        // STRENGTH
        { 
            text: "I can do all things through Christ who strengthens me!", 
            ref: "Philippians 4:13",
            category: 'strength'
        },
        { 
            text: "The Lord is my strength and my shield!", 
            ref: "Psalm 28:7",
            category: 'strength'
        },
        { 
            text: "Be strong and courageous! Do not be afraid!", 
            ref: "Joshua 1:9",
            category: 'strength'
        },
        { 
            text: "God is our refuge and strength, a very present help!", 
            ref: "Psalm 46:1",
            category: 'strength'
        },
        { 
            text: "The joy of the Lord is your strength!", 
            ref: "Nehemiah 8:10",
            category: 'strength'
        },
        
        // LIGHT
        { 
            text: "The Lord is my light and my salvation!", 
            ref: "Psalm 27:1",
            category: 'light'
        },
        { 
            text: "Your word is a lamp to my feet and a light to my path!", 
            ref: "Psalm 119:105",
            category: 'light'
        },
        { 
            text: "You are the light of the world!", 
            ref: "Matthew 5:14",
            category: 'light'
        },
        { 
            text: "The light shines in the darkness!", 
            ref: "John 1:5",
            category: 'light'
        },
        { 
            text: "Walk as children of light!", 
            ref: "Ephesians 5:8",
            category: 'light'
        },
        
        // GOOD NEWS
        { 
            text: "For God so loved the world that He gave His only Son!", 
            ref: "John 3:16",
            category: 'goodnews'
        },
        { 
            text: "The truth shall set you free!", 
            ref: "John 8:32",
            category: 'goodnews'
        },
        { 
            text: "Behold, I bring you good news of great joy!", 
            ref: "Luke 2:10",
            category: 'goodnews'
        },
        { 
            text: "If anyone is in Christ, he is a new creation!", 
            ref: "2 Corinthians 5:17",
            category: 'goodnews'
        },
        { 
            text: "By grace you have been saved through faith!", 
            ref: "Ephesians 2:8",
            category: 'goodnews'
        },
        
        // AWAKENING
        { 
            text: "Awake, O sleeper, and arise from the dead!", 
            ref: "Ephesians 5:14",
            category: 'awakening'
        },
        { 
            text: "Behold, I am making all things new!", 
            ref: "Revelation 21:5",
            category: 'awakening'
        },
        { 
            text: "The Spirit of truth will guide you into all truth!", 
            ref: "John 16:13",
            category: 'awakening'
        },
        { 
            text: "You will know the truth, and the truth will set you free!", 
            ref: "John 8:32",
            category: 'awakening'
        },
        { 
            text: "Open my eyes that I may see wonderful things!", 
            ref: "Psalm 119:18",
            category: 'awakening'
        },
        
        // PROTECTION
        { 
            text: "No weapon formed against you shall prosper!", 
            ref: "Isaiah 54:17",
            category: 'protection'
        },
        { 
            text: "The Lord will fight for you; you need only be still!", 
            ref: "Exodus 14:14",
            category: 'protection'
        },
        { 
            text: "Greater is He that is in you than he that is in the world!", 
            ref: "1 John 4:4",
            category: 'protection'
        },
        { 
            text: "He who dwells in the shelter of the Most High will rest in His shadow!", 
            ref: "Psalm 91:1",
            category: 'protection'
        },
        { 
            text: "The Lord is my shepherd; I shall not want!", 
            ref: "Psalm 23:1",
            category: 'protection'
        }
    ],
    
    init: function() {
        this.bibles = [];
        this.playerBiblePower = 0;
        this.loadSprite();
    },
    
    loadSprite: function() {
        this.sprite = new Image();
        this.sprite.src = this.config.sprite;
    },
    
    spawn: function(x, y) {
        if (this.bibles.length >= this.maxBibles) return;
        
        // If no position given, spawn at random ground location
        if (x === undefined) {
            x = 100 + Math.random() * (GameCore.canvas.width - 200);
            y = GameCore.canvas.height - this.config.height - 50;
        }
        
        const bible = {
            x: x,
            y: y,
            width: this.config.width,
            height: this.config.height,
            bobTimer: Math.random() * Math.PI * 2,  // For floating animation
            glowTimer: 0,
            isActive: true
        };
        
        this.bibles.push(bible);
        return bible;
    },
    
    update: function(deltaTime) {
        // Spawn timer
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnInterval && this.bibles.length < this.maxBibles) {
            this.spawn();
            this.spawnTimer = 0;
        }
        
        // Update bibles
        for (let i = this.bibles.length - 1; i >= 0; i--) {
            const bible = this.bibles[i];
            
            // Floating/bobbing animation
            bible.bobTimer += deltaTime * 0.003;
            bible.glowTimer += deltaTime * 0.005;
        }
        
        // Decay player's bible power over time
        if (this.playerBiblePower > 0) {
            this.playerBiblePower -= this.powerDecayRate * (deltaTime / 1000);
            if (this.playerBiblePower < 0) this.playerBiblePower = 0;
        }
        
        // Apply demon repulsion if player has bible power
        if (this.playerBiblePower > 0 && typeof DemonSystem !== 'undefined') {
            this.repelDemon();
        }
    },
    
    // Check if player picks up a bible
    checkPickup: function(player) {
        for (let i = this.bibles.length - 1; i >= 0; i--) {
            const bible = this.bibles[i];
            
            // AABB collision
            if (player.x < bible.x + bible.width &&
                player.x + player.width > bible.x &&
                player.y < bible.y + bible.height &&
                player.y + player.height > bible.y) {
                
                this.onPickup(bible, player, i);
                return true;
            }
        }
        return false;
    },
    
    onPickup: function(bible, player, index) {
        const cfg = this.config;
        
        // Play sound
        AudioManager.play(cfg.pickupSound);
        
        // Restore health
        if (typeof PlayerSystem !== 'undefined') {
            PlayerSystem.health = Math.min(
                PlayerSystem.health + cfg.healthRestore,
                PlayerSystem.maxHealth || 100
            );
        }
        
        // Award points
        ScoreSystem.add(cfg.pointsReward, 'Bible pickup!');
        
        // Increase bible power (protection)
        this.playerBiblePower = Math.min(
            this.playerBiblePower + cfg.powerGain,
            this.maxBiblePower
        );
        
        // Show scripture
        this.showScripture();
        
        // Show pickup effect
        UIManager.showMessage(`📖 +${cfg.healthRestore} HP  +${cfg.pointsReward} pts`, 2000);
        
        // Remove bible
        this.bibles.splice(index, 1);
    },
    
    showScripture: function() {
        // Pick random scripture
        const scripture = this.scriptures[
            Math.floor(Math.random() * this.scriptures.length)
        ];
        
        // Record for quiz system!
        if (typeof ScriptureQuizSystem !== 'undefined') {
            ScriptureQuizSystem.recordScripture(scripture);
        }
        
        // Show in speech bubble with longer duration
        VoiceSystem.showSpeechBubble(
            '📖 ' + scripture.ref,
            `"${scripture.text}"`,
            4500
        );
    },
    
    // Keep demon away from player with bible power
    repelDemon: function() {
        if (!DemonSystem.isActive || !DemonSystem.demon) return;
        
        const player = PlayerSystem;
        const demon = DemonSystem.demon;
        
        // Calculate distance
        const dx = demon.x - player.x;
        const dy = demon.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate protection radius based on bible power
        const currentRadius = this.protectionRadius * (this.playerBiblePower / this.maxBiblePower);
        
        // If demon is too close, push it away
        if (distance < currentRadius && distance > 0) {
            // Calculate push direction
            const pushX = (dx / distance) * 5;
            const pushY = (dy / distance) * 5;
            
            // Push demon
            demon.x += pushX;
            demon.y += pushY;
            
            // Demon reacts
            if (demon.state !== DemonSystem.states.FLEE) {
                demon.state = DemonSystem.states.HIT;
            }
        }
    },
    
    // Get current protection radius (for rendering)
    getProtectionRadius: function() {
        if (this.playerBiblePower <= 0) return 0;
        return this.protectionRadius * (this.playerBiblePower / this.maxBiblePower);
    },
    
    render: function(ctx) {
        const cfg = this.config;
        
        // Render bibles
        this.bibles.forEach(bible => {
            // Glow effect
            const glowIntensity = 0.5 + Math.sin(bible.glowTimer) * 0.3;
            ctx.save();
            
            // Outer glow
            const gradient = ctx.createRadialGradient(
                bible.x + cfg.width / 2,
                bible.y + cfg.height / 2,
                5,
                bible.x + cfg.width / 2,
                bible.y + cfg.height / 2,
                cfg.width
            );
            gradient.addColorStop(0, `rgba(255, 255, 200, ${glowIntensity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(
                bible.x + cfg.width / 2,
                bible.y + cfg.height / 2,
                cfg.width,
                0, Math.PI * 2
            );
            ctx.fill();
            
            // Bob offset
            const bobY = Math.sin(bible.bobTimer) * 5;
            
            // Draw bible sprite
            if (this.sprite && this.sprite.complete) {
                ctx.drawImage(
                    this.sprite,
                    bible.x,
                    bible.y + bobY,
                    cfg.width,
                    cfg.height
                );
            } else {
                // Fallback: draw book shape
                this.drawFallbackBible(ctx, bible.x, bible.y + bobY);
            }
            
            ctx.restore();
        });
        
        // Render player's protection aura
        if (this.playerBiblePower > 0 && typeof PlayerSystem !== 'undefined') {
            this.renderProtectionAura(ctx);
        }
    },
    
    drawFallbackBible: function(ctx, x, y) {
        const cfg = this.config;
        
        // Book cover (dark red/brown)
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x, y, cfg.width, cfg.height);
        
        // Spine
        ctx.fillStyle = '#654321';
        ctx.fillRect(x, y, 5, cfg.height);
        
        // Pages
        ctx.fillStyle = '#FFF8DC';
        ctx.fillRect(x + 5, y + 3, cfg.width - 8, cfg.height - 6);
        
        // Cross
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x + cfg.width/2 - 2, y + 8, 4, 20);
        ctx.fillRect(x + cfg.width/2 - 8, y + 14, 16, 4);
        
        // Text "HOLY BIBLE"
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 6px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('HOLY', x + cfg.width/2, y + cfg.height - 10);
        ctx.fillText('BIBLE', x + cfg.width/2, y + cfg.height - 3);
        ctx.textAlign = 'left';
    },
    
    renderProtectionAura: function(ctx) {
        const player = PlayerSystem;
        const radius = this.getProtectionRadius();
        
        if (radius <= 0) return;
        
        ctx.save();
        
        const centerX = player.x + player.width / 2;
        const centerY = player.y + player.height / 2;
        
        // Pulsing effect
        const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.1;
        const currentRadius = radius * pulse;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
            centerX, centerY, currentRadius * 0.3,
            centerX, centerY, currentRadius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 200, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 255, 150, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner ring
        ctx.strokeStyle = `rgba(255, 255, 200, ${0.3 * (this.playerBiblePower / this.maxBiblePower)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentRadius * 0.9, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    },
    
    // Check if demon should be repelled at position
    isDemonRepelled: function(demonX, demonY) {
        if (this.playerBiblePower <= 0) return false;
        if (typeof PlayerSystem === 'undefined') return false;
        
        const player = PlayerSystem;
        const dx = demonX - player.x;
        const dy = demonY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < this.getProtectionRadius();
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = BibleSystem;
}
