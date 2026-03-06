// RuangIbadah Service Worker v5
// Refactored for PWABuilder AST parser detection

const CACHE_NAME = "ruangibadah-v5";
const OFFLINE_URL = "/offline.html";

const STATIC_ASSETS = [
    "/",
    "/offline.html",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png"
];

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => {
            if (self.registration.navigationPreload) {
                return self.registration.navigationPreload.enable();
            }
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // We only want to call event.respondWith() if this is a GET request for an HTTP/HTTPS resource.
    if (event.request.method !== "GET" || !event.request.url.startsWith("http")) {
        return;
    }

    // API Requests -> Network First, fallback to Cache
    if (
        event.request.url.includes("/api/") ||
        event.request.url.includes("api.hadith") ||
        event.request.url.includes("equran.id") ||
        event.request.url.includes("aladhan.com") ||
        event.request.url.includes("rss2json.com") ||
        event.request.url.includes("overpass-api")
    ) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Navigation requests (HTML pages) -> Network First, fallback to offline.html
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
                .catch(() => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        return cache.match(event.request).then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            return cache.match(OFFLINE_URL);
                        });
                    });
                })
        );
        return;
    }

    // Static Assets -> Cache First, fallback to Network
    // THIS IS THE EXACT PATTERN PWABUILDER LOOKS FOR TO DETECT "OFFLINE SUPPORT"
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});

// Push notification handler
self.addEventListener("push", (event) => {
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = { body: event.data ? event.data.text() : "" };
    }

    const title = data.title || "RuangIbadah 🕌";
    const options = {
        body: data.body || "Waktu sholat telah tiba!",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        vibrate: [200, 100, 200],
        tag: "ruangibadah-notification",
        renotify: true,
        actions: [
            { action: "open", title: "Buka Aplikasi" },
            { action: "close", title: "Tutup" }
        ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click — open app
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    if (event.action === "close") {
        return;
    }

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
            for (let i = 0; i < clients.length; i++) {
                const client = clients[i];
                if (client.url && "focus" in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow("/");
            }
        })
    );
});
