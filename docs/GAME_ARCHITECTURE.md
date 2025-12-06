# BIRDTURDS v40.5 - Complete Game Architecture

## 🎮 GAME OVERVIEW

**Genre:** 2D Side-Scrolling Hunting Game with Comedy Elements
**Platform:** Web Browser (HTML5 Canvas)
**Theme:** Redneck hunters vs birds, farm chaos, spiritual humor

---

## 📁 PROJECT STRUCTURE

```
/public_html/
├── index.html              # Landing page with character selection
├── play.html               # Main game canvas
├── howtoplay.html          # Instructions & rules
├── api/                    # Backend API endpoints
├── css/
│   └── styles.css          # Global styles
├── js/
│   ├── game-core.js        # Main game loop, canvas, input
│   ├── player-system.js    # Player hunter controls, shooting
│   ├── bird-system.js      # Flying birds, spawning, behavior
│   ├── farm-animals.js     # Ground animals, bouncing, riding
│   ├── npc-systems.js      # Farmer, Child, Bot Hunters
│   ├── tractor-system.js   # Green/Red tractors, bucket ride
│   ├── sniper-system.js    # Enemy snipers
│   ├── demon-system.js     # Demon + Red Tractor Driver
│   ├── wildlife-system.js  # Deer, Elk, Bear, Wolf
│   ├── trump-system.js     # Trump scene special mechanics
│   ├── item-system.js      # Umbrella, Knife, Golden Rings
│   ├── audio-manager.js    # All sounds, music, voice lines
│   ├── sprite-loader.js    # Asset loading and caching
│   ├── collision.js        # AABB collision detection
│   ├── ui-manager.js       # HUD, score, menus
│   └── game-rules.js       # Points, rules, configuration
├── sprites/
│   ├── birds/              # 40+ bird species
│   ├── animals/            # Farm animals + wildlife
│   ├── characters/         # Playable hunters (8)
│   ├── npcs/               # Farmer, Child, Cyclist, etc.
│   ├── bots/               # 4 Bot hunters
│   ├── enemies/            # Sniper
│   ├── demon/              # Demon sprite strips
│   ├── trump/              # Trump & Bodyguard
│   ├── vehicles/           # Green & Red tractors
│   ├── weapons/            # Guns, knife, etc.
│   ├── items/              # Umbrella, ammo, coins
│   └── landscapes/         # Scene backgrounds (15)
├── sounds/
│   ├── [character]_shoot.mp3   # 8 character gunshots
│   ├── [animal]_[sound].mp3    # 13 animal sounds
│   ├── demon_screech.mp3
│   ├── sniper_shot.mp3
│   ├── knife_slash.mp3
│   ├── umbrella_open.mp3
│   ├── ring_grab.mp3
│   ├── tractor_good.mp3
│   ├── tractor_bad.mp3
│   └── [more]...               # 29+ total sounds
└── server/
    └── api.php             # Score saving, leaderboards
```

---

## 🎯 CORE GAME SYSTEMS

### 1. GAME LOOP (game-core.js)
```javascript
GameCore = {
    canvas: null,
    ctx: null,
    gameState: 'menu', // menu, playing, paused, gameover
    currentScene: 'farm',
    deltaTime: 0,
    lastTime: 0,
    
    init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.loadAssets();
        this.setupInput();
        requestAnimationFrame(this.gameLoop.bind(this));
    },
    
    gameLoop(timestamp) {
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(this.deltaTime);
        this.render();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    },
    
    update(dt) {
        if (this.gameState !== 'playing') return;
        
        PlayerSystem.update(dt);
        BirdSystem.update(dt);
        FarmAnimals.update(dt);
        NPCSystem.update(dt);
        TractorSystem.update(dt);
        DemonSystem.update(dt);
        SniperSystem.update(dt);
        ItemSystem.update(dt);
        CollisionSystem.checkAll();
        UIManager.update(dt);
    },
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render layers back to front
        BackgroundSystem.render(this.ctx);
        TractorSystem.render(this.ctx);
        FarmAnimals.render(this.ctx);
        NPCSystem.render(this.ctx);
        DemonSystem.render(this.ctx);
        BirdSystem.render(this.ctx);
        SniperSystem.render(this.ctx);
        ItemSystem.render(this.ctx);
        PlayerSystem.render(this.ctx);
        UIManager.render(this.ctx);
    }
};
```

