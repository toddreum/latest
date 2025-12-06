// ============================================
// BIRDTURDS v40.3 - Farm Animals & New Mechanics
// ============================================

// ============================================
// POOP BLASTING SYSTEM
// ============================================

const PoopBlastSystem = {
    // Points for shooting poop mid-air
    points: {
        turdShot: 15,      // Shoot a falling turd
        turdCombo: 5,      // Bonus per combo (rapid shots)
        splatterBonus: 25  // Hit multiple turds with one shot (if using shotgun)
    },
    
    // Track active falling turds that can be shot
    activeTurds: [],
    
    // Combo tracking
    comboCount: 0,
    comboTimer: 0,
    comboTimeout: 1500, // ms to maintain combo
    
    // Add a turd that can be shot
    addShootableTurd: function(turd) {
        this.activeTurds.push({
            x: turd.x,
            y: turd.y,
            width: turd.width || 20,
            height: turd.height || 20,
            velocityY: turd.velocityY || 2,
            velocityX: turd.velocityX || 0,
            active: true
        });
    },
    
    // Update turds
    update: function(deltaTime) {
        const groundY = window.GROUND_Y || 500;
        
        // Update combo timer
        if (this.comboCount > 0) {
            this.comboTimer += deltaTime;
            if (this.comboTimer >= this.comboTimeout) {
                this.comboCount = 0;
                this.comboTimer = 0;
            }
        }
        
        // Update turd positions
        this.activeTurds = this.activeTurds.filter(turd => {
            turd.y += turd.velocityY;
            turd.x += turd.velocityX;
            
            // Remove if hit ground
            if (turd.y >= groundY) {
                return false;
            }
            return turd.active;
        });
    },
    
    // Check if bullet hits a turd
    checkBulletCollision: function(bullet) {
        for (let i = this.activeTurds.length - 1; i >= 0; i--) {
            const turd = this.activeTurds[i];
            
            if (this.isColliding(bullet, turd)) {
                // HIT! Remove turd
                this.activeTurds.splice(i, 1);
                
                // Update combo
                this.comboCount++;
                this.comboTimer = 0;
                
                // Calculate points
                const basePoints = this.points.turdShot;
                const comboBonus = (this.comboCount - 1) * this.points.turdCombo;
                
                return {
                    hit: true,
                    points: basePoints + comboBonus,
                    combo: this.comboCount,
                    x: turd.x,
                    y: turd.y
                };
            }
        }
        return { hit: false };
    },
    
    // Check shotgun blast (hits multiple)
    checkShotgunBlast: function(blastArea) {
        let hits = 0;
        let totalPoints = 0;
        const hitPositions = [];
        
        for (let i = this.activeTurds.length - 1; i >= 0; i--) {
            const turd = this.activeTurds[i];
            
            if (this.isColliding(blastArea, turd)) {
                hits++;
                hitPositions.push({ x: turd.x, y: turd.y });
                this.activeTurds.splice(i, 1);
            }
        }
        
        if (hits > 0) {
            totalPoints = hits * this.points.turdShot;
            if (hits > 1) {
                totalPoints += this.points.splatterBonus; // Multi-hit bonus!
            }
            
            this.comboCount += hits;
            this.comboTimer = 0;
        }
        
        return {
            hits: hits,
            points: totalPoints,
            positions: hitPositions,
            combo: this.comboCount
        };
    },
    
    // Render shootable turds (with target indicator)
    render: function(ctx) {
        this.activeTurds.forEach(turd => {
            // Draw turd
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.ellipse(turd.x, turd.y, turd.width/2, turd.height/2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Highlight ring showing it's shootable
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.arc(turd.x, turd.y, turd.width/2 + 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        });
        
        // Draw combo indicator
        if (this.comboCount > 1) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`💩 COMBO x${this.comboCount}!`, window.GAME_WIDTH / 2 || 400, 80);
        }
    },
    
    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    },
    
    clear: function() {
        this.activeTurds = [];
        this.comboCount = 0;
        this.comboTimer = 0;
    }
};

