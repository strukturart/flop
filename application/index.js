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
import { stop_scan, start_scan } from "./assets/js/scan.js";
import localforage from "localforage";
import * as linkify from "linkifyjs";
import { geolocation, pushLocalNotification } from "./assets/js/helper.js";
import m from "mithril";
import qrious from "qrious";
import { v4 as uuidv4 } from "uuid";
import "webrtc-adapter";
import { createAudioRecorder } from "./assets/js/helper.js";
import L from "leaflet";
import dayjs from "dayjs";

import "swiped-events";

import markerIcon from "./assets/css/images/marker-icon.png";
import markerIconRetina from "./assets/css/images/marker-icon-2x.png";

//github.com/laurentpayot/minidenticons#usage
export let status = {
  visibility: true,
  action: "",
  deviceOnline: true,
  userOnline: 0,
  notKaiOS: true,
  current_article_type: "",
  current_user_id: "",
  current_user_nickname: "",
  users_geolocation: [],
  userMarkers: [],
  addressbook_in_focus: "",
  geolocation_autoupdate: false,
  debug: false,
  viewReady: false,
  groupchat: false,
};

// not KaiOS
//todo get own peer nickname
//to set the right nickname when storing contact in addressbook

const audioRecorder = createAudioRecorder();

export let settings = {};

const userAgent = navigator.userAgent || "";

if (userAgent && userAgent.includes("KAIOS")) {
  status.notKaiOS = false;
}

if (!status.notKaiOS) {
  const scripts = [
    "./assets/js/kaiads.v5.min.js",
    "http://127.0.0.1/api/v1/shared/core.js",
    "http://127.0.0.1/api/v1/shared/session.js",
    "http://127.0.0.1/api/v1/apps/service.js",
    "http://127.0.0.1/api/v1/audiovolumemanager/service.js",
  ];

  scripts.forEach((src) => {
    const js = document.createElement("script");
    js.type = "text/javascript";
    js.src = src;
    document.head.appendChild(js);
  });
}

const channel = new BroadcastChannel("sw-messages");

let links = "";
let chat_data = [];
let peer = null;
let conn = "";

let connectedPeers = [];

if (status.debug) {
  window.onerror = function (msg, url, linenumber) {
    alert(
      "Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber
    );
    return true;
  };
}

//store previous view
let previousView = () => {
  status.previousView = m.route.get();
};

//sometime the key press are delayed
let key_delay = () => {
  setTimeout(() => {
    status.viewReady = !status.viewReady;
  }, 2000);
};

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

// Function to check if an element already exists in chat_data
function elementExists(chat_data, criteria) {
  return chat_data.some((element) => {
    return Object.keys(criteria).every((key) => element[key] === criteria[key]);
  });
}

//connect all users
let compareUserList = (userlist) => {
  const filteredUserList = userlist.filter((userId) => userId !== peer.id);
  userlist = filteredUserList;
  userlist.forEach((user) => {
    if (!connectedPeers.includes(user)) {
      try {
        peer.connect(user, {
          label: "flop",
          reliable: true,
        });
      } catch (e) {
        console.log("try to connect failed" + e);
      }
    }
  });
};

//add to addressbook

let addressbook = [];

localforage
  .getItem("addressbook")
  .then((e) => {
    if (e !== null) addressbook = e;

    if (e.length == 0) addressbook = [];
  })
  .catch(() => {});

let delete_addressbook_item = (userIdToDelete) => {
  // Filter out the user with the specified id
  addressbook = addressbook.filter((user) => user.id !== userIdToDelete);

  localforage
    .setItem("addressbook", addressbook)
    .then((e) => {
      side_toaster("deleted", 3000);
    })
    .catch((error) => {
      console.error("Error saving address book:", error);
    });
};

let update_addressbook_item = (userIdToUpdate) => {
  // Find the user to update
  let userIndex = addressbook.findIndex((user) => user.id === userIdToUpdate);

  if (userIndex === -1) {
    side_toaster("User not found", 3000);
    return;
  }

  // Prompt the user for new values
  let newName = prompt(
    "Enter the new name of the contact",
    addressbook[userIndex].name
  );

  if (newName !== null && newName.trim() !== "") {
    addressbook[userIndex].name = newName.trim();
  }

  // Save the updated addressbook to localforage
  localforage
    .setItem("addressbook", addressbook)
    .then(() => {
      side_toaster("Contact updated successfully", 3000);
    })
    .catch((error) => {
      console.error("Error saving updated address book:", error);
    });
};

let addUserToAddressBook = (a, b) => {
  if (!Array.isArray(addressbook)) {
    console.error("addressbook is not defined or is not an array");
    return;
  }

  let exists = addressbook.some((e) => e.id == a);

  if (!exists) {
    let uname = prompt("enter the name of the contact");
    if (!uname) uname = "";

    addressbook.push({ id: a, nickname: b, name: uname });

    localforage
      .setItem("addressbook", addressbook)
      .then((e) => {
        side_toaster("done", 3000);
      })
      .catch(() => {});
  } else {
    side_toaster("user still exist", 3000);
  }
};

//reproduce chatHistory
let load_chat_history = (id) => {
  let c = chat_data_history.filter((e) => {
    return (
      (e.from === settings.custom_peer_id && e.to === id) ||
      (e.from === id && e.to === settings.custom_peer_id)
    );
  });

  if (c.length > 0) chat_data = c;
};

