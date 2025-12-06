// ============================================
// BIRDTURDS v40.5 - ANGEL SYSTEM
// Summon divine intervention to smite the demon!
// ============================================

const AngelSystem = {
    angel: null,
    isActive: false,
    isDescending: false,
    isSmiting: false,
    isAscending: false,
    
    // Cooldown tracking
    lastSummon: 0,
    cooldown: 60000,  // 60 seconds between summons
    
    // Costs and rewards
    summonCost: 200,
    demonHitReward: 100,  // Still get demon hit points
    
    // Extended flee time for angel smite
    extendedFleeDuration: 45000,  // 45 seconds vs normal 30
    
    config: {
        sprite: 'sprites/angel/angel_strip.png',
        width: 80,
        height: 100,
        frames: 4,
        frameSpeed: 150,
        
        // Descent from top of screen
        descendSpeed: 8,
        smiteY: 200,  // Y position when smiting
        ascendSpeed: 6,
        
        // Visual effects
        glowColor: 'rgba(255, 255, 255, 0.8)',
        smiteColor: 'rgba(255, 255, 200, 0.9)',
        lightBeamWidth: 100
    },
    
    states: {
        IDLE: 0,
        DESCEND: 1,
        SMITE: 2,
        ASCEND: 3
    },
    
    init: function() {
        this.angel = null;
        this.isActive = false;
        this.lastSummon = 0;
        this.loadSprite();
    },
    
    loadSprite: function() {
        this.sprite = new Image();
        this.sprite.src = this.config.sprite;
    },
    
    // Check if angel can be summoned
    canSummon: function() {
        const now = Date.now();
        
        // Check cooldown
        if (now - this.lastSummon < this.cooldown) {
            const remaining = Math.ceil((this.cooldown - (now - this.lastSummon)) / 1000);
            UIManager.showMessage(`Angel cooldown: ${remaining}s`, 1500);
            return false;
        }
        
        // Check if demon is present
        if (!DemonSystem.isActive || !DemonSystem.demon) {
            UIManager.showMessage('No demon to smite!', 1500);
            return false;
        }
        
        // Check if player has enough points
        if (ScoreSystem.total < this.summonCost) {
            UIManager.showMessage(`Need ${this.summonCost} points to summon Angel!`, 1500);
            return false;
        }
        
        return true;
    },
    
    // Summon the angel!
    summon: function() {
        if (!this.canSummon()) return false;
        
        // Deduct points
        ScoreSystem.subtract(this.summonCost, 'Angel summoned!');
        
        // Record summon time
        this.lastSummon = Date.now();
        
        // Create angel
        const demon = DemonSystem.demon;
        this.angel = {
            x: demon.x,
            y: -this.config.height,  // Start above screen
            width: this.config.width,
            height: this.config.height,
            state: this.states.DESCEND,
            frame: 0,
            frameTimer: 0,
            targetX: demon.x,
            targetY: this.config.smiteY
        };
        
        this.isActive = true;
        this.isDescending = true;
        
        // Play summon sound
        AudioManager.play('sounds/angel_summon.mp3');
        
        // Show message
        UIManager.showMessage('👼 Divine Intervention!', 2000);
        
        // Play voice line
        VoiceSystem.showSpeechBubble('Angel', 'Be gone, foul creature!', 2500);
        
        console.log('Angel summoned!');
        return true;
    },
    
    update: function(deltaTime) {
        if (!this.isActive || !this.angel) return;
        
        const a = this.angel;
        const cfg = this.config;
        
        // Animation
        a.frameTimer += deltaTime;
        if (a.frameTimer >= cfg.frameSpeed) {
            a.frameTimer = 0;
            a.frame = (a.frame + 1) % cfg.frames;
        }
        
        switch (a.state) {
            case this.states.DESCEND:
                this.updateDescend(deltaTime);
                break;
                
            case this.states.SMITE:
                this.updateSmite(deltaTime);
                break;
                
            case this.states.ASCEND:
                this.updateAscend(deltaTime);
                break;
        }
    },
    
    updateDescend: function(deltaTime) {
        const a = this.angel;
        const cfg = this.config;
        
        // Move toward target
        a.y += cfg.descendSpeed;
        
        // Track demon position
        if (DemonSystem.demon) {
            a.targetX = DemonSystem.demon.x;
        }
        a.x += (a.targetX - a.x) * 0.1;
        
        // Reached smite position?
        if (a.y >= a.targetY) {
            a.y = a.targetY;
            a.state = this.states.SMITE;
            this.performSmite();
        }
    },
    
    performSmite: function() {
        // Play smite sound
        AudioManager.play('sounds/angel_smite.mp3');
        
        // Hit the demon
        if (DemonSystem.isActive && DemonSystem.demon) {
            // Award demon hit points
            ScoreSystem.add(this.demonHitReward, 'Demon smitten!');
            
            // Play demon screech
            AudioManager.play('sounds/demon_screech.mp3');
            
            // Make demon flee for extended time
            DemonSystem.demon.state = DemonSystem.states.HIT;
            DemonSystem.isFleeing = true;
            
            // Override return delay for angel smite
            DemonSystem.returnDelay = this.extendedFleeDuration;
        }
        
        // Visual effect timing
        this.smiteTimer = 0;
        this.smiteDuration = 1500;
        this.isSmiting = true;
        
        // After smite, ascend
        setTimeout(() => {
            this.angel.state = this.states.ASCEND;
            this.isSmiting = false;
            
            // Reset demon return delay to normal
            DemonSystem.returnDelay = 30000;
        }, this.smiteDuration);
    },
    
    updateSmite: function(deltaTime) {
        // Hover in place during smite
        this.smiteTimer += deltaTime;
        
        // Slight hover effect
        this.angel.y = this.config.smiteY + Math.sin(this.smiteTimer * 0.01) * 5;
    },
    
    updateAscend: function(deltaTime) {
        const a = this.angel;
        const cfg = this.config;
        
        // Rise up
        a.y -= cfg.ascendSpeed;
        
        // Gone off screen?
        if (a.y < -cfg.height) {
            this.isActive = false;
            this.angel = null;
            this.isAscending = false;
            console.log('Angel departed');
        }
    },
    
    render: function(ctx) {
        if (!this.isActive || !this.angel) return;
        
        const a = this.angel;
        const cfg = this.config;
        
        ctx.save();
        
        // Glow effect behind angel
        const gradient = ctx.createRadialGradient(
            a.x + cfg.width / 2, a.y + cfg.height / 2, 10,
            a.x + cfg.width / 2, a.y + cfg.height / 2, cfg.width
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 200, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 150, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(a.x + cfg.width / 2, a.y + cfg.height / 2, cfg.width, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw angel sprite
        if (this.sprite && this.sprite.complete) {
            const frameWidth = cfg.width;
            const sourceX = a.frame * frameWidth;
            
            ctx.drawImage(
                this.sprite,
                sourceX, 0,
                frameWidth, cfg.height,
                a.x, a.y,
                cfg.width, cfg.height
            );
        } else {
            // Fallback: draw simple angel shape
            this.drawFallbackAngel(ctx, a);
        }
        
        // Smite beam effect
        if (this.isSmiting && DemonSystem.demon) {
            this.renderSmiteBeam(ctx, a);
        }
        
        ctx.restore();
    },
    
    drawFallbackAngel: function(ctx, a) {
        const cfg = this.config;
        const cx = a.x + cfg.width / 2;
        const cy = a.y + cfg.height / 2;
        
        // Wings
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.ellipse(cx - 30, cy, 25, 40, -0.3, 0, Math.PI * 2);
        ctx.ellipse(cx + 30, cy, 25, 40, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Body
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 10, 15, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Head
        ctx.beginPath();
        ctx.arc(cx, cy - 25, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Halo
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(cx, cy - 45, 12, 4, 0, 0, Math.PI * 2);
        ctx.stroke();
    },
    
    renderSmiteBeam: function(ctx, a) {
        const demon = DemonSystem.demon;
        if (!demon) return;
        
        const cfg = this.config;
        const startX = a.x + cfg.width / 2;
        const startY = a.y + cfg.height;
        const endX = demon.x + demon.width / 2;
        const endY = demon.y + demon.height / 2;
        
        // Create beam gradient
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 200, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 200, 100, 0.6)');
        
        // Draw beam
        ctx.strokeStyle = gradient;
        ctx.lineWidth = cfg.lightBeamWidth;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.7 + Math.sin(Date.now() * 0.02) * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Inner bright beam
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        ctx.globalAlpha = 1;
    },
    
    // Get remaining cooldown in seconds
    getCooldownRemaining: function() {
        const now = Date.now();
        const elapsed = now - this.lastSummon;
        if (elapsed >= this.cooldown) return 0;
        return Math.ceil((this.cooldown - elapsed) / 1000);
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = AngelSystem;
}
