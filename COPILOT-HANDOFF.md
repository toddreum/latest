# BIRDTURDS - COPILOT HANDOFF DOCUMENT
## Complete Technical Documentation & Bug Summary

---

## 🔧 COPILOT FIXES IMPLEMENTED (v43-FIX19 → FIX20)

Based on Copilot's review, the following improvements were added:

### FIX19 Implementations:
1. Enhanced Hunter Safety Check - NaN/Infinity detection, body re-enable, flag validation
2. Improved spawnVehicle() - setImmovable, debug tags, destroy handler
3. Robust Stripe Loader - 3 retries with exponential backoff
4. Bot Initialization - delayed 500ms, spawn near player, debug logging

### FIX20 Implementations (Copilot Round 2):
1. **Fixed `this` reference in destroy handlers** - Store scene reference in local variable
2. **Hunter pre-grab/pre-hit state storage** - Capture full state before vehicle hit or boss grab
3. **Improved hunter release** - Uses stored state for more accurate restoration
4. **Scene shutdown cleanup handler** - Kills tweens, clears bots, removes timers
5. **Stripe server redirect fallback** - If stripe.js blocked, use session.url redirect

---

## 🎮 GAME OVERVIEW

**BirdTurds** is a browser-based arcade shooter game built with **Phaser 3**. Players control a hunter character, shooting birds that fly overhead while avoiding bird droppings ("turds"). The game has Christian/patriotic themes with Bible scriptures, wellness reminders, and a "Protect Trump at the White House" level.

### Core Gameplay Loop:
1. Birds fly across screen left-to-right or right-to-left
2. Player shoots birds for points and coins
3. Birds drop turds - if hit, "Turd Meter" fills up
4. Turd Meter at 100% = Game Over
5. Collect coins, ammo, med kits on ground
6. Boss birds appear periodically (pterodactyl, phoenix, etc.)
7. Tractors drive across - good ones clean turds, bad ones damage player
8. AI bots play alongside in "Solo + Bots" mode

---

## 🏗️ TECHNICAL STACK

| Component | Technology |
|-----------|------------|
| Game Engine | Phaser 3.60+ |
| Frontend | Vanilla HTML/CSS/JavaScript |
| Backend | PHP (minimal - Stripe webhooks, API endpoints) |
| Database | Firebase Realtime Database |
| Auth | Firebase Authentication |
| Payments | Stripe Checkout |
| Hosting | Standard web hosting (Apache/Nginx) |

---

## 📁 FILE STRUCTURE

```
birdturds.com/
├── index.html          # Homepage with hunter selection, shop, login
├── play.html           # Game page (loads game.js)
├── js/
│   └── game.js         # Main Phaser game (17,000+ lines)
├── game.js             # Copy of js/game.js (legacy support)
├── sprites/
│   ├── characters/     # Hunter sprites (buck_idle.png, daisy_idle.png, etc.)
│   ├── birds/          # Bird sprites (pigeon.png, crow.png, pterodactyl.png)
│   ├── vehicles/       # Tractor sprites (tractor_green.png, tractor_red.png)
│   ├── items/          # Coins, ammo, med kits
│   └── backgrounds/    # Scene backgrounds (farm, city, whitehouse, etc.)
├── sounds/             # Audio files (gunshots, bird sounds, music)
├── api/
│   ├── get-stripe-key.php    # Returns Stripe publishable key
│   └── validate-username.php # Username validation
├── create-checkout-session.php  # Stripe checkout creation
├── stripe-webhook.php           # Stripe payment webhooks
├── private/                     # OUTSIDE public_html!
│   └── config.php              # API keys (Stripe, Firebase, ElevenLabs)
└── manifest.json       # PWA manifest
```

---

## 🎯 KEY FILES TO SHARE WITH COPILOT

### MUST SHARE:
1. **`js/game.js`** - The entire game logic (17k lines)
2. **`index.html`** - Homepage with hunter cards, shop, modals
3. **`play.html`** - Game container page

### OPTIONAL (if needed):
4. **`api/get-stripe-key.php`** - Stripe key endpoint
5. **`create-checkout-session.php`** - Stripe checkout
6. **`private/config.php`** - Config structure (redact actual keys!)

---

