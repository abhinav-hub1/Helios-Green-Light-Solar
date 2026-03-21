const CACHE_NAME = "helios-solar-v1";

// Files to cache (based on your repo)
const urlsToCache = [
  "/Helios-Green-Light-Solar/",
  "/Helios-Green-Light-Solar/index.html",
  "/Helios-Green-Light-Solar/dashboard.html",
  "/Helios-Green-Light-Solar/manifest.json",
  "/Helios-Green-Light-Solar/icon.png"
];

// Install → cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching files...");
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate → clean old cache (important for updates)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch → serve from cache first, fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        // Optional fallback (if offline and file not cached)
        return caches.match("/Helios-Green-Light-Solar/index.html");
      })
  );
});