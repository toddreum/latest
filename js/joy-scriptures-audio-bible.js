/**
 * BirdTurds.com - Joy Scriptures & Audio Bible System
 * Displays joy-themed Bible verses and audio Bible player
 * Dude.com © 2024. All Rights Reserved.
 */

(function() {
  'use strict';

  // =============================================================================
  // JOY SCRIPTURES
  // =============================================================================

  const JOY_SCRIPTURES = [
    { verse: "The joy of the LORD is your strength.", ref: "Nehemiah 8:10" },
    { verse: "Rejoice in the Lord always. I will say it again: Rejoice!", ref: "Philippians 4:4" },
    { verse: "You make known to me the path of life; you fill me with joy in your presence.", ref: "Psalm 16:11" },
    { verse: "Weeping may stay for the night, but rejoicing comes in the morning.", ref: "Psalm 30:5" },
    { verse: "Shout for joy to the LORD, all the earth!", ref: "Psalm 100:1" },
    { verse: "A cheerful heart is good medicine.", ref: "Proverbs 17:22" },
    { verse: "Consider it pure joy whenever you face trials of many kinds.", ref: "James 1:2" },
    { verse: "The fruit of the Spirit is love, joy, peace...", ref: "Galatians 5:22" },
    { verse: "I have told you this so that my joy may be in you.", ref: "John 15:11" },
    { verse: "May the God of hope fill you with all joy and peace.", ref: "Romans 15:13" },
    { verse: "Let the heavens rejoice, let the earth be glad!", ref: "Psalm 96:11" },
    { verse: "Be joyful in hope, patient in affliction, faithful in prayer.", ref: "Romans 12:12" },
    { verse: "This is the day the LORD has made; let us rejoice and be glad in it.", ref: "Psalm 118:24" },
    { verse: "Satisfy us in the morning with your unfailing love, that we may sing for joy.", ref: "Psalm 90:14" },
    { verse: "Rejoice with those who rejoice.", ref: "Romans 12:15" },
    { verse: "The ransomed of the LORD will return with everlasting joy.", ref: "Isaiah 35:10" },
    { verse: "I delight greatly in the LORD; my soul rejoices in my God.", ref: "Isaiah 61:10" },
    { verse: "Let all who take refuge in you be glad; let them ever sing for joy.", ref: "Psalm 5:11" },
    { verse: "You turned my wailing into dancing; you removed my sackcloth and clothed me with joy.", ref: "Psalm 30:11" },
    { verse: "Gladness and joy will overtake them, and sorrow and sighing will flee away.", ref: "Isaiah 51:11" },
    { verse: "Though you have not seen him, you love him; and though you do not see him now, you believe in him and are filled with an inexpressible and glorious joy.", ref: "1 Peter 1:8" },
    { verse: "Let us fix our eyes on Jesus, the author and perfecter of our faith, who for the joy set before him endured the cross.", ref: "Hebrews 12:2" },
    { verse: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you.", ref: "Zephaniah 3:17" },
    { verse: "Those who sow with tears will reap with songs of joy.", ref: "Psalm 126:5" },
    { verse: "Be glad and rejoice forever in what I will create.", ref: "Isaiah 65:18" }
  ];

  // =============================================================================
  // AUDIO BIBLE BOOKS
  // =============================================================================

  const AUDIO_BIBLE_BOOKS = [
    { id: 'genesis', name: 'Genesis', chapters: 50 },
    { id: 'exodus', name: 'Exodus', chapters: 40 },
    { id: 'psalms', name: 'Psalms', chapters: 150 },
    { id: 'proverbs', name: 'Proverbs', chapters: 31 },
    { id: 'matthew', name: 'Matthew', chapters: 28 },
    { id: 'mark', name: 'Mark', chapters: 16 },
    { id: 'luke', name: 'Luke', chapters: 24 },
    { id: 'john', name: 'John', chapters: 21 },
    { id: 'acts', name: 'Acts', chapters: 28 },
    { id: 'romans', name: 'Romans', chapters: 16 },
    { id: 'revelation', name: 'Revelation', chapters: 22 }
  ];

  // =============================================================================
  // SCRIPTURE DISPLAY
  // =============================================================================

  let scriptureInterval = null;
  let isMuted = localStorage.getItem('birdturds_muteScriptures') === 'true';

  function showRandomJoyScripture() {
    if (isMuted) return;

    const scripture = JOY_SCRIPTURES[Math.floor(Math.random() * JOY_SCRIPTURES.length)];
    
    const existing = document.querySelector('.joy-scripture-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.className = 'joy-scripture-popup';
    popup.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, rgba(124,58,237,0.95), rgba(109,40,217,0.95));
      border: 3px solid #ffd700;
      border-radius: 15px;
      padding: 20px 30px;
      max-width: 500px;
      text-align: center;
      z-index: 9999;
      animation: popIn 0.4s ease-out;
      box-shadow: 0 8px 30px rgba(124,58,237,0.5);
    `;
    
    popup.innerHTML = `
      <p style="color:#ffd700;font-size:16px;margin:0 0 10px 0;font-style:italic;">"${scripture.verse}"</p>
      <p style="color:#c4b5fd;font-size:12px;margin:0;">— ${scripture.ref}</p>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
      if (popup.parentNode) popup.remove();
    }, 8000);
  }

  function startScriptureRotation(intervalMs = 60000) {
    stopScriptureRotation();
    scriptureInterval = setInterval(showRandomJoyScripture, intervalMs);
    // Show one immediately
    setTimeout(showRandomJoyScripture, 5000);
  }

  function stopScriptureRotation() {
    if (scriptureInterval) {
      clearInterval(scriptureInterval);
      scriptureInterval = null;
    }
  }

  function toggleScriptures() {
    isMuted = !isMuted;
    localStorage.setItem('birdturds_muteScriptures', isMuted.toString());
    return !isMuted;
  }

  // =============================================================================
  // AUDIO BIBLE PLAYER
  // =============================================================================

  let audioBiblePlayer = null;
  let currentBook = null;
  let currentChapter = 1;

  function showAudioBiblePlayer() {
    const existing = document.getElementById('audio-bible-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'audio-bible-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.9);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `;

    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:20px;border:3px solid #ffd700;padding:30px;max-width:500px;width:100%;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h2 style="color:#ffd700;font-size:24px;margin:0;">📖 Audio Bible (KJV)</h2>
          <button onclick="document.getElementById('audio-bible-modal').remove()" style="background:none;border:none;color:#fff;font-size:24px;cursor:pointer;">×</button>
        </div>
        
        <div style="margin-bottom:20px;">
          <label style="color:#ffd700;font-size:14px;display:block;margin-bottom:8px;">Select Book:</label>
          <select id="bible-book-select" onchange="window.onBibleBookChange(this.value)" style="width:100%;padding:12px;border-radius:8px;border:none;background:#374151;color:#fff;font-size:14px;">
            ${AUDIO_BIBLE_BOOKS.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
          </select>
        </div>
        
        <div style="margin-bottom:20px;">
          <label style="color:#ffd700;font-size:14px;display:block;margin-bottom:8px;">Chapter:</label>
          <select id="bible-chapter-select" style="width:100%;padding:12px;border-radius:8px;border:none;background:#374151;color:#fff;font-size:14px;">
            ${Array.from({length: 50}, (_, i) => `<option value="${i+1}">Chapter ${i+1}</option>`).join('')}
          </select>
        </div>
        
        <div style="display:flex;gap:10px;justify-content:center;margin-bottom:20px;">
          <button onclick="window.playAudioBible()" style="background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border:none;padding:15px 30px;border-radius:10px;font-size:16px;font-weight:bold;cursor:pointer;">
            ▶ Play
          </button>
          <button onclick="window.pauseAudioBible()" style="background:#374151;color:#fff;border:none;padding:15px 30px;border-radius:10px;font-size:16px;cursor:pointer;">
            ⏸ Pause
          </button>
        </div>
        
        <p id="bible-status" style="color:#86efac;text-align:center;font-size:13px;margin:0;"></p>
        
        <p style="color:#64748b;font-size:11px;text-align:center;margin-top:20px;">
          Audio from Faith Comes By Hearing® • KJV Public Domain
        </p>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function onBibleBookChange(bookId) {
    const book = AUDIO_BIBLE_BOOKS.find(b => b.id === bookId);
    if (!book) return;

    currentBook = book;
    const chapterSelect = document.getElementById('bible-chapter-select');
    if (chapterSelect) {
      chapterSelect.innerHTML = Array.from({length: book.chapters}, (_, i) => 
        `<option value="${i+1}">Chapter ${i+1}</option>`
      ).join('');
    }
  }

  function playAudioBible() {
    const bookSelect = document.getElementById('bible-book-select');
    const chapterSelect = document.getElementById('bible-chapter-select');
    const statusEl = document.getElementById('bible-status');
    
    const bookId = bookSelect ? bookSelect.value : 'john';
    const chapter = chapterSelect ? chapterSelect.value : '1';
    const book = AUDIO_BIBLE_BOOKS.find(b => b.id === bookId);

    if (audioBiblePlayer) {
      audioBiblePlayer.pause();
    }

    // Try Firebase Storage first, fallback to message
    const url = `https://firebasestorage.googleapis.com/v0/b/birdturds-a9e0b.appspot.com/o/audio-bible%2F${bookId}_${chapter}.mp3?alt=media`;
    
    audioBiblePlayer = new Audio(url);
    audioBiblePlayer.volume = 0.7;
    
    audioBiblePlayer.onplay = () => {
      if (statusEl) statusEl.textContent = `Playing: ${book?.name || bookId} Chapter ${chapter}`;
    };
    
    audioBiblePlayer.onerror = () => {
      if (statusEl) statusEl.textContent = 'Upload audio files to Firebase: audio-bible/[book]_[chapter].mp3';
    };

    audioBiblePlayer.play().catch(e => {
      if (statusEl) statusEl.textContent = 'Audio not available. Upload to Firebase Storage.';
    });
  }

  function pauseAudioBible() {
    if (audioBiblePlayer) {
      audioBiblePlayer.pause();
      const statusEl = document.getElementById('bible-status');
      if (statusEl) statusEl.textContent = 'Paused';
    }
  }

  // =============================================================================
  // ADD CSS
  // =============================================================================

  function addStyles() {
    if (document.getElementById('joy-scriptures-css')) return;
    
    const style = document.createElement('style');
    style.id = 'joy-scriptures-css';
    style.textContent = `
      @keyframes popIn {
        0% { transform: translateX(-50%) scale(0.5); opacity: 0; }
        100% { transform: translateX(-50%) scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // =============================================================================
  // INIT
  // =============================================================================

  function init() {
    addStyles();
    
    // Start scripture rotation after a delay
    if (!isMuted) {
      setTimeout(() => startScriptureRotation(90000), 10000);
    }
  }

  // Run init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // =============================================================================
  // EXPORTS
  // =============================================================================

  window.JOY_SCRIPTURES = JOY_SCRIPTURES;
  window.AUDIO_BIBLE_BOOKS = AUDIO_BIBLE_BOOKS;
  window.showRandomJoyScripture = showRandomJoyScripture;
  window.startScriptureRotation = startScriptureRotation;
  window.stopScriptureRotation = stopScriptureRotation;
  window.toggleScriptures = toggleScriptures;
  window.showAudioBiblePlayer = showAudioBiblePlayer;
  window.onBibleBookChange = onBibleBookChange;
  window.playAudioBible = playAudioBible;
  window.pauseAudioBible = pauseAudioBible;

  console.log('📖 Joy Scriptures & Audio Bible loaded');

})();
