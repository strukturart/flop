const activity = new MozActivity({
  name: "flop",
  data: window.location,
});
activity.onsuccess = function () {
  alert("Activity successfuly handled");
};

activity.onerror = function () {
  alert("The activity encouter en error: " + this.error);
};
