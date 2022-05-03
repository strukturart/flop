"use strict";

import Handlebars from "handlebars";

import { bottom_bar } from "./assets/js/helper.js";
import top_bar from "./assets/js/helper.js";
import toaster from "./assets/js/helper.js";
import side_toaster from "./assets/js/helper.js";

let once = false;

let settings = {};

let blob = "";
let events = [];

//KaioOs ads
let getManifest = function (callback) {
  if (!navigator.mozApps) {
    return false;
  }
  let self = navigator.mozApps.getSelf();
  self.onsuccess = function () {
    callback(self.result);
  };
  self.onerror = function () {};
};

let set_tabindex = function () {
  document.querySelectorAll(".item").forEach(function (i, p) {
    i.setAttribute("tabindex", p);
  });
};

//RENDER

function renderHello(arr, src, target, filter) {
  if (filter) {
    const op = arr.filter(myFunction);
    function myFunction(num) {
      return num.chat_group == filter;
    }
    arr = op;
  }

  var source = document.getElementById(src).innerHTML;
  var template = Handlebars.compile(source);
  document.getElementById(target).innerHTML = template({ data: arr });
}
//set_tabindex();
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

export let router = function (path) {
  //status.view = path;
  pages.forEach(function (index) {
    index.style.display = "none";
  });

  // login
  if (status.view == "page-login") {
    page_login.style.display = "block";
    document.querySelectorAll(".item")[0].focus();
    //bottom_bar("", "", "");
  }

  // chats
  if (status.view == "page-chats") {
    renderHello(dummy_data, "template-chats", "page-chats");

    page_chats.style.display = "block";
    page_chats.firstElementChild.focus();
    bottom_bar("", "select", "");
  }

  // chat
  if (status.view == "page-chat") {
    renderHello(
      dummy_data,
      "template-chat",
      "page-chat",
      document.activeElement.getAttribute("data-id")
    );
    page_chat.style.display = "block";
    page_chat.firstElementChild.focus();
    bottom_bar("write", "select", "option");
  }
};

router();

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
