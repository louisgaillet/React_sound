
const cacheName = 'React_sound' + '1.1.1';

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);
    const cachePromise = caches.open(cacheName).then(cache => {
        return cache.addAll([
            'index.html',
            './bundle.js',
            './style/style.css',
            './sounds/_upN0hmAL5A.mp4'
        ])
            .then(console.log('cache initialisé'))
            .catch(console.err);
    });

    evt.waitUntil(cachePromise);

});

self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);
    let cacheCleanedPromise = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        });
    });
    evt.waitUntil(cacheCleanedPromise);
});

self.addEventListener('fetch', (evt) => {

    // always serving css from the cache
    if(evt.request.url.includes('css')) {
        caches.open(cacheName).then(cache => {
            cache.match(evt.request);
        })
    } else {
        evt.respondWith(fetch(evt.request));
    } 
});