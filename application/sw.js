import localforage from "localforage";
const userAgent = navigator.userAgent || "";
//KaiOS 3 open app
if (userAgent && !userAgent.includes("KAIOS")) {
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
    icon: "/assets/icons/icon-512.png",
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "New Message", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (var i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          if (client.url == "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) {
          return clients
            .openWindow(new URL("/", self.location.origin))
            .then((w) => w.focus());
        }
        if (clients.openApp) {
          return clients.openApp();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

if (userAgent && !userAgent.includes("KAIOS")) {
  const CACHE_NAME = "pwa-cache-v0.24529";
  const FILE_LIST_URL = "/file-list.json"; // URL of the JSON file containing the array of files

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => {
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
          return self.skipWaiting();
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
