const CACHE_NAME = "rail-scoping-suite-v2";

const ASSETS_TO_CACHE = [
  "/rail-scoping-suite/",
  "/rail-scoping-suite/index.html",

  "/rail-scoping-suite/Platform/index.html",
  "/rail-scoping-suite/track/index.html",

  "/rail-scoping-suite/manifest.json",
  "/rail-scoping-suite/service-worker.js",
  "/rail-scoping-suite/icon-192.png",
  "/rail-scoping-suite/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
