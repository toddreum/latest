// ============================================
// BIRDTURDS v40.4 - NPCs, Helper Birds, Knife & Protection
// ============================================

// ============================================
// FARMER NPC SYSTEM
// ============================================

const FarmerSystem = {
    farmer: null,
    bouncePower: 1.4,
    bouncePoints: 30,
    
    // Farmer appears in farm and country scenes
    validScenes: ['farm', 'country'],
    
    // Farmer activities
    activities: ['walking', 'raking', 'standing', 'waving'],
    
    init: function(scene) {
        this.farmer = null;
        
        if (!this.validScenes.includes(scene)) {
            return;
        }
        
        const groundY = window.GROUND_Y || 500;
        const gameWidth = window.GAME_WIDTH || 800;
        
        this.farmer = {
            x: 100 + Math.random() * (gameWidth - 200),
            y: groundY - 80,
            width: 50,
            height: 80,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: 0.4,
            frame: 0,
            frameTimer: 0,
            activity: 'walking',
            activityTimer: 0,
            bounceCount: 0,
            hasPitchfork: true,
            hatColor: '#8B4513',
            overallsColor: '#4169E1'
        };
    },
    
    update: function(deltaTime) {
        if (!this.farmer) return;
        
        const gameWidth = window.GAME_WIDTH || 800;
        const farmer = this.farmer;
        
        // Activity timer
        farmer.activityTimer += deltaTime;
        if (farmer.activityTimer >= 5000) {
            farmer.activityTimer = 0;
            farmer.activity = this.activities[Math.floor(Math.random() * this.activities.length)];
        }
        
        // Movement
        if (farmer.activity === 'walking') {
            farmer.x += farmer.speed * farmer.direction;
            
            if (farmer.x < 50) {
                farmer.direction = 1;
            } else if (farmer.x > gameWidth - 100) {
                farmer.direction = -1;
            }
        }
        
        // Animation
        farmer.frameTimer += deltaTime;
        if (farmer.frameTimer >= 200) {
            farmer.frameTimer = 0;
            farmer.frame = (farmer.frame + 1) % 4;
        }
    },
    
    checkBounce: function(hunter) {
        if (!this.farmer) return null;
        
        const farmer = this.farmer;
        const hunterBottom = hunter.y + hunter.height;
        const farmerTop = farmer.y;
        const landingThreshold = 25;
        
        if (hunter.velocityY > 0 && 
            hunterBottom >= farmerTop && 
            hunterBottom <= farmerTop + landingThreshold &&
            hunter.x + hunter.width > farmer.x &&
            hunter.x < farmer.x + farmer.width) {
            
            farmer.bounceCount++;
            farmer.activity = 'waving'; // React to bounce
            farmer.activityTimer = 0;
            
            SoundManager.playSFX('farmer_hey.mp3');
            
            return {
                bounced: true,
                bouncePower: this.bouncePower,
                points: this.bouncePoints,
                message: farmer.bounceCount === 1 ? "Hey there!" : "Whoa!"
            };
        }
        
        return null;
    },
    
    render: function(ctx) {
        if (!this.farmer) return;
        
        const farmer = this.farmer;
        
        ctx.save();
        
        // Flip based on direction
        if (farmer.direction < 0) {
            ctx.translate(farmer.x + farmer.width, 0);
            ctx.scale(-1, 1);
            ctx.translate(-farmer.x, 0);
        }
        
        // Boots
        ctx.fillStyle = '#654321';
        ctx.fillRect(farmer.x + 10, farmer.y + 65, 12, 15);
        ctx.fillRect(farmer.x + 28, farmer.y + 65, 12, 15);
        
        // Overalls
        ctx.fillStyle = farmer.overallsColor;
        ctx.fillRect(farmer.x + 10, farmer.y + 30, 30, 40);
        
        // Straps
        ctx.fillRect(farmer.x + 12, farmer.y + 20, 6, 15);
        ctx.fillRect(farmer.x + 32, farmer.y + 20, 6, 15);
        
        // Shirt
        ctx.fillStyle = '#FF6347'; // Red plaid-ish
        ctx.fillRect(farmer.x + 12, farmer.y + 20, 26, 15);
        
        // Head
        ctx.fillStyle = '#FFDAB9';
        ctx.beginPath();
        ctx.arc(farmer.x + 25, farmer.y + 12, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Straw hat
        ctx.fillStyle = farmer.hatColor;
        ctx.fillRect(farmer.x + 5, farmer.y - 2, 40, 8);
        ctx.fillRect(farmer.x + 12, farmer.y - 12, 26, 12);
        
        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(farmer.x + 20, farmer.y + 10, 2, 0, Math.PI * 2);
        ctx.arc(farmer.x + 30, farmer.y + 10, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(farmer.x + 25, farmer.y + 14, 5, 0, Math.PI);
        ctx.stroke();
        
        // Arms based on activity
        ctx.fillStyle = '#FFDAB9';
        if (farmer.activity === 'waving') {
            // Waving arm
            ctx.save();
            ctx.translate(farmer.x + 40, farmer.y + 25);
            ctx.rotate(Math.sin(Date.now() / 100) * 0.3 - 0.5);
            ctx.fillRect(0, -5, 20, 8);
            ctx.restore();
            ctx.fillRect(farmer.x - 5, farmer.y + 25, 15, 8);
        } else {
            ctx.fillRect(farmer.x, farmer.y + 25, 12, 8);
            ctx.fillRect(farmer.x + 38, farmer.y + 25, 12, 8);
        }
        
        // Pitchfork (if has one)
        if (farmer.hasPitchfork && farmer.activity !== 'waving') {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(farmer.x + 45, farmer.y - 20, 4, 60);
            ctx.fillStyle = '#666';
            ctx.fillRect(farmer.x + 40, farmer.y - 25, 14, 8);
            // Prongs
            ctx.fillRect(farmer.x + 41, farmer.y - 40, 3, 18);
            ctx.fillRect(farmer.x + 46, farmer.y - 40, 3, 18);
            ctx.fillRect(farmer.x + 51, farmer.y - 40, 3, 18);
        }
        
        ctx.restore();
    }
};

// ============================================
// OTHER HUNTERS NPC SYSTEM
// ============================================

const OtherHuntersSystem = {
    hunters: [],
    maxHunters: 2,
    bouncePower: 1.3,
    bouncePoints: 20,
    
    // Hunters appear in all scenes
    validScenes: ['park', 'farm', 'country', 'beach', 'city'],
    
    hunterColors: [
        { shirt: '#228B22', pants: '#8B4513' },  // Green/brown
        { shirt: '#FF4500', pants: '#2F4F4F' },  // Orange/dark
        { shirt: '#4682B4', pants: '#556B2F' },  // Steel blue/olive
        { shirt: '#DC143C', pants: '#696969' }   // Crimson/gray
    ],
    
    init: function(scene) {
        this.hunters = [];
        
        if (!this.validScenes.includes(scene)) {
            return;
        }
        
        const groundY = window.GROUND_Y || 500;
        const gameWidth = window.GAME_WIDTH || 800;
        
        // Spawn 1-2 other hunters
        const count = 1 + Math.floor(Math.random() * this.maxHunters);
        
        for (let i = 0; i < count; i++) {
            const colors = this.hunterColors[Math.floor(Math.random() * this.hunterColors.length)];
            
            this.hunters.push({
                x: 150 + Math.random() * (gameWidth - 300),
                y: groundY - 70,
                width: 45,
                height: 70,
                direction: Math.random() > 0.5 ? 1 : -1,
                speed: 0.6 + Math.random() * 0.4,
                frame: 0,
                frameTimer: 0,
                isShooting: false,
                shootTimer: 0,
                hasGun: true,
                colors: colors,
                name: ['Bob', 'Earl', 'Hank', 'Duke', 'Billy'][Math.floor(Math.random() * 5)]
            });
        }
    },
    
    update: function(deltaTime, birds) {
        const gameWidth = window.GAME_WIDTH || 800;
        
        this.hunters.forEach(hunter => {
            // Random shooting at birds
            hunter.shootTimer += deltaTime;
            if (hunter.shootTimer >= 2000 + Math.random() * 3000) {
                hunter.shootTimer = 0;
                if (birds && birds.length > 0) {
                    hunter.isShooting = true;
                    setTimeout(() => { hunter.isShooting = false; }, 300);
                    SoundManager.playSFX('gunshot.mp3');
                }
            }
            
            // Movement
            hunter.x += hunter.speed * hunter.direction;
            
            if (hunter.x < 50) {
                hunter.direction = 1;
            } else if (hunter.x > gameWidth - 100) {
                hunter.direction = -1;
            }
            
            // Animation
            hunter.frameTimer += deltaTime;
            if (hunter.frameTimer >= 150) {
                hunter.frameTimer = 0;
                hunter.frame = (hunter.frame + 1) % 4;
            }
        });
    },
    
    checkBounce: function(player) {
        for (let hunter of this.hunters) {
            const playerBottom = player.y + player.height;
            const hunterTop = hunter.y;
            const landingThreshold = 20;
            
            if (player.velocityY > 0 && 
                playerBottom >= hunterTop && 
                playerBottom <= hunterTop + landingThreshold &&
                player.x + player.width > hunter.x &&
                player.x < hunter.x + hunter.width) {
                
                SoundManager.playSFX('hunter_oof.mp3');
                
                return {
                    bounced: true,
                    bouncePower: this.bouncePower,
                    points: this.bouncePoints,
                    hunterName: hunter.name
                };
            }
        }
        return null;
    },
    
    render: function(ctx) {
        this.hunters.forEach(hunter => {
            ctx.save();
            
            if (hunter.direction < 0) {
                ctx.translate(hunter.x + hunter.width, 0);
                ctx.scale(-1, 1);
                ctx.translate(-hunter.x, 0);
            }
            
            // Boots
            ctx.fillStyle = '#654321';
            ctx.fillRect(hunter.x + 8, hunter.y + 55, 10, 15);
            ctx.fillRect(hunter.x + 27, hunter.y + 55, 10, 15);
            
            // Pants
            ctx.fillStyle = hunter.colors.pants;
            ctx.fillRect(hunter.x + 8, hunter.y + 35, 12, 25);
            ctx.fillRect(hunter.x + 25, hunter.y + 35, 12, 25);
            
            // Shirt/vest
            ctx.fillStyle = hunter.colors.shirt;
            ctx.fillRect(hunter.x + 8, hunter.y + 15, 29, 25);
            
            // Head
            ctx.fillStyle = '#FFDAB9';
            ctx.beginPath();
            ctx.arc(hunter.x + 22, hunter.y + 8, 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Cap
            ctx.fillStyle = '#2F4F4F';
            ctx.fillRect(hunter.x + 10, hunter.y - 5, 25, 10);
            ctx.fillRect(hunter.x + 8, hunter.y + 2, 30, 5);
            
            // Gun
            if (hunter.hasGun) {
                ctx.fillStyle = '#333';
                const gunAngle = hunter.isShooting ? -0.3 : 0;
                ctx.save();
                ctx.translate(hunter.x + 40, hunter.y + 25);
                ctx.rotate(gunAngle);
                ctx.fillRect(0, 0, 25, 6);
                ctx.fillRect(-5, -2, 10, 10);
                
                // Muzzle flash
                if (hunter.isShooting) {
                    ctx.fillStyle = '#FFA500';
                    ctx.beginPath();
                    ctx.arc(28, 3, 8, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
            
            ctx.restore();
        });
    }
};

// ============================================
// HELPER BIRD CARRY SYSTEM
// ============================================

const HelperBirdSystem = {
    helperBirds: [],
    maxHelpers: 2,
    
    // Helper bird types
    birdTypes: {
        eagle: { 
            carrySpeed: 3, 
            carryDuration: 5000, 
            size: 60,
            color: '#8B4513',
            sound: 'eagle_cry.mp3'
        },
        pelican: { 
            carrySpeed: 2.5, 
            carryDuration: 6000, 
            size: 70,
            color: '#F5F5DC',
            sound: 'pelican_call.mp3'
        },
        stork: { 
            carrySpeed: 2.8, 
            carryDuration: 5500, 
            size: 65,
            color: '#FFFFFF',
            sound: 'stork_clack.mp3'
        }
    },
    
    // Player carry state
    carrying: {
        active: false,
        bird: null,
        timeRemaining: 0
    },
    
    validScenes: ['farm', 'country', 'park'],
    
    init: function(scene) {
        this.helperBirds = [];
        this.carrying = { active: false, bird: null, timeRemaining: 0 };
        
        if (!this.validScenes.includes(scene)) {
            return;
        }
        
        const gameWidth = window.GAME_WIDTH || 800;
        const gameHeight = window.GAME_HEIGHT || 600;
        
        // Spawn 1-2 helper birds
        const types = Object.keys(this.birdTypes);
        const count = 1 + Math.floor(Math.random() * this.maxHelpers);
        
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const config = this.birdTypes[type];
            
            this.helperBirds.push({
                type: type,
                x: Math.random() * gameWidth,
                y: 80 + Math.random() * 100,
                width: config.size,
                height: config.size * 0.6,
                direction: Math.random() > 0.5 ? 1 : -1,
                speed: 1 + Math.random() * 0.5,
                frame: 0,
                frameTimer: 0,
                isCarrying: false,
                carrySpeed: config.carrySpeed,
                carryDuration: config.carryDuration,
                color: config.color,
                sound: config.sound,
                glowPhase: Math.random() * Math.PI * 2
            });
        }
    },
    
    update: function(deltaTime, hunter) {
        const gameWidth = window.GAME_WIDTH || 800;
        
        // Update carrying state
        if (this.carrying.active) {
            this.carrying.timeRemaining -= deltaTime;
            
            if (this.carrying.timeRemaining <= 0) {
                this.dropHunter();
            }
        }
        
        this.helperBirds.forEach(bird => {
            // Animation
            bird.frameTimer += deltaTime;
            if (bird.frameTimer >= 100) {
                bird.frameTimer = 0;
                bird.frame = (bird.frame + 1) % 4;
            }
            
            bird.glowPhase += deltaTime * 0.005;
            
            if (bird.isCarrying) {
                // Move with player input influence
                const moveSpeed = bird.carrySpeed;
                
                if (window.KEYS && window.KEYS.left) {
                    bird.x -= moveSpeed;
                    bird.direction = -1;
                }
                if (window.KEYS && window.KEYS.right) {
                    bird.x += moveSpeed;
                    bird.direction = 1;
                }
                if (window.KEYS && window.KEYS.up) {
                    bird.y -= moveSpeed * 0.7;
                }
                if (window.KEYS && window.KEYS.down) {
                    bird.y += moveSpeed * 0.7;
                }
                
                // Clamp position
                bird.x = Math.max(0, Math.min(gameWidth - bird.width, bird.x));
                bird.y = Math.max(50, Math.min(300, bird.y));
                
            } else {
                // Patrol movement
                bird.x += bird.speed * bird.direction;
                
                if (bird.x < 0) {
                    bird.x = 0;
                    bird.direction = 1;
                } else if (bird.x > gameWidth - bird.width) {
                    bird.x = gameWidth - bird.width;
                    bird.direction = -1;
                }
                
                // Gentle vertical bobbing
                bird.y += Math.sin(Date.now() / 500 + bird.glowPhase) * 0.3;
            }
        });
    },
    
    // Check if hunter jumps to grab a helper bird
    checkGrab: function(hunter) {
        if (this.carrying.active) return null;
        
        for (let bird of this.helperBirds) {
            if (bird.isCarrying) continue;
            
            // Check if hunter is jumping up into the bird
            if (hunter.velocityY < 0 && // Moving upward
                hunter.x + hunter.width > bird.x &&
                hunter.x < bird.x + bird.width &&
                hunter.y < bird.y + bird.height &&
                hunter.y + hunter.height > bird.y) {
                
                // Grabbed the bird!
                bird.isCarrying = true;
                this.carrying = {
                    active: true,
                    bird: bird,
                    timeRemaining: bird.carryDuration
                };
                
                SoundManager.playSFX(bird.sound);
                
                return {
                    grabbed: true,
                    birdType: bird.type,
                    duration: bird.carryDuration
                };
            }
        }
        
        return null;
    },
    
    dropHunter: function() {
        if (this.carrying.bird) {
            this.carrying.bird.isCarrying = false;
        }
        this.carrying = { active: false, bird: null, timeRemaining: 0 };
        console.log('Dropped from helper bird!');
    },
    
    getHunterPosition: function() {
        if (!this.carrying.active || !this.carrying.bird) return null;
        
        return {
            x: this.carrying.bird.x + this.carrying.bird.width / 2 - 25,
            y: this.carrying.bird.y + this.carrying.bird.height,
            carried: true
        };
    },
    
    isCarrying: function() {
        return this.carrying.active;
    },
    
    getCarryTimeRemaining: function() {
        return Math.ceil(this.carrying.timeRemaining / 1000);
    },
    
    render: function(ctx) {
        this.helperBirds.forEach(bird => {
            ctx.save();
            
            // Glow effect for helper birds (friendly indicator)
            const glowIntensity = 0.3 + Math.sin(bird.glowPhase) * 0.2;
            ctx.shadowColor = '#00FF00';
            ctx.shadowBlur = 15 * glowIntensity;
            
            // Flip based on direction
            if (bird.direction < 0) {
                ctx.translate(bird.x + bird.width, 0);
                ctx.scale(-1, 1);
                ctx.translate(-bird.x, 0);
            }
            
            // Body
            ctx.fillStyle = bird.color;
            ctx.beginPath();
            ctx.ellipse(bird.x + bird.width/2, bird.y + bird.height/2, 
                       bird.width/2, bird.height/2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Wings (animated)
            const wingAngle = Math.sin(bird.frame * 0.8) * 0.5;
            ctx.fillStyle = bird.color;
            ctx.save();
            ctx.translate(bird.x + bird.width/2, bird.y + bird.height/3);
            ctx.rotate(wingAngle - 0.3);
            ctx.fillRect(-bird.width * 0.7, -5, bird.width * 0.6, 15);
            ctx.restore();
            
            ctx.save();
            ctx.translate(bird.x + bird.width/2, bird.y + bird.height/3);
            ctx.rotate(-wingAngle + 0.3);
            ctx.fillRect(bird.width * 0.1, -5, bird.width * 0.6, 15);
            ctx.restore();
            
            // Head
            ctx.fillStyle = bird.color;
            ctx.beginPath();
            ctx.arc(bird.x + bird.width - 10, bird.y + bird.height/3, 12, 0, Math.PI * 2);
            ctx.fill();
            
            // Beak
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.moveTo(bird.x + bird.width, bird.y + bird.height/3);
            ctx.lineTo(bird.x + bird.width + 15, bird.y + bird.height/3 + 5);
            ctx.lineTo(bird.x + bird.width, bird.y + bird.height/3 + 8);
            ctx.fill();
            
            // Eye
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(bird.x + bird.width - 5, bird.y + bird.height/3 - 2, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // "HELPER" label
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#00FF00';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('HELPER', bird.x + bird.width/2, bird.y - 10);
            
            // Carry timer if carrying
            if (bird.isCarrying) {
                ctx.fillStyle = '#FFD700';
                ctx.font = 'bold 14px Arial';
                ctx.fillText(`${this.getCarryTimeRemaining()}s`, bird.x + bird.width/2, bird.y - 25);
            }
            
            ctx.restore();
        });
    }
};

// ============================================
// KNIFE PICKUP SYSTEM
// ============================================

const KnifeSystem = {
    knives: [],
    maxKnives: 3,
    
    // Player knife state
    playerKnife: {
        hasKnife: false,
        durability: 5, // 5 uses
        damage: 100    // Instant kill on birds
    },
    
    // Knife config
    config: {
        respawnTime: 20000,
        width: 30,
        height: 15
    },
    
    spawnTimer: 0,
    
    init: function(scene) {
        this.knives = [];
        this.playerKnife = { hasKnife: false, durability: 5, damage: 100 };
        this.spawnTimer = 0;
        
        const groundY = window.GROUND_Y || 500;
        const gameWidth = window.GAME_WIDTH || 800;
        
        // Spawn initial knives
        const count = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            this.spawnKnife(gameWidth, groundY);
        }
    },
    
    spawnKnife: function(gameWidth, groundY) {
        if (this.knives.length >= this.maxKnives) return;
        
        this.knives.push({
            x: 50 + Math.random() * (gameWidth - 100),
            y: groundY - 20,
            width: this.config.width,
            height: this.config.height,
            glint: 0,
            rotation: Math.random() * 0.3 - 0.15
        });
    },
    
    update: function(deltaTime, hunter) {
        const groundY = window.GROUND_Y || 500;
        const gameWidth = window.GAME_WIDTH || 800;
        
        // Respawn timer
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.config.respawnTime) {
            this.spawnTimer = 0;
            this.spawnKnife(gameWidth, groundY);
        }
        
        // Update knife glints
        this.knives.forEach(knife => {
            knife.glint = (knife.glint + deltaTime * 0.01) % (Math.PI * 2);
        });
        
        // Check pickup
        this.knives = this.knives.filter(knife => {
            if (this.isColliding(hunter, knife)) {
                // Pick up knife!
                this.playerKnife.hasKnife = true;
                this.playerKnife.durability = 5;
                SoundManager.playSFX('knife_pickup.mp3');
                return false;
            }
            return true;
        });
    },
    
    // Use knife to attack (melee)
    useKnife: function(hunter, targets) {
        if (!this.playerKnife.hasKnife || this.playerKnife.durability <= 0) {
            return null;
        }
        
        // Check for birds in melee range
        const meleeRange = {
            x: hunter.direction > 0 ? hunter.x + hunter.width : hunter.x - 40,
            y: hunter.y,
            width: 50,
            height: hunter.height
        };
        
        for (let i = targets.length - 1; i >= 0; i--) {
            const target = targets[i];
            
            // Skip protected/non-shootable birds for knife too
            if (!target.shootable) continue;
            
            // Skip ground animals
            if (target.isGroundAnimal) continue;
            
            if (this.isColliding(meleeRange, target)) {
                // HIT!
                this.playerKnife.durability--;
                
                if (this.playerKnife.durability <= 0) {
                    this.playerKnife.hasKnife = false;
                }
                
                SoundManager.playSFX('knife_slash.mp3');
                
                return {
                    hit: true,
                    target: target,
                    points: target.points * 1.5, // 50% bonus for melee
                    durabilityRemaining: this.playerKnife.durability,
                    message: 'KNIFE KILL! +50% bonus!'
                };
            }
        }
        
        // Missed - still uses durability
        this.playerKnife.durability--;
        if (this.playerKnife.durability <= 0) {
            this.playerKnife.hasKnife = false;
        }
        
        SoundManager.playSFX('knife_miss.mp3');
        
        return { hit: false, durabilityRemaining: this.playerKnife.durability };
    },
    
    // Hand catch (when carried by helper bird)
    handCatch: function(hunter, birds) {
        const catchRange = {
            x: hunter.x - 20,
            y: hunter.y - 20,
            width: hunter.width + 40,
            height: hunter.height + 40
        };
        
        for (let i = birds.length - 1; i >= 0; i--) {
            const bird = birds[i];
            
            // Can only hand-catch shootable flying birds
            if (!bird.shootable || bird.isGroundAnimal) continue;
            
            if (this.isColliding(catchRange, bird)) {
                SoundManager.playSFX('hand_catch.mp3');
                
                return {
                    caught: true,
                    bird: bird,
                    points: bird.points * 2, // DOUBLE for hand catch!
                    message: 'HAND CATCH! x2 POINTS!'
                };
            }
        }
        
        return null;
    },
    
    hasKnife: function() {
        return this.playerKnife.hasKnife;
    },
    
    getDurability: function() {
        return this.playerKnife.durability;
    },
    
    render: function(ctx) {
        // Draw knives on ground
        this.knives.forEach(knife => {
            ctx.save();
            ctx.translate(knife.x + knife.width/2, knife.y + knife.height/2);
            ctx.rotate(knife.rotation);
            
            // Blade
            ctx.fillStyle = '#C0C0C0';
            ctx.beginPath();
            ctx.moveTo(-knife.width/2, 0);
            ctx.lineTo(knife.width/2, -knife.height/3);
            ctx.lineTo(knife.width/2, knife.height/3);
            ctx.closePath();
            ctx.fill();
            
            // Glint
            const glintX = Math.sin(knife.glint) * knife.width/3;
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.beginPath();
            ctx.arc(glintX, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Handle
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(-knife.width/2 - 12, -knife.height/2, 15, knife.height);
            
            ctx.restore();
        });
    },
    
    // Render HUD element for knife
    renderHUD: function(ctx, x, y) {
        if (!this.playerKnife.hasKnife) return;
        
        ctx.fillStyle = '#FFF';
        ctx.font = '14px Arial';
        ctx.fillText(`🔪 x${this.playerKnife.durability}`, x, y);
    },
    
    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
};

// ============================================
// GROUND ANIMAL PROTECTION SYSTEM
// ============================================

const AnimalProtectionSystem = {
    // These animals CANNOT be shot - ever
    protectedTypes: ['cow', 'horse', 'pig', 'chicken', 'rooster', 'goat', 'sheep', 'dog', 'cat'],
    
    // Check if target is protected
    isProtected: function(target) {
        // Ground animals are always protected
        if (target.isGroundAnimal) return true;
        
        // Farm animals by type
        if (this.protectedTypes.includes(target.type)) return true;
        
        // Chickens and roosters even if they flap around
        if (target.type === 'chicken' || target.type === 'rooster') return true;
        
        return false;
    },
    
    // Filter out protected targets from shootable list
    getShootableTargets: function(allTargets) {
        return allTargets.filter(target => {
            // Must be a flying bird AND shootable
            return target.isFlying && target.shootable && !this.isProtected(target);
        });
    },
    
    // Called when player tries to shoot
    validateShot: function(target) {
        if (this.isProtected(target)) {
            return {
                allowed: false,
                message: "Can't shoot farm animals!",
                penalty: 0 // No penalty, just blocked
            };
        }
        
        // Protected bird species
        if (!target.shootable) {
            return {
                allowed: false,
                message: `${target.type} is protected!`,
                penalty: Math.abs(target.points)
            };
        }
        
        return { allowed: true };
    }
};

// Export all systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FarmerSystem,
        OtherHuntersSystem,
        HelperBirdSystem,
        KnifeSystem,
        AnimalProtectionSystem
    };
}

console.log('NPCs & Helper Systems v40.4 loaded!');
console.log('- Farmer NPC (bounceable)');
console.log('- Other Hunters (bounceable)');
console.log('- Helper Birds (can carry hunter!)');
console.log('- Knife system (melee kills)');
console.log('- Ground animal protection active');
