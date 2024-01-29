"use strict";

import {
  bottom_bar,
  side_toaster,
  pick_image,
  month,
} from "./assets/js/helper.js";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import localforage from "localforage";
import * as linkify from "linkifyjs";
import { geolocation } from "./assets/js/helper.js";
import m from "mithril";
import qrious from "qrious";

//github.com/laurentpayot/minidenticons#usage
export let status = "";
export let settings = {};
export let current_room = "h";

let links = "";
let chat_data = [];
let lastPeerId = null;
let peer = null;
let conn = null;
let room_favorits = [];

let debug = false;

if (debug) {
  window.onerror = function (msg, url, linenumber) {
    alert(
      "Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber
    );
    return true;
  };
}

//load settings
localforage
  .getItem("settings")
  .then(function (value) {
    settings = value;
    if (settings == null) {
      settings = {
        nickname: "DEFAULT",
        server_url: "-",
        server_path: "-",
        server_port: "-",
      };
    }
  })
  .catch(function (err) {
    console.log(err);
  });

//load room favorits

localforage
  .getItem("roomfavorits")
  .then(function (value) {
    if (value != null) room_favorits = value;
  })
  .catch(function (err) {
    console.log(err);
  });

let warning_leave_chat = function () {
  status = "confirm";
  if (confirm("Do you really want leave the room?")) {
    m.route.set("/start");
    setTimeout(function () {
      status = "";
    }, 1000);
  } else {
    setTimeout(function () {
      status = "";
    }, 1000);
  }
};

let addToFavorit = function () {
  console.log(typeof room_favorits);
  room_favorits.push(current_room);
  console.log("favorits: " + room_favorits);

  localforage
    .setItem("roomfavorits", room_favorits)
    .then(function (value) {
      // Do other things once the value has been saved.
      side_toaster("favorit saved", 2000);
      m.route.set("/chat");
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

  console.log(room_favorits);
};

const server_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
    {
      urls: "stun:iphone-stun.strato-iphone.de:3478",
    },
    {
      urls: "stun:numb.viagenie.ca:3478",
    },
    {
      urls: "stun:openrelay.metered.ca:80",
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};

const focus_last_article = function () {
  setTimeout(function () {
    let a = document.querySelectorAll("div#app article");
    a[a.length - 1].focus();
  }, 1000);
};

function sendMessage(msg, type) {
  if (conn && conn.open) {
    if (type == "image") {
      // Encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        //add image to feed
        let src = URL.createObjectURL(msg.blob);

        chat_data.push({
          username: settings.nickname,
          content: "",
          datetime: new Date(),
          image: src,
        });

        msg = {
          file: reader.result,
          filename: msg.filename,
          filetype: msg.type,
        };

        conn.send(msg);
        m.redraw();
        focus_last_article();
      };
      reader.readAsDataURL(msg.blob);
    }
    if (type == "text") {
      if (msg == "") return false;
      msg = {
        text: msg,
      };
      chat_data.push({
        nickname: settings.nickname,
        content: msg.text,
        datetime: new Date(),
      });

      conn.send(msg);

      m.redraw();
      focus_last_article();
    }
    document.querySelector("div#message-input input").value = "";
  } else {
    side_toaster(
      "There is no one connected to the room, you cannot broadcast.",
      10000
    );
  }
}

let close_connection = function () {
  conn.close();
};

let list_peers = function () {
  try {
    peer.listAllPeers(function (res) {
      side_toaster(res, 3000);
    });
  } catch (e) {
    side_toaster(e, 3000);
  }
};

function ready() {
  conn.on("data", function (data) {
    if (data.file) {
      chat_data.push({
        nickname: settings.nickname,
        content: "",
        datetime: new Date(),
        image: data.file,
      });
    }

    if (data.text) {
      chat_data.push({
        nickname: settings.nickname,

        content: data.text,
        datetime: new Date(),
      });
    }

    m.redraw();
    focus_last_article();
  });
  conn.on("close", function () {
    conn = null;
    side_toaster("connection closed", 1000);
  });
}

function initialize() {
  // Create own peer object with connection to shared PeerJS server
  peer = new Peer({
    debug: 3,
    referrerPolicy: "origin-when-cross-origin",
  });

  peer.on("open", function (id) {
    if (peer.id === null) {
      peer.id = lastPeerId;
    } else {
      lastPeerId = peer.id;
    }

    current_room = peer.id;
    console.log("ccm" + current_room);
  });
  peer.on("connection", function (c) {
    ready();
  });
  peer.on("disconnected", function () {
    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
  });
  peer.on("close", function () {
    side_toaster("connection closed", 1000);
    conn = null;
  });
  peer.on("error", function (err) {
    console.log(err);
  });
}

function join(id) {
  // Close old connection
  if (conn) {
    conn.close();
  }

  // Create connection to destination peer
  conn = peer.connect(id, {
    reliable: true,
  });

  conn.on("open", function () {
    side_toaster("Connected", 5000);
  });
  // Handle incoming data (messages only since this is the signal sender)
  conn.on("data", function (data) {
    if (data.file) {
      chat_data.push({
        nickname: settings.nickname,
        content: "",
        datetime: new Date(),
        image: data.file,
      });
    }

    if (data.text) {
      chat_data.push({
        nickname: settings.nickname,
        content: data.text,
        datetime: new Date(),
      });
    }

    m.redraw();
    focus_last_article();
  });
  conn.on("close", function () {
    side_toaster("Connection is closed", 10000);
  });
}

//create peer
let create_peer = function () {
  m.route.set("/chat");

  peer = new Peer({
    debug: 3,
    referrerPolicy: "origin-when-cross-origin",
    // config: server_config,
  });

  peer.on("open", function (id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
      peer.id = lastPeerId;
    } else {
      lastPeerId = peer.id;
    }

    current_room = peer.id;

    //make qr code
    var qrs = new qrious();
    qrs.set({
      background: "white",
      foreground: "black",
      level: "H",
      padding: 5,
      size: 200,
      value: lastPeerId,
    });

    chat_data.push({
      nickname: settings.nickname,
      content: "room created",
      datetime: new Date(),
      image: qrs.toDataURL(),
    });

    bottom_bar(
      "<img src='assets/image/pencil.svg'>",
      "",
      "<img src='assets/image/option.svg'>"
    );

    m.redraw();
  });
  peer.on("connection", function (c) {
    conn = c;
    side_toaster("Connected");
    ready();
  });
  peer.on("disconnected", function () {
    side_toaster("Connection lost. Please reconnect", 3000);

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
  });
  peer.on("close", function () {
    conn = null;
    side_toaster("Connection destroyed", 3000);
  });
  peer.on("error", function (err) {
    console.log(err);
  });
};

