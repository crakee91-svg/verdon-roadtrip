/*
  Service worker minimal : rend le site utilisable hors-ligne après une première
  visite réussie. Stratégie "stale-while-revalidate" : sert le cache immédiatement
  (rapide, marche sans réseau), et va chercher une version fraîche en arrière-plan
  pour la prochaine visite. Aucune dépendance externe.
*/
const CACHE_NAME = "verdon-roadtrip-v1";
const CORE_ASSETS = ["./", "./index.html", "./style.css", "./script.js", "./data.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => { /* si un asset manque, on ne bloque pas l'install */ })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => null);
      return cached || (await network) || new Response(
        "Hors-ligne et cette page n'a jamais été chargée avec du réseau.",
        { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    })
  );
});
