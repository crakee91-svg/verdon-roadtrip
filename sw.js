/*
  Service worker minimal : rend le site utilisable hors-ligne après une première
  visite réussie. Stratégie "réseau d'abord" : avec du réseau, va toujours chercher
  la version la plus fraîche (et la met en cache au passage) ; hors-ligne (fetch en
  échec), sert la dernière version connue en cache. Aucune dépendance externe.

  Historique : la première version utilisait "stale-while-revalidate" (cache servi
  en premier), ce qui masquait les mises à jour du site pendant un rechargement ou
  deux après chaque déploiement — piégeant pour un site édité en continu. Réseau
  d'abord règle ça : en ligne, on voit toujours la dernière version publiée.
*/
const CACHE_NAME = "verdon-roadtrip-v2";
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
      try {
        const response = await fetch(event.request);
        if (response && response.ok) cache.put(event.request, response.clone());
        return response;
      } catch (e) {
        const cached = await cache.match(event.request);
        return cached || new Response(
          "Hors-ligne et cette page n'a jamais été chargée avec du réseau.",
          { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }
        );
      }
    })
  );
});
