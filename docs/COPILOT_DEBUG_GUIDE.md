# BIRDTURDS v41 - COPILOT DEBUGGING GUIDE
## Complete Function Skeleton & Integration Reference

---

## CRITICAL: BOT & SNIPER INTEGRATION

The Bot and Sniper systems exist in separate files but need to be CONNECTED to game.js!

### Files that need integration:
- `js/systems/bot-hunter-system.js` - Bot AI
- `js/systems/sniper-wildlife.js` - Sniper enemy
- `js/systems/game-integration-v41.js` - NEW unified integration

### Add these calls to game.js:

**In GameScene create() method:**
```javascript
// After scene setup, add:
if (window.GameIntegration) {
    GameIntegration.initScene(this, currentSceneName);
}
if (window.BotHunterSystem) {
    BotHunterSystem.init();
}
if (window.SniperSystem) {
    SniperSystem.init(this, currentSceneName);
}
```

**In GameScene update(time, delta) method:**
```javascript
// Add to update loop:
if (window.GameIntegration) {
    GameIntegration.updateScene(this, delta, this.player, this.birds);
}
```

**In shooting/hit detection:**
```javascript
// When player shoots, check for sniper hits:
if (window.GameIntegration) {
    const hit = GameIntegration.checkHits(this, bulletX, bulletY);
    if (hit && hit.type === 'sniper') {
        this.addScore(hit.points);
    }
}
```

---

## COMPLETE FUNCTION SKELETON

### game-integration-v41.js
```javascript
window.GameIntegration = {
    // TESTIMONIAL VIDEOS
    testimonialVideos: [
        { id: 'nQ77wvjen7U', title: 'Former Gay News Broadcaster Finds Jesus' },
        { id: 'cJc0McjBo3o', title: 'Lesbian Finds Jesus' }
    ],
    getRandomVideo: function(),
    createVideoSection: function(),
    showTestimonialVideo: function(scene),
    
    // BOT SYSTEM
    botsEnabled: true,
    bots: [],
    initBots: function(scene),
    spawnBot: function(scene, botIndex),
    updateBots: function(scene, delta, birds),
    botShoot: function(scene, bot, birds),
    getBotScores: function(),
    
    // SNIPER SYSTEM
    snipersEnabled: true,
    snipers: [],
    sniperBullets: [],
    initSnipers: function(scene, sceneName),
    spawnSniper: function(scene),
    showSniperWarning: function(scene),
    updateSnipers: function(scene, delta, player),
    sniperShoot: function(scene, sniper, player),
    hitSniper: function(scene, sniper),
    captureSniper: function(scene, sniper),
    
    // MAIN HOOKS - CALL THESE
    initScene: function(scene, sceneName),  // Call in create()
    updateScene: function(scene, delta, player, birds),  // Call in update()
    checkHits: function(scene, x, y)  // Call when shooting
}
```

### comic-bubble-voices.js
```javascript
window.ComicVoices = {
    dadJokes: [],           // 150+ unique jokes
    christianJokes: [],     // 50+ jokes
    christianQuotes: [],    // 36 scriptures
    birdJokes: [],          // 25 jokes
    huntingJokes: [],       // 15 jokes
    wellnessReminders: [],  // 25 tips
    hunterLines: {},        // 8 hunters × 4 line types
    sceneGreetings: {},     // 12 scene greetings
    
    getDadJoke: function(),
    getChristianJoke: function(),
    getChristianQuote: function(),
    getBirdJoke: function(),
    getHuntingJoke: function(),
    getWellnessReminder: function(),
    getSceneGreeting: function(sceneKey),
    getHunterLine: function(hunterId, lineType),
    getKillLine: function(isStreak, isBoss),
    getSniperLine: function(phase),
    getRandomJoke: function(),
    getStats: function()
}
```

### game-over-fixes.js
```javascript
window.GameOverFixes = {
    spriteIcons: [],  // Uses sprite paths, NOT emojis
    messages: [],
    scriptures: [],
    
    createGameOverScreen: function(score, level),
    createVideoEmbed: function(url, width, height),
    show: function(score, level),
    hide: function(),
    restart: function(),
    goHome: function(),
    killSkeleton: function(),  // REMOVES 💀 emoji
    init: function()
}
```

