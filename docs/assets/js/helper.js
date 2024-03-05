"use strict";

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export let load_ads = function () {
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "assets/js/kaiads.v5.min.js";

  js.onload = function () {
    getKaiAd({
      publisher: "4408b6fa-4e1d-438f-af4d-f3be2fa97208",
      app: "flop",
      slot: "flop",
      test: 0,
      timeout: 10000,
      h: 120,
      w: 200,
      container: document.getElementById("KaiOSads-Wrapper"),
      onerror: (err) => console.error("Error:", err),
      onready: (ad) => {
        // user clicked the ad
        ad.on("click", () => console.log("click event"));

        // user closed the ad (currently only with fullscreen)
        ad.on("close", () => console.log("close event"));

        // the ad succesfully displayed
        ad.on("display", () => console.log("display event"));

        // Ad is ready to be displayed
        // calling 'display' will display the ad
        ad.call("display", {
          navClass: "iitem",
          tabIndex: 0,
          display: "block",
        });
      },
    });
  };
  document.head.appendChild(js);
};

//KaiOs store true||false
let manifest = function (a) {
  self = a.origin;
  document.getElementById("version").innerText =
    "Version: " + a.manifest.version;
  if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
    settings.ads = true;
  } else {
    settings.ads = true;
  }
};

export function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

//polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

export const geolocation = function (callback) {
  let n = document.getElementById("side-toast");

  n.style.transform = "translate(0vw,0px)";
  n.innerHTML = "determine position";

  let showPosition = function (position) {
    callback(position);
    n.style.transform = "translate(-100vw,0px)";
    n.innerHTML = "";
  };

  let error = function (error) {
    console.log(error.code);

    switch (error.code) {
      case error.PERMISSION_DENIED:
        side_toaster("Location not provided", 2000);
        break;
      case error.POSITION_UNAVAILABLE:
        side_toaster("Current location not available", 2000);
        break;
      case error.TIMEOUT:
        side_toaster("Timeout", 2000);
        break;
      default:
        side_toaster("unknown error", 2000);
        break;
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    });
  } else {
    side_toaster("Geolocation is not supported by this browser.", 2000);
  }
};

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ~~((hash << 5) - hash + str.charCodeAt(i));
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function share(url) {
  var activity = new MozActivity({
    name: "share",
    data: {
      type: "url",
      url: url,
    },
  });

  activity.onsuccess = function () {};

  activity.onerror = function () {
    console.log("The activity encounter en error: " + this.error);
  };
}

//check if internet connection
function check_iconnection() {
  function updateOfflineStatus() {
    toaster("Your Browser is offline", 15000);
    return false;
  }

  window.addEventListener("offline", updateOfflineStatus);
}

function delete_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].delete(filename);

  request.onsuccess = function () {
    //toaster("File deleted", 2000);
  };

  request.onerror = function () {
    //toaster("Unable to delete the file: " + this.error, 2000);
  };
}

function get_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].get(filename);

  request.onsuccess = function () {
    var file = this.result;
    //alert("Get the file: " + file.name);
  };

  request.onerror = function () {
    //alert("Unable to get the file: " + this.error);
  };
}

function write_file(data, filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var file = new Blob([data], {
    type: "text/plain",
  });
  var request = sdcard[1].addNamed(file, filename);

  request.onsuccess = function () {
    var name = this.result;
    //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
  };

  // An error typically occur if a file with the same name already exist
  request.onerror = function () {
    toaster("Unable to write the file: " + this.error, 2000);
  };
}

export let sort_array = function (arr, item_key, type) {
  if (type == "date") {
    arr.sort((a, b) => {
      let da = new Date(a[item_key]),
        db = new Date(b[item_key]);
      return da - db;
    });
  }

  //sort by number
  if (type == "number") {
    arr.sort((a, b) => {
      return b[item_key] - a[item_key];
    });
  }
  //sort by string
  if (type == "string") {
    arr.sort((a, b) => {
      let fa = a[item_key].toLowerCase(),
        fb = b[item_key].toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
};

let uid = function () {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
};

let notification = "";
let notify = function (param_title, param_text, param_silent) {
  var options = {
    body: param_text,
    silent: param_silent,
    requireInteraction: false,
    //actions: [{ action: "test", title: "test" }],
  };

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    notification = new Notification(param_title, options);
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        notification = new Notification(param_title, options);
      }
    });
  }
};

//https://notifications.spec.whatwg.org/#dictdef-notificationaction

