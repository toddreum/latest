# FIX38 - Play/Index Flow Restoration

## Overview

This fix restores the broken play.html/index flow, unifies hunter selection persistence, hardens game bootstrap, adds fallback shims, and makes service-worker and Firebase integration robust.

## Problem Statement

The original issue included:
- **play.html**: Corrupted hybrid implementation
- **Hunter selection**: Defaulting and not clickable
- **Game bootstrap**: Mismatches or corrupted builds being cached by service worker
- **Firebase**: Initialization errors
- **Analytics**: Blocked scripts causing load issues
- **UI/HUD**: Integration problems

## Solution Components

### 1. Hunter Selection System (`/js/hunter-selection.js`)

**Purpose**: Manages hunter and difficulty selection on index.html

**Features**:
- Binds all hunter tiles using `data-hunter` attribute
- Persists to canonical keys: `birdturds_character` and `selectedCharacter`
- Persists difficulty to `birdturds_difficulty`
- Handles Play/Solo button clicks
- Updates visual selection state
- Provides fallback for legacy keys

**Usage**:
```javascript
// Auto-initializes on DOMContentLoaded
// Manual access:
HunterSelection.init();
HunterSelection.selectHunter('buck');
HunterSelection.selectDifficulty('intermediate');
const { hunter, difficulty } = HunterSelection.getSelection();
```

### 2. Play Bootstrap (`/js/play-bootstrap.js`)

**Purpose**: Bootstraps game configuration on play.html before game.js loads

**Features**:
- Reads hunter selection with priority: query param > birdturds_character > selectedCharacter
- Reads difficulty with priority: query param > localStorage > default
- Validates and normalizes hunter IDs
- Sets global variables for game.js compatibility
- Dispatches `playBootstrapReady` event

**Priority Chain**:
1. Query parameter (`?h=hunter&d=difficulty`)
2. Canonical localStorage key (`birdturds_character`)
3. Legacy localStorage key (`selectedCharacter`)
4. Default fallback (`buck` / `intermediate`)

**Global Variables Set**:
```javascript
window.selectedCharacter = hunter;
window.selectedHunter = hunter;
window.selectedDifficulty = difficulty;
window.pendingCharacter = hunter;
```

### 3. Index Hotfix (`/js/index-hotfix.js`)

**Purpose**: Emergency fallback if hunter-selection.js fails to load or initialize

**Features**:
- Waits 500ms to check if HunterSelection initialized
- Rebinds hunter tiles if needed
- Rebinds difficulty buttons
- Rebinds Play buttons
- Restores visual selection state

**Activation**:
Only activates if `window.HunterSelection` is not found after 500ms.

### 4. Service Worker Updates (`/service-worker.js`)

**Changes**:
- Cache version bumped to `v38.0.0`
- Network-first strategy for `/game.js` and `/game_min.js`
- Cache-first strategy for static assets
- Proper Firebase URL handling (bypasses service worker)
- Better error handling and logging

**Benefits**:
- Prevents serving stale/corrupt game bundles
- Always fetches latest game code from network
- Falls back to cache if network fails
- Clears old caches automatically

### 5. Integration

**index.html**:
```html
<!-- Near end of body -->
<script src="/js/hunter-selection.js"></script>
<script src="/js/index-hotfix.js"></script>
```

**play.html**:
```html
<!-- Before game.min.js -->
<script src="/js/play-bootstrap.js"></script>
<script src="/game.min.js?v=36.5"></script>
```

## Data Flow

### Selection Flow (Index → Play)

```
1. User on index.html
   ↓
2. Clicks hunter tile (e.g., "Buck")
   ↓
3. hunter-selection.js:
   - Saves to localStorage.birdturds_character = "buck"
   - Saves to localStorage.selectedCharacter = "buck" (legacy)
   - Saves to localStorage.birdturds_difficulty = "intermediate"
   - Updates visual state
   ↓
4. User clicks "PLAY NOW"
   ↓
5. Navigate to /play.html?h=buck&d=intermediate
   ↓
6. play-bootstrap.js loads:
   - Reads ?h= parameter (buck)
   - Validates hunter ID
   - Sets global variables
   - Saves back to localStorage for consistency
   ↓
7. game.min.js loads:
   - Reads window.selectedCharacter
   - Reads window.selectedDifficulty
   - Initializes game with correct configuration
```

