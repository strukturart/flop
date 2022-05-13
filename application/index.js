"use strict";

import { bottom_bar, side_toaster } from "./assets/js/helper.js";
import { dummy_data } from "./assets/js/dummy-data.js";
import { Peer } from "peerjs";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import { identiconSvg } from "minidenticons";

//github.com/laurentpayot/minidenticons#usage

export let status = "";
const month = [
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

let chat_data = [];

let settings = {
  peerid: "",
  username: "",
};

let lastPeerId = null;
let peer = null;
let conn = null;

function sendMessage(msg) {
  if (conn && conn.open) {
    if (settings.username != "") {
      msg = "#" + settings.username + " " + msg;
    }
    conn.send(msg);
    console.log("Sent: " + msg);
    chat_data.push({ "content": msg, "datetime": new Date() });
    m.redraw();
  } else {
    side_toaster("Connection is closed", 10000);
  }
}

function ready() {
  conn.on("data", function (data) {
    console.log("Data recieved");
    chat_data.push({ "content": data, "datetime": new Date() });

    m.redraw();
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
      console.log("Received null id from peer open");
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
    console.log("Connection lost. Please reconnect");

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
  });
  peer.on("close", function () {
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
    reliable: false,
  });

  conn.on("open", function () {
    side_toaster("Connected to: " + conn.peer, 5000);
  });
  // Handle incoming data (messages only since this is the signal sender)
  conn.on("data", function (data) {
    console.log("Data recieved");
    chat_data.push({ "content": data, "datetime": new Date() });
    m.redraw();
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

    chat_data.push({
      "content": "peer created " + lastPeerId,
      "datetime": new Date(),
    });
    m.redraw();
  });
  peer.on("connection", function (c) {
    conn = c;
    console.log("Connected to: " + conn.peer);
    side_toaster("user connected", 3000);
    ready();
  });
  peer.on("disconnected", function () {
    console.log("Connection lost. Please reconnect");

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
  });
  peer.on("close", function () {
    conn = null;
    console.log("Connection destroyed");
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
    return m("div", { class: "flex", id: "login" }, [
      m(
        "button",
        {
          class: "item",
          "data-function": "connect-to-peer",
          tabindex: 0,
        },
        "connect to peer via QR-Code"
      ),

      m(
        "button",
        {
          class: "item",
          "data-function": "create-peer",
          tabindex: 1,
        },
        "create peer"
      ),
    ]);
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
          // m("div", item.content),
          m("div", time_parse(item.datetime)),
        ]),
        m("div", { class: "message-main" }, item.content),
      ]);
    });
  },
};

m.route(root, "/login", {
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
    } else {
      document.querySelectorAll("div#message-input input").innerText = "";

      document.getElementById("message-input").style.display = "none";
      document.querySelectorAll("div#app article")[0].focus();
      bottom_bar("write", "select", "options");
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
    let route = m.route.get();

    //user avatar
    if (route == "/login") {
      const usernameInput = document.querySelector("#username");

      function refresh() {
        document.getElementById("login-icon-box").innerHTML =
          "<identicon-svg username='hasard' saturation='95' lightness='60'>";
      }

      usernameInput.addEventListener("input", function () {
        refresh();
      });
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
          sendMessage(document.getElementsByTagName("input")[0].value);
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