// ============================================
// CHILD BOUNCE SYSTEM
// ============================================

const ChildBounceSystem = {
    // Child NPC that hunter can bounce off of
    child: null,
    bouncePower: 1.5, // Good bounce, not too high
    
    // Points for bouncing off child (fun bonus!)
    bouncePoints: 25,
    
    // Sound effect
    bounceSound: 'child_wheee.mp3',
    
    // Scenes where child appears
    validScenes: ['park', 'farm', 'country', 'beach'],
    
    init: function(scene) {
        this.child = null;
        
        if (!this.validScenes.includes(scene)) {
            return;
        }
        
        // Spawn child NPC
        const groundY = window.GROUND_Y || 500;
        const gameWidth = window.GAME_WIDTH || 800;
        
        this.child = {
            x: 200 + Math.random() * (gameWidth - 400),
            y: groundY - 60,
            width: 40,
            height: 60,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: 0.8,
            frame: 0,
            frameTimer: 0,
            bounceCount: 0, // Track how many times bounced on
            isJumping: false,
            jumpTimer: 0
        };
    },
    
    update: function(deltaTime) {
        if (!this.child) return;
        
        const gameWidth = window.GAME_WIDTH || 800;
        
        // Move child
        this.child.x += this.child.speed * this.child.direction;
        
        // Reverse at edges
        if (this.child.x < 50) {
            this.child.direction = 1;
        } else if (this.child.x > gameWidth - 90) {
            this.child.direction = -1;
        }
        
        // Animation
        this.child.frameTimer += deltaTime;
        if (this.child.frameTimer >= 150) {
            this.child.frameTimer = 0;
            this.child.frame = (this.child.frame + 1) % 4;
        }
        
        // Jump animation after being bounced on
        if (this.child.isJumping) {
            this.child.jumpTimer += deltaTime;
            if (this.child.jumpTimer >= 500) {
                this.child.isJumping = false;
                this.child.jumpTimer = 0;
            }
        }
    },
    
    // Check if hunter bounces on child
    checkBounce: function(hunter) {
        if (!this.child) return null;
        
        const hunterBottom = hunter.y + hunter.height;
        const childTop = this.child.y;
        const landingThreshold = 20;
        
        // Check if landing on top
        if (hunter.velocityY > 0 && 
            hunterBottom >= childTop && 
            hunterBottom <= childTop + landingThreshold &&
            hunter.x + hunter.width > this.child.x &&
            hunter.x < this.child.x + this.child.width) {
            
            // Bounced!
            this.child.bounceCount++;
            this.child.isJumping = true;
            this.child.jumpTimer = 0;
            
            // Play sound
            if (typeof SoundManager !== 'undefined') {
                SoundManager.playSFX(this.bounceSound);
            }
            
            return {
                bounced: true,
                bouncePower: this.bouncePower,
                points: this.bouncePoints,
                bounceCount: this.child.bounceCount
            };
        }
        
        return null;
    },
    
    render: function(ctx) {
        if (!this.child) return;
        
        const child = this.child;
        const jumpOffset = child.isJumping ? Math.sin(child.jumpTimer / 50) * 10 : 0;
        
        ctx.save();
        
        // Flip based on direction
        if (child.direction < 0) {
            ctx.translate(child.x + child.width, child.y - jumpOffset);
            ctx.scale(-1, 1);
            ctx.translate(-child.x, 0);
        } else {
            ctx.translate(0, -jumpOffset);
        }
        
        // Body
        ctx.fillStyle = '#FFB6C1'; // Pink shirt
        ctx.fillRect(child.x + 10, child.y + 20, 20, 25);
        
        // Head
        ctx.fillStyle = '#FFDAB9';
        ctx.beginPath();
        ctx.arc(child.x + 20, child.y + 12, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Hair
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(child.x + 20, child.y + 8, 10, Math.PI, 0);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(child.x + 16, child.y + 12, 2, 0, Math.PI * 2);
        ctx.arc(child.x + 24, child.y + 12, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile (bigger if just bounced on!)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (child.isJumping) {
            // Big excited smile
            ctx.arc(child.x + 20, child.y + 14, 5, 0, Math.PI);
        } else {
            ctx.arc(child.x + 20, child.y + 14, 3, 0, Math.PI);
        }
        ctx.stroke();
        
        // Legs (animated)
        ctx.fillStyle = '#4169E1'; // Blue pants
        const legOffset = Math.sin(child.frame * 0.8) * 3;
        ctx.fillRect(child.x + 10, child.y + 45, 8, 15);
        ctx.fillRect(child.x + 22, child.y + 45, 8, 15);
        
        // Arms waving if jumping
        ctx.fillStyle = '#FFDAB9';
        if (child.isJumping) {
            // Arms up!
            ctx.fillRect(child.x + 2, child.y + 20, 8, 4);
            ctx.fillRect(child.x + 30, child.y + 20, 8, 4);
        } else {
            ctx.fillRect(child.x + 5, child.y + 25, 6, 12);
            ctx.fillRect(child.x + 29, child.y + 25, 6, 12);
        }
        
        ctx.restore();
        
        // "Wheee!" text if just bounced
        if (child.isJumping) {
            ctx.fillStyle = '#FF69B4';
            ctx.font = 'bold 14px Comic Sans MS, cursive';
            ctx.textAlign = 'center';
            ctx.fillText('Wheee!', child.x + 20, child.y - 20 - jumpOffset);
        }
    }
};

const FarmAnimalSystem = {
    // Animal definitions with directions
    animals: {
        cow: { 
            rideable: true, 
            ridePoints: 500, 
            bouncePower: 1.8,
            speed: 0.5,
            sound: 'cow_moo.mp3',
            frames: 8,
            width: 96,
            height: 64
        },
        horse: { 
            rideable: true, 
            ridePoints: 500, 
            bouncePower: 2.2,
            speed: 1.2,
            sound: 'horse_neigh.mp3',
            frames: 8,
            width: 96,
            height: 80
        },
        pig: { 
            rideable: false, 
            bouncePower: 1.3,
            speed: 0.7,
            sound: 'pig_oink.mp3',
            frames: 6,
            width: 64,
            height: 48
        },
        chicken: { 
            rideable: false, 
            bouncePower: 1.2,
            speed: 0.9,
            sound: 'chicken_cluck.mp3',
            frames: 6,
            width: 32,
            height: 32
        },
        rooster: { 
            rideable: false, 
            bouncePower: 1.2,
            speed: 0.8,
            sound: 'rooster_crow.mp3',
            frames: 6,
            width: 40,
            height: 40
        },
        goat: { 
            rideable: false, 
            bouncePower: 1.6,
            speed: 0.9,
            sound: 'goat_bleat.mp3',
            frames: 6,
            width: 64,
            height: 56
        },
        sheep: { 
            rideable: false, 
            bouncePower: 1.4,
            speed: 0.6,
            sound: 'sheep_baa.mp3',
            frames: 6,
            width: 56,
            height: 48
        },
        dog: { 
            rideable: false, 
            bouncePower: 1.5,
            speed: 1.4,
            sound: 'dog_bark.mp3',
            frames: 6,
            width: 56,
            height: 48
        },
        cat: { 
            rideable: false, 
            bouncePower: 1.7,
            speed: 1.1,
            sound: 'cat_meow.mp3',
            frames: 6,
            width: 40,
            height: 32
        }
    },

    // Valid scenes for animals
    validScenes: ['farm', 'country'],

    // Active animals in scene
    activeAnimals: [],

    // Sprite sheets (populated after conversion)
    spriteSheets: {},

    // Initialize animal system
    init: function(scene) {
        this.activeAnimals = [];
        
        if (!this.validScenes.includes(scene)) {
            console.log('Animals not active in scene:', scene);
            return;
        }

        this.spawnAnimals(scene);
    },

    // Spawn animals for scene
    spawnAnimals: function(scene) {
        const animalTypes = Object.keys(this.animals);
        const groundY = window.GROUND_Y || 500;
        
        // Spawn 3-6 random animals
        const count = 3 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < count; i++) {
            const type = animalTypes[Math.floor(Math.random() * animalTypes.length)];
            const config = this.animals[type];
            
            // Random direction: -1 = left, 1 = right
            const direction = Math.random() > 0.5 ? 1 : -1;
            
            const animal = {
                type: type,
                x: Math.random() * (window.GAME_WIDTH || 800),
                y: groundY - config.height,
                width: config.width,
                height: config.height,
                direction: direction,
                speed: config.speed * direction,
                frame: 0,
                frameCount: config.frames,
                frameTimer: 0,
                frameDelay: 100, // ms per frame
                rideable: config.rideable,
                ridePoints: config.ridePoints || 0,
                bouncePower: config.bouncePower,
                sound: config.sound,
                beingRidden: false,
                hasBeenRidden: false // Track if already rode for points
            };
            
            this.activeAnimals.push(animal);
        }
    },

    // Update all animals
    update: function(deltaTime, hunter) {
        const gameWidth = window.GAME_WIDTH || 800;
        
        this.activeAnimals.forEach(animal => {
            // Update animation frame
            animal.frameTimer += deltaTime;
            if (animal.frameTimer >= animal.frameDelay) {
                animal.frameTimer = 0;
                animal.frame = (animal.frame + 1) % animal.frameCount;
            }

            // Move animal if not being ridden
            if (!animal.beingRidden) {
                animal.x += animal.speed;
                
                // Wrap around or reverse at edges
                if (animal.x < -animal.width) {
                    animal.x = gameWidth;
                } else if (animal.x > gameWidth) {
                    animal.x = -animal.width;
                }
            } else {
                // Follow hunter when being ridden
                animal.x = hunter.x - animal.width / 4;
            }
        });
    },

    // Render all animals
    render: function(ctx) {
        this.activeAnimals.forEach(animal => {
            const spriteSheet = this.spriteSheets[animal.type];
            
            if (spriteSheet && spriteSheet.complete) {
                // Calculate sprite frame position
                const frameX = animal.frame * animal.width;
                
                ctx.save();
                
                // Flip horizontally if going right
                if (animal.direction > 0) {
                    ctx.translate(animal.x + animal.width, animal.y);
                    ctx.scale(-1, 1);
                    ctx.drawImage(
                        spriteSheet,
                        frameX, 0, animal.width, animal.height,
                        0, 0, animal.width, animal.height
                    );
                } else {
                    ctx.drawImage(
                        spriteSheet,
                        frameX, 0, animal.width, animal.height,
                        animal.x, animal.y, animal.width, animal.height
                    );
                }
                
                ctx.restore();
            } else {
                // Fallback: colored rectangle with label
                ctx.fillStyle = this.getAnimalColor(animal.type);
                ctx.fillRect(animal.x, animal.y, animal.width, animal.height);
                ctx.fillStyle = '#000';
                ctx.font = '10px Arial';
                ctx.fillText(animal.type, animal.x + 5, animal.y + animal.height/2);
                
                // Direction arrow
                ctx.fillStyle = '#FFF';
                ctx.fillText(animal.direction > 0 ? '→' : '←', animal.x + animal.width - 15, animal.y + 12);
            }
        });
    },

    getAnimalColor: function(type) {
        const colors = {
            cow: '#F5F5DC',
            horse: '#8B4513',
            pig: '#FFB6C1',
            chicken: '#FFD700',
            rooster: '#FF4500',
            goat: '#D2B48C',
            sheep: '#FFFAF0',
            dog: '#CD853F',
            cat: '#FFA500'
        };
        return colors[type] || '#888';
    },

    // Check collision with hunter
    checkHunterCollision: function(hunter) {
        const results = {
            bounced: false,
            riding: false,
            ridePoints: 0,
            bouncePower: 0,
            animal: null
        };

        for (let animal of this.activeAnimals) {
            if (this.isColliding(hunter, animal)) {
                // Check if hunter is landing on top (for bounce/ride)
                const hunterBottom = hunter.y + hunter.height;
                const animalTop = animal.y;
                const landingThreshold = 20;

                if (hunter.velocityY > 0 && hunterBottom >= animalTop && hunterBottom <= animalTop + landingThreshold) {
                    // Landing on animal!
                    if (animal.rideable && !animal.hasBeenRidden) {
                        // Start riding
                        animal.beingRidden = true;
                        animal.hasBeenRidden = true;
                        results.riding = true;
                        results.ridePoints = animal.ridePoints;
                        results.animal = animal;
                        
                        // Play sound
                        SoundManager.playSFX(animal.sound);
                    } else {
                        // Bounce off
                        results.bounced = true;
                        results.bouncePower = animal.bouncePower;
                        results.animal = animal;
                        
                        // Play sound
                        SoundManager.playSFX(animal.sound);
                    }
                    break;
                }
            }
        }

        return results;
    },

    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    },

    // Dismount from animal
    dismount: function() {
        this.activeAnimals.forEach(animal => {
            animal.beingRidden = false;
        });
    }
};

