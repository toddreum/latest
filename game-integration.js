// ============================================
// BIRDTURDS v40.5 - GAME INTEGRATION
// Master file that initializes and coordinates all systems
// ============================================

const BirdturdsGame = {
    version: '40.5',
    
    // Game state
    state: 'menu',  // menu, playing, paused, gameover
    currentScene: 'farm',
    
    // Timing
    lastTime: 0,
    deltaTime: 0,
    
    // Canvas
    canvas: null,
    ctx: null,
    width: 1280,
    height: 720,
    
    // ==========================================
    // SCENES CONFIGURATION
    // ==========================================
    scenes: {
        park: {
            background: 'sprites/landscapes/statepark.png',
            music: 'sounds/level1_country.mp3',
            features: ['umbrellas', 'goldenRings', 'child'],
            animals: ['dog', 'cat', 'deer', 'bear'],
            animalSpawnRate: 0.3,
            birdTypes: ['pigeon', 'sparrow', 'crow', 'hawk', 'owl'],
            hasSnipers: true,
            hasTractors: false
        },
        farm: {
            background: 'sprites/landscapes/farm.png',
            music: 'sounds/level1_country.mp3',
            features: ['tractors', 'farmer', 'child'],
            animals: ['horse', 'cow', 'pig', 'chicken', 'rooster', 'goat', 'sheep', 'dog', 'cat', 'elk', 'wolf'],
            animalSpawnRate: 0.8,
            birdTypes: ['pigeon', 'crow', 'goose', 'hawk', 'eagle', 'owl'],
            hasSnipers: true,
            hasTractors: true
        },
        country: {
            background: 'sprites/landscapes/forest.png',
            music: 'sounds/level1_country.mp3',
            features: ['farmer', 'child'],
            animals: ['cow', 'horse', 'sheep', 'goat', 'dog', 'deer', 'elk', 'wolf'],
            animalSpawnRate: 0.7,
            birdTypes: ['crow', 'hawk', 'eagle', 'goose', 'owl', 'cardinal'],
            hasSnipers: true,
            hasTractors: true
        },
        beach: {
            background: 'sprites/landscapes/beach.png',
            music: 'sounds/level1_country.mp3',
            features: ['child', 'umbrellas'],
            animals: ['dog', 'cat'],
            animalSpawnRate: 0.2,
            birdTypes: ['seagull', 'pelican', 'pigeon'],
            hasSnipers: true,
            hasTractors: false
        },
        city: {
            background: 'sprites/landscapes/town.png',
            music: 'sounds/level1_country.mp3',
            features: [],
            animals: ['dog', 'cat'],
            animalSpawnRate: 0.1,
            birdTypes: ['pigeon', 'sparrow', 'crow'],
            hasSnipers: true,
            hasTractors: false
        },
        trump: {
            background: 'sprites/landscapes/whitehouse.png',
            music: 'sounds/level2_christmas.mp3',
            features: ['trump', 'bodyguards'],
            animals: [],
            animalSpawnRate: 0,
            birdTypes: ['eagle', 'hawk', 'crow', 'pigeon'],
            hasSnipers: false,  // NO snipers in Trump scene!
            hasTractors: false
        }
    },
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    init: function() {
        console.log('BIRDTURDS v' + this.version + ' initializing...');
        
        // Setup canvas
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Initialize all systems
        this.initSystems();
        
        // Setup input
        this.setupInput();
        
        // Start game loop
        requestAnimationFrame(this.gameLoop.bind(this));
        
        console.log('Game initialized!');
    },
    
    initSystems: function() {
        // Core systems
        if (typeof AudioManager !== 'undefined') AudioManager.init();
        if (typeof SpriteLoader !== 'undefined') SpriteLoader.init();
        
        // Game systems
        if (typeof PlayerSystem !== 'undefined') PlayerSystem.init();
        if (typeof BirdSystem !== 'undefined') BirdSystem.init();
        if (typeof FarmAnimals !== 'undefined') FarmAnimals.init();
        if (typeof TractorSystem !== 'undefined') TractorSystem.init();
        if (typeof DemonSystem !== 'undefined') DemonSystem.init();
        if (typeof SniperSystem !== 'undefined') SniperSystem.init();
        if (typeof BotHunterSystem !== 'undefined') BotHunterSystem.init();
        if (typeof NPCSystem !== 'undefined') NPCSystem.init();
        if (typeof ItemSystem !== 'undefined') ItemSystem.init();
        if (typeof VoiceSystem !== 'undefined') VoiceSystem.init();
        if (typeof AngelSystem !== 'undefined') AngelSystem.init();
        if (typeof BibleSystem !== 'undefined') BibleSystem.init();
        if (typeof ScriptureQuizSystem !== 'undefined') ScriptureQuizSystem.init();
        if (typeof CommunitySystem !== 'undefined') CommunitySystem.init();
        if (typeof PrayerSystem !== 'undefined') PrayerSystem.init();
        if (typeof DevotionalSystem !== 'undefined') DevotionalSystem.init();
        if (typeof PersonalJourneySystem !== 'undefined') PersonalJourneySystem.init();
        if (typeof SocialSystem !== 'undefined') SocialSystem.init();
        if (typeof WellnessSystem !== 'undefined') WellnessSystem.init();
        if (typeof NewsSystem !== 'undefined') NewsSystem.init();
        if (typeof LeaderboardSystem !== 'undefined') LeaderboardSystem.init();
        if (typeof ComicBubbleSystem !== 'undefined') ComicBubbleSystem.init();
        if (typeof FamilySystem !== 'undefined') FamilySystem.init();
        if (typeof WorshipMusicSystem !== 'undefined') WorshipMusicSystem.init();
        if (typeof ResourcesSystem !== 'undefined') ResourcesSystem.init();
        if (typeof AudioManager !== 'undefined') AudioManager.init();
        if (typeof UIManager !== 'undefined') UIManager.init();
    },
    
    setupInput: function() {
        // Keyboard input handled by InputManager
        if (typeof InputManager !== 'undefined') {
            InputManager.init();
        }
    },
    
    // ==========================================
    // GAME LOOP
    // ==========================================
    gameLoop: function(timestamp) {
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        // Cap delta time to prevent huge jumps
        if (this.deltaTime > 100) this.deltaTime = 100;
        
        this.update(this.deltaTime);
        this.render();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    },
    
    update: function(dt) {
        if (this.state !== 'playing') return;
        
        const scene = this.scenes[this.currentScene];
        
        // Update all systems in order
        
        // Player first
        if (typeof PlayerSystem !== 'undefined') {
            PlayerSystem.update(dt);
        }
        
        // Birds
        if (typeof BirdSystem !== 'undefined') {
            BirdSystem.update(dt, scene.birdTypes);
        }
        
        // Animals
        if (typeof FarmAnimals !== 'undefined') {
            FarmAnimals.update(dt, scene.animals, scene.animalSpawnRate);
        }
        
        // Tractors (only in tractor scenes)
        if (scene.hasTractors && typeof TractorSystem !== 'undefined') {
            TractorSystem.update(dt);
        }
        
        // Demon (follows bad tractor)
        if (typeof DemonSystem !== 'undefined') {
            DemonSystem.update(dt);
        }
        
        // Snipers (not in Trump scene)
        if (scene.hasSnipers && typeof SniperSystem !== 'undefined') {
            SniperSystem.update(dt);
        }
        
        // Bot hunters
        if (typeof BotHunterSystem !== 'undefined') {
            BotHunterSystem.update(dt);
        }
        
        // NPCs (farmer, child)
        if (typeof NPCSystem !== 'undefined') {
            NPCSystem.update(dt, scene.features);
        }
        
        // Items (umbrella, knife, rings)
        if (typeof ItemSystem !== 'undefined') {
            ItemSystem.update(dt);
        }
        
        // Voice system (comments, scripture)
        if (typeof VoiceSystem !== 'undefined') {
            VoiceSystem.update(dt);
        }
        
        // Angel system
        if (typeof AngelSystem !== 'undefined') {
            AngelSystem.update(dt);
        }
        
        // Bible system
        if (typeof BibleSystem !== 'undefined') {
            BibleSystem.update(dt);
        }
        
        // Collisions
        this.checkCollisions();
        
        // UI
        if (typeof UIManager !== 'undefined') {
            UIManager.update(dt);
        }
    },
    
    // ==========================================
    // COLLISION DETECTION
    // ==========================================
    checkCollisions: function() {
        if (typeof PlayerSystem === 'undefined') return;
        
        const player = PlayerSystem;
        
        // Bible pickup check
        if (typeof BibleSystem !== 'undefined') {
            BibleSystem.checkPickup(player);
        }
        
        // Player bullets vs targets
        if (player.bullets) {
            player.bullets.forEach((bullet, bulletIndex) => {
                // vs Birds
                if (typeof BirdSystem !== 'undefined') {
                    BirdSystem.birds.forEach((bird, birdIndex) => {
                        if (this.checkAABB(bullet, bird)) {
                            this.onBulletHitBird(bullet, bird, bulletIndex, birdIndex);
                        }
                    });
                }
                
                // vs Demon
                if (typeof DemonSystem !== 'undefined') {
                    if (DemonSystem.checkHit(bullet)) {
                        player.bullets.splice(bulletIndex, 1);
                    }
                }
                
                // vs Snipers
                if (typeof SniperSystem !== 'undefined') {
                    SniperSystem.snipers.forEach((sniper, sniperIndex) => {
                        if (sniper.state !== 'hidden' && this.checkAABB(bullet, sniper)) {
                            this.onBulletHitSniper(bullet, sniper, bulletIndex, sniperIndex);
                        }
                    });
                }
            });
        }
        
        // Player bouncing
        if (player.velocityY > 0) {  // Falling
            
            // vs Animals
            if (typeof FarmAnimals !== 'undefined') {
                const animal = FarmAnimals.checkBounceCollision(player);
                if (animal) {
                    this.onPlayerBounceAnimal(player, animal);
                }
            }
            
            // vs Bot Hunters
            if (typeof BotHunterSystem !== 'undefined') {
                const bot = BotHunterSystem.checkBounceCollision(player);
                if (bot) {
                    this.onPlayerBounceBotHunter(player, bot);
                }
            }
            
            // vs Tractor Bucket
            if (typeof TractorSystem !== 'undefined') {
                if (TractorSystem.checkBucketEntry(player)) {
                    // Player entered bucket - handled by TractorSystem
                }
            }
        }
        
        // Damage to player
        
        // from Bad Tractor
        if (typeof TractorSystem !== 'undefined') {
            const tractorDamage = TractorSystem.checkDamageCollision(player);
            if (tractorDamage) {
                this.onPlayerDamaged(tractorDamage.damage, tractorDamage.source);
            }
        }
        
        // from Sniper Bullets
        if (typeof SniperSystem !== 'undefined') {
            const sniperDamage = SniperSystem.checkBulletHit(player);
            if (sniperDamage) {
                this.onPlayerDamaged(sniperDamage.damage, 'sniper');
            }
        }
    },
    
    checkAABB: function(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    },
    
    onBulletHitBird: function(bullet, bird, bulletIndex, birdIndex) {
        // Check if protected
        if (bird.protected) {
            ScoreSystem.add(bird.points, 'Protected bird penalty!');
            AudioManager.play('sounds/hurt.mp3');
        } else {
            ScoreSystem.add(bird.points, bird.type + ' killed!');
            AudioManager.play('sounds/bird_death.mp3');
        }
        
        // Remove bullet and bird
        PlayerSystem.bullets.splice(bulletIndex, 1);
        BirdSystem.birds.splice(birdIndex, 1);
    },
    
    onBulletHitSniper: function(bullet, sniper, bulletIndex, sniperIndex) {
        ScoreSystem.add(500, 'Sniper killed!');
        AudioManager.play('sounds/hit.mp3');
        
        sniper.state = 'hit';
        PlayerSystem.bullets.splice(bulletIndex, 1);
        
        // Check if all snipers killed
        setTimeout(() => {
            SniperSystem.snipers.splice(sniperIndex, 1);
            if (SniperSystem.snipers.length === 0) {
                ScoreSystem.add(300, 'All snipers eliminated!');
            }
        }, 500);
    },
    
    onPlayerBounceAnimal: function(player, animal) {
        const bouncePower = animal.bouncePower || 1.5;
        player.velocityY = -15 * bouncePower;
        
        // Play sound
        const soundKey = animal.type + '_' + (animal.soundType || animal.type);
        AudioManager.play('sounds/' + soundKey + '.mp3');
        
        // Check if rideable
        if (animal.rideable && !player.isRiding) {
            player.isRiding = animal;
            ScoreSystem.add(animal.rideBonus, 'Riding ' + animal.type + '!');
        }
    },
    
    onPlayerBounceBotHunter: function(player, bot) {
        const bouncePower = BotHunterSystem.onBounce(bot, player);
        player.velocityY = -15 * bouncePower;
    },
    
    onPlayerDamaged: function(damage, source) {
        // Check protection
        if (typeof TractorSystem !== 'undefined' && TractorSystem.isHunterProtected(PlayerSystem)) {
            return; // Protected in bucket
        }
        
        if (PlayerSystem.hasUmbrella && source === 'turd') {
            return; // Umbrella blocks turds
        }
        
        PlayerSystem.health -= damage;
        AudioManager.play('sounds/hurt.mp3');
        UIManager.showDamage(damage, source);
        
        if (PlayerSystem.health <= 0) {
            this.gameOver();
        }
    },
    
    // ==========================================
    // RENDERING
    // ==========================================
    render: function() {
        const ctx = this.ctx;
        
        // Clear
        ctx.clearRect(0, 0, this.width, this.height);
        
        // Background
        if (typeof BackgroundSystem !== 'undefined') {
            BackgroundSystem.render(ctx);
        } else {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, this.width, this.height);
        }
        
        // Game objects (back to front)
        
        // Tractors
        if (typeof TractorSystem !== 'undefined') {
            TractorSystem.render(ctx);
        }
        
        // Animals
        if (typeof FarmAnimals !== 'undefined') {
            FarmAnimals.render(ctx);
        }
        
        // NPCs
        if (typeof NPCSystem !== 'undefined') {
            NPCSystem.render(ctx);
        }
        
        // Bot Hunters
        if (typeof BotHunterSystem !== 'undefined') {
            BotHunterSystem.render(ctx);
        }
        
        // Demon
        if (typeof DemonSystem !== 'undefined') {
            DemonSystem.render(ctx);
        }
        
        // Angel (renders above demon)
        if (typeof AngelSystem !== 'undefined') {
            AngelSystem.render(ctx);
        }
        
        // Snipers
        if (typeof SniperSystem !== 'undefined') {
            SniperSystem.render(ctx);
        }
        
        // Birds
        if (typeof BirdSystem !== 'undefined') {
            BirdSystem.render(ctx);
        }
        
        // Items
        if (typeof ItemSystem !== 'undefined') {
            ItemSystem.render(ctx);
        }
        
        // Bibles (render before player so aura shows behind)
        if (typeof BibleSystem !== 'undefined') {
            BibleSystem.render(ctx);
        }
        
        // Player
        if (typeof PlayerSystem !== 'undefined') {
            PlayerSystem.render(ctx);
        }
        
        // Voice bubbles
        if (typeof VoiceSystem !== 'undefined') {
            VoiceSystem.render(ctx);
        }
        
        // UI (always on top)
        if (typeof UIManager !== 'undefined') {
            UIManager.render(ctx);
        }
    },
    
    // ==========================================
    // GAME STATE
    // ==========================================
    startGame: function(scene, character) {
        this.currentScene = scene || 'farm';
        this.state = 'playing';
        
        // Reset all systems
        this.resetSystems();
        
        // Load scene
        this.loadScene(this.currentScene);
        
        // Set player character
        if (typeof PlayerSystem !== 'undefined') {
            PlayerSystem.setCharacter(character || 'bubba');
        }
        
        // Offer prayer moment at game start (gentle, can skip)
        if (typeof PrayerSystem !== 'undefined') {
            setTimeout(() => {
                PrayerSystem.offerQuickPrayer('game_start');
            }, 3000);
        }
        
        // Check for devotional nudge
        if (typeof DevotionalSystem !== 'undefined') {
            DevotionalSystem.checkNudge();
        }
        
        console.log('Game started! Scene:', this.currentScene);
    },
    
    loadScene: function(sceneName) {
        const scene = this.scenes[sceneName];
        if (!scene) {
            console.error('Unknown scene:', sceneName);
            return;
        }
        
        // Load background
        if (typeof BackgroundSystem !== 'undefined') {
            BackgroundSystem.load(scene.background);
        }
        
        // Play music
        if (typeof AudioManager !== 'undefined') {
            AudioManager.playMusic(scene.music);
        }
        
        console.log('Loaded scene:', sceneName);
    },
    
    resetSystems: function() {
        if (typeof PlayerSystem !== 'undefined') PlayerSystem.reset();
        if (typeof BirdSystem !== 'undefined') BirdSystem.reset();
        if (typeof FarmAnimals !== 'undefined') FarmAnimals.reset();
        if (typeof TractorSystem !== 'undefined') TractorSystem.init();
        if (typeof DemonSystem !== 'undefined') DemonSystem.init();
        if (typeof SniperSystem !== 'undefined') SniperSystem.reset();
        if (typeof BotHunterSystem !== 'undefined') BotHunterSystem.reset();
        if (typeof ScoreSystem !== 'undefined') ScoreSystem.reset();
    },
    
    pauseGame: function() {
        this.state = 'paused';
        if (typeof AudioManager !== 'undefined') {
            AudioManager.pauseAll();
        }
    },
    
    resumeGame: function() {
        this.state = 'playing';
        if (typeof AudioManager !== 'undefined') {
            AudioManager.resumeAll();
        }
    },
    
    gameOver: function() {
        this.state = 'gameover';
        
        if (typeof AudioManager !== 'undefined') {
            AudioManager.play('sounds/gameover.mp3');
        }
        
        // Start Scripture Quiz if scriptures were shown
        if (typeof ScriptureQuizSystem !== 'undefined' && ScriptureQuizSystem.getQuizCount() > 0) {
            ScriptureQuizSystem.startQuiz((quizPoints) => {
                // After quiz, offer community sharing
                this.offerCommunityShare();
            });
        } else {
            // No quiz, go straight to community share offer
            this.offerCommunityShare();
        }
    },
    
    offerCommunityShare: function() {
        // Record score to leaderboard
        if (typeof LeaderboardSystem !== 'undefined') {
            LeaderboardSystem.recordGameScore(ScoreSystem.total);
        }
        
        // Ask if player wants to share something
        if (typeof CommunitySystem !== 'undefined') {
            // Show share option in game over screen
            if (typeof UIManager !== 'undefined') {
                UIManager.showGameOver(ScoreSystem.total, true); // true = show share button
            }
        } else {
            if (typeof UIManager !== 'undefined') {
                UIManager.showGameOver(ScoreSystem.total, false);
            }
        }
        
        console.log('Game Over! Final score:', ScoreSystem.total);
    }
};

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Don't auto-init - let index.html handle it
    console.log('BirdturdsGame ready. Call BirdturdsGame.init() to start.');
});

// Export
if (typeof module !== 'undefined') {
    module.exports = BirdturdsGame;
}
