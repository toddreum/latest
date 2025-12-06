// ============================================
// BIRDTURDS v40.5 - BOT HUNTER SYSTEM
// AI-controlled hunters that compete with player
// ============================================

const BotHunterSystem = {
    bots: [],
    maxBots: 2,
    spawnTimer: 0,
    spawnDelay: 5000, // 5 seconds after scene start
    
    // Bot types with different looks and sounds
    botTypes: [
        { 
            id: 'bot1', 
            name: 'Big Earl',
            sprite: 'sprites/bots/bot1_strip.png',
            spriteLeft: 'sprites/bots/bot1_strip_left.png',
            shootSound: 'sounds/bubba_shoot.mp3',
            color: '#FF6B35'  // Orange
        },
        { 
            id: 'bot2', 
            name: 'Sally',
            sprite: 'sprites/bots/bot2_strip.png',
            spriteLeft: 'sprites/bots/bot2_strip_left.png',
            shootSound: 'sounds/daisy_shoot.mp3',
            color: '#4ECDC4'  // Teal
        },
        { 
            id: 'bot3', 
            name: 'Hank',
            sprite: 'sprites/bots/bot3_strip.png',
            spriteLeft: 'sprites/bots/bot3_strip_left.png',
            shootSound: 'sounds/buck_shoot.mp3',
            color: '#C41E3A'  // Red plaid
        },
        { 
            id: 'bot4', 
            name: 'Tex',
            sprite: 'sprites/bots/bot4_strip.png',
            spriteLeft: 'sprites/bots/bot4_strip_left.png',
            shootSound: 'sounds/clyde_shoot.mp3',
            color: '#DAA520'  // Cowboy gold
        }
    ],
    
    // Shared config
    config: {
        width: 50,
        height: 75,
        frames: 4,
        frameSpeed: 150,
        
        // Movement
        speed: 1.5,
        changeDirectionChance: 0.005,
        
        // Shooting
        shootIntervalMin: 2500,
        shootIntervalMax: 5000,
        accuracy: 0.55,  // 55% hit rate (not too good)
        
        // Bouncing (when player lands on them)
        bouncePower: 1.3,
        bouncePoints: 20,
        bounceSound: 'sounds/hunter_oof.mp3',
        
        // Can ride in tractor bucket
        canRideTractor: true
    },
    
    sprites: {},
    
    init: function() {
        this.bots = [];
        this.loadSprites();
    },
    
    loadSprites: function() {
        this.botTypes.forEach(type => {
            this.sprites[type.id] = {
                right: new Image(),
                left: new Image()
            };
            this.sprites[type.id].right.src = type.sprite;
            this.sprites[type.id].left.src = type.spriteLeft;
        });
    },
    
    spawn: function(scene) {
        if (this.bots.length >= this.maxBots) return;
        
        // Pick random bot type
        const typeIndex = Math.floor(Math.random() * this.botTypes.length);
        const botType = this.botTypes[typeIndex];
        
        // Random position
        const x = 100 + Math.random() * (GameCore.canvas.width - 200);
        const y = GameCore.canvas.height - this.config.height - 50;
        
        const bot = {
            type: botType,
            x: x,
            y: y,
            width: this.config.width,
            height: this.config.height,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: this.config.speed,
            
            // Animation
            frame: 0,
            frameTimer: 0,
            state: 'walk', // walk, shoot, idle
            
            // Shooting
            shootTimer: Math.random() * this.config.shootIntervalMin,
            isShooting: false,
            
            // Stats
            kills: 0,
            
            // Riding
            isRiding: null
        };
        
        this.bots.push(bot);
        return bot;
    },
    
    update: function(deltaTime) {
        // Spawn timer
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnDelay && this.bots.length < this.maxBots) {
            this.spawn(GameCore.currentScene);
            this.spawnTimer = 0;
        }
        
        // Update each bot
        this.bots.forEach(bot => {
            if (bot.isRiding) {
                this.updateRiding(bot, deltaTime);
            } else {
                this.updateWalking(bot, deltaTime);
                this.updateShooting(bot, deltaTime);
            }
            
            this.updateAnimation(bot, deltaTime);
        });
    },
    
    updateWalking: function(bot, deltaTime) {
        // Random direction change
        if (Math.random() < this.config.changeDirectionChance) {
            bot.direction *= -1;
        }
        
        // Movement
        bot.x += bot.speed * bot.direction;
        
        // Bounds
        if (bot.x < 50) {
            bot.x = 50;
            bot.direction = 1;
        } else if (bot.x > GameCore.canvas.width - this.config.width - 50) {
            bot.x = GameCore.canvas.width - this.config.width - 50;
            bot.direction = -1;
        }
        
        bot.state = 'walk';
    },
    
    updateRiding: function(bot, deltaTime) {
        // Follow tractor bucket
        if (bot.isRiding === 'tractor_bucket') {
            // TractorSystem handles position
        }
    },
    
    updateShooting: function(bot, deltaTime) {
        bot.shootTimer += deltaTime;
        
        const shootInterval = this.config.shootIntervalMin + 
            Math.random() * (this.config.shootIntervalMax - this.config.shootIntervalMin);
        
        if (bot.shootTimer >= shootInterval) {
            bot.shootTimer = 0;
            
            // Find a target bird
            const targetBird = this.findTargetBird(bot);
            
            if (targetBird) {
                this.shoot(bot, targetBird);
            }
        }
    },
    
    findTargetBird: function(bot) {
        if (typeof BirdSystem === 'undefined') return null;
        
        // Find birds in range
        const range = 400;
        const birds = BirdSystem.birds.filter(bird => {
            if (bird.protected) return false; // Don't shoot protected
            const dist = Math.sqrt(
                Math.pow(bird.x - bot.x, 2) + 
                Math.pow(bird.y - bot.y, 2)
            );
            return dist < range;
        });
        
        if (birds.length === 0) return null;
        
        // Pick random bird
        return birds[Math.floor(Math.random() * birds.length)];
    },
    
    shoot: function(bot, targetBird) {
        bot.isShooting = true;
        bot.state = 'shoot';
        
        // Face target
        bot.direction = targetBird.x > bot.x ? 1 : -1;
        
        // Play sound
        AudioManager.play(bot.type.shootSound);
        
        // Accuracy check
        const hit = Math.random() < this.config.accuracy;
        
        if (hit) {
            // Bot kills bird (steals from player!)
            setTimeout(() => {
                if (targetBird.isAlive !== false) {
                    targetBird.isAlive = false;
                    bot.kills++;
                    
                    // Show message
                    UIManager.showMessage(`${bot.type.name} got a ${targetBird.type}!`, 1500);
                }
            }, 100);
        }
        
        // Reset state after shoot animation
        setTimeout(() => {
            bot.isShooting = false;
            bot.state = 'walk';
        }, 400);
    },
    
    updateAnimation: function(bot, deltaTime) {
        bot.frameTimer += deltaTime;
        
        if (bot.frameTimer >= this.config.frameSpeed) {
            bot.frameTimer = 0;
            bot.frame = (bot.frame + 1) % this.config.frames;
        }
    },
    
    // Player bounces on bot
    onBounce: function(bot, player) {
        // Award points
        ScoreSystem.add(this.config.bouncePoints, 'Bounced on ' + bot.type.name);
        
        // Play sound
        AudioManager.play(this.config.bounceSound);
        
        // Return bounce power
        return this.config.bouncePower;
    },
    
    // Check if player is landing on a bot
    checkBounceCollision: function(player) {
        if (player.velocityY <= 0) return null; // Must be falling
        
        for (const bot of this.bots) {
            const botTop = bot.y;
            const playerBottom = player.y + player.height;
            
            // Landing zone (top of bot's head)
            if (playerBottom >= botTop && 
                playerBottom <= botTop + 20 &&
                player.x + player.width > bot.x &&
                player.x < bot.x + bot.width) {
                
                return bot;
            }
        }
        
        return null;
    },
    
    render: function(ctx) {
        this.bots.forEach(bot => {
            const sprites = this.sprites[bot.type.id];
            const sprite = bot.direction > 0 ? sprites.right : sprites.left;
            
            if (sprite && sprite.complete) {
                const frameWidth = this.config.width;
                const sourceX = bot.frame * frameWidth;
                
                ctx.drawImage(
                    sprite,
                    sourceX, 0,
                    frameWidth, this.config.height,
                    bot.x, bot.y,
                    this.config.width, this.config.height
                );
                
                // Name tag
                ctx.fillStyle = bot.type.color;
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(
                    bot.type.name,
                    bot.x + this.config.width / 2,
                    bot.y - 5
                );
                ctx.textAlign = 'left';
                
                // Kill count (small)
                if (bot.kills > 0) {
                    ctx.fillStyle = '#FFD700';
                    ctx.font = '9px Arial';
                    ctx.fillText(
                        '🐦' + bot.kills,
                        bot.x + this.config.width / 2 - 10,
                        bot.y - 18
                    );
                }
            }
        });
    },
    
    reset: function() {
        this.bots = [];
        this.spawnTimer = 0;
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = BotHunterSystem;
}
