"use strict";

import {
  bottom_bar,
  side_toaster,
  pick_image,
  month,
  generateRandomString,
  load_ads,
  share,
  top_bar,
  getManifest,
  setTabindex,
  downloadFile,
} from "./assets/js/helper.js";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import localforage from "localforage";
import * as linkify from "linkifyjs";
import {
  geolocation,
  pushLocalNotification,
  detectMobileOS,
} from "./assets/js/helper.js";
import m from "mithril";
import qrious from "qrious";
import { v4 as uuidv4 } from "uuid";
import "webrtc-adapter";
import { createAudioRecorder } from "./assets/js/helper.js";
import L from "leaflet";

//github.com/laurentpayot/minidenticons#usage
export let status = {
  visibility: true,
  action: "",
  deviceOnline: true,
  userOnline: 0,
  notKaiOS: window.innerWidth > 300 ? true : false,
  os: detectMobileOS(),
  ownPeerId: "",
  current_article_type: "",
  current_user_id: "",
  current_user_nickname: "",
  current_room: "",
  users_geolocation: [],
  userMarkers: [],
};

if ("b2g" in navigator || "navigator.mozApps" in navigator)
  status.notKaiOS = false;

export let settings = {};

const channel = new BroadcastChannel("sw-messages");

let links = "";
let chat_data = [];
let lastPeerId = null;
let peer = null;
let conn = "";

let connectedPeers = [];

//.env turn server
let debug = false;

if (debug) {
  window.onerror = function (msg, url, linenumber) {
    alert(
      "Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber
    );
    return true;
  };
}

//open KaiOS app
let app_launcher = () => {
  var currentUrl = window.location.href;

  // Check if the URL includes 'id='
  if (!currentUrl.includes("id=")) return false;

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
};

window.addEventListener("online", () => {
  status.deviceOnline = true;
});
window.addEventListener("offline", () => {
  status.deviceOnline = false;
});

// Function to check if an element already exists in chat_data
function elementExists(chat_data, criteria) {
  return chat_data.some((element) => {
    return Object.keys(criteria).every((key) => element[key] === criteria[key]);
  });
}

let compareUserList = (userlist) => {
  const filteredUserList = userlist.filter((userId) => userId !== peer.id);
  userlist = filteredUserList;
  userlist.forEach((user) => {
    if (!connectedPeers.includes(user)) {
      try {
        conn = peer.connect(user, {
          label: "chat",
          reliable: true,
        });
        conn.on("open", () => {
          setupConnectionEvents(conn);
        });
      } catch (e) {
        console.log("try to connect failed" + e);
      }
    } else {
      console.log(user, "already connected");
    }
  });
};

//add to addressbook

let addressbook = [];
localforage
  .getItem("addressbook")
  .then((e) => {
    if (e !== null) addressbook = e;
  })
  .catch(() => {});

let addUserToAddressBook = (a, b) => {
  if (!Array.isArray(addressbook)) {
    console.error("addressbook is not defined or is not an array");
    return;
  }

  function hasEmptyValues(obj) {
    return (
      obj.id === undefined ||
      obj.id === null ||
      obj.id === "" ||
      obj.name === undefined ||
      obj.name === null ||
      obj.name === ""
    );
  }

  //addressbook = addressbook.filter((obj) => !hasEmptyValues(obj));

  let exists = addressbook.some((e) => e.id == a);

  if (!exists) {
    addressbook.push({ id: a, nickname: b });

    localforage
      .setItem("addressbook", addressbook)
      .then((e) => {
        side_toaster("done", 3000);
        console.log(e);
      })
      .catch(() => {});
  } else {
    side_toaster("user still exist", 3000);
  }
};

