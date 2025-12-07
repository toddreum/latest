# BirdTurds Smoke Test Checklist

## Purpose
Verify that the play/index flow, hunter selection, and game bootstrap are working correctly after FIX38 deployment.

## Pre-Test Setup

### Clear Browser State
1. Open browser DevTools (F12)
2. Go to Application tab → Storage
3. Click "Clear site data"
4. Close and reopen browser
5. Or use Incognito/Private mode

### Check Service Worker
1. DevTools → Application → Service Workers
2. Note current version (should be `birdturds-v38.0.0`)
3. Check "Update on reload" for testing
4. If old version, click "Unregister" and reload

## Test Suite

### 1. Index Page - Hunter Selection

**Test 1.1: Page Loads**
- [ ] Navigate to `/index.html` or `/`
- [ ] Page loads without errors
- [ ] No JavaScript errors in console
- [ ] Hunter tiles are visible

**Test 1.2: Hunter Tile Binding**
- [ ] Click on "Buck" hunter tile
- [ ] Tile shows visual selection (green border/glow)
- [ ] Console shows: `[HUNTER-SELECTION] Selected: buck`
- [ ] localStorage has `birdturds_character = "buck"`

**Test 1.3: Multiple Hunter Selection**
- [ ] Click on "Daisy" hunter tile
- [ ] Previous selection (Buck) is deselected
- [ ] Daisy tile shows selection
- [ ] localStorage updated to `birdturds_character = "daisy"`
- [ ] Console shows: `[HUNTER-SELECTION] Selected: daisy`

**Test 1.4: Difficulty Selection**
- [ ] Click "Easy" difficulty button
- [ ] Button shows visual selection (gold border)
- [ ] localStorage has `birdturds_difficulty = "beginner"`
- [ ] Click "Normal" difficulty
- [ ] Selection updates correctly
- [ ] localStorage updated to `birdturds_difficulty = "intermediate"`

**Test 1.5: Selection Persistence**
- [ ] Select "Sierra" as hunter
- [ ] Select "Hard" as difficulty
- [ ] Refresh page (F5)
- [ ] Sierra tile shows as selected
- [ ] Hard difficulty shows as selected
- [ ] localStorage still has correct values

**Test 1.6: Play Button Navigation**
- [ ] Select "Gunner" as hunter
- [ ] Click "PLAY NOW" button
- [ ] Page navigates to `/play.html`
- [ ] OR URL includes query params: `/play.html?h=gunner&d=intermediate`

### 2. Play Page - Game Bootstrap

**Test 2.1: Direct Navigation (with localStorage)**
- [ ] Set `localStorage.birdturds_character = "jolene"`
- [ ] Set `localStorage.birdturds_difficulty = "advanced"`
- [ ] Navigate to `/play.html` directly
- [ ] Console shows: `[PLAY-BOOTSTRAP] Initializing...`
- [ ] Console shows: `[PLAY-BOOTSTRAP] Hunter: jolene`
- [ ] Console shows: `[PLAY-BOOTSTRAP] Difficulty: advanced`
- [ ] Console shows: `[PLAY-BOOTSTRAP] Bootstrap complete!`

**Test 2.2: Query Parameter Override**
- [ ] Navigate to `/play.html?h=tammy&d=beginner`
- [ ] Console shows: `[PLAY-BOOTSTRAP] Hunter from query param: tammy`
- [ ] localStorage updated to `birdturds_character = "tammy"`
- [ ] localStorage updated to `birdturds_difficulty = "beginner"`
- [ ] Game uses Tammy character

**Test 2.3: Fallback Behavior**
- [ ] Clear all localStorage
- [ ] Navigate to `/play.html` with no query params
- [ ] Console shows: `[PLAY-BOOTSTRAP] No hunter found, using default: buck`
- [ ] Console shows: `[PLAY-BOOTSTRAP] No difficulty found, using default: intermediate`
- [ ] Game loads with Buck on Intermediate difficulty

**Test 2.4: Game Container**
- [ ] Page loads
- [ ] #game-container element exists in DOM
- [ ] Firebase scripts loaded (check Network tab)
- [ ] play-bootstrap.js loaded before game.min.js
- [ ] No "game-container not found" errors

**Test 2.5: Game Initialization**
- [ ] Wait for game to load (may take 5-10 seconds)
- [ ] Start screen appears with hunter selection
- [ ] Selected hunter matches localStorage/query param
- [ ] Clicking play starts the game
- [ ] Character in game matches selection

### 3. Fallback Systems

**Test 3.1: Index Hotfix**
- [ ] Block `/js/hunter-selection.js` (DevTools → Network → Block request URL)
- [ ] Refresh `/index.html`
- [ ] Console shows: `[INDEX-HOTFIX] HunterSelection not found, applying emergency hotfix...`
- [ ] Hunter tiles still clickable
- [ ] Selection still works
- [ ] Play button still navigates

