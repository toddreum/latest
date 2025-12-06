# BIRDTURDS v41 - COMPLETE SITE DOCUMENTATION
## For Copilot Debugging Reference

---

## FILE STRUCTURE

```
birdturds_v41_clean/
├── index.html              # Main landing - hunter selection, character showcase
├── play.html               # Game page - Phaser 3 container
├── about.html              # About Us page
├── howtoplay.html          # How to play guide  
├── gamer-break-buddy.html  # Standalone wellness app
├── dude.html               # Dude.com landing page
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline
├── game.php                # PHP wrapper
│
├── js/
│   ├── game.js             # Main game (17,830 lines)
│   ├── game.min.js         # Minified version
│   ├── PATHS.js            # Asset paths
│   └── systems/            # 41 system modules
│       ├── comic-bubble-voices.js    # 300+ jokes (35KB)
│       ├── game-patch-v41.js         # Tranq + sniper (23KB)
│       ├── game-over-fixes.js        # NO SKELETON FIX (10KB)
│       ├── sprite-border-helper.js   # White outlines
│       ├── tranquilizer-mode.js      # Park mode
│       └── [36 more system files]
│
├── sprites/
│   ├── hunters/            # 8 hunters × 6 animations = 48 PNGs
│   ├── birds/              # 41 bird PNGs
│   ├── animals/            # 18 farm animal PNGs
│   ├── vehicles/           # 6 tractor PNGs
│   ├── bots/               # 8 bot hunter PNGs
│   ├── demon/              # 10 demon PNGs
│   ├── enemies/            # 4 sniper PNGs
│   ├── npcs/               # 4 farmer/child PNGs
│   ├── trump/              # 5 Trump/bodyguard PNGs
│   └── items/              # Umbrella, tranq dart
│
├── sounds/                 # 38 MP3 files
└── docs/                   # Documentation
```

---

## PAGE DETAILS

### index.html
**Purpose:** Main landing, character selection, game showcase
**Key Elements:**
- Logo from: https://birdturds.com/logo.png
- Running chicken loading animation (uses sprites/animals/chicken_strip.png)
- Hunter selection grid (8 hunters with actual sprites)
- Bird species grid (12 shown, actual sprites)
- Farm animals grid (6 animals, actual sprites)
- Enemies & Allies grid (sniper, tractors, bots, Trump, farmer)
- Game rules with sprite icons
- Features grid with sprite icons
- PWA install button

**JavaScript Functions:**
- `renderHunters()` - Renders 8 hunter cards with sprites
- `renderBirds()` - Renders bird cards with sprites
- `renderAnimals()` - Renders farm animal cards
- `renderEnemies()` - Renders enemy/ally cards
- `renderRules()` - Renders game rules with sprite icons
- `renderFeatures()` - Renders feature cards
- `selectHunter(id)` - Saves to localStorage: birdturds_character
- `updateLoading()` - Animates loading bar
- `installPWA()` - Triggers PWA install

### play.html
**Purpose:** Contains Phaser 3 game canvas
**Key Elements:**
- Full viewport game container (no black space)
- Running chicken loading with actual chicken sprite
- Break reminder popup (20 min intervals)
- Service worker registration
- Proper mobile viewport handling

**JavaScript Functions:**
- `setVH()` - Fixes mobile viewport height
- `updateLoad()` - Loading animation
- `showBreak()` - Shows break reminder
- `takeBreak()` / `snoozeBreak()` - Break controls

### dude.html
**Purpose:** Dude.com Christian media landing page
**Key Elements:**
- Logo from: https://birdturds.com/logo.png
- Hero with actual sprite badges
- Game showcase with ALL 8 hunter sprites
- Game features with sprite icons
- Mission section
- Values section with sprite icons
- Contact form (submits to support@dude.com via FormSubmit)

**Contact Form:**
- Action: https://formsubmit.co/support@dude.com
- Fields: name, email, subject (dropdown), message
- Redirect after submit: #thankyou

---

## SPRITE PATHS

