export function share(url, name) {
  var activity = new MozActivity({
    name: "share",
    data: {
      type: "text/calendar",
      number: 1,
      blobs: [url],
      filenames: [name],
    },
  });

  activity.onsuccess = function () {};

  activity.onerror = function () {};
}