// ============================================
// UMBRELLA SHIELD SYSTEM
// ============================================

const UmbrellaSystem = {
    // Umbrella pickups on ground
    umbrellas: [],
    
    // Valid scene for umbrellas
    validScene: 'park',
    
    // Shield config
    shieldDuration: 5000, // 5 seconds of protection
    rechargeTime: 15000,  // 15 seconds between spawns
    maxUmbrellas: 3,
    
    // Hunter shield state
    hunterShield: {
        active: false,
        timeRemaining: 0,
        umbrella: null
    },
    
    // Spawn timer
    spawnTimer: 0,
    
    init: function(scene) {
        this.umbrellas = [];
        this.hunterShield = { active: false, timeRemaining: 0, umbrella: null };
        this.spawnTimer = 0;
        
        if (scene !== this.validScene) {
            return;
        }
        
        // Spawn initial umbrellas
        this.spawnUmbrella();
        this.spawnUmbrella();
    },
    
    spawnUmbrella: function() {
        if (this.umbrellas.length >= this.maxUmbrellas) return;
        
        const groundY = window.GROUND_Y || 500;
        const gameWidth = window.GAME_WIDTH || 800;
        
        const umbrella = {
            x: 100 + Math.random() * (gameWidth - 200),
            y: groundY - 40,
            width: 40,
            height: 40,
            collected: false,
            // Random color
            color: ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF'][Math.floor(Math.random() * 5)]
        };
        
        this.umbrellas.push(umbrella);
    },
    
    update: function(deltaTime, hunter, scene) {
        if (scene !== this.validScene) return;
        
        // Update spawn timer
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.rechargeTime) {
            this.spawnTimer = 0;
            this.spawnUmbrella();
        }
        
        // Update shield timer
        if (this.hunterShield.active) {
            this.hunterShield.timeRemaining -= deltaTime;
            if (this.hunterShield.timeRemaining <= 0) {
                this.hunterShield.active = false;
                console.log('Umbrella shield expired!');
            }
        }
        
        // Check pickup collision
        this.umbrellas = this.umbrellas.filter(umbrella => {
            if (!umbrella.collected && this.isColliding(hunter, umbrella)) {
                // Pick up umbrella!
                this.activateShield(umbrella);
                SoundManager.playSFX('umbrella_pickup.mp3');
                return false; // Remove from array
            }
            return true;
        });
    },
    
    activateShield: function(umbrella) {
        this.hunterShield = {
            active: true,
            timeRemaining: this.shieldDuration,
            color: umbrella.color
        };
        console.log('Umbrella shield activated! Protected for 5 seconds.');
    },
    
    isShieldActive: function() {
        return this.hunterShield.active;
    },
    
    getShieldTimeRemaining: function() {
        return Math.ceil(this.hunterShield.timeRemaining / 1000);
    },
    
    render: function(ctx) {
        // Draw umbrellas on ground
        this.umbrellas.forEach(umbrella => {
            this.drawUmbrella(ctx, umbrella.x, umbrella.y, umbrella.color, false);
        });
    },
    
    renderShield: function(ctx, hunter) {
        if (!this.hunterShield.active) return;
        
        // Draw open umbrella above hunter
        this.drawUmbrella(ctx, hunter.x + hunter.width/2 - 25, hunter.y - 45, this.hunterShield.color, true);
        
        // Draw shield bubble effect
        ctx.beginPath();
        ctx.arc(hunter.x + hunter.width/2, hunter.y + hunter.height/2, 50, 0, Math.PI * 2);
        ctx.strokeStyle = this.hunterShield.color + '80';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Pulsing effect based on time remaining
        const pulse = Math.sin(Date.now() / 100) * 0.3 + 0.5;
        ctx.fillStyle = this.hunterShield.color + Math.floor(pulse * 40).toString(16).padStart(2, '0');
        ctx.fill();
    },
    
    drawUmbrella: function(ctx, x, y, color, open) {
        ctx.save();
        
        if (open) {
            // Open umbrella (dome shape)
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x + 25, y + 15, 25, Math.PI, 0);
            ctx.fill();
            
            // Handle
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 25, y + 15);
            ctx.lineTo(x + 25, y + 45);
            ctx.stroke();
            
            // Hook
            ctx.beginPath();
            ctx.arc(x + 20, y + 45, 5, 0, Math.PI);
            ctx.stroke();
        } else {
            // Closed umbrella on ground
            ctx.fillStyle = color;
            ctx.fillRect(x + 10, y, 8, 35);
            
            // Tip
            ctx.beginPath();
            ctx.moveTo(x + 14, y);
            ctx.lineTo(x + 10, y - 8);
            ctx.lineTo(x + 18, y);
            ctx.fill();
            
            // Handle
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(x + 11, y + 30, 6, 10);
        }
        
        ctx.restore();
    },
    
    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
};

