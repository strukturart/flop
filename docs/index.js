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
}, 6000);