//track single connections
//to update connections list
function setupConnectionEvents(conn) {
  if (connectedPeers.includes(conn.peer)) {
    return false;
  }
  connectedPeers.push(conn.peer);

  const userId = conn.peer;

  let pc = conn.peerConnection;

  if (pc) {
    pc.addEventListener("negotiationneeded", (event) => {
      console.log(event);
    });

    pc.addEventListener("icecandidateerror", (event) => {
      side_toaster(event.errorText, 5000);
    });

    pc.addEventListener("iceconnectionstatechange", () => {
      if (pc.iceConnectionState === "disconnected") {
        side_toaster(`User has left the chat`, 1000);
        connectedPeers = connectedPeers.filter((c) => c !== userId);
        updateConnections();
      }

      if (pc.iceConnectionState === "connected") {
        side_toaster(`User has entered`, 1000);
        remove_no_user_online();

        updateConnections();
      }
    });
  }

  conn.on("data", function (data) {
    document.querySelector(".loading-spinner").style.display = "none";
    remove_no_user_online();

    if (
      data.type == "image" ||
      data.type == "text" ||
      data.type == "gps_live" ||
      data.type == "gps" ||
      data.type == "audio"
    ) {
      if (data.type == "image") {
        if (!status.visibility) pushLocalNotification("flop", "new message");

        chat_data.push({
          nickname: data.nickname,
          userId: data.userId,
          content: "",
          datetime: new Date(),
          image: data.file,
          filename: data.filename,
          type: data.type,
        });

        m.redraw();
        focus_last_article();
        stop_scan();
      }

      if (data.type == "text") {
        if (!status.visibility) pushLocalNotification("flop", data.content);

        chat_data.push({
          nickname: data.nickname,
          content: data.content,
          datetime: new Date(),
          type: data.type,
          userId: data.userId,
        });
        m.redraw();
        focus_last_article();
        stop_scan();
      }

      if (data.type == "audio") {
        const audioBuffer = new Uint8Array(data.content);
        const audioBlob = new Blob([audioBuffer], { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);

        chat_data.push({
          nickname: data.nickname,
          content: url,
          datetime: new Date(),
          type: data.type,
          userId: data.userId,
        });
      }

      if (data.type == "gps") {
        let f = JSON.parse(data.content);

        let link_url =
          "https://www.openstreetmap.org/#map=19/" + f.lat + "/" + f.lng;

        chat_data.push({
          nickname: data.nickname,
          content: link_url,
          datetime: new Date(),
          type: data.type,
          userId: data.userId,
          gps: data.content,
        });
      }

      if (data.type == "gps_live") {
        let existingMsg = chat_data.find((item) => item.type === "gps_live");
        let f = JSON.parse(data.content);

        let link_url =
          "https://www.openstreetmap.org/#map=19/" + f.lat + "/" + f.lng;

        if (existingMsg) {
          existingMsg.content = link_url;
          existingMsg.datetime = new Date();

          //store different users location
          //to create/update markers on map
          let e = status.users_geolocation.find(
            (item) => item.userId === data.userId
          );
          if (e) {
            e.gps = data.content;
          } else {
            status.users_geolocation.push({
              userId: data.userId,
              gps: data.content,
            });
          }
        } else {
          // Push a new GPS message if not found

          chat_data.push({
            nickname: data.nickname,
            content: link_url,
            datetime: new Date(),
            type: data.type,
            userId: data.userId,
            gps: data.content,
          });
        }

        m.redraw();
      }
    } else {
      if (data.userlist) {
        compareUserList(data.userlist);
      }
    }
  });

  // Event handler for successful connection
  conn.on("open", function () {
    document.querySelector(".loading-spinner").style.display = "none";
    side_toaster("Connected", 5000);
    m.redraw();
    stop_scan();
  });

  // Event handler for connection closure

  conn.on("close", () => {
    side_toaster(`User has left the chat`, 1000);
    console.log(conn.peer);
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
    updateConnections();
  });

  conn.on("disconnected", () => {
    // conn.reconnect();

    side_toaster(`User has been disconnected`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== userId);
    updateConnections();
  });
  // Event handler for connection errors

  conn.on("error", () => {
    side_toaster(`User has been disconnected`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== userId);
    updateConnections();
  });
}

function updateConnections() {
  status.userOnline = connectedPeers.length;
  if (
    status.notKaiOS == true &&
    status.userOnline > 0 &&
    m.route.get() == "chat"
  ) {
    document.querySelector("img.users").setAttribute("title", status.online);
    if (status.notKaiOS)
      top_bar(
        "<img class='users' title='0' src='assets/image/monster.svg'>",
        "",
        "<img src='assets/image/back.svg'>"
      );
  }
}

let ice_servers = {
  "iceServers": [{ urls: "stun:stun.l.google.com:19302" }],
};

const remove_no_user_online = () => {
  chat_data = chat_data.filter((e) => {
    return e.id !== "no-other-user-online";
  });

  m.redraw();
};

let get_manifest_callback = (e) => {
  console.log(e);
  let version;

  if (navigator.mozApps) {
    version = e.manifest.version;
  } else {
    version = e.b2g_features.version;
  }

  status.version = version;
  localStorage.setItem("version", version);
};
getManifest(get_manifest_callback);

//load ICE Server
async function getIceServers() {
  document.querySelector(".loading-spinner").style.display = "block";

  try {
    const response = await fetch(
      "https://" +
        process.env.TURN_APP_NAME +
        ".metered.live/api/v1/turn/credentials?apiKey=" +
        process.env.TURN_APP_KEY
    );

    if (!response.ok) {
      document.querySelector(".loading-spinner").style.display = "none";
      alert("can't load turn");
    }

    const a = await response.json();

    a.forEach((e) => {
      ice_servers.iceServers.push(e);
    });

    if (peer) {
      try {
        closeAllConnections();
      } catch (e) {
        console.log(e);
      }

      peer.destroy();
    }

    peer = new Peer(settings.custom_peer_id, {
      debug: 0,
      secure: false,
      config: ice_servers,
      referrerPolicy: "no-referrer",
    });

    peer.on("open", function () {
      if (peer.id == null) peer.id = settings.custom_peer_id;

      document.querySelector(".loading-spinner").style.display = "none";

      status.ownPeerId = peer.id;
    });

    peer.on("connection", function (c) {
      //store all connections
      document.querySelector(".loading-spinner").style.display = "none";
      setupConnectionEvents(c);
    });

    peer.on("disconnected", function () {
      try {
        side_toaster("disconnected", 2000);
        m.route.set("/start");
        //peer.reconnect();
      } catch (e) {
        console.log("reconnect error: " + e);
      }
    });

    peer.on("close", function () {
      //side_toaster("connection closed", 1000);
      document.querySelector(".loading-spinner").style.display = "none";
    });

    peer.on("error", function (err) {
      side_toaster("connection error " + err.type, 8000);
      document.querySelector(".loading-spinner").style.display = "none";
    });
  } catch (error) {
    document.querySelector(".loading-spinner").style.display = "none";
    side_toaster("please retry to connect", 2000);
  }
}

//load settings
localforage
  .getItem("settings")
  .then(function (value) {
    // If settings are not present, provide default values for each key
    settings = value || {};

    const defaultValues = {
      nickname: generateRandomString(10),
      server_url: "0.peerjs.com",
      server_path: "/",
      server_port: "443",
      invite_url: "https://flop.bhackers.uber.space/",
      custom_peer_id: "flop-" + uuidv4(16),
    };

    for (const key in defaultValues) {
      if (!(key in settings)) {
        settings[key] = defaultValues[key];
      }
    }

    if (value == null) {
      settings = defaultValues;
      localforage.setItem("settings", settings).then(() => {
        console.log("stored the first time");
      });
    }
  })
  .catch(function (err) {
    console.log(err);
  });

let warning_leave_chat = function () {
  status.action = "confirm";
  if (confirm("Do you really want leave the room?")) {
    m.route.set("/start");
    setTimeout(function () {
      status.action = "";
      peer.destroy();
    }, 1000);
  } else {
    setTimeout(function () {
      status.action = "";
    }, 1000);
  }
};

let write = function () {
  if (status.action != "write") {
    if (document.getElementById("message-input") != null) {
      document.getElementById("message-input").style.display = "block";
      document.querySelector("div#message-input input").focus();
    }
    status.action = "write";
  } else {
    if (document.getElementById("message-input") != null) {
      document.querySelector("div#message-input input").value = "";
      document.getElementById("message-input").style.display = "none";
    }

    focus_last_article();
    status.action = "";
  }
};

const focus_last_article = function () {
  setTimeout(function () {
    let a = document.querySelectorAll("div#app article");
    a[a.length - 1].focus();

    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.activeElement.parentElement.parentElement.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });
  }, 1000);
};

function sendMessage(msg, type) {
  if (type == "image") {
    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      let src = URL.createObjectURL(msg.blob);

      chat_data.push({
        nickname: settings.nickname,
        content: "",
        datetime: new Date(),
        image: src,
        filename: msg.filename,
        type: type,
      });

      msg = {
        file: reader.result,
        filename: msg.filename,
        filetype: msg.type,
        nickname: settings.nickname,
        userId: settings.custom_peer_id,
        type: type,
      };
      sendMessageToAll(msg);

      focus_last_article();
    };
    reader.onerror = (e) => {
      alert("error");
    };
    reader.readAsDataURL(msg.blob);
  }
  if (type == "text") {
    if (msg == "") return false;
    msg = {
      nickname: settings.nickname,
      type: type,
      userId: settings.custom_peer_id,
      content: msg,
    };
    chat_data.push({
      nickname: settings.nickname,
      content: msg.content,
      datetime: new Date(),
      type: type,
    });

    console.log(msg);

    sendMessageToAll(msg);

    focus_last_article();
    write();
  }

  if (type == "gps_live") {
    if (msg == "") return false;
    let existingMsg = chat_data.find((item) => item.type === "gps_live");

    let m = JSON.parse(msg);
    let link_url =
      "https://www.openstreetmap.org/#map=19/" + m.lat + "/" + m.lng;

    if (existingMsg) {
      // Update the existing GPS message
      existingMsg.content = link_url;
      existingMsg.datetime = new Date();
    } else {
      // Push a new GPS message if not found

      chat_data.push({
        nickname: settings.nickname,
        content: link_url,
        datetime: new Date(),
        type: type,
        userId: settings.custom_peer_id,
        gps: msg,
      });
    }

    msg = {
      content: msg,
      nickname: settings.nickname,
      type: type,
      userId: settings.custom_peer_id,
      gps: msg,
    };
    sendMessageToAll(msg);
  }

  if (type == "gps") {
    if (msg == "") return false;

    let m = JSON.parse(msg);
    let link_url =
      "https://www.openstreetmap.org/#map=19/" + m.lat + "/" + m.lng;

    chat_data.push({
      nickname: settings.nickname,
      content: link_url,
      datetime: new Date(),
      type: type,
      userId: settings.custom_peer_id,
      gps: msg,
    });

    msg = {
      text: "",
      content: msg,
      nickname: settings.nickname,
      type: type,
      userId: settings.custom_peer_id,
      gps: msg,
    };
    sendMessageToAll(msg);
  }

  if (type == "audio") {
    if (msg == "") return false;

    chat_data.push({
      nickname: settings.nickname,
      content: URL.createObjectURL(msg),
      datetime: new Date(),
      type: type,
      userId: settings.custom_peer_id,
    });
    msg.arrayBuffer().then((buffer) => {
      // Send the buffer through the WebRTC data channel

      msg = {
        content: buffer,
        nickname: settings.nickname,
        type: type,
        userId: settings.custom_peer_id,
      };
      sendMessageToAll(msg);
    });
  }
}
//send to all connections
function sendMessageToAll(message) {
  m.redraw();

  Object.keys(peer.connections).forEach((peerId) => {
    peer.connections[peerId].forEach((conn) => {
      if (conn.open) {
        conn.send(message);
      } else {
        console.log("sending" + conn + "not open ");
      }
    });
  });
}
//close all connections

