"use strict";

import {
  pick_file,
  data_export,
  bottom_bar,
  side_toaster,
  pick_image,
  generateRandomString,
  load_ads,
  share,
  top_bar,
  getManifest,
  setTabindex,
  downloadFile,
  createAudioRecorder,
  list_files,
  get_file,
  arrayBufferToBase64,
  getTURN,
} from "./assets/js/helper.js";
import { stop_scan, start_scan } from "./assets/js/scan.js";
import localforage from "localforage";

import * as linkify from "linkifyjs";
import { geolocation, pushLocalNotification } from "./assets/js/helper.js";
import m from "mithril";
import qrious from "qrious";
import { v4 as uuidv4 } from "uuid";
import L from "leaflet";
import dayjs from "dayjs";

import AudioMotionAnalyzer from "audiomotion-analyzer";
import DOMPurify from "dompurify";
import "swiped-events";
import markerIcon from "./assets/css/images/marker-icon.png";
import markerIconRetina from "./assets/css/images/marker-icon-2x.png";
import { createAvatar } from "@dicebear/core";
import * as style from "@dicebear/identicon";
import Peer from "peerjs";

export let status = {
  visibility: true,
  action: "",
  deviceOnline: true,
  userOnline: 0,
  notKaiOS: true,
  current_article_type: "",
  current_user_id: "",
  current_user_nickname: "",
  current_user_name: "",
  current_clientId: "",
  users_geolocation: [],
  userMarkers: [],
  addressbook_in_focus: "",
  geolocation_autoupdate: false,
  geolocation_autoupdate_id: "",
  geolocation_last_autoupdate_id: null,
  geolocation_onTimeRequest: false,
  debug: false,
  viewReady: false,
  groupchat: false,
  history_of_ids: [],
  readyToClose: false,
  webpush_do_not_annoy: [],
  files: [],
  audiocontrol: "",
  lastPingSentAt: Date.now(),
  notificationLastCall: Date.now(),
  maxImageSize: 640,
};

// not KaiOS
//todo get own peer nickname
//to set the right nickname when storing contact in addressbook

export let settings = {};

const userAgent = navigator.userAgent || "";

if (userAgent && userAgent.includes("KAIOS")) {
  status.notKaiOS = false;
  status.maxImageSize = 320;
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

let links = "";
let chat_data = [];
let peer = null;

let conn = "";
let connectedPeers = [];
let connectedPeersObject = [];

if (status.debug) {
  window.onerror = function (msg, url, linenumber) {
    alert(
      "Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber
    );
    return true;
  };
}

//sometime the key press are delayed
let key_delay = () => {
  setTimeout(() => {
    status.viewReady = true;
  }, 1500);
};

let create_avatar = (string, size) => {
  const avatar = createAvatar(style, {
    seed: string,
    size: size,
  });

  return avatar.toDataUri();
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
/*
setTimeout(() => {
  addressbook = [
    {
      name: "jj",
      nickname: "xdd",
      id: "112",
      last_conversation_message: "test last xcccxxc",
      last_conversation_datetime: 1741625898228,
    },
    {
      name: "jj",
      nickname: "xdd",
      id: "112",
      last_conversation_message: "test last xcccxxc",
      last_conversation_datetime: 1741625898228,
    },
  ];
}, 1000);
*/

localforage
  .getItem("addressbook")
  .then((e) => {
    if (e !== null) {
      addressbook = e;

      if (addressbook.length === 0) {
        addressbook = [];
      } else {
        addressbook.forEach((entry) => {
          entry.live = false;
        });

        clean_chat_data();
      }
    } else {
      addressbook = [];
    }
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

//update addressbook
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

let addUserToAddressBook = (a, b, c = "") => {
  if (!Array.isArray(addressbook)) {
    console.error("addressbook is not defined or is not an array");
    return;
  }

  let exists = addressbook.some((e) => e.id == a);

  if (!exists) {
    let uname = prompt("enter the name of the contact");
    if (!uname) uname = "";

    addressbook.push({
      id: a,
      nickname: b,
      name: uname,
      client_id: c,
      live: false,
    });

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

//clean messageQueue
let clean_chat_data = async () => {
  if (addressbook.length > 0 && chat_data_history.length > 0) {
    console.log("clean chat data");
  } else {
    console.log("nothing to clean");
  }
};

//reproduce chatHistory

let load_chat_data = (id) => {
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
let restrict_same_id = [];
function setupConnectionEvents(conn) {
  connectedPeersObject.push(conn);
  connectedPeers.push(conn.peer);

  let pc = conn.peerConnection;

  pc.addEventListener("iceconnectionstatechange", () => {
    console.log(pc.iceConnectionState);

    switch (pc.iceConnectionState) {
      case "disconnected":
      case "failed":
      case "closed":
        peer_is_online();

        connectedPeers = connectedPeers.filter((c) => c !== conn.peer);

        connectedPeersObject = connectedPeersObject.filter(
          (c) => c.peer !== conn.peer
        );

        updateConnections();
        break;
      case "checking":
        peer_is_online();

        break;

      case "connected":
        //Que
        console.log("connected " + conn.peer);
        peer_is_online();

        try {
          messageQueue();
          if (messageQueueStorage.length > 0) {
            messageQueueStorage.map((e) => {
              if (e.to == conn.peer && e.type != "typing") {
                sendMessageToAll(e);
              }
            });
          }
        } catch (e) {
          console.log(e);
        }

        /*
        Users can change their peer ID to avoid losing their connection, 
        and it will be updated automatically. 
        The prerequisite is that the user is in the addressbook.
        */
        try {
          let k = JSON.parse(conn.metadata);
          k = k.history_of_ids;
          console.log("meta " + k);

          if (Array.isArray(k) && k.length > 1) {
            addressbook.forEach((e) => {
              if (k.includes(e.id)) {
                console.log("user in addressbook");
                if (e.id == k[k.length - 1]) {
                  //console.log("id is at last postion, no update needed");
                } else {
                  console.log("id is not at last postion, update needed");
                  let old_id = e.id;
                  e.id = k[k.length - 1];
                  localforage
                    .setItem("addressbook", addressbook)
                    .then(() => {
                      console.log("Addressbook updated!");
                      updateChatData(old_id, k[k.length - 1]).then(() => {
                        console.log("chatData updated");
                      });
                    })
                    .catch((error) => {
                      console.error(
                        "Error saving updated address book:",
                        error
                      );
                    });
                }
              }
            });
          }
        } catch (e) {
          console.log(e);
        }

        break;
    }
  });

  //receive data
  conn.on("data", function (data) {
    //block is not from flop app
    if (conn.label !== "flop") return;

    peer_is_online();

    //test ping
    //KaiOS 2
    try {
      if (data.type === "ping") {
        const now = Date.now();
        if (now - status.lastPingSentAt >= 30000) {
          sendMessage("", "ping", "", data.from, undefined);
          status.lastPingSentAt = now;
        }
      }
    } catch (e) {}

    if (data.type === "typing") {
      const chat = document.querySelector("#chat");
      const typingIndicator = document.querySelector("#typing-indicator");

      if (chat && typingIndicator) {
        typingIndicator.classList.add("typing");

        setTimeout(() => {
          typingIndicator.classList.remove("typing");
        }, 3000);
      }
    }

    //Message-POD
    if (data.type == "pod") {
      let match = chat_data_history.find((e) => e.id == data.id);
      if (match) {
        match.pod = true;
        localforage.setItem("chatData", chat_data_history).then(() => {
          let index = messageQueueStorage.findIndex((e) => e.id === data.id);
          if (index !== -1) {
            messageQueueStorage.splice(index, 1);
            localforage.setItem("messageQueue", messageQueueStorage);
          }
        });
      }
    }

    //get clienID
    //from chat partner
    //
    try {
      let clientID = JSON.parse(conn.metadata);
      clientID = clientID.unique_id;

      addressbook.forEach((e) => {
        if (e.id == data.from) {
          if (clientID == settings.clientID) {
            e.client_id = "null";
            localforage.setItem("addressbook", addressbook).then(() => {});
            return;
          }

          if (!e.client_id || e.client_id == "null") {
            e.client_id = clientID;
            localforage.setItem("addressbook", addressbook).then(() => {
              console.log("addressbook updated with clientID");
            });
          }
        }
      });
    } catch (err) {
      console.error(err);
    }

    //to prevent to post same message
    if (restrict_same_id.includes(data.id)) {
      console.log("duplicate");
      return;
    }

    if (
      data.type == "image" ||
      data.type == "text" ||
      data.type == "gps_live" ||
      data.type == "gps" ||
      data.type == "audio"
    ) {
      //is not in addressbook - ask
      //is in addressbook - notify
      let inAddressbook = addressbook.find((e) => e.id === data.from);
      if (!inAddressbook) {
        let ask = confirm("Do you want to chat with " + data.nickname + "?");
        if (ask) {
          status.current_user_id = data.from;
          status.current_user_name = "";
          m.route.set(
            "/chat?id=" +
              settings.custom_peer_id +
              "&peer=" +
              status.current_user_id
          );
        } else {
          conn.close();
        }
      } else {
        const now = Date.now();

        if (now - status.notificationLastCall >= 60000) {
          status.notificationLastCall = now;
          pushLocalNotification("New message from " + inAddressbook.name);
        }

        let r = m.route.get();
        if (r.startsWith("/start")) {
          peer_is_online();
          m.redraw();
        }
      }

      if (data.type == "image") {
        chat_data.push({
          nickname: data.nickname,
          content: "",
          datetime: data.datetime || new Date(),
          image: data.file,
          filename: data.filename,
          type: data.type,
          from: data.from,
          to: data.to,
          id: data.id,
        });

        sendMessage(data.id, "pod", "", data.from, data.id);

        focus_last_article();
        stop_scan();
      }

      //sanitize text
      if (data.type == "text") {
        let originalContent = data.content;
        let sanitizedContent = DOMPurify.sanitize(originalContent);

        if (originalContent !== sanitizedContent) {
          alert(
            "The message was blocked because it contains dangerous content"
          );
          return;
        }
      }

      if (data.type == "text") {
        chat_data.push({
          id: data.id,
          nickname: data.nickname,
          content: data.content,
          datetime: data.datetime || new Date(),
          type: data.type,
          from: data.from,
          to: data.to,
        });

        sendMessage(data.id, "pod", "", data.from, data.id);

        focus_last_article();
        stop_scan();

        //Last conversation

        if (inAddressbook) {
          inAddressbook.last_conversation_message = data.content;
          inAddressbook.last_conversation_datetime = dayjs().format("HH:mm");

          localforage
            .setItem("addressbook", addressbook)
            .then(() => {})
            .catch((error) => {
              console.error("Error saving updated address book:", error);
            });
        }
      }

      if (data.type === "audio") {
        let audioBlob;

        let mimetype = data.mimeType || "audio/webm";

        if (data.audio instanceof Blob) {
          audioBlob = data.audio;
        } else if (
          data.audio instanceof ArrayBuffer ||
          data.audio instanceof Uint8Array
        ) {
          audioBlob = new Blob([data.audio], { type: mimetype });
        } else {
          side_toaster("data type not supported", 4000);
          return;
        }

        chat_data.push({
          id: data.id,
          nickname: data.nickname,
          content: "",
          audio: audioBlob,
          datetime: data.datetime || new Date(),
          type: data.type,
          from: data.from,
          to: data.to,
        });

        sendMessage(data.id, "pod", "", data.from, data.id);
      }

      if (data.type == "gps") {
        chat_data.push({
          id: data.id,
          nickname: data.nickname,
          content: data.content,
          datetime: data.datetime || new Date(),
          type: data.type,
          gps: data.content,
          from: data.from,
          to: data.to,
        });

        sendMessage(data.id, "pod", "", data.from, data.id);
      }
      //to do not stable
      if (data.type == "gps_live") {
        let existingMsg = chat_data.find((item) => item.id === data.id);

        if (existingMsg) {
          existingMsg.content = data.content;

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
              id: data.id,
            });
          }
        } else {
          // Push a new GPS-Live message if not found

          chat_data.push({
            id: data.id,
            nickname: data.nickname,
            content: link_url,
            datetime: data.datetime || new Date(),
            type: data.type,
            gps: data.content,
            from: data.from,
            to: data.to,
          });
        }
      }
      restrict_same_id.push(data.id);

      storeChatData().then(() => {
        m.redraw();
      });
    } else {
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
    //side_toaster(`User has left the chat`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);

    connectedPeersObject = connectedPeersObject.filter(
      (c) => c.peer !== conn.peer
    );
    peer_is_online();

    updateConnections();
  });

  conn.on("error", () => {
    // side_toaster(`User has been disconnected`, 1000);
    connectedPeers = connectedPeers.filter((c) => c !== conn.peer);
    connectedPeersObject = connectedPeersObject.filter(
      (c) => c.peer !== conn.peer
    );
    peer_is_online();

    updateConnections();
  });
}

function updateConnections() {
  status.userOnline = connectedPeers.length;
}
//cloudfare
/*

getTURN();

let ice_servers = null;
localforage.getItem("turn_urls").then((e) => {
  ice_servers = e;
});

//load ICE Server
async function getIceServers() {
  if (peer && peer.open) {
    console.log("peer exist");
    return true;
  }

  try {
    peer = new Peer(settings.custom_peer_id, {
      debug: 0,
      secure: false,
      config: ice_servers,
    });

    peer.on("disconnected", () => {
      console.log(`disconnected from server`);

      attemptReconnect();
    });

    //connection to peer-server
    peer.on("open", function (id) {
      console.log("PeerJS connected with server ID: ", id);
    });

    peer.on("error", function (err) {
      console.error("Peer error:", err.type, err.message || err);
      attemptReconnect();
    });

    //connection from peer
    //pass connection objekt to tracker
    peer.on("connection", function (conn) {
      console.log("Remote " + conn.peer);
      setupConnectionEvents(conn);
    });
  } catch (error) {
    console.log(error);
  }
}

*/

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
      side_toaster("Server not reachable", 5000);
      //retry get turn
      getIceServers();
      if (p.startsWith("/start"))
        top_bar("", "<img src='assets/image/offline.svg'>", "");
    }
    if (response.ok) {
      if (p.startsWith("/start")) top_bar("", "", "");
    }

    const a = await response.json();

    a.forEach((credential) => {
      if (
        !ice_servers.iceServers.some(
          (server) => server.urls === credential.urls
        )
      ) {
        ice_servers.iceServers.push(credential);
      }
    });

    peer = new Peer(settings.custom_peer_id, {
      debug: 0,
      secure: false,
      config: ice_servers,
    });

    //disconnected from server try to reconnect
    peer.on("disconnected", () => {
      attemptReconnect();
    });

    //connection to peer-server
    peer.on("open", function (id) {
      console.log("PeerJS connected with server ID:", id);
    });

    //connection from remote peer
    //dosent work in KaiOS 2.x
    peer.on("connection", function (conn) {
      console.log("Hello remote " + conn.peer);
      setupConnectionEvents(conn);
    });

    peer.on("error", function (err) {
      console.error("Peer error:", err.type, err.message || err);
      attemptReconnect();

      //retry to connect
    });
  } catch (error) {
    side_toaster("The connection server is not reachable " + error, 6000);
  }
}

function attemptReconnect() {
  if (peer.disconnected) {
    console.log("Attempting to reconnect...");
    peer.reconnect();

    peer.on("open", (id) => {
      console.log("Reconnected successfully with ID:", id);
    });
  }
}

//load chat data
let chat_data_history = [];
localforage.getItem("chatData").then((e) => {
  chat_data_history = e || [];
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
      invite_url: "https://flop.chat/",
      custom_peer_id: "flop-" + uuidv4(16),
      unique_id: "flop-" + uuidv4(16),
    };

    for (const key in defaultValues) {
      if (!(key in settings)) {
        settings[key] = defaultValues[key];
      }
    }

    if (!settings.unique_id) {
      settings.unique_id = "flop-" + uuidv4(16);
      localforage.setItem("settings", settings).then(() => {});
    }

    if (value == null) {
      settings = defaultValues;
      localforage.setItem("settings", settings).then(() => {});
    }
  })
  .catch(function (err) {
    console.log(err);
  });

//peer id history

localforage
  .getItem("history_of_ids")
  .then((e) => {
    if (e == null) {
      localforage.setItem("history_of_ids", [settings.custom_peer_id]);
    } else {
      status.history_of_ids = e;
    }
  })
  .catch(() => {});

let write = () => {
  status.action = status.action === "write" ? "" : "write";
  m.redraw();
};

//list files
if (!status.notKaiOS) {
  list_files("json", (e) => {
    status.files.push(e);
  });
}

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
  }, 1500);
};