### Hunters (sprites/hunters/)
```
buck_idle.png, buck_walk.png, buck_run.png, buck_jump.png, buck_shoot.png, buck_hurt.png
daisy_idle.png, daisy_walk.png, daisy_run.png, daisy_jump.png, daisy_shoot.png, daisy_hurt.png
clyde_idle.png, clyde_walk.png, clyde_run.png, clyde_jump.png, clyde_shoot.png, clyde_hurt.png
bubba_idle.png, bubba_walk.png, bubba_run.png, bubba_jump.png, bubba_shoot.png, bubba_hurt.png
gunner_idle.png, gunner_walk.png, gunner_run.png, gunner_jump.png, gunner_shoot.png, gunner_hurt.png
jolene_idle.png, jolene_walk.png, jolene_run.png, jolene_jump.png, jolene_shoot.png, jolene_hurt.png
sierra_idle.png, sierra_walk.png, sierra_run.png, sierra_jump.png, sierra_shoot.png, sierra_hurt.png
tammy_idle.png, tammy_walk.png, tammy_run.png, tammy_jump.png, tammy_shoot.png, tammy_hurt.png
```

### Birds (sprites/birds/)
```
duck.png, goose.png, turkey.png, pheasant.png, crow.png, seagull.png,
pigeon.png, owl.png, hawk.png, vulture.png, pelican.png, heron.png,
crane.png, stork.png, flamingo.png, penguin.png, toucan.png, parrot.png,
magpie.png, grouse.png, quail.png, partridge.png, woodcock.png, snipe.png,
pintail.png, woodduck.png, teal.png, osprey.png, falcon.png, goldeneagle.png,
bat.png, chicken.png, dodo.png, swan.png, peacock.png, pterodactyl.png,
phoenix.png, thunderbird.png, dragon.png, baldeagle.png, dove.png
```

### Animals (sprites/animals/)
```
cow_strip.png, horse_strip.png, pig_strip.png, sheep_strip.png,
chicken_strip.png, goat_strip.png, dog_strip.png, cat_strip.png, rooster_strip.png
(plus _right.png versions)
```

### Vehicles (sprites/vehicles/)
```
tractor_good_strip.png, tractor_good_strip_left.png, tractor_good_new.png
tractor_bad_strip.png, tractor_bad_strip_left.png, tractor_bad_new.png
```

### Enemies (sprites/enemies/)
```
sniper_strip.png, sniper_strip_right.png
sniper_original_1.png, sniper_original_2.png
```

### Bots (sprites/bots/)
```
bot1_strip.png, bot1_strip_left.png
bot2_strip.png, bot2_strip_left.png
bot3_strip.png, bot3_strip_left.png
bot4_strip.png, bot4_strip_left.png
```

### Trump (sprites/trump/)
```
trump_walk.png, trump_run.png, trump_hurt.png
bodyguard_walk.png, bodyguard_shoot.png
```

### NPCs (sprites/npcs/)
```
farmer_strip.png, farmer_strip_right.png
child_strip.png, child_strip_right.png
```

### Demon (sprites/demon/)
```
demon_fly.png, demon_attack.png, demon_hit.png, demon_flee.png
demon_strip.png, demon_strip_left.png
(plus _sized.png versions)
```

---

## SYSTEM FILES

### comic-bubble-voices.js
**Purpose:** 300+ contextual jokes, quotes, voice lines
**Key Functions:**
- `getDadJoke()` - 150+ dad jokes
- `getChristianJoke()` - 50+ Christian jokes
- `getChristianQuote()` - 36 scriptures/quotes
- `getBirdJoke()` - 25 bird jokes
- `getHuntingJoke()` - 15 hunting jokes
- `getWellnessReminder()` - 25 wellness tips
- `getSceneGreeting(sceneKey)` - Scene-specific lines
- `getHunterLine(hunterId, lineType)` - Hunter dialogue
- `getKillLine(isStreak, isBoss)` - Kill celebrations
- `getSniperLine(phase)` - Sniper encounter lines

