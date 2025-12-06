# BIRDTURDS v41 - COMPLETE COPILOT HANDOFF
## Everything That Needs To Be Done

---

# 🚨 CRITICAL ISSUES TO FIX

## 1. WEBP FILES MISLABELED AS PNG
Many sprite files are actually WebP format but saved with .png extension. The game can't load them properly.

**Action Required:**
- Scan ALL files in `/sprites/` folder
- Find any that are WebP format (use `file` command)
- Convert them to real PNG format
- Or update game.js to load the .webp versions

**Known WebP files:**
- `worship-spritesheet.png` (actually WebP)
- `tractor_good_new.png` (was WebP, may need re-check)
- `tractor_bad_new.png` (was WebP, may need re-check)
- Likely MANY more throughout sprites folder

**Command to find all WebP files:**
```bash
find /sprites -name "*.png" -exec file {} \; | grep -i "webp"
```

---

## 2. INDEX.HTML - COMPLETE REDESIGN NEEDED

The user wants index.html to show ALL game content with ACTUAL SPRITES (not emojis).

### Required Sections:

#### A. LOGO & HEADER
- Logo: `https://birdturds.com/logo.png`
- Tagline: "Hunt Birds - Dodge Turds - Grow in Faith!"
- Version badge: "v41 - WAKE UP AMERICA!"

#### B. PLAY NOW BUTTON
- Big red button linking to play.html
- Install PWA button (shows when available)

#### C. HUNTER SELECTION (8 hunters)
Show grid of ALL 8 hunters with their ACTUAL sprites:
| Hunter | Sprite Path | Weapon |
|--------|-------------|--------|
| Buck | `sprites/hunters/buck_idle.png` | Lever-Action Rifle |
| Daisy | `sprites/hunters/daisy_idle.png` | Shotgun |
| Clyde | `sprites/hunters/clyde_idle.png` | AR-15 |
| Bubba | `sprites/hunters/bubba_idle.png` | Double-Barrel |
| Gunner | `sprites/hunters/gunner_idle.png` | M16 Tactical |
| Jolene | `sprites/hunters/jolene_idle.png` | Pink Rifle |
| Sierra | `sprites/hunters/sierra_idle.png` | Tactical Crossbow |
| Tammy | `sprites/hunters/tammy_idle.png` | Sawed-Off |

- Clicking a hunter selects them (saves to localStorage)
- Selected hunter shows gold border + checkmark
- Each card shows: sprite, name, description, weapon

#### D. CHRISTIAN TESTIMONY VIDEOS (Scrolling Section)
Horizontal scrolling carousel of YouTube embeds:
- ONLY anti-woke, pro-Jesus testimonies
- NO new age or woke content

Videos to include:
1. `https://www.youtube.com/embed/nQ77wvjen7U` - "Former Gay News Broadcaster Finds Jesus"
2. `https://www.youtube.com/embed/cJc0McjBo3o` - "Lesbian Finds Jesus"
3. `https://www.youtube.com/embed/DovxoehVxBg` - "Former Satanist Saved"
4. `https://www.youtube.com/embed/H_a46WJ1viA` - "Ex-Muslim Encounters Jesus"
5. `https://www.youtube.com/embed/2YP4tVq_hu0` - "Drug Dealer Saved"
6. `https://www.youtube.com/embed/oc6NKa5Jw3k` - "Gang Member Finds Christ"

#### E. BIRDS GRID (Show 12 of 41)
Display bird sprites with point values:
| Bird | Sprite | Points |
|------|--------|--------|
| Duck | `sprites/birds/duck.png` | +20 |
| Goose | `sprites/birds/goose.png` | +30 |
| Turkey | `sprites/birds/turkey.png` | +40 |
| Crow | `sprites/birds/crow.png` | +15 |
| Owl | `sprites/birds/owl.png` | +35 |
| Phoenix | `sprites/birds/phoenix.png` | +200 |
| Dragon | `sprites/birds/dragon.png` | +500 |
| Eagle | `sprites/birds/baldeagle.png` | -50 PROTECTED |
| Dove | `sprites/birds/dove.png` | -50 PROTECTED |
| (etc) | | |

