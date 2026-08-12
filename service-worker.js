const CACHE_NAME = 'dobe-story-assets-v9';
const CACHED_ASSETS = [
  './assets/clue-scenes/chase-police.webp',
  './assets/clue-scenes/cargo-ambush-rescue.webp',
  './assets/clue-scenes/highway-gunfight.webp',
  './assets/clue-scenes/tow-convoy.webp',
  './assets/clue-scenes/gang-convoy-formation.webp',
  './assets/clue-scenes/garage-repair-nitrous.webp',
  './assets/clue-scenes/one-on-one-race.webp',
  './assets/clue-scenes/garage-explosion.webp',
  './assets/clue-scenes/scrapyard-salvage.webp',
  './assets/clue-scenes/council-promotion.webp',
  './assets/clue-scenes/memorial-succession.webp',
  './assets/clue-scenes/blond-ally-sacrifice.webp',
  './assets/clue-scenes/workshop-takeover-dispatch.webp',
  './assets/clue-scenes/assassination-hero-rescue.webp',
  './assets/clue-scenes/informant-interrogation.webp',
  './assets/clue-scenes/police-split-assist.webp',
  './assets/clue-scenes/self-bike-upgrade.webp',
  './assets/clue-scenes/member-bike-service.webp',
  './assets/clue-scenes/race-invitation-bad-bike.webp',
  './assets/clue-scenes/blond-ally-highway-sacrifice.webp',
  './assets/clue-scenes/revenge-car-rebuild.webp',
  './assets/clue-scenes/scrapyard-takeover-keys.webp',
  './assets/clue-scenes/workshop-bomb-repair.webp',
  './assets/clue-scenes/recruit-one-wreck.webp'
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
