// BIRDTURDS v42 Service Worker for Offline Play

const CACHE_NAME = 'birdturds-v43-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/play.html',
  '/about.html',
  '/howtoplay.html',
  '/gamer-break-buddy.html',
  '/js/game.js',
  '/js/game.min.js',
  '/js/systems/comic-bubble-voices.js',
  '/js/systems/game-patch-v41.js',
  '/js/systems/game-over-fixes.js',
  '/js/systems/tranquilizer-mode.js',
  '/js/systems/sprite-border-helper.js',
  '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('BIRDTURDS: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('BIRDTURDS: Cache failed', err);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then(fetchResponse => {
            // Cache new requests
            if (fetchResponse && fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
            }
            return fetchResponse;
          })
          .catch(() => {
            // Offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
