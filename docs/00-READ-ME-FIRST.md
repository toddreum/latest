# 🎮 BIRDTURDS MASTER DOCUMENTATION
## Complete Handoff Package - v37.8.6
## December 5-6, 2025

---

# 📂 TRANSCRIPT REFERENCES

**Current Chat Transcript:**
```
/mnt/transcripts/2025-12-05-07-16-38-v37-8-6-shop-access-germproof.txt
```
(Also included in this package as CURRENT-CHAT-TRANSCRIPT.txt)

**Full Transcript Catalog:**
```
/mnt/transcripts/journal.txt
```

**Recent Important Transcripts:**
- v37.8.6: Shop access, GermProof verification
- v37.8.5: Index character selection
- v37.8.4: Animated sprites showcase
- v37.8.3: All bugs fixed (character sprites, game loading, videos, gold ring)
- v37.8.2: Emoji CSS fix
- v37.8.1: BirdTurd emoji (ChatGPT)
- v37.8.0: Holy Shield, demon enrage, mission nudges, About page

---

# 🚨 CURRENT PROBLEM

**THE GAME WON'T PLAY**

User confirms all sprite files ARE on the server. The game doesn't start when clicking PLAY. Need to debug why.

---

# 🏗️ COMPLETE ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           BIRDTURDS.COM                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                │
│  │ index.html  │────▶│  play.html  │────▶│  game.js    │                │
│  │  Landing    │     │  Game Page  │     │  18,721 ln  │                │
│  │  ~700 ln    │     │  ~3000 ln   │     │  Phaser 3   │                │
│  └─────────────┘     └─────────────┘     └─────────────┘                │
│        │                    │                   │                        │
│        │              Loads from CDN:           │                        │
│        │              - Phaser 3                │                        │
│        │              - Firebase                │                        │
│        │              - Stripe                  │                        │
│        │                    │                   │                        │
│        │              Contains:                 │                        │
│        │              - Store system            │                        │
│        │              - Auth system             │                        │
│        │              - Multiplayer             │                        │
│        │              - Character select        │                        │
│        │                    │                   │                        │
│        ▼                    ▼                   ▼                        │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                        /sprites/ folder                          │    │
│  │  ├── /characters/  (48 files - 8 chars × 6 anims)               │    │
│  │  ├── /birds/       (all bird species PNGs)                      │    │
│  │  ├── /items/       (pickups: turd, ammo, coin, bible, etc)      │    │
│  │  ├── /weapons/     (rifle, shotgun, bow, etc)                   │    │
│  │  ├── /vehicles/    (tractor, plane, helicopter, etc)            │    │
│  │  ├── /landscapes/  (15 background images)                       │    │
│  │  ├── /globalists/  (4 enemy types, swamp level)                 │    │
│  │  ├── /demons/      (flying enemies, White House level)          │    │
│  │  ├── /trump/       (Trump, bodyguards, angels)                  │    │
│  │  ├── /zombies/     (phone zombies & awakened people)            │    │
│  │  ├── /animals/     (ground animals: deer, rabbit, etc)          │    │
│  │  └── /npcs/        (farmer, hiker, fisherman, etc)              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  Backend (PHP):                                                          │
│  ├── create-checkout-session.php  (Stripe payments)                     │
│  └── claim-coins.php              (Coin claiming after purchase)        │
│                                                                          │
│  Firebase:                                                               │
│  ├── Authentication (email/password)                                    │
│  ├── Firestore (user data, leaderboards, content moderation)           │
│  └── Realtime Database (multiplayer rooms)                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 📁 COMPLETE FILE STRUCTURE

