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
  addressbook_in_focus: "",
  geolocation_autoupdate: false,
  debug: false,
};

const audioRecorder = createAudioRecorder();
export let settings = {};

if ("b2g" in navigator || "navigator.mozApps" in navigator)
  status.notKaiOS = false;

if (!status.notKaiOS) {
  const scripts = [
    "./assets/js/kaiads.v5.min.js",
    "http://127.0.0.1/api/v1/shared/core.js",
    "http://127.0.0.1/api/v1/shared/session.js",
    "http://127.0.0.1/api/v1/apps/service.js",
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
        conn = peer.connect(user, {
          label: "flop",
          reliable: true,
        });
        conn.on("open", () => {
          setupConnectionEvents(conn);
        });
      } catch (e) {
        console.log("try to connect failed" + e);
      }
    } else {
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

let delete_addressbook_item = (userIdToDelete) => {
  // Filter out the user with the specified id
  addressbook = addressbook.filter((user) => user.id !== userIdToDelete);

  localforage
    .setItem("addressbook", addressbook)
    .then((e) => {
      side_toaster("deleted", 3000);
      m.redraw();
    })
    .catch((error) => {
      console.error("Error saving address book:", error);
    });
};

let addUserToAddressBook = (a, b) => {
  if (!Array.isArray(addressbook)) {
    console.error("addressbook is not defined or is not an array");
    return;
  }

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
  if (status.userOnline > 1) {
    console.log("to mutch users");

    conn.send({
      nickname: settings.nickname,
      userId: settings.custom_peer_id,
      type: "notification",
      content: "full-house",
    });
  }
  //todo block user if is !group chat
  if (connectedPeers.includes(conn.peer)) {
    return false;
  }
  if (conn.label !== "flop") {
    console.log("forbidden");
    return false;
  }

  connectedPeers.push(conn.peer);

  let userId = conn.peer;

  let pc = conn.peerConnection;

  if (pc) {
    pc.addEventListener("negotiationneeded", (event) => {
      console.log(event);
    });

    pc.addEventListener("icecandidateerror", (event) => {});

    pc.addEventListener("iceconnectionstatechange", () => {
      if (pc.iceConnectionState === "disconnected") {
        side_toaster(`User has left the chat`, 1000);
        connectedPeers = connectedPeers.filter((c) => c !== userId);
        updateConnections();
      }

      if (pc.iceConnectionState === "close") {
        side_toaster(`User has left the chat`, 1000);
        connectedPeers = connectedPeers.filter((c) => c !== userId);
        updateConnections();
      }

      if (pc.iceConnectionState === "connected") {
        remove_no_user_online();

        updateConnections();
      }

      if (pc.iceConnectionState === "open") {
        let route = m.route.get();
        if (route.startsWith("/start")) {
          side_toaster(
            `User wants to chat with you, if you want to join, press enter`,
            10000
          );

          if (!status.visibility)
            side_toaster(
              `User wants to chat with you, if you want to join, press enter`,
              10000
            );
        } else {
          side_toaster(`User has entered`, 2000);
          if (!status.visibility)
            pushLocalNotification("flop", "User has entered");
        }

        remove_no_user_online();

        updateConnections();
      }
    });
  }
  //receive data
  conn.on("data", function (data) {
    storeChatData();

    document.querySelector(".loading-spinner").style.display = "none";
    remove_no_user_online();

    if (
      data.type == "image" ||
      data.type == "text" ||
      data.type == "gps_live" ||
      data.type == "gps" ||
      data.type == "audio" ||
      data.type == "notification"
    ) {
      if (!connectedPeers.includes(conn.peer)) connectedPeers.push(conn.peer);

      let route = m.route.get();
      if (route.startsWith("/start")) {
        side_toaster(
          `User wants to chat with you, if you want to join, press enter`,
          10000
        );
      }

      //todo ask for connection
      if (data.type == "notification") {
        if (data.content == "full-house") {
          console.log("full house");
        }
      }
      if (data.type == "image") {
        if (!status.visibility) pushLocalNotification("flop", "new image");

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
        const audioBlob = new Blob([audioBuffer], {
          type: "audio/webm",
        });
        console.log(audioBlob);
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
          // Push a new GPS-Live message if not found

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
    m.redraw();
    stop_scan();
    remove_no_user_online();
  });

  // Event handler for connection closure

  conn.on("close", () => {
    side_toaster(`User has left the chat`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
    updateConnections();
  });

  conn.on("connection", function (dataConnection) {
    side_toaster("remote connection", 4000);
  });

  conn.on("disconnected", () => {
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
  });
  // Event handler for connection errors

  conn.on("error", () => {
    side_toaster(`User has been disconnected`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
    updateConnections();
  });
}

function updateConnections() {
  status.userOnline = connectedPeers.length;
  remove_no_user_online();
}

let ice_servers = {
  "iceServers": [],
};

const remove_no_user_online = () => {
  chat_data = chat_data.filter((e) => {
    return e.content !== "invitation link" && e.id !== "no-other-user-online";
  });

  m.redraw();
};

getIceServers().then(() => {
  console.log("peer created");
});

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
      top_bar("", "<img src='assets/image/offline.svg'>", "");
    }
    if (response.ok && m.route.get() == "/start") {
      top_bar("", "", "");
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

    peer.on("open", function (c) {
      document.querySelector(".loading-spinner").style.display = "none";

      remove_no_user_online();
    });

    peer.on("connection", function (c) {
      console.log("allow user?");
      setupConnectionEvents(c);

      status.user_does_not_exist = false;
      var x = document.querySelector("div#side-toast");
      x.style.transform = "translate(-100vw,0px)";
    });

    peer.on("disconnected", function (c) {
      //setupConnectionEvents(c);
    });

    peer.on("close", function (c) {
      document.querySelector(".loading-spinner").style.display = "none";
      //setupConnectionEvents(c);
    });

    peer.on("error", function (err) {
      console.log(err.type);

      switch (err.type) {
        case "server-error":
          side_toaster("The connection server is not reachable", 4000);
          m.route.set("/start");
          break;

        case "socket-closed":
          side_toaster("The connection server is not reachable", 4000);
          m.route.set("/start");
          break;

        case "peer-unavailable":
          side_toaster("The user does not exist.", 100000);
          status.user_does_not_exist = true;
          return false;

        default:
          break;
      }
    });
  } catch (error) {
    document.querySelector(".loading-spinner").style.display = "none";
    side_toaster("please retry to connect", 2000);
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

function sendMessage(msg, type) {
  if (msg == "") return false;

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

    sendMessageToAll(msg);

    focus_last_article();
    write();
  }

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
let peer_is_online = async function () {
  if (!navigator.onLine || addressbook.length == 0) {
    top_bar("", "<img src='assets/image/offline.svg'>", "");
    return false;
  }

  try {
    setTimeout(() => {
      document.querySelector(".loading-spinner").style.display = "block";

      if (ppeer) {
        ppeer.destroy();
        console.log("Existing peer instance destroyed");
      }

      const ppeer = new Peer({
        debug: 0,
        secure: false,
        config: ice_servers,
        referrerPolicy: "no-referrer",
      });

      setTimeout(() => {
        addressbook.forEach((entry, index) => {
          if (ppeer && !ppeer.disconnected) {
            addressbook[index].live = false;

            try {
              const tempConn = ppeer.connect(entry.id, {
                label: "ping",
                reliable: true,
              });

              if (tempConn) {
                tempConn.on("open", () => {
                  addressbook[index].live = true;

                  document
                    .querySelector("button[data-id='" + entry.id + "']")
                    .classList.add("live");

                  tempConn.close();
                });

                tempConn.on("error", () => {
                  addressbook[index].live = false;

                  document
                    .querySelector("button[data-id='" + entry.id + "']")
                    .classList.add("offline");
                });
              } else {
                addressbook[index].live = false;

                document
                  .querySelector("button[data-id='" + entry.id + "']")
                  .classList.add("offline");
              }
            } catch (error) {
              addressbook[index].live = false;

              document
                .querySelector("button[data-id='" + entry.id + "']")
                .classList.add("offline");
            }
          } else {
            console.log("Peer instance is disconnected or does not exist");
          }
        });
        document.querySelector(".loading-spinner").style.display = "none";
      }, 4000);
    }, 1000);

    return true;
  } catch (error) {
    document.querySelector(".loading-spinner").style.display = "none";
    alert(`Error: ${error.message}`);
    return false;
  }
};

//connect to peer
let connect_to_peer = function (id, route_target) {
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
      chat_data = [];

      setTimeout(() => {
        if (!peer) {
          console.error("Peer object is null");
          if (route_target == null || route_target == undefined) {
            history.back();
          } else {
            m.route.set(route_target);
          }
          return;
        }

        try {
          console.log("Attempting to connect to peer with ID:", id);
          conn = peer.connect(id, {
            label: "flop",
            reliable: true,
          });

          if (conn) {
            console.log("Connection object created:", conn);

            conn.on("open", () => {
              setupConnectionEvents(conn);
              console.log("Connection opened with peer:", id);
              status.current_room = id;
              m.route.set("/chat?id=" + id);
            });

            conn.on("connection", (e) => {
              setupConnectionEvents(conn);

              console.log("would you open connection with :", e);
            });

            conn.on("error", (e) => {
              if (route_target == null || route_target == undefined) {
                history.back();
              } else {
                m.route.set(route_target);
              }

              console.error("Connection error:", e);
            });

            let pc = conn.peerConnection;
            if (pc) {
              pc.addEventListener("icecandidate", (event) => {
                console.log("ICE candidate event:" + event);
              });

              pc.addEventListener("icecandidateerror", (event) => {
                console.error("ICE candidate error:", event);
              });

              pc.addEventListener("icegatheringstatechange", () => {
                console.log(
                  "ICE gathering state changed:",
                  pc.iceGatheringState
                );
                if (pc.iceGatheringState === "complete") {
                  console.log("ICE gathering state is complete");
                }
              });

              pc.addEventListener("iceconnectionstatechange", () => {
                console.log(
                  "ICE connection state changed:",
                  pc.iceConnectionState
                );
                if (pc.iceConnectionState === "disconnected") {
                }
                if (pc.iceConnectionState === "connected") {
                }
                if (
                  pc.iceConnectionState === "failed" ||
                  pc.iceConnectionState === "closed"
                ) {
                }
              });

              pc.addEventListener("signalingstatechange", () => {
                console.log("Signaling state changed:", pc.signalingState);
              });

              pc.addEventListener("negotiationneeded", (event) => {
                console.log("Negotiation needed:", event);
              });

              pc.addEventListener("connectionstatechange", () => {
                console.log("Connection state changed:", pc.connectionState);
                if (pc.connectionState === "connected") {
                  console.log("Peers are fully connected");
                }
                if (pc.connectionState === "disconnected") {
                  console.log("Peers are disconnected");
                }
                if (pc.connectionState === "failed") {
                  console.log("Connection failed");
                }
                if (pc.connectionState === "closed") {
                  console.log("Connection closed");
                }
              });
            } else {
              console.warn("Peer connection object not available");
              if (status.user_does_not_exist) {
                side_toaster("The user does not exist.", 100000);
              } else {
                side_toaster("Connection could not be established", 40000);
              }
              if (route_target == null || route_target == undefined) {
                history.back();
              } else {
                m.route.set(route_target);
              }
            }

            // Fallback in case 'open' or 'error' events are not triggered
            setTimeout(() => {
              if (!conn.open) {
                console.warn("Connection timeout");
                if (status.user_does_not_exist) {
                  side_toaster("The user does not exist.", 100000);
                } else {
                  side_toaster("Connection could not be established", 40000);
                }
                if (route_target == null || route_target == undefined) {
                  history.back();
                } else {
                  m.route.set(route_target);
                }
              }
            }, 10000); // Adjust timeout as needed
          } else {
            console.error("Failed to create connection object");
            if (status.user_does_not_exist) {
              side_toaster("The user does not exist.", 100000);
            } else {
              side_toaster("Connection could not be established", 40000);
            }
            if (route_target == null || route_target == undefined) {
              history.back();
            } else {
              m.route.set(route_target);
            }
          }
        } catch (e) {
          console.error("An error occurred during connection attempt:", e);
          if (route_target == null || route_target == undefined) {
            history.back();
          } else {
            m.route.set(route_target);
          }
          if (status.user_does_not_exist) {
            side_toaster("The user does not exist.", 100000);
          } else {
            side_toaster("Connection could not be established", 40000);
          }
        }
      }, 4000);
    })
    .catch((e) => {
      console.error("Failed to get ICE servers:", e);
      if (status.user_does_not_exist) {
        side_toaster("The user does not exist.", 100000);
      } else {
        side_toaster("Connection could not be established", 40000);
      }
    });
};

//create room
// and create qr-code with peer id
let create_peer = function () {
  if (!navigator.onLine) {
    top_bar("", "<img src='assets/image/offline.svg'>", "");

    return false;
  }
  document.querySelector(".loading-spinner").style.display = "block";

  status.current_room = peer.id;

  m.route.set("/chat?id=" + settings.custom_peer_id);

  //make qr code
  var qrs = new qrious();
  qrs.set({
    background: "white",
    foreground: "black",
    level: "H",
    padding: 5,
    size: 1000,
    value: settings.invite_url + "#!/intro?id=" + settings.custom_peer_id,
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

  m.redraw();
  focus_last_article();
  document.querySelector(".loading-spinner").style.display = "none";
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
  //maybe add new view "try to connect with funny animation"
  let m = n.split("id=");
  status.action = "";
  connect_to_peer(m[1]);
};

//backupData
/*
let storeChatData = () => {
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

  newData.map((e) => {
    if (e.image) {
    }
  });

  if (newData.length > 0) {
    // Append new data to history
    chat_data_history.push(...newData);

    // Save updated history to local storage
    localforage.setItem("chatData", chat_data_history).then((e) => {
      console.log("Chat data stored");
    });
  }
};

*/

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
    if (e.image) {
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
    localforage.setItem("chatData", chat_data_history).then(() => {
      console.log("Chat data stored with Blob images");
    });
  }
};

//audio

var AudioComponent = {
  oninit: (vnode) => {
    vnode.state.isPlaying = false;
    vnode.state.audio = null;
  },
  view: (vnode) => {
    return m("div.audio-player", [
      m("audio", {
        src: vnode.attrs.src,
        onkeydown: function (e) {
          if (e.key === "Enter") togglePlayPause();
        },
        oncreate: (audioVnode) => {
          vnode.state.audio = audioVnode.dom;
          audioVnode.dom.controls = false;

          // Add event listener for 'ended' event
          audioVnode.dom.addEventListener("ended", function () {
            vnode.state.isPlaying = false;
            m.redraw();
          });
        },
        style: { display: "none" }, // Hide the default audio element
      }),
      m(
        "button",
        {
          onclick: togglePlayPause,
        },
        vnode.state.isPlaying ? "Pause" : "Play"
      ),
    ]);

    function togglePlayPause() {
      if (vnode.state.isPlaying) {
        vnode.state.audio.pause();
      } else {
        vnode.state.audio.play();
      }
      vnode.state.isPlaying = !vnode.state.isPlaying;
    }
  },
};

//callback geolocation
let geolocation_callback = function (e) {
  console.log(e.coords);
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

// Function to move the map
function MoveMap(direction) {
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

  let geolocation_cb = function (e) {
    if (!myMarker) {
      // Create the marker only once
      myMarker = L.marker([e.coords.latitude, e.coords.longitude])
        .addTo(map)
        .bindPopup("It's me")
        .openPopup();
      myMarker._icon.classList.add("myMarker");
      myMarker.options.shadowUrl = null;
      myMarker.options.url = "marker-icon.png";

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

  map.on("zoomend", function () {
    let zoom_level = map.getZoom();

    if (zoom_level > 16) {
      step = 0.0005;
    } else if (zoom_level > 15) {
      step = 0.001;
    } else if (zoom_level > 14) {
      step = 0.002;
    } else if (zoom_level > 13) {
      step = 0.004;
    } else if (zoom_level > 12) {
      step = 0.01;
    } else if (zoom_level > 11) {
      step = 0.02;
    } else if (zoom_level > 10) {
      step = 0.04;
    } else if (zoom_level > 9) {
      step = 0.075;
    } else if (zoom_level > 8) {
      step = 0.15;
    } else if (zoom_level > 7) {
      step = 0.3;
    } else if (zoom_level > 6) {
      step = 0.5;
    } else if (zoom_level > 5) {
      step = 1.2;
    } else if (zoom_level > 4) {
      step = 2.75;
    } else if (zoom_level > 3) {
      step = 4.5;
    } else if (zoom_level > 2) {
      step = 8;
    } else {
      step = 20;
    }
  });
}

var root = document.getElementById("app");

var waiting = {
  view: function () {
    let timer1 = "";

    return m(
      "div",
      {
        id: "waiting",
        class:
          "width-100 height-100 flex align-item-center justify-content-center",
        oninit: () => {
          top_bar("", "", "");
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
      [
        m(
          "span",
          {
            oncreate: () => {
              document.querySelector(".loading-spinner").style.display =
                "block";
            },
          },
          "connecting"
        ),
      ]
    );
  },
};

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
        class: "page about-page",
        oncreate: ({ dom }) => {
          dom.focus();
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/image/back.svg'>");
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
            m.trust("<img src='assets/image/plus.svg'>open new chat")
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
        class: "flex justify-content-center algin-item-start page",
        oncreate: () => {
          top_bar("", "", "");

          bottom_bar(
            "",
            "<img class='not-desktop' src='./assets/image/select.svg'>",
            ""
          );

          setTabindex();

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
              //  pick_image(handleImage);

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
            id: "button-add-user",
            style: { display: status.userOnline ? "" : "none" },

            onfocus: () => {
              bottom_bar("", "<img  src='./assets/image/select.svg'>", "");
            },
            onclick: function () {
              if (
                status.current_user_id !== "" &&
                status.user_nickname !== ""
              ) {
                addUserToAddressBook(
                  status.current_user_id,
                  status.current_user_nickname
                );
              } else {
              }
            },
          },
          "add user to addressbook"
        ),

        m(
          "button",
          {
            class: "item",
            onfocus: () => {
              bottom_bar("", "<img src='assets/image/select.svg'>", "");
            },
            style: { display: status.userOnline ? "" : "none" },

            onclick: function () {
              if (status.userOnline) {
                geolocation(geolocation_callback);
                status.geolocation_onTimeRequest = true;
                m.route.set("/chat?id=" + status.ownPeerId);
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
                if (status.geolocation_autoupdate) {
                  status.geolocation_autoupdate = false;
                  document.getElementById(
                    "sharing-live-geolocation"
                  ).innerText = "share live location";
                  m.route.set("/chat?id=" + status.ownPeerId);
                } else {
                  geolocation(geolocation_callback);
                  document.getElementById(
                    "sharing-live-geolocation"
                  ).innerText = "share live location";
                  status.geolocation_autoupdate = true;
                  m.route.set("/chat?id=" + status.ownPeerId);
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
        class: "flex justify-content-center algin-item-start page",
        id: "start",
        oncreate: () => {
          top_bar("", "", "");

          var x = document.querySelector("div#side-toast");
          x.style.transform = "translate(-100vw,0px)";

          //auto connect if id is given

          localforage
            .getItem("connect_to_id")
            .then((e) => {
              if (e && e.data) {
                // Check if e and e.data are not null or undefined
                let params = e.data.split("?id=");
                if (params.length > 1) {
                  let id = params[1];
                  localforage.removeItem("connect_to_id").then(() => {
                    connect_to_peer(id, "/start");
                  });
                } else {
                  console.error("Invalid data format"); // Handle invalid data format
                }
              } else {
                console.error("notihing to do!"); // Handle case where e or e.data is null or undefined
              }
            })
            .catch((error) => {
              console.error("Error retrieving data:", error); // Handle error retrieving data
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
        }),
        m(
          "p",
          {
            class: "item scroll",
            id: "start-text",
            tabIndex: 0,
            oncreate: (vnode) => {
              document.querySelector("#start p").focus();
              vnode.dom.focus();
            },
          },
          m.trust(
            "flop is a webRTC chat app with which you can communicate directly with someone (p2p). You can currently exchange text, images, audio and your position with your chat partner. To start chatting, press <span id='start-text-point'>enter</span>.<br><br>"
          )
        ),
        m(
          "button",
          {
            tabIndex: 1,

            class: "item",

            oncreate: (vnode) => {
              vnode.dom.style.display = "none";

              if (
                status.current_room == null ||
                status.current_room == "" ||
                status.user_does_not_exist
              ) {
                vnode.dom.style.display = "none";
                status.user_does_not_exist = false;
              }
            },
            onclick: (e) => {
              m.route.set("/chat?id=" + status.ownPeerId);
              peer.reconnect();
            },
          },
          "reopen chat"
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
        class: "flex justify-content-center algin-item-start page",

        onremove: () => {
          document.querySelector(".loading-spinner").style.display = "none";
        },
        oncreate: () => {
          peer_is_online();

          localforage.getItem("chatData").then((e) => {
            chat_data_history = e || [];
          });

          status.addressbook_in_focus = "";
          bottom_bar(
            "<img src='assets/image/qr.svg'>",
            "",
            "<img src='assets/image/id.svg'>"
          );

          if (status.notKaiOS == true)
            top_bar("", "", "<img src='assets/image/back.svg'>");
        },
      },

      chat_data_history.length > 0
        ? m(
            "button",
            {
              onclick: () => {
                m.route.set("/chatHistory");
              },
            },
            "chat history"
          )
        : null,

      addressbook.length == 0
        ? null
        : m(
            "div",
            {
              class: "width-100 flex justify-content-center",
            },
            m.trust("<br>Addressbook<br><br>")
          ),
      [
        addressbook.length > 0
          ? null
          : m(
              "div",
              {
                class: "text item",

                onfocus: () => {
                  bottom_bar(
                    "<img src='assets/image/qr.svg'>",
                    "",
                    "<img src='assets/image/id.svg'>"
                  );
                },
              },
              "You can join a chat when someone invites you with a link. If you don't have this link, you can also enter the chat ID here or scan the QR code."
            ),

        addressbook.length > 0
          ? null
          : m(
              "div",
              {
                class: "item text",
                oncreate: () => {
                  setTabindex();
                },
              },
              m.trust(
                "You don't have any users in your address book yet. If you chat with a user, you can add them to your address book and contact them more quickly.<br><br>"
              )
            ),

        addressbook.length == 0
          ? null
          : m(
              "div",
              {
                class: "width-100 flex justify-content-center",
                id: "addressbook",
              },
              [
                addressbook.map((e) => {
                  return m(
                    "button",
                    {
                      class:
                        "item flex justify-content-center align-item-center",
                      "data-id": e.id,
                      "data-online": e.live ? "true" : "false",
                      oncreate: (vnode) => {
                        setTabindex();
                      },
                      onfocus: () => {
                        status.addressbook_in_focus = e.id;
                        bottom_bar(
                          "",
                          "<img src='assets/image/select.svg'>",
                          "<img src='assets/image/delete.svg'>"
                        );
                      },
                      onhover: () => {},
                      onblur: () => {
                        status.addressbook_in_focus = "";
                      },

                      onclick: () => {
                        if (e.live == true) {
                          connect_to_peer(
                            document.activeElement.getAttribute("data-id")
                          );
                        } else {
                          side_toaster("user is not online", 3000);
                        }
                      },
                    },
                    [
                      m(
                        "span",
                        m.trust(
                          "<img class='online' src='/assets/image/online.svg'><img class='offline' src='/assets/image/offline.svg'>"
                        )
                      ),

                      m("span", e.nickname),
                    ]
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
        class: "flex justify-content-center algin-item-start",

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
            "<img  class='users' title='0' 'src='assets/image/no-monster.svg'>",
            "",
            ""
          );
          if (status.notKaiOS)
            top_bar(
              "<img class='users' title='0' src='assets/image/no-monster.svg'>",
              "",
              "<img src='assets/image/back.svg'>"
            );

          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
          user_check = setInterval(() => {
            if (connectedPeers) {
              status.userOnline = connectedPeers.length;
              document
                .querySelector("img.users")
                .setAttribute("title", status.online);

              sendMessageToAll({
                userlist: connectedPeers,
                nickname: settings.nickname,
                userId: settings.custom_peer_id,
              });

              if (!status.notKaiOS && status.userOnline > 0)
                top_bar(
                  "<img class='users' title='" +
                    status.userOnline +
                    "' src='assets/image/monster.svg'>",
                  "",
                  ""
                );

              if (status.notKaiOS && status.userOnline > 0)
                top_bar(
                  "<img class='users' title='" +
                    status.userOnline +
                    "' src='assets/image/monster.svg'>",
                  "",
                  "<img src='assets/image/back.svg'>"
                );

              if (status.notKaiOS && status.userOnline == 0)
                top_bar(
                  "<img class='users' title='" +
                    status.userOnline +
                    "' src='assets/image/no-monster.svg'>",
                  "",
                  "<img src='assets/image/back.svg'>"
                );

              if (!status.notKaiOS && status.userOnline == 0)
                top_bar(
                  "<img class='users' title='" +
                    status.userOnline +
                    "' src='assets/image/no-monster.svg'>",
                  "",
                  ""
                );
            }
          }, 3000);
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
        //own message
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
            class: "item " + nickname + " " + item.type,
            tabindex: index,
            "data-type": item.type,
            "data-user-id": item.userId,
            "data-user-nickname": item.nickname,
            "data-lat": ff.lat,
            "data-lng": ff.lng,

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
              status.current_user_id =
                document.activeElement.getAttribute("data-user-id");
              status.current_user_nickname =
                document.activeElement.getAttribute("data-user-nickname");

              links = linkify.find(document.activeElement.textContent);
              if (links.length > 0 && item.type == "text") {
                status.current_article_type = "link";
                bottom_bar(
                  "<img src='assets/image/pencil.svg'>",
                  "<img src='assets/image/link.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "gps" || item.type == "gps_live") {
                status.current_article_type = "gps";

                bottom_bar(
                  "<img src='assets/image/pencil.svg'>",
                  "<img src='assets/image/select.svg'>",
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
                  onclick: () => {
                    if (item.content == "invitation link") {
                      share(
                        settings.invite_url + "?id=" + settings.custom_peer_id
                      ).then((success) => {
                        if (success) {
                          m.route.set("/chat?id=" + settings.custom_peer_id);
                        } else {
                          console.log("Sharing failed.");
                        }
                      });
                    }
                  },
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
              m("div", time_parse(item.datetime)),
              m("div", { class: "nickname" }, nickname),
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
  view: function () {
    return m(
      "div",
      {
        id: "chat",
        class: "flex justify-content-center algin-item-start",

        oninit: () => {},

        onremove: () => {
          var x = document.querySelector("div#side-toast");
          x.style.transform = "translate(-100vw,0px)";

          try {
            localforage.removeItem("connect_to_id");
          } catch (e) {}
        },
        oncreate: () => {
          top_bar("", "", "");
          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/image/back.svg'>");

          bottom_bar("", "", "");
        },
      },

      chat_data_history.map(function (item, index) {
        //own message
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
            class: "item " + nickname + " " + item.type,
            tabindex: index,
            "data-type": item.type,
            "data-user-id": item.userId,
            "data-user-nickname": item.nickname,
            "data-lat": ff.lat,
            "data-lng": ff.lng,

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
              status.current_user_id =
                document.activeElement.getAttribute("data-user-id");
              status.current_user_nickname =
                document.activeElement.getAttribute("data-user-nickname");

              links = linkify.find(document.activeElement.textContent);
              if (links.length > 0 && item.type == "text") {
                status.current_article_type = "link";
                bottom_bar(
                  "",
                  "<img src='assets/image/link.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "gps" || item.type == "gps_live") {
                status.current_article_type = "gps";

                bottom_bar(
                  "",
                  "<img src='assets/image/select.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "image") {
                status.current_article_type = "image";
                if (status.notKaiOS) return false;
                bottom_bar(
                  "",
                  "<img src='assets/image/save.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "audio") {
                status.current_article_type = "audio";
                bottom_bar(
                  "",
                  "<img src='assets/image/play.svg'>",
                  "<img src='assets/image/option.svg'>"
                );
              }

              if (item.type == "text") {
                status.current_article_type = "text";

                bottom_bar("", "", "<img src='assets/image/option.svg'>");
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
                  src: item.image_blob
                    ? URL.createObjectURL(item.image_blob)
                    : null,
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
              m("div", time_parse(item.datetime)),
              m("div", { class: "nickname" }, nickname),
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

let map_view = {
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
          top_bar("", "", "<img src='assets/image/back.svg'>");
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
            if (status.notKaiOS == false) {
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
            class: "flex width-100  justify-content-center ",
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
  "/open_peer_menu": open_peer_menu,
  "/start": start,
  "/links_page": links_page,
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

      if (m.route.get() == "/scan") {
        status.action = "";
        m.route.set("/open_peer_menu");
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
        m.route.set("/chat?id=") + status.ownPeerId;
        status.action = "";
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
          document.activeElement.tagName == "INPUT" &&
          status.notKaiOS
        ) {
          document.activeElement.blur();
          // Start recording
          if (status.audio_recording) return false;
          audioRecorder.startRecording().then(() => {
            status.audio_recording = true;

            document.getElementById("app").style.opacity = "0";
            document.querySelector(".playing").style.opacity = "1";

            bottom_bar(
              "<img src='assets/image/pencil.svg'>",
              "<img src='assets/image/record-live.svg'>",
              "<img src='assets/image/option.svg'>"
            );
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
      case "ArrowRight":
        if (route == "/map_view") {
          MoveMap("right");
        }
        break;

      case "ArrowLeft":
        if (route == "/map_view") {
          MoveMap("left");
        }
        break;
      case "ArrowUp":
        if (
          route.startsWith("/chat") &&
          document.activeElement.tagName === "INPUT"
        ) {
          status.action == "write";
          write();
        }

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
        if (route.startsWith("/chat") && !status.audio_recording)
          m.route.set("/options");
        if (route == "/start") m.route.set("/about");

        if (status.audio_recording && route.startsWith("/chat")) {
          audioRecorder.stopRecording().then((audioBlob) => {
            status.audio_recording = false;

            document.getElementById("app").style.opacity = "1";
            document.querySelector(".playing").style.opacity = "0";

            write();
          });
        }

        if (route.startsWith("/map_view")) {
          ZoomMap("out");
        }

        if (route == "/open_peer_menu") {
          if (status.addressbook_in_focus == "") {
            let prp = prompt("Enter the chat ID");
            if (prp !== null && prp !== "") {
              connect_to_peer(prp);
            } else {
              m.route.set("/open_peer_menu");
            }
          } else {
            delete_addressbook_item(status.addressbook_in_focus);
          }
        }

        break;

      case "SoftLeft":
      case "Control":
        if (
          route.startsWith("/chat") &&
          status.action == "write" &&
          status.audio_recording
        ) {
          // Stop recording and get the recorded data
          audioRecorder.stopRecording().then((audioBlob) => {
            document.getElementById("app").style.opacity = "1";
            document.querySelector(".playing").style.opacity = "0";

            sendMessage(audioBlob, "audio");
            bottom_bar(
              "<img src='assets/image/pencil.svg'>",
              "",
              "<img src='assets/image/option.svg'>"
            );

            // Clean up the audio recorder
            audioRecorder.cleanup();
            status.audio_recording = false;
            write();
          });
        }

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

        if (route.startsWith("/map_view")) {
          ZoomMap("in");
        }

        if (route == "/start") {
          m.route.set("/open_peer_menu");
        }

        if (route == "/open_peer_menu") {
          start_scan(scan_callback);
          m.route.set("/scan");
        }

        break;

      case "Enter":
        if (document.activeElement.tagName == "INPUT") {
          if (route.startsWith("/chat" && status.action == "write"))
            if (status.audio_recording) return false;
          audioRecorder.startRecording().then(() => {
            document.getElementById("app").style.opacity = "0";
            document.querySelector(".playing").style.opacity = "1";

            status.audio_recording = true;
            bottom_bar(
              "<img src='assets/image/send.svg'>",
              "<img src='assets/image/record-live.svg'>",
              "<img src='assets/image/cancel.svg'>"
            );
          });
        }

        if (status.notKaiOS) {
          if (route.startsWith("/chat" && status.action == "write")) {
          }
        }

        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[0].focus();
        }

        if (
          m.route.get() == "/options" &&
          document.activeElement.id == "button-add-user"
        ) {
          if (status.current_user_id !== "" && status.user_nickname !== "")
            addUserToAddressBook(
              status.current_user_id,
              status.current_user_nickname
            );
        }

        if (route == "/start") {
          create_peer();
        }
        //addressbook open peer
        if (route == "/open_peer_menu") {
          if (document.activeElement.getAttribute("data-online") == "true") {
            connect_to_peer(document.activeElement.getAttribute("data-id"));
          } else {
            side_toaster("user is not online", 3000);
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
          } else {
            return false;
          }
        }

        if (route.startsWith("/chat")) {
          if (document.activeElement.tagName == "ARTICLE") {
            if (status.current_article_type == "link") {
              m.route.set("/links_page");
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
            } else {
              return false;
            }
          }

          break;
        }

        break;

      case "Backspace":
        if (m.route.get() == "/scan") {
          stop_scan();

          m.route.set("/open_peer_menu");

          status.action = "";
        }

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

    if (evt.key == "Enter" && route == "/chat") {
      evt.preventDefault();
    }

    if (evt.key === "Backspace") {
      if (m.route.get() == "/scan") {
        stop_scan();

        m.route.set("/open_peer_menu");

        status.action = "";
      }

      if (
        route.startsWith("/chat") ||
        m.route.get() == "/settings_page" ||
        m.route.get() == "/open_peer_menu" ||
        m.route.get() == "/about" ||
        route.startsWith("/chatHistory") ||
        route.startsWith("/map_view") ||
        route.startsWith("/waiting")
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

      if (route.startsWith("/map_view")) {
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

if (status.notKaiOS == false) {
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