function closeAllConnections() {
  if (peer.connections == null) return;
  Object.keys(peer.connections).forEach((peerId) => {
    peer.connections[peerId].forEach((conn) => {
      conn.close();
    });
  });
}

//connect to peer
let connect_to_peer = function (id) {
  if (!status.deviceOnline) {
    alert("Device is offline");
    return false;
  }
  getIceServers()
    .then(() => {
      //clear chat data
      console.log("succesfull downloaded ice servers");

      chat_data = [];

      status.current_room = id;
      m.route.set("/chat?id=" + id);
      setTimeout(() => {
        document.querySelector(".loading-spinner").style.display = "block";
      }, 2000);

      setTimeout(() => {
        if (peer == null) {
          document.querySelector(".loading-spinner").style.display = "none";
        }

        // Establish connection with the destination peer
        try {
          conn = peer.connect(id, {
            label: "chat",
            reliable: true,
          });
          conn.on("open", () => {
            setupConnectionEvents(conn);
          });
          conn.on("error", (e) => {
            side_toaster("connection could not be established", 4000);
            document.querySelector(".loading-spinner").style.display = "none";
          });

          chat_data.push({
            id: "no-other-user-online",
            nickname: settings.nickname,
            content: "no other user online",
            datetime: new Date(),
          });

          document.querySelector(".loading-spinner").style.display = "none";

          m.redraw();
        } catch (e) {
          document.querySelector(".loading-spinner").style.display = "none";
        }
      }, 4000);
    })
    .catch((e) => {});
};

//create room
// and create qr-code with peer id
let create_peer = function () {
  //close connection before create peer
  chat_data = [];
  connectedPeers = [];

  if (!status.deviceOnline) {
    alert("Device is offline");
    return false;
  }
  document.querySelector(".loading-spinner").style.display = "block";

  getIceServers().then(() => {
    console.log("succesfull downloaded ice servers");

    peer.on("open", function () {
      // Workaround for peer.reconnect deleting previous id
      if (peer.id === null) {
        peer.id = lastPeerId;
      } else {
        lastPeerId = peer.id;
      }

      status.current_room = peer.id;

      m.route.set("/chat?id=" + settings.custom_peer_id);

      //make qr code
      var qrs = new qrious();
      qrs.set({
        background: "white",
        foreground: "black",
        level: "H",
        padding: 5,
        size: 200,
        value: settings.custom_peer_id,
      });

      // Define the elements to be added
      const invitationLinkElement = {
        nickname: settings.nickname,
        content: "invitation link",
        datetime: new Date(),
        image: qrs.toDataURL(),
        type: "image",
      };

      const noOtherUserOnlineElement = {
        id: "no-other-user-online",
        nickname: settings.nickname,
        content: "no other user online, you should invite someone.",
        datetime: new Date(),
        type: "text",
      };

      // Check if elements already exist before pushing
      if (
        !elementExists(chat_data, {
          nickname: settings.nickname,
          content: "invitation link",
        })
      ) {
        chat_data.push(invitationLinkElement);
      }

      if (
        !elementExists(chat_data, {
          id: "no-other-user-online",
          content: "no other user online, you should invite someone.",
        })
      ) {
        chat_data.push(noOtherUserOnlineElement);
      }

      bottom_bar("", "", "<img src='assets/image/option.svg'>");

      m.redraw();
      focus_last_article();
      document.querySelector(".loading-spinner").style.display = "none";
    });
  });
};

let handleImage = function (t) {
  m.route.set("/chat");
  if (t != "") sendMessage(t, "image");

  let a = document.querySelectorAll("div#app article");
  a[a.length - 1].focus();
  status.action = "";
};

let time_parse = function (value) {
  let t = new Date(value);

  return (
    t.getDate() +
    " " +
    month[t.getMonth()] +
    " " +
    t.getFullYear() +
    ", " +
    t.getHours() +
    ":" +
    t.getMinutes()
  );
};

//callback qr-code scan
let scan_callback = function (n) {
  connect_to_peer(n);
  status.action = "";
};
//map
var MapComponent = {
  oncreate: function (vnode) {
    var mapContainer = vnode.dom;
    var lat = vnode.attrs.lat;
    var lng = vnode.attrs.lng;
    var map = L.map(mapContainer, {
      keyboard: true,
      zoomControl: false,
    }).setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);

    vnode.state.map = map; // Store the map instance in the vnode state
  },
  onremove: function (vnode) {
    vnode.state.map.remove(); // Clean up the map instance when the component is removed
  },
  view: function () {
    return m("div", { class: "map-component" });
  },
};

//callback geolocation
let geolocation_callback = function (e) {
  if (e.coords) {
    let latlng = { "lat": e.coords.latitude, "lng": e.coords.longitude };
    sendMessage(JSON.stringify(latlng), "gps");

    m.route.set("/chat");
  } else {
    console.log("error");
  }
};

let geolocation_autoupdate_callback = (e) => {
  if (e.coords) {
    let latlng = { "lat": e.coords.latitude, "lng": e.coords.longitude };
    if (!status.geolcation_autoupdate) {
      m.route.set("/chat");
    }
    status.geolcation_autoupdate = true;
    sendMessage(JSON.stringify(latlng), "gps_live");
  } else {
    console.log("error");
  }
};

let map,
  step = 20;
const userMarkers = {};
const mainmarker = { current_lat: 0, current_lng: 0 }; // Example mainmarker object

// Function to zoom the map
function ZoomMap(in_out) {
  if (!map) return; // Check if the map is initialized

  let current_zoom_level = map.getZoom();
  if (in_out === "in") {
    map.setZoom(current_zoom_level + 1);
  } else if (in_out === "out") {
    map.setZoom(current_zoom_level - 1);
  }
}

// Function to move the map
function MovemMap(direction) {
  if (!map) return; // Check if the map is initialized

  mapcenter_position();

  let n = map.getCenter();
  mainmarker.current_lat = n.lat;
  mainmarker.current_lng = n.lng;

  if (direction === "left") {
    mainmarker.current_lng -= step;
  } else if (direction === "right") {
    mainmarker.current_lng += step;
  } else if (direction === "up") {
    mainmarker.current_lat += step;
  } else if (direction === "down") {
    mainmarker.current_lat -= step;
  }
  map.panTo(new L.LatLng(mainmarker.current_lat, mainmarker.current_lng));
}