---

### 2. SCENES & BACKGROUNDS

| Scene | Background | Special Features |
|-------|------------|------------------|
| **Park** | statepark.png | Umbrellas, Golden Rings, Child |
| **Farm** | farm.png | All animals, Tractors, Farmer |
| **Country** | forest.png | Wildlife, Hunters |
| **Beach** | beach.png | Seagulls++, Child |
| **City** | town.png | Pigeons++, Hunters |
| **Trump** | whitehouse.png | Trump + Bodyguards (special) |

---

### 3. PLAYER SYSTEM (player-system.js)

```javascript
PlayerSystem = {
    x: 100,
    y: 400,
    width: 50,
    height: 75,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpForce: -15,
    gravity: 0.8,
    isGrounded: false,
    isShooting: false,
    isRiding: null,        // Animal or tractor bucket
    hasUmbrella: false,
    hasKnife: false,
    knifeTimer: 0,
    health: 100,
    
    character: 'bubba',    // Selected character
    direction: 1,          // 1 = right, -1 = left
    currentFrame: 0,
    frameTimer: 0,
    
    states: {
        idle: 0,
        walk: 1,
        jump: 2,
        shoot: 3,
        hurt: 4
    }
};
```

---

### 4. BIRD SYSTEM (bird-system.js)

```javascript
BirdSystem = {
    birds: [],
    spawnTimer: 0,
    spawnInterval: 2000,
    
    birdTypes: {
        // Regular birds (CAN shoot)
        pigeon:   { points: 10,  speed: 2, size: [30, 25] },
        sparrow:  { points: 15,  speed: 3, size: [25, 20] },
        crow:     { points: 25,  speed: 2.5, size: [35, 30] },
        seagull:  { points: 30,  speed: 2, size: [40, 30] },
        goose:    { points: 50,  speed: 1.5, size: [50, 40] },
        hawk:     { points: 75,  speed: 4, size: [45, 35] },
        eagle:    { points: 100, speed: 3.5, size: [55, 45] },
        
        // Protected birds (CANNOT shoot - penalty!)
        owl:      { points: -50,  protected: true },
        bluebird: { points: -75,  protected: true },
        cardinal: { points: -100, protected: true }
    },
    
    // Helper birds (friendly - carry player)
    helperBirds: ['eagle', 'pelican', 'stork']
};
```

---

### 5. FARM ANIMALS (farm-animals.js)

```javascript
FarmAnimals = {
    animals: [],
    
    animalTypes: {
        // All bounceable, some rideable
        horse:   { bounce: 2.2, rideable: true,  rideBonus: 500,  size: [90, 85] },
        cow:     { bounce: 1.8, rideable: true,  rideBonus: 500,  size: [80, 55] },
        deer:    { bounce: 2.0, rideable: true,  rideBonus: 1000, size: [85, 80] },
        elk:     { bounce: 2.3, rideable: false, size: [100, 90] },
        cat:     { bounce: 1.7, rideable: false, size: [50, 45] },
        dog:     { bounce: 1.5, rideable: false, size: [60, 45] },
        goat:    { bounce: 1.6, rideable: false, size: [55, 55] },
        sheep:   { bounce: 1.4, rideable: false, size: [55, 50] },
        pig:     { bounce: 1.3, rideable: false, size: [65, 50] },
        chicken: { bounce: 1.2, rideable: false, size: [40, 35] },
        rooster: { bounce: 1.2, rideable: false, size: [40, 45] },
        wolf:    { bounce: 1.8, rideable: false, size: [60, 45] },
        bear:    { bounce: 1.6, rideable: false, size: [80, 70] }
    },
    
    // Scene spawn rates
    spawnRates: {
        farm:    0.8,  // 80% chance
        country: 0.7,
        park:    0.3,
        beach:   0.2,
        city:    0.1
    }
};
```

---