#### F. FARM ANIMALS GRID
| Animal | Sprite | Bonus |
|--------|--------|-------|
| Cow | `sprites/animals/cow_strip.png` | Bounce +50 |
| Horse | `sprites/animals/horse_strip.png` | Bounce +75 |
| Pig | `sprites/animals/pig_strip.png` | Bounce +30 |
| Sheep | `sprites/animals/sheep_strip.png` | Bounce +40 |
| Chicken | `sprites/animals/chicken_strip.png` | Friend! |
| Goat | `sprites/animals/goat_strip.png` | Bounce +35 |

#### G. ENEMIES & ALLIES GRID
| Character | Sprite | Type | Description |
|-----------|--------|------|-------------|
| Sniper | `sprites/enemies/sniper_strip.png` | Enemy | Capture +800 |
| Bad Tractor | `sprites/vehicles/tractor_bad_new.png` | Enemy | AVOID! |
| Bot Hunter 1 | `sprites/bots/bot1_strip.png` | Ally | AI Competition |
| Bot Hunter 2 | `sprites/bots/bot2_strip.png` | Ally | AI Competition |
| Good Tractor | `sprites/vehicles/tractor_good_new.png` | Ally | Ride it! |
| Farmer | `sprites/npcs/farmer_strip.png` | Ally | Friendly |
| Trump | `sprites/trump/trump_walk.png` | VIP | PROTECT! |
| Bodyguard | `sprites/trump/bodyguard_walk.png` | Ally | Secret Service |

#### H. GAME RULES
8 rules with sprite icons (NOT emojis):
1. Shoot birds for points (+10 to +500)
2. Protected species (eagles, doves) = -50 points
3. Bounce on farm animals for height
4. Green tractors = ride in bucket
5. Red tractors = RUN!
6. Capture snipers for +800 points
7. Compete with bot hunters
8. Final level: Protect Trump!

#### I. FEATURES GRID
6 feature cards with sprites:
- 41 Bird Species
- 8 Unique Hunters
- 13 Epic Levels
- Final Boss Level
- Sniper Redemption
- Wellness Reminders

#### J. LOADING SCREEN
- Running chicken animation at top of progress bar
- Chicken uses `sprites/animals/chicken_strip.png`
- Progress bar fills left to right
- Chicken position syncs with progress
- At 100%: CHICKEN FREAKOUT animation (rapid shake/spin)
- 8 rotating tips displayed below bar

### ALL SPRITES MUST HAVE WHITE OUTLINE
CSS for white border on all sprite images:
```css
.sprite-box img {
    filter: 
        drop-shadow(2px 0 0 white)
        drop-shadow(-2px 0 0 white)
        drop-shadow(0 2px 0 white)
        drop-shadow(0 -2px 0 white)
        drop-shadow(2px 2px 0 white)
        drop-shadow(-2px -2px 0 white)
        drop-shadow(2px -2px 0 white)
        drop-shadow(-2px 2px 0 white);
}
```

---

## 3. CHARACTER SIZE SCALING IN GAME.JS

Characters are different sizes - some too small compared to hunter.

### Required Scales (relative to HUNTER_SCALE = 0.24):
| Character | Current | Should Be |
|-----------|---------|-----------|
| Hunter | 0.24 | 0.24 (baseline) |
| Trump | varies | 0.24 |
| Bodyguard | varies | 0.22 |
| Farmer | 0.10 | 0.22 |
| Child NPC | 0.10 | 0.18 |
| Animals (cow, sheep, etc) | 0.12 | 0.20 |
| Tractors | 0.45 | 0.18 (new art is larger) |