// Initialize the map and define the setup
function map_function() {
  map = L.map("map", { keyboard: true, zoomControl: false }).setView(
    [51.505, -0.09],
    13
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  setTimeout(() => {
    document.querySelector(".leaflet-control-container").style.display = "none";
  }, 5000);

  const myMarker = L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup("It's me")
    .openPopup();
  myMarker._icon.classList.add("myMarker");

  let once = false; // Define 'once' outside the callback to persist its state

  let geolocation_callback = function (e) {
    myMarker.setLatLng([e.coords.latitude, e.coords.longitude]);
    status.userMarkers[0] = myMarker;

    if (!once) {
      map.setView([e.coords.latitude, e.coords.longitude]);
      once = true; // Set 'once' to true after the first execution
    }
  };

  geolocation(geolocation_callback, true, false);

  // Function to update or add markers
  function updateMarkers(status) {
    const usersGeolocation = status.users_geolocation;
    status.userMarkers = status.userMarkers || {}; // Ensure userMarkers is initialized as an object

    usersGeolocation.forEach((user) => {
      const { userId, gps } = user;
      const { lat, lng } = JSON.parse(gps); // Parse the gps string

      if (status.userMarkers[userId]) {
        // Update marker position
        status.userMarkers[userId].setLatLng([lat, lng]);
      } else {
        // Create new marker
        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(userId)
          .openPopup();
        status.userMarkers[userId] = marker; // Store marker in the object with userId as key
      }
    });
  }

  setTimeout(() => {
    updateMarkers(status);
  }, 5000);

  map.on("zoomend", function () {
    let zoom_level = map.getZoom();
    if (zoom_level < 2) {
      step = 20;
    } else if (zoom_level > 2) {
      step = 8;
    } else if (zoom_level > 3) {
      step = 4.5;
    } else if (zoom_level > 4) {
      step = 2.75;
    } else if (zoom_level > 5) {
      step = 1.2;
    } else if (zoom_level > 6) {
      step = 0.5;
    } else if (zoom_level > 7) {
      step = 0.3;
    } else if (zoom_level > 8) {
      step = 0.15;
    } else if (zoom_level > 9) {
      step = 0.075;
    } else if (zoom_level > 10) {
      step = 0.04;
    } else if (zoom_level > 11) {
      step = 0.02;
    } else if (zoom_level > 12) {
      step = 0.01;
    } else if (zoom_level > 13) {
      step = 0.004;
    } else if (zoom_level > 14) {
      step = 0.002;
    } else if (zoom_level > 15) {
      step = 0.001;
    } else if (zoom_level > 16) {
      step = 0.0005;
    }
  });
}

var root = document.getElementById("app");

var about = {
  view: function () {
    return m(
      "div",
      {
        class: "page",
        oncreate: () => {
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/image/back.svg'>");

          bottom_bar(
            "",
            "<img class='not-desktop' src='assets/image/select.svg'>",
            ""
          );
        },
      },
      [
        m(
          "button",
          {
            tabindex: 0,

            class: "item",
            oncreate: ({ dom }) => {
              dom.focus();
            },
            onclick: () => {
              m.route.set("/about_page");
            },
          },
          "About"
        ),
        m(
          "button",
          {
            tabindex: 1,

            class: "item",
            onclick: () => {
              m.route.set("/settings_page");
            },
          },
          "Settings"
        ),

        m(
          "button",
          {
            tabindex: 2,

            class: "item",
            onclick: () => {
              m.route.set("/privacy_policy");
            },
          },
          "Privacy Policy"
        ),
        m("div", {
          id: "KaiOSads-Wrapper",
          class: "width-100",

          oncreate: () => {
            if (status.notKaiOS == false) load_ads();
          },
        }),
      ]
    );
  },
};

var about_page = {
  view: function () {
    return m(
      "div",
      {
        class: "page",
        oncreate: () => {
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/image/back.svg'>");
        },
      },
      [
        m(
          "div",
          { class: "item scroll", id: "about-text", tabindex: 0 },
          "With flop you can communicate directly with another person/machine (p2p). To do this you need a stable internet connection and you must know the other person's ID. When you start a chat you can share your ID via the options menu. Multiple people can also join the chat, the IDs of the other participants are automatically shared."
        ),

        m(
          "div",
          { class: "item scroll", id: "about-text", tabindex: 1 },
          m.trust(
            "The code of the software is freely available: <a href='https://github.com/strukturart/flop'>gitHub</a>"
          )
        ),
        m(
          "div",
          { class: "item scroll", id: "about-text", tabindex: 2 },
          m.trust(
            "<strong>License</strong><br><br>mithrilJS MIT<br>peerJS MIT<br>flop MIT"
          )
        ),
      ]
    );
  },
};

var privacy_policy = {
  view: function () {
    return m("div", { class: "page" }, [
      m(
        "div",
        {
          oncreate: ({ dom }) => {
            dom.focus();
            top_bar("", "", "");

            if (status.notKaiOS)
              top_bar("", "", "<img src='assets/image/back.svg'>");
          },
          oninit: () => {
            bottom_bar(
              "",
              "<img class='not-desktop' src='assets/image/select.svg'>",
              ""
            );
          },
          onfocus: () => {
            bottom_bar("", "", "");
          },
        },
        [
          m.trust(
            "<div> <h2 class='item' tabindex=0>flop</h2> uses 2 different servers to connect two chat partners: <strong>0.peerjs.com</strong> and <strong>metered.ca</strong>, both of which are freely available. If you want to change that, you can store your own servers in the settings.<br> The app itself does not store any data, but be careful when exchanging sensitive data as no end-to-end encryption is implemented.</div>"
          ),
          m.trust(
            "<div><h2 class='item' tabindex=1>PeerJS</h2>We do not collect or store any information. While you are connected to a PeerJS server, your IP address, randomly-generated client ID, and signalling data are kept in the server's memory. With default settings, the server will remove this information from memory 60 seconds after you stop communicating with the service.</div>"
          ),

          m(
            "button",
            {
              class: "item button-style",
              tabindex: 2,
              onclick: function () {
                window.open(
                  "https://www.metered.ca/tools/openrelay/#%EF%B8%8Fsecurity"
                );
              },
              onfocus: () => {
                bottom_bar(
                  "",
                  "<img class='not-desktop' src='assets/image/select.svg'>",
                  ""
                );
              },
            },
            "Privacy Policy Metered"
          ),
          m(
            "div",
            {
              class: "item",
              tabindex: 3,
              onfocus: () => {
                bottom_bar("", "<img src='assets/image/select.svg'>", "");
              },
            },
            m.trust(
              "<h2>KaiOSAds</h2> This is a third party service that may collect information used to identify you.<br><br><br>"
            )
          ),
        ]
      ),
    ]);
  },
};

var settings_page = {
  view: function () {
    return m(
      "div",
      {
        class: "flex justify-content-center page",
        id: "settings_page",
        oncreate: () => {
          bottom_bar("", "", "");
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/image/back.svg'>");
        },
      },
      [
        m(
          "div",
          {
            tabindex: 0,
            oncreate: ({ dom }) => {
              dom.focus();
            },
            class: "item input-parent flex justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "nickname",
              },
              "Nickname"
            ),

            m("input", {
              id: "nickname",
              placeholder: "nickname",
              value: settings.nickname,
              oninput: (vnode) => {
                settings.nickname = vnode.target.value;
              },
            }),
          ]
        ),

        m(
          "div",
          {
            tabindex: 1,

            class: "item input-parent  flex justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "custom-peer-id",
              },
              "Custom ID"
            ),
            m("input", {
              id: "custom-peer-id",
              placeholder: "ID",
              value: settings.custom_peer_id,
            }),
          ]
        ),
        m(
          "button",
          {
            class: "item",
            tabindex: 2,
            onclick: () => {
              settings.custom_peer_id = "flop-" + uuidv4(16);
              m.redraw();
            },
          },
          "generate new ID"
        ),

        m(
          "button",
          {
            class: "item",
            tabindex: 3,
            onclick: () => {
              share(
                settings.invite_url + "?id=" + settings.custom_peer_id
              ).then((success) => {
                if (success) {
                  console.log("Sharing was successful.");
                } else {
                  console.log("Sharing failed.");
                }
              });
            },
          },
          "share"
        ),

        m("H2", { class: "text-center" }, m.trust("<br>Server Settings")),

        m(
          "div",
          {
            tabindex: 4,

            class: "item input-parent  flex justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "server_url",
              },
              "URL"
            ),
            m("input", {
              id: "server_url",
              placeholder: "Server URL",
              value: settings.server_url,
            }),
          ]
        ),

        m(
          "div",
          {
            tabindex: 5,

            class: "item input-parent  flex  justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "server_path",
              },
              "Path"
            ),
            m("input", {
              id: "server_path",
              placeholder: "Path",
              value: settings.server_path,
            }),
          ]
        ),

        m(
          "div",
          {
            tabindex: 6,

            class: "item input-parent  flex justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "server_port",
              },
              "Port"
            ),
            m("input", {
              id: "server_port",
              placeholder: "Port",
              value: settings.server_port,
            }),
          ]
        ),

        m(
          "div",
          {
            tabindex: 7,

            class: "item input-parent  flex justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "invite_url",
              },
              "Invite URL"
            ),
            m("input", {
              id: "invite_url",
              placeholder: "Invite URL",
              value: settings.invite_url,
            }),
          ]
        ),

        m(
          "button",
          {
            tabindex: 8,

            class: "item",
            "data-function": "save-settings",
            onclick: function () {
              settings.nickname = document.getElementById("nickname").value;
              settings.server_url = document.getElementById("server_url").value;
              settings.server_path =
                document.getElementById("server_path").value;

              settings.server_port =
                document.getElementById("server_port").value;

              settings.invite_url = document.getElementById("invite_url").value;

              localforage
                .setItem("settings", settings)
                .then(function (value) {
                  // Do other things once the value has been saved.
                  side_toaster("settings saved", 2000);
                })
                .catch(function (err) {
                  // This code runs if there were any errors
                  console.log(err);
                });
            },
          },
          "save settings"
        ),
      ]
    );
  },
};