### 6. TRACTOR SYSTEM (tractor-system.js) ⭐ NEW

```javascript
TractorSystem = {
    tractors: [],
    
    types: {
        good: {
            sprite: 'tractor_good_strip.png',
            driver: 'happy_farmer',
            speed: 2,
            behavior: 'helpful',
            sound: 'tractor_good.mp3',
            
            // NEW: Bucket ride feature
            bucket: {
                canCarryHunter: true,
                capacity: 1,
                safeZone: true,      // Hunter protected while riding
                offsetX: 20,         // Position relative to tractor
                offsetY: -40
            },
            
            // Helpful actions
            actions: {
                scoopPoop: true,     // Cleans up bird turds
                protectHunter: true, // Never hurts player
                scaresBirds: false   // Doesn't scare birds away
            }
        },
        
        bad: {
            sprite: 'tractor_bad_strip.png',
            driver: 'angry_guy',
            speed: 3,
            behavior: 'hostile',
            sound: 'tractor_bad.mp3',
            driverVoice: 'tractor_driver_bad.mp3',
            
            // Demon hovers above
            hasDemon: true,
            demonOffset: { x: 0, y: -50 },
            
            // Hostile actions
            actions: {
                scoopPoop: false,
                damagesPlayer: true,  // Can hurt player
                scaresBirds: true     // Scares birds away
            }
        }
    },
    
    // Hunter bucket ride logic
    checkBucketRide(hunter) {
        const goodTractor = this.tractors.find(t => t.type === 'good');
        if (!goodTractor) return false;
        
        const bucket = goodTractor.bucket;
        const bucketX = goodTractor.x + this.types.good.bucket.offsetX;
        const bucketY = goodTractor.y + this.types.good.bucket.offsetY;
        
        // Check if hunter is jumping into bucket
        if (hunter.velocityY > 0 && 
            hunter.x > bucketX - 20 && 
            hunter.x < bucketX + 40 &&
            hunter.y + hunter.height > bucketY &&
            hunter.y + hunter.height < bucketY + 30) {
            
            return {
                canRide: true,
                x: bucketX,
                y: bucketY
            };
        }
        return false;
    },
    
    // Scoop poop cleanup
    scoopPoop(tractor) {
        if (tractor.type !== 'good') return;
        
        // Find turds near bucket
        const turds = TurdSystem.turds.filter(turd => {
            return Math.abs(turd.x - tractor.x) < 60 &&
                   turd.y > tractor.y;
        });
        
        turds.forEach(turd => {
            TurdSystem.remove(turd);
            // Small point bonus for cleanup
            ScoreSystem.add(5, 'Tractor cleanup');
        });
    }
};
```

---

### 7. DEMON SYSTEM (demon-system.js) ⭐ NEW

```javascript
DemonSystem = {
    demon: null,
    isActive: false,
    isFleeing: false,
    fleeTimer: 0,
    returnDelay: 30000,  // 30 seconds to return
    
    states: {
        FLY: 0,
        ATTACK: 1,
        HIT: 2,
        FLEE: 3
    },
    
    init() {
        this.demon = {
            x: 0,
            y: 0,
            width: 60,
            height: 70,
            state: this.states.FLY,
            frame: 0,
            frameTimer: 0
        };
    },
    
    update(dt) {
        if (!this.isActive) return;
        
        const badTractor = TractorSystem.tractors.find(t => t.type === 'bad');
        if (!badTractor && !this.isFleeing) {
            this.isActive = false;
            return;
        }
        
        if (this.isFleeing) {
            // Fly off screen
            this.demon.y -= 10;
            this.demon.x += 5;
            this.demon.state = this.states.FLEE;
            
            if (this.demon.y < -100) {
                this.isFleeing = false;
                this.isActive = false;
                
                // Return after delay
                setTimeout(() => {
                    this.spawn();
                }, this.returnDelay);
            }
        } else {
            // Hover above bad tractor driver
            this.demon.x = badTractor.x + TractorSystem.types.bad.demonOffset.x;
            this.demon.y = badTractor.y + TractorSystem.types.bad.demonOffset.y;
            this.demon.state = this.states.FLY;
        }
        
        // Animation
        this.demon.frameTimer += dt;
        if (this.demon.frameTimer > 150) {
            this.demon.frameTimer = 0;
            // Subtle hover animation
        }
    },
    
    onHit() {
        // Demon was shot!
        AudioManager.play('demon_screech');
        ScoreSystem.add(100, 'Demon hit!');
        
        this.demon.state = this.states.HIT;
        this.isFleeing = true;
        
        // Trigger hunter comment
        VoiceSystem.playHunterComment('demon');
    },
    
    spawn() {
        const badTractor = TractorSystem.tractors.find(t => t.type === 'bad');
        if (badTractor) {
            this.isActive = true;
            this.isFleeing = false;
        }
    }
};
```