## 🖼️ WIREFRAME - INDEX PAGE

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]  FREE Browser Game!   [Login] [UPGRADES & SHOP] [ABOUT] │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ SCORE: 0  ❤️ HEALTH ████  💩 TURD-O-METER  AMMO: 90/90 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              🎬 YouTube Video Embed                       │   │
│  │                   (Game Trailer)                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│     🎮 Shoot birds • Drain the Swamp • Wake the Sleepers!       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🙏 MORE THAN JUST A GAME - Entertainment + Biblical Truth │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│           🇺🇸 PROTECT TRUMP AT THE WHITE HOUSE! 🇺🇸              │
│                                                                  │
│                    🤠 CHOOSE YOUR HUNTER:                        │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                    │
│  │  BUCK  │ │ DAISY  │ │ CLYDE  │ │ JOLENE │   ← Row 1 (M/F/M/F)│
│  │  [img] │ │  [img] │ │  [img] │ │  [img] │                    │
│  │ Rifle  │ │Shotgun │ │Semi-Aut│ │ Sniper │                    │
│  └────────┘ └────────┘ └────────┘ └────────┘                    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                    │
│  │ GUNNER │ │ SIERRA │ │ BUBBA  │ │ TAMMY  │   ← Row 2 (M/F/M/F)│
│  │  [img] │ │  [img] │ │  [img] │ │  [img] │                    │
│  │   AK   │ │ AR-15  │ │  Pump  │ │ Pistol │                    │
│  └────────┘ └────────┘ └────────┘ └────────┘                    │
│                    ✓ Selected: BUCK                              │
│                                                                  │
│                   SELECT DIFFICULTY:                             │
│        [🟢 BEGINNER] [🟡 INTERMEDIATE] [🔴 ADVANCED]             │
│                                                                  │
│            [▶ SOLO + BOTS]    [🌐 MULTIPLAYER]                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🛡️ GermProof - Protection & Healing for Gamers!  [SHOP→] │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [Social Share Sidebar: f X W T @ P R 🔗]                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🏆 GAMER COMPETITIONS - WIN REAL PRIZES!                  │   │
│  │    Bible Competition | Cash Tournament | Merch Giveaway   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🖼️ WIREFRAME - PLAY PAGE (GAME)

```
┌─────────────────────────────────────────────────────────────────┐
│ [🎮 CONTROLS]                               [💰 0] [SHOP TAB]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│     🦅          🐦    ☁️        🦆                    🦉        │
│           🐧                           🦜                        │
│                        ☁️                      ☁️                │
│                                                                  │
│   ☁️                🦖 PTERODACTYL BOSS                         │
│                         (health bar)                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    BACKGROUND IMAGE                       │   │
│  │              (farm / city / whitehouse / etc)             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│      💩  💩           💰  💰                    📦               │
│  ═══════════════════════════════════════════════════════════    │
│  GROUND LEVEL                                                    │
│           🤠 HUNTER        🚜 TRACTOR       🤖 BOT              │
│           (player)         (animated)       (AI)                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              💩 TURD METER [████████░░░░] 65%           │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘

CONTROLS:
- WASD / Arrow Keys = Move
- Mouse = Aim
- Click / Space = Shoot
- W / Up = Jump
- F / K = Knife attack
- R = Reload
- TAB = Shop
- Mobile: Touch joystick + tap to shoot
```

---

## 🐛 BUGS WE'VE BEEN FIXING (v43 Session)

### 1. HUNTER CARDS ON INDEX PAGE ❌→✅
**Problem:** Only showed a small single Buck preview, not all 8 hunters
**Solution:** Added 8-card grid with:
- Individual `{hunter}_idle.png` images (NOT spritesheets)
- 4x2 grid layout (Male/Female alternating)
- Click to select, green highlight on selected
- Mobile responsive scaling
**Files:** `index.html` (lines ~270-340)

### 2. BIRDS FLYING BACKWARDS ❌→✅
**Problem:** All sprites were flipped wrong direction
**Root Cause:** Inconsistent flip logic - some used `setFlipX(direction > 0)`, others `setFlipX(direction < 0)`
**Solution:** Standardized ALL flip logic:
- **Sprites face LEFT by default**
- `setFlipX(fromLeft)` on spawn (flip when coming from left = going right)
- `setFlipX(direction > 0)` on update (flip when moving right)
**Files:** `js/game.js` - search for `setFlipX`

