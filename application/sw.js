import localforage from "localforage";

const channel = new BroadcastChannel("sw-messages");

//KaiOS 3 open app
self.onsystemmessage = (evt) => {
  const serviceHandler = () => {
    if (evt.name === "activity") {
      handler = evt.data.webActivityRequestHandler();

      if (handler.source.name == "flop") {
        localforage
          .setItem("connect_to_id", handler.source.data)
          .then((e) => {});

        self.clients.openWindow("index.html");
      }
    }
  };
  evt.waitUntil(serviceHandler());
};

const userAgent = navigator.userAgent || "";

if (userAgent && !userAgent.includes("KAIOS")) {
  const CACHE_NAME = "pwa-cache-v0.19808";
  const FILE_LIST_URL = "/file-list.json"; // URL of the JSON file containing the array of files

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          console.log("Opened cache");

          // Fetch the file list JSON and cache the URLs
          return fetch(FILE_LIST_URL)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json(); // Parse the JSON response
            })
            .then((urlsToCache) => {
              // Ensure urlsToCache is an array
              if (Array.isArray(urlsToCache)) {
                return Promise.all(
                  urlsToCache.map((url) =>
                    cache.add(url).catch((error) => {
                      console.error(`Failed to cache ${url}:`, error);
                    })
                  )
                );
              } else {
                console.error("Fetched data is not an array:", urlsToCache);
              }
            });
        })
        .then(() => {
          return self.skipWaiting(); // Skip waiting and activate the new SW immediately
        })
    );
  });

  self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  // Serve files from cache when offline
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // If the request is in the cache, return it. Otherwise, fetch from the network.
        return response || fetch(event.request);
      })
    );
  });
}

self.addEventListener("push", function (event) {
  if (!event.data) {
    console.log("Push event but no data");
    return;
  }

  let data;
  try {
    data = event.data.json();
  } catch (e) {
    console.error("Push event data is not JSON:", e);
    return;
  }

  const options = {
    body: data.body || "No content",
    icon: data.icon || "/default-icon.png",
    badge: data.badge || "/default-badge.png",
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "New Message", options)
  );
});
