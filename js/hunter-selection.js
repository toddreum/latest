/**
 * HUNTER SELECTION SYSTEM v1.0
 * For index.html - Binds hunter tiles, persists selection, handles Play/Solo
 * Canonical keys: birdturds_character, selectedCharacter
 */

(function() {
  'use strict';
  
  const CANONICAL_KEYS = {
    character: 'birdturds_character',
    characterAlt: 'selectedCharacter',  // Fallback/legacy
    difficulty: 'birdturds_difficulty'
  };
  
  const DEFAULT_CHARACTER = 'buck';
  const DEFAULT_DIFFICULTY = 'intermediate';
  
  // Hunter data
  const HUNTERS = {
    buck: { name: 'Buck', emoji: '🤠' },
    daisy: { name: 'Daisy', emoji: '🌸' },
    bubba: { name: 'Bubba', emoji: '🐊' },
    clyde: { name: 'Clyde', emoji: '🏔️' },
    sierra: { name: 'Sierra', emoji: '💃' },
    gunner: { name: 'Gunner', emoji: '🎖️' },
    jolene: { name: 'Jolene', emoji: '🏠' },
    tammy: { name: 'Tammy', emoji: '🎯' }
  };
  
  let selectedHunter = null;
  let selectedDifficulty = null;
  
  /**
   * Initialize hunter selection system
   */
  function init() {
    console.log('[HUNTER-SELECTION] Initializing...');
    
    // Load saved selection
    loadSelection();
    
    // Bind hunter tiles
    bindHunterTiles();
    
    // Bind difficulty buttons
    bindDifficultyButtons();
    
    // Bind Play/Solo buttons
    bindPlayButtons();
    
    // Restore visual state
    updateVisuals();
    
    console.log('[HUNTER-SELECTION] Initialized with hunter:', selectedHunter, 'difficulty:', selectedDifficulty);
  }
  
  /**
   * Load selection from localStorage
   */
  function loadSelection() {
    // Load character (check both keys)
    selectedHunter = localStorage.getItem(CANONICAL_KEYS.character) || 
                     localStorage.getItem(CANONICAL_KEYS.characterAlt) || 
                     DEFAULT_CHARACTER;
    
    // Validate hunter exists
    if (!HUNTERS[selectedHunter]) {
      console.warn('[HUNTER-SELECTION] Invalid hunter:', selectedHunter, '- resetting to default');
      selectedHunter = DEFAULT_CHARACTER;
    }
    
    // Load difficulty
    selectedDifficulty = localStorage.getItem(CANONICAL_KEYS.difficulty) || DEFAULT_DIFFICULTY;
    
    // Normalize difficulty
    if (!['beginner', 'intermediate', 'advanced'].includes(selectedDifficulty)) {
      selectedDifficulty = DEFAULT_DIFFICULTY;
    }
  }
  
  /**
   * Save selection to localStorage (both canonical keys)
   */
  function saveSelection() {
    // Save to both keys for compatibility
    localStorage.setItem(CANONICAL_KEYS.character, selectedHunter);
    localStorage.setItem(CANONICAL_KEYS.characterAlt, selectedHunter);
    localStorage.setItem(CANONICAL_KEYS.difficulty, selectedDifficulty);
    console.log('[HUNTER-SELECTION] Saved:', selectedHunter, selectedDifficulty);
  }
  
  /**
   * Bind click handlers to hunter tiles
   */
  function bindHunterTiles() {
    // Find all hunter tiles by data-hunter attribute
    const tiles = document.querySelectorAll('[data-hunter], .hunter-mini, .hunter-card');
    
    tiles.forEach(tile => {
      const hunterId = tile.getAttribute('data-hunter') || tile.dataset.hunter;
      if (!hunterId || !HUNTERS[hunterId]) return;
      
      // Remove any existing listeners (rebind safe)
      const newTile = tile.cloneNode(true);
      tile.parentNode.replaceChild(newTile, tile);
      
      // Add click handler
      newTile.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        selectHunter(hunterId, newTile);
      });
      
      // Make clickable
      newTile.style.cursor = 'pointer';
    });
    
    console.log('[HUNTER-SELECTION] Bound', tiles.length, 'hunter tiles');
  }
  
  /**
   * Select a hunter
   */
  function selectHunter(hunterId, tileElement) {
    if (!HUNTERS[hunterId]) {
      console.error('[HUNTER-SELECTION] Invalid hunter:', hunterId);
      return;
    }
    
    selectedHunter = hunterId;
    saveSelection();
    updateVisuals();
    
    console.log('[HUNTER-SELECTION] Selected:', hunterId);
    
    // Visual feedback
    if (tileElement) {
      tileElement.style.transform = 'scale(1.05)';
      setTimeout(() => {
        if (tileElement.style) tileElement.style.transform = '';
      }, 200);
    }
  }
  
  /**
   * Bind difficulty button clicks
   */
  function bindDifficultyButtons() {
    const diffButtons = document.querySelectorAll('[data-difficulty], .difficulty-btn, #diff-beginner, #diff-intermediate, #diff-advanced');
    
    diffButtons.forEach(btn => {
      let diffId = btn.getAttribute('data-difficulty') || btn.dataset.difficulty;
      if (!diffId && btn.id) {
        // Parse from ID (e.g., diff-beginner -> beginner)
        diffId = btn.id.replace('diff-', '');
      }
      if (!diffId || !['beginner', 'intermediate', 'advanced'].includes(diffId)) return;
      
      // Remove existing listeners
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        selectDifficulty(diffId);
      });
      
      newBtn.style.cursor = 'pointer';
    });
    
    console.log('[HUNTER-SELECTION] Bound difficulty buttons');
  }
  
  /**
   * Select difficulty
   */
  function selectDifficulty(diffId) {
    if (!['beginner', 'intermediate', 'advanced'].includes(diffId)) {
      console.error('[HUNTER-SELECTION] Invalid difficulty:', diffId);
      return;
    }
    
    selectedDifficulty = diffId;
    saveSelection();
    updateVisuals();
    
    console.log('[HUNTER-SELECTION] Selected difficulty:', diffId);
  }
  
  /**
   * Bind Play/Solo button clicks
   */
  function bindPlayButtons() {
    const playButtons = document.querySelectorAll('#play-now-btn, .btn-play, .play-btn, [href*="play.html"]');
    
    playButtons.forEach(btn => {
      // Check if it's an anchor or button
      const isAnchor = btn.tagName === 'A';
      
      btn.addEventListener('click', function(e) {
        // Ensure selection is saved
        saveSelection();
        
        // If it's not an anchor pointing to play.html, navigate manually
        if (!isAnchor || !btn.getAttribute('href')?.includes('play.html')) {
          e.preventDefault();
          navigateToPlay();
        }
        // Otherwise let the anchor navigate naturally (selection already saved)
      });
    });
    
    console.log('[HUNTER-SELECTION] Bound Play buttons');
  }
  
  /**
   * Navigate to play page
   */
  function navigateToPlay() {
    // Build URL with query param fallback
    const url = `/play.html?h=${selectedHunter}&d=${selectedDifficulty}`;
    console.log('[HUNTER-SELECTION] Navigating to:', url);
    window.location.href = url;
  }
  
  /**
   * Update visual selection state
   */
  function updateVisuals() {
    // Update hunter tile selection
    document.querySelectorAll('[data-hunter], .hunter-mini, .hunter-card').forEach(tile => {
      const hunterId = tile.getAttribute('data-hunter') || tile.dataset.hunter;
      const isSelected = hunterId === selectedHunter;
      
      if (isSelected) {
        tile.classList.add('selected');
        tile.style.borderColor = '#22c55e';
        tile.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.6)';
      } else {
        tile.classList.remove('selected');
        tile.style.borderColor = '';
        tile.style.boxShadow = '';
      }
    });
    
    // Update difficulty button selection
    document.querySelectorAll('[data-difficulty], .difficulty-btn, #diff-beginner, #diff-intermediate, #diff-advanced').forEach(btn => {
      let diffId = btn.getAttribute('data-difficulty') || btn.dataset.difficulty;
      if (!diffId && btn.id) diffId = btn.id.replace('diff-', '');
      
      const isSelected = diffId === selectedDifficulty;
      
      if (isSelected) {
        btn.classList.add('selected');
        btn.style.borderColor = '#ffd700';
        btn.style.borderWidth = '2px';
        btn.style.borderStyle = 'solid';
      } else {
        btn.classList.remove('selected');
        if (!btn.id || !btn.id.includes('intermediate')) {
          btn.style.borderColor = 'transparent';
        }
      }
    });
    
    // Update any selection status text
    const statusMsg = document.getElementById('hunter-selected-msg') || document.getElementById('selected-char-name');
    if (statusMsg && HUNTERS[selectedHunter]) {
      statusMsg.textContent = HUNTERS[selectedHunter].name;
      if (statusMsg.style) statusMsg.style.display = 'block';
    }
    
    const warningMsg = document.getElementById('no-hunter-warning');
    if (warningMsg && warningMsg.style) {
      warningMsg.style.display = 'none';
    }
  }
  
  /**
   * Public API
   */
  window.HunterSelection = {
    init,
    selectHunter,
    selectDifficulty,
    getSelection: () => ({ hunter: selectedHunter, difficulty: selectedDifficulty }),
    refresh: () => {
      loadSelection();
      updateVisuals();
    }
  };
  
  // Auto-initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }
  
})();
