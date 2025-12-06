# 🎮 BIRDTURDS - COMPLETE WIREFRAME & MECHANICS GUIDE
## For ChatGPT / Copilot / Any AI Debugger

---

# 📋 TABLE OF CONTENTS
1. [Problem Statement](#problem-statement)
2. [Architecture Overview](#architecture-overview)
3. [File Structure](#file-structure)
4. [Game Initialization Flow](#game-initialization-flow)
5. [Core Game Mechanics](#core-game-mechanics)
6. [Character System](#character-system)
7. [Level Progression](#level-progression)
8. [Enemy Types](#enemy-types)
9. [Weapons & Items](#weapons--items)
10. [UI/HUD Elements](#uihud-elements)
11. [Audio System](#audio-system)
12. [Save System](#save-system)
13. [Multiplayer System](#multiplayer-system)
14. [Debugging Checklist](#debugging-checklist)

---

# 🚨 PROBLEM STATEMENT

**User says:** "Game won't play"

**What we need to figure out:**
- Does the game fail to START (black screen, no response)?
- Does the game START but freeze immediately?
- Does the game START but player can't move/shoot?
- Are there console errors in browser DevTools (F12)?
- Does clicking "PLAY NOW" do anything?

**The user confirms all sprite files EXIST on the server** - they are NOT missing.

---

# 🏗️ ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                   │
├─────────────────────────────────────────────────────────────────┤
│  index.html (Landing Page)                                       │
│    └─→ Click "PLAY NOW" → navigate to play.html                  │
├─────────────────────────────────────────────────────────────────┤
│  play.html (Game Page)                                           │
│    ├─→ Loads Phaser 3 from CDN                                   │
│    ├─→ Loads Firebase SDK from CDN                               │
│    ├─→ Loads Stripe SDK from CDN                                 │
│    ├─→ Contains inline JavaScript (~3000 lines)                  │
│    │     └─ Store system, auth, moderation, multiplayer          │
│    └─→ Loads game.js (main game logic)                           │
├─────────────────────────────────────────────────────────────────┤
│  game.js (Phaser 3 Game Engine) - 18,721 lines                   │
│    ├─→ BirdTurdsScene class extends Phaser.Scene                 │
│    ├─→ preload() - loads all sprites                             │
│    ├─→ create() - initializes game objects                       │
│    ├─→ update() - runs every frame (game loop)                   │
│    └─→ window.startBirdTurdsGame() - entry point                 │
├─────────────────────────────────────────────────────────────────┤
│  /sprites/ folder (on server)                                    │
│    ├─→ /characters/ (8 characters × 6 animations each)           │
│    ├─→ /birds/ (all bird species)                                │
│    ├─→ /items/ (pickups, turds, bullets)                         │
│    ├─→ /weapons/ (gun sprites)                                   │
│    ├─→ /vehicles/ (tractors, planes, etc)                        │
│    ├─→ /landscapes/ (background images)                          │
│    ├─→ /globalists/ (enemy type for Swamp level)                 │
│    ├─→ /demons/ (enemy type for White House level)               │
│    ├─→ /trump/ (Trump, bodyguards, angels)                       │
│    └─→ /zombies/ (phone zombies & awakened people)               │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📁 FILE STRUCTURE

```
birdturds.com/
├── index.html              # Landing page with PLAY button
├── play.html               # Game page (loads Phaser + game.js)
├── game.js                 # Main game logic (18,721 lines)
├── game_min.js             # Minified version of game.js
├── about.html              # About page
├── service-worker.js       # PWA caching
├── manifest.json           # PWA manifest
├── create-checkout-session.php  # Stripe payment backend
├── claim-coins.php         # Coin claiming after purchase
└── sprites/
    ├── characters/
    │   ├── buck_idle.png, buck_walk.png, buck_run.png, etc.
    │   ├── daisy_idle.png, daisy_walk.png, daisy_run.png, etc.
    │   └── (6 animations × 8 characters = 48 files)
    ├── birds/
    │   ├── sparrow.png, crow.png, pigeon.png, seagull.png
    │   ├── hawk.png, eagle.png, vulture.png, owl.png
    │   └── (various bird species)
    ├── items/
    │   ├── turd.png, bullet.png, ammo.png
    │   ├── coin.png, firstaid.png, bible_pickup.png
    │   └── (all pickup items)
    ├── weapons/
    │   ├── rifle.png, shotgun.png, bow.png
    │   └── (all weapon sprites)
    ├── vehicles/
    │   ├── tractor_green.png, plane.png, helicopter.png
    │   └── (all vehicles)
    ├── landscapes/
    │   ├── farm.png, forest.png, lake.png, desert.png
    │   ├── snowmountain.png, beach.png, suburbs.png
    │   ├── town.png, swamp.png, whitehouse.png
    │   └── christmas.png, churchcamp.png
    ├── globalists/
    │   └── globalist_1-4 walk/throw/arrested sprites
    ├── demons/
    │   └── demon_fly.png, demon_attack.png, etc.
    ├── trump/
    │   └── trump_walk.png, bodyguard sprites, angel sprites
    └── zombies/
        └── zombie/person sprites for phone zombies
```

---

# 🚀 GAME INITIALIZATION FLOW

```
USER CLICKS "PLAY NOW" on index.html
         │
         ▼
┌─────────────────────────────────────────┐
│ 1. Navigate to play.html                │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 2. play.html loads CDN scripts:         │
│    - Phaser 3 (game engine)             │
│    - Firebase (auth, database)          │
│    - Stripe (payments)                  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 3. play.html inline JS runs:            │
│    - Sets up store system               │
│    - Initializes Firebase               │
│    - Sets up auth listeners             │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 4. play.html loads game.js              │
│    - Defines BirdTurdsScene class       │
│    - Defines game config                │
│    - Defines window.startBirdTurdsGame  │
│    - Does NOT auto-start game           │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 5. User sees START SCREEN               │
│    (Character select, difficulty, etc)  │
└─────────────────────────────────────────┘
         │
         ▼
USER CLICKS "START GAME" / "PLAY"
         │
         ▼
┌─────────────────────────────────────────┐
│ 6. hideStartScreen() called             │
│    - Hides start-screen div             │
│    - Shows game-container div           │
│    - Calls window.startBirdTurdsGame()  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 7. startBirdTurdsGame() runs:           │
│    gameInstance = new Phaser.Game(cfg)  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 8. Phaser creates BirdTurdsScene        │
│    - Calls preload()                    │
│    - Loads all sprites (~200+ files)    │
│    - Shows loading progress bar         │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 9. After preload, calls create()        │
│    - Sets up physics world              │
│    - Creates hunter (player)            │
│    - Creates groups for birds, turds    │
│    - Sets up input controls             │
│    - Creates HUD                        │
│    - Shows "God Bless America" splash   │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ 10. Game loop starts: update() runs     │
│     - 60 times per second               │
│     - Handles input                     │
│     - Updates all game objects          │
│     - Spawns birds                      │
│     - Checks collisions                 │
└─────────────────────────────────────────┘
```

---

# 🎮 CORE GAME MECHANICS

## Player Movement
```javascript
// Controls (from createInput function)
WASD or Arrow Keys = Move
W/Up = Jump
S/Down = Crouch
A/Left = Move left
D/Right = Move right
SHIFT = Run (faster movement)
SPACE or Click = Shoot
R = Reload
E = Interact (pick up items, ride animals)
Q = Quick Shop
A = Angel Menu (spiritual armory)
B = Fire Bible weapon
ESC = Pause
```

## Physics Constants
```javascript
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 640;
const WORLD_WIDTH = 20000;  // Scrolling world
const HUNTER_SCALE = 0.24;
const BIRD_SCALE = 0.12;
const TURD_SCALE = 0.04;
this.groundY = GAME_HEIGHT - 60;  // Ground level = 580
```

## Damage System
```javascript
// Player has TWO health systems:
btState.health = 100;      // General health (damaged by enemies)
btState.turdMeter = 0;     // "Turd-O-Meter" (0-100, turds only)
// When turdMeter hits 100 = death

// Damage values (Intermediate difficulty):
turdDamage: 8,      // Per turd hit
demonDamage: 15,    // Per demon attack
```

## Scoring
```javascript
// Points per kill vary by bird species
sparrow: 10 points
crow: 15 points
pigeon: 12 points
hawk: 25 points
eagle: 30 points
vulture: 20 points
// Boss birds: 100-500 points

// Multipliers:
btState.doublePoints = true;  // 2x score
btState.triplePoints = true;  // 3x score
btState.commentaryBonus = 1.5; // No commentary mode bonus
```

---

# 👤 CHARACTER SYSTEM

## 8 Playable Characters
```javascript
CHARACTER_ROSTER = {
  buck:    { name: 'Buck',    weapon: 'Lever-Action Rifle' },
  daisy:   { name: 'Daisy',   weapon: 'Shotgun' },
  clyde:   { name: 'Clyde',   weapon: 'AR-15' },
  bubba:   { name: 'Bubba',   weapon: 'Double-Barrel Shotgun' },
  gunner:  { name: 'Gunner',  weapon: 'M16 Tactical' },
  jolene:  { name: 'Jolene',  weapon: 'Pink Rifle' },
  sierra:  { name: 'Sierra',  weapon: 'Tactical Crossbow' },
  tammy:   { name: 'Tammy',   weapon: 'Sawed-Off Shotgun' }
}
```

## Animation States
```javascript
// Each character has 6 animation spritesheets:
_idle.png   (4 frames, 2×2 grid)
_walk.png   (9 frames, 3×3 grid)
_run.png    (9 frames, 3×3 grid)
_shoot.png  (4 frames, 2×2 grid)
_jump.png   (4 frames, 2×2 grid)
_hurt.png   (4 frames, 2×2 grid)
```

## Character Selection Storage
```javascript
// Saved to localStorage
localStorage.getItem('birdturds_character');  // e.g., "buck"
```

---

# 🗺️ LEVEL PROGRESSION

## 12 Levels Total
```
Level 1:  Farm (or Christmas in December)
Level 2:  Forest
Level 3:  Lake
Level 4:  State Park (NO HUNTING - just walk through)
Level 5:  Desert
Level 6:  Frozen Peaks (Snow Mountain)
Level 7:  Coastal Beach
Level 8:  Quiet Suburbs
Level 9:  Western Town
Level 10: Church Camp
Level 11: THE SWAMP (Globalist enemies)
Level 12: THE WHITE HOUSE (Final boss - Trump appears)
```

## Level Advancement
```javascript
// Each level has birdsToKill requirement:
farm: 15, forest: 20, lake: 25, statepark: 0 (just walk),
desert: 30, snowmountain: 35, beach: 40, suburbs: 45,
town: 50, churchcamp: 30, swamp: 60, whitehouse: 100

// When player kills enough birds:
// 1. Sky gets clearer (skyClarity increases)
// 2. Level complete message
// 3. Transition to next level
// 4. Background changes
// 5. New bird types spawn
```

---

# 👾 ENEMY TYPES

## Birds (Primary Enemies)
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
  pelican:  { points: 22, speed: 85, hp: 3 },
  // ... more species
}

// Birds fly across screen, poop turds that fall down
// Player shoots birds, avoids turds
```

## Globalists (Swamp Level - Level 11)
```javascript
// 4 types of globalist enemies
// Walk on ground, throw syringes/items at player
// Can be "arrested" (defeated animation)
globalist_1, globalist_2, globalist_3, globalist_4
```

## Demons (White House Level - Level 12)
```javascript
// Flying demon enemies
// Attack patterns: fly, attack, hit, flee
// Shoot "lies" (projectiles) at player
// Defeated by Bible weapon (5x damage) or regular guns
```

## Boss Birds
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

## Phone Zombies (NPCs to save)
```javascript
// People staring at phones - NOT enemies
// Give them Bibles to "wake them up"
// They become helpers after awakening
PHONE_ZOMBIE_TYPES = [
  'teen_boy', 'teen_girl', 'adult_man', 'adult_woman'
]
```

---

# 🔫 WEAPONS & ITEMS

## Starting Weapon
```javascript
btState.weaponName = 'Semi-Auto Rifle';
btState.ammo = 90;
btState.ammoMax = 130;
```

## Purchasable Weapons (Store)
```javascript
// Handguns
handgun, revolver, deagle

// Shotguns
shotgun_410, shotgun_20, shotgun_12, pump_action, auto_shotgun

// Heavy
machinegun, minigun, sniper, barrett, bazooka, rocketlauncher

// Special
bow, crossbow, bible_weapon (shoots scripture!)
```

## Pickup Items
```javascript
// Spawn on ground, player walks over to collect
ammo:       Refill ammunition
firstaid:   Restore health
coin:       Currency
bible:      Give to phone zombies
hat:        Blocks turds temporarily
shield:     Invincibility
speedboost: Faster movement
doublepoints: 2x score
```

## Consumables (from Store)
```javascript
grenade, molotov, flashbang
health_pack, full_heal
shield_temp, shield_long
jetpack, jetpack_xl
```

---

# 📊 UI/HUD ELEMENTS

## In-Game HUD
```
┌────────────────────────────────────────────────────────────┐
│ ❤️ HEALTH: 100/100    💩 TURD-O-METER: [========  ] 0%    │
│ 🎯 SCORE: 12,450      🔫 AMMO: 87/130                      │
│ 🪙 COINS: 350         📖 BIBLES: 3                         │
│ 📍 LEVEL 5: Desert    🐦 KILLS: 45/50                      │
└────────────────────────────────────────────────────────────┘
```

## HTML Elements (in play.html)
```html
<div id="start-screen">     <!-- Initial screen with PLAY button -->
<div id="game-container">   <!-- Phaser game renders here -->
<div id="shop-modal">       <!-- Store popup -->
<div id="store-modal">      <!-- Upgrade store popup -->
<div id="auth-modal">       <!-- Login/signup popup -->
<div id="below-game-messages"> <!-- Scripture/joke display -->
```

---

# 🔊 AUDIO SYSTEM

```javascript
// Music options (localStorage)
birdturds_musicChoice: 'adventure' | 'worship' | 'country' | 'peaceful'
birdturds_musicVolume: 0.0 - 1.0
birdturds_sfxVolume: 0.0 - 1.0
birdturds_muteScriptures: true/false
birdturds_muteJokes: true/false
```

---

# 💾 SAVE SYSTEM

## localStorage Keys
```javascript
// Player data
birdturds_coins:        Total coins
birdturds_owned:        Array of owned items ["fire_rate_2", "shotgun"]
birdturds_character:    Selected character ID
birdturds_difficulty:   "beginner" | "intermediate" | "advanced"
birdturds_skin:         Equipped skin
birdturds_highscore:    Best score

// Settings
birdturds_musicChoice
birdturds_musicVolume
birdturds_sfxVolume
birdturds_sound:        SFX enabled
birdturds_muteScriptures
birdturds_muteJokes
birdturds_noCommentary  // Pro mode

// Auth
birdturds_ads_removed:  true if purchased ad removal
```

## Firebase (for logged-in users)
```javascript
// Firestore collections:
users/{uid}:          User profile, coins, owned items
leaderboard:          High scores
moderation_queue:     User-submitted content pending review
approved_content:     Approved testimonies/blog posts
```

---

# 🌐 MULTIPLAYER SYSTEM

```javascript
// Firebase Realtime Database
rooms/{roomCode}: {
  code: "ABC123",
  host: "player_abc123",
  status: "waiting" | "playing" | "ended",
  players: {
    player_abc123: { name, character, score, x, y, health }
  }
}

// Functions:
createMultiplayerRoom()
joinMultiplayerRoom(code)
quickMatch()
```

---

# 🔍 DEBUGGING CHECKLIST

## 1. Check Browser Console (F12 → Console)
```
Look for:
- Red errors (TypeError, ReferenceError)
- 404 errors (missing files)
- Phaser initialization errors
- Firebase errors
```

## 2. Check Network Tab (F12 → Network)
```
Look for:
- Failed requests (red)
- game.js loading?
- Phaser CDN loading?
- Sprite files loading?
```

## 3. Key Functions to Verify
```javascript
// In browser console, check if these exist:
typeof Phaser                    // Should be "function"
typeof window.startBirdTurdsGame // Should be "function"
typeof gameInstance              // After starting: "object"
```

## 4. Manual Game Start Test
```javascript
// In browser console on play.html:
window.startBirdTurdsGame();
// Should create game instance
```

## 5. Check DOM Elements
```javascript
document.getElementById('game-container')  // Should exist
document.getElementById('start-screen')    // Should exist
```

## 6. Common Issues
```
ISSUE: Black screen after clicking PLAY
CHECK: Is game-container div visible? Is Phaser loaded?

ISSUE: Game starts but player doesn't appear
CHECK: Are character sprites loaded? Check Network tab.

ISSUE: Can't move or shoot
CHECK: Is createInput() running? Check for JS errors.

ISSUE: No birds spawning
CHECK: Is update() running? Add console.log to update().

ISSUE: Immediate game over
CHECK: Is health being set correctly? Check btState.health.
```

---

# 📞 SPECIFIC THINGS TO CHECK

1. **Does `hideStartScreen()` get called?**
   - Add `console.log('hideStartScreen called')` at start of function

2. **Does `startBirdTurdsGame()` get called?**
   - Add `console.log('startBirdTurdsGame called')` at start

3. **Does Phaser `preload()` complete?**
   - Look for "Loading complete" in console

4. **Does Phaser `create()` complete?**
   - Look for "BirdTurds v17.0: create() started" in console

5. **Is the hunter (player) created?**
   - Look for "BirdTurds: hunter created at X, Y" in console

6. **Is update() being called?**
   - Add temporary: `console.log('update running')` to update()

---

# 📋 SUMMARY FOR COPILOT

**The game is a Phaser 3 browser game. To debug "won't play":**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Click PLAY NOW
4. Look for errors
5. Share exact error messages

**Key entry points:**
- `hideStartScreen()` → hides menu, shows game
- `window.startBirdTurdsGame()` → creates Phaser.Game
- `preload()` → loads assets
- `create()` → initializes game objects
- `update()` → runs every frame

**The code is 18,721 lines in game.js. Key line numbers:**
- Line 1906: `preload()` starts
- Line 2186: `create()` starts
- Line 9508: `update()` starts
- Line 18710: `startBirdTurdsGame()` defined

---

*Document prepared by Claude (Anthropic) - December 5, 2025*
