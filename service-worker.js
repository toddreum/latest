// BirdTurds Service Worker v43.0
// Updated cache name forces browser to download fresh files
const CACHE_NAME = 'birdturds-v43.0';

const OFFLINE_CACHE = [
  '/',
  '/index.html',
  '/play.html',
  '/game.js',
  '/js/game.js',
  '/js/multiplayer.js',
  '/js/multiplayer-ui.js',
  '/js/church-directory-v43.js',
  '/js/church-directory-ui-v43.js',
  '/manifest.json',
  '/sprites/snowflake.png',
  '/sprites/turd-emoji.svg',
  '/sprites/godbless_splash.png',
  '/sprites/characters/buck_idle.png',
  '/sprites/characters/daisy_idle.png',
  '/sprites/characters/bubba_idle.png',
  '/sprites/characters/clyde_idle.png',
  '/sprites/characters/sierra_idle.png',
  '/sprites/characters/gunner_idle.png',
  '/sprites/characters/jolene_idle.png',
  '/sprites/characters/tammy_idle.png'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[SW v43] Installing...');
  // Force immediate activation (don't wait for old SW to die)
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW v43] Caching app shell');
      return cache.addAll(OFFLINE_CACHE).catch(err => {
        console.warn('[SW v43] Some files failed to cache:', err);
        // Don't fail completely if some assets missing
      });
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW v43] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW v43] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW v43] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip Chrome extensions
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request).then((fetchResponse) => {
        // Cache successful responses for offline use
        if (fetchResponse.status === 200) {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return fetchResponse;
      }).catch(() => {
        // If offline and not cached, return offline page for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