//track single connections
//to update connections list
function setupConnectionEvents(conn) {
  if (conn.label == "ping") {
    console.log("allow user? id: " + conn.peer);
  }

  connectedPeers.push(conn.peer);
  console.log(connectedPeers);

  let pc = conn.peerConnection;

  pc.addEventListener("iceconnectionstatechange", () => {
    console.log("state: " + pc.iceConnectionState);
    let r = m.route.get();

    switch (pc.iceConnectionState) {
      case "disconnected":
        side_toaster("Connection failed. User might be offline.", 5000);
        connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
        updateConnections();
        break;

      case "failed":
        side_toaster("Connection failed. User might be offline.", 5000);
        connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
        updateConnections();
        break;

      case "closed":
        side_toaster("User has left the chat.", 3000);
        connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
        updateConnections();
        break;
      case "checking":
        if (r.startsWith("/start")) {
          peer_is_online();
          m.redraw();
        }
        break;
    }
  });

  //receive data
  conn.on("data", function (data) {
    if (conn.label !== "flop") return;

    if (
      data.type == "image" ||
      data.type == "text" ||
      data.type == "gps_live" ||
      data.type == "gps" ||
      data.type == "audio" ||
      data.type == "notification"
    ) {
      //is not in addressbook - ask
      //is in addressbook - notify
      let inAddressbook = addressbook.find((e) => e.id === data.from);
      if (!inAddressbook) {
        let ask = confirm("Do you want to chat with " + data.nickname + "?");
        if (ask) {
          connect_to_peer(data.from);
        } else {
          conn.close();
        }
      } else {
        pushLocalNotification("New message from " + inAddressbook.name);
        let r = m.route.get();
        if (r.startsWith("/start")) {
          peer_is_online();
          m.redraw();
        }
      }

      if (data.type == "notification") {
        console.log(data);
      }

      if (data.type == "image") {
        if (!status.visibility) pushLocalNotification("flop", "new image");

        chat_data.push({
          nickname: data.nickname,
          content: "",
          datetime: new Date(),
          image: data.file,
          filename: data.filename,
          type: data.type,
          from: data.from,
          to: data.to,
        });

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
          from: data.from,
          to: data.to,
        });
        focus_last_article();
        stop_scan();
      }

      if (data.type === "audio") {
        let audioBlob;

        let mimetype = data.mimeType || "audio/webm";

        if (data.content instanceof Blob) {
          audioBlob = data.content;
        } else if (
          data.content instanceof ArrayBuffer ||
          data.content instanceof Uint8Array
        ) {
          audioBlob = new Blob([data.content], { type: mimetype });
        } else {
          console.error(
            `Error: Unsupported data.content type. Expected Blob, ArrayBuffer, or Uint8Array, but got: ${typeof data.content}`
          );
          side_toaster("data type not supported", 4000);
          return;
        }

        chat_data.push({
          nickname: data.nickname,
          content: audioBlob,
          datetime: new Date(),
          type: data.type,
          from: data.from,
          to: data.to,
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
          gps: data.content,
          from: data.from,
          to: data.to,
        });
      }
      //to do not stable
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
            (item) => item.userId === data.from
          );
          if (e) {
            e.gps = data.content;
          } else {
            status.users_geolocation.push({
              userId: data.from,
              gps: data.content,
            });
          }
        } else {
          // Push a new GPS-Live message if not found

          chat_data.push({
            nickname: data.nickname,
            content: link_url,
            datetime: new Date(),
            type: data.type,
            gps: data.content,
            from: data.from,
            to: data.to,
          });
        }
      }

      storeChatData().then(() => {
        m.redraw();
      });
    } else {
      console.log("userlist: " + data.userlist);
      if (data.userlist && status.groupchat) {
        //connect all users
        //groupchat
        compareUserList(data.userlist);
      }
    }
  });

  // Event handler for successful connection
  conn.on("open", function () {
    stop_scan();
  });

  // Event handler for connection closure

  conn.on("close", () => {
    side_toaster(`User has left the chat`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
    updateConnections();
  });

  conn.on("error", () => {
    side_toaster(`User has been disconnected`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
    updateConnections();
  });
}

function updateConnections() {
  status.userOnline = connectedPeers.length;
}

let ice_servers = {
  "iceServers": [],
};

//load ICE Server
async function getIceServers() {
  //only set new peer if no peer exist
  if (peer) {
    console.log("peer exist");
    return;
  }

  let p = m.route.get();

  try {
    const response = await fetch(
      "https://" +
        process.env.TURN_APP_NAME +
        ".metered.live/api/v1/turn/credentials?apiKey=" +
        process.env.TURN_APP_KEY
    );

    if (!response.ok) {
      document.querySelector(".loading-spinner").style.display = "none";
      if (p.startsWith("/start"))
        top_bar("", "<img src='assets/image/offline.svg'>", "");
    }
    if (response.ok) {
      if (p.startsWith("/start")) top_bar("", "", "");
    }

    const a = await response.json();

    a.forEach((e) => {
      ice_servers.iceServers.push(e);
    });

    if (peer) {
      peer.destroy();
    }

    peer = new Peer(settings.custom_peer_id, {
      debug: 0,
      secure: false,
      config: ice_servers,
      referrerPolicy: "no-referrer",
    });

    //connection from peer
    peer.on("connection", function (c) {
      setupConnectionEvents(c);
    });

    peer.on("disconnected", () => {
      console.log(`User is disconnectd the server`);
      attemptReconnect();
    });

    //connection to peer-server
    peer.on("open", function (id) {
      console.log("PeerJS connected with server ID:", id);
      // Zugriff auf den internen WebSocket
      if (peer.socket && peer.socket._socket) {
        peer.socket._socket.addEventListener("error", function (event) {
          console.error("WebSocket Error:", event);
          attemptReconnect();
        });

        peer.socket._socket.addEventListener("close", function (event) {
          console.warn("WebSocket closed:", event);
          attemptReconnect();
        });
      } else {
        console.warn("WebSocket not initialized yet.");
      }
    });

    peer.on("error", function (err) {
      //retry to connect
      console.log("error " + err.type);
      switch (err.type) {
        case "server-error":
          side_toaster("The connection server is not reachable", 6000);
          break;

        case "socket-closed":
          side_toaster("The connection server is not reachable", 6000);
          break;

        default:
          break;
      }
    });
  } catch (error) {
    document.querySelector(".loading-spinner").style.display = "none";
    side_toaster("The connection server is not reachable", 6000);
  }
}

function attemptReconnect() {
  if (peer.disconnected) {
    console.log("Attempting to reconnect...");
    peer.on("open", (id) => {
      console.log("Reconnected successfully with ID:", id);
    });

    peer.reconnect();
  }
}

//chat data history
let chat_data_history = [];

localforage.getItem("chatData").then((e) => {
  chat_data_history = e || []; // Fallback to an empty array if chatData is null
});

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
  let j = m.route.get();
  if (!j.startsWith("/chat")) return false;
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

function sendMessage(
  msg,
  type,
  mimeType = "",
  to = status.current_user_id || ""
) {
  if (!msg) return false;

  let message = {};

  //silent message
  if (type == "notification") {
    message = {
      nickname: settings.nickname,
      type: type,
      content: msg,
      mimeType: mimeType,
      from: settings.custom_peer_id,
      to: to,
    };

    sendMessageToAll(msg);
  }

  //image
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
        mimeType: mimeType,
        from: settings.custom_peer_id,
        to: to,
      });

      message = {
        file: reader.result,
        filename: msg.filename,
        filetype: msg.type,
        nickname: settings.nickname,
        type: type,
        mimeType: mimeType,
      };
      sendMessageToAll(message);

      focus_last_article();
    };
    reader.onerror = (e) => {
      alert("error");
    };
    reader.readAsDataURL(msg.blob);
  }

  //text
  if (type == "text") {
    message = {
      nickname: settings.nickname,
      type: type,
      content: msg,
      mimeType: mimeType,
    };
    chat_data.push({
      nickname: settings.nickname,
      content: msg,
      datetime: new Date(),
      type: type,
      mimeType: mimeType,
      from: settings.custom_peer_id,
      to: to,
    });

    sendMessageToAll(message);

    focus_last_article();
    write();
  }

  //live gps
  if (type == "gps_live") {
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
        gps: msg,
        mimeType: mimeType,
        from: settings.custom_peer_id,
        to: to,
      });
    }

    message = {
      content: msg,
      nickname: settings.nickname,
      type: type,
      gps: msg,
      mimeType: mimeType,
    };
    sendMessageToAll(message);
  }

  //gps
  if (type == "gps") {
    let m = JSON.parse(msg);
    let link_url =
      "https://www.openstreetmap.org/#map=19/" + m.lat + "/" + m.lng;

    chat_data.push({
      nickname: settings.nickname,
      content: link_url,
      datetime: new Date(),
      type: type,
      gps: msg,
      mimeType: mimeType,
      from: settings.custom_peer_id,
      to: to,
    });

    message = {
      text: "",
      content: msg,
      nickname: settings.nickname,
      type: type,
      gps: msg,
      mimeType: mimeType,
    };

    sendMessageToAll(message);
  }

  //audio
  if (type === "audio") {
    chat_data.push({
      nickname: settings.nickname,
      content: msg,
      datetime: new Date(),
      type: type,
      mimeType: mimeType,
      from: settings.custom_peer_id,
      to: to,
    });

    focus_last_article();

    msg
      .arrayBuffer()
      .then((buffer) => {
        const messageToSend = {
          content: buffer,
          nickname: settings.nickname,
          type: type,
          mimeType: mimeType,
        };
        sendMessageToAll(messageToSend);
      })
      .catch((error) => {
        console.error("Error converting Blob to ArrayBuffer:", error);
      });
  }
}

