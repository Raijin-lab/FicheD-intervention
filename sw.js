const CACHE_NAME = 'a2cim-fiche-v5';
const urlsToCache = [
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Fichiers mis en cache avec succès');
            return cache.addAll(urlsToCache);
        })
    );
});

// Récupération depuis le cache pour le fonctionnement hors-ligne
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Retourne le fichier en cache s'il existe, sinon va le chercher sur le réseau
            return response || fetch(event.request);
        })
    );
});
