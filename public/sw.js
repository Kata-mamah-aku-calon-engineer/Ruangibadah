// RuangIbadah Service Worker v3
// Caching strategies: Network-first for API, Stale-while-revalidate for pages

const CACHE_NAME = 'ruangibadah-v3';
const OFFLINE_URL = '/';

const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
];

// Listen for skip waiting message
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Install — pre-cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate — clean old caches + enable navigation preload
self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Clean old caches
            const names = await caches.keys();
            await Promise.all(
                names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
            );

            // Enable navigation preload if supported
            if ('navigationPreload' in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );
    self.clients.claim();
});

// Fetch handler
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and non-http(s) requests
    if (!request.url.startsWith('http')) return;

    // Navigation requests — network first with preload support
    if (request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    // Try navigation preload response first
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    // Then try network
                    const networkResponse = await fetch(request);
                    // Cache the page for offline use
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                } catch (error) {
                    // Offline — serve from cache
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(request);
                    return cachedResponse || cache.match(OFFLINE_URL);
                }
            })()
        );
        return;
    }

    // API requests — network first, cache as backup
    if (
        request.url.includes('/api/') ||
        request.url.includes('api.hadith') ||
        request.url.includes('equran.id') ||
        request.url.includes('aladhan.com') ||
        request.url.includes('rss2json.com') ||
        request.url.includes('overpass-api')
    ) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Static assets — stale while revalidate
    event.respondWith(
        caches.match(request).then((cached) => {
            const fetchPromise = fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    }
                    return response;
                })
                .catch(() => cached);

            return cached || fetchPromise;
        })
    );
});

// Push notification handler
self.addEventListener('push', (event) => {
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = { body: event.data ? event.data.text() : '' };
    }

    const title = data.title || 'RuangIbadah 🕌';
    const options = {
        body: data.body || 'Waktu sholat telah tiba!',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'ruangibadah-notification',
        renotify: true,
        actions: [
            { action: 'open', title: 'Buka Aplikasi' },
            { action: 'close', title: 'Tutup' },
        ],
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click — open app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') return;

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
            // Focus existing window if available
            for (const client of clients) {
                if (client.url.includes('ruangibadah') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open new window
            return self.clients.openWindow('/');
        })
    );
});
