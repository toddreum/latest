/**
 * BIRDTURDS v43 - FIX38 COMPREHENSIVE RUNTIME FIXES
 * Applies ALL Copilot-recommended fixes permanently
 * 
 * FIXES:
 * 1. Event propagation & hunter selection protection
 * 2. Selection persistence & Play wiring  
 * 3. Stripe resilience (server-first + fallbacks)
 * 4. Mobile fixes (--vh, canvas scaling, touch controls)
 * 5. Video modal cleanup
 * 6. Phaser runtime patches (particles, vehicles, hunter body, audio, respawn)
 * 7. Layout & banner height computation
 * 8. Portrait outline cleanup
 */

(function btFullFixes() {
  'use strict';
  
  if (window.__bt_fixes_applied) {
    console.log('[BT-FIX38] Already applied');
    return;
  }
  window.__bt_fixes_applied = true;
  
  const log = (...args) => console.log('[BT-FIX38]', ...args);
  const warn = (...args) => console.warn('[BT-FIX38]', ...args);

  // ============================================================
  // CONFIGURATION
  // ============================================================
  
  const PROTECTED_SELECTORS = [
    '.hunter-card', '[data-hunter]', '.hunter-mini',
    '.difficulty-btn', '[data-difficulty]',
    '#diff-beginner', '#diff-intermediate', '#diff-advanced',
    '.multiplayer-btn', '.download-btn', '[data-download]',
    '#controls-toggle', '.controls-toggle', '#controls-close', '.controls-close',
    '#close-controls-btn', '.header-btn', '.modal-close',
    '.item-block', '.character-block', '.char-card',
    '#choose-char-btn', '#play-now-btn', '.play-btn', '#play-btn',
    'button', 'input', 'select', 'a[href]',
    '.shop-btn', '.buy-btn', '[data-price-id]'
  ];
  
  const STARTER_SELECTORS = [
    '.start-btn', '#startGame', '.solo-bots', 
    '[data-action="start"]', '.play-now'
  ];
  
  const OUTLINE_OFFSETS = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
  const PALE_BG_VALUES = ['rgb(135, 203, 232)', 'rgb(135,203,232)', 'rgba(135,203,232,1)', '#87cbe8', '#87CEFA'];

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================
  
  function isEl(n) { return n && n.nodeType === 1; }
  
  function anyAncestorMatch(el, selectors) {
    if (!el) return false;
    try { 
      for (const s of selectors) {
        if (el.closest && el.closest(s)) return true;
      }
    } catch(e) {}
    return false;
  }

  // ============================================================
  // 1. INJECT CSS FIXES
  // ============================================================
  
  (function injectCSS() {
    if (document.getElementById('bt-fix38-css')) return;
    
    const css = `
      /* BT-FIX38 CSS */
      :root { 
        --bt-vh: 1vh; 
        --bt-banner-safe: 80px;
        --bt-selection-color: #22c55e;
      }
      
      /* Dark background overrides - fix pale-blue */
      #game-shell, .game-shell, #game-container, #phaser-game {
        background: linear-gradient(180deg, #041021, #061322) !important;
      }
      
      /* Page padding */
      #page, body > .container { 
        padding-bottom: var(--bt-banner-safe) !important; 
        box-sizing: border-box; 
      }
      
      /* Hunter card selection */
      .hunter-mini.selected, .hunter-card.selected, .char-card.selected {
        border: 3px solid var(--bt-selection-color) !important;
        box-shadow: 0 0 15px rgba(34, 197, 94, 0.5) !important;
        background: linear-gradient(135deg, #22c55e, #16a34a) !important;
      }
      
      /* Difficulty button selection */  
      .difficulty-btn.selected, [data-difficulty].selected {
        border: 2px solid #ffd700 !important;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.5) !important;
      }
      
      /* Mobile on-screen controls */
      #bt-mobile-controls {
        position: fixed;
        left: 12px;
        bottom: 84px;
        z-index: 2147483647;
        display: flex;
        gap: 10px;
        pointer-events: none;
      }
      
      .bt-btn-mobile {
        pointer-events: auto;
        width: 60px;
        height: 60px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        border: 2px solid rgba(255, 255, 255, 0.25);
        color: #fff;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
      
      .bt-btn-mobile:active {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0.95);
      }
      
      @media (max-width: 400px) {
        .bt-btn-mobile {
          width: 50px;
          height: 50px;
          font-size: 20px;
        }
        #bt-mobile-controls {
          gap: 6px;
          bottom: 70px;
        }
      }
      
      /* Hide debug/spacer elements */
      .bt-hidden-by-btf { display: none !important; }
      .bt-trim-spacing { padding-bottom: 12px !important; margin-bottom: 12px !important; }
      
      /* Portrait fixes */
      .portrait.outline-sim img, .h-portrait img { 
        filter: none !important; 
      }
      
      /* Video modal */
      #video-player-container {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 100000;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      #video-player-container.active,
      #video-player-container[style*="display: block"] {
        display: flex !important;
      }
      
      @media (max-width: 600px) {
        .portrait { width: 86px !important; height: 86px !important; }
      }
    `;
    
    const style = document.createElement('style');
    style.id = 'bt-fix38-css';
    style.textContent = css;
    document.head.appendChild(style);
    log('CSS fixes injected');
  })();

  // ============================================================
  // 2. MOBILE VIEWPORT (--vh) FIX
  // ============================================================
  
  (function setVh() {
    function apply() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--bt-vh', `${vh}px`);
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', apply);
    apply();
    log('Viewport --vh set');
  })();

  // ============================================================
  // 3. EVENT PROPAGATION & SELECTION PROTECTION
  // ============================================================
  
  function stopPropagationHandler(ev) {
    try {
      // Allow explicit start buttons to bubble
      if (anyAncestorMatch(ev.target, STARTER_SELECTORS)) return;
      
      // Block propagation for protected UI elements
      if (anyAncestorMatch(ev.target, PROTECTED_SELECTORS)) {
        ev.stopPropagation();
        
        // Neutralize empty/fragment anchors
        const t = ev.target;
        if (t && t.tagName === 'A') {
          const href = t.getAttribute('href') || '';
          if (href === '' || href.startsWith('#')) {
            ev.preventDefault();
          }
        }
      }
    } catch(e) {}
  }
  
  document.addEventListener('pointerdown', stopPropagationHandler, true);
  document.addEventListener('click', stopPropagationHandler, true);
  document.addEventListener('touchstart', stopPropagationHandler, { capture: true, passive: false });
  
  function neutralizeAnchors(root = document) {
    try {
      const anchors = root.querySelectorAll ? root.querySelectorAll('a[href^="#"], a[href=""]') : [];
      anchors.forEach(a => {
        try {
          if (anyAncestorMatch(a, PROTECTED_SELECTORS)) {
            if (!a.dataset._bt_orig_href) {
              a.dataset._bt_orig_href = a.getAttribute('href') || '';
            }
            a.setAttribute('href', 'javascript:void(0)');
            if (!a._bt_anchor_patched) {
              a.addEventListener('click', ev => {
                ev.preventDefault();
                ev.stopPropagation();
              }, { passive: false });
              a._bt_anchor_patched = true;
            }
          }
        } catch(e) {}
      });
    } catch(e) {}
  }
  
  neutralizeAnchors(document);
  new MutationObserver(muts => {
    muts.forEach(m => {
      Array.from(m.addedNodes || []).forEach(n => {
        if (isEl(n)) neutralizeAnchors(n);
      });
    });
  }).observe(document.documentElement || document.body, { childList: true, subtree: true });
  
  log('Event propagation protection enabled');

  // ============================================================
  // 4. SELECTION PERSISTENCE & PLAY WIRING
  // ============================================================
  
  // Canonical state storage
  window.btState = window.btState || {};
  window.btState.currentHunter = window.btState.currentHunter || localStorage.getItem('birdturds_character') || null;
  window.btState.currentDifficulty = window.btState.currentDifficulty || localStorage.getItem('birdturds_difficulty') || 'intermediate';
  
  // Also set on window for compatibility
  window.currentHunter = window.btState.currentHunter;
  window.currentDifficulty = window.btState.currentDifficulty;
  
  function setSelectedHunter(id, cardEl) {
    try {
      window.btState.currentHunter = id;
      window.currentHunter = id;
      localStorage.setItem('birdturds_character', id);
      
      // Update UI - remove selected from all cards
      document.querySelectorAll('.hunter-mini, .hunter-card, .char-card, [data-hunter]').forEach(c => {
        c.classList.remove('selected');
      });
      
      // Add selected to clicked card
      if (cardEl) {
        cardEl.classList.add('selected');
      }
      
      // Update selected name display
      const nameEl = cardEl && cardEl.querySelector ? cardEl.querySelector('.h-name, .char-name') : null;
      const selectedName = document.getElementById('selected-name') || document.getElementById('selected-char-name');
      if (selectedName) {
        selectedName.textContent = (nameEl && nameEl.textContent) 
          ? nameEl.textContent.toUpperCase() 
          : (id || '').toUpperCase();
      }
      
      // Update preview image
      const previewImg = document.getElementById('selected-char-img');
      if (previewImg) {
        previewImg.src = `/sprites/characters/${id}_idle.png`;
      }
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('hunterSelected', { detail: { id } }));
      
      log('Hunter selected:', id);
    } catch(e) { 
      warn('setSelectedHunter error:', e); 
    }
  }
  
  function setDifficulty(diff, btnEl) {
    try {
      window.btState.currentDifficulty = diff;
      window.currentDifficulty = diff;
      localStorage.setItem('birdturds_difficulty', diff);
      
      // Update UI
      document.querySelectorAll('.difficulty-btn, [data-difficulty]').forEach(b => {
        b.classList.remove('selected');
        b.style.border = '2px solid transparent';
        b.style.boxShadow = 'none';
      });
      
      if (btnEl) {
        btnEl.classList.add('selected');
        btnEl.style.border = '2px solid #ffd700';
        btnEl.style.boxShadow = '0 0 20px rgba(255,215,0,0.5)';
      }
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('difficultySelected', { detail: { difficulty: diff } }));
      
      log('Difficulty selected:', diff);
    } catch(e) { 
      warn('setDifficulty error:', e); 
    }
  }
  
  // Make functions globally available
  window.setSelectedHunter = setSelectedHunter;
  window.setDifficulty = setDifficulty;
  
  // Delegated click handlers for cards and difficulty
  document.addEventListener('click', function delegatedHandler(ev) {
    try {
      // Hunter card click
      const card = ev.target.closest ? ev.target.closest('.hunter-mini, .hunter-card, .char-card, [data-hunter]') : null;
      if (card) {
        ev.preventDefault();
        ev.stopPropagation();
        const id = card.dataset.hunter || card.getAttribute('data-hunter') || card.dataset.char || null;
        if (id) {
          setSelectedHunter(id, card);
        }
        return;
      }
      
      // Difficulty button click
      const diffBtn = ev.target.closest ? ev.target.closest('[data-difficulty], .difficulty-btn') : null;
      if (diffBtn) {
        ev.preventDefault();
        ev.stopPropagation();
        const d = diffBtn.dataset.difficulty || diffBtn.id.replace('diff-', '') || (diffBtn.textContent && diffBtn.textContent.trim().toLowerCase());
        if (d) {
          setDifficulty(d, diffBtn);
        }
        return;
      }
    } catch(e) { 
      warn('delegated click error:', e); 
    }
  }, false);
  
  // Wire Play buttons
  function startGameFallback(hunter, difficulty) {
    try {
      // Try existing startGame function
      if (typeof window.startGame === 'function') {
        window.startGame(hunter, difficulty);
        return true;
      }
      
      // Try initGame
      if (typeof window.initGame === 'function') {
        window.initGame({ character: hunter, difficulty: difficulty });
        return true;
      }
      
      // Try hideStartScreen
      if (typeof window.hideStartScreen === 'function') {
        window.hideStartScreen();
      }
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('requestStartGame', { 
        detail: { character: hunter, difficulty: difficulty } 
      }));
      
      // Try clicking existing start button
      const startBtn = document.querySelector('.start-btn, #startGame, .btn-play, .play-now');
      if (startBtn) {
        startBtn.click();
        return true;
      }
    } catch(e) { 
      warn('startGameFallback error:', e); 
    }
    return false;
  }
  
  function wirePlayButtons() {
    const selectors = ['#play-now-btn', '#play-btn', '.play-btn', '.btn-play', '.start-btn', '#startGame', '.play-now'];
    
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(btn => {
        if (btn._bt_play_wired) return;
        btn._bt_play_wired = true;
        
        btn.addEventListener('click', ev => {
          try {
            ev.preventDefault();
            ev.stopPropagation();
            
            const hunter = window.btState.currentHunter || localStorage.getItem('birdturds_character') || null;
            const diff = window.btState.currentDifficulty || localStorage.getItem('birdturds_difficulty') || 'intermediate';
            
            if (!hunter) {
              alert('Please choose a hunter before playing!');
              return;
            }
            
            log('Starting game with:', hunter, diff);
            
            const ok = startGameFallback(hunter, diff);
            if (!ok) {
              warn('Unable to start game automatically');
            }
          } catch(e) { 
            warn('play click error:', e); 
          }
        }, { passive: false });
      });
    });
  }
  
  wirePlayButtons();
  new MutationObserver(m => {
    m.forEach(mut => {
      Array.from(mut.addedNodes || []).forEach(n => {
        if (isEl(n)) wirePlayButtons();
      });
    });
  }).observe(document.documentElement || document.body, { childList: true, subtree: true });
  
  log('Selection persistence & Play wiring enabled');

  // ============================================================
  // 5. STRIPE RESILIENCE
  // ============================================================
  
  (function stripeResilience() {
    async function loadStripe(timeout = 6000) {
      if (window.Stripe) return true;
      
      if (document.querySelector('script[src*="js.stripe.com"]')) {
        await new Promise(r => setTimeout(r, 400));
        return !!window.Stripe;
      }
      
      return new Promise(resolve => {
        const s = document.createElement('script');
        s.src = 'https://js.stripe.com/v3/';
        s.async = true;
        s.onload = () => resolve(!!window.Stripe);
        s.onerror = () => resolve(false);
        document.head.appendChild(s);
        setTimeout(() => resolve(!!window.Stripe), timeout);
      });
    }
    
    async function handleBuy(evt) {
      evt && evt.preventDefault && evt.preventDefault();
      
      const btn = evt.currentTarget || evt.target;
      if (!btn) return;
      if (btn._bt_processing) return;
      
      btn._bt_processing = true;
      const originalText = btn.textContent;
      btn.textContent = 'Processing...';
      
      const priceId = btn.dataset.priceId || btn.dataset.priceid || btn.getAttribute('data-price-id');
      const fallbackUrl = btn.dataset.fallbackUrl || btn.href || null;
      
      try {
        // 1) Try server endpoints first (works even if Stripe.js blocked)
        const endpoints = [
          '/api/create-checkout-session',
          '/create-checkout-session.php',
          '/create-checkout-session'
        ];
        
        for (const ep of endpoints) {
          try {
            const r = await fetch(ep, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ priceId })
            });
            
            if (r && r.ok) {
              const j = await r.json();
              
              // Server returns URL - just redirect
              if (j.checkoutUrl || j.url) {
                window.location.href = j.checkoutUrl || j.url;
                btn._bt_processing = false;
                return;
              }
              
              // Server returns sessionId - use Stripe.js if available
              if (j.sessionId && j.publishableKey) {
                await loadStripe(3000);
                if (window.Stripe) {
                  const stripe = window.Stripe(j.publishableKey);
                  await stripe.redirectToCheckout({ sessionId: j.sessionId });
                  btn._bt_processing = false;
                  return;
                }
              }
            }
          } catch(e) {
            warn('Server endpoint failed:', ep, e);
          }
        }
        
        // 2) Try client-only Stripe
        const stripeLoaded = await loadStripe(4000);
        const pubKey = window.STRIPE_PUBLISHABLE_KEY || window.stripePublishableKey;
        
        if (stripeLoaded && window.Stripe && pubKey) {
          try {
            const stripe = window.Stripe(pubKey);
            await stripe.redirectToCheckout({
              lineItems: [{ price: priceId, quantity: 1 }],
              mode: 'payment',
              successUrl: window.location.href,
              cancelUrl: window.location.href
            });
            btn._bt_processing = false;
            return;
          } catch(e) {
            warn('Client redirect failed:', e);
          }
        }
        
        // 3) Try fallback URL
        if (fallbackUrl) {
          window.open(fallbackUrl, '_blank');
          btn._bt_processing = false;
          return;
        }
        
        // 4) Final fallback - inform user
        alert('Payment service unavailable. Please disable ad-blocking for this site or contact support.');
        
      } catch(e) {
        warn('handleBuy error:', e);
        alert('Payment error. Please try again.');
      } finally {
        btn.textContent = originalText;
        btn._bt_processing = false;
      }
    }
    
    function wireBuyButtons() {
      const selector = 'button.buy-now, .buy-btn, [data-price-id], [data-priceid]';
      
      function attach(node) {
        if (!node) return;
        const list = node.matches && node.matches(selector) 
          ? [node] 
          : Array.from(node.querySelectorAll ? node.querySelectorAll(selector) : []);
        
        list.forEach(b => {
          if (!b._bt_buy_wired) {
            b.addEventListener('click', handleBuy);
            b._bt_buy_wired = true;
          }
        });
      }
      
      attach(document);
      new MutationObserver(muts => {
        muts.forEach(m => {
          Array.from(m.addedNodes || []).forEach(n => {
            if (isEl(n)) attach(n);
          });
        });
      }).observe(document.body || document.documentElement, { childList: true, subtree: true });
    }
    
    loadStripe(1500).catch(() => {});
    wireBuyButtons();
    
    window.btStripeResilience = { loadStripe, wireBuyButtons };
    log('Stripe resilience enabled');
  })();

  // ============================================================
  // 6. VIDEO MODAL CLEANUP
  // ============================================================
  
  (function videoFallback() {
    function closeVideo() {
      const container = document.getElementById('video-player-container');
      if (!container) return;
      
      const iframe = container.querySelector('iframe');
      if (iframe) {
        iframe.src = ''; // Clear to stop playback
      }
      
      container.style.display = 'none';
      container.classList.remove('active');
    }
    
    // Wire close buttons
    document.querySelectorAll('#video-close-btn, .video-close, .close-video, [onclick*="closeVideoPlayer"]').forEach(btn => {
      if (btn._bt_vid) return;
      btn._bt_vid = true;
      btn.addEventListener('click', closeVideo, { passive: true });
    });
    
    // Click overlay to close
    const container = document.getElementById('video-player-container');
    if (container && !container._bt_click) {
      container._bt_click = true;
      container.addEventListener('click', e => {
        if (e.target === container) closeVideo();
      }, { passive: true });
    }
    
    // Learn button fallback
    const learnKeywords = ['learn about jesus', 'learn about', 'how to be saved', 'salvation'];
    
    function handleLearnClick(e) {
      e && e.preventDefault && e.preventDefault();
      e && e.stopPropagation && e.stopPropagation();
      
      // Try existing showVideoPlayer
      if (typeof window.showVideoPlayer === 'function') {
        try {
          window.showVideoPlayer('salvation');
          return;
        } catch(err) {
          warn('showVideoPlayer failed:', err);
        }
      }
      
      // Fallback to YouTube embed
      const iframe = document.getElementById('video-iframe') || 
                     document.querySelector('#video-player-container iframe');
      
      if (iframe) {
        const lib = window.videoLibrary || null;
        const videoId = (lib && lib.salvation && lib.salvation.videoId) 
          ? lib.salvation.videoId 
          : 'rcJ4OCWZHTI'; // Default Pastor Jack Hibbs
        
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        
        const container = document.getElementById('video-player-container');
        if (container) container.style.display = 'block';
        return;
      }
      
      // Final fallback - open YouTube
      const lib = window.videoLibrary || null;
      const videoId = (lib && lib.salvation && lib.salvation.videoId) || 'rcJ4OCWZHTI';
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
    
    function attachLearnHandlers() {
      document.querySelectorAll('button, a, [role="button"], .video-btn').forEach(el => {
        try {
          const t = (el.textContent || '').toLowerCase();
          if (learnKeywords.some(k => t.includes(k)) && !el._bt_learn) {
            el._bt_learn = true;
            el.addEventListener('click', handleLearnClick, { passive: false });
          }
        } catch(e) {}
      });
    }
    
    attachLearnHandlers();
    new MutationObserver(attachLearnHandlers).observe(document.body || document.documentElement, { childList: true, subtree: true });
    
    window.btCloseVideo = closeVideo;
    log('Video modal cleanup enabled');
  })();

  // ============================================================
  // 7. MOBILE ON-SCREEN CONTROLS
  // ============================================================
  
  (function injectMobileControls() {
    // Only on touch devices
    if (!('ontouchstart' in window) && navigator.maxTouchPoints <= 0) return;
    
    // Don't duplicate
    if (document.getElementById('bt-mobile-controls')) return;
    
    const container = document.createElement('div');
    container.id = 'bt-mobile-controls';
    container.innerHTML = `
      <button class="bt-btn-mobile" data-key="ArrowLeft">◀</button>
      <button class="bt-btn-mobile" data-key="ArrowUp">▲</button>
      <button class="bt-btn-mobile" data-key="Space">🎯</button>
      <button class="bt-btn-mobile" data-key="ArrowRight">▶</button>
    `;
    
    document.body.appendChild(container);
    
    // Synthesize keyboard events
    container.querySelectorAll('.bt-btn-mobile').forEach(btn => {
      const keyCode = btn.dataset.key;
      
      const keyCodeMap = {
        'Space': 32,
        'ArrowLeft': 37,
        'ArrowUp': 38,
        'ArrowRight': 39,
        'ArrowDown': 40
      };
      
      const fireKey = (type) => {
        const ev = new KeyboardEvent(type, {
          key: keyCode,
          code: keyCode,
          keyCode: keyCodeMap[keyCode] || 0,
          which: keyCodeMap[keyCode] || 0,
          bubbles: true,
          cancelable: true
        });
        document.dispatchEvent(ev);
        window.dispatchEvent(ev);
      };
      
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        fireKey('keydown');
      }, { passive: false });
      
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        fireKey('keyup');
      }, { passive: false });
      
      btn.addEventListener('mousedown', () => fireKey('keydown'));
      btn.addEventListener('mouseup', () => fireKey('keyup'));
    });
    
    log('Mobile controls injected');
  })();

  // ============================================================
  // 8. PHASER RUNTIME PATCHES
  // ============================================================
  
  (function phaserPatches() {
    
    function interceptDestroy() {
      try {
        if (!window.Phaser || !Phaser.GameObjects || !Phaser.GameObjects.GameObject) return;
        
        const orig = Phaser.GameObjects.GameObject.prototype.destroy;
        if (orig && orig._btIntercepted) return;
        
        Phaser.GameObjects.GameObject.prototype.destroy = function() {
          try {
            const tex = (this.texture && this.texture.key) ? String(this.texture.key).toLowerCase() : '';
            const nm = (this.name || '').toLowerCase();
            
            // Check if this is a hunter sprite
            const hunterPatterns = /buck|daisy|bubba|clyde|gunner|jolene|sierra|tammy|hunter|player/;
            const isHunter = hunterPatterns.test(tex + '|' + nm) || this._isPlayerSprite === true;
            
            if (isHunter) {
              const scene = this.scene;
              
              // Try respawn instead of destroy
              if (scene && typeof scene.btRespawnHunter === 'function') {
                scene.btRespawnHunter(this);
                return;
              }
              
              // Fallback: just hide/disable
              try {
                this.setActive(false);
                this.setVisible(false);
                if (this.body) this.body.enable = false;
              } catch(e) {}
              return;
            }
          } catch(e) {}
          
          // Normal destroy for non-hunters
          return orig.apply(this, arguments);
        };
        
        Phaser.GameObjects.GameObject.prototype.destroy._btIntercepted = true;
        log('Phaser destroy intercept installed');
      } catch(e) {
        warn('interceptDestroy error:', e);
      }
    }
    
    function patchScene(scene) {
      if (!scene || scene._btScenePatched) return;
      scene._btScenePatched = true;
      
      // Initialize vehicles group
      try {
        if (!scene.vehicles && scene.physics && scene.physics.add) {
          scene.vehicles = scene.physics.add.group();
        }
      } catch(e) {}
      
      // Particle tracking
      scene._bt_particles = scene._bt_particles || { managers: [], emitters: [] };
      
      scene.btRegisterParticle = function(mgr, em) {
        if (mgr && !this._bt_particles.managers.includes(mgr)) {
          this._bt_particles.managers.push(mgr);
        }
        if (em && !this._bt_particles.emitters.includes(em)) {
          this._bt_particles.emitters.push(em);
        }
      };
      
      scene.btClearParticles = function() {
        try {
          (this._bt_particles.emitters || []).forEach(e => {
            try { e.on = false; e.stop(); } catch(err) {}
          });
          (this._bt_particles.managers || []).forEach(m => {
            try { m.destroy(); } catch(err) {}
          });
          this._bt_particles.managers = [];
          this._bt_particles.emitters = [];
        } catch(e) {}
      };
      
      // Auto-cleanup on shutdown
      scene.events && scene.events.on && scene.events.on('shutdown', () => {
        try { scene.btClearParticles(); } catch(e) {}
        try { scene.btStopFiring && scene.btStopFiring(); } catch(e) {}
      });
      
      // Safe vehicle spawner
      scene.spawnVehicleSafe = scene.spawnVehicleSafe || function(opts = {}) {
        try {
          const key = opts.key || opts.texture || (opts.good ? 'tractor_green_spritesheet' : 'tractor_red_spritesheet');
          const fromLeft = opts.fromLeft !== false;
          const x = opts.x ?? (fromLeft ? -300 : scene.scale.width + 300);
          const y = opts.y ?? (scene.groundY || scene.scale.height - 120);
          
          const v = scene.physics.add.sprite(x, y, key, opts.frame || 0);
          v.setScale(opts.scale ?? 0.85);
          v.setDepth(opts.depth ?? 40);
          v._btVehicle = true;
          
          // Set physics body
          if (v.body) {
            v.body.setAllowGravity(true);
            v.body.setCollideWorldBounds(true);
            v.body.setImmovable(false);
            v.body.setSize(Math.round(v.width * 0.75), Math.round(v.height * 0.55));
            v.body.setOffset(Math.round(v.width * 0.12), Math.round(v.height * 0.45));
          }
          
          // Create animation if missing
          const animKey = opts.animKey || (opts.good ? 'tractor_green_drive' : 'tractor_red_drive');
          if (scene.anims && !scene.anims.exists(animKey) && scene.textures && scene.textures.exists(key)) {
            try {
              const frames = scene.anims.generateFrameNumbers(key, { start: 0, end: 5 });
              if (frames && frames.length) {
                scene.anims.create({ key: animKey, frames, frameRate: 10, repeat: -1 });
              }
            } catch(e) {}
          }
          
          // Play animation
          try { v.play(animKey); } catch(e) {}
          
          // Set velocity
          const speed = opts.speed ?? 180;
          v.setVelocityX(fromLeft ? speed : -speed);
          if (!fromLeft) v.setFlipX(true);
          
          // Add to vehicles group
          scene.vehicles && scene.vehicles.add && scene.vehicles.add(v);
          
          // Collide with ground
          try {
            if (scene.groundLayer) {
              scene.physics.add.collider(v, scene.groundLayer);
            }
          } catch(e) {}
          
          // Cleanup when offscreen
          const cleanup = () => {
            if (!v.active) {
              scene.events.off('update', cleanup);
              return;
            }
            if (v.x < -900 || v.x > scene.scale.width + 900) {
              try { v.destroy(); } catch(e) {}
              scene.events.off('update', cleanup);
            }
          };
          scene.events && scene.events.on && scene.events.on('update', cleanup);
          
          return v;
        } catch(e) {
          warn('spawnVehicleSafe error:', e);
          return null;
        }
      };
      
      // Hunter body tuning
      function adjustHunterBody(h) {
        try {
          if (!h || !h.body || h._btBodyAdj) return;
          
          const w = h.width || 64;
          const ht = h.height || 128;
          
          h.body.setSize(Math.round(w * 0.5), Math.round(ht * 0.6));
          h.body.setOffset(Math.round(w * 0.22), Math.round(ht * 0.30));
          h._btBodyAdj = true;
          h._isPlayerSprite = true;
        } catch(e) {}
      }
      
      // Apply to existing hunter
      try {
        if (scene.hunter) adjustHunterBody(scene.hunter);
        if (scene.player) adjustHunterBody(scene.player);
      } catch(e) {}
      
      // Watch for hunter creation
      if (!scene._btHunterWatcher) {
        scene._btHunterWatcher = true;
        scene.events && scene.events.on && scene.events.on('update', () => {
          try {
            const h = scene.hunter || scene.player || scene.hunterSprite;
            if (h && h.body && !h._btBodyAdj) adjustHunterBody(h);
          } catch(e) {}
        });
      }
      
      // Audio guard for gun
      scene._btGunLoop = null;
      
      scene.btStartFiring = function(isAuto) {
        try {
          if (isAuto) {
            if (!this._btGunLoop && this.sound && this.sound.add) {
              this._btGunLoop = this.sound.add('gun_auto', { loop: true, volume: 0.75 });
              this._btGunLoop.play();
            }
          } else {
            this.sound && this.sound.play && this.sound.play('gun_single', { volume: 0.95 });
          }
        } catch(e) {}
      };
      
      scene.btStopFiring = function() {
        try {
          if (this._btGunLoop) {
            this._btGunLoop.stop();
            this._btGunLoop.destroy();
            this._btGunLoop = null;
          }
        } catch(e) {}
      };
      
      // Hunter respawn
      scene.btRespawnHunter = function(h, px, py) {
        try {
          if (!h) return;
          
          const x = px ?? (scene.scale.width / 2);
          const y = py ?? (scene.groundY || scene.scale.height - 150);
          
          h.setActive(true);
          h.setVisible(true);
          
          if (h.body) {
            h.body.enable = true;
            h.body.reset(x, y);
            h.body.setVelocity(0, 0);
          } else {
            h.setPosition(x, y);
          }
          
          h.clearTint && h.clearTint();
          h.hp = h.maxHp || 100;
          
          // Brief invulnerability
          h.setAlpha(0.5);
          scene.time.delayedCall(1500, () => {
            if (h && h.active) h.setAlpha(1);
          });
          
          log('Hunter respawned');
        } catch(e) {}
      };
      
      // Hunter hit handler
      scene.btOnHunterHit = function(h, dmg) {
        try {
          if (!h || !h.active) return;
          
          h.hp = h.hp ?? (h.maxHp ?? 100);
          h.hp -= (dmg || 50);
          
          h.setTint && h.setTint(0xff9999);
          if (h.body) h.body.enable = false;
          
          scene.time.delayedCall(500, () => {
            if (h.body) h.body.enable = true;
            h.clearTint && h.clearTint();
          });
          
          if (h.hp <= 0) {
            try { h.play && h.play('hunter_death_anim'); } catch(e) {}
            scene.time.delayedCall(800, () => scene.btRespawnHunter(h));
          }
        } catch(e) {}
      };
    }
    
    function patchWhenReady() {
      const g = window.game || window.gameInstance;
      
      if (!g || !g.scene) {
        let waited = 0;
        const interval = setInterval(() => {
          const game = window.game || window.gameInstance;
          if (game && game.scene && game.scene.scenes && game.scene.scenes.length) {
            clearInterval(interval);
            try {
              game.scene.scenes.forEach(s => patchScene(s));
            } catch(e) {}
            
            // Watch for new scenes
            game.scene.events && game.scene.events.on && game.scene.events.on('added', key => {
              const s = game.scene.getScene(key);
              patchScene(s);
            });
          }
          waited += 200;
          if (waited > 15000) clearInterval(interval);
        }, 200);
        return;
      }
      
      try {
        g.scene.scenes.forEach(s => patchScene(s));
      } catch(e) {
        warn('patchAllScenes error:', e);
      }
      
      // Watch for new scenes
      g.scene.events && g.scene.events.on && g.scene.events.on('added', key => {
        const s = g.scene.getScene(key);
        patchScene(s);
      });
    }
    
    interceptDestroy();
    patchWhenReady();
    
    window.btPhaserHelpers = { interceptDestroy, patchWhenReady };
    log('Phaser patches installed');
  })();

  // ============================================================
  // 9. CLEANUP OVERLAYS & PALE-BLUE BACKGROUNDS
  // ============================================================
  
  (function cleanupOverlays() {
    try {
      // Replace pale-blue backgrounds
      let replaced = 0;
      document.querySelectorAll('div, section, #game-shell, #game-container').forEach(el => {
        try {
          const st = window.getComputedStyle(el);
          const bg = (st.backgroundColor || '').replace(/\s/g, '');
          
          if (PALE_BG_VALUES.some(v => bg.includes(v.replace(/\s/g, ''))) || 
              (st.background && st.background.toLowerCase().includes('#87cbe8'))) {
            el.style.background = 'linear-gradient(180deg, #041021, #061322)';
            replaced++;
          }
        } catch(e) {}
      });
      
      if (replaced) log('Replaced pale-blue backgrounds on', replaced, 'elements');
      
    } catch(e) {
      warn('cleanupOverlays error:', e);
    }
  })();

  // ============================================================
  // 10. BANNER HEIGHT COMPUTATION
  // ============================================================
  
  (function computeBannerHeight() {
    const banner = document.getElementById('germproof-wrap') || 
                   document.querySelector('.sponsor-banner') ||
                   document.querySelector('.germproof-banner') ||
                   document.querySelector('[class*="banner"]');
    
    if (banner) {
      const h = Math.ceil(banner.getBoundingClientRect().height || 0);
      const safeHeight = Math.max(h + 12, 80);
      document.documentElement.style.setProperty('--bt-banner-safe', safeHeight + 'px');
      
      const page = document.getElementById('page') || document.body;
      page.style.paddingBottom = safeHeight + 'px';
      
      log('Banner height computed:', safeHeight);
    }
  })();

  // ============================================================
  // 11. RESIZE GAME CANVAS
  // ============================================================
  
  function resizeGameCanvas() {
    const game = window.game || window.gameInstance;
    if (game && game.scale && typeof game.scale.resize === 'function') {
      const w = window.innerWidth;
      const h = window.innerHeight;
      game.scale.resize(w, h);
    }
  }
  
  window.addEventListener('resize', resizeGameCanvas);
  setTimeout(resizeGameCanvas, 1000);

  // ============================================================
  // 12. EXPOSE API
  // ============================================================
  
  window.btFix38 = {
    version: 'FIX38',
    reapply() {
      try {
        neutralizeAnchors(document);
        wirePlayButtons();
        log('Reapply completed');
      } catch(e) {
        warn('reapply error:', e);
      }
    },
    currentHunter: () => window.btState.currentHunter,
    currentDifficulty: () => window.btState.currentDifficulty,
    setSelectedHunter,
    setDifficulty,
    resizeGameCanvas,
    unhideRuntimeHidden() {
      document.querySelectorAll('.bt-hidden-by-btf').forEach(n => {
        try {
          n.style.display = n._bt_prev_display || '';
          n.classList.remove('bt-hidden-by-btf');
        } catch(e) {}
      });
    }
  };

  log('FIX38 fully applied. API available at window.btFix38');
  
})();
