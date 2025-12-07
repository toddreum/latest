/**
 * PLAY BOOTSTRAP v1.0
 * Ensures proper hunter selection loading from canonical keys and query params
 * Runs before game.js to set up the environment
 */

(function() {
  'use strict';
  
  console.log('[PLAY-BOOTSTRAP] Initializing...');
  
  const CANONICAL_KEYS = {
    character: 'birdturds_character',
    characterAlt: 'selectedCharacter',
    difficulty: 'birdturds_difficulty'
  };
  
  const DEFAULT_CHARACTER = 'buck';
  const DEFAULT_DIFFICULTY = 'intermediate';
  
  /**
   * Parse query parameters
   */
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      hunter: params.get('h') || params.get('hunter') || params.get('character'),
      difficulty: params.get('d') || params.get('diff') || params.get('difficulty')
    };
  }
  
  /**
   * Get hunter selection from all sources (priority: query param > localStorage)
   */
  function getHunterSelection() {
    const queryParams = getQueryParams();
    
    // Priority 1: Query parameter
    if (queryParams.hunter) {
      console.log('[PLAY-BOOTSTRAP] Hunter from query param:', queryParams.hunter);
      return queryParams.hunter;
    }
    
    // Priority 2: Canonical key - birdturds_character
    const storedCharacter = localStorage.getItem(CANONICAL_KEYS.character);
    if (storedCharacter) {
      console.log('[PLAY-BOOTSTRAP] Hunter from birdturds_character:', storedCharacter);
      return storedCharacter;
    }
    
    // Priority 3: Alt key - selectedCharacter
    const altCharacter = localStorage.getItem(CANONICAL_KEYS.characterAlt);
    if (altCharacter) {
      console.log('[PLAY-BOOTSTRAP] Hunter from selectedCharacter:', altCharacter);
      return altCharacter;
    }
    
    // Default fallback
    console.log('[PLAY-BOOTSTRAP] No hunter found, using default:', DEFAULT_CHARACTER);
    return DEFAULT_CHARACTER;
  }
  
  /**
   * Get difficulty selection
   */
  function getDifficultySelection() {
    const queryParams = getQueryParams();
    
    // Priority 1: Query parameter
    if (queryParams.difficulty) {
      console.log('[PLAY-BOOTSTRAP] Difficulty from query param:', queryParams.difficulty);
      return queryParams.difficulty;
    }
    
    // Priority 2: localStorage
    const storedDifficulty = localStorage.getItem(CANONICAL_KEYS.difficulty);
    if (storedDifficulty) {
      console.log('[PLAY-BOOTSTRAP] Difficulty from localStorage:', storedDifficulty);
      return storedDifficulty;
    }
    
    // Default fallback
    console.log('[PLAY-BOOTSTRAP] No difficulty found, using default:', DEFAULT_DIFFICULTY);
    return DEFAULT_DIFFICULTY;
  }
  
  /**
   * Validate and normalize hunter ID
   */
  function validateHunter(hunterId) {
    const validHunters = ['buck', 'daisy', 'bubba', 'clyde', 'sierra', 'gunner', 'jolene', 'tammy'];
    
    if (!hunterId || !validHunters.includes(hunterId.toLowerCase())) {
      console.warn('[PLAY-BOOTSTRAP] Invalid hunter:', hunterId, '- using default');
      return DEFAULT_CHARACTER;
    }
    
    return hunterId.toLowerCase();
  }
  
  /**
   * Validate and normalize difficulty
   */
  function validateDifficulty(diffId) {
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    
    if (!diffId || !validDifficulties.includes(diffId.toLowerCase())) {
      console.warn('[PLAY-BOOTSTRAP] Invalid difficulty:', diffId, '- using default');
      return DEFAULT_DIFFICULTY;
    }
    
    return diffId.toLowerCase();
  }
  
  /**
   * Bootstrap the game configuration
   */
  function bootstrap() {
    // Get and validate selections
    let hunter = getHunterSelection();
    hunter = validateHunter(hunter);
    
    let difficulty = getDifficultySelection();
    difficulty = validateDifficulty(difficulty);
    
    // Save to both canonical keys for consistency
    localStorage.setItem(CANONICAL_KEYS.character, hunter);
    localStorage.setItem(CANONICAL_KEYS.characterAlt, hunter);
    localStorage.setItem(CANONICAL_KEYS.difficulty, difficulty);
    
    // Set global variables for game.js to use
    window.selectedCharacter = hunter;
    window.selectedHunter = hunter;
    window.selectedDifficulty = difficulty;
    window.pendingCharacter = hunter;
    
    console.log('[PLAY-BOOTSTRAP] Bootstrap complete!');
    console.log('[PLAY-BOOTSTRAP] Hunter:', hunter);
    console.log('[PLAY-BOOTSTRAP] Difficulty:', difficulty);
    console.log('[PLAY-BOOTSTRAP] Configuration ready for game.js');
    
    // Dispatch event to notify other scripts
    window.dispatchEvent(new CustomEvent('playBootstrapReady', {
      detail: { hunter, difficulty }
    }));
  }
  
  // Run bootstrap immediately
  bootstrap();
  
  // Expose API
  window.PlayBootstrap = {
    getHunter: () => localStorage.getItem(CANONICAL_KEYS.character) || DEFAULT_CHARACTER,
    getDifficulty: () => localStorage.getItem(CANONICAL_KEYS.difficulty) || DEFAULT_DIFFICULTY,
    refresh: bootstrap
  };
  
})();
