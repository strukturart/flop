setTimeout(() => {
  try {
    const activity = new MozActivity({
      name: "flop",
      data: window.location.href,
    });
    activity.onsuccess = function () {
      console.log("Activity successfuly handled");
    };

    activity.onerror = function () {
      console.log("The activity encouter en error: " + this.error);
      alert(this.error);
    };
  } catch (e) {}
  if ("b2g" in navigator) {
    try {
      let activity = new WebActivity("flop", {
        name: "flop",
        type: "url",
        data: window.location.href,
      });
      activity.start().then(
        (rv) => {
          console.log("Results passed back from activity handler:");
          console.log(rv);
        },
        (err) => {
          alert(err);
        }
      );
    } catch (e) {}
  }
}, 4000);
