self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Příjem zprávy z hlavní stránky
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
        const { title, body, delay } = event.data;

        // Naplánování časovače přímo v Service Workeru
        setTimeout(() => {
            self.registration.showNotification(title, {
                body: body,
                icon: 'icon.png',
                vibrate: [500, 200, 500, 200, 500, 200, 500], // Vzor vibrace (Xiaomi vibruje)
                tag: 'pwa-alarm',
                renotify: true,
                requireInteraction: true // Notifikace nezmizí, dokud na ni uživatel neklikne
            });
        }, delay);
    }
});