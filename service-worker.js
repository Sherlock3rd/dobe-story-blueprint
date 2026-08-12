const CACHE_NAME = 'dobe-story-assets-v13';
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
  './assets/clue-scenes/recruit-one-wreck.webp',
  './assets/clue-scenes/wreck-collection-map.webp',
  './assets/clue-scenes/l07-return-gang-wall.webp',
  './assets/clue-scenes/l09-workshop-tour.webp',
  './assets/clue-scenes/l10-recruit-hugo.webp',
  './assets/clue-scenes/l15-ambush-planning.webp',
  './assets/clue-scenes/l17-allies-return-alive.webp',
  './assets/clue-scenes/l18-task-settlement.webp',
  './assets/clue-scenes/l19-promotion-traitor-meeting.webp',
  './assets/clue-scenes/l20-parallel-missions.webp',
  './assets/clue-scenes/l21-two-managers.webp',
  './assets/clue-scenes/l23-scrapyard-automation.webp',
  './assets/clue-scenes/l25-five-stage-investigation.webp',
  './assets/clue-scenes/l27-roadman-emergency.webp',
  './assets/clue-scenes/l28-rescue-assault.webp',
  './assets/clue-scenes/l29-maryl-rescued-route.webp',
  './assets/clue-scenes/l30-kenton-pursuit.webp',
  './assets/clue-scenes/l31-case-closed-promotion.webp'
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
