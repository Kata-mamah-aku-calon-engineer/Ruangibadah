// PWABuilder-compatible Service Worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";
const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.add(offlineFallbackPage))
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;

                if (preloadResp) {
                    return preloadResp;
                }

                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {
                const cache = await caches.open(CACHE);
                const cachedResp = await cache.match(offlineFallbackPage);
                return cachedResp;
            }
        })());
    }
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