let import_addressbook = (e) => {
  let counter = 0;
  e.forEach((n) => {
    if (!addressbook.find((item) => item.id === n.id)) {
      addressbook.push(n);
      counter++;
    }
  });
  if (counter > 0) {
    // Save the updated addressbook to localforage
    localforage
      .setItem("addressbook", addressbook)
      .then(() => {
        side_toaster(counter + " users imported", 3000);
      })
      .catch((error) => {
        console.error("Error saving updated address book:", error);
      });
  } else {
    side_toaster("nothing to import", 3000);
  }
};

let import_chatdata = (e) => {};

let sendMessage = (
  msg = "",
  type,
  mimeType = "",
  to = status.current_user_id || "",
  messageId = uuidv4(16)
) => {
  let message = {};

  //PING
  //test connection
  if (type == "ping") {
    message = {
      nickname: settings.nickname,
      type: type,
      content: msg,
      mimeType: "",
      from: settings.custom_peer_id,
      to: to,
      id: messageId,
    };

    sendMessageToAll(message);
  }

  //POD
  if (type == "pod") {
    message = {
      nickname: settings.nickname,
      type: type,
      content: msg,
      mimeType: "",
      from: settings.custom_peer_id,
      to: to,
      id: messageId,
    };

    sendMessageToAll(message);
    console.log("send pod");
  }

  // If the chat partner is currently typing, send a "typing" message to  peer
  // to trigger a "user is typing..." animation or indicator in the UI.
  if (type == "typing") {
    message = {
      nickname: settings.nickname,
      type: type,
      from: settings.custom_peer_id,
      to: to,
      id: messageId,
    };

    sendMessageToAll(message);
  }

  //image
  if (type == "image") {
    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      chat_data.push({
        nickname: settings.nickname,
        content: "",
        datetime: new Date(),
        image: reader.result,
        filename: msg.filename,
        type: type,
        mimeType: mimeType,
        from: settings.custom_peer_id,
        to: to,
        id: messageId,
        pod: false,
      });

      message = {
        file: reader.result,
        filename: msg.filename,
        filetype: msg.type,
        nickname: settings.nickname,
        type: type,
        mimeType: mimeType,
        id: messageId,
        datetime: new Date(),
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
    //do not send empty message
    if (!msg) return false;

    message = {
      nickname: settings.nickname,
      type: type,
      content: msg,
      mimeType: mimeType,
      id: messageId,
      datetime: new Date(),
    };
    chat_data.push({
      nickname: settings.nickname,
      content: msg,
      datetime: new Date(),
      type: type,
      mimeType: mimeType,
      from: settings.custom_peer_id,
      to: to,
      id: messageId,
      datetime: new Date(),
      pod: false,
    });

    sendMessageToAll(message);

    focus_last_article();
    write();
  }

  //live gps
  if (type == "gps_live") {
    if (
      status.geolocation_autoupdate &&
      messageId != status.geolocation_last_autoupdate_id
    ) {
      chat_data.push({
        nickname: settings.nickname,
        content: msg,
        datetime: new Date(),
        type: type,
        gps: msg,
        mimeType: mimeType,
        from: settings.custom_peer_id,
        to: to,
        id: messageId,
        pod: false,
      });

      status.geolocation_last_autoupdate_id = messageId;
    }

    message = {
      text: "",
      content: msg,
      nickname: settings.nickname,
      type: type,
      gps: msg,
      mimeType: mimeType,
      id: messageId,
      datetime: new Date(),
    };

    sendMessageToAll(message);
  }

  //gps
  if (type == "gps") {
    chat_data.push({
      nickname: settings.nickname,
      content: msg,
      gps: msg,
      datetime: new Date(),
      type: type,
      mimeType: mimeType,
      from: settings.custom_peer_id,
      to: to,
      id: messageId,
      pod: false,
    });

    message = {
      content: msg,
      gps: msg,
      nickname: settings.nickname,
      type: type,
      mimeType: mimeType,
      id: messageId,
      datetime: new Date(),
    };

    status.geolocation_onTimeRequest = false;

    sendMessageToAll(message);
  }

  //audio
  if (type === "audio") {
    chat_data.push({
      nickname: settings.nickname,
      content: "",
      audio: msg,
      datetime: new Date(),
      type: type,
      mimeType: mimeType,
      from: settings.custom_peer_id,
      to: to,
      id: messageId,
      pod: false,
    });

    focus_last_article();

    msg
      .arrayBuffer()
      .then((buffer) => {
        message = {
          content: "",
          audio: buffer,
          nickname: settings.nickname,
          type: type,
          mimeType: mimeType,
          id: messageId,
          datetime: new Date(),
        };
        sendMessageToAll(message);
      })
      .catch((error) => {
        console.error("Error converting Blob to ArrayBuffer:", error);
      });
  }
};

let messageQueueStorage = [];

let messageQueue = (m = null) => {
  localforage
    .getItem("messageQueue")
    .then((e) => {
      messageQueueStorage = e || [];

      if (m) {
        let test = messageQueueStorage.find((e) => {
          return e.id == m.id;
        });
        if (!test) {
          messageQueueStorage.push(m);
          localforage.setItem("messageQueue", messageQueueStorage);
        }
      }

      //clean if user not anymore in addressbook

      if (
        m == null &&
        addressbook.length > 0 &&
        messageQueueStorage.length > 0
      ) {
        const ids = addressbook.map((e) => e.id);

        messageQueueStorage = messageQueueStorage.filter((message) =>
          ids.includes(String(message.to))
        );

        if (messageQueueStorage.length > 0) {
          localforage
            .setItem("messageQueue", messageQueueStorage)
            .then(() => {
              console.log("messageQueue cleaned");
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    })
    .catch((err) => {
      console.error("Error accessing localForage:", err);
    });
};
messageQueue();

async function sendMessageToAll(message) {
  message.from = settings.custom_peer_id;
  message.to = message.to ?? status.current_user_id;

  //get all open connection with peer.id
  const openConnections = connectedPeersObject.filter(
    (c) => c.peer === message.to && c.open
  );

  // send webPush
  if (!["ping", "pod", "typing"].includes(message.type)) {
    let getClientId = addressbook.find((e) => e.id == message.to);

    if (getClientId.client_id != "") {
      if (!status.webpush_do_not_annoy.includes(getClientId.client_id)) {
        if (message.type == "typing") return;

        console.log(
          "The user is not online. Message couldn't be sent. Try to send WebPush"
        );
        sendPushMessage(getClientId.client_id, "Flop");

        status.webpush_do_not_annoy.push(getClientId.client_id);

        // remove id after 5min
        setTimeout(() => {
          const index = status.webpush_do_not_annoy.indexOf(
            getClientId.client_id
          );
          if (index !== -1) {
            status.webpush_do_not_annoy.splice(index, 1);
          }
        }, 5 * 60 * 1000);
      }
    } else {
      console.log("no clientID");
    }

    if (message.type != "pod" && message.type != "typing") {
      // console.log("store it to send it later");

      messageQueue(message);
      await storeChatData();
      m.redraw();
      return;
    }
  }
  //send messages
  openConnections.forEach((conn) => {
    conn.send(message);
  });

  if (message.type == "pod") {
    console.log("send pod");
  } else {
    if (message.type == "ping" || message.type == "typing") return;

    setTimeout(() => {
      const result = chat_data.find(
        (e) => e.id === message.id && e.pod == true
      );
      if (!result) {
        //store and send later
        console.log("store it to send it later");

        messageQueue(message);
      }
    }, 5000);
  }

  await storeChatData();
  m.redraw();
}

//webPush
const webPush_reg = async (action) => {
  // VAPID Public Key (Austausch gegen deinen eigenen)
  const publicKey = process.env.VAPID_PUBLIC;

  // Überprüfen, ob der Service Worker und Push API verfügbar sind
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      // Service Worker registrieren
      const registration = await navigator.serviceWorker.register(
        new URL("sw.js", import.meta.url),
        {
          type: "module",
        }
      );

      console.log("Service Worker registriert", registration);

      // Push-Subscription anfordern
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      // Senden der Subscription-Daten an den Server

      fetch(process.env.WEBPUSH_SUBSCRIPE + "?action=" + action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: settings.unique_id,
          subscription: subscription,
        }),
      })
        .then((response) => response.text()) // Die Antwort als Text zuerst erhalten
        .then((text) => {
          console.log("Antwort des Servers:", text); // Text-Antwort loggen
          return JSON.parse(text); // Versuche, den Text in JSON zu parsen
        })
        .then((data) => {
          console.log("JSON-Daten:", data);
        })
        .catch((error) => {
          console.error("Fehler:", error);
        });
    } catch (error) {
      console.error(
        "Fehler bei der Registrierung der Push-Subscription:",
        error
      );
    }
  } else {
    alert("Push-Notifications oder Service Worker sind nicht verfügbar!");
  }
};

