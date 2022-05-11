"use strict";

import Handlebars from "handlebars";

import { bottom_bar } from "./assets/js/helper.js";
import { chats } from "./chats.js";
import { chat } from "./chat.js";

import { dummy_data } from "./assets/js/dummy-data.js";

let settings = {};

let blob = "";
let events = [];

let set_tabindex = function () {
  document.querySelectorAll(".item").forEach(function (i, p) {
    i.setAttribute("tabindex", p);
  });
};

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
/*
Handlebars.registerHelper("transform_date", function (value) {
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
});
*/
function renderHello(arr, src, target, filter) {
  if (filter) {
    let myFunction = function (num) {
      return num.chat_group == filter;
    };
    const op = arr.filter(myFunction);

    arr = op;
  }

  try {
    var template = Handlebars.compile(src);
    document.getElementById(target).innerHTML = template({ data: arr });
  } catch (e) {
    alert(e.message);
  }
}
/*
 ///////////////
// ///////////////
// /////////////////
// /ROUTER
// ///////////////
// ///////////////
// //////////////
*/

const page_login = document.getElementById("page-login");
const page_chats = document.getElementById("page-chats");
const page_chat = document.getElementById("page-chat");
const options = document.getElementById("options");

export let status = { view: "page-login" };

const pages = document.querySelectorAll(".page");

export let router = function () {
  //status.view = path;
  pages.forEach(function (index) {
    index.style.display = "none";
  });

  // login
  if (status.view == "page-login") {
    page_login.style.display = "block";
    document.querySelector("div#page-login div").focus();
    bottom_bar("", "", "");
  }

  // chats
  if (status.view == "page-chats") {
    document.getElementById("message-input").style.display = "none";

    page_chats.style.display = "block";

    renderHello(dummy_data, chat, "page-chats");

    page_chats.firstElementChild.focus();
    bottom_bar("", "select", "");
  }

  // chat
  if (status.view == "page-chat") {
    renderHello(
      dummy_data,
      chats,
      "page-chat",
      document.activeElement.getAttribute("data-id")
    );
    page_chat.style.display = "block";
    page_chat.firstElementChild.focus();
    bottom_bar("write", "select", "option");
  }

  // optiions
  if (status.view == "page-options") {
    options.style.display = "block";
    document.querySelector("div#page-login div").focus();
    bottom_bar("", "select", "");
  }
};

router();

let write_message = function () {
  document.getElementById("message-input").style.display = "flex";
  document.querySelector("div#message-input input").focus();
  bottom_bar("cancel", "send", "attachment");
};

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
    const currentIndex = document.activeElement.tabIndex;
    let next = currentIndex + move;
    let items = 0;

    let b = document.activeElement.parentNode;
    items = b.querySelectorAll(".item");

    if (document.activeElement.parentNode.classList.contains("input-parent")) {
      document.activeElement.parentNode.focus();
      return true;
    }

    if (status.view == "page-chats") {
      let b = document.activeElement.parentNode;
      items = b.querySelectorAll("div#page-chats article");
    }

    if (status.view == "page-chat") {
      let b = document.activeElement.parentNode;
      items = b.querySelectorAll("div#page-chat article");
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
        if (status.view == "page-login") {
        }
        break;
      case "ArrowDown":
        nav(+1);
        if (status.view == "page-login") {
        }

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
        if (status.view == "page-chat") write_message();

        break;

      case "Enter":
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[1].focus();
        }
        if (document.activeElement.tagName == "BUTTON") {
          if (
            document.activeElement.getAttribute("data-function") ==
            "login-check"
          ) {
            status.view = "page-chats";
            router();
            return;
          }
        }

        if (
          document.activeElement.getAttribute("data-function") == "open-chat"
        ) {
          console.log("chea");
          status.view = "page-chat";
          router();
          return;
        }

        break;

      case "Backspace":
        if (status.view == "page-chat") {
          status.view = "page-chats";
          router();
        }
        break;
    }
  }

  // ///////////////////////////////
  // //shortpress / longpress logic
  // //////////////////////////////

  function handleKeyDown(evt) {
    if (evt.key === "Backspace") {
      if (
        status.view == "options" ||
        status.view == "add-edit-event" ||
        status.view == "scan"
      ) {
        evt.preventDefault();
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
