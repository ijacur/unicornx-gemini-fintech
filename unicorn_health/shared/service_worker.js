// Unicorn Health Ecosystem - Service Worker & Offline Cache (PWA)
const CACHE_NAME = 'unicorn-health-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/doriquti/index.html',
  '/arzonlab/index.html',
  '/shared/patient_guide.html',
  '/shared/offline_sync.html',
  '/shared/medicines_data.json',
  '/shared/diagnostics_data.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Kesh yaratildi va resurslar yuklandi');
      return cache.addAll(OFFLINE_URLS).catch(err => {
        console.warn('[ServiceWorker] Kesh yuklashda xatolik:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Eski kesh tozalandi:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return networkResponse;
      }).catch(() => {
        // Oflayn rejimda asosiy sahifani qaytarish
        return caches.match('/shared/offline_sync.html');
      });
    })
  );
});
