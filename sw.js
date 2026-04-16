const CACHE_NAME = 'startup-v1';
const ASSETS = [
  '/startup/',
  '/startup/index.html',
  '/startup/launchkit/',
  '/startup/launchkit/index.html',
  '/startup/launchkit/share.html',
  '/startup/vibeboard/',
  '/startup/vibeboard/index.html',
  '/startup/vibeboard/tool.html',
  '/startup/design-system.html',
  '/startup/404.html',
  '/startup/og-image.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/startup/404.html')))
  );
});