---

### 8. VOICE SYSTEM (voice-system.js) ⭐ NEW

```javascript
VoiceSystem = {
    lastPastorComment: 0,
    lastScripture: 0,
    lastHunterComment: 0,
    
    // Intervals (in ms)
    intervals: {
        pastorComment: { min: 45000, max: 90000 },  // 45-90 seconds
        scripture: 300000,                           // 5 minutes
        hunterComment: { min: 30000, max: 60000 }   // 30-60 seconds
    },
    
    // ==========================================
    // PASTOR COMMENTS (on bad tractor driver)
    // Light, humorous, not preachy
    // ==========================================
    pastorLines: [
        "Bless his heart, that fella's havin' a rough day!",
        "Someone woke up on the wrong side of the barn!",
        "Lord give me patience... and give it to me NOW!",
        "That man needs a hug... or an exorcism!",
        "Pray for him, folks. Pray HARD."
    ],
    
    // ==========================================
    // HUNTER COMMENTS (when demon appears)
    // Casual, funny, not overly religious
    // ==========================================
    hunterDemonLines: [
        "Well, there's somethin' you don't see every day!",
        "That ain't no turkey!",
        "Hey ugly! Yeah, I'm talkin' to you!",
        "Time to send that critter back where it came from!",
        "Git! Go on, GIT!"
    ],
    
    // ==========================================
    // SCRIPTURE (very occasional, relevant)
    // Short, punchy, fits the action
    // ==========================================
    scriptureLines: [
        { text: "Resist the devil and he will flee!", ref: "James 4:7" },
        { text: "Greater is He in you than he in the world!", ref: "1 John 4:4" },
        { text: "No weapon formed against you shall prosper!", ref: "Isaiah 54:17" }
    ],
    
    update(dt) {
        const now = Date.now();
        
        // Check for bad tractor (triggers pastor comments)
        const badTractor = TractorSystem.tractors.find(t => t.type === 'bad');
        
        if (badTractor && DemonSystem.isActive) {
            // Pastor comments (random interval)
            const pastorInterval = this.intervals.pastorComment.min + 
                Math.random() * (this.intervals.pastorComment.max - this.intervals.pastorComment.min);
            
            if (now - this.lastPastorComment > pastorInterval) {
                this.playPastorComment();
                this.lastPastorComment = now;
            }
            
            // Scripture (every 5 min, only if demon active)
            if (now - this.lastScripture > this.intervals.scripture) {
                this.playScripture();
                this.lastScripture = now;
            }
        }
    },
    
    playPastorComment() {
        const line = this.pastorLines[Math.floor(Math.random() * this.pastorLines.length)];
        UIManager.showSpeechBubble('Pastor', line, 3000);
        // AudioManager.playVoice('pastor', line); // If ElevenLabs available
    },
    
    playHunterComment(type) {
        if (type === 'demon') {
            const line = this.hunterDemonLines[Math.floor(Math.random() * this.hunterDemonLines.length)];
            UIManager.showSpeechBubble('Hunter', line, 2500);
        }
    },
    
    playScripture() {
        const scripture = this.scriptureLines[Math.floor(Math.random() * this.scriptureLines.length)];
        UIManager.showSpeechBubble('📖', `"${scripture.text}" - ${scripture.ref}`, 4000);
    }
};
```

---

### 9. BOT HUNTERS (bot-system.js)