### 3. TRACTORS CRASHING GAME ❌→✅
**Problem:** Animated tractor spritesheets caused game to freeze/crash
**Solution:** Simplified to static sprites only:
- Use `tractor_good` (green) and `tractor_bad` (red) static images
- Scale: 0.3
- Removed complex spritesheet animation logic
**Files:** `js/game.js` - `spawnVehicle()` function (~line 12590)

### 4. HUNTER VANISHING ❌→✅
**Problem:** Hunter sprite disappeared after being hit by tractor or grabbed by boss bird
**Solution:** Triple safety net:
1. Per-frame safety check in `update()` - resets position/alpha/scale if invalid
2. `triggerVehicleHit()` - stores references, validates at each step
3. Bird carry release - always resets `hunterBeingCarried` flag
**Files:** `js/game.js` - lines ~9443-9470 (safety check), ~16355-16400 (vehicle hit)

### 5. STRIPE "LIBRARY NOT FOUND" ❌→⚠️
**Problem:** Shop shows "Error: Stripe library not found"
**Possible Causes:**
- Ad blocker blocking js.stripe.com
- Script not loaded before `openShop()` called
- Network issue
**Current Solution:** Added dynamic script reload with retry
**Files:** `index.html` - `openShop()` function (~line 2851)
**Config:** Stripe key loaded from `/api/get-stripe-key.php` which reads from `/home/birdturds/private/config.php`

### 6. SOCIAL SHARE ICONS WRONG ❌→✅
**Problem:** Emoji icons showing as wrong/missing characters
**Solution:** Changed to text letters (f, X, W, T, @, P, R) instead of emojis
**Files:** `index.html` - search for `social-share-bar`

### 7. GERMPROOF LOGO BROKEN ❌→✅
**Problem:** Logo image URL returns 404
**Solution:** Changed to text-based `🛡️ GermProof`
**Files:** `index.html` - search for `germproof`

### 8. BOTS NOT SHOWING ❓
**Status:** Code exists and should work
**Check:** `initBots(2)` called in `create()` at line 2356
**Files:** `js/game.js` - `initBots()` at ~17332, `updateBots()` at ~17380

---

## 🎮 GAME FEATURES LIST

### Characters (8 Playable Hunters)
| ID | Name | Weapon | Gender |
|----|------|--------|--------|
| buck | BUCK | Lever-Action Rifle | M |
| daisy | DAISY | Shotgun | F |
| clyde | CLYDE | Semi-Auto Rifle | M |
| jolene | JOLENE | Sniper Rifle | F |
| gunner | GUNNER | AK Assault Rifle | M |
| sierra | SIERRA | AR-15 Carbine | F |
| bubba | BUBBA | Pump Shotgun | M |
| tammy | TAMMY | Semi-Auto Pistol | F |

### Bird Species (~20+)
- Common: pigeon, crow, sparrow, robin, bluejay
- Medium: duck, goose, pheasant, turkey, owl
- Exotic: flamingo, toucan, pelican, parrot
- Boss: pterodactyl, phoenix, thunderbird, dragon

### Scenes/Levels
1. **Christmas Farm** - Snowy barn, Christmas tree
2. **City** - Urban buildings
3. **Desert** - Cacti, sand
4. **Forest** - Trees, nature
5. **Beach** - Ocean, palm trees
6. **White House** - Final level, protect Trump

### Vehicles
- **Good Tractor (green)** - Scoops up turds, helps player
- **Bad Tractor (red)** - Damages player on collision
- Helicopters, planes (background/enemy)

### Collectibles
- **Coins** - Currency for shop
- **Ammo boxes** - Replenish bullets
- **Med kits** - Reduce turd meter

### Shop System
- **TurdCoins** - Buy with real money via Stripe
- **Upgrades** - Damage, fire rate, armor
- **Weapons** - Different guns
- **Skins** - Character cosmetics
- **Boss Birds** - Summon bosses for bonus points

### Special Features
- **Phone Zombies** - NPCs staring at phones, wake them up
- **Bible Scriptures** - 66 verses throughout game
- **Break Reminders** - 20-min wellness popups
- **Difficulty Levels** - Beginner, Intermediate, Advanced
- **AI Bots** - Play alongside in Solo mode

