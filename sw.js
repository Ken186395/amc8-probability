const CACHE_NAME = 'amc8-probability-v1';
const URLS_TO_CACHE = [
  'amc8_probability.html',
  'manifest.json'
  // 如果你以后有单独的 CSS、JS、图片文件，也可以在这里加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // 优先用缓存，否则再从网络取
      return response || fetch(event.request);
    })
  );
});