```
birdturds.com/
│
├── index.html                    # Landing page (~700 lines)
│   ├── Hero section with PLAY NOW button
│   ├── Character showcase (animated sprites)
│   ├── Birds/vehicles showcase
│   ├── How to play section
│   ├── GermProof banner
│   ├── Download buttons (PWA)
│   └── Footer
│
├── play.html                     # Game page (~3000 lines inline JS)
│   ├── Start screen overlay
│   ├── Game container (Phaser renders here)
│   ├── Shop modal (buy TurdCoins)
│   ├── Store modal (buy upgrades/weapons)
│   ├── Auth modal (login/signup)
│   ├── Character select modal
│   ├── Leaderboard modal
│   ├── Multiplayer modal
│   ├── Below-game message area
│   └── GermProof banner (removable)
│
├── game.js                       # Main game logic (18,721 lines)
│   ├── Constants & config (lines 1-120)
│   ├── Difficulty modes (lines 54-118)
│   ├── Phone zombie types (lines 123-166)
│   ├── Bible scriptures (lines 177-500+)
│   ├── Boss birds config (lines 542-559)
│   ├── Character roster (lines 564-693)
│   ├── Scene sequence / levels (lines 1750-1848)
│   ├── BirdTurdsScene class (line 1900+)
│   │   ├── preload() - line 1906
│   │   ├── create() - line 2186
│   │   └── update() - line 9508
│   ├── Upgrade system (lines 18400-18590)
│   ├── Consumables (lines 18592-18688)
│   └── Game start function (line 18710)
│
├── game_min.js                   # Minified game.js
├── about.html                    # About page with testimony
├── service-worker.js             # PWA caching (v37.8.6)
├── manifest.json                 # PWA manifest
│
├── create-checkout-session.php   # Stripe backend
├── claim-coins.php               # Coin claiming
│
└── sprites/
    ├── characters/
    │   ├── buck_idle.png         (414×516 per frame, 2×2 grid = 4 frames)
    │   ├── buck_walk.png         (358×494 per frame, 3×3 grid = 9 frames)
    │   ├── buck_run.png          (412×506 per frame, 3×3 grid = 9 frames)
    │   ├── buck_shoot.png        (640×488 per frame, 2×2 grid = 4 frames)
    │   ├── buck_jump.png         (298×602 per frame, 2×2 grid = 4 frames)
    │   ├── buck_hurt.png         (360×426 per frame, 2×2 grid = 4 frames)
    │   ├── daisy_idle.png        (426×508)
    │   ├── daisy_walk.png        (476×512)
    │   ├── daisy_run.png         (374×458)
    │   ├── daisy_shoot.png       (474×402)
    │   ├── daisy_jump.png        (374×536)
    │   ├── daisy_hurt.png        (386×418)
    │   ├── clyde_*.png           (6 animations)
    │   ├── bubba_*.png           (6 animations)
    │   ├── gunner_*.png          (6 animations)
    │   ├── jolene_*.png          (6 animations)
    │   ├── sierra_*.png          (6 animations)
    │   └── tammy_*.png           (6 animations)
    │
    ├── trump/
    │   ├── trump_walk.png        (380×400)
    │   ├── trump_run.png         (380×400)
    │   ├── trump_hurt.png        (320×380)
    │   ├── bodyguard_walk.png    (342×528)
    │   ├── bodyguard_shoot.png   (640×512)
    │   ├── angel.png             (470×450)
    │   ├── angel_protect.png     (484×462)
    │   └── americaneagle.png     (450×400)
    │
    ├── globalists/
    │   ├── globalist_1_walk.png      (640×508)
    │   ├── globalist_1_throw.png     (640×374)
    │   ├── globalist_1_arrested.png  (405×704)
    │   ├── globalist_1_syringe_push.png
    │   ├── globalist_2_walk.png      (478×396)
    │   ├── globalist_2_throw.png     (640×640)
    │   ├── globalist_2_arrested.png  (381×908)
    │   ├── globalist_3_walk.png      (462×532)
    │   ├── globalist_3_throw.png     (354×426)
    │   ├── globalist_3_arrested.png  (385×996)
    │   ├── globalist_4_walk.png      (396×480)
    │   ├── globalist_4_throw.png     (322×380)
    │   └── globalist_4_arrested.png  (224×760)
    │
    ├── demons/
    │   ├── demon_fly.png         (494×452)
    │   ├── demon_attack.png      (432×452)
    │   ├── demon_hit.png         (640×590)
    │   └── demon_flee.png        (382×436)
    │
    ├── birds/
    │   ├── sparrow.png
    │   ├── crow.png
    │   ├── pigeon.png
    │   ├── seagull.png
    │   ├── hawk.png
    │   ├── eagle.png
    │   ├── vulture.png
    │   ├── owl.png
    │   ├── pelican.png
    │   ├── heron.png
    │   ├── goose.png
    │   ├── duck.png
    │   ├── flamingo.png
    │   ├── parrot.png
    │   ├── toucan.png
    │   ├── woodpecker.png
    │   ├── bluejay.png
    │   ├── cardinal.png
    │   ├── robin.png
    │   └── ... (more species)
    │
    ├── items/
    │   ├── turd.png
    │   ├── ammo.png
    │   ├── firstaid.png
    │   ├── coin.png
    │   ├── arrow.png
    │   ├── bolt.png
    │   ├── bullet.png
    │   ├── doublepoints.png
    │   ├── shield.png
    │   ├── speedboost.png
    │   ├── hat.png
    │   └── bible_pickup.png
    │
    ├── weapons/
    │   ├── rifle.png
    │   ├── bow.png
    │   ├── crossbow.png
    │   ├── knife.png
    │   ├── shotgun.png
    │   ├── sniper.png
    │   ├── machinegun.png
    │   ├── flamethrower.png
    │   ├── rocketlauncher.png
    │   ├── grenade.png
    │   ├── axe.png
    │   └── lasergun.png
    │
    ├── vehicles/
    │   ├── tractor_green.png
    │   ├── tractor_red.png
    │   ├── plane.png
    │   ├── helicopter.png
    │   └── dirtbike.png
    │
    ├── landscapes/
    │   ├── farm.png
    │   ├── forest.png
    │   ├── lake.png
    │   ├── statepark.png
    │   ├── desert.png
    │   ├── snowmountain.png
    │   ├── beach.png
    │   ├── suburbs.png
    │   ├── town.png
    │   ├── churchcamp.png
    │   ├── swamp.png
    │   ├── whitehouse.png
    │   ├── christmas.png
    │   ├── clouds.png
    │   └── grass.png
    │
    ├── zombies/
    │   ├── zombie_teen_boy.png
    │   ├── zombie_teen_girl.png
    │   ├── zombie_adult_man.png
    │   ├── zombie_adult_woman.png
    │   ├── person_teen_boy.png
    │   ├── person_teen_girl.png
    │   ├── person_adult_man.png
    │   └── person_adult_woman.png
    │
    ├── animals/
    │   ├── deer.png
    │   ├── rabbit.png
    │   ├── squirrel.png
    │   ├── fox.png
    │   ├── bear.png
    │   ├── wolf.png
    │   ├── cougar.png
    │   ├── moose.png
    │   ├── elk.png
    │   ├── dog.png
    │   ├── cat.png
    │   └── horse.png
    │
    ├── npcs/
    │   ├── farmer.png
    │   ├── hiker.png
    │   ├── fisherman.png
    │   ├── sniper_npc.png
    │   └── ranger.png
    │
    ├── icons/
    │   ├── birdturd.png          (emoji icon)
    │   └── birdturd-64.png       (64px emoji)
    │
    └── godbless_splash.png       (376×390 spritesheet)
```

