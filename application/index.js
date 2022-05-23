"use strict";

import {
  bottom_bar,
  side_toaster,
  pick_image,
  month,
} from "./assets/js/helper.js";
import { dummy_data } from "./assets/js/dummy-data.js";
import { Peer } from "peerjs";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import { identiconSvg } from "minidenticons";
import { qrious } from "qrious";

//github.com/laurentpayot/minidenticons#usage

export let status = "";

let chat_data = [];

let settings = {
  peerid: "",
  username: "",
};

let lastPeerId = null;
let peer = null;
let conn = null;

const focus_last_article = function () {
  setTimeout(function () {
    let a = document.querySelectorAll("div#app article");
    a[a.length - 1].focus();
  }, 1000);
};

function sendMessage(msg, type) {
  if (conn && conn.open) {
    if (settings.username != "") {
      //msg = "#" + settings.username + " " + msg;
      //chat_data.push({ "content": msg, "datetime": new Date() });
    }

    if (type == "image") {
      // Encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        //add image to feed
        let src = URL.createObjectURL(msg.blob);

        chat_data.push({
          "content": "",
          "datetime": new Date(),
          "image": src,
        });

        msg = {
          file: reader.result,
          filename: msg.filename,
          filetype: msg.type,
        };

        conn.send(msg);
        console.log("Sent: " + msg);
        m.redraw();
        focus_last_article();
      };
      reader.readAsDataURL(msg.blob);
    }
    if (type == "text") {
      msg = {
        text: msg,
      };
      chat_data.push({
        "content": msg.text,
        "datetime": new Date(),
      });

      conn.send(msg);
      console.log("Sent: " + msg);
      m.redraw();
      focus_last_article();
    }
  } else {
    side_toaster(
      "There is no one connected to the room, you cannot broadcast.",
      10000
    );
  }
}

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
        "content": "",
        "datetime": new Date(),
        "image": data.file,
      });
    }

    if (data.text) {
      chat_data.push({
        "content": data.text,
        "datetime": new Date(),
      });
    }

    m.redraw();
    focus_last_article();
  });
  conn.on("close", function () {
    conn = null;
  });
}

