// BirdTurds Service Worker v37.8.6
const CACHE_NAME = 'birdturds-v37.8.6';
const urlsToCache = [
  '/',
  '/play.html',
  '/index.html',
  '/game_min.js',
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

// Fetch event - with proper error handling
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Skip non-GET requests (POST, etc.)
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) URLs
  if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) {
    return;
  }
  
  // Skip external analytics/tracking scripts
  if (request.url.includes('cloudflareinsights.com') || 
      request.url.includes('google-analytics.com') ||
      request.url.includes('firebase')) {
    return;
  }
  
  event.respondWith(
    fetch(request)
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
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request);
      })
  );
});
