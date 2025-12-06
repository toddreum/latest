/**
 * BirdTurds Cache Buster System v40.6
 * Forces browsers to load latest versions of game files
 */

(function() {
  'use strict';
  
  // Current version - UPDATE THIS WITH EACH DEPLOY
  const GAME_VERSION = '40.6';
  const BUILD_TIMESTAMP = Date.now();
  
  // Export to global scope
  window.BIRDTURDS_VERSION = GAME_VERSION;
  window.BIRDTURDS_BUILD = BUILD_TIMESTAMP;
  
  /**
   * Add version query string to a URL
   */
  function addVersionToUrl(url) {
    if (!url) return url;
    const separator = url.includes('?') ? '&' : '?';
    return url + separator + 'v=' + GAME_VERSION;
  }
  
  /**
   * Add timestamp bust to a URL (for complete cache bypass)
   */
  function bustCache(url) {
    if (!url) return url;
    const separator = url.includes('?') ? '&' : '?';
    return url + separator + 'bust=' + BUILD_TIMESTAMP;
  }
  
  /**
   * Load a script with version
   */
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = addVersionToUrl(src);
    script.onload = callback || function() {};
    script.onerror = function() {
      console.error('Failed to load script:', src);
    };
    document.head.appendChild(script);
    return script;
  }
  
  /**
   * Load a stylesheet with version
   */
  function loadStyle(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = addVersionToUrl(href);
    document.head.appendChild(link);
    return link;
  }
  
  /**
   * Check for updates by fetching version.json
   */
  async function checkForUpdates() {
    try {
      const response = await fetch('/version.json?bust=' + Date.now());
      if (!response.ok) return null;
      
      const data = await response.json();
      
      if (data.version && data.version !== GAME_VERSION) {
        console.log('🔄 New version available:', data.version);
        return {
          hasUpdate: true,
          currentVersion: GAME_VERSION,
          newVersion: data.version,
          notes: data.notes || ''
        };
      }
      
      return { hasUpdate: false, currentVersion: GAME_VERSION };
    } catch (e) {
      console.warn('Could not check for updates:', e);
      return null;
    }
  }
  
  /**
   * Clear all browser caches (service worker caches + localStorage cache flags)
   */
  async function clearAllCaches() {
    // Clear service worker caches
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
        console.log('✅ Service worker caches cleared');
      } catch (e) {
        console.warn('Could not clear caches:', e);
      }
    }
    
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
        console.log('✅ Service workers unregistered');
      } catch (e) {
        console.warn('Could not unregister service workers:', e);
      }
    }
    
    // Clear localStorage version flags
    try {
      localStorage.setItem('birdturds_last_version', GAME_VERSION);
      localStorage.setItem('birdturds_cache_cleared', Date.now().toString());
      console.log('✅ Version flags updated');
    } catch (e) {
      console.warn('Could not update localStorage:', e);
    }
    
    console.log('🎮 BirdTurds v' + GAME_VERSION + ' - Caches cleared!');
    return true;
  }
  
  /**
   * Show update notification if needed
   */
  function showUpdateNotification(versionInfo) {
    if (!versionInfo || !versionInfo.hasUpdate) return;
    
    const banner = document.createElement('div');
    banner.id = 'update-banner';
    banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;padding:12px 20px;text-align:center;z-index:99999;font-size:14px;font-weight:bold;display:flex;justify-content:center;align-items:center;gap:15px;';
    banner.innerHTML = `
      <span>🎮 New version ${versionInfo.newVersion} available!</span>
      <button onclick="window.clearAllCaches().then(()=>location.reload())" style="background:#fff;color:#16a34a;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:bold;">Update Now</button>
      <button onclick="this.parentElement.remove()" style="background:transparent;color:#fff;border:1px solid #fff;padding:8px 12px;border-radius:8px;cursor:pointer;">Later</button>
    `;
    document.body.insertBefore(banner, document.body.firstChild);
  }
  
  // Export functions
  window.loadScript = loadScript;
  window.loadStyle = loadStyle;
  window.addVersionToUrl = addVersionToUrl;
  window.bustCache = bustCache;
  window.checkForUpdates = checkForUpdates;
  window.clearAllCaches = clearAllCaches;
  
  // Auto-check for updates on load (optional - enable if desired)
  // document.addEventListener('DOMContentLoaded', async () => {
  //   const updateInfo = await checkForUpdates();
  //   showUpdateNotification(updateInfo);
  // });
  
  console.log('🎮 BirdTurds v' + GAME_VERSION + ' Cache Buster loaded');
})();
