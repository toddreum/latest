# BIRDTURDS v40.5 - COPILOT REVIEW REQUEST

## 🎮 PROJECT SUMMARY

A comedic 2D side-scrolling hunting game where players shoot birds, bounce on animals, and deal with various NPCs including enemy snipers, bot hunters, a demon that hovers above an angry tractor driver, AND can summon an Angel for divine intervention!

**FINAL BUILD: 102 files, ~7000 lines of JavaScript**

---

## 📁 FILE STRUCTURE

```
js/ (14 files, 6811 lines)
├── game-integration.js    - Master game loop & collision
├── farm-animals.js        - Farm animal system
├── sniper-wildlife.js     - Snipers + wildlife
├── npc-systems.js         - Farmer, Child, other NPCs
├── tractor-system.js      - Green/Red tractors + bucket ride
├── bot-hunter-system.js   - AI competitor hunters
├── demon-system.js        - Demon hover/flee behavior
├── angel-system.js        - Divine intervention! NEW!
├── voice-system.js        - Comments & scripture
├── input-manager.js       - Keyboard/mouse handling
├── debug-system.js        - Performance monitoring
├── game-rules.js          - Points, rules config
├── animal-sprites.js      - Sprite definitions
└── AUDIO_CONFIG.js        - Sound mappings

html/ (2 files)
├── index.html             - Landing page with features
└── howtoplay.html         - Complete game instructions

sprites/ (54 files)
└── animals, bots, vehicles, demon, enemies, npcs, trump, items

sounds/ (29 files)
└── All SFX and voice clips
```

---

## 🔧 KEY SYSTEMS TO REVIEW

### 1. TRACTOR SYSTEM (tractor-system.js)

**New Feature: Bucket Ride**
```javascript
// Hunter can jump into green tractor's bucket for protection
checkBucketEntry(hunter) {
    // Check if hunter landing in bucket zone
    if (hunter.velocityY > 0 && 
        hunter.x in bucket_x_range &&
        hunter.y + height near bucket_y) {
        enterBucket(hunter, tractor);
    }
}

// While riding:
// - Hunter follows tractor position
// - Hunter is PROTECTED from all damage
// - Hunter can still SHOOT
// - Press DOWN or JUMP to exit
```

**Question for Copilot:** Is the bucket entry collision detection robust? Edge cases?

---

### 2. DEMON SYSTEM (demon-system.js)

**Behavior:**
```
1. Spawns when red (bad) tractor appears
2. Hovers 50px above tractor driver with bob animation
3. When SHOT:
   - Play screech sound
   - Award +100 points
   - Enter FLEE state (fly away fast)
   - Return after 30 seconds
4. NEVER dies - always returns
```

**Question for Copilot:** Is the flee/return pattern clean? Timer management?

---

### 3. VOICE SYSTEM (voice-system.js)

**Spacing Strategy:**
```javascript
intervals: {
    pastorMin: 60000,    // 1 min minimum between pastor comments
    pastorMax: 120000,   // Up to 2 min
    scripture: 300000,   // 5 min between scripture
    hunterMin: 45000,    // 45 sec between hunter comments
}
```

**Trigger Conditions:**
- Pastor: Only when demon/bad tractor active
- Scripture: Only when demon visible, every 5 min
- Hunter: On demon appear, on demon hit

**Question for Copilot:** Is this spacing enough to avoid being "preachy"?

---

### 5. ANGEL SYSTEM (angel-system.js) ⭐ NEW

```javascript
// Player presses 'A' to summon angel
summon() {
    // Check: cooldown (60s), demon present, enough points (200)
    if (!canSummon()) return;
    
    // Deduct 200 points
    ScoreSystem.subtract(200);
    
    // Angel descends from top of screen
    // Hovers above demon
    // Fires holy light beam
    // Demon takes hit (+100 pts) and flees for 45s (vs normal 30s)
    // Angel ascends and disappears
}
```