---

# 🚀 GAME INITIALIZATION FLOW

```
USER VISITS index.html
         │
         ▼
┌─────────────────────────────────────────┐
│ Sees landing page with:                 │
│ - PLAY NOW button                       │
│ - BROWSE SHOP button (NEW v37.8.6)      │
│ - Character showcase                    │
│ - How to play                           │
└─────────────────────────────────────────┘
         │
    Clicks PLAY NOW
         │
         ▼
┌─────────────────────────────────────────┐
│ Navigates to play.html                  │
│                                         │
│ play.html loads (in order):             │
│ 1. Phaser 3 from CDN                    │
│ 2. Firebase SDKs from CDN               │
│ 3. Stripe SDK from CDN                  │
│ 4. Inline JS (~3000 lines)              │
│ 5. game.js (18,721 lines)               │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ User sees START SCREEN                  │
│ - Character preview                     │
│ - Difficulty selection                  │
│ - Settings                              │
│ - START GAME button                     │
└─────────────────────────────────────────┘
         │
    Clicks START GAME
         │
         ▼
┌─────────────────────────────────────────┐
│ hideStartScreen() called (play.html)    │
│ - Hides #start-screen div               │
│ - Shows #game-container div             │
│ - Calls window.startBirdTurdsGame()     │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ startBirdTurdsGame() (game.js:18710)    │
│ - Creates new Phaser.Game(config)       │
│ - Config specifies BirdTurdsScene       │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Phaser calls preload() (game.js:1906)   │
│ - Shows loading screen                  │
│ - Loads ~200+ sprites                   │
│ - Shows progress bar                    │
│ - Takes 2-10 seconds                    │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Phaser calls create() (game.js:2186)    │
│ - Sets up physics world                 │
│ - Creates hunter (player sprite)        │
│ - Creates groups (birds, turds, etc)    │
│ - Creates background                    │
│ - Sets up input controls                │
│ - Creates HUD                           │
│ - Shows "God Bless America" splash      │
│ - Initializes AI bots                   │
│ - Sets up collisions                    │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Phaser calls update() (game.js:9508)    │
│ - Runs 60 times per second              │
│ - Handles player input                  │
│ - Updates all game objects              │
│ - Spawns birds                          │
│ - Checks collisions                     │
│ - Updates HUD                           │
│ - Checks level progression              │
└─────────────────────────────────────────┘
```