// send webPush
function sendPushMessage(userId, message) {
  console.log("webPush sent!");
  fetch(process.env.WEBPUSH_SEND, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "user_id": userId,
      "message": message,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("JSON-Daten:", data);
    })
    .catch((error) => {
      console.error("Fehler:", error);
    });
}

//connect to peer
//test is other peer is online
let lastCheck = Date.now();

let peer_is_online = async function () {
  if (!navigator.onLine) {
    top_bar("", "<img src='assets/image/offline.svg'>", "");
    return false;
  }

  let now = Date.now();

  if (now - lastCheck < 10000) {
    return false;
  }

  lastCheck = now;

  if (addressbook.length == 0) {
    return false;
  }

  console.log("try to connect");

  try {
    for (let i = 0; i < addressbook.length; i++) {
      let entry = addressbook[i];
      entry.live = false;
      m.redraw();

      if (!entry.id || entry.id == "") {
        console.log("Eintrag ohne ID, überspringe.");
        continue;
      }

      if (connectedPeers.includes(entry.id)) {
        entry.live = true;
        console.log("allready connected");
        m.redraw();

        messageQueueStorage.map((e) => {
          if (e.to == entry.id && e.type != "typing") {
            console.log("try to send old messages");
            sendMessageToAll(e);
          }
        });
        continue;
      }

      try {
        if (!peer.open) {
          getIceServers();
          console.log("peer not open, open new connection to peerJS server");
        }
        let user_meta = {
          "history_of_ids": status.history_of_ids,
          "unique_id": settings.unique_id,
        };
        let tempConn = peer.connect(entry.id, {
          label: "flop",
          reliable: true,
          metadata: JSON.stringify(user_meta),
        });

        if (tempConn) {
          tempConn.on("open", () => {
            console.log(entry.id + " connected");

            entry.live = true;
            setupConnectionEvents(tempConn);
            m.redraw();
          });

          tempConn.on("error", (error) => {
            entry.live = false;
            m.redraw();
          });
        }
      } catch (error) {
        entry.live = false;
        m.redraw();
      }
    }
    return true;
  } catch (error) {
    console.log("peer is online error: " + error);
    return false;
  }
};