```javascript
BotHunterSystem = {
    bots: [],
    maxBots: 2,
    
    botTypes: [
        { id: 'bot1', name: 'Big Earl', sprite: 'bot1_strip.png', sound: 'bubba_shoot.mp3' },
        { id: 'bot2', name: 'Sally', sprite: 'bot2_strip.png', sound: 'daisy_shoot.mp3' },
        { id: 'bot3', name: 'Hank', sprite: 'bot3_strip.png', sound: 'buck_shoot.mp3' },
        { id: 'bot4', name: 'Tex', sprite: 'bot4_strip.png', sound: 'clyde_shoot.mp3' }
    ],
    
    behaviors: {
        // Walk around
        walk: {
            speed: 1.5,
            changeDirectionChance: 0.01
        },
        
        // Shoot at birds
        shoot: {
            interval: { min: 2000, max: 5000 },
            accuracy: 0.6,  // 60% hit rate
            canStealKills: true
        },
        
        // Bounceable by player
        bounce: {
            power: 1.3,
            points: 20,
            sound: 'hunter_oof.mp3'
        },
        
        // Can ride in tractor bucket
        canRideTractor: true
    }
};
```

---

### 10. SNIPER SYSTEM (sniper-system.js)

```javascript
SniperSystem = {
    snipers: [],
    maxSnipers: 3,
    
    // NOT in Trump scene!
    excludedScenes: ['trump'],
    
    states: {
        HIDDEN: 0,
        PEEKING: 1,
        SHOOTING: 2,
        HIT: 3
    },
    
    // Hiding spots per scene
    hidingSpots: {
        park:    ['bush', 'tree', 'bench'],
        farm:    ['haystack', 'barrel', 'fence'],
        country: ['rock', 'log', 'bush'],
        beach:   ['umbrella', 'cooler', 'dune'],
        city:    ['dumpster', 'car', 'mailbox']
    },
    
    // Points
    points: {
        kill: 500,
        allKilled: 300  // Bonus for clearing all
    },
    
    // Timing
    timing: {
        hiddenDuration: 2000,
        peekDuration: 1500,    // Warning! Red glint visible
        shootDuration: 500
    }
};
```

---

### 11. COLLISION RULES

```javascript
CollisionRules = {
    // What player bullets can hit
    playerBullets: {
        canHit: ['birds', 'turds', 'snipers_visible', 'demon'],
        cannotHit: ['animals', 'npcs', 'bot_hunters', 'protected_birds', 'tractors']
    },
    
    // What player can bounce on
    playerBounce: {
        canBounce: ['animals', 'npcs', 'bot_hunters', 'child'],
        special: {
            animals: 'apply bounce multiplier',
            bot_hunters: '+20 points',
            child: '+25 points',
            farmer: '+30 points'
        }
    },
    
    // What player can ride
    playerRide: {
        canRide: ['horse', 'cow', 'deer', 'tractor_bucket'],
        bonuses: {
            horse: 500,
            cow: 500,
            deer: 1000,
            tractor_bucket: 0  // Safety, not points
        }
    },
    
    // What damages player
    damagesPlayer: {
        sources: ['sniper_bullets', 'falling_turds', 'bad_tractor'],
        protection: {
            umbrella: 'blocks turds',
            tractor_bucket: 'full protection'
        }
    }
};
```

---

### 12. POINTS SYSTEM

```javascript
PointSystem = {
    // Birds
    birds: {
        pigeon: 10, sparrow: 15, crow: 25, seagull: 30,
        goose: 50, hawk: 75, eagle: 100,
        // Protected (penalties)
        owl: -50, bluebird: -75, cardinal: -100
    },
    
    // Combat
    combat: {
        sniper_kill: 500,
        all_snipers_killed: 300,
        demon_hit: 100
    },
    
    // Riding
    riding: {
        horse: 500,
        cow: 500,
        deer: 1000,
        ride_combo: 1000  // Horse + Cow in same round
    },
    
    // Bouncing
    bouncing: {
        bot_hunter: 20,
        farmer: 30,
        child: 25
    },
    
    // Items
    items: {
        golden_ring: 100,
        ring_unlock: 250,
        turd_blast: 15,
        knife_bonus: 1.5  // 50% more on kills
    },
    
    // Bonuses
    bonuses: {
        deer_master: 500,    // Ride deer + kill 3 birds
        sniper_ace: 300,     // Kill all snipers
        perfect_round: 200   // No damage taken
    }
};
```

