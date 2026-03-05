// RuangIbadah Service Worker v4
// Offline-first with explicit offline fallback page

const CACHE_NAME = 'ruangibadah-v4';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
    '/',
    '/offline.html',
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

// Install — pre-cache static assets including offline page
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching static assets');
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
                names
                    .filter((n) => n !== CACHE_NAME)
                    .map((n) => caches.delete(n))
            );

            // Enable navigation preload if supported
            if (self.registration.navigationPreload) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );
    self.clients.claim();
});

// Fetch handler — offline-capable
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET and non-http(s) requests
    if (request.method !== 'GET') return;
    if (!request.url.startsWith('http')) return;

    // Navigation requests — network first, offline fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    // Try navigation preload first
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    // Try network
                    const networkResponse = await fetch(request);
                    // Cache successful navigation for offline
                    if (networkResponse.ok) {
                        const cache = await caches.open(CACHE_NAME);
                        cache.put(request, networkResponse.clone());
                    }
                    return networkResponse;
                } catch (error) {
                    // Network failed — try cache first
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(request);
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Last resort — serve offline page
                    return cache.match(OFFLINE_URL);
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

    // Static assets — cache first, network fallback
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) {
                // Return cached version, update in background
                fetch(request).then((response) => {
                    if (response.ok) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, response));
                    }
                }).catch(() => { });
                return cached;
            }

            // Not in cache — fetch from network and cache it
            return fetch(request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return response;
            }).catch(() => {
                // Return nothing if both cache and network fail
                return new Response('', { status: 408, statusText: 'Offline' });
            });
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
            for (const client of clients) {
                if ('focus' in client) {
                    return client.focus();
                }
            }
            return self.clients.openWindow('/');
        })
    );
});