//connect to peer
let connect_to_peer = function (_id) {
  m.route.set("/chat");
  initialize();
  setTimeout(function () {
    join(_id);
  }, 2000);
};

let handleImage = function (t) {
  m.route.set("/chat");
  if (t != "") sendMessage(t, "image");

  let a = document.querySelectorAll("div#app article");
  a[a.length - 1].focus();
  status = "";
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
  stop_scan();
  connect_to_peer(n);
  chat_data.push({ content: "connected", datetime: new Date() });
  m.redraw();
};

//callback geolocation
let geolocation_callback = function (e) {
  console.log(e.coords.latitude);

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

var settings_page = {
  view: function () {
    return m(
      "div",
      { class: "flex justify-content-spacearound", id: "settings_page" },
      [
        m(
          "div",
          {
            tabindex: 0,
            class:
              "item input-parent  flex width-100 justify-content-spacearound",
            oncreate: ({ dom }) =>
              setTimeout(function () {
                dom.focus();
              }, 500),
          },
          [
            m(
              "label",
              {
                for: "Nickname",
              },
              "Nickname"
            ),
            m("input", {
              id: "nickname",
              placeholder: "nickname",
              value: settings.nickname,
            }),
          ]
        ),

        m("H2", {}, "Server Settings"),

        m(
          "div",
          {
            tabindex: 1,

            class:
              "item input-parent  flex width-100 justify-content-spacearound",
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
            tabindex: 2,

            class:
              "item input-parent  flex width-100 justify-content-spacearound",
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
            tabindex: 3,

            class:
              "item input-parent  flex width-100 justify-content-spacearound",
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
          "button",
          {
            tabindex: 4,

            class: "item",
            "data-function": "save-settings",
            onclick: function () {
              settings.nickname = document.getElementById("nickname").value;
              settings.server_url = document.getElementById("server_url").value;
              settings.server_path =
                document.getElementById("server_path").value;

              settings.server_port =
                document.getElementById("server_port").value;

              localforage
                .setItem("settings", settings)
                .then(function (value) {
                  // Do other things once the value has been saved.
                  side_toaster("settings saved", 2000);
                  window.location.replace("/start");
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
    bottom_bar("", "select", "");
    return m(
      "div",
      { class: "flex justify-content-spacearound", id: "login" },
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
              pick_image(handleImage);
            },
          },
          "share image"
        ),

        m(
          "button",
          {
            class: "item",
            tabindex: 1,
            onclick: function () {
              geolocation(geolocation_callback);
            },
          },
          "share location"
        ),

        m(
          "button",
          {
            class: "item",
            tabindex: 2,
            onclick: function () {
              addToFavorit();
            },
          },
          "add room to favorits"
        ),
      ]
    );
  },
};

var login = {
  view: function () {
    return m(
      "div",
      { class: "flex justify-content-spacearound", id: "login" },
      [
        m(
          "div",
          {
            class:
              "item input-parent  flex width-100 justify-content-spacearound",
            tabindex: 0,
          },
          [m("input", { id: "username", placeholder: "username" })]
        ),

        m("div", {
          id: "login-icon-box",
        }),

        m(
          "button",
          {
            class: "item",
            "data-function": "login-check",
            tabindex: 1,
            onclick: function () {
              settings.username = document.getElementById("username").value;
              window.location.replace("/start");
            },
          },
          "enter"
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
          bottom_bar(
            "",
            "<img src='assets/image/select.svg'>",
            "<img src='assets/image/option.svg'>"
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
            },
            onfocus: () => {
              bottom_bar("", "<img src='assets/image/select.svg'>", "");
            },
          },
          "connect to room by QR-Code"
        ),

        m(
          "button",
          {
            class: "item",
            "data-function": "create-peer",
            tabindex: 1,
            onclick: function () {
              create_peer();
            },
            onfocus: () => {
              bottom_bar("", "<img src='assets/image/select.svg'>", "");
            },
          },
          "create room"
        ),

        m(
          "button",
          {
            class: "item",
            "data-function": "create-peer",
            tabindex: 2,
            onclick: function () {
              m.route.set("/favorits_page");
            },
            onfocus: () => {
              bottom_bar("", "<img src='assets/image/select.svg'>", "");
            },
          },
          "favorits"
        ),

        m(
          "button",
          {
            class: "item",
            "data-function": "settings",
            tabindex: 3,
            onclick: function () {
              m.route.set("/settings_page");
            },
            onfocus: () => {
              bottom_bar("", "<img src='assets/image/select.svg'>", "");
            },
          },
          "settings"
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
        },
        item.href
      );
    });
  },
};

var favorits_page = {
  view: function (vnode) {
    return room_favorits.map(function (item, index) {
      bottom_bar("", "select", "");
      console.log(item);
      return m(
        "button",
        {
          class: "item",
          tabindex: index,
          onclick: function () {
            connect_to_peer(item);
          },
        },
        item
      );
    });
  },
};

var chat = {
  view: function () {
    return m(
      "div",
      {
        oncreate: () => {
          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
        },
      },

      m("div", { id: "message-input", type: "text" }, [
        m("input", { type: "text" }),
      ]),
      chat_data.map(function (item, index) {
        return m(
          "article",
          {
            class: "item",
            tabindex: index,
          },
          [
            m("div", { class: "flex message-head" }, [
              m("div", time_parse(item.datetime)),
              m("div", { class: "nickname" }, item.nickname),
            ]),
            m("div", { class: "message-main" }, item.content),
            m("img", { class: "message-media", src: item.image }),
          ]
        );
      })
    );
  },
};

var intro = {
  view: function () {
    return m("div", { class: "width-100 height-100", id: "intro" }, [
      m("img", {
        src: "./assets/icons/intro.svg",
        oncreate: () => {
          setTimeout(function () {
            m.route.set("/start");
          }, 3000);
        },
      }),

      m("div", {
        class: "width-100",
        id: "version",
      }),
    ]);
  },
};

m.route(root, "/intro", {
  "/intro": intro,
  "/login": login,
  "/start": start,
  "/links_page": links_page,
  "/chat": chat,
  "/options": options,
  "/settings_page": settings_page,
  "/favorits_page": favorits_page,
});

document.addEventListener("DOMContentLoaded", function (e) {
  bottom_bar("", "", "");

  let write = function () {
    if (document.getElementById("message-input").style.display == "none") {
      document.getElementById("message-input").style.display = "block";
      document.querySelector("div#message-input input").focus();
      status = "write";
      bottom_bar(
        "<img src='assets/image/send.svg'>",
        "",
        "<img src='assets/image/option.svg'>"
      );
    } else {
      document.querySelector("div#message-input input").value = "";
      document.getElementById("message-input").style.display = "none";
      focus_last_article();
      status = "";
    }
  };

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
    const currentIndex = document.activeElement.tabIndex;
    let next = currentIndex + move;
    let items = 0;

    let b = document.activeElement.parentNode;
    items = b.querySelectorAll(".item");

    if (document.activeElement.parentNode.classList.contains("input-parent")) {
      document.activeElement.parentNode.focus();
      return true;
    }

    let targetElement = 0;

    if (next <= items.length) {
      targetElement = items[next];
      targetElement.focus();
    }

    if (next == items.length) {
      targetElement = items[0];
      targetElement.focus();
    }

    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.activeElement.parentNode.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });
  };

  // ////////////////////////////
  // //KEYPAD HANDLER////////////
  // ////////////////////////////

  let longpress = false;
  const longpress_timespan = 1000;
  let timeout;

  function repeat_action(param) {
    switch (param.key) {
      case "0":
        break;
    }
  }

  // ////////////
  // //LONGPRESS
  // ///////////

  function longpress_action(param) {
    switch (param.key) {
      case "0":
        break;

      case "Backspace":
        window.close();
        break;

      case "ArrowLeft":
        break;
    }
  }

  // /////////////
  // //SHORTPRESS
  // ////////////

  function shortpress_action(param) {
    if (status == "confirm") return false;
    let route = m.route.get();

    //user avatar
    if (route == "/login") {
      //avatar
      const usernameInput = document.querySelector("#username");
      function refresh() {
        document.getElementById("login-icon-box").innerHTML =
          "<identicon-svg username='hasard' saturation='95' lightness='60'>";
      }
      usernameInput.addEventListener("input", function () {
        refresh();
      });
    }

    if (route == "/start") {
      chat_data = [];
    }
    switch (param.key) {
      case "*":
        break;

      case "ArrowUp":
        nav(-1);

        break;
      case "ArrowDown":
        nav(+1);

        break;
      case "ArrowRight":
        break;
      case "ArrowLeft":
        break;

      case "SoftRight":
      case "Alt":
        if (route == "/chat") m.route.set("/options");
        break;

      case "SoftLeft":
      case "Control":
        if (route == "/chat" && status !== "write") {
          write();
          break;
        }

        if (route == "/chat" && status === "write") {
          sendMessage(document.getElementsByTagName("input")[0].value, "text");
        }

        break;

      case "Enter":
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[0].focus();
        }

        if (route == "/chat") {
          if (document.activeElement.tagName == "ARTICLE") {
            links = linkify.find(document.activeElement.textContent);

            if (links.length >= 0) {
              m.route.set("/links_page");
            }

            links.forEach(function (e) {
              console.log(e);
            });
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
    if (evt.key === "Backspace" && m.route.get() != "/start") {
      evt.preventDefault();
    }

    if (evt.key === "Backspace") {
      if (m.route.get() === "/chat") {
        warning_leave_chat();
        return false;
      }
      if (
        m.route.get() == "/chat" ||
        m.route.get() == "/settings_page" ||
        m.route.get() == "/favorits_page"
      ) {
        m.route.set("/start");
        if (conn) {
          close_connection();
        }
      }

      if (m.route.get() == "/options" || m.route.get() == "/links_page") {
        m.route.set("/chat");
      }
    }

    if (evt.key === "EndCall") {
      evt.preventDefault();
      window.close();
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
    if (status.visible === false) return false;

    if (evt.key == "Backspace" && document.activeElement.tagName == "INPUT") {
    }

    clearTimeout(timeout);
    if (!longpress) {
      shortpress_action(evt);
    }
  }

  let handleVisibilityChange = function () {};

  handleVisibilityChange();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
});
