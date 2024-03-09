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
} from "./assets/js/helper.js";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import localforage from "localforage";
import * as linkify from "linkifyjs";
import {
  geolocation,
  pushLocalNotification,
  share,
} from "./assets/js/helper.js";
import m from "mithril";
import qrious from "qrious";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

//github.com/laurentpayot/minidenticons#usage
export let status = { visibility: true, action: "" };
export let settings = {};
export let current_room = "";

let links = "";
let chat_data = [];
let lastPeerId = null;
let peer = null;
let conn = null;
let room_favorits = [];

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

let ice_servers = {
  "iceServers": [],
};

async function getIceServers() {
  try {
    const response = await fetch(
      "https://" +
        process.env.TURN_APP_NAME +
        ".metered.live/api/v1/turn/credentials?apiKey=" +
        process.env.TURN_APP_KEY
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ice servers. Status: ${response.status}`
      );
    }

    const a = await response.json();

    a.forEach((e) => {
      ice_servers.iceServers.push(e);
    });

    if (peer) peer.destroy();
    if (typeof peerConfiguration == "object") {
      console.log("with turn");

      peer = new Peer({
        debug: 1,
        config: ice_servers,
        secure: false,
        referrerPolicy: "origin-when-cross-origin",
      });
    } else {
      console.log("without turn");

      peer = new Peer({
        debug: 1,
        secure: false,
        config: ice_servers,
        referrerPolicy: "no-referrer",
      });
    }

    peer.on("open", function () {
      if (peer.id === null) {
        peer.id = lastPeerId;
      } else {
        lastPeerId = peer.id;
      }
    });

    peer.on("connection", function (c) {
      conn = c;

      conn.on("data", function (data) {
        if (!status.visibility) pushLocalNotification("flop", "new message");
        if (data.file) {
          chat_data.push({
            nickname: data.nickname,
            content: "",
            datetime: new Date(),
            image: data.file,
          });
        }

        if (data.text) {
          chat_data.push({
            nickname: data.nickname,
            content: data.text,
            datetime: new Date(),
          });
        }

        m.redraw();
        focus_last_article();
      });
      conn.on("close", function () {
        // conn = null;
        side_toaster("user has left chat", 1000);
      });

      // Event handler for successful connection
      conn.on("open", function () {
        side_toaster("Connected with " + peer.id, 5000);
      });

      // Event handler for connection errors
      conn.on("error", function (err) {
        console.log("Error: " + err.type, 5000);
      });

   
    });

    peer.on("disconnected", function () {
      // Workaround for peer.reconnect deleting previous id
      peer.id = lastPeerId;
      peer._lastServerId = lastPeerId;
      peer.reconnect();
    });

    peer.on("close", function () {
      side_toaster("connection closed", 1000);
      // conn = null;
    });

    peer.on("error", function (err) {
      side_toaster("int connection error " + err, 2000);
    });
  } catch (error) {
    console.error("Error fetching ice servers:", error.message);
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
      invite_url: "https://strukturart.github.io/flop/",
    };

    for (const key in defaultValues) {
      if (!(key in settings)) {
        settings[key] = defaultValues[key];
      }
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
    document.getElementById("message-input").style.display = "block";
    document.querySelector("div#message-input input").focus();
    status.action = "write";
  } else {
    document.querySelector("div#message-input input").value = "";
    document.getElementById("message-input").style.display = "none";
    focus_last_article();
    status.action = "";
  }
};

let deleteFavorit = () => {
  room_favorits = room_favorits.filter((e) => {
    return e !== document.activeElement.getAttribute("data-id");
  });

  localforage.setItem("roomfavorits", room_favorits).then(() => {
    side_toaster("deleted", 4000);
    m.redraw();
  });
};

let addToFavorit = function () {
  room_favorits.push(current_room);

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
  if (conn && conn.open) {
    if (type == "image") {
      // Encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        //add image to feed
        let src = URL.createObjectURL(msg.blob);

        chat_data.push({
          nickname: settings.nickname,
          content: "",
          datetime: new Date(),
          image: src,
        });

        msg = {
          file: reader.result,
          filename: msg.filename,
          filetype: msg.type,
          nickname: settings.nickname,
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
        nickname: settings.nickname,
      };
      chat_data.push({
        nickname: settings.nickname,
        content: msg.text,
        datetime: new Date(),
      });
      conn.send(msg);

      m.redraw();
      focus_last_article();
      write();
    }
  } else {
    side_toaster("no user onlineno other users online", 3000);
    write();
  }
}

let close_connection = function () {
  conn.close();
};

//connect to peer
let connect_to_peer = function (id) {
  current_room = id;
  console.log(id);
  getIceServers().then(() => {
    m.route.set("/chat");
    setTimeout(() => {
      if (peer == null) console.log("no peer instance");

      // Establish connection with the destination peer
      try {
        conn = peer.connect(id, {
          label: "chat",
          reliable: true,
        });

        conn.on("data", function (data) {
          if (!status.visibility) pushLocalNotification("flop", "new message");

          if (data.file) {
            chat_data.push({
              nickname: data.nickname,
              content: "",
              datetime: new Date(),
              image: data.file,
            });
          }

          if (data.text) {
            chat_data.push({
              nickname: data.nickname,
              content: data.text,
              datetime: new Date(),
            });
          }

          m.redraw();
          focus_last_article();
        });

        // Event handler for successful connection
        conn.on("open", function () {
          side_toaster("Connected with " + peer.id, 5000);
          chat_data.push({ content: "connected", datetime: new Date() });
        });

        // Event handler for connection errors
        conn.on("error", function (err) {
          console.log("Error: " + err.type, 5000);
        });

        // Event handler for connection closure
        conn.on("close", function () {
          side_toaster("user has left chat", 1000);
        });
      } catch (e) {
        console.log("error con" + e);
      }
    }, 4000);
  });
};

//create room
// and create qr-code with peer id
let create_peer = function () {
  getIceServers().then(() => {
    peer.on("open", function () {
      m.route.set("/chat");

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
        value: current_room,
      });

      chat_data.push({
        nickname: settings.nickname,
        content: "invitation link",
        datetime: new Date(),
        image: qrs.toDataURL(),
      });

      chat_data.push({
        nickname: settings.nickname,
        content: "no other user online, you should invite someone.",
        datetime: new Date(),
      });

      bottom_bar("", "", "<img src='assets/image/option.svg'>");

      m.redraw();
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
      {
        class: "flex justify-content-center width-100",
        id: "settings_page",
        oncreate: () => {
          bottom_bar("", "", "");
        },
      },
      [
        m(
          "div",
          {
            tabindex: 0,
            oncreate: ({ dom }) => {
              dom.focus();
              console.log("j");
            },
            class:
              "item input-parent flex width-100 justify-content-spacearound",
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
            }),
          ]
        ),

        m("H2", { class: "widt-100 text-center" }, "Server Settings"),

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
          "div",
          {
            tabindex: 4,

            class:
              "item input-parent  flex width-100 justify-content-spacearound",
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
            tabindex: 5,

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
                  m.route.set("/start");
                })
                .catch(function (err) {
                  // This code runs if there were any errors
                  console.log(err);
                });
            },
          },
          "save settings"
        ),
        m("div", {
          id: "KaiOSads-Wrapper",
          tabindex: 6,

          class: "item",
          oncreate: () => {
            load_ads();
          },
        }),
      ]
    );
  },
};

var options = {
  view: function () {
    bottom_bar("", "", "");
    return m(
      "div",
      {
        class: "flex justify-content-spacearound  width-100",
        id: "login",
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
            class: "item",
            tabindex: 1,
            onclick: function () {
              if (status.userOnline > 0) {
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
            class: "item",
            tabindex: 2,
            onclick: function () {
              share(settings.invite_url + "?id=" + current_room);
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
        class: "flex justify-content-center",
        id: "start",
        oncreate: () => {
          bottom_bar(
            "<img src='assets/image/save.svg'>",
            "<img src='assets/image/plus.svg'>",
            "<img src='assets/image/option.svg'>"
          );
        },
      },
      [
        m("img", {
          src: "assets/image/logo.svg",
          class: "",
        }),
        m(
          "p",
          {
            class: "scroll item",
            oncreate: (dom) => {
              document.querySelector("#start p").focus();
            },
          },
          "flop is a webRTC chat app with which you can communicate directly with someone (p2p). You can currently exchange text, images and your position with your chat partner. To create a chat room, press enter."
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
          oncreate: () => {
            index == 1 ?? item.focus();
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
    bottom_bar("", "", "");
    return m(
      "div",
      {
        class: "flex justify-content-center  width-100",
        id: "open-peer-menu",
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
          {},
          "You can join a chat when someone invites you with a link. If you don't have this link, you can also enter the chat ID here or scan the QR code."
        ),
      ]
    );
  },
};

var favorits_page = {
  view: function (vnode) {
    return room_favorits.map(function (item, index) {
      bottom_bar(
        "<img src='assets/image/delete.svg'>",
        "<img src='assets/image/select.svg'>",
        ""
      );
      return m(
        "button",
        {
          class: "item",
          tabindex: index,
          "data-id": item,
          onclick: function () {
            connect_to_peer(item);
          },
        },
        item
      );
    });
  },
};
let user_check;
var chat = {
  view: function () {
    return m(
      "div",
      {
        id: "chat",
        onremove:()=>{clearInterval(user_check)},
        oncreate: () => {
          top_bar("", "", "");
          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
          user_check = setInterval(() => {
            if (status.action == "write") return false;
            let c = peer.connections;
            status.userOnline = Object.values(c).length;
          
          }, 10000);
        },
      },

      m("div", { id: "message-input", type: "text" }, [
        m("input", {
          type: "text",
          onblur: () => {
            status.action = "write";
            write();
            bottom_bar(
              "<img src='assets/image/pencil.svg'>",
              "",
              "<img src='assets/image/option.svg'>"
            );
          },
          onfocus: () => {
            bottom_bar(
              "<img src='assets/image/send.svg'>",
              "",
              "<img src='assets/image/option.svg'>"
            );
          },
        }),
      ]),
      chat_data.map(function (item, index) {
        let nickname = "me";
        if (item.nickname != settings.nickname) {
          nickname = item.nickname;
        }
        return m(
          "article",
          {
            class: "item " + nickname,
            tabindex: index,
            onfocus: () => {
              links = linkify.find(document.activeElement.textContent);
              if (links.length > 0) {
                bottom_bar(
                  "<img src='assets/image/send.svg'>",
                  "<img src='assets/image/link.svg'>",
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
            m("img", { class: "message-media", src: item.image }),
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
    return m("div", { class: "width-100 height-100", id: "intro" }, [
      m("img", {
        src: "./assets/icons/intro.svg",
        oncreate: () => {
          setTimeout(function () {
            m.route.set("/start");
          }, 4000);
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
  "/open_peer_menu": open_peer_menu,
  "/start": start,
  "/links_page": links_page,
  "/chat": chat,
  "/options": options,
  "/settings_page": settings_page,
  "/favorits_page": favorits_page,
  "/scan": scan,
});

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
    /*
    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.activeElement.parentElement.parentElement.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });
    */

    // smooth center scrolling
    console.log(targetElement);
    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.getElementById("app").scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
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
    if (status.action == "confirm") return false;
    let route = m.route.get();

    if (route == "/start") {
      chat_data = [];
    }
    switch (param.key) {
      case "ArrowUp":
        if (route == "/chat" && document.activeElement.tagName === "INPUT") {
          write();
        }
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
        if (route == "/start") m.route.set("/settings_page");

        break;

      case "SoftLeft":
      case "Control":
        if (route == "/favorits_page") {
          deleteFavorit();
          break;
        }
        if (route == "/chat" && status.action !== "write") {
          if (status.userOnline > 0) {
            write();
          } else {
            side_toaster("no user online", 3000);
          }
          break;
        }

        if (route == "/chat" && status.action === "write") {
          sendMessage(document.getElementsByTagName("input")[0].value, "text");
        }

        if (route == "/start") {
          m.route.set("/open_peer_menu");
        }

        break;

      case "Enter":
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[0].focus();
        }

        if (route == "/start") {
          create_peer();
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
        m.route.set("/start");
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
        m.route.get() == "/favorits_page" ||
        m.route.get() == "/scan" ||
        m.route.get() == "/open_peer_menu"
      ) {
        evt.preventDefault();
        status.action = "";
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
      if (status.action == "") window.close();
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

    if (evt.key == "Backspace" && document.activeElement.tagName == "INPUT") {
    }

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

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
});

try {
  navigator.mozSetMessageHandler("activity", function (activityRequest) {
    var option = activityRequest.source;

    const urlParams = new URLSearchParams(option.data);
    const id = urlParams.get("id");
    setTimeout(() => {
      connect_to_peer(id);
    }, 10000);

    console.log(option.data);
  });
} catch (e) {}