async function sendMessageToAll(message) {
  message.from = settings.custom_peer_id;
  message.to = status.current_user_id;

  if (!status.current_user_id || !peer.connections[status.current_user_id]) {
    console.warn("no valid peer to send");
    return;
  }

  //test is peer open
  const connections = peer.connections[status.current_user_id].filter(
    (conn) => conn.open
  );

  if (connections.length === 0) {
    console.warn("Keine offene Verbindung zu diesem Peer.");
    return;
  }

  connections.forEach((conn) => conn.send(message));

  try {
    await storeChatData();
    m.redraw();
  } catch (error) {
    console.error("Error:", error);
  }
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
let turn = async function () {
  const response = await fetch(
    `https://${process.env.TURN_APP_NAME}.metered.live/api/v1/turn/credentials?apiKey=${process.env.TURN_APP_KEY}`
  );

  if (!response.ok) {
    alert("Can't load TURN credentials");
    return false;
  }

  const credentials = await response.json();

  credentials.forEach((credential) => {
    ice_servers.iceServers.push(credential);
  });
};

turn();

//connect to peer
//test is other peer is online
let peer_is_online = async function () {
  if (!navigator.onLine || addressbook.length == 0) {
    top_bar("", "<img src='assets/image/offline.svg'>", "");
    return false;
  }

  try {
    // Verwende for-Schleife, um mit 'continue' die Iteration zu überspringen
    for (let i = 0; i < addressbook.length; i++) {
      let entry = addressbook[i];
      entry.live = false;

      // Prüfe, ob der Peer schon in connectedPeers ist
      if (connectedPeers.includes(entry.id)) {
        entry.live = true;
        console.log("already connected");
        m.redraw();
        continue; // Überspringe die restlichen Logik für diesen Peer
      }

      try {
        let tempConn = peer.connect(entry.id, {
          label: "ping",
          reliable: true,
        });

        if (tempConn) {
          tempConn.on("open", () => {
            entry.live = true;
            console.log("check" + JSON.stringify(addressbook));
            m.redraw();
          });

          tempConn.on("error", () => {
            entry.live = false;
            console.log("check" + JSON.stringify(addressbook));
            m.redraw();
          });
        }
      } catch (error) {
        console.log(error);
        entry.live = false;
        m.redraw();
      }
    }
    m.redraw();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//connect to peer
let connect_to_peer = function (
  id,
  route_target = "/start",
  nickname = generateRandomString(10)
) {
  if (!navigator.onLine) {
    top_bar("", "<img src='assets/image/offline.svg'>", "");
    return false;
  }

  try {
    localforage.removeItem("connect_to_id");
  } catch (e) {}

  m.route.set("/waiting");

  getIceServers()
    .then(() => {
      let inAddressbook = addressbook.find((e) => e.id === id);

      if (inAddressbook) {
        status.current_user_nickname = inAddressbook.name;
      } else {
        status.current_user_nickname = nickname;
      }

      if (connectedPeers.includes(id)) {
        m.route.set("/chat?id=" + status.custom_peer_id + "&peer=" + id);
        status.current_user_id = id;

        return;
      }
      chat_data = [];

      setTimeout(() => {
        if (!peer) {
          m.route.set("/start");

          console.log("peer not set");
          return;
        }

        try {
          console.log("Attempting to connect to peer with ID:", id);
          conn = peer.connect(id, {
            label: "flop",
            reliable: true,
          });

          if (conn) {
            //successfull connected with peer
            conn.on("open", () => {
              status.current_user_id = id;

              if (inAddressbook) {
                status.current_user_nickname = inAddressbook.name;
              } else {
                status.current_user_nickname = nickname;
              }

              setupConnectionEvents(conn);
              m.route.set("/chat?id=" + status.custom_peer_id + "&peer=" + id);
            });

            conn.on("error", (e) => {
              side_toaster("Connection could not be established", 5000);

              if (route_target == null || route_target == undefined) {
                m.route.set("/start");
              } else {
                m.route.set(route_target);
              }

              console.error("Connection error:", e);
            });

            // Fallback in case 'open' or 'error' events are not triggered
            setTimeout(() => {
              if (!conn.open) {
                console.warn("Connection timeout");

                if (route_target == null || route_target == undefined) {
                  m.route.set("/start");
                } else {
                  m.route.set(route_target);
                }
              }
            }, 10000); // Adjust timeout as needed
          } else {
            if (route_target == null || route_target == undefined) {
              m.route.set("/start");
            } else {
              m.route.set(route_target);
            }
          }
        } catch (e) {
          m.route.set("/start");
          alert(e);
        }
      }, 4000);
    })
    .catch((e) => {});
};

//create room
// and create qr-code with peer id
let generate_contact = function () {
  //create qr code
  var qrs = new qrious();
  qrs.set({
    background: "white",
    foreground: "black",
    level: "H",
    padding: 5,
    size: 1000,
    value: settings.invite_url + "#!/intro?id=" + settings.custom_peer_id,
  });

  status.invite_qr = qrs.toDataURL();

  //m.route.set("/invite?id=" + settings.custom_peer_id);
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
  if (n == "error") {
    m.route.set("/start");
  } else {
    let m = n.split("id=");
    status.action = "";
    connect_to_peer(m[1]);
  }
};

//backupData

// Function to convert Object URL back to Blob
const convertObjectURLToBlob = async (objectURL) => {
  const response = await fetch(objectURL);
  const blob = await response.blob(); // Retrieve the Blob
  return blob;
};

// Function to store chat data
let storeChatData = async () => {
  // Filter chat data
  let data = chat_data.filter((e) => {
    return e.content !== "invitation link" && e.id !== "no-other-user-online";
  });

  // Return if no data
  if (!data || data.length === 0) return false;

  // Ensure only new data is added
  let newData = data.filter((item) => {
    return !chat_data_history.some(
      (historyItem) => JSON.stringify(historyItem) === JSON.stringify(item)
    );
  });

  // Process new data
  for (let e of newData) {
    if (e.type == "image") {
      try {
        // Convert Object URL to Blob and store as e.image_blob
        e.image_blob = await convertObjectURLToBlob(e.image);
        //delete e.image; // Remove raw Object URL (optional)
      } catch (error) {
        console.error("Error converting Object URL to Blob:", error);
      }
    }
  }

  if (newData.length > 0) {
    // Append new data to history
    chat_data_history.push(...newData);

    // Save updated history to local storage
    localforage.setItem("chatData", chat_data_history).then(() => {});
  }
};

//audio

var AudioComponent = {
  oninit: (vnode) => {
    vnode.state.isPlaying = false;
    vnode.state.audio = null;

    if (vnode.attrs.src instanceof Blob) {
      vnode.state.audioSrc = URL.createObjectURL(vnode.attrs.src);
    } else {
      console.error("Invalid src: Expected a Blob.");
      vnode.state.audioSrc = null;
    }
  },

  onbeforeupdate: (vnode, old) => {
    if (vnode.attrs.src !== old.attrs.src) {
      if (vnode.state.audioSrc) {
        console.log(vnode.state.audioSrc.type);
        URL.revokeObjectURL(vnode.state.audioSrc);
      }
      if (vnode.attrs.src instanceof Blob) {
        vnode.state.audioSrc = URL.createObjectURL(vnode.attrs.src);
      } else {
        console.error("Invalid src: Expected a Blob.");
        vnode.state.audioSrc = null;
      }
    }
  },

  onremove: (vnode) => {
    if (vnode.state.audioSrc) {
      URL.revokeObjectURL(vnode.state.audioSrc);
    }
    if (vnode.state.audio) {
      vnode.state.audio.pause();
      vnode.state.audio.src = ""; // Clear the source to release resources
    }
  },

  view: (vnode) => {
    return m("div.audio-player", [
      vnode.state.audioSrc
        ? m("audio", {
            src: vnode.state.audioSrc,

            oncreate: (audioVnode) => {
              vnode.state.audio = audioVnode.dom;
              audioVnode.dom.controls = false;

              audioVnode.dom.addEventListener("play", () => {
                vnode.state.isPlaying = true;
                m.redraw();
              });
              audioVnode.dom.addEventListener("pause", () => {
                vnode.state.isPlaying = false;
                m.redraw();
              });
              audioVnode.dom.addEventListener("ended", () => {
                vnode.state.isPlaying = false;
                m.redraw();
              });
              audioVnode.dom.addEventListener("error", () => {
                console.error(
                  "An error occurred while loading the audio.",
                  audioVnode.dom.error
                );
              });
            },
            style: { display: "none" },
          })
        : m("p", "Audio source is invalid or not provided."),
      m(
        "button",
        {
          onclick: () => togglePlayPause(vnode),
          disabled: !vnode.state.audioSrc,
        },
        vnode.state.isPlaying ? "Pause" : "Play"
      ),
    ]);

    function togglePlayPause(vnode) {
      if (vnode.state.audio) {
        vnode.state.isPlaying
          ? vnode.state.audio.pause()
          : vnode.state.audio.play();
      }
    }
  },
};

//callback geolocation
let geolocation_callback = function (e) {
  if (
    status.geolocation_autoupdate == false &&
    status.geolocation_onTimeRequest == true
  ) {
    status.geolocation_onTimeRequest = false;
    if (e.coords) {
      let latlng = { "lat": e.coords.latitude, "lng": e.coords.longitude };
      sendMessage(JSON.stringify(latlng), "gps");
    } else {
      console.log("error");
    }
  } else {
    if (e.coords) {
      let latlng = { "lat": e.coords.latitude, "lng": e.coords.longitude };

      sendMessage(JSON.stringify(latlng), "gps_live");
    } else {
      console.log("error");
    }
  }
};

let map;
let step = 0.004;
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

// Initialize the map and define the setup
function map_function(lat, lng, id) {
  map = L.map("map-container", {
    keyboard: true,
    zoomControl: false,
  }).setView([51.505, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  setTimeout(() => {
    document.querySelector(".leaflet-control-container").style.display = "none";
  }, 5000);

  let once = false; // Define 'once' outside the callback to persist its state
  let myMarker; // Define 'myMarker' outside the callback to persist its state

  L.Icon.Default.prototype.options.shadowUrl = "";

  L.Icon.Default.prototype.options.iconUrl = markerIcon;
  L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetina;

  let geolocation_cb = function (e) {
    if (!myMarker) {
      // Create the marker only once
      myMarker = L.marker([e.coords.latitude, e.coords.longitude])
        .addTo(map)
        .bindPopup("It's me")
        .openPopup();
      myMarker._icon.classList.add("myMarker");
      myMarker.options.shadowUrl = null;

      status.userMarkers[0] = myMarker;

      if (!once) {
        // Set the view only once
        map.setView([e.coords.latitude, e.coords.longitude]);
        once = true; // Set 'once' to true after the first execution
      }
    } else {
      // Update the marker's position
      myMarker.setLatLng([e.coords.latitude, e.coords.longitude]);
    }
  };

  geolocation(geolocation_cb);

  if (lat && lng) {
    let m = L.marker([lat, lng]).addTo(map).bindPopup(id).openPopup();
    setTimeout(() => {
      map.setView([lat, lng]);
      status.userMarkers[1] = m;
    }, 3000);
  }

  // Function to update or add markers
  function updateMarkers(status) {
    if (status.users_geolocation) {
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

          marker.options.shadowUrl = null;
          marker.options.url = "marker-icon.png";

          status.userMarkers[userId] = marker; // Store marker in the object with userId as key
        }
      });
    }
  }

  setTimeout(() => {
    updateMarkers(status);
  }, 5000);
}

function MoveMap(direction) {
  document.querySelector("#map-container").focus();
  const baseStep = 0.01;
  const zoomFactor = Math.pow(2, map.getZoom());
  const step = baseStep / zoomFactor;

  // Aktuelle Mitte der Karte
  let center = map.getCenter();

  // Verschiebung berechnen
  if (direction === "left") {
    center.lng -= step;
  } else if (direction === "right") {
    center.lng += step;
  } else if (direction === "up") {
    center.lat += step;
  } else if (direction === "down") {
    center.lat -= step;
  }
  map.panTo(center);
}

///////////////////////
/*VIEWS*/
//////////////////////

var root = document.getElementById("app");

var waiting = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  view: function () {
    let timer1 = "";

    return m(
      "div",
      {
        id: "waiting",
        class: "width-100 height-100 flex align-center justify-center",
        oninit: () => {
          top_bar("", "", "");
          bottom_bar("", "", "");

          timer1 = setTimeout(() => {
            let route = m.route.get();
            route.startsWith("/waiting") ? m.route.set("/start") : null;
          }, 10000);
        },
        onbeforeremove: () => {
          clearTimeout(timer1);
          console.log("timer killed");
        },
      },
      [m("span", "connecting")]
    );
  },
};

var about = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },
  view: function () {
    return m(
      "div",
      {
        class: "page",
        oncreate: () => {
          top_bar("", "", "");

          setTabindex();

          if (status.notKaiOS)
            top_bar("<img src='assets/image/back.svg'>", "", "");

          bottom_bar("", "", "");
        },
      },
      [
        m(
          "button",
          {
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
            class: "item",
            onclick: () => {
              m.route.set("/privacy_policy");
            },
          },
          "Privacy Policy"
        ),

        m(
          "button",
          {
            class: "item",
            onclick: () => {
              m.route.set("/invite");
            },
          },
          "Invite"
        ),

        m(
          "button",
          {
            class: "item",
            onclick: () => {
              m.route.set("/scan");
            },
          },
          "Scan"
        ),

        m(
          "button",
          {
            class: "item",
            onclick: () => {
              let prp = prompt("Enter the chat ID");
              if (prp !== null && prp !== "") {
                connect_to_peer(prp);
              } else {
                m.route.set("/start");
              }
            },
          },
          "Enter ID"
        ),

        status.addressbook_in_focus !== ""
          ? m(
              "button",
              {
                class: "item",
                onclick: () => {
                  let ask1 = confirm("Do you want to edit this contact?");
                  if (ask1) {
                    update_addressbook_item(status.addressbook_in_focus);
                  }
                },
              },
              "Edit contact"
            )
          : null,

        status.addressbook_in_focus !== ""
          ? m(
              "button",
              {
                class: "item",
                onclick: () => {
                  let ask0 = confirm("Do you want to delete this contact?");
                  if (ask0) {
                    delete_addressbook_item(status.addressbook_in_focus);
                  }
                },
              },
              "Delete contact"
            )
          : null,
        m("div", {
          id: "KaiOSads-Wrapper",
          class: "width-100",

          oncreate: () => {
            if (!status.notKaiOS) load_ads();
          },
        }),
      ]
    );
  },
};