---

## 🔧 CONFIG.PHP STRUCTURE

```php
// /home/birdturds/private/config.php

// Stripe
define('STRIPE_PUBLISHABLE_KEY', 'pk_live_...');
define('STRIPE_SECRET_KEY', 'sk_live_...');
define('STRIPE_WEBHOOK_SECRET', 'whsec_...');

// Firebase
define('FIREBASE_API_KEY', '...');
define('FIREBASE_PROJECT_ID', 'birdturds-a9e0b');
define('FIREBASE_DATABASE_URL', 'https://birdturds-a9e0b-default-rtdb.firebaseio.com');

// Site
define('SITE_URL', 'https://birdturds.com');

// Coin Packs
$COIN_PACKS = [
    'starter' => ['coins' => 1000, 'price' => 99],
    'bucket' => ['coins' => 5500, 'price' => 499],
    // etc.
];
```

---

## 🎯 SPRITE CONVENTIONS

### Orientation
- **ALL sprites face LEFT by default**
- Flip horizontally when moving RIGHT

### Hunter Sprites (per character)
- `{name}_idle.png` - Standing still
- `{name}_walk.png` - Walking animation strip
- `{name}_run.png` - Running animation strip
- `{name}_jump.png` - Jumping
- `{name}_shoot.png` - Shooting
- `{name}_hurt.png` - Taking damage

### Bird Sprites
- Single PNG per species
- Size varies by species (cfg.size property)
- Scale multiplier: `cfg.size * 2`

### Tractor Sprites
- `tractor_green.png` - Good tractor (768x768)
- `tractor_red.png` - Bad tractor (768x768)
- Scale: 0.3 for display

---

## 📱 MOBILE CONSIDERATIONS

### Controls
- Virtual joystick (bottom-left)
- Tap anywhere to shoot
- Double-tap to jump

### Layout
- Game fills 100vh
- HTML HUD hidden on mobile (<900px)
- Internal Phaser HUD used instead

### Performance
- `window.IS_LOW_POWER_DEVICE` flag
- Reduced particle effects
- Lower frame rate option

---

## 🔍 DEBUGGING TIPS

### Console Commands (in browser dev tools)
```javascript
// Check game instance
window.gameInstance

// Check btState (game state)
btState

// Force spawn boss
gameInstance.scene.scenes[0].spawnBoss()

// Check bots
gameInstance.scene.scenes[0].bots

// Check hunter position
gameInstance.scene.scenes[0].hunter
```

### Common Issues
1. **Blank game screen** - Check console for asset loading errors
2. **Sprites not showing** - Verify file paths in Network tab
3. **Click not working** - Check for overlapping invisible elements
4. **Audio not playing** - Browser autoplay policy, needs user interaction first

---

## ✅ WHAT'S WORKING (as of v43-FIX18)

- [x] Hunter character selection (8 cards on index)
- [x] Bird spawning and movement
- [x] Shooting mechanics
- [x] Turd dropping and collision
- [x] Score/coins system
- [x] Tractors (static sprites)
- [x] Scene backgrounds
- [x] Difficulty selection
- [x] GermProof banner
- [x] Social share icons
- [x] Flip directions corrected

## ❓ NEEDS VERIFICATION

- [ ] Bots actually appearing in game
- [ ] Stripe checkout completing
- [ ] Hunter not vanishing (edge cases)
- [ ] Mobile layout
- [ ] All bird species loading

---

## 📞 QUESTIONS FOR COPILOT

1. Can you review the `spawnVehicle()` function and verify tractors won't crash?
2. The `setFlipX()` logic - is it consistently applied everywhere?
3. Hunter safety checks in `update()` - are there any edge cases missed?
4. Stripe loading issue - is there a better way to handle script load failures?
5. Bot initialization - why might bots not be appearing?

---

## 📦 FILES TO UPLOAD TO COPILOT

1. `js/game.js` (17k lines - the main file)
2. `index.html` (4k lines - homepage)
3. `play.html` (500 lines - game page)
4. This `COPILOT-HANDOFF.md` document

---

*Document created: December 6, 2025*
*Game Version: v43-FIX18*
*Author: Claude (Anthropic)*