**Test 3.2: bt-fixes.js Integration**
- [ ] Load play.html
- [ ] Console shows: `[BT-FIX38] Initializing...` or `[BT-FIX38] Already applied`
- [ ] No JavaScript conflicts
- [ ] Event propagation protection working
- [ ] Selection persistence functions available

### 4. Service Worker

**Test 4.1: Cache Version**
- [ ] DevTools → Application → Service Workers
- [ ] Version shows `birdturds-v38.0.0`
- [ ] Status shows "activated and running"

**Test 4.2: Network Strategy**
- [ ] DevTools → Network tab
- [ ] Clear cache
- [ ] Reload page
- [ ] Find `/game.min.js` request
- [ ] Should show "200 OK" from network (not from cache)
- [ ] Second reload may still fetch from network (network-first strategy)

**Test 4.3: Cache Storage**
- [ ] DevTools → Application → Cache Storage
- [ ] Find `birdturds-v38.0.0` cache
- [ ] Verify static assets are cached (sprites, logos, etc.)
- [ ] game.js should be in cache but fetched from network first

**Test 4.4: Offline Behavior**
- [ ] Load page fully online
- [ ] DevTools → Network → Throttling → Offline
- [ ] Reload page
- [ ] Static assets should load from cache
- [ ] game.js may fail (network-first), but cached version should be used as fallback

### 5. Edge Cases

**Test 5.1: Invalid Hunter ID**
- [ ] Navigate to `/play.html?h=invalid_hunter`
- [ ] Console shows: `[PLAY-BOOTSTRAP] Invalid hunter: invalid_hunter - using default`
- [ ] Game loads with Buck (default)
- [ ] No JavaScript errors

**Test 5.2: Invalid Difficulty**
- [ ] Navigate to `/play.html?d=super_hard`
- [ ] Console shows: `[PLAY-BOOTSTRAP] Invalid difficulty: super_hard - using default`
- [ ] Game loads with Intermediate (default)

**Test 5.3: Mixed Canonical Keys**
- [ ] Set `localStorage.birdturds_character = "clyde"`
- [ ] Set `localStorage.selectedCharacter = "bubba"` (legacy key)
- [ ] Navigate to `/play.html`
- [ ] Should use `birdturds_character` (canonical key takes precedence)
- [ ] Console shows: `[PLAY-BOOTSTRAP] Hunter from birdturds_character: clyde`

**Test 5.4: Simultaneous Clicks**
- [ ] Click multiple hunter tiles rapidly
- [ ] Only the last click should be registered
- [ ] No JavaScript errors
- [ ] localStorage updated correctly

### 6. Mobile Testing

**Test 6.1: Touch Events**
- [ ] Test on mobile device or use DevTools device emulation
- [ ] Hunter tiles respond to touch
- [ ] Selection works on first tap
- [ ] No double-tap required
- [ ] Play button works with touch

**Test 6.2: Viewport**
- [ ] Page scales correctly on mobile
- [ ] Hunter tiles are large enough to tap easily
- [ ] No horizontal scrolling issues
- [ ] All buttons accessible

### 7. Cross-Browser Testing

Test on multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Android)

For each browser:
- [ ] Hunter selection works
- [ ] Play navigation works
- [ ] Game loads correctly
- [ ] No browser-specific errors

## Issue Reporting

If any test fails:

1. **Note the test number** (e.g., Test 2.2)
2. **Copy console errors** (full stack trace)
3. **Screenshot the issue**
4. **Note browser and OS version**
5. **Check localStorage values** (DevTools → Application → Local Storage)
6. **Check Network tab** for failed requests
7. **Report with all details**

## Success Criteria

All tests must pass for deployment:
- [x] Hunter selection works on index.html
- [x] Selection persists across page loads
- [x] Play button navigates with correct parameters
- [x] play-bootstrap.js reads selection correctly
- [x] Query parameters override localStorage
- [x] Default fallbacks work
- [x] Service worker uses correct cache strategy
- [x] Hotfixes activate when needed
- [x] No JavaScript console errors
- [x] Mobile touch works correctly

## Post-Deployment Monitoring

After deployment, monitor for:
- Service worker activation rate
- JavaScript error rates
- Hunter selection completion rate
- Game start success rate
- Any 404s for new JavaScript files

## Rollback Plan

If critical issues found:
1. Revert service-worker.js to previous version
2. Remove new JavaScript files
3. Restore play.html and index.html from backup
4. Clear CDN cache if applicable
5. Notify users via site banner

## Notes

- Clear browser cache between tests
- Test with empty localStorage first
- Then test with pre-populated localStorage
- Test both direct navigation and cross-page navigation
- Verify all console messages match expected output