---

# 🎮 COMPLETE GAME MECHANICS

## Player Controls
```
WASD / Arrow Keys = Move
W / Up = Jump
S / Down = Crouch
A / Left = Move left
D / Right = Move right
SHIFT = Run (faster movement)
SPACE / Left Click = Shoot
R = Reload
E = Interact (pick up items, ride animals)
Q = Quick Shop (open in-game store)
A = Angel Menu (spiritual armory)
B = Fire Bible weapon
ESC = Pause game
```

## Physics Constants
```javascript
GAME_WIDTH = 1280;
GAME_HEIGHT = 640;
WORLD_WIDTH = 20000;      // Scrolling world
HUNTER_SCALE = 0.24;      // Player size
BIRD_SCALE = 0.12;        // Bird size
TURD_SCALE = 0.04;        // Turd size
ANIMAL_SCALE = 0.08;      // Ground animal size
this.groundY = 580;       // Ground level (GAME_HEIGHT - 60)
```

## Health System
```javascript
btState.health = 100;       // General health (0-100)
btState.maxHealth = 100;
btState.turdMeter = 0;      // Turd-O-Meter (0-100)
btState.maxTurdMeter = 100;
// Player dies when health = 0 OR turdMeter = 100
```

## Difficulty Modes
```javascript
DIFFICULTY_MODES = {
  beginner: {
    playerHealth: 150,
    turdDamage: 5,
    demonDamage: 8,
    enemySpeed: 0.7,
    startingAmmo: 120,
    birdsToAdvance: 20,
    respawnTime: 5
  },
  intermediate: {
    playerHealth: 100,
    turdDamage: 8,
    demonDamage: 15,
    enemySpeed: 1.0,
    startingAmmo: 90,
    birdsToAdvance: 25,
    respawnTime: 3
  },
  advanced: {
    playerHealth: 75,
    turdDamage: 12,
    demonDamage: 25,
    enemySpeed: 1.4,
    startingAmmo: 60,
    birdsToAdvance: 35,
    respawnTime: 0  // Permadeath!
  }
}
```

## 8 Playable Characters
```javascript
CHARACTER_ROSTER = {
  buck:   { weapon: 'Lever-Action Rifle', style: 'Western Cowboy' },
  daisy:  { weapon: 'Shotgun', style: 'Country Cowgirl' },
  clyde:  { weapon: 'AR-15', style: 'The Patriot' },
  bubba:  { weapon: 'Double-Barrel Shotgun', style: 'The Redneck' },
  gunner: { weapon: 'M16 Tactical', style: 'The Veteran' },
  jolene: { weapon: 'Pink Rifle', style: 'The Belle' },
  sierra: { weapon: 'Tactical Crossbow', style: 'CrossFit Queen' },
  tammy:  { weapon: 'Sawed-Off Shotgun', style: 'The Waitress' }
}

// Each character has 6 animations:
// idle (4 frames), walk (9 frames), run (9 frames),
// shoot (4 frames), jump (4 frames), hurt (4 frames)
```

