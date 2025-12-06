# BIRDTURDS v40.5 - SERVER UPLOAD GUIDE

## 📦 COMPLETE PACKAGE: 105 Files

## ⚠️ SOUNDS STILL NEEDED!

### Bird Sounds (Upload these!)
```
pigeon_coo.mp3      - Cooing sound
crow_caw.mp3        - Cawing  
hawk_screech.mp3    - Sharp screech
eagle_cry.mp3       - Majestic cry
seagull_squawk.mp3  - Beach bird call
goose_honk.mp3      - Honking
sparrow_chirp.mp3   - Quick chirps
owl_hoot.mp3        - "Hoo-hoo"
cardinal_song.mp3   - Whistle song
bluebird_song.mp3   - Sweet melody
```

### Holy Sounds (Upload these!)
```
bible_pickup.mp3    - Heavenly chime (2s)
angel_summon.mp3    - Angelic choir (2s)
angel_smite.mp3     - Holy power blast (1s)
```

**See BIRD_SOUNDS_NEEDED.md for free sources!**

---

## 🚀 UPLOAD ORDER

### Step 1: Upload Sprites to `/public_html/sprites/`

```
sprites/animals/     → /public_html/sprites/animals/
sprites/bots/        → /public_html/sprites/bots/
sprites/demon/       → /public_html/sprites/demon/
sprites/enemies/     → /public_html/sprites/enemies/
sprites/npcs/        → /public_html/sprites/npcs/
sprites/vehicles/    → /public_html/sprites/vehicles/
sprites/items/       → /public_html/sprites/items/
sprites/trump/       → /public_html/sprites/trump/
```

### Step 2: Upload Sounds to `/public_html/sounds/`

```
sounds/*.mp3 → /public_html/sounds/
```

### Step 3: Upload JS to `/public_html/js/`

```
*.js → /public_html/js/
```

### Step 4: Upload HTML to `/public_html/`

```
index.html      → /public_html/index.html
howtoplay.html  → /public_html/howtoplay.html
```

---

## 📜 SCRIPT LOAD ORDER (in play.html)

```html
<!-- Core Systems -->
<script src="js/debug-system.js"></script>
<script src="js/input-manager.js"></script>
<script src="js/AUDIO_CONFIG.js"></script>

<!-- Game Rules & Config -->
<script src="js/game-rules.js"></script>
<script src="js/animal-sprites.js"></script>

<!-- Entity Systems -->
<script src="js/farm-animals.js"></script>
<script src="js/npc-systems.js"></script>
<script src="js/bot-hunter-system.js"></script>
<script src="js/sniper-wildlife.js"></script>

<!-- Special Systems -->
<script src="js/tractor-system.js"></script>
<script src="js/demon-system.js"></script>
<script src="js/angel-system.js"></script>
<script src="js/voice-system.js"></script>

<!-- Master Integration (LOAD LAST) -->
<script src="js/game-integration.js"></script>
```

---

## ✅ FEATURE CHECKLIST

### New in v40.5:
- [x] Green Tractor (bucket ride, poop scoop)
- [x] Red Tractor (hostile, demon above)
- [x] Demon System (hover, flee, return)
- [x] Angel System (summon, smite, cost 200)
- [x] Bot Hunters (4 types, compete, bounceable)
- [x] Voice Lines (pastor, hunters, scripture)
- [x] Enemy Snipers (+500 to kill)
- [x] Input Manager (all controls including A for Angel)
- [x] Debug System (F3 to toggle)
- [x] Updated index.html with all features
- [x] Updated howtoplay.html with all instructions

### Existing Features:
- [x] 40+ bird species
- [x] 13 animals (9 farm + 4 wildlife)
- [x] 8 playable characters
- [x] 6 scenes including Trump/White House
- [x] Knife, Umbrella, Golden Ring items
- [x] Bounce on NPCs for points
- [x] Ride animals for bonuses

---

## 🖥️ SERVER REQUIREMENTS

Your **dedicated server can easily handle this!**

| Resource | Usage |
|----------|-------|
| Asset Size | ~5 MB total |
| Max Entities | ~75 concurrent |
| Target FPS | 60 |
| Browser Support | Chrome, Firefox, Edge |

### Why It Will Run Smoothly:
1. **Modular Design** - Each system is independent
2. **Efficient Rendering** - Sprite sheets, not individual images
3. **Smart Updates** - Only active entities processed
4. **Object Pooling Ready** - Can add if needed
5. **Low Memory** - ~5MB assets, minimal runtime allocation

---

## 🎮 CONTROLS SUMMARY

| Key | Action |
|-----|--------|
| ← → | Move |
| ↑ / W | Jump |
| SPACE | Shoot |
| ↓ / S | Duck / Exit vehicle |
| E | Knife |
| Q | Umbrella |
| **A** | **Summon Angel** (NEW!) |
| ESC | Pause |
| F3 | Debug overlay |

---

## 💰 POINTS QUICK REF

| Action | Points |
|--------|--------|
| Birds | +10 to +100 |
| Protected Birds | -50 to -100 |
| Sniper Kill | +500 |
| All Snipers | +300 bonus |
| Demon Hit | +100 |
| Angel Summon | -200 (cost) |
| Net Angel Use | -100 |
| Ride Deer | +1000 |
| Ride Horse/Cow | +500 |
| Bounce Bot Hunter | +20 |
| Bounce Farmer | +30 |
| Bounce Child | +25 |

---

## 🐛 DEBUG MODE

Press **F3** during gameplay to see:
- FPS counter
- Memory usage
- Entity counts (birds, animals, tractors)
- Demon status
- Angel status

---

## 📞 QUICK FIXES

### If sounds don't play:
- Check browser autoplay policy
- User must interact with page first

### If sprites don't show:
- Verify file paths match server structure
- Check browser console for 404 errors

### If FPS drops:
- Reduce max entities in config
- Enable object pooling for bullets

---

**Ready to deploy! Your dedicated server will handle this beautifully.** 🎮🚀