//connect to peer
let connect_to_peer = function (
  id,
  nickname = generateRandomString(10),
  waiting = true,
  open_view = true
) {
  if (!navigator.onLine) {
    top_bar("", "<img src='assets/image/offline.svg'>", "");
    return false;
  }

  try {
    localforage.removeItem("connect_to_id");
  } catch (e) {}

  if (waiting) m.route.set("/waiting");

  getIceServers()
    .then(() => {
      if (addressbook.length > 0) {
        let inAddressbook = addressbook.find((e) => e.id === id);

        if (inAddressbook) {
          status.current_user_nickname = inAddressbook.nickname || "";
          status.current_user_name = inAddressbook.name || "";
        } else {
          status.current_user_nickname = nickname;
        }
      }

      chat_data = [];

      const openConn = connectedPeersObject.find(
        (c) => c.peer === id && c.open
      );

      //test connection is open
      //if not open new connection

      if (open_view) {
        m.route.set("/chat?id=" + settings.custom_peer_id + "&peer=" + id);
      }

      if (openConn != undefined && openConn && open_view) {
        console.log("allready connected");
        status.current_user_id = id;
        return;
      } else {
        setTimeout(() => {
          try {
            console.log("Attempting to connect to peer with ID:", id);
            let user_meta = {
              "history_of_ids": status.history_of_ids,
              "unique_id": settings.unique_id,
            };
            let conn = peer.connect(id, {
              label: "flop",
              reliable: true,
              metadata: JSON.stringify(user_meta),
            });

            let inAddressbook = addressbook.find((e) => e.id === id);

            status.current_user_id = id;

            if (inAddressbook) {
              status.current_user_nickname = inAddressbook.nickname || "";
              status.current_user_name = inAddressbook.name || "";
            } else {
              status.current_user_nickname = nickname;
            }

            if (conn) {
              const timeout = setTimeout(() => {
                if (!conn.open) {
                  console.log("can't connect");
                  //side_toaster("Connection timeout", 3000);
                  /*
                  connectedPeers = connectedPeers.filter(
                    (c) => c !== conn.peer
                  );

                  connectedPeersObject = connectedPeersObject.filter(
                    (c) => c.peer !== conn.peer
                  );
                  */
                }
              }, 4500);

              conn.on("open", () => {
                clearTimeout(timeout);
                setupConnectionEvents(conn);
              });

              conn.on("error", (err) => {
                clearTimeout(timeout);
                console.error(
                  "Connection error:",
                  err.type || err.name,
                  err.message || err
                );
                //side_toaster("Connection error: " + (err.message || err), 5000);
              });
            } else {
              // side_toaster("Connection could not be established", 5000);
            }
          } catch (e) {
            //side_toaster("Connection could not be established", 5000);
          }
        }, 8000);
      }
    })
    .catch((e) => {
      alert(e);
    });
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
};

let only_once = false;
let handleImage = function (t) {
  if (only_once) return false;
  console.log("handle image");
  m.route.set("/chat?id=" + settings.custom_peer);
  if (t != "") sendMessage(t, "image", undefined, undefined, undefined);
  let a = document.querySelectorAll("div#app article");
  a[a.length - 1].focus();
  status.action = "";
  only_once = true;
  setTimeout(() => {
    only_once = false;
  }, 3000);
};

//callback qr-code scan
let scan_callback = function (n) {
  console.log(n);
  if (n == "error") {
    alert("QR is not valid");
    m.route.set("/start");
  } else {
    let m = n.split("id=");
    status.action = "";
    connect_to_peer(m[1]);
  }
};

function roughSizeOfObject(obj) {
  const str = JSON.stringify(obj);
  return str.length * 2;
}

async function estimateLocalForageSize() {
  let totalSize = 0;

  await localforage.iterate((value, key) => {
    totalSize += roughSizeOfObject(value);
  });

  console.log(`localForage total size: ~${(totalSize / 1024).toFixed(2)} KB`);
  return totalSize;
}

estimateLocalForageSize();

async function checkStorageUsage() {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    let { usage, quota } = await navigator.storage.estimate();

    let usedMB = (usage / (1024 * 1024)).toFixed(2);
    let totalMB = (quota / (1024 * 1024)).toFixed(2);

    console.log(`Storage used: ${usedMB} MB`);
    console.log(`Aviable storage: ${totalMB} MB`);
  } else {
    console.log("Storage api not supported");
  }

  if (status.notKaiOS) {
  }
}

// Aufruf der Funktion
checkStorageUsage();

//store chat data

//todo use hash from string to compare
let storeChatData = async () => {
  let newData = chat_data.filter((item) => {
    return !chat_data_history.some(
      (historyItem) => JSON.stringify(historyItem) === JSON.stringify(item)
    );
  });

  if (newData.length > 0) {
    newData.forEach((item) => {
      chat_data_history.push(item);
    });

    chat_data_history.sort(
      (a, b) => new Date(a.datetime) - new Date(b.datetime)
    );

    try {
      await localforage.setItem("chatData", chat_data_history);
    } catch (err) {
      console.error(err);
    }
  }
};

//update id in data

async function updateChatData(targetValue, newValue) {
  try {
    // Load chatData
    let chatData = await localforage.getItem("chatData");

    if (!chatData || !Array.isArray(chatData)) {
      console.warn("No chat data found.");
      return;
    }

    let isChanged = false;

    let updatedChatData = chatData.map((obj) => {
      let updated = { ...obj };
      if (obj.from === targetValue) {
        updated.from = newValue;
        isChanged = true;
      }
      if (obj.to === targetValue) {
        updated.to = newValue;
        isChanged = true;
      }
      return updated;
    });

    if (isChanged) {
      await localforage.setItem("chatData", updatedChatData);
      console.log("Chat data updated successfully.");
    } else {
      console.log("No changes made to chat data.");
    }
  } catch (error) {
    console.error("Error updating chat data:", error);
  }
}

//delete old data

async function deleteOldChatData(days = 30) {
  let now = new Date();
  let threshold = new Date(now.setDate(now.getDate() - days));

  try {
    let chatData = await localforage.getItem("chatData");
    if (!chatData || chatData.length === 0) {
      console.log("No chat data found. Nothing to delete.");
      return;
    }

    let updatedChatData = chatData.filter(
      (e) => new Date(e.datetime) > threshold
    );

    if (updatedChatData.length === chatData.length) {
      console.log("No data older than 30 days. Nothing to delete.");
      return;
    }

    await localforage.setItem("chatData", updatedChatData);
    console.log("Old chat data deleted.");
  } catch (error) {
    console.error("Error deleting old chat data:", error);
  }
}

deleteOldChatData();

