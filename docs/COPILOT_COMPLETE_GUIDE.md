# 🎮 BIRDTURDS v41.0 - COMPLETE DEVELOPMENT GUIDE FOR COPILOT
## Everything You Need to Know to Work on This Game

---

# TABLE OF CONTENTS
1. [Game Overview](#game-overview)
2. [Folder Structure](#folder-structure)
3. [Asset Specifications](#asset-specifications)
4. [Game Systems](#game-systems)
5. [Core Mechanics](#core-mechanics)
6. [Sprite Loading Guide](#sprite-loading-guide)
7. [Audio System](#audio-system)
8. [File Paths Reference](#file-paths-reference)
9. [Development Tasks](#development-tasks)

---

# GAME OVERVIEW

## What is BirdTurds?
BirdTurds is a browser-based 2D side-scrolling shooter game built with **Phaser 3**. The player controls a "hunter" character who must shoot birds before they poop on the player. The game has Christian themes integrated throughout (Bible verses, devotionals, prayer features).

## Core Gameplay Loop
1. Player selects a hunter character (8 options)
2. Birds fly across the screen
3. Player shoots birds to earn points
4. Birds drop "turds" (poop) that damage the player
5. Various events occur: tractors, demons, phone zombies, animals
6. Player progresses through different scene backgrounds
7. Scripture and devotional content appears during gameplay

## Tech Stack
- **Engine:** Phaser 3 (JavaScript game framework)
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** PHP (for leaderboards, user accounts)
- **Hosting:** InMotion Hosting (cPanel)
- **Audio:** MP3 format
- **Sprites:** PNG format (some are actually WebP renamed to .png)

---

# FOLDER STRUCTURE

```
/public_html/                    # Web root
├── index.html                   # Landing/home page
├── play.html                    # Main game page (contains game canvas)
├── howtoplay.html               # Tutorial page
├── about.html                   # About page
├── contact.html                 # Contact page
│
├── sprites/                     # ALL GAME SPRITES
│   ├── animals/                 # Farm animals (18 files)
│   │   ├── cat_strip.png        # Left-facing, 4 frames, 252×45
│   │   ├── cat_strip_right.png  # Right-facing
│   │   ├── cow_strip.png        # 316×55
│   │   ├── cow_strip_right.png
│   │   ├── dog_strip.png        # 256×45
│   │   ├── dog_strip_right.png
│   │   ├── goat_strip.png       # 228×55
│   │   ├── goat_strip_right.png
│   │   ├── horse_strip.png      # 364×85
│   │   ├── horse_strip_right.png
│   │   ├── pig_strip.png        # 264×50
│   │   ├── pig_strip_right.png
│   │   ├── sheep_strip.png      # 216×50
│   │   ├── sheep_strip_right.png
│   │   ├── rooster_strip.png    # 260×45
│   │   ├── rooster_strip_right.png
│   │   ├── chicken_strip.png    # 160×27
│   │   └── chicken_strip_right.png
│   │
│   ├── hunters/                 # Player characters (8 hunters)
│   │   ├── buck.png             # Country boy, shotgun
│   │   ├── daisy.png            # Country girl, rifle
│   │   ├── bubba.png            # Big guy, heavy weapons
│   │   ├── clyde.png            # Old timer, classic
│   │   ├── sierra.png           # Fitness girl, tactical (768×768)
│   │   ├── gunner.png           # Military vet, assault rifle (768×768)
│   │   ├── jolene.png           # Pink cowgirl, sniper (768×768)
│   │   └── tammy.png            # Waitress, bubble gum (768×768)
│   │
│   ├── birds/                   # Bird enemies (NEED SPRITES)
│   │   ├── crow_strip.png       # TODO
│   │   ├── pigeon_strip.png     # TODO
│   │   ├── seagull_strip.png    # TODO
│   │   ├── eagle_strip.png      # TODO
│   │   └── [etc...]
│   │
│   ├── vehicles/                # Tractors
│   │   ├── tractor_good_strip.png      # 400×80, 4 frames, 100×80 each
│   │   ├── tractor_good_strip_left.png
│   │   ├── tractor_bad_strip.png       # 400×80, 4 frames
│   │   ├── tractor_bad_strip_left.png
│   │   ├── tractor_good_new.png        # NEW: 844×664, 2×2 grid (with driver)
│   │   └── tractor_bad_new.png         # NEW: 888×1280, 2×4 grid (with driver)
│   │
│   ├── bots/                    # Phone zombies (people staring at phones)
│   │   ├── bot1_strip.png       # 200×75, 4 frames
│   │   ├── bot1_strip_left.png
│   │   ├── bot2_strip.png
│   │   ├── bot2_strip_left.png
│   │   ├── bot3_strip.png
│   │   ├── bot3_strip_left.png
│   │   ├── bot4_strip.png
│   │   └── bot4_strip_left.png
│   │
│   ├── demon/                   # Demon enemy
│   │   ├── demon_strip.png      # 240×70, 4 frames of 60×70
│   │   ├── demon_strip_left.png
│   │   ├── demon_attack_sized.png  # 60×70 single frame
│   │   ├── demon_hit_sized.png
│   │   ├── demon_flee_sized.png
│   │   ├── demon_fly_sized.png
│   │   └── [original large files...]
│   │
│   ├── enemies/                 # Enemy characters
│   │   ├── sniper_strip.png     # 240×70, 4 frames
│   │   └── sniper_strip_right.png
│   │
│   ├── npcs/                    # Non-player characters
│   │   ├── farmer_strip.png     # 200×55, 4 frames
│   │   ├── farmer_strip_right.png
│   │   ├── child_strip.png      # 120×50, 4 frames
│   │   └── child_strip_right.png
│   │
│   ├── trump/                   # Trump event (special event)
│   │   ├── trump_walk.png       # 1266×1308, 3×3 grid
│   │   ├── trump_run.png        # 1308×1404, 3×3 grid
│   │   ├── trump_hurt.png       # 636×924, single frame
│   │   ├── bodyguard_walk.png   # 1026×1584, 3×4 grid
│   │   └── bodyguard_shoot.png  # 1280×1024, 4×4 grid
│   │
│   └── items/                   # Collectibles
│       └── umbrella.png         # 40×40
│
├── sounds/                      # ALL AUDIO FILES
│   ├── [animal sounds - see Audio section]
│   ├── [vehicle sounds]
│   ├── [character sounds]
│   └── [music - if any]
│
├── js/                          # JAVASCRIPT FILES
│   ├── game.js                  # MAIN GAME FILE (Phaser game)
│   ├── PATHS.js                 # Master path reference
│   └── systems/                 # Modular game systems
│       ├── angel-system.js
│       ├── animal-sprites.js
│       ├── audio-manager.js
│       ├── AUDIO_CONFIG.js
│       ├── bible-system.js
│       ├── bot-hunter-system.js
│       ├── comic-bubble-system.js
│       ├── community-system.js
│       ├── debug-system.js
│       ├── demon-system.js
│       ├── devotional-system.js
│       ├── family-system.js
│       ├── farm-animals.js
│       ├── game-integration.js
│       ├── game-rules.js
│       ├── input-manager.js
│       ├── leaderboard-system.js
│       ├── news-system.js
│       ├── npc-systems.js
│       ├── personal-journey.js
│       ├── prayer-system.js
│       ├── resources-system.js
│       ├── scripture-quiz.js
│       ├── sniper-wildlife.js
│       ├── social-system.js
│       ├── tractor-system.js
│       ├── voice-system.js
│       ├── wellness-system.js
│       └── worship-music-system.js
│
├── css/                         # STYLESHEETS
│   └── styles.css
│
├── api/                         # BACKEND API
│   ├── leaderboard.php
│   ├── user.php
│   └── [etc...]
│
└── docs/                        # DOCUMENTATION
    ├── ASSET_MANIFEST.md
    ├── GAME_ARCHITECTURE.md
    └── [etc...]
```

---

# ASSET SPECIFICATIONS

## Sprite Formats

### STRIP FORMAT (Horizontal)
Most sprites use horizontal strip format:
```
[Frame1][Frame2][Frame3][Frame4]
```
- Width = frameWidth × numberOfFrames
- Height = frameHeight
- Example: `cow_strip.png` is 316×55 with 4 frames → frameWidth = 79

### GRID FORMAT (2D Grid)
Some sprites use grid format:
```
[Frame1][Frame2]
[Frame3][Frame4]
[Frame5][Frame6]
```
- Divide width by columns, height by rows
- Example: `tractor_good_new.png` is 844×664 with 2×2 grid → frameWidth = 422, frameHeight = 332

## Sprite Dimension Reference

### Animals (Strip format, 4 frames each)
| Animal | Total Size | Frame Size | Notes |
|--------|-----------|------------|-------|
| Cat | 252×45 | 63×45 | |
| Dog | 256×45 | 64×45 | |
| Cow | 316×55 | 79×55 | Rideable |
| Horse | 364×85 | 91×85 | Rideable |
| Pig | 264×50 | 66×50 | |
| Goat | 228×55 | 57×55 | |
| Sheep | 216×50 | 54×50 | |
| Rooster | 260×45 | 65×45 | |
| Chicken | 160×27 | 40×27 | |

### Hunters (Single frame, static images)
| Hunter | Size | Description |
|--------|------|-------------|
| Gunner | 768×768 | Military vet, eyepatch, cigar, assault rifle |
| Jolene | 768×768 | Blonde cowgirl, pink camo cap, sniper rifle |
| Sierra | 768×768 | Fitness girl, camo sports bra, AR-15 |
| Tammy | 768×768 | Red-haired waitress, pink uniform, bubble gum |
| Buck | TBD | Country boy |
| Daisy | TBD | Country girl |
| Bubba | TBD | Big guy |
| Clyde | TBD | Old timer |

### Vehicles (Strip format)
| Vehicle | Total Size | Frame Size | Frames |
|---------|-----------|------------|--------|
| Tractor (old) | 400×80 | 100×80 | 4 |
| Tractor Good (new) | 844×664 | 422×332 | 4 (2×2 grid) |
| Tractor Bad (new) | 888×1280 | 444×320 | 8 (2×4 grid) |

### Other Entities
| Entity | Total Size | Frame Size | Frames |
|--------|-----------|------------|--------|
| Bot (phone zombie) | 200×75 | 50×75 | 4 |
| Demon | 240×70 | 60×70 | 4 |
| Sniper | 240×70 | 60×70 | 4 |
| Farmer | 200×55 | 50×55 | 4 |
| Child | 120×50 | 30×50 | 4 |

---

# GAME SYSTEMS

## 1. TRACTOR SYSTEM (`tractor-system.js`)

### Purpose
Spawns tractors that cross the screen. Good tractors help the player, bad tractors are enemies.

### Key Functions
```javascript
TractorSystem.init()           // Initialize system
TractorSystem.spawn(type, scene)  // Spawn 'good' or 'bad' tractor
TractorSystem.update(deltaTime)   // Update all tractors each frame
TractorSystem.render(ctx)         // Draw tractors
TractorSystem.checkBucketEntry(hunter)  // Check if hunter lands in bucket
TractorSystem.enterBucket(hunter, tractor)  // Put hunter in bucket
TractorSystem.exitBucket(hunter)  // Remove hunter from bucket
TractorSystem.checkDamageCollision(hunter)  // Check if bad tractor hits hunter
TractorSystem.playDriverVoice(type)  // Play driver audio
```

### Behaviors
- **Good Tractor (Green):**
  - Has front loader bucket hunter can ride in
  - Scoops up turds (cleans poop)
  - Protects hunter while riding
  - Friendly farmer driver voice

- **Bad Tractor (Red):**
  - No bucket ride
  - Damages player on contact (15 damage)
  - Scares birds away
  - Angry driver voice
  - Has demon hovering above

### Configuration
```javascript
config: {
  good: {
    sprite: '/sprites/vehicles/tractor_good_strip.png',
    width: 100, height: 80, frames: 4,
    speed: 2, frameSpeed: 200,
    engineSound: '/sounds/tractor_good.mp3',
    driverVoice: '/sounds/tractor_driver_good.mp3',
    bucket: { enabled: true, offsetX: 15, offsetY: -30, width: 40, height: 35 }
  },
  bad: {
    sprite: '/sprites/vehicles/tractor_bad_strip.png',
    width: 100, height: 80, frames: 4,
    speed: 3, frameSpeed: 150,
    engineSound: '/sounds/tractor_bad.mp3',
    driverVoice: '/sounds/tractor_driver_bad.mp3',
    behaviors: { damagesPlayer: true, scaresBirds: true, hasDemon: true }
  }
}
```

---

## 2. ANIMAL SPRITES SYSTEM (`animal-sprites.js`)

### Purpose
Loads and manages all farm animal sprites.

### Key Functions
```javascript
AnimalSprites.loadAll()           // Preload all animal images
AnimalSprites.getSprite(type, direction)  // Get loaded sprite image
AnimalSprites.getConfig(type)     // Get animal configuration
```

### Animal Config Structure
```javascript
{
  strip: '/sprites/animals/cow_strip.png',
  stripRight: '/sprites/animals/cow_strip_right.png',
  frames: 4,
  frameWidth: 79,
  frameHeight: 55,
  gameWidth: 80,    // Display size
  gameHeight: 55,
  speed: 0.5,
  bouncePower: 1.8,
  rideable: true,   // Can hunter ride?
  ridePoints: 500,
  sound: '/sounds/cow_moo.mp3'
}
```

---

## 3. DEMON SYSTEM (`demon-system.js`)

### Purpose
Spawns and controls demon enemies. Demons hover above bad tractors and attack the player.

### Key Functions
```javascript
DemonSystem.spawn(tractor)        // Spawn demon attached to tractor
DemonSystem.update(deltaTime)     // Update all demons
DemonSystem.render(ctx)           // Draw demons
DemonSystem.onTractorRemoved(tractor)  // Clean up when tractor leaves
```

### Demon States
- `fly` - Normal flying animation
- `attack` - Swooping at player
- `hit` - Got shot
- `flee` - Running away

---

## 4. BOT HUNTER SYSTEM (`bot-hunter-system.js`)

### Purpose
Manages "phone zombies" - NPCs who walk around staring at their phones. The player can "wake" them by shooting near them.

### Key Functions
```javascript
BotHunterSystem.spawn()           // Spawn new phone zombie
BotHunterSystem.update(deltaTime) // Update all bots
BotHunterSystem.wake(bot)         // Wake up a bot (gives points)
BotHunterSystem.render(ctx)       // Draw bots
```

---

## 5. BIBLE SYSTEM (`bible-system.js`)

### Purpose
Displays Bible verses during gameplay. Verses appear as rewards, encouragement, or during special events.

### Key Functions
```javascript
BibleSystem.getRandomVerse()      // Get random verse
BibleSystem.displayVerse(verse)   // Show verse on screen
BibleSystem.getCategoryVerse(category)  // Get verse by category
```

### Categories
- encouragement
- strength
- faith
- love
- wisdom
- victory

---

## 6. AUDIO MANAGER (`audio-manager.js`)

### Purpose
Central audio control for all game sounds.

### Key Functions
```javascript
AudioManager.play(path, volume)      // Play sound once
AudioManager.playLoop(path, volume)  // Play looping sound
AudioManager.stop(sound)             // Stop a sound
AudioManager.setMasterVolume(level)  // Set overall volume
AudioManager.mute()                  // Mute all sounds
AudioManager.unmute()                // Unmute
```

---

## 7. COMIC BUBBLE SYSTEM (`comic-bubble-system.js`)

### Purpose
Shows comic-style speech bubbles above characters with text.

### Key Functions
```javascript
ComicBubbleSystem.showBubble(x, y, text)  // Show bubble at position
ComicBubbleSystem.updatePosition(x, y)    // Move bubble (follow character)
ComicBubbleSystem.hide()                   // Hide current bubble
```

---

## 8. INPUT MANAGER (`input-manager.js`)

### Purpose
Handles keyboard and touch input.

### Key Functions
```javascript
InputManager.init()                  // Setup listeners
InputManager.isPressed(key)          // Check if key held
InputManager.wasPressed(key)         // Check if key just pressed
InputManager.update()                // Update input state
```

### Key Mappings
- `left` / `a` - Move left
- `right` / `d` - Move right
- `up` / `w` / `space` - Jump
- `down` / `s` - Duck / Exit bucket
- `click` / `tap` - Shoot

---

## 9. LEADERBOARD SYSTEM (`leaderboard-system.js`)

### Purpose
Manages high scores and player rankings.

### Key Functions
```javascript
LeaderboardSystem.submitScore(name, score)  // Submit score to server
LeaderboardSystem.getTopScores(limit)       // Fetch top scores
LeaderboardSystem.getPlayerRank(playerId)   // Get player's rank
```

---

# CORE MECHANICS

## Player Movement
```javascript
// In update() loop:
if (InputManager.isPressed('left')) {
  hunter.x -= hunter.speed;
  hunter.direction = -1;
}
if (InputManager.isPressed('right')) {
  hunter.x += hunter.speed;
  hunter.direction = 1;
}
if (InputManager.wasPressed('jump') && hunter.isGrounded) {
  hunter.velocityY = -hunter.jumpPower;
  hunter.isGrounded = false;
}

// Gravity
hunter.velocityY += GRAVITY;
hunter.y += hunter.velocityY;

// Ground collision
if (hunter.y >= groundY) {
  hunter.y = groundY;
  hunter.velocityY = 0;
  hunter.isGrounded = true;
}
```

## Shooting
```javascript
// On click/tap:
function shoot(targetX, targetY) {
  // Calculate angle to target
  const angle = Math.atan2(targetY - hunter.y, targetX - hunter.x);
  
  // Create bullet
  const bullet = {
    x: hunter.x,
    y: hunter.y,
    velocityX: Math.cos(angle) * BULLET_SPEED,
    velocityY: Math.sin(angle) * BULLET_SPEED
  };
  bullets.push(bullet);
  
  // Play sound
  AudioManager.play('/sounds/gunshot.mp3', 0.5);
}
```

## Bird Spawning
```javascript
function spawnBird() {
  const birdTypes = ['crow', 'pigeon', 'seagull', 'eagle'];
  const type = birdTypes[Math.floor(Math.random() * birdTypes.length)];
  
  const bird = {
    type: type,
    x: -50,  // Start off-screen left
    y: Math.random() * (canvas.height * 0.4),  // Upper portion of screen
    speed: 2 + Math.random() * 2,
    frame: 0,
    poopTimer: Math.random() * 3000
  };
  birds.push(bird);
}
```

## Turd (Poop) System
```javascript
// Bird poops:
function birdPoop(bird) {
  const turd = {
    x: bird.x,
    y: bird.y,
    velocityY: 2,
    splattered: false
  };
  turds.push(turd);
}

// Turd update:
turds.forEach(turd => {
  if (!turd.splattered) {
    turd.velocityY += 0.1;  // Gravity
    turd.y += turd.velocityY;
    
    // Hit ground
    if (turd.y >= groundY) {
      turd.splattered = true;
      // Create splat effect
    }
    
    // Hit player
    if (collision(turd, hunter)) {
      hunter.health -= 10;
      turd.splattered = true;
      AudioManager.play('/sounds/splat.mp3');
    }
  }
});
```

## Collision Detection
```javascript
function collision(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}
```

## Score System
```javascript
const ScoreSystem = {
  score: 0,
  multiplier: 1,
  
  add: function(points, reason) {
    this.score += points * this.multiplier;
    this.showFloatingText('+' + points, reason);
  },
  
  showFloatingText: function(text, subtitle) {
    // Create floating score text that rises and fades
  }
};
```

---

# SPRITE LOADING GUIDE

## Phaser 3 Spritesheet Loading

### Strip Format (4 horizontal frames)
```javascript
// In preload():
this.load.spritesheet('cow', '/sprites/animals/cow_strip.png', {
  frameWidth: 79,    // Total width (316) / frames (4)
  frameHeight: 55
});

// In create():
this.anims.create({
  key: 'cow_walk',
  frames: this.anims.generateFrameNumbers('cow', { start: 0, end: 3 }),
  frameRate: 8,
  repeat: -1  // Loop forever
});

// Usage:
const cow = this.add.sprite(x, y, 'cow');
cow.play('cow_walk');
```

### Grid Format (2×2 grid)
```javascript
// In preload():
this.load.spritesheet('tractor_good', '/sprites/vehicles/tractor_good_new.png', {
  frameWidth: 422,   // Total width (844) / columns (2)
  frameHeight: 332   // Total height (664) / rows (2)
});

// Frames are numbered left-to-right, top-to-bottom:
// [0][1]
// [2][3]
```

### Single Static Image
```javascript
// In preload():
this.load.image('gunner', '/sprites/hunters/gunner.png');

// Usage:
const hunter = this.add.image(x, y, 'gunner');
hunter.setScale(0.1);  // Scale down if too large
```

---

# AUDIO SYSTEM

## Sound Files Reference

### Animal Sounds
| Sound | Path | Used When |
|-------|------|-----------|
| Bear growl | `/sounds/bear_growl.mp3` | Bear appears |
| Cat meow | `/sounds/cat_meow.mp3` | Cat bounced on |
| Chicken cluck | `/sounds/chicken_cluck.mp3` | Chicken bounced on |
| Cow moo | `/sounds/cow_moo.mp3` | Cow bounced on |
| Crow caw | `/sounds/crow_caw.mp3` | Crow appears |
| Deer call | `/sounds/deer_call.mp3` | Deer appears |
| Dog bark | `/sounds/dog_bark.mp3` | Dog appears |
| Duck quack | `/sounds/duck_quack.mp3` | Duck appears |
| Eagle cry | `/sounds/eagle_cry.mp3` | Eagle appears |
| Elk bugle | `/sounds/elk_bugle.mp3` | Elk appears |
| Goat bleat | `/sounds/goat_bleat.mp3` | Goat bounced on |
| Goose honk | `/sounds/goose_honk.mp3` | Goose appears |
| Horse neigh | `/sounds/horse_neigh.mp3` | Horse bounced on |
| Owl hoot | `/sounds/owl_hoot.mp3` | Owl appears (night) |
| Pig oink | `/sounds/pig_oink.mp3` | Pig bounced on |
| Pigeon coo | `/sounds/pigeon_coo.mp3` | Pigeon appears |
| Rooster crow | `/sounds/rooster_crow.mp3` | Rooster at dawn |
| Seagull squawk | `/sounds/seagull_squawk.mp3` | Seagull appears |
| Sheep baa | `/sounds/sheep_baa.mp3` | Sheep bounced on |
| Wolf howl | `/sounds/wolf_howl.mp3` | Wolf appears |

### Vehicle Sounds
| Sound | Path | Used When |
|-------|------|-----------|
| Good tractor engine | `/sounds/tractor_good.mp3` | Green tractor on screen (loop) |
| Bad tractor engine | `/sounds/tractor_bad.mp3` | Red tractor on screen (loop) |
| Good driver voice | `/sounds/tractor_driver_good.mp3` | Friendly farmer speaks |
| Bad driver voice | `/sounds/tractor_driver_bad.mp3` | Angry driver yells |

### Character Sounds
| Sound | Path | Used When |
|-------|------|-----------|
| Hunter hurt | `/sounds/hunter_oof.mp3` | Player takes damage |
| Child happy | `/sounds/child_wheee.mp3` | Child NPC saved |
| Demon screech | `/sounds/demon_screech.mp3` | Demon attacks |
| Sniper shot | `/sounds/sniper_shot.mp3` | Sniper fires |

### Item Sounds
| Sound | Path | Used When |
|-------|------|-----------|
| Ring grab | `/sounds/ring_grab.mp3` | Collect ring/coin |
| Umbrella open | `/sounds/umbrella_open.mp3` | Use umbrella item |
| Knife slash | `/sounds/knife_slash.mp3` | Melee attack |

## Loading Audio in Phaser
```javascript
// In preload():
this.load.audio('cow_moo', '/sounds/cow_moo.mp3');

// In create():
this.cowSound = this.sound.add('cow_moo', { volume: 0.5 });

// Usage:
this.cowSound.play();
```

---

# FILE PATHS REFERENCE

## Base Paths
```javascript
const PATHS = {
  sprites: '/sprites',
  sounds: '/sounds',
  js: '/js/systems'
};
```

## Full Path Examples
```javascript
// Animals
'/sprites/animals/cow_strip.png'
'/sprites/animals/cow_strip_right.png'

// Hunters
'/sprites/hunters/gunner.png'
'/sprites/hunters/jolene.png'

// Vehicles
'/sprites/vehicles/tractor_good_strip.png'
'/sprites/vehicles/tractor_good_new.png'

// Sounds
'/sounds/cow_moo.mp3'
'/sounds/tractor_good.mp3'

// System JS
'/js/systems/tractor-system.js'
'/js/systems/animal-sprites.js'
```

---

# DEVELOPMENT TASKS

## TASK 1: Add New Hunter Sprites to Game

### Current Status
- 4 new hunters uploaded: gunner.png, jolene.png, sierra.png, tammy.png
- All are 768×768 WebP (despite .png extension)
- These are static single-frame images

### What Needs to Be Done
1. Load sprites in game.js preload()
2. Add to character selection screen
3. Scale appropriately for gameplay (768px is too large, scale to ~70px height)
4. Create left-facing versions (flip horizontally)

### Code Example
```javascript
// In preload():
this.load.image('hunter_gunner', '/sprites/hunters/gunner.png');
this.load.image('hunter_jolene', '/sprites/hunters/jolene.png');
this.load.image('hunter_sierra', '/sprites/hunters/sierra.png');
this.load.image('hunter_tammy', '/sprites/hunters/tammy.png');

// In create():
const hunter = this.add.image(x, y, 'hunter_gunner');
hunter.setScale(0.09);  // 768 * 0.09 ≈ 70px
```

---

## TASK 2: Integrate New Animated Tractors

### Current Status
- New tractor sprites with animated drivers:
  - `tractor_good_new.png` - 844×664, 2×2 grid (4 frames)
  - `tractor_bad_new.png` - 888×1280, 2×4 grid (8 frames)

### What Needs to Be Done
1. Update tractor-system.js to use new sprites
2. Load as spritesheets with correct frame dimensions
3. Create animations
4. Play driver voice audio

### Code Example
```javascript
// In preload():
this.load.spritesheet('tractor_good', '/sprites/vehicles/tractor_good_new.png', {
  frameWidth: 422,
  frameHeight: 332
});

// In create():
this.anims.create({
  key: 'tractor_good_drive',
  frames: this.anims.generateFrameNumbers('tractor_good', { start: 0, end: 3 }),
  frameRate: 6,
  repeat: -1
});
```

---

## TASK 3: Fix White Outline on Sprites

### Problem
Many sprites have a white "halo" or outline around them from anti-aliasing against white backgrounds.

### Solution for HTML/CSS Elements
```css
img[src*="/sprites/"] {
  filter: 
    drop-shadow(0 0 1px #0f172a)
    drop-shadow(0 0 1px #0f172a)
    drop-shadow(0 0 2px #0f172a);
}
```

### Solution for Phaser Sprites
```javascript
// Apply glow effect to mask white edges
sprite.postFX.addGlow(0x0f172a, 1, 0, false, 0.5, 10);
```

---

## TASK 4: Fix Mobile Black Space

### Problem
On mobile, there's black "outer space" visible below the game area.

### Solution
```css
html, body {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #0f172a 70%, #0a0f1a 100%);
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

#game-container {
  min-height: 50vh;
  max-height: 65vh;
  aspect-ratio: 16 / 10;
}
```

---

## TASK 5: Create Bird Sprites

### Needed Birds
- Crow
- Pigeon
- Seagull
- Eagle
- Duck
- Goose
- Owl
- Hawk
- Vulture
- Turkey

### Format Required
- Strip format: 4 frames horizontal
- Size: ~200-300px wide total
- Frame size: ~50-75px wide each
- With transparency

---

# NOTES FOR COPILOT

## Key Things to Remember

1. **Paths matter** - All paths should start with `/` (root-relative)

2. **Sprite dimensions must be exact** - frameWidth × frames = total width

3. **Most .png files are actually WebP** - Browser handles this fine

4. **Strip vs Grid sprites** - Most are strips (horizontal), some are grids

5. **Direction matters** - Most sprites have both left and right versions

6. **Audio is MP3 only** - All sounds are .mp3 format

7. **Scale hunters down** - Hunter images are 768px, need to be ~70px in game

8. **The main game file is game.js** - About 17,000 lines

9. **Systems are modular** - Each system.js file is standalone

10. **Phaser 3 is the game engine** - Use Phaser methods, not plain canvas

---

*Document Version: 41.0*
*Last Updated: December 2024*
*For use with GitHub Copilot or similar AI assistants*

---

# HUNTER SPRITES - COMPLETE REFERENCE

## All 8 Hunters with Full Animations

Each hunter has **6 animation states**:
- `idle` - Standing still
- `walk` - Walking
- `run` - Running
- `jump` - Jumping
- `shoot` - Shooting weapon
- `hurt` - Taking damage

### Hunter Sprite Files

Located in: `/sprites/hunters/`

| Hunter | idle | walk | run | jump | shoot | hurt |
|--------|------|------|-----|------|-------|------|
| Buck | 828×1032 | 1074×1482 | 1236×1518 | 596×1204 | 1280×976 | 720×852 |
| Daisy | 852×1016 | 1428×1536 | 1122×1374 | 748×1072 | 948×804 | 772×836 |
| Bubba | 848×940 | 1194×1452 | 1296×1350 | 744×1156 | 1280×1076 | 788×1072 |
| Clyde | 1012×1032 | 1446×1572 | 1476×1464 | 712×1184 | 1280×1000 | 956×796 |
| Sierra | 700×896 | 1176×1488 | 1128×1206 | 800×876 | 1208×892 | 1280×800 |
| Gunner | 928×1032 | 1224×1776 | 1048×964 | 728×1264 | 1280×932 | 1036×964 |
| Jolene | 816×944 | 1188×1452 | 1410×1434 | 704×848 | 1116×1068 | 1168×784 |
| Tammy | 1124×836 | 1164×1476 | 1098×1404 | 724×748 | 1280×884 | 652×796 |

### Grid Format

These are **grid-format spritesheets**, typically:
- **idle**: 4×4 grid (16 frames)
- **walk**: 3×3 grid (9 frames)
- **run**: 3×3 grid (9 frames)
- **jump**: 2×4 or 2×2 grid (4-8 frames)
- **shoot**: 4×4 or 3×3 grid (9-16 frames)
- **hurt**: 2×2 grid (4 frames)

### Loading Hunters in Phaser 3

```javascript
// In preload():
const anim = HunterSprites.getAnimation('buck', 'idle');
const frameSize = HunterSprites.getFrameSize('buck', 'idle');

this.load.spritesheet('buck_idle', '/sprites/hunters/buck_idle.png', {
    frameWidth: frameSize.frameWidth,   // 828 / 4 = 207
    frameHeight: frameSize.frameHeight  // 1032 / 4 = 258
});

// In create():
this.anims.create({
    key: 'buck_idle',
    frames: this.anims.generateFrameNumbers('buck_idle', { start: 0, end: 15 }),
    frameRate: 8,
    repeat: -1
});

// Using the helper system:
HunterSprites.loadHunter(this, 'buck');  // Loads all buck animations
HunterSprites.createAnimations(this, 'buck');  // Creates all buck anims
```

### Scaling Hunters

Hunter sprites are LARGE (700-1500px). Scale down for gameplay:

```javascript
const hunter = this.add.sprite(x, y, 'buck_idle');
hunter.setScale(0.25);  // Scale to ~200-250px height for gameplay
hunter.play('buck_idle');
```

### Character Descriptions

| Hunter | Description | Scripture |
|--------|-------------|-----------|
| Buck | Country boy with shotgun | "Be strong and courageous" - Joshua 1:9 |
| Daisy | Country girl with rifle | "She is clothed with strength" - Proverbs 31:25 |
| Bubba | Big guy with heavy weapons | "The Lord is my strength" - Psalm 28:7 |
| Clyde | Old timer with classic style | "Gray hair is a crown of glory" - Proverbs 16:31 |
| Sierra | Fitness girl with tactical gear | "I can do all things through Christ" - Philippians 4:13 |
| Gunner | Military vet with assault rifle | "Fight the good fight of faith" - 1 Timothy 6:12 |
| Jolene | Pink cowgirl with sniper rifle | "Charm is deceptive, beauty fleeting" - Proverbs 31:30 |
| Tammy | Waitress with bubble gum attitude | "A joyful heart is good medicine" - Proverbs 17:22 |


---

# NEW IN v41 - ADDITIONAL SYSTEMS

## Break Reminder System (`break-reminder-system.js`)

Promotes healthy gaming with timed break suggestions.

### Features
- First reminder at 20 minutes
- Subsequent reminders every 15 minutes
- Snooze options (5 or 10 minutes)
- Rotating messages about eye care, hydration, stretching
- Scripture encouragement
- Session time tracking

### Usage
```javascript
// Auto-initializes on page load
// Or manually:
BreakReminderSystem.init();

// Pause during cutscenes:
BreakReminderSystem.pause();
BreakReminderSystem.resume();

// Check session time:
const minutes = BreakReminderSystem.getSessionTime();
```

---

## Bird Sprites System (`bird-sprites.js`)

All 41 bird types with configurations.

### Bird Categories
- **Common**: pigeon, crow, seagull, dove
- **Waterfowl**: duck, goose, swan, pelican, heron, crane, etc.
- **Game birds**: pheasant, quail, grouse, turkey, etc.
- **Raptors**: hawk, falcon, eagle, owl, vulture
- **Exotic**: parrot, toucan, flamingo, peacock
- **Mythical**: phoenix, dragon, thunderbird, pterodactyl, dodo

### Bird Properties
```javascript
{
    name: 'Bald Eagle',
    file: 'baldeagle.png',
    points: 100,
    speed: 3.0,
    poopChance: 0.15,
    rarity: 'epic',      // common, uncommon, rare, epic, legendary
    size: 1.4,           // Scale multiplier
    health: 1,           // Hits to kill (bosses have more)
    special: 'swoops'    // Special behavior
}
```

### Usage
```javascript
// Get random bird (weighted by rarity)
const birdId = BirdSprites.getRandomBird();

// Load in Phaser
BirdSprites.loadAll(this);

// Create sprite
const sprite = BirdSprites.createBird(this, 'baldeagle', x, y);
```

---

## Game Over Fixes (`game-over-fixes.js`)

Fixes for skeleton emoji and video embed issues.

### Skeleton Emoji Fix
Automatically replaces 💀 and ☠️ with friendly icons like 🎮, 🌟, 🏆

### Video Embed Fix
- Adds click-to-play overlay
- Reloads iframe to fix post-game-over playback
- Optional YouTube API integration

### Usage
```javascript
// Auto-initializes on page load

// Or show custom game over screen:
GameOverFixes.show(score, highScore);

// Manual fixes:
GameOverFixes.fixSkeletonEmoji();
GameOverFixes.fixVideoEmbeds();
GameOverFixes.addClickToPlay();
```

---

## All 41 Birds

| Bird | Points | Speed | Rarity | Special |
|------|--------|-------|--------|---------|
| Pigeon | 10 | 2.0 | Common | - |
| Crow | 15 | 2.5 | Common | - |
| Seagull | 12 | 2.2 | Common | Messy |
| Dove | 20 | 1.8 | Common | Peaceful |
| Duck | 18 | 2.0 | Common | - |
| Goose | 25 | 2.3 | Uncommon | Aggressive |
| Swan | 40 | 1.5 | Rare | Graceful |
| Pelican | 35 | 1.8 | Uncommon | - |
| Heron | 30 | 1.6 | Uncommon | - |
| Crane | 45 | 1.7 | Rare | - |
| Stork | 50 | 1.5 | Rare | Delivers bonus |
| Pintail | 22 | 2.2 | Uncommon | - |
| Teal | 20 | 2.4 | Uncommon | - |
| Wood Duck | 28 | 2.1 | Uncommon | - |
| Pheasant | 35 | 2.5 | Uncommon | - |
| Quail | 25 | 2.8 | Common | - |
| Grouse | 30 | 2.3 | Uncommon | - |
| Partridge | 28 | 2.4 | Uncommon | - |
| Turkey | 40 | 1.5 | Uncommon | Large |
| Woodcock | 32 | 2.2 | Uncommon | - |
| Snipe | 45 | 3.0 | Rare | Fast |
| Chicken | 8 | 1.2 | Common | - |
| Hawk | 60 | 3.5 | Rare | Swoops |
| Falcon | 75 | 4.0 | Rare | Fast |
| Bald Eagle | 100 | 3.0 | Epic | Large |
| Golden Eagle | 90 | 3.2 | Epic | - |
| Osprey | 70 | 3.3 | Rare | - |
| Owl | 55 | 2.0 | Rare | Nocturnal |
| Vulture | 45 | 2.2 | Uncommon | Large |
| Parrot | 50 | 2.5 | Rare | Colorful |
| Toucan | 55 | 2.3 | Rare | - |
| Flamingo | 60 | 1.8 | Rare | Large |
| Peacock | 70 | 1.5 | Epic | Display |
| Penguin | 40 | 1.0 | Rare | Waddles |
| Magpie | 25 | 2.7 | Uncommon | Steals |
| Phoenix | 500 | 3.5 | Legendary | Respawns (3 HP) |
| Dragon | 750 | 3.0 | Legendary | Fire (5 HP) |
| Thunderbird | 600 | 4.0 | Legendary | Lightning (4 HP) |
| Pterodactyl | 400 | 3.8 | Legendary | Prehistoric (3 HP) |
| Dodo | 200 | 0.8 | Legendary | Extinct (slow) |
| Bat | 30 | 3.0 | Uncommon | Nocturnal |


---

## 🎯 v41 NEW SYSTEMS

### Tranquilizer Mode System
File: `js/systems/tranquilizer-mode.js` + `js/systems/game-patch-v41.js`

**When Active:**
- Park scenes (level 4 - State Park)
- Sniper encounters (any level)

**Features:**
- Birds fall asleep instead of dying
- Unlimited ammo in park
- Same points as regular kills
- Fun "Sorry folks, no bullets here!" message

**Sniper Redemption:**
- +300 points for hitting sniper (tranquilizes him)
- +500 bonus for capturing (tying up) before he wakes
- 8 second capture window
- Hunter dialogue about saving lost souls
- Scripture verses about loving enemies

### Hunter Dialogue System
Characters speak about the sniper being a lost soul:
- "That boy needs Jesus, not bullets!" - Tammy
- "Even enemies deserve mercy. Jesus said so." - Clyde
- "Everyone deserves a second chance!" - Sierra

### Lost Soul Scriptures
```javascript
const scriptures = [
  "For the Son of Man came to seek and to save the lost." - Luke 19:10
  "Love your enemies and pray for those who persecute you." - Matthew 5:44
  "The Lord is not willing that any should perish..." - 2 Peter 3:9
  // ... and more
];
```

### Break Reminder System
File: `js/systems/break-reminder-system.js`

- Triggers every 20 minutes (configurable)
- Pauses game
- Shows health tips + scripture
- Snooze option (5 or 10 min)

### In-Game Tips System
File: `js/systems/game-tips-system.js`

Non-intrusive tips that slide in from corner:
- Gameplay tips
- Wellness reminders
- Humorous messages
- Scripture encouragement

### Gamer Break Buddy (Standalone App)
File: `gamer-break-buddy.html`

- Works with ANY game
- Installable as PWA
- 40+ self-care nudges
- Humor + Scripture
- Tracks breaks and streaks

---

## 📁 Complete File List (v41)

```
birdturds_v41_clean/
├── index.html              # Splash page
├── play.html               # Game page (NEW)
├── about.html              # Story page
├── howtoplay.html          # Tutorial
├── gamer-break-buddy.html  # Standalone app
├── game.php                # Protected JS delivery
├── sprites/
│   ├── hunters/            # 48 files
│   ├── birds/              # 41 files
│   ├── animals/            # 18 files
│   ├── vehicles/           # 6 files
│   ├── bots/               # 8 files
│   ├── demon/              # 10 files
│   ├── enemies/            # 4 files (sniper)
│   ├── npcs/               # 4 files
│   ├── trump/              # 5 files
│   └── items/              # 2 files (umbrella, tranq_dart)
├── sounds/                 # 38 audio files
├── js/
│   ├── game.js             # Main game (17,830 lines)
│   ├── game.min.js         # Minified version
│   ├── PATHS.js            # Asset paths
│   └── systems/            # 37 system files
│       ├── game-patch-v41.js     # NEW - Tranq + Sniper
│       ├── tranquilizer-mode.js  # NEW
│       ├── game-tips-system.js   # NEW
│       ├── break-reminder-system.js
│       ├── game-over-fixes.js
│       ├── hunter-sprites.js
│       ├── bird-sprites.js
│       ├── animal-sprites.js
│       ├── tractor-system.js
│       └── [28 more...]
└── docs/
    ├── COPILOT_COMPLETE_GUIDE.md
    ├── FOR_COPILOT.md
    └── [other docs]
```

---

## 🎮 Integration Steps

1. Include systems AFTER game.js:
```html
<script src="js/game.js"></script>
<script src="js/systems/game-patch-v41.js"></script>
<script src="js/systems/break-reminder-system.js"></script>
<script src="js/systems/game-tips-system.js"></script>
```

2. Initialize systems:
```javascript
// Break reminders auto-init
// Game tips: call GameTipsSystem.init() after game starts
// Tranq mode: auto-activates for park/sniper
```

3. Check tranq mode in shooting logic:
```javascript
if (TranqMode.active) {
  TranqMode.tranquilizeBird(scene, bird);
  return; // Don't do normal kill
}
```

---

*Updated: December 2024 - v41 Complete Package*
