//workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.googleAnalytics.initialize();

workbox.routing.registerRoute("/", workbox.strategies.networkFirst());