const CACHE_NAME = 'ar-messenger-bg-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './background360.webp.webp',
  'https://cloudflare.com',
  'https://jsdelivr.net',
  'https://jsdelivr.net',
  'https://jsdelivr.net'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