## 12 Levels
```javascript
sceneSequence = [
  { key: 'christmas/farm', birdsToKill: 15 },  // Level 1
  { key: 'forest', birdsToKill: 20 },          // Level 2
  { key: 'lake', birdsToKill: 25 },            // Level 3
  { key: 'statepark', birdsToKill: 0 },        // Level 4 (NO HUNTING)
  { key: 'desert', birdsToKill: 30 },          // Level 5
  { key: 'snowmountain', birdsToKill: 35 },    // Level 6
  { key: 'beach', birdsToKill: 40 },           // Level 7
  { key: 'suburbs', birdsToKill: 45 },         // Level 8
  { key: 'town', birdsToKill: 50 },            // Level 9
  { key: 'churchcamp', birdsToKill: 30 },      // Level 10
  { key: 'swamp', birdsToKill: 60 },           // Level 11 (Globalists!)
  { key: 'whitehouse', birdsToKill: 100 }      // Level 12 (Final Boss!)
]
```

## Enemy Types

### Birds
```javascript
speciesConfig = {
  sparrow:  { points: 10, speed: 120, hp: 1 },
  crow:     { points: 15, speed: 100, hp: 2 },
  pigeon:   { points: 12, speed: 80, hp: 1 },
  seagull:  { points: 15, speed: 110, hp: 2 },
  hawk:     { points: 25, speed: 140, hp: 3 },
  eagle:    { points: 30, speed: 130, hp: 4 },
  vulture:  { points: 20, speed: 90, hp: 3 },
  owl:      { points: 18, speed: 70, hp: 2 },
  // ... more species
}
```

### Boss Birds
```javascript
ALL_BOSS_BIRDS = [
  { name: 'Thunderbird', health: 150, ability: 'lightning' },
  { name: 'Phoenix', health: 200, ability: 'fire' },
  { name: 'Dragon', health: 300, ability: 'breath' },
  { name: 'Pterodactyl', health: 180, ability: 'dive' },
  { name: 'Giant Eagle', health: 120, ability: 'swoop' },
  { name: 'Vulture King', health: 160, ability: 'poison' },
  { name: 'Storm Crow', health: 100, ability: 'storm' },
  { name: 'Frost Owl', health: 140, ability: 'freeze' }
]
```

### Globalists (Swamp Level)
- 4 enemy types that walk on ground
- Throw syringes/items at player
- Can be "arrested" (defeated)

### Demons (White House Level)
- Flying enemies
- Shoot "lies" (projectiles)
- Defeated by Bible weapon (5x damage)

### Phone Zombies (NPCs to save)
- People staring at phones
- Give them Bibles to wake them up
- Become helpers when awakened

## Weapons & Items

### Starting Equipment
```javascript
btState.weaponName = 'Semi-Auto Rifle';
btState.ammo = 90;
btState.ammoMax = 130;
```

### Store Weapons
```javascript
// Handguns
handgun, revolver, deagle

// Shotguns
shotgun_410, shotgun_20, shotgun_12, pump_action, auto_shotgun

// Heavy Weapons
machinegun, minigun, sniper, barrett, bazooka, rocketlauncher

// Special
bow, crossbow, bible_weapon
```

### Consumables
```javascript
grenade, molotov, flashbang
health_pack, full_heal
shield_temp, shield_long
jetpack, jetpack_xl
sturdy_hat, sturdy_hat_xl
```

### Pickups (spawn on ground)
```javascript
ammo       // Refill ammunition
firstaid   // Restore health
coin       // Currency
bible      // Give to phone zombies
hat        // Blocks turds
shield     // Invincibility
speedboost // Faster movement
doublepoints // 2x score
```

---

# 💾 SAVE SYSTEM

## localStorage Keys
```javascript
// Player Data
birdturds_coins           // Total coins
birdturds_owned           // Array: ["fire_rate_2", "shotgun"]
birdturds_character       // Selected character: "buck"
birdturds_difficulty      // "beginner" | "intermediate" | "advanced"
birdturds_skin            // Equipped skin
birdturds_highscore       // Best score

// Settings
birdturds_musicChoice     // "adventure" | "worship" | "country"
birdturds_musicVolume     // 0.0 - 1.0
birdturds_sfxVolume       // 0.0 - 1.0
birdturds_sound           // SFX enabled
birdturds_muteScriptures
birdturds_muteJokes
birdturds_noCommentary    // Pro mode (1.5x bonus)

// Purchases
birdturds_ads_removed     // true if bought ad removal
```

