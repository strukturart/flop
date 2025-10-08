"use strict";

import dayjs from "dayjs";
import { status, settings } from "../../index.js";
import imageCompression from "browser-image-compression";
import localforage from "localforage";

export let info_badge = (show) => {
  let badge = document.getElementById("info-badge");
  show ? badge.classList.add("show") : badge.classList.remove("show");
};

export let setTabindex = () => {
  let visibleElements = document.querySelectorAll(
    '.item:not([style*="display: none"])'
  );

  visibleElements.forEach((element, index) => {
    if (getComputedStyle(element).display !== "none") {
      element.setAttribute("tabindex", index);
    } else {
      element.removeAttribute("tabindex");
    }
  });
};

export let load_ads = function () {
  getKaiAd({
    publisher: "4408b6fa-4e1d-438f-af4d-f3be2fa97208",
    app: "flop",
    slot: "flop",
    test: 0,
    timeout: 10000,
    h: 120,
    w: 240,
    container: document.getElementById("KaiOSads-Wrapper"),
    onerror: (err) => console.error("Error:", err),
    onready: (ad) => {
      // user clicked the ad
      ad.on("click", () => console.log("click event"));

      // user closed the ad (currently only with fullscreen)
      ad.on("close", () => console.log("close event"));

      // the ad succesfully displayed
      ad.on("display", () => {
        setTabindex();
      });

      // Ad is ready to be displayed
      // calling 'display' will display the ad
      ad.call("display", {
        navClass: "item",
        display: "block",
      });
    },
  });
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
  let lastCallbackTime = 0;

  let showPosition = function (position) {
    const now = Date.now();

    // Only proceed if 20 seconds have passed since the last callback
    if (now - lastCallbackTime >= 20000) {
      lastCallbackTime = now;
      callback(position);
    }
  };

  let error = function (error) {
    callback("error");
    switch (error.code) {
      case error.PERMISSION_DENIED:
        //side_toaster("Location not provided", 5000);
        break;
      case error.POSITION_UNAVAILABLE:
        //side_toaster("Current location not available", 5000);
        break;
      case error.TIMEOUT:
        // side_toaster("Current location not available", 5000);
        break;
      default:
        //side_toaster("Current location not available", 5000);
        break;
    }
  };

  // Use watchPosition to continuously monitor location
  const watchID = navigator.geolocation.watchPosition(showPosition, error, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000,
  });
};

export let list_files = function (filetype, callback) {
  try {
    var d = navigator.getDeviceStorage("sdcard");
    var t = false;
    var cursor = d.enumerate();

    cursor.onsuccess = function () {
      if (!this.result) {
        console.log("finished");
      }

      if (cursor.result.name !== null) {
        var file = cursor.result;
        let n = file.name.split(".");
        let file_type = n[n.length - 1];

        if (file_type == filetype) {
          callback(file.name);
          t = true;
        }
        this.continue();
      }
    };

    cursor.onerror = function () {
      console.warn("No file found: " + this.error);
    };
  } catch (e) {
    console.log(e);
  }
  if ("b2g" in navigator) {
    try {
      var sdcard = navigator.b2g.getDeviceStorage("sdcard");
      var iterable = sdcard.enumerate();
      async function printAllFiles() {
        for await (let file of iterable) {
          let n = file.name.split(".");
          let file_type = n[n.length - 1];

          if (file_type == filetype) {
            callback(file.name);
            t = true;
          }
        }
      }
      printAllFiles();
    } catch (e) {
      console.log(e);
    }
  }
};

export let clipboard = function () {
  try {
    let text =
      window.location.origin + "/#!/intro?id=" + settings.custom_peer_id;

    let input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand("copy");
    document.body.removeChild(input);
    side_toaster(
      "You can now open an app of your choice and invite a person to chat, the address that leads to the chat room is in your clipboard",
      3000
    );

    return result; // Returns true if the copy was successful, false otherwise
  } catch (error) {
    console.error("Failed to copy text: ", error);
    return false; // Returns false if an error occurred
  }
};

