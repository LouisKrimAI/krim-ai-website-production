/* Self-destroying service worker.
   An earlier deployment of krim.ai registered a service worker that still
   serves a stale copy of the site from Cache Storage in returning visitors'
   browsers. This replacement takes over on the browser's next update check,
   deletes every cache, unregisters itself, and reloads any open tabs so the
   visitor lands on the live site. Keep this file deployed permanently: it is
   the eviction notice for every browser that still holds the old worker. */

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      } catch (_) {}
      try {
        await self.registration.unregister()
      } catch (_) {}
      try {
        const clients = await self.clients.matchAll({ type: 'window' })
        for (const client of clients) {
          client.navigate(client.url)
        }
      } catch (_) {}
    })()
  )
})
