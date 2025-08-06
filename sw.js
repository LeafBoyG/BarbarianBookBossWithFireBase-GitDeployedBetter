const CACHE_NAME = 'barbarian-book-boss-v2'; // Updated version
const GITHUB_REPO_NAME = '/BarbarianBookBossWithFireBase-GitDeployedBetter'; 

// List of files that are essential for the app to work offline
const URLS_TO_CACHE = [
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/`,
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/index.html`,
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/style.css`,
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/script.js`,
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/manifest.json`,
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/assets/Barbs/NormalBarb.webp`,
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/assets/Barbs/AngryBarb.webp`,
    `${BarbarianBookBossWithFireBase-GitDeployedBetter}/assets/Barbs/CelebratingBarb.webp`
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