export function share(url) {
  return new Promise((resolve) => {
    try {
      var activity = new MozActivity({
        name: "share",
        data: {
          type: "url",
          url: url,
        },
      });

      activity.onsuccess = function () {
        resolve(true);
      };

      activity.onerror = function () {
        console.log("The activity encountered an error: " + this.error);
        resolve(false);
      };
    } catch (e) {
      // Handle the case where MozActivity is not available
    }

    if ("b2g" in navigator) {
      let activity = new WebActivity("share", {
        type: "url",
        url: url,
      });
      activity.start().then(
        () => {
          console.log("WebActivity successful");
          resolve(true);
        },
        (err) => {
          console.log(err);
          resolve(false);
        }
      );
    }

    if (status.notKaiOS) {
      let success = clipboard();
      if (success) {
        console.log("Text copied to clipboard successfully.");
        resolve(true);
      } else {
        console.log("Failed to copy text to clipboard.");
        resolve(false);
      }
    }

    if (status.os !== "unknow") {
      if (navigator.share) {
        navigator
          .share({
            title: "Flop P2P-Messenger",
            text: "Flop P2P-Messenger",
            url: url,
          })
          .then(() => {
            console.log("Successful share");
            resolve(true);
          })
          .catch((error) => {
            console.log("Error sharing", error);
            resolve(false);
          });
      } else {
        console.log("Share not supported on this browser, do it the old way.");
        resolve(false);
      }
    }
  });
}

export function open(url) {
  try {
    var activity = new MozActivity({
      name: "view",
      data: {
        type: "url",
        url: url,
      },
    });

    activity.onsuccess = function () {};

    activity.onerror = function () {
      console.log("The activity encounter en error: " + this.error);
    };
  } catch (e) {}

  if ("b2g" in navigator) {
    let activity = new WebActivity("view", {
      type: "url",
      url: url,
    });
    activity.start().then(
      (rv) => {
        console.log("Results passed back from activity handler:");
        console.log(rv);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export var sms = (n) => {
  const smsLink = document.createElement("a");

  smsLink.href = "sms:" + n;
  smsLink.textContent = "";
  document.body.appendChild(smsLink);
  smsLink.addEventListener("click", function () {});
  smsLink.click();
  document.body.removeChild(smsLink);
};

export var email = (n) => {
  var email = "";
  var subject = "";
  var emailBody = n;

  const smsLink = document.createElement("a");
  smsLink.href =
    "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
  smsLink.textContent = "";
  document.body.appendChild(smsLink);
  smsLink.addEventListener("click", function () {});
  smsLink.click();
  document.body.removeChild(smsLink);
};

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

export function get_file(filename, callback) {
  let sdcard = "";

  try {
    sdcard = navigator.getDeviceStorage("sdcard");
  } catch (e) {}

  if ("b2g" in navigator) {
    try {
      sdcard = navigator.b2g.getDeviceStorage("sdcard");
    } catch (e) {}
  }
  var request = sdcard.get(filename);

  request.onsuccess = function () {
    callback(this.result);
  };

  request.onerror = function () {
    alert("Unable to get the file: " + this.error);
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

export let pushLocalNotification = function (title, body) {
  window.Notification.requestPermission().then(() => {
    var notification = new window.Notification(title, { body: body });

    notification.onclick = function () {
      notification.close(); // Schließt die Benachrichtigung nach dem Klick

      if (navigator.mozApps) {
        // KaiOS 2: App starten mit mozApps
        var request = navigator.mozApps.getSelf();
        request.onsuccess = function () {
          if (request.result) {
            request.result.launch();
          }
        };
        request.onerror = function () {
          console.error("Fehler beim Öffnen der App:", request.error);
        };
      } else {
        // KaiOS 3: App in den Vordergrund holen oder neues Fenster öffnen
        if (document.visibilityState === "hidden") {
          window.location.href = "index.html"; // Falls App im Hintergrund läuft
        } else if ("clients" in navigator) {
          navigator.clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clients) => {
              if (clients.length > 0) {
                clients[0].focus(); // Falls App läuft, in den Vordergrund holen
              } else {
                navigator.clients.openWindow("index.html"); // Falls nicht, neu öffnen
              }
            });
        } else {
          // Fallback für ältere Geräte
          if (!window.location.href.includes("index.html")) {
            window.location.href = "index.html";
          }
        }
      }
    };
  });
};

if (navigator.mozSetMessageHandler) {
  navigator.mozSetMessageHandler("alarm", function (message) {
    pushLocalNotification("Flop", message.data.note);
  });
}

export function validate(url) {
  var pattern =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(url)) {
    return true;
  }
  return false;
}

export let getManifest = function (callback) {
  if (navigator.mozApps) {
    let self = navigator.mozApps.getSelf();
    self.onsuccess = function () {
      callback(self.result);
    };
    self.onerror = function () {};
  } else {
    fetch("/manifest.webmanifest")
      .then((r) => r.json())
      .then((parsedResponse) => callback(parsedResponse));
  }
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
  x.style.opacity = "100";
  x.innerHTML = queue_st[0].text;

  x.style.transform = "translate(0vh, 0vw)";

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
  document.querySelector("div#bottom-bar div.button-left").innerHTML = left;
  document.querySelector("div#bottom-bar div.button-center").innerHTML = center;
  document.querySelector("div#bottom-bar div.button-right").innerHTML = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#bottom-bar").style.display = "none";
  } else {
    document.querySelector("div#bottom-bar").style.display = "block";
  }
};

//top bar
export let top_bar = function (left, center, right) {
  document.querySelector("div#top-bar div.button-left").innerHTML = left;
  document.querySelector("div#top-bar div.button-center").innerHTML = center;
  document.querySelector("div#top-bar div.button-right").innerHTML = right;
  if (left == "" && center == "" && right == "") {
    document.querySelector("div#top-bar").style.display = "none";
  } else {
    document.querySelector("div#top-bar").style.display = "block";
  }
};

//get turn server urls
export let getTURN = async () => {
  const now = Date.now();

  // 1. Prüfe, ob TURN-Daten vorhanden und gültig sind
  const [cached, expiresAt] = await Promise.all([
    localforage.getItem("turn_urls"),
    localforage.getItem("turn_urls_expires"),
  ]);

  if (cached && expiresAt && now < expiresAt) {
    console.log("TURN-Server OK");
    return cached;
  }

  // 2. Neue TURN-Daten vom Server holen
  try {
    const response = await fetch(process.env.CLOUDFARE_WORKER_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.ACCESS_KEY,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`HTTP-Error: ${response.status}`);
    }

    const data = await response.json();

    const ttl = 86400; // 1day
    const expires = Date.now() + ttl * 1000;

    await Promise.all([
      localforage.setItem("turn_urls", data),
      localforage.setItem("turn_urls_expires", expires),
    ]);

    return data;
  } catch (error) {
    console.error("TURN-Server:", error);
    return null;
  }
};

//pick image
//return blob
export let pick_image = function (callback) {
  const compressImage = (fileOrBlob, filename, filetype) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: status.maxImageSize,
      useWebWorker: false,
    };

    imageCompression(fileOrBlob, options)
      .then((compressedBlob) => {
        callback({
          blob: compressedBlob,
          filename: filename || null,
          filetype: filetype || "image/jpeg",
        });
      })
      .catch((error) => {
        console.log("Image compression failed:", error);
      });
  };

  if (!status.notKaiOS) {
    try {
      let pick = new MozActivity({
        name: "pick",
        data: {
          type: ["image/png", "image/jpg", "image/jpeg"],
        },
      });

      pick.onsuccess = function () {
        const result = this.result;
        const blob = result.blob || result;

        callback({
          blob: blob,
          filename: result.name || null,
          filetype: result.type || "image/jpeg",
        });
      };

      pick.onerror = function () {
        console.log("The activity encountered an error: " + this.error);
      };
    } catch (e) {
      console.log(e);
    }

    if ("b2g" in navigator) {
      let pick = new WebActivity("pick", {
        type: "image/*",
      });

      pick.start().then(
        (rv) => {
          const blob = rv.blob || rv;
          compressImage(blob, rv.name, rv.type);
        },
        (err) => {
          console.log(err);
        }
      );
    }

    return;
  }

  // Desktop / Android Browser
  if (status.notKaiOS) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.click();

    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        compressImage(file, file.name, file.type);
      }

      fileInput.remove();
    });
  }
};

