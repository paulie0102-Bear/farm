const CACHE_NAME = "secret-garden-v1";

const CACHE_FILES = [
    "./",
    "./index.html"
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache){
                return cache.addAll(CACHE_FILES);
            })
    );

    self.skipWaiting();
});

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(
                keys.map(function(key){
                    if(key !== CACHE_NAME){
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                return response || fetch(event.request);
            })
    );
});