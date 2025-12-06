// play-fixes.js
// Full runtime fix + compatibility shim for play.html (authoritative version)
// - Fixes RegExp.lastIndex usage for ContentModerator
// - Robust quickSelectHunter: sets many localStorage keys + window flags
// - Delegated click handler for character cards
// - Removes duplicate external scripts
// - Modal accessibility & focus-trap helpers
// - Firebase defensive wrappers
// - Tractor/bot debounce helpers
// - Robust play-button guard + interception of the "Please choose your hunter first!" alert
//   - If the alert would block but a hunter is visibly selected, attempts to start the game by:
//     1) calling known start functions (playNow, startGame, launchGame, playGame, start)
//     2) replacing the play button with a cloned node (removes addEventListener handlers) and clicking it
// - Diagnostics: playFixes_isHunterDetected(), playFixes_forceSelect()
// Usage: drop into /js/play-fixes.js and include after your main scripts (defer) or just before </body>.

(function () {
  'use strict';
  var VERSION = 'play-fixes.js v2.0.0';

  // --- CSS.escape safe polyfill ---
  if (typeof CSS === 'undefined' || typeof CSS.escape !== 'function') {
    window.CSS = window.CSS || {};
    CSS.escape = CSS.escape || function (v) {
      return String(v).replace(/[^a-zA-Z0-9\-_]/g, function (c) { return '\\' + c; });
    };
  }

  // ---------- Helpers ----------
  function safe(fn) { try { return fn(); } catch (e) { return undefined; } }
  function resetLastIndexOnRegexArray(arr) {
    if (!Array.isArray(arr)) return;
    arr.forEach(function (r) {
      try { if (r && typeof r.lastIndex === 'number') r.lastIndex = 0; } catch (err) {}
    });
  }

  // ---------- 1) ContentModerator patch ----------
  (function patchContentModerator() {
    try {
      var CM = window.ContentModerator;
      if (!CM || typeof CM.validateContent !== 'function') {
        console.info('play-fixes:', VERSION, 'ContentModerator not present - skip regex patch');
        return;
      }
      var origValidate = CM.validateContent.bind(CM);
      CM.validateContent = function (text) {
        try {
          resetLastIndexOnRegexArray(this.emailPatterns);
          resetLastIndexOnRegexArray(this.phonePatterns);
          resetLastIndexOnRegexArray(this.socialPatterns);
          resetLastIndexOnRegexArray(this.thirdPartyContactPatterns);
          resetLastIndexOnRegexArray(this.hatefulPatterns);
          resetLastIndexOnRegexArray(this.blasphemyPatterns);
          resetLastIndexOnRegexArray(this.antiChristianPatterns);
          resetLastIndexOnRegexArray(this.encodedPatterns);
        } catch (e) {}
        var result = origValidate(text);
        try {
          resetLastIndexOnRegexArray(this.emailPatterns);
          resetLastIndexOnRegexArray(this.phonePatterns);
          resetLastIndexOnRegexArray(this.socialPatterns);
        } catch (e) {}
        return result;
      };
      console.info('play-fixes:', VERSION, 'Patched ContentModerator.validateContent');
    } catch (e) { console.warn('play-fixes: patchContentModerator error', e); }
  })();

  // ---------- LocalStorage compatibility ----------
  function setLocalKeysForHunter(id) {
    if (!id) return;
    try {
      var v = String(id).trim();
      localStorage.setItem('birdturds_character', v);
      localStorage.setItem('selected_hunter', v);
      localStorage.setItem('character', v);
      localStorage.setItem('current_hunter', v);
      localStorage.setItem('player_character', v.toLowerCase());
      localStorage.setItem('selectedCharacter', v);
      localStorage.setItem('selectedCharacterId', v);
    } catch (e) {}
  }
  function getAnyLocalHunter() {
    try {
      var keys = ['birdturds_character','selected_hunter','character','current_hunter','player_character','selectedCharacter','selectedCharacterId'];
      for (var i=0;i<keys.length;i++){
        var v = localStorage.getItem(keys[i]);
        if (v && String(v).trim().length>0) return v;
      }
    } catch(e){}
    return null;
  }

  // ---------- 2) quickSelectHunter robust ----------
  (function patchQuickSelectHunter() {
    function quickSelectHunterSafe(hunterId, el) {
      try {
        if (!hunterId) return;
        hunterId = String(hunterId).trim();
        setLocalKeysForHunter(hunterId);
        window.selectedHunter = hunterId;
        window.selectedCharacter = hunterId;
        window.hunterSelected = true;
        window.hunterSelectedOnStartScreen = true;
        window.pendingCharacter = hunterId;

        // Nice display mapping
        var names = { buck:'Buck', daisy:'Daisy', bubba:'Bubba', clyde:'Clyde', sierra:'Sierra', gunner:'Gunner', jolene:'Jolene', tammy:'Tammy' };
        var pretty = names[hunterId.toLowerCase()] || hunterId;
        var nameEl = document.getElementById('selected-char-name') || document.querySelector('.playing-as-name');
        if (nameEl) nameEl.textContent = pretty;

        var noWarn = document.getElementById('no-hunter-warning');
        var selectedMsg = document.getElementById('hunter-selected-msg');
        if (noWarn) noWarn.style.display = 'none';
        if (selectedMsg) selectedMsg.style.display = 'block';

        // Clear previous selection classes, then set on the matched card
        document.querySelectorAll('.hunter-mini, .char-card, .character-card, .character').forEach(function (n) { n.classList.remove('selected'); });

        var picked = null;
        if (el && el.classList) picked = el;
        if (!picked) picked = document.querySelector('[data-hunter="' + CSS.escape(hunterId) + '"]') || document.querySelector('[data-hunter="' + CSS.escape(hunterId.toLowerCase()) + '"]');
        if (!picked) {
          document.querySelectorAll('.char-card, .character-card, .hunter-mini, .character').forEach(function (c) {
            if (!picked && c.dataset && (c.dataset.char === hunterId || c.dataset.char === hunterId.toLowerCase())) picked = c;
            if (!picked && c.textContent && c.textContent.toLowerCase().indexOf(hunterId.toLowerCase()) !== -1) picked = c;
          });
        }
        if (picked) picked.classList.add('selected');

        // Enable play button visually
        var playBtn = document.getElementById('play-now-btn') || document.querySelector('.play-now, #playButton, button.play-now');
        if (playBtn) { playBtn.style.opacity = '1'; playBtn.style.pointerEvents = 'auto'; }

        // Try to set "Playing as:" text
        try {
          var playingTextNode = document.querySelector('#playing-as, .playing-as, .playing-as-text');
          if (playingTextNode) {
            var txt = playingTextNode.textContent || '';
            if (!/playing\s+as/i.test(txt)) playingTextNode.textContent = 'Playing as: ' + pretty;
          }
        } catch (e) {}

        console.log('play-fixes:', VERSION, 'quickSelectHunterSafe ->', hunterId);
      } catch (err) {
        console.error('play-fixes: quickSelectHunterSafe error', err);
      }
    }

    window.quickSelectHunter = quickSelectHunterSafe;

    document.addEventListener('click', function (ev) {
      try {
        var hm = ev.target.closest && ev.target.closest('.hunter-mini, .char-card, .character-card, .character');
        if (!hm) return;
        var id = (hm.dataset && (hm.dataset.hunter || hm.dataset.char)) || null;
        if (!id) {
          var onclick = hm.getAttribute && hm.getAttribute('onclick');
          if (onclick) {
            var m = onclick.match(/quickSelectHunter\(['"]?([\w\s-]+)['"]?\)/);
            if (m) id = m[1];
          }
        }
        if (id) { ev.preventDefault && ev.preventDefault(); window.quickSelectHunter(id, hm); }
      } catch (e) {}
    }, { passive: true });

    console.info('play-fixes:', VERSION, 'Installed quickSelectHunter');
  })();

  // ---------- 3) Remove duplicate external scripts ----------
  (function removeDuplicateExternalScripts() {
    function prune() {
      try {
        var scripts = Array.from(document.querySelectorAll('script[src]'));
        var seen = Object.create(null);
        scripts.forEach(function (s) {
          var src = s.getAttribute('src');
          if (!src) return;
          if (seen[src]) {
            try { s.parentNode && s.parentNode.removeChild(s); console.log('play-fixes: removed duplicate script', src); } catch (e) {}
          } else seen[src] = true;
        });
      } catch (e) {}
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prune);
    else prune();
  })();

  // ---------- 4) Modal accessibility ----------
  (function modalAccessibility() {
    var knownModalIds = ['auth-modal','shop-modal','store-modal','purchase-warning-modal','privacy-modal','terms-modal','character-modal','leaderboard-modal','multiplayer-modal','video-player-container'];
    function makeFocusable(node) {
      if (!node) return [];
      var focusable = node.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
      return Array.prototype.slice.call(focusable).filter(function (n) { return n.offsetParent !== null; });
    }
    function trapFocus(modal) {
      var focusable = makeFocusable(modal);
      if (!focusable || focusable.length === 0) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      var lastFocused = document.activeElement; try { first.focus(); } catch (e) {}
      function keyHandler(e) {
        if (e.key === 'Escape') { var closeBtn = modal.querySelector('button[onclick*="close"], button.modal-close, .modal-close'); if (closeBtn) closeBtn.click(); else modal.style.display='none'; }
        else if (e.key === 'Tab') {
          if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
          else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
        }
      }
      modal.__pfocusHandler = keyHandler;
      modal.addEventListener('keydown', keyHandler);
      modal.__prestore = function () { try { modal.removeEventListener('keydown', keyHandler); if (lastFocused && lastFocused.focus) lastFocused.focus(); } catch (e) {} };
    }
    function enhanceModal(modal) {
      if (!modal || modal.__penhanced) return;
      try {
        modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
        var h = modal.querySelector('h2,h1'); if (h) { if (!h.id) h.id = 'modal-title-'+Math.random().toString(36).slice(2,8); modal.setAttribute('aria-labelledby', h.id); }
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (m) {
            if (m.attributeName === 'style' || m.attributeName === 'class') {
              var displayed = window.getComputedStyle(modal).display !== 'none' && modal.offsetParent !== null;
              if (displayed && !modal.__pfocusHandler) trapFocus(modal);
              if (!displayed && modal.__prestore) modal.__prestore();
            }
          });
        });
        observer.observe(modal, { attributes: true, attributeFilter: ['style','class'] });
        modal.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var closeBtn = modal.querySelector('button[onclick*="close"], button.modal-close, .modal-close'); if (closeBtn) closeBtn.click(); else modal.style.display='none'; } });
        modal.__penhanced = true;
      } catch (e) {}
    }
    function enhanceKnown() { knownModalIds.forEach(function (id) { var el = document.getElementById(id); if (el) enhanceModal(el); }); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceKnown); else enhanceKnown();
    var bodyObs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) { m.addedNodes && m.addedNodes.forEach(function (n) { if (!(n instanceof Element)) return; if (n.classList.contains('modal') || (n.id && knownModalIds.indexOf(n.id) >= 0)) enhanceModal(n); }); });
    });
    try { bodyObs.observe(document.body, { childList: true, subtree: true }); } catch (e) {}
    console.info('play-fixes:', VERSION, 'Modal accessibility helpers installed');
  })();

  // ---------- 5) Firebase safe wrappers ----------
  (function firebaseSafeHelpers() {
    function safeCall(cb) {
      try {
        if (window.firebase && (window.firebase.firestore || window.firebase.database || window.firebase.auth)) { cb && cb(window.firebase); return true; }
        else { console.warn('play-fixes: firebase not available'); return false; }
      } catch (e) { console.error('play-fixes: safeCall error', e); return false; }
    }
    window.safeFirebaseCall = safeCall;
    var wrappers = ['loadUserData','getLeaderboard','loadApprovedContent','seedInitialData'];
    wrappers.forEach(function (fnName) {
      try {
        var orig = window[fnName];
        if (typeof orig === 'function') {
          window[fnName] = function () {
            var args = arguments;
            if (!safeCall(function () {})) { console.warn('play-fixes: ' + fnName + ' skipped (firebase unavailable)'); return Promise.resolve(null); }
            try { return orig.apply(this, args); } catch (e) { console.error('play-fixes: error calling ' + fnName, e); return Promise.reject(e); }
          };
        }
      } catch (e) {}
    });
    console.info('play-fixes:', VERSION, 'Firebase helpers installed');
  })();

  // ---------- 6) Tractor/bot debounce ----------
  (function tractorBotDebounce() {
    var names = ['handleTractorCollision','onTractorHit','tractorCollision','handleBadTractorHit'];
    names.forEach(function (name) {
      try {
        var fn = window[name];
        if (typeof fn === 'function') {
          var lastCalled = Object.create(null);
          window[name] = function (entityOrId) {
            try {
              var id = (entityOrId && (entityOrId.id || entityOrId._id)) || (typeof entityOrId === 'string' ? entityOrId : 'global');
              var now = Date.now();
              if (!lastCalled[id]) lastCalled[id] = 0;
              if (now - lastCalled[id] < 600) return;
              lastCalled[id] = now;
              return fn.apply(this, arguments);
            } catch (e) {
              try { return fn.apply(this, arguments); } catch (err) { console.error('play-fixes tractor wrapper error', err); }
            }
          };
          console.info('play-fixes:', VERSION, 'wrapped', name);
        }
      } catch (e) {}
    });
    window.registerDebouncedCollision = function (key, cb, debounceMs) {
      debounceMs = parseInt(debounceMs || 600, 10);
      if (!window.__pf_collision_times) window.__pf_collision_times = Object.create(null);
      var now = Date.now();
      if (!window.__pf_collision_times[key]) window.__pf_collision_times[key] = 0;
      if (now - window.__pf_collision_times[key] < debounceMs) return false;
      window.__pf_collision_times[key] = now;
      try { cb && cb(); } catch (e) { console.error('play-fixes: registerDebouncedCollision callback error', e); }
      return true;
    };
    console.info('play-fixes:', VERSION, 'Tractor debounce installed');
  })();

  // ---------- Utility: detect selection from DOM/text/global/localStorage ----------
  function isHunterSelectedFromDom() {
    try {
      if (document.querySelector('.char-card.selected, .character-card.selected, .hunter-mini.selected, .character.selected')) return true;
      var playText = document.querySelector('#playing-as, .playing-as, .playing-as-text, .playingAs, .playing-as-label');
      if (playText && /\bplaying\s+as\b/i.test(playText.textContent || '')) return true;
      var cb = document.querySelector('input[type="checkbox"][name="playing_as"], input#playing-as-checkbox, input.playing-as-checkbox');
      if (cb && cb.checked) return true;
      // look for "Playing as: Name" anywhere
      var all = document.querySelectorAll('body *');
      for (var i=0;i<all.length;i++){
        var t = all[i].textContent || '';
        if (/\bplaying\s+as[:\s\-–—]*[A-Za-z0-9\s'\-]+/i.test(t)) return true;
      }
    } catch (e) {}
    return false;
  }

  function anyHunterDetected() {
    try {
      if (window.selectedHunter || window.selectedCharacter || window.hunterSelected || window.pendingCharacter) return window.selectedHunter || window.selectedCharacter || window.pendingCharacter || true;
      var ls = getAnyLocalHunter();
      if (ls) return ls;
      if (isHunterSelectedFromDom()) return true;
    } catch (e) {}
    return false;
  }

  // ---------- 7) Play button guard but non-destructive + alert interception ----------
  (function guardPlayButtonAndAlertIntercept() {
    // Keep reference to original alert
    var originalAlert = window.alert;
    window.__playfix_original_alert = originalAlert;

    // Wrap alert to intercept the specific "Please choose your hunter first!" message
    window.alert = function (msg) {
      try {
        var text = (typeof msg === 'string' ? msg : (msg && msg.message) ? msg.message : String(msg || ''));
        if (/\bplease\s+choose\s+your\s+hunter\s+first\b/i.test(text)) {
          // Intercept — if we detect a selection, try to start the game instead of showing the alert
          if (anyHunterDetected()) {
            console.info('play-fixes:', VERSION, 'Intercepted "choose hunter" alert and attempting to start the game automatically');
            tryStartGameAfterIntercept();
            return;
          }
          // no selection -> show original alert
          return originalAlert.call(window, msg);
        } else {
          return originalAlert.call(window, msg);
        }
      } catch (e) {
        try { return originalAlert.call(window, msg); } catch (err) {}
      }
    };

    // Attempt to start game using several strategies:
    function tryStartGameAfterIntercept() {
      try {
        // Try known function names
        var attempts = ['playNow','startGame','launchGame','playGame','start','beginGame','initGame','begin'];
        for (var i=0;i<attempts.length;i++){
          var fn = window[attempts[i]];
          if (typeof fn === 'function') {
            try { fn(); console.info('play-fixes: called', attempts[i]); return; } catch (e) {}
          }
        }

        // If there is a button with inline onclick, replace the node with a clone (removes addEventListener handlers),
        // which preserves inline onclick attribute and allows it to run without other JS listeners blocking it.
        var playBtn = document.getElementById('play-now-btn') || document.querySelector('.play-now, #playButton, button.play-now');
        if (playBtn) {
          try {
            var parent = playBtn.parentNode;
            var clone = playBtn.cloneNode(true); // preserves attributes incl inline onclick
            // mark so our guard won't intercept the immediate dispatched click
            clone.setAttribute('data-playfix-clone', '1');
            // replace
            parent.replaceChild(clone, playBtn);
            // small delay then click
            setTimeout(function () {
              try {
                clone.focus && clone.focus();
                clone.click && clone.click();
                console.info('play-fixes: clicked cloned play button to bypass JS listeners');
              } catch (e) {
                console.error('play-fixes: click clone error', e);
              }
            }, 50);
            return;
          } catch (e) { console.warn('play-fixes: clone fallback failed', e); }
        }

        // As a last resort, dispatch a custom event that original code might listen for
        try {
          var evt = new CustomEvent('playnow', { bubbles: true, cancelable: true });
          (playBtn || document).dispatchEvent(evt);
          console.info('play-fixes: dispatched playnow event');
          return;
        } catch (e) {}
        // If all fails, show original alert as fallback
        originalAlert.call(window, 'Please choose your hunter first!');
      } catch (e) { originalAlert.call(window, 'Please choose your hunter first!'); }
    }

    // Add a light guard that displays a non-blocking notice instead of blocking; don't prevent default nav
    function ensureGuard() {
      var playBtn = document.getElementById('play-now-btn') || document.querySelector('.play-now, #playButton, button.play-now');
      if (!playBtn) return;
      if (playBtn.__pf_nonblocking) return;

      function handler(ev) {
        try {
          var selected = anyHunterDetected();
          if (!selected) {
            // don't call preventDefault so any inline handlers can still run; show a friendly toast/fallback alert
            var toast = document.querySelector('.app-notice, .toast-notice, .notification');
            if (toast) {
              toast.textContent = '🎯 Please choose your hunter first!';
              toast.style.display = 'block';
            } else {
              // use default alert (which we've overridden to allow auto-start if selection exists)
              window.__playfix_original_alert && window.__playfix_original_alert('Please choose your hunter first!');
            }
            // do not stop other handlers forcibly
            return;
          }
          // if selected, allow click to proceed normally
        } catch (e) {}
      }

      // add as non-capturing to let inline click handlers run first in many cases
      playBtn.addEventListener('click', handler, false);
      playBtn.__pf_nonblocking = true;
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureGuard);
    else ensureGuard();

    console.info('play-fixes:', VERSION, 'Alert interception and play guard installed');
  })();

  // ---------- 8) Auto-sync "Playing as:" text scanner ----------
  (function autoSyncPlayingAsText() {
    function scanAndSync() {
      try {
        var nodes = document.querySelectorAll('body *');
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          if (!n || !n.textContent) continue;
          var txt = n.textContent.trim();
          var m = txt.match(/playing\s+as[:\s\-–—]*([A-Za-z0-9\s'\-]+)/i);
          if (m && m[1]) {
            var name = m[1].trim();
            var id = name.toLowerCase().split(/\s+/)[0];
            setLocalKeysForHunter(id);
            window.selectedHunter = id;
            window.selectedCharacter = id;
            window.hunterSelected = true;
            console.info('play-fixes:', VERSION, 'Auto-synced hunter from "Playing as" text ->', id);
            return;
          }
        }
      } catch (e) {}
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { scanAndSync(); setTimeout(scanAndSync, 800); });
    } else { scanAndSync(); setTimeout(scanAndSync, 800); }
  })();

  // ---------- 9) Diagnostics ----------
  window.playFixes_isHunterDetected = function () {
    try {
      var ls = getAnyLocalHunter();
      if (ls) return { ok: true, source: 'localStorage', value: ls };
      if (document.querySelector('.char-card.selected, .character-card.selected, .hunter-mini.selected, .character.selected')) return { ok: true, source: 'dom' };
      var playText = document.querySelector('#playing-as, .playing-as, .playing-as-text');
      if (playText && /\bplaying as\b/i.test(playText.textContent || '')) return { ok: true, source: 'dom-text', value: (playText.textContent || '').trim() };
      if (window.selectedHunter || window.selectedCharacter) return { ok: true, source: 'global', value: window.selectedHunter || window.selectedCharacter };
      return { ok: false };
    } catch (e) { return { ok: false, err: String(e) }; }
  };

  window.playFixes_forceSelect = function (id) {
    try {
      if (!id) return false;
      window.quickSelectHunter && window.quickSelectHunter(id);
      setLocalKeysForHunter(id);
      window.selectedHunter = id;
      window.selectedCharacter = id;
      return true;
    } catch (e) { console.error('play-fixes: playFixes_forceSelect error', e); return false; }
  };

  // Auto-enable PLAY visually if selected
  (function enablePlayIfSelected() {
    function tryEnable() {
      try {
        var id = getAnyLocalHunter() || window.selectedHunter || window.selectedCharacter;
        if (!id) return;
        var playBtn = document.getElementById('play-now-btn') || document.querySelector('.play-now, #playButton, button.play-now');
        if (playBtn) { playBtn.style.opacity = '1'; playBtn.style.pointerEvents = 'auto'; }
      } catch (e) {}
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(tryEnable, 600); });
    else setTimeout(tryEnable, 600);
  })();

  console.info('play-fixes:', VERSION, 'loaded. Use playFixes_isHunterDetected() and playFixes_forceSelect(id) for debugging.');
})();