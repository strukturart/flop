import localforage from "localforage";

const channel = new BroadcastChannel("sw-messages");

self.onsystemmessage = (evt) => {
  const serviceHandler = () => {
    if (evt.name === "activity") {
      handler = evt.data.webActivityRequestHandler();

      if (handler.source.name == "flop") {
        self.clients.openWindow("index.html");

        localforage
          .setItem("connect_to_id", handler.source.data.data.href)
          .then((e) => {});
      }
    }
  };
  evt.waitUntil(serviceHandler());
};