var about_page = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  view: function () {
    return m(
      "div",
      {
        class: "page about-page",
        oncreate: ({ dom }) => {
          dom.focus();
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("<img src='assets/image/back.svg'>", "", "");
        },
      },
      [
        m(
          "div",
          { class: "item scroll", id: "about-text" },
          "With flop you can communicate directly with another person/machine (p2p). To do this you need a stable internet connection and you must know the other person's ID. When you start a chat you can share your ID via the options menu. Multiple people can also join the chat, the IDs of the other participants are automatically shared."
        ),

        m("div", { id: "description" }, [
          m("h2", {}, "Icons"),
          m(
            "div",
            { class: "flex width-100 item" },
            m.trust(
              "<img src='assets/image/no-monster.svg'> no other user online"
            )
          ),

          m(
            "div",
            { class: "flex width-100 item" },
            m.trust("<img src='assets/image/monster.svg'>user online")
          ),

          m(
            "div",
            { class: "flex width-100 item" },
            m.trust("<img src='assets/image/pencil.svg'>write")
          ),

          m(
            "div",
            { class: "flex width-100 item" },
            m.trust("<img src='assets/image/send.svg'>send")
          ),

          m(
            "div",
            { class: "flex width-100 item" },
            m.trust("<img src='assets/image/inivite.svg'>open new chat")
          ),

          m(
            "div",
            { class: "flex width-100 item" },
            m.trust("<img src='assets/image/option.svg'>option")
          ),

          m(
            "div",
            { class: "flex width-100" },
            m.trust("<img src='assets/image/record.svg'>audio message")
          ),

          m(
            "div",
            { class: "flex width-100 item" },
            m.trust(
              "<img src='assets/image/record-live.svg'>recording audio message"
            )
          ),
        ]),

        m(
          "div",
          { class: "item scroll", id: "about-text" },
          m.trust(
            "The code of the software is freely available: <a href='https://github.com/strukturart/flop'>gitHub</a>"
          )
        ),
        m(
          "div",
          {
            class: "item scroll",
            id: "about-text",
            oncreate: () => {
              setTabindex();
            },
          },
          m.trust(
            "<strong>License</strong><br><br>mithrilJS MIT<br>peerJS MIT<br>flop MIT"
          )
        ),
      ]
    );
  },
};