### Fallback Chain

```
Query Param (?h=)
    ↓ (if not present)
localStorage.birdturds_character
    ↓ (if not present)
localStorage.selectedCharacter (legacy)
    ↓ (if not present)
Default ("buck")
```

## Canonical Keys

### Primary Keys (Recommended)
- `birdturds_character` - Selected hunter ID
- `birdturds_difficulty` - Selected difficulty level

### Legacy Keys (Supported for Compatibility)
- `selectedCharacter` - Old hunter ID key

**Note**: System writes to both keys for maximum compatibility but prioritizes canonical keys when reading.

## Query Parameters

### Supported Parameters

**play.html**:
- `?h=hunter` or `?hunter=hunter` - Hunter ID override
- `?d=difficulty` or `?diff=difficulty` - Difficulty override

**Examples**:
- `/play.html` - Uses localStorage
- `/play.html?h=daisy` - Forces Daisy character
- `/play.html?h=gunner&d=advanced` - Forces Gunner on Advanced
- `/play.html?hunter=sierra&difficulty=beginner` - Long form

## Valid Values

### Hunters
- `buck` - Buck (Texas Cowboy)
- `daisy` - Daisy (Nashville Sharpshooter)
- `bubba` - Bubba (Swamp Hunter)
- `clyde` - Clyde (Mountain Man)
- `sierra` - Sierra (Quick Draw Queen)
- `gunner` - Gunner (Army Veteran)
- `jolene` - Jolene (Ranch Owner)
- `tammy` - Tammy (Silent Hunter)

### Difficulties
- `beginner` (Easy)
- `intermediate` (Normal)
- `advanced` (Hard)

## Console Logging

### Expected Log Messages

**index.html** (hunter-selection.js):
```
[HUNTER-SELECTION] Initializing...
[HUNTER-SELECTION] Bound 8 hunter tiles
[HUNTER-SELECTION] Bound difficulty buttons
[HUNTER-SELECTION] Bound Play buttons
[HUNTER-SELECTION] Initialized with hunter: buck difficulty: intermediate
[HUNTER-SELECTION] Selected: daisy
[HUNTER-SELECTION] Selected difficulty: advanced
```

**index.html** (index-hotfix.js - only if hunter-selection fails):
```
[INDEX-HOTFIX] HunterSelection not found, applying emergency hotfix...
[INDEX-HOTFIX] Rebound 8 hunter tiles
[INDEX-HOTFIX] Rebound 3 difficulty buttons
[INDEX-HOTFIX] Rebound 2 Play buttons
[INDEX-HOTFIX] Restored visual state - hunter: buck difficulty: intermediate
[INDEX-HOTFIX] Emergency hotfix applied successfully
```

**play.html** (play-bootstrap.js):
```
[PLAY-BOOTSTRAP] Initializing...
[PLAY-BOOTSTRAP] Hunter from query param: daisy
[PLAY-BOOTSTRAP] Difficulty from localStorage: advanced
[PLAY-BOOTSTRAP] Bootstrap complete!
[PLAY-BOOTSTRAP] Hunter: daisy
[PLAY-BOOTSTRAP] Difficulty: advanced
[PLAY-BOOTSTRAP] Configuration ready for game.js
```

## Testing

See [SMOKE_TEST.md](./SMOKE_TEST.md) for comprehensive testing checklist.

### Quick Test

1. **Clear browser data**: DevTools → Application → Clear site data
2. **Test index.html**: Click hunter tile, verify localStorage updated
3. **Test play navigation**: Click Play, verify URL has query params
4. **Test play.html**: Verify console shows bootstrap messages
5. **Test game start**: Verify correct hunter loads in game

## Troubleshooting

