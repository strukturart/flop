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

//history
let chat_history = [];
/*
// Retrieve chat history from local storage
localforage
  .getItem("chat_history")
  .then((e) => {
    console.log(e);
    if (e) {
      chat_history = e; // directly assign the retrieved array to chat_history
    }
  })
  .catch((e) => {
    console.log(e);
  });

let store_history = (id) => {
  chat_history.push({ id: id, date: new Date(), data: "" }); // push new entry directly to the array
  localforage
    .setItem("chat_history", chat_history) // store the array directly
    .then((e) => {
      console.log(e);
    })
    .catch((e) => {
      console.log(e);
    });
};
*/

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
    console.log(user);
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
  console.log(conn);
  if (connectedPeers.includes(conn.peer)) {
    return false;
  }
  connectedPeers.push(conn.peer);

  const userId = conn.peer;

  let pc = conn.peerConnection;

  if (pc) {
    pc.addEventListener("negotiationneeded", (event) => {
      console.log(event);
      /*
      conn = peer.connect(conn.peer, {
        label: "chat",
        reliable: true,
      });
      */
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

    if (data.file || data.text) {
      if (data.file) {
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
      }

      if (data.text) {
        if (!status.visibility) pushLocalNotification("flop", "new message");

        chat_data.push({
          nickname: data.nickname,
          content: data.text,
          datetime: new Date(),
          type: data.type,
          userId: data.userId,
        });
      }

      m.redraw();
      focus_last_article();
      stop_scan();
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
        //side_toaster("try to reconnect", 2000);
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
      //side_toaster("connection error " + err.type, 8000);
      document.querySelector(".loading-spinner").style.display = "none";
    });
  } catch (error) {
    alert("Error fetching ice servers:", error.message);
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

      m.redraw();
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
      text: msg,
      nickname: settings.nickname,
      type: type,
      userId: settings.custom_peer_id,
    };
    chat_data.push({
      nickname: settings.nickname,
      content: msg.text,
      datetime: new Date(),
      type: type,
    });

    sendMessageToAll(msg);

    m.redraw();
    focus_last_article();
    write();
  }
}
//send to all connections
function sendMessageToAll(message) {
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

      console.log("peer" + peer.id + "/" + settings.custom_peer_id);

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
      };

      const noOtherUserOnlineElement = {
        id: "no-other-user-online",
        nickname: settings.nickname,
        content: "no other user online, you should invite someone.",
        datetime: new Date(),
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

//callback geolocation
let geolocation_callback = function (e) {
  let link_url =
    "https://www.openstreetmap.org/#map=19/" +
    e.coords.latitude +
    "/" +
    e.coords.longitude;

  chat_data.push({ content: link_url, datetime: new Date() });

  sendMessage(link_url, "text");
  m.route.set("/chat");
};

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
        class: "page flex justify-content-spacearound",
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
                geolocation(geolocation_callback);
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
          // const recorder = createAudioRecorder("start", "stop", "playback");

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
          }, 10000);
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
              "",
              "<img src='assets/image/option.svg'>"
            );
          },
        }),
      ]),
      chat_data.map(function (item, index) {
        //own message
        let nickname = "me";
        if (item.nickname != settings.nickname) {
          nickname = item.nickname;
        }
        return m(
          "article",
          {
            class: " item " + nickname + " " + item.type,
            tabindex: index,
            "data-type": item.type,
            "data-user-id": item.userId,
            "data-user-nickname": item.nickname,

            onfocus: () => {
              status.current_user_id =
                document.activeElement.getAttribute("data-user-id");
              status.current_user_nickname =
                document.activeElement.getAttribute("data-user-nickname");

              links = linkify.find(document.activeElement.textContent);
              if (links.length > 0) {
                status.current_article_type = "link";
                bottom_bar(
                  "<img src='assets/image/send.svg'>",
                  "<img src='assets/image/link.svg'>",
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
              } else {
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
            m(
              "div",
              {
                class: "message-main",
              },
              item.content
            ),
            m("img", {
              class: "message-media",
              src: item.image,
              "data-filename": item.filename,
            }),
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
  const longpress_timespan = 1000;
  let timeout;

  function repeat_action(param) {
    switch (param.key) {
    }
  }

  //////////////
  ////LONGPRESS
  /////////////

  function longpress_action(param) {
    switch (param.key) {
      case "0":
        break;

      case "Backspace":
        closeAllConnections();
        peer.destroy();
        window.close();
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
        if (route.startsWith("/chat")) m.route.set("/options");
        if (route == "/start") m.route.set("/about");

        break;

      case "SoftLeft":
      case "Alt":
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

        if (route.startsWith("/chat")) {
          if (document.activeElement.tagName == "ARTICLE") {
            if (status.current_article_type == "link") {
              m.route.set("/links_page");
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
        m.route.get() == "/about"
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
