// ============================================
// BIRDTURDS v40.5 - Snipers, Wildlife & Golden Rings
// ============================================

// ============================================
// SNIPER ENEMY SYSTEM
// ============================================

const SniperSystem = {
    snipers: [],
    maxSnipers: 3,
    
    // Sniper doesn't appear in Trump scene
    validScenes: ['park', 'farm', 'country', 'beach', 'city'],
    excludedScenes: ['trump'],
    
    // Points for hitting a sniper
    hitPoints: 500,
    
    // Sniper config
    config: {
        shootInterval: 3000,     // Shoots every 3 seconds
        hideTime: 2000,          // Hides for 2 seconds after shooting
        peekTime: 1500,          // Peeks out for 1.5 seconds before shooting
        bulletSpeed: 8,
        damage: 15,
        width: 50,
        height: 60
    },
    
    // Hiding spots per scene
    hidingSpots: {
        park: [
            { x: 50, y: 350, type: 'bush' },
            { x: 700, y: 350, type: 'bush' },
            { x: 400, y: 300, type: 'tree' }
        ],
        farm: [
            { x: 100, y: 380, type: 'haystack' },
            { x: 650, y: 380, type: 'haystack' },
            { x: 350, y: 320, type: 'barn_window' }
        ],
        country: [
            { x: 80, y: 360, type: 'bush' },
            { x: 720, y: 360, type: 'rock' },
            { x: 450, y: 340, type: 'fence' }
        ],
        beach: [
            { x: 120, y: 400, type: 'umbrella' },
            { x: 680, y: 400, type: 'sandcastle' },
            { x: 400, y: 350, type: 'lifeguard_tower' }
        ],
        city: [
            { x: 50, y: 300, type: 'dumpster' },
            { x: 750, y: 280, type: 'mailbox' },
            { x: 400, y: 250, type: 'window' }
        ]
    },
    
    // Active bullets from snipers
    bullets: [],
    
    init: function(scene) {
        this.snipers = [];
        this.bullets = [];
        
        // No snipers in Trump scene
        if (this.excludedScenes.includes(scene)) {
            console.log('Snipers disabled for this scene');
            return;
        }
        
        if (!this.validScenes.includes(scene)) {
            return;
        }
        
        const spots = this.hidingSpots[scene] || [];
        const count = Math.min(1 + Math.floor(Math.random() * 2), spots.length);
        
        // Spawn snipers at random hiding spots
        const usedSpots = [];
        for (let i = 0; i < count; i++) {
            let spot;
            do {
                spot = spots[Math.floor(Math.random() * spots.length)];
            } while (usedSpots.includes(spot) && usedSpots.length < spots.length);
            
            usedSpots.push(spot);
            
            this.snipers.push({
                x: spot.x,
                y: spot.y,
                width: this.config.width,
                height: this.config.height,
                hideType: spot.type,
                state: 'hidden',     // hidden, peeking, shooting, hit
                stateTimer: 0,
                shootTimer: Math.random() * 2000, // Stagger initial shots
                health: 1,           // One hit kill
                direction: spot.x < 400 ? 1 : -1,
                scopeGlint: 0,
                hasShot: false
            });
        }
    },
    
    update: function(deltaTime, hunter) {
        // Update snipers
        this.snipers.forEach(sniper => {
            if (sniper.health <= 0) return;
            
            sniper.stateTimer += deltaTime;
            sniper.shootTimer += deltaTime;
            sniper.scopeGlint = (sniper.scopeGlint + deltaTime * 0.01) % (Math.PI * 2);
            
            switch (sniper.state) {
                case 'hidden':
                    if (sniper.shootTimer >= this.config.shootInterval) {
                        sniper.state = 'peeking';
                        sniper.stateTimer = 0;
                        sniper.hasShot = false;
                    }
                    break;
                    
                case 'peeking':
                    if (sniper.stateTimer >= this.config.peekTime) {
                        sniper.state = 'shooting';
                        sniper.stateTimer = 0;
                        this.fireAtHunter(sniper, hunter);
                    }
                    break;
                    
                case 'shooting':
                    if (sniper.stateTimer >= 300) { // Short shooting animation
                        sniper.state = 'hidden';
                        sniper.stateTimer = 0;
                        sniper.shootTimer = 0;
                    }
                    break;
                    
                case 'hit':
                    // Death animation
                    if (sniper.stateTimer >= 1000) {
                        sniper.health = 0;
                    }
                    break;
            }
        });
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            
            // Check if hit hunter
            if (this.isColliding(bullet, hunter)) {
                // Hunter hit by sniper!
                return false; // Remove bullet, damage handled by caller
            }
            
            // Remove if off screen
            if (bullet.x < -20 || bullet.x > 820 || bullet.y < -20 || bullet.y > 620) {
                return false;
            }
            
            return true;
        });
        
        // Clean up dead snipers
        this.snipers = this.snipers.filter(s => s.health > 0 || s.state === 'hit');
    },
    
    fireAtHunter: function(sniper, hunter) {
        if (sniper.hasShot) return;
        sniper.hasShot = true;
        
        // Calculate direction to hunter
        const dx = (hunter.x + hunter.width/2) - (sniper.x + sniper.width/2);
        const dy = (hunter.y + hunter.height/2) - (sniper.y + sniper.height/3);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Add some inaccuracy
        const accuracy = 0.85 + Math.random() * 0.15;
        
        this.bullets.push({
            x: sniper.x + sniper.width/2,
            y: sniper.y + sniper.height/3,
            width: 8,
            height: 4,
            vx: (dx / dist) * this.config.bulletSpeed * accuracy,
            vy: (dy / dist) * this.config.bulletSpeed * accuracy,
            fromSniper: true
        });
        
        SoundManager.playSFX('sniper_shot.mp3');
    },
    
    // Check if hunter's bullet hits a sniper
    checkHunterShot: function(bullet) {
        for (let sniper of this.snipers) {
            if (sniper.health <= 0) continue;
            if (sniper.state === 'hidden') continue; // Can't hit when fully hidden
            
            // Expand hitbox slightly when peeking/shooting
            const hitbox = {
                x: sniper.x - 10,
                y: sniper.y - 10,
                width: sniper.width + 20,
                height: sniper.height + 20
            };
            
            if (this.isColliding(bullet, hitbox)) {
                // HIT!
                sniper.health = 0;
                sniper.state = 'hit';
                sniper.stateTimer = 0;
                
                SoundManager.playSFX('sniper_hit.mp3');
                
                return {
                    hit: true,
                    points: this.hitPoints,
                    sniper: sniper,
                    message: '🎯 SNIPER DOWN! +500'
                };
            }
        }
        return { hit: false };
    },
    
    // Check if sniper bullet hits hunter
    checkHunterHit: function(hunter) {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            
            if (this.isColliding(bullet, hunter)) {
                this.bullets.splice(i, 1);
                
                return {
                    hit: true,
                    damage: this.config.damage,
                    message: '💥 Sniper hit you!'
                };
            }
        }
        return { hit: false };
    },
    
    render: function(ctx) {
        // Render snipers
        this.snipers.forEach(sniper => {
            ctx.save();
            
            // Flip based on direction
            if (sniper.direction < 0) {
                ctx.translate(sniper.x + sniper.width, 0);
                ctx.scale(-1, 1);
                ctx.translate(-sniper.x, 0);
            }
            
            // Draw hiding spot first
            this.drawHidingSpot(ctx, sniper);
            
            // Draw sniper based on state
            if (sniper.state !== 'hidden' || sniper.state === 'hit') {
                this.drawSniper(ctx, sniper);
            }
            
            // Scope glint when peeking (warning to player!)
            if (sniper.state === 'peeking') {
                const glintIntensity = 0.5 + Math.sin(sniper.scopeGlint * 3) * 0.5;
                ctx.fillStyle = `rgba(255, 0, 0, ${glintIntensity})`;
                ctx.beginPath();
                ctx.arc(sniper.x + sniper.width - 5, sniper.y + 15, 4, 0, Math.PI * 2);
                ctx.fill();
                
                // Warning text
                ctx.fillStyle = '#FF0000';
                ctx.font = 'bold 12px Arial';
                ctx.fillText('!', sniper.x + sniper.width + 5, sniper.y + 10);
            }
            
            ctx.restore();
        });
        
        // Render sniper bullets (red tracer)
        this.bullets.forEach(bullet => {
            ctx.save();
            ctx.fillStyle = '#FF0000';
            ctx.shadowColor = '#FF0000';
            ctx.shadowBlur = 5;
            
            const angle = Math.atan2(bullet.vy, bullet.vx);
            ctx.translate(bullet.x, bullet.y);
            ctx.rotate(angle);
            
            ctx.fillRect(-bullet.width/2, -bullet.height/2, bullet.width, bullet.height);
            
            // Tracer trail
            ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
            ctx.fillRect(-bullet.width/2 - 15, -bullet.height/4, 15, bullet.height/2);
            
            ctx.restore();
        });
    },
    
    drawHidingSpot: function(ctx, sniper) {
        switch (sniper.hideType) {
            case 'bush':
                ctx.fillStyle = '#228B22';
                ctx.beginPath();
                ctx.arc(sniper.x + 25, sniper.y + 40, 35, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#2E8B2E';
                ctx.beginPath();
                ctx.arc(sniper.x + 35, sniper.y + 35, 25, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'haystack':
                ctx.fillStyle = '#DAA520';
                ctx.beginPath();
                ctx.moveTo(sniper.x, sniper.y + 60);
                ctx.lineTo(sniper.x + 25, sniper.y);
                ctx.lineTo(sniper.x + 50, sniper.y + 60);
                ctx.fill();
                break;
                
            case 'rock':
                ctx.fillStyle = '#696969';
                ctx.beginPath();
                ctx.ellipse(sniper.x + 25, sniper.y + 45, 30, 20, 0, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'dumpster':
                ctx.fillStyle = '#2F4F4F';
                ctx.fillRect(sniper.x - 10, sniper.y + 10, 70, 50);
                ctx.fillStyle = '#1C3030';
                ctx.fillRect(sniper.x - 10, sniper.y + 10, 70, 10);
                break;
                
            default:
                // Generic cover
                ctx.fillStyle = '#555';
                ctx.fillRect(sniper.x, sniper.y + 30, 50, 30);
        }
    },
    
    drawSniper: function(ctx, sniper) {
        const x = sniper.x;
        const y = sniper.y;
        
        if (sniper.state === 'hit') {
            // Death animation - falling
            ctx.globalAlpha = 1 - (sniper.stateTimer / 1000);
            ctx.translate(0, sniper.stateTimer * 0.05);
        }
        
        // Head with balaclava
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(x + 25, y + 15, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#FFF';
        ctx.fillRect(x + 18, y + 12, 14, 5);
        ctx.fillStyle = '#000';
        ctx.fillRect(x + 20, y + 13, 4, 3);
        ctx.fillRect(x + 26, y + 13, 4, 3);
        
        // Body
        ctx.fillStyle = '#2F4F4F'; // Dark tactical
        ctx.fillRect(x + 15, y + 25, 20, 25);
        
        // Rifle
        ctx.fillStyle = '#333';
        ctx.fillRect(x + 30, y + 15, 35, 6);
        ctx.fillRect(x + 25, y + 20, 10, 15);
        
        // Scope
        ctx.fillStyle = '#111';
        ctx.fillRect(x + 45, y + 10, 12, 8);
        
        // Muzzle flash when shooting
        if (sniper.state === 'shooting' && sniper.stateTimer < 100) {
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.arc(x + 68, y + 18, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFFF00';
            ctx.beginPath();
            ctx.arc(x + 68, y + 18, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
    },
    
    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    },
    
    getActiveSniperCount: function() {
        return this.snipers.filter(s => s.health > 0).length;
    }
};

// ============================================
// WILDLIFE ANIMAL SYSTEM (Elk, Bear, Wolf, Deer)
// ============================================

const WildlifeSystem = {
    animals: [],
    
    // Wildlife definitions
    types: {
        deer: {
            width: 85,
            height: 80,
            speed: 1.2,
            bouncePower: 2.0,
            rideable: true,
            ridePoints: 1000,
            scenes: ['park', 'country'],
            color: '#C4A484',
            sound: 'deer_call.mp3'
        },
        elk: {
            width: 100,
            height: 90,
            speed: 0.9,
            bouncePower: 2.3,
            rideable: false,
            scenes: ['country', 'farm'],
            color: '#8B7355',
            sound: 'elk_bugle.mp3'
        },
        bear: {
            width: 80,
            height: 70,
            speed: 0.7,
            bouncePower: 1.6,
            rideable: false,
            scenes: ['country', 'park'],
            color: '#5C4033',
            sound: 'bear_growl.mp3'
        },
        wolf: {
            width: 60,
            height: 45,
            speed: 1.5,
            bouncePower: 1.8,
            rideable: false,
            scenes: ['country', 'farm'],
            color: '#808080',
            sound: 'wolf_howl.mp3'
        }
    },
    
    init: function(scene) {
        this.animals = [];
        
        const groundY = window.GROUND_Y || 500;
        const gameWidth = window.GAME_WIDTH || 800;
        
        // Check which wildlife appears in this scene
        Object.entries(this.types).forEach(([type, config]) => {
            if (config.scenes.includes(scene)) {
                // 50% chance to spawn each type
                if (Math.random() > 0.5) {
                    const direction = Math.random() > 0.5 ? 1 : -1;
                    
                    this.animals.push({
                        type: type,
                        x: direction > 0 ? -config.width : gameWidth,
                        y: groundY - config.height,
                        width: config.width,
                        height: config.height,
                        direction: direction,
                        speed: config.speed,
                        frame: 0,
                        frameTimer: 0,
                        bouncePower: config.bouncePower,
                        rideable: config.rideable,
                        ridePoints: config.ridePoints || 0,
                        hasBeenRidden: false,
                        color: config.color,
                        sound: config.sound,
                        isWildlife: true
                    });
                }
            }
        });
    },
    
    update: function(deltaTime) {
        const gameWidth = window.GAME_WIDTH || 800;
        
        this.animals.forEach(animal => {
            // Animation
            animal.frameTimer += deltaTime;
            if (animal.frameTimer >= 120) {
                animal.frameTimer = 0;
                animal.frame = (animal.frame + 1) % 4;
            }
            
            // Movement
            animal.x += animal.speed * animal.direction;
            
            // Wrap around
            if (animal.x < -animal.width - 50) {
                animal.x = gameWidth + 50;
            } else if (animal.x > gameWidth + 50) {
                animal.x = -animal.width - 50;
            }
        });
    },
    
    checkBounce: function(hunter) {
        for (let animal of this.animals) {
            const hunterBottom = hunter.y + hunter.height;
            const animalTop = animal.y;
            const landingThreshold = 25;
            
            if (hunter.velocityY > 0 && 
                hunterBottom >= animalTop && 
                hunterBottom <= animalTop + landingThreshold &&
                hunter.x + hunter.width > animal.x &&
                hunter.x < animal.x + animal.width) {
                
                SoundManager.playSFX(animal.sound);
                
                if (animal.rideable && !animal.hasBeenRidden) {
                    animal.hasBeenRidden = true;
                    return {
                        bounced: false,
                        riding: true,
                        animal: animal,
                        points: animal.ridePoints,
                        message: `🦌 RIDING ${animal.type.toUpperCase()}! +${animal.ridePoints}`
                    };
                } else {
                    return {
                        bounced: true,
                        bouncePower: animal.bouncePower,
                        animal: animal,
                        points: 0
                    };
                }
            }
        }
        return null;
    },
    
    render: function(ctx) {
        this.animals.forEach(animal => {
            ctx.save();
            
            // Flip for direction
            if (animal.direction < 0) {
                ctx.translate(animal.x + animal.width, 0);
                ctx.scale(-1, 1);
                ctx.translate(-animal.x, 0);
            }
            
            // Draw based on type
            switch (animal.type) {
                case 'deer':
                    this.drawDeer(ctx, animal);
                    break;
                case 'elk':
                    this.drawElk(ctx, animal);
                    break;
                case 'bear':
                    this.drawBear(ctx, animal);
                    break;
                case 'wolf':
                    this.drawWolf(ctx, animal);
                    break;
            }
            
            // Rideable indicator for deer
            if (animal.rideable && !animal.hasBeenRidden) {
                ctx.fillStyle = '#FFD700';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('RIDE +1000', animal.x + animal.width/2, animal.y - 10);
            }
            
            ctx.restore();
        });
    },
    
    drawDeer: function(ctx, animal) {
        const x = animal.x;
        const y = animal.y;
        
        // Body
        ctx.fillStyle = animal.color;
        ctx.beginPath();
        ctx.ellipse(x + 45, y + 50, 35, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs (animated)
        const legOffset = Math.sin(animal.frame * 0.8) * 5;
        ctx.fillStyle = '#A0826D';
        ctx.fillRect(x + 20, y + 60, 8, 20 + legOffset);
        ctx.fillRect(x + 35, y + 60, 8, 20 - legOffset);
        ctx.fillRect(x + 50, y + 60, 8, 20 + legOffset);
        ctx.fillRect(x + 65, y + 60, 8, 20 - legOffset);
        
        // Neck
        ctx.fillStyle = animal.color;
        ctx.fillRect(x + 65, y + 25, 15, 30);
        
        // Head
        ctx.beginPath();
        ctx.ellipse(x + 78, y + 20, 12, 10, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Antlers
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + 75, y + 10);
        ctx.lineTo(x + 70, y - 10);
        ctx.lineTo(x + 65, y - 5);
        ctx.moveTo(x + 70, y - 5);
        ctx.lineTo(x + 68, y - 15);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + 80, y + 10);
        ctx.lineTo(x + 85, y - 10);
        ctx.lineTo(x + 90, y - 5);
        ctx.moveTo(x + 85, y - 5);
        ctx.lineTo(x + 87, y - 15);
        ctx.stroke();
        
        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + 82, y + 18, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // White tail
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(x + 10, y + 45, 8, 0, Math.PI * 2);
        ctx.fill();
    },
    
    drawElk: function(ctx, animal) {
        const x = animal.x;
        const y = animal.y;
        
        // Body (larger)
        ctx.fillStyle = animal.color;
        ctx.beginPath();
        ctx.ellipse(x + 50, y + 55, 45, 30, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Dark neck mane
        ctx.fillStyle = '#3D2B1F';
        ctx.fillRect(x + 75, y + 25, 20, 35);
        
        // Legs
        const legOffset = Math.sin(animal.frame * 0.7) * 4;
        ctx.fillStyle = '#5C4033';
        ctx.fillRect(x + 20, y + 70, 10, 20 + legOffset);
        ctx.fillRect(x + 40, y + 70, 10, 20 - legOffset);
        ctx.fillRect(x + 60, y + 70, 10, 20 + legOffset);
        ctx.fillRect(x + 80, y + 70, 10, 20 - legOffset);
        
        // Head
        ctx.fillStyle = animal.color;
        ctx.beginPath();
        ctx.ellipse(x + 90, y + 25, 15, 12, 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Large antlers
        ctx.strokeStyle = '#D2B48C';
        ctx.lineWidth = 4;
        ctx.beginPath();
        // Left antler
        ctx.moveTo(x + 82, y + 15);
        ctx.lineTo(x + 70, y - 15);
        ctx.lineTo(x + 60, y - 10);
        ctx.moveTo(x + 70, y - 10);
        ctx.lineTo(x + 65, y - 25);
        ctx.moveTo(x + 68, y - 5);
        ctx.lineTo(x + 55, y - 15);
        ctx.stroke();
        
        // Right antler
        ctx.beginPath();
        ctx.moveTo(x + 95, y + 15);
        ctx.lineTo(x + 110, y - 15);
        ctx.lineTo(x + 120, y - 10);
        ctx.moveTo(x + 110, y - 10);
        ctx.lineTo(x + 115, y - 25);
        ctx.moveTo(x + 112, y - 5);
        ctx.lineTo(x + 125, y - 15);
        ctx.stroke();
        
        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + 95, y + 22, 3, 0, Math.PI * 2);
        ctx.fill();
    },
    
    drawBear: function(ctx, animal) {
        const x = animal.x;
        const y = animal.y;
        
        // Body
        ctx.fillStyle = animal.color;
        ctx.beginPath();
        ctx.ellipse(x + 40, y + 45, 35, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Head
        ctx.beginPath();
        ctx.arc(x + 70, y + 30, 18, 0, Math.PI * 2);
        ctx.fill();
        
        // Ears
        ctx.beginPath();
        ctx.arc(x + 60, y + 15, 7, 0, Math.PI * 2);
        ctx.arc(x + 80, y + 15, 7, 0, Math.PI * 2);
        ctx.fill();
        
        // Snout
        ctx.fillStyle = '#6B4423';
        ctx.beginPath();
        ctx.ellipse(x + 80, y + 35, 8, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Nose
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + 85, y + 33, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.beginPath();
        ctx.arc(x + 65, y + 28, 3, 0, Math.PI * 2);
        ctx.arc(x + 75, y + 28, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs
        const legOffset = Math.sin(animal.frame * 0.6) * 3;
        ctx.fillStyle = animal.color;
        ctx.fillRect(x + 15, y + 55, 12, 15 + legOffset);
        ctx.fillRect(x + 30, y + 55, 12, 15 - legOffset);
        ctx.fillRect(x + 48, y + 55, 12, 15 + legOffset);
        ctx.fillRect(x + 63, y + 55, 12, 15 - legOffset);
    },
    
    drawWolf: function(ctx, animal) {
        const x = animal.x;
        const y = animal.y;
        
        // Body
        ctx.fillStyle = animal.color;
        ctx.beginPath();
        ctx.ellipse(x + 30, y + 28, 25, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Tail
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 25);
        ctx.quadraticCurveTo(x - 10, y + 15, x - 5, y + 5);
        ctx.lineTo(x + 5, y + 20);
        ctx.fill();
        
        // Head
        ctx.beginPath();
        ctx.ellipse(x + 52, y + 20, 12, 10, 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Snout
        ctx.beginPath();
        ctx.moveTo(x + 60, y + 20);
        ctx.lineTo(x + 72, y + 22);
        ctx.lineTo(x + 60, y + 28);
        ctx.fill();
        
        // Ears
        ctx.beginPath();
        ctx.moveTo(x + 45, y + 12);
        ctx.lineTo(x + 42, y);
        ctx.lineTo(x + 50, y + 8);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 55, y + 12);
        ctx.lineTo(x + 58, y);
        ctx.lineTo(x + 52, y + 8);
        ctx.fill();
        
        // Eye
        ctx.fillStyle = '#FFD700'; // Yellow wolf eyes
        ctx.beginPath();
        ctx.arc(x + 55, y + 18, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + 55, y + 18, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs
        const legOffset = Math.sin(animal.frame) * 4;
        ctx.fillStyle = animal.color;
        ctx.fillRect(x + 15, y + 35, 6, 12 + legOffset);
        ctx.fillRect(x + 25, y + 35, 6, 12 - legOffset);
        ctx.fillRect(x + 38, y + 35, 6, 12 + legOffset);
        ctx.fillRect(x + 48, y + 35, 6, 12 - legOffset);
    }
};

// ============================================
// GOLDEN RING LEVEL UNLOCK SYSTEM (Park Scene)
// ============================================

const GoldenRingSystem = {
    rings: [],
    carrierBirds: [],
    maxRings: 3,
    
    // Only active in park scene
    validScene: 'park',
    
    // Ring collection state
    collected: 0,
    requiredToUnlock: 1, // Need 1 ring to unlock next level
    levelUnlocked: false,
    
    // Predator birds that carry rings
    predatorTypes: ['hawk', 'eagle'],
    
    init: function(scene) {
        this.rings = [];
        this.carrierBirds = [];
        this.collected = 0;
        this.levelUnlocked = false;
        
        if (scene !== this.validScene) {
            return;
        }
        
        const gameWidth = window.GAME_WIDTH || 800;
        
        // Spawn predator birds carrying golden rings
        for (let i = 0; i < this.maxRings; i++) {
            const type = this.predatorTypes[Math.floor(Math.random() * this.predatorTypes.length)];
            
            this.carrierBirds.push({
                type: type,
                x: Math.random() * gameWidth,
                y: 80 + Math.random() * 80,
                width: 50,
                height: 35,
                direction: Math.random() > 0.5 ? 1 : -1,
                speed: 1.5 + Math.random() * 0.5,
                frame: 0,
                frameTimer: 0,
                hasRing: true,
                ringCollected: false,
                // Ring position (in talons)
                ringX: 0,
                ringY: 0
            });
        }
    },
    
    update: function(deltaTime) {
        const gameWidth = window.GAME_WIDTH || 800;
        
        this.carrierBirds.forEach(bird => {
            // Animation
            bird.frameTimer += deltaTime;
            if (bird.frameTimer >= 80) {
                bird.frameTimer = 0;
                bird.frame = (bird.frame + 1) % 4;
            }
            
            // Movement (circular pattern)
            bird.x += bird.speed * bird.direction;
            bird.y += Math.sin(Date.now() / 1000 + bird.x * 0.01) * 0.5;
            
            // Wrap around
            if (bird.x < -bird.width) {
                bird.x = gameWidth;
            } else if (bird.x > gameWidth) {
                bird.x = -bird.width;
            }
            
            // Keep in valid Y range
            bird.y = Math.max(60, Math.min(180, bird.y));
            
            // Update ring position (in talons)
            bird.ringX = bird.x + bird.width/2;
            bird.ringY = bird.y + bird.height + 5;
        });
    },
    
    // Check if hunter grabs a ring (by jumping into bird's talons area)
    checkRingGrab: function(hunter) {
        if (this.levelUnlocked) return null;
        
        for (let bird of this.carrierBirds) {
            if (!bird.hasRing || bird.ringCollected) continue;
            
            const ringHitbox = {
                x: bird.ringX - 15,
                y: bird.ringY - 10,
                width: 30,
                height: 25
            };
            
            if (hunter.velocityY < 0 && // Jumping up
                this.isColliding(hunter, ringHitbox)) {
                
                // Grabbed the ring!
                bird.ringCollected = true;
                bird.hasRing = false;
                this.collected++;
                
                SoundManager.playSFX('ring_grab.mp3');
                
                if (this.collected >= this.requiredToUnlock) {
                    this.levelUnlocked = true;
                    return {
                        grabbed: true,
                        points: 250,
                        unlocked: true,
                        message: '🔓 LEVEL UNLOCKED! Golden Ring collected!'
                    };
                }
                
                return {
                    grabbed: true,
                    points: 100,
                    unlocked: false,
                    message: `💍 Golden Ring! ${this.collected}/${this.requiredToUnlock}`
                };
            }
        }
        
        return null;
    },
    
    isLevelUnlocked: function() {
        return this.levelUnlocked;
    },
    
    render: function(ctx) {
        // Render carrier birds with rings
        this.carrierBirds.forEach(bird => {
            ctx.save();
            
            // Flip for direction
            if (bird.direction < 0) {
                ctx.translate(bird.x + bird.width, 0);
                ctx.scale(-1, 1);
                ctx.translate(-bird.x, 0);
            }
            
            // Draw predator bird
            this.drawPredatorBird(ctx, bird);
            
            ctx.restore();
            
            // Draw golden ring (not flipped, always visible)
            if (bird.hasRing && !bird.ringCollected) {
                this.drawGoldenRing(ctx, bird.ringX, bird.ringY);
            }
        });
        
        // Unlock indicator
        if (this.collected > 0) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`💍 ${this.collected}/${this.requiredToUnlock}`, 400, 30);
        }
        
        if (this.levelUnlocked) {
            // Big unlock message
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(200, 250, 400, 100);
            
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🔓 NEXT LEVEL UNLOCKED!', 400, 300);
            
            ctx.font = '16px Arial';
            ctx.fillStyle = '#FFF';
            ctx.fillText('Press ENTER to continue', 400, 330);
        }
    },
    
    drawPredatorBird: function(ctx, bird) {
        const x = bird.x;
        const y = bird.y;
        
        // Body
        ctx.fillStyle = bird.type === 'eagle' ? '#4A3728' : '#8B4513';
        ctx.beginPath();
        ctx.ellipse(x + 25, y + 18, 22, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Wings (animated)
        const wingAngle = Math.sin(bird.frame * 0.8) * 0.4;
        ctx.save();
        ctx.translate(x + 25, y + 15);
        ctx.rotate(-wingAngle - 0.3);
        ctx.fillRect(-30, -5, 28, 10);
        ctx.restore();
        
        ctx.save();
        ctx.translate(x + 25, y + 15);
        ctx.rotate(wingAngle + 0.3);
        ctx.fillRect(2, -5, 28, 10);
        ctx.restore();
        
        // Head
        ctx.fillStyle = bird.type === 'eagle' ? '#FFF' : '#654321';
        ctx.beginPath();
        ctx.arc(x + 45, y + 12, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Beak
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(x + 52, y + 12);
        ctx.lineTo(x + 62, y + 14);
        ctx.lineTo(x + 52, y + 18);
        ctx.fill();
        
        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + 48, y + 10, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Talons
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 20, y + 30);
        ctx.lineTo(x + 18, y + 38);
        ctx.moveTo(x + 20, y + 30);
        ctx.lineTo(x + 22, y + 38);
        ctx.moveTo(x + 30, y + 30);
        ctx.lineTo(x + 28, y + 38);
        ctx.moveTo(x + 30, y + 30);
        ctx.lineTo(x + 32, y + 38);
        ctx.stroke();
    },
    
    drawGoldenRing: function(ctx, x, y) {
        // Outer glow
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
        
        // Ring
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner shine
        ctx.strokeStyle = '#FFFACD';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.stroke();
        
        // Sparkle
        const sparkle = Math.sin(Date.now() / 200) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkle})`;
        ctx.beginPath();
        ctx.arc(x - 5, y - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        
        // "GRAB!" indicator
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GRAB!', x, y - 20);
    },
    
    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
};

// ============================================
// RANDOM ANIMAL SPAWNER (All Scenes)
// ============================================

const RandomAnimalSpawner = {
    // Animals can now appear randomly in ANY scene
    spawnChance: {
        park: 0.3,      // 30% chance per animal type
        farm: 0.8,      // 80% - farm has most
        country: 0.7,   // 70%
        beach: 0.2,     // 20% - fewer animals
        city: 0.1       // 10% - rare in city
    },
    
    // Which animals can appear where
    sceneAnimals: {
        park: ['dog', 'cat', 'deer', 'bear'],
        farm: ['cow', 'horse', 'pig', 'chicken', 'rooster', 'goat', 'sheep', 'dog', 'cat'],
        country: ['cow', 'horse', 'sheep', 'goat', 'dog', 'deer', 'elk', 'wolf'],
        beach: ['dog', 'cat'],
        city: ['dog', 'cat']
    },
    
    getAnimalsForScene: function(scene) {
        const available = this.sceneAnimals[scene] || [];
        const spawnRate = this.spawnChance[scene] || 0.3;
        const spawned = [];
        
        available.forEach(type => {
            if (Math.random() < spawnRate) {
                spawned.push(type);
            }
        });
        
        return spawned;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SniperSystem,
        WildlifeSystem,
        GoldenRingSystem,
        RandomAnimalSpawner
    };
}

console.log('Snipers, Wildlife & Golden Rings v40.5 loaded!');
console.log('- Snipers: Hide, peek, shoot - +500 pts to kill');
console.log('- Wildlife: Deer (rideable +1000), Elk, Bear, Wolf');
console.log('- Golden Rings: Grab from predator birds to unlock levels');
