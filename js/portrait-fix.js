// portrait-fix.js - wrap idle character images so only the first frame shows, scaled 3x.
(function(){
  'use strict';
  const selectors = [
    'img[src*="/sprites/characters/"]',
    'img[src*="/sprites/hunters/"]',
    'img[src$="_idle.png"]'
  ];

  function shouldTreatAsPortrait(img) {
    const src = img.getAttribute('src') || '';
    if (!src) return false;
    return /\/sprites\/(characters|hunters)\//.test(src) || src.indexOf('_idle') !== -1;
  }

  function wrap(img) {
    if (!img || img.classList.contains('portrait-frame__img')) return;
    const parent = img.parentElement;
    if (!parent) return;
    if (parent.classList && parent.classList.contains('portrait-frame')) return;

    const frame = document.createElement('div');
    frame.className = 'portrait-frame';
    img.classList.add('portrait-frame__img');

    parent.insertBefore(frame, img);
    frame.appendChild(img);
  }

  function apply() {
    try {
      const seen = new Set();
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(img => seen.add(img));
      });
      seen.forEach(img => { if (shouldTreatAsPortrait(img)) wrap(img); });
    } catch (e) {
      console.warn('portrait-fix error', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  window.BT_applyPortraitFixes = apply;
})();