---

## 🔊 AUDIO ARCHITECTURE

```javascript
AudioManager = {
    channels: {
        music: { audio: null, volume: 0.5 },
        sfx: { audio: null, volume: 0.8 },
        voice: { audio: null, volume: 1.0 },
        ambient: { audio: null, volume: 0.3 }
    },
    
    sounds: {
        // Animal sounds (play on bounce)
        animals: {
            cat: 'cat_meow.mp3',
            dog: 'dog_bark.mp3',
            cow: 'cow_moo.mp3',
            // ... etc
        },
        
        // Combat
        combat: {
            sniper_shot: 'sniper_shot.mp3',
            knife_slash: 'knife_slash.mp3',
            demon_screech: 'demon_screech.mp3'
        },
        
        // Vehicles
        vehicles: {
            tractor_good: 'tractor_good.mp3',
            tractor_bad: 'tractor_bad.mp3'
        },
        
        // Items
        items: {
            umbrella: 'umbrella_open.mp3',
            ring: 'ring_grab.mp3'
        },
        
        // NPCs
        npcs: {
            hunter_oof: 'hunter_oof.mp3',
            child_wheee: 'child_wheee.mp3'
        }
    }
};
```

---

## 🎮 GAME FLOW

```
┌─────────────────────────────────────────────────────────┐
│                    INDEX.HTML                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   SELECT    │  │   SELECT    │  │    VIEW     │     │
│  │  CHARACTER  │  │   SCENE     │  │   RULES     │     │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘     │
│         │                │                              │
│         └────────┬───────┘                              │
│                  ▼                                      │
│         ┌─────────────┐                                 │
│         │    PLAY     │                                 │
│         └──────┬──────┘                                 │
└────────────────┼────────────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────────┐
│                     PLAY.HTML                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │                 GAME CANVAS                      │   │
│  │                                                  │   │
│  │  [Background Layer]                              │   │
│  │  [Tractor Layer]                                 │   │
│  │  [Animal Layer]                                  │   │
│  │  [NPC Layer]                                     │   │
│  │  [Bird Layer]                                    │   │
│  │  [Player Layer]                                  │   │
│  │  [UI Layer]                                      │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  SCORE   │ │  HEALTH  │ │   AMMO   │ │   TIME   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 COPILOT REVIEW CHECKLIST

### Questions for Copilot:

1. **Architecture Review**
   - Is the system separation clean? (Each system handles one concern)
   - Are there any circular dependencies?
   - Is the collision system efficient?

2. **Performance**
   - Should we use object pooling for bullets/birds?
   - Is requestAnimationFrame loop optimal?
   - Sprite batching recommendations?

3. **Code Quality**
   - Best practices for Canvas game loops?
   - Error handling recommendations?
   - State machine implementation?

4. **Features**
   - Tractor bucket ride mechanic - any edge cases?
   - Demon flee/return system - timing concerns?
   - Voice line system - queue management?

5. **Testing**
   - Unit test approach for game systems?
   - Integration test for collision?
   - Performance benchmarks?

---

## 🚀 BUILD & DEPLOY

```bash
# Development
npm run dev       # Start local server with hot reload

# Production
npm run build     # Minify and bundle
npm run deploy    # Upload to server

# Assets
npm run sprites   # Process sprite sheets
npm run audio     # Normalize audio levels
```

---

## 📊 ASSET SUMMARY

| Category | Count |
|----------|-------|
| Sprite Sheets | 54 |
| Sound Files | 29 |
| Backgrounds | 15 |
| Bird Types | 40+ |
| Animal Types | 13 |
| Characters | 8 |
| Bot Hunters | 4 |
| Total Assets | 160+ |

---

**Version:** 40.5
**Last Updated:** December 3, 2025
**Author:** Claude + Human Collaboration
