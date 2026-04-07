import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

// Precache static assets injected by VitePWA at build time
precacheAndRoute(self.__WB_MANIFEST);

// Cache images with a Cache-First strategy
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
  }),
);

// Cache API calls with a Stale-While-Revalidate strategy
registerRoute(
  ({ url }) => url.pathname.startsWith("/api"),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
  }),
);