var invite = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  oncreate: () => {
    if (status.notKaiOS) {
      top_bar("<img src='assets/image/back.svg'>", "", "");
    } else {
      top_bar("", "", "");
    }

    bottom_bar("<img class='not-desktop' src='assets/image/link.svg'>", "", "");
  },
  view: () => {
    return m(
      "div",
      { class: "flex justify-center align-center page", id: "invite" },
      [
        m("div", { class: "flex justify-center" }, [
          m("img", { src: status.invite_qr }),
          m("div", { class: "" }, settings.nickname),
        ]),
      ]
    );
  },
};

var privacy_policy = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  view: function () {
    return m("div", { class: "page" }, [
      m(
        "div",
        {
          oncreate: ({ dom }) => {
            dom.focus();
            top_bar("", "", "");

            if (status.notKaiOS)
              top_bar("<img src='assets/image/back.svg'>", "", "");
          },
          oninit: () => {
            bottom_bar("", "", "");
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
                bottom_bar("", "", "");
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
                bottom_bar("", "", "");
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
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  view: function () {
    return m(
      "div",
      {
        class: "flex justify-center page",
        id: "settings-page",
        oncreate: () => {
          bottom_bar("", "", "");
          top_bar("", "", "");
          setTabindex();

          if (status.notKaiOS)
            top_bar("<img src='assets/image/back.svg'>", "", "");
        },
      },
      [
        m(
          "div",
          {
            oncreate: ({ dom }) => {
              dom.focus();
            },
            class: "item input-parent flex justify-spacearound",
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
            class: "item input-parent  flex justify-spacearound",
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
        m(
          "button",
          {
            id: "advanced settings",
            class: "item",
            onclick: (e) => {
              e.target.remove();

              document.querySelectorAll(".advanced-settings").forEach((el) => {
                el.style.display = "flex";
              });

              setTabindex();
            },
          },
          "advanced settings"
        ),
        m(
          "H2",
          { class: "text-center advanced-settings", style: "display:none" },
          m.trust("<br>Server Settings")
        ),

        m(
          "div",
          {
            class:
              "item input-parent  flex justify-spacearound advanced-settings",
            style: "display:none",
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
            class:
              "item input-parent  flex  justify-spacearound advanced-settings",
            style: "display:none",
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
            class:
              "item input-parent  flex justify-spacearound advanced-settings",
            style: "display:none",
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
            class:
              "item input-parent flex justify-spacearound advanced-settings",
            style: "display:none",
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
            class: "item vip-button",
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
                  side_toaster("settings saved", 2000);
                })
                .catch(function (err) {
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
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  view: function () {
    return m(
      "div",
      {
        class: "page",
        oncreate: () => {
          top_bar("", "", "");

          bottom_bar("", "", "");

          setTabindex();

          if (status.notKaiOS)
            top_bar("<img src='assets/image/back.svg'>", "", "");
        },
      },
      [
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
              bottom_bar("", "", "");
            },
            onclick: function () {
              if (status.userOnline > 0) {
                pick_image(handleImage);
              } else {
                side_toaster("no user online", 3000);
              }
            },
          },
          "share image"
        ),

        status.current_user_id
          ? m(
              "button",
              {
                oncreate: () =>
                  setTimeout(function () {
                    setTabindex();
                  }, 500),
                class: "item",
                id: "button-add-user",
                style: { display: status.userOnline ? "" : "none" },

                onfocus: () => {
                  bottom_bar("", "", "");
                },
                onclick: function () {
                  if (status.current_user_id) {
                    addUserToAddressBook(
                      status.current_user_id,
                      status.current_user_nickname
                    );
                  } else {
                    console.log(status);
                    side_toaster("contact could not be created", 3000);
                  }
                },
              },
              "add user to addressbook"
            )
          : null,

        m(
          "button",
          {
            class: "item",
            onfocus: () => {
              bottom_bar("", "", "");
            },
            style: { display: status.userOnline ? "" : "none" },

            onclick: function () {
              if (status.userOnline) {
                geolocation(geolocation_callback);
                status.geolocation_onTimeRequest = true;
                m.route.set("/chat?id=" + settings.custom_peer);
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
              bottom_bar("", "", "");
            },
            style: { display: status.userOnline ? "" : "none" },

            onclick: function () {
              if (status.userOnline) {
                if (status.geolocation_autoupdate) {
                  status.geolocation_autoupdate = false;
                  document.getElementById(
                    "sharing-live-geolocation"
                  ).innerText = "share live location";
                  m.route.set("/chat?id=" + settings.custom_peer);
                } else {
                  geolocation(geolocation_callback);
                  document.getElementById(
                    "sharing-live-geolocation"
                  ).innerText = "share live location";
                  status.geolocation_autoupdate = true;
                  m.route.set("/chat?id=" + settings.custom_peer);
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
            oninit: () => {
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
              bottom_bar("", "", "");
            },
          },
          "Invite users"
        ),
      ]
    );
  },
};

var start = {
  oninit: () => {
    key_delay();
    previousView();
    status.addressbook_in_focus = "";
    generate_contact();
  },
  onremove: () => {
    key_delay();
  },

  view: function () {
    return m(
      "div",
      {
        class: "flex justify-center align-center page",
        id: "start",
        oncreate: () => {
          top_bar("", "", "");

          document.querySelector(".loading-spinner").style.display = "none";

          //auto connect if id is given
          localforage
            .getItem("connect_to_id")
            .then((e) => {
              if (e && e.data) {
                let params = e.data.split("?id=");
                if (params.length > 1) {
                  let id = params[1];
                  localforage.removeItem("connect_to_id").then(() => {
                    connect_to_peer(id, "/chat");
                  });
                }
              }
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            });

          bottom_bar(
            "<img src='assets/image/invite.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
        },
      },
      [
        addressbook.length == 0
          ? m(
              "p",
              {
                id: "start-text",
                oncreate: (vnode) => {
                  vnode.dom.focus();
                  setTabindex();
                },
              },
              m.trust(
                "Flop is a webRTC chat app that allows you to communicate directly with someone (p2p). You can currently exchange text, images, audio and your location with your chat partner. <div class='item'></div><br>To chat with a person you have to invite them or you will be invited.<div class='item'></div><br><br>"
              )
            )
          : null,

        addressbook.length > 0
          ? m(
              "div",
              {
                class: "addressbook-box flex justify-center",
                id: "addressbook",
                oncreate: () => {
                  setTimeout(() => {
                    peer_is_online();
                  }, 2000);
                },
              },
              [
                addressbook.map((e) => {
                  return m(
                    "button",
                    {
                      class: "item flex justify-center addressbook-item",
                      "data-id": e.id,
                      "data-online": e.live ? "true" : "false",
                      oncreate: () => {
                        setTabindex();
                      },
                      onfocus: () => {
                        status.addressbook_in_focus = e.id;
                      },

                      onclick: () => {
                        if (e.live == true) {
                          connect_to_peer(
                            document.activeElement.getAttribute("data-id")
                          );
                        } else {
                          side_toaster("user is not online", 3000);
                          status.current_user_id =
                            document.activeElement.getAttribute("data-id");

                          status.current_user_nickname =
                            document.activeElement.innerText;
                          m.route.set(
                            "/chat?id=" +
                              status.custom_peer_id +
                              "&peer=" +
                              status.current_user_id
                          );
                        }
                      },
                    },
                    [
                      m("span", [
                        e.live == true
                          ? m("img", {
                              src: "/assets/image/online.svg",
                            })
                          : m("img", {
                              src: "/assets/image/offline.svg",
                            }),
                      ]),

                      m("span", !e.name ? e.nickname : e.name),
                    ]
                  );
                }),
              ]
            )
          : null,
      ]
    );
  },
};

var scan = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  view: function (vnode) {
    return m("div", {
      oncreate: () => {
        start_scan(scan_callback);
        if (status.notKaiOS == true)
          top_bar("<img src='assets/image/back.svg'>", "", "");
      },
    });
  },
};

let user_check;
var chat = {
  oninit: () => {
    key_delay();
    //reproduce chat data
    load_chat_history(status.current_user_id);
  },
  onremove: () => {
    key_delay();
  },

  onupdate: () => {
    //reproduce chat data
    load_chat_history(status.current_user_id);
  },

  view: function () {
    return m(
      "div",
      {
        id: "chat",
        class: "page",

        onremove: () => {
          clearInterval(user_check);

          var x = document.querySelector("div#side-toast");
          x.style.transform = "translate(-100vw,0px)";

          try {
            localforage.removeItem("connect_to_id");
          } catch (e) {}
        },
        oncreate: () => {
          top_bar(
            "",
            "<div id='name'>" + status.current_user_nickname + "</div>",
            "<img class='users' 'src='assets/image/no-monster.svg'>"
          );
          if (status.notKaiOS)
            top_bar(
              "<img src='assets/image/back.svg'>",
              "<div id='name'>" + status.current_user_nickname + "</div>",
              "<img class='users' src='assets/image/no-monster.svg'>"
            );

          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
          user_check = setInterval(() => {
            if (connectedPeers) {
              status.userOnline = connectedPeers.length;

              if (
                !status.notKaiOS &&
                connectedPeers.includes(status.current_user_id)
              )
                top_bar(
                  "",
                  "<div id='name'>" + status.current_user_nickname + "</div>",
                  "<img class='users' src='assets/image/monster.svg'>"
                );

              if (
                status.notKaiOS &&
                connectedPeers.includes(status.current_user_id)
              )
                top_bar(
                  "<img src='assets/image/back.svg'>",
                  "<div id='name'>" + status.current_user_nickname + "</div>",
                  "<img class='users' src='assets/image/monster.svg'>"
                );

              if (status.notKaiOS && status.userOnline == 0)
                top_bar(
                  "<img src='assets/image/back.svg'>",
                  "<div id='name'>" + status.current_user_nickname + "</div>",
                  "<img class='users' src='assets/image/no-monster.svg'>"
                );

              if (!status.notKaiOS && status.userOnline == 0)
                top_bar(
                  "",
                  "<div id='name'>" + status.current_user_nickname + "</div>",
                  "<img class='users' src='assets/image/no-monster.svg'>"
                );
            } else {
              console.log("user check not possible");
            }
          }, 2000);
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
              if (status.action === "write") write();
            }, 1000);
          },
          onfocus: () => {
            bottom_bar(
              "<img src='assets/image/send.svg'>",
              "<img src='assets/image/record.svg'>",
              "<img src='assets/image/option.svg'>"
            );
          },
        }),
      ]),

      chat_data.map(function (item, index) {
        let last = false;
        if (index === chat_data.length - 1) {
          last = true;
        }

        let ff = { lat: "", lng: "" };
        if (item.type == "gps" || item.type == "gps_live") {
          let n = JSON.parse(item.gps);
          ff.lat = n.lat;
          ff.lng = n.lng;
        }

        let nickname = "me";
        if (item.nickname != settings.nickname) {
          nickname = item.nickname;
        }

        return m(
          "article",
          {
            class: "flex item " + nickname + " " + item.type,
            tabindex: index,
            "data-type": item.type,
            "data-user-id": item.from,
            "data-user-nickname": item.nickname,
            "data-lat": ff.lat,
            "data-lng": ff.lng,

            oncreate: (vnode) => {
              if (last) {
                vnode.dom.focus();
                vnode.dom.scrollIntoView({ behavior: "smooth", block: "end" });
              }
            },

            onclick: () => {
              if (item.type == "gps" || item.type == "gps_live") {
                let f = JSON.parse(item.gps);

                m.route.set(
                  "/map_view?lat=" +
                    f.lat +
                    "&lng=" +
                    f.lng +
                    "&id=" +
                    item.nickname
                );
              }
            },

            onfocus: () => {
              links = linkify.find(document.activeElement.textContent);
              if (links.length > 0 && item.type == "text") {
                status.current_article_type = "link";
                bottom_bar(
                  "<img src='assets/image/pencil.svg'>",
                  "",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "gps" || item.type == "gps_live") {
                status.current_article_type = "gps";

                bottom_bar(
                  "<img src='assets/image/pencil.svg'>",
                  "",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "image") {
                status.current_article_type = "image";
                if (status.notKaiOS) return false;
                bottom_bar(
                  "<img src='assets/image/pencil.svg'>",
                  "<img src='assets/image/save.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "audio") {
                status.current_article_type = "audio";
                bottom_bar(
                  "<img src='assets/image/pencil.svg'>",
                  "<img src='assets/image/play.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "text") {
                status.current_article_type = "text";

                bottom_bar(
                  "<img src='assets/image/pencil.svg'>",
                  "",
                  "<img src='assets/image/option.svg'>"
                );
              }
            },
          },
          [
            index === 0 ||
            dayjs(item.datetime).format("MM.DD.YYYY") !==
              dayjs(chat_data[index - 1].datetime).format("MM.DD.YYYY")
              ? m(
                  "div",
                  { class: "flex new-date" },
                  dayjs(item.datetime).format("DD MMM YYYY")
                )
              : null,

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
                  src: URL.createObjectURL(item.image_blob),
                  "data-filename": item.filename,
                })
              : null,

            item.type === "gps"
              ? m("div", {
                  class: "message-map",
                  oncreate: (vnode) => {},
                })
              : null,

            item.type === "gps_live"
              ? m("div", {
                  class: "message-map",
                  oncreate: (vnode) => {},
                })
              : null,

            item.type === "audio"
              ? m(
                  "div",
                  {
                    class: "audioplayer",
                  },

                  m(AudioComponent, { src: item.content })
                )
              : null,

            m("div", { class: "flex message-head" }, [
              m("div", dayjs(item.datetime).format("hh:mm")),
              m(
                "div",
                {
                  class: "type",
                  style: { display: item.type == "gps" ? "" : "none" },
                },
                "  Location"
              ),

              m(
                "div",
                {
                  class: "type",
                  style: { display: item.type == "gps_live" ? "" : "none" },
                },
                "  Live location"
              ),
            ]),
          ]
        );
      })
    );
  },
};

var chatHistory = {
  state: { startIndex: 0, batchSize: 10, renderedItems: [] },

  oninit: function () {
    key_delay();

    chatHistory.state.renderedItems = chat_data_history.slice(
      0,
      chatHistory.state.batchSize
    );
  },

  onremove: () => {
    key_delay();
  },

  view: function () {
    return m(
      "div",
      {
        id: "chat",
        class: "flex justify-center align-start",
        oncreate: () => {
          bottom_bar("", "", "");
          const chatElement = document.querySelector("body");

          chatElement.addEventListener("scroll", () => {
            const scrollTop = chatElement.scrollTop;
            const clientHeight = chatElement.clientHeight;
            const scrollHeight = chatElement.scrollHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
              const nextStartIndex =
                chatHistory.state.startIndex + chatHistory.state.batchSize;
              const nextItems = chat_data_history.slice(
                nextStartIndex,
                nextStartIndex + chatHistory.state.batchSize
              );

              if (nextItems.length > 0) {
                chatHistory.state.startIndex = nextStartIndex;
                chatHistory.state.renderedItems =
                  chatHistory.state.renderedItems.concat(nextItems);
                m.redraw();
              }
            }

            if (scrollTop <= 100 && chatHistory.state.startIndex > 0) {
              const prevStartIndex = Math.max(
                0,
                chatHistory.state.startIndex - chatHistory.state.batchSize
              );

              const prevItems = chat_data_history.slice(
                prevStartIndex,
                chatHistory.state.startIndex
              );

              if (prevItems.length > 0) {
                chatHistory.state.startIndex = prevStartIndex;

                const allItems = chat_data_history.slice(
                  chatHistory.state.startIndex,
                  chatHistory.state.startIndex + chatHistory.state.batchSize
                );
                chatHistory.state.renderedItems = allItems;

                m.redraw();
              }
            }
          });
        },
      },
      chatHistory.state.renderedItems.map(function (item, index) {
        let nickname =
          item.nickname !== settings.nickname ? item.nickname : "me";

        return m(
          "article",
          {
            class: "item " + nickname + " " + item.type,
            tabindex: index,

            onfocus: () => {
              if (item.type == "audio") {
                status.current_article_type = "audio";

                bottom_bar("", "<img src='assets/image/play.svg'>", "");
              }
              if (item.type == "image") {
                status.current_article_type = "image";
                bottom_bar("", "<img src='assets/image/save.svg'>", "");
              }
            },
            onblur: () => {
              status.current_article_type = "";
              bottom_bar("", "", "");
            },
          },
          [
            item.type === "text"
              ? m("div", { class: "message-main" }, item.content)
              : null,
            item.type === "image"
              ? m("img", {
                  class: "message-media",
                  src: item.image_blob
                    ? URL.createObjectURL(item.image_blob)
                    : null,
                })
              : null,

            item.type === "audio"
              ? m(
                  "div",
                  {
                    class: "audioplayer",
                  },

                  m(AudioComponent, { src: item.content })
                )
              : null,
            m("div", { class: "message-head" }, [
              m("div", dayjs(item.datetime).format("hh:mm")),
              m("div", { class: "nickname" }, nickname),
            ]),
          ]
        );
      })
    );
  },
};

let map_view = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    key_delay();
  },

  view: function () {
    return m("div", {
      class: "width-100 height-100",

      id: "map-container",

      oncreate: (vnode) => {
        bottom_bar(
          "<img src='assets/image/plus.svg'>",
          "<img src='assets/image/person.svg'>",
          "<img src='assets/image/minus.svg'>"
        );
        const params = new URLSearchParams(m.route.get().split("?")[1]);
        const lat = parseFloat(params.get("lat"));
        const lng = parseFloat(params.get("lng"));
        const id = params.get("id");

        map_function(lat, lng, id);

        if (status.notKaiOS)
          top_bar("<img src='assets/image/back.svg'>", "", "");
      },
    });
  },
};

var intro = {
  oninit: () => {
    key_delay();
    //create peer on start
    getIceServers();
  },
  onremove: () => {
    key_delay();
  },
  view: function () {
    return m(
      "div",
      {
        class: "width-100 height-100",
        id: "intro",
        onremove: () => {
          localStorage.setItem("version", status.version);
        },
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
            if (!status.notKaiOS) {
              app_launcher();
            } else {
              setTimeout(function () {
                let m = fullUrl.split("id=");
                connect_to_peer(m[1], "/start");
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

              if ("b2g" in navigator || status.notKaiOS) {
                fetch("/manifest.webmanifest")
                  .then((r) => r.json())
                  .then((parsedResponse) => {
                    status.version = parsedResponse.b2g_features.version;
                  });
              }
            };
            getManifest(get_manifest_callback);
          },
        }),
        m(
          "div",
          {
            class: "flex width-100  justify-center ",
            id: "version-box",
          },
          [
            m(
              "kbd",
              {
                id: "version",
              },
              localStorage.getItem("version") || 0
            ),
          ]
        ),
      ]
    );
  },
};

m.route(root, "/intro", {
  "/intro": intro,
  "/start": start,
  "/chat": chat,
  "/chatHistory": chatHistory,
  "/options": options,
  "/settings_page": settings_page,
  "/scan": scan,
  "/about": about,
  "/about_page": about_page,
  "/privacy_policy": privacy_policy,
  "/map_view": map_view,
  "/waiting": waiting,
  "/invite": invite,
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

      return;
    }

    const currentIndex = document.activeElement.tabIndex;
    let next = currentIndex + move;
    let items = 0;

    items = document.getElementById("app").querySelectorAll(".item");
    items = Array.from(items).filter(
      (item) => getComputedStyle(item).display !== "none"
    );

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

  document.addEventListener("swiped", function (e) {
    e.preventDefault();

    let a = e.target.closest("button.addressbook-item");

    if (a && e.detail.dir === "left") {
      a.classList.add("swipe-left"); // Move the button to the right

      setTimeout(() => {
        let ask0 = confirm("Do you want to delete this contact?");
        if (ask0) {
          delete_addressbook_item(a.getAttribute("data-id"));
        } else {
          a.classList.remove("swipe-left");
        }
      }, 500);
    }

    if (a && e.detail.dir === "right") {
      a.classList.add("swipe-right"); // Move the button to the left

      setTimeout(() => {
        let ask1 = confirm("Do you want to edit this contact?");
        if (ask1) {
          update_addressbook_item(a.getAttribute("data-id"));
        }
        // Revert position regardless of the choice
        a.classList.remove("swipe-right");
      }, 500); // Consistent shorter delay
    }
  });

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
    .querySelector("#top-bar div div.button-left")
    .addEventListener("click", function (event) {
      let route = m.route.get();

      if (
        route.startsWith("/chat?") ||
        m.route.get() == "/settings_page" ||
        m.route.get() == "/scan" ||
        m.route.get() == "/about" ||
        route.startsWith("/invite")
      ) {
        status.action = "";
        m.route.set("/start");
      }

      if (m.route.get() == "/scan") {
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

      if (m.route.get() == "/about_page") {
        status.action = "";
        m.route.set("/about");
      }

      if (route.startsWith("/map_view")) {
        m.route.set("/chat?id=") + settings.custom_peer;
        status.action = "";
      }

      if (m.route.get() == "/options") {
        m.route.set("/chat?id=") + settings.custom_peer;
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

  let longpress = false;
  const longpress_timespan = 2000;
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
    if (!status.viewReady) return false;

    switch (param.key) {
      case "Backspace":
        window.close();
        break;
    }
  }

  // /////////////
  // //SHORTPRESS
  // ////////////

  function shortpress_action(param) {
    if (!status.viewReady) {
      return false;
    }

    let route = m.route.get();

    switch (param.key) {
      case "Backspace":
        audioRecorder.stopRecording().then(() => {
          document.getElementById("app").style.opacity = "1";
          document.querySelector(".playing").style.top = "-1000%";
        });
        if (route.startsWith("/invite")) {
          m.route.set("/start");
        }

        if (m.route.get() == "/scan") {
          stop_scan();
          m.route.set("/start");
          status.action = "";
        }
        break;

      case "ArrowRight":
        if (route == "/map_view") {
          MoveMap("right");
        }

        if (route == "/start" && status.addressbook_in_focus !== "") {
          let ask0 = confirm("Do you want to delete this contact?");
          if (ask0) {
            delete_addressbook_item(status.addressbook_in_focus);
          }
        }

        break;

      case "ArrowLeft":
        if (route == "/map_view") {
          MoveMap("left");
        }

        if (route == "/start") {
          if (status.addressbook_in_focus != "") {
            let ask1 = confirm("Do you want to edit this contact?");
            if (ask1) {
              update_addressbook_item(status.addressbook_in_focus);
            }
          }
        }
        break;
      case "ArrowUp":
        if (route.startsWith("/map_view")) {
          MoveMap("up");
        } else {
          nav(-1);
        }

        break;
      case "ArrowDown":
        if (route == "/map_view") {
          MoveMap("down");
        } else {
          nav(+1);
        }

        break;

      case "SoftRight":
      case "Alt":
        if (route.startsWith("/start")) {
          m.route.set("/about");
        }

        if (route.startsWith("/chat?") && !status.audio_recording)
          m.route.set("/options");

        if (status.audio_recording && route.startsWith("/chat")) {
          audioRecorder.stopRecording().then(({ audioBlob, mimeType }) => {
            status.audio_recording = false;

            document.getElementById("app").style.opacity = "1";
            document.querySelector(".playing").style.top = "-1000%";

            write();
          });
        }

        if (route.startsWith("/map_view")) {
          ZoomMap("out");
        }

        break;

      case "SoftLeft":
      case "Control":
        if (route.startsWith("/chat?") && status.audio_recording) {
          // Stop recording and get the recorded data
          audioRecorder.stopRecording().then(({ audioBlob, mimeType }) => {
            status.audio_recording = false;
            document.getElementById("app").style.opacity = "1";
            document.querySelector(".playing").style.top = "-1000%";

            sendMessage(audioBlob, "audio", mimeType);
            bottom_bar(
              "<img src='assets/image/pencil.svg'>",
              "",
              "<img src='assets/image/option.svg'>"
            );

            write();
            return;
          });
        }
        if (route.startsWith("/invite")) {
          share(settings.invite_url + "?id=" + settings.custom_peer_id).then(
            (success) => {
              if (success) {
                console.log("Sharing was successful.");
              } else {
                console.log("Sharing failed.");
              }
            }
          );
        }

        if (route.startsWith("/chat?") && status.action == "write") {
          sendMessage(document.getElementsByTagName("input")[0].value, "text");
          write();
        }
        if (
          route.startsWith("/chat?") &&
          status.action !== "write" &&
          !status.audio_recording
        ) {
          if (
            status.userOnline > 0 &&
            connectedPeers.includes(status.current_user_id)
          ) {
            write();
          } else {
            side_toaster("no user online", 3000);
          }
        }

        if (route.startsWith("/start")) {
          m.route.set("/invite");
        }

        if (route.startsWith("/map_view")) {
          ZoomMap("in");
        }

        break;

      case "Escape":
        if (route.startsWith("/chat")) {
          audioRecorder.stopRecording().then(() => {
            document.getElementById("app").style.opacity = "1";
            document.querySelector(".playing").style.top = "-1000%";
            status.audio_recording = false;

            bottom_bar(
              "<img src='assets/image/pencil.svg'>",
              "",
              "<img src='assets/image/option.svg'>"
            );
          });
        }
        break;

      case "Enter":
        if (
          route.startsWith("/chat?") &&
          document.getElementById("message-input").style.display == "block"
        ) {
          if (status.audio_recording) return false;
          audioRecorder
            .startRecording()
            .then(() => {
              document.getElementById("app").style.opacity = "0";
              document.querySelector(".playing").style.top = "50%";

              bottom_bar(
                "<img src='assets/image/send.svg'>",
                "<img src='assets/image/record-live.svg'>",
                "<img src='assets/image/cancel.svg'>"
              );
            })
            .catch((e) => {});
        }

        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[0].focus();
        }

        if (
          m.route.get() == "/options" &&
          document.activeElement.id == "button-add-user"
        ) {
          if (status.current_user_id && status.current_user_nickname) {
            addUserToAddressBook(
              status.current_user_id,
              status.current_user_nickname
            );
          } else {
            console.log(status);
            side_toaster("contact could not be created", 3000);
          }
        }

        if (route.startsWith("/map_view")) {
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
            users_geolocation_count = 0;

            console.log(
              "Marker not found for index: " + users_geolocation_count
            );
          }
        }

        if (route.startsWith("/chatHistory")) {
          if (status.current_article_type == "image") {
            let filename = document.activeElement
              .querySelector("img")
              .getAttribute("data-filename");

            let data = document.activeElement
              .querySelector("img")
              .getAttribute("src");

            let download_successfull = () => {};
            downloadFile(filename, data, download_successfull);
          }

          if (status.current_article_type == "audio") {
            document.activeElement
              .querySelectorAll("div.audio-player")
              .forEach((e) => {
                var playPauseButton = e.querySelector("button");

                // Check if the play/pause button exists and trigger a click event
                if (playPauseButton) {
                  playPauseButton.click();
                }
              });
          }
        }

        if (route.startsWith("/chat")) {
          if (document.activeElement.tagName == "ARTICLE") {
            if (status.current_article_type == "audio") {
              document.activeElement
                .querySelectorAll("div.audio-player")
                .forEach((e) => {
                  var playPauseButton = e.querySelector("button");

                  // Check if the play/pause button exists and trigger a click event
                  if (playPauseButton) {
                    playPauseButton.click();
                  }
                });
            }

            if (status.current_article_type == "gps_live") {
              m.route.set("/map_view");
            }

            if (status.current_article_type == "gps") {
              m.route.set(
                "/map_view?lat=" +
                  document.activeElement.getAttribute("data-lat") +
                  "&lng=" +
                  document.activeElement.getAttribute("data-lng") +
                  "&id=" +
                  document.activeElement.getAttribute("data-user-nickname")
              );
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
            }
          }

          break;
        }

        break;
    }
  }

  // ///////////////////////////////
  // //shortpress / longpress logic
  // //////////////////////////////

  function handleKeyDown(evt) {
    if (evt.key === "Backspace") {
      evt.preventDefault();
    }

    if (!status.viewReady) return false;

    let route = m.route.get();

    if (evt.key == "Enter" && route == "/chat") {
      evt.preventDefault();
    }

    if (evt.key === "Backspace") {
      if (m.route.get() == "/scan") {
        stop_scan();
        m.route.set("/start");
        status.action = "";
      }

      if (
        route.startsWith("/chat?") ||
        m.route.get() == "/settings_page" ||
        m.route.get() == "/about" ||
        route.startsWith("/chatHistory") ||
        route.startsWith("/map_view") ||
        route.startsWith("/waiting") ||
        route.startsWith("/invite")
      ) {
        evt.preventDefault();
        m.route.set("/start");
        status.action = "";
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

      if (route.startsWith("/map_view")) {
        evt.preventDefault();
        status.action = "";
        m.route.set("/chat?id=") + settings.custom_peer;
      }

      if (m.route.get() == "/options") {
        m.route.set("/chat?id=") + settings.custom_peer;
      }
    }

    if (evt.key === "EndCall") {
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
    if (status.visibility === false) return false;

    clearTimeout(timeout);
    if (!longpress) {
      shortpress_action(evt);
    }
  }
});

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
    });
} catch (e) {
  console.log(e);
}

if (!status.notKaiOS) {
  try {
    navigator.mozSetMessageHandler("activity", function (activityRequest) {
      var option = activityRequest.source;
      let params = option.data.split("?id=");
      let id = params[1];
      if (id) {
        setTimeout(() => {
          connect_to_peer(id, "/start");
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
}

function handleVisibilityChange() {
  status.visibility = document.visibilityState === "visible";

  if (document.hidden) {
    localStorage.setItem("last_connection", status.current_user_id);
    localStorage.setItem("last_connections_time", new Date().toISOString());
    return;
  }

  checkAndReconnect();
}

function handlePageHide() {
  localStorage.setItem("last_connection", status.current_user_id);
  localStorage.setItem("last_connections_time", new Date().toISOString());
}

function handlePageShow() {
  status.visibility = true;
  checkAndReconnect();
}

function checkAndReconnect() {
  let r = m.route.get();
  if (r.startsWith("/start")) {
    peer_is_online();
    return;
  }

  if (r.startsWith("/chat?")) {
    let dtString = localStorage.getItem("last_connections_time");
    if (dtString) {
      let dt = new Date(dtString);
      let now = new Date();
      let durationMs = now - dt;

      if (durationMs > 360000) {
        m.route.set("/start");
      } else {
        getIceServers().then(() => {
          let f = localStorage.getItem("last_connection");
          if (f) {
            connect_to_peer(f);
          }
        });
      }
    } else {
      console.log("No last_connections_time found in localStorage.");
    }
  }
}

// Event-Listener iOS & android
document.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("pagehide", handlePageHide);
window.addEventListener("pageshow", handlePageShow);