### Code locations to fix:
- `spawnAnimal()` - around line 13348
- `spawnNPC()` - around line 13373
- `spawnTrump()` - around line 13398
- `spawnVehicle()` - around line 12408

---

## 4. WHITE OUTLINE/GLOW ON ALL GAME SPRITES

All characters in the GAME (not just index.html) need white outline.

### Use Phaser 3.60+ preFX glow:
```javascript
// After creating any sprite:
if (sprite.preFX) {
    sprite.preFX.addGlow(0xFFFFFF, 4, 0, false, 0.1, 24);
}
```

### Apply to:
- Hunter (in createHunter function)
- All birds (in spawnBird, spawnBossBird)
- All animals (in spawnAnimal)
- All NPCs (in spawnNPC)
- Trump and Bodyguards (in spawnTrump)
- Tractors (in spawnVehicle)
- Snipers (in sniper system)
- Bot hunters (in bot system)

---

## 5. NEW TRACTOR ART - NOT LOADING

The NEW Ludo tractor art files exist but game loads OLD files.

### Files that exist:
- `sprites/vehicles/tractor_good_new.png` (NEW - should use this)
- `sprites/vehicles/tractor_bad_new.png` (NEW - should use this)
- `sprites/vehicles/tractor_good_strip.png` (OLD)
- `sprites/vehicles/tractor_bad_strip.png` (OLD)

### Fix in game.js preload:
```javascript
// CHANGE FROM:
img('tractor_good', '/sprites/vehicles/tractor_good_strip.png');
img('tractor_bad', '/sprites/vehicles/tractor_bad_strip.png');

// CHANGE TO:
img('tractor_good', '/sprites/vehicles/tractor_good_new.png');
img('tractor_bad', '/sprites/vehicles/tractor_bad_new.png');
```

### WARNING: The _new.png files might be WebP format!
Check with `file` command and convert if needed.

---

## 6. SKULL EMOJI (💀) ON GAME OVER SCREEN

The game over screen shows a skull emoji. User wants it GONE.

### Find and replace in game.js:
- Search for: `💀`
- Replace with: `🎯` or remove entirely

### Also check:
- `showGameOverScreen()` function around line 17278
- Any death-related messages

---

## 7. HUNTER SHAKING/JITTERING

The hunter character shakes too much when walking.

### Fix in `animateHunter()` function:
```javascript
// CHANGE FROM:
const bobAmount = this.isCrouching ? 1 : 2;

// CHANGE TO:
const bobAmount = this.isCrouching ? 0.5 : 1;
```

---

## 8. BOT HUNTER SYSTEM - NEEDS INTEGRATION

Bot system is coded in `js/systems/game-integration-v41.js` but NOT connected to game.js.

### Add these 3 calls to game.js:

#### In GameScene create() method:
```javascript
if (window.GameIntegration) {
    GameIntegration.initScene(this, sceneName);
}
```

#### In GameScene update(time, delta) method:
```javascript
if (window.GameIntegration) {
    GameIntegration.updateScene(this, delta, this.player, this.birds);
}
```

#### In shooting/hit detection:
```javascript
if (window.GameIntegration) {
    const hit = GameIntegration.checkHits(this, x, y);
    if (hit) this.addScore(hit.points);
}
```

---

## 9. SNIPER ENEMY SYSTEM - NEEDS INTEGRATION

Same as bots - coded but not connected.

### Sniper behavior:
- Appears after 10 seconds
- Has 3 states: hiding, peeking, shooting
- Takes 2 hits to capture
- Capture gives +800 points
- Shows redemption message + testimony video on capture

---

## 10. CACHE BUSTING

Add version numbers to all script tags in play.html:

```html
<script src="js/game.js?v=41.3"></script>
<script src="js/systems/game-integration-v41.js?v=41.3"></script>
<!-- etc -->
```

---

# 📁 FILE STRUCTURE

