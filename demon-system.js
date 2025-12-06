// ============================================
// BIRDTURDS v40.5 - DEMON SYSTEM
// Hovers above red tractor driver
// Doesn't die - flees when shot, returns later
// ============================================

const DemonSystem = {
    demon: null,
    isActive: false,
    linkedTractor: null,
    
    // States
    states: {
        FLY: 0,      // Hovering normally
        ATTACK: 1,   // Swooping (visual only)
        HIT: 2,      // Just got shot
        FLEE: 3      // Flying away
    },
    
    // Configuration
    config: {
        width: 60,
        height: 70,
        sprite: 'sprites/demon/demon_strip.png',
        spriteLeft: 'sprites/demon/demon_strip_left.png',
        frames: 4,
        frameSpeed: 200,
        
        // Hover above tractor driver
        hoverOffset: { x: 30, y: -50 },
        hoverAmplitude: 5,  // Slight bob up/down
        hoverSpeed: 0.003,
        
        // When shot
        hitPoints: 100,           // Points per hit
        fleeSpeed: 12,
        returnDelay: 30000,       // 30 seconds
        
        // Sound
        screechSound: 'sounds/demon_screech.mp3'
    },
    
    init: function() {
        this.demon = null;
        this.isActive = false;
        this.linkedTractor = null;
        this.loadSprites();
    },
    
    loadSprites: function() {
        this.sprites = {
            right: new Image(),
            left: new Image()
        };
        this.sprites.right.src = this.config.sprite;
        this.sprites.left.src = this.config.spriteLeft;
    },
    
    spawn: function(tractor) {
        if (this.isActive) return;
        
        this.linkedTractor = tractor;
        this.demon = {
            x: tractor.x + this.config.hoverOffset.x,
            y: tractor.y + this.config.hoverOffset.y,
            width: this.config.width,
            height: this.config.height,
            state: this.states.FLY,
            frame: 0,
            frameTimer: 0,
            hoverTimer: 0,
            direction: tractor.direction
        };
        
        this.isActive = true;
        
        // Trigger hunter comment
        setTimeout(() => {
            VoiceSystem.playHunterComment('demon');
        }, 1000);
    },
    
    update: function(deltaTime) {
        if (!this.isActive || !this.demon) return;
        
        const d = this.demon;
        const cfg = this.config;
        
        // Animation
        d.frameTimer += deltaTime;
        if (d.frameTimer >= cfg.frameSpeed) {
            d.frameTimer = 0;
            d.frame = d.state; // Frame matches state
        }
        
        switch (d.state) {
            case this.states.FLY:
            case this.states.ATTACK:
                this.updateHover(deltaTime);
                break;
                
            case this.states.HIT:
                // Brief hit state then flee
                setTimeout(() => {
                    d.state = this.states.FLEE;
                }, 300);
                break;
                
            case this.states.FLEE:
                this.updateFlee(deltaTime);
                break;
        }
    },
    
    updateHover: function(deltaTime) {
        const d = this.demon;
        const cfg = this.config;
        
        // Follow linked tractor
        if (this.linkedTractor && this.linkedTractor.isActive !== false) {
            d.x = this.linkedTractor.x + cfg.hoverOffset.x;
            d.direction = this.linkedTractor.direction;
            
            // Hover bob effect
            d.hoverTimer += deltaTime * cfg.hoverSpeed;
            const hoverY = Math.sin(d.hoverTimer) * cfg.hoverAmplitude;
            d.y = this.linkedTractor.y + cfg.hoverOffset.y + hoverY;
            
            // Check proximity to good tractor farmer for spiritual battle
            this.checkSpiritualBattle(d);
            
            // Occasional swoop animation
            if (Math.random() < 0.002) {
                d.state = this.states.ATTACK;
                setTimeout(() => {
                    if (d.state === this.states.ATTACK) {
                        d.state = this.states.FLY;
                    }
                }, 500);
            }
        } else {
            // Tractor gone, fly away
            d.state = this.states.FLEE;
        }
    },
    
    // Check if demon is near good tractor or hunter - triggers spiritual battle response
    checkSpiritualBattle: function(demon) {
        // Cooldown check
        if (this.lastSpiritualBattle && Date.now() - this.lastSpiritualBattle < 15000) {
            return; // 15 second cooldown between spiritual battles
        }
        
        // Check distance to good tractor farmer
        if (typeof TractorSystem !== 'undefined') {
            const goodTractors = TractorSystem.tractors.filter(t => t.type === 'good');
            
            for (const tractor of goodTractors) {
                const dist = Math.abs(demon.x - tractor.x);
                
                if (dist < 200) {
                    // Farmer responds to demon!
                    if (typeof ComicBubbleSystem !== 'undefined') {
                        ComicBubbleSystem.showDemonResponse('farmer', tractor.x + 60, tractor.y);
                        this.lastSpiritualBattle = Date.now();
                    }
                    return;
                }
            }
        }
        
        // Check distance to hunter
        if (typeof Hunter !== 'undefined' && Hunter.x) {
            const dist = Math.sqrt(
                Math.pow(demon.x - Hunter.x, 2) + 
                Math.pow(demon.y - Hunter.y, 2)
            );
            
            if (dist < 150 && Math.random() < 0.01) { // Occasional hunter response
                if (typeof ComicBubbleSystem !== 'undefined') {
                    ComicBubbleSystem.showDemonResponse('hunter', Hunter.x, Hunter.y - 50);
                    this.lastSpiritualBattle = Date.now();
                }
            }
        }
    },
    
    lastSpiritualBattle: null,
    
    updateFlee: function(deltaTime) {
        const d = this.demon;
        const cfg = this.config;
        
        // Fly up and away
        d.y -= cfg.fleeSpeed;
        d.x += cfg.fleeSpeed * 0.5 * d.direction;
        
        // Gone off screen?
        if (d.y < -100) {
            this.isActive = false;
            this.demon = null;
            
            // Schedule return if tractor still exists
            if (this.linkedTractor) {
                console.log('Demon will return in', cfg.returnDelay / 1000, 'seconds');
                setTimeout(() => {
                    if (this.linkedTractor) {
                        this.spawn(this.linkedTractor);
                    }
                }, cfg.returnDelay);
            }
        }
    },
    
    onHit: function() {
        if (!this.isActive || !this.demon) return;
        
        const d = this.demon;
        
        // Play screech
        AudioManager.play(this.config.screechSound);
        
        // Award points
        ScoreSystem.add(this.config.hitPoints, 'Demon hit!');
        
        // Change to hit state
        d.state = this.states.HIT;
        
        // Hunter celebrates
        VoiceSystem.playHunterComment('demon_hit');
        
        // Show message
        UIManager.showMessage('+' + this.config.hitPoints + ' Demon hit!', 1500);
    },
    
    onTractorRemoved: function(tractor) {
        if (this.linkedTractor === tractor) {
            if (this.demon) {
                this.demon.state = this.states.FLEE;
            }
            this.linkedTractor = null;
        }
    },
    
    // Check if bullet hits demon
    checkHit: function(bullet) {
        if (!this.isActive || !this.demon) return false;
        
        const d = this.demon;
        
        // Can't hit while fleeing (too fast)
        if (d.state === this.states.FLEE) return false;
        
        // AABB collision
        if (bullet.x < d.x + d.width &&
            bullet.x + bullet.width > d.x &&
            bullet.y < d.y + d.height &&
            bullet.y + bullet.height > d.y) {
            
            this.onHit();
            return true;
        }
        
        return false;
    },
    
    render: function(ctx) {
        if (!this.isActive || !this.demon) return;
        
        const d = this.demon;
        const cfg = this.config;
        
        const sprite = d.direction > 0 ? 
            this.sprites.right : this.sprites.left;
        
        if (sprite.complete) {
            const frameWidth = cfg.width;
            const sourceX = d.frame * frameWidth;
            
            // Draw demon
            ctx.drawImage(
                sprite,
                sourceX, 0,
                frameWidth, cfg.height,
                d.x, d.y,
                cfg.width, cfg.height
            );
            
            // Red glow effect when active
            if (d.state === this.states.FLY || d.state === this.states.ATTACK) {
                ctx.save();
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(
                    d.x + cfg.width / 2,
                    d.y + cfg.height / 2,
                    cfg.width * 0.6,
                    0, Math.PI * 2
                );
                ctx.fill();
                ctx.restore();
            }
        }
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = DemonSystem;
}