### Issue: Hunter selection not working on index.html

**Check**:
1. Console for `[HUNTER-SELECTION] Initializing...`
2. If missing, check if index-hotfix activated
3. Verify hunter-selection.js loaded (Network tab)
4. Check for JavaScript errors blocking execution

**Fix**:
- Ensure `/js/hunter-selection.js` is accessible
- Check server file permissions
- Verify no script blockers/ad blockers interfering

### Issue: play.html loading wrong hunter

**Check**:
1. Console for `[PLAY-BOOTSTRAP]` messages
2. Check localStorage values (DevTools → Application → Local Storage)
3. Verify URL query parameters if used
4. Check for typos in hunter ID

**Fix**:
- Navigate with explicit query param: `/play.html?h=buck`
- Clear localStorage and try again
- Check for JavaScript conflicts in console

### Issue: Service worker serving old game.js

**Check**:
1. DevTools → Application → Service Workers
2. Verify version is `birdturds-v38.0.0`
3. Check Network tab for game.js - should show network request

**Fix**:
- Unregister old service worker
- Click "Update" in DevTools service worker section
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Or use "Bypass for network" checkbox during testing

### Issue: Firebase initialization errors

**Check**:
1. Console for Firebase-related errors
2. Verify Firebase scripts loaded (Network tab)
3. Check Permissions-Policy header (see SERVER_CONFIG.md)

**Fix**:
- Ensure HTTPS is enabled
- Configure Permissions-Policy header
- Check Firebase project configuration

## Server Configuration

See [SERVER_CONFIG.md](./SERVER_CONFIG.md) for:
- Permissions-Policy header setup
- HTTPS configuration
- CORS configuration
- Performance optimization
- Monitoring setup

## Files Modified

### New Files
- `/js/hunter-selection.js` (284 lines)
- `/js/index-hotfix.js` (185 lines)
- `/js/play-bootstrap.js` (150 lines)
- `/SERVER_CONFIG.md` (Configuration guide)
- `/SMOKE_TEST.md` (Testing checklist)
- `/FIX38_README.md` (This file)

### Modified Files
- `/index.html` - Added script tags for hunter selection
- `/play.html` - Added play-bootstrap.js before game.min.js
- `/service-worker.js` - Network-first strategy, cache v38.0.0
- `/js/bt-fixes.js` - Already had necessary shims (no changes needed)

### Backup Files
- `/play.html.backup` - Original play.html before modifications

## Backward Compatibility

This fix maintains compatibility with:
- Existing localStorage keys
- Legacy `selectedCharacter` key
- Current game.js implementation
- Existing save data
- Browser bookmarks to play.html

## Performance Impact

**Positive**:
- Network-first for game.js ensures fresh code
- Cache-first for static assets improves load time
- Reduced JavaScript conflicts
- Better event handling

**Negligible**:
- Additional JavaScript files are small (<10KB each)
- Files load in parallel
- Minimal runtime overhead
- Service worker cache still available offline

## Security Considerations

- No sensitive data in localStorage
- All hunter IDs validated before use
- Query parameters sanitized and validated
- Service worker only caches same-origin resources
- Firebase scripts loaded from official CDN

## Future Improvements

Potential enhancements:
1. Server-side session storage for selections
2. Cloud save for cross-device persistence
3. GraphQL API for hunter data
4. WebSocket for real-time multiplayer selection
5. Progressive enhancement for older browsers

## Support

For issues:
1. Check [SMOKE_TEST.md](./SMOKE_TEST.md)
2. Review [SERVER_CONFIG.md](./SERVER_CONFIG.md)
3. Check browser console for errors
4. Verify localStorage values
5. Test with empty localStorage
6. Try incognito/private mode

## Version History

- **v38.0.0** (FIX38) - Initial release
  - Hunter selection system
  - Play bootstrap
  - Service worker improvements
  - Fallback mechanisms

## Credits

Developed as part of the BirdTurds game comprehensive restoration project.

## License

Part of BirdTurds game - © 2025 Dude.com - All Rights Reserved