### game-patch-v41.js (TranqMode)
```javascript
window.TranqMode = {
    active: false,
    parkScene: false,
    sniperEncounter: false,
    
    shouldBeActive: function(scene),
    activateForPark: function(scene),
    activateForSniper: function(scene),
    deactivate: function(),
    tranquilizeBird: function(scene, bird),
    tranquilizeSniper: function(scene, sniper),
    captureSniper: function(scene, sniper),
    showRedemptionMessage: function(scene)
}
```

---

## SPRITE LOCATIONS

All verified to exist:

| Type | Path | Count |
|------|------|-------|
| Hunters | sprites/hunters/*.png | 48 files (8×6) |
| Birds | sprites/birds/*.png | 41 files |
| Animals | sprites/animals/*.png | 18 files |
| Bots | sprites/bots/*.png | 8 files |
| Sniper | sprites/enemies/*.png | 4 files |
| Trump | sprites/trump/*.png | 5 files |
| Tractors | sprites/vehicles/*.png | 6 files |
| NPCs | sprites/npcs/*.png | 4 files |
| Demons | sprites/demon/*.png | 10 files |

---

## SOUNDS NEEDED

### Still missing:
1. Hunter shoot sounds: `{hunter}_shoot.mp3` × 8
2. Sniper sounds: `sniper_appear.mp3`, `sniper_captured.mp3`
3. Bot sounds: `bot_shoot.mp3`

### Workaround in game-integration-v41.js:
Currently uses existing sounds like `hunter_oof.mp3` as fallbacks.

---

## SCRIPT LOAD ORDER

```html
<!-- play.html - ORDER MATTERS -->
<script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
<script src="js/systems/comic-bubble-voices.js"></script>
<script src="js/systems/sprite-border-helper.js"></script>
<script src="js/systems/game-patch-v41.js"></script>
<script src="js/systems/tranquilizer-mode.js"></script>
<script src="js/systems/game-over-fixes.js"></script>
<script src="js/systems/game-integration-v41.js"></script>
<script src="js/game.js"></script>
```

---

## DEBUG COMMANDS (Browser Console)

```javascript
// Check systems loaded
console.log('GameIntegration:', !!window.GameIntegration);
console.log('ComicVoices:', !!window.ComicVoices);
console.log('GameOverFixes:', !!window.GameOverFixes);
console.log('TranqMode:', !!window.TranqMode);

// Get joke stats
ComicVoices.getStats();

// Test game over screen
GameOverFixes.show(5000, 5);

// Check bot status
GameIntegration.bots;

// Force spawn sniper (if scene available)
// GameIntegration.spawnSniper(game.scene.scenes[0]);
```

---

## SEARCH PATTERNS FOR GAME.JS

Find scene create:
```bash
grep -n "create\s*(" js/game.js | head -5
```

Find scene update:
```bash
grep -n "update\s*(time" js/game.js
```

Find shooting logic:
```bash
grep -n "this.shoot\|fireBullet\|createBullet" js/game.js
```

Find score addition:
```bash
grep -n "score\s*+=" js/game.js
```

Find bird array:
```bash
grep -n "this.birds\s*=" js/game.js
```

---

## INTEGRATION CHECKLIST

1. [ ] Locate GameScene class in game.js (search for `class GameScene`)
2. [ ] Find `create()` method
3. [ ] Add GameIntegration.initScene() call
4. [ ] Find `update(time, delta)` method  
5. [ ] Add GameIntegration.updateScene() call
6. [ ] Find shooting/hit detection code
7. [ ] Add GameIntegration.checkHits() call
8. [ ] Test that bots spawn after 5 seconds
9. [ ] Test that sniper spawns after 10 seconds
10. [ ] Test that sniper capture shows video

---

## YOUTUBE VIDEOS (Embedded)

1. **about.html** - Testimonies section with 2 videos
2. **game-integration-v41.js** - Shows video after sniper capture

Videos:
- `https://www.youtube.com/embed/nQ77wvjen7U` - Former Gay News Broadcaster
- `https://www.youtube.com/embed/cJc0McjBo3o` - Lesbian Finds Jesus

---

## FILE SIZES

| File | Size | Lines |
|------|------|-------|
| game.js | 679 KB | 17,830 |
| comic-bubble-voices.js | 35 KB | ~700 |
| game-integration-v41.js | 15 KB | ~400 |
| game-patch-v41.js | 23 KB | ~600 |

---

*For Copilot Integration - v41*
