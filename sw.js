const CACHE_NAME = 'barbarian-book-boss-v1';
// List of files that are essential for the app to work offline
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'assets/Barbs/NormalBarb.webp',
    'assets/Barbs/AngryBarb.webp',
    'assets/Barbs/CelebratingBarb.webp'
];

// Install event: open a cache and add the core files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Fetch event: serve assets from cache if available
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response from cache
                if (response) {
                    return response;
                }
                // Not in cache - fetch from network
                return fetch(event.request);
            })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});