// Pick JSON file
export let pick_file = function (callback) {
  if (!status.notKaiOS) {
    try {
      let pick = new MozActivity({
        name: "pick",
        data: {
          type: ["application/json"],
        },
      });

      pick.onsuccess = function () {
        console.log("success", this.result);
        callback(this.result);
      };

      pick.onerror = function () {
        console.log("The activity encountered an error: " + this.error);
      };
    } catch (e) {
      console.log(e);
    }

    if ("b2g" in navigator) {
      let pick = new WebActivity("pick", {
        type: "application/json",
      });

      pick.start().then(
        (rv) => {
          callback(rv);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  if (status.notKaiOS) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.click();

    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            const json = JSON.parse(e.target.result);
            callback({
              json,
              blob: new Blob([e.target.result], { type: "application/json" }),
              filename: file.name,
              filetype: file.type,
            });
          } catch (err) {
            console.error("Invalid JSON:", err);
          }
        };
        reader.readAsText(file);
      }
    });
  }
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

export let downloadFile = function (filename, data, callback) {
  if (status.notKaiOS) {
    const imgSrc = data;

    // Create a link element
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = filename;

    // Append the link to the body
    document.body.appendChild(a);

    // Programmatically click the link to trigger the download
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);
  } else {
    let sdcard = "";

    try {
      sdcard = navigator.getDeviceStorage("sdcard");
    } catch (e) {}

    if ("b2g" in navigator) {
      try {
        sdcard = navigator.b2g.getDeviceStorage("sdcard");
      } catch (e) {}
    }

    fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        let request = sdcard.addNamed(blob, filename);
        request.onsuccess = function () {
          side_toaster("file downloaded", 2000);
        };

        request.onerror = function () {
          side_toaster(
            "Unable to download the file, the file probably already exists.",
            4000
          );
        };
      })
      .catch((error) => {
        side_toaster("Unable to download the file", 2000);
      });
  }
};

