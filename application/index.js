"use strict";

import {
  bottom_bar,
  side_toaster,
  pick_image,
  month,
  generateRandomString,
  load_ads,
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

let peerConfiguration = {};

let test = [
  {
    "STUNAddress": "iphone-stun.strato-iphone.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "numb.viagenie.ca:3478",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.12connect.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.12voip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.1und1.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.3cx.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.acrobits.cz:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.actionvoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.advfn.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.altar.com.pl:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.antisip.com:3478",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.avigora.fr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.bluesip.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.cablenet-as.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.callromania.ro:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.callwithus.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.cheapvoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.cloopen.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.commpeak.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.cope.es:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.counterpath.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.counterpath.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.dcalling.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.demos.ru:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.dus.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.easycall.pl:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.easyvoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ekiga.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.epygi.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.etoilediese.fr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.faktortel.com.au:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.freecall.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.freeswitch.org:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.freevoipdeal.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.gmx.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.gmx.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.halonet.pl:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.hoiio.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.hosteurope.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.infra.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.internetcalls.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.intervoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ipfire.org:3478",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ippi.fr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ipshka.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.it1.hr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ivao.aero:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.jumblo.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.justvoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.l.google.com:19302",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.linphone.org:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.liveo.fr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.lowratevoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.lundimatin.fr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.mit.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.miwifi.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.modulus.gr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.myvoiptraffic.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.netappel.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.netgsm.com.tr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.nfon.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.nonoh.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.nottingham.ac.uk:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ooma.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ozekiphone.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.pjsip.org:3478",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.poivy.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.powervoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.ppdi.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.qq.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.rackco.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.rockenstein.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.rolmail.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.rynga.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.schlund.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sigmavoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sip.us:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sipdiscount.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sipgate.net:10000",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sipgate.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.siplogin.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sipnet.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sipnet.ru:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sippeer.dk:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.siptraffic.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sma.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.smartvoip.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.smsdiscount.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.solcon.nl:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.solnet.ch:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sonetel.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sonetel.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.sovtest.ru:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.srce.hr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.stunprotocol.org:3478",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.t-online.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.tel.lu:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.telbo.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.tng.de:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.twt.it:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.uls.co.za:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.unseen.is:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.usfamily.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.viva.gr:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.vivox.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.vo.lu:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voicetrading.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voip.aebc.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voip.blackberry.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voip.eutelia.it:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipblast.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipbuster.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipbusterpro.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipcheap.co.uk:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipcheap.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipgain.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipgate.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipinfocenter.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipplanet.nl:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voippro.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipraider.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipstunt.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipwise.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voipzoom.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voys.nl:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.voztele.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.webcalldirect.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.wifirst.net:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.xtratelecom.es:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun.zadarma.com:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun1.faktortel.com.au:3478",
    "ipv6Supported": false,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun1.l.google.com:19302",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun2.l.google.com:19302",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun3.l.google.com:19302",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
  {
    "STUNAddress": "stun4.l.google.com:19302",
    "ipv6Supported": true,
    "lastTest": "Thu Jul 01 2021",
  },
];

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

    const iceServers = await response.json();
    peerConfiguration.iceServers = iceServers;

    test.forEach((e) => {
      peerConfiguration.iceServers.push({ "urls": e.STUNAddress });
    });

    console.log(iceServers);

    console.log(peerConfiguration);
  } catch (error) {
    console.error("Error fetching ice servers:", error.message);
    // Handle the error or return it as needed
  }
}

// Call the function
getIceServers();