```
birdturds.com/
├── index.html          ← NEEDS COMPLETE REBUILD (see section 2)
├── play.html           ← Game page
├── about.html          ← About page (has testimony videos)
├── howtoplay.html      ← Instructions
├── gamer-break-buddy.html ← Wellness feature
├── dude.html           ← Dude.com landing page
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker
│
├── js/
│   ├── game.js         ← Main game (17,800+ lines)
│   └── systems/
│       ├── game-integration-v41.js  ← Bot & Sniper systems
│       ├── game-over-fixes.js       ← Game over screen fixes
│       ├── sprite-border-helper.js  ← White border helper
│       ├── tranquilizer-mode.js     ← Park mode (tranqs only)
│       ├── comic-bubble-voices.js   ← Speech bubbles
│       └── game-patch-v41.js        ← Various patches
│
├── sprites/
│   ├── hunters/        ← 8 hunters × 6 animations = 48 files
│   ├── birds/          ← 41 bird species
│   ├── animals/        ← Cow, horse, pig, sheep, chicken, goat, etc
│   ├── bots/           ← bot1, bot2, bot3, bot4 sprites
│   ├── enemies/        ← sniper_strip.png
│   ├── vehicles/       ← tractor_good_new.png, tractor_bad_new.png
│   ├── trump/          ← trump_walk.png, bodyguard_walk.png
│   └── npcs/           ← farmer_strip.png, child_strip.png
│
├── sounds/             ← 38 audio files
└── docs/               ← Documentation
```

---

# 🎯 PRIORITY ORDER

1. **FIRST**: Convert ALL WebP files to real PNG
2. **SECOND**: Fix character scaling in game.js
3. **THIRD**: Add white glow to all sprites in game.js
4. **FOURTH**: Fix tractor paths to use new art
5. **FIFTH**: Remove skull emoji
6. **SIXTH**: Reduce hunter shake
7. **SEVENTH**: Rebuild index.html with all sprites
8. **EIGHTH**: Integrate bot/sniper systems
9. **NINTH**: Add cache busting

---

# 🔍 USEFUL GREP COMMANDS

```bash
# Find WebP files mislabeled as PNG
find sprites -name "*.png" -exec file {} \; | grep -i webp

# Find skull emoji
grep -rn "💀" js/

# Find tractor references
grep -n "tractor" js/game.js

# Find character scaling
grep -n "setScale" js/game.js | grep -E "animal|npc|trump|vehicle"

# Find hunter creation
grep -n "this.hunter\s*=" js/game.js

# Find game over screen
grep -n "showGameOverScreen\|PECKED TO DEATH" js/game.js
```

---

# ✅ CHECKLIST

- [ ] All WebP files converted to PNG
- [ ] index.html rebuilt with actual sprites
- [ ] All sprites have white outline (CSS filter)
- [ ] Hunter scale = 0.24
- [ ] Trump scale = 0.24
- [ ] NPC scale = 0.22
- [ ] Animal scale = 0.20
- [ ] Tractor scale = 0.18
- [ ] Tractors load new art files
- [ ] All game sprites have preFX glow
- [ ] Skull emoji removed
- [ ] Hunter shake reduced
- [ ] Bots integrated
- [ ] Snipers integrated
- [ ] Cache busting added
- [ ] Loading screen has chicken freakout
- [ ] Testimony videos in scrolling section

---

# 📞 CONTACT

If you have questions about what the user wants, the key points are:
1. **NO EMOJIS as placeholders** - use actual sprite images
2. **WHITE OUTLINE on everything** - characters need to pop
3. **NEW TRACTOR ART** - not the old cartoon style
4. **PROPER SIZING** - farmer shouldn't be tiny compared to hunter
5. **CHRISTIAN CONTENT** - anti-woke, pro-Jesus testimonies only
6. **BOTS & SNIPERS** - should spawn and work tonight

Good luck! 🙏