export let data_export = function (filename, data, callback) {
  const fn = filename + "-" + dayjs().format("YYYY-MM-DD_HH-mm-ss") + ".json";
  if (status.notKaiOS) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fn;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    if (typeof callback === "function") callback();
  } else {
    let sdcard = "";

    try {
      sdcard = navigator.getDeviceStorage("sdcard");
    } catch (e) {}

    if ("b2g" in navigator) {
      try {
        sdcard = navigator.b2g.getDeviceStorage("sdcard");
      } catch (e) {}
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    let request = sdcard.addNamed(blob, "downloads/" + fn);
    request.onsuccess = function () {
      side_toaster("file downloaded", 2000);
    };

    request.onerror = function () {
      side_toaster(
        "Unable to download the file, the file probably already exists.",
        4000
      );
    };
  }
};

export let data_import = function (filename, data, callback) {
  const fn = filename + "-" + dayjs().format("YYYY-MM-DD_HH-mm-ss") + ".json";
  if (status.notKaiOS) {
    // Konvertiere das Array in JSON und dann in einen Blob
    const jsonString = JSON.stringify(data, null, 2); // schön formatiert
    const blob = new Blob([jsonString], { type: "application/json" });

    // Erstelle einen temporären Blob-Link
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fn;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Speicher freigeben
    URL.revokeObjectURL(url);

    if (typeof callback === "function") callback();
  } else {
    let sdcard = "";

    try {
      sdcard = navigator.getDeviceStorage("sdcard");
    } catch (e) {}

    if ("b2g" in navigator) {
      try {
        sdcard = navigator.b2g.getDeviceStorage("sdcard");
      } catch (e) {}
    }

    fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        let request = sdcard.addNamed(blob, "downloads/" + fn);
        request.onsuccess = function () {
          side_toaster("file downloaded", 2000);
        };

        request.onerror = function () {
          side_toaster(
            "Unable to download the file, the file probably already exists.",
            4000
          );
        };
      })
      .catch((error) => {
        side_toaster("Unable to download the file", 2000);
      });
  }
};

// createAudioRecorder
export function createAudioRecorder() {
  let mediaRecorder = null;
  let recordedChunks = [];
  let stream = null;
  let audioContext = null;
  let analyser = null;

  async function init() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      mediaRecorder = new MediaRecorder(stream);
      recordedChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log(event.data);
        if (event.data.size > 0) recordedChunks.push(event.data);
      };

      mediaRecorder.addEventListener("error", (event) => {
        alert(`Error recording stream: ${event.error.name}`);
      });
    } catch (error) {
      alert("Error initializing MediaRecorder.");
      console.error(error);
    }
  }

  async function startRecording() {
    if (!mediaRecorder) await init();
    if (!mediaRecorder) return alert("MediaRecorder init failed.");

    recordedChunks = [];
    mediaRecorder.start();
  }

  function stopRecording() {
    return new Promise((resolve, reject) => {
      if (!mediaRecorder || mediaRecorder.state !== "recording") {
        return reject(new Error("MediaRecorder is not recording."));
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(recordedChunks, {
          type: mediaRecorder.mimeType,
        });
        cleanup();
        resolve({ audioBlob });
      };

      mediaRecorder.stop();
    });
  }

  function getStreamSourceNode() {
    return stream && audioContext
      ? audioContext.createMediaStreamSource(stream)
      : null;
  }

  function getAudioContext() {
    return audioContext;
  }

  function cleanup() {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    mediaRecorder = null;
    recordedChunks = [];
    stream = null;
    audioContext = null;
    analyser = null;
  }

  return {
    startRecording,
    stopRecording,
    getAudioContext,
    getStreamSourceNode,
    cleanup,
  };
}

export function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const binary = [...bytes].map((b) => String.fromCharCode(b)).join("");
  return btoa(binary);
}

export function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