var options = {
  view: function () {
    return m(
      "div",
      {
        class: "flex justify-content-center page",
        id: "login",
        oncreate: () => {
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/image/back.svg'>");
        },
      },
      [
        m(
          "button",
          {
            oncreate: ({ dom }) =>
              setTimeout(function () {
                setTabindex();
              }, 500),
            class: "item",
            style: { display: status.userOnline ? "" : "none" },

            onfocus: () => {
              bottom_bar(
                "",
                "<img class='not-desktop' src='./assets/image/select.svg'>",
                ""
              );
            },
            onclick: function () {
              pick_image(handleImage);

              if (status.userOnline > 0) {
                pick_image(handleImage);
              } else {
                side_toaster("no user online", 3000);
              }
            },
          },
          "share image"
        ),

        m(
          "button",
          {
            oncreate: () =>
              setTimeout(function () {
                setTabindex();
              }, 500),
            class: "item",
            style: { display: status.userOnline ? "" : "none" },

            onfocus: () => {
              bottom_bar(
                "",
                "<img class='not-desktop' src='./assets/image/select.svg'>",
                ""
              );
            },
            onclick: function () {
              if (status.current_user_id !== "" && status.user_nickname !== "")
                addUserToAddressBook(
                  status.current_user_id,
                  status.current_user_nickname
                );
            },
          },
          "add user to addressbook"
        ),

        m(
          "button",
          {
            class: "item",
            onfocus: () => {
              bottom_bar(
                "",
                "<img class='not-desktop' src='assets/image/select.svg'>",
                ""
              );
            },
            style: { display: status.userOnline ? "" : "none" },

            onclick: function () {
              if (status.userOnline) {
                geolocation(geolocation_callback, false, false);
              } else {
                side_toaster("no user online", 3000);
              }
            },
          },
          "share location"
        ),

        m(
          "button",
          {
            class: "item",
            id: "sharing-live-geolocation",
            oncreate: () => {
              if (status.geolcation_autoupdate) {
                document.getElementById("sharing-live-geolocation").innerText =
                  "stop sharing live location";
              } else {
                document.getElementById("sharing-live-geolocation").innerText =
                  "share live location";
              }
            },
            onfocus: () => {
              bottom_bar(
                "",
                "<img class='not-desktop' src='assets/image/select.svg'>",
                ""
              );
            },
            style: { display: status.userOnline ? "" : "none" },

            onclick: function () {
              if (status.userOnline) {
                if (status.geolcation_autoupdate) {
                  geolocation(geolocation_autoupdate_callback, false, true);
                  status.geolocation_autoupdate = false;
                  document.getElementById(
                    "sharing-live-geolocation"
                  ).innerText = "share live location";
                } else {
                  geolocation(geolocation_autoupdate_callback, true, false);
                  document.getElementById(
                    "sharing-live-geolocation"
                  ).innerText = "share live location";
                }
              } else {
                side_toaster("no user online", 3000);
              }
            },
          },
          "start live location"
        ),

        m(
          "button",
          {
            class: "item share-id-button",
            oninit: ({ dom }) => {
              setTabindex();

              if (status.userOnline == 0) {
                setTimeout(() => {
                  document.querySelector(".share-id-button").focus();
                }, 500);
              }
            },

            onclick: function () {
              share(
                settings.invite_url + "?id=" + settings.custom_peer_id
              ).then((success) => {
                if (success) {
                  console.log("Sharing was successful.");
                  m.route.set("/chat?id=" + settings.custom_peer_id);
                } else {
                  console.log("Sharing failed.");
                }
              });
            },
            onfocus: () => {
              bottom_bar(
                "",
                "<img class='not-desktop' src='assets/image/select.svg'>",
                ""
              );
            },
          },
          "Invite users"
        ),
      ]
    );
  },
};

