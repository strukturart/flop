import localforage from "localforage";

const userAgent =
  typeof self !== "undefined" && self.navigator && self.navigator.userAgent
    ? self.navigator.userAgent
    : "";

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

if (userAgent && !userAgent.includes("KAIOS")) {
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
        }),
    );
  });
  //cache

  if (userAgent && !userAgent.includes("KAIOS")) {
    const CACHE_NAME = "V1.17.34";
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
                      }),
                    ),
                  );
                } else {
                  console.error("Fetched data is not an array:", urlsToCache);
                }
              });
          })
          .then(() => {
            return self.skipWaiting();
          }),
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
            }),
          );
        }),
      );
    });

    // Serve files from cache when offline
    self.addEventListener("fetch", (event) => {
      const url = new URL(event.request.url);

      if (
        url.hostname === "192.168.1.101" ||
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1" ||
        url.hostname.startsWith("192.168.") ||
        url.hostname.startsWith("10.")
      ) {
        return event.respondWith(fetch(event.request));
      }

      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        }),
      );
    });
  }

  const getEntrySize = (data) => {
    const str = JSON.stringify(data);
    return str.length * 2;
  };

  async function calculateTotalStorage() {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      let { usage, quota } = await navigator.storage.estimate();

      let mb = (usage / (1024 * 1024)).toFixed(2);

      localforage.setItem("app_db_usage_mb", mb);
    } else {
      //KAIOS
      console.log("Storage api not supported");
      let totalBytes = 0;

      try {
        await localforage.iterate((value, key) => {
          totalBytes += getEntrySize(value);
        });

        let mb = (totalBytes / 1024 / 1024).toFixed(2);

        localforage.setItem("app_db_usage_mb", mb);
      } catch (err) {
        console.error(err);
      }
    }
  }

  self.addEventListener("message", async (event) => {
    if (event.data.action === "recalculateStorage") {
      calculateTotalStorage();
    }

    if (event.data?.type === "FORCE_UPDATE") {
      const cacheNames = await caches.keys();

      await Promise.all(cacheNames.map((name) => caches.delete(name)));

      await self.registration.update();
      await self.skipWaiting();
    }
  });
}