// ============================================
// FALLING BIRDS SYSTEM
// ============================================

const FallingBirdSystem = {
    fallingBirds: [],
    
    // Create a falling bird when shot
    createFallingBird: function(bird) {
        const fallingBird = {
            x: bird.x,
            y: bird.y,
            width: bird.width || 40,
            height: bird.height || 30,
            velocityY: 0,
            velocityX: bird.velocityX * 0.3 || 0, // Maintain some horizontal momentum
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.3,
            type: bird.type,
            shootable: bird.shootable,
            gravity: 0.5,
            sprite: bird.sprite,
            color: bird.color || '#444'
        };
        
        this.fallingBirds.push(fallingBird);
    },
    
    update: function(deltaTime) {
        const groundY = window.GROUND_Y || 500;
        
        this.fallingBirds = this.fallingBirds.filter(bird => {
            // Apply gravity
            bird.velocityY += bird.gravity;
            bird.y += bird.velocityY;
            bird.x += bird.velocityX;
            
            // Rotate as it falls
            bird.rotation += bird.rotationSpeed;
            
            // Remove when hits ground
            if (bird.y >= groundY) {
                // Could spawn a "splat" effect here
                return false;
            }
            
            return true;
        });
    },
    
    // Check if hunter is hit by falling bird
    checkHunterCollision: function(hunter) {
        // Skip if umbrella shield is active
        if (UmbrellaSystem.isShieldActive()) {
            return { hit: false };
        }
        
        for (let i = this.fallingBirds.length - 1; i >= 0; i--) {
            const bird = this.fallingBirds[i];
            
            if (this.isColliding(hunter, bird)) {
                // Remove the bird
                this.fallingBirds.splice(i, 1);
                
                return {
                    hit: true,
                    damage: 10,
                    pointsLost: 25,
                    birdType: bird.type
                };
            }
        }
        
        return { hit: false };
    },
    
    render: function(ctx) {
        this.fallingBirds.forEach(bird => {
            ctx.save();
            
            // Translate to bird center for rotation
            ctx.translate(bird.x + bird.width/2, bird.y + bird.height/2);
            ctx.rotate(bird.rotation);
            
            // Draw bird (tumbling)
            if (bird.sprite) {
                ctx.drawImage(bird.sprite, -bird.width/2, -bird.height/2, bird.width, bird.height);
            } else {
                // Fallback shape
                ctx.fillStyle = bird.color;
                ctx.beginPath();
                ctx.ellipse(0, 0, bird.width/2, bird.height/2, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // X eyes (dead bird)
                ctx.strokeStyle = '#FFF';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-8, -5);
                ctx.lineTo(-2, 1);
                ctx.moveTo(-2, -5);
                ctx.lineTo(-8, 1);
                ctx.stroke();
            }
            
            ctx.restore();
        });
    },
    
    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    },
    
    clear: function() {
        this.fallingBirds = [];
    }
};

