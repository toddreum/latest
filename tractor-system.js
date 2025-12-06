// ============================================
// BIRDTURDS v40.5 - TRACTOR SYSTEM
// Green tractor = helpful, Red tractor = hostile
// ============================================

const TractorSystem = {
    tractors: [],
    spawnTimer: 0,
    spawnInterval: 30000, // 30 seconds between spawns
    
    // Tractor configurations
    config: {
        good: {
            type: 'good',
            sprite: 'sprites/vehicles/tractor_good_strip.png',
            spriteLeft: 'sprites/vehicles/tractor_good_strip_left.png',
            width: 100,
            height: 80,
            frames: 4,
            frameSpeed: 200,
            speed: 2,
            sound: 'sounds/tractor_good.mp3',
            
            // Bucket for hunter to ride in
            bucket: {
                enabled: true,
                offsetX: 15,       // Bucket position from tractor left
                offsetY: -30,      // Above tractor
                width: 40,
                height: 35,
                safeZone: true     // Hunter is protected
            },
            
            // Helpful behaviors
            behaviors: {
                scoopsPoop: true,
                protectsHunter: true,
                damagesPlayer: false,
                scaresBirds: false
            }
        },
        
        bad: {
            type: 'bad',
            sprite: 'sprites/vehicles/tractor_bad_strip.png',
            spriteLeft: 'sprites/vehicles/tractor_bad_strip_left.png',
            width: 100,
            height: 80,
            frames: 4,
            frameSpeed: 150, // Faster animation (angry)
            speed: 3,        // Faster movement
            sound: 'sounds/tractor_bad.mp3',
            driverVoice: 'sounds/tractor_driver_bad.mp3',
            
            // No bucket ride
            bucket: {
                enabled: false
            },
            
            // Hostile behaviors
            behaviors: {
                scoopsPoop: false,
                protectsHunter: false,
                damagesPlayer: true,
                scaresBirds: true,
                hasDemon: true
            },
            
            // Demon hover position
            demonOffset: {
                x: 30,
                y: -50
            }
        }
    },
    
    // Currently riding hunter reference
    bucketRider: null,
    
    init: function() {
        this.tractors = [];
        this.bucketRider = null;
        this.loadSprites();
    },
    
    loadSprites: function() {
        // Preload tractor sprites
        this.sprites = {
            good: {
                right: new Image(),
                left: new Image()
            },
            bad: {
                right: new Image(),
                left: new Image()
            }
        };
        
        this.sprites.good.right.src = this.config.good.sprite;
        this.sprites.good.left.src = this.config.good.spriteLeft;
        this.sprites.bad.right.src = this.config.bad.sprite;
        this.sprites.bad.left.src = this.config.bad.spriteLeft;
    },
    
    spawn: function(type, scene) {
        // Only spawn in appropriate scenes
        const validScenes = ['farm', 'country'];
        if (!validScenes.includes(scene)) return;
        
        const cfg = this.config[type];
        const startFromLeft = Math.random() > 0.5;
        
        const tractor = {
            type: type,
            x: startFromLeft ? -cfg.width : GameCore.canvas.width,
            y: GameCore.canvas.height - cfg.height - 50, // Ground level
            width: cfg.width,
            height: cfg.height,
            speed: cfg.speed,
            direction: startFromLeft ? 1 : -1,
            frame: 0,
            frameTimer: 0,
            frameSpeed: cfg.frameSpeed,
            sound: null,
            isActive: true
        };
        
        // Play engine sound (looping)
        tractor.sound = AudioManager.playLoop(cfg.sound, 0.4);
        
        // If bad tractor, spawn demon
        if (type === 'bad' && cfg.behaviors.hasDemon) {
            DemonSystem.spawn(tractor);
        }
        
        this.tractors.push(tractor);
        return tractor;
    },
    
    update: function(deltaTime) {
        for (let i = this.tractors.length - 1; i >= 0; i--) {
            const tractor = this.tractors[i];
            const cfg = this.config[tractor.type];
            
            // Movement
            tractor.x += tractor.speed * tractor.direction;
            
            // Animation
            tractor.frameTimer += deltaTime;
            if (tractor.frameTimer >= cfg.frameSpeed) {
                tractor.frameTimer = 0;
                tractor.frame = (tractor.frame + 1) % cfg.frames;
            }
            
            // Bucket rider follows tractor
            if (tractor.type === 'good' && this.bucketRider) {
                this.updateBucketRider(tractor);
            }
            
            // Good tractor behaviors
            if (tractor.type === 'good') {
                this.handleGoodTractorBehaviors(tractor);
            }
            
            // Bad tractor behaviors
            if (tractor.type === 'bad') {
                this.handleBadTractorBehaviors(tractor);
            }
            
            // Remove if off screen
            if (tractor.direction > 0 && tractor.x > GameCore.canvas.width + 100) {
                this.removeTractor(i);
            } else if (tractor.direction < 0 && tractor.x < -cfg.width - 100) {
                this.removeTractor(i);
            }
        }
        
        // Spawn timer
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            // 70% good, 30% bad
            const type = Math.random() > 0.3 ? 'good' : 'bad';
            this.spawn(type, GameCore.currentScene);
        }
    },
    
    handleGoodTractorBehaviors: function(tractor) {
        const cfg = this.config.good;
        
        // Scoop up poop/turds
        if (cfg.behaviors.scoopsPoop && typeof TurdSystem !== 'undefined') {
            const bucketX = tractor.x + cfg.bucket.offsetX;
            
            TurdSystem.turds.forEach((turd, index) => {
                if (Math.abs(turd.x - bucketX) < 50 && 
                    turd.y > tractor.y - 20) {
                    TurdSystem.turds.splice(index, 1);
                    ScoreSystem.add(5, 'Tractor cleanup!');
                }
            });
        }
        
        // Comic speech bubble - random scripture/praise from farmer
        if (typeof ComicBubbleSystem !== 'undefined') {
            // Small chance each frame to show bubble
            if (Math.random() < 0.0005) { // ~once per 30 seconds at 60fps
                const driverX = tractor.x + 60; // Driver position
                const driverY = tractor.y;
                ComicBubbleSystem.showBubble(driverX, driverY);
            }
            
            // Update bubble position as tractor moves
            ComicBubbleSystem.updatePosition(tractor.x + 60, tractor.y);
        }
    },
    
    handleBadTractorBehaviors: function(tractor) {
        const cfg = this.config.bad;
        
        // Scare birds away
        if (cfg.behaviors.scaresBirds && typeof BirdSystem !== 'undefined') {
            BirdSystem.birds.forEach(bird => {
                const dist = Math.abs(bird.x - tractor.x);
                if (dist < 150) {
                    // Birds fly away from tractor
                    bird.velocityY = -5;
                    bird.scared = true;
                }
            });
        }
        
        // Occasional angry driver voice
        if (Math.random() < 0.001) { // Very rare
            AudioManager.play(cfg.driverVoice);
        }
    },
    
    // Check if red tractor is on screen
    hasRedTractor: function() {
        return this.tractors.some(t => t.type === 'bad');
    },
    
    // ==========================================
    // BUCKET RIDE SYSTEM
    // ==========================================
    
    checkBucketEntry: function(hunter) {
        // Find good tractor
        const goodTractor = this.tractors.find(t => t.type === 'good');
        if (!goodTractor || this.bucketRider) return false;
        
        const cfg = this.config.good;
        const bucketX = goodTractor.x + cfg.bucket.offsetX;
        const bucketY = goodTractor.y + cfg.bucket.offsetY;
        
        // Check if hunter is landing in bucket
        if (hunter.velocityY > 0 && // Falling
            hunter.x + hunter.width > bucketX &&
            hunter.x < bucketX + cfg.bucket.width &&
            hunter.y + hunter.height > bucketY &&
            hunter.y + hunter.height < bucketY + cfg.bucket.height + 20) {
            
            this.enterBucket(hunter, goodTractor);
            return true;
        }
        
        return false;
    },
    
    enterBucket: function(hunter, tractor) {
        this.bucketRider = hunter;
        hunter.isRiding = 'tractor_bucket';
        hunter.ridingTarget = tractor;
        hunter.velocityY = 0;
        hunter.isGrounded = true;
        
        // Position in bucket
        const cfg = this.config.good;
        hunter.x = tractor.x + cfg.bucket.offsetX + 5;
        hunter.y = tractor.y + cfg.bucket.offsetY;
        
        // Show message
        UIManager.showMessage('Safe in the bucket!', 2000);
    },
    
    exitBucket: function(hunter) {
        if (!this.bucketRider) return;
        
        hunter.isRiding = null;
        hunter.ridingTarget = null;
        hunter.velocityY = -8; // Small jump out
        
        this.bucketRider = null;
    },
    
    updateBucketRider: function(tractor) {
        if (!this.bucketRider) return;
        
        const cfg = this.config.good;
        const hunter = this.bucketRider;
        
        // Keep hunter in bucket position
        hunter.x = tractor.x + cfg.bucket.offsetX + 5;
        hunter.y = tractor.y + cfg.bucket.offsetY;
        hunter.direction = tractor.direction;
        
        // Hunter can still shoot while riding!
        // (handled by PlayerSystem)
        
        // Press DOWN or JUMP to exit
        if (InputManager.isPressed('down') || InputManager.isPressed('jump')) {
            this.exitBucket(hunter);
        }
    },
    
    isHunterProtected: function(hunter) {
        // Check if hunter is in good tractor bucket
        return this.bucketRider === hunter;
    },
    
    removeTractor: function(index) {
        const tractor = this.tractors[index];
        
        // Stop sound
        if (tractor.sound) {
            tractor.sound.pause();
        }
        
        // Eject rider if any
        if (tractor.type === 'good' && this.bucketRider) {
            this.exitBucket(this.bucketRider);
        }
        
        // Remove demon if bad tractor
        if (tractor.type === 'bad') {
            DemonSystem.onTractorRemoved(tractor);
        }
        
        this.tractors.splice(index, 1);
    },
    
    render: function(ctx) {
        this.tractors.forEach(tractor => {
            const cfg = this.config[tractor.type];
            const sprite = tractor.direction > 0 ? 
                this.sprites[tractor.type].right : 
                this.sprites[tractor.type].left;
            
            if (sprite.complete) {
                const frameWidth = cfg.width;
                const sourceX = tractor.frame * frameWidth;
                
                ctx.drawImage(
                    sprite,
                    sourceX, 0,
                    frameWidth, cfg.height,
                    tractor.x, tractor.y,
                    cfg.width, cfg.height
                );
                
                // Draw bucket highlight if good tractor and empty
                if (tractor.type === 'good' && !this.bucketRider) {
                    const bucketX = tractor.x + cfg.bucket.offsetX;
                    const bucketY = tractor.y + cfg.bucket.offsetY;
                    
                    // Subtle glow to indicate rideable
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
                    ctx.fillRect(bucketX, bucketY, cfg.bucket.width, cfg.bucket.height);
                }
            }
        });
    },
    
    // Check collision with bad tractor (damages player)
    checkDamageCollision: function(hunter) {
        for (const tractor of this.tractors) {
            if (tractor.type !== 'bad') continue;
            
            // Simple AABB collision
            if (hunter.x < tractor.x + tractor.width &&
                hunter.x + hunter.width > tractor.x &&
                hunter.y < tractor.y + tractor.height &&
                hunter.y + hunter.height > tractor.y) {
                
                // Damage unless protected
                if (!this.isHunterProtected(hunter)) {
                    return { damage: 15, source: 'bad_tractor' };
                }
            }
        }
        return null;
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = TractorSystem;
}