var AudioComponent = {
  oninit: (vnode) => {
    key_delay();

    vnode.state.isPlaying = false;
    vnode.state.audio = null;

    if (status.audioBlob instanceof Blob) {
      vnode.state.audioSrc = URL.createObjectURL(status.audioBlob);
    } else {
      console.error("Invalid src: Expected a Blob.");
      vnode.state.audioSrc = null;
    }
  },

  onremove: (vnode) => {
    status.viewReady = false;

    if (vnode.state.audioSrc) {
      URL.revokeObjectURL(vnode.state.audioSrc);
    }
    if (vnode.state.audio) {
      vnode.state.audio.pause();
      vnode.state.audio.src = "";
    }
    if (vnode.state.audioMotion) {
      vnode.state.audioMotion.disconnectAudio();
      vnode.state.audioMotion.destroy();
      vnode.state.audioMotion = null;
    }
    status.audiocontrol = null;
  },

  view: (vnode) => {
    return m("div.audio-player", [
      vnode.state.audioSrc
        ? m("audio", {
            id: "audio-elm",
            src: vnode.state.audioSrc,

            oncreate: (audioVnode) => {
              vnode.state.audio = audioVnode.dom;

              status.audiocontrol = {
                play: () => vnode.state.audio?.play(),
                pause: () => vnode.state.audio?.pause(),
                toggle: () => {
                  if (vnode.state.audio) {
                    vnode.state.audio.paused
                      ? vnode.state.audio.play()
                      : vnode.state.audio.pause();
                  }
                },
              };

              bottom_bar("<img src='assets/image/play.svg'>", "", "");
              if (status.notKaiOS) {
                top_bar("<img src='assets/image/back.svg'>", "", "");
              } else {
                top_bar("", "", "");
              }

              audioVnode.dom.controls = false;
              audioVnode.dom.autoplay = true;

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
      m("div", {
        id: "audiovis",
        class: "item",
        oncreate: () => {
          const audioMotion = new AudioMotionAnalyzer(
            document.getElementById("audiovis"),

            {
              source: document.getElementById("audio-elm"),
              height: status.notKaiOS ? 200 : 100,
              mode: 0,
              gradient: "orangered",
              colorMode: "bar-level",
              overlay: true,
              showBgColor: false,
              showScaleX: false,
              showScaleY: false,
              smoothing: 0.8,
              barSpace: 0.2,
              reflexRatio: 0,
              lineWidth: 10,
            }
          );

          audioMotion.canvas.style.background = "none";
        },
      }),
    ]);
  },
};

//callback geolocation
//live location
let geolocation_callback = function (e) {
  if (status.geolocation_autoupdate) {
    if (e.coords) {
      let latlng = { "lat": e.coords.latitude, "lng": e.coords.longitude };

      sendMessage(
        JSON.stringify(latlng),
        "gps_live",
        undefined,
        undefined,
        status.geolocation_autoupdate_id
      );
    }
  }
};

let map;
let myMarker;
let peerMarker;

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
function map_function(
  lat,
  lng,
  viewOnly,
  viewLiveLocation = false,
  messageID = 0
) {
  myMarker = "";
  peerMarker = "";

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

  let once = false;

  L.Icon.Default.prototype.options.shadowUrl = "";

  L.Icon.Default.prototype.options.iconUrl = markerIcon;
  L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetina;

  if (viewOnly) {
    bottom_bar(
      "<img src='assets/image/plus.svg'>",
      "",
      "<img src='assets/image/minus.svg'>"
    );

    status.map_viewonly = true;
  } else {
    status.map_viewonly = false;
  }
  map.on("unload", () => {
    clearInterval(update_peermarker);
  });

  map.on("moveend", () => {
    const center = map.getCenter();

    const hash = window.location.hash;
    const [route, queryString] = hash.slice(3).split("?");

    const params = new URLSearchParams(queryString || "");
    params.set("lat", center.lat.toFixed(5));
    params.set("lng", center.lng.toFixed(5));

    const newHash = `#!/` + route + "?" + params.toString();
    history.replaceState(null, "", newHash);

    status.map_marker_move = true;

    if (viewOnly) {
      bottom_bar(
        "<img src='assets/image/plus.svg'>",
        "",
        "<img src='assets/image/minus.svg'>"
      );
    } else {
      bottom_bar(
        "<img src='assets/image/plus.svg'>",
        "<img src='assets/image/marker.svg'>",
        "<img src='assets/image/minus.svg'>"
      );
    }
  });

  let geolocation_cb = function (e) {
    //prevent to autoupdate marker
    //if marker was set from user
    if (status.map_marker_set) return;
    //default or old value
    let latitude = null;
    let longitude = null;
    if (e.coords) {
      latitude = e.coords.latitude || 0;
      longitude = e.coords.longitude || 0;
    } else {
      if (latitude == null) latitude = 0;
      if (longitude == null) longitude = 0;
    }

    if (e == "error") {
      side_toaster("position not found", 2000);
    }

    if (myMarker == "") {
      // Create the marker only once
      myMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("It's me")
        .openPopup();
      myMarker._icon.classList.add("myMarker");
      myMarker.options.shadowUrl = null;

      if (!once) {
        // Set the view only once
        if (!viewOnly || !viewLiveLocation) map.setView([lat, lng]);
        once = true; // Set 'once' to true after the first execution
      }
    } else {
      // Update the marker's position
      //do not update if customer marker are set
      if (status.map_marker_set) return;
      myMarker.setLatLng([lat, lng]);
    }
  };

  geolocation(geolocation_cb);

  //set peer marker
  if (lat && lng && viewOnly) {
    let name = "";
    try {
      let messageData = chat_data_history.find((e) => {
        return String(e.id) === String(messageID);
      });
    } catch (e) {}

    peerMarker = L.marker([lat, lng]).addTo(map);
    peerMarker.options.shadowUrl = null;
    peerMarker.options.url = "marker-icon.png";
    map.setView([lat, lng]);
  }

  // Function to update or add markers
  function liveGeolocation_updateMarker() {
    try {
      let messageData = chat_data_history.find((e) => {
        return String(e.id) === String(messageID);
      });

      let d = JSON.parse(messageData.gps);

      peerMarker.setLatLng([d.lat, d.lng]);
    } catch (e) {}
  }

  let update_peermarker = setInterval(() => {
    if (viewLiveLocation) liveGeolocation_updateMarker();
  }, 5000);
}

function MoveMap(direction) {
  document.querySelector("#map-container").focus();

  m.redraw();

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

let send_gps_position = () => {
  let center = map.getCenter();
  let latlng = { "lat": center.lat, "lng": center.lng };

  sendMessage(JSON.stringify(latlng), "gps", undefined, undefined, undefined);
  m.route.set("/chat?id=" + settings.custom_peer_id);
};

///////////////////////
/*VIEWS*/
//////////////////////

var root = document.getElementById("app");

var waiting = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    status.viewReady = false;
  },

  view: function () {
    let timer1 = "";

    return m(
      "div",
      {
        id: "waiting",
        class: "row middle-xs center-xs middle-md center-md",
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
        },
      },
      [m("span", "connecting")]
    );
  },
};

var filelist = {
  oninit: () => {
    key_delay();
    top_bar("", "", "");
    bottom_bar("", "", "");
  },

  onremove: () => {
    status.viewReady = false;
  },

  view: function () {
    return m(
      "div",
      {
        id: "filelist",
        class: "width-100 height-100 page",
      },
      status.files.map((e, i) => {
        if (e.includes("flop-addressbook")) {
          return m(
            "button",
            {
              class: "item button-marquee",
              oncreate: ({ dom }) => {
                setTabindex();
                if (i == 0) {
                  dom.focus();
                }
              },
              onclick: () => {
                let cb = (a) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const text = reader.result;
                    try {
                      const data = JSON.parse(text);

                      import_addressbook(data);

                      m.route.set("/start");
                    } catch (e) {}
                  };

                  reader.onerror = () => {
                    alert("can't read file");
                  };
                  reader.readAsText(a);
                };
                get_file(e, cb);
              },
            },
            [m("span", e.split("/").pop())]
          );
        }
      })
    );
  },
};