function initialize() {
  // Create own peer object with connection to shared PeerJS server
  peer = new Peer(null, {
    debug: 3,
    referrerPolicy: "origin-when-cross-origin",
    initiator: true,
    trickle: false,
  });

  peer.on("open", function (id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
      peer.id = lastPeerId;
    } else {
      lastPeerId = peer.id;
    }

    console.log("ID: " + peer.id);
  });
  peer.on("connection", function (c) {
    ready();
  });
  peer.on("disconnected", function () {
    side_toaster("Connection lost. Please reconnect", 4000);

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
  });
  peer.on("close", function () {
    side_toaster("Connection destroyed", 4000);
    conn = null;
    console.log("Connection destroyed");
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

  // Create connection to destination peer specified in the input field
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
        "content": "",
        "datetime": new Date(),
        "image": data.file,
      });
    }

    if (data.text) {
      chat_data.push({
        "content": data.text,
        "datetime": new Date(),
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
  window.location.replace("#/chat");

  peer = new Peer(null, {
    debug: 3,
    referrerPolicy: "origin-when-cross-origin",
  });

  peer.on("open", function (id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
      peer.id = lastPeerId;
    } else {
      lastPeerId = peer.id;
    }
    console.log("ID: " + peer.id + " " + lastPeerId);

    //make qr code
    var qrs = new QRious();
    qrs.set({
      background: "white",
      foreground: "black",
      level: "H",
      padding: 5,
      size: 200,
      value: lastPeerId,
    });

    chat_data.push({
      "content": "room created",
      "datetime": new Date(),
      "image": qrs.toDataURL(),
    });

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
  window.location.replace("#/chat");
  initialize();
  setTimeout(function () {
    join(_id);
  }, 2000);
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

var root = document.getElementById("app");

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
              window.location.replace("#/start");
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
      { class: "flex justify-content-spacearound", id: "login" },
      [
        m(
          "button",
          {
            class: "item",
            "data-function": "connect-to-peer",
            tabindex: 0,
          },
          "connect to room by QR-Code"
        ),

        m(
          "button",
          {
            class: "item",
            "data-function": "create-peer",
            tabindex: 1,
          },
          "create room"
        ),
      ]
    );
  },
};

let t;
var chats = {
  view: function (vnode) {
    return dummy_data.map(function (item, index) {
      return m(
        "div",
        {
          tabindex: index,
          class: "item",
          "data-function": "open-chat",
          "data-chat-name": item.chat_group,
        },
        item.chat_group
      );
    });
  },
};

var chat = {
  view: function (vnode) {
    return chat_data.map(function (item, index) {
      bottom_bar("write", "select", "options");
      return m("article", { class: "item", tabindex: index }, [
        m("div", { class: "flex message-head" }, [
          m("div", time_parse(item.datetime)),
        ]),
        m("div", { class: "message-main" }, item.content),
        m("img", { class: "message-media", src: item.image }),
      ]);
    });
  },
};

var intro = {
  view: function () {
    return m("div", { class: "width-100 height-100", id: "intro" }, [
      m("img", {
        src: "./assets/icons/intro.svg",
      }),

      m("div", {
        class: "width-100",
        id: "version",
      }),
    ]);
  },
};

setTimeout(function () {
  window.location.replace("#/start");

  document.querySelector("[data-function='connect-to-peer]").focus();
}, 3000);

m.route(root, "/intro", {
  "/intro": intro,
  "/login": login,
  "/start": start,
  "/chats": chats,
  "/chat": chat,
});
m.route.prefix = "#";

document.addEventListener("DOMContentLoaded", function (e) {
  bottom_bar("", "", "");

  let write = function () {
    if (document.getElementById("message-input").style.display == "none") {
      document.getElementById("message-input").style.display = "block";
      document.querySelector("div#message-input input").focus();
      bottom_bar("cancel", "send", "attachment");
      status = "write";
    } else {
      document.querySelector("div#message-input input").value = "";

      document.getElementById("message-input").style.display = "none";
      focus_last_article();
      bottom_bar("write", "select", "options");
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

  let handleImage = function (t) {
    document.querySelector("div#message-input input").value = "";
    document.getElementById("message-input").style.display = "none";
    let a = document.querySelectorAll("div#app article");
    a[a.length - 1].focus();
    bottom_bar("write", "select", "options");
    status = "";
    if (t != "") sendMessage(t, "image");
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
      //delete input and data
      document.querySelector("div#message-input input").value = "";
      document.getElementById("message-input").style.display = "none";
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

      case "1":
        break;
      case "3":
        break;

      case "2":
        break;

      case "#":
        break;

      case "7":
        break;

      case "SoftRight":
      case "Alt":
        if (status == "write") pick_image(handleImage);
        break;

      case "SoftLeft":
      case "Control":
        if (route == "/chat") {
          write();
          break;
        }

        break;

      case "Enter":
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[0].focus();
        }

        if (
          document.activeElement.getAttribute("data-function") == "open-chat"
        ) {
          t = document.activeElement.getAttribute("data-chat-name");
          window.location.replace("#/chat");
        }

        if (
          document.activeElement.getAttribute("data-function") ==
          "connect-to-peer"
        ) {
          let t = function (n) {
            stop_scan();
            connect_to_peer(n);
            chat_data.push({ "content": "connected", "datetime": new Date() });
            m.redraw();
          };

          start_scan(t);
        }

        if (
          document.activeElement.getAttribute("data-function") == "create-peer"
        ) {
          create_peer();
        }
        if (route == "/chat") {
          if (document.getElementsByTagName("input")[0].value != "")
            sendMessage(
              document.getElementsByTagName("input")[0].value,
              "text"
            );
          write();

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
    if (evt.key === "Backspace") {
      evt.preventDefault();
      if (m.route.get() == "/chat") {
        window.location.replace("#/start");
        bottom_bar("", "", "");
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