var start = {
  view: function () {
    return m(
      "div",
      {
        class: "flex justify-content-spacearound",
        id: "start",
        oncreate: () => {
          top_bar("", "", "");

          //auto connect if id is given

          localforage.getItem("connect_to_id").then((e) => {
            let params = e.data.split("?id=");
            let id = params[1];
            setTimeout(() => {
              connect_to_peer(id);
              localforage.removeItem("connect_to_id");
            }, 1000);
          });

          bottom_bar(
            "<img src='assets/image/person.svg'>",
            "<img src='assets/image/plus.svg'>",
            "<img src='assets/image/option.svg'>"
          );
        },
      },
      [
        m("img", {
          src: "assets/icons/intro.svg",
          class: "",
        }),
        m(
          "p",
          {
            class: "item scroll",
            tabIndex: 0,
            oncreate: (vnode) => {
              document.querySelector("#start p").focus();
              vnode.dom.focus();
            },
          },
          m.trust(
            "flop is a webRTC chat app with which you can communicate directly with someone (p2p). You can currently exchange text, images and your position with your chat partner. To create a peer, press enter.<br><br>"
          )
        ),
        m(
          "button",
          {
            tabIndex: 1,

            class: "item",
            oncreate: (vnode) => {
              if (status.current_room == null || status.current_room == "") {
                vnode.dom.style.display = "none";
              }
            },
            onclick: (e) => {
              m.route.set("/chat?id=" + status.ownPeerId);
            },
          },
          "reopen chat"
        ),

        m(
          "button",
          {
            tabIndex: 2,

            class: "item button-create-peer",
            oncreate: (vnode) => {
              if (status.current_room == null || status.current_room == "") {
                vnode.dom.style.display = "none";
              }
            },
            onclick: (e) => {
              create_peer();
            },
          },
          "create chat"
        ),
      ]
    );
  },
};

var links_page = {
  view: function (vnode) {
    return links.map(function (item, index) {
      return m(
        "button",
        {
          tabindex: index,
          class: "item",
          onclick: function () {
            window.open(item.href);
            m.route.set("/chat");
          },
          onfocus: () => {
            bottom_bar(
              "",
              "<img class='not-desktop' src='assets/image/select.svg'>",
              ""
            );
          },
          oncreate: () => {
            index == 1 ?? item.focus();
            if (status.notKaiOS == true)
              top_bar("", "", "<img src='assets/image/back.svg'>");
          },
        },
        item.href
      );
    });
  },
};

var scan = {
  view: function (vnode) {
    return m("div");
  },
};

var open_peer_menu = {
  view: function () {
    return m(
      "div",
      {
        class: "flex justify-content-center",
        id: "open-peer-menu",
        oncreate: () => {
          if (status.notKaiOS == true)
            top_bar("", "", "<img src='assets/image/back.svg'>");

          bottom_bar(
            "",
            "<img class='not-desktop' src='assets/image/select.svg'>",
            ""
          );
        },
      },
      [
        m(
          "button",
          {
            oncreate: ({ dom }) =>
              setTimeout(function () {
                dom.focus();
              }, 500),
            class: "item",
            tabindex: 0,
            onclick: function () {
              start_scan(scan_callback);
              m.route.set("/scan");
            },
          },
          "QR-Code"
        ),

        m(
          "button",
          {
            class: "item",
            tabindex: 1,
            onclick: function () {
              let prp = prompt("Enter the chat id");
              if (prp != null) {
                connect_to_peer(prp);
              } else {
                history.back();
              }
            },
          },
          "id"
        ),
        m(
          "div",
          {
            class: "text",
          },
          "You can join a chat when someone invites you with a link. If you don't have this link, you can also enter the chat ID here or scan the QR code."
        ),
        m(
          "div",
          {
            class: "width-100 flex justify-content-center",
            style: { display: addressbook.length == 0 ? "none" : "" },
          },
          m.trust("<br><br>Addressbook<br>")
        ),
        m(
          "div",
          { class: "width-100 flex justify-content-center", id: "addressbook" },
          [
            addressbook.map((e) => {
              return m(
                "button",
                {
                  class: "item",
                  "data-id": e.id,
                  oncreate: () => {
                    setTabindex();
                  },
                  onclick: (e) => {
                    connect_to_peer(
                      document.activeElement.getAttribute("data-id")
                    );
                  },
                },
                e.nickname
              );
            }),
          ]
        ),
      ]
    );
  },
};