// ============================================
// TRACTOR SCOOP SYSTEM
// ============================================

const TractorScoopSystem = {
    scoopAnimation: {
        active: false,
        turds: [],
        progress: 0
    },
    
    // Called when tractor collects turds
    startScoopAnimation: function(tractor, turdsCollected) {
        this.scoopAnimation = {
            active: true,
            tractorX: tractor.x,
            tractorY: tractor.y,
            turds: turdsCollected.map(t => ({
                x: t.x,
                y: t.y,
                startX: t.x,
                startY: t.y,
                targetX: tractor.x + 20,
                targetY: tractor.y - 10
            })),
            progress: 0,
            duration: 500 // ms
        };
    },
    
    update: function(deltaTime) {
        if (!this.scoopAnimation.active) return;
        
        this.scoopAnimation.progress += deltaTime;
        const t = Math.min(this.scoopAnimation.progress / this.scoopAnimation.duration, 1);
        
        // Ease-out animation
        const easeT = 1 - Math.pow(1 - t, 3);
        
        // Move turds toward tractor bucket
        this.scoopAnimation.turds.forEach(turd => {
            turd.x = turd.startX + (turd.targetX - turd.startX) * easeT;
            turd.y = turd.startY + (turd.targetY - turd.startY) * easeT - Math.sin(easeT * Math.PI) * 30;
        });
        
        if (t >= 1) {
            this.scoopAnimation.active = false;
            this.scoopAnimation.turds = [];
        }
    },
    
    render: function(ctx) {
        if (!this.scoopAnimation.active) return;
        
        // Draw turds being scooped
        this.scoopAnimation.turds.forEach(turd => {
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.arc(turd.x, turd.y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Motion lines
            ctx.strokeStyle = '#8B451380';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(turd.x + 10, turd.y);
            ctx.lineTo(turd.x + 20, turd.y + 5);
            ctx.stroke();
        });
    }
};

// ============================================
// ANIMAL BOUNCE → BIRD HIT SYSTEM
// ============================================

const AnimalBounceSystem = {
    // Track hunter state during bounce
    bounceState: {
        active: false,
        fromAnimal: null,
        peakReached: false
    },
    
    startBounce: function(animal, hunter) {
        this.bounceState = {
            active: true,
            fromAnimal: animal.type,
            peakReached: false,
            startY: hunter.y
        };
    },
    
    // Check if hunter hits a bird during bounce
    checkBirdCollision: function(hunter, birds) {
        if (!this.bounceState.active) return null;
        
        // Check if we've passed the peak (going down)
        if (hunter.velocityY > 0 && !this.bounceState.peakReached) {
            this.bounceState.peakReached = true;
        }
        
        // Check collision with birds
        for (let bird of birds) {
            if (this.isColliding(hunter, bird)) {
                const result = {
                    bird: bird,
                    shootable: bird.shootable,
                    points: bird.shootable ? bird.points : -Math.abs(bird.points || 50)
                };
                
                // End bounce state
                this.bounceState.active = false;
                
                return result;
            }
        }
        
        // End bounce when landing
        if (hunter.onGround) {
            this.bounceState.active = false;
        }
        
        return null;
    },
    
    isColliding: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
};

// ============================================
// SOUND MANAGER (ensure separate channels)
// ============================================

const SoundManager = {
    channels: {
        music: { audio: null, volume: 0.5 },
        sfx: { audio: null, volume: 0.7 },
        voice: { audio: null, volume: 0.8 }
    },
    
    sfxPool: {}, // Pool of audio elements for SFX
    
    init: function() {
        // Create separate audio contexts/elements for each channel
        console.log('Sound Manager initialized with separate channels: music, sfx, voice');
    },
    
    setVolume: function(channel, volume) {
        if (this.channels[channel]) {
            this.channels[channel].volume = Math.max(0, Math.min(1, volume));
            if (this.channels[channel].audio) {
                this.channels[channel].audio.volume = this.channels[channel].volume;
            }
        }
    },
    
    playMusic: function(src) {
        if (this.channels.music.audio) {
            this.channels.music.audio.pause();
        }
        this.channels.music.audio = new Audio(src);
        this.channels.music.audio.loop = true;
        this.channels.music.audio.volume = this.channels.music.volume;
        this.channels.music.audio.play().catch(e => console.log('Music autoplay blocked'));
    },
    
    playSFX: function(src) {
        // Use audio pool for overlapping SFX
        if (!this.sfxPool[src]) {
            this.sfxPool[src] = [];
        }
        
        // Find available audio element or create new
        let audio = this.sfxPool[src].find(a => a.paused || a.ended);
        if (!audio) {
            audio = new Audio('assets/sounds/' + src);
            this.sfxPool[src].push(audio);
        }
        
        audio.volume = this.channels.sfx.volume;
        audio.currentTime = 0;
        audio.play().catch(e => console.log('SFX play failed:', e));
    },
    
    playVoice: function(src) {
        if (this.channels.voice.audio) {
            this.channels.voice.audio.pause();
        }
        this.channels.voice.audio = new Audio(src);
        this.channels.voice.audio.volume = this.channels.voice.volume;
        this.channels.voice.audio.play().catch(e => console.log('Voice play failed'));
    },
    
    stopAll: function() {
        Object.values(this.channels).forEach(ch => {
            if (ch.audio) ch.audio.pause();
        });
    }
};

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FarmAnimalSystem,
        UmbrellaSystem,
        FallingBirdSystem,
        TractorScoopSystem,
        AnimalBounceSystem,
        SoundManager,
        PoopBlastSystem,
        ChildBounceSystem
    };
}

