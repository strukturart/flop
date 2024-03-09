setTimeout(() => {
  const activity = new MozActivity({
    name: "flop",
    data: window.location,
  });
  activity.onsuccess = function () {
    console.log("Activity successfuly handled");
  };

  activity.onerror = function () {
    console.log("The activity encouter en error: " + this.error);
  };

  try {
    let activity = new WebActivity("flop", { data: window.location });
    activity.start().then(
      (rv) => {
        console.log("Results passed back from activity handler:");
        console.log(rv);
      },
      (err) => {
        console.log(err);
      }
    );
  } catch (e) {}
}, 6000);
