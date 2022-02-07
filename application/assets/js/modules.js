//polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const modules = (() => {
  // ///////////
  // /FETCH
  // /////////

  let fetch_ics = function (url, cb) {
    let xhttp = new XMLHttpRequest({ mozSystem: true });

    xhttp.open("GET", url + "?time=" + new Date().getTime(), true);
    xhttp.timeout = 25000;
    xhttp.onload = function () {
      if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
        let data = xhttp.response;
        parse_ics(data, cb, false, true);
      }
    };

    xhttp.onerror = function () {
      helper.toaster("subscription could not be loaded", 2000);
    };

    xhttp.send(null);
  };

  function share(url, name) {
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

  return {
    share,
    fetch_ics,
  };
})();
