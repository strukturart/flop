import localforage from "localforage";

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