var about = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    status.viewReady = false;
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
              //convert to base64
              let a = chat_data_history.map((e) => {
                return Object.assign({}, e, {
                  audio: e.audio ? arrayBufferToBase64(e.audio) : undefined,
                });
              });

              data_export("flop", a, () => {
                side_toaster("download finished", 3000);
              });
            },
          },
          "download chat data"
        ),

        m(
          "button",
          {
            class: "item",
            onclick: () => {
              data_export("flop-addressbook", addressbook, () => {
                side_toaster("download finished", 3000);
              });
            },
          },
          "download addressbook"
        ),

        m(
          "button",
          {
            class: "item",
            onclick: () => {
              let cb = (e) => {
                import_addressbook(e.json);
              };
              if (status.notKaiOS) {
                pick_file(cb);
              } else {
                m.route.set("/filelist");
              }
            },
          },
          "import addressbook"
        ),

        m(
          "button",
          {
            class: "item",
            oncreate: (vnode) => {
              vnode.dom.style.display = "none";
            },
            onclick: () => {
              let cb = (e) => {
                import_chatdata();
              };
              if (status.notKaiOS) {
                pick_file(cb);
              } else {
                m.route.set("/filelist");
              }
            },
          },
          "import chat data"
        ),

        status.addressbook_in_focus !== ""
          ? m(
              "button",
              {
                class: "item",
                oncreate: (vnode) => {
                  if (status.notKaiOS) vnode.dom.style.display = "none";
                },
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
                oncreate: (vnode) => {
                  if (status.notKaiOS) vnode.dom.style.display = "none";
                },
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
          class: "row",

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
    status.viewReady = false;
  },

  view: function () {
    return m(
      "div",
      {
        class: "page scroll about-page",
        oncreate: (vnode) => {
          vnode.dom.focus();
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("<img src='assets/image/back.svg'>", "", "");
        },
      },
      [
        m(
          "div",
          { class: "scroll", id: "about-text" },
          "With flop you can communicate directly with another person/machine (p2p). To do this you need a stable internet connection and you must know the other person's ID. When you start a chat you can share your ID via the options menu."
        ),

        m("div", { id: "description" }, [
          m("h2", {}, "Icons"),

          m("div", { class: "row  middle-xs" }, [
            m(
              "div",
              { class: "col-xs-2" },
              m("img", { src: "assets/image/pencil.svg" })
            ),
            m("div", { class: "col-xs-9 text-left" }, m("span", "write")),
          ]),

          m("div", { class: "row  middle-xs" }, [
            m(
              "div",
              { class: "col-xs-2" },
              m("img", { src: "assets/image/send.svg" })
            ),
            m("div", { class: "col-xs-9 text-left" }, m("span", "send")),
          ]),

          m("div", { class: "row  middle-xs" }, [
            m(
              "div",
              { class: "col-xs-2" },
              m("img", { src: "assets/image/option.svg" })
            ),
            m("div", { class: "col-xs-9 text-left" }, m("span", "option")),
          ]),

          m("div", { class: "row  middle-xs" }, [
            m(
              "div",
              { class: "col-xs-2" },
              m("img", { src: "assets/image/record.svg" })
            ),
            m(
              "div",
              { class: "col-xs-9 text-left" },
              m("span", "audio message")
            ),
          ]),

          m("div", { class: "row middle-xs" }, [
            m(
              "div",
              { class: "col-xs-2" },
              m("img", { src: "assets/image/record-live.svg" })
            ),
            m("div", { class: "col-xs-9 text-left" }, m("span", "recording")),
          ]),
        ]),
        m(
          "div",
          { class: "", id: "about-text" },
          m.trust(
            "The code of the software is freely available: <a href='https://github.com/strukturart/flop'>gitHub</a>"
          )
        ),
        m(
          "div",
          {
            class: "scroll",
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
    generate_contact();
  },
  onremove: () => {
    status.viewReady = false;
  },

  oncreate: () => {
    if (status.notKaiOS) {
      top_bar("<img src='assets/image/back.svg'>", "", "");
    } else {
      top_bar("", "", "");
    }

    bottom_bar(
      "<img class='not-desktop' src='assets/image/link.svg'>",
      "",
      "<img class='not-desktop' src='assets/image/qr.svg'>"
    );
  },
  view: () => {
    return m(
      "div",
      {
        class: "flex justify-center align-center page",
        id: "invite",
        oncreate: () => {
          console.log(status);
        },
      },
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
    status.viewReady = false;
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
    status.viewReady = false;
  },

  view: function () {
    return m(
      "div",
      {
        class: "page",
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
            class: "item input-parent",
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

              oncreate: (vnode) => {
                const avatar = createAvatar(style, {
                  seed: settings.nickname,
                  size: 100,
                });

                document.querySelector(".avatar").src = avatar.toDataUri();
              },

              oninput: (vnode) => {
                settings.nickname = vnode.target.value;

                const avatar = createAvatar(style, {
                  seed: settings.nickname,
                  size: 100,
                });

                document.querySelector(".avatar").src = avatar.toDataUri();
              },
            }),
          ]
        ),
        m("div", { class: "row around-xs" }, [
          m("img", {
            class: "avatar",
            src: "",
          }),
        ]),

        m("input", {
          readonly: true,
          id: "custom-peer-id",
          placeholder: "ID",
          value: settings.custom_peer_id,
        }),

        ,
        m(
          "button",
          {
            class: "item",
            onclick: () => {
              //store history of peer id
              localforage
                .getItem("history_of_ids")
                .then((e) => {
                  status.history_of_ids = Array.isArray(e) ? e : [];

                  const newId = "flop-" + uuidv4(16);

                  status.history_of_ids.push(newId);

                  return localforage
                    .setItem("history_of_ids", status.history_of_ids)
                    .then(() => newId);
                })
                .then((newId) => {
                  updateChatData(settings.custom_peer_id, newId).then(() => {
                    console.log("chatData updated");
                  });
                  settings.custom_peer_id = newId;

                  m.redraw();

                  alert(
                    "The next time you start the app, other users can reach you with the new ID."
                  );
                })
                .catch(() => {});
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
            class: "item",
            onclick: () => {
              if (!settings.webpush) {
                webPush_reg("add")
                  .then(() => {
                    side_toaster("registration successful", 3000);
                    settings.webpush = true;
                    localforage.setItem("settings", settings).then(() => {
                      m.redraw();
                    });
                  })
                  .catch((e) => {
                    side_toaster("registration not successful", 3000);
                  });
              } else {
                webPush_reg("delete")
                  .then(() => {
                    side_toaster("delete successful", 3000);
                    settings.webpush = false;
                    localforage.setItem("settings", settings).then(() => {
                      m.redraw();
                    });
                  })
                  .catch((e) => {
                    side_toaster("registration not successful", 3000);
                  });
              }
            },
          },
          settings.webpush ? "Delete WebPush" : "Activate WebPush"
        ),
        m(
          "button",
          {
            id: "advanced settings",
            class: "item",
            onclick: (e) => {
              e.target.remove();

              document.querySelectorAll(".advanced-settings").forEach((el) => {
                el.style.display = "block";
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
            class: "item input-parent advanced-settings",
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
            class: "item input-parent   advanced-settings",
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
            class: "item input-parent  advanced-settings",
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
            class: "item input-parent  advanced-settings",
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
          "div",
          {
            class: "item input-parent  advanced-settings",
            style: "display:none",
          },
          [
            m(
              "label",
              {
                for: "metered_aki_key",
              },
              "metered API key"
            ),
            m("input", {
              id: "metered_api_key",
              placeholder: "API key",
              value: settings.metered_api_key || "",
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

              settings.metered_api_key =
                document.getElementById("metered_api_key").value;

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
    status.viewReady = false;
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

            onfocus: () => {
              bottom_bar("", "", "");
            },
            onclick: function () {
              pick_image(handleImage);
            },
          },
          "share image"
        ),

        m(
          "button",
          {
            class: "item",
            onfocus: () => {
              bottom_bar("", "", "");
            },

            onclick: function () {
              status.geolocation_onTimeRequest = true;
              m.route.set(
                "/map_view?lat=" + 0 + "&lng=" + 0 + "&viewonly=false"
              );
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
              if (status.geolocation_autoupdate) {
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

            onclick: function () {
              if (status.geolocation_autoupdate) {
                //stop gps live
                status.geolocation_autoupdate = false;
                status.geolocation_autoupdate_id = "";
                m.route.set("/chat?id=" + settings.custom_peer);
              } else {
                //start gps live
                geolocation(geolocation_callback);
                status.geolocation_autoupdate = true;
                status.geolocation_autoupdate_id = uuidv4(16);
                m.route.set("/chat?id=" + settings.custom_peer);
              }
            },
          },
          ""
        ),

        status.current_user_id
          ? m(
              "button",
              {
                oncreate: function (vnode) {
                  setTimeout(function () {
                    setTabindex();
                  }, 500);

                  const isInAddressbook = addressbook.some(
                    (e) => e.id == status.current_user_id
                  );

                  if (isInAddressbook) {
                    vnode.dom.style.display = "none";
                  }
                },

                class: "item",
                id: "button-add-user",

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
                    side_toaster("contact could not be created", 3000);
                  }
                },
              },
              "add user to addressbook"
            )
          : null,
      ]
    );
  },
};

var intro = {
  oninit: () => {
    key_delay();
    //create peer on start
    getIceServers();
    generate_contact();
  },
  onremove: () => {
    status.viewReady = false;
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
                connect_to_peer(m[1]);
              }, 1000);
            }
          } else {
            setTimeout(function () {
              m.route.set("/start");
            }, 1000);
          }

          //auto connect if id is given
          localforage
            .getItem("connect_to_id")
            .then((e) => {
              if (e && e.data) {
                let params = e.data.split("?id=");
                if (params.length > 1) {
                  let id = params[1];
                  localforage.removeItem("connect_to_id").then(() => {
                    connect_to_peer(id);
                  });
                }
              }
            })
            .catch((error) => {
              console.error("Error retrieving data:", error);
            });
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
            class: "flex width-100 justify-center",
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

var start = {
  oninit: () => {
    key_delay();
    status.addressbook_in_focus = "";

    setTimeout(() => {
      peer_is_online();
    }, 4000);
  },
  onremove: () => {
    status.viewReady = false;
  },

  view: function () {
    return m(
      "div",
      {
        class: "page row center-xs center-md",
        id: "start",

        oncreate: () => {
          top_bar("", "", "");

          status.messageToSend = messageQueueStorage.length;
          bottom_bar(
            "<img src='assets/image/invite.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
        },
      },
      [
        m(
          "div",
          {
            id: "logo",
            oncreate: (vnode) => {
              if (!status.notKaiOS) vnode.dom.style.display = "none";
            },
          },
          [m("img", { class: "", src: "./assets/image/logo-style.svg" })]
        ),
        addressbook.length == 0
          ? m(
              "p",
              {
                id: "start-text",
                class: "col-xs-12 col-md-12",
                oncreate: (vnode) => {
                  vnode.dom.focus();
                  setTabindex();
                },
              },
              m.trust(
                "<div>Flop is a webRTC chat app that allows you to communicate directly with someone (p2p). You can currently exchange text, images, audio and your location with your chat partner. </div><div class='item'></div><br><div>To chat with a person you have to invite them or you will be invited.</div><div class='item'></div><br><br>"
              )
            )
          : null,

        addressbook.length > 0
          ? m(
              "div",
              {
                class: "addressbook-box col-xs-12 col-md-8",
                id: "addressbook",
              },
              [
                m("div", { class: "row" }, [
                  addressbook.map((e, i) =>
                    m("div", { class: "col-xs-12 col-md-10" }, [
                      m(
                        "button",
                        {
                          class: "item addressbook-item row between-md",
                          "data-id": e.id,
                          "data-client-id": e.client_id || "null",
                          "data-nickname": e.nickname || e.name,
                          "data-name": e.name || e.nickname,

                          "data-online": e.live ? "true" : "false",

                          oncreate: (vnode) => {
                            setTabindex();
                            if (i == 0) vnode.dom.focus();
                          },
                          onfocus: () => {
                            status.addressbook_in_focus = e.id;
                          },
                          onkeydown: (h) => {
                            if (h.key === "Enter") {
                              connect_to_peer(
                                document.activeElement.getAttribute("data-id")
                              );

                              status.current_user_id =
                                document.activeElement.getAttribute("data-id");
                              status.current_user_nickname = e.nickname;
                              status.current_user_name = e.name;
                              m.route.set(
                                "/chat?id=" +
                                  settings.custom_peer_id +
                                  "&peer=" +
                                  status.current_user_id
                              );

                              let pid =
                                document.activeElement.getAttribute(
                                  "data-client-id"
                                );
                              if (pid && pid !== settings.clientID) {
                                status.current_clientId = pid;
                              }
                            }
                          },
                          onclick: () => {
                            connect_to_peer(
                              document.activeElement.getAttribute("data-id")
                            );

                            status.current_user_id =
                              document.activeElement.getAttribute("data-id");
                            status.current_user_nickname = e.nickname;
                            status.current_user_name = e.name;
                            m.route.set(
                              "/chat?id=" +
                                settings.custom_peer_id +
                                "&peer=" +
                                status.current_user_id
                            );

                            let pid =
                              document.activeElement.getAttribute(
                                "data-client-id"
                              );
                            if (pid && pid !== settings.clientID) {
                              status.current_clientId = pid;
                            }
                          },
                        },
                        [
                          m("div", { class: "col-xs-2 col-md-2" }, [
                            m("div", { class: "online-indicator" }, ""),
                            m("img", {
                              class: "aavatar",
                              src: create_avatar(e.name, 25),
                            }),
                          ]),

                          m("div", { class: "inner col-xs-10 col-md-10" }, [
                            m(
                              "div",
                              { class: "addressbook-item-name" },
                              !e.name ? e.nickname : e.name
                            ),
                            m("div", { class: "row between-md" }, [
                              e.last_conversation_message
                                ? m(
                                    "small",
                                    {
                                      class:
                                        "last-conversation-message col-xs-8 col-md-8",
                                    },
                                    e.last_conversation_message
                                  )
                                : null,
                              e.last_conversation_datetime
                                ? m(
                                    "small",
                                    {
                                      class:
                                        "last-conversation-date col-xs-4 col-md-4",
                                    },
                                    e.last_conversation_datetime
                                  )
                                : null,
                            ]),
                          ]),
                        ]
                      ),
                    ])
                  ),
                ]),
              ]
            )
          : null,

        m(
          "kbd",
          {
            id: "version",
            oncreate: (vnode) => {
              if (!status.notKaiOS) vnode.dom.style.display = "none";
            },
          },
          "Version " + localStorage.getItem("version") || 0
        ),
        m(
          "a",
          {
            id: "liberapay",
            href: "https://liberapay.com/perry_______",
            target: "_blank",
            oncreate: (vnode) => {
              if (!status.notKaiOS) vnode.dom.style.display = "none";
            },
          },
          [m("img", { src: "./assets/image/liberapay.svg" })]
        ),
        m(
          "kbd",
          {
            id: "local-by-design",
          },
          "local by design"
        ),
      ]
    );
  },
};

let audioRecorder = null;
let audio_recorder_time = null;
let audioRecorderDuration = 0;
var audiorecorder_view = {
  oninit: () => {
    key_delay();
    audioRecorder = createAudioRecorder();
  },
  onremove: () => {
    status.viewReady = false;
  },

  view: () =>
    m("div", { class: "page", id: "audiorecorder" }, [
      m("div", {
        id: "audiovis",
        class: "item",

        oninit: () => {
          audioRecorder.startRecording().then(() => {
            audio_recorder_time = setInterval(() => {
              audioRecorderDuration++; // jede Sekunde +1
              top_bar(
                "",
                dayjs.utc(audioRecorderDuration * 1000).format("mm:ss"),
                ""
              );
            }, 1000);

            const srcNode = audioRecorder.getStreamSourceNode();
            const audioCtx = audioRecorder.getAudioContext();

            if (srcNode && audioCtx) {
              const audioMotion = new AudioMotionAnalyzer(
                document.getElementById("audiovis"),
                {
                  audioCtx,
                  height: 150,
                  gradient: "orangered",
                  colorMode: "bar-level",
                  overlay: true,
                  showBgColor: false,
                  showScaleX: false,
                  showScaleY: false,
                  smoothing: 0.8,
                  barSpace: 0.2,
                  reflexRatio: 0,
                  lineWidth: 10,
                }
              );

              audioMotion.connectInput(srcNode);
              audioMotion.volume = 0;
            } else {
              console.warn("AudioContext oder StreamSource nicht vorhanden");
            }
          });
        },
        onremove: () => {
          if (audioRecorder) {
            // Aufnahme stoppen, wenn noch aktiv
            audioRecorder.stopRecording?.().catch(() => {});

            // Ressourcen freigeben
            audioRecorder.cleanup?.();
            audioRecorder = null;
            clearInterval(audio_recorder_time);
            audioRecorderDuration = 0;
          }
          status.viewReady = false;
        },
        oncreate: () => {
          bottom_bar(
            "<img src='assets/image/send.svg'>",
            "<img src='assets/image/record-live.svg'>",
            "<img src='assets/image/cancel.svg'>"
          );
          top_bar("", "", "");
        },
      }),
    ]),
};

var scan = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    status.viewReady = false;
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
let throttle = false;
let page_counter = 0;
var chat = {
  oninit: () => {
    key_delay();
    load_chat_data(status.current_user_id);

    //load more content
    //triggerd by scroll

    let per_page = 20;
    page_counter = chat_data.length - per_page;

    let el = document.querySelector("#app");

    function isElementInViewport(l) {
      const rect = l.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    function onScrollCheck() {
      if (throttle) return;
      throttle = true;
      setTimeout(() => {
        throttle = false;

        const lastEl = document.querySelector("[data-first='true']");
        if (lastEl && isElementInViewport(lastEl)) {
          page_counter = Math.max(0, page_counter - per_page);

          m.redraw();
        }
      }, 200);
    }

    el.addEventListener("scroll", () => {
      onScrollCheck();
    });
  },

  onremove: () => {
    status.viewReady = false;
  },
  onupdate: () => {
    //reproduce chat data
    load_chat_data(status.current_user_id);
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
          //try to send old messages
          messageQueueStorage.map((e) => {
            if (e.to == status.current_user_id && e.type != "typing") {
              sendMessageToAll(e);
            }
          });

          let username =
            status.current_user_name || status.current_user_nickname;
          top_bar(
            "",
            "<div id='name'>" + username.slice(0, 6) + "</div>",
            "<img class='avatar' src=" + create_avatar(username, 30) + ">"
          );
          if (status.notKaiOS)
            top_bar(
              "<img src='assets/image/back.svg'>",
              "<div id='name'>" + username.slice(0, 8) + "</div>",
              "</div><img class='avatar' src=" +
                create_avatar(username, 30) +
                ">"
            );

          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
          let every_10_secs = 0;
          user_check = setInterval(() => {
            //ping
            if (every_10_secs >= 0) {
              every_10_secs++;
            }
            if (every_10_secs == 10) {
              sendMessage("", "ping", "", status.current_user_id, undefined);
              every_10_secs = 0;
            }

            if (connectedPeers) {
              status.userOnline = connectedPeers.length;

              if (connectedPeers.includes(status.current_user_id)) {
                top_bar(
                  "",
                  "<div id='name'>" + username.slice(0, 6) + "</div>",
                  "<span class='online-indicator'></span><img class='avatar is-online' src=" +
                    create_avatar(username, 30) +
                    ">"
                );

                if (status.notKaiOS)
                  top_bar(
                    "<img src='assets/image/back.svg'>",
                    "<div id='name'>" + username.slice(0, 8) + "</div>",
                    "<span class='online-indicator'></span><img class='avatar' src=" +
                      create_avatar(username, 30) +
                      ">"
                  );

                document
                  .querySelector("span.online-indicator")
                  .classList.remove("user-offline");

                document
                  .querySelector("span.online-indicator")
                  .classList.add("user-online");
              } else {
                top_bar(
                  "",
                  "<div id='name'>" + username.slice(0, 8) + "</div>",
                  "<span class='online-indicator'></span><img class='avatar' src=" +
                    create_avatar(username, 30) +
                    ">"
                );

                if (status.notKaiOS)
                  top_bar(
                    "<img src='assets/image/back.svg'>",
                    "<div id='name'>" + username.slice(0, 8) + "</div>",
                    "<span class='online-indicator'></span><img class='avatar' src=" +
                      create_avatar(username, 30) +
                      ">"
                  );

                document
                  .querySelector("span.online-indicator")
                  .classList.add("user-offline");

                document
                  .querySelector("span.online-indicator")
                  .classList.remove("user-online");
              }
            } else {
              console.log("user check not possible");
            }
          }, 2000);
        },
      },

      status.action === "write"
        ? m(
            "div",
            {
              id: "message-input",
            },
            [
              m("input", {
                type: "text",

                oncreate: (vnode) => {
                  vnode.dom.focus();
                  vnode.dom.scrollIntoView();
                },
                onblur: () => {
                  focus_last_article();

                  setTimeout(() => {
                    let a = m.route.get();
                    if (a.startsWith("/chat"))
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
                oninput: () => {
                  bottom_bar(
                    "<img src='assets/image/send.svg'>",
                    "",
                    "<img src='assets/image/option.svg'>"
                  );
                },
                onkeyup: (e) => {
                  const value = e.target.value.trim();
                  if (value !== "" && status.action === "write") {
                    sendMessage(
                      undefined,
                      "typing",
                      undefined,
                      status.current_user_id,
                      undefined
                    );
                  }
                },
              }),
            ]
          )
        : null,

      chat_data.map(function (item, index) {
        if (index < page_counter) return;
        const currentIndex = index;
        const isLast = currentIndex === chat_data.length - 1;
        const isFirst = index == page_counter ? true : false;

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
            "data-message-id": item.id,
            "data-user-nickname": nickname,
            "data-lat": ff.lat,
            "data-lng": ff.lng,
            "data-last": isLast ? "true" : "false",
            "data-first": isFirst ? "true" : "false",

            onclick: () => {
              if (item.type == "gps") {
                m.route.set(
                  "/map_view?lat=" +
                    ff.lat +
                    "&lng=" +
                    ff.lng +
                    "&messageid=" +
                    item.id +
                    "&viewonly=true"
                );
              }

              if (item.type == "gps_live") {
                m.route.set(
                  "/map_view?lat=" +
                    ff.lat +
                    "&lng=" +
                    ff.lng +
                    "&viewLiveLocation=true" +
                    "&messageid=" +
                    item.id +
                    "&viewonly=true"
                );
              }
              if (item.type == "audio") {
                if (item.audio instanceof Blob) {
                  status.audioBlob = item.audio;
                  m.route.set("/AudioComponent");
                } else {
                  side_toaster("audio file not valid", 2000);
                }
              }
            },

            oncreate: (e) => {
              if (isLast) {
                setTimeout(() => {
                  e.dom.scrollIntoView();
                }, 200);
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
                status.audioBlob = item.audio;

                if (status.notKaiOS) {
                  bottom_bar(
                    "<img src='assets/image/pencil.svg'>",
                    "",
                    "<img src='assets/image/option.svg'>"
                  );
                } else {
                  bottom_bar(
                    "<img src='assets/image/pencil.svg'>",
                    "<img src='assets/image/play.svg'>",
                    "<img src='assets/image/option.svg'>"
                  );
                }
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
                  src: item.image,
                  "data-filename": item.filename,
                })
              : null,

            item.type === "gps"
              ? m("div", {
                  class: "message-map",
                })
              : null,

            item.type === "gps_live"
              ? m("div", {
                  class: "message-map",
                })
              : null,

            item.type === "audio"
              ? m(
                  "button",
                  {
                    class: "audioplayer-button",
                  },
                  [m("img", { src: "./assets/image/audio.png" })]
                )
              : null,

            m("div", { class: "flex message-head" }, [
              m("div", dayjs(item.datetime).format("HH:mm")),
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
              item.pod == true
                ? m("img", {
                    class: "pod-icon",
                    src: "./assets/image/ok.svg",
                  })
                : null,
            ]),
          ]
        );
      }),
      m("div", { id: "typing-indicator", class: "" }, "")
    );
  },
};

let map_view = {
  oninit: () => {
    key_delay();
  },
  onremove: () => {
    status.viewReady = false;
    map.remove();
  },

  view: function () {
    return m(
      "div",
      {
        class: "width-100 height-100",

        id: "map-container",

        oncreate: (vnode) => {
          bottom_bar(
            "<img src='assets/image/plus.svg'>",
            "<img src='assets/image/send.svg'>",
            "<img src='assets/image/minus.svg'>"
          );
          const params = new URLSearchParams(m.route.get().split("?")[1]);
          const lat = parseFloat(params.get("lat")) || 0;
          const lng = parseFloat(params.get("lng")) || 0;

          const messageId = params.get("messageid") || 0;

          const viewOnly = params.get("viewonly") || false;
          if (viewOnly == "true") viewOnly = true;
          if (viewOnly == "false") viewOnly = false;

          const viewLiveLocation = params.get("viewLiveLocation") || false;

          if (viewLiveLocation == "true") viewLiveLocation = true;
          if (viewLiveLocation == "false") viewLiveLocation = false;

          if (viewOnly)
            bottom_bar(
              "<img src='assets/image/plus.svg'>",
              "",
              "<img src='assets/image/minus.svg'>"
            );

          map_function(lat, lng, viewOnly, viewLiveLocation, messageId);

          if (status.notKaiOS) {
            top_bar("<img src='assets/image/back.svg'>", "", "");
          } else {
            top_bar("", "", "");
          }
        },
      },
      [
        m("div#crosshair", [
          m("div.hline"),
          m("div.vline"),
          m("div.hline"),
          m("div.vline"),
        ]),
      ]
    );
  },
};

m.route(root, "/intro", {
  "/intro": intro,
  "/start": start,
  "/chat": chat,
  "/options": options,
  "/settings_page": settings_page,
  "/scan": scan,
  "/about": about,
  "/about_page": about_page,
  "/privacy_policy": privacy_policy,
  "/map_view": map_view,
  "/waiting": waiting,
  "/invite": invite,
  "/audiorecorder_view": audiorecorder_view,
  "/filelist": filelist,
  "/AudioComponent": AudioComponent,
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
      console.log("scroll");
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
    .querySelector("div#bottom-bar div.button-left")
    .addEventListener("click", function (event) {
      simulateKeyPress("SoftLeft");
    });

  document
    .querySelector("div#bottom-bar div.button-right")
    .addEventListener("click", function (event) {
      simulateKeyPress("SoftRight");
    });

  document
    .querySelector("div#bottom-bar div.button-center")
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
        m.route.set("/chat?id=" + settings.custom_peer);
        status.action = "";
      }

      if (m.route.get() == "/options") {
        m.route.set("/chat?id=" + settings.custom_peer);
      }

      if (m.route.get() == "/AudioComponent") {
        m.route.set("/chat?id=" + settings.custom_peer_id);
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
  const longpress_timespan = 3000;
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
    if (status.viewReady) {
      switch (param.key) {
        case "Backspace":
          window.close();
          break;
      }
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
        if (document.activeElement.tagName == "INPUT") return;

        if (route.startsWith("/start")) {
          preventDefault();
          return true;
        }

        if (route.startsWith("audiorecorder_view")) {
          history.back();
          return;
        }

        if (route.startsWith("/invite")) {
          m.route.set("/start");
        }

        if (m.route.get() == "/scan") {
          stop_scan();
          m.route.set("/start");
          status.action = "";
        }

        if (m.route.get() == "/AudioComponent") {
          m.route.set("/chat?id=" + settings.custom_peer_id);
          return;
        }

        if (m.route.get() == "/scan") {
          stop_scan();
          m.route.set("/start");
          status.action = "";
        }

        if (m.route.get() == "/filelist") {
          m.route.set("/about");
        }

        if (
          route.startsWith("/chat?") ||
          m.route.get() == "/settings_page" ||
          m.route.get() == "/about" ||
          route.startsWith("/map_view") ||
          route.startsWith("/waiting") ||
          route.startsWith("/invite")
        ) {
          m.route.set("/start");
          status.action = "";
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
          status.action = "";
          m.route.set("/chat?id=" + settings.custom_peer_id);
        }

        if (m.route.get() == "/options") {
          m.route.set("/chat?id=" + settings.custom_peer_id);
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

        if (route.startsWith("/chat?") && !status.audio_recording) {
          m.route.set("/options");
          return;
        }

        if (route.startsWith("audiorecorder_view")) {
          history.back();
          return;
        }

        if (route.startsWith("/map_view")) {
          ZoomMap("out");
        }

        if (route.startsWith("/audio")) {
          history.back();
        }

        if (route.startsWith("/invite")) {
          m.route.set("/scan");
        }

        break;

      case "SoftLeft":
      case "Control":
        if (route.startsWith("/chat?") && status.action == "write") {
          sendMessage(
            document.getElementsByTagName("input")[0].value,
            "text",
            undefined,
            undefined
          );
          write();
        }

        if (route.startsWith("/AudioCo")) {
          status.audiocontrol?.toggle();
          return;
        }

        if (route.startsWith("audiorecorder_view")) {
          // Stop recording and get the recorded data
          audioRecorder.stopRecording().then(({ audioBlob, mimeType }) => {
            status.audio_recording = false;

            sendMessage(audioBlob, "audio", mimeType, undefined, undefined);
            bottom_bar(
              "<img src='assets/image/pencil.svg'>",
              "",
              "<img src='assets/image/option.svg'>"
            );
            history.back();

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

        if (
          route.startsWith("/chat?") &&
          status.action !== "write" &&
          !status.audio_recording
        ) {
          write();
        }

        if (route.startsWith("/start")) {
          m.route.set("/invite");
        }

        if (route.startsWith("/map_view")) {
          ZoomMap("in");
        }

        break;

      case "Escape":
        if (route.startsWith("audiorecorder_view")) {
          history.back();
        }

        break;

      case "Enter":
        if (route.startsWith("/chat?") && status.action === "write") {
          const input = document.querySelector("div#message-input input");

          if (!input || input.value.trim() === "") {
            m.route.set("audiorecorder_view");
          }
        }

        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[1].focus();

          if (document.activeElement.classList.contains("check-box")) {
            document.activeElement.checked == true
              ? (document.activeElement.checked = false)
              : (document.activeElement.checked = true);
          }

          return true;
        }

        if (document.activeElement) {
          const activeElement = document.activeElement;

          const isInputField =
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.isContentEditable;

          // test if field empty
          const isEmpty =
            activeElement.value !== undefined &&
            activeElement.value.length === 0;

          if (!isInputField || isEmpty) {
            //preventDefault();
          } else {
            return;
          }
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
            side_toaster("contact could not be created", 3000);
          }
        }

        if (route.startsWith("/map_view")) {
          //only map is not in view only mode
          if (!status.map_viewonly) {
            //after seting customer marker
            //ready to send message
            if (!status.map_marker_move) {
              send_gps_position();
            } else {
              //ready to set custome marker
              let center = map.getCenter();
              myMarker.setLatLng([center.lat, center.lng]);
              status.map_marker_move = false;
              status.map_marker_set = true;

              bottom_bar(
                "<img src='assets/image/plus.svg'>",
                "<img src='assets/image/send.svg'>",
                "<img src='assets/image/minus.svg'>"
              );
            }
          }
        }

        if (route.startsWith("/chat")) {
          if (document.activeElement.tagName == "ARTICLE") {
            if (status.current_article_type == "audio") {
              if (status.audioBlob instanceof Blob) {
                m.route.set("/AudioComponent");
              } else {
                side_toaster("audio file not valid", 2000);
              }
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
                  "&messageid=" +
                  document.activeElement.getAttribute("data-message-id") +
                  "&viewonly=true"
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
    if (evt.key == "Backspace" && document.activeElement.tagName != "INPUT") {
      evt.preventDefault();
    }

    if (!status.viewReady) {
      evt.preventDefault();

      return false;
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
    if (evt.key == "Backspace") evt.preventDefault();

    if (status.visibility === false) return false;

    if (!status.viewReady) {
      return false;
    }

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
  //webActivity KaiOS 2
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
}

function handleVisibilityChange() {
  status.visibility = document.visibilityState === "visible";

  if (document.hidden) {
    localStorage.setItem("last_connection", status.current_user_id);
    localStorage.setItem("last_connections_time", new Date().toISOString());
    return;
  }

  peer_is_online();
}

function handlePageHide() {
  localStorage.setItem("last_connection", status.current_user_id);
  localStorage.setItem("last_connections_time", new Date().toISOString());
}

function handlePageShow() {
  status.visibility = true;
  peer_is_online();
}

// Event-Listener iOS & android
document.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("pagehide", handlePageHide);
window.addEventListener("pageshow", handlePageShow);