let user_check;
var chat = {
  view: function () {
    return m(
      "div",
      {
        id: "chat",
        class: "flex justify-content-center",
        onremove: () => {
          clearInterval(user_check);

          try {
            localforage.removeItem("connect_to_id");
          } catch (e) {}
        },
        oncreate: () => {
          top_bar("", "", "");

          if (status.notKaiOS == true)
            top_bar("", "", "<img src='assets/image/back.svg'>");

          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
          user_check = setInterval(() => {
            if (connectedPeers) {
              status.userOnline = connectedPeers.length;

              sendMessageToAll({
                userlist: connectedPeers,
                nickname: settings.nickname,
                userId: settings.custom_peer_id,
              });

              if (status.notKaiOS == true && status.userOnline > 0) {
                top_bar(
                  "<img class='users' title='" +
                    status.userOnline +
                    "' src='assets/image/monster.svg'>",
                  "",
                  "<img src='assets/image/back.svg'>"
                );
              } else {
                if (status.notKaiOS)
                  top_bar("", "", "<img src='assets/image/back.svg'>");
              }
            } else {
              status.userOnline = 0;
              if (status.notKaiOS)
                top_bar("", "", "<img src='assets/image/back.svg'>");
            }
          }, 5000);
        },
      },

      m("div", { id: "message-input", type: "text", class: "width-100" }, [
        m("input", {
          type: "text",
          onblur: () => {
            setTimeout(() => {
              bottom_bar(
                "<img src='assets/image/pencil.svg'>",
                "",
                "<img src='assets/image/option.svg'>"
              );
              write();
            }, 1000);
          },
          onfocus: () => {
            status.action = "write";

            bottom_bar(
              "<img src='assets/image/send.svg'>",
              "<img src='assets/image/record.svg'>",
              "<img src='assets/image/option.svg'>"
            );
          },
        }),
      ]),
      chat_data.map(function (item, index) {
        //own message
        console.log(item);
        let nickname = "me";
        if (item.nickname != settings.nickname) {
          nickname = item.nickname;
        }
        let f;
        if (item.type == "gps") {
          f = JSON.parse(item.gps);
        }

        return m(
          "article",
          {
            class: " item " + nickname + " " + item.type,
            tabindex: index,
            "data-type": item.type,
            "data-user-id": item.userId,
            "data-user-nickname": item.nickname,

            onclick: () => {
              if (item.type == "gps" || item.type == "gps_live") {
                m.route.set("/map_view");
              }
            },

            onfocus: () => {
              status.current_user_id =
                document.activeElement.getAttribute("data-user-id");
              status.current_user_nickname =
                document.activeElement.getAttribute("data-user-nickname");

              links = linkify.find(document.activeElement.textContent);
              if (links.length > 0 && item.type == "text") {
                status.current_article_type = "link";
                bottom_bar(
                  "<img src='assets/image/send.svg'>",
                  "<img src='assets/image/link.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "gps_live") {
                status.current_article_type = "gps_live";

                bottom_bar(
                  "<img src='assets/image/send.svg'>",
                  "",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "gps") {
                status.current_article_type = "gps";

                bottom_bar(
                  "<img src='assets/image/send.svg'>",
                  "",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "image") {
                status.current_article_type = "image";
                if (status.notKaiOS) return false;
                bottom_bar(
                  "<img src='assets/image/send.svg'>",
                  "<img src='assets/image/save.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "text") {
                status.current_article_type = "text";

                bottom_bar(
                  "<img src='assets/image/send.svg'>",
                  "",
                  "<img src='assets/image/option.svg'>"
                );
              }
            },
          },
          [
            item.type === "text"
              ? m(
                  "div",
                  {
                    class: "message-main",
                  },
                  item.content
                )
              : null,

            item.type === "image"
              ? m("img", {
                  class: "message-media",
                  src: item.image,
                  "data-filename": item.filename,
                })
              : null,

            item.type === "gps"
              ? m(
                  "div",
                  {
                    class: "message-map",
                  },

                  m(MapComponent, { lat: f.lat, lng: f.lng })
                )
              : null,

            item.type === "audio"
              ? m(
                  "div",
                  {
                    class: "audioplayer",
                  },

                  m("audio", { controls: true, src: item.content })
                )
              : null,

            m("div", { class: "flex message-head" }, [
              m("div", time_parse(item.datetime)),
              m("div", { class: "nickname" }, nickname),
            ]),
          ]
        );
      })
    );
  },
};

let map_view = {
  view: function () {
    return m("div", {
      id: "map",
      oncreate: () => {
        bottom_bar(
          "<img src='assets/image/plus.svg'>",
          "<img src='assets/image/person.svg'>",
          "<img src='assets/image/minus.svg'>"
        );

        map_function();
      },
    });
  },
};

var intro = {
  view: function () {
    return m(
      "div",
      {
        class: "width-100 height-100",
        id: "intro",
        oninit: function () {
          const protocol = window.location.protocol;
          const host = window.location.host;
          const pathname = window.location.pathname;
          const search = window.location.search;
          const hash = window.location.hash;

          const fullUrl = `${protocol}//${host}${pathname}${search}${hash}`;
          // Get the current hash
          if (fullUrl.includes("?id=")) {
            localforage.setItem("connect_to_id", { data: fullUrl });
            status.launching = true;
            if (status.notKaiOS == false) {
              app_launcher();
            } else {
              setTimeout(function () {
                m.route.set("/start");
              }, 1000);
            }
          } else {
            setTimeout(function () {
              m.route.set("/start");
            }, 5000);
          }
        },
      },
      [
        m("img", {
          src: "./assets/icons/intro.svg",

          oncreate: () => {
            let get_manifest_callback = (e) => {
              try {
                status.version = e.manifest.version;
                document.querySelector("#version").textContent =
                  e.manifest.version;
              } catch (e) {}

              if ("b2g" in navigator) {
                fetch("/manifest.webmanifest")
                  .then((r) => r.json())
                  .then((parsedResponse) => {
                    status.version = parsedResponse.b2g_features.version;
                    document.querySelector("#version").textContent =
                      parsedResponse.b2g_features.version;
                  });
              }

              if (status.notKaiOS) {
                fetch("/manifest.webmanifest")
                  .then((r) => r.json())
                  .then((parsedResponse) => {
                    status.version = parsedResponse.b2g_features.version;
                    document.querySelector("#version").textContent =
                      parsedResponse.b2g_features.version;
                  });
              }
            };
            getManifest(get_manifest_callback);
          },
        }),
        m(
          "div",
          {
            class: "flex width-100  justify-content-center ",
            id: "version-box",
          },
          [
            m(
              "kbd",
              {
                id: "version",
              },
              status.version
            ),
          ]
        ),
      ]
    );
  },
};

m.route(root, "/intro", {
  "/intro": intro,
  "/open_peer_menu": open_peer_menu,
  "/start": start,
  "/links_page": links_page,
  "/chat": chat,
  "/options": options,
  "/settings_page": settings_page,
  "/scan": scan,
  "/about": about,
  "/about_page": about_page,
  "/privacy_policy": privacy_policy,
  "/map_view": map_view,
});

function scrollToCenter() {
  const activeElement = document.activeElement;
  if (!activeElement) return;

  const rect = activeElement.getBoundingClientRect();
  let elY = rect.top + rect.height / 2;

  let scrollContainer = activeElement.parentNode;

  // Find the first scrollable parent
  while (scrollContainer) {
    if (
      scrollContainer.scrollHeight > scrollContainer.clientHeight ||
      scrollContainer.scrollWidth > scrollContainer.clientWidth
    ) {
      // Calculate the element's offset relative to the scrollable parent
      const containerRect = scrollContainer.getBoundingClientRect();
      elY = rect.top - containerRect.top + rect.height / 2;
      break;
    }
    scrollContainer = scrollContainer.parentNode;
  }

  if (scrollContainer) {
    scrollContainer.scrollBy({
      left: 0,
      top: elY - scrollContainer.clientHeight / 2,
      behavior: "smooth",
    });
  } else {
    // If no scrollable parent is found, scroll the document body
    document.body.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  /////////////////
  ///NAVIGATION
  /////////////////

  let nav = function (move) {
    if (
      document.activeElement.nodeName == "SELECT" ||
      document.activeElement.type == "date" ||
      document.activeElement.type == "time"
    )
      return false;

    if (document.activeElement.classList.contains("scroll")) {
      const scrollableElement = document.querySelector(".scroll");
      if (move == 1) {
        scrollableElement.scrollBy({ left: 0, top: 10 });
      } else {
        scrollableElement.scrollBy({ left: 0, top: -10 });
      }
    }

    const currentIndex = document.activeElement.tabIndex;
    let next = currentIndex + move;
    let items = 0;

    items = document.getElementById("app").querySelectorAll(".item");

    if (document.activeElement.parentNode.classList.contains("input-parent")) {
      document.activeElement.parentNode.focus();
      return true;
    }

    let targetElement = 0;

    if (next <= items.length) {
      targetElement = items[next];
      targetElement.focus();
    }

    if (next >= items.length) {
      targetElement = items[0];
      targetElement.focus();
    }

    scrollToCenter();
  };

  // Add click listeners to simulate key events
  document
    .querySelector("div.button-left")
    .addEventListener("click", function (event) {
      simulateKeyPress("SoftLeft");
    });

  document
    .querySelector("div.button-right")
    .addEventListener("click", function (event) {
      simulateKeyPress("SoftRight");
    });

  document
    .querySelector("div.button-center")
    .addEventListener("click", function (event) {
      simulateKeyPress("Enter");
    });

  //top bar

  document
    .querySelector("#top-bar div div.button-right")
    .addEventListener("click", function (event) {
      let route = m.route.get();

      if (
        route.startsWith("/chat") ||
        m.route.get() == "/settings_page" ||
        m.route.get() == "/scan" ||
        m.route.get() == "/open_peer_menu" ||
        m.route.get() == "/about"
      ) {
        status.action = "";
        m.route.set("/start");
      }

      if (m.route.get() == "/settings") {
        status.action = "";
        m.route.set("/about");
      }

      if (m.route.get() == "/privacy_policy") {
        status.action = "";
        m.route.set("/about");
      }

      if (m.route.get() == "/map_view") {
        status.action = "";
        m.route.set("/options");
      }

      if (m.route.get() == "/options" || m.route.get() == "/links_page") {
        m.route.set("/chat?id=") + status.ownPeerId;
      }
    });

  // Function to simulate key press events
  function simulateKeyPress(k) {
    shortpress_action({ key: k });
  }

  // Add an event listener for keydown events
  document.addEventListener("keydown", function (event) {
    handleKeyDown(event);
  });

  // Add an event listener for keydown events
  document.addEventListener("keyup", function (event) {
    handleKeyUp(event);
  });

  // ////////////////////////////
  // //KEYPAD HANDLER////////////
  // ////////////////////////////
  const audioRecorder = createAudioRecorder();

  let longpress = false;
  const longpress_timespan = 1000;
  let timeout;

  function repeat_action(param) {
    switch (param.key) {
    }
  }

  //////////////
  ////LONGPRESS
  /////////////
  let users_geolocation_count = 0;

  function longpress_action(param) {
    let route = m.route.get();

    switch (param.key) {
      case "Backspace":
        closeAllConnections();
        peer.destroy();
        window.close();
        break;

      case "Enter":
        if (
          route.startsWith("/chat") &&
          document.activeElement.tagName === "INPUT"
        ) {
          // Start recording
          audioRecorder.startRecording().then(() => {
            console.log("Recording started");
            status.audio_recording = true;
          });
        }

        break;
    }
  }

  // /////////////
  // //SHORTPRESS
  // ////////////

  function shortpress_action(param) {
    if (status.action == "confirm") return false;
    let route = m.route.get();

    switch (param.key) {
      case "ArrowUp":
        if (
          route.startsWith("/chat") &&
          document.activeElement.tagName === "INPUT"
        ) {
          write();
        }
        nav(-1);

        break;
      case "ArrowDown":
        nav(+1);

        break;

      case "SoftRight":
      case "Alt":
        if (route.startsWith("/chat")) m.route.set("/options");
        if (route == "/start") m.route.set("/about");

        if (route == "/map_view") {
          ZoomMap("out");
        }

        break;

      case "SoftLeft":
      case "Control":
        if (route.startsWith("/chat") && status.action == "write") {
          sendMessage(document.getElementsByTagName("input")[0].value, "text");
          write();
        }
        if (route.startsWith("/chat") && status.action !== "write") {
          if (status.userOnline > 0) {
            write();
          } else {
            side_toaster("no user online", 3000);
          }
        }

        if (route == "/map_view") {
          ZoomMap("in");
        }

        if (route == "/start") {
          m.route.set("/open_peer_menu");
        }

        break;

      case "Enter":
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[0].focus();
        }

        if (m.route.get() == "/options") {
          if (status.current_user_id !== "" && status.user_nickname !== "")
            addUserToAddressBook(
              status.current_user_id,
              status.current_user_nickname
            );
        }

        if (route == "/start") {
          chat_data = [];
          create_peer();
        }
        //addressbook open peer
        if (route == "/open_peer_menu") {
          connect_to_peer(document.activeElement.getAttribute("data-id"));
        }
        if (route == "/map_view") {
          // Ensure users_geolocation_count is within bounds
          if (
            users_geolocation_count ==
            Object.keys(status.userMarkers).length - 1
          ) {
            users_geolocation_count = 0;
          } else {
            users_geolocation_count++;
          }

          const userIds = Object.keys(status.userMarkers);
          const currentMarker =
            status.userMarkers[userIds[users_geolocation_count]];

          if (currentMarker) {
            map.setView(currentMarker.getLatLng());
          } else {
            console.log(
              "Marker not found for index: " + users_geolocation_count
            );
          }
        }

        if (route.startsWith("/chat")) {
          if (document.activeElement.tagName == "ARTICLE") {
            if (status.current_article_type == "link") {
              m.route.set("/links_page");
            }

            if (status.current_article_type == "gps_live") {
              m.route.set("/map_view");
            }
            if (status.current_article_type == "gps") {
              m.route.set("/map_view");
            }
            if (status.current_article_type == "image") {
              let filename = document.activeElement
                .querySelector("img")
                .getAttribute("data-filename");

              let data = document.activeElement
                .querySelector("img")
                .getAttribute("src");

              let download_successfull = () => {};
              downloadFile(filename, data, download_successfull);
            } else {
              return false;
            }
          }

          break;
        }

        break;

      case "Backspace":
        stop_scan();

        break;
    }
  }

  // ///////////////////////////////
  // //shortpress / longpress logic
  // //////////////////////////////

  function handleKeyDown(evt) {
    let route = m.route.get();

    if (evt.key === "Backspace" && m.route.get() != "/start") {
      evt.preventDefault();
    }

    if (evt.key === "Backspace") {
      if (
        route.startsWith("/chat") ||
        m.route.get() == "/settings_page" ||
        m.route.get() == "/scan" ||
        m.route.get() == "/open_peer_menu" ||
        m.route.get() == "/about" ||
        m.route.get() == "/map_view"
      ) {
        evt.preventDefault();
        status.action = "";
        m.route.set("/start");
      }

      if (m.route.get() == "/settings") {
        evt.preventDefault();
        status.action = "";
        m.route.set("/about");
      }

      if (m.route.get() == "/privacy_policy") {
        evt.preventDefault();
        status.action = "";
        m.route.set("/about");
      }

      if (m.route.get() == "/about_page") {
        evt.preventDefault();
        status.action = "";
        m.route.set("/about");
      }

      if (m.route.get() == "/map_view") {
        evt.preventDefault();
        status.action = "";
        m.route.set("/chat?id=") + status.ownPeerId;
      }

      if (m.route.get() == "/options" || m.route.get() == "/links_page") {
        m.route.set("/chat?id=") + status.ownPeerId;
      }
    }

    if (evt.key === "EndCall") {
      evt.preventDefault();
      if (status.action == "") {
        closeAllConnections();
        peer.destroy();
        window.close();
      }
    }
    if (!evt.repeat) {
      longpress = false;
      timeout = setTimeout(() => {
        longpress = true;
        longpress_action(evt);
      }, longpress_timespan);
    }

    if (evt.repeat) {
      if (evt.key == "Backspace") longpress = false;

      repeat_action(evt);
    }
  }

  function handleKeyUp(evt) {
    if (status.audio_recording === true) {
      // Stop recording and get the recorded data
      audioRecorder.stopRecording().then((audioBlob) => {
        // Do something with the audioBlob, e.g., create a URL or upload it

        sendMessage(audioBlob, "audio");

        // Clean up the audio recorder
        audioRecorder.cleanup();
      });
    }

    if (status.visibility === false) return false;

    clearTimeout(timeout);
    if (!longpress) {
      shortpress_action(evt);
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      status.visibility = true;
    } else {
      status.visibility = false;
    }
  });
});

try {
  navigator.mozSetMessageHandler("activity", function (activityRequest) {
    var option = activityRequest.source;
    let params = option.data.split("?id=");
    let id = params[1];
    if (id) {
      setTimeout(() => {
        connect_to_peer(id);
      }, 5000);
    }
  });
} catch (e) {}

//webActivity KaiOS 3

try {
  navigator.serviceWorker
    .register(new URL("sw.js", import.meta.url), {
      type: "module",
    })
    .then((registration) => {
      if (registration.waiting) {
        // There's a new service worker waiting to activate
        // You can prompt the user to reload the page to apply the update
        // For example: show a message to the user
      } else {
        // No waiting service worker, registration was successful
      }

      registration.systemMessageManager.subscribe("activity").then(
        (rv) => {
          console.log(rv);
        },
        (error) => {
          console.log(error);
        }
      );
    });
} catch (e) {
  console.log(e);
}

window.addEventListener("beforeunload", function (e) {
  closeAllConnections();
  peer.destroy();
});

window.addEventListener("unload", function () {
  closeAllConnections();
  peer.destroy();
});

window.addEventListener("pagehide", function (event) {
  console.log("Page is being hidden or unloaded.");
  closeAllConnections();
  peer.destroy();
});

//start ping interval in service worker
//channel.postMessage("startInterval");
channel.addEventListener("message", (event) => {
  if (event.data === "intervalTriggered") {
    if (connectedPeers > 0)
      sendMessageToAll({
        userlist: connectedPeers,
        nickname: settings.nickname,
      });
  }
});
