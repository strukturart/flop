"use strict";

import { bottom_bar } from "./assets/js/helper.js";
import { dummy_data } from "./assets/js/dummy-data.js";

//RENDER

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

var root = document.getElementById("app");

var login = {
  view: function () {
    return m("div", { class: "flex", id: "login" }, [
      m("div", { class: "item input-parent  width-100", tabindex: 0 }, [
        m("input", { class: "title", placeholder: "name" }),
      ]),
      m("div", { class: "item input-parent  width-100", tabindex: 1 }, [
        m("input", { class: "width-70", placeholder: "password" }),
      ]),
      m(
        "button",
        {
          class: "item",
          "data-function": "login-check",
          tabindex: 2,
          onclick: function () {
            window.location.replace("!#/chats");
          },
        },
        "login"
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
          onclick: function () {
            alert("h");
          },
        },
        item.chat_group
      );
    });
  },
};

var chat = {
  view: function (vnode) {
    return dummy_data.map(function (item, index) {
      if (item.chat_group == "t") {
        return m(
          "div",
          {
            tabindex: index,
            class: "item",
          },
          "hey"
        );
      }
    });
  },
};

m.route(root, "/login", {
  "/login": login,
  "/chats": chats,
  "/chat": chat,
});

document.addEventListener("DOMContentLoaded", function (e) {
  bottom_bar("", "", "");
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
        window.location.replace("!#/chats");
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
        break;

      case "Enter":
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[1].focus();
        }
        if (document.activeElement.tagName == "BUTTON") {
        }

        if (
          document.activeElement.getAttribute("data-function") == "open-chat"
        ) {
        }

        break;

      case "Backspace":
        break;
    }
  }

  // ///////////////////////////////
  // //shortpress / longpress logic
  // //////////////////////////////

  function handleKeyDown(evt) {
    if (evt.key === "Backspace") {
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