//load settings
localforage
  .getItem("settings")
  .then(function (value) {
    // If settings are not present, provide default values for each key
    settings = value || {};
    // Example: Generate a random string of length 10

    const defaultValues = {
      nickname: generateRandomString(10),
      server_url: "0.peerjs.com",
      server_path: "/",
      server_port: "443",
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
  status = "confirm";
  if (confirm("Do you really want leave the room?")) {
    m.route.set("/start");
    setTimeout(function () {
      status = "";
      peer.destroy();
    }, 1000);
  } else {
    setTimeout(function () {
      status = "";
    }, 1000);
  }
};

let write = function () {
  if (status != "write") {
    document.getElementById("message-input").style.display = "block";
    document.querySelector("div#message-input input").focus();
    status = "write";
  } else {
    document.querySelector("div#message-input input").value = "";
    document.getElementById("message-input").style.display = "none";
    focus_last_article();
    status = "";
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
    side_toaster(
      "There is no one connected to the room, you cannot broadcast.",
      10000
    );
    write();
  }
}

let close_connection = function () {
  conn.close();
};

function ready() {
  conn.on("data", function (data) {
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
    side_toaster("connection closed", 1000);
  });
}

function initialize() {
  if (peer) peer.destroy();

  if (typeof peerConfiguration == "object") {
    console.log("with turn");

    peer = new Peer({
      //secure: true,
      debug: 3,
      config: peerConfiguration.iceServers,
      referrerPolicy: "origin-when-cross-origin",
    });
  } else {
    console.log("without turn");

    peer = new Peer({
      debug: 3,
      referrerPolicy: "no-referrer",
    });
  }

  peer.on("open", function () {
    if (peer.id === null) {
      peer.id = lastPeerId;
      console.log("id" + peer.id);
    } else {
      lastPeerId = peer.id;
    }
    chat_data.push({ content: "open", datetime: new Date() });
    current_room = peer.id;
  });
  peer.on("connection", function (c) {
    conn = c;

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
    side_toaster("int connection error " + err, 2000);
  });
}

function join(id, maxRetries = 3, retryDelay = 3000) {
  let retries = 0;

  function connect() {
    // Create connection to destination peer
    conn = peer.connect(id, {
      reliable: true,
    });

    conn.on("open", function () {
      side_toaster("Connected", 5000);
      chat_data.push({ content: "connected", datetime: new Date() });
    });

    conn.on("error", function (err) {
      side_toaster("Error: " + err.type, 5000);
      console.log(err);
      retries++;
      if (retries < maxRetries) {
        setTimeout(connect, retryDelay); // Retry connection after delay
      } else {
        side_toaster("Max retries exceeded", 5000);
      }
    });

    conn.on("close", function () {
      side_toaster("Connection is closed", 5000);
    });

    // Handle incoming data (messages only since this is the signal sender)
    conn.on("data", function (data) {
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
      if (activeElement.tagName != "INPUT") focus_last_article();
    });
  }

  // Start initial connection attempt
  connect();
}

//connect to peer
let connect_to_peer = function (_id) {
  console.log(_id);

  initialize();

  setTimeout(function () {
    join(_id);
  }, 4000);

  m.route.set("/chat");
};

//create peer
let create_peer = function () {
  m.route.set("/chat");

  if (typeof peerConfiguration == "object") {
    console.log("with turn");
    peer = new Peer({
      debug: 3,
      config: peerConfiguration.iceServers,
      referrerPolicy: "origin-when-cross-origin",
    });
  } else {
    console.log("without turn");

    peer = new Peer({
      debug: 3,
      referrerPolicy: "origin-when-cross-origin",
    });
  }

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

    chat_data.push(
      {
        nickname: settings.nickname,
        content: "room created",
        datetime: new Date(),
        image: qrs.toDataURL(),
      },
      {
        nickname: settings.nickname,
        content: "test",
        datetime: new Date(),
      },
      {
        nickname: settings.nickname,
        content: "test",
        datetime: new Date(),
      }
    );

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
    side_toaster("Connection closed", 3000);
  });
  peer.on("error", function (err) {
    console.log(err);

    side_toaster("Connection error " + err, 3000);
  });
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
  connect_to_peer(n);
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
      { class: "flex justify-content-spacearound test", id: "settings_page" },
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
          id: "KaiOsAds-Wrapper",
          tabindex: 5,

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
              if (room_favorits != "") {
                m.route.set("/favorits_page");
              } else {
                side_toaster("no favorits set", 2000);
              }
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
          oncreate: () => {
            index == 1 ?? item.focus();
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
        id: "chat",
        oncreate: () => {
          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "",
            "<img src='assets/image/option.svg'>"
          );
        },
      },

      m("div", { id: "message-input", type: "text" }, [
        m("input", {
          type: "text",
          onblur: () => {
            status = "write";
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
              } else {
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

    document.activeElement.parentElement.parentElement.scrollBy({
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

    if (route == "/start") {
      chat_data = [];
    }
    switch (param.key) {
      case "*":
        break;

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
