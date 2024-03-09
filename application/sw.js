self.onsystemmessage = (evt) => {
  try {
    const serviceHandler = async () => {
      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == "greg-oauth") {
          let code = activityData.code;

          const url = "/oauth.html?code=" + code;
          channel.postMessage({
            oauth_success: url,
          });
        }
      }

      if (evt.name === "alarm") {
        let m = evt.data.json();

        if (m.data.note == "keep alive") {
          sync_caldav();

          self.registration.showNotification("Test", {
            body: m.data.note,
          });

          localforage
            .getItem("settings")
            .then(function (e) {
              if (e.background_sync == "Yes") {
                var d = new Date();
                d.setMinutes(d.getMinutes() + 2);

                let options = {
                  date: d,
                  data: { note: "keep alive", type: "background_sync" },
                  ignoreTimezone: false,
                };

                navigator.b2g.alarmManager.add(options).then(
                  channel.postMessage({
                    action: "background_sync",
                    content: "",
                  })
                );
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          self.registration.showNotification("Greg", {
            body: m.data.note,
          });
        }
      }
    };

    evt.waitUntil(serviceHandler());
  } catch (e) {
    channel.postMessage({ action: "error", content: e });
  }
};
