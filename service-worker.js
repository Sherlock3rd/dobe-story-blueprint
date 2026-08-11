const CACHE_NAME = 'dobe-story-assets-v6';
const CACHED_ASSETS = [
  './assets/clue-scenes/chase-police-hd2.webp',
  './assets/clue-scenes/cargo-ambush-rescue-hd2.webp',
  './assets/clue-scenes/highway-gunfight-hd2.webp',
  './assets/clue-scenes/tow-convoy-hd2.webp',
  './assets/clue-scenes/gang-convoy-formation-hd2.webp',
  './assets/clue-scenes/garage-repair-nitrous-hd2.webp',
  './assets/clue-scenes/one-on-one-race-hd2.webp',
  './assets/clue-scenes/garage-explosion-hd2.webp',
  './assets/clue-scenes/scrapyard-salvage-hd2.webp',
  './assets/clue-scenes/council-promotion-hd2.webp',
  './assets/clue-scenes/memorial-succession-hd2.webp',
  './assets/clue-scenes/blond-ally-sacrifice-hd2.webp',
  './assets/clue-scenes/workshop-takeover-dispatch-hd2.webp',
  './assets/clue-scenes/assassination-hero-rescue-hd2.webp',
  './assets/clue-scenes/informant-interrogation-hd2.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHED_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('dobe-story-assets-') && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.pathname.includes('/assets/clue-scenes/') || !url.pathname.endsWith('.webp')) return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      return response;
    }))
  );
});
