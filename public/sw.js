const cacheName = "ruangibadah-offline-v1";
const appShellFiles = [
    "/",
    "/offline.html",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png"
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(appShellFiles);
        })()
    );
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return undefined;
                    }
                    return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (e) => {
    // Only cache GET and HTTP requests
    if (e.request.method !== "GET" || !e.request.url.startsWith("http")) {
        return;
    }

    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }

            try {
                const response = await fetch(e.request);
                const cache = await caches.open(cacheName);
                console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
                cache.put(e.request, response.clone());
                return response;
            } catch (error) {
                // Offline fallback for navigation
                if (e.request.mode === "navigate") {
                    const cache = await caches.open(cacheName);
                    return await cache.match("/offline.html");
                }
                throw error;
            }
        })()
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
            for (const client of clients) {
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
