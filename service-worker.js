// BirdTurds Service Worker v38.0.0 - FIX38 Network-First for game.js
const CACHE_NAME = 'birdturds-v38.0.0';
const NETWORK_FIRST_URLS = [
  '/game.js',
  '/game_min.js',
  '/js/game.js'
];
const urlsToCache = [
  '/',
  '/play.html',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/snowflake.png',
  '/sprites/landscapes/christmas.png',
  '/sprites/landscapes/farm.png',
  '/sprites/landscapes/forest.png',
  '/sprites/landscapes/lake.png',
  '/sprites/landscapes/desert.png',
  '/sprites/landscapes/town.png'
];

// Install event
self.addEventListener('install', event => {
  console.log('[SW v37.8.6] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW v37.0] Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('[SW v37.0] Cache failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('[SW v37.0] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW v37.0] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - with network-first for game.js and cache-first for others
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests (POST, etc.)
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) URLs
  if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) {
    return;
  }
  
  // Skip external analytics/tracking scripts and Firebase
  if (request.url.includes('cloudflareinsights.com') || 
      request.url.includes('google-analytics.com') ||
      request.url.includes('gstatic.com/firebasejs') ||
      request.url.includes('googleapis.com')) {
    return;
  }
  
  // Check if this is a network-first URL (game.js)
  const isNetworkFirst = NETWORK_FIRST_URLS.some(path => url.pathname.endsWith(path) || url.pathname === path);
  
  if (isNetworkFirst) {
    // NETWORK-FIRST strategy for game.js to avoid serving stale/corrupt bundles
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone and cache successful responses
          if (response && response.status === 200 && response.type === 'basic') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone).catch(() => {
                console.log('[SW] Cache put failed for', request.url);
              });
            });
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache as fallback
          console.log('[SW] Network failed for', request.url, '- trying cache');
          return caches.match(request);
        })
    );
  } else {
    // CACHE-FIRST strategy for other resources
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Not in cache, fetch from network
          return fetch(request)
            .then(response => {
              // Only cache successful responses from our domain
              if (response && response.status === 200 && response.type === 'basic') {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, responseClone).catch(() => {
                    // Silently ignore cache put errors
                  });
                });
              }
              return response;
            });
        })
        .catch(() => {
          // Both cache and network failed
          console.log('[SW] Both cache and network failed for', request.url);
          return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        })
    );
  }
});