## Firebase Collections
```javascript
// Firestore
users/{uid}              // User profile, coins, owned items
leaderboard              // High scores
moderation_queue         // Pending user content
approved_content         // Approved testimonies/blogs

// Realtime Database
rooms/{roomCode}         // Multiplayer rooms
```

---

# 🔍 DEBUGGING CHECKLIST

## Step 1: Browser Console (F12 → Console)
```
Look for:
- Red errors (TypeError, ReferenceError)
- 404 errors (missing files)
- Phaser initialization errors
- Firebase errors
```

## Step 2: Network Tab (F12 → Network)
```
Check:
- game.js loading? (should be 200 OK)
- Phaser CDN loading?
- Firebase CDN loading?
- Sprite files loading?
```

## Step 3: Verify Functions Exist
```javascript
// In browser console:
typeof Phaser                     // "function"
typeof window.startBirdTurdsGame  // "function"
typeof hideStartScreen            // "function"
typeof gameInstance               // "object" after starting
```

## Step 4: Manual Game Start
```javascript
// In browser console on play.html:
window.startBirdTurdsGame();
```

## Step 5: Check Console Logs
```
Should see (in order):
1. "🎮 BirdTurds ready - waiting for PLAY button..."
2. "🎮 Starting BirdTurds game..."
3. "BirdTurds v17.0: create() started"
4. "BirdTurds: groundY = 580"
5. "BirdTurds: Selected character: buck"
6. "BirdTurds: groups created"
7. "BirdTurds: background created"
8. "BirdTurds: hunter created at X, Y"
9. "BirdTurds: input created"
```

## Common Issues
```
PROBLEM: Black screen after PLAY
CHECK: Is Phaser loaded? Is game-container visible?

PROBLEM: Player doesn't appear
CHECK: Are character sprites loaded? Check Network tab.

PROBLEM: Can't move or shoot
CHECK: Is createInput() running? JS errors?

PROBLEM: No birds spawning
CHECK: Is update() running? Add console.log.

PROBLEM: Immediate game over
CHECK: Is health set correctly?
```

---

# 📦 WHAT'S IN THIS PACKAGE

```
full-handoff/
├── 00-READ-ME-FIRST.md           ← This master document
├── CURRENT-CHAT-TRANSCRIPT.txt   ← Full chat transcript
├── BIRDTURDS-WIREFRAME.md        ← Technical wireframe
├── index.html                    ← Landing page (v37.8.6)
├── play.html                     ← Game page
├── game.js                       ← Main game logic (18,721 lines)
├── game_min.js                   ← Minified version
├── service-worker.js             ← PWA caching (v37.8.6)
├── about.html                    ← About page
└── manifest.json                 ← PWA manifest
```

---

# 💬 WHAT TO TELL NEW CLAUDE

Copy/paste this to start a new chat:

```
I'm continuing work on BirdTurds game (Phaser 3 browser game).

PROBLEM: Game won't play when clicking START

TRANSCRIPT: /mnt/transcripts/2025-12-05-07-16-38-v37-8-6-shop-access-germproof.txt

WHAT'S DONE:
✅ Shop button added to index page
✅ GermProof banners verified present
✅ Service worker updated to v37.8.6
✅ Full wireframe documentation created
✅ User confirms ALL sprites ARE on server

KEY FILES:
- play.html: Game page (~3000 lines inline JS)
- game.js: Main Phaser game (18,721 lines)

KEY FUNCTIONS (game.js):
- Line 18710: startBirdTurdsGame()
- Line 1906: preload()
- Line 2186: create()
- Line 9508: update()

KEY FUNCTION (play.html):
- hideStartScreen(): Hides menu, calls startBirdTurdsGame()

NEED: Debug why game won't start. Check browser console errors.

I'm uploading the handoff package with all files and documentation.
```

---

*Document prepared by Claude - December 5-6, 2025*
*Version: v37.8.6*
