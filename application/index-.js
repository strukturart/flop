"use strict";

import Peer from "peerjs";

import {
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
} from "./assets/js/helper.js";
import { stop_scan, start_scan } from "./assets/js/scan.js";
import localforage from "localforage";
import { geolocation, pushLocalNotification } from "./assets/js/helper.js";
import m from "mithril";
import qrious from "qrious";
import { v4 as uuidv4 } from "uuid";
import "webrtc-adapter";
import { createAudioRecorder } from "./assets/js/helper.js";
import L from "leaflet";
import dayjs from "dayjs";

import DOMPurify from "dompurify";

import "swiped-events";

//import markerIcon from "./assets/css/images/marker-icon.png";
//import markerIconRetina from "./assets/css/images/marker-icon-2x.png";

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
};

// not KaiOS
//todo get own peer nickname
//to set the right nickname when storing contact in addressbook

const audioRecorder = createAudioRecorder();

export let settings = {};

const userAgent = navigator.userAgent || "";

if (userAgent && userAgent.includes("KAIOS")) {
  status.notKaiOS = false;
}
alert("kk");