### game-over-fixes.js
**Purpose:** ELIMINATES SKELETON EMOJI, fixes video
**Key Functions:**
- `createGameOverScreen(score, level)` - HTML with SPRITES (no emojis)
- `createVideoEmbed(url, w, h)` - Working YouTube iframe
- `show(score, level)` - Display game over
- `hide()` - Remove overlay
- `restart()` - Reload game
- `goHome()` - Return to index
- `killSkeleton()` - Replaces any 💀 with 🎯
- `patchGameFunctions()` - Intercepts Phaser text
- `init()` - Auto-initializes, watches DOM

**SKELETON FIX:**
- Runs `killSkeleton()` on init
- MutationObserver watches for new content
- Interval runs every 1 second
- Patches Phaser.GameObjects.Text.prototype.setText

### game-patch-v41.js
**Purpose:** Tranquilizer mode, sniper redemption
**Key Functions:**
- `TranqMode.shouldBeActive(scene)` - Check if tranq needed
- `TranqMode.activateForPark(scene)` - Enable park mode
- `TranqMode.tranquilizeBird(scene, bird)` - Bird sleep
- `TranqMode.tranquilizeSniper(scene, sniper)` - Sniper down
- `TranqMode.captureSniper(scene, sniper)` - Capture bonus
- `TranqMode.showRedemptionMessage(scene)` - Scripture display

---

## PWA CONFIGURATION

### manifest.json
```json
{
  "name": "BIRDTURDS v41",
  "short_name": "BIRDTURDS",
  "start_url": "/index.html",
  "display": "standalone",
  "orientation": "landscape",
  "background_color": "#1a1a2e",
  "theme_color": "#1a1a2e",
  "icons": [{"src": "https://birdturds.com/logo.png", "sizes": "512x512"}]
}
```

### Service Worker (sw.js)
- Caches core HTML, JS files
- Cache-first strategy
- Enables offline play after initial load

---

## LOCALSTORAGE KEYS

- `birdturds_character` - Selected hunter ID (buck, daisy, etc.)

---

## EXTERNAL DEPENDENCIES

- Phaser 3.60.0: `https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js`
- FormSubmit: Contact form backend for dude.html
- Logo: `https://birdturds.com/logo.png`

---

## KNOWN ISSUES FIXED

1. **Skeleton Emoji (💀)**
   - REMOVED from game.js (4 instances)
   - REMOVED from game.min.js
   - game-over-fixes.js actively hunts and replaces any that appear
   - MutationObserver + setInterval backup

2. **Video Embed**
   - `GameOverFixes.createVideoEmbed(url)` converts watch URLs to embed
   - Adds proper iframe attributes

3. **Mobile Black Space**
   - CSS: `min-height: 100vh; min-height: -webkit-fill-available`
   - JS: `setVH()` function calculates actual viewport height
   - Flexbox layout: `flex: 1` on game container

4. **Hunter Selection**
   - Uses localStorage to persist selection
   - Renders actual sprites, not emojis

---

## STATISTICS

| Category | Count |
|----------|-------|
| HTML Pages | 6 |
| JS System Files | 41 |
| Sprites | 146 |
| Sounds | 38 |
| Documentation | 9 |
| **Total Files** | **244** |
| **Package Size** | **~51 MB** |

### Content Counts
- Dad Jokes: 150+
- Christian Jokes: 50+
- Scripture Quotes: 36
- Hunter Voice Lines: 64
- Scene Greetings: 45+
- Wellness Tips: 25
- **Total Voice Content: 370+**

---

## TESTING CHECKLIST

1. [ ] Logo loads from birdturds.com/logo.png
2. [ ] Hunter selection shows actual sprites
3. [ ] Birds grid shows actual sprites
4. [ ] Enemies grid shows actual sprites (sniper, tractors, bots, Trump)
5. [ ] No emojis used as character representations
6. [ ] Game over screen shows sprite icon (not skeleton)
7. [ ] PWA install button appears
8. [ ] Contact form on dude.html submits
9. [ ] No black space on mobile
10. [ ] Running chicken uses chicken_strip.png sprite

---

*Last Updated: December 2024 - Version 41*
