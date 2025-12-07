/**
 * INDEX HOTFIX v1.0
 * Temporary fallback to rebind hunter selection and Play/Solo buttons
 * if upstream hunter-selection.js fails to load or initialize
 */

(function() {
  'use strict';
  
  // Wait a moment to see if HunterSelection initialized properly
  setTimeout(function() {
    if (window.HunterSelection && typeof window.HunterSelection.init === 'function') {
      console.log('[INDEX-HOTFIX] HunterSelection already initialized, skipping hotfix');
      return;
    }
    
    console.warn('[INDEX-HOTFIX] HunterSelection not found, applying emergency hotfix...');
    
    const CANONICAL_KEY = 'birdturds_character';
    const CANONICAL_KEY_ALT = 'selectedCharacter';
    const DIFFICULTY_KEY = 'birdturds_difficulty';
    const DEFAULT_HUNTER = 'buck';
    const DEFAULT_DIFFICULTY = 'intermediate';
    
    /**
     * Rebind hunter tiles
     */
    function rebindHunters() {
      const tiles = document.querySelectorAll('[data-hunter], .hunter-mini, .hunter-card, [onclick*="quickSelectHunter"]');
      let boundCount = 0;
      
      tiles.forEach(tile => {
        // Get hunter ID from data attribute or onclick
        let hunterId = tile.getAttribute('data-hunter') || tile.dataset.hunter;
        
        if (!hunterId && tile.hasAttribute('onclick')) {
          const onclickStr = tile.getAttribute('onclick');
          const match = onclickStr.match(/quickSelectHunter\(['"]([^'"]+)['"]/);
          if (match) hunterId = match[1];
        }
        
        if (!hunterId) return;
        
        // Clear existing onclick
        tile.removeAttribute('onclick');
        
        // Add new click handler
        tile.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Save selection
          localStorage.setItem(CANONICAL_KEY, hunterId);
          localStorage.setItem(CANONICAL_KEY_ALT, hunterId);
          
          // Visual feedback
          document.querySelectorAll('[data-hunter], .hunter-mini, .hunter-card').forEach(t => {
            t.classList.remove('selected');
            t.style.borderColor = '';
            t.style.boxShadow = '';
          });
          
          tile.classList.add('selected');
          tile.style.borderColor = '#22c55e';
          tile.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.6)';
          tile.style.transform = 'scale(1.05)';
          setTimeout(() => { tile.style.transform = ''; }, 200);
          
          console.log('[INDEX-HOTFIX] Selected hunter:', hunterId);
        });
        
        tile.style.cursor = 'pointer';
        boundCount++;
      });
      
      console.log('[INDEX-HOTFIX] Rebound', boundCount, 'hunter tiles');
    }
    
    /**
     * Rebind difficulty buttons
     */
    function rebindDifficulty() {
      const buttons = document.querySelectorAll('[data-difficulty], .difficulty-btn, #diff-beginner, #diff-intermediate, #diff-advanced');
      let boundCount = 0;
      
      buttons.forEach(btn => {
        let diffId = btn.getAttribute('data-difficulty') || btn.dataset.difficulty;
        
        if (!diffId && btn.id) {
          diffId = btn.id.replace('diff-', '');
        }
        
        if (!['beginner', 'intermediate', 'advanced'].includes(diffId)) return;
        
        // Clear existing onclick
        btn.removeAttribute('onclick');
        
        // Add new click handler
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          localStorage.setItem(DIFFICULTY_KEY, diffId);
          
          // Visual feedback
          document.querySelectorAll('[data-difficulty], .difficulty-btn, #diff-beginner, #diff-intermediate, #diff-advanced').forEach(b => {
            b.classList.remove('selected');
            if (!b.id || !b.id.includes('intermediate')) {
              b.style.borderColor = 'transparent';
            }
          });
          
          btn.classList.add('selected');
          btn.style.borderColor = '#ffd700';
          btn.style.borderWidth = '2px';
          btn.style.borderStyle = 'solid';
          
          console.log('[INDEX-HOTFIX] Selected difficulty:', diffId);
        });
        
        btn.style.cursor = 'pointer';
        boundCount++;
      });
      
      console.log('[INDEX-HOTFIX] Rebound', boundCount, 'difficulty buttons');
    }
    
    /**
     * Rebind Play/Solo buttons
     */
    function rebindPlayButtons() {
      const playButtons = document.querySelectorAll('#play-now-btn, .btn-play, .play-btn, .cta-buttons a[href*="play.html"]');
      let boundCount = 0;
      
      playButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
          // Ensure we have a selection
          let hunter = localStorage.getItem(CANONICAL_KEY) || localStorage.getItem(CANONICAL_KEY_ALT);
          if (!hunter) {
            hunter = DEFAULT_HUNTER;
            localStorage.setItem(CANONICAL_KEY, hunter);
            localStorage.setItem(CANONICAL_KEY_ALT, hunter);
          }
          
          let difficulty = localStorage.getItem(DIFFICULTY_KEY) || DEFAULT_DIFFICULTY;
          localStorage.setItem(DIFFICULTY_KEY, difficulty);
          
          // If it's not already going to play.html, redirect
          if (btn.tagName !== 'A' || !btn.getAttribute('href')?.includes('play.html')) {
            e.preventDefault();
            window.location.href = `/play.html?h=${hunter}&d=${difficulty}`;
          }
          
          console.log('[INDEX-HOTFIX] Play clicked - hunter:', hunter, 'difficulty:', difficulty);
        });
        
        boundCount++;
      });
      
      console.log('[INDEX-HOTFIX] Rebound', boundCount, 'Play buttons');
    }
    
    /**
     * Restore visual selection state
     */
    function restoreVisualState() {
      // Restore hunter selection
      const savedHunter = localStorage.getItem(CANONICAL_KEY) || localStorage.getItem(CANONICAL_KEY_ALT) || DEFAULT_HUNTER;
      const hunterTile = document.querySelector(`[data-hunter="${savedHunter}"]`);
      
      if (hunterTile) {
        hunterTile.classList.add('selected');
        hunterTile.style.borderColor = '#22c55e';
        hunterTile.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.6)';
      }
      
      // Restore difficulty selection
      const savedDiff = localStorage.getItem(DIFFICULTY_KEY) || DEFAULT_DIFFICULTY;
      const diffBtn = document.querySelector(`[data-difficulty="${savedDiff}"], #diff-${savedDiff}`);
      
      if (diffBtn) {
        diffBtn.classList.add('selected');
        diffBtn.style.borderColor = '#ffd700';
        diffBtn.style.borderWidth = '2px';
        diffBtn.style.borderStyle = 'solid';
      }
      
      console.log('[INDEX-HOTFIX] Restored visual state - hunter:', savedHunter, 'difficulty:', savedDiff);
    }
    
    // Apply hotfix
    rebindHunters();
    rebindDifficulty();
    rebindPlayButtons();
    restoreVisualState();
    
    console.log('[INDEX-HOTFIX] Emergency hotfix applied successfully');
    
  }, 500); // Wait 500ms for normal initialization
  
})();
