const channel = new BroadcastChannel("sw-messages");

self.onsystemmessage = (evt) => {
  channel.postMessage({
    "url": "test",
  });

  try {
    const serviceHandler = () => {
      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == "flop") {
          let code = activityData;

          channel.postMessage({
            "url": code,
          });
        }
      }
    };
    evt.waitUntil(serviceHandler());
  } catch (e) {
    channel.postMessage({ "error": e });
  }
};