// ============================================
// MASTER BOUNCE SYSTEM (combines all bounceable entities)
// ============================================

const MasterBounceSystem = {
    // Check ALL bounceable things: animals + child
    checkAllBounces: function(hunter, scene) {
        // Check animals first
        const animalResult = FarmAnimalSystem.checkHunterCollision(hunter);
        if (animalResult.bounced || animalResult.riding) {
            return {
                source: 'animal',
                ...animalResult
            };
        }
        
        // Check child
        const childResult = ChildBounceSystem.checkBounce(hunter);
        if (childResult && childResult.bounced) {
            return {
                source: 'child',
                ...childResult
            };
        }
        
        return null;
    },
    
    // Get all bounceable entities for display
    getAllBounceables: function() {
        const bounceables = [];
        
        // Add animals
        FarmAnimalSystem.activeAnimals.forEach(animal => {
            bounceables.push({
                type: 'animal',
                name: animal.type,
                x: animal.x,
                y: animal.y,
                width: animal.width,
                height: animal.height,
                bouncePower: animal.bouncePower
            });
        });
        
        // Add child
        if (ChildBounceSystem.child) {
            bounceables.push({
                type: 'child',
                name: 'child',
                x: ChildBounceSystem.child.x,
                y: ChildBounceSystem.child.y,
                width: ChildBounceSystem.child.width,
                height: ChildBounceSystem.child.height,
                bouncePower: ChildBounceSystem.bouncePower
            });
        }
        
        return bounceables;
    }
};

console.log('Farm Animals & New Mechanics v40.3 loaded!');
console.log('- All animals bounceable: cow, horse, pig, chicken, rooster, goat, sheep, dog, cat');
console.log('- Child NPC bounceable');
console.log('- Poop blasting system active!');