**Cost/Benefit:**
- Cost: -200 points to summon
- Reward: +100 demon hit points
- Net cost: -100 points
- Benefit: Longer demon flee time (45s vs 30s), dramatic effect

**Question for Copilot:** Is -100 net cost balanced? Should angel be cheaper/more expensive?

---

### 6. BOT HUNTER SYSTEM (bot-hunter-system.js)

**Behavior:**
```javascript
- Walk around scene randomly
- Shoot at birds (55% accuracy - not too good)
- Can "steal" kills from player
- Player can bounce on them for +20 pts
- Each bot uses different character's gunshot sound
```

**Bot Roster:**
| Bot | Sound | Visual |
|-----|-------|--------|
| Big Earl | bubba_shoot.mp3 | Orange cap |
| Sally | daisy_shoot.mp3 | Woman |
| Hank | buck_shoot.mp3 | Lumberjack |
| Tex | clyde_shoot.mp3 | Cowboy |

**Question for Copilot:** Balance of bot accuracy? Should they be less/more effective?

---

### 5. COLLISION SYSTEM (game-integration.js)

**Current Order:**
```javascript
checkCollisions() {
    // 1. Player bullets vs Birds
    // 2. Player bullets vs Demon
    // 3. Player bullets vs Snipers (only if visible)
    // 4. Player bounce vs Animals
    // 5. Player bounce vs Bot Hunters
    // 6. Player vs Tractor Bucket (entry)
    // 7. Damage: Bad Tractor vs Player
    // 8. Damage: Sniper Bullets vs Player
}
```

**Protection Logic:**
```javascript
// Bucket = full protection
if (TractorSystem.isHunterProtected(player)) return;

// Umbrella = blocks turds only
if (player.hasUmbrella && source === 'turd') return;
```

**Question for Copilot:** Is this collision order optimal? Any missing cases?

---

## 🎯 SPECIFIC REVIEW QUESTIONS

1. **Performance:** Should we use object pooling for bullets/birds instead of array splice?

2. **State Management:** Is the demon state machine (FLY→HIT→FLEE→return) clean?

3. **Audio:** Multiple sounds can play simultaneously - should we add a priority queue?

4. **Memory:** Are we properly cleaning up references when removing entities?

5. **Edge Cases:**
   - What if player in bucket when tractor leaves screen?
   - What if demon shot while already fleeing?
   - What if all bots die at once?

6. **Balance:**
   - Demon gives +100 per hit, returns in 30s. Too much/little?
   - Bot accuracy at 55% - fair competition?
   - Scripture every 5 min - too frequent?

---

## 📊 ASSET TOTALS

| Type | Count |
|------|-------|
| Sprite Files | 54 |
| Sound Files | 29 |
| JS Files | 11 |
| Total Lines | ~6000 |

---

## 🚀 INTEGRATION ORDER

```html
<script src="js/game-rules.js"></script>
<script src="js/animal-sprites.js"></script>
<script src="js/farm-animals.js"></script>
<script src="js/npc-systems.js"></script>
<script src="js/tractor-system.js"></script>
<script src="js/demon-system.js"></script>
<script src="js/voice-system.js"></script>
<script src="js/bot-hunter-system.js"></script>
<script src="js/sniper-wildlife.js"></script>
<script src="js/game-integration.js"></script>
```

---

## ✅ FEATURE CHECKLIST

- [x] Green tractor: scoops poop, bucket ride for safety
- [x] Red tractor: hostile, demon hovers above
- [x] Demon: hovers, flees when shot, returns in 30s
- [x] Bot Hunters: compete for kills, bounceable
- [x] Voice System: pastor comments, hunter quips, scripture (light)
- [x] Sniper System: enemy NPCs, +500 to kill
- [x] All animal sounds and sprites
- [x] No old tractors (only green/red)

---

## 🐛 KNOWN ISSUES / TODO

1. ElevenLabs voice integration - need server paths
2. Trump scene special mechanics - bodyguard behavior
3. Golden ring level unlock - Park scene only
4. Tractor driver voice clips - need to hook up

---

**Ready for Copilot review!**