const pushLocalNotification = function (title, body) {
  window.Notification.requestPermission().then((result) => {
    var notification = new window.Notification(title, {
      body: body,
      //requireInteraction: true,
    });

    notification.onerror = function (err) {
      console.log(err);
    };
    notification.onclick = function (event) {
      if (window.navigator.mozApps) {
        var request = window.navigator.mozApps.getSelf();
        request.onsuccess = function () {
          if (request.result) {
            notification.close();
            request.result.launch();
          }
        };
      } else {
        window.open(document.location.origin, "_blank");
      }
    };
    notification.onshow = function () {
      // notification.close();
    };
  });
};

export function validate(url) {
  var pattern =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(url)) {
    return true;
  }
  return false;
}

export let getManifest = function (callback) {
  if (!navigator.mozApps) {
    //let t = document.getElementById("kaisos-ads");
    //t.remove();
    return false;
  }
  let self = navigator.mozApps.getSelf();
  self.onsuccess = function () {
    callback(self.result);
  };
  self.onerror = function () {};
};

//top toaster
let queue = [];
let timeout;
export let toaster = function (text, time) {
  queue.push({ text: text, time: time });
  if (queue.length === 1) {
    toast_q(text, time);
  }
};

let toast_q = function (text, time) {
  var x = document.querySelector("div#toast");
  x.innerHTML = queue[0].text;

  x.style.transform = "translate(0px, 0px)";

  timeout = setTimeout(function () {
    timeout = null;
    x.style.transform = "translate(0px, -100px)";
    queue = queue.slice(1);
    if (queue.length > 0) {
      setTimeout(() => {
        toast_q(text, time);
      }, 1000);
    }
  }, time);
};

//side toaster

let queue_st = [];
export let side_toaster = function (text, time) {
  queue_st.push({ text: text, time: time });
  if (queue_st.length === 1) {
    toast_qq(text, time);
  }
};

let toast_qq = function (text, time) {
  var x = document.querySelector("div#side-toast");
  x.innerHTML = queue_st[0].text;

  x.style.transform = "translate(0vh, 0px)";

  timeout = setTimeout(function () {
    x.style.transform = "translate(-100vw,0px)";
    queue_st = queue.slice(1);
    if (queue_st.length > 0) {
      setTimeout(() => {
        toast_qq(text, time);
      }, 1000);
    }
  }, time);
};

//bottom bar
export let bottom_bar = function (left, center, right) {
  document.querySelector("div#bottom-bar div#button-left").innerHTML = left;
  document.querySelector("div#bottom-bar div#button-center").innerHTML = center;
  document.querySelector("div#bottom-bar div#button-right").innerHTML = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#bottom-bar").style.display = "none";
  } else {
    document.querySelector("div#bottom-bar").style.display = "block";
  }
};

//top bar
export let top_bar = function (left, center, right) {
  document.querySelector("div#top-bar div.button-left").innerHTML = left;
  document.querySelector("div#top-bar div.button-center").textContent = center;
  document.querySelector("div#top-bar div.button-right").textContent = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#top-bar").style.display = "none";
  } else {
    document.querySelector("div#top-bar").style.display = "block";
  }
};

let add_script = function (script) {
  document.body.appendChild(document.createElement("script")).src = script;
};

let lock;
let screenlock = function (stat) {
  if (typeof window.navigator.requestWakeLock === "undefined") {
    return false;
  }
  if (stat == "lock") {
    lock = window.navigator.requestWakeLock("screen");
    lock.onsuccess = function () {};
    lock.onerror = function () {
      alert("An error occurred: " + this.error.name);
    };
  }

  if (stat == "unlock") {
    if (lock.topic == "screen") {
      lock.unlock();
    }
  }
};

//filesize
function formatFileSize(bytes, decimalPoint) {
  if (bytes || bytes > 0 || bytes != undefined || bytes != NaN) {
    var k = 1000,
      dm = decimalPoint || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}

//pick image
export let pick_image = function (cb) {
  var activity = new MozActivity({
    name: "pick",
    data: {
      type: ["image/png", "image/jpg", "image/jpeg"],
    },
  });

  activity.onsuccess = function () {
    console.log("success");
    let p = this.result;
    cb(p);
  };

  activity.onerror = function () {
    console.log("The activity encouter en error: " + this.error);
  };
};

//delete file
export function deleteFile(storage, path, notification) {
  let sdcard = navigator.getDeviceStorages("sdcard");

  let requestDel = sdcard[storage].delete(path);

  requestDel.onsuccess = function () {
    if (notification == "notification") {
      helper.toaster(
        'File "' + name + '" successfully deleted frome the sdcard storage area'
      );
    }
  };

  requestDel.onerror = function () {
    helper.toaster("Unable to delete the file: " + this.error);
  };
}
