// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7Clwv":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "038fc58af66516e0";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ('reload' in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === 'undefined' ? typeof browser === 'undefined' ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"giHfk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "status", ()=>status
);
var _helperJs = require("./assets/js/helper.js");
var _dummyDataJs = require("./assets/js/dummy-data.js");
var _peerjs = require("peerjs");
var _scanJs = require("./assets/js/scan.js");
var _minidenticons = require("minidenticons");
var _qrious = require("qrious");
"use strict";
let status = "";
let chat_data = [];
let settings = {
    peerid: "",
    username: ""
};
let lastPeerId = null;
let peer = null;
let conn = null;
const focus_last_article = function() {
    setTimeout(function() {
        let a = document.querySelectorAll("div#app article");
        a[a.length - 1].focus();
    }, 1000);
};
function sendMessage(msg, type) {
    if (conn && conn.open) {
        settings.username;
        if (type == "image") {
            // Encode the file using the FileReader API
            const reader = new FileReader();
            reader.onloadend = ()=>{
                //add image to feed
                let src = URL.createObjectURL(msg.blob);
                chat_data.push({
                    "content": "",
                    "datetime": new Date(),
                    "image": src
                });
                msg = {
                    file: reader.result,
                    filename: msg.filename,
                    filetype: msg.type
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
                text: msg
            };
            chat_data.push({
                "content": msg.text,
                "datetime": new Date()
            });
            conn.send(msg);
            console.log("Sent: " + msg);
            m.redraw();
            focus_last_article();
        }
    } else _helperJs.side_toaster("There is no one connected to the room, you cannot broadcast.", 10000);
}
let list_peers = function() {
    try {
        peer.listAllPeers(function(res) {
            _helperJs.side_toaster(res, 3000);
        });
    } catch (e) {
        _helperJs.side_toaster(e, 3000);
    }
};
function ready() {
    conn.on("data", function(data) {
        if (data.file) chat_data.push({
            "content": "",
            "datetime": new Date(),
            "image": data.file
        });
        if (data.text) chat_data.push({
            "content": data.text,
            "datetime": new Date()
        });
        m.redraw();
        focus_last_article();
    });
    conn.on("close", function() {
        conn = null;
    });
}
function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new _peerjs.Peer(null, {
        debug: 3,
        referrerPolicy: "origin-when-cross-origin",
        initiator: true,
        trickle: false
    });
    peer.on("open", function(id) {
        // Workaround for peer.reconnect deleting previous id
        if (peer.id === null) peer.id = lastPeerId;
        else lastPeerId = peer.id;
        console.log("ID: " + peer.id);
    });
    peer.on("connection", function(c) {
        ready();
    });
    peer.on("disconnected", function() {
        _helperJs.side_toaster("Connection lost. Please reconnect", 4000);
        // Workaround for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on("close", function() {
        _helperJs.side_toaster("Connection destroyed", 4000);
        conn = null;
        console.log("Connection destroyed");
    });
    peer.on("error", function(err) {
        console.log(err);
    });
}
function join(id) {
    // Close old connection
    if (conn) conn.close();
    // Create connection to destination peer specified in the input field
    conn = peer.connect(id, {
        reliable: true
    });
    conn.on("open", function() {
        _helperJs.side_toaster("Connected", 5000);
    });
    // Handle incoming data (messages only since this is the signal sender)
    conn.on("data", function(data) {
        if (data.file) chat_data.push({
            "content": "",
            "datetime": new Date(),
            "image": data.file
        });
        if (data.text) chat_data.push({
            "content": data.text,
            "datetime": new Date()
        });
        m.redraw();
        focus_last_article();
    });
    conn.on("close", function() {
        _helperJs.side_toaster("Connection is closed", 10000);
    });
}
//create peer
let create_peer = function() {
    window.location.replace("#/chat");
    peer = new _peerjs.Peer(null, {
        debug: 3,
        referrerPolicy: "origin-when-cross-origin"
    });
    peer.on("open", function(id) {
        // Workaround for peer.reconnect deleting previous id
        if (peer.id === null) peer.id = lastPeerId;
        else lastPeerId = peer.id;
        console.log("ID: " + peer.id + " " + lastPeerId);
        //make qr code
        var qrs = new QRious();
        qrs.set({
            background: "white",
            foreground: "black",
            level: "H",
            padding: 5,
            size: 200,
            value: lastPeerId
        });
        chat_data.push({
            "content": "room created",
            "datetime": new Date(),
            "image": qrs.toDataURL()
        });
        m.redraw();
    });
    peer.on("connection", function(c) {
        conn = c;
        _helperJs.side_toaster("Connected");
        ready();
    });
    peer.on("disconnected", function() {
        _helperJs.side_toaster("Connection lost. Please reconnect", 3000);
        // Workaround for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on("close", function() {
        conn = null;
        _helperJs.side_toaster("Connection destroyed", 3000);
    });
    peer.on("error", function(err) {
        console.log(err);
    });
};
//connect to peer
let connect_to_peer = function(_id) {
    window.location.replace("#/chat");
    initialize();
    setTimeout(function() {
        join(_id);
    }, 2000);
};
let time_parse = function(value) {
    let t1 = new Date(value);
    return t1.getDate() + " " + _helperJs.month[t1.getMonth()] + " " + t1.getFullYear() + ", " + t1.getHours() + ":" + t1.getMinutes();
};
var root = document.getElementById("app");
var login = {
    view: function() {
        return m("div", {
            class: "flex justify-content-spacearound",
            id: "login"
        }, [
            m("div", {
                class: "item input-parent  flex width-100 justify-content-spacearound",
                tabindex: 0
            }, [
                m("input", {
                    id: "username",
                    placeholder: "username"
                })
            ]),
            m("div", {
                id: "login-icon-box"
            }),
            m("button", {
                class: "item",
                "data-function": "login-check",
                tabindex: 1,
                onclick: function() {
                    settings.username = document.getElementById("username").value;
                    window.location.replace("#/start");
                }
            }, "enter"), 
        ]);
    }
};
var start = {
    view: function() {
        return m("div", {
            class: "flex justify-content-spacearound",
            id: "login"
        }, [
            m("button", {
                class: "item",
                "data-function": "connect-to-peer",
                tabindex: 0
            }, "connect to room by QR-Code"),
            m("button", {
                class: "item",
                "data-function": "create-peer",
                tabindex: 1
            }, "create room"), 
        ]);
    }
};
let t;
var chats = {
    view: function(vnode) {
        return _dummyDataJs.dummy_data.map(function(item, index) {
            return m("div", {
                tabindex: index,
                class: "item",
                "data-function": "open-chat",
                "data-chat-name": item.chat_group
            }, item.chat_group);
        });
    }
};
var chat = {
    view: function(vnode) {
        return chat_data.map(function(item, index) {
            _helperJs.bottom_bar("write", "select", "options");
            return m("article", {
                class: "item",
                tabindex: index
            }, [
                m("div", {
                    class: "flex message-head"
                }, [
                    m("div", time_parse(item.datetime)), 
                ]),
                m("div", {
                    class: "message-main"
                }, item.content),
                m("img", {
                    class: "message-media",
                    src: item.image
                }), 
            ]);
        });
    }
};
var intro = {
    view: function() {
        return m("div", {
            class: "width-100 height-100",
            id: "intro"
        }, [
            m("img", {
                src: "./assets/icons/intro.svg"
            }),
            m("div", {
                class: "width-100",
                id: "version"
            }), 
        ]);
    }
};
setTimeout(function() {
    window.location.replace("#/start");
    document.querySelector("[data-function='connect-to-peer]").focus();
}, 3000);
m.route(root, "/intro", {
    "/intro": intro,
    "/login": login,
    "/start": start,
    "/chats": chats,
    "/chat": chat
});
m.route.prefix = "#";
document.addEventListener("DOMContentLoaded", function(e) {
    _helperJs.bottom_bar("", "", "");
    let write = function() {
        if (document.getElementById("message-input").style.display == "none") {
            document.getElementById("message-input").style.display = "block";
            document.querySelector("div#message-input input").focus();
            _helperJs.bottom_bar("cancel", "send", "attachment");
            status = "write";
        } else {
            document.querySelector("div#message-input input").value = "";
            document.getElementById("message-input").style.display = "none";
            focus_last_article();
            _helperJs.bottom_bar("write", "select", "options");
            status = "";
        }
    };
    /////////////////
    ///NAVIGATION
    /////////////////
    let nav = function(move) {
        if (document.activeElement.nodeName == "SELECT" || document.activeElement.type == "date" || document.activeElement.type == "time") return false;
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
        const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
        document.activeElement.parentNode.scrollBy({
            left: 0,
            top: elY - window.innerHeight / 2,
            behavior: "smooth"
        });
    };
    let handleImage = function(t2) {
        document.querySelector("div#message-input input").value = "";
        document.getElementById("message-input").style.display = "none";
        let a = document.querySelectorAll("div#app article");
        a[a.length - 1].focus();
        _helperJs.bottom_bar("write", "select", "options");
        status = "";
        if (t2 != "") sendMessage(t2, "image");
    };
    // ////////////////////////////
    // //KEYPAD HANDLER////////////
    // ////////////////////////////
    let longpress = false;
    const longpress_timespan = 1000;
    let timeout;
    function repeat_action(param) {
        param.key;
    }
    // ////////////
    // //LONGPRESS
    // ///////////
    function longpress_action(param) {
        switch(param.key){
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
                document.getElementById("login-icon-box").innerHTML = "<identicon-svg username='hasard' saturation='95' lightness='60'>";
            }
            usernameInput.addEventListener("input", function() {
                refresh();
            });
        }
        if (route == "/start") {
            //delete input and data
            document.querySelector("div#message-input input").value = "";
            document.getElementById("message-input").style.display = "none";
            chat_data = [];
        }
        switch(param.key){
            case "*":
                break;
            case "ArrowUp":
                nav(-1);
                break;
            case "ArrowDown":
                nav(1);
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
                if (status == "write") _helperJs.pick_image(handleImage);
                break;
            case "SoftLeft":
            case "Control":
                if (route == "/chat") {
                    write();
                    break;
                }
                break;
            case "Enter":
                if (document.activeElement.classList.contains("input-parent")) document.activeElement.children[0].focus();
                if (document.activeElement.getAttribute("data-function") == "open-chat") {
                    t = document.activeElement.getAttribute("data-chat-name");
                    window.location.replace("#/chat");
                }
                if (document.activeElement.getAttribute("data-function") == "connect-to-peer") {
                    let t3 = function(n) {
                        _scanJs.stop_scan();
                        connect_to_peer(n);
                        chat_data.push({
                            "content": "connected",
                            "datetime": new Date()
                        });
                        m.redraw();
                    };
                    _scanJs.start_scan(t3);
                }
                if (document.activeElement.getAttribute("data-function") == "create-peer") create_peer();
                if (route == "/chat") {
                    if (document.getElementsByTagName("input")[0].value != "") sendMessage(document.getElementsByTagName("input")[0].value, "text");
                    write();
                    break;
                }
                break;
            case "Backspace":
                _scanJs.stop_scan();
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
                _helperJs.bottom_bar("", "", "");
            }
        }
        if (evt.key === "EndCall") {
            evt.preventDefault();
            window.close();
        }
        if (!evt.repeat) {
            longpress = false;
            timeout = setTimeout(()=>{
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
        evt.key == "Backspace" && document.activeElement.tagName;
        clearTimeout(timeout);
        if (!longpress) shortpress_action(evt);
    }
    let handleVisibilityChange = function() {};
    handleVisibilityChange();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange, false);
});

},{"./assets/js/helper.js":"db1Xp","./assets/js/dummy-data.js":"gmFgS","peerjs":"6UUug","./assets/js/scan.js":"6auJa","minidenticons":"iNbej","qrious":"7Zp8Z","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"db1Xp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "month", ()=>month
);
parcelHelpers.export(exports, "sort_array", ()=>sort_array
);
parcelHelpers.export(exports, "validate", ()=>validate
);
parcelHelpers.export(exports, "getManifest", ()=>getManifest
);
parcelHelpers.export(exports, "toaster", ()=>toaster
);
parcelHelpers.export(exports, "side_toaster", ()=>side_toaster
);
parcelHelpers.export(exports, "bottom_bar", ()=>bottom_bar
);
parcelHelpers.export(exports, "top_bar", ()=>top_bar
);
parcelHelpers.export(exports, "pick_image", ()=>pick_image
);
//delete file
parcelHelpers.export(exports, "deleteFile", ()=>deleteFile
);
"use strict";
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
//polyfill
if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
function hashCode(str) {
    var hash = 0;
    for(var i = 0; i < str.length; i++)hash = ~~((hash << 5) - hash + str.charCodeAt(i));
    return hash;
}
function intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
}
function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function share(url) {
    var activity = new MozActivity({
        name: "share",
        data: {
            type: "url",
            url: url
        }
    });
    activity.onsuccess = function() {};
    activity.onerror = function() {
        console.log("The activity encounter en error: " + this.error);
    };
}
//check if internet connection
function check_iconnection() {
    function updateOfflineStatus() {
        toaster("Your Browser is offline", 15000);
        return false;
    }
    window.addEventListener("offline", updateOfflineStatus);
}
function delete_file(filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var request = sdcard[1].delete(filename);
    request.onsuccess = function() {
    //toaster("File deleted", 2000);
    };
    request.onerror = function() {
    //toaster("Unable to delete the file: " + this.error, 2000);
    };
}
function get_file(filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var request = sdcard[1].get(filename);
    request.onsuccess = function() {
        var file = this.result;
    //alert("Get the file: " + file.name);
    };
    request.onerror = function() {
    //alert("Unable to get the file: " + this.error);
    };
}
function write_file(data, filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var file = new Blob([
        data
    ], {
        type: "text/plain"
    });
    var request = sdcard[1].addNamed(file, filename);
    request.onsuccess = function() {
        var name = this.result;
    //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
    };
    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
        toaster("Unable to write the file: " + this.error, 2000);
    };
}
let sort_array = function(arr, item_key, type) {
    if (type == "date") arr.sort((a, b)=>{
        let da = new Date(a[item_key]), db = new Date(b[item_key]);
        return da - db;
    });
    //sort by number
    if (type == "number") arr.sort((a, b)=>{
        return b[item_key] - a[item_key];
    });
    //sort by string
    if (type == "string") arr.sort((a, b)=>{
        let fa = a[item_key].toLowerCase(), fb = b[item_key].toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
    });
};
let uid = function() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
};
let notification = "";
let notify = function(param_title, param_text, param_silent) {
    var options = {
        body: param_text,
        silent: param_silent,
        requireInteraction: false
    };
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") // If it's okay let's create a notification
    notification = new Notification(param_title, options);
    // Otherwise, we need to ask the user for permission
    if (Notification.permission !== "denied") Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") notification = new Notification(param_title, options);
    });
};
//https://notifications.spec.whatwg.org/#dictdef-notificationaction
const pushLocalNotification = function(title, body) {
    window.Notification.requestPermission().then((result)=>{
        var notification1 = new window.Notification(title, {
            body: body
        });
        notification1.onerror = function(err) {
            console.log(err);
        };
        notification1.onclick = function(event) {
            if (window.navigator.mozApps) {
                var request = window.navigator.mozApps.getSelf();
                request.onsuccess = function() {
                    if (request.result) {
                        notification1.close();
                        request.result.launch();
                    }
                };
            } else window.open(document.location.origin, "_blank");
        };
        notification1.onshow = function() {
        // notification.close();
        };
    });
};
function validate(url) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) return true;
    return false;
}
let getManifest = function(callback) {
    if (!navigator.mozApps) //let t = document.getElementById("kaisos-ads");
    //t.remove();
    return false;
    let self = navigator.mozApps.getSelf();
    self.onsuccess = function() {
        callback(self.result);
    };
    self.onerror = function() {};
};
//top toaster
let queue = [];
let timeout;
let toaster = function(text, time) {
    queue.push({
        text: text,
        time: time
    });
    if (queue.length === 1) toast_q(text, time);
};
let toast_q = function(text, time) {
    var x = document.querySelector("div#toast");
    x.innerHTML = queue[0].text;
    x.style.transform = "translate(0px, 0px)";
    timeout = setTimeout(function() {
        timeout = null;
        x.style.transform = "translate(0px, -100px)";
        queue = queue.slice(1);
        if (queue.length > 0) setTimeout(()=>{
            toast_q(text, time);
        }, 1000);
    }, time);
};
//side toaster
let queue_st = [];
let ttimeout;
let side_toaster = function(text, time) {
    queue_st.push({
        text: text,
        time: time
    });
    if (queue_st.length === 1) toast_qq(text, time);
};
let toast_qq = function(text, time) {
    var x = document.querySelector("div#side-toast");
    x.innerHTML = queue_st[0].text;
    x.style.transform = "translate(0vh, 0px)";
    timeout = setTimeout(function() {
        ttimeout = null;
        x.style.transform = "translate(-100vh,0px)";
        queue_st = queue.slice(1);
        if (queue_st.length > 0) setTimeout(()=>{
            toast_qq(text, time);
        }, 1000);
    }, time);
};
let bottom_bar = function(left, center, right) {
    document.querySelector("div#bottom-bar div#button-left").textContent = left;
    document.querySelector("div#bottom-bar div#button-center").textContent = center;
    document.querySelector("div#bottom-bar div#button-right").textContent = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#bottom-bar").style.display = "none";
    else document.querySelector("div#bottom-bar").style.display = "block";
};
let top_bar = function(left, center, right) {
    document.querySelector("div#top-bar div.button-left").innerHTML = left;
    document.querySelector("div#top-bar div.button-center").textContent = center;
    document.querySelector("div#top-bar div.button-right").textContent = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#top-bar").style.display = "none";
    else document.querySelector("div#top-bar").style.display = "block";
};
let add_script = function(script) {
    document.body.appendChild(document.createElement("script")).src = script;
};
let lock;
let screenlock = function(stat) {
    if (typeof window.navigator.requestWakeLock === "undefined") return false;
    if (stat == "lock") {
        lock = window.navigator.requestWakeLock("screen");
        lock.onsuccess = function() {};
        lock.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };
    }
    if (stat == "unlock") {
        if (lock.topic == "screen") lock.unlock();
    }
};
//filesize
function formatFileSize(bytes, decimalPoint) {
    if (bytes || bytes > 0 || bytes != undefined || bytes != NaN) {
        var k = 1000, dm = decimalPoint || 2, sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB",
            "TB",
            "PB",
            "EB",
            "ZB",
            "YB"
        ], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
}
let pick_image = function(cb) {
    var activity = new MozActivity({
        name: "pick",
        data: {
            type: [
                "image/png",
                "image/jpg",
                "image/jpeg"
            ]
        }
    });
    activity.onsuccess = function() {
        let p = this.result;
        cb(p);
    };
    activity.onerror = function() {
        console.log("The activity encouter en error: " + this.error);
    };
};
function deleteFile(storage, path, notification2) {
    let sdcard = navigator.getDeviceStorages("sdcard");
    let requestDel = sdcard[storage].delete(path);
    requestDel.onsuccess = function() {
        if (notification2 == "notification") helper.toaster('File "' + name + '" successfully deleted frome the sdcard storage area');
    };
    requestDel.onerror = function() {
        helper.toaster("Unable to delete the file: " + this.error);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"j7FRh":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"gmFgS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dummy_data", ()=>dummy_data
);
"use strict";
const dummy_data = [
    {
        chat_group: "KaiOs",
        DocumentList: [
            {
                user: "ivan",
                message: "hello",
                time: 1607110465663,
                read: false
            },
            {
                user: "per",
                message: "hello world",
                time: 1607110465663,
                read: true
            }, 
        ]
    },
    {
        chat_group: "bHackers",
        DocumentList: [
            {
                user: "perry",
                message: "hey",
                time: 1607110465663,
                read: false
            },
            {
                user: "northman",
                message: "hey you",
                time: 1651756417,
                read: false
            }, 
        ]
    },
    {
        chat_group: "peerJS",
        DocumentList: [
            {
                user: "perry",
                message: "hey",
                time: 1607110465663,
                read: false
            },
            {
                user: "northman",
                message: "hey you",
                time: 1607110465663,
                read: false
            }, 
        ]
    }, 
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"6UUug":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>$70d766613f57b014$export$2e2bcd8739ae039
);
parcelHelpers.export(exports, "Peer", ()=>$26088d7da5b03f69$export$ecd1fc136c422448
);
parcelHelpers.export(exports, "util", ()=>$06cb531ed7840f78$export$7debb50ef11d5e0b
);
var _peerjsJsBinarypack = require("peerjs-js-binarypack");
var _peerjsJsBinarypackDefault = parcelHelpers.interopDefault(_peerjsJsBinarypack);
var _webrtcAdapter = require("webrtc-adapter");
var _webrtcAdapterDefault = parcelHelpers.interopDefault(_webrtcAdapter);
'use strict';
function $parcel$export(e, n, v, s) {
    Object.defineProperty(e, n, {
        get: v,
        set: s,
        enumerable: true,
        configurable: true
    });
}
var $af8cf1f663f490f4$var$webRTCAdapter = _webrtcAdapterDefault.default.default || _webrtcAdapterDefault.default;
var $af8cf1f663f490f4$export$25be9502477c137d = new /** @class */ (function() {
    function class_1() {
        this.isIOS = [
            "iPad",
            "iPhone",
            "iPod"
        ].includes(navigator.platform);
        this.supportedBrowsers = [
            "firefox",
            "chrome",
            "safari"
        ];
        this.minFirefoxVersion = 59;
        this.minChromeVersion = 72;
        this.minSafariVersion = 605;
    }
    class_1.prototype.isWebRTCSupported = function() {
        return typeof RTCPeerConnection !== "undefined";
    };
    class_1.prototype.isBrowserSupported = function() {
        var browser = this.getBrowser();
        var version = this.getVersion();
        var validBrowser = this.supportedBrowsers.includes(browser);
        if (!validBrowser) return false;
        if (browser === "chrome") return version >= this.minChromeVersion;
        if (browser === "firefox") return version >= this.minFirefoxVersion;
        if (browser === "safari") return !this.isIOS && version >= this.minSafariVersion;
        return false;
    };
    class_1.prototype.getBrowser = function() {
        return $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.browser;
    };
    class_1.prototype.getVersion = function() {
        return $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.version || 0;
    };
    class_1.prototype.isUnifiedPlanSupported = function() {
        var browser = this.getBrowser();
        var version = $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.version || 0;
        if (browser === "chrome" && version < this.minChromeVersion) return false;
        if (browser === "firefox" && version >= this.minFirefoxVersion) return true;
        if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype)) return false;
        var tempPc;
        var supported = false;
        try {
            tempPc = new RTCPeerConnection();
            tempPc.addTransceiver("audio");
            supported = true;
        } catch (e) {} finally{
            if (tempPc) tempPc.close();
        }
        return supported;
    };
    class_1.prototype.toString = function() {
        return "Supports:\n    browser:".concat(this.getBrowser(), "\n    version:").concat(this.getVersion(), "\n    isIOS:").concat(this.isIOS, "\n    isWebRTCSupported:").concat(this.isWebRTCSupported(), "\n    isBrowserSupported:").concat(this.isBrowserSupported(), "\n    isUnifiedPlanSupported:").concat(this.isUnifiedPlanSupported());
    };
    return class_1;
}())();
var $06cb531ed7840f78$var$DEFAULT_CONFIG = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: [
                "turn:eu-0.turn.peerjs.com:3478",
                "turn:eu-1.turn.peerjs.com:3478", 
            ],
            username: "peerjs",
            credential: "peerjsp"
        },
        {
            urls: [
                "turn:us-0.turn.peerjs.com:3478",
                "turn:us-1.turn.peerjs.com:3478", 
            ],
            username: "peerjs",
            credential: "peerjsp"
        }, 
    ],
    sdpSemantics: "unified-plan"
};
var $06cb531ed7840f78$var$Util = /** @class */ function() {
    function Util() {
        this.CLOUD_HOST = "0.peerjs.com";
        this.CLOUD_PORT = 443;
        // Browsers that need chunking:
        this.chunkedBrowsers = {
            Chrome: 1,
            chrome: 1
        };
        this.chunkedMTU = 16300; // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.
        // Returns browser-agnostic default config
        this.defaultConfig = $06cb531ed7840f78$var$DEFAULT_CONFIG;
        this.browser = $af8cf1f663f490f4$export$25be9502477c137d.getBrowser();
        this.browserVersion = $af8cf1f663f490f4$export$25be9502477c137d.getVersion();
        // Lists which features are supported
        this.supports = function() {
            var supported = {
                browser: $af8cf1f663f490f4$export$25be9502477c137d.isBrowserSupported(),
                webRTC: $af8cf1f663f490f4$export$25be9502477c137d.isWebRTCSupported(),
                audioVideo: false,
                data: false,
                binaryBlob: false,
                reliable: false
            };
            if (!supported.webRTC) return supported;
            var pc;
            try {
                pc = new RTCPeerConnection($06cb531ed7840f78$var$DEFAULT_CONFIG);
                supported.audioVideo = true;
                var dc = void 0;
                try {
                    dc = pc.createDataChannel("_PEERJSTEST", {
                        ordered: true
                    });
                    supported.data = true;
                    supported.reliable = !!dc.ordered;
                    // Binary test
                    try {
                        dc.binaryType = "blob";
                        supported.binaryBlob = !$af8cf1f663f490f4$export$25be9502477c137d.isIOS;
                    } catch (e) {}
                } catch (e) {} finally{
                    if (dc) dc.close();
                }
            } catch (e) {} finally{
                if (pc) pc.close();
            }
            return supported;
        }();
        this.pack = _peerjsJsBinarypackDefault.default.pack;
        this.unpack = _peerjsJsBinarypackDefault.default.unpack;
        // Binary stuff
        this._dataCount = 1;
    }
    Util.prototype.noop = function() {};
    // Ensure alphanumeric ids
    Util.prototype.validateId = function(id) {
        // Allow empty ids
        return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
    };
    Util.prototype.chunk = function(blob) {
        var chunks = [];
        var size = blob.size;
        var total = Math.ceil(size / $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU);
        var index = 0;
        var start = 0;
        while(start < size){
            var end = Math.min(size, start + $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU);
            var b = blob.slice(start, end);
            var chunk = {
                __peerData: this._dataCount,
                n: index,
                data: b,
                total: total
            };
            chunks.push(chunk);
            start = end;
            index++;
        }
        this._dataCount++;
        return chunks;
    };
    Util.prototype.blobToArrayBuffer = function(blob, cb) {
        var fr = new FileReader();
        fr.onload = function(evt) {
            if (evt.target) cb(evt.target.result);
        };
        fr.readAsArrayBuffer(blob);
        return fr;
    };
    Util.prototype.binaryStringToArrayBuffer = function(binary) {
        var byteArray = new Uint8Array(binary.length);
        for(var i = 0; i < binary.length; i++)byteArray[i] = binary.charCodeAt(i) & 0xff;
        return byteArray.buffer;
    };
    Util.prototype.randomToken = function() {
        return Math.random().toString(36).slice(2);
    };
    Util.prototype.isSecure = function() {
        return location.protocol === "https:";
    };
    return Util;
}();
var $06cb531ed7840f78$export$7debb50ef11d5e0b = new $06cb531ed7840f78$var$Util();
var $26088d7da5b03f69$exports = {};
$parcel$export($26088d7da5b03f69$exports, "Peer", ()=>$26088d7da5b03f69$export$ecd1fc136c422448
, (v)=>$26088d7da5b03f69$export$ecd1fc136c422448 = v
);
var $ac9b757d51178e15$exports = {};
var $ac9b757d51178e15$var$has = Object.prototype.hasOwnProperty, $ac9b757d51178e15$var$prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function $ac9b757d51178e15$var$Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    $ac9b757d51178e15$var$Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new $ac9b757d51178e15$var$Events().__proto__) $ac9b757d51178e15$var$prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function $ac9b757d51178e15$var$EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function $ac9b757d51178e15$var$addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') throw new TypeError('The listener must be a function');
    var listener = new $ac9b757d51178e15$var$EE(fn, context || emitter, once), evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function $ac9b757d51178e15$var$clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new $ac9b757d51178e15$var$Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function $ac9b757d51178e15$var$EventEmitter() {
    this._events = new $ac9b757d51178e15$var$Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events)if ($ac9b757d51178e15$var$has.call(events, name)) names.push($ac9b757d51178e15$var$prefix ? name.slice(1) : name);
    if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.listeners = function listeners(event) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++)ee[i] = handlers[i].fn;
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
            case 1:
                return listeners.fn.call(listeners.context), true;
            case 2:
                return listeners.fn.call(listeners.context, a1), true;
            case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for(i = 1, args = new Array(len - 1); i < len; i++)args[i - 1] = arguments[i];
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++)args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.on = function on(event, fn, context) {
    return $ac9b757d51178e15$var$addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.once = function once(event, fn, context) {
    return $ac9b757d51178e15$var$addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        $ac9b757d51178e15$var$clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) $ac9b757d51178e15$var$clearEvent(this, evt);
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++)if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else $ac9b757d51178e15$var$clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ $ac9b757d51178e15$var$EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
        if (this._events[evt]) $ac9b757d51178e15$var$clearEvent(this, evt);
    } else {
        this._events = new $ac9b757d51178e15$var$Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
$ac9b757d51178e15$var$EventEmitter.prototype.off = $ac9b757d51178e15$var$EventEmitter.prototype.removeListener;
$ac9b757d51178e15$var$EventEmitter.prototype.addListener = $ac9b757d51178e15$var$EventEmitter.prototype.on;
//
// Expose the prefix.
//
$ac9b757d51178e15$var$EventEmitter.prefixed = $ac9b757d51178e15$var$prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
$ac9b757d51178e15$var$EventEmitter.EventEmitter = $ac9b757d51178e15$var$EventEmitter;
$ac9b757d51178e15$exports = $ac9b757d51178e15$var$EventEmitter;
var $1615705ecc6adca3$exports = {};
$parcel$export($1615705ecc6adca3$exports, "LogLevel", ()=>$1615705ecc6adca3$export$243e62d78d3b544d
, (v)=>$1615705ecc6adca3$export$243e62d78d3b544d = v
);
$parcel$export($1615705ecc6adca3$exports, "default", ()=>$1615705ecc6adca3$export$2e2bcd8739ae039
, (v)=>$1615705ecc6adca3$export$2e2bcd8739ae039 = v
);
var $1615705ecc6adca3$var$__read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $1615705ecc6adca3$var$__spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $1615705ecc6adca3$var$LOG_PREFIX = "PeerJS: ";
var $1615705ecc6adca3$export$243e62d78d3b544d;
(function($1615705ecc6adca3$export$243e62d78d3b544d1) {
    $1615705ecc6adca3$export$243e62d78d3b544d1[$1615705ecc6adca3$export$243e62d78d3b544d1["Disabled"] = 0] = "Disabled";
    $1615705ecc6adca3$export$243e62d78d3b544d1[$1615705ecc6adca3$export$243e62d78d3b544d1["Errors"] = 1] = "Errors";
    $1615705ecc6adca3$export$243e62d78d3b544d1[$1615705ecc6adca3$export$243e62d78d3b544d1["Warnings"] = 2] = "Warnings";
    $1615705ecc6adca3$export$243e62d78d3b544d1[$1615705ecc6adca3$export$243e62d78d3b544d1["All"] = 3] = "All";
})($1615705ecc6adca3$export$243e62d78d3b544d || ($1615705ecc6adca3$export$243e62d78d3b544d = {}));
var $1615705ecc6adca3$var$Logger = /** @class */ function() {
    function Logger() {
        this._logLevel = $1615705ecc6adca3$export$243e62d78d3b544d.Disabled;
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function() {
            return this._logLevel;
        },
        set: function(logLevel) {
            this._logLevel = logLevel;
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.log = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.All) this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([
            $1615705ecc6adca3$export$243e62d78d3b544d.All
        ], $1615705ecc6adca3$var$__read(args), false));
    };
    Logger.prototype.warn = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Warnings) this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([
            $1615705ecc6adca3$export$243e62d78d3b544d.Warnings
        ], $1615705ecc6adca3$var$__read(args), false));
    };
    Logger.prototype.error = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Errors) this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([
            $1615705ecc6adca3$export$243e62d78d3b544d.Errors
        ], $1615705ecc6adca3$var$__read(args), false));
    };
    Logger.prototype.setLogFunction = function(fn) {
        this._print = fn;
    };
    Logger.prototype._print = function(logLevel) {
        var rest = [];
        for(var _i = 1; _i < arguments.length; _i++)rest[_i - 1] = arguments[_i];
        var copy = $1615705ecc6adca3$var$__spreadArray([
            $1615705ecc6adca3$var$LOG_PREFIX
        ], $1615705ecc6adca3$var$__read(rest), false);
        for(var i in copy)if (copy[i] instanceof Error) copy[i] = "(" + copy[i].name + ") " + copy[i].message;
        if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.All) console.log.apply(console, $1615705ecc6adca3$var$__spreadArray([], $1615705ecc6adca3$var$__read(copy), false));
        else if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Warnings) console.warn.apply(console, $1615705ecc6adca3$var$__spreadArray([
            "WARNING"
        ], $1615705ecc6adca3$var$__read(copy), false));
        else if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Errors) console.error.apply(console, $1615705ecc6adca3$var$__spreadArray([
            "ERROR"
        ], $1615705ecc6adca3$var$__read(copy), false));
    };
    return Logger;
}();
var $1615705ecc6adca3$export$2e2bcd8739ae039 = new $1615705ecc6adca3$var$Logger();
var $31d11a8d122cb4b7$exports = {};
$parcel$export($31d11a8d122cb4b7$exports, "Socket", ()=>$31d11a8d122cb4b7$export$4798917dbf149b79
, (v)=>$31d11a8d122cb4b7$export$4798917dbf149b79 = v
);
var $60fadef21a2daafc$export$4aa6b1b0bfb253ab;
(function($60fadef21a2daafc$export$4aa6b1b0bfb253ab1) {
    $60fadef21a2daafc$export$4aa6b1b0bfb253ab1["Open"] = "open";
    $60fadef21a2daafc$export$4aa6b1b0bfb253ab1["Stream"] = "stream";
    $60fadef21a2daafc$export$4aa6b1b0bfb253ab1["Data"] = "data";
    $60fadef21a2daafc$export$4aa6b1b0bfb253ab1["Close"] = "close";
    $60fadef21a2daafc$export$4aa6b1b0bfb253ab1["Error"] = "error";
    $60fadef21a2daafc$export$4aa6b1b0bfb253ab1["IceStateChanged"] = "iceStateChanged";
})($60fadef21a2daafc$export$4aa6b1b0bfb253ab || ($60fadef21a2daafc$export$4aa6b1b0bfb253ab = {}));
var $60fadef21a2daafc$export$3157d57b4135e3bc;
(function($60fadef21a2daafc$export$3157d57b4135e3bc1) {
    $60fadef21a2daafc$export$3157d57b4135e3bc1["Data"] = "data";
    $60fadef21a2daafc$export$3157d57b4135e3bc1["Media"] = "media";
})($60fadef21a2daafc$export$3157d57b4135e3bc || ($60fadef21a2daafc$export$3157d57b4135e3bc = {}));
var $60fadef21a2daafc$export$9547aaa2e39030ff;
(function($60fadef21a2daafc$export$9547aaa2e39030ff1) {
    $60fadef21a2daafc$export$9547aaa2e39030ff1["BrowserIncompatible"] = "browser-incompatible";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["Disconnected"] = "disconnected";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["InvalidID"] = "invalid-id";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["InvalidKey"] = "invalid-key";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["Network"] = "network";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["PeerUnavailable"] = "peer-unavailable";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["SslUnavailable"] = "ssl-unavailable";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["ServerError"] = "server-error";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["SocketError"] = "socket-error";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["SocketClosed"] = "socket-closed";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["UnavailableID"] = "unavailable-id";
    $60fadef21a2daafc$export$9547aaa2e39030ff1["WebRTC"] = "webrtc";
})($60fadef21a2daafc$export$9547aaa2e39030ff || ($60fadef21a2daafc$export$9547aaa2e39030ff = {}));
var $60fadef21a2daafc$export$89f507cf986a947;
(function($60fadef21a2daafc$export$89f507cf986a9471) {
    $60fadef21a2daafc$export$89f507cf986a9471["Binary"] = "binary";
    $60fadef21a2daafc$export$89f507cf986a9471["BinaryUTF8"] = "binary-utf8";
    $60fadef21a2daafc$export$89f507cf986a9471["JSON"] = "json";
})($60fadef21a2daafc$export$89f507cf986a947 || ($60fadef21a2daafc$export$89f507cf986a947 = {}));
var $60fadef21a2daafc$export$3b5c4a4b6354f023;
(function($60fadef21a2daafc$export$3b5c4a4b6354f0231) {
    $60fadef21a2daafc$export$3b5c4a4b6354f0231["Message"] = "message";
    $60fadef21a2daafc$export$3b5c4a4b6354f0231["Disconnected"] = "disconnected";
    $60fadef21a2daafc$export$3b5c4a4b6354f0231["Error"] = "error";
    $60fadef21a2daafc$export$3b5c4a4b6354f0231["Close"] = "close";
})($60fadef21a2daafc$export$3b5c4a4b6354f023 || ($60fadef21a2daafc$export$3b5c4a4b6354f023 = {}));
var $60fadef21a2daafc$export$adb4a1754da6f10d;
(function($60fadef21a2daafc$export$adb4a1754da6f10d1) {
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Heartbeat"] = "HEARTBEAT";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Candidate"] = "CANDIDATE";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Offer"] = "OFFER";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Answer"] = "ANSWER";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Open"] = "OPEN";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Error"] = "ERROR";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["IdTaken"] = "ID-TAKEN";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["InvalidKey"] = "INVALID-KEY";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Leave"] = "LEAVE";
    $60fadef21a2daafc$export$adb4a1754da6f10d1["Expire"] = "EXPIRE";
})($60fadef21a2daafc$export$adb4a1754da6f10d || ($60fadef21a2daafc$export$adb4a1754da6f10d = {}));
var $0d1ed891c5cb27c0$exports = {};
$0d1ed891c5cb27c0$exports = JSON.parse("{\"name\":\"peerjs\",\"version\":\"1.4.5-rc.1\",\"keywords\":[\"peerjs\",\"webrtc\",\"p2p\",\"rtc\"],\"description\":\"PeerJS client\",\"homepage\":\"https://peerjs.com\",\"bugs\":{\"url\":\"https://github.com/peers/peerjs/issues\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/peers/peerjs\"},\"license\":\"MIT\",\"contributors\":[\"Michelle Bu <michelle@michellebu.com>\",\"afrokick <devbyru@gmail.com>\",\"ericz <really.ez@gmail.com>\",\"Jairo <kidandcat@gmail.com>\",\"Jairo Caro-Accino Viciana <jairo@galax.be>\",\"Carlos Caballero <carlos.caballero.gonzalez@gmail.com>\",\"hc <hheennrryy@gmail.com>\",\"Muhammad Asif <capripio@gmail.com>\",\"PrashoonB <prashoonbhattacharjee@gmail.com>\",\"Moritz Stückler <moritz.stueckler@gmail.com>\",\"Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>\",\"akotynski <aleksanderkotbury@gmail.com>\",\"Jairooo <jairocaro@msn.com>\",\"lmb <i@lmb.io>\",\"Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>\",\"Simon <crydotsnakegithub@gmail.com>\",\"Philipp Hancke <fippo@andyet.net>\",\"Matthias Lohr <matthias@lohr.me>\",\"Jess <jessachandler@gmail.com>\",\"khankuan <khankuan@gmail.com>\",\"Denis Lukov <denismassters@gmail.com>\",\"Hans Oksendahl <hansoksendahl@gmail.com>\",\"XiZhao <kwang1imsa@gmail.com>\",\"DUODVK <kurmanov.work@gmail.com>\",\"Sören Balko <Soeren.Balko@gmail.com>\",\"Steve Blaurock <sblaurock@gmail.com>\",\"Yemel Jardi <angel.jardi@gmail.com>\",\"Yuki Ito <yuki@gnnk.net>\",\"alxnull <alxnull@e.mail.de>\",\"bob.barstead@exaptive.com <bob.barstead@exaptive.com>\",\"chandika <chandika@gmail.com>\",\"eddieherm <edhermoso@gmail.com>\",\"emersion <contact@emersion.fr>\",\"fresheneesz <bitetrudpublic@gmail.com>\",\"jasonbarry <jasbarry@me.com>\",\"jonnyf <github@jonathanfoss.co.uk>\",\"=frank tree <=frnktrb@googlemail.com>\",\"xizhao <kevin.wang@cloudera.com>\",\"Alberto Torres <kungfoobar@gmail.com>\",\"Alex Chuev <alex@chuev.com>\",\"Andre Eckardt <aeckardt@outlook.com>\",\"Arpit Solanki <solankiarpit1997@gmail.com>\",\"Artur Zayats <zag2art@gmail.com>\",\"Ben Parnell <benjaminparnell.94@gmail.com>\",\"Benny Lichtner <bennlich@gmail.com>\",\"Chris Cowan <agentme49@gmail.com>\",\"Christopher Van <cvan@users.noreply.github.com>\",\"Diwank Singh Tomer <singh@diwank.name>\",\"Eduardo Pinho <enet4mikeenet@gmail.com>\",\"Evandro Zanatta <ezanatta@tray.net.br>\",\"Gardner Bickford <gardner@users.noreply.github.com>\",\"Gian Luca <gianluca.cecchi@cynny.com>\",\"Hizkia Felix <hizkifw@gmail.com>\",\"Hristo Oskov <hristo.oskov@gmail.com>\",\"Ilya Konanykhin <ilya.konanykhin@gmail.com>\",\"Isaac Madwed <i.madwed@gmail.com>\",\"Jefferson Felix <me@jsfelix.dev>\",\"Jonathan Burke <jonathan.burke.1311@googlemail.com>\",\"Jonathan Mayol <mayoljonathan@gmail.com>\",\"JooYoung <qkdlql@naver.com>\",\"Jordan Austin <jrax86@gmail.com>\",\"Josh Hamit <josh.hamit@gmail.com>\",\"Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>\",\"Kyrylo Shegeda <shegeda@ualberta.ca>\",\"PatrickJS <github@gdi2290.com>\",\"Pepijn de Vos <pepijndevos@gmail.com>\",\"Rolf Erik Lekang <me@rolflekang.com>\"],\"funding\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/peer\"},\"collective\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/peer\"},\"files\":[\"dist/*\"],\"type\":\"module\",\"sideEffects\":[\"lib/global.ts\",\"lib/supports.ts\"],\"main\":\"dist/bundler.cjs\",\"module\":\"dist/bundler.mjs\",\"browser-minified\":\"dist/peerjs.min.cjs\",\"browser-unminified\":\"dist/peerjs.cjs\",\"types\":\"dist/types.d.ts\",\"engines\":{\"node\":\">= 10\"},\"targets\":{\"types\":{\"source\":\"lib/exports.ts\"},\"main\":{\"source\":\"lib/exports.ts\",\"sourceMap\":{\"inlineSources\":true}},\"module\":{\"source\":\"lib/exports.ts\",\"includeNodeModules\":[\"eventemitter3\"],\"sourceMap\":{\"inlineSources\":true}},\"browser-minified\":{\"includeNodeModules\":true,\"context\":\"browser\",\"optimize\":true,\"engines\":{\"browsers\":\"cover 99%, not dead\"},\"source\":\"lib/global.ts\"},\"browser-unminified\":{\"includeNodeModules\":true,\"context\":\"browser\",\"optimize\":false,\"engines\":{\"browsers\":\"cover 99%, not dead\"},\"source\":\"lib/global.ts\"}},\"scripts\":{\"check\":\"tsc --noEmit\",\"watch\":\"parcel watch\",\"build\":\"rm -rf dist && parcel build && cp dist/peerjs.cjs dist/peerjs.js && cp dist/peerjs.min.cjs dist/peerjs.min.js\",\"prepublishOnly\":\"npm run build\",\"test\":\"mocha -r ts-node/register -r jsdom-global/register test/**/*.ts\",\"format\":\"prettier --write .\",\"semantic-release\":\"semantic-release\"},\"devDependencies\":{\"@parcel/config-default\":\"^2.5.0\",\"@parcel/packager-ts\":\"^2.5.0\",\"@parcel/transformer-typescript-tsc\":\"^2.5.0\",\"@parcel/transformer-typescript-types\":\"^2.5.0\",\"@semantic-release/changelog\":\"^6.0.1\",\"@semantic-release/git\":\"^10.0.1\",\"@types/chai\":\"^4.3.0\",\"@types/mocha\":\"^9.1.0\",\"@types/node\":\"^17.0.18\",\"chai\":\"^4.3.6\",\"jsdom\":\"^19.0.0\",\"jsdom-global\":\"^3.0.2\",\"mocha\":\"^9.2.0\",\"mock-socket\":\"8.0.5\",\"parcel\":\"^2.5.0\",\"parcel-transformer-tsc-sourcemaps\":\"^1.0.2\",\"prettier\":\"^2.6.2\",\"semantic-release\":\"^19.0.2\",\"standard\":\"^16.0.4\",\"ts-node\":\"^10.5.0\",\"typescript\":\"^4.5.5\"},\"dependencies\":{\"@swc/helpers\":\"^0.3.13\",\"eventemitter3\":\"^4.0.7\",\"peerjs-js-binarypack\":\"1.0.1\",\"webrtc-adapter\":\"^7.7.1\"}}");
var $31d11a8d122cb4b7$var$__extends = function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $31d11a8d122cb4b7$var$__read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $31d11a8d122cb4b7$var$__spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $31d11a8d122cb4b7$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * An abstraction on top of WebSockets to provide fastest
 * possible connection for peers.
 */ var $31d11a8d122cb4b7$export$4798917dbf149b79 = /** @class */ function(_super) {
    $31d11a8d122cb4b7$var$__extends($31d11a8d122cb4b7$export$4798917dbf149b791, _super);
    function $31d11a8d122cb4b7$export$4798917dbf149b791(secure, host, port, path, key, pingInterval) {
        if (pingInterval === void 0) pingInterval = 5000;
        var _this = _super.call(this) || this;
        _this.pingInterval = pingInterval;
        _this._disconnected = true;
        _this._messagesQueue = [];
        var wsProtocol = secure ? "wss://" : "ws://";
        _this._baseUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
        return _this;
    }
    $31d11a8d122cb4b7$export$4798917dbf149b791.prototype.start = function(id, token) {
        var _this = this;
        this._id = id;
        var wsUrl = "".concat(this._baseUrl, "&id=").concat(id, "&token=").concat(token);
        if (!!this._socket || !this._disconnected) return;
        this._socket = new WebSocket(wsUrl + "&version=" + $0d1ed891c5cb27c0$exports.version);
        this._disconnected = false;
        this._socket.onmessage = function(event) {
            var data;
            try {
                data = JSON.parse(event.data);
                $1615705ecc6adca3$exports.default.log("Server message received:", data);
            } catch (e) {
                $1615705ecc6adca3$exports.default.log("Invalid server message", event.data);
                return;
            }
            _this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Message, data);
        };
        this._socket.onclose = function(event) {
            if (_this._disconnected) return;
            $1615705ecc6adca3$exports.default.log("Socket closed.", event);
            _this._cleanup();
            _this._disconnected = true;
            _this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Disconnected);
        };
        // Take care of the queue of connections if necessary and make sure Peer knows
        // socket is open.
        this._socket.onopen = function() {
            if (_this._disconnected) return;
            _this._sendQueuedMessages();
            $1615705ecc6adca3$exports.default.log("Socket open");
            _this._scheduleHeartbeat();
        };
    };
    $31d11a8d122cb4b7$export$4798917dbf149b791.prototype._scheduleHeartbeat = function() {
        var _this = this;
        this._wsPingTimer = setTimeout(function() {
            _this._sendHeartbeat();
        }, this.pingInterval);
    };
    $31d11a8d122cb4b7$export$4798917dbf149b791.prototype._sendHeartbeat = function() {
        if (!this._wsOpen()) {
            $1615705ecc6adca3$exports.default.log("Cannot send heartbeat, because socket closed");
            return;
        }
        var message = JSON.stringify({
            type: $60fadef21a2daafc$export$adb4a1754da6f10d.Heartbeat
        });
        this._socket.send(message);
        this._scheduleHeartbeat();
    };
    /** Is the websocket currently open? */ $31d11a8d122cb4b7$export$4798917dbf149b791.prototype._wsOpen = function() {
        return !!this._socket && this._socket.readyState === 1;
    };
    /** Send queued messages. */ $31d11a8d122cb4b7$export$4798917dbf149b791.prototype._sendQueuedMessages = function() {
        var e_1, _a;
        //Create copy of queue and clear it,
        //because send method push the message back to queue if smth will go wrong
        var copiedQueue = $31d11a8d122cb4b7$var$__spreadArray([], $31d11a8d122cb4b7$var$__read(this._messagesQueue), false);
        this._messagesQueue = [];
        try {
            for(var copiedQueue_1 = $31d11a8d122cb4b7$var$__values(copiedQueue), copiedQueue_1_1 = copiedQueue_1.next(); !copiedQueue_1_1.done; copiedQueue_1_1 = copiedQueue_1.next()){
                var message = copiedQueue_1_1.value;
                this.send(message);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (copiedQueue_1_1 && !copiedQueue_1_1.done && (_a = copiedQueue_1.return)) _a.call(copiedQueue_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    /** Exposed send for DC & Peer. */ $31d11a8d122cb4b7$export$4798917dbf149b791.prototype.send = function(data) {
        if (this._disconnected) return;
        // If we didn't get an ID yet, we can't yet send anything so we should queue
        // up these messages.
        if (!this._id) {
            this._messagesQueue.push(data);
            return;
        }
        if (!data.type) {
            this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Error, "Invalid message");
            return;
        }
        if (!this._wsOpen()) return;
        var message = JSON.stringify(data);
        this._socket.send(message);
    };
    $31d11a8d122cb4b7$export$4798917dbf149b791.prototype.close = function() {
        if (this._disconnected) return;
        this._cleanup();
        this._disconnected = true;
    };
    $31d11a8d122cb4b7$export$4798917dbf149b791.prototype._cleanup = function() {
        if (this._socket) {
            this._socket.onopen = this._socket.onmessage = this._socket.onclose = null;
            this._socket.close();
            this._socket = undefined;
        }
        clearTimeout(this._wsPingTimer);
    };
    return $31d11a8d122cb4b7$export$4798917dbf149b791;
}($ac9b757d51178e15$exports.EventEmitter);
var $353dee38f9ab557b$exports = {};
$parcel$export($353dee38f9ab557b$exports, "MediaConnection", ()=>$353dee38f9ab557b$export$4a84e95a2324ac29
, (v)=>$353dee38f9ab557b$export$4a84e95a2324ac29 = v
);
var $77f14d3e81888156$exports = {};
$parcel$export($77f14d3e81888156$exports, "Negotiator", ()=>$77f14d3e81888156$export$89e6bb5ad64bf4a
, (v)=>$77f14d3e81888156$export$89e6bb5ad64bf4a = v
);
var $77f14d3e81888156$var$__assign = function() {
    $77f14d3e81888156$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $77f14d3e81888156$var$__assign.apply(this, arguments);
};
var $77f14d3e81888156$var$__awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $77f14d3e81888156$var$__generator = function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
/**
 * Manages all negotiations between Peers.
 */ var $77f14d3e81888156$export$89e6bb5ad64bf4a = /** @class */ function() {
    function $77f14d3e81888156$export$89e6bb5ad64bf4a1(connection) {
        this.connection = connection;
    }
    /** Returns a PeerConnection object set up correctly (for data, media). */ $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype.startConnection = function(options) {
        var peerConnection = this._startPeerConnection();
        // Set the connection's PC.
        this.connection.peerConnection = peerConnection;
        if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media && options._stream) this._addTracksToConnection(options._stream, peerConnection);
        // What do we need to do now?
        if (options.originator) {
            if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
                var dataConnection = this.connection;
                var config = {
                    ordered: !!options.reliable
                };
                var dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
                dataConnection.initialize(dataChannel);
            }
            this._makeOffer();
        } else this.handleSDP("OFFER", options.sdp);
    };
    /** Start a PC. */ $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype._startPeerConnection = function() {
        $1615705ecc6adca3$exports.default.log("Creating RTCPeerConnection.");
        var peerConnection = new RTCPeerConnection(this.connection.provider.options.config);
        this._setupListeners(peerConnection);
        return peerConnection;
    };
    /** Set up various WebRTC listeners. */ $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype._setupListeners = function(peerConnection) {
        var _this = this;
        var peerId = this.connection.peer;
        var connectionId = this.connection.connectionId;
        var connectionType = this.connection.type;
        var provider = this.connection.provider;
        // ICE CANDIDATES.
        $1615705ecc6adca3$exports.default.log("Listening for ICE candidates.");
        peerConnection.onicecandidate = function(evt) {
            if (!evt.candidate || !evt.candidate.candidate) return;
            $1615705ecc6adca3$exports.default.log("Received ICE candidates for ".concat(peerId, ":"), evt.candidate);
            provider.socket.send({
                type: $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate,
                payload: {
                    candidate: evt.candidate,
                    type: connectionType,
                    connectionId: connectionId
                },
                dst: peerId
            });
        };
        peerConnection.oniceconnectionstatechange = function() {
            switch(peerConnection.iceConnectionState){
                case "failed":
                    $1615705ecc6adca3$exports.default.log("iceConnectionState is failed, closing connections to " + peerId);
                    _this.connection.emit($60fadef21a2daafc$export$4aa6b1b0bfb253ab.Error, new Error("Negotiation of connection to " + peerId + " failed."));
                    _this.connection.close();
                    break;
                case "closed":
                    $1615705ecc6adca3$exports.default.log("iceConnectionState is closed, closing connections to " + peerId);
                    _this.connection.emit($60fadef21a2daafc$export$4aa6b1b0bfb253ab.Error, new Error("Connection to " + peerId + " closed."));
                    _this.connection.close();
                    break;
                case "disconnected":
                    $1615705ecc6adca3$exports.default.log("iceConnectionState changed to disconnected on the connection with " + peerId);
                    break;
                case "completed":
                    peerConnection.onicecandidate = $06cb531ed7840f78$export$7debb50ef11d5e0b.noop;
                    break;
            }
            _this.connection.emit($60fadef21a2daafc$export$4aa6b1b0bfb253ab.IceStateChanged, peerConnection.iceConnectionState);
        };
        // DATACONNECTION.
        $1615705ecc6adca3$exports.default.log("Listening for data channel");
        // Fired between offer and answer, so options should already be saved
        // in the options hash.
        peerConnection.ondatachannel = function(evt) {
            $1615705ecc6adca3$exports.default.log("Received data channel");
            var dataChannel = evt.channel;
            var connection = provider.getConnection(peerId, connectionId);
            connection.initialize(dataChannel);
        };
        // MEDIACONNECTION.
        $1615705ecc6adca3$exports.default.log("Listening for remote stream");
        peerConnection.ontrack = function(evt) {
            $1615705ecc6adca3$exports.default.log("Received remote stream");
            var stream = evt.streams[0];
            var connection = provider.getConnection(peerId, connectionId);
            if (connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media) {
                var mediaConnection = connection;
                _this._addStreamToMediaConnection(stream, mediaConnection);
            }
        };
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype.cleanup = function() {
        $1615705ecc6adca3$exports.default.log("Cleaning up PeerConnection to " + this.connection.peer);
        var peerConnection = this.connection.peerConnection;
        if (!peerConnection) return;
        this.connection.peerConnection = null;
        //unsubscribe from all PeerConnection's events
        peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = function() {};
        var peerConnectionNotClosed = peerConnection.signalingState !== "closed";
        var dataChannelNotClosed = false;
        if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
            var dataConnection = this.connection;
            var dataChannel = dataConnection.dataChannel;
            if (dataChannel) dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
        }
        if (peerConnectionNotClosed || dataChannelNotClosed) peerConnection.close();
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype._makeOffer = function() {
        return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, offer, payload, dataConnection, err_2, err_1_1;
            return $77f14d3e81888156$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            7,
                            ,
                            8
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.createOffer(this.connection.options.constraints)
                        ];
                    case 2:
                        offer = _a.sent();
                        $1615705ecc6adca3$exports.default.log("Created offer.");
                        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([
                            3,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setLocalDescription(offer)
                        ];
                    case 4:
                        _a.sent();
                        $1615705ecc6adca3$exports.default.log("Set localDescription:", offer, "for:".concat(this.connection.peer));
                        payload = {
                            sdp: offer,
                            type: this.connection.type,
                            connectionId: this.connection.connectionId,
                            metadata: this.connection.metadata,
                            browser: $06cb531ed7840f78$export$7debb50ef11d5e0b.browser
                        };
                        if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
                            dataConnection = this.connection;
                            payload = $77f14d3e81888156$var$__assign($77f14d3e81888156$var$__assign({}, payload), {
                                label: dataConnection.label,
                                reliable: dataConnection.reliable,
                                serialization: dataConnection.serialization
                            });
                        }
                        provider.socket.send({
                            type: $60fadef21a2daafc$export$adb4a1754da6f10d.Offer,
                            payload: payload,
                            dst: this.connection.peer
                        });
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_2 = _a.sent();
                        // TODO: investigate why _makeOffer is being called from the answer
                        if (err_2 != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
                            provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_2);
                            $1615705ecc6adca3$exports.default.log("Failed to setLocalDescription, ", err_2);
                        }
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 7:
                        err_1_1 = _a.sent();
                        provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_1_1);
                        $1615705ecc6adca3$exports.default.log("Failed to createOffer, ", err_1_1);
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 8:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype._makeAnswer = function() {
        return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, answer, err_3, err_1_2;
            return $77f14d3e81888156$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            7,
                            ,
                            8
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.createAnswer()
                        ];
                    case 2:
                        answer = _a.sent();
                        $1615705ecc6adca3$exports.default.log("Created answer.");
                        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([
                            3,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setLocalDescription(answer)
                        ];
                    case 4:
                        _a.sent();
                        $1615705ecc6adca3$exports.default.log("Set localDescription:", answer, "for:".concat(this.connection.peer));
                        provider.socket.send({
                            type: $60fadef21a2daafc$export$adb4a1754da6f10d.Answer,
                            payload: {
                                sdp: answer,
                                type: this.connection.type,
                                connectionId: this.connection.connectionId,
                                browser: $06cb531ed7840f78$export$7debb50ef11d5e0b.browser
                            },
                            dst: this.connection.peer
                        });
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_3 = _a.sent();
                        provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_3);
                        $1615705ecc6adca3$exports.default.log("Failed to setLocalDescription, ", err_3);
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 7:
                        err_1_2 = _a.sent();
                        provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_1_2);
                        $1615705ecc6adca3$exports.default.log("Failed to create answer, ", err_1_2);
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 8:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** Handle an SDP. */ $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype.handleSDP = function(type, sdp) {
        return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, self, err_4;
            return $77f14d3e81888156$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        sdp = new RTCSessionDescription(sdp);
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        $1615705ecc6adca3$exports.default.log("Setting remote description", sdp);
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setRemoteDescription(sdp)
                        ];
                    case 2:
                        _a.sent();
                        $1615705ecc6adca3$exports.default.log("Set remoteDescription:".concat(type, " for:").concat(this.connection.peer));
                        if (!(type === "OFFER")) return [
                            3 /*break*/ ,
                            4
                        ];
                        return [
                            4 /*yield*/ ,
                            self._makeAnswer()
                        ];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_4 = _a.sent();
                        provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_4);
                        $1615705ecc6adca3$exports.default.log("Failed to setRemoteDescription, ", err_4);
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** Handle a candidate. */ $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype.handleCandidate = function(ice) {
        return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function() {
            var candidate, sdpMLineIndex, sdpMid, peerConnection, provider, err_5;
            return $77f14d3e81888156$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        $1615705ecc6adca3$exports.default.log("handleCandidate:", ice);
                        candidate = ice.candidate;
                        sdpMLineIndex = ice.sdpMLineIndex;
                        sdpMid = ice.sdpMid;
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.addIceCandidate(new RTCIceCandidate({
                                sdpMid: sdpMid,
                                sdpMLineIndex: sdpMLineIndex,
                                candidate: candidate
                            }))
                        ];
                    case 2:
                        _a.sent();
                        $1615705ecc6adca3$exports.default.log("Added ICE candidate for:".concat(this.connection.peer));
                        return [
                            3 /*break*/ ,
                            4
                        ];
                    case 3:
                        err_5 = _a.sent();
                        provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_5);
                        $1615705ecc6adca3$exports.default.log("Failed to handleCandidate, ", err_5);
                        return [
                            3 /*break*/ ,
                            4
                        ];
                    case 4:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype._addTracksToConnection = function(stream, peerConnection) {
        $1615705ecc6adca3$exports.default.log("add tracks from stream ".concat(stream.id, " to peer connection"));
        if (!peerConnection.addTrack) return $1615705ecc6adca3$exports.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
        stream.getTracks().forEach(function(track) {
            peerConnection.addTrack(track, stream);
        });
    };
    $77f14d3e81888156$export$89e6bb5ad64bf4a1.prototype._addStreamToMediaConnection = function(stream, mediaConnection) {
        $1615705ecc6adca3$exports.default.log("add stream ".concat(stream.id, " to media connection ").concat(mediaConnection.connectionId));
        mediaConnection.addStream(stream);
    };
    return $77f14d3e81888156$export$89e6bb5ad64bf4a1;
}();
var $0b3b332fd86c5202$exports = {};
$parcel$export($0b3b332fd86c5202$exports, "BaseConnection", ()=>$0b3b332fd86c5202$export$23a2a68283c24d80
, (v)=>$0b3b332fd86c5202$export$23a2a68283c24d80 = v
);
var $0b3b332fd86c5202$var$__extends = function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $0b3b332fd86c5202$export$23a2a68283c24d80 = /** @class */ function(_super) {
    $0b3b332fd86c5202$var$__extends($0b3b332fd86c5202$export$23a2a68283c24d801, _super);
    function $0b3b332fd86c5202$export$23a2a68283c24d801(peer, provider, options) {
        var _this = _super.call(this) || this;
        _this.peer = peer;
        _this.provider = provider;
        _this.options = options;
        _this._open = false;
        _this.metadata = options.metadata;
        return _this;
    }
    Object.defineProperty($0b3b332fd86c5202$export$23a2a68283c24d801.prototype, "open", {
        get: function() {
            return this._open;
        },
        enumerable: false,
        configurable: true
    });
    return $0b3b332fd86c5202$export$23a2a68283c24d801;
}($ac9b757d51178e15$exports.EventEmitter);
var $353dee38f9ab557b$var$__extends = function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $353dee38f9ab557b$var$__assign = function() {
    $353dee38f9ab557b$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $353dee38f9ab557b$var$__assign.apply(this, arguments);
};
var $353dee38f9ab557b$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps the streaming interface between two Peers.
 */ var $353dee38f9ab557b$export$4a84e95a2324ac29 = /** @class */ function(_super) {
    $353dee38f9ab557b$var$__extends($353dee38f9ab557b$export$4a84e95a2324ac291, _super);
    function $353dee38f9ab557b$export$4a84e95a2324ac291(peerId, provider, options) {
        var _this = _super.call(this, peerId, provider, options) || this;
        _this._localStream = _this.options._stream;
        _this.connectionId = _this.options.connectionId || $353dee38f9ab557b$export$4a84e95a2324ac291.ID_PREFIX + $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken();
        _this._negotiator = new $77f14d3e81888156$exports.Negotiator(_this);
        if (_this._localStream) _this._negotiator.startConnection({
            _stream: _this._localStream,
            originator: true
        });
        return _this;
    }
    Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac291.prototype, "type", {
        get: function() {
            return $60fadef21a2daafc$export$3157d57b4135e3bc.Media;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac291.prototype, "localStream", {
        get: function() {
            return this._localStream;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac291.prototype, "remoteStream", {
        get: function() {
            return this._remoteStream;
        },
        enumerable: false,
        configurable: true
    });
    $353dee38f9ab557b$export$4a84e95a2324ac291.prototype.addStream = function(remoteStream) {
        $1615705ecc6adca3$exports.default.log("Receiving stream", remoteStream);
        this._remoteStream = remoteStream;
        _super.prototype.emit.call(this, $60fadef21a2daafc$export$4aa6b1b0bfb253ab.Stream, remoteStream); // Should we call this `open`?
    };
    $353dee38f9ab557b$export$4a84e95a2324ac291.prototype.handleMessage = function(message) {
        var type = message.type;
        var payload = message.payload;
        switch(message.type){
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Answer:
                // Forward to negotiator
                this._negotiator.handleSDP(type, payload.sdp);
                this._open = true;
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate:
                this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                $1615705ecc6adca3$exports.default.warn("Unrecognized message type:".concat(type, " from peer:").concat(this.peer));
                break;
        }
    };
    $353dee38f9ab557b$export$4a84e95a2324ac291.prototype.answer = function(stream, options) {
        var e_1, _a;
        if (options === void 0) options = {};
        if (this._localStream) {
            $1615705ecc6adca3$exports.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
            return;
        }
        this._localStream = stream;
        if (options && options.sdpTransform) this.options.sdpTransform = options.sdpTransform;
        this._negotiator.startConnection($353dee38f9ab557b$var$__assign($353dee38f9ab557b$var$__assign({}, this.options._payload), {
            _stream: stream
        }));
        // Retrieve lost messages stored because PeerConnection not set up.
        var messages = this.provider._getMessages(this.connectionId);
        try {
            for(var messages_1 = $353dee38f9ab557b$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                var message = messages_1_1.value;
                this.handleMessage(message);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        this._open = true;
    };
    /**
     * Exposed functionality for users.
     */ /** Allows user to close connection. */ $353dee38f9ab557b$export$4a84e95a2324ac291.prototype.close = function() {
        if (this._negotiator) {
            this._negotiator.cleanup();
            this._negotiator = null;
        }
        this._localStream = null;
        this._remoteStream = null;
        if (this.provider) {
            this.provider._removeConnection(this);
            this.provider = null;
        }
        if (this.options && this.options._stream) this.options._stream = null;
        if (!this.open) return;
        this._open = false;
        _super.prototype.emit.call(this, $60fadef21a2daafc$export$4aa6b1b0bfb253ab.Close);
    };
    $353dee38f9ab557b$export$4a84e95a2324ac291.ID_PREFIX = "mc_";
    return $353dee38f9ab557b$export$4a84e95a2324ac291;
}($0b3b332fd86c5202$exports.BaseConnection);
var $3356170d7bce7f20$exports = {};
$parcel$export($3356170d7bce7f20$exports, "DataConnection", ()=>$3356170d7bce7f20$export$d365f7ad9d7df9c9
, (v)=>$3356170d7bce7f20$export$d365f7ad9d7df9c9 = v
);
var $3014d862dcc9946b$exports = {};
$parcel$export($3014d862dcc9946b$exports, "EncodingQueue", ()=>$3014d862dcc9946b$export$c6913ae0ed687038
, (v)=>$3014d862dcc9946b$export$c6913ae0ed687038 = v
);
var $3014d862dcc9946b$var$__extends = function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $3014d862dcc9946b$export$c6913ae0ed687038 = /** @class */ function(_super) {
    $3014d862dcc9946b$var$__extends($3014d862dcc9946b$export$c6913ae0ed6870381, _super);
    function $3014d862dcc9946b$export$c6913ae0ed6870381() {
        var _this = _super.call(this) || this;
        _this.fileReader = new FileReader();
        _this._queue = [];
        _this._processing = false;
        _this.fileReader.onload = function(evt) {
            _this._processing = false;
            if (evt.target) _this.emit("done", evt.target.result);
            _this.doNextTask();
        };
        _this.fileReader.onerror = function(evt) {
            $1615705ecc6adca3$exports.default.error("EncodingQueue error:", evt);
            _this._processing = false;
            _this.destroy();
            _this.emit("error", evt);
        };
        return _this;
    }
    Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed6870381.prototype, "queue", {
        get: function() {
            return this._queue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed6870381.prototype, "size", {
        get: function() {
            return this.queue.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed6870381.prototype, "processing", {
        get: function() {
            return this._processing;
        },
        enumerable: false,
        configurable: true
    });
    $3014d862dcc9946b$export$c6913ae0ed6870381.prototype.enque = function(blob) {
        this.queue.push(blob);
        if (this.processing) return;
        this.doNextTask();
    };
    $3014d862dcc9946b$export$c6913ae0ed6870381.prototype.destroy = function() {
        this.fileReader.abort();
        this._queue = [];
    };
    $3014d862dcc9946b$export$c6913ae0ed6870381.prototype.doNextTask = function() {
        if (this.size === 0) return;
        if (this.processing) return;
        this._processing = true;
        this.fileReader.readAsArrayBuffer(this.queue.shift());
    };
    return $3014d862dcc9946b$export$c6913ae0ed6870381;
}($ac9b757d51178e15$exports.EventEmitter);
var $3356170d7bce7f20$var$__extends = function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $3356170d7bce7f20$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps a DataChannel between two Peers.
 */ var $3356170d7bce7f20$export$d365f7ad9d7df9c9 = /** @class */ function(_super) {
    $3356170d7bce7f20$var$__extends($3356170d7bce7f20$export$d365f7ad9d7df9c91, _super);
    function $3356170d7bce7f20$export$d365f7ad9d7df9c91(peerId, provider, options) {
        var _this = _super.call(this, peerId, provider, options) || this;
        _this.stringify = JSON.stringify;
        _this.parse = JSON.parse;
        _this._buffer = [];
        _this._bufferSize = 0;
        _this._buffering = false;
        _this._chunkedData = {};
        _this._encodingQueue = new $3014d862dcc9946b$exports.EncodingQueue();
        _this.connectionId = _this.options.connectionId || $3356170d7bce7f20$export$d365f7ad9d7df9c91.ID_PREFIX + $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken();
        _this.label = _this.options.label || _this.connectionId;
        _this.serialization = _this.options.serialization || $60fadef21a2daafc$export$89f507cf986a947.Binary;
        _this.reliable = !!_this.options.reliable;
        _this._encodingQueue.on("done", function(ab) {
            _this._bufferedSend(ab);
        });
        _this._encodingQueue.on("error", function() {
            $1615705ecc6adca3$exports.default.error("DC#".concat(_this.connectionId, ": Error occured in encoding from blob to arraybuffer, close DC"));
            _this.close();
        });
        _this._negotiator = new $77f14d3e81888156$exports.Negotiator(_this);
        _this._negotiator.startConnection(_this.options._payload || {
            originator: true
        });
        return _this;
    }
    Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype, "type", {
        get: function() {
            return $60fadef21a2daafc$export$3157d57b4135e3bc.Data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype, "dataChannel", {
        get: function() {
            return this._dc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype, "bufferSize", {
        get: function() {
            return this._bufferSize;
        },
        enumerable: false,
        configurable: true
    });
    /** Called by the Negotiator when the DataChannel is ready. */ $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype.initialize = function(dc) {
        this._dc = dc;
        this._configureDataChannel();
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype._configureDataChannel = function() {
        var _this = this;
        if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.binaryBlob || $06cb531ed7840f78$export$7debb50ef11d5e0b.supports.reliable) this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onopen = function() {
            $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc connection success"));
            _this._open = true;
            _this.emit($60fadef21a2daafc$export$4aa6b1b0bfb253ab.Open);
        };
        this.dataChannel.onmessage = function(e) {
            $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc onmessage:"), e.data);
            _this._handleDataMessage(e);
        };
        this.dataChannel.onclose = function() {
            $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer);
            _this.close();
        };
    };
    // Handles a DataChannel message.
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype._handleDataMessage = function(_a) {
        var _this = this;
        var data = _a.data;
        var datatype = data.constructor;
        var isBinarySerialization = this.serialization === $60fadef21a2daafc$export$89f507cf986a947.Binary || this.serialization === $60fadef21a2daafc$export$89f507cf986a947.BinaryUTF8;
        var deserializedData = data;
        if (isBinarySerialization) {
            if (datatype === Blob) {
                // Datatype should never be blob
                $06cb531ed7840f78$export$7debb50ef11d5e0b.blobToArrayBuffer(data, function(ab) {
                    var unpackedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(ab);
                    _this.emit($60fadef21a2daafc$export$4aa6b1b0bfb253ab.Data, unpackedData);
                });
                return;
            } else if (datatype === ArrayBuffer) deserializedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(data);
            else if (datatype === String) {
                // String fallback for binary data for browsers that don't support binary yet
                var ab1 = $06cb531ed7840f78$export$7debb50ef11d5e0b.binaryStringToArrayBuffer(data);
                deserializedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(ab1);
            }
        } else if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.JSON) deserializedData = this.parse(data);
        // Check if we've chunked--if so, piece things back together.
        // We're guaranteed that this isn't 0.
        if (deserializedData.__peerData) {
            this._handleChunk(deserializedData);
            return;
        }
        _super.prototype.emit.call(this, $60fadef21a2daafc$export$4aa6b1b0bfb253ab.Data, deserializedData);
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype._handleChunk = function(data) {
        var id = data.__peerData;
        var chunkInfo = this._chunkedData[id] || {
            data: [],
            count: 0,
            total: data.total
        };
        chunkInfo.data[data.n] = data.data;
        chunkInfo.count++;
        this._chunkedData[id] = chunkInfo;
        if (chunkInfo.total === chunkInfo.count) {
            // Clean up before making the recursive call to `_handleDataMessage`.
            delete this._chunkedData[id];
            // We've received all the chunks--time to construct the complete data.
            var data_1 = new Blob(chunkInfo.data);
            this._handleDataMessage({
                data: data_1
            });
        }
    };
    /**
     * Exposed functionality for users.
     */ /** Allows user to close connection. */ $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype.close = function() {
        this._buffer = [];
        this._bufferSize = 0;
        this._chunkedData = {};
        if (this._negotiator) {
            this._negotiator.cleanup();
            this._negotiator = null;
        }
        if (this.provider) {
            this.provider._removeConnection(this);
            this.provider = null;
        }
        if (this.dataChannel) {
            this.dataChannel.onopen = null;
            this.dataChannel.onmessage = null;
            this.dataChannel.onclose = null;
            this._dc = null;
        }
        if (this._encodingQueue) {
            this._encodingQueue.destroy();
            this._encodingQueue.removeAllListeners();
            this._encodingQueue = null;
        }
        if (!this.open) return;
        this._open = false;
        _super.prototype.emit.call(this, $60fadef21a2daafc$export$4aa6b1b0bfb253ab.Close);
    };
    /** Allows user to send data. */ $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype.send = function(data, chunked) {
        if (!this.open) {
            _super.prototype.emit.call(this, $60fadef21a2daafc$export$4aa6b1b0bfb253ab.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."));
            return;
        }
        if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.JSON) this._bufferedSend(this.stringify(data));
        else if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.Binary || this.serialization === $60fadef21a2daafc$export$89f507cf986a947.BinaryUTF8) {
            var blob = $06cb531ed7840f78$export$7debb50ef11d5e0b.pack(data);
            if (!chunked && blob.size > $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU) {
                this._sendChunks(blob);
                return;
            }
            if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.binaryBlob) // because this conversion is costly.
            this._encodingQueue.enque(blob);
            else this._bufferedSend(blob);
        } else this._bufferedSend(data);
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype._bufferedSend = function(msg) {
        if (this._buffering || !this._trySend(msg)) {
            this._buffer.push(msg);
            this._bufferSize = this._buffer.length;
        }
    };
    // Returns true if the send succeeds.
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype._trySend = function(msg) {
        var _this = this;
        if (!this.open) return false;
        if (this.dataChannel.bufferedAmount > $3356170d7bce7f20$export$d365f7ad9d7df9c91.MAX_BUFFERED_AMOUNT) {
            this._buffering = true;
            setTimeout(function() {
                _this._buffering = false;
                _this._tryBuffer();
            }, 50);
            return false;
        }
        try {
            this.dataChannel.send(msg);
        } catch (e) {
            $1615705ecc6adca3$exports.default.error("DC#:".concat(this.connectionId, " Error when sending:"), e);
            this._buffering = true;
            this.close();
            return false;
        }
        return true;
    };
    // Try to send the first message in the buffer.
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype._tryBuffer = function() {
        if (!this.open) return;
        if (this._buffer.length === 0) return;
        var msg = this._buffer[0];
        if (this._trySend(msg)) {
            this._buffer.shift();
            this._bufferSize = this._buffer.length;
            this._tryBuffer();
        }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype._sendChunks = function(blob) {
        var e_1, _a;
        var blobs = $06cb531ed7840f78$export$7debb50ef11d5e0b.chunk(blob);
        $1615705ecc6adca3$exports.default.log("DC#".concat(this.connectionId, " Try to send ").concat(blobs.length, " chunks..."));
        try {
            for(var blobs_1 = $3356170d7bce7f20$var$__values(blobs), blobs_1_1 = blobs_1.next(); !blobs_1_1.done; blobs_1_1 = blobs_1.next()){
                var blob_1 = blobs_1_1.value;
                this.send(blob_1, true);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return)) _a.call(blobs_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.prototype.handleMessage = function(message) {
        var payload = message.payload;
        switch(message.type){
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Answer:
                this._negotiator.handleSDP(message.type, payload.sdp);
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate:
                this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                $1615705ecc6adca3$exports.default.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
                break;
        }
    };
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.ID_PREFIX = "dc_";
    $3356170d7bce7f20$export$d365f7ad9d7df9c91.MAX_BUFFERED_AMOUNT = 8388608;
    return $3356170d7bce7f20$export$d365f7ad9d7df9c91;
}($0b3b332fd86c5202$exports.BaseConnection);
var $9e85b3e1327369e6$exports = {};
$parcel$export($9e85b3e1327369e6$exports, "API", ()=>$9e85b3e1327369e6$export$2c4e825dc9120f87
, (v)=>$9e85b3e1327369e6$export$2c4e825dc9120f87 = v
);
var $9e85b3e1327369e6$var$__awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $9e85b3e1327369e6$var$__generator = function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $9e85b3e1327369e6$export$2c4e825dc9120f87 = /** @class */ function() {
    function $9e85b3e1327369e6$export$2c4e825dc9120f871(_options) {
        this._options = _options;
    }
    $9e85b3e1327369e6$export$2c4e825dc9120f871.prototype._buildRequest = function(method) {
        var protocol = this._options.secure ? "https" : "http";
        var _a = this._options, host = _a.host, port = _a.port, path = _a.path, key = _a.key;
        var url = new URL("".concat(protocol, "://").concat(host, ":").concat(port).concat(path).concat(key, "/").concat(method));
        // TODO: Why timestamp, why random?
        url.searchParams.set("ts", "".concat(Date.now()).concat(Math.random()));
        url.searchParams.set("version", $0d1ed891c5cb27c0$exports.version);
        return fetch(url.href, {
            referrerPolicy: this._options.referrerPolicy
        });
    };
    /** Get a unique ID from the server via XHR and initialize with it. */ $9e85b3e1327369e6$export$2c4e825dc9120f871.prototype.retrieveId = function() {
        return $9e85b3e1327369e6$var$__awaiter(this, void 0, Promise, function() {
            var response, error_1, pathError;
            return $9e85b3e1327369e6$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        _a.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4 /*yield*/ ,
                            this._buildRequest("id")
                        ];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) throw new Error("Error. Status:".concat(response.status));
                        return [
                            2 /*return*/ ,
                            response.text()
                        ];
                    case 2:
                        error_1 = _a.sent();
                        $1615705ecc6adca3$exports.default.error("Error retrieving ID", error_1);
                        pathError = "";
                        if (this._options.path === "/" && this._options.host !== $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
                        throw new Error("Could not get an ID from the server." + pathError);
                    case 3:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** @deprecated */ $9e85b3e1327369e6$export$2c4e825dc9120f871.prototype.listAllPeers = function() {
        return $9e85b3e1327369e6$var$__awaiter(this, void 0, Promise, function() {
            var response, helpfulError, error_2;
            return $9e85b3e1327369e6$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        _a.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4 /*yield*/ ,
                            this._buildRequest("peers")
                        ];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            if (response.status === 401) {
                                helpfulError = "";
                                if (this._options.host === $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";
                                else helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
                                throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
                            }
                            throw new Error("Error. Status:".concat(response.status));
                        }
                        return [
                            2 /*return*/ ,
                            response.json()
                        ];
                    case 2:
                        error_2 = _a.sent();
                        $1615705ecc6adca3$exports.default.error("Error retrieving list peers", error_2);
                        throw new Error("Could not get list peers from the server." + error_2);
                    case 3:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    return $9e85b3e1327369e6$export$2c4e825dc9120f871;
}();
var $26088d7da5b03f69$var$__extends = function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $26088d7da5b03f69$var$__assign = function() {
    $26088d7da5b03f69$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $26088d7da5b03f69$var$__assign.apply(this, arguments);
};
var $26088d7da5b03f69$var$__values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $26088d7da5b03f69$var$__read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $26088d7da5b03f69$var$PeerOptions = /** @class */ function() {
    function PeerOptions() {}
    return PeerOptions;
}();
/**
 * A peer who can initiate connections with other peers.
 */ var $26088d7da5b03f69$export$ecd1fc136c422448 = /** @class */ function(_super) {
    $26088d7da5b03f69$var$__extends($26088d7da5b03f69$export$ecd1fc136c4224481, _super);
    function $26088d7da5b03f69$export$ecd1fc136c4224481(id1, options) {
        var _this = _super.call(this) || this;
        _this._id = null;
        _this._lastServerId = null;
        // States.
        _this._destroyed = false; // Connections have been killed
        _this._disconnected = false; // Connection to PeerServer killed but P2P connections still active
        _this._open = false; // Sockets and such are not yet open.
        _this._connections = new Map(); // All connections for this peer.
        _this._lostMessages = new Map(); // src => [list of messages]
        var userId;
        // Deal with overloading
        if (id1 && id1.constructor == Object) options = id1;
        else if (id1) userId = id1.toString();
        // Configurize options
        options = $26088d7da5b03f69$var$__assign({
            debug: 0,
            host: $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST,
            port: $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_PORT,
            path: "/",
            key: $26088d7da5b03f69$export$ecd1fc136c4224481.DEFAULT_KEY,
            token: $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken(),
            config: $06cb531ed7840f78$export$7debb50ef11d5e0b.defaultConfig,
            referrerPolicy: "strict-origin-when-cross-origin"
        }, options);
        _this._options = options;
        // Detect relative URL host.
        if (_this._options.host === "/") _this._options.host = window.location.hostname;
        // Set path correctly.
        if (_this._options.path) {
            if (_this._options.path[0] !== "/") _this._options.path = "/" + _this._options.path;
            if (_this._options.path[_this._options.path.length - 1] !== "/") _this._options.path += "/";
        }
        // Set whether we use SSL to same as current host
        if (_this._options.secure === undefined && _this._options.host !== $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) _this._options.secure = $06cb531ed7840f78$export$7debb50ef11d5e0b.isSecure();
        else if (_this._options.host == $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) _this._options.secure = true;
        // Set a custom log function if present
        if (_this._options.logFunction) $1615705ecc6adca3$exports.default.setLogFunction(_this._options.logFunction);
        $1615705ecc6adca3$exports.default.logLevel = _this._options.debug || 0;
        _this._api = new $9e85b3e1327369e6$exports.API(options);
        _this._socket = _this._createServerConnection();
        // Sanity checks
        // Ensure WebRTC supported
        if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.audioVideo && !$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.data) {
            _this._delayedAbort($60fadef21a2daafc$export$9547aaa2e39030ff.BrowserIncompatible, "The current browser does not support WebRTC");
            return _this;
        }
        // Ensure alphanumeric id
        if (!!userId && !$06cb531ed7840f78$export$7debb50ef11d5e0b.validateId(userId)) {
            _this._delayedAbort($60fadef21a2daafc$export$9547aaa2e39030ff.InvalidID, "ID \"".concat(userId, "\" is invalid"));
            return _this;
        }
        if (userId) _this._initialize(userId);
        else _this._api.retrieveId().then(function(id) {
            return _this._initialize(id);
        }).catch(function(error) {
            return _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, error);
        });
        return _this;
    }
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224481.prototype, "id", {
        /**
         * The brokering ID of this peer
         */ get: function() {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224481.prototype, "options", {
        get: function() {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224481.prototype, "open", {
        get: function() {
            return this._open;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224481.prototype, "socket", {
        get: function() {
            return this._socket;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224481.prototype, "connections", {
        /**
         * A hash of all connections associated with this peer, keyed by the remote peer's ID.
         * @deprecated
         * Return type will change from Object to Map<string,[]>
         */ get: function() {
            var e_1, _a;
            var plainConnections = Object.create(null);
            try {
                for(var _b = $26088d7da5b03f69$var$__values(this._connections), _c = _b.next(); !_c.done; _c = _b.next()){
                    var _d = $26088d7da5b03f69$var$__read(_c.value, 2), k = _d[0], v = _d[1];
                    plainConnections[k] = v;
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
            return plainConnections;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224481.prototype, "destroyed", {
        /**
         * true if this peer and all of its connections can no longer be used.
         */ get: function() {
            return this._destroyed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c4224481.prototype, "disconnected", {
        /**
         * false if there is an active connection to the PeerServer.
         */ get: function() {
            return this._disconnected;
        },
        enumerable: false,
        configurable: true
    });
    $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._createServerConnection = function() {
        var _this = this;
        var socket = new $31d11a8d122cb4b7$exports.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
        socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Message, function(data) {
            _this._handleMessage(data);
        });
        socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Error, function(error) {
            _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.SocketError, error);
        });
        socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Disconnected, function() {
            if (_this.disconnected) return;
            _this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Network, "Lost connection to server.");
            _this.disconnect();
        });
        socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Close, function() {
            if (_this.disconnected) return;
            _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.SocketClosed, "Underlying socket is already closed.");
        });
        return socket;
    };
    /** Initialize a connection with the server. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._initialize = function(id) {
        this._id = id;
        this.socket.start(id, this._options.token);
    };
    /** Handles messages from the server. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._handleMessage = function(message) {
        var e_2, _a;
        var type = message.type;
        var payload = message.payload;
        var peerId = message.src;
        switch(type){
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Open:
                this._lastServerId = this.id;
                this._open = true;
                this.emit("open", this.id);
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Error:
                this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, payload.msg);
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.IdTaken:
                this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.UnavailableID, "ID \"".concat(this.id, "\" is taken"));
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.InvalidKey:
                this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.InvalidKey, "API KEY \"".concat(this._options.key, "\" is invalid"));
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Leave:
                $1615705ecc6adca3$exports.default.log("Received leave message from ".concat(peerId));
                this._cleanupPeer(peerId);
                this._connections.delete(peerId);
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Expire:
                this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.PeerUnavailable, "Could not connect to peer ".concat(peerId));
                break;
            case $60fadef21a2daafc$export$adb4a1754da6f10d.Offer:
                // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
                var connectionId = payload.connectionId;
                var connection = this.getConnection(peerId, connectionId);
                if (connection) {
                    connection.close();
                    $1615705ecc6adca3$exports.default.warn("Offer received for existing Connection ID:".concat(connectionId));
                }
                // Create a new connection.
                if (payload.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media) {
                    var mediaConnection = new $353dee38f9ab557b$exports.MediaConnection(peerId, this, {
                        connectionId: connectionId,
                        _payload: payload,
                        metadata: payload.metadata
                    });
                    connection = mediaConnection;
                    this._addConnection(peerId, connection);
                    this.emit("call", mediaConnection);
                } else if (payload.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
                    var dataConnection = new $3356170d7bce7f20$exports.DataConnection(peerId, this, {
                        connectionId: connectionId,
                        _payload: payload,
                        metadata: payload.metadata,
                        label: payload.label,
                        serialization: payload.serialization,
                        reliable: payload.reliable
                    });
                    connection = dataConnection;
                    this._addConnection(peerId, connection);
                    this.emit("connection", dataConnection);
                } else {
                    $1615705ecc6adca3$exports.default.warn("Received malformed connection type:".concat(payload.type));
                    return;
                }
                // Find messages.
                var messages = this._getMessages(connectionId);
                try {
                    for(var messages_1 = $26088d7da5b03f69$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                        var message_1 = messages_1_1.value;
                        connection.handleMessage(message_1);
                    }
                } catch (e_2_1) {
                    e_2 = {
                        error: e_2_1
                    };
                } finally{
                    try {
                        if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                    } finally{
                        if (e_2) throw e_2.error;
                    }
                }
                break;
            default:
                if (!payload) {
                    $1615705ecc6adca3$exports.default.warn("You received a malformed message from ".concat(peerId, " of type ").concat(type));
                    return;
                }
                var connectionId = payload.connectionId;
                var connection = this.getConnection(peerId, connectionId);
                if (connection && connection.peerConnection) connection.handleMessage(message);
                else if (connectionId) this._storeMessage(connectionId, message);
                else $1615705ecc6adca3$exports.default.warn("You received an unrecognized message:", message);
                break;
        }
    };
    /** Stores messages without a set up connection, to be claimed later. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._storeMessage = function(connectionId, message) {
        if (!this._lostMessages.has(connectionId)) this._lostMessages.set(connectionId, []);
        this._lostMessages.get(connectionId).push(message);
    };
    /** Retrieve messages from lost message store */ //TODO Change it to private
    $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._getMessages = function(connectionId) {
        var messages = this._lostMessages.get(connectionId);
        if (messages) {
            this._lostMessages.delete(connectionId);
            return messages;
        }
        return [];
    };
    /**
     * Connects to the remote peer specified by id and returns a data connection.
     * @param peer The brokering ID of the remote peer (their peer.id).
     * @param options for specifying details about Peer Connection
     */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.connect = function(peer, options) {
        if (options === void 0) options = {};
        if (this.disconnected) {
            $1615705ecc6adca3$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
            this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        var dataConnection = new $3356170d7bce7f20$exports.DataConnection(peer, this, options);
        this._addConnection(peer, dataConnection);
        return dataConnection;
    };
    /**
     * Calls the remote peer specified by id and returns a media connection.
     * @param peer The brokering ID of the remote peer (their peer.id).
     * @param stream The caller's media stream
     * @param options Metadata associated with the connection, passed in by whoever initiated the connection.
     */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.call = function(peer, stream, options) {
        if (options === void 0) options = {};
        if (this.disconnected) {
            $1615705ecc6adca3$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
            this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        if (!stream) {
            $1615705ecc6adca3$exports.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
            return;
        }
        var mediaConnection = new $353dee38f9ab557b$exports.MediaConnection(peer, this, $26088d7da5b03f69$var$__assign($26088d7da5b03f69$var$__assign({}, options), {
            _stream: stream
        }));
        this._addConnection(peer, mediaConnection);
        return mediaConnection;
    };
    /** Add a data/media connection to this peer. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._addConnection = function(peerId, connection) {
        $1615705ecc6adca3$exports.default.log("add connection ".concat(connection.type, ":").concat(connection.connectionId, " to peerId:").concat(peerId));
        if (!this._connections.has(peerId)) this._connections.set(peerId, []);
        this._connections.get(peerId).push(connection);
    };
    //TODO should be private
    $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._removeConnection = function(connection) {
        var connections = this._connections.get(connection.peer);
        if (connections) {
            var index = connections.indexOf(connection);
            if (index !== -1) connections.splice(index, 1);
        }
        //remove from lost messages
        this._lostMessages.delete(connection.connectionId);
    };
    /** Retrieve a data/media connection for this peer. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.getConnection = function(peerId, connectionId) {
        var e_3, _a;
        var connections = this._connections.get(peerId);
        if (!connections) return null;
        try {
            for(var connections_1 = $26088d7da5b03f69$var$__values(connections), connections_1_1 = connections_1.next(); !connections_1_1.done; connections_1_1 = connections_1.next()){
                var connection = connections_1_1.value;
                if (connection.connectionId === connectionId) return connection;
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (connections_1_1 && !connections_1_1.done && (_a = connections_1.return)) _a.call(connections_1);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        return null;
    };
    $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._delayedAbort = function(type, message) {
        var _this = this;
        setTimeout(function() {
            _this._abort(type, message);
        }, 0);
    };
    /**
     * Emits an error message and destroys the Peer.
     * The Peer is not destroyed if it's in a disconnected state, in which case
     * it retains its disconnected state and its existing connections.
     */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._abort = function(type, message) {
        $1615705ecc6adca3$exports.default.error("Aborting!");
        this.emitError(type, message);
        if (!this._lastServerId) this.destroy();
        else this.disconnect();
    };
    /** Emits a typed error message. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.emitError = function(type, err) {
        $1615705ecc6adca3$exports.default.error("Error:", err);
        var error;
        if (typeof err === "string") error = new Error(err);
        else error = err;
        error.type = type;
        this.emit("error", error);
    };
    /**
     * Destroys the Peer: closes all active connections as well as the connection
     *  to the server.
     * Warning: The peer can no longer create or accept connections after being
     *  destroyed.
     */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.destroy = function() {
        if (this.destroyed) return;
        $1615705ecc6adca3$exports.default.log("Destroy peer with ID:".concat(this.id));
        this.disconnect();
        this._cleanup();
        this._destroyed = true;
        this.emit("close");
    };
    /** Disconnects every connection on this peer. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._cleanup = function() {
        var e_4, _a;
        try {
            for(var _b = $26088d7da5b03f69$var$__values(this._connections.keys()), _c = _b.next(); !_c.done; _c = _b.next()){
                var peerId = _c.value;
                this._cleanupPeer(peerId);
                this._connections.delete(peerId);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        this.socket.removeAllListeners();
    };
    /** Closes all connections to this peer. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype._cleanupPeer = function(peerId) {
        var e_5, _a;
        var connections = this._connections.get(peerId);
        if (!connections) return;
        try {
            for(var connections_2 = $26088d7da5b03f69$var$__values(connections), connections_2_1 = connections_2.next(); !connections_2_1.done; connections_2_1 = connections_2.next()){
                var connection = connections_2_1.value;
                connection.close();
            }
        } catch (e_5_1) {
            e_5 = {
                error: e_5_1
            };
        } finally{
            try {
                if (connections_2_1 && !connections_2_1.done && (_a = connections_2.return)) _a.call(connections_2);
            } finally{
                if (e_5) throw e_5.error;
            }
        }
    };
    /**
     * Disconnects the Peer's connection to the PeerServer. Does not close any
     *  active connections.
     * Warning: The peer can no longer create or accept connections after being
     *  disconnected. It also cannot reconnect to the server.
     */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.disconnect = function() {
        if (this.disconnected) return;
        var currentId = this.id;
        $1615705ecc6adca3$exports.default.log("Disconnect peer with ID:".concat(currentId));
        this._disconnected = true;
        this._open = false;
        this.socket.close();
        this._lastServerId = currentId;
        this._id = null;
        this.emit("disconnected", currentId);
    };
    /** Attempts to reconnect with the same ID. */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.reconnect = function() {
        if (this.disconnected && !this.destroyed) {
            $1615705ecc6adca3$exports.default.log("Attempting reconnection to server with ID ".concat(this._lastServerId));
            this._disconnected = false;
            this._initialize(this._lastServerId);
        } else if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
        else if (!this.disconnected && !this.open) $1615705ecc6adca3$exports.default.error("In a hurry? We're still trying to make the initial connection!");
        else throw new Error("Peer ".concat(this.id, " cannot reconnect because it is not disconnected from the server!"));
    };
    /**
     * Get a list of available peer IDs. If you're running your own server, you'll
     * want to set allow_discovery: true in the PeerServer options. If you're using
     * the cloud server, email team@peerjs.com to get the functionality enabled for
     * your key.
     */ $26088d7da5b03f69$export$ecd1fc136c4224481.prototype.listAllPeers = function(cb) {
        var _this = this;
        if (cb === void 0) cb = function(_) {};
        this._api.listAllPeers().then(function(peers) {
            return cb(peers);
        }).catch(function(error) {
            return _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, error);
        });
    };
    $26088d7da5b03f69$export$ecd1fc136c4224481.DEFAULT_KEY = "peerjs";
    return $26088d7da5b03f69$export$ecd1fc136c4224481;
}($ac9b757d51178e15$exports.EventEmitter);
var $70d766613f57b014$export$2e2bcd8739ae039 = $26088d7da5b03f69$exports.Peer;

},{"peerjs-js-binarypack":"kf5XD","webrtc-adapter":"bP46e","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"kf5XD":[function(require,module,exports) {
var BufferBuilder = require('./bufferbuilder').BufferBuilder;
var binaryFeatures = require('./bufferbuilder').binaryFeatures;
var BinaryPack = {
    unpack: function(data) {
        var unpacker = new Unpacker(data);
        return unpacker.unpack();
    },
    pack: function(data) {
        var packer = new Packer();
        packer.pack(data);
        var buffer = packer.getBuffer();
        return buffer;
    }
};
module.exports = BinaryPack;
function Unpacker(data) {
    // Data is ArrayBuffer
    this.index = 0;
    this.dataBuffer = data;
    this.dataView = new Uint8Array(this.dataBuffer);
    this.length = this.dataBuffer.byteLength;
}
Unpacker.prototype.unpack = function() {
    var type = this.unpack_uint8();
    if (type < 0x80) return type;
    else if ((type ^ 0xe0) < 0x20) return (type ^ 0xe0) - 0x20;
    var size;
    if ((size = type ^ 0xa0) <= 0x0f) return this.unpack_raw(size);
    else if ((size = type ^ 0xb0) <= 0x0f) return this.unpack_string(size);
    else if ((size = type ^ 0x90) <= 0x0f) return this.unpack_array(size);
    else if ((size = type ^ 0x80) <= 0x0f) return this.unpack_map(size);
    switch(type){
        case 0xc0:
            return null;
        case 0xc1:
            return undefined;
        case 0xc2:
            return false;
        case 0xc3:
            return true;
        case 0xca:
            return this.unpack_float();
        case 0xcb:
            return this.unpack_double();
        case 0xcc:
            return this.unpack_uint8();
        case 0xcd:
            return this.unpack_uint16();
        case 0xce:
            return this.unpack_uint32();
        case 0xcf:
            return this.unpack_uint64();
        case 0xd0:
            return this.unpack_int8();
        case 0xd1:
            return this.unpack_int16();
        case 0xd2:
            return this.unpack_int32();
        case 0xd3:
            return this.unpack_int64();
        case 0xd4:
            return undefined;
        case 0xd5:
            return undefined;
        case 0xd6:
            return undefined;
        case 0xd7:
            return undefined;
        case 0xd8:
            size = this.unpack_uint16();
            return this.unpack_string(size);
        case 0xd9:
            size = this.unpack_uint32();
            return this.unpack_string(size);
        case 0xda:
            size = this.unpack_uint16();
            return this.unpack_raw(size);
        case 0xdb:
            size = this.unpack_uint32();
            return this.unpack_raw(size);
        case 0xdc:
            size = this.unpack_uint16();
            return this.unpack_array(size);
        case 0xdd:
            size = this.unpack_uint32();
            return this.unpack_array(size);
        case 0xde:
            size = this.unpack_uint16();
            return this.unpack_map(size);
        case 0xdf:
            size = this.unpack_uint32();
            return this.unpack_map(size);
    }
};
Unpacker.prototype.unpack_uint8 = function() {
    var byte = this.dataView[this.index] & 0xff;
    this.index++;
    return byte;
};
Unpacker.prototype.unpack_uint16 = function() {
    var bytes = this.read(2);
    var uint16 = (bytes[0] & 0xff) * 256 + (bytes[1] & 0xff);
    this.index += 2;
    return uint16;
};
Unpacker.prototype.unpack_uint32 = function() {
    var bytes = this.read(4);
    var uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
    this.index += 4;
    return uint32;
};
Unpacker.prototype.unpack_uint64 = function() {
    var bytes = this.read(8);
    var uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
    this.index += 8;
    return uint64;
};
Unpacker.prototype.unpack_int8 = function() {
    var uint8 = this.unpack_uint8();
    return uint8 < 0x80 ? uint8 : uint8 - 256;
};
Unpacker.prototype.unpack_int16 = function() {
    var uint16 = this.unpack_uint16();
    return uint16 < 0x8000 ? uint16 : uint16 - 65536;
};
Unpacker.prototype.unpack_int32 = function() {
    var uint32 = this.unpack_uint32();
    return uint32 < Math.pow(2, 31) ? uint32 : uint32 - Math.pow(2, 32);
};
Unpacker.prototype.unpack_int64 = function() {
    var uint64 = this.unpack_uint64();
    return uint64 < Math.pow(2, 63) ? uint64 : uint64 - Math.pow(2, 64);
};
Unpacker.prototype.unpack_raw = function(size) {
    if (this.length < this.index + size) throw new Error("BinaryPackFailure: index is out of range " + this.index + ' ' + size + ' ' + this.length);
    var buf = this.dataBuffer.slice(this.index, this.index + size);
    this.index += size;
    // buf = util.bufferToString(buf);
    return buf;
};
Unpacker.prototype.unpack_string = function(size) {
    var bytes = this.read(size);
    var i = 0;
    var str = '';
    var c;
    var code;
    while(i < size){
        c = bytes[i];
        if (c < 128) {
            str += String.fromCharCode(c);
            i++;
        } else if ((c ^ 0xc0) < 32) {
            code = (c ^ 0xc0) << 6 | bytes[i + 1] & 63;
            str += String.fromCharCode(code);
            i += 2;
        } else {
            code = (c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63;
            str += String.fromCharCode(code);
            i += 3;
        }
    }
    this.index += size;
    return str;
};
Unpacker.prototype.unpack_array = function(size) {
    var objects = new Array(size);
    for(var i = 0; i < size; i++)objects[i] = this.unpack();
    return objects;
};
Unpacker.prototype.unpack_map = function(size) {
    var map = {};
    for(var i = 0; i < size; i++){
        var key = this.unpack();
        var value = this.unpack();
        map[key] = value;
    }
    return map;
};
Unpacker.prototype.unpack_float = function() {
    var uint32 = this.unpack_uint32();
    var sign = uint32 >> 31;
    var exp = (uint32 >> 23 & 0xff) - 127;
    var fraction = uint32 & 0x7fffff | 0x800000;
    return (sign === 0 ? 1 : -1) * fraction * Math.pow(2, exp - 23);
};
Unpacker.prototype.unpack_double = function() {
    var h32 = this.unpack_uint32();
    var l32 = this.unpack_uint32();
    var sign = h32 >> 31;
    var exp = (h32 >> 20 & 0x7ff) - 1023;
    var hfrac = h32 & 0xfffff | 0x100000;
    var frac = hfrac * Math.pow(2, exp - 20) + l32 * Math.pow(2, exp - 52);
    return (sign === 0 ? 1 : -1) * frac;
};
Unpacker.prototype.read = function(length) {
    var j = this.index;
    if (j + length <= this.length) return this.dataView.subarray(j, j + length);
    else throw new Error('BinaryPackFailure: read index out of range');
};
function Packer() {
    this.bufferBuilder = new BufferBuilder();
}
Packer.prototype.getBuffer = function() {
    return this.bufferBuilder.getBuffer();
};
Packer.prototype.pack = function(value) {
    var type = typeof value;
    if (type === 'string') this.pack_string(value);
    else if (type === 'number') {
        if (Math.floor(value) === value) this.pack_integer(value);
        else this.pack_double(value);
    } else if (type === 'boolean') {
        if (value === true) this.bufferBuilder.append(0xc3);
        else if (value === false) this.bufferBuilder.append(0xc2);
    } else if (type === 'undefined') this.bufferBuilder.append(0xc0);
    else if (type === 'object') {
        if (value === null) this.bufferBuilder.append(0xc0);
        else {
            var constructor = value.constructor;
            if (constructor == Array) this.pack_array(value);
            else if (constructor == Blob || constructor == File || value instanceof Blob || value instanceof File) this.pack_bin(value);
            else if (constructor == ArrayBuffer) {
                if (binaryFeatures.useArrayBufferView) this.pack_bin(new Uint8Array(value));
                else this.pack_bin(value);
            } else if ('BYTES_PER_ELEMENT' in value) {
                if (binaryFeatures.useArrayBufferView) this.pack_bin(new Uint8Array(value.buffer));
                else this.pack_bin(value.buffer);
            } else if (constructor == Object || constructor.toString().startsWith('class')) this.pack_object(value);
            else if (constructor == Date) this.pack_string(value.toString());
            else if (typeof value.toBinaryPack === 'function') this.bufferBuilder.append(value.toBinaryPack());
            else throw new Error('Type "' + constructor.toString() + '" not yet supported');
        }
    } else throw new Error('Type "' + type + '" not yet supported');
    this.bufferBuilder.flush();
};
Packer.prototype.pack_bin = function(blob) {
    var length = blob.length || blob.byteLength || blob.size;
    if (length <= 0x0f) this.pack_uint8(0xa0 + length);
    else if (length <= 0xffff) {
        this.bufferBuilder.append(0xda);
        this.pack_uint16(length);
    } else if (length <= 0xffffffff) {
        this.bufferBuilder.append(0xdb);
        this.pack_uint32(length);
    } else throw new Error('Invalid length');
    this.bufferBuilder.append(blob);
};
Packer.prototype.pack_string = function(str) {
    var length = utf8Length(str);
    if (length <= 0x0f) this.pack_uint8(0xb0 + length);
    else if (length <= 0xffff) {
        this.bufferBuilder.append(0xd8);
        this.pack_uint16(length);
    } else if (length <= 0xffffffff) {
        this.bufferBuilder.append(0xd9);
        this.pack_uint32(length);
    } else throw new Error('Invalid length');
    this.bufferBuilder.append(str);
};
Packer.prototype.pack_array = function(ary) {
    var length = ary.length;
    if (length <= 0x0f) this.pack_uint8(0x90 + length);
    else if (length <= 0xffff) {
        this.bufferBuilder.append(0xdc);
        this.pack_uint16(length);
    } else if (length <= 0xffffffff) {
        this.bufferBuilder.append(0xdd);
        this.pack_uint32(length);
    } else throw new Error('Invalid length');
    for(var i = 0; i < length; i++)this.pack(ary[i]);
};
Packer.prototype.pack_integer = function(num) {
    if (num >= -32 && num <= 0x7f) this.bufferBuilder.append(num & 0xff);
    else if (num >= 0x00 && num <= 0xff) {
        this.bufferBuilder.append(0xcc);
        this.pack_uint8(num);
    } else if (num >= -128 && num <= 0x7f) {
        this.bufferBuilder.append(0xd0);
        this.pack_int8(num);
    } else if (num >= 0x0000 && num <= 0xffff) {
        this.bufferBuilder.append(0xcd);
        this.pack_uint16(num);
    } else if (num >= -32768 && num <= 0x7fff) {
        this.bufferBuilder.append(0xd1);
        this.pack_int16(num);
    } else if (num >= 0x00000000 && num <= 0xffffffff) {
        this.bufferBuilder.append(0xce);
        this.pack_uint32(num);
    } else if (num >= -2147483648 && num <= 0x7fffffff) {
        this.bufferBuilder.append(0xd2);
        this.pack_int32(num);
    } else if (num >= -9223372036854776000 && num <= 0x7FFFFFFFFFFFFFFF) {
        this.bufferBuilder.append(0xd3);
        this.pack_int64(num);
    } else if (num >= 0x0000000000000000 && num <= 0xFFFFFFFFFFFFFFFF) {
        this.bufferBuilder.append(0xcf);
        this.pack_uint64(num);
    } else throw new Error('Invalid integer');
};
Packer.prototype.pack_double = function(num) {
    var sign = 0;
    if (num < 0) {
        sign = 1;
        num = -num;
    }
    var exp = Math.floor(Math.log(num) / Math.LN2);
    var frac0 = num / Math.pow(2, exp) - 1;
    var frac1 = Math.floor(frac0 * Math.pow(2, 52));
    var b32 = Math.pow(2, 32);
    var h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 0x0fffff;
    var l32 = frac1 % b32;
    this.bufferBuilder.append(0xcb);
    this.pack_int32(h32);
    this.pack_int32(l32);
};
Packer.prototype.pack_object = function(obj) {
    var keys = Object.keys(obj);
    var length = keys.length;
    if (length <= 0x0f) this.pack_uint8(0x80 + length);
    else if (length <= 0xffff) {
        this.bufferBuilder.append(0xde);
        this.pack_uint16(length);
    } else if (length <= 0xffffffff) {
        this.bufferBuilder.append(0xdf);
        this.pack_uint32(length);
    } else throw new Error('Invalid length');
    for(var prop in obj)if (obj.hasOwnProperty(prop)) {
        this.pack(prop);
        this.pack(obj[prop]);
    }
};
Packer.prototype.pack_uint8 = function(num) {
    this.bufferBuilder.append(num);
};
Packer.prototype.pack_uint16 = function(num) {
    this.bufferBuilder.append(num >> 8);
    this.bufferBuilder.append(num & 0xff);
};
Packer.prototype.pack_uint32 = function(num) {
    var n = num & 0xffffffff;
    this.bufferBuilder.append((n & 0xff000000) >>> 24);
    this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
    this.bufferBuilder.append((n & 0x0000ff00) >>> 8);
    this.bufferBuilder.append(n & 0x000000ff);
};
Packer.prototype.pack_uint64 = function(num) {
    var high = num / Math.pow(2, 32);
    var low = num % Math.pow(2, 32);
    this.bufferBuilder.append((high & 0xff000000) >>> 24);
    this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
    this.bufferBuilder.append((high & 0x0000ff00) >>> 8);
    this.bufferBuilder.append(high & 0x000000ff);
    this.bufferBuilder.append((low & 0xff000000) >>> 24);
    this.bufferBuilder.append((low & 0x00ff0000) >>> 16);
    this.bufferBuilder.append((low & 0x0000ff00) >>> 8);
    this.bufferBuilder.append(low & 0x000000ff);
};
Packer.prototype.pack_int8 = function(num) {
    this.bufferBuilder.append(num & 0xff);
};
Packer.prototype.pack_int16 = function(num) {
    this.bufferBuilder.append((num & 0xff00) >> 8);
    this.bufferBuilder.append(num & 0xff);
};
Packer.prototype.pack_int32 = function(num) {
    this.bufferBuilder.append(num >>> 24 & 0xff);
    this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
    this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
    this.bufferBuilder.append(num & 0x000000ff);
};
Packer.prototype.pack_int64 = function(num) {
    var high = Math.floor(num / Math.pow(2, 32));
    var low = num % Math.pow(2, 32);
    this.bufferBuilder.append((high & 0xff000000) >>> 24);
    this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
    this.bufferBuilder.append((high & 0x0000ff00) >>> 8);
    this.bufferBuilder.append(high & 0x000000ff);
    this.bufferBuilder.append((low & 0xff000000) >>> 24);
    this.bufferBuilder.append((low & 0x00ff0000) >>> 16);
    this.bufferBuilder.append((low & 0x0000ff00) >>> 8);
    this.bufferBuilder.append(low & 0x000000ff);
};
function _utf8Replace(m) {
    var code = m.charCodeAt(0);
    if (code <= 0x7ff) return '00';
    if (code <= 0xffff) return '000';
    if (code <= 0x1fffff) return '0000';
    if (code <= 0x3ffffff) return '00000';
    return '000000';
}
function utf8Length(str) {
    if (str.length > 600) // Blob method faster for large strings
    return new Blob([
        str
    ]).size;
    else return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
}

},{"./bufferbuilder":"kE9mH"}],"kE9mH":[function(require,module,exports) {
var binaryFeatures = {};
binaryFeatures.useBlobBuilder = function() {
    try {
        new Blob([]);
        return false;
    } catch (e) {
        return true;
    }
}();
binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && function() {
    try {
        return new Blob([
            new Uint8Array([])
        ]).size === 0;
    } catch (e) {
        return true;
    }
}();
module.exports.binaryFeatures = binaryFeatures;
var BlobBuilder = module.exports.BlobBuilder;
if (typeof window !== 'undefined') BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
function BufferBuilder() {
    this._pieces = [];
    this._parts = [];
}
BufferBuilder.prototype.append = function(data) {
    if (typeof data === 'number') this._pieces.push(data);
    else {
        this.flush();
        this._parts.push(data);
    }
};
BufferBuilder.prototype.flush = function() {
    if (this._pieces.length > 0) {
        var buf = new Uint8Array(this._pieces);
        if (!binaryFeatures.useArrayBufferView) buf = buf.buffer;
        this._parts.push(buf);
        this._pieces = [];
    }
};
BufferBuilder.prototype.getBuffer = function() {
    this.flush();
    if (binaryFeatures.useBlobBuilder) {
        var builder = new BlobBuilder();
        for(var i = 0, ii = this._parts.length; i < ii; i++)builder.append(this._parts[i]);
        return builder.getBlob();
    } else return new Blob(this._parts);
};
module.exports.BufferBuilder = BufferBuilder;

},{}],"bP46e":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _adapterFactoryJs = require("./adapter_factory.js");
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
const adapter = _adapterFactoryJs.adapterFactory({
    window: typeof window === 'undefined' ? undefined : window
});
exports.default = adapter;

},{"./adapter_factory.js":"5zywW","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"5zywW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Shimming starts here.
parcelHelpers.export(exports, "adapterFactory", ()=>adapterFactory
);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ var _utils = require("./utils");
// Browser shims.
var _chromeShim = require("./chrome/chrome_shim");
var _edgeShim = require("./edge/edge_shim");
var _firefoxShim = require("./firefox/firefox_shim");
var _safariShim = require("./safari/safari_shim");
var _commonShim = require("./common_shim");
function adapterFactory({ window  } = {}, options = {
    shimChrome: true,
    shimFirefox: true,
    shimEdge: true,
    shimSafari: true
}) {
    // Utils.
    const logging = _utils.log;
    const browserDetails = _utils.detectBrowser(window);
    const adapter = {
        browserDetails,
        commonShim: _commonShim,
        extractVersion: _utils.extractVersion,
        disableLog: _utils.disableLog,
        disableWarnings: _utils.disableWarnings
    };
    // Shim browser if found.
    switch(browserDetails.browser){
        case 'chrome':
            if (!_chromeShim || !_chromeShim.shimPeerConnection || !options.shimChrome) {
                logging('Chrome shim is not included in this adapter release.');
                return adapter;
            }
            if (browserDetails.version === null) {
                logging('Chrome shim can not determine version, not shimming.');
                return adapter;
            }
            logging('adapter.js shimming chrome.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = _chromeShim;
            // Must be called before shimPeerConnection.
            _commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
            _chromeShim.shimGetUserMedia(window, browserDetails);
            _chromeShim.shimMediaStream(window, browserDetails);
            _chromeShim.shimPeerConnection(window, browserDetails);
            _chromeShim.shimOnTrack(window, browserDetails);
            _chromeShim.shimAddTrackRemoveTrack(window, browserDetails);
            _chromeShim.shimGetSendersWithDtmf(window, browserDetails);
            _chromeShim.shimGetStats(window, browserDetails);
            _chromeShim.shimSenderReceiverGetStats(window, browserDetails);
            _chromeShim.fixNegotiationNeeded(window, browserDetails);
            _commonShim.shimRTCIceCandidate(window, browserDetails);
            _commonShim.shimConnectionState(window, browserDetails);
            _commonShim.shimMaxMessageSize(window, browserDetails);
            _commonShim.shimSendThrowTypeError(window, browserDetails);
            _commonShim.removeExtmapAllowMixed(window, browserDetails);
            break;
        case 'firefox':
            if (!_firefoxShim || !_firefoxShim.shimPeerConnection || !options.shimFirefox) {
                logging('Firefox shim is not included in this adapter release.');
                return adapter;
            }
            logging('adapter.js shimming firefox.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = _firefoxShim;
            // Must be called before shimPeerConnection.
            _commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
            _firefoxShim.shimGetUserMedia(window, browserDetails);
            _firefoxShim.shimPeerConnection(window, browserDetails);
            _firefoxShim.shimOnTrack(window, browserDetails);
            _firefoxShim.shimRemoveStream(window, browserDetails);
            _firefoxShim.shimSenderGetStats(window, browserDetails);
            _firefoxShim.shimReceiverGetStats(window, browserDetails);
            _firefoxShim.shimRTCDataChannel(window, browserDetails);
            _firefoxShim.shimAddTransceiver(window, browserDetails);
            _firefoxShim.shimGetParameters(window, browserDetails);
            _firefoxShim.shimCreateOffer(window, browserDetails);
            _firefoxShim.shimCreateAnswer(window, browserDetails);
            _commonShim.shimRTCIceCandidate(window, browserDetails);
            _commonShim.shimConnectionState(window, browserDetails);
            _commonShim.shimMaxMessageSize(window, browserDetails);
            _commonShim.shimSendThrowTypeError(window, browserDetails);
            break;
        case 'edge':
            if (!_edgeShim || !_edgeShim.shimPeerConnection || !options.shimEdge) {
                logging('MS edge shim is not included in this adapter release.');
                return adapter;
            }
            logging('adapter.js shimming edge.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = _edgeShim;
            _edgeShim.shimGetUserMedia(window, browserDetails);
            _edgeShim.shimGetDisplayMedia(window, browserDetails);
            _edgeShim.shimPeerConnection(window, browserDetails);
            _edgeShim.shimReplaceTrack(window, browserDetails);
            // the edge shim implements the full RTCIceCandidate object.
            _commonShim.shimMaxMessageSize(window, browserDetails);
            _commonShim.shimSendThrowTypeError(window, browserDetails);
            break;
        case 'safari':
            if (!_safariShim || !options.shimSafari) {
                logging('Safari shim is not included in this adapter release.');
                return adapter;
            }
            logging('adapter.js shimming safari.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = _safariShim;
            // Must be called before shimCallbackAPI.
            _commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
            _safariShim.shimRTCIceServerUrls(window, browserDetails);
            _safariShim.shimCreateOfferLegacy(window, browserDetails);
            _safariShim.shimCallbacksAPI(window, browserDetails);
            _safariShim.shimLocalStreamsAPI(window, browserDetails);
            _safariShim.shimRemoteStreamsAPI(window, browserDetails);
            _safariShim.shimTrackEventTransceiver(window, browserDetails);
            _safariShim.shimGetUserMedia(window, browserDetails);
            _safariShim.shimAudioContext(window, browserDetails);
            _commonShim.shimRTCIceCandidate(window, browserDetails);
            _commonShim.shimMaxMessageSize(window, browserDetails);
            _commonShim.shimSendThrowTypeError(window, browserDetails);
            _commonShim.removeExtmapAllowMixed(window, browserDetails);
            break;
        default:
            logging('Unsupported browser!');
            break;
    }
    return adapter;
}

},{"./utils":"fZqjY","./chrome/chrome_shim":"8Xxi1","./edge/edge_shim":"5QE6V","./firefox/firefox_shim":"7FBwu","./safari/safari_shim":"9gyzL","./common_shim":"cfV9t","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"fZqjY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Extract browser version out of the provided user agent string.
 *
 * @param {!string} uastring userAgent string.
 * @param {!string} expr Regular expression used as match criteria.
 * @param {!number} pos position in the version string to be returned.
 * @return {!number} browser version.
 */ parcelHelpers.export(exports, "extractVersion", ()=>extractVersion
);
// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object (or false to prevent
// the event).
parcelHelpers.export(exports, "wrapPeerConnectionEvent", ()=>wrapPeerConnectionEvent
);
parcelHelpers.export(exports, "disableLog", ()=>disableLog
);
/**
 * Disable or enable deprecation warnings
 * @param {!boolean} bool set to true to disable warnings.
 */ parcelHelpers.export(exports, "disableWarnings", ()=>disableWarnings
);
parcelHelpers.export(exports, "log", ()=>log
);
/**
 * Shows a deprecation warning suggesting the modern and spec-compatible API.
 */ parcelHelpers.export(exports, "deprecated", ()=>deprecated
);
/**
 * Browser detector.
 *
 * @return {object} result containing browser and version
 *     properties.
 */ parcelHelpers.export(exports, "detectBrowser", ()=>detectBrowser
);
/**
 * Remove all empty objects and undefined values
 * from a nested object -- an enhanced and vanilla version
 * of Lodash's `compact`.
 */ parcelHelpers.export(exports, "compactObject", ()=>compactObject
);
/* iterates the stats graph recursively. */ parcelHelpers.export(exports, "walkStats", ()=>walkStats
);
/* filter getStats for a sender/receiver track. */ parcelHelpers.export(exports, "filterStats", ()=>filterStats
);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
let logDisabled_ = true;
let deprecationWarnings_ = true;
function extractVersion(uastring, expr, pos) {
    const match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
}
function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
    if (!window.RTCPeerConnection) return;
    const proto = window.RTCPeerConnection.prototype;
    const nativeAddEventListener = proto.addEventListener;
    proto.addEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap) return nativeAddEventListener.apply(this, arguments);
        const wrappedCallback = (e)=>{
            const modifiedEvent = wrapper(e);
            if (modifiedEvent) {
                if (cb.handleEvent) cb.handleEvent(modifiedEvent);
                else cb(modifiedEvent);
            }
        };
        this._eventMap = this._eventMap || {};
        if (!this._eventMap[eventNameToWrap]) this._eventMap[eventNameToWrap] = new Map();
        this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
        return nativeAddEventListener.apply(this, [
            nativeEventName,
            wrappedCallback
        ]);
    };
    const nativeRemoveEventListener = proto.removeEventListener;
    proto.removeEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) return nativeRemoveEventListener.apply(this, arguments);
        if (!this._eventMap[eventNameToWrap].has(cb)) return nativeRemoveEventListener.apply(this, arguments);
        const unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
        this._eventMap[eventNameToWrap].delete(cb);
        if (this._eventMap[eventNameToWrap].size === 0) delete this._eventMap[eventNameToWrap];
        if (Object.keys(this._eventMap).length === 0) delete this._eventMap;
        return nativeRemoveEventListener.apply(this, [
            nativeEventName,
            unwrappedCb
        ]);
    };
    Object.defineProperty(proto, 'on' + eventNameToWrap, {
        get () {
            return this['_on' + eventNameToWrap];
        },
        set (cb) {
            if (this['_on' + eventNameToWrap]) {
                this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
                delete this['_on' + eventNameToWrap];
            }
            if (cb) this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
        },
        enumerable: true,
        configurable: true
    });
}
function disableLog(bool) {
    if (typeof bool !== 'boolean') return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
    logDisabled_ = bool;
    return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
}
function disableWarnings(bool) {
    if (typeof bool !== 'boolean') return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
    deprecationWarnings_ = !bool;
    return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
}
function log() {
    if (typeof window === 'object') {
        if (logDisabled_) return;
        if (typeof console !== 'undefined' && typeof console.log === 'function') console.log.apply(console, arguments);
    }
}
function deprecated(oldMethod, newMethod) {
    if (!deprecationWarnings_) return;
    console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
}
function detectBrowser(window) {
    // Returned result object.
    const result = {
        browser: null,
        version: null
    };
    // Fail early if it's not a browser
    if (typeof window === 'undefined' || !window.navigator) {
        result.browser = 'Not a browser.';
        return result;
    }
    const { navigator  } = window;
    if (navigator.mozGetUserMedia) {
        result.browser = 'firefox';
        result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
        // Chrome, Chromium, Webview, Opera.
        // Version matches Chrome/WebRTC version.
        // Chrome 74 removed webkitGetUserMedia on http as well so we need the
        // more complicated fallback to webkitRTCPeerConnection.
        result.browser = 'chrome';
        result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
        result.browser = 'edge';
        result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
    } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        result.browser = 'safari';
        result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
        result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
    } else {
        result.browser = 'Not a supported browser.';
        return result;
    }
    return result;
}
/**
 * Checks if something is an object.
 *
 * @param {*} val The something you want to check.
 * @return true if val is an object, false otherwise.
 */ function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
function compactObject(data) {
    if (!isObject(data)) return data;
    return Object.keys(data).reduce(function(accumulator, key) {
        const isObj = isObject(data[key]);
        const value = isObj ? compactObject(data[key]) : data[key];
        const isEmptyObject = isObj && !Object.keys(value).length;
        if (value === undefined || isEmptyObject) return accumulator;
        return Object.assign(accumulator, {
            [key]: value
        });
    }, {});
}
function walkStats(stats, base, resultSet) {
    if (!base || resultSet.has(base.id)) return;
    resultSet.set(base.id, base);
    Object.keys(base).forEach((name)=>{
        if (name.endsWith('Id')) walkStats(stats, stats.get(base[name]), resultSet);
        else if (name.endsWith('Ids')) base[name].forEach((id)=>{
            walkStats(stats, stats.get(id), resultSet);
        });
    });
}
function filterStats(result, track, outbound) {
    const streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
    const filteredResult = new Map();
    if (track === null) return filteredResult;
    const trackStats = [];
    result.forEach((value)=>{
        if (value.type === 'track' && value.trackIdentifier === track.id) trackStats.push(value);
    });
    trackStats.forEach((trackStat)=>{
        result.forEach((stats)=>{
            if (stats.type === streamStatsType && stats.trackId === trackStat.id) walkStats(result, stats, filteredResult);
        });
    });
    return filteredResult;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"8Xxi1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetUserMedia", ()=>_getusermedia.shimGetUserMedia
);
parcelHelpers.export(exports, "shimGetDisplayMedia", ()=>_getdisplaymedia.shimGetDisplayMedia
);
parcelHelpers.export(exports, "shimMediaStream", ()=>shimMediaStream
);
parcelHelpers.export(exports, "shimOnTrack", ()=>shimOnTrack
);
parcelHelpers.export(exports, "shimGetSendersWithDtmf", ()=>shimGetSendersWithDtmf
);
parcelHelpers.export(exports, "shimGetStats", ()=>shimGetStats
);
parcelHelpers.export(exports, "shimSenderReceiverGetStats", ()=>shimSenderReceiverGetStats
);
parcelHelpers.export(exports, "shimAddTrackRemoveTrackWithNative", ()=>shimAddTrackRemoveTrackWithNative
);
parcelHelpers.export(exports, "shimAddTrackRemoveTrack", ()=>shimAddTrackRemoveTrack
);
parcelHelpers.export(exports, "shimPeerConnection", ()=>shimPeerConnection
);
// Attempt to fix ONN in plan-b mode.
parcelHelpers.export(exports, "fixNegotiationNeeded", ()=>fixNegotiationNeeded
);
var _utilsJs = require("../utils.js");
var _getusermedia = require("./getusermedia");
var _getdisplaymedia = require("./getdisplaymedia");
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimMediaStream(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
}
function shimOnTrack(window) {
    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
            get () {
                return this._ontrack;
            },
            set (f) {
                if (this._ontrack) this.removeEventListener('track', this._ontrack);
                this.addEventListener('track', this._ontrack = f);
            },
            enumerable: true,
            configurable: true
        });
        const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            if (!this._ontrackpoly) {
                this._ontrackpoly = (e)=>{
                    // onaddstream does not fire when a track is added to an existing
                    // stream. But stream.onaddtrack is implemented so we use that.
                    e.stream.addEventListener('addtrack', (te)=>{
                        let receiver;
                        if (window.RTCPeerConnection.prototype.getReceivers) receiver = this.getReceivers().find((r)=>r.track && r.track.id === te.track.id
                        );
                        else receiver = {
                            track: te.track
                        };
                        const event = new Event('track');
                        event.track = te.track;
                        event.receiver = receiver;
                        event.transceiver = {
                            receiver
                        };
                        event.streams = [
                            e.stream
                        ];
                        this.dispatchEvent(event);
                    });
                    e.stream.getTracks().forEach((track)=>{
                        let receiver;
                        if (window.RTCPeerConnection.prototype.getReceivers) receiver = this.getReceivers().find((r)=>r.track && r.track.id === track.id
                        );
                        else receiver = {
                            track
                        };
                        const event = new Event('track');
                        event.track = track;
                        event.receiver = receiver;
                        event.transceiver = {
                            receiver
                        };
                        event.streams = [
                            e.stream
                        ];
                        this.dispatchEvent(event);
                    });
                };
                this.addEventListener('addstream', this._ontrackpoly);
            }
            return origSetRemoteDescription.apply(this, arguments);
        };
    } else // even if RTCRtpTransceiver is in window, it is only used and
    // emitted in unified-plan. Unfortunately this means we need
    // to unconditionally wrap the event.
    _utilsJs.wrapPeerConnectionEvent(window, 'track', (e)=>{
        if (!e.transceiver) Object.defineProperty(e, 'transceiver', {
            value: {
                receiver: e.receiver
            }
        });
        return e;
    });
}
function shimGetSendersWithDtmf(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if (typeof window === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
        const shimSenderWithDtmf = function(pc, track) {
            return {
                track,
                get dtmf () {
                    if (this._dtmf === undefined) {
                        if (track.kind === 'audio') this._dtmf = pc.createDTMFSender(track);
                        else this._dtmf = null;
                    }
                    return this._dtmf;
                },
                _pc: pc
            };
        };
        // augment addTrack when getSenders is not available.
        if (!window.RTCPeerConnection.prototype.getSenders) {
            window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                this._senders = this._senders || [];
                return this._senders.slice(); // return a copy of the internal state.
            };
            const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                let sender = origAddTrack.apply(this, arguments);
                if (!sender) {
                    sender = shimSenderWithDtmf(this, track);
                    this._senders.push(sender);
                }
                return sender;
            };
            const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
            window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                origRemoveTrack.apply(this, arguments);
                const idx = this._senders.indexOf(sender);
                if (idx !== -1) this._senders.splice(idx, 1);
            };
        }
        const origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            this._senders = this._senders || [];
            origAddStream.apply(this, [
                stream
            ]);
            stream.getTracks().forEach((track)=>{
                this._senders.push(shimSenderWithDtmf(this, track));
            });
        };
        const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
            this._senders = this._senders || [];
            origRemoveStream.apply(this, [
                stream
            ]);
            stream.getTracks().forEach((track)=>{
                const sender = this._senders.find((s)=>s.track === track
                );
                if (sender) this._senders.splice(this._senders.indexOf(sender), 1);
            });
        };
    } else if (typeof window === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            const senders = origGetSenders.apply(this, []);
            senders.forEach((sender)=>sender._pc = this
            );
            return senders;
        };
        Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
            get () {
                if (this._dtmf === undefined) {
                    if (this.track.kind === 'audio') this._dtmf = this._pc.createDTMFSender(this.track);
                    else this._dtmf = null;
                }
                return this._dtmf;
            }
        });
    }
}
function shimGetStats(window) {
    if (!window.RTCPeerConnection) return;
    const origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;
        // If selector is a function then we are in the old style stats so just
        // pass back the original getStats format to avoid breaking old users.
        if (arguments.length > 0 && typeof selector === 'function') return origGetStats.apply(this, arguments);
        // When spec-style getStats is supported, return those when called with
        // either no arguments or the selector argument is null.
        if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) return origGetStats.apply(this, []);
        const fixChromeStats_ = function(response) {
            const standardReport = {};
            const reports = response.result();
            reports.forEach((report)=>{
                const standardStats = {
                    id: report.id,
                    timestamp: report.timestamp,
                    type: {
                        localcandidate: 'local-candidate',
                        remotecandidate: 'remote-candidate'
                    }[report.type] || report.type
                };
                report.names().forEach((name)=>{
                    standardStats[name] = report.stat(name);
                });
                standardReport[standardStats.id] = standardStats;
            });
            return standardReport;
        };
        // shim getStats with maplike support
        const makeMapStats = function(stats) {
            return new Map(Object.keys(stats).map((key)=>[
                    key,
                    stats[key]
                ]
            ));
        };
        if (arguments.length >= 2) {
            const successCallbackWrapper_ = function(response) {
                onSucc(makeMapStats(fixChromeStats_(response)));
            };
            return origGetStats.apply(this, [
                successCallbackWrapper_,
                selector
            ]);
        }
        // promise-support
        return new Promise((resolve, reject)=>{
            origGetStats.apply(this, [
                function(response) {
                    resolve(makeMapStats(fixChromeStats_(response)));
                },
                reject
            ]);
        }).then(onSucc, onErr);
    };
}
function shimSenderReceiverGetStats(window) {
    if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) return;
    // shim sender stats.
    if (!('getStats' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            const senders = origGetSenders.apply(this, []);
            senders.forEach((sender)=>sender._pc = this
            );
            return senders;
        };
        const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
            const sender = origAddTrack.apply(this, arguments);
            sender._pc = this;
            return sender;
        };
        window.RTCRtpSender.prototype.getStats = function getStats() {
            const sender = this;
            return this._pc.getStats().then((result)=>/* Note: this will include stats of all senders that
         *   send a track with the same id as sender.track as
         *   it is not possible to identify the RTCRtpSender.
         */ _utilsJs.filterStats(result, sender.track, true)
            );
        };
    }
    // shim receiver stats.
    if (!('getStats' in window.RTCRtpReceiver.prototype)) {
        const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
        if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
            const receivers = origGetReceivers.apply(this, []);
            receivers.forEach((receiver)=>receiver._pc = this
            );
            return receivers;
        };
        _utilsJs.wrapPeerConnectionEvent(window, 'track', (e)=>{
            e.receiver._pc = e.srcElement;
            return e;
        });
        window.RTCRtpReceiver.prototype.getStats = function getStats() {
            const receiver = this;
            return this._pc.getStats().then((result)=>_utilsJs.filterStats(result, receiver.track, false)
            );
        };
    }
    if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) return;
    // shim RTCPeerConnection.getStats(track).
    const origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
            const track = arguments[0];
            let sender;
            let receiver;
            let err;
            this.getSenders().forEach((s)=>{
                if (s.track === track) {
                    if (sender) err = true;
                    else sender = s;
                }
            });
            this.getReceivers().forEach((r)=>{
                if (r.track === track) {
                    if (receiver) err = true;
                    else receiver = r;
                }
                return r.track === track;
            });
            if (err || sender && receiver) return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
            else if (sender) return sender.getStats();
            else if (receiver) return receiver.getStats();
            return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
        }
        return origGetStats.apply(this, arguments);
    };
}
function shimAddTrackRemoveTrackWithNative(window) {
    // shim addTrack/removeTrack with native variants in order to make
    // the interactions with legacy getLocalStreams behave as in other browsers.
    // Keeps a mapping stream.id => [stream, rtpsenders...]
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        return Object.keys(this._shimmedLocalStreams).map((streamId)=>this._shimmedLocalStreams[streamId][0]
        );
    };
    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        if (!stream) return origAddTrack.apply(this, arguments);
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        const sender = origAddTrack.apply(this, arguments);
        if (!this._shimmedLocalStreams[stream.id]) this._shimmedLocalStreams[stream.id] = [
            stream,
            sender
        ];
        else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) this._shimmedLocalStreams[stream.id].push(sender);
        return sender;
    };
    const origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        stream.getTracks().forEach((track)=>{
            const alreadyExists = this.getSenders().find((s)=>s.track === track
            );
            if (alreadyExists) throw new DOMException('Track already exists.', 'InvalidAccessError');
        });
        const existingSenders = this.getSenders();
        origAddStream.apply(this, arguments);
        const newSenders = this.getSenders().filter((newSender)=>existingSenders.indexOf(newSender) === -1
        );
        this._shimmedLocalStreams[stream.id] = [
            stream
        ].concat(newSenders);
    };
    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        delete this._shimmedLocalStreams[stream.id];
        return origRemoveStream.apply(this, arguments);
    };
    const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        if (sender) Object.keys(this._shimmedLocalStreams).forEach((streamId)=>{
            const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
            if (idx !== -1) this._shimmedLocalStreams[streamId].splice(idx, 1);
            if (this._shimmedLocalStreams[streamId].length === 1) delete this._shimmedLocalStreams[streamId];
        });
        return origRemoveTrack.apply(this, arguments);
    };
}
function shimAddTrackRemoveTrack(window, browserDetails) {
    if (!window.RTCPeerConnection) return;
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) return shimAddTrackRemoveTrackWithNative(window);
    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    const origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        const nativeStreams = origGetLocalStreams.apply(this);
        this._reverseStreams = this._reverseStreams || {};
        return nativeStreams.map((stream)=>this._reverseStreams[stream.id]
        );
    };
    const origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        stream.getTracks().forEach((track)=>{
            const alreadyExists = this.getSenders().find((s)=>s.track === track
            );
            if (alreadyExists) throw new DOMException('Track already exists.', 'InvalidAccessError');
        });
        // Add identity mapping for consistency with addTrack.
        // Unless this is being used with a stream from addTrack.
        if (!this._reverseStreams[stream.id]) {
            const newStream = new window.MediaStream(stream.getTracks());
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            stream = newStream;
        }
        origAddStream.apply(this, [
            stream
        ]);
    };
    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        origRemoveStream.apply(this, [
            this._streams[stream.id] || stream
        ]);
        delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
        delete this._streams[stream.id];
    };
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        if (this.signalingState === 'closed') throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
        const streams = [].slice.call(arguments, 1);
        if (streams.length !== 1 || !streams[0].getTracks().find((t)=>t === track
        )) // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", 'NotSupportedError');
        const alreadyExists = this.getSenders().find((s)=>s.track === track
        );
        if (alreadyExists) throw new DOMException('Track already exists.', 'InvalidAccessError');
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        const oldStream = this._streams[stream.id];
        if (oldStream) {
            // this is using odd Chrome behaviour, use with caution:
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
            // Note: we rely on the high-level addTrack/dtmf shim to
            // create the sender with a dtmf sender.
            oldStream.addTrack(track);
            // Trigger ONN async.
            Promise.resolve().then(()=>{
                this.dispatchEvent(new Event('negotiationneeded'));
            });
        } else {
            const newStream = new window.MediaStream([
                track
            ]);
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            this.addStream(newStream);
        }
        return this.getSenders().find((s)=>s.track === track
        );
    };
    // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach((internalId)=>{
            const externalStream = pc._reverseStreams[internalId];
            const internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
        });
        return new RTCSessionDescription({
            type: description.type,
            sdp
        });
    }
    function replaceExternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach((internalId)=>{
            const externalStream = pc._reverseStreams[internalId];
            const internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
        });
        return new RTCSessionDescription({
            type: description.type,
            sdp
        });
    }
    [
        'createOffer',
        'createAnswer'
    ].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
            [method] () {
                const args = arguments;
                const isLegacyCall = arguments.length && typeof arguments[0] === 'function';
                if (isLegacyCall) return nativeMethod.apply(this, [
                    (description)=>{
                        const desc = replaceInternalStreamId(this, description);
                        args[0].apply(null, [
                            desc
                        ]);
                    },
                    (err)=>{
                        if (args[1]) args[1].apply(null, err);
                    },
                    arguments[2]
                ]);
                return nativeMethod.apply(this, arguments).then((description)=>replaceInternalStreamId(this, description)
                );
            }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    const origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
        if (!arguments.length || !arguments[0].type) return origSetLocalDescription.apply(this, arguments);
        arguments[0] = replaceExternalStreamId(this, arguments[0]);
        return origSetLocalDescription.apply(this, arguments);
    };
    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier
    const origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
    Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
        get () {
            const description = origLocalDescription.get.apply(this);
            if (description.type === '') return description;
            return replaceInternalStreamId(this, description);
        }
    });
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        if (this.signalingState === 'closed') throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
        // We can not yet check for sender instanceof RTCRtpSender
        // since we shim RTPSender. So we check if sender._pc is set.
        if (!sender._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", 'TypeError');
        const isLocal = sender._pc === this;
        if (!isLocal) throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
        // Search for the native stream the senders track belongs to.
        this._streams = this._streams || {};
        let stream;
        Object.keys(this._streams).forEach((streamid)=>{
            const hasTrack = this._streams[streamid].getTracks().find((track)=>sender.track === track
            );
            if (hasTrack) stream = this._streams[streamid];
        });
        if (stream) {
            if (stream.getTracks().length === 1) // if this is the last track of the stream, remove the stream. This
            // takes care of any shimmed _senders.
            this.removeStream(this._reverseStreams[stream.id]);
            else // relying on the same odd chrome behaviour as above.
            stream.removeTrack(sender.track);
            this.dispatchEvent(new Event('negotiationneeded'));
        }
    };
}
function shimPeerConnection(window, browserDetails) {
    if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) // very basic support for old versions.
    window.RTCPeerConnection = window.webkitRTCPeerConnection;
    if (!window.RTCPeerConnection) return;
    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    if (browserDetails.version < 53) [
        'setLocalDescription',
        'setRemoteDescription',
        'addIceCandidate'
    ].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
            [method] () {
                arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
            }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
}
function fixNegotiationNeeded(window, browserDetails) {
    _utilsJs.wrapPeerConnectionEvent(window, 'negotiationneeded', (e)=>{
        const pc = e.target;
        if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
            if (pc.signalingState !== 'stable') return;
        }
        return e;
    });
}

},{"../utils.js":"fZqjY","./getusermedia":"c2k0M","./getdisplaymedia":"kLmJQ","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"c2k0M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetUserMedia", ()=>shimGetUserMedia
);
var _utilsJs = require("../utils.js");
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
const logging = _utilsJs.log;
function shimGetUserMedia(window, browserDetails) {
    const navigator = window && window.navigator;
    if (!navigator.mediaDevices) return;
    const constraintsToChrome_ = function(c) {
        if (typeof c !== 'object' || c.mandatory || c.optional) return c;
        const cc = {};
        Object.keys(c).forEach((key)=>{
            if (key === 'require' || key === 'advanced' || key === 'mediaSource') return;
            const r = typeof c[key] === 'object' ? c[key] : {
                ideal: c[key]
            };
            if (r.exact !== undefined && typeof r.exact === 'number') r.min = r.max = r.exact;
            const oldname_ = function(prefix, name) {
                if (prefix) return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                return name === 'deviceId' ? 'sourceId' : name;
            };
            if (r.ideal !== undefined) {
                cc.optional = cc.optional || [];
                let oc = {};
                if (typeof r.ideal === 'number') {
                    oc[oldname_('min', key)] = r.ideal;
                    cc.optional.push(oc);
                    oc = {};
                    oc[oldname_('max', key)] = r.ideal;
                    cc.optional.push(oc);
                } else {
                    oc[oldname_('', key)] = r.ideal;
                    cc.optional.push(oc);
                }
            }
            if (r.exact !== undefined && typeof r.exact !== 'number') {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_('', key)] = r.exact;
            } else [
                'min',
                'max'
            ].forEach((mix)=>{
                if (r[mix] !== undefined) {
                    cc.mandatory = cc.mandatory || {};
                    cc.mandatory[oldname_(mix, key)] = r[mix];
                }
            });
        });
        if (c.advanced) cc.optional = (cc.optional || []).concat(c.advanced);
        return cc;
    };
    const shimConstraints_ = function(constraints, func) {
        if (browserDetails.version >= 61) return func(constraints);
        constraints = JSON.parse(JSON.stringify(constraints));
        if (constraints && typeof constraints.audio === 'object') {
            const remap = function(obj, a, b) {
                if (a in obj && !(b in obj)) {
                    obj[b] = obj[a];
                    delete obj[a];
                }
            };
            constraints = JSON.parse(JSON.stringify(constraints));
            remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
            remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
            constraints.audio = constraintsToChrome_(constraints.audio);
        }
        if (constraints && typeof constraints.video === 'object') {
            // Shim facingMode for mobile & surface pro.
            let face = constraints.video.facingMode;
            face = face && (typeof face === 'object' ? face : {
                ideal: face
            });
            const getSupportedFacingModeLies = browserDetails.version < 66;
            if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                delete constraints.video.facingMode;
                let matches;
                if (face.exact === 'environment' || face.ideal === 'environment') matches = [
                    'back',
                    'rear'
                ];
                else if (face.exact === 'user' || face.ideal === 'user') matches = [
                    'front'
                ];
                if (matches) // Look for matches in label, or use last cam for back (typical).
                return navigator.mediaDevices.enumerateDevices().then((devices)=>{
                    devices = devices.filter((d)=>d.kind === 'videoinput'
                    );
                    let dev = devices.find((d)=>matches.some((match)=>d.label.toLowerCase().includes(match)
                        )
                    );
                    if (!dev && devices.length && matches.includes('back')) dev = devices[devices.length - 1]; // more likely the back cam
                    if (dev) constraints.video.deviceId = face.exact ? {
                        exact: dev.deviceId
                    } : {
                        ideal: dev.deviceId
                    };
                    constraints.video = constraintsToChrome_(constraints.video);
                    logging('chrome: ' + JSON.stringify(constraints));
                    return func(constraints);
                });
            }
            constraints.video = constraintsToChrome_(constraints.video);
        }
        logging('chrome: ' + JSON.stringify(constraints));
        return func(constraints);
    };
    const shimError_ = function(e) {
        if (browserDetails.version >= 64) return e;
        return {
            name: ({
                PermissionDeniedError: 'NotAllowedError',
                PermissionDismissedError: 'NotAllowedError',
                InvalidStateError: 'NotAllowedError',
                DevicesNotFoundError: 'NotFoundError',
                ConstraintNotSatisfiedError: 'OverconstrainedError',
                TrackStartError: 'NotReadableError',
                MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                MediaDeviceKillSwitchOn: 'NotAllowedError',
                TabCaptureError: 'AbortError',
                ScreenCaptureError: 'AbortError',
                DeviceCaptureError: 'AbortError'
            })[e.name] || e.name,
            message: e.message,
            constraint: e.constraint || e.constraintName,
            toString () {
                return this.name + (this.message && ': ') + this.message;
            }
        };
    };
    const getUserMedia_ = function(constraints, onSuccess, onError) {
        shimConstraints_(constraints, (c)=>{
            navigator.webkitGetUserMedia(c, onSuccess, (e)=>{
                if (onError) onError(shimError_(e));
            });
        });
    };
    navigator.getUserMedia = getUserMedia_.bind(navigator);
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    if (navigator.mediaDevices.getUserMedia) {
        const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(cs) {
            return shimConstraints_(cs, (c)=>origGetUserMedia(c).then((stream)=>{
                    if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                        stream.getTracks().forEach((track)=>{
                            track.stop();
                        });
                        throw new DOMException('', 'NotFoundError');
                    }
                    return stream;
                }, (e)=>Promise.reject(shimError_(e))
                )
            );
        };
    }
}

},{"../utils.js":"fZqjY","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"kLmJQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetDisplayMedia", ()=>shimGetDisplayMedia
);
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimGetDisplayMedia(window, getSourceId) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) return;
    if (!window.navigator.mediaDevices) return;
    // getSourceId is a function that returns a promise resolving with
    // the sourceId of the screen/window/tab to be shared.
    if (typeof getSourceId !== 'function') {
        console.error("shimGetDisplayMedia: getSourceId argument is not a function");
        return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
        return getSourceId(constraints).then((sourceId)=>{
            const widthSpecified = constraints.video && constraints.video.width;
            const heightSpecified = constraints.video && constraints.video.height;
            const frameRateSpecified = constraints.video && constraints.video.frameRate;
            constraints.video = {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: sourceId,
                    maxFrameRate: frameRateSpecified || 3
                }
            };
            if (widthSpecified) constraints.video.mandatory.maxWidth = widthSpecified;
            if (heightSpecified) constraints.video.mandatory.maxHeight = heightSpecified;
            return window.navigator.mediaDevices.getUserMedia(constraints);
        });
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"5QE6V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetUserMedia", ()=>_getusermedia.shimGetUserMedia
);
parcelHelpers.export(exports, "shimGetDisplayMedia", ()=>_getdisplaymedia.shimGetDisplayMedia
);
parcelHelpers.export(exports, "shimPeerConnection", ()=>shimPeerConnection
);
parcelHelpers.export(exports, "shimReplaceTrack", ()=>shimReplaceTrack
);
var _utils = require("../utils");
var _filtericeservers = require("./filtericeservers");
var _rtcpeerconnectionShim = require("rtcpeerconnection-shim");
var _rtcpeerconnectionShimDefault = parcelHelpers.interopDefault(_rtcpeerconnectionShim);
var _getusermedia = require("./getusermedia");
var _getdisplaymedia = require("./getdisplaymedia");
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimPeerConnection(window, browserDetails) {
    if (window.RTCIceGatherer) {
        if (!window.RTCIceCandidate) window.RTCIceCandidate = function RTCIceCandidate(args) {
            return args;
        };
        if (!window.RTCSessionDescription) window.RTCSessionDescription = function RTCSessionDescription(args) {
            return args;
        };
        // this adds an additional event listener to MediaStrackTrack that signals
        // when a tracks enabled property was changed. Workaround for a bug in
        // addStream, see below. No longer required in 15025+
        if (browserDetails.version < 15025) {
            const origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
            Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
                set (value) {
                    origMSTEnabled.set.call(this, value);
                    const ev = new Event('enabled');
                    ev.enabled = value;
                    this.dispatchEvent(ev);
                }
            });
        }
    }
    // ORTC defines the DTMF sender a bit different.
    // https://github.com/w3c/ortc/issues/714
    if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get () {
            if (this._dtmf === undefined) {
                if (this.track.kind === 'audio') this._dtmf = new window.RTCDtmfSender(this);
                else if (this.track.kind === 'video') this._dtmf = null;
            }
            return this._dtmf;
        }
    });
    // Edge currently only implements the RTCDtmfSender, not the
    // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
    if (window.RTCDtmfSender && !window.RTCDTMFSender) window.RTCDTMFSender = window.RTCDtmfSender;
    const RTCPeerConnectionShim = _rtcpeerconnectionShimDefault.default(window, browserDetails.version);
    window.RTCPeerConnection = function RTCPeerConnection(config) {
        if (config && config.iceServers) {
            config.iceServers = _filtericeservers.filterIceServers(config.iceServers, browserDetails.version);
            _utils.log('ICE servers after filtering:', config.iceServers);
        }
        return new RTCPeerConnectionShim(config);
    };
    window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
}
function shimReplaceTrack(window) {
    // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
    if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
}

},{"../utils":"fZqjY","./filtericeservers":"6xBLX","rtcpeerconnection-shim":"g5obJ","./getusermedia":"d5T6f","./getdisplaymedia":"7272l","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"6xBLX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
parcelHelpers.export(exports, "filterIceServers", ()=>filterIceServers
);
var _utils = require("../utils");
/*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function filterIceServers(iceServers, edgeVersion) {
    let hasTurn = false;
    iceServers = JSON.parse(JSON.stringify(iceServers));
    return iceServers.filter((server)=>{
        if (server && (server.urls || server.url)) {
            let urls = server.urls || server.url;
            if (server.url && !server.urls) _utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
            const isString = typeof urls === 'string';
            if (isString) urls = [
                urls
            ];
            urls = urls.filter((url)=>{
                // filter STUN unconditionally.
                if (url.indexOf('stun:') === 0) return false;
                const validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
                if (validTurn && !hasTurn) {
                    hasTurn = true;
                    return true;
                }
                return validTurn && !hasTurn;
            });
            delete server.url;
            server.urls = isString ? urls[0] : urls;
            return !!urls.length;
        }
    });
}

},{"../utils":"fZqjY","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"g5obJ":[function(require,module,exports) {
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
var SDPUtils = require('sdp');
function fixStatsType(stat) {
    return ({
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
    })[stat.type] || stat.type;
}
function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
    var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
    // Map ICE parameters (ufrag, pwd) to SDP.
    sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());
    // Map DTLS parameters to SDP.
    sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');
    sdp += 'a=mid:' + transceiver.mid + '\r\n';
    if (transceiver.rtpSender && transceiver.rtpReceiver) sdp += 'a=sendrecv\r\n';
    else if (transceiver.rtpSender) sdp += 'a=sendonly\r\n';
    else if (transceiver.rtpReceiver) sdp += 'a=recvonly\r\n';
    else sdp += 'a=inactive\r\n';
    if (transceiver.rtpSender) {
        var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
        transceiver.rtpSender._initialTrackId = trackId;
        // spec.
        var msid = 'msid:' + (stream ? stream.id : '-') + ' ' + trackId + '\r\n';
        sdp += 'a=' + msid;
        // for Chrome. Legacy should no longer be required.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
        // RTX
        if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
            sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
        }
    }
    // FIXME: this should be written by writeRtpDescription.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
    if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
    return sdp;
}
// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
function filterIceServers(iceServers, edgeVersion) {
    var hasTurn = false;
    iceServers = JSON.parse(JSON.stringify(iceServers));
    return iceServers.filter(function(server) {
        if (server && (server.urls || server.url)) {
            var urls = server.urls || server.url;
            if (server.url && !server.urls) console.warn('RTCIceServer.url is deprecated! Use urls instead.');
            var isString = typeof urls === 'string';
            if (isString) urls = [
                urls
            ];
            urls = urls.filter(function(url) {
                var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;
                if (validTurn) {
                    hasTurn = true;
                    return true;
                }
                return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
            });
            delete server.url;
            server.urls = isString ? urls[0] : urls;
            return !!urls.length;
        }
    });
}
// Determines the intersection of local and remote capabilities.
function getCommonCapabilities(localCapabilities, remoteCapabilities) {
    var commonCapabilities = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: []
    };
    var findCodecByPayloadType = function(pt, codecs) {
        pt = parseInt(pt, 10);
        for(var i = 0; i < codecs.length; i++){
            if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) return codecs[i];
        }
    };
    var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
        var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
        var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
        return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
    };
    localCapabilities.codecs.forEach(function(lCodec) {
        for(var i = 0; i < remoteCapabilities.codecs.length; i++){
            var rCodec = remoteCapabilities.codecs[i];
            if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
                if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
                    // for RTX we need to find the local rtx that has a apt
                    // which points to the same local codec as the remote one.
                    if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) continue;
                }
                rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
                // number of channels is the highest common number of channels
                rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels);
                // push rCodec so we reply with offerer payload type
                commonCapabilities.codecs.push(rCodec);
                // determine common feedback mechanisms
                rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
                    for(var j = 0; j < lCodec.rtcpFeedback.length; j++){
                        if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) return true;
                    }
                    return false;
                });
                break;
            }
        }
    });
    localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
        for(var i = 0; i < remoteCapabilities.headerExtensions.length; i++){
            var rHeaderExtension = remoteCapabilities.headerExtensions[i];
            if (lHeaderExtension.uri === rHeaderExtension.uri) {
                commonCapabilities.headerExtensions.push(rHeaderExtension);
                break;
            }
        }
    });
    // FIXME: fecMechanisms
    return commonCapabilities;
}
// is action=setLocalDescription with type allowed in signalingState
function isActionAllowedInSignalingState(action, type, signalingState) {
    return ({
        offer: {
            setLocalDescription: [
                'stable',
                'have-local-offer'
            ],
            setRemoteDescription: [
                'stable',
                'have-remote-offer'
            ]
        },
        answer: {
            setLocalDescription: [
                'have-remote-offer',
                'have-local-pranswer'
            ],
            setRemoteDescription: [
                'have-local-offer',
                'have-remote-pranswer'
            ]
        }
    })[type][action].indexOf(signalingState) !== -1;
}
function maybeAddCandidate(iceTransport, candidate) {
    // Edge's internal representation adds some fields therefore
    // not all fieldѕ are taken into account.
    var alreadyAdded = iceTransport.getRemoteCandidates().find(function(remoteCandidate) {
        return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
    });
    if (!alreadyAdded) iceTransport.addRemoteCandidate(candidate);
    return !alreadyAdded;
}
function makeError(name, description) {
    var e = new Error(description);
    e.name = name;
    // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
    e.code = ({
        NotSupportedError: 9,
        InvalidStateError: 11,
        InvalidAccessError: 15,
        TypeError: undefined,
        OperationError: undefined
    })[name];
    return e;
}
module.exports = function(window, edgeVersion) {
    // https://w3c.github.io/mediacapture-main/#mediastream
    // Helper function to add the track to the stream and
    // dispatch the event ourselves.
    function addTrackToStreamAndFireEvent(track, stream) {
        stream.addTrack(track);
        stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack', {
            track: track
        }));
    }
    function removeTrackFromStreamAndFireEvent(track, stream) {
        stream.removeTrack(track);
        stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack', {
            track: track
        }));
    }
    function fireAddTrack(pc, track, receiver, streams) {
        var trackEvent = new Event('track');
        trackEvent.track = track;
        trackEvent.receiver = receiver;
        trackEvent.transceiver = {
            receiver: receiver
        };
        trackEvent.streams = streams;
        window.setTimeout(function() {
            pc._dispatchEvent('track', trackEvent);
        });
    }
    var RTCPeerConnection = function(config) {
        var pc = this;
        var _eventTarget = document.createDocumentFragment();
        [
            'addEventListener',
            'removeEventListener',
            'dispatchEvent'
        ].forEach(function(method) {
            pc[method] = _eventTarget[method].bind(_eventTarget);
        });
        this.canTrickleIceCandidates = null;
        this.needNegotiation = false;
        this.localStreams = [];
        this.remoteStreams = [];
        this._localDescription = null;
        this._remoteDescription = null;
        this.signalingState = 'stable';
        this.iceConnectionState = 'new';
        this.connectionState = 'new';
        this.iceGatheringState = 'new';
        config = JSON.parse(JSON.stringify(config || {}));
        this.usingBundle = config.bundlePolicy === 'max-bundle';
        if (config.rtcpMuxPolicy === 'negotiate') throw makeError('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
        else if (!config.rtcpMuxPolicy) config.rtcpMuxPolicy = 'require';
        switch(config.iceTransportPolicy){
            case 'all':
            case 'relay':
                break;
            default:
                config.iceTransportPolicy = 'all';
                break;
        }
        switch(config.bundlePolicy){
            case 'balanced':
            case 'max-compat':
            case 'max-bundle':
                break;
            default:
                config.bundlePolicy = 'balanced';
                break;
        }
        config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);
        this._iceGatherers = [];
        if (config.iceCandidatePoolSize) for(var i = config.iceCandidatePoolSize; i > 0; i--)this._iceGatherers.push(new window.RTCIceGatherer({
            iceServers: config.iceServers,
            gatherPolicy: config.iceTransportPolicy
        }));
        else config.iceCandidatePoolSize = 0;
        this._config = config;
        // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
        // everything that is needed to describe a SDP m-line.
        this.transceivers = [];
        this._sdpSessionId = SDPUtils.generateSessionId();
        this._sdpSessionVersion = 0;
        this._dtlsRole = undefined; // role for a=setup to use in answers.
        this._isClosed = false;
    };
    Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
        configurable: true,
        get: function() {
            return this._localDescription;
        }
    });
    Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
        configurable: true,
        get: function() {
            return this._remoteDescription;
        }
    });
    // set up event handlers on prototype
    RTCPeerConnection.prototype.onicecandidate = null;
    RTCPeerConnection.prototype.onaddstream = null;
    RTCPeerConnection.prototype.ontrack = null;
    RTCPeerConnection.prototype.onremovestream = null;
    RTCPeerConnection.prototype.onsignalingstatechange = null;
    RTCPeerConnection.prototype.oniceconnectionstatechange = null;
    RTCPeerConnection.prototype.onconnectionstatechange = null;
    RTCPeerConnection.prototype.onicegatheringstatechange = null;
    RTCPeerConnection.prototype.onnegotiationneeded = null;
    RTCPeerConnection.prototype.ondatachannel = null;
    RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
        if (this._isClosed) return;
        this.dispatchEvent(event);
        if (typeof this['on' + name] === 'function') this['on' + name](event);
    };
    RTCPeerConnection.prototype._emitGatheringStateChange = function() {
        var event = new Event('icegatheringstatechange');
        this._dispatchEvent('icegatheringstatechange', event);
    };
    RTCPeerConnection.prototype.getConfiguration = function() {
        return this._config;
    };
    RTCPeerConnection.prototype.getLocalStreams = function() {
        return this.localStreams;
    };
    RTCPeerConnection.prototype.getRemoteStreams = function() {
        return this.remoteStreams;
    };
    // internal helper to create a transceiver object.
    // (which is not yet the same as the WebRTC 1.0 transceiver)
    RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
        var hasBundleTransport = this.transceivers.length > 0;
        var transceiver = {
            track: null,
            iceGatherer: null,
            iceTransport: null,
            dtlsTransport: null,
            localCapabilities: null,
            remoteCapabilities: null,
            rtpSender: null,
            rtpReceiver: null,
            kind: kind,
            mid: null,
            sendEncodingParameters: null,
            recvEncodingParameters: null,
            stream: null,
            associatedRemoteMediaStreams: [],
            wantReceive: true
        };
        if (this.usingBundle && hasBundleTransport) {
            transceiver.iceTransport = this.transceivers[0].iceTransport;
            transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
        } else {
            var transports = this._createIceAndDtlsTransports();
            transceiver.iceTransport = transports.iceTransport;
            transceiver.dtlsTransport = transports.dtlsTransport;
        }
        if (!doNotAdd) this.transceivers.push(transceiver);
        return transceiver;
    };
    RTCPeerConnection.prototype.addTrack = function(track, stream) {
        if (this._isClosed) throw makeError('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
        var alreadyExists = this.transceivers.find(function(s) {
            return s.track === track;
        });
        if (alreadyExists) throw makeError('InvalidAccessError', 'Track already exists.');
        var transceiver;
        for(var i = 0; i < this.transceivers.length; i++)if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) transceiver = this.transceivers[i];
        if (!transceiver) transceiver = this._createTransceiver(track.kind);
        this._maybeFireNegotiationNeeded();
        if (this.localStreams.indexOf(stream) === -1) this.localStreams.push(stream);
        transceiver.track = track;
        transceiver.stream = stream;
        transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
        return transceiver.rtpSender;
    };
    RTCPeerConnection.prototype.addStream = function(stream) {
        var pc = this;
        if (edgeVersion >= 15025) stream.getTracks().forEach(function(track) {
            pc.addTrack(track, stream);
        });
        else {
            // Clone is necessary for local demos mostly, attaching directly
            // to two different senders does not work (build 10547).
            // Fixed in 15025 (or earlier)
            var clonedStream = stream.clone();
            stream.getTracks().forEach(function(track, idx) {
                var clonedTrack = clonedStream.getTracks()[idx];
                track.addEventListener('enabled', function(event) {
                    clonedTrack.enabled = event.enabled;
                });
            });
            clonedStream.getTracks().forEach(function(track) {
                pc.addTrack(track, clonedStream);
            });
        }
    };
    RTCPeerConnection.prototype.removeTrack = function(sender) {
        if (this._isClosed) throw makeError('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
        if (!(sender instanceof window.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
        var transceiver = this.transceivers.find(function(t) {
            return t.rtpSender === sender;
        });
        if (!transceiver) throw makeError('InvalidAccessError', 'Sender was not created by this connection.');
        var stream = transceiver.stream;
        transceiver.rtpSender.stop();
        transceiver.rtpSender = null;
        transceiver.track = null;
        transceiver.stream = null;
        // remove the stream from the set of local streams
        var localStreams = this.transceivers.map(function(t) {
            return t.stream;
        });
        if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) this.localStreams.splice(this.localStreams.indexOf(stream), 1);
        this._maybeFireNegotiationNeeded();
    };
    RTCPeerConnection.prototype.removeStream = function(stream) {
        var pc = this;
        stream.getTracks().forEach(function(track) {
            var sender = pc.getSenders().find(function(s) {
                return s.track === track;
            });
            if (sender) pc.removeTrack(sender);
        });
    };
    RTCPeerConnection.prototype.getSenders = function() {
        return this.transceivers.filter(function(transceiver) {
            return !!transceiver.rtpSender;
        }).map(function(transceiver) {
            return transceiver.rtpSender;
        });
    };
    RTCPeerConnection.prototype.getReceivers = function() {
        return this.transceivers.filter(function(transceiver) {
            return !!transceiver.rtpReceiver;
        }).map(function(transceiver) {
            return transceiver.rtpReceiver;
        });
    };
    RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex, usingBundle) {
        var pc = this;
        if (usingBundle && sdpMLineIndex > 0) return this.transceivers[0].iceGatherer;
        else if (this._iceGatherers.length) return this._iceGatherers.shift();
        var iceGatherer = new window.RTCIceGatherer({
            iceServers: this._config.iceServers,
            gatherPolicy: this._config.iceTransportPolicy
        });
        Object.defineProperty(iceGatherer, 'state', {
            value: 'new',
            writable: true
        });
        this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
        this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
            var end = !event.candidate || Object.keys(event.candidate).length === 0;
            // polyfill since RTCIceGatherer.state is not implemented in
            // Edge 10547 yet.
            iceGatherer.state = end ? 'completed' : 'gathering';
            if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
        };
        iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
        return iceGatherer;
    };
    // start gathering from an RTCIceGatherer.
    RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
        var pc = this;
        var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
        if (iceGatherer.onlocalcandidate) return;
        var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
        this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
        iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
        iceGatherer.onlocalcandidate = function(evt) {
            if (pc.usingBundle && sdpMLineIndex > 0) // if we know that we use bundle we can drop candidates with
            // ѕdpMLineIndex > 0. If we don't do this then our state gets
            // confused since we dispose the extra ice gatherer.
            return;
            var event = new Event('icecandidate');
            event.candidate = {
                sdpMid: mid,
                sdpMLineIndex: sdpMLineIndex
            };
            var cand = evt.candidate;
            // Edge emits an empty object for RTCIceCandidateComplete‥
            var end = !cand || Object.keys(cand).length === 0;
            if (end) // polyfill since RTCIceGatherer.state is not implemented in
            // Edge 10547 yet.
            {
                if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') iceGatherer.state = 'completed';
            } else {
                if (iceGatherer.state === 'new') iceGatherer.state = 'gathering';
                // RTCIceCandidate doesn't have a component, needs to be added
                cand.component = 1;
                // also the usernameFragment. TODO: update SDP to take both variants.
                cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;
                var serializedCandidate = SDPUtils.writeCandidate(cand);
                event.candidate = Object.assign(event.candidate, SDPUtils.parseCandidate(serializedCandidate));
                event.candidate.candidate = serializedCandidate;
                event.candidate.toJSON = function() {
                    return {
                        candidate: event.candidate.candidate,
                        sdpMid: event.candidate.sdpMid,
                        sdpMLineIndex: event.candidate.sdpMLineIndex,
                        usernameFragment: event.candidate.usernameFragment
                    };
                };
            }
            // update local description.
            var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
            if (!end) sections[event.candidate.sdpMLineIndex] += 'a=' + event.candidate.candidate + '\r\n';
            else sections[event.candidate.sdpMLineIndex] += 'a=end-of-candidates\r\n';
            pc._localDescription.sdp = SDPUtils.getDescription(pc._localDescription.sdp) + sections.join('');
            var complete = pc.transceivers.every(function(transceiver) {
                return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
            });
            if (pc.iceGatheringState !== 'gathering') {
                pc.iceGatheringState = 'gathering';
                pc._emitGatheringStateChange();
            }
            // Emit candidate. Also emit null candidate when all gatherers are
            // complete.
            if (!end) pc._dispatchEvent('icecandidate', event);
            if (complete) {
                pc._dispatchEvent('icecandidate', new Event('icecandidate'));
                pc.iceGatheringState = 'complete';
                pc._emitGatheringStateChange();
            }
        };
        // emit already gathered candidates.
        window.setTimeout(function() {
            bufferedCandidateEvents.forEach(function(e) {
                iceGatherer.onlocalcandidate(e);
            });
        }, 0);
    };
    // Create ICE transport and DTLS transport.
    RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
        var pc = this;
        var iceTransport = new window.RTCIceTransport(null);
        iceTransport.onicestatechange = function() {
            pc._updateIceConnectionState();
            pc._updateConnectionState();
        };
        var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
        dtlsTransport.ondtlsstatechange = function() {
            pc._updateConnectionState();
        };
        dtlsTransport.onerror = function() {
            // onerror does not set state to failed by itself.
            Object.defineProperty(dtlsTransport, 'state', {
                value: 'failed',
                writable: true
            });
            pc._updateConnectionState();
        };
        return {
            iceTransport: iceTransport,
            dtlsTransport: dtlsTransport
        };
    };
    // Destroy ICE gatherer, ICE transport and DTLS transport.
    // Without triggering the callbacks.
    RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(sdpMLineIndex) {
        var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
        if (iceGatherer) {
            delete iceGatherer.onlocalcandidate;
            delete this.transceivers[sdpMLineIndex].iceGatherer;
        }
        var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
        if (iceTransport) {
            delete iceTransport.onicestatechange;
            delete this.transceivers[sdpMLineIndex].iceTransport;
        }
        var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
        if (dtlsTransport) {
            delete dtlsTransport.ondtlsstatechange;
            delete dtlsTransport.onerror;
            delete this.transceivers[sdpMLineIndex].dtlsTransport;
        }
    };
    // Start the RTP Sender and Receiver for a transceiver.
    RTCPeerConnection.prototype._transceive = function(transceiver, send, recv) {
        var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
        if (send && transceiver.rtpSender) {
            params.encodings = transceiver.sendEncodingParameters;
            params.rtcp = {
                cname: SDPUtils.localCName,
                compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.recvEncodingParameters.length) params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
            transceiver.rtpSender.send(params);
        }
        if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
            // remove RTX field in Edge 14942
            if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) transceiver.recvEncodingParameters.forEach(function(p) {
                delete p.rtx;
            });
            if (transceiver.recvEncodingParameters.length) params.encodings = transceiver.recvEncodingParameters;
            else params.encodings = [
                {}
            ];
            params.rtcp = {
                compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.rtcpParameters.cname) params.rtcp.cname = transceiver.rtcpParameters.cname;
            if (transceiver.sendEncodingParameters.length) params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
            transceiver.rtpReceiver.receive(params);
        }
    };
    RTCPeerConnection.prototype.setLocalDescription = function(description) {
        var pc = this;
        // Note: pranswer is not supported.
        if ([
            'offer',
            'answer'
        ].indexOf(description.type) === -1) return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
        if (!isActionAllowedInSignalingState('setLocalDescription', description.type, pc.signalingState) || pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not set local ' + description.type + ' in state ' + pc.signalingState));
        var sections;
        var sessionpart;
        if (description.type === 'offer') {
            // VERY limited support for SDP munging. Limited to:
            // * changing the order of codecs
            sections = SDPUtils.splitSections(description.sdp);
            sessionpart = sections.shift();
            sections.forEach(function(mediaSection, sdpMLineIndex) {
                var caps = SDPUtils.parseRtpParameters(mediaSection);
                pc.transceivers[sdpMLineIndex].localCapabilities = caps;
            });
            pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
                pc._gather(transceiver.mid, sdpMLineIndex);
            });
        } else if (description.type === 'answer') {
            sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
            sessionpart = sections.shift();
            var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
            sections.forEach(function(mediaSection, sdpMLineIndex) {
                var transceiver = pc.transceivers[sdpMLineIndex];
                var iceGatherer = transceiver.iceGatherer;
                var iceTransport = transceiver.iceTransport;
                var dtlsTransport = transceiver.dtlsTransport;
                var localCapabilities = transceiver.localCapabilities;
                var remoteCapabilities = transceiver.remoteCapabilities;
                // treat bundle-only as not-rejected.
                var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
                if (!rejected && !transceiver.rejected) {
                    var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                    var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                    if (isIceLite) remoteDtlsParameters.role = 'server';
                    if (!pc.usingBundle || sdpMLineIndex === 0) {
                        pc._gather(transceiver.mid, sdpMLineIndex);
                        if (iceTransport.state === 'new') iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
                        if (dtlsTransport.state === 'new') dtlsTransport.start(remoteDtlsParameters);
                    }
                    // Calculate intersection of capabilities.
                    var params = getCommonCapabilities(localCapabilities, remoteCapabilities);
                    // Start the RTCRtpSender. The RTCRtpReceiver for this
                    // transceiver has already been started in setRemoteDescription.
                    pc._transceive(transceiver, params.codecs.length > 0, false);
                }
            });
        }
        pc._localDescription = {
            type: description.type,
            sdp: description.sdp
        };
        if (description.type === 'offer') pc._updateSignalingState('have-local-offer');
        else pc._updateSignalingState('stable');
        return Promise.resolve();
    };
    RTCPeerConnection.prototype.setRemoteDescription = function(description) {
        var pc = this;
        // Note: pranswer is not supported.
        if ([
            'offer',
            'answer'
        ].indexOf(description.type) === -1) return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
        if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, pc.signalingState) || pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not set remote ' + description.type + ' in state ' + pc.signalingState));
        var streams = {};
        pc.remoteStreams.forEach(function(stream) {
            streams[stream.id] = stream;
        });
        var receiverList = [];
        var sections = SDPUtils.splitSections(description.sdp);
        var sessionpart = sections.shift();
        var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
        var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
        pc.usingBundle = usingBundle;
        var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];
        if (iceOptions) pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
        else pc.canTrickleIceCandidates = false;
        sections.forEach(function(mediaSection, sdpMLineIndex) {
            var lines = SDPUtils.splitLines(mediaSection);
            var kind = SDPUtils.getKind(mediaSection);
            // treat bundle-only as not-rejected.
            var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
            var protocol = lines[0].substr(2).split(' ')[2];
            var direction = SDPUtils.getDirection(mediaSection, sessionpart);
            var remoteMsid = SDPUtils.parseMsid(mediaSection);
            var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();
            // Reject datachannels which are not implemented yet.
            if (rejected || kind === 'application' && (protocol === 'DTLS/SCTP' || protocol === 'UDP/DTLS/SCTP')) {
                // TODO: this is dangerous in the case where a non-rejected m-line
                //     becomes rejected.
                pc.transceivers[sdpMLineIndex] = {
                    mid: mid,
                    kind: kind,
                    protocol: protocol,
                    rejected: true
                };
                return;
            }
            if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) // recycle a rejected transceiver.
            pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
            var transceiver;
            var iceGatherer;
            var iceTransport;
            var dtlsTransport;
            var rtpReceiver;
            var sendEncodingParameters;
            var recvEncodingParameters;
            var localCapabilities;
            var track;
            // FIXME: ensure the mediaSection has rtcp-mux set.
            var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
            var remoteIceParameters;
            var remoteDtlsParameters;
            if (!rejected) {
                remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                remoteDtlsParameters.role = 'client';
            }
            recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);
            var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);
            var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
            var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function(cand) {
                return SDPUtils.parseCandidate(cand);
            }).filter(function(cand) {
                return cand.component === 1;
            });
            // Check if we can use BUNDLE and dispose transports.
            if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
                pc._disposeIceAndDtlsTransports(sdpMLineIndex);
                pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
                pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
                pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
                if (pc.transceivers[sdpMLineIndex].rtpSender) pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
                if (pc.transceivers[sdpMLineIndex].rtpReceiver) pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
            }
            if (description.type === 'offer' && !rejected) {
                transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
                transceiver.mid = mid;
                if (!transceiver.iceGatherer) transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
                if (cands.length && transceiver.iceTransport.state === 'new') {
                    if (isComplete && (!usingBundle || sdpMLineIndex === 0)) transceiver.iceTransport.setRemoteCandidates(cands);
                    else cands.forEach(function(candidate) {
                        maybeAddCandidate(transceiver.iceTransport, candidate);
                    });
                }
                localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);
                // filter RTX until additional stuff needed for RTX is implemented
                // in adapter.js
                if (edgeVersion < 15019) localCapabilities.codecs = localCapabilities.codecs.filter(function(codec) {
                    return codec.name !== 'rtx';
                });
                sendEncodingParameters = transceiver.sendEncodingParameters || [
                    {
                        ssrc: (2 * sdpMLineIndex + 2) * 1001
                    }
                ];
                // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                var isNewTrack = false;
                if (direction === 'sendrecv' || direction === 'sendonly') {
                    isNewTrack = !transceiver.rtpReceiver;
                    rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
                    if (isNewTrack) {
                        var stream;
                        track = rtpReceiver.track;
                        // FIXME: does not work with Plan B.
                        if (remoteMsid && remoteMsid.stream === '-') ;
                        else if (remoteMsid) {
                            if (!streams[remoteMsid.stream]) {
                                streams[remoteMsid.stream] = new window.MediaStream();
                                Object.defineProperty(streams[remoteMsid.stream], 'id', {
                                    get: function() {
                                        return remoteMsid.stream;
                                    }
                                });
                            }
                            Object.defineProperty(track, 'id', {
                                get: function() {
                                    return remoteMsid.track;
                                }
                            });
                            stream = streams[remoteMsid.stream];
                        } else {
                            if (!streams.default) streams.default = new window.MediaStream();
                            stream = streams.default;
                        }
                        if (stream) {
                            addTrackToStreamAndFireEvent(track, stream);
                            transceiver.associatedRemoteMediaStreams.push(stream);
                        }
                        receiverList.push([
                            track,
                            rtpReceiver,
                            stream
                        ]);
                    }
                } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                    transceiver.associatedRemoteMediaStreams.forEach(function(s) {
                        var nativeTrack = s.getTracks().find(function(t) {
                            return t.id === transceiver.rtpReceiver.track.id;
                        });
                        if (nativeTrack) removeTrackFromStreamAndFireEvent(nativeTrack, s);
                    });
                    transceiver.associatedRemoteMediaStreams = [];
                }
                transceiver.localCapabilities = localCapabilities;
                transceiver.remoteCapabilities = remoteCapabilities;
                transceiver.rtpReceiver = rtpReceiver;
                transceiver.rtcpParameters = rtcpParameters;
                transceiver.sendEncodingParameters = sendEncodingParameters;
                transceiver.recvEncodingParameters = recvEncodingParameters;
                // Start the RTCRtpReceiver now. The RTPSender is started in
                // setLocalDescription.
                pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
            } else if (description.type === 'answer' && !rejected) {
                transceiver = pc.transceivers[sdpMLineIndex];
                iceGatherer = transceiver.iceGatherer;
                iceTransport = transceiver.iceTransport;
                dtlsTransport = transceiver.dtlsTransport;
                rtpReceiver = transceiver.rtpReceiver;
                sendEncodingParameters = transceiver.sendEncodingParameters;
                localCapabilities = transceiver.localCapabilities;
                pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
                pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
                pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;
                if (cands.length && iceTransport.state === 'new') {
                    if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) iceTransport.setRemoteCandidates(cands);
                    else cands.forEach(function(candidate) {
                        maybeAddCandidate(transceiver.iceTransport, candidate);
                    });
                }
                if (!usingBundle || sdpMLineIndex === 0) {
                    if (iceTransport.state === 'new') iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
                    if (dtlsTransport.state === 'new') dtlsTransport.start(remoteDtlsParameters);
                }
                // If the offer contained RTX but the answer did not,
                // remove RTX from sendEncodingParameters.
                var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
                var hasRtx = commonCapabilities.codecs.filter(function(c) {
                    return c.name.toLowerCase() === 'rtx';
                }).length;
                if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) delete transceiver.sendEncodingParameters[0].rtx;
                pc._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');
                // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
                    track = rtpReceiver.track;
                    if (remoteMsid) {
                        if (!streams[remoteMsid.stream]) streams[remoteMsid.stream] = new window.MediaStream();
                        addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                        receiverList.push([
                            track,
                            rtpReceiver,
                            streams[remoteMsid.stream]
                        ]);
                    } else {
                        if (!streams.default) streams.default = new window.MediaStream();
                        addTrackToStreamAndFireEvent(track, streams.default);
                        receiverList.push([
                            track,
                            rtpReceiver,
                            streams.default
                        ]);
                    }
                } else // FIXME: actually the receiver should be created later.
                delete transceiver.rtpReceiver;
            }
        });
        if (pc._dtlsRole === undefined) pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
        pc._remoteDescription = {
            type: description.type,
            sdp: description.sdp
        };
        if (description.type === 'offer') pc._updateSignalingState('have-remote-offer');
        else pc._updateSignalingState('stable');
        Object.keys(streams).forEach(function(sid) {
            var stream = streams[sid];
            if (stream.getTracks().length) {
                if (pc.remoteStreams.indexOf(stream) === -1) {
                    pc.remoteStreams.push(stream);
                    var event = new Event('addstream');
                    event.stream = stream;
                    window.setTimeout(function() {
                        pc._dispatchEvent('addstream', event);
                    });
                }
                receiverList.forEach(function(item) {
                    var track = item[0];
                    var receiver = item[1];
                    if (stream.id !== item[2].id) return;
                    fireAddTrack(pc, track, receiver, [
                        stream
                    ]);
                });
            }
        });
        receiverList.forEach(function(item) {
            if (item[2]) return;
            fireAddTrack(pc, item[0], item[1], []);
        });
        // check whether addIceCandidate({}) was called within four seconds after
        // setRemoteDescription.
        window.setTimeout(function() {
            if (!(pc && pc.transceivers)) return;
            pc.transceivers.forEach(function(transceiver) {
                if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
                    console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification");
                    transceiver.iceTransport.addRemoteCandidate({});
                }
            });
        }, 4000);
        return Promise.resolve();
    };
    RTCPeerConnection.prototype.close = function() {
        this.transceivers.forEach(function(transceiver) {
            /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */ if (transceiver.iceTransport) transceiver.iceTransport.stop();
            if (transceiver.dtlsTransport) transceiver.dtlsTransport.stop();
            if (transceiver.rtpSender) transceiver.rtpSender.stop();
            if (transceiver.rtpReceiver) transceiver.rtpReceiver.stop();
        });
        // FIXME: clean up tracks, local streams, remote streams, etc
        this._isClosed = true;
        this._updateSignalingState('closed');
    };
    // Update the signaling state.
    RTCPeerConnection.prototype._updateSignalingState = function(newState) {
        this.signalingState = newState;
        var event = new Event('signalingstatechange');
        this._dispatchEvent('signalingstatechange', event);
    };
    // Determine whether to fire the negotiationneeded event.
    RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
        var pc = this;
        if (this.signalingState !== 'stable' || this.needNegotiation === true) return;
        this.needNegotiation = true;
        window.setTimeout(function() {
            if (pc.needNegotiation) {
                pc.needNegotiation = false;
                var event = new Event('negotiationneeded');
                pc._dispatchEvent('negotiationneeded', event);
            }
        }, 0);
    };
    // Update the ice connection state.
    RTCPeerConnection.prototype._updateIceConnectionState = function() {
        var newState;
        var states = {
            'new': 0,
            closed: 0,
            checking: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
        };
        this.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport && !transceiver.rejected) states[transceiver.iceTransport.state]++;
        });
        newState = 'new';
        if (states.failed > 0) newState = 'failed';
        else if (states.checking > 0) newState = 'checking';
        else if (states.disconnected > 0) newState = 'disconnected';
        else if (states.new > 0) newState = 'new';
        else if (states.connected > 0) newState = 'connected';
        else if (states.completed > 0) newState = 'completed';
        if (newState !== this.iceConnectionState) {
            this.iceConnectionState = newState;
            var event = new Event('iceconnectionstatechange');
            this._dispatchEvent('iceconnectionstatechange', event);
        }
    };
    // Update the connection state.
    RTCPeerConnection.prototype._updateConnectionState = function() {
        var newState;
        var states = {
            'new': 0,
            closed: 0,
            connecting: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
        };
        this.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
                states[transceiver.iceTransport.state]++;
                states[transceiver.dtlsTransport.state]++;
            }
        });
        // ICETransport.completed and connected are the same for this purpose.
        states.connected += states.completed;
        newState = 'new';
        if (states.failed > 0) newState = 'failed';
        else if (states.connecting > 0) newState = 'connecting';
        else if (states.disconnected > 0) newState = 'disconnected';
        else if (states.new > 0) newState = 'new';
        else if (states.connected > 0) newState = 'connected';
        if (newState !== this.connectionState) {
            this.connectionState = newState;
            var event = new Event('connectionstatechange');
            this._dispatchEvent('connectionstatechange', event);
        }
    };
    RTCPeerConnection.prototype.createOffer = function() {
        var pc = this;
        if (pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not call createOffer after close'));
        var numAudioTracks = pc.transceivers.filter(function(t) {
            return t.kind === 'audio';
        }).length;
        var numVideoTracks = pc.transceivers.filter(function(t) {
            return t.kind === 'video';
        }).length;
        // Determine number of audio and video tracks we need to send/recv.
        var offerOptions = arguments[0];
        if (offerOptions) {
            // Reject Chrome legacy constraints.
            if (offerOptions.mandatory || offerOptions.optional) throw new TypeError('Legacy mandatory/optional constraints not supported.');
            if (offerOptions.offerToReceiveAudio !== undefined) {
                if (offerOptions.offerToReceiveAudio === true) numAudioTracks = 1;
                else if (offerOptions.offerToReceiveAudio === false) numAudioTracks = 0;
                else numAudioTracks = offerOptions.offerToReceiveAudio;
            }
            if (offerOptions.offerToReceiveVideo !== undefined) {
                if (offerOptions.offerToReceiveVideo === true) numVideoTracks = 1;
                else if (offerOptions.offerToReceiveVideo === false) numVideoTracks = 0;
                else numVideoTracks = offerOptions.offerToReceiveVideo;
            }
        }
        pc.transceivers.forEach(function(transceiver) {
            if (transceiver.kind === 'audio') {
                numAudioTracks--;
                if (numAudioTracks < 0) transceiver.wantReceive = false;
            } else if (transceiver.kind === 'video') {
                numVideoTracks--;
                if (numVideoTracks < 0) transceiver.wantReceive = false;
            }
        });
        // Create M-lines for recvonly streams.
        while(numAudioTracks > 0 || numVideoTracks > 0){
            if (numAudioTracks > 0) {
                pc._createTransceiver('audio');
                numAudioTracks--;
            }
            if (numVideoTracks > 0) {
                pc._createTransceiver('video');
                numVideoTracks--;
            }
        }
        var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            // For each track, create an ice gatherer, ice transport,
            // dtls transport, potentially rtpsender and rtpreceiver.
            var track = transceiver.track;
            var kind = transceiver.kind;
            var mid = transceiver.mid || SDPUtils.generateIdentifier();
            transceiver.mid = mid;
            if (!transceiver.iceGatherer) transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
            var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
            // filter RTX until additional stuff needed for RTX is implemented
            // in adapter.js
            if (edgeVersion < 15019) localCapabilities.codecs = localCapabilities.codecs.filter(function(codec) {
                return codec.name !== 'rtx';
            });
            localCapabilities.codecs.forEach(function(codec) {
                // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
                // by adding level-asymmetry-allowed=1
                if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) codec.parameters['level-asymmetry-allowed'] = '1';
                // for subsequent offers, we might have to re-use the payload
                // type of the last offer.
                if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
                    if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) codec.preferredPayloadType = remoteCodec.payloadType;
                });
            });
            localCapabilities.headerExtensions.forEach(function(hdrExt) {
                var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
                remoteExtensions.forEach(function(rHdrExt) {
                    if (hdrExt.uri === rHdrExt.uri) hdrExt.id = rHdrExt.id;
                });
            });
            // generate an ssrc now, to be used later in rtpSender.send
            var sendEncodingParameters = transceiver.sendEncodingParameters || [
                {
                    ssrc: (2 * sdpMLineIndex + 1) * 1001
                }
            ];
            if (track) // add RTX
            {
                if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) sendEncodingParameters[0].rtx = {
                    ssrc: sendEncodingParameters[0].ssrc + 1
                };
            }
            if (transceiver.wantReceive) transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
            transceiver.localCapabilities = localCapabilities;
            transceiver.sendEncodingParameters = sendEncodingParameters;
        });
        // always offer BUNDLE and dispose on return if not supported.
        if (pc._config.bundlePolicy !== 'max-compat') sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
            return t.mid;
        }).join(' ') + '\r\n';
        sdp += 'a=ice-options:trickle\r\n';
        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, pc._dtlsRole);
            sdp += 'a=rtcp-rsize\r\n';
            if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !pc.usingBundle)) {
                transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
                    cand.component = 1;
                    sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
                });
                if (transceiver.iceGatherer.state === 'completed') sdp += 'a=end-of-candidates\r\n';
            }
        });
        var desc = new window.RTCSessionDescription({
            type: 'offer',
            sdp: sdp
        });
        return Promise.resolve(desc);
    };
    RTCPeerConnection.prototype.createAnswer = function() {
        var pc = this;
        if (pc._isClosed) return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer after close'));
        if (!(pc.signalingState === 'have-remote-offer' || pc.signalingState === 'have-local-pranswer')) return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer in signalingState ' + pc.signalingState));
        var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
        if (pc.usingBundle) sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
            return t.mid;
        }).join(' ') + '\r\n';
        sdp += 'a=ice-options:trickle\r\n';
        var mediaSectionsInOffer = SDPUtils.getMediaSections(pc._remoteDescription.sdp).length;
        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            if (sdpMLineIndex + 1 > mediaSectionsInOffer) return;
            if (transceiver.rejected) {
                if (transceiver.kind === 'application') {
                    if (transceiver.protocol === 'DTLS/SCTP') sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
                    else sdp += 'm=application 0 ' + transceiver.protocol + ' webrtc-datachannel\r\n';
                } else if (transceiver.kind === 'audio') sdp += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n";
                else if (transceiver.kind === 'video') sdp += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n";
                sdp += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + transceiver.mid + '\r\n';
                return;
            }
            // FIXME: look at direction.
            if (transceiver.stream) {
                var localTrack;
                if (transceiver.kind === 'audio') localTrack = transceiver.stream.getAudioTracks()[0];
                else if (transceiver.kind === 'video') localTrack = transceiver.stream.getVideoTracks()[0];
                if (localTrack) // add RTX
                {
                    if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) transceiver.sendEncodingParameters[0].rtx = {
                        ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                    };
                }
            }
            // Calculate intersection of capabilities.
            var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
            var hasRtx = commonCapabilities.codecs.filter(function(c) {
                return c.name.toLowerCase() === 'rtx';
            }).length;
            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) delete transceiver.sendEncodingParameters[0].rtx;
            sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, pc._dtlsRole);
            if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) sdp += 'a=rtcp-rsize\r\n';
        });
        var desc = new window.RTCSessionDescription({
            type: 'answer',
            sdp: sdp
        });
        return Promise.resolve(desc);
    };
    RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
        var pc = this;
        var sections;
        if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
        // TODO: needs to go into ops queue.
        return new Promise(function(resolve, reject) {
            if (!pc._remoteDescription) return reject(makeError('InvalidStateError', 'Can not add ICE candidate without a remote description'));
            else if (!candidate || candidate.candidate === '') for(var j = 0; j < pc.transceivers.length; j++){
                if (pc.transceivers[j].rejected) continue;
                pc.transceivers[j].iceTransport.addRemoteCandidate({});
                sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                sections[j] += 'a=end-of-candidates\r\n';
                pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                if (pc.usingBundle) break;
            }
            else {
                var sdpMLineIndex = candidate.sdpMLineIndex;
                if (candidate.sdpMid) {
                    for(var i = 0; i < pc.transceivers.length; i++)if (pc.transceivers[i].mid === candidate.sdpMid) {
                        sdpMLineIndex = i;
                        break;
                    }
                }
                var transceiver = pc.transceivers[sdpMLineIndex];
                if (transceiver) {
                    if (transceiver.rejected) return resolve();
                    var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
                    // Ignore Chrome's invalid candidates since Edge does not like them.
                    if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) return resolve();
                    // Ignore RTCP candidates, we assume RTCP-MUX.
                    if (cand.component && cand.component !== 1) return resolve();
                    // when using bundle, avoid adding candidates to the wrong
                    // ice transport. And avoid adding candidates added in the SDP.
                    if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
                        if (!maybeAddCandidate(transceiver.iceTransport, cand)) return reject(makeError('OperationError', 'Can not add ICE candidate'));
                    }
                    // update the remoteDescription.
                    var candidateString = candidate.candidate.trim();
                    if (candidateString.indexOf('a=') === 0) candidateString = candidateString.substr(2);
                    sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                    sections[sdpMLineIndex] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
                    pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                } else return reject(makeError('OperationError', 'Can not add ICE candidate'));
            }
            resolve();
        });
    };
    RTCPeerConnection.prototype.getStats = function(selector) {
        if (selector && selector instanceof window.MediaStreamTrack) {
            var senderOrReceiver = null;
            this.transceivers.forEach(function(transceiver) {
                if (transceiver.rtpSender && transceiver.rtpSender.track === selector) senderOrReceiver = transceiver.rtpSender;
                else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) senderOrReceiver = transceiver.rtpReceiver;
            });
            if (!senderOrReceiver) throw makeError('InvalidAccessError', 'Invalid selector.');
            return senderOrReceiver.getStats();
        }
        var promises = [];
        this.transceivers.forEach(function(transceiver) {
            [
                'rtpSender',
                'rtpReceiver',
                'iceGatherer',
                'iceTransport',
                'dtlsTransport'
            ].forEach(function(method) {
                if (transceiver[method]) promises.push(transceiver[method].getStats());
            });
        });
        return Promise.all(promises).then(function(allStats) {
            var results = new Map();
            allStats.forEach(function(stats) {
                stats.forEach(function(stat) {
                    results.set(stat.id, stat);
                });
            });
            return results;
        });
    };
    // fix low-level stat names and return Map instead of object.
    var ortcObjects = [
        'RTCRtpSender',
        'RTCRtpReceiver',
        'RTCIceGatherer',
        'RTCIceTransport',
        'RTCDtlsTransport'
    ];
    ortcObjects.forEach(function(ortcObjectName) {
        var obj = window[ortcObjectName];
        if (obj && obj.prototype && obj.prototype.getStats) {
            var nativeGetstats = obj.prototype.getStats;
            obj.prototype.getStats = function() {
                return nativeGetstats.apply(this).then(function(nativeStats) {
                    var mapStats = new Map();
                    Object.keys(nativeStats).forEach(function(id) {
                        nativeStats[id].type = fixStatsType(nativeStats[id]);
                        mapStats.set(id, nativeStats[id]);
                    });
                    return mapStats;
                });
            };
        }
    });
    // legacy callback shims. Should be moved to adapter.js some days.
    var methods = [
        'createOffer',
        'createAnswer'
    ];
    methods.forEach(function(method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function() {
            var args = arguments;
            if (typeof args[0] === 'function' || typeof args[1] === 'function') return nativeMethod.apply(this, [
                arguments[2]
            ]).then(function(description) {
                if (typeof args[0] === 'function') args[0].apply(null, [
                    description
                ]);
            }, function(error) {
                if (typeof args[1] === 'function') args[1].apply(null, [
                    error
                ]);
            });
            return nativeMethod.apply(this, arguments);
        };
    });
    methods = [
        'setLocalDescription',
        'setRemoteDescription',
        'addIceCandidate'
    ];
    methods.forEach(function(method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function() {
            var args = arguments;
            if (typeof args[1] === 'function' || typeof args[2] === 'function') return nativeMethod.apply(this, arguments).then(function() {
                if (typeof args[1] === 'function') args[1].apply(null);
            }, function(error) {
                if (typeof args[2] === 'function') args[2].apply(null, [
                    error
                ]);
            });
            return nativeMethod.apply(this, arguments);
        };
    });
    // getStats is special. It doesn't have a spec legacy method yet we support
    // getStats(something, cb) without error callbacks.
    [
        'getStats'
    ].forEach(function(method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function() {
            var args = arguments;
            if (typeof args[1] === 'function') return nativeMethod.apply(this, arguments).then(function() {
                if (typeof args[1] === 'function') args[1].apply(null);
            });
            return nativeMethod.apply(this, arguments);
        };
    });
    return RTCPeerConnection;
};

},{"sdp":"kUJU8"}],"kUJU8":[function(require,module,exports) {
/* eslint-env node */ 'use strict';
// SDP helpers.
var SDPUtils = {};
// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function() {
    return Math.random().toString(36).substr(2, 10);
};
// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();
// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function(blob) {
    return blob.trim().split('\n').map(function(line) {
        return line.trim();
    });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function(blob) {
    var parts = blob.split('\nm=');
    return parts.map(function(part, index) {
        return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
    });
};
// returns the session description.
SDPUtils.getDescription = function(blob) {
    var sections = SDPUtils.splitSections(blob);
    return sections && sections[0];
};
// returns the individual media sections.
SDPUtils.getMediaSections = function(blob) {
    var sections = SDPUtils.splitSections(blob);
    sections.shift();
    return sections;
};
// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function(blob, prefix) {
    return SDPUtils.splitLines(blob).filter(function(line) {
        return line.indexOf(prefix) === 0;
    });
};
// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
SDPUtils.parseCandidate = function(line) {
    var parts;
    // Parse both variants.
    if (line.indexOf('a=candidate:') === 0) parts = line.substring(12).split(' ');
    else parts = line.substring(10).split(' ');
    var candidate = {
        foundation: parts[0],
        component: parseInt(parts[1], 10),
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4],
        port: parseInt(parts[5], 10),
        // skip parts[6] == 'typ'
        type: parts[7]
    };
    for(var i = 8; i < parts.length; i += 2)switch(parts[i]){
        case 'raddr':
            candidate.relatedAddress = parts[i + 1];
            break;
        case 'rport':
            candidate.relatedPort = parseInt(parts[i + 1], 10);
            break;
        case 'tcptype':
            candidate.tcpType = parts[i + 1];
            break;
        case 'ufrag':
            candidate.ufrag = parts[i + 1]; // for backward compability.
            candidate.usernameFragment = parts[i + 1];
            break;
        default:
            candidate[parts[i]] = parts[i + 1];
            break;
    }
    return candidate;
};
// Translates a candidate object into SDP candidate attribute.
SDPUtils.writeCandidate = function(candidate) {
    var sdp = [];
    sdp.push(candidate.foundation);
    sdp.push(candidate.component);
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.address || candidate.ip);
    sdp.push(candidate.port);
    var type = candidate.type;
    sdp.push('typ');
    sdp.push(type);
    if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
        sdp.push('raddr');
        sdp.push(candidate.relatedAddress);
        sdp.push('rport');
        sdp.push(candidate.relatedPort);
    }
    if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
    }
    if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push('ufrag');
        sdp.push(candidate.usernameFragment || candidate.ufrag);
    }
    return 'candidate:' + sdp.join(' ');
};
// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function(line) {
    return line.substr(14).split(' ');
};
// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function(line) {
    var parts = line.substr(9).split(' ');
    var parsed = {
        payloadType: parseInt(parts.shift(), 10) // was: id
    };
    parts = parts[0].split('/');
    parsed.name = parts[0];
    parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
    parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
    // legacy alias, got renamed back to channels in ORTC.
    parsed.numChannels = parsed.channels;
    return parsed;
};
// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function(codec) {
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    var channels = codec.channels || codec.numChannels || 1;
    return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
};
// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function(line) {
    var parts = line.substr(9).split(' ');
    return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
        uri: parts[1]
    };
};
// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function(headerExtension) {
    return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
};
// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function(line) {
    var parsed = {};
    var kv;
    var parts = line.substr(line.indexOf(' ') + 1).split(';');
    for(var j = 0; j < parts.length; j++){
        kv = parts[j].trim().split('=');
        parsed[kv[0].trim()] = kv[1];
    }
    return parsed;
};
// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function(codec) {
    var line = '';
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    if (codec.parameters && Object.keys(codec.parameters).length) {
        var params = [];
        Object.keys(codec.parameters).forEach(function(param) {
            if (codec.parameters[param]) params.push(param + '=' + codec.parameters[param]);
            else params.push(param);
        });
        line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
    }
    return line;
};
// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function(line) {
    var parts = line.substr(line.indexOf(' ') + 1).split(' ');
    return {
        type: parts.shift(),
        parameter: parts.join(' ')
    };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function(codec) {
    var lines = '';
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    if (codec.rtcpFeedback && codec.rtcpFeedback.length) // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function(fb) {
        lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
    });
    return lines;
};
// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function(line) {
    var sp = line.indexOf(' ');
    var parts = {
        ssrc: parseInt(line.substr(7, sp - 7), 10)
    };
    var colon = line.indexOf(':', sp);
    if (colon > -1) {
        parts.attribute = line.substr(sp + 1, colon - sp - 1);
        parts.value = line.substr(colon + 1);
    } else parts.attribute = line.substr(sp + 1);
    return parts;
};
SDPUtils.parseSsrcGroup = function(line) {
    var parts = line.substr(13).split(' ');
    return {
        semantics: parts.shift(),
        ssrcs: parts.map(function(ssrc) {
            return parseInt(ssrc, 10);
        })
    };
};
// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function(mediaSection) {
    var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
    if (mid) return mid.substr(6);
};
SDPUtils.parseFingerprint = function(line) {
    var parts = line.substr(14).split(' ');
    return {
        algorithm: parts[0].toLowerCase(),
        value: parts[1]
    };
};
// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
    var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
    // Note: a=setup line is ignored since we use the 'auto' role.
    // Note2: 'algorithm' is not case sensitive except in Edge.
    return {
        role: 'auto',
        fingerprints: lines.map(SDPUtils.parseFingerprint)
    };
};
// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function(params, setupType) {
    var sdp = 'a=setup:' + setupType + '\r\n';
    params.fingerprints.forEach(function(fp) {
        sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
    });
    return sdp;
};
// Parses a=crypto lines into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
SDPUtils.parseCryptoLine = function(line) {
    var parts = line.substr(9).split(' ');
    return {
        tag: parseInt(parts[0], 10),
        cryptoSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3)
    };
};
SDPUtils.writeCryptoLine = function(parameters) {
    return 'a=crypto:' + parameters.tag + ' ' + parameters.cryptoSuite + ' ' + (typeof parameters.keyParams === 'object' ? SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') + '\r\n';
};
// Parses the crypto key parameters into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
SDPUtils.parseCryptoKeyParams = function(keyParams) {
    if (keyParams.indexOf('inline:') !== 0) return null;
    var parts = keyParams.substr(7).split('|');
    return {
        keyMethod: 'inline',
        keySalt: parts[0],
        lifeTime: parts[1],
        mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
        mkiLength: parts[2] ? parts[2].split(':')[1] : undefined
    };
};
SDPUtils.writeCryptoKeyParams = function(keyParams) {
    return keyParams.keyMethod + ':' + keyParams.keySalt + (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') + (keyParams.mkiValue && keyParams.mkiLength ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength : '');
};
// Extracts all SDES paramters.
SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
    var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=crypto:');
    return lines.map(SDPUtils.parseCryptoLine);
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
    var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-ufrag:')[0];
    var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-pwd:')[0];
    if (!(ufrag && pwd)) return null;
    return {
        usernameFragment: ufrag.substr(12),
        password: pwd.substr(10)
    };
};
// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function(params) {
    return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
};
// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function(mediaSection) {
    var description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
    };
    var lines = SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(' ');
    for(var i = 3; i < mline.length; i++){
        var pt = mline[i];
        var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
        if (rtpmapline) {
            var codec = SDPUtils.parseRtpMap(rtpmapline);
            var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
            // Only the first a=fmtp:<pt> is considered.
            codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
            description.codecs.push(codec);
            // parse FEC mechanisms from rtpmap lines.
            switch(codec.name.toUpperCase()){
                case 'RED':
                case 'ULPFEC':
                    description.fecMechanisms.push(codec.name.toUpperCase());
                    break;
                default:
                    break;
            }
        }
    }
    SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
        description.headerExtensions.push(SDPUtils.parseExtmap(line));
    });
    // FIXME: parse rtcp.
    return description;
};
// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function(kind, caps) {
    var sdp = '';
    // Build the mline.
    sdp += 'm=' + kind + ' ';
    sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
    sdp += ' UDP/TLS/RTP/SAVPF ';
    sdp += caps.codecs.map(function(codec) {
        if (codec.preferredPayloadType !== undefined) return codec.preferredPayloadType;
        return codec.payloadType;
    }).join(' ') + '\r\n';
    sdp += 'c=IN IP4 0.0.0.0\r\n';
    sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';
    // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
    caps.codecs.forEach(function(codec) {
        sdp += SDPUtils.writeRtpMap(codec);
        sdp += SDPUtils.writeFmtp(codec);
        sdp += SDPUtils.writeRtcpFb(codec);
    });
    var maxptime = 0;
    caps.codecs.forEach(function(codec) {
        if (codec.maxptime > maxptime) maxptime = codec.maxptime;
    });
    if (maxptime > 0) sdp += 'a=maxptime:' + maxptime + '\r\n';
    sdp += 'a=rtcp-mux\r\n';
    if (caps.headerExtensions) caps.headerExtensions.forEach(function(extension) {
        sdp += SDPUtils.writeExtmap(extension);
    });
    // FIXME: write fecMechanisms.
    return sdp;
};
// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
    var encodingParameters = [];
    var description = SDPUtils.parseRtpParameters(mediaSection);
    var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
    var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;
    // filter a=ssrc:... cname:, ignore PlanB-msid
    var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
    }).filter(function(parts) {
        return parts.attribute === 'cname';
    });
    var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
    var secondarySsrc;
    var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function(line) {
        var parts = line.substr(17).split(' ');
        return parts.map(function(part) {
            return parseInt(part, 10);
        });
    });
    if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) secondarySsrc = flows[0][1];
    description.codecs.forEach(function(codec) {
        if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
            var encParam = {
                ssrc: primarySsrc,
                codecPayloadType: parseInt(codec.parameters.apt, 10)
            };
            if (primarySsrc && secondarySsrc) encParam.rtx = {
                ssrc: secondarySsrc
            };
            encodingParameters.push(encParam);
            if (hasRed) {
                encParam = JSON.parse(JSON.stringify(encParam));
                encParam.fec = {
                    ssrc: primarySsrc,
                    mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                };
                encodingParameters.push(encParam);
            }
        }
    });
    if (encodingParameters.length === 0 && primarySsrc) encodingParameters.push({
        ssrc: primarySsrc
    });
    // we support both b=AS and b=TIAS but interpret AS as TIAS.
    var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
    if (bandwidth.length) {
        if (bandwidth[0].indexOf('b=TIAS:') === 0) bandwidth = parseInt(bandwidth[0].substr(7), 10);
        else if (bandwidth[0].indexOf('b=AS:') === 0) // use formula from JSEP to convert b=AS to TIAS value.
        bandwidth = parseInt(bandwidth[0].substr(5), 10) * 950 - 16000;
        else bandwidth = undefined;
        encodingParameters.forEach(function(params) {
            params.maxBitrate = bandwidth;
        });
    }
    return encodingParameters;
};
// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function(mediaSection) {
    var rtcpParameters = {};
    // Gets the first SSRC. Note tha with RTX there might be multiple
    // SSRCs.
    var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
    }).filter(function(obj) {
        return obj.attribute === 'cname';
    })[0];
    if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
    }
    // Edge uses the compound attribute instead of reducedSize
    // compound is !reducedSize
    var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
    rtcpParameters.reducedSize = rsize.length > 0;
    rtcpParameters.compound = rsize.length === 0;
    // parses the rtcp-mux attrіbute.
    // Note that Edge does not support unmuxed RTCP.
    var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
    rtcpParameters.mux = mux.length > 0;
    return rtcpParameters;
};
// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function(mediaSection) {
    var parts;
    var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
    if (spec.length === 1) {
        parts = spec[0].substr(7).split(' ');
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
    var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
    }).filter(function(msidParts) {
        return msidParts.attribute === 'msid';
    });
    if (planB.length > 0) {
        parts = planB[0].value.split(' ');
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
};
// SCTP
// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
// to draft-ietf-mmusic-sctp-sdp-05
SDPUtils.parseSctpDescription = function(mediaSection) {
    var mline = SDPUtils.parseMLine(mediaSection);
    var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
    var maxMessageSize;
    if (maxSizeLine.length > 0) maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
    if (isNaN(maxMessageSize)) maxMessageSize = 65536;
    var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
    if (sctpPort.length > 0) return {
        port: parseInt(sctpPort[0].substr(12), 10),
        protocol: mline.fmt,
        maxMessageSize: maxMessageSize
    };
    var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
    if (sctpMapLines.length > 0) {
        var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0].substr(10).split(' ');
        return {
            port: parseInt(parts[0], 10),
            protocol: parts[1],
            maxMessageSize: maxMessageSize
        };
    }
};
// SCTP
// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
// support by now receiving in this format, unless we originally parsed
// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
// protocol of DTLS/SCTP -- without UDP/ or TCP/)
SDPUtils.writeSctpDescription = function(media, sctp) {
    var output = [];
    if (media.protocol !== 'DTLS/SCTP') output = [
        'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
        'c=IN IP4 0.0.0.0\r\n',
        'a=sctp-port:' + sctp.port + '\r\n'
    ];
    else output = [
        'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
        'c=IN IP4 0.0.0.0\r\n',
        'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
    ];
    if (sctp.maxMessageSize !== undefined) output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
    return output.join('');
};
// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function() {
    return Math.random().toString().substr(2, 21);
};
// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'
SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
    var sessionId;
    var version = sessVer !== undefined ? sessVer : 2;
    if (sessId) sessionId = sessId;
    else sessionId = SDPUtils.generateSessionId();
    var user = sessUser || 'thisisadapterortc';
    // FIXME: sess-id should be an NTP timestamp.
    return "v=0\r\no=" + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
};
SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
    var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
    // Map ICE parameters (ufrag, pwd) to SDP.
    sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());
    // Map DTLS parameters to SDP.
    sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');
    sdp += 'a=mid:' + transceiver.mid + '\r\n';
    if (transceiver.direction) sdp += 'a=' + transceiver.direction + '\r\n';
    else if (transceiver.rtpSender && transceiver.rtpReceiver) sdp += 'a=sendrecv\r\n';
    else if (transceiver.rtpSender) sdp += 'a=sendonly\r\n';
    else if (transceiver.rtpReceiver) sdp += 'a=recvonly\r\n';
    else sdp += 'a=inactive\r\n';
    if (transceiver.rtpSender) {
        // spec.
        var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
        sdp += 'a=' + msid;
        // for Chrome.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
        if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
            sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
        }
    }
    // FIXME: this should be written by writeRtpDescription.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
    if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
    return sdp;
};
// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function(mediaSection, sessionpart) {
    // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
    var lines = SDPUtils.splitLines(mediaSection);
    for(var i = 0; i < lines.length; i++)switch(lines[i]){
        case 'a=sendrecv':
        case 'a=sendonly':
        case 'a=recvonly':
        case 'a=inactive':
            return lines[i].substr(2);
        default:
    }
    if (sessionpart) return SDPUtils.getDirection(sessionpart);
    return 'sendrecv';
};
SDPUtils.getKind = function(mediaSection) {
    var lines = SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(' ');
    return mline[0].substr(2);
};
SDPUtils.isRejected = function(mediaSection) {
    return mediaSection.split(' ', 2)[1] === '0';
};
SDPUtils.parseMLine = function(mediaSection) {
    var lines = SDPUtils.splitLines(mediaSection);
    var parts = lines[0].substr(2).split(' ');
    return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(' ')
    };
};
SDPUtils.parseOLine = function(mediaSection) {
    var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
    var parts = line.substr(2).split(' ');
    return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
    };
};
// a very naive interpretation of a valid SDP.
SDPUtils.isValidSDP = function(blob) {
    if (typeof blob !== 'string' || blob.length === 0) return false;
    var lines = SDPUtils.splitLines(blob);
    for(var i = 0; i < lines.length; i++){
        if (lines[i].length < 2 || lines[i].charAt(1) !== '=') return false;
    // TODO: check the modifier a bit more.
    }
    return true;
};
module.exports = SDPUtils;

},{}],"d5T6f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetUserMedia", ()=>shimGetUserMedia
);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimGetUserMedia(window) {
    const navigator = window && window.navigator;
    const shimError_ = function(e) {
        return {
            name: ({
                PermissionDeniedError: 'NotAllowedError'
            })[e.name] || e.name,
            message: e.message,
            constraint: e.constraint,
            toString () {
                return this.name;
            }
        };
    };
    // getUserMedia error shim.
    const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(c) {
        return origGetUserMedia(c).catch((e)=>Promise.reject(shimError_(e))
        );
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7272l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetDisplayMedia", ()=>shimGetDisplayMedia
);
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimGetDisplayMedia(window) {
    if (!('getDisplayMedia' in window.navigator)) return;
    if (!window.navigator.mediaDevices) return;
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) return;
    window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7FBwu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetUserMedia", ()=>_getusermedia.shimGetUserMedia
);
parcelHelpers.export(exports, "shimGetDisplayMedia", ()=>_getdisplaymedia.shimGetDisplayMedia
);
parcelHelpers.export(exports, "shimOnTrack", ()=>shimOnTrack
);
parcelHelpers.export(exports, "shimPeerConnection", ()=>shimPeerConnection
);
parcelHelpers.export(exports, "shimSenderGetStats", ()=>shimSenderGetStats
);
parcelHelpers.export(exports, "shimReceiverGetStats", ()=>shimReceiverGetStats
);
parcelHelpers.export(exports, "shimRemoveStream", ()=>shimRemoveStream
);
parcelHelpers.export(exports, "shimRTCDataChannel", ()=>shimRTCDataChannel
);
parcelHelpers.export(exports, "shimAddTransceiver", ()=>shimAddTransceiver
);
parcelHelpers.export(exports, "shimGetParameters", ()=>shimGetParameters
);
parcelHelpers.export(exports, "shimCreateOffer", ()=>shimCreateOffer
);
parcelHelpers.export(exports, "shimCreateAnswer", ()=>shimCreateAnswer
);
var _utils = require("../utils");
var _getusermedia = require("./getusermedia");
var _getdisplaymedia = require("./getdisplaymedia");
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimOnTrack(window) {
    if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get () {
            return {
                receiver: this.receiver
            };
        }
    });
}
function shimPeerConnection(window, browserDetails) {
    if (typeof window !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) return; // probably media.peerconnection.enabled=false in about:config
    if (!window.RTCPeerConnection && window.mozRTCPeerConnection) // very basic support for old versions.
    window.RTCPeerConnection = window.mozRTCPeerConnection;
    if (browserDetails.version < 53) // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    [
        'setLocalDescription',
        'setRemoteDescription',
        'addIceCandidate'
    ].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
            [method] () {
                arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
            }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    const modernStatsTypes = {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
    };
    const nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;
        return nativeGetStats.apply(this, [
            selector || null
        ]).then((stats)=>{
            if (browserDetails.version < 53 && !onSucc) // Shim only promise getStats with spec-hyphens in type names
            // Leave callback version alone; misc old uses of forEach before Map
            try {
                stats.forEach((stat)=>{
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                });
            } catch (e) {
                if (e.name !== 'TypeError') throw e;
                // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                stats.forEach((stat, i)=>{
                    stats.set(i, Object.assign({}, stat, {
                        type: modernStatsTypes[stat.type] || stat.type
                    }));
                });
            }
            return stats;
        }).then(onSucc, onErr);
    };
}
function shimSenderGetStats(window) {
    if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) return;
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) return;
    const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        const senders = origGetSenders.apply(this, []);
        senders.forEach((sender)=>sender._pc = this
        );
        return senders;
    };
    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
        const sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
    };
    window.RTCRtpSender.prototype.getStats = function getStats() {
        return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
    };
}
function shimReceiverGetStats(window) {
    if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) return;
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) return;
    const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        const receivers = origGetReceivers.apply(this, []);
        receivers.forEach((receiver)=>receiver._pc = this
        );
        return receivers;
    };
    _utils.wrapPeerConnectionEvent(window, 'track', (e)=>{
        e.receiver._pc = e.srcElement;
        return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function getStats() {
        return this._pc.getStats(this.track);
    };
}
function shimRemoveStream(window) {
    if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) return;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        _utils.deprecated('removeStream', 'removeTrack');
        this.getSenders().forEach((sender)=>{
            if (sender.track && stream.getTracks().includes(sender.track)) this.removeTrack(sender);
        });
    };
}
function shimRTCDataChannel(window) {
    // rename DataChannel to RTCDataChannel (native fix in FF60):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
    if (window.DataChannel && !window.RTCDataChannel) window.RTCDataChannel = window.DataChannel;
}
function shimAddTransceiver(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === 'object' && window.RTCPeerConnection)) return;
    const origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
    if (origAddTransceiver) window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
        this.setParametersPromises = [];
        const initParameters = arguments[1];
        const shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;
        if (shouldPerformCheck) // If sendEncodings params are provided, validate grammar
        initParameters.sendEncodings.forEach((encodingParam)=>{
            if ('rid' in encodingParam) {
                const ridRegex = /^[a-z0-9]{0,16}$/i;
                if (!ridRegex.test(encodingParam.rid)) throw new TypeError('Invalid RID value provided.');
            }
            if ('scaleResolutionDownBy' in encodingParam) {
                if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) throw new RangeError('scale_resolution_down_by must be >= 1.0');
            }
            if ('maxFramerate' in encodingParam) {
                if (!(parseFloat(encodingParam.maxFramerate) >= 0)) throw new RangeError('max_framerate must be >= 0.0');
            }
        });
        const transceiver = origAddTransceiver.apply(this, arguments);
        if (shouldPerformCheck) {
            // Check if the init options were applied. If not we do this in an
            // asynchronous way and save the promise reference in a global object.
            // This is an ugly hack, but at the same time is way more robust than
            // checking the sender parameters before and after the createOffer
            // Also note that after the createoffer we are not 100% sure that
            // the params were asynchronously applied so we might miss the
            // opportunity to recreate offer.
            const { sender  } = transceiver;
            const params = sender.getParameters();
            if (!('encodings' in params) || params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
                params.encodings = initParameters.sendEncodings;
                sender.sendEncodings = initParameters.sendEncodings;
                this.setParametersPromises.push(sender.setParameters(params).then(()=>{
                    delete sender.sendEncodings;
                }).catch(()=>{
                    delete sender.sendEncodings;
                }));
            }
        }
        return transceiver;
    };
}
function shimGetParameters(window) {
    if (!(typeof window === 'object' && window.RTCRtpSender)) return;
    const origGetParameters = window.RTCRtpSender.prototype.getParameters;
    if (origGetParameters) window.RTCRtpSender.prototype.getParameters = function getParameters() {
        const params = origGetParameters.apply(this, arguments);
        if (!('encodings' in params)) params.encodings = [].concat(this.sendEncodings || [
            {}
        ]);
        return params;
    };
}
function shimCreateOffer(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === 'object' && window.RTCPeerConnection)) return;
    const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer() {
        if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(()=>{
            return origCreateOffer.apply(this, arguments);
        }).finally(()=>{
            this.setParametersPromises = [];
        });
        return origCreateOffer.apply(this, arguments);
    };
}
function shimCreateAnswer(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === 'object' && window.RTCPeerConnection)) return;
    const origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
    window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
        if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(()=>{
            return origCreateAnswer.apply(this, arguments);
        }).finally(()=>{
            this.setParametersPromises = [];
        });
        return origCreateAnswer.apply(this, arguments);
    };
}

},{"../utils":"fZqjY","./getusermedia":"j9DU2","./getdisplaymedia":"hEgTp","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"j9DU2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetUserMedia", ()=>shimGetUserMedia
);
var _utils = require("../utils");
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimGetUserMedia(window, browserDetails) {
    const navigator = window && window.navigator;
    const MediaStreamTrack = window && window.MediaStreamTrack;
    navigator.getUserMedia = function(constraints, onSuccess, onError) {
        // Replace Firefox 44+'s deprecation warning with unprefixed version.
        _utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    };
    if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
        const remap = function(obj, a, b) {
            if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
            }
        };
        const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
            if (typeof c === 'object' && typeof c.audio === 'object') {
                c = JSON.parse(JSON.stringify(c));
                remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
                remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
            }
            return nativeGetUserMedia(c);
        };
        if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
            const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
            MediaStreamTrack.prototype.getSettings = function() {
                const obj = nativeGetSettings.apply(this, arguments);
                remap(obj, 'mozAutoGainControl', 'autoGainControl');
                remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
                return obj;
            };
        }
        if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
            const nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
            MediaStreamTrack.prototype.applyConstraints = function(c) {
                if (this.kind === 'audio' && typeof c === 'object') {
                    c = JSON.parse(JSON.stringify(c));
                    remap(c, 'autoGainControl', 'mozAutoGainControl');
                    remap(c, 'noiseSuppression', 'mozNoiseSuppression');
                }
                return nativeApplyConstraints.apply(this, [
                    c
                ]);
            };
        }
    }
}

},{"../utils":"fZqjY","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"hEgTp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimGetDisplayMedia", ()=>shimGetDisplayMedia
);
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimGetDisplayMedia(window, preferredMediaSource) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) return;
    if (!window.navigator.mediaDevices) return;
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
        if (!(constraints && constraints.video)) {
            const err = new DOMException("getDisplayMedia without video constraints is undefined");
            err.name = 'NotFoundError';
            // from https://heycam.github.io/webidl/#idl-DOMException-error-names
            err.code = 8;
            return Promise.reject(err);
        }
        if (constraints.video === true) constraints.video = {
            mediaSource: preferredMediaSource
        };
        else constraints.video.mediaSource = preferredMediaSource;
        return window.navigator.mediaDevices.getUserMedia(constraints);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"9gyzL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimLocalStreamsAPI", ()=>shimLocalStreamsAPI
);
parcelHelpers.export(exports, "shimRemoteStreamsAPI", ()=>shimRemoteStreamsAPI
);
parcelHelpers.export(exports, "shimCallbacksAPI", ()=>shimCallbacksAPI
);
parcelHelpers.export(exports, "shimGetUserMedia", ()=>shimGetUserMedia
);
parcelHelpers.export(exports, "shimConstraints", ()=>shimConstraints
);
parcelHelpers.export(exports, "shimRTCIceServerUrls", ()=>shimRTCIceServerUrls
);
parcelHelpers.export(exports, "shimTrackEventTransceiver", ()=>shimTrackEventTransceiver
);
parcelHelpers.export(exports, "shimCreateOfferLegacy", ()=>shimCreateOfferLegacy
);
parcelHelpers.export(exports, "shimAudioContext", ()=>shimAudioContext
);
var _utils = require("../utils");
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ 'use strict';
function shimLocalStreamsAPI(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) return;
    if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        if (!this._localStreams) this._localStreams = [];
        return this._localStreams;
    };
    if (!('addStream' in window.RTCPeerConnection.prototype)) {
        const _addTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            if (!this._localStreams) this._localStreams = [];
            if (!this._localStreams.includes(stream)) this._localStreams.push(stream);
            // Try to emulate Chrome's behaviour of adding in audio-video order.
            // Safari orders by track id.
            stream.getAudioTracks().forEach((track)=>_addTrack.call(this, track, stream)
            );
            stream.getVideoTracks().forEach((track)=>_addTrack.call(this, track, stream)
            );
        };
        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, ...streams) {
            if (streams) streams.forEach((stream)=>{
                if (!this._localStreams) this._localStreams = [
                    stream
                ];
                else if (!this._localStreams.includes(stream)) this._localStreams.push(stream);
            });
            return _addTrack.apply(this, arguments);
        };
    }
    if (!('removeStream' in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        if (!this._localStreams) this._localStreams = [];
        const index = this._localStreams.indexOf(stream);
        if (index === -1) return;
        this._localStreams.splice(index, 1);
        const tracks = stream.getTracks();
        this.getSenders().forEach((sender)=>{
            if (tracks.includes(sender.track)) this.removeTrack(sender);
        });
    };
}
function shimRemoteStreamsAPI(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) return;
    if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
        return this._remoteStreams ? this._remoteStreams : [];
    };
    if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
            get () {
                return this._onaddstream;
            },
            set (f) {
                if (this._onaddstream) {
                    this.removeEventListener('addstream', this._onaddstream);
                    this.removeEventListener('track', this._onaddstreampoly);
                }
                this.addEventListener('addstream', this._onaddstream = f);
                this.addEventListener('track', this._onaddstreampoly = (e)=>{
                    e.streams.forEach((stream)=>{
                        if (!this._remoteStreams) this._remoteStreams = [];
                        if (this._remoteStreams.includes(stream)) return;
                        this._remoteStreams.push(stream);
                        const event = new Event('addstream');
                        event.stream = stream;
                        this.dispatchEvent(event);
                    });
                });
            }
        });
        const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            const pc = this;
            if (!this._onaddstreampoly) this.addEventListener('track', this._onaddstreampoly = function(e) {
                e.streams.forEach((stream)=>{
                    if (!pc._remoteStreams) pc._remoteStreams = [];
                    if (pc._remoteStreams.indexOf(stream) >= 0) return;
                    pc._remoteStreams.push(stream);
                    const event = new Event('addstream');
                    event.stream = stream;
                    pc.dispatchEvent(event);
                });
            });
            return origSetRemoteDescription.apply(pc, arguments);
        };
    }
}
function shimCallbacksAPI(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) return;
    const prototype = window.RTCPeerConnection.prototype;
    const origCreateOffer = prototype.createOffer;
    const origCreateAnswer = prototype.createAnswer;
    const setLocalDescription = prototype.setLocalDescription;
    const setRemoteDescription = prototype.setRemoteDescription;
    const addIceCandidate = prototype.addIceCandidate;
    prototype.createOffer = function createOffer(successCallback, failureCallback) {
        const options = arguments.length >= 2 ? arguments[2] : arguments[0];
        const promise = origCreateOffer.apply(this, [
            options
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
        const options = arguments.length >= 2 ? arguments[2] : arguments[0];
        const promise = origCreateAnswer.apply(this, [
            options
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    let withCallback = function(description, successCallback, failureCallback) {
        const promise = setLocalDescription.apply(this, [
            description
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;
    withCallback = function(description, successCallback, failureCallback) {
        const promise = setRemoteDescription.apply(this, [
            description
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;
    withCallback = function(candidate, successCallback, failureCallback) {
        const promise = addIceCandidate.apply(this, [
            candidate
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
}
function shimGetUserMedia(window) {
    const navigator = window && window.navigator;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // shim not needed in Safari 12.1
        const mediaDevices = navigator.mediaDevices;
        const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
        navigator.mediaDevices.getUserMedia = (constraints)=>{
            return _getUserMedia(shimConstraints(constraints));
        };
    }
    if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) navigator.getUserMedia = (function getUserMedia(constraints, cb, errcb) {
        navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
    }).bind(navigator);
}
function shimConstraints(constraints) {
    if (constraints && constraints.video !== undefined) return Object.assign({}, constraints, {
        video: _utils.compactObject(constraints.video)
    });
    return constraints;
}
function shimRTCIceServerUrls(window) {
    if (!window.RTCPeerConnection) return;
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    const OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
        if (pcConfig && pcConfig.iceServers) {
            const newIceServers = [];
            for(let i = 0; i < pcConfig.iceServers.length; i++){
                let server = pcConfig.iceServers[i];
                if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                    _utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                    server = JSON.parse(JSON.stringify(server));
                    server.urls = server.url;
                    delete server.url;
                    newIceServers.push(server);
                } else newIceServers.push(pcConfig.iceServers[i]);
            }
            pcConfig.iceServers = newIceServers;
        }
        return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ('generateCertificate' in OrigPeerConnection) Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get () {
            return OrigPeerConnection.generateCertificate;
        }
    });
}
function shimTrackEventTransceiver(window) {
    // Add event.transceiver member over deprecated event.receiver
    if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get () {
            return {
                receiver: this.receiver
            };
        }
    });
}
function shimCreateOfferLegacy(window) {
    const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
        if (offerOptions) {
            if (typeof offerOptions.offerToReceiveAudio !== 'undefined') // support bit values
            offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
            const audioTransceiver = this.getTransceivers().find((transceiver)=>transceiver.receiver.track.kind === 'audio'
            );
            if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                if (audioTransceiver.direction === 'sendrecv') {
                    if (audioTransceiver.setDirection) audioTransceiver.setDirection('sendonly');
                    else audioTransceiver.direction = 'sendonly';
                } else if (audioTransceiver.direction === 'recvonly') {
                    if (audioTransceiver.setDirection) audioTransceiver.setDirection('inactive');
                    else audioTransceiver.direction = 'inactive';
                }
            } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) this.addTransceiver('audio');
            if (typeof offerOptions.offerToReceiveVideo !== 'undefined') // support bit values
            offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
            const videoTransceiver = this.getTransceivers().find((transceiver)=>transceiver.receiver.track.kind === 'video'
            );
            if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                if (videoTransceiver.direction === 'sendrecv') {
                    if (videoTransceiver.setDirection) videoTransceiver.setDirection('sendonly');
                    else videoTransceiver.direction = 'sendonly';
                } else if (videoTransceiver.direction === 'recvonly') {
                    if (videoTransceiver.setDirection) videoTransceiver.setDirection('inactive');
                    else videoTransceiver.direction = 'inactive';
                }
            } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) this.addTransceiver('video');
        }
        return origCreateOffer.apply(this, arguments);
    };
}
function shimAudioContext(window) {
    if (typeof window !== 'object' || window.AudioContext) return;
    window.AudioContext = window.webkitAudioContext;
}

},{"../utils":"fZqjY","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"cfV9t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shimRTCIceCandidate", ()=>shimRTCIceCandidate
);
parcelHelpers.export(exports, "shimMaxMessageSize", ()=>shimMaxMessageSize
);
parcelHelpers.export(exports, "shimSendThrowTypeError", ()=>shimSendThrowTypeError
);
/* shims RTCConnectionState by pretending it is the same as iceConnectionState.
 * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
 * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
 * since DTLS failures would be hidden. See
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
 * for the Firefox tracking bug.
 */ parcelHelpers.export(exports, "shimConnectionState", ()=>shimConnectionState
);
parcelHelpers.export(exports, "removeExtmapAllowMixed", ()=>removeExtmapAllowMixed
);
parcelHelpers.export(exports, "shimAddIceCandidateNullOrEmpty", ()=>shimAddIceCandidateNullOrEmpty
);
var _sdp = require("sdp");
var _sdpDefault = parcelHelpers.interopDefault(_sdp);
var _utils = require("./utils");
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 'use strict';
function shimRTCIceCandidate(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) return;
    const NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function RTCIceCandidate(args) {
        // Remove the a= which shouldn't be part of the candidate string.
        if (typeof args === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
            args = JSON.parse(JSON.stringify(args));
            args.candidate = args.candidate.substr(2);
        }
        if (args.candidate && args.candidate.length) {
            // Augment the native candidate with the parsed fields.
            const nativeCandidate = new NativeRTCIceCandidate(args);
            const parsedCandidate = _sdpDefault.default.parseCandidate(args.candidate);
            const augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);
            // Add a serializer that does not serialize the extra attributes.
            augmentedCandidate.toJSON = function toJSON() {
                return {
                    candidate: augmentedCandidate.candidate,
                    sdpMid: augmentedCandidate.sdpMid,
                    sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                    usernameFragment: augmentedCandidate.usernameFragment
                };
            };
            return augmentedCandidate;
        }
        return new NativeRTCIceCandidate(args);
    };
    window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;
    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    _utils.wrapPeerConnectionEvent(window, 'icecandidate', (e)=>{
        if (e.candidate) Object.defineProperty(e, 'candidate', {
            value: new window.RTCIceCandidate(e.candidate),
            writable: 'false'
        });
        return e;
    });
}
function shimMaxMessageSize(window, browserDetails) {
    if (!window.RTCPeerConnection) return;
    if (!('sctp' in window.RTCPeerConnection.prototype)) Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
        get () {
            return typeof this._sctp === 'undefined' ? null : this._sctp;
        }
    });
    const sctpInDescription = function(description) {
        if (!description || !description.sdp) return false;
        const sections = _sdpDefault.default.splitSections(description.sdp);
        sections.shift();
        return sections.some((mediaSection)=>{
            const mLine = _sdpDefault.default.parseMLine(mediaSection);
            return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
        });
    };
    const getRemoteFirefoxVersion = function(description) {
        // TODO: Is there a better solution for detecting Firefox?
        const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
        if (match === null || match.length < 2) return -1;
        const version = parseInt(match[1], 10);
        // Test for NaN (yes, this is ugly)
        return version !== version ? -1 : version;
    };
    const getCanSendMaxMessageSize = function(remoteIsFirefox) {
        // Every implementation we know can send at least 64 KiB.
        // Note: Although Chrome is technically able to send up to 256 KiB, the
        //       data does not reach the other peer reliably.
        //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
        let canSendMaxMessageSize = 65536;
        if (browserDetails.browser === 'firefox') {
            if (browserDetails.version < 57) {
                if (remoteIsFirefox === -1) // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                // fragmentation.
                canSendMaxMessageSize = 16384;
                else // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                // messages. Thus, supporting ~2 GiB when sending.
                canSendMaxMessageSize = 2147483637;
            } else if (browserDetails.version < 60) // Currently, all FF >= 57 will reset the remote maximum message size
            // to the default value when a data channel is created at a later
            // stage. :(
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
            canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
            else // FF >= 60 supports sending ~2 GiB
            canSendMaxMessageSize = 2147483637;
        }
        return canSendMaxMessageSize;
    };
    const getMaxMessageSize = function(description, remoteIsFirefox) {
        // Note: 65536 bytes is the default value from the SDP spec. Also,
        //       every implementation we know supports receiving 65536 bytes.
        let maxMessageSize = 65536;
        // FF 57 has a slightly incorrect default remote max message size, so
        // we need to adjust it here to avoid a failure when sending.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
        if (browserDetails.browser === 'firefox' && browserDetails.version === 57) maxMessageSize = 65535;
        const match = _sdpDefault.default.matchPrefix(description.sdp, 'a=max-message-size:');
        if (match.length > 0) maxMessageSize = parseInt(match[0].substr(19), 10);
        else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) // If the maximum message size is not present in the remote SDP and
        // both local and remote are Firefox, the remote peer can receive
        // ~2 GiB.
        maxMessageSize = 2147483637;
        return maxMessageSize;
    };
    const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        this._sctp = null;
        // Chrome decided to not expose .sctp in plan-b mode.
        // As usual, adapter.js has to do an 'ugly worakaround'
        // to cover up the mess.
        if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
            const { sdpSemantics  } = this.getConfiguration();
            if (sdpSemantics === 'plan-b') Object.defineProperty(this, 'sctp', {
                get () {
                    return typeof this._sctp === 'undefined' ? null : this._sctp;
                },
                enumerable: true,
                configurable: true
            });
        }
        if (sctpInDescription(arguments[0])) {
            // Check if the remote is FF.
            const isFirefox = getRemoteFirefoxVersion(arguments[0]);
            // Get the maximum message size the local peer is capable of sending
            const canSendMMS = getCanSendMaxMessageSize(isFirefox);
            // Get the maximum message size of the remote peer.
            const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);
            // Determine final maximum message size
            let maxMessageSize;
            if (canSendMMS === 0 && remoteMMS === 0) maxMessageSize = Number.POSITIVE_INFINITY;
            else if (canSendMMS === 0 || remoteMMS === 0) maxMessageSize = Math.max(canSendMMS, remoteMMS);
            else maxMessageSize = Math.min(canSendMMS, remoteMMS);
            // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
            // attribute.
            const sctp = {};
            Object.defineProperty(sctp, 'maxMessageSize', {
                get () {
                    return maxMessageSize;
                }
            });
            this._sctp = sctp;
        }
        return origSetRemoteDescription.apply(this, arguments);
    };
}
function shimSendThrowTypeError(window) {
    if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) return;
    // Note: Although Firefox >= 57 has a native implementation, the maximum
    //       message size can be reset for all data channels at a later stage.
    //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
    function wrapDcSend(dc, pc) {
        const origDataChannelSend = dc.send;
        dc.send = function send() {
            const data = arguments[0];
            const length = data.length || data.size || data.byteLength;
            if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
            return origDataChannelSend.apply(dc, arguments);
        };
    }
    const origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
    window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
        const dataChannel = origCreateDataChannel.apply(this, arguments);
        wrapDcSend(dataChannel, this);
        return dataChannel;
    };
    _utils.wrapPeerConnectionEvent(window, 'datachannel', (e)=>{
        wrapDcSend(e.channel, e.target);
        return e;
    });
}
function shimConnectionState(window) {
    if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) return;
    const proto = window.RTCPeerConnection.prototype;
    Object.defineProperty(proto, 'connectionState', {
        get () {
            return ({
                completed: 'connected',
                checking: 'connecting'
            })[this.iceConnectionState] || this.iceConnectionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, 'onconnectionstatechange', {
        get () {
            return this._onconnectionstatechange || null;
        },
        set (cb) {
            if (this._onconnectionstatechange) {
                this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
                delete this._onconnectionstatechange;
            }
            if (cb) this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
        },
        enumerable: true,
        configurable: true
    });
    [
        'setLocalDescription',
        'setRemoteDescription'
    ].forEach((method)=>{
        const origMethod = proto[method];
        proto[method] = function() {
            if (!this._connectionstatechangepoly) {
                this._connectionstatechangepoly = (e)=>{
                    const pc = e.target;
                    if (pc._lastConnectionState !== pc.connectionState) {
                        pc._lastConnectionState = pc.connectionState;
                        const newEvent = new Event('connectionstatechange', e);
                        pc.dispatchEvent(newEvent);
                    }
                    return e;
                };
                this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
            }
            return origMethod.apply(this, arguments);
        };
    });
}
function removeExtmapAllowMixed(window, browserDetails) {
    /* remove a=extmap-allow-mixed for webrtc.org < M71 */ if (!window.RTCPeerConnection) return;
    if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) return;
    if (browserDetails.browser === 'safari' && browserDetails.version >= 605) return;
    const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
        if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
            const sdp = desc.sdp.split('\n').filter((line)=>{
                return line.trim() !== 'a=extmap-allow-mixed';
            }).join('\n');
            // Safari enforces read-only-ness of RTCSessionDescription fields.
            if (window.RTCSessionDescription && desc instanceof window.RTCSessionDescription) arguments[0] = new window.RTCSessionDescription({
                type: desc.type,
                sdp
            });
            else desc.sdp = sdp;
        }
        return nativeSRD.apply(this, arguments);
    };
}
function shimAddIceCandidateNullOrEmpty(window, browserDetails) {
    // Support for addIceCandidate(null or undefined)
    // as well as addIceCandidate({candidate: "", ...})
    // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
    // Note: must be called before other polyfills which change the signature.
    if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) return;
    const nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) return;
    window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
        if (!arguments[0]) {
            if (arguments[1]) arguments[1].apply(null);
            return Promise.resolve();
        }
        // Firefox 68+ emits and processes {candidate: "", ...}, ignore
        // in older versions.
        // Native support for ignoring exists for Chrome M77+.
        // Safari ignores as well, exact version unknown but works in the same
        // version that also ignores addIceCandidate(null).
        if ((browserDetails.browser === 'chrome' && browserDetails.version < 78 || browserDetails.browser === 'firefox' && browserDetails.version < 68 || browserDetails.browser === 'safari') && arguments[0] && arguments[0].candidate === '') return Promise.resolve();
        return nativeAddIceCandidate.apply(this, arguments);
    };
}

},{"sdp":"kUJU8","./utils":"fZqjY","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"6auJa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "stop_scan", ()=>stop_scan
);
parcelHelpers.export(exports, "start_scan", ()=>start_scan
);
var _jsqr = require("jsqr");
var _jsqrDefault = parcelHelpers.interopDefault(_jsqr);
var _indexJs = require("../../index.js");
let video;
let intv;
let stop_scan = function() {
    document.getElementById("qr-screen").style.display = "none";
};
let start_scan = function(callback) {
    document.getElementById("qr-screen").style.display = "block";
    console.log("start");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) navigator.getUserMedia({
        audio: false,
        video: {
            width: 200,
            height: 200
        }
    }, function(stream) {
        video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
            var barcodeCanvas = document.createElement("canvas");
            intv = setInterval(()=>{
                barcodeCanvas.width = video.videoWidth;
                barcodeCanvas.height = video.videoHeight;
                var barcodeContext = barcodeCanvas.getContext("2d");
                var imageWidth = Math.max(1, Math.floor(video.videoWidth)), imageHeight = Math.max(1, Math.floor(video.videoHeight));
                barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);
                var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
                var idd = imageData.data;
                let code = _jsqrDefault.default(idd, imageWidth, imageHeight);
                if (code) {
                    callback(code.data);
                    stop_scan();
                    clearInterval(intv);
                }
            }, 1000);
        };
    }, function(err) {
        console.log("The following error occurred: " + err.name);
    });
    else console.log("getUserMedia not supported");
};

},{"jsqr":"04jWG","../../index.js":"giHfk","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"04jWG":[function(require,module,exports) {
(function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
})(typeof self !== 'undefined' ? self : this, function() {
    return /******/ function(modules) {
        /******/ // The module cache
        /******/ var installedModules = {};
        /******/ /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/ /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) /******/ return installedModules[moduleId].exports;
            /******/ // Create a new module (and put it into the cache)
            /******/ var module = installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: false,
                /******/ exports: {}
            };
            /******/ /******/ // Execute the module function
            /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/ /******/ // Flag the module as loaded
            /******/ module.l = true;
            /******/ /******/ // Return the exports of the module
            /******/ return module.exports;
        /******/ }
        /******/ /******/ /******/ // expose the modules object (__webpack_modules__)
        /******/ __webpack_require__.m = modules;
        /******/ /******/ // expose the module cache
        /******/ __webpack_require__.c = installedModules;
        /******/ /******/ // define getter function for harmony exports
        /******/ __webpack_require__.d = function(exports, name, getter) {
            /******/ if (!__webpack_require__.o(exports, name)) /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
            });
        /******/ };
        /******/ /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function(module) {
            /******/ var getter = module && module.__esModule ? /******/ function getDefault() {
                return module['default'];
            } : /******/ function getModuleExports() {
                return module;
            };
            /******/ __webpack_require__.d(getter, 'a', getter);
            /******/ return getter;
        /******/ };
        /******/ /******/ // Object.prototype.hasOwnProperty.call
        /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/ /******/ // __webpack_public_path__
        /******/ __webpack_require__.p = "";
        /******/ /******/ // Load entry module and return exports
        /******/ return __webpack_require__(__webpack_require__.s = 3);
    /******/ }([
        /* 0 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix1 = /** @class */ function() {
                function BitMatrix(data, width) {
                    this.width = width;
                    this.height = data.length / width;
                    this.data = data;
                }
                BitMatrix.createEmpty = function(width, height) {
                    return new BitMatrix(new Uint8ClampedArray(width * height), width);
                };
                BitMatrix.prototype.get = function(x, y) {
                    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
                    return !!this.data[y * this.width + x];
                };
                BitMatrix.prototype.set = function(x, y, v) {
                    this.data[y * this.width + x] = v ? 1 : 0;
                };
                BitMatrix.prototype.setRegion = function(left, top, width, height, v) {
                    for(var y = top; y < top + height; y++)for(var x = left; x < left + width; x++)this.set(x, y, !!v);
                };
                return BitMatrix;
            }();
            exports.BitMatrix = BitMatrix1;
        /***/ },
        /* 1 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGFPoly_1 = __webpack_require__(2);
            function addOrSubtractGF(a, b) {
                return a ^ b; // tslint:disable-line:no-bitwise
            }
            exports.addOrSubtractGF = addOrSubtractGF;
            var GenericGF1 = /** @class */ function() {
                function GenericGF(primitive, size, genBase) {
                    this.primitive = primitive;
                    this.size = size;
                    this.generatorBase = genBase;
                    this.expTable = new Array(this.size);
                    this.logTable = new Array(this.size);
                    var x = 1;
                    for(var i = 0; i < this.size; i++){
                        this.expTable[i] = x;
                        x = x * 2;
                        if (x >= this.size) x = (x ^ this.primitive) & this.size - 1; // tslint:disable-line:no-bitwise
                    }
                    for(var i = 0; i < this.size - 1; i++)this.logTable[this.expTable[i]] = i;
                    this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        0
                    ]));
                    this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        1
                    ]));
                }
                GenericGF.prototype.multiply = function(a, b) {
                    if (a === 0 || b === 0) return 0;
                    return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
                };
                GenericGF.prototype.inverse = function(a) {
                    if (a === 0) throw new Error("Can't invert 0");
                    return this.expTable[this.size - this.logTable[a] - 1];
                };
                GenericGF.prototype.buildMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid monomial degree less than 0");
                    if (coefficient === 0) return this.zero;
                    var coefficients = new Uint8ClampedArray(degree + 1);
                    coefficients[0] = coefficient;
                    return new GenericGFPoly_1.default(this, coefficients);
                };
                GenericGF.prototype.log = function(a) {
                    if (a === 0) throw new Error("Can't take log(0)");
                    return this.logTable[a];
                };
                GenericGF.prototype.exp = function(a) {
                    return this.expTable[a];
                };
                return GenericGF;
            }();
            exports.default = GenericGF1;
        /***/ },
        /* 2 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly1 = /** @class */ function() {
                function GenericGFPoly(field, coefficients) {
                    if (coefficients.length === 0) throw new Error("No coefficients.");
                    this.field = field;
                    var coefficientsLength = coefficients.length;
                    if (coefficientsLength > 1 && coefficients[0] === 0) {
                        // Leading term must be non-zero for anything except the constant polynomial "0"
                        var firstNonZero = 1;
                        while(firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0)firstNonZero++;
                        if (firstNonZero === coefficientsLength) this.coefficients = field.zero.coefficients;
                        else {
                            this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                            for(var i = 0; i < this.coefficients.length; i++)this.coefficients[i] = coefficients[firstNonZero + i];
                        }
                    } else this.coefficients = coefficients;
                }
                GenericGFPoly.prototype.degree = function() {
                    return this.coefficients.length - 1;
                };
                GenericGFPoly.prototype.isZero = function() {
                    return this.coefficients[0] === 0;
                };
                GenericGFPoly.prototype.getCoefficient = function(degree) {
                    return this.coefficients[this.coefficients.length - 1 - degree];
                };
                GenericGFPoly.prototype.addOrSubtract = function(other) {
                    var _a;
                    if (this.isZero()) return other;
                    if (other.isZero()) return this;
                    var smallerCoefficients = this.coefficients;
                    var largerCoefficients = other.coefficients;
                    if (smallerCoefficients.length > largerCoefficients.length) _a = [
                        largerCoefficients,
                        smallerCoefficients
                    ], smallerCoefficients = _a[0], largerCoefficients = _a[1];
                    var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
                    var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
                    for(var i = 0; i < lengthDiff; i++)sumDiff[i] = largerCoefficients[i];
                    for(var i = lengthDiff; i < largerCoefficients.length; i++)sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
                    return new GenericGFPoly(this.field, sumDiff);
                };
                GenericGFPoly.prototype.multiply = function(scalar) {
                    if (scalar === 0) return this.field.zero;
                    if (scalar === 1) return this;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], scalar);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyPoly = function(other) {
                    if (this.isZero() || other.isZero()) return this.field.zero;
                    var aCoefficients = this.coefficients;
                    var aLength = aCoefficients.length;
                    var bCoefficients = other.coefficients;
                    var bLength = bCoefficients.length;
                    var product = new Uint8ClampedArray(aLength + bLength - 1);
                    for(var i = 0; i < aLength; i++){
                        var aCoeff = aCoefficients[i];
                        for(var j = 0; j < bLength; j++)product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
                    }
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyByMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid degree less than 0");
                    if (coefficient === 0) return this.field.zero;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size + degree);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], coefficient);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.evaluateAt = function(a) {
                    var result = 0;
                    if (a === 0) // Just return the x^0 coefficient
                    return this.getCoefficient(0);
                    var size = this.coefficients.length;
                    if (a === 1) {
                        // Just the sum of the coefficients
                        this.coefficients.forEach(function(coefficient) {
                            result = GenericGF_1.addOrSubtractGF(result, coefficient);
                        });
                        return result;
                    }
                    result = this.coefficients[0];
                    for(var i = 1; i < size; i++)result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
                    return result;
                };
                return GenericGFPoly;
            }();
            exports.default = GenericGFPoly1;
        /***/ },
        /* 3 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var binarizer_1 = __webpack_require__(4);
            var decoder_1 = __webpack_require__(5);
            var extractor_1 = __webpack_require__(11);
            var locator_1 = __webpack_require__(12);
            function scan(matrix) {
                var locations = locator_1.locate(matrix);
                if (!locations) return null;
                for(var _i = 0, locations_1 = locations; _i < locations_1.length; _i++){
                    var location_1 = locations_1[_i];
                    var extracted = extractor_1.extract(matrix, location_1);
                    var decoded = decoder_1.decode(extracted.matrix);
                    if (decoded) return {
                        binaryData: decoded.bytes,
                        data: decoded.text,
                        chunks: decoded.chunks,
                        version: decoded.version,
                        location: {
                            topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
                            topLeftCorner: extracted.mappingFunction(0, 0),
                            bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
                            bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
                            topRightFinderPattern: location_1.topRight,
                            topLeftFinderPattern: location_1.topLeft,
                            bottomLeftFinderPattern: location_1.bottomLeft,
                            bottomRightAlignmentPattern: location_1.alignmentPattern
                        }
                    };
                }
                return null;
            }
            var defaultOptions = {
                inversionAttempts: "attemptBoth"
            };
            function jsQR(data, width, height, providedOptions) {
                if (providedOptions === void 0) providedOptions = {};
                var options = defaultOptions;
                Object.keys(options || {}).forEach(function(opt) {
                    options[opt] = providedOptions[opt] || options[opt];
                });
                var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
                var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
                var _a = binarizer_1.binarize(data, width, height, shouldInvert), binarized = _a.binarized, inverted = _a.inverted;
                var result = scan(tryInvertedFirst ? inverted : binarized);
                if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) result = scan(tryInvertedFirst ? binarized : inverted);
                return result;
            }
            jsQR.default = jsQR;
            exports.default = jsQR;
        /***/ },
        /* 4 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var REGION_SIZE = 8;
            var MIN_DYNAMIC_RANGE = 24;
            function numBetween(value, min, max) {
                return value < min ? min : value > max ? max : value;
            }
            // Like BitMatrix but accepts arbitry Uint8 values
            var Matrix1 = /** @class */ function() {
                function Matrix(width, height) {
                    this.width = width;
                    this.data = new Uint8ClampedArray(width * height);
                }
                Matrix.prototype.get = function(x, y) {
                    return this.data[y * this.width + x];
                };
                Matrix.prototype.set = function(x, y, value) {
                    this.data[y * this.width + x] = value;
                };
                return Matrix;
            }();
            function binarize(data, width, height, returnInverted) {
                if (data.length !== width * height * 4) throw new Error("Malformed data passed to binarizer.");
                // Convert image to greyscale
                var greyscalePixels = new Matrix1(width, height);
                for(var x = 0; x < width; x++)for(var y = 0; y < height; y++){
                    var r = data[(y * width + x) * 4 + 0];
                    var g = data[(y * width + x) * 4 + 1];
                    var b = data[(y * width + x) * 4 + 2];
                    greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
                }
                var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
                var verticalRegionCount = Math.ceil(height / REGION_SIZE);
                var blackPoints = new Matrix1(horizontalRegionCount, verticalRegionCount);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var sum = 0;
                    var min = Infinity;
                    var max = 0;
                    for(var y = 0; y < REGION_SIZE; y++)for(var x = 0; x < REGION_SIZE; x++){
                        var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                        sum += pixelLumosity;
                        min = Math.min(min, pixelLumosity);
                        max = Math.max(max, pixelLumosity);
                    }
                    var average = sum / Math.pow(REGION_SIZE, 2);
                    if (max - min <= MIN_DYNAMIC_RANGE) {
                        // If variation within the block is low, assume this is a block with only light or only
                        // dark pixels. In that case we do not want to use the average, as it would divide this
                        // low contrast area into black and white pixels, essentially creating data out of noise.
                        //
                        // Default the blackpoint for these blocks to be half the min - effectively white them out
                        average = min / 2;
                        if (verticalRegion > 0 && hortizontalRegion > 0) {
                            // Correct the "white background" assumption for blocks that have neighbors by comparing
                            // the pixels in this block to the previously calculated black points. This is based on
                            // the fact that dark barcode symbology is always surrounded by some amount of light
                            // background for which reasonable black point estimates were made. The bp estimated at
                            // the boundaries is used for the interior.
                            // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                            var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) + 2 * blackPoints.get(hortizontalRegion - 1, verticalRegion) + blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                            if (min < averageNeighborBlackPoint) average = averageNeighborBlackPoint;
                        }
                    }
                    blackPoints.set(hortizontalRegion, verticalRegion, average);
                }
                var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
                var inverted = null;
                if (returnInverted) inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
                    var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
                    var sum = 0;
                    for(var xRegion = -2; xRegion <= 2; xRegion++)for(var yRegion = -2; yRegion <= 2; yRegion++)sum += blackPoints.get(left + xRegion, top_1 + yRegion);
                    var threshold = sum / 25;
                    for(var xRegion = 0; xRegion < REGION_SIZE; xRegion++)for(var yRegion = 0; yRegion < REGION_SIZE; yRegion++){
                        var x = hortizontalRegion * REGION_SIZE + xRegion;
                        var y = verticalRegion * REGION_SIZE + yRegion;
                        var lum = greyscalePixels.get(x, y);
                        binarized.set(x, y, lum <= threshold);
                        if (returnInverted) inverted.set(x, y, !(lum <= threshold));
                    }
                }
                if (returnInverted) return {
                    binarized: binarized,
                    inverted: inverted
                };
                return {
                    binarized: binarized
                };
            }
            exports.binarize = binarize;
        /***/ },
        /* 5 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var decodeData_1 = __webpack_require__(6);
            var reedsolomon_1 = __webpack_require__(9);
            var version_1 = __webpack_require__(10);
            // tslint:disable:no-bitwise
            function numBitsDiffering(x, y) {
                var z = x ^ y;
                var bitCount = 0;
                while(z){
                    bitCount++;
                    z &= z - 1;
                }
                return bitCount;
            }
            function pushBit(bit, byte) {
                return byte << 1 | bit;
            }
            // tslint:enable:no-bitwise
            var FORMAT_INFO_TABLE = [
                {
                    bits: 0x5412,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x5125,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x5E7C,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x5B4B,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x45F9,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x40CE,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x4F97,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x4AA0,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x77C4,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x72F3,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x7DAA,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x789D,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x662F,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x6318,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x6C41,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x6976,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x1689,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x13BE,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x1CE7,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x19D0,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x0762,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x0255,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x0D0C,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x083B,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x355F,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x3068,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x3F31,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x3A06,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x24B4,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x2183,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x2EDA,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x2BED,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 7
                    }
                }, 
            ];
            var DATA_MASKS = [
                function(p) {
                    return (p.y + p.x) % 2 === 0;
                },
                function(p) {
                    return p.y % 2 === 0;
                },
                function(p) {
                    return p.x % 3 === 0;
                },
                function(p) {
                    return (p.y + p.x) % 3 === 0;
                },
                function(p) {
                    return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0;
                },
                function(p) {
                    return p.x * p.y % 2 + p.x * p.y % 3 === 0;
                },
                function(p) {
                    return (p.y * p.x % 2 + p.y * p.x % 3) % 2 === 0;
                },
                function(p) {
                    return ((p.y + p.x) % 2 + p.y * p.x % 3) % 2 === 0;
                }, 
            ];
            function buildFunctionPatternMask(version) {
                var dimension = 17 + 4 * version.versionNumber;
                var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
                matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
                matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
                matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
                // Alignment patterns
                for(var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++){
                    var x = _a[_i];
                    for(var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++){
                        var y = _c[_b];
                        if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) matrix.setRegion(x - 2, y - 2, 5, 5, true);
                    }
                }
                matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
                matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
                if (version.versionNumber > 6) {
                    matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
                    matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
                }
                return matrix;
            }
            function readCodewords(matrix, version, formatInfo) {
                var dataMask = DATA_MASKS[formatInfo.dataMask];
                var dimension = matrix.height;
                var functionPatternMask = buildFunctionPatternMask(version);
                var codewords = [];
                var currentByte = 0;
                var bitsRead = 0;
                // Read columns in pairs, from right to left
                var readingUp = true;
                for(var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2){
                    if (columnIndex === 6) columnIndex--;
                    for(var i = 0; i < dimension; i++){
                        var y = readingUp ? dimension - 1 - i : i;
                        for(var columnOffset = 0; columnOffset < 2; columnOffset++){
                            var x = columnIndex - columnOffset;
                            if (!functionPatternMask.get(x, y)) {
                                bitsRead++;
                                var bit = matrix.get(x, y);
                                if (dataMask({
                                    y: y,
                                    x: x
                                })) bit = !bit;
                                currentByte = pushBit(bit, currentByte);
                                if (bitsRead === 8) {
                                    codewords.push(currentByte);
                                    bitsRead = 0;
                                    currentByte = 0;
                                }
                            }
                        }
                    }
                    readingUp = !readingUp;
                }
                return codewords;
            }
            function readVersion(matrix) {
                var dimension = matrix.height;
                var provisionalVersion = Math.floor((dimension - 17) / 4);
                if (provisionalVersion <= 6) return version_1.VERSIONS[provisionalVersion - 1];
                var topRightVersionBits = 0;
                for(var y = 5; y >= 0; y--)for(var x = dimension - 9; x >= dimension - 11; x--)topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
                var bottomLeftVersionBits = 0;
                for(var x = 5; x >= 0; x--)for(var y = dimension - 9; y >= dimension - 11; y--)bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
                var bestDifference = Infinity;
                var bestVersion;
                for(var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++){
                    var version = VERSIONS_1[_i];
                    if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) return version;
                    var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                    difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                }
                // We can tolerate up to 3 bits of error since no two version info codewords will
                // differ in less than 8 bits.
                if (bestDifference <= 3) return bestVersion;
            }
            function readFormatInformation(matrix) {
                var topLeftFormatInfoBits = 0;
                for(var x = 0; x <= 8; x++)if (x !== 6) topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
                for(var y = 7; y >= 0; y--)if (y !== 6) topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
                var dimension = matrix.height;
                var topRightBottomRightFormatInfoBits = 0;
                for(var y = dimension - 1; y >= dimension - 7; y--)topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
                for(var x = dimension - 8; x < dimension; x++)topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
                var bestDifference = Infinity;
                var bestFormatInfo = null;
                for(var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++){
                    var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
                    if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) return formatInfo;
                    var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
                    if (difference < bestDifference) {
                        bestFormatInfo = formatInfo;
                        bestDifference = difference;
                    }
                    if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
                        difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
                        if (difference < bestDifference) {
                            bestFormatInfo = formatInfo;
                            bestDifference = difference;
                        }
                    }
                }
                // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
                if (bestDifference <= 3) return bestFormatInfo;
                return null;
            }
            function getDataBlocks(codewords, version, ecLevel) {
                var ecInfo = version.errorCorrectionLevels[ecLevel];
                var dataBlocks = [];
                var totalCodewords = 0;
                ecInfo.ecBlocks.forEach(function(block) {
                    for(var i = 0; i < block.numBlocks; i++){
                        dataBlocks.push({
                            numDataCodewords: block.dataCodewordsPerBlock,
                            codewords: []
                        });
                        totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
                    }
                });
                // In some cases the QR code will be malformed enough that we pull off more or less than we should.
                // If we pull off less there's nothing we can do.
                // If we pull off more we can safely truncate
                if (codewords.length < totalCodewords) return null;
                codewords = codewords.slice(0, totalCodewords);
                var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
                // Pull codewords to fill the blocks up to the minimum size
                for(var i1 = 0; i1 < shortBlockSize; i1++)for(var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++){
                    var dataBlock = dataBlocks_1[_i];
                    dataBlock.codewords.push(codewords.shift());
                }
                // If there are any large blocks, pull codewords to fill the last element of those
                if (ecInfo.ecBlocks.length > 1) {
                    var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
                    var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
                    for(var i1 = 0; i1 < largeBlockCount; i1++)dataBlocks[smallBlockCount + i1].codewords.push(codewords.shift());
                }
                // Add the rest of the codewords to the blocks. These are the error correction codewords.
                while(codewords.length > 0)for(var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++){
                    var dataBlock = dataBlocks_2[_a];
                    dataBlock.codewords.push(codewords.shift());
                }
                return dataBlocks;
            }
            function decodeMatrix(matrix) {
                var version = readVersion(matrix);
                if (!version) return null;
                var formatInfo = readFormatInformation(matrix);
                if (!formatInfo) return null;
                var codewords = readCodewords(matrix, version, formatInfo);
                var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
                if (!dataBlocks) return null;
                // Count total number of data bytes
                var totalBytes = dataBlocks.reduce(function(a, b) {
                    return a + b.numDataCodewords;
                }, 0);
                var resultBytes = new Uint8ClampedArray(totalBytes);
                var resultIndex = 0;
                for(var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++){
                    var dataBlock = dataBlocks_3[_i];
                    var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
                    if (!correctedBytes) return null;
                    for(var i = 0; i < dataBlock.numDataCodewords; i++)resultBytes[resultIndex++] = correctedBytes[i];
                }
                try {
                    return decodeData_1.decode(resultBytes, version.versionNumber);
                } catch (_a) {
                    return null;
                }
            }
            function decode(matrix) {
                if (matrix == null) return null;
                var result = decodeMatrix(matrix);
                if (result) return result;
                // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
                for(var x = 0; x < matrix.width; x++){
                    for(var y = x + 1; y < matrix.height; y++)if (matrix.get(x, y) !== matrix.get(y, x)) {
                        matrix.set(x, y, !matrix.get(x, y));
                        matrix.set(y, x, !matrix.get(y, x));
                    }
                }
                return decodeMatrix(matrix);
            }
            exports.decode = decode;
        /***/ },
        /* 6 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            // tslint:disable:no-bitwise
            var BitStream_1 = __webpack_require__(7);
            var shiftJISTable_1 = __webpack_require__(8);
            var Mode1;
            (function(Mode) {
                Mode["Numeric"] = "numeric";
                Mode["Alphanumeric"] = "alphanumeric";
                Mode["Byte"] = "byte";
                Mode["Kanji"] = "kanji";
                Mode["ECI"] = "eci";
            })(Mode1 = exports.Mode || (exports.Mode = {}));
            var ModeByte1;
            (function(ModeByte) {
                ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
                ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
                ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
                ModeByte[ModeByte["Byte"] = 4] = "Byte";
                ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
                ModeByte[ModeByte["ECI"] = 7] = "ECI";
            // StructuredAppend = 0x3,
            // FNC1FirstPosition = 0x5,
            // FNC1SecondPosition = 0x9,
            })(ModeByte1 || (ModeByte1 = {}));
            function decodeNumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    10,
                    12,
                    14
                ][size];
                var length = stream.readBits(characterCountSize);
                // Read digits in groups of 3
                while(length >= 3){
                    var num = stream.readBits(10);
                    if (num >= 1000) throw new Error("Invalid numeric value above 999");
                    var a = Math.floor(num / 100);
                    var b = Math.floor(num / 10) % 10;
                    var c = num % 10;
                    bytes.push(48 + a, 48 + b, 48 + c);
                    text += a.toString() + b.toString() + c.toString();
                    length -= 3;
                }
                // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
                if (length === 2) {
                    var num = stream.readBits(7);
                    if (num >= 100) throw new Error("Invalid numeric value above 99");
                    var a = Math.floor(num / 10);
                    var b = num % 10;
                    bytes.push(48 + a, 48 + b);
                    text += a.toString() + b.toString();
                } else if (length === 1) {
                    var num = stream.readBits(4);
                    if (num >= 10) throw new Error("Invalid numeric value above 9");
                    bytes.push(48 + num);
                    text += num.toString();
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            var AlphanumericCharacterCodes = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                " ",
                "$",
                "%",
                "*",
                "+",
                "-",
                ".",
                "/",
                ":", 
            ];
            function decodeAlphanumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    9,
                    11,
                    13
                ][size];
                var length = stream.readBits(characterCountSize);
                while(length >= 2){
                    var v = stream.readBits(11);
                    var a = Math.floor(v / 45);
                    var b = v % 45;
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
                    length -= 2;
                }
                if (length === 1) {
                    var a = stream.readBits(6);
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a];
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeByte(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    16,
                    16
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var b = stream.readBits(8);
                    bytes.push(b);
                }
                try {
                    text += decodeURIComponent(bytes.map(function(b) {
                        return "%" + ("0" + b.toString(16)).substr(-2);
                    }).join(""));
                } catch (_a) {
                // failed to decode
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeKanji(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    10,
                    12
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var k = stream.readBits(13);
                    var c = Math.floor(k / 0xC0) << 8 | k % 0xC0;
                    if (c < 0x1F00) c += 0x8140;
                    else c += 0xC140;
                    bytes.push(c >> 8, c & 0xFF);
                    text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decode(data, version) {
                var _a, _b, _c, _d;
                var stream = new BitStream_1.BitStream(data);
                // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
                var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
                var result = {
                    text: "",
                    bytes: [],
                    chunks: [],
                    version: version
                };
                while(stream.available() >= 4){
                    var mode = stream.readBits(4);
                    if (mode === ModeByte1.Terminator) return result;
                    else if (mode === ModeByte1.ECI) {
                        if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(7)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(14)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(21)
                        });
                        else // ECI data seems corrupted
                        result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: -1
                        });
                    } else if (mode === ModeByte1.Numeric) {
                        var numericResult = decodeNumeric(stream, size);
                        result.text += numericResult.text;
                        (_a = result.bytes).push.apply(_a, numericResult.bytes);
                        result.chunks.push({
                            type: Mode1.Numeric,
                            text: numericResult.text
                        });
                    } else if (mode === ModeByte1.Alphanumeric) {
                        var alphanumericResult = decodeAlphanumeric(stream, size);
                        result.text += alphanumericResult.text;
                        (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
                        result.chunks.push({
                            type: Mode1.Alphanumeric,
                            text: alphanumericResult.text
                        });
                    } else if (mode === ModeByte1.Byte) {
                        var byteResult = decodeByte(stream, size);
                        result.text += byteResult.text;
                        (_c = result.bytes).push.apply(_c, byteResult.bytes);
                        result.chunks.push({
                            type: Mode1.Byte,
                            bytes: byteResult.bytes,
                            text: byteResult.text
                        });
                    } else if (mode === ModeByte1.Kanji) {
                        var kanjiResult = decodeKanji(stream, size);
                        result.text += kanjiResult.text;
                        (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
                        result.chunks.push({
                            type: Mode1.Kanji,
                            bytes: kanjiResult.bytes,
                            text: kanjiResult.text
                        });
                    }
                }
                // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
                if (stream.available() === 0 || stream.readBits(stream.available()) === 0) return result;
            }
            exports.decode = decode;
        /***/ },
        /* 7 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            // tslint:disable:no-bitwise
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitStream1 = /** @class */ function() {
                function BitStream(bytes) {
                    this.byteOffset = 0;
                    this.bitOffset = 0;
                    this.bytes = bytes;
                }
                BitStream.prototype.readBits = function(numBits) {
                    if (numBits < 1 || numBits > 32 || numBits > this.available()) throw new Error("Cannot read " + numBits.toString() + " bits");
                    var result = 0;
                    // First, read remainder from current byte
                    if (this.bitOffset > 0) {
                        var bitsLeft = 8 - this.bitOffset;
                        var toRead = numBits < bitsLeft ? numBits : bitsLeft;
                        var bitsToNotRead = bitsLeft - toRead;
                        var mask = 0xFF >> 8 - toRead << bitsToNotRead;
                        result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                        numBits -= toRead;
                        this.bitOffset += toRead;
                        if (this.bitOffset === 8) {
                            this.bitOffset = 0;
                            this.byteOffset++;
                        }
                    }
                    // Next read whole bytes
                    if (numBits > 0) {
                        while(numBits >= 8){
                            result = result << 8 | this.bytes[this.byteOffset] & 0xFF;
                            this.byteOffset++;
                            numBits -= 8;
                        }
                        // Finally read a partial byte
                        if (numBits > 0) {
                            var bitsToNotRead = 8 - numBits;
                            var mask = 0xFF >> bitsToNotRead << bitsToNotRead;
                            result = result << numBits | (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                            this.bitOffset += numBits;
                        }
                    }
                    return result;
                };
                BitStream.prototype.available = function() {
                    return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
                };
                return BitStream;
            }();
            exports.BitStream = BitStream1;
        /***/ },
        /* 8 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shiftJISTable = {
                0x20: 0x0020,
                0x21: 0x0021,
                0x22: 0x0022,
                0x23: 0x0023,
                0x24: 0x0024,
                0x25: 0x0025,
                0x26: 0x0026,
                0x27: 0x0027,
                0x28: 0x0028,
                0x29: 0x0029,
                0x2A: 0x002A,
                0x2B: 0x002B,
                0x2C: 0x002C,
                0x2D: 0x002D,
                0x2E: 0x002E,
                0x2F: 0x002F,
                0x30: 0x0030,
                0x31: 0x0031,
                0x32: 0x0032,
                0x33: 0x0033,
                0x34: 0x0034,
                0x35: 0x0035,
                0x36: 0x0036,
                0x37: 0x0037,
                0x38: 0x0038,
                0x39: 0x0039,
                0x3A: 0x003A,
                0x3B: 0x003B,
                0x3C: 0x003C,
                0x3D: 0x003D,
                0x3E: 0x003E,
                0x3F: 0x003F,
                0x40: 0x0040,
                0x41: 0x0041,
                0x42: 0x0042,
                0x43: 0x0043,
                0x44: 0x0044,
                0x45: 0x0045,
                0x46: 0x0046,
                0x47: 0x0047,
                0x48: 0x0048,
                0x49: 0x0049,
                0x4A: 0x004A,
                0x4B: 0x004B,
                0x4C: 0x004C,
                0x4D: 0x004D,
                0x4E: 0x004E,
                0x4F: 0x004F,
                0x50: 0x0050,
                0x51: 0x0051,
                0x52: 0x0052,
                0x53: 0x0053,
                0x54: 0x0054,
                0x55: 0x0055,
                0x56: 0x0056,
                0x57: 0x0057,
                0x58: 0x0058,
                0x59: 0x0059,
                0x5A: 0x005A,
                0x5B: 0x005B,
                0x5C: 0x00A5,
                0x5D: 0x005D,
                0x5E: 0x005E,
                0x5F: 0x005F,
                0x60: 0x0060,
                0x61: 0x0061,
                0x62: 0x0062,
                0x63: 0x0063,
                0x64: 0x0064,
                0x65: 0x0065,
                0x66: 0x0066,
                0x67: 0x0067,
                0x68: 0x0068,
                0x69: 0x0069,
                0x6A: 0x006A,
                0x6B: 0x006B,
                0x6C: 0x006C,
                0x6D: 0x006D,
                0x6E: 0x006E,
                0x6F: 0x006F,
                0x70: 0x0070,
                0x71: 0x0071,
                0x72: 0x0072,
                0x73: 0x0073,
                0x74: 0x0074,
                0x75: 0x0075,
                0x76: 0x0076,
                0x77: 0x0077,
                0x78: 0x0078,
                0x79: 0x0079,
                0x7A: 0x007A,
                0x7B: 0x007B,
                0x7C: 0x007C,
                0x7D: 0x007D,
                0x7E: 0x203E,
                0x8140: 0x3000,
                0x8141: 0x3001,
                0x8142: 0x3002,
                0x8143: 0xFF0C,
                0x8144: 0xFF0E,
                0x8145: 0x30FB,
                0x8146: 0xFF1A,
                0x8147: 0xFF1B,
                0x8148: 0xFF1F,
                0x8149: 0xFF01,
                0x814A: 0x309B,
                0x814B: 0x309C,
                0x814C: 0x00B4,
                0x814D: 0xFF40,
                0x814E: 0x00A8,
                0x814F: 0xFF3E,
                0x8150: 0xFFE3,
                0x8151: 0xFF3F,
                0x8152: 0x30FD,
                0x8153: 0x30FE,
                0x8154: 0x309D,
                0x8155: 0x309E,
                0x8156: 0x3003,
                0x8157: 0x4EDD,
                0x8158: 0x3005,
                0x8159: 0x3006,
                0x815A: 0x3007,
                0x815B: 0x30FC,
                0x815C: 0x2015,
                0x815D: 0x2010,
                0x815E: 0xFF0F,
                0x815F: 0x005C,
                0x8160: 0x301C,
                0x8161: 0x2016,
                0x8162: 0xFF5C,
                0x8163: 0x2026,
                0x8164: 0x2025,
                0x8165: 0x2018,
                0x8166: 0x2019,
                0x8167: 0x201C,
                0x8168: 0x201D,
                0x8169: 0xFF08,
                0x816A: 0xFF09,
                0x816B: 0x3014,
                0x816C: 0x3015,
                0x816D: 0xFF3B,
                0x816E: 0xFF3D,
                0x816F: 0xFF5B,
                0x8170: 0xFF5D,
                0x8171: 0x3008,
                0x8172: 0x3009,
                0x8173: 0x300A,
                0x8174: 0x300B,
                0x8175: 0x300C,
                0x8176: 0x300D,
                0x8177: 0x300E,
                0x8178: 0x300F,
                0x8179: 0x3010,
                0x817A: 0x3011,
                0x817B: 0xFF0B,
                0x817C: 0x2212,
                0x817D: 0x00B1,
                0x817E: 0x00D7,
                0x8180: 0x00F7,
                0x8181: 0xFF1D,
                0x8182: 0x2260,
                0x8183: 0xFF1C,
                0x8184: 0xFF1E,
                0x8185: 0x2266,
                0x8186: 0x2267,
                0x8187: 0x221E,
                0x8188: 0x2234,
                0x8189: 0x2642,
                0x818A: 0x2640,
                0x818B: 0x00B0,
                0x818C: 0x2032,
                0x818D: 0x2033,
                0x818E: 0x2103,
                0x818F: 0xFFE5,
                0x8190: 0xFF04,
                0x8191: 0x00A2,
                0x8192: 0x00A3,
                0x8193: 0xFF05,
                0x8194: 0xFF03,
                0x8195: 0xFF06,
                0x8196: 0xFF0A,
                0x8197: 0xFF20,
                0x8198: 0x00A7,
                0x8199: 0x2606,
                0x819A: 0x2605,
                0x819B: 0x25CB,
                0x819C: 0x25CF,
                0x819D: 0x25CE,
                0x819E: 0x25C7,
                0x819F: 0x25C6,
                0x81A0: 0x25A1,
                0x81A1: 0x25A0,
                0x81A2: 0x25B3,
                0x81A3: 0x25B2,
                0x81A4: 0x25BD,
                0x81A5: 0x25BC,
                0x81A6: 0x203B,
                0x81A7: 0x3012,
                0x81A8: 0x2192,
                0x81A9: 0x2190,
                0x81AA: 0x2191,
                0x81AB: 0x2193,
                0x81AC: 0x3013,
                0x81B8: 0x2208,
                0x81B9: 0x220B,
                0x81BA: 0x2286,
                0x81BB: 0x2287,
                0x81BC: 0x2282,
                0x81BD: 0x2283,
                0x81BE: 0x222A,
                0x81BF: 0x2229,
                0x81C8: 0x2227,
                0x81C9: 0x2228,
                0x81CA: 0x00AC,
                0x81CB: 0x21D2,
                0x81CC: 0x21D4,
                0x81CD: 0x2200,
                0x81CE: 0x2203,
                0x81DA: 0x2220,
                0x81DB: 0x22A5,
                0x81DC: 0x2312,
                0x81DD: 0x2202,
                0x81DE: 0x2207,
                0x81DF: 0x2261,
                0x81E0: 0x2252,
                0x81E1: 0x226A,
                0x81E2: 0x226B,
                0x81E3: 0x221A,
                0x81E4: 0x223D,
                0x81E5: 0x221D,
                0x81E6: 0x2235,
                0x81E7: 0x222B,
                0x81E8: 0x222C,
                0x81F0: 0x212B,
                0x81F1: 0x2030,
                0x81F2: 0x266F,
                0x81F3: 0x266D,
                0x81F4: 0x266A,
                0x81F5: 0x2020,
                0x81F6: 0x2021,
                0x81F7: 0x00B6,
                0x81FC: 0x25EF,
                0x824F: 0xFF10,
                0x8250: 0xFF11,
                0x8251: 0xFF12,
                0x8252: 0xFF13,
                0x8253: 0xFF14,
                0x8254: 0xFF15,
                0x8255: 0xFF16,
                0x8256: 0xFF17,
                0x8257: 0xFF18,
                0x8258: 0xFF19,
                0x8260: 0xFF21,
                0x8261: 0xFF22,
                0x8262: 0xFF23,
                0x8263: 0xFF24,
                0x8264: 0xFF25,
                0x8265: 0xFF26,
                0x8266: 0xFF27,
                0x8267: 0xFF28,
                0x8268: 0xFF29,
                0x8269: 0xFF2A,
                0x826A: 0xFF2B,
                0x826B: 0xFF2C,
                0x826C: 0xFF2D,
                0x826D: 0xFF2E,
                0x826E: 0xFF2F,
                0x826F: 0xFF30,
                0x8270: 0xFF31,
                0x8271: 0xFF32,
                0x8272: 0xFF33,
                0x8273: 0xFF34,
                0x8274: 0xFF35,
                0x8275: 0xFF36,
                0x8276: 0xFF37,
                0x8277: 0xFF38,
                0x8278: 0xFF39,
                0x8279: 0xFF3A,
                0x8281: 0xFF41,
                0x8282: 0xFF42,
                0x8283: 0xFF43,
                0x8284: 0xFF44,
                0x8285: 0xFF45,
                0x8286: 0xFF46,
                0x8287: 0xFF47,
                0x8288: 0xFF48,
                0x8289: 0xFF49,
                0x828A: 0xFF4A,
                0x828B: 0xFF4B,
                0x828C: 0xFF4C,
                0x828D: 0xFF4D,
                0x828E: 0xFF4E,
                0x828F: 0xFF4F,
                0x8290: 0xFF50,
                0x8291: 0xFF51,
                0x8292: 0xFF52,
                0x8293: 0xFF53,
                0x8294: 0xFF54,
                0x8295: 0xFF55,
                0x8296: 0xFF56,
                0x8297: 0xFF57,
                0x8298: 0xFF58,
                0x8299: 0xFF59,
                0x829A: 0xFF5A,
                0x829F: 0x3041,
                0x82A0: 0x3042,
                0x82A1: 0x3043,
                0x82A2: 0x3044,
                0x82A3: 0x3045,
                0x82A4: 0x3046,
                0x82A5: 0x3047,
                0x82A6: 0x3048,
                0x82A7: 0x3049,
                0x82A8: 0x304A,
                0x82A9: 0x304B,
                0x82AA: 0x304C,
                0x82AB: 0x304D,
                0x82AC: 0x304E,
                0x82AD: 0x304F,
                0x82AE: 0x3050,
                0x82AF: 0x3051,
                0x82B0: 0x3052,
                0x82B1: 0x3053,
                0x82B2: 0x3054,
                0x82B3: 0x3055,
                0x82B4: 0x3056,
                0x82B5: 0x3057,
                0x82B6: 0x3058,
                0x82B7: 0x3059,
                0x82B8: 0x305A,
                0x82B9: 0x305B,
                0x82BA: 0x305C,
                0x82BB: 0x305D,
                0x82BC: 0x305E,
                0x82BD: 0x305F,
                0x82BE: 0x3060,
                0x82BF: 0x3061,
                0x82C0: 0x3062,
                0x82C1: 0x3063,
                0x82C2: 0x3064,
                0x82C3: 0x3065,
                0x82C4: 0x3066,
                0x82C5: 0x3067,
                0x82C6: 0x3068,
                0x82C7: 0x3069,
                0x82C8: 0x306A,
                0x82C9: 0x306B,
                0x82CA: 0x306C,
                0x82CB: 0x306D,
                0x82CC: 0x306E,
                0x82CD: 0x306F,
                0x82CE: 0x3070,
                0x82CF: 0x3071,
                0x82D0: 0x3072,
                0x82D1: 0x3073,
                0x82D2: 0x3074,
                0x82D3: 0x3075,
                0x82D4: 0x3076,
                0x82D5: 0x3077,
                0x82D6: 0x3078,
                0x82D7: 0x3079,
                0x82D8: 0x307A,
                0x82D9: 0x307B,
                0x82DA: 0x307C,
                0x82DB: 0x307D,
                0x82DC: 0x307E,
                0x82DD: 0x307F,
                0x82DE: 0x3080,
                0x82DF: 0x3081,
                0x82E0: 0x3082,
                0x82E1: 0x3083,
                0x82E2: 0x3084,
                0x82E3: 0x3085,
                0x82E4: 0x3086,
                0x82E5: 0x3087,
                0x82E6: 0x3088,
                0x82E7: 0x3089,
                0x82E8: 0x308A,
                0x82E9: 0x308B,
                0x82EA: 0x308C,
                0x82EB: 0x308D,
                0x82EC: 0x308E,
                0x82ED: 0x308F,
                0x82EE: 0x3090,
                0x82EF: 0x3091,
                0x82F0: 0x3092,
                0x82F1: 0x3093,
                0x8340: 0x30A1,
                0x8341: 0x30A2,
                0x8342: 0x30A3,
                0x8343: 0x30A4,
                0x8344: 0x30A5,
                0x8345: 0x30A6,
                0x8346: 0x30A7,
                0x8347: 0x30A8,
                0x8348: 0x30A9,
                0x8349: 0x30AA,
                0x834A: 0x30AB,
                0x834B: 0x30AC,
                0x834C: 0x30AD,
                0x834D: 0x30AE,
                0x834E: 0x30AF,
                0x834F: 0x30B0,
                0x8350: 0x30B1,
                0x8351: 0x30B2,
                0x8352: 0x30B3,
                0x8353: 0x30B4,
                0x8354: 0x30B5,
                0x8355: 0x30B6,
                0x8356: 0x30B7,
                0x8357: 0x30B8,
                0x8358: 0x30B9,
                0x8359: 0x30BA,
                0x835A: 0x30BB,
                0x835B: 0x30BC,
                0x835C: 0x30BD,
                0x835D: 0x30BE,
                0x835E: 0x30BF,
                0x835F: 0x30C0,
                0x8360: 0x30C1,
                0x8361: 0x30C2,
                0x8362: 0x30C3,
                0x8363: 0x30C4,
                0x8364: 0x30C5,
                0x8365: 0x30C6,
                0x8366: 0x30C7,
                0x8367: 0x30C8,
                0x8368: 0x30C9,
                0x8369: 0x30CA,
                0x836A: 0x30CB,
                0x836B: 0x30CC,
                0x836C: 0x30CD,
                0x836D: 0x30CE,
                0x836E: 0x30CF,
                0x836F: 0x30D0,
                0x8370: 0x30D1,
                0x8371: 0x30D2,
                0x8372: 0x30D3,
                0x8373: 0x30D4,
                0x8374: 0x30D5,
                0x8375: 0x30D6,
                0x8376: 0x30D7,
                0x8377: 0x30D8,
                0x8378: 0x30D9,
                0x8379: 0x30DA,
                0x837A: 0x30DB,
                0x837B: 0x30DC,
                0x837C: 0x30DD,
                0x837D: 0x30DE,
                0x837E: 0x30DF,
                0x8380: 0x30E0,
                0x8381: 0x30E1,
                0x8382: 0x30E2,
                0x8383: 0x30E3,
                0x8384: 0x30E4,
                0x8385: 0x30E5,
                0x8386: 0x30E6,
                0x8387: 0x30E7,
                0x8388: 0x30E8,
                0x8389: 0x30E9,
                0x838A: 0x30EA,
                0x838B: 0x30EB,
                0x838C: 0x30EC,
                0x838D: 0x30ED,
                0x838E: 0x30EE,
                0x838F: 0x30EF,
                0x8390: 0x30F0,
                0x8391: 0x30F1,
                0x8392: 0x30F2,
                0x8393: 0x30F3,
                0x8394: 0x30F4,
                0x8395: 0x30F5,
                0x8396: 0x30F6,
                0x839F: 0x0391,
                0x83A0: 0x0392,
                0x83A1: 0x0393,
                0x83A2: 0x0394,
                0x83A3: 0x0395,
                0x83A4: 0x0396,
                0x83A5: 0x0397,
                0x83A6: 0x0398,
                0x83A7: 0x0399,
                0x83A8: 0x039A,
                0x83A9: 0x039B,
                0x83AA: 0x039C,
                0x83AB: 0x039D,
                0x83AC: 0x039E,
                0x83AD: 0x039F,
                0x83AE: 0x03A0,
                0x83AF: 0x03A1,
                0x83B0: 0x03A3,
                0x83B1: 0x03A4,
                0x83B2: 0x03A5,
                0x83B3: 0x03A6,
                0x83B4: 0x03A7,
                0x83B5: 0x03A8,
                0x83B6: 0x03A9,
                0x83BF: 0x03B1,
                0x83C0: 0x03B2,
                0x83C1: 0x03B3,
                0x83C2: 0x03B4,
                0x83C3: 0x03B5,
                0x83C4: 0x03B6,
                0x83C5: 0x03B7,
                0x83C6: 0x03B8,
                0x83C7: 0x03B9,
                0x83C8: 0x03BA,
                0x83C9: 0x03BB,
                0x83CA: 0x03BC,
                0x83CB: 0x03BD,
                0x83CC: 0x03BE,
                0x83CD: 0x03BF,
                0x83CE: 0x03C0,
                0x83CF: 0x03C1,
                0x83D0: 0x03C3,
                0x83D1: 0x03C4,
                0x83D2: 0x03C5,
                0x83D3: 0x03C6,
                0x83D4: 0x03C7,
                0x83D5: 0x03C8,
                0x83D6: 0x03C9,
                0x8440: 0x0410,
                0x8441: 0x0411,
                0x8442: 0x0412,
                0x8443: 0x0413,
                0x8444: 0x0414,
                0x8445: 0x0415,
                0x8446: 0x0401,
                0x8447: 0x0416,
                0x8448: 0x0417,
                0x8449: 0x0418,
                0x844A: 0x0419,
                0x844B: 0x041A,
                0x844C: 0x041B,
                0x844D: 0x041C,
                0x844E: 0x041D,
                0x844F: 0x041E,
                0x8450: 0x041F,
                0x8451: 0x0420,
                0x8452: 0x0421,
                0x8453: 0x0422,
                0x8454: 0x0423,
                0x8455: 0x0424,
                0x8456: 0x0425,
                0x8457: 0x0426,
                0x8458: 0x0427,
                0x8459: 0x0428,
                0x845A: 0x0429,
                0x845B: 0x042A,
                0x845C: 0x042B,
                0x845D: 0x042C,
                0x845E: 0x042D,
                0x845F: 0x042E,
                0x8460: 0x042F,
                0x8470: 0x0430,
                0x8471: 0x0431,
                0x8472: 0x0432,
                0x8473: 0x0433,
                0x8474: 0x0434,
                0x8475: 0x0435,
                0x8476: 0x0451,
                0x8477: 0x0436,
                0x8478: 0x0437,
                0x8479: 0x0438,
                0x847A: 0x0439,
                0x847B: 0x043A,
                0x847C: 0x043B,
                0x847D: 0x043C,
                0x847E: 0x043D,
                0x8480: 0x043E,
                0x8481: 0x043F,
                0x8482: 0x0440,
                0x8483: 0x0441,
                0x8484: 0x0442,
                0x8485: 0x0443,
                0x8486: 0x0444,
                0x8487: 0x0445,
                0x8488: 0x0446,
                0x8489: 0x0447,
                0x848A: 0x0448,
                0x848B: 0x0449,
                0x848C: 0x044A,
                0x848D: 0x044B,
                0x848E: 0x044C,
                0x848F: 0x044D,
                0x8490: 0x044E,
                0x8491: 0x044F,
                0x849F: 0x2500,
                0x84A0: 0x2502,
                0x84A1: 0x250C,
                0x84A2: 0x2510,
                0x84A3: 0x2518,
                0x84A4: 0x2514,
                0x84A5: 0x251C,
                0x84A6: 0x252C,
                0x84A7: 0x2524,
                0x84A8: 0x2534,
                0x84A9: 0x253C,
                0x84AA: 0x2501,
                0x84AB: 0x2503,
                0x84AC: 0x250F,
                0x84AD: 0x2513,
                0x84AE: 0x251B,
                0x84AF: 0x2517,
                0x84B0: 0x2523,
                0x84B1: 0x2533,
                0x84B2: 0x252B,
                0x84B3: 0x253B,
                0x84B4: 0x254B,
                0x84B5: 0x2520,
                0x84B6: 0x252F,
                0x84B7: 0x2528,
                0x84B8: 0x2537,
                0x84B9: 0x253F,
                0x84BA: 0x251D,
                0x84BB: 0x2530,
                0x84BC: 0x2525,
                0x84BD: 0x2538,
                0x84BE: 0x2542,
                0x889F: 0x4E9C,
                0x88A0: 0x5516,
                0x88A1: 0x5A03,
                0x88A2: 0x963F,
                0x88A3: 0x54C0,
                0x88A4: 0x611B,
                0x88A5: 0x6328,
                0x88A6: 0x59F6,
                0x88A7: 0x9022,
                0x88A8: 0x8475,
                0x88A9: 0x831C,
                0x88AA: 0x7A50,
                0x88AB: 0x60AA,
                0x88AC: 0x63E1,
                0x88AD: 0x6E25,
                0x88AE: 0x65ED,
                0x88AF: 0x8466,
                0x88B0: 0x82A6,
                0x88B1: 0x9BF5,
                0x88B2: 0x6893,
                0x88B3: 0x5727,
                0x88B4: 0x65A1,
                0x88B5: 0x6271,
                0x88B6: 0x5B9B,
                0x88B7: 0x59D0,
                0x88B8: 0x867B,
                0x88B9: 0x98F4,
                0x88BA: 0x7D62,
                0x88BB: 0x7DBE,
                0x88BC: 0x9B8E,
                0x88BD: 0x6216,
                0x88BE: 0x7C9F,
                0x88BF: 0x88B7,
                0x88C0: 0x5B89,
                0x88C1: 0x5EB5,
                0x88C2: 0x6309,
                0x88C3: 0x6697,
                0x88C4: 0x6848,
                0x88C5: 0x95C7,
                0x88C6: 0x978D,
                0x88C7: 0x674F,
                0x88C8: 0x4EE5,
                0x88C9: 0x4F0A,
                0x88CA: 0x4F4D,
                0x88CB: 0x4F9D,
                0x88CC: 0x5049,
                0x88CD: 0x56F2,
                0x88CE: 0x5937,
                0x88CF: 0x59D4,
                0x88D0: 0x5A01,
                0x88D1: 0x5C09,
                0x88D2: 0x60DF,
                0x88D3: 0x610F,
                0x88D4: 0x6170,
                0x88D5: 0x6613,
                0x88D6: 0x6905,
                0x88D7: 0x70BA,
                0x88D8: 0x754F,
                0x88D9: 0x7570,
                0x88DA: 0x79FB,
                0x88DB: 0x7DAD,
                0x88DC: 0x7DEF,
                0x88DD: 0x80C3,
                0x88DE: 0x840E,
                0x88DF: 0x8863,
                0x88E0: 0x8B02,
                0x88E1: 0x9055,
                0x88E2: 0x907A,
                0x88E3: 0x533B,
                0x88E4: 0x4E95,
                0x88E5: 0x4EA5,
                0x88E6: 0x57DF,
                0x88E7: 0x80B2,
                0x88E8: 0x90C1,
                0x88E9: 0x78EF,
                0x88EA: 0x4E00,
                0x88EB: 0x58F1,
                0x88EC: 0x6EA2,
                0x88ED: 0x9038,
                0x88EE: 0x7A32,
                0x88EF: 0x8328,
                0x88F0: 0x828B,
                0x88F1: 0x9C2F,
                0x88F2: 0x5141,
                0x88F3: 0x5370,
                0x88F4: 0x54BD,
                0x88F5: 0x54E1,
                0x88F6: 0x56E0,
                0x88F7: 0x59FB,
                0x88F8: 0x5F15,
                0x88F9: 0x98F2,
                0x88FA: 0x6DEB,
                0x88FB: 0x80E4,
                0x88FC: 0x852D,
                0x8940: 0x9662,
                0x8941: 0x9670,
                0x8942: 0x96A0,
                0x8943: 0x97FB,
                0x8944: 0x540B,
                0x8945: 0x53F3,
                0x8946: 0x5B87,
                0x8947: 0x70CF,
                0x8948: 0x7FBD,
                0x8949: 0x8FC2,
                0x894A: 0x96E8,
                0x894B: 0x536F,
                0x894C: 0x9D5C,
                0x894D: 0x7ABA,
                0x894E: 0x4E11,
                0x894F: 0x7893,
                0x8950: 0x81FC,
                0x8951: 0x6E26,
                0x8952: 0x5618,
                0x8953: 0x5504,
                0x8954: 0x6B1D,
                0x8955: 0x851A,
                0x8956: 0x9C3B,
                0x8957: 0x59E5,
                0x8958: 0x53A9,
                0x8959: 0x6D66,
                0x895A: 0x74DC,
                0x895B: 0x958F,
                0x895C: 0x5642,
                0x895D: 0x4E91,
                0x895E: 0x904B,
                0x895F: 0x96F2,
                0x8960: 0x834F,
                0x8961: 0x990C,
                0x8962: 0x53E1,
                0x8963: 0x55B6,
                0x8964: 0x5B30,
                0x8965: 0x5F71,
                0x8966: 0x6620,
                0x8967: 0x66F3,
                0x8968: 0x6804,
                0x8969: 0x6C38,
                0x896A: 0x6CF3,
                0x896B: 0x6D29,
                0x896C: 0x745B,
                0x896D: 0x76C8,
                0x896E: 0x7A4E,
                0x896F: 0x9834,
                0x8970: 0x82F1,
                0x8971: 0x885B,
                0x8972: 0x8A60,
                0x8973: 0x92ED,
                0x8974: 0x6DB2,
                0x8975: 0x75AB,
                0x8976: 0x76CA,
                0x8977: 0x99C5,
                0x8978: 0x60A6,
                0x8979: 0x8B01,
                0x897A: 0x8D8A,
                0x897B: 0x95B2,
                0x897C: 0x698E,
                0x897D: 0x53AD,
                0x897E: 0x5186,
                0x8980: 0x5712,
                0x8981: 0x5830,
                0x8982: 0x5944,
                0x8983: 0x5BB4,
                0x8984: 0x5EF6,
                0x8985: 0x6028,
                0x8986: 0x63A9,
                0x8987: 0x63F4,
                0x8988: 0x6CBF,
                0x8989: 0x6F14,
                0x898A: 0x708E,
                0x898B: 0x7114,
                0x898C: 0x7159,
                0x898D: 0x71D5,
                0x898E: 0x733F,
                0x898F: 0x7E01,
                0x8990: 0x8276,
                0x8991: 0x82D1,
                0x8992: 0x8597,
                0x8993: 0x9060,
                0x8994: 0x925B,
                0x8995: 0x9D1B,
                0x8996: 0x5869,
                0x8997: 0x65BC,
                0x8998: 0x6C5A,
                0x8999: 0x7525,
                0x899A: 0x51F9,
                0x899B: 0x592E,
                0x899C: 0x5965,
                0x899D: 0x5F80,
                0x899E: 0x5FDC,
                0x899F: 0x62BC,
                0x89A0: 0x65FA,
                0x89A1: 0x6A2A,
                0x89A2: 0x6B27,
                0x89A3: 0x6BB4,
                0x89A4: 0x738B,
                0x89A5: 0x7FC1,
                0x89A6: 0x8956,
                0x89A7: 0x9D2C,
                0x89A8: 0x9D0E,
                0x89A9: 0x9EC4,
                0x89AA: 0x5CA1,
                0x89AB: 0x6C96,
                0x89AC: 0x837B,
                0x89AD: 0x5104,
                0x89AE: 0x5C4B,
                0x89AF: 0x61B6,
                0x89B0: 0x81C6,
                0x89B1: 0x6876,
                0x89B2: 0x7261,
                0x89B3: 0x4E59,
                0x89B4: 0x4FFA,
                0x89B5: 0x5378,
                0x89B6: 0x6069,
                0x89B7: 0x6E29,
                0x89B8: 0x7A4F,
                0x89B9: 0x97F3,
                0x89BA: 0x4E0B,
                0x89BB: 0x5316,
                0x89BC: 0x4EEE,
                0x89BD: 0x4F55,
                0x89BE: 0x4F3D,
                0x89BF: 0x4FA1,
                0x89C0: 0x4F73,
                0x89C1: 0x52A0,
                0x89C2: 0x53EF,
                0x89C3: 0x5609,
                0x89C4: 0x590F,
                0x89C5: 0x5AC1,
                0x89C6: 0x5BB6,
                0x89C7: 0x5BE1,
                0x89C8: 0x79D1,
                0x89C9: 0x6687,
                0x89CA: 0x679C,
                0x89CB: 0x67B6,
                0x89CC: 0x6B4C,
                0x89CD: 0x6CB3,
                0x89CE: 0x706B,
                0x89CF: 0x73C2,
                0x89D0: 0x798D,
                0x89D1: 0x79BE,
                0x89D2: 0x7A3C,
                0x89D3: 0x7B87,
                0x89D4: 0x82B1,
                0x89D5: 0x82DB,
                0x89D6: 0x8304,
                0x89D7: 0x8377,
                0x89D8: 0x83EF,
                0x89D9: 0x83D3,
                0x89DA: 0x8766,
                0x89DB: 0x8AB2,
                0x89DC: 0x5629,
                0x89DD: 0x8CA8,
                0x89DE: 0x8FE6,
                0x89DF: 0x904E,
                0x89E0: 0x971E,
                0x89E1: 0x868A,
                0x89E2: 0x4FC4,
                0x89E3: 0x5CE8,
                0x89E4: 0x6211,
                0x89E5: 0x7259,
                0x89E6: 0x753B,
                0x89E7: 0x81E5,
                0x89E8: 0x82BD,
                0x89E9: 0x86FE,
                0x89EA: 0x8CC0,
                0x89EB: 0x96C5,
                0x89EC: 0x9913,
                0x89ED: 0x99D5,
                0x89EE: 0x4ECB,
                0x89EF: 0x4F1A,
                0x89F0: 0x89E3,
                0x89F1: 0x56DE,
                0x89F2: 0x584A,
                0x89F3: 0x58CA,
                0x89F4: 0x5EFB,
                0x89F5: 0x5FEB,
                0x89F6: 0x602A,
                0x89F7: 0x6094,
                0x89F8: 0x6062,
                0x89F9: 0x61D0,
                0x89FA: 0x6212,
                0x89FB: 0x62D0,
                0x89FC: 0x6539,
                0x8A40: 0x9B41,
                0x8A41: 0x6666,
                0x8A42: 0x68B0,
                0x8A43: 0x6D77,
                0x8A44: 0x7070,
                0x8A45: 0x754C,
                0x8A46: 0x7686,
                0x8A47: 0x7D75,
                0x8A48: 0x82A5,
                0x8A49: 0x87F9,
                0x8A4A: 0x958B,
                0x8A4B: 0x968E,
                0x8A4C: 0x8C9D,
                0x8A4D: 0x51F1,
                0x8A4E: 0x52BE,
                0x8A4F: 0x5916,
                0x8A50: 0x54B3,
                0x8A51: 0x5BB3,
                0x8A52: 0x5D16,
                0x8A53: 0x6168,
                0x8A54: 0x6982,
                0x8A55: 0x6DAF,
                0x8A56: 0x788D,
                0x8A57: 0x84CB,
                0x8A58: 0x8857,
                0x8A59: 0x8A72,
                0x8A5A: 0x93A7,
                0x8A5B: 0x9AB8,
                0x8A5C: 0x6D6C,
                0x8A5D: 0x99A8,
                0x8A5E: 0x86D9,
                0x8A5F: 0x57A3,
                0x8A60: 0x67FF,
                0x8A61: 0x86CE,
                0x8A62: 0x920E,
                0x8A63: 0x5283,
                0x8A64: 0x5687,
                0x8A65: 0x5404,
                0x8A66: 0x5ED3,
                0x8A67: 0x62E1,
                0x8A68: 0x64B9,
                0x8A69: 0x683C,
                0x8A6A: 0x6838,
                0x8A6B: 0x6BBB,
                0x8A6C: 0x7372,
                0x8A6D: 0x78BA,
                0x8A6E: 0x7A6B,
                0x8A6F: 0x899A,
                0x8A70: 0x89D2,
                0x8A71: 0x8D6B,
                0x8A72: 0x8F03,
                0x8A73: 0x90ED,
                0x8A74: 0x95A3,
                0x8A75: 0x9694,
                0x8A76: 0x9769,
                0x8A77: 0x5B66,
                0x8A78: 0x5CB3,
                0x8A79: 0x697D,
                0x8A7A: 0x984D,
                0x8A7B: 0x984E,
                0x8A7C: 0x639B,
                0x8A7D: 0x7B20,
                0x8A7E: 0x6A2B,
                0x8A80: 0x6A7F,
                0x8A81: 0x68B6,
                0x8A82: 0x9C0D,
                0x8A83: 0x6F5F,
                0x8A84: 0x5272,
                0x8A85: 0x559D,
                0x8A86: 0x6070,
                0x8A87: 0x62EC,
                0x8A88: 0x6D3B,
                0x8A89: 0x6E07,
                0x8A8A: 0x6ED1,
                0x8A8B: 0x845B,
                0x8A8C: 0x8910,
                0x8A8D: 0x8F44,
                0x8A8E: 0x4E14,
                0x8A8F: 0x9C39,
                0x8A90: 0x53F6,
                0x8A91: 0x691B,
                0x8A92: 0x6A3A,
                0x8A93: 0x9784,
                0x8A94: 0x682A,
                0x8A95: 0x515C,
                0x8A96: 0x7AC3,
                0x8A97: 0x84B2,
                0x8A98: 0x91DC,
                0x8A99: 0x938C,
                0x8A9A: 0x565B,
                0x8A9B: 0x9D28,
                0x8A9C: 0x6822,
                0x8A9D: 0x8305,
                0x8A9E: 0x8431,
                0x8A9F: 0x7CA5,
                0x8AA0: 0x5208,
                0x8AA1: 0x82C5,
                0x8AA2: 0x74E6,
                0x8AA3: 0x4E7E,
                0x8AA4: 0x4F83,
                0x8AA5: 0x51A0,
                0x8AA6: 0x5BD2,
                0x8AA7: 0x520A,
                0x8AA8: 0x52D8,
                0x8AA9: 0x52E7,
                0x8AAA: 0x5DFB,
                0x8AAB: 0x559A,
                0x8AAC: 0x582A,
                0x8AAD: 0x59E6,
                0x8AAE: 0x5B8C,
                0x8AAF: 0x5B98,
                0x8AB0: 0x5BDB,
                0x8AB1: 0x5E72,
                0x8AB2: 0x5E79,
                0x8AB3: 0x60A3,
                0x8AB4: 0x611F,
                0x8AB5: 0x6163,
                0x8AB6: 0x61BE,
                0x8AB7: 0x63DB,
                0x8AB8: 0x6562,
                0x8AB9: 0x67D1,
                0x8ABA: 0x6853,
                0x8ABB: 0x68FA,
                0x8ABC: 0x6B3E,
                0x8ABD: 0x6B53,
                0x8ABE: 0x6C57,
                0x8ABF: 0x6F22,
                0x8AC0: 0x6F97,
                0x8AC1: 0x6F45,
                0x8AC2: 0x74B0,
                0x8AC3: 0x7518,
                0x8AC4: 0x76E3,
                0x8AC5: 0x770B,
                0x8AC6: 0x7AFF,
                0x8AC7: 0x7BA1,
                0x8AC8: 0x7C21,
                0x8AC9: 0x7DE9,
                0x8ACA: 0x7F36,
                0x8ACB: 0x7FF0,
                0x8ACC: 0x809D,
                0x8ACD: 0x8266,
                0x8ACE: 0x839E,
                0x8ACF: 0x89B3,
                0x8AD0: 0x8ACC,
                0x8AD1: 0x8CAB,
                0x8AD2: 0x9084,
                0x8AD3: 0x9451,
                0x8AD4: 0x9593,
                0x8AD5: 0x9591,
                0x8AD6: 0x95A2,
                0x8AD7: 0x9665,
                0x8AD8: 0x97D3,
                0x8AD9: 0x9928,
                0x8ADA: 0x8218,
                0x8ADB: 0x4E38,
                0x8ADC: 0x542B,
                0x8ADD: 0x5CB8,
                0x8ADE: 0x5DCC,
                0x8ADF: 0x73A9,
                0x8AE0: 0x764C,
                0x8AE1: 0x773C,
                0x8AE2: 0x5CA9,
                0x8AE3: 0x7FEB,
                0x8AE4: 0x8D0B,
                0x8AE5: 0x96C1,
                0x8AE6: 0x9811,
                0x8AE7: 0x9854,
                0x8AE8: 0x9858,
                0x8AE9: 0x4F01,
                0x8AEA: 0x4F0E,
                0x8AEB: 0x5371,
                0x8AEC: 0x559C,
                0x8AED: 0x5668,
                0x8AEE: 0x57FA,
                0x8AEF: 0x5947,
                0x8AF0: 0x5B09,
                0x8AF1: 0x5BC4,
                0x8AF2: 0x5C90,
                0x8AF3: 0x5E0C,
                0x8AF4: 0x5E7E,
                0x8AF5: 0x5FCC,
                0x8AF6: 0x63EE,
                0x8AF7: 0x673A,
                0x8AF8: 0x65D7,
                0x8AF9: 0x65E2,
                0x8AFA: 0x671F,
                0x8AFB: 0x68CB,
                0x8AFC: 0x68C4,
                0x8B40: 0x6A5F,
                0x8B41: 0x5E30,
                0x8B42: 0x6BC5,
                0x8B43: 0x6C17,
                0x8B44: 0x6C7D,
                0x8B45: 0x757F,
                0x8B46: 0x7948,
                0x8B47: 0x5B63,
                0x8B48: 0x7A00,
                0x8B49: 0x7D00,
                0x8B4A: 0x5FBD,
                0x8B4B: 0x898F,
                0x8B4C: 0x8A18,
                0x8B4D: 0x8CB4,
                0x8B4E: 0x8D77,
                0x8B4F: 0x8ECC,
                0x8B50: 0x8F1D,
                0x8B51: 0x98E2,
                0x8B52: 0x9A0E,
                0x8B53: 0x9B3C,
                0x8B54: 0x4E80,
                0x8B55: 0x507D,
                0x8B56: 0x5100,
                0x8B57: 0x5993,
                0x8B58: 0x5B9C,
                0x8B59: 0x622F,
                0x8B5A: 0x6280,
                0x8B5B: 0x64EC,
                0x8B5C: 0x6B3A,
                0x8B5D: 0x72A0,
                0x8B5E: 0x7591,
                0x8B5F: 0x7947,
                0x8B60: 0x7FA9,
                0x8B61: 0x87FB,
                0x8B62: 0x8ABC,
                0x8B63: 0x8B70,
                0x8B64: 0x63AC,
                0x8B65: 0x83CA,
                0x8B66: 0x97A0,
                0x8B67: 0x5409,
                0x8B68: 0x5403,
                0x8B69: 0x55AB,
                0x8B6A: 0x6854,
                0x8B6B: 0x6A58,
                0x8B6C: 0x8A70,
                0x8B6D: 0x7827,
                0x8B6E: 0x6775,
                0x8B6F: 0x9ECD,
                0x8B70: 0x5374,
                0x8B71: 0x5BA2,
                0x8B72: 0x811A,
                0x8B73: 0x8650,
                0x8B74: 0x9006,
                0x8B75: 0x4E18,
                0x8B76: 0x4E45,
                0x8B77: 0x4EC7,
                0x8B78: 0x4F11,
                0x8B79: 0x53CA,
                0x8B7A: 0x5438,
                0x8B7B: 0x5BAE,
                0x8B7C: 0x5F13,
                0x8B7D: 0x6025,
                0x8B7E: 0x6551,
                0x8B80: 0x673D,
                0x8B81: 0x6C42,
                0x8B82: 0x6C72,
                0x8B83: 0x6CE3,
                0x8B84: 0x7078,
                0x8B85: 0x7403,
                0x8B86: 0x7A76,
                0x8B87: 0x7AAE,
                0x8B88: 0x7B08,
                0x8B89: 0x7D1A,
                0x8B8A: 0x7CFE,
                0x8B8B: 0x7D66,
                0x8B8C: 0x65E7,
                0x8B8D: 0x725B,
                0x8B8E: 0x53BB,
                0x8B8F: 0x5C45,
                0x8B90: 0x5DE8,
                0x8B91: 0x62D2,
                0x8B92: 0x62E0,
                0x8B93: 0x6319,
                0x8B94: 0x6E20,
                0x8B95: 0x865A,
                0x8B96: 0x8A31,
                0x8B97: 0x8DDD,
                0x8B98: 0x92F8,
                0x8B99: 0x6F01,
                0x8B9A: 0x79A6,
                0x8B9B: 0x9B5A,
                0x8B9C: 0x4EA8,
                0x8B9D: 0x4EAB,
                0x8B9E: 0x4EAC,
                0x8B9F: 0x4F9B,
                0x8BA0: 0x4FA0,
                0x8BA1: 0x50D1,
                0x8BA2: 0x5147,
                0x8BA3: 0x7AF6,
                0x8BA4: 0x5171,
                0x8BA5: 0x51F6,
                0x8BA6: 0x5354,
                0x8BA7: 0x5321,
                0x8BA8: 0x537F,
                0x8BA9: 0x53EB,
                0x8BAA: 0x55AC,
                0x8BAB: 0x5883,
                0x8BAC: 0x5CE1,
                0x8BAD: 0x5F37,
                0x8BAE: 0x5F4A,
                0x8BAF: 0x602F,
                0x8BB0: 0x6050,
                0x8BB1: 0x606D,
                0x8BB2: 0x631F,
                0x8BB3: 0x6559,
                0x8BB4: 0x6A4B,
                0x8BB5: 0x6CC1,
                0x8BB6: 0x72C2,
                0x8BB7: 0x72ED,
                0x8BB8: 0x77EF,
                0x8BB9: 0x80F8,
                0x8BBA: 0x8105,
                0x8BBB: 0x8208,
                0x8BBC: 0x854E,
                0x8BBD: 0x90F7,
                0x8BBE: 0x93E1,
                0x8BBF: 0x97FF,
                0x8BC0: 0x9957,
                0x8BC1: 0x9A5A,
                0x8BC2: 0x4EF0,
                0x8BC3: 0x51DD,
                0x8BC4: 0x5C2D,
                0x8BC5: 0x6681,
                0x8BC6: 0x696D,
                0x8BC7: 0x5C40,
                0x8BC8: 0x66F2,
                0x8BC9: 0x6975,
                0x8BCA: 0x7389,
                0x8BCB: 0x6850,
                0x8BCC: 0x7C81,
                0x8BCD: 0x50C5,
                0x8BCE: 0x52E4,
                0x8BCF: 0x5747,
                0x8BD0: 0x5DFE,
                0x8BD1: 0x9326,
                0x8BD2: 0x65A4,
                0x8BD3: 0x6B23,
                0x8BD4: 0x6B3D,
                0x8BD5: 0x7434,
                0x8BD6: 0x7981,
                0x8BD7: 0x79BD,
                0x8BD8: 0x7B4B,
                0x8BD9: 0x7DCA,
                0x8BDA: 0x82B9,
                0x8BDB: 0x83CC,
                0x8BDC: 0x887F,
                0x8BDD: 0x895F,
                0x8BDE: 0x8B39,
                0x8BDF: 0x8FD1,
                0x8BE0: 0x91D1,
                0x8BE1: 0x541F,
                0x8BE2: 0x9280,
                0x8BE3: 0x4E5D,
                0x8BE4: 0x5036,
                0x8BE5: 0x53E5,
                0x8BE6: 0x533A,
                0x8BE7: 0x72D7,
                0x8BE8: 0x7396,
                0x8BE9: 0x77E9,
                0x8BEA: 0x82E6,
                0x8BEB: 0x8EAF,
                0x8BEC: 0x99C6,
                0x8BED: 0x99C8,
                0x8BEE: 0x99D2,
                0x8BEF: 0x5177,
                0x8BF0: 0x611A,
                0x8BF1: 0x865E,
                0x8BF2: 0x55B0,
                0x8BF3: 0x7A7A,
                0x8BF4: 0x5076,
                0x8BF5: 0x5BD3,
                0x8BF6: 0x9047,
                0x8BF7: 0x9685,
                0x8BF8: 0x4E32,
                0x8BF9: 0x6ADB,
                0x8BFA: 0x91E7,
                0x8BFB: 0x5C51,
                0x8BFC: 0x5C48,
                0x8C40: 0x6398,
                0x8C41: 0x7A9F,
                0x8C42: 0x6C93,
                0x8C43: 0x9774,
                0x8C44: 0x8F61,
                0x8C45: 0x7AAA,
                0x8C46: 0x718A,
                0x8C47: 0x9688,
                0x8C48: 0x7C82,
                0x8C49: 0x6817,
                0x8C4A: 0x7E70,
                0x8C4B: 0x6851,
                0x8C4C: 0x936C,
                0x8C4D: 0x52F2,
                0x8C4E: 0x541B,
                0x8C4F: 0x85AB,
                0x8C50: 0x8A13,
                0x8C51: 0x7FA4,
                0x8C52: 0x8ECD,
                0x8C53: 0x90E1,
                0x8C54: 0x5366,
                0x8C55: 0x8888,
                0x8C56: 0x7941,
                0x8C57: 0x4FC2,
                0x8C58: 0x50BE,
                0x8C59: 0x5211,
                0x8C5A: 0x5144,
                0x8C5B: 0x5553,
                0x8C5C: 0x572D,
                0x8C5D: 0x73EA,
                0x8C5E: 0x578B,
                0x8C5F: 0x5951,
                0x8C60: 0x5F62,
                0x8C61: 0x5F84,
                0x8C62: 0x6075,
                0x8C63: 0x6176,
                0x8C64: 0x6167,
                0x8C65: 0x61A9,
                0x8C66: 0x63B2,
                0x8C67: 0x643A,
                0x8C68: 0x656C,
                0x8C69: 0x666F,
                0x8C6A: 0x6842,
                0x8C6B: 0x6E13,
                0x8C6C: 0x7566,
                0x8C6D: 0x7A3D,
                0x8C6E: 0x7CFB,
                0x8C6F: 0x7D4C,
                0x8C70: 0x7D99,
                0x8C71: 0x7E4B,
                0x8C72: 0x7F6B,
                0x8C73: 0x830E,
                0x8C74: 0x834A,
                0x8C75: 0x86CD,
                0x8C76: 0x8A08,
                0x8C77: 0x8A63,
                0x8C78: 0x8B66,
                0x8C79: 0x8EFD,
                0x8C7A: 0x981A,
                0x8C7B: 0x9D8F,
                0x8C7C: 0x82B8,
                0x8C7D: 0x8FCE,
                0x8C7E: 0x9BE8,
                0x8C80: 0x5287,
                0x8C81: 0x621F,
                0x8C82: 0x6483,
                0x8C83: 0x6FC0,
                0x8C84: 0x9699,
                0x8C85: 0x6841,
                0x8C86: 0x5091,
                0x8C87: 0x6B20,
                0x8C88: 0x6C7A,
                0x8C89: 0x6F54,
                0x8C8A: 0x7A74,
                0x8C8B: 0x7D50,
                0x8C8C: 0x8840,
                0x8C8D: 0x8A23,
                0x8C8E: 0x6708,
                0x8C8F: 0x4EF6,
                0x8C90: 0x5039,
                0x8C91: 0x5026,
                0x8C92: 0x5065,
                0x8C93: 0x517C,
                0x8C94: 0x5238,
                0x8C95: 0x5263,
                0x8C96: 0x55A7,
                0x8C97: 0x570F,
                0x8C98: 0x5805,
                0x8C99: 0x5ACC,
                0x8C9A: 0x5EFA,
                0x8C9B: 0x61B2,
                0x8C9C: 0x61F8,
                0x8C9D: 0x62F3,
                0x8C9E: 0x6372,
                0x8C9F: 0x691C,
                0x8CA0: 0x6A29,
                0x8CA1: 0x727D,
                0x8CA2: 0x72AC,
                0x8CA3: 0x732E,
                0x8CA4: 0x7814,
                0x8CA5: 0x786F,
                0x8CA6: 0x7D79,
                0x8CA7: 0x770C,
                0x8CA8: 0x80A9,
                0x8CA9: 0x898B,
                0x8CAA: 0x8B19,
                0x8CAB: 0x8CE2,
                0x8CAC: 0x8ED2,
                0x8CAD: 0x9063,
                0x8CAE: 0x9375,
                0x8CAF: 0x967A,
                0x8CB0: 0x9855,
                0x8CB1: 0x9A13,
                0x8CB2: 0x9E78,
                0x8CB3: 0x5143,
                0x8CB4: 0x539F,
                0x8CB5: 0x53B3,
                0x8CB6: 0x5E7B,
                0x8CB7: 0x5F26,
                0x8CB8: 0x6E1B,
                0x8CB9: 0x6E90,
                0x8CBA: 0x7384,
                0x8CBB: 0x73FE,
                0x8CBC: 0x7D43,
                0x8CBD: 0x8237,
                0x8CBE: 0x8A00,
                0x8CBF: 0x8AFA,
                0x8CC0: 0x9650,
                0x8CC1: 0x4E4E,
                0x8CC2: 0x500B,
                0x8CC3: 0x53E4,
                0x8CC4: 0x547C,
                0x8CC5: 0x56FA,
                0x8CC6: 0x59D1,
                0x8CC7: 0x5B64,
                0x8CC8: 0x5DF1,
                0x8CC9: 0x5EAB,
                0x8CCA: 0x5F27,
                0x8CCB: 0x6238,
                0x8CCC: 0x6545,
                0x8CCD: 0x67AF,
                0x8CCE: 0x6E56,
                0x8CCF: 0x72D0,
                0x8CD0: 0x7CCA,
                0x8CD1: 0x88B4,
                0x8CD2: 0x80A1,
                0x8CD3: 0x80E1,
                0x8CD4: 0x83F0,
                0x8CD5: 0x864E,
                0x8CD6: 0x8A87,
                0x8CD7: 0x8DE8,
                0x8CD8: 0x9237,
                0x8CD9: 0x96C7,
                0x8CDA: 0x9867,
                0x8CDB: 0x9F13,
                0x8CDC: 0x4E94,
                0x8CDD: 0x4E92,
                0x8CDE: 0x4F0D,
                0x8CDF: 0x5348,
                0x8CE0: 0x5449,
                0x8CE1: 0x543E,
                0x8CE2: 0x5A2F,
                0x8CE3: 0x5F8C,
                0x8CE4: 0x5FA1,
                0x8CE5: 0x609F,
                0x8CE6: 0x68A7,
                0x8CE7: 0x6A8E,
                0x8CE8: 0x745A,
                0x8CE9: 0x7881,
                0x8CEA: 0x8A9E,
                0x8CEB: 0x8AA4,
                0x8CEC: 0x8B77,
                0x8CED: 0x9190,
                0x8CEE: 0x4E5E,
                0x8CEF: 0x9BC9,
                0x8CF0: 0x4EA4,
                0x8CF1: 0x4F7C,
                0x8CF2: 0x4FAF,
                0x8CF3: 0x5019,
                0x8CF4: 0x5016,
                0x8CF5: 0x5149,
                0x8CF6: 0x516C,
                0x8CF7: 0x529F,
                0x8CF8: 0x52B9,
                0x8CF9: 0x52FE,
                0x8CFA: 0x539A,
                0x8CFB: 0x53E3,
                0x8CFC: 0x5411,
                0x8D40: 0x540E,
                0x8D41: 0x5589,
                0x8D42: 0x5751,
                0x8D43: 0x57A2,
                0x8D44: 0x597D,
                0x8D45: 0x5B54,
                0x8D46: 0x5B5D,
                0x8D47: 0x5B8F,
                0x8D48: 0x5DE5,
                0x8D49: 0x5DE7,
                0x8D4A: 0x5DF7,
                0x8D4B: 0x5E78,
                0x8D4C: 0x5E83,
                0x8D4D: 0x5E9A,
                0x8D4E: 0x5EB7,
                0x8D4F: 0x5F18,
                0x8D50: 0x6052,
                0x8D51: 0x614C,
                0x8D52: 0x6297,
                0x8D53: 0x62D8,
                0x8D54: 0x63A7,
                0x8D55: 0x653B,
                0x8D56: 0x6602,
                0x8D57: 0x6643,
                0x8D58: 0x66F4,
                0x8D59: 0x676D,
                0x8D5A: 0x6821,
                0x8D5B: 0x6897,
                0x8D5C: 0x69CB,
                0x8D5D: 0x6C5F,
                0x8D5E: 0x6D2A,
                0x8D5F: 0x6D69,
                0x8D60: 0x6E2F,
                0x8D61: 0x6E9D,
                0x8D62: 0x7532,
                0x8D63: 0x7687,
                0x8D64: 0x786C,
                0x8D65: 0x7A3F,
                0x8D66: 0x7CE0,
                0x8D67: 0x7D05,
                0x8D68: 0x7D18,
                0x8D69: 0x7D5E,
                0x8D6A: 0x7DB1,
                0x8D6B: 0x8015,
                0x8D6C: 0x8003,
                0x8D6D: 0x80AF,
                0x8D6E: 0x80B1,
                0x8D6F: 0x8154,
                0x8D70: 0x818F,
                0x8D71: 0x822A,
                0x8D72: 0x8352,
                0x8D73: 0x884C,
                0x8D74: 0x8861,
                0x8D75: 0x8B1B,
                0x8D76: 0x8CA2,
                0x8D77: 0x8CFC,
                0x8D78: 0x90CA,
                0x8D79: 0x9175,
                0x8D7A: 0x9271,
                0x8D7B: 0x783F,
                0x8D7C: 0x92FC,
                0x8D7D: 0x95A4,
                0x8D7E: 0x964D,
                0x8D80: 0x9805,
                0x8D81: 0x9999,
                0x8D82: 0x9AD8,
                0x8D83: 0x9D3B,
                0x8D84: 0x525B,
                0x8D85: 0x52AB,
                0x8D86: 0x53F7,
                0x8D87: 0x5408,
                0x8D88: 0x58D5,
                0x8D89: 0x62F7,
                0x8D8A: 0x6FE0,
                0x8D8B: 0x8C6A,
                0x8D8C: 0x8F5F,
                0x8D8D: 0x9EB9,
                0x8D8E: 0x514B,
                0x8D8F: 0x523B,
                0x8D90: 0x544A,
                0x8D91: 0x56FD,
                0x8D92: 0x7A40,
                0x8D93: 0x9177,
                0x8D94: 0x9D60,
                0x8D95: 0x9ED2,
                0x8D96: 0x7344,
                0x8D97: 0x6F09,
                0x8D98: 0x8170,
                0x8D99: 0x7511,
                0x8D9A: 0x5FFD,
                0x8D9B: 0x60DA,
                0x8D9C: 0x9AA8,
                0x8D9D: 0x72DB,
                0x8D9E: 0x8FBC,
                0x8D9F: 0x6B64,
                0x8DA0: 0x9803,
                0x8DA1: 0x4ECA,
                0x8DA2: 0x56F0,
                0x8DA3: 0x5764,
                0x8DA4: 0x58BE,
                0x8DA5: 0x5A5A,
                0x8DA6: 0x6068,
                0x8DA7: 0x61C7,
                0x8DA8: 0x660F,
                0x8DA9: 0x6606,
                0x8DAA: 0x6839,
                0x8DAB: 0x68B1,
                0x8DAC: 0x6DF7,
                0x8DAD: 0x75D5,
                0x8DAE: 0x7D3A,
                0x8DAF: 0x826E,
                0x8DB0: 0x9B42,
                0x8DB1: 0x4E9B,
                0x8DB2: 0x4F50,
                0x8DB3: 0x53C9,
                0x8DB4: 0x5506,
                0x8DB5: 0x5D6F,
                0x8DB6: 0x5DE6,
                0x8DB7: 0x5DEE,
                0x8DB8: 0x67FB,
                0x8DB9: 0x6C99,
                0x8DBA: 0x7473,
                0x8DBB: 0x7802,
                0x8DBC: 0x8A50,
                0x8DBD: 0x9396,
                0x8DBE: 0x88DF,
                0x8DBF: 0x5750,
                0x8DC0: 0x5EA7,
                0x8DC1: 0x632B,
                0x8DC2: 0x50B5,
                0x8DC3: 0x50AC,
                0x8DC4: 0x518D,
                0x8DC5: 0x6700,
                0x8DC6: 0x54C9,
                0x8DC7: 0x585E,
                0x8DC8: 0x59BB,
                0x8DC9: 0x5BB0,
                0x8DCA: 0x5F69,
                0x8DCB: 0x624D,
                0x8DCC: 0x63A1,
                0x8DCD: 0x683D,
                0x8DCE: 0x6B73,
                0x8DCF: 0x6E08,
                0x8DD0: 0x707D,
                0x8DD1: 0x91C7,
                0x8DD2: 0x7280,
                0x8DD3: 0x7815,
                0x8DD4: 0x7826,
                0x8DD5: 0x796D,
                0x8DD6: 0x658E,
                0x8DD7: 0x7D30,
                0x8DD8: 0x83DC,
                0x8DD9: 0x88C1,
                0x8DDA: 0x8F09,
                0x8DDB: 0x969B,
                0x8DDC: 0x5264,
                0x8DDD: 0x5728,
                0x8DDE: 0x6750,
                0x8DDF: 0x7F6A,
                0x8DE0: 0x8CA1,
                0x8DE1: 0x51B4,
                0x8DE2: 0x5742,
                0x8DE3: 0x962A,
                0x8DE4: 0x583A,
                0x8DE5: 0x698A,
                0x8DE6: 0x80B4,
                0x8DE7: 0x54B2,
                0x8DE8: 0x5D0E,
                0x8DE9: 0x57FC,
                0x8DEA: 0x7895,
                0x8DEB: 0x9DFA,
                0x8DEC: 0x4F5C,
                0x8DED: 0x524A,
                0x8DEE: 0x548B,
                0x8DEF: 0x643E,
                0x8DF0: 0x6628,
                0x8DF1: 0x6714,
                0x8DF2: 0x67F5,
                0x8DF3: 0x7A84,
                0x8DF4: 0x7B56,
                0x8DF5: 0x7D22,
                0x8DF6: 0x932F,
                0x8DF7: 0x685C,
                0x8DF8: 0x9BAD,
                0x8DF9: 0x7B39,
                0x8DFA: 0x5319,
                0x8DFB: 0x518A,
                0x8DFC: 0x5237,
                0x8E40: 0x5BDF,
                0x8E41: 0x62F6,
                0x8E42: 0x64AE,
                0x8E43: 0x64E6,
                0x8E44: 0x672D,
                0x8E45: 0x6BBA,
                0x8E46: 0x85A9,
                0x8E47: 0x96D1,
                0x8E48: 0x7690,
                0x8E49: 0x9BD6,
                0x8E4A: 0x634C,
                0x8E4B: 0x9306,
                0x8E4C: 0x9BAB,
                0x8E4D: 0x76BF,
                0x8E4E: 0x6652,
                0x8E4F: 0x4E09,
                0x8E50: 0x5098,
                0x8E51: 0x53C2,
                0x8E52: 0x5C71,
                0x8E53: 0x60E8,
                0x8E54: 0x6492,
                0x8E55: 0x6563,
                0x8E56: 0x685F,
                0x8E57: 0x71E6,
                0x8E58: 0x73CA,
                0x8E59: 0x7523,
                0x8E5A: 0x7B97,
                0x8E5B: 0x7E82,
                0x8E5C: 0x8695,
                0x8E5D: 0x8B83,
                0x8E5E: 0x8CDB,
                0x8E5F: 0x9178,
                0x8E60: 0x9910,
                0x8E61: 0x65AC,
                0x8E62: 0x66AB,
                0x8E63: 0x6B8B,
                0x8E64: 0x4ED5,
                0x8E65: 0x4ED4,
                0x8E66: 0x4F3A,
                0x8E67: 0x4F7F,
                0x8E68: 0x523A,
                0x8E69: 0x53F8,
                0x8E6A: 0x53F2,
                0x8E6B: 0x55E3,
                0x8E6C: 0x56DB,
                0x8E6D: 0x58EB,
                0x8E6E: 0x59CB,
                0x8E6F: 0x59C9,
                0x8E70: 0x59FF,
                0x8E71: 0x5B50,
                0x8E72: 0x5C4D,
                0x8E73: 0x5E02,
                0x8E74: 0x5E2B,
                0x8E75: 0x5FD7,
                0x8E76: 0x601D,
                0x8E77: 0x6307,
                0x8E78: 0x652F,
                0x8E79: 0x5B5C,
                0x8E7A: 0x65AF,
                0x8E7B: 0x65BD,
                0x8E7C: 0x65E8,
                0x8E7D: 0x679D,
                0x8E7E: 0x6B62,
                0x8E80: 0x6B7B,
                0x8E81: 0x6C0F,
                0x8E82: 0x7345,
                0x8E83: 0x7949,
                0x8E84: 0x79C1,
                0x8E85: 0x7CF8,
                0x8E86: 0x7D19,
                0x8E87: 0x7D2B,
                0x8E88: 0x80A2,
                0x8E89: 0x8102,
                0x8E8A: 0x81F3,
                0x8E8B: 0x8996,
                0x8E8C: 0x8A5E,
                0x8E8D: 0x8A69,
                0x8E8E: 0x8A66,
                0x8E8F: 0x8A8C,
                0x8E90: 0x8AEE,
                0x8E91: 0x8CC7,
                0x8E92: 0x8CDC,
                0x8E93: 0x96CC,
                0x8E94: 0x98FC,
                0x8E95: 0x6B6F,
                0x8E96: 0x4E8B,
                0x8E97: 0x4F3C,
                0x8E98: 0x4F8D,
                0x8E99: 0x5150,
                0x8E9A: 0x5B57,
                0x8E9B: 0x5BFA,
                0x8E9C: 0x6148,
                0x8E9D: 0x6301,
                0x8E9E: 0x6642,
                0x8E9F: 0x6B21,
                0x8EA0: 0x6ECB,
                0x8EA1: 0x6CBB,
                0x8EA2: 0x723E,
                0x8EA3: 0x74BD,
                0x8EA4: 0x75D4,
                0x8EA5: 0x78C1,
                0x8EA6: 0x793A,
                0x8EA7: 0x800C,
                0x8EA8: 0x8033,
                0x8EA9: 0x81EA,
                0x8EAA: 0x8494,
                0x8EAB: 0x8F9E,
                0x8EAC: 0x6C50,
                0x8EAD: 0x9E7F,
                0x8EAE: 0x5F0F,
                0x8EAF: 0x8B58,
                0x8EB0: 0x9D2B,
                0x8EB1: 0x7AFA,
                0x8EB2: 0x8EF8,
                0x8EB3: 0x5B8D,
                0x8EB4: 0x96EB,
                0x8EB5: 0x4E03,
                0x8EB6: 0x53F1,
                0x8EB7: 0x57F7,
                0x8EB8: 0x5931,
                0x8EB9: 0x5AC9,
                0x8EBA: 0x5BA4,
                0x8EBB: 0x6089,
                0x8EBC: 0x6E7F,
                0x8EBD: 0x6F06,
                0x8EBE: 0x75BE,
                0x8EBF: 0x8CEA,
                0x8EC0: 0x5B9F,
                0x8EC1: 0x8500,
                0x8EC2: 0x7BE0,
                0x8EC3: 0x5072,
                0x8EC4: 0x67F4,
                0x8EC5: 0x829D,
                0x8EC6: 0x5C61,
                0x8EC7: 0x854A,
                0x8EC8: 0x7E1E,
                0x8EC9: 0x820E,
                0x8ECA: 0x5199,
                0x8ECB: 0x5C04,
                0x8ECC: 0x6368,
                0x8ECD: 0x8D66,
                0x8ECE: 0x659C,
                0x8ECF: 0x716E,
                0x8ED0: 0x793E,
                0x8ED1: 0x7D17,
                0x8ED2: 0x8005,
                0x8ED3: 0x8B1D,
                0x8ED4: 0x8ECA,
                0x8ED5: 0x906E,
                0x8ED6: 0x86C7,
                0x8ED7: 0x90AA,
                0x8ED8: 0x501F,
                0x8ED9: 0x52FA,
                0x8EDA: 0x5C3A,
                0x8EDB: 0x6753,
                0x8EDC: 0x707C,
                0x8EDD: 0x7235,
                0x8EDE: 0x914C,
                0x8EDF: 0x91C8,
                0x8EE0: 0x932B,
                0x8EE1: 0x82E5,
                0x8EE2: 0x5BC2,
                0x8EE3: 0x5F31,
                0x8EE4: 0x60F9,
                0x8EE5: 0x4E3B,
                0x8EE6: 0x53D6,
                0x8EE7: 0x5B88,
                0x8EE8: 0x624B,
                0x8EE9: 0x6731,
                0x8EEA: 0x6B8A,
                0x8EEB: 0x72E9,
                0x8EEC: 0x73E0,
                0x8EED: 0x7A2E,
                0x8EEE: 0x816B,
                0x8EEF: 0x8DA3,
                0x8EF0: 0x9152,
                0x8EF1: 0x9996,
                0x8EF2: 0x5112,
                0x8EF3: 0x53D7,
                0x8EF4: 0x546A,
                0x8EF5: 0x5BFF,
                0x8EF6: 0x6388,
                0x8EF7: 0x6A39,
                0x8EF8: 0x7DAC,
                0x8EF9: 0x9700,
                0x8EFA: 0x56DA,
                0x8EFB: 0x53CE,
                0x8EFC: 0x5468,
                0x8F40: 0x5B97,
                0x8F41: 0x5C31,
                0x8F42: 0x5DDE,
                0x8F43: 0x4FEE,
                0x8F44: 0x6101,
                0x8F45: 0x62FE,
                0x8F46: 0x6D32,
                0x8F47: 0x79C0,
                0x8F48: 0x79CB,
                0x8F49: 0x7D42,
                0x8F4A: 0x7E4D,
                0x8F4B: 0x7FD2,
                0x8F4C: 0x81ED,
                0x8F4D: 0x821F,
                0x8F4E: 0x8490,
                0x8F4F: 0x8846,
                0x8F50: 0x8972,
                0x8F51: 0x8B90,
                0x8F52: 0x8E74,
                0x8F53: 0x8F2F,
                0x8F54: 0x9031,
                0x8F55: 0x914B,
                0x8F56: 0x916C,
                0x8F57: 0x96C6,
                0x8F58: 0x919C,
                0x8F59: 0x4EC0,
                0x8F5A: 0x4F4F,
                0x8F5B: 0x5145,
                0x8F5C: 0x5341,
                0x8F5D: 0x5F93,
                0x8F5E: 0x620E,
                0x8F5F: 0x67D4,
                0x8F60: 0x6C41,
                0x8F61: 0x6E0B,
                0x8F62: 0x7363,
                0x8F63: 0x7E26,
                0x8F64: 0x91CD,
                0x8F65: 0x9283,
                0x8F66: 0x53D4,
                0x8F67: 0x5919,
                0x8F68: 0x5BBF,
                0x8F69: 0x6DD1,
                0x8F6A: 0x795D,
                0x8F6B: 0x7E2E,
                0x8F6C: 0x7C9B,
                0x8F6D: 0x587E,
                0x8F6E: 0x719F,
                0x8F6F: 0x51FA,
                0x8F70: 0x8853,
                0x8F71: 0x8FF0,
                0x8F72: 0x4FCA,
                0x8F73: 0x5CFB,
                0x8F74: 0x6625,
                0x8F75: 0x77AC,
                0x8F76: 0x7AE3,
                0x8F77: 0x821C,
                0x8F78: 0x99FF,
                0x8F79: 0x51C6,
                0x8F7A: 0x5FAA,
                0x8F7B: 0x65EC,
                0x8F7C: 0x696F,
                0x8F7D: 0x6B89,
                0x8F7E: 0x6DF3,
                0x8F80: 0x6E96,
                0x8F81: 0x6F64,
                0x8F82: 0x76FE,
                0x8F83: 0x7D14,
                0x8F84: 0x5DE1,
                0x8F85: 0x9075,
                0x8F86: 0x9187,
                0x8F87: 0x9806,
                0x8F88: 0x51E6,
                0x8F89: 0x521D,
                0x8F8A: 0x6240,
                0x8F8B: 0x6691,
                0x8F8C: 0x66D9,
                0x8F8D: 0x6E1A,
                0x8F8E: 0x5EB6,
                0x8F8F: 0x7DD2,
                0x8F90: 0x7F72,
                0x8F91: 0x66F8,
                0x8F92: 0x85AF,
                0x8F93: 0x85F7,
                0x8F94: 0x8AF8,
                0x8F95: 0x52A9,
                0x8F96: 0x53D9,
                0x8F97: 0x5973,
                0x8F98: 0x5E8F,
                0x8F99: 0x5F90,
                0x8F9A: 0x6055,
                0x8F9B: 0x92E4,
                0x8F9C: 0x9664,
                0x8F9D: 0x50B7,
                0x8F9E: 0x511F,
                0x8F9F: 0x52DD,
                0x8FA0: 0x5320,
                0x8FA1: 0x5347,
                0x8FA2: 0x53EC,
                0x8FA3: 0x54E8,
                0x8FA4: 0x5546,
                0x8FA5: 0x5531,
                0x8FA6: 0x5617,
                0x8FA7: 0x5968,
                0x8FA8: 0x59BE,
                0x8FA9: 0x5A3C,
                0x8FAA: 0x5BB5,
                0x8FAB: 0x5C06,
                0x8FAC: 0x5C0F,
                0x8FAD: 0x5C11,
                0x8FAE: 0x5C1A,
                0x8FAF: 0x5E84,
                0x8FB0: 0x5E8A,
                0x8FB1: 0x5EE0,
                0x8FB2: 0x5F70,
                0x8FB3: 0x627F,
                0x8FB4: 0x6284,
                0x8FB5: 0x62DB,
                0x8FB6: 0x638C,
                0x8FB7: 0x6377,
                0x8FB8: 0x6607,
                0x8FB9: 0x660C,
                0x8FBA: 0x662D,
                0x8FBB: 0x6676,
                0x8FBC: 0x677E,
                0x8FBD: 0x68A2,
                0x8FBE: 0x6A1F,
                0x8FBF: 0x6A35,
                0x8FC0: 0x6CBC,
                0x8FC1: 0x6D88,
                0x8FC2: 0x6E09,
                0x8FC3: 0x6E58,
                0x8FC4: 0x713C,
                0x8FC5: 0x7126,
                0x8FC6: 0x7167,
                0x8FC7: 0x75C7,
                0x8FC8: 0x7701,
                0x8FC9: 0x785D,
                0x8FCA: 0x7901,
                0x8FCB: 0x7965,
                0x8FCC: 0x79F0,
                0x8FCD: 0x7AE0,
                0x8FCE: 0x7B11,
                0x8FCF: 0x7CA7,
                0x8FD0: 0x7D39,
                0x8FD1: 0x8096,
                0x8FD2: 0x83D6,
                0x8FD3: 0x848B,
                0x8FD4: 0x8549,
                0x8FD5: 0x885D,
                0x8FD6: 0x88F3,
                0x8FD7: 0x8A1F,
                0x8FD8: 0x8A3C,
                0x8FD9: 0x8A54,
                0x8FDA: 0x8A73,
                0x8FDB: 0x8C61,
                0x8FDC: 0x8CDE,
                0x8FDD: 0x91A4,
                0x8FDE: 0x9266,
                0x8FDF: 0x937E,
                0x8FE0: 0x9418,
                0x8FE1: 0x969C,
                0x8FE2: 0x9798,
                0x8FE3: 0x4E0A,
                0x8FE4: 0x4E08,
                0x8FE5: 0x4E1E,
                0x8FE6: 0x4E57,
                0x8FE7: 0x5197,
                0x8FE8: 0x5270,
                0x8FE9: 0x57CE,
                0x8FEA: 0x5834,
                0x8FEB: 0x58CC,
                0x8FEC: 0x5B22,
                0x8FED: 0x5E38,
                0x8FEE: 0x60C5,
                0x8FEF: 0x64FE,
                0x8FF0: 0x6761,
                0x8FF1: 0x6756,
                0x8FF2: 0x6D44,
                0x8FF3: 0x72B6,
                0x8FF4: 0x7573,
                0x8FF5: 0x7A63,
                0x8FF6: 0x84B8,
                0x8FF7: 0x8B72,
                0x8FF8: 0x91B8,
                0x8FF9: 0x9320,
                0x8FFA: 0x5631,
                0x8FFB: 0x57F4,
                0x8FFC: 0x98FE,
                0x9040: 0x62ED,
                0x9041: 0x690D,
                0x9042: 0x6B96,
                0x9043: 0x71ED,
                0x9044: 0x7E54,
                0x9045: 0x8077,
                0x9046: 0x8272,
                0x9047: 0x89E6,
                0x9048: 0x98DF,
                0x9049: 0x8755,
                0x904A: 0x8FB1,
                0x904B: 0x5C3B,
                0x904C: 0x4F38,
                0x904D: 0x4FE1,
                0x904E: 0x4FB5,
                0x904F: 0x5507,
                0x9050: 0x5A20,
                0x9051: 0x5BDD,
                0x9052: 0x5BE9,
                0x9053: 0x5FC3,
                0x9054: 0x614E,
                0x9055: 0x632F,
                0x9056: 0x65B0,
                0x9057: 0x664B,
                0x9058: 0x68EE,
                0x9059: 0x699B,
                0x905A: 0x6D78,
                0x905B: 0x6DF1,
                0x905C: 0x7533,
                0x905D: 0x75B9,
                0x905E: 0x771F,
                0x905F: 0x795E,
                0x9060: 0x79E6,
                0x9061: 0x7D33,
                0x9062: 0x81E3,
                0x9063: 0x82AF,
                0x9064: 0x85AA,
                0x9065: 0x89AA,
                0x9066: 0x8A3A,
                0x9067: 0x8EAB,
                0x9068: 0x8F9B,
                0x9069: 0x9032,
                0x906A: 0x91DD,
                0x906B: 0x9707,
                0x906C: 0x4EBA,
                0x906D: 0x4EC1,
                0x906E: 0x5203,
                0x906F: 0x5875,
                0x9070: 0x58EC,
                0x9071: 0x5C0B,
                0x9072: 0x751A,
                0x9073: 0x5C3D,
                0x9074: 0x814E,
                0x9075: 0x8A0A,
                0x9076: 0x8FC5,
                0x9077: 0x9663,
                0x9078: 0x976D,
                0x9079: 0x7B25,
                0x907A: 0x8ACF,
                0x907B: 0x9808,
                0x907C: 0x9162,
                0x907D: 0x56F3,
                0x907E: 0x53A8,
                0x9080: 0x9017,
                0x9081: 0x5439,
                0x9082: 0x5782,
                0x9083: 0x5E25,
                0x9084: 0x63A8,
                0x9085: 0x6C34,
                0x9086: 0x708A,
                0x9087: 0x7761,
                0x9088: 0x7C8B,
                0x9089: 0x7FE0,
                0x908A: 0x8870,
                0x908B: 0x9042,
                0x908C: 0x9154,
                0x908D: 0x9310,
                0x908E: 0x9318,
                0x908F: 0x968F,
                0x9090: 0x745E,
                0x9091: 0x9AC4,
                0x9092: 0x5D07,
                0x9093: 0x5D69,
                0x9094: 0x6570,
                0x9095: 0x67A2,
                0x9096: 0x8DA8,
                0x9097: 0x96DB,
                0x9098: 0x636E,
                0x9099: 0x6749,
                0x909A: 0x6919,
                0x909B: 0x83C5,
                0x909C: 0x9817,
                0x909D: 0x96C0,
                0x909E: 0x88FE,
                0x909F: 0x6F84,
                0x90A0: 0x647A,
                0x90A1: 0x5BF8,
                0x90A2: 0x4E16,
                0x90A3: 0x702C,
                0x90A4: 0x755D,
                0x90A5: 0x662F,
                0x90A6: 0x51C4,
                0x90A7: 0x5236,
                0x90A8: 0x52E2,
                0x90A9: 0x59D3,
                0x90AA: 0x5F81,
                0x90AB: 0x6027,
                0x90AC: 0x6210,
                0x90AD: 0x653F,
                0x90AE: 0x6574,
                0x90AF: 0x661F,
                0x90B0: 0x6674,
                0x90B1: 0x68F2,
                0x90B2: 0x6816,
                0x90B3: 0x6B63,
                0x90B4: 0x6E05,
                0x90B5: 0x7272,
                0x90B6: 0x751F,
                0x90B7: 0x76DB,
                0x90B8: 0x7CBE,
                0x90B9: 0x8056,
                0x90BA: 0x58F0,
                0x90BB: 0x88FD,
                0x90BC: 0x897F,
                0x90BD: 0x8AA0,
                0x90BE: 0x8A93,
                0x90BF: 0x8ACB,
                0x90C0: 0x901D,
                0x90C1: 0x9192,
                0x90C2: 0x9752,
                0x90C3: 0x9759,
                0x90C4: 0x6589,
                0x90C5: 0x7A0E,
                0x90C6: 0x8106,
                0x90C7: 0x96BB,
                0x90C8: 0x5E2D,
                0x90C9: 0x60DC,
                0x90CA: 0x621A,
                0x90CB: 0x65A5,
                0x90CC: 0x6614,
                0x90CD: 0x6790,
                0x90CE: 0x77F3,
                0x90CF: 0x7A4D,
                0x90D0: 0x7C4D,
                0x90D1: 0x7E3E,
                0x90D2: 0x810A,
                0x90D3: 0x8CAC,
                0x90D4: 0x8D64,
                0x90D5: 0x8DE1,
                0x90D6: 0x8E5F,
                0x90D7: 0x78A9,
                0x90D8: 0x5207,
                0x90D9: 0x62D9,
                0x90DA: 0x63A5,
                0x90DB: 0x6442,
                0x90DC: 0x6298,
                0x90DD: 0x8A2D,
                0x90DE: 0x7A83,
                0x90DF: 0x7BC0,
                0x90E0: 0x8AAC,
                0x90E1: 0x96EA,
                0x90E2: 0x7D76,
                0x90E3: 0x820C,
                0x90E4: 0x8749,
                0x90E5: 0x4ED9,
                0x90E6: 0x5148,
                0x90E7: 0x5343,
                0x90E8: 0x5360,
                0x90E9: 0x5BA3,
                0x90EA: 0x5C02,
                0x90EB: 0x5C16,
                0x90EC: 0x5DDD,
                0x90ED: 0x6226,
                0x90EE: 0x6247,
                0x90EF: 0x64B0,
                0x90F0: 0x6813,
                0x90F1: 0x6834,
                0x90F2: 0x6CC9,
                0x90F3: 0x6D45,
                0x90F4: 0x6D17,
                0x90F5: 0x67D3,
                0x90F6: 0x6F5C,
                0x90F7: 0x714E,
                0x90F8: 0x717D,
                0x90F9: 0x65CB,
                0x90FA: 0x7A7F,
                0x90FB: 0x7BAD,
                0x90FC: 0x7DDA,
                0x9140: 0x7E4A,
                0x9141: 0x7FA8,
                0x9142: 0x817A,
                0x9143: 0x821B,
                0x9144: 0x8239,
                0x9145: 0x85A6,
                0x9146: 0x8A6E,
                0x9147: 0x8CCE,
                0x9148: 0x8DF5,
                0x9149: 0x9078,
                0x914A: 0x9077,
                0x914B: 0x92AD,
                0x914C: 0x9291,
                0x914D: 0x9583,
                0x914E: 0x9BAE,
                0x914F: 0x524D,
                0x9150: 0x5584,
                0x9151: 0x6F38,
                0x9152: 0x7136,
                0x9153: 0x5168,
                0x9154: 0x7985,
                0x9155: 0x7E55,
                0x9156: 0x81B3,
                0x9157: 0x7CCE,
                0x9158: 0x564C,
                0x9159: 0x5851,
                0x915A: 0x5CA8,
                0x915B: 0x63AA,
                0x915C: 0x66FE,
                0x915D: 0x66FD,
                0x915E: 0x695A,
                0x915F: 0x72D9,
                0x9160: 0x758F,
                0x9161: 0x758E,
                0x9162: 0x790E,
                0x9163: 0x7956,
                0x9164: 0x79DF,
                0x9165: 0x7C97,
                0x9166: 0x7D20,
                0x9167: 0x7D44,
                0x9168: 0x8607,
                0x9169: 0x8A34,
                0x916A: 0x963B,
                0x916B: 0x9061,
                0x916C: 0x9F20,
                0x916D: 0x50E7,
                0x916E: 0x5275,
                0x916F: 0x53CC,
                0x9170: 0x53E2,
                0x9171: 0x5009,
                0x9172: 0x55AA,
                0x9173: 0x58EE,
                0x9174: 0x594F,
                0x9175: 0x723D,
                0x9176: 0x5B8B,
                0x9177: 0x5C64,
                0x9178: 0x531D,
                0x9179: 0x60E3,
                0x917A: 0x60F3,
                0x917B: 0x635C,
                0x917C: 0x6383,
                0x917D: 0x633F,
                0x917E: 0x63BB,
                0x9180: 0x64CD,
                0x9181: 0x65E9,
                0x9182: 0x66F9,
                0x9183: 0x5DE3,
                0x9184: 0x69CD,
                0x9185: 0x69FD,
                0x9186: 0x6F15,
                0x9187: 0x71E5,
                0x9188: 0x4E89,
                0x9189: 0x75E9,
                0x918A: 0x76F8,
                0x918B: 0x7A93,
                0x918C: 0x7CDF,
                0x918D: 0x7DCF,
                0x918E: 0x7D9C,
                0x918F: 0x8061,
                0x9190: 0x8349,
                0x9191: 0x8358,
                0x9192: 0x846C,
                0x9193: 0x84BC,
                0x9194: 0x85FB,
                0x9195: 0x88C5,
                0x9196: 0x8D70,
                0x9197: 0x9001,
                0x9198: 0x906D,
                0x9199: 0x9397,
                0x919A: 0x971C,
                0x919B: 0x9A12,
                0x919C: 0x50CF,
                0x919D: 0x5897,
                0x919E: 0x618E,
                0x919F: 0x81D3,
                0x91A0: 0x8535,
                0x91A1: 0x8D08,
                0x91A2: 0x9020,
                0x91A3: 0x4FC3,
                0x91A4: 0x5074,
                0x91A5: 0x5247,
                0x91A6: 0x5373,
                0x91A7: 0x606F,
                0x91A8: 0x6349,
                0x91A9: 0x675F,
                0x91AA: 0x6E2C,
                0x91AB: 0x8DB3,
                0x91AC: 0x901F,
                0x91AD: 0x4FD7,
                0x91AE: 0x5C5E,
                0x91AF: 0x8CCA,
                0x91B0: 0x65CF,
                0x91B1: 0x7D9A,
                0x91B2: 0x5352,
                0x91B3: 0x8896,
                0x91B4: 0x5176,
                0x91B5: 0x63C3,
                0x91B6: 0x5B58,
                0x91B7: 0x5B6B,
                0x91B8: 0x5C0A,
                0x91B9: 0x640D,
                0x91BA: 0x6751,
                0x91BB: 0x905C,
                0x91BC: 0x4ED6,
                0x91BD: 0x591A,
                0x91BE: 0x592A,
                0x91BF: 0x6C70,
                0x91C0: 0x8A51,
                0x91C1: 0x553E,
                0x91C2: 0x5815,
                0x91C3: 0x59A5,
                0x91C4: 0x60F0,
                0x91C5: 0x6253,
                0x91C6: 0x67C1,
                0x91C7: 0x8235,
                0x91C8: 0x6955,
                0x91C9: 0x9640,
                0x91CA: 0x99C4,
                0x91CB: 0x9A28,
                0x91CC: 0x4F53,
                0x91CD: 0x5806,
                0x91CE: 0x5BFE,
                0x91CF: 0x8010,
                0x91D0: 0x5CB1,
                0x91D1: 0x5E2F,
                0x91D2: 0x5F85,
                0x91D3: 0x6020,
                0x91D4: 0x614B,
                0x91D5: 0x6234,
                0x91D6: 0x66FF,
                0x91D7: 0x6CF0,
                0x91D8: 0x6EDE,
                0x91D9: 0x80CE,
                0x91DA: 0x817F,
                0x91DB: 0x82D4,
                0x91DC: 0x888B,
                0x91DD: 0x8CB8,
                0x91DE: 0x9000,
                0x91DF: 0x902E,
                0x91E0: 0x968A,
                0x91E1: 0x9EDB,
                0x91E2: 0x9BDB,
                0x91E3: 0x4EE3,
                0x91E4: 0x53F0,
                0x91E5: 0x5927,
                0x91E6: 0x7B2C,
                0x91E7: 0x918D,
                0x91E8: 0x984C,
                0x91E9: 0x9DF9,
                0x91EA: 0x6EDD,
                0x91EB: 0x7027,
                0x91EC: 0x5353,
                0x91ED: 0x5544,
                0x91EE: 0x5B85,
                0x91EF: 0x6258,
                0x91F0: 0x629E,
                0x91F1: 0x62D3,
                0x91F2: 0x6CA2,
                0x91F3: 0x6FEF,
                0x91F4: 0x7422,
                0x91F5: 0x8A17,
                0x91F6: 0x9438,
                0x91F7: 0x6FC1,
                0x91F8: 0x8AFE,
                0x91F9: 0x8338,
                0x91FA: 0x51E7,
                0x91FB: 0x86F8,
                0x91FC: 0x53EA,
                0x9240: 0x53E9,
                0x9241: 0x4F46,
                0x9242: 0x9054,
                0x9243: 0x8FB0,
                0x9244: 0x596A,
                0x9245: 0x8131,
                0x9246: 0x5DFD,
                0x9247: 0x7AEA,
                0x9248: 0x8FBF,
                0x9249: 0x68DA,
                0x924A: 0x8C37,
                0x924B: 0x72F8,
                0x924C: 0x9C48,
                0x924D: 0x6A3D,
                0x924E: 0x8AB0,
                0x924F: 0x4E39,
                0x9250: 0x5358,
                0x9251: 0x5606,
                0x9252: 0x5766,
                0x9253: 0x62C5,
                0x9254: 0x63A2,
                0x9255: 0x65E6,
                0x9256: 0x6B4E,
                0x9257: 0x6DE1,
                0x9258: 0x6E5B,
                0x9259: 0x70AD,
                0x925A: 0x77ED,
                0x925B: 0x7AEF,
                0x925C: 0x7BAA,
                0x925D: 0x7DBB,
                0x925E: 0x803D,
                0x925F: 0x80C6,
                0x9260: 0x86CB,
                0x9261: 0x8A95,
                0x9262: 0x935B,
                0x9263: 0x56E3,
                0x9264: 0x58C7,
                0x9265: 0x5F3E,
                0x9266: 0x65AD,
                0x9267: 0x6696,
                0x9268: 0x6A80,
                0x9269: 0x6BB5,
                0x926A: 0x7537,
                0x926B: 0x8AC7,
                0x926C: 0x5024,
                0x926D: 0x77E5,
                0x926E: 0x5730,
                0x926F: 0x5F1B,
                0x9270: 0x6065,
                0x9271: 0x667A,
                0x9272: 0x6C60,
                0x9273: 0x75F4,
                0x9274: 0x7A1A,
                0x9275: 0x7F6E,
                0x9276: 0x81F4,
                0x9277: 0x8718,
                0x9278: 0x9045,
                0x9279: 0x99B3,
                0x927A: 0x7BC9,
                0x927B: 0x755C,
                0x927C: 0x7AF9,
                0x927D: 0x7B51,
                0x927E: 0x84C4,
                0x9280: 0x9010,
                0x9281: 0x79E9,
                0x9282: 0x7A92,
                0x9283: 0x8336,
                0x9284: 0x5AE1,
                0x9285: 0x7740,
                0x9286: 0x4E2D,
                0x9287: 0x4EF2,
                0x9288: 0x5B99,
                0x9289: 0x5FE0,
                0x928A: 0x62BD,
                0x928B: 0x663C,
                0x928C: 0x67F1,
                0x928D: 0x6CE8,
                0x928E: 0x866B,
                0x928F: 0x8877,
                0x9290: 0x8A3B,
                0x9291: 0x914E,
                0x9292: 0x92F3,
                0x9293: 0x99D0,
                0x9294: 0x6A17,
                0x9295: 0x7026,
                0x9296: 0x732A,
                0x9297: 0x82E7,
                0x9298: 0x8457,
                0x9299: 0x8CAF,
                0x929A: 0x4E01,
                0x929B: 0x5146,
                0x929C: 0x51CB,
                0x929D: 0x558B,
                0x929E: 0x5BF5,
                0x929F: 0x5E16,
                0x92A0: 0x5E33,
                0x92A1: 0x5E81,
                0x92A2: 0x5F14,
                0x92A3: 0x5F35,
                0x92A4: 0x5F6B,
                0x92A5: 0x5FB4,
                0x92A6: 0x61F2,
                0x92A7: 0x6311,
                0x92A8: 0x66A2,
                0x92A9: 0x671D,
                0x92AA: 0x6F6E,
                0x92AB: 0x7252,
                0x92AC: 0x753A,
                0x92AD: 0x773A,
                0x92AE: 0x8074,
                0x92AF: 0x8139,
                0x92B0: 0x8178,
                0x92B1: 0x8776,
                0x92B2: 0x8ABF,
                0x92B3: 0x8ADC,
                0x92B4: 0x8D85,
                0x92B5: 0x8DF3,
                0x92B6: 0x929A,
                0x92B7: 0x9577,
                0x92B8: 0x9802,
                0x92B9: 0x9CE5,
                0x92BA: 0x52C5,
                0x92BB: 0x6357,
                0x92BC: 0x76F4,
                0x92BD: 0x6715,
                0x92BE: 0x6C88,
                0x92BF: 0x73CD,
                0x92C0: 0x8CC3,
                0x92C1: 0x93AE,
                0x92C2: 0x9673,
                0x92C3: 0x6D25,
                0x92C4: 0x589C,
                0x92C5: 0x690E,
                0x92C6: 0x69CC,
                0x92C7: 0x8FFD,
                0x92C8: 0x939A,
                0x92C9: 0x75DB,
                0x92CA: 0x901A,
                0x92CB: 0x585A,
                0x92CC: 0x6802,
                0x92CD: 0x63B4,
                0x92CE: 0x69FB,
                0x92CF: 0x4F43,
                0x92D0: 0x6F2C,
                0x92D1: 0x67D8,
                0x92D2: 0x8FBB,
                0x92D3: 0x8526,
                0x92D4: 0x7DB4,
                0x92D5: 0x9354,
                0x92D6: 0x693F,
                0x92D7: 0x6F70,
                0x92D8: 0x576A,
                0x92D9: 0x58F7,
                0x92DA: 0x5B2C,
                0x92DB: 0x7D2C,
                0x92DC: 0x722A,
                0x92DD: 0x540A,
                0x92DE: 0x91E3,
                0x92DF: 0x9DB4,
                0x92E0: 0x4EAD,
                0x92E1: 0x4F4E,
                0x92E2: 0x505C,
                0x92E3: 0x5075,
                0x92E4: 0x5243,
                0x92E5: 0x8C9E,
                0x92E6: 0x5448,
                0x92E7: 0x5824,
                0x92E8: 0x5B9A,
                0x92E9: 0x5E1D,
                0x92EA: 0x5E95,
                0x92EB: 0x5EAD,
                0x92EC: 0x5EF7,
                0x92ED: 0x5F1F,
                0x92EE: 0x608C,
                0x92EF: 0x62B5,
                0x92F0: 0x633A,
                0x92F1: 0x63D0,
                0x92F2: 0x68AF,
                0x92F3: 0x6C40,
                0x92F4: 0x7887,
                0x92F5: 0x798E,
                0x92F6: 0x7A0B,
                0x92F7: 0x7DE0,
                0x92F8: 0x8247,
                0x92F9: 0x8A02,
                0x92FA: 0x8AE6,
                0x92FB: 0x8E44,
                0x92FC: 0x9013,
                0x9340: 0x90B8,
                0x9341: 0x912D,
                0x9342: 0x91D8,
                0x9343: 0x9F0E,
                0x9344: 0x6CE5,
                0x9345: 0x6458,
                0x9346: 0x64E2,
                0x9347: 0x6575,
                0x9348: 0x6EF4,
                0x9349: 0x7684,
                0x934A: 0x7B1B,
                0x934B: 0x9069,
                0x934C: 0x93D1,
                0x934D: 0x6EBA,
                0x934E: 0x54F2,
                0x934F: 0x5FB9,
                0x9350: 0x64A4,
                0x9351: 0x8F4D,
                0x9352: 0x8FED,
                0x9353: 0x9244,
                0x9354: 0x5178,
                0x9355: 0x586B,
                0x9356: 0x5929,
                0x9357: 0x5C55,
                0x9358: 0x5E97,
                0x9359: 0x6DFB,
                0x935A: 0x7E8F,
                0x935B: 0x751C,
                0x935C: 0x8CBC,
                0x935D: 0x8EE2,
                0x935E: 0x985B,
                0x935F: 0x70B9,
                0x9360: 0x4F1D,
                0x9361: 0x6BBF,
                0x9362: 0x6FB1,
                0x9363: 0x7530,
                0x9364: 0x96FB,
                0x9365: 0x514E,
                0x9366: 0x5410,
                0x9367: 0x5835,
                0x9368: 0x5857,
                0x9369: 0x59AC,
                0x936A: 0x5C60,
                0x936B: 0x5F92,
                0x936C: 0x6597,
                0x936D: 0x675C,
                0x936E: 0x6E21,
                0x936F: 0x767B,
                0x9370: 0x83DF,
                0x9371: 0x8CED,
                0x9372: 0x9014,
                0x9373: 0x90FD,
                0x9374: 0x934D,
                0x9375: 0x7825,
                0x9376: 0x783A,
                0x9377: 0x52AA,
                0x9378: 0x5EA6,
                0x9379: 0x571F,
                0x937A: 0x5974,
                0x937B: 0x6012,
                0x937C: 0x5012,
                0x937D: 0x515A,
                0x937E: 0x51AC,
                0x9380: 0x51CD,
                0x9381: 0x5200,
                0x9382: 0x5510,
                0x9383: 0x5854,
                0x9384: 0x5858,
                0x9385: 0x5957,
                0x9386: 0x5B95,
                0x9387: 0x5CF6,
                0x9388: 0x5D8B,
                0x9389: 0x60BC,
                0x938A: 0x6295,
                0x938B: 0x642D,
                0x938C: 0x6771,
                0x938D: 0x6843,
                0x938E: 0x68BC,
                0x938F: 0x68DF,
                0x9390: 0x76D7,
                0x9391: 0x6DD8,
                0x9392: 0x6E6F,
                0x9393: 0x6D9B,
                0x9394: 0x706F,
                0x9395: 0x71C8,
                0x9396: 0x5F53,
                0x9397: 0x75D8,
                0x9398: 0x7977,
                0x9399: 0x7B49,
                0x939A: 0x7B54,
                0x939B: 0x7B52,
                0x939C: 0x7CD6,
                0x939D: 0x7D71,
                0x939E: 0x5230,
                0x939F: 0x8463,
                0x93A0: 0x8569,
                0x93A1: 0x85E4,
                0x93A2: 0x8A0E,
                0x93A3: 0x8B04,
                0x93A4: 0x8C46,
                0x93A5: 0x8E0F,
                0x93A6: 0x9003,
                0x93A7: 0x900F,
                0x93A8: 0x9419,
                0x93A9: 0x9676,
                0x93AA: 0x982D,
                0x93AB: 0x9A30,
                0x93AC: 0x95D8,
                0x93AD: 0x50CD,
                0x93AE: 0x52D5,
                0x93AF: 0x540C,
                0x93B0: 0x5802,
                0x93B1: 0x5C0E,
                0x93B2: 0x61A7,
                0x93B3: 0x649E,
                0x93B4: 0x6D1E,
                0x93B5: 0x77B3,
                0x93B6: 0x7AE5,
                0x93B7: 0x80F4,
                0x93B8: 0x8404,
                0x93B9: 0x9053,
                0x93BA: 0x9285,
                0x93BB: 0x5CE0,
                0x93BC: 0x9D07,
                0x93BD: 0x533F,
                0x93BE: 0x5F97,
                0x93BF: 0x5FB3,
                0x93C0: 0x6D9C,
                0x93C1: 0x7279,
                0x93C2: 0x7763,
                0x93C3: 0x79BF,
                0x93C4: 0x7BE4,
                0x93C5: 0x6BD2,
                0x93C6: 0x72EC,
                0x93C7: 0x8AAD,
                0x93C8: 0x6803,
                0x93C9: 0x6A61,
                0x93CA: 0x51F8,
                0x93CB: 0x7A81,
                0x93CC: 0x6934,
                0x93CD: 0x5C4A,
                0x93CE: 0x9CF6,
                0x93CF: 0x82EB,
                0x93D0: 0x5BC5,
                0x93D1: 0x9149,
                0x93D2: 0x701E,
                0x93D3: 0x5678,
                0x93D4: 0x5C6F,
                0x93D5: 0x60C7,
                0x93D6: 0x6566,
                0x93D7: 0x6C8C,
                0x93D8: 0x8C5A,
                0x93D9: 0x9041,
                0x93DA: 0x9813,
                0x93DB: 0x5451,
                0x93DC: 0x66C7,
                0x93DD: 0x920D,
                0x93DE: 0x5948,
                0x93DF: 0x90A3,
                0x93E0: 0x5185,
                0x93E1: 0x4E4D,
                0x93E2: 0x51EA,
                0x93E3: 0x8599,
                0x93E4: 0x8B0E,
                0x93E5: 0x7058,
                0x93E6: 0x637A,
                0x93E7: 0x934B,
                0x93E8: 0x6962,
                0x93E9: 0x99B4,
                0x93EA: 0x7E04,
                0x93EB: 0x7577,
                0x93EC: 0x5357,
                0x93ED: 0x6960,
                0x93EE: 0x8EDF,
                0x93EF: 0x96E3,
                0x93F0: 0x6C5D,
                0x93F1: 0x4E8C,
                0x93F2: 0x5C3C,
                0x93F3: 0x5F10,
                0x93F4: 0x8FE9,
                0x93F5: 0x5302,
                0x93F6: 0x8CD1,
                0x93F7: 0x8089,
                0x93F8: 0x8679,
                0x93F9: 0x5EFF,
                0x93FA: 0x65E5,
                0x93FB: 0x4E73,
                0x93FC: 0x5165,
                0x9440: 0x5982,
                0x9441: 0x5C3F,
                0x9442: 0x97EE,
                0x9443: 0x4EFB,
                0x9444: 0x598A,
                0x9445: 0x5FCD,
                0x9446: 0x8A8D,
                0x9447: 0x6FE1,
                0x9448: 0x79B0,
                0x9449: 0x7962,
                0x944A: 0x5BE7,
                0x944B: 0x8471,
                0x944C: 0x732B,
                0x944D: 0x71B1,
                0x944E: 0x5E74,
                0x944F: 0x5FF5,
                0x9450: 0x637B,
                0x9451: 0x649A,
                0x9452: 0x71C3,
                0x9453: 0x7C98,
                0x9454: 0x4E43,
                0x9455: 0x5EFC,
                0x9456: 0x4E4B,
                0x9457: 0x57DC,
                0x9458: 0x56A2,
                0x9459: 0x60A9,
                0x945A: 0x6FC3,
                0x945B: 0x7D0D,
                0x945C: 0x80FD,
                0x945D: 0x8133,
                0x945E: 0x81BF,
                0x945F: 0x8FB2,
                0x9460: 0x8997,
                0x9461: 0x86A4,
                0x9462: 0x5DF4,
                0x9463: 0x628A,
                0x9464: 0x64AD,
                0x9465: 0x8987,
                0x9466: 0x6777,
                0x9467: 0x6CE2,
                0x9468: 0x6D3E,
                0x9469: 0x7436,
                0x946A: 0x7834,
                0x946B: 0x5A46,
                0x946C: 0x7F75,
                0x946D: 0x82AD,
                0x946E: 0x99AC,
                0x946F: 0x4FF3,
                0x9470: 0x5EC3,
                0x9471: 0x62DD,
                0x9472: 0x6392,
                0x9473: 0x6557,
                0x9474: 0x676F,
                0x9475: 0x76C3,
                0x9476: 0x724C,
                0x9477: 0x80CC,
                0x9478: 0x80BA,
                0x9479: 0x8F29,
                0x947A: 0x914D,
                0x947B: 0x500D,
                0x947C: 0x57F9,
                0x947D: 0x5A92,
                0x947E: 0x6885,
                0x9480: 0x6973,
                0x9481: 0x7164,
                0x9482: 0x72FD,
                0x9483: 0x8CB7,
                0x9484: 0x58F2,
                0x9485: 0x8CE0,
                0x9486: 0x966A,
                0x9487: 0x9019,
                0x9488: 0x877F,
                0x9489: 0x79E4,
                0x948A: 0x77E7,
                0x948B: 0x8429,
                0x948C: 0x4F2F,
                0x948D: 0x5265,
                0x948E: 0x535A,
                0x948F: 0x62CD,
                0x9490: 0x67CF,
                0x9491: 0x6CCA,
                0x9492: 0x767D,
                0x9493: 0x7B94,
                0x9494: 0x7C95,
                0x9495: 0x8236,
                0x9496: 0x8584,
                0x9497: 0x8FEB,
                0x9498: 0x66DD,
                0x9499: 0x6F20,
                0x949A: 0x7206,
                0x949B: 0x7E1B,
                0x949C: 0x83AB,
                0x949D: 0x99C1,
                0x949E: 0x9EA6,
                0x949F: 0x51FD,
                0x94A0: 0x7BB1,
                0x94A1: 0x7872,
                0x94A2: 0x7BB8,
                0x94A3: 0x8087,
                0x94A4: 0x7B48,
                0x94A5: 0x6AE8,
                0x94A6: 0x5E61,
                0x94A7: 0x808C,
                0x94A8: 0x7551,
                0x94A9: 0x7560,
                0x94AA: 0x516B,
                0x94AB: 0x9262,
                0x94AC: 0x6E8C,
                0x94AD: 0x767A,
                0x94AE: 0x9197,
                0x94AF: 0x9AEA,
                0x94B0: 0x4F10,
                0x94B1: 0x7F70,
                0x94B2: 0x629C,
                0x94B3: 0x7B4F,
                0x94B4: 0x95A5,
                0x94B5: 0x9CE9,
                0x94B6: 0x567A,
                0x94B7: 0x5859,
                0x94B8: 0x86E4,
                0x94B9: 0x96BC,
                0x94BA: 0x4F34,
                0x94BB: 0x5224,
                0x94BC: 0x534A,
                0x94BD: 0x53CD,
                0x94BE: 0x53DB,
                0x94BF: 0x5E06,
                0x94C0: 0x642C,
                0x94C1: 0x6591,
                0x94C2: 0x677F,
                0x94C3: 0x6C3E,
                0x94C4: 0x6C4E,
                0x94C5: 0x7248,
                0x94C6: 0x72AF,
                0x94C7: 0x73ED,
                0x94C8: 0x7554,
                0x94C9: 0x7E41,
                0x94CA: 0x822C,
                0x94CB: 0x85E9,
                0x94CC: 0x8CA9,
                0x94CD: 0x7BC4,
                0x94CE: 0x91C6,
                0x94CF: 0x7169,
                0x94D0: 0x9812,
                0x94D1: 0x98EF,
                0x94D2: 0x633D,
                0x94D3: 0x6669,
                0x94D4: 0x756A,
                0x94D5: 0x76E4,
                0x94D6: 0x78D0,
                0x94D7: 0x8543,
                0x94D8: 0x86EE,
                0x94D9: 0x532A,
                0x94DA: 0x5351,
                0x94DB: 0x5426,
                0x94DC: 0x5983,
                0x94DD: 0x5E87,
                0x94DE: 0x5F7C,
                0x94DF: 0x60B2,
                0x94E0: 0x6249,
                0x94E1: 0x6279,
                0x94E2: 0x62AB,
                0x94E3: 0x6590,
                0x94E4: 0x6BD4,
                0x94E5: 0x6CCC,
                0x94E6: 0x75B2,
                0x94E7: 0x76AE,
                0x94E8: 0x7891,
                0x94E9: 0x79D8,
                0x94EA: 0x7DCB,
                0x94EB: 0x7F77,
                0x94EC: 0x80A5,
                0x94ED: 0x88AB,
                0x94EE: 0x8AB9,
                0x94EF: 0x8CBB,
                0x94F0: 0x907F,
                0x94F1: 0x975E,
                0x94F2: 0x98DB,
                0x94F3: 0x6A0B,
                0x94F4: 0x7C38,
                0x94F5: 0x5099,
                0x94F6: 0x5C3E,
                0x94F7: 0x5FAE,
                0x94F8: 0x6787,
                0x94F9: 0x6BD8,
                0x94FA: 0x7435,
                0x94FB: 0x7709,
                0x94FC: 0x7F8E,
                0x9540: 0x9F3B,
                0x9541: 0x67CA,
                0x9542: 0x7A17,
                0x9543: 0x5339,
                0x9544: 0x758B,
                0x9545: 0x9AED,
                0x9546: 0x5F66,
                0x9547: 0x819D,
                0x9548: 0x83F1,
                0x9549: 0x8098,
                0x954A: 0x5F3C,
                0x954B: 0x5FC5,
                0x954C: 0x7562,
                0x954D: 0x7B46,
                0x954E: 0x903C,
                0x954F: 0x6867,
                0x9550: 0x59EB,
                0x9551: 0x5A9B,
                0x9552: 0x7D10,
                0x9553: 0x767E,
                0x9554: 0x8B2C,
                0x9555: 0x4FF5,
                0x9556: 0x5F6A,
                0x9557: 0x6A19,
                0x9558: 0x6C37,
                0x9559: 0x6F02,
                0x955A: 0x74E2,
                0x955B: 0x7968,
                0x955C: 0x8868,
                0x955D: 0x8A55,
                0x955E: 0x8C79,
                0x955F: 0x5EDF,
                0x9560: 0x63CF,
                0x9561: 0x75C5,
                0x9562: 0x79D2,
                0x9563: 0x82D7,
                0x9564: 0x9328,
                0x9565: 0x92F2,
                0x9566: 0x849C,
                0x9567: 0x86ED,
                0x9568: 0x9C2D,
                0x9569: 0x54C1,
                0x956A: 0x5F6C,
                0x956B: 0x658C,
                0x956C: 0x6D5C,
                0x956D: 0x7015,
                0x956E: 0x8CA7,
                0x956F: 0x8CD3,
                0x9570: 0x983B,
                0x9571: 0x654F,
                0x9572: 0x74F6,
                0x9573: 0x4E0D,
                0x9574: 0x4ED8,
                0x9575: 0x57E0,
                0x9576: 0x592B,
                0x9577: 0x5A66,
                0x9578: 0x5BCC,
                0x9579: 0x51A8,
                0x957A: 0x5E03,
                0x957B: 0x5E9C,
                0x957C: 0x6016,
                0x957D: 0x6276,
                0x957E: 0x6577,
                0x9580: 0x65A7,
                0x9581: 0x666E,
                0x9582: 0x6D6E,
                0x9583: 0x7236,
                0x9584: 0x7B26,
                0x9585: 0x8150,
                0x9586: 0x819A,
                0x9587: 0x8299,
                0x9588: 0x8B5C,
                0x9589: 0x8CA0,
                0x958A: 0x8CE6,
                0x958B: 0x8D74,
                0x958C: 0x961C,
                0x958D: 0x9644,
                0x958E: 0x4FAE,
                0x958F: 0x64AB,
                0x9590: 0x6B66,
                0x9591: 0x821E,
                0x9592: 0x8461,
                0x9593: 0x856A,
                0x9594: 0x90E8,
                0x9595: 0x5C01,
                0x9596: 0x6953,
                0x9597: 0x98A8,
                0x9598: 0x847A,
                0x9599: 0x8557,
                0x959A: 0x4F0F,
                0x959B: 0x526F,
                0x959C: 0x5FA9,
                0x959D: 0x5E45,
                0x959E: 0x670D,
                0x959F: 0x798F,
                0x95A0: 0x8179,
                0x95A1: 0x8907,
                0x95A2: 0x8986,
                0x95A3: 0x6DF5,
                0x95A4: 0x5F17,
                0x95A5: 0x6255,
                0x95A6: 0x6CB8,
                0x95A7: 0x4ECF,
                0x95A8: 0x7269,
                0x95A9: 0x9B92,
                0x95AA: 0x5206,
                0x95AB: 0x543B,
                0x95AC: 0x5674,
                0x95AD: 0x58B3,
                0x95AE: 0x61A4,
                0x95AF: 0x626E,
                0x95B0: 0x711A,
                0x95B1: 0x596E,
                0x95B2: 0x7C89,
                0x95B3: 0x7CDE,
                0x95B4: 0x7D1B,
                0x95B5: 0x96F0,
                0x95B6: 0x6587,
                0x95B7: 0x805E,
                0x95B8: 0x4E19,
                0x95B9: 0x4F75,
                0x95BA: 0x5175,
                0x95BB: 0x5840,
                0x95BC: 0x5E63,
                0x95BD: 0x5E73,
                0x95BE: 0x5F0A,
                0x95BF: 0x67C4,
                0x95C0: 0x4E26,
                0x95C1: 0x853D,
                0x95C2: 0x9589,
                0x95C3: 0x965B,
                0x95C4: 0x7C73,
                0x95C5: 0x9801,
                0x95C6: 0x50FB,
                0x95C7: 0x58C1,
                0x95C8: 0x7656,
                0x95C9: 0x78A7,
                0x95CA: 0x5225,
                0x95CB: 0x77A5,
                0x95CC: 0x8511,
                0x95CD: 0x7B86,
                0x95CE: 0x504F,
                0x95CF: 0x5909,
                0x95D0: 0x7247,
                0x95D1: 0x7BC7,
                0x95D2: 0x7DE8,
                0x95D3: 0x8FBA,
                0x95D4: 0x8FD4,
                0x95D5: 0x904D,
                0x95D6: 0x4FBF,
                0x95D7: 0x52C9,
                0x95D8: 0x5A29,
                0x95D9: 0x5F01,
                0x95DA: 0x97AD,
                0x95DB: 0x4FDD,
                0x95DC: 0x8217,
                0x95DD: 0x92EA,
                0x95DE: 0x5703,
                0x95DF: 0x6355,
                0x95E0: 0x6B69,
                0x95E1: 0x752B,
                0x95E2: 0x88DC,
                0x95E3: 0x8F14,
                0x95E4: 0x7A42,
                0x95E5: 0x52DF,
                0x95E6: 0x5893,
                0x95E7: 0x6155,
                0x95E8: 0x620A,
                0x95E9: 0x66AE,
                0x95EA: 0x6BCD,
                0x95EB: 0x7C3F,
                0x95EC: 0x83E9,
                0x95ED: 0x5023,
                0x95EE: 0x4FF8,
                0x95EF: 0x5305,
                0x95F0: 0x5446,
                0x95F1: 0x5831,
                0x95F2: 0x5949,
                0x95F3: 0x5B9D,
                0x95F4: 0x5CF0,
                0x95F5: 0x5CEF,
                0x95F6: 0x5D29,
                0x95F7: 0x5E96,
                0x95F8: 0x62B1,
                0x95F9: 0x6367,
                0x95FA: 0x653E,
                0x95FB: 0x65B9,
                0x95FC: 0x670B,
                0x9640: 0x6CD5,
                0x9641: 0x6CE1,
                0x9642: 0x70F9,
                0x9643: 0x7832,
                0x9644: 0x7E2B,
                0x9645: 0x80DE,
                0x9646: 0x82B3,
                0x9647: 0x840C,
                0x9648: 0x84EC,
                0x9649: 0x8702,
                0x964A: 0x8912,
                0x964B: 0x8A2A,
                0x964C: 0x8C4A,
                0x964D: 0x90A6,
                0x964E: 0x92D2,
                0x964F: 0x98FD,
                0x9650: 0x9CF3,
                0x9651: 0x9D6C,
                0x9652: 0x4E4F,
                0x9653: 0x4EA1,
                0x9654: 0x508D,
                0x9655: 0x5256,
                0x9656: 0x574A,
                0x9657: 0x59A8,
                0x9658: 0x5E3D,
                0x9659: 0x5FD8,
                0x965A: 0x5FD9,
                0x965B: 0x623F,
                0x965C: 0x66B4,
                0x965D: 0x671B,
                0x965E: 0x67D0,
                0x965F: 0x68D2,
                0x9660: 0x5192,
                0x9661: 0x7D21,
                0x9662: 0x80AA,
                0x9663: 0x81A8,
                0x9664: 0x8B00,
                0x9665: 0x8C8C,
                0x9666: 0x8CBF,
                0x9667: 0x927E,
                0x9668: 0x9632,
                0x9669: 0x5420,
                0x966A: 0x982C,
                0x966B: 0x5317,
                0x966C: 0x50D5,
                0x966D: 0x535C,
                0x966E: 0x58A8,
                0x966F: 0x64B2,
                0x9670: 0x6734,
                0x9671: 0x7267,
                0x9672: 0x7766,
                0x9673: 0x7A46,
                0x9674: 0x91E6,
                0x9675: 0x52C3,
                0x9676: 0x6CA1,
                0x9677: 0x6B86,
                0x9678: 0x5800,
                0x9679: 0x5E4C,
                0x967A: 0x5954,
                0x967B: 0x672C,
                0x967C: 0x7FFB,
                0x967D: 0x51E1,
                0x967E: 0x76C6,
                0x9680: 0x6469,
                0x9681: 0x78E8,
                0x9682: 0x9B54,
                0x9683: 0x9EBB,
                0x9684: 0x57CB,
                0x9685: 0x59B9,
                0x9686: 0x6627,
                0x9687: 0x679A,
                0x9688: 0x6BCE,
                0x9689: 0x54E9,
                0x968A: 0x69D9,
                0x968B: 0x5E55,
                0x968C: 0x819C,
                0x968D: 0x6795,
                0x968E: 0x9BAA,
                0x968F: 0x67FE,
                0x9690: 0x9C52,
                0x9691: 0x685D,
                0x9692: 0x4EA6,
                0x9693: 0x4FE3,
                0x9694: 0x53C8,
                0x9695: 0x62B9,
                0x9696: 0x672B,
                0x9697: 0x6CAB,
                0x9698: 0x8FC4,
                0x9699: 0x4FAD,
                0x969A: 0x7E6D,
                0x969B: 0x9EBF,
                0x969C: 0x4E07,
                0x969D: 0x6162,
                0x969E: 0x6E80,
                0x969F: 0x6F2B,
                0x96A0: 0x8513,
                0x96A1: 0x5473,
                0x96A2: 0x672A,
                0x96A3: 0x9B45,
                0x96A4: 0x5DF3,
                0x96A5: 0x7B95,
                0x96A6: 0x5CAC,
                0x96A7: 0x5BC6,
                0x96A8: 0x871C,
                0x96A9: 0x6E4A,
                0x96AA: 0x84D1,
                0x96AB: 0x7A14,
                0x96AC: 0x8108,
                0x96AD: 0x5999,
                0x96AE: 0x7C8D,
                0x96AF: 0x6C11,
                0x96B0: 0x7720,
                0x96B1: 0x52D9,
                0x96B2: 0x5922,
                0x96B3: 0x7121,
                0x96B4: 0x725F,
                0x96B5: 0x77DB,
                0x96B6: 0x9727,
                0x96B7: 0x9D61,
                0x96B8: 0x690B,
                0x96B9: 0x5A7F,
                0x96BA: 0x5A18,
                0x96BB: 0x51A5,
                0x96BC: 0x540D,
                0x96BD: 0x547D,
                0x96BE: 0x660E,
                0x96BF: 0x76DF,
                0x96C0: 0x8FF7,
                0x96C1: 0x9298,
                0x96C2: 0x9CF4,
                0x96C3: 0x59EA,
                0x96C4: 0x725D,
                0x96C5: 0x6EC5,
                0x96C6: 0x514D,
                0x96C7: 0x68C9,
                0x96C8: 0x7DBF,
                0x96C9: 0x7DEC,
                0x96CA: 0x9762,
                0x96CB: 0x9EBA,
                0x96CC: 0x6478,
                0x96CD: 0x6A21,
                0x96CE: 0x8302,
                0x96CF: 0x5984,
                0x96D0: 0x5B5F,
                0x96D1: 0x6BDB,
                0x96D2: 0x731B,
                0x96D3: 0x76F2,
                0x96D4: 0x7DB2,
                0x96D5: 0x8017,
                0x96D6: 0x8499,
                0x96D7: 0x5132,
                0x96D8: 0x6728,
                0x96D9: 0x9ED9,
                0x96DA: 0x76EE,
                0x96DB: 0x6762,
                0x96DC: 0x52FF,
                0x96DD: 0x9905,
                0x96DE: 0x5C24,
                0x96DF: 0x623B,
                0x96E0: 0x7C7E,
                0x96E1: 0x8CB0,
                0x96E2: 0x554F,
                0x96E3: 0x60B6,
                0x96E4: 0x7D0B,
                0x96E5: 0x9580,
                0x96E6: 0x5301,
                0x96E7: 0x4E5F,
                0x96E8: 0x51B6,
                0x96E9: 0x591C,
                0x96EA: 0x723A,
                0x96EB: 0x8036,
                0x96EC: 0x91CE,
                0x96ED: 0x5F25,
                0x96EE: 0x77E2,
                0x96EF: 0x5384,
                0x96F0: 0x5F79,
                0x96F1: 0x7D04,
                0x96F2: 0x85AC,
                0x96F3: 0x8A33,
                0x96F4: 0x8E8D,
                0x96F5: 0x9756,
                0x96F6: 0x67F3,
                0x96F7: 0x85AE,
                0x96F8: 0x9453,
                0x96F9: 0x6109,
                0x96FA: 0x6108,
                0x96FB: 0x6CB9,
                0x96FC: 0x7652,
                0x9740: 0x8AED,
                0x9741: 0x8F38,
                0x9742: 0x552F,
                0x9743: 0x4F51,
                0x9744: 0x512A,
                0x9745: 0x52C7,
                0x9746: 0x53CB,
                0x9747: 0x5BA5,
                0x9748: 0x5E7D,
                0x9749: 0x60A0,
                0x974A: 0x6182,
                0x974B: 0x63D6,
                0x974C: 0x6709,
                0x974D: 0x67DA,
                0x974E: 0x6E67,
                0x974F: 0x6D8C,
                0x9750: 0x7336,
                0x9751: 0x7337,
                0x9752: 0x7531,
                0x9753: 0x7950,
                0x9754: 0x88D5,
                0x9755: 0x8A98,
                0x9756: 0x904A,
                0x9757: 0x9091,
                0x9758: 0x90F5,
                0x9759: 0x96C4,
                0x975A: 0x878D,
                0x975B: 0x5915,
                0x975C: 0x4E88,
                0x975D: 0x4F59,
                0x975E: 0x4E0E,
                0x975F: 0x8A89,
                0x9760: 0x8F3F,
                0x9761: 0x9810,
                0x9762: 0x50AD,
                0x9763: 0x5E7C,
                0x9764: 0x5996,
                0x9765: 0x5BB9,
                0x9766: 0x5EB8,
                0x9767: 0x63DA,
                0x9768: 0x63FA,
                0x9769: 0x64C1,
                0x976A: 0x66DC,
                0x976B: 0x694A,
                0x976C: 0x69D8,
                0x976D: 0x6D0B,
                0x976E: 0x6EB6,
                0x976F: 0x7194,
                0x9770: 0x7528,
                0x9771: 0x7AAF,
                0x9772: 0x7F8A,
                0x9773: 0x8000,
                0x9774: 0x8449,
                0x9775: 0x84C9,
                0x9776: 0x8981,
                0x9777: 0x8B21,
                0x9778: 0x8E0A,
                0x9779: 0x9065,
                0x977A: 0x967D,
                0x977B: 0x990A,
                0x977C: 0x617E,
                0x977D: 0x6291,
                0x977E: 0x6B32,
                0x9780: 0x6C83,
                0x9781: 0x6D74,
                0x9782: 0x7FCC,
                0x9783: 0x7FFC,
                0x9784: 0x6DC0,
                0x9785: 0x7F85,
                0x9786: 0x87BA,
                0x9787: 0x88F8,
                0x9788: 0x6765,
                0x9789: 0x83B1,
                0x978A: 0x983C,
                0x978B: 0x96F7,
                0x978C: 0x6D1B,
                0x978D: 0x7D61,
                0x978E: 0x843D,
                0x978F: 0x916A,
                0x9790: 0x4E71,
                0x9791: 0x5375,
                0x9792: 0x5D50,
                0x9793: 0x6B04,
                0x9794: 0x6FEB,
                0x9795: 0x85CD,
                0x9796: 0x862D,
                0x9797: 0x89A7,
                0x9798: 0x5229,
                0x9799: 0x540F,
                0x979A: 0x5C65,
                0x979B: 0x674E,
                0x979C: 0x68A8,
                0x979D: 0x7406,
                0x979E: 0x7483,
                0x979F: 0x75E2,
                0x97A0: 0x88CF,
                0x97A1: 0x88E1,
                0x97A2: 0x91CC,
                0x97A3: 0x96E2,
                0x97A4: 0x9678,
                0x97A5: 0x5F8B,
                0x97A6: 0x7387,
                0x97A7: 0x7ACB,
                0x97A8: 0x844E,
                0x97A9: 0x63A0,
                0x97AA: 0x7565,
                0x97AB: 0x5289,
                0x97AC: 0x6D41,
                0x97AD: 0x6E9C,
                0x97AE: 0x7409,
                0x97AF: 0x7559,
                0x97B0: 0x786B,
                0x97B1: 0x7C92,
                0x97B2: 0x9686,
                0x97B3: 0x7ADC,
                0x97B4: 0x9F8D,
                0x97B5: 0x4FB6,
                0x97B6: 0x616E,
                0x97B7: 0x65C5,
                0x97B8: 0x865C,
                0x97B9: 0x4E86,
                0x97BA: 0x4EAE,
                0x97BB: 0x50DA,
                0x97BC: 0x4E21,
                0x97BD: 0x51CC,
                0x97BE: 0x5BEE,
                0x97BF: 0x6599,
                0x97C0: 0x6881,
                0x97C1: 0x6DBC,
                0x97C2: 0x731F,
                0x97C3: 0x7642,
                0x97C4: 0x77AD,
                0x97C5: 0x7A1C,
                0x97C6: 0x7CE7,
                0x97C7: 0x826F,
                0x97C8: 0x8AD2,
                0x97C9: 0x907C,
                0x97CA: 0x91CF,
                0x97CB: 0x9675,
                0x97CC: 0x9818,
                0x97CD: 0x529B,
                0x97CE: 0x7DD1,
                0x97CF: 0x502B,
                0x97D0: 0x5398,
                0x97D1: 0x6797,
                0x97D2: 0x6DCB,
                0x97D3: 0x71D0,
                0x97D4: 0x7433,
                0x97D5: 0x81E8,
                0x97D6: 0x8F2A,
                0x97D7: 0x96A3,
                0x97D8: 0x9C57,
                0x97D9: 0x9E9F,
                0x97DA: 0x7460,
                0x97DB: 0x5841,
                0x97DC: 0x6D99,
                0x97DD: 0x7D2F,
                0x97DE: 0x985E,
                0x97DF: 0x4EE4,
                0x97E0: 0x4F36,
                0x97E1: 0x4F8B,
                0x97E2: 0x51B7,
                0x97E3: 0x52B1,
                0x97E4: 0x5DBA,
                0x97E5: 0x601C,
                0x97E6: 0x73B2,
                0x97E7: 0x793C,
                0x97E8: 0x82D3,
                0x97E9: 0x9234,
                0x97EA: 0x96B7,
                0x97EB: 0x96F6,
                0x97EC: 0x970A,
                0x97ED: 0x9E97,
                0x97EE: 0x9F62,
                0x97EF: 0x66A6,
                0x97F0: 0x6B74,
                0x97F1: 0x5217,
                0x97F2: 0x52A3,
                0x97F3: 0x70C8,
                0x97F4: 0x88C2,
                0x97F5: 0x5EC9,
                0x97F6: 0x604B,
                0x97F7: 0x6190,
                0x97F8: 0x6F23,
                0x97F9: 0x7149,
                0x97FA: 0x7C3E,
                0x97FB: 0x7DF4,
                0x97FC: 0x806F,
                0x9840: 0x84EE,
                0x9841: 0x9023,
                0x9842: 0x932C,
                0x9843: 0x5442,
                0x9844: 0x9B6F,
                0x9845: 0x6AD3,
                0x9846: 0x7089,
                0x9847: 0x8CC2,
                0x9848: 0x8DEF,
                0x9849: 0x9732,
                0x984A: 0x52B4,
                0x984B: 0x5A41,
                0x984C: 0x5ECA,
                0x984D: 0x5F04,
                0x984E: 0x6717,
                0x984F: 0x697C,
                0x9850: 0x6994,
                0x9851: 0x6D6A,
                0x9852: 0x6F0F,
                0x9853: 0x7262,
                0x9854: 0x72FC,
                0x9855: 0x7BED,
                0x9856: 0x8001,
                0x9857: 0x807E,
                0x9858: 0x874B,
                0x9859: 0x90CE,
                0x985A: 0x516D,
                0x985B: 0x9E93,
                0x985C: 0x7984,
                0x985D: 0x808B,
                0x985E: 0x9332,
                0x985F: 0x8AD6,
                0x9860: 0x502D,
                0x9861: 0x548C,
                0x9862: 0x8A71,
                0x9863: 0x6B6A,
                0x9864: 0x8CC4,
                0x9865: 0x8107,
                0x9866: 0x60D1,
                0x9867: 0x67A0,
                0x9868: 0x9DF2,
                0x9869: 0x4E99,
                0x986A: 0x4E98,
                0x986B: 0x9C10,
                0x986C: 0x8A6B,
                0x986D: 0x85C1,
                0x986E: 0x8568,
                0x986F: 0x6900,
                0x9870: 0x6E7E,
                0x9871: 0x7897,
                0x9872: 0x8155,
                0x989F: 0x5F0C,
                0x98A0: 0x4E10,
                0x98A1: 0x4E15,
                0x98A2: 0x4E2A,
                0x98A3: 0x4E31,
                0x98A4: 0x4E36,
                0x98A5: 0x4E3C,
                0x98A6: 0x4E3F,
                0x98A7: 0x4E42,
                0x98A8: 0x4E56,
                0x98A9: 0x4E58,
                0x98AA: 0x4E82,
                0x98AB: 0x4E85,
                0x98AC: 0x8C6B,
                0x98AD: 0x4E8A,
                0x98AE: 0x8212,
                0x98AF: 0x5F0D,
                0x98B0: 0x4E8E,
                0x98B1: 0x4E9E,
                0x98B2: 0x4E9F,
                0x98B3: 0x4EA0,
                0x98B4: 0x4EA2,
                0x98B5: 0x4EB0,
                0x98B6: 0x4EB3,
                0x98B7: 0x4EB6,
                0x98B8: 0x4ECE,
                0x98B9: 0x4ECD,
                0x98BA: 0x4EC4,
                0x98BB: 0x4EC6,
                0x98BC: 0x4EC2,
                0x98BD: 0x4ED7,
                0x98BE: 0x4EDE,
                0x98BF: 0x4EED,
                0x98C0: 0x4EDF,
                0x98C1: 0x4EF7,
                0x98C2: 0x4F09,
                0x98C3: 0x4F5A,
                0x98C4: 0x4F30,
                0x98C5: 0x4F5B,
                0x98C6: 0x4F5D,
                0x98C7: 0x4F57,
                0x98C8: 0x4F47,
                0x98C9: 0x4F76,
                0x98CA: 0x4F88,
                0x98CB: 0x4F8F,
                0x98CC: 0x4F98,
                0x98CD: 0x4F7B,
                0x98CE: 0x4F69,
                0x98CF: 0x4F70,
                0x98D0: 0x4F91,
                0x98D1: 0x4F6F,
                0x98D2: 0x4F86,
                0x98D3: 0x4F96,
                0x98D4: 0x5118,
                0x98D5: 0x4FD4,
                0x98D6: 0x4FDF,
                0x98D7: 0x4FCE,
                0x98D8: 0x4FD8,
                0x98D9: 0x4FDB,
                0x98DA: 0x4FD1,
                0x98DB: 0x4FDA,
                0x98DC: 0x4FD0,
                0x98DD: 0x4FE4,
                0x98DE: 0x4FE5,
                0x98DF: 0x501A,
                0x98E0: 0x5028,
                0x98E1: 0x5014,
                0x98E2: 0x502A,
                0x98E3: 0x5025,
                0x98E4: 0x5005,
                0x98E5: 0x4F1C,
                0x98E6: 0x4FF6,
                0x98E7: 0x5021,
                0x98E8: 0x5029,
                0x98E9: 0x502C,
                0x98EA: 0x4FFE,
                0x98EB: 0x4FEF,
                0x98EC: 0x5011,
                0x98ED: 0x5006,
                0x98EE: 0x5043,
                0x98EF: 0x5047,
                0x98F0: 0x6703,
                0x98F1: 0x5055,
                0x98F2: 0x5050,
                0x98F3: 0x5048,
                0x98F4: 0x505A,
                0x98F5: 0x5056,
                0x98F6: 0x506C,
                0x98F7: 0x5078,
                0x98F8: 0x5080,
                0x98F9: 0x509A,
                0x98FA: 0x5085,
                0x98FB: 0x50B4,
                0x98FC: 0x50B2,
                0x9940: 0x50C9,
                0x9941: 0x50CA,
                0x9942: 0x50B3,
                0x9943: 0x50C2,
                0x9944: 0x50D6,
                0x9945: 0x50DE,
                0x9946: 0x50E5,
                0x9947: 0x50ED,
                0x9948: 0x50E3,
                0x9949: 0x50EE,
                0x994A: 0x50F9,
                0x994B: 0x50F5,
                0x994C: 0x5109,
                0x994D: 0x5101,
                0x994E: 0x5102,
                0x994F: 0x5116,
                0x9950: 0x5115,
                0x9951: 0x5114,
                0x9952: 0x511A,
                0x9953: 0x5121,
                0x9954: 0x513A,
                0x9955: 0x5137,
                0x9956: 0x513C,
                0x9957: 0x513B,
                0x9958: 0x513F,
                0x9959: 0x5140,
                0x995A: 0x5152,
                0x995B: 0x514C,
                0x995C: 0x5154,
                0x995D: 0x5162,
                0x995E: 0x7AF8,
                0x995F: 0x5169,
                0x9960: 0x516A,
                0x9961: 0x516E,
                0x9962: 0x5180,
                0x9963: 0x5182,
                0x9964: 0x56D8,
                0x9965: 0x518C,
                0x9966: 0x5189,
                0x9967: 0x518F,
                0x9968: 0x5191,
                0x9969: 0x5193,
                0x996A: 0x5195,
                0x996B: 0x5196,
                0x996C: 0x51A4,
                0x996D: 0x51A6,
                0x996E: 0x51A2,
                0x996F: 0x51A9,
                0x9970: 0x51AA,
                0x9971: 0x51AB,
                0x9972: 0x51B3,
                0x9973: 0x51B1,
                0x9974: 0x51B2,
                0x9975: 0x51B0,
                0x9976: 0x51B5,
                0x9977: 0x51BD,
                0x9978: 0x51C5,
                0x9979: 0x51C9,
                0x997A: 0x51DB,
                0x997B: 0x51E0,
                0x997C: 0x8655,
                0x997D: 0x51E9,
                0x997E: 0x51ED,
                0x9980: 0x51F0,
                0x9981: 0x51F5,
                0x9982: 0x51FE,
                0x9983: 0x5204,
                0x9984: 0x520B,
                0x9985: 0x5214,
                0x9986: 0x520E,
                0x9987: 0x5227,
                0x9988: 0x522A,
                0x9989: 0x522E,
                0x998A: 0x5233,
                0x998B: 0x5239,
                0x998C: 0x524F,
                0x998D: 0x5244,
                0x998E: 0x524B,
                0x998F: 0x524C,
                0x9990: 0x525E,
                0x9991: 0x5254,
                0x9992: 0x526A,
                0x9993: 0x5274,
                0x9994: 0x5269,
                0x9995: 0x5273,
                0x9996: 0x527F,
                0x9997: 0x527D,
                0x9998: 0x528D,
                0x9999: 0x5294,
                0x999A: 0x5292,
                0x999B: 0x5271,
                0x999C: 0x5288,
                0x999D: 0x5291,
                0x999E: 0x8FA8,
                0x999F: 0x8FA7,
                0x99A0: 0x52AC,
                0x99A1: 0x52AD,
                0x99A2: 0x52BC,
                0x99A3: 0x52B5,
                0x99A4: 0x52C1,
                0x99A5: 0x52CD,
                0x99A6: 0x52D7,
                0x99A7: 0x52DE,
                0x99A8: 0x52E3,
                0x99A9: 0x52E6,
                0x99AA: 0x98ED,
                0x99AB: 0x52E0,
                0x99AC: 0x52F3,
                0x99AD: 0x52F5,
                0x99AE: 0x52F8,
                0x99AF: 0x52F9,
                0x99B0: 0x5306,
                0x99B1: 0x5308,
                0x99B2: 0x7538,
                0x99B3: 0x530D,
                0x99B4: 0x5310,
                0x99B5: 0x530F,
                0x99B6: 0x5315,
                0x99B7: 0x531A,
                0x99B8: 0x5323,
                0x99B9: 0x532F,
                0x99BA: 0x5331,
                0x99BB: 0x5333,
                0x99BC: 0x5338,
                0x99BD: 0x5340,
                0x99BE: 0x5346,
                0x99BF: 0x5345,
                0x99C0: 0x4E17,
                0x99C1: 0x5349,
                0x99C2: 0x534D,
                0x99C3: 0x51D6,
                0x99C4: 0x535E,
                0x99C5: 0x5369,
                0x99C6: 0x536E,
                0x99C7: 0x5918,
                0x99C8: 0x537B,
                0x99C9: 0x5377,
                0x99CA: 0x5382,
                0x99CB: 0x5396,
                0x99CC: 0x53A0,
                0x99CD: 0x53A6,
                0x99CE: 0x53A5,
                0x99CF: 0x53AE,
                0x99D0: 0x53B0,
                0x99D1: 0x53B6,
                0x99D2: 0x53C3,
                0x99D3: 0x7C12,
                0x99D4: 0x96D9,
                0x99D5: 0x53DF,
                0x99D6: 0x66FC,
                0x99D7: 0x71EE,
                0x99D8: 0x53EE,
                0x99D9: 0x53E8,
                0x99DA: 0x53ED,
                0x99DB: 0x53FA,
                0x99DC: 0x5401,
                0x99DD: 0x543D,
                0x99DE: 0x5440,
                0x99DF: 0x542C,
                0x99E0: 0x542D,
                0x99E1: 0x543C,
                0x99E2: 0x542E,
                0x99E3: 0x5436,
                0x99E4: 0x5429,
                0x99E5: 0x541D,
                0x99E6: 0x544E,
                0x99E7: 0x548F,
                0x99E8: 0x5475,
                0x99E9: 0x548E,
                0x99EA: 0x545F,
                0x99EB: 0x5471,
                0x99EC: 0x5477,
                0x99ED: 0x5470,
                0x99EE: 0x5492,
                0x99EF: 0x547B,
                0x99F0: 0x5480,
                0x99F1: 0x5476,
                0x99F2: 0x5484,
                0x99F3: 0x5490,
                0x99F4: 0x5486,
                0x99F5: 0x54C7,
                0x99F6: 0x54A2,
                0x99F7: 0x54B8,
                0x99F8: 0x54A5,
                0x99F9: 0x54AC,
                0x99FA: 0x54C4,
                0x99FB: 0x54C8,
                0x99FC: 0x54A8,
                0x9A40: 0x54AB,
                0x9A41: 0x54C2,
                0x9A42: 0x54A4,
                0x9A43: 0x54BE,
                0x9A44: 0x54BC,
                0x9A45: 0x54D8,
                0x9A46: 0x54E5,
                0x9A47: 0x54E6,
                0x9A48: 0x550F,
                0x9A49: 0x5514,
                0x9A4A: 0x54FD,
                0x9A4B: 0x54EE,
                0x9A4C: 0x54ED,
                0x9A4D: 0x54FA,
                0x9A4E: 0x54E2,
                0x9A4F: 0x5539,
                0x9A50: 0x5540,
                0x9A51: 0x5563,
                0x9A52: 0x554C,
                0x9A53: 0x552E,
                0x9A54: 0x555C,
                0x9A55: 0x5545,
                0x9A56: 0x5556,
                0x9A57: 0x5557,
                0x9A58: 0x5538,
                0x9A59: 0x5533,
                0x9A5A: 0x555D,
                0x9A5B: 0x5599,
                0x9A5C: 0x5580,
                0x9A5D: 0x54AF,
                0x9A5E: 0x558A,
                0x9A5F: 0x559F,
                0x9A60: 0x557B,
                0x9A61: 0x557E,
                0x9A62: 0x5598,
                0x9A63: 0x559E,
                0x9A64: 0x55AE,
                0x9A65: 0x557C,
                0x9A66: 0x5583,
                0x9A67: 0x55A9,
                0x9A68: 0x5587,
                0x9A69: 0x55A8,
                0x9A6A: 0x55DA,
                0x9A6B: 0x55C5,
                0x9A6C: 0x55DF,
                0x9A6D: 0x55C4,
                0x9A6E: 0x55DC,
                0x9A6F: 0x55E4,
                0x9A70: 0x55D4,
                0x9A71: 0x5614,
                0x9A72: 0x55F7,
                0x9A73: 0x5616,
                0x9A74: 0x55FE,
                0x9A75: 0x55FD,
                0x9A76: 0x561B,
                0x9A77: 0x55F9,
                0x9A78: 0x564E,
                0x9A79: 0x5650,
                0x9A7A: 0x71DF,
                0x9A7B: 0x5634,
                0x9A7C: 0x5636,
                0x9A7D: 0x5632,
                0x9A7E: 0x5638,
                0x9A80: 0x566B,
                0x9A81: 0x5664,
                0x9A82: 0x562F,
                0x9A83: 0x566C,
                0x9A84: 0x566A,
                0x9A85: 0x5686,
                0x9A86: 0x5680,
                0x9A87: 0x568A,
                0x9A88: 0x56A0,
                0x9A89: 0x5694,
                0x9A8A: 0x568F,
                0x9A8B: 0x56A5,
                0x9A8C: 0x56AE,
                0x9A8D: 0x56B6,
                0x9A8E: 0x56B4,
                0x9A8F: 0x56C2,
                0x9A90: 0x56BC,
                0x9A91: 0x56C1,
                0x9A92: 0x56C3,
                0x9A93: 0x56C0,
                0x9A94: 0x56C8,
                0x9A95: 0x56CE,
                0x9A96: 0x56D1,
                0x9A97: 0x56D3,
                0x9A98: 0x56D7,
                0x9A99: 0x56EE,
                0x9A9A: 0x56F9,
                0x9A9B: 0x5700,
                0x9A9C: 0x56FF,
                0x9A9D: 0x5704,
                0x9A9E: 0x5709,
                0x9A9F: 0x5708,
                0x9AA0: 0x570B,
                0x9AA1: 0x570D,
                0x9AA2: 0x5713,
                0x9AA3: 0x5718,
                0x9AA4: 0x5716,
                0x9AA5: 0x55C7,
                0x9AA6: 0x571C,
                0x9AA7: 0x5726,
                0x9AA8: 0x5737,
                0x9AA9: 0x5738,
                0x9AAA: 0x574E,
                0x9AAB: 0x573B,
                0x9AAC: 0x5740,
                0x9AAD: 0x574F,
                0x9AAE: 0x5769,
                0x9AAF: 0x57C0,
                0x9AB0: 0x5788,
                0x9AB1: 0x5761,
                0x9AB2: 0x577F,
                0x9AB3: 0x5789,
                0x9AB4: 0x5793,
                0x9AB5: 0x57A0,
                0x9AB6: 0x57B3,
                0x9AB7: 0x57A4,
                0x9AB8: 0x57AA,
                0x9AB9: 0x57B0,
                0x9ABA: 0x57C3,
                0x9ABB: 0x57C6,
                0x9ABC: 0x57D4,
                0x9ABD: 0x57D2,
                0x9ABE: 0x57D3,
                0x9ABF: 0x580A,
                0x9AC0: 0x57D6,
                0x9AC1: 0x57E3,
                0x9AC2: 0x580B,
                0x9AC3: 0x5819,
                0x9AC4: 0x581D,
                0x9AC5: 0x5872,
                0x9AC6: 0x5821,
                0x9AC7: 0x5862,
                0x9AC8: 0x584B,
                0x9AC9: 0x5870,
                0x9ACA: 0x6BC0,
                0x9ACB: 0x5852,
                0x9ACC: 0x583D,
                0x9ACD: 0x5879,
                0x9ACE: 0x5885,
                0x9ACF: 0x58B9,
                0x9AD0: 0x589F,
                0x9AD1: 0x58AB,
                0x9AD2: 0x58BA,
                0x9AD3: 0x58DE,
                0x9AD4: 0x58BB,
                0x9AD5: 0x58B8,
                0x9AD6: 0x58AE,
                0x9AD7: 0x58C5,
                0x9AD8: 0x58D3,
                0x9AD9: 0x58D1,
                0x9ADA: 0x58D7,
                0x9ADB: 0x58D9,
                0x9ADC: 0x58D8,
                0x9ADD: 0x58E5,
                0x9ADE: 0x58DC,
                0x9ADF: 0x58E4,
                0x9AE0: 0x58DF,
                0x9AE1: 0x58EF,
                0x9AE2: 0x58FA,
                0x9AE3: 0x58F9,
                0x9AE4: 0x58FB,
                0x9AE5: 0x58FC,
                0x9AE6: 0x58FD,
                0x9AE7: 0x5902,
                0x9AE8: 0x590A,
                0x9AE9: 0x5910,
                0x9AEA: 0x591B,
                0x9AEB: 0x68A6,
                0x9AEC: 0x5925,
                0x9AED: 0x592C,
                0x9AEE: 0x592D,
                0x9AEF: 0x5932,
                0x9AF0: 0x5938,
                0x9AF1: 0x593E,
                0x9AF2: 0x7AD2,
                0x9AF3: 0x5955,
                0x9AF4: 0x5950,
                0x9AF5: 0x594E,
                0x9AF6: 0x595A,
                0x9AF7: 0x5958,
                0x9AF8: 0x5962,
                0x9AF9: 0x5960,
                0x9AFA: 0x5967,
                0x9AFB: 0x596C,
                0x9AFC: 0x5969,
                0x9B40: 0x5978,
                0x9B41: 0x5981,
                0x9B42: 0x599D,
                0x9B43: 0x4F5E,
                0x9B44: 0x4FAB,
                0x9B45: 0x59A3,
                0x9B46: 0x59B2,
                0x9B47: 0x59C6,
                0x9B48: 0x59E8,
                0x9B49: 0x59DC,
                0x9B4A: 0x598D,
                0x9B4B: 0x59D9,
                0x9B4C: 0x59DA,
                0x9B4D: 0x5A25,
                0x9B4E: 0x5A1F,
                0x9B4F: 0x5A11,
                0x9B50: 0x5A1C,
                0x9B51: 0x5A09,
                0x9B52: 0x5A1A,
                0x9B53: 0x5A40,
                0x9B54: 0x5A6C,
                0x9B55: 0x5A49,
                0x9B56: 0x5A35,
                0x9B57: 0x5A36,
                0x9B58: 0x5A62,
                0x9B59: 0x5A6A,
                0x9B5A: 0x5A9A,
                0x9B5B: 0x5ABC,
                0x9B5C: 0x5ABE,
                0x9B5D: 0x5ACB,
                0x9B5E: 0x5AC2,
                0x9B5F: 0x5ABD,
                0x9B60: 0x5AE3,
                0x9B61: 0x5AD7,
                0x9B62: 0x5AE6,
                0x9B63: 0x5AE9,
                0x9B64: 0x5AD6,
                0x9B65: 0x5AFA,
                0x9B66: 0x5AFB,
                0x9B67: 0x5B0C,
                0x9B68: 0x5B0B,
                0x9B69: 0x5B16,
                0x9B6A: 0x5B32,
                0x9B6B: 0x5AD0,
                0x9B6C: 0x5B2A,
                0x9B6D: 0x5B36,
                0x9B6E: 0x5B3E,
                0x9B6F: 0x5B43,
                0x9B70: 0x5B45,
                0x9B71: 0x5B40,
                0x9B72: 0x5B51,
                0x9B73: 0x5B55,
                0x9B74: 0x5B5A,
                0x9B75: 0x5B5B,
                0x9B76: 0x5B65,
                0x9B77: 0x5B69,
                0x9B78: 0x5B70,
                0x9B79: 0x5B73,
                0x9B7A: 0x5B75,
                0x9B7B: 0x5B78,
                0x9B7C: 0x6588,
                0x9B7D: 0x5B7A,
                0x9B7E: 0x5B80,
                0x9B80: 0x5B83,
                0x9B81: 0x5BA6,
                0x9B82: 0x5BB8,
                0x9B83: 0x5BC3,
                0x9B84: 0x5BC7,
                0x9B85: 0x5BC9,
                0x9B86: 0x5BD4,
                0x9B87: 0x5BD0,
                0x9B88: 0x5BE4,
                0x9B89: 0x5BE6,
                0x9B8A: 0x5BE2,
                0x9B8B: 0x5BDE,
                0x9B8C: 0x5BE5,
                0x9B8D: 0x5BEB,
                0x9B8E: 0x5BF0,
                0x9B8F: 0x5BF6,
                0x9B90: 0x5BF3,
                0x9B91: 0x5C05,
                0x9B92: 0x5C07,
                0x9B93: 0x5C08,
                0x9B94: 0x5C0D,
                0x9B95: 0x5C13,
                0x9B96: 0x5C20,
                0x9B97: 0x5C22,
                0x9B98: 0x5C28,
                0x9B99: 0x5C38,
                0x9B9A: 0x5C39,
                0x9B9B: 0x5C41,
                0x9B9C: 0x5C46,
                0x9B9D: 0x5C4E,
                0x9B9E: 0x5C53,
                0x9B9F: 0x5C50,
                0x9BA0: 0x5C4F,
                0x9BA1: 0x5B71,
                0x9BA2: 0x5C6C,
                0x9BA3: 0x5C6E,
                0x9BA4: 0x4E62,
                0x9BA5: 0x5C76,
                0x9BA6: 0x5C79,
                0x9BA7: 0x5C8C,
                0x9BA8: 0x5C91,
                0x9BA9: 0x5C94,
                0x9BAA: 0x599B,
                0x9BAB: 0x5CAB,
                0x9BAC: 0x5CBB,
                0x9BAD: 0x5CB6,
                0x9BAE: 0x5CBC,
                0x9BAF: 0x5CB7,
                0x9BB0: 0x5CC5,
                0x9BB1: 0x5CBE,
                0x9BB2: 0x5CC7,
                0x9BB3: 0x5CD9,
                0x9BB4: 0x5CE9,
                0x9BB5: 0x5CFD,
                0x9BB6: 0x5CFA,
                0x9BB7: 0x5CED,
                0x9BB8: 0x5D8C,
                0x9BB9: 0x5CEA,
                0x9BBA: 0x5D0B,
                0x9BBB: 0x5D15,
                0x9BBC: 0x5D17,
                0x9BBD: 0x5D5C,
                0x9BBE: 0x5D1F,
                0x9BBF: 0x5D1B,
                0x9BC0: 0x5D11,
                0x9BC1: 0x5D14,
                0x9BC2: 0x5D22,
                0x9BC3: 0x5D1A,
                0x9BC4: 0x5D19,
                0x9BC5: 0x5D18,
                0x9BC6: 0x5D4C,
                0x9BC7: 0x5D52,
                0x9BC8: 0x5D4E,
                0x9BC9: 0x5D4B,
                0x9BCA: 0x5D6C,
                0x9BCB: 0x5D73,
                0x9BCC: 0x5D76,
                0x9BCD: 0x5D87,
                0x9BCE: 0x5D84,
                0x9BCF: 0x5D82,
                0x9BD0: 0x5DA2,
                0x9BD1: 0x5D9D,
                0x9BD2: 0x5DAC,
                0x9BD3: 0x5DAE,
                0x9BD4: 0x5DBD,
                0x9BD5: 0x5D90,
                0x9BD6: 0x5DB7,
                0x9BD7: 0x5DBC,
                0x9BD8: 0x5DC9,
                0x9BD9: 0x5DCD,
                0x9BDA: 0x5DD3,
                0x9BDB: 0x5DD2,
                0x9BDC: 0x5DD6,
                0x9BDD: 0x5DDB,
                0x9BDE: 0x5DEB,
                0x9BDF: 0x5DF2,
                0x9BE0: 0x5DF5,
                0x9BE1: 0x5E0B,
                0x9BE2: 0x5E1A,
                0x9BE3: 0x5E19,
                0x9BE4: 0x5E11,
                0x9BE5: 0x5E1B,
                0x9BE6: 0x5E36,
                0x9BE7: 0x5E37,
                0x9BE8: 0x5E44,
                0x9BE9: 0x5E43,
                0x9BEA: 0x5E40,
                0x9BEB: 0x5E4E,
                0x9BEC: 0x5E57,
                0x9BED: 0x5E54,
                0x9BEE: 0x5E5F,
                0x9BEF: 0x5E62,
                0x9BF0: 0x5E64,
                0x9BF1: 0x5E47,
                0x9BF2: 0x5E75,
                0x9BF3: 0x5E76,
                0x9BF4: 0x5E7A,
                0x9BF5: 0x9EBC,
                0x9BF6: 0x5E7F,
                0x9BF7: 0x5EA0,
                0x9BF8: 0x5EC1,
                0x9BF9: 0x5EC2,
                0x9BFA: 0x5EC8,
                0x9BFB: 0x5ED0,
                0x9BFC: 0x5ECF,
                0x9C40: 0x5ED6,
                0x9C41: 0x5EE3,
                0x9C42: 0x5EDD,
                0x9C43: 0x5EDA,
                0x9C44: 0x5EDB,
                0x9C45: 0x5EE2,
                0x9C46: 0x5EE1,
                0x9C47: 0x5EE8,
                0x9C48: 0x5EE9,
                0x9C49: 0x5EEC,
                0x9C4A: 0x5EF1,
                0x9C4B: 0x5EF3,
                0x9C4C: 0x5EF0,
                0x9C4D: 0x5EF4,
                0x9C4E: 0x5EF8,
                0x9C4F: 0x5EFE,
                0x9C50: 0x5F03,
                0x9C51: 0x5F09,
                0x9C52: 0x5F5D,
                0x9C53: 0x5F5C,
                0x9C54: 0x5F0B,
                0x9C55: 0x5F11,
                0x9C56: 0x5F16,
                0x9C57: 0x5F29,
                0x9C58: 0x5F2D,
                0x9C59: 0x5F38,
                0x9C5A: 0x5F41,
                0x9C5B: 0x5F48,
                0x9C5C: 0x5F4C,
                0x9C5D: 0x5F4E,
                0x9C5E: 0x5F2F,
                0x9C5F: 0x5F51,
                0x9C60: 0x5F56,
                0x9C61: 0x5F57,
                0x9C62: 0x5F59,
                0x9C63: 0x5F61,
                0x9C64: 0x5F6D,
                0x9C65: 0x5F73,
                0x9C66: 0x5F77,
                0x9C67: 0x5F83,
                0x9C68: 0x5F82,
                0x9C69: 0x5F7F,
                0x9C6A: 0x5F8A,
                0x9C6B: 0x5F88,
                0x9C6C: 0x5F91,
                0x9C6D: 0x5F87,
                0x9C6E: 0x5F9E,
                0x9C6F: 0x5F99,
                0x9C70: 0x5F98,
                0x9C71: 0x5FA0,
                0x9C72: 0x5FA8,
                0x9C73: 0x5FAD,
                0x9C74: 0x5FBC,
                0x9C75: 0x5FD6,
                0x9C76: 0x5FFB,
                0x9C77: 0x5FE4,
                0x9C78: 0x5FF8,
                0x9C79: 0x5FF1,
                0x9C7A: 0x5FDD,
                0x9C7B: 0x60B3,
                0x9C7C: 0x5FFF,
                0x9C7D: 0x6021,
                0x9C7E: 0x6060,
                0x9C80: 0x6019,
                0x9C81: 0x6010,
                0x9C82: 0x6029,
                0x9C83: 0x600E,
                0x9C84: 0x6031,
                0x9C85: 0x601B,
                0x9C86: 0x6015,
                0x9C87: 0x602B,
                0x9C88: 0x6026,
                0x9C89: 0x600F,
                0x9C8A: 0x603A,
                0x9C8B: 0x605A,
                0x9C8C: 0x6041,
                0x9C8D: 0x606A,
                0x9C8E: 0x6077,
                0x9C8F: 0x605F,
                0x9C90: 0x604A,
                0x9C91: 0x6046,
                0x9C92: 0x604D,
                0x9C93: 0x6063,
                0x9C94: 0x6043,
                0x9C95: 0x6064,
                0x9C96: 0x6042,
                0x9C97: 0x606C,
                0x9C98: 0x606B,
                0x9C99: 0x6059,
                0x9C9A: 0x6081,
                0x9C9B: 0x608D,
                0x9C9C: 0x60E7,
                0x9C9D: 0x6083,
                0x9C9E: 0x609A,
                0x9C9F: 0x6084,
                0x9CA0: 0x609B,
                0x9CA1: 0x6096,
                0x9CA2: 0x6097,
                0x9CA3: 0x6092,
                0x9CA4: 0x60A7,
                0x9CA5: 0x608B,
                0x9CA6: 0x60E1,
                0x9CA7: 0x60B8,
                0x9CA8: 0x60E0,
                0x9CA9: 0x60D3,
                0x9CAA: 0x60B4,
                0x9CAB: 0x5FF0,
                0x9CAC: 0x60BD,
                0x9CAD: 0x60C6,
                0x9CAE: 0x60B5,
                0x9CAF: 0x60D8,
                0x9CB0: 0x614D,
                0x9CB1: 0x6115,
                0x9CB2: 0x6106,
                0x9CB3: 0x60F6,
                0x9CB4: 0x60F7,
                0x9CB5: 0x6100,
                0x9CB6: 0x60F4,
                0x9CB7: 0x60FA,
                0x9CB8: 0x6103,
                0x9CB9: 0x6121,
                0x9CBA: 0x60FB,
                0x9CBB: 0x60F1,
                0x9CBC: 0x610D,
                0x9CBD: 0x610E,
                0x9CBE: 0x6147,
                0x9CBF: 0x613E,
                0x9CC0: 0x6128,
                0x9CC1: 0x6127,
                0x9CC2: 0x614A,
                0x9CC3: 0x613F,
                0x9CC4: 0x613C,
                0x9CC5: 0x612C,
                0x9CC6: 0x6134,
                0x9CC7: 0x613D,
                0x9CC8: 0x6142,
                0x9CC9: 0x6144,
                0x9CCA: 0x6173,
                0x9CCB: 0x6177,
                0x9CCC: 0x6158,
                0x9CCD: 0x6159,
                0x9CCE: 0x615A,
                0x9CCF: 0x616B,
                0x9CD0: 0x6174,
                0x9CD1: 0x616F,
                0x9CD2: 0x6165,
                0x9CD3: 0x6171,
                0x9CD4: 0x615F,
                0x9CD5: 0x615D,
                0x9CD6: 0x6153,
                0x9CD7: 0x6175,
                0x9CD8: 0x6199,
                0x9CD9: 0x6196,
                0x9CDA: 0x6187,
                0x9CDB: 0x61AC,
                0x9CDC: 0x6194,
                0x9CDD: 0x619A,
                0x9CDE: 0x618A,
                0x9CDF: 0x6191,
                0x9CE0: 0x61AB,
                0x9CE1: 0x61AE,
                0x9CE2: 0x61CC,
                0x9CE3: 0x61CA,
                0x9CE4: 0x61C9,
                0x9CE5: 0x61F7,
                0x9CE6: 0x61C8,
                0x9CE7: 0x61C3,
                0x9CE8: 0x61C6,
                0x9CE9: 0x61BA,
                0x9CEA: 0x61CB,
                0x9CEB: 0x7F79,
                0x9CEC: 0x61CD,
                0x9CED: 0x61E6,
                0x9CEE: 0x61E3,
                0x9CEF: 0x61F6,
                0x9CF0: 0x61FA,
                0x9CF1: 0x61F4,
                0x9CF2: 0x61FF,
                0x9CF3: 0x61FD,
                0x9CF4: 0x61FC,
                0x9CF5: 0x61FE,
                0x9CF6: 0x6200,
                0x9CF7: 0x6208,
                0x9CF8: 0x6209,
                0x9CF9: 0x620D,
                0x9CFA: 0x620C,
                0x9CFB: 0x6214,
                0x9CFC: 0x621B,
                0x9D40: 0x621E,
                0x9D41: 0x6221,
                0x9D42: 0x622A,
                0x9D43: 0x622E,
                0x9D44: 0x6230,
                0x9D45: 0x6232,
                0x9D46: 0x6233,
                0x9D47: 0x6241,
                0x9D48: 0x624E,
                0x9D49: 0x625E,
                0x9D4A: 0x6263,
                0x9D4B: 0x625B,
                0x9D4C: 0x6260,
                0x9D4D: 0x6268,
                0x9D4E: 0x627C,
                0x9D4F: 0x6282,
                0x9D50: 0x6289,
                0x9D51: 0x627E,
                0x9D52: 0x6292,
                0x9D53: 0x6293,
                0x9D54: 0x6296,
                0x9D55: 0x62D4,
                0x9D56: 0x6283,
                0x9D57: 0x6294,
                0x9D58: 0x62D7,
                0x9D59: 0x62D1,
                0x9D5A: 0x62BB,
                0x9D5B: 0x62CF,
                0x9D5C: 0x62FF,
                0x9D5D: 0x62C6,
                0x9D5E: 0x64D4,
                0x9D5F: 0x62C8,
                0x9D60: 0x62DC,
                0x9D61: 0x62CC,
                0x9D62: 0x62CA,
                0x9D63: 0x62C2,
                0x9D64: 0x62C7,
                0x9D65: 0x629B,
                0x9D66: 0x62C9,
                0x9D67: 0x630C,
                0x9D68: 0x62EE,
                0x9D69: 0x62F1,
                0x9D6A: 0x6327,
                0x9D6B: 0x6302,
                0x9D6C: 0x6308,
                0x9D6D: 0x62EF,
                0x9D6E: 0x62F5,
                0x9D6F: 0x6350,
                0x9D70: 0x633E,
                0x9D71: 0x634D,
                0x9D72: 0x641C,
                0x9D73: 0x634F,
                0x9D74: 0x6396,
                0x9D75: 0x638E,
                0x9D76: 0x6380,
                0x9D77: 0x63AB,
                0x9D78: 0x6376,
                0x9D79: 0x63A3,
                0x9D7A: 0x638F,
                0x9D7B: 0x6389,
                0x9D7C: 0x639F,
                0x9D7D: 0x63B5,
                0x9D7E: 0x636B,
                0x9D80: 0x6369,
                0x9D81: 0x63BE,
                0x9D82: 0x63E9,
                0x9D83: 0x63C0,
                0x9D84: 0x63C6,
                0x9D85: 0x63E3,
                0x9D86: 0x63C9,
                0x9D87: 0x63D2,
                0x9D88: 0x63F6,
                0x9D89: 0x63C4,
                0x9D8A: 0x6416,
                0x9D8B: 0x6434,
                0x9D8C: 0x6406,
                0x9D8D: 0x6413,
                0x9D8E: 0x6426,
                0x9D8F: 0x6436,
                0x9D90: 0x651D,
                0x9D91: 0x6417,
                0x9D92: 0x6428,
                0x9D93: 0x640F,
                0x9D94: 0x6467,
                0x9D95: 0x646F,
                0x9D96: 0x6476,
                0x9D97: 0x644E,
                0x9D98: 0x652A,
                0x9D99: 0x6495,
                0x9D9A: 0x6493,
                0x9D9B: 0x64A5,
                0x9D9C: 0x64A9,
                0x9D9D: 0x6488,
                0x9D9E: 0x64BC,
                0x9D9F: 0x64DA,
                0x9DA0: 0x64D2,
                0x9DA1: 0x64C5,
                0x9DA2: 0x64C7,
                0x9DA3: 0x64BB,
                0x9DA4: 0x64D8,
                0x9DA5: 0x64C2,
                0x9DA6: 0x64F1,
                0x9DA7: 0x64E7,
                0x9DA8: 0x8209,
                0x9DA9: 0x64E0,
                0x9DAA: 0x64E1,
                0x9DAB: 0x62AC,
                0x9DAC: 0x64E3,
                0x9DAD: 0x64EF,
                0x9DAE: 0x652C,
                0x9DAF: 0x64F6,
                0x9DB0: 0x64F4,
                0x9DB1: 0x64F2,
                0x9DB2: 0x64FA,
                0x9DB3: 0x6500,
                0x9DB4: 0x64FD,
                0x9DB5: 0x6518,
                0x9DB6: 0x651C,
                0x9DB7: 0x6505,
                0x9DB8: 0x6524,
                0x9DB9: 0x6523,
                0x9DBA: 0x652B,
                0x9DBB: 0x6534,
                0x9DBC: 0x6535,
                0x9DBD: 0x6537,
                0x9DBE: 0x6536,
                0x9DBF: 0x6538,
                0x9DC0: 0x754B,
                0x9DC1: 0x6548,
                0x9DC2: 0x6556,
                0x9DC3: 0x6555,
                0x9DC4: 0x654D,
                0x9DC5: 0x6558,
                0x9DC6: 0x655E,
                0x9DC7: 0x655D,
                0x9DC8: 0x6572,
                0x9DC9: 0x6578,
                0x9DCA: 0x6582,
                0x9DCB: 0x6583,
                0x9DCC: 0x8B8A,
                0x9DCD: 0x659B,
                0x9DCE: 0x659F,
                0x9DCF: 0x65AB,
                0x9DD0: 0x65B7,
                0x9DD1: 0x65C3,
                0x9DD2: 0x65C6,
                0x9DD3: 0x65C1,
                0x9DD4: 0x65C4,
                0x9DD5: 0x65CC,
                0x9DD6: 0x65D2,
                0x9DD7: 0x65DB,
                0x9DD8: 0x65D9,
                0x9DD9: 0x65E0,
                0x9DDA: 0x65E1,
                0x9DDB: 0x65F1,
                0x9DDC: 0x6772,
                0x9DDD: 0x660A,
                0x9DDE: 0x6603,
                0x9DDF: 0x65FB,
                0x9DE0: 0x6773,
                0x9DE1: 0x6635,
                0x9DE2: 0x6636,
                0x9DE3: 0x6634,
                0x9DE4: 0x661C,
                0x9DE5: 0x664F,
                0x9DE6: 0x6644,
                0x9DE7: 0x6649,
                0x9DE8: 0x6641,
                0x9DE9: 0x665E,
                0x9DEA: 0x665D,
                0x9DEB: 0x6664,
                0x9DEC: 0x6667,
                0x9DED: 0x6668,
                0x9DEE: 0x665F,
                0x9DEF: 0x6662,
                0x9DF0: 0x6670,
                0x9DF1: 0x6683,
                0x9DF2: 0x6688,
                0x9DF3: 0x668E,
                0x9DF4: 0x6689,
                0x9DF5: 0x6684,
                0x9DF6: 0x6698,
                0x9DF7: 0x669D,
                0x9DF8: 0x66C1,
                0x9DF9: 0x66B9,
                0x9DFA: 0x66C9,
                0x9DFB: 0x66BE,
                0x9DFC: 0x66BC,
                0x9E40: 0x66C4,
                0x9E41: 0x66B8,
                0x9E42: 0x66D6,
                0x9E43: 0x66DA,
                0x9E44: 0x66E0,
                0x9E45: 0x663F,
                0x9E46: 0x66E6,
                0x9E47: 0x66E9,
                0x9E48: 0x66F0,
                0x9E49: 0x66F5,
                0x9E4A: 0x66F7,
                0x9E4B: 0x670F,
                0x9E4C: 0x6716,
                0x9E4D: 0x671E,
                0x9E4E: 0x6726,
                0x9E4F: 0x6727,
                0x9E50: 0x9738,
                0x9E51: 0x672E,
                0x9E52: 0x673F,
                0x9E53: 0x6736,
                0x9E54: 0x6741,
                0x9E55: 0x6738,
                0x9E56: 0x6737,
                0x9E57: 0x6746,
                0x9E58: 0x675E,
                0x9E59: 0x6760,
                0x9E5A: 0x6759,
                0x9E5B: 0x6763,
                0x9E5C: 0x6764,
                0x9E5D: 0x6789,
                0x9E5E: 0x6770,
                0x9E5F: 0x67A9,
                0x9E60: 0x677C,
                0x9E61: 0x676A,
                0x9E62: 0x678C,
                0x9E63: 0x678B,
                0x9E64: 0x67A6,
                0x9E65: 0x67A1,
                0x9E66: 0x6785,
                0x9E67: 0x67B7,
                0x9E68: 0x67EF,
                0x9E69: 0x67B4,
                0x9E6A: 0x67EC,
                0x9E6B: 0x67B3,
                0x9E6C: 0x67E9,
                0x9E6D: 0x67B8,
                0x9E6E: 0x67E4,
                0x9E6F: 0x67DE,
                0x9E70: 0x67DD,
                0x9E71: 0x67E2,
                0x9E72: 0x67EE,
                0x9E73: 0x67B9,
                0x9E74: 0x67CE,
                0x9E75: 0x67C6,
                0x9E76: 0x67E7,
                0x9E77: 0x6A9C,
                0x9E78: 0x681E,
                0x9E79: 0x6846,
                0x9E7A: 0x6829,
                0x9E7B: 0x6840,
                0x9E7C: 0x684D,
                0x9E7D: 0x6832,
                0x9E7E: 0x684E,
                0x9E80: 0x68B3,
                0x9E81: 0x682B,
                0x9E82: 0x6859,
                0x9E83: 0x6863,
                0x9E84: 0x6877,
                0x9E85: 0x687F,
                0x9E86: 0x689F,
                0x9E87: 0x688F,
                0x9E88: 0x68AD,
                0x9E89: 0x6894,
                0x9E8A: 0x689D,
                0x9E8B: 0x689B,
                0x9E8C: 0x6883,
                0x9E8D: 0x6AAE,
                0x9E8E: 0x68B9,
                0x9E8F: 0x6874,
                0x9E90: 0x68B5,
                0x9E91: 0x68A0,
                0x9E92: 0x68BA,
                0x9E93: 0x690F,
                0x9E94: 0x688D,
                0x9E95: 0x687E,
                0x9E96: 0x6901,
                0x9E97: 0x68CA,
                0x9E98: 0x6908,
                0x9E99: 0x68D8,
                0x9E9A: 0x6922,
                0x9E9B: 0x6926,
                0x9E9C: 0x68E1,
                0x9E9D: 0x690C,
                0x9E9E: 0x68CD,
                0x9E9F: 0x68D4,
                0x9EA0: 0x68E7,
                0x9EA1: 0x68D5,
                0x9EA2: 0x6936,
                0x9EA3: 0x6912,
                0x9EA4: 0x6904,
                0x9EA5: 0x68D7,
                0x9EA6: 0x68E3,
                0x9EA7: 0x6925,
                0x9EA8: 0x68F9,
                0x9EA9: 0x68E0,
                0x9EAA: 0x68EF,
                0x9EAB: 0x6928,
                0x9EAC: 0x692A,
                0x9EAD: 0x691A,
                0x9EAE: 0x6923,
                0x9EAF: 0x6921,
                0x9EB0: 0x68C6,
                0x9EB1: 0x6979,
                0x9EB2: 0x6977,
                0x9EB3: 0x695C,
                0x9EB4: 0x6978,
                0x9EB5: 0x696B,
                0x9EB6: 0x6954,
                0x9EB7: 0x697E,
                0x9EB8: 0x696E,
                0x9EB9: 0x6939,
                0x9EBA: 0x6974,
                0x9EBB: 0x693D,
                0x9EBC: 0x6959,
                0x9EBD: 0x6930,
                0x9EBE: 0x6961,
                0x9EBF: 0x695E,
                0x9EC0: 0x695D,
                0x9EC1: 0x6981,
                0x9EC2: 0x696A,
                0x9EC3: 0x69B2,
                0x9EC4: 0x69AE,
                0x9EC5: 0x69D0,
                0x9EC6: 0x69BF,
                0x9EC7: 0x69C1,
                0x9EC8: 0x69D3,
                0x9EC9: 0x69BE,
                0x9ECA: 0x69CE,
                0x9ECB: 0x5BE8,
                0x9ECC: 0x69CA,
                0x9ECD: 0x69DD,
                0x9ECE: 0x69BB,
                0x9ECF: 0x69C3,
                0x9ED0: 0x69A7,
                0x9ED1: 0x6A2E,
                0x9ED2: 0x6991,
                0x9ED3: 0x69A0,
                0x9ED4: 0x699C,
                0x9ED5: 0x6995,
                0x9ED6: 0x69B4,
                0x9ED7: 0x69DE,
                0x9ED8: 0x69E8,
                0x9ED9: 0x6A02,
                0x9EDA: 0x6A1B,
                0x9EDB: 0x69FF,
                0x9EDC: 0x6B0A,
                0x9EDD: 0x69F9,
                0x9EDE: 0x69F2,
                0x9EDF: 0x69E7,
                0x9EE0: 0x6A05,
                0x9EE1: 0x69B1,
                0x9EE2: 0x6A1E,
                0x9EE3: 0x69ED,
                0x9EE4: 0x6A14,
                0x9EE5: 0x69EB,
                0x9EE6: 0x6A0A,
                0x9EE7: 0x6A12,
                0x9EE8: 0x6AC1,
                0x9EE9: 0x6A23,
                0x9EEA: 0x6A13,
                0x9EEB: 0x6A44,
                0x9EEC: 0x6A0C,
                0x9EED: 0x6A72,
                0x9EEE: 0x6A36,
                0x9EEF: 0x6A78,
                0x9EF0: 0x6A47,
                0x9EF1: 0x6A62,
                0x9EF2: 0x6A59,
                0x9EF3: 0x6A66,
                0x9EF4: 0x6A48,
                0x9EF5: 0x6A38,
                0x9EF6: 0x6A22,
                0x9EF7: 0x6A90,
                0x9EF8: 0x6A8D,
                0x9EF9: 0x6AA0,
                0x9EFA: 0x6A84,
                0x9EFB: 0x6AA2,
                0x9EFC: 0x6AA3,
                0x9F40: 0x6A97,
                0x9F41: 0x8617,
                0x9F42: 0x6ABB,
                0x9F43: 0x6AC3,
                0x9F44: 0x6AC2,
                0x9F45: 0x6AB8,
                0x9F46: 0x6AB3,
                0x9F47: 0x6AAC,
                0x9F48: 0x6ADE,
                0x9F49: 0x6AD1,
                0x9F4A: 0x6ADF,
                0x9F4B: 0x6AAA,
                0x9F4C: 0x6ADA,
                0x9F4D: 0x6AEA,
                0x9F4E: 0x6AFB,
                0x9F4F: 0x6B05,
                0x9F50: 0x8616,
                0x9F51: 0x6AFA,
                0x9F52: 0x6B12,
                0x9F53: 0x6B16,
                0x9F54: 0x9B31,
                0x9F55: 0x6B1F,
                0x9F56: 0x6B38,
                0x9F57: 0x6B37,
                0x9F58: 0x76DC,
                0x9F59: 0x6B39,
                0x9F5A: 0x98EE,
                0x9F5B: 0x6B47,
                0x9F5C: 0x6B43,
                0x9F5D: 0x6B49,
                0x9F5E: 0x6B50,
                0x9F5F: 0x6B59,
                0x9F60: 0x6B54,
                0x9F61: 0x6B5B,
                0x9F62: 0x6B5F,
                0x9F63: 0x6B61,
                0x9F64: 0x6B78,
                0x9F65: 0x6B79,
                0x9F66: 0x6B7F,
                0x9F67: 0x6B80,
                0x9F68: 0x6B84,
                0x9F69: 0x6B83,
                0x9F6A: 0x6B8D,
                0x9F6B: 0x6B98,
                0x9F6C: 0x6B95,
                0x9F6D: 0x6B9E,
                0x9F6E: 0x6BA4,
                0x9F6F: 0x6BAA,
                0x9F70: 0x6BAB,
                0x9F71: 0x6BAF,
                0x9F72: 0x6BB2,
                0x9F73: 0x6BB1,
                0x9F74: 0x6BB3,
                0x9F75: 0x6BB7,
                0x9F76: 0x6BBC,
                0x9F77: 0x6BC6,
                0x9F78: 0x6BCB,
                0x9F79: 0x6BD3,
                0x9F7A: 0x6BDF,
                0x9F7B: 0x6BEC,
                0x9F7C: 0x6BEB,
                0x9F7D: 0x6BF3,
                0x9F7E: 0x6BEF,
                0x9F80: 0x9EBE,
                0x9F81: 0x6C08,
                0x9F82: 0x6C13,
                0x9F83: 0x6C14,
                0x9F84: 0x6C1B,
                0x9F85: 0x6C24,
                0x9F86: 0x6C23,
                0x9F87: 0x6C5E,
                0x9F88: 0x6C55,
                0x9F89: 0x6C62,
                0x9F8A: 0x6C6A,
                0x9F8B: 0x6C82,
                0x9F8C: 0x6C8D,
                0x9F8D: 0x6C9A,
                0x9F8E: 0x6C81,
                0x9F8F: 0x6C9B,
                0x9F90: 0x6C7E,
                0x9F91: 0x6C68,
                0x9F92: 0x6C73,
                0x9F93: 0x6C92,
                0x9F94: 0x6C90,
                0x9F95: 0x6CC4,
                0x9F96: 0x6CF1,
                0x9F97: 0x6CD3,
                0x9F98: 0x6CBD,
                0x9F99: 0x6CD7,
                0x9F9A: 0x6CC5,
                0x9F9B: 0x6CDD,
                0x9F9C: 0x6CAE,
                0x9F9D: 0x6CB1,
                0x9F9E: 0x6CBE,
                0x9F9F: 0x6CBA,
                0x9FA0: 0x6CDB,
                0x9FA1: 0x6CEF,
                0x9FA2: 0x6CD9,
                0x9FA3: 0x6CEA,
                0x9FA4: 0x6D1F,
                0x9FA5: 0x884D,
                0x9FA6: 0x6D36,
                0x9FA7: 0x6D2B,
                0x9FA8: 0x6D3D,
                0x9FA9: 0x6D38,
                0x9FAA: 0x6D19,
                0x9FAB: 0x6D35,
                0x9FAC: 0x6D33,
                0x9FAD: 0x6D12,
                0x9FAE: 0x6D0C,
                0x9FAF: 0x6D63,
                0x9FB0: 0x6D93,
                0x9FB1: 0x6D64,
                0x9FB2: 0x6D5A,
                0x9FB3: 0x6D79,
                0x9FB4: 0x6D59,
                0x9FB5: 0x6D8E,
                0x9FB6: 0x6D95,
                0x9FB7: 0x6FE4,
                0x9FB8: 0x6D85,
                0x9FB9: 0x6DF9,
                0x9FBA: 0x6E15,
                0x9FBB: 0x6E0A,
                0x9FBC: 0x6DB5,
                0x9FBD: 0x6DC7,
                0x9FBE: 0x6DE6,
                0x9FBF: 0x6DB8,
                0x9FC0: 0x6DC6,
                0x9FC1: 0x6DEC,
                0x9FC2: 0x6DDE,
                0x9FC3: 0x6DCC,
                0x9FC4: 0x6DE8,
                0x9FC5: 0x6DD2,
                0x9FC6: 0x6DC5,
                0x9FC7: 0x6DFA,
                0x9FC8: 0x6DD9,
                0x9FC9: 0x6DE4,
                0x9FCA: 0x6DD5,
                0x9FCB: 0x6DEA,
                0x9FCC: 0x6DEE,
                0x9FCD: 0x6E2D,
                0x9FCE: 0x6E6E,
                0x9FCF: 0x6E2E,
                0x9FD0: 0x6E19,
                0x9FD1: 0x6E72,
                0x9FD2: 0x6E5F,
                0x9FD3: 0x6E3E,
                0x9FD4: 0x6E23,
                0x9FD5: 0x6E6B,
                0x9FD6: 0x6E2B,
                0x9FD7: 0x6E76,
                0x9FD8: 0x6E4D,
                0x9FD9: 0x6E1F,
                0x9FDA: 0x6E43,
                0x9FDB: 0x6E3A,
                0x9FDC: 0x6E4E,
                0x9FDD: 0x6E24,
                0x9FDE: 0x6EFF,
                0x9FDF: 0x6E1D,
                0x9FE0: 0x6E38,
                0x9FE1: 0x6E82,
                0x9FE2: 0x6EAA,
                0x9FE3: 0x6E98,
                0x9FE4: 0x6EC9,
                0x9FE5: 0x6EB7,
                0x9FE6: 0x6ED3,
                0x9FE7: 0x6EBD,
                0x9FE8: 0x6EAF,
                0x9FE9: 0x6EC4,
                0x9FEA: 0x6EB2,
                0x9FEB: 0x6ED4,
                0x9FEC: 0x6ED5,
                0x9FED: 0x6E8F,
                0x9FEE: 0x6EA5,
                0x9FEF: 0x6EC2,
                0x9FF0: 0x6E9F,
                0x9FF1: 0x6F41,
                0x9FF2: 0x6F11,
                0x9FF3: 0x704C,
                0x9FF4: 0x6EEC,
                0x9FF5: 0x6EF8,
                0x9FF6: 0x6EFE,
                0x9FF7: 0x6F3F,
                0x9FF8: 0x6EF2,
                0x9FF9: 0x6F31,
                0x9FFA: 0x6EEF,
                0x9FFB: 0x6F32,
                0x9FFC: 0x6ECC,
                0xA1: 0xFF61,
                0xA2: 0xFF62,
                0xA3: 0xFF63,
                0xA4: 0xFF64,
                0xA5: 0xFF65,
                0xA6: 0xFF66,
                0xA7: 0xFF67,
                0xA8: 0xFF68,
                0xA9: 0xFF69,
                0xAA: 0xFF6A,
                0xAB: 0xFF6B,
                0xAC: 0xFF6C,
                0xAD: 0xFF6D,
                0xAE: 0xFF6E,
                0xAF: 0xFF6F,
                0xB0: 0xFF70,
                0xB1: 0xFF71,
                0xB2: 0xFF72,
                0xB3: 0xFF73,
                0xB4: 0xFF74,
                0xB5: 0xFF75,
                0xB6: 0xFF76,
                0xB7: 0xFF77,
                0xB8: 0xFF78,
                0xB9: 0xFF79,
                0xBA: 0xFF7A,
                0xBB: 0xFF7B,
                0xBC: 0xFF7C,
                0xBD: 0xFF7D,
                0xBE: 0xFF7E,
                0xBF: 0xFF7F,
                0xC0: 0xFF80,
                0xC1: 0xFF81,
                0xC2: 0xFF82,
                0xC3: 0xFF83,
                0xC4: 0xFF84,
                0xC5: 0xFF85,
                0xC6: 0xFF86,
                0xC7: 0xFF87,
                0xC8: 0xFF88,
                0xC9: 0xFF89,
                0xCA: 0xFF8A,
                0xCB: 0xFF8B,
                0xCC: 0xFF8C,
                0xCD: 0xFF8D,
                0xCE: 0xFF8E,
                0xCF: 0xFF8F,
                0xD0: 0xFF90,
                0xD1: 0xFF91,
                0xD2: 0xFF92,
                0xD3: 0xFF93,
                0xD4: 0xFF94,
                0xD5: 0xFF95,
                0xD6: 0xFF96,
                0xD7: 0xFF97,
                0xD8: 0xFF98,
                0xD9: 0xFF99,
                0xDA: 0xFF9A,
                0xDB: 0xFF9B,
                0xDC: 0xFF9C,
                0xDD: 0xFF9D,
                0xDE: 0xFF9E,
                0xDF: 0xFF9F,
                0xE040: 0x6F3E,
                0xE041: 0x6F13,
                0xE042: 0x6EF7,
                0xE043: 0x6F86,
                0xE044: 0x6F7A,
                0xE045: 0x6F78,
                0xE046: 0x6F81,
                0xE047: 0x6F80,
                0xE048: 0x6F6F,
                0xE049: 0x6F5B,
                0xE04A: 0x6FF3,
                0xE04B: 0x6F6D,
                0xE04C: 0x6F82,
                0xE04D: 0x6F7C,
                0xE04E: 0x6F58,
                0xE04F: 0x6F8E,
                0xE050: 0x6F91,
                0xE051: 0x6FC2,
                0xE052: 0x6F66,
                0xE053: 0x6FB3,
                0xE054: 0x6FA3,
                0xE055: 0x6FA1,
                0xE056: 0x6FA4,
                0xE057: 0x6FB9,
                0xE058: 0x6FC6,
                0xE059: 0x6FAA,
                0xE05A: 0x6FDF,
                0xE05B: 0x6FD5,
                0xE05C: 0x6FEC,
                0xE05D: 0x6FD4,
                0xE05E: 0x6FD8,
                0xE05F: 0x6FF1,
                0xE060: 0x6FEE,
                0xE061: 0x6FDB,
                0xE062: 0x7009,
                0xE063: 0x700B,
                0xE064: 0x6FFA,
                0xE065: 0x7011,
                0xE066: 0x7001,
                0xE067: 0x700F,
                0xE068: 0x6FFE,
                0xE069: 0x701B,
                0xE06A: 0x701A,
                0xE06B: 0x6F74,
                0xE06C: 0x701D,
                0xE06D: 0x7018,
                0xE06E: 0x701F,
                0xE06F: 0x7030,
                0xE070: 0x703E,
                0xE071: 0x7032,
                0xE072: 0x7051,
                0xE073: 0x7063,
                0xE074: 0x7099,
                0xE075: 0x7092,
                0xE076: 0x70AF,
                0xE077: 0x70F1,
                0xE078: 0x70AC,
                0xE079: 0x70B8,
                0xE07A: 0x70B3,
                0xE07B: 0x70AE,
                0xE07C: 0x70DF,
                0xE07D: 0x70CB,
                0xE07E: 0x70DD,
                0xE080: 0x70D9,
                0xE081: 0x7109,
                0xE082: 0x70FD,
                0xE083: 0x711C,
                0xE084: 0x7119,
                0xE085: 0x7165,
                0xE086: 0x7155,
                0xE087: 0x7188,
                0xE088: 0x7166,
                0xE089: 0x7162,
                0xE08A: 0x714C,
                0xE08B: 0x7156,
                0xE08C: 0x716C,
                0xE08D: 0x718F,
                0xE08E: 0x71FB,
                0xE08F: 0x7184,
                0xE090: 0x7195,
                0xE091: 0x71A8,
                0xE092: 0x71AC,
                0xE093: 0x71D7,
                0xE094: 0x71B9,
                0xE095: 0x71BE,
                0xE096: 0x71D2,
                0xE097: 0x71C9,
                0xE098: 0x71D4,
                0xE099: 0x71CE,
                0xE09A: 0x71E0,
                0xE09B: 0x71EC,
                0xE09C: 0x71E7,
                0xE09D: 0x71F5,
                0xE09E: 0x71FC,
                0xE09F: 0x71F9,
                0xE0A0: 0x71FF,
                0xE0A1: 0x720D,
                0xE0A2: 0x7210,
                0xE0A3: 0x721B,
                0xE0A4: 0x7228,
                0xE0A5: 0x722D,
                0xE0A6: 0x722C,
                0xE0A7: 0x7230,
                0xE0A8: 0x7232,
                0xE0A9: 0x723B,
                0xE0AA: 0x723C,
                0xE0AB: 0x723F,
                0xE0AC: 0x7240,
                0xE0AD: 0x7246,
                0xE0AE: 0x724B,
                0xE0AF: 0x7258,
                0xE0B0: 0x7274,
                0xE0B1: 0x727E,
                0xE0B2: 0x7282,
                0xE0B3: 0x7281,
                0xE0B4: 0x7287,
                0xE0B5: 0x7292,
                0xE0B6: 0x7296,
                0xE0B7: 0x72A2,
                0xE0B8: 0x72A7,
                0xE0B9: 0x72B9,
                0xE0BA: 0x72B2,
                0xE0BB: 0x72C3,
                0xE0BC: 0x72C6,
                0xE0BD: 0x72C4,
                0xE0BE: 0x72CE,
                0xE0BF: 0x72D2,
                0xE0C0: 0x72E2,
                0xE0C1: 0x72E0,
                0xE0C2: 0x72E1,
                0xE0C3: 0x72F9,
                0xE0C4: 0x72F7,
                0xE0C5: 0x500F,
                0xE0C6: 0x7317,
                0xE0C7: 0x730A,
                0xE0C8: 0x731C,
                0xE0C9: 0x7316,
                0xE0CA: 0x731D,
                0xE0CB: 0x7334,
                0xE0CC: 0x732F,
                0xE0CD: 0x7329,
                0xE0CE: 0x7325,
                0xE0CF: 0x733E,
                0xE0D0: 0x734E,
                0xE0D1: 0x734F,
                0xE0D2: 0x9ED8,
                0xE0D3: 0x7357,
                0xE0D4: 0x736A,
                0xE0D5: 0x7368,
                0xE0D6: 0x7370,
                0xE0D7: 0x7378,
                0xE0D8: 0x7375,
                0xE0D9: 0x737B,
                0xE0DA: 0x737A,
                0xE0DB: 0x73C8,
                0xE0DC: 0x73B3,
                0xE0DD: 0x73CE,
                0xE0DE: 0x73BB,
                0xE0DF: 0x73C0,
                0xE0E0: 0x73E5,
                0xE0E1: 0x73EE,
                0xE0E2: 0x73DE,
                0xE0E3: 0x74A2,
                0xE0E4: 0x7405,
                0xE0E5: 0x746F,
                0xE0E6: 0x7425,
                0xE0E7: 0x73F8,
                0xE0E8: 0x7432,
                0xE0E9: 0x743A,
                0xE0EA: 0x7455,
                0xE0EB: 0x743F,
                0xE0EC: 0x745F,
                0xE0ED: 0x7459,
                0xE0EE: 0x7441,
                0xE0EF: 0x745C,
                0xE0F0: 0x7469,
                0xE0F1: 0x7470,
                0xE0F2: 0x7463,
                0xE0F3: 0x746A,
                0xE0F4: 0x7476,
                0xE0F5: 0x747E,
                0xE0F6: 0x748B,
                0xE0F7: 0x749E,
                0xE0F8: 0x74A7,
                0xE0F9: 0x74CA,
                0xE0FA: 0x74CF,
                0xE0FB: 0x74D4,
                0xE0FC: 0x73F1,
                0xE140: 0x74E0,
                0xE141: 0x74E3,
                0xE142: 0x74E7,
                0xE143: 0x74E9,
                0xE144: 0x74EE,
                0xE145: 0x74F2,
                0xE146: 0x74F0,
                0xE147: 0x74F1,
                0xE148: 0x74F8,
                0xE149: 0x74F7,
                0xE14A: 0x7504,
                0xE14B: 0x7503,
                0xE14C: 0x7505,
                0xE14D: 0x750C,
                0xE14E: 0x750E,
                0xE14F: 0x750D,
                0xE150: 0x7515,
                0xE151: 0x7513,
                0xE152: 0x751E,
                0xE153: 0x7526,
                0xE154: 0x752C,
                0xE155: 0x753C,
                0xE156: 0x7544,
                0xE157: 0x754D,
                0xE158: 0x754A,
                0xE159: 0x7549,
                0xE15A: 0x755B,
                0xE15B: 0x7546,
                0xE15C: 0x755A,
                0xE15D: 0x7569,
                0xE15E: 0x7564,
                0xE15F: 0x7567,
                0xE160: 0x756B,
                0xE161: 0x756D,
                0xE162: 0x7578,
                0xE163: 0x7576,
                0xE164: 0x7586,
                0xE165: 0x7587,
                0xE166: 0x7574,
                0xE167: 0x758A,
                0xE168: 0x7589,
                0xE169: 0x7582,
                0xE16A: 0x7594,
                0xE16B: 0x759A,
                0xE16C: 0x759D,
                0xE16D: 0x75A5,
                0xE16E: 0x75A3,
                0xE16F: 0x75C2,
                0xE170: 0x75B3,
                0xE171: 0x75C3,
                0xE172: 0x75B5,
                0xE173: 0x75BD,
                0xE174: 0x75B8,
                0xE175: 0x75BC,
                0xE176: 0x75B1,
                0xE177: 0x75CD,
                0xE178: 0x75CA,
                0xE179: 0x75D2,
                0xE17A: 0x75D9,
                0xE17B: 0x75E3,
                0xE17C: 0x75DE,
                0xE17D: 0x75FE,
                0xE17E: 0x75FF,
                0xE180: 0x75FC,
                0xE181: 0x7601,
                0xE182: 0x75F0,
                0xE183: 0x75FA,
                0xE184: 0x75F2,
                0xE185: 0x75F3,
                0xE186: 0x760B,
                0xE187: 0x760D,
                0xE188: 0x7609,
                0xE189: 0x761F,
                0xE18A: 0x7627,
                0xE18B: 0x7620,
                0xE18C: 0x7621,
                0xE18D: 0x7622,
                0xE18E: 0x7624,
                0xE18F: 0x7634,
                0xE190: 0x7630,
                0xE191: 0x763B,
                0xE192: 0x7647,
                0xE193: 0x7648,
                0xE194: 0x7646,
                0xE195: 0x765C,
                0xE196: 0x7658,
                0xE197: 0x7661,
                0xE198: 0x7662,
                0xE199: 0x7668,
                0xE19A: 0x7669,
                0xE19B: 0x766A,
                0xE19C: 0x7667,
                0xE19D: 0x766C,
                0xE19E: 0x7670,
                0xE19F: 0x7672,
                0xE1A0: 0x7676,
                0xE1A1: 0x7678,
                0xE1A2: 0x767C,
                0xE1A3: 0x7680,
                0xE1A4: 0x7683,
                0xE1A5: 0x7688,
                0xE1A6: 0x768B,
                0xE1A7: 0x768E,
                0xE1A8: 0x7696,
                0xE1A9: 0x7693,
                0xE1AA: 0x7699,
                0xE1AB: 0x769A,
                0xE1AC: 0x76B0,
                0xE1AD: 0x76B4,
                0xE1AE: 0x76B8,
                0xE1AF: 0x76B9,
                0xE1B0: 0x76BA,
                0xE1B1: 0x76C2,
                0xE1B2: 0x76CD,
                0xE1B3: 0x76D6,
                0xE1B4: 0x76D2,
                0xE1B5: 0x76DE,
                0xE1B6: 0x76E1,
                0xE1B7: 0x76E5,
                0xE1B8: 0x76E7,
                0xE1B9: 0x76EA,
                0xE1BA: 0x862F,
                0xE1BB: 0x76FB,
                0xE1BC: 0x7708,
                0xE1BD: 0x7707,
                0xE1BE: 0x7704,
                0xE1BF: 0x7729,
                0xE1C0: 0x7724,
                0xE1C1: 0x771E,
                0xE1C2: 0x7725,
                0xE1C3: 0x7726,
                0xE1C4: 0x771B,
                0xE1C5: 0x7737,
                0xE1C6: 0x7738,
                0xE1C7: 0x7747,
                0xE1C8: 0x775A,
                0xE1C9: 0x7768,
                0xE1CA: 0x776B,
                0xE1CB: 0x775B,
                0xE1CC: 0x7765,
                0xE1CD: 0x777F,
                0xE1CE: 0x777E,
                0xE1CF: 0x7779,
                0xE1D0: 0x778E,
                0xE1D1: 0x778B,
                0xE1D2: 0x7791,
                0xE1D3: 0x77A0,
                0xE1D4: 0x779E,
                0xE1D5: 0x77B0,
                0xE1D6: 0x77B6,
                0xE1D7: 0x77B9,
                0xE1D8: 0x77BF,
                0xE1D9: 0x77BC,
                0xE1DA: 0x77BD,
                0xE1DB: 0x77BB,
                0xE1DC: 0x77C7,
                0xE1DD: 0x77CD,
                0xE1DE: 0x77D7,
                0xE1DF: 0x77DA,
                0xE1E0: 0x77DC,
                0xE1E1: 0x77E3,
                0xE1E2: 0x77EE,
                0xE1E3: 0x77FC,
                0xE1E4: 0x780C,
                0xE1E5: 0x7812,
                0xE1E6: 0x7926,
                0xE1E7: 0x7820,
                0xE1E8: 0x792A,
                0xE1E9: 0x7845,
                0xE1EA: 0x788E,
                0xE1EB: 0x7874,
                0xE1EC: 0x7886,
                0xE1ED: 0x787C,
                0xE1EE: 0x789A,
                0xE1EF: 0x788C,
                0xE1F0: 0x78A3,
                0xE1F1: 0x78B5,
                0xE1F2: 0x78AA,
                0xE1F3: 0x78AF,
                0xE1F4: 0x78D1,
                0xE1F5: 0x78C6,
                0xE1F6: 0x78CB,
                0xE1F7: 0x78D4,
                0xE1F8: 0x78BE,
                0xE1F9: 0x78BC,
                0xE1FA: 0x78C5,
                0xE1FB: 0x78CA,
                0xE1FC: 0x78EC,
                0xE240: 0x78E7,
                0xE241: 0x78DA,
                0xE242: 0x78FD,
                0xE243: 0x78F4,
                0xE244: 0x7907,
                0xE245: 0x7912,
                0xE246: 0x7911,
                0xE247: 0x7919,
                0xE248: 0x792C,
                0xE249: 0x792B,
                0xE24A: 0x7940,
                0xE24B: 0x7960,
                0xE24C: 0x7957,
                0xE24D: 0x795F,
                0xE24E: 0x795A,
                0xE24F: 0x7955,
                0xE250: 0x7953,
                0xE251: 0x797A,
                0xE252: 0x797F,
                0xE253: 0x798A,
                0xE254: 0x799D,
                0xE255: 0x79A7,
                0xE256: 0x9F4B,
                0xE257: 0x79AA,
                0xE258: 0x79AE,
                0xE259: 0x79B3,
                0xE25A: 0x79B9,
                0xE25B: 0x79BA,
                0xE25C: 0x79C9,
                0xE25D: 0x79D5,
                0xE25E: 0x79E7,
                0xE25F: 0x79EC,
                0xE260: 0x79E1,
                0xE261: 0x79E3,
                0xE262: 0x7A08,
                0xE263: 0x7A0D,
                0xE264: 0x7A18,
                0xE265: 0x7A19,
                0xE266: 0x7A20,
                0xE267: 0x7A1F,
                0xE268: 0x7980,
                0xE269: 0x7A31,
                0xE26A: 0x7A3B,
                0xE26B: 0x7A3E,
                0xE26C: 0x7A37,
                0xE26D: 0x7A43,
                0xE26E: 0x7A57,
                0xE26F: 0x7A49,
                0xE270: 0x7A61,
                0xE271: 0x7A62,
                0xE272: 0x7A69,
                0xE273: 0x9F9D,
                0xE274: 0x7A70,
                0xE275: 0x7A79,
                0xE276: 0x7A7D,
                0xE277: 0x7A88,
                0xE278: 0x7A97,
                0xE279: 0x7A95,
                0xE27A: 0x7A98,
                0xE27B: 0x7A96,
                0xE27C: 0x7AA9,
                0xE27D: 0x7AC8,
                0xE27E: 0x7AB0,
                0xE280: 0x7AB6,
                0xE281: 0x7AC5,
                0xE282: 0x7AC4,
                0xE283: 0x7ABF,
                0xE284: 0x9083,
                0xE285: 0x7AC7,
                0xE286: 0x7ACA,
                0xE287: 0x7ACD,
                0xE288: 0x7ACF,
                0xE289: 0x7AD5,
                0xE28A: 0x7AD3,
                0xE28B: 0x7AD9,
                0xE28C: 0x7ADA,
                0xE28D: 0x7ADD,
                0xE28E: 0x7AE1,
                0xE28F: 0x7AE2,
                0xE290: 0x7AE6,
                0xE291: 0x7AED,
                0xE292: 0x7AF0,
                0xE293: 0x7B02,
                0xE294: 0x7B0F,
                0xE295: 0x7B0A,
                0xE296: 0x7B06,
                0xE297: 0x7B33,
                0xE298: 0x7B18,
                0xE299: 0x7B19,
                0xE29A: 0x7B1E,
                0xE29B: 0x7B35,
                0xE29C: 0x7B28,
                0xE29D: 0x7B36,
                0xE29E: 0x7B50,
                0xE29F: 0x7B7A,
                0xE2A0: 0x7B04,
                0xE2A1: 0x7B4D,
                0xE2A2: 0x7B0B,
                0xE2A3: 0x7B4C,
                0xE2A4: 0x7B45,
                0xE2A5: 0x7B75,
                0xE2A6: 0x7B65,
                0xE2A7: 0x7B74,
                0xE2A8: 0x7B67,
                0xE2A9: 0x7B70,
                0xE2AA: 0x7B71,
                0xE2AB: 0x7B6C,
                0xE2AC: 0x7B6E,
                0xE2AD: 0x7B9D,
                0xE2AE: 0x7B98,
                0xE2AF: 0x7B9F,
                0xE2B0: 0x7B8D,
                0xE2B1: 0x7B9C,
                0xE2B2: 0x7B9A,
                0xE2B3: 0x7B8B,
                0xE2B4: 0x7B92,
                0xE2B5: 0x7B8F,
                0xE2B6: 0x7B5D,
                0xE2B7: 0x7B99,
                0xE2B8: 0x7BCB,
                0xE2B9: 0x7BC1,
                0xE2BA: 0x7BCC,
                0xE2BB: 0x7BCF,
                0xE2BC: 0x7BB4,
                0xE2BD: 0x7BC6,
                0xE2BE: 0x7BDD,
                0xE2BF: 0x7BE9,
                0xE2C0: 0x7C11,
                0xE2C1: 0x7C14,
                0xE2C2: 0x7BE6,
                0xE2C3: 0x7BE5,
                0xE2C4: 0x7C60,
                0xE2C5: 0x7C00,
                0xE2C6: 0x7C07,
                0xE2C7: 0x7C13,
                0xE2C8: 0x7BF3,
                0xE2C9: 0x7BF7,
                0xE2CA: 0x7C17,
                0xE2CB: 0x7C0D,
                0xE2CC: 0x7BF6,
                0xE2CD: 0x7C23,
                0xE2CE: 0x7C27,
                0xE2CF: 0x7C2A,
                0xE2D0: 0x7C1F,
                0xE2D1: 0x7C37,
                0xE2D2: 0x7C2B,
                0xE2D3: 0x7C3D,
                0xE2D4: 0x7C4C,
                0xE2D5: 0x7C43,
                0xE2D6: 0x7C54,
                0xE2D7: 0x7C4F,
                0xE2D8: 0x7C40,
                0xE2D9: 0x7C50,
                0xE2DA: 0x7C58,
                0xE2DB: 0x7C5F,
                0xE2DC: 0x7C64,
                0xE2DD: 0x7C56,
                0xE2DE: 0x7C65,
                0xE2DF: 0x7C6C,
                0xE2E0: 0x7C75,
                0xE2E1: 0x7C83,
                0xE2E2: 0x7C90,
                0xE2E3: 0x7CA4,
                0xE2E4: 0x7CAD,
                0xE2E5: 0x7CA2,
                0xE2E6: 0x7CAB,
                0xE2E7: 0x7CA1,
                0xE2E8: 0x7CA8,
                0xE2E9: 0x7CB3,
                0xE2EA: 0x7CB2,
                0xE2EB: 0x7CB1,
                0xE2EC: 0x7CAE,
                0xE2ED: 0x7CB9,
                0xE2EE: 0x7CBD,
                0xE2EF: 0x7CC0,
                0xE2F0: 0x7CC5,
                0xE2F1: 0x7CC2,
                0xE2F2: 0x7CD8,
                0xE2F3: 0x7CD2,
                0xE2F4: 0x7CDC,
                0xE2F5: 0x7CE2,
                0xE2F6: 0x9B3B,
                0xE2F7: 0x7CEF,
                0xE2F8: 0x7CF2,
                0xE2F9: 0x7CF4,
                0xE2FA: 0x7CF6,
                0xE2FB: 0x7CFA,
                0xE2FC: 0x7D06,
                0xE340: 0x7D02,
                0xE341: 0x7D1C,
                0xE342: 0x7D15,
                0xE343: 0x7D0A,
                0xE344: 0x7D45,
                0xE345: 0x7D4B,
                0xE346: 0x7D2E,
                0xE347: 0x7D32,
                0xE348: 0x7D3F,
                0xE349: 0x7D35,
                0xE34A: 0x7D46,
                0xE34B: 0x7D73,
                0xE34C: 0x7D56,
                0xE34D: 0x7D4E,
                0xE34E: 0x7D72,
                0xE34F: 0x7D68,
                0xE350: 0x7D6E,
                0xE351: 0x7D4F,
                0xE352: 0x7D63,
                0xE353: 0x7D93,
                0xE354: 0x7D89,
                0xE355: 0x7D5B,
                0xE356: 0x7D8F,
                0xE357: 0x7D7D,
                0xE358: 0x7D9B,
                0xE359: 0x7DBA,
                0xE35A: 0x7DAE,
                0xE35B: 0x7DA3,
                0xE35C: 0x7DB5,
                0xE35D: 0x7DC7,
                0xE35E: 0x7DBD,
                0xE35F: 0x7DAB,
                0xE360: 0x7E3D,
                0xE361: 0x7DA2,
                0xE362: 0x7DAF,
                0xE363: 0x7DDC,
                0xE364: 0x7DB8,
                0xE365: 0x7D9F,
                0xE366: 0x7DB0,
                0xE367: 0x7DD8,
                0xE368: 0x7DDD,
                0xE369: 0x7DE4,
                0xE36A: 0x7DDE,
                0xE36B: 0x7DFB,
                0xE36C: 0x7DF2,
                0xE36D: 0x7DE1,
                0xE36E: 0x7E05,
                0xE36F: 0x7E0A,
                0xE370: 0x7E23,
                0xE371: 0x7E21,
                0xE372: 0x7E12,
                0xE373: 0x7E31,
                0xE374: 0x7E1F,
                0xE375: 0x7E09,
                0xE376: 0x7E0B,
                0xE377: 0x7E22,
                0xE378: 0x7E46,
                0xE379: 0x7E66,
                0xE37A: 0x7E3B,
                0xE37B: 0x7E35,
                0xE37C: 0x7E39,
                0xE37D: 0x7E43,
                0xE37E: 0x7E37,
                0xE380: 0x7E32,
                0xE381: 0x7E3A,
                0xE382: 0x7E67,
                0xE383: 0x7E5D,
                0xE384: 0x7E56,
                0xE385: 0x7E5E,
                0xE386: 0x7E59,
                0xE387: 0x7E5A,
                0xE388: 0x7E79,
                0xE389: 0x7E6A,
                0xE38A: 0x7E69,
                0xE38B: 0x7E7C,
                0xE38C: 0x7E7B,
                0xE38D: 0x7E83,
                0xE38E: 0x7DD5,
                0xE38F: 0x7E7D,
                0xE390: 0x8FAE,
                0xE391: 0x7E7F,
                0xE392: 0x7E88,
                0xE393: 0x7E89,
                0xE394: 0x7E8C,
                0xE395: 0x7E92,
                0xE396: 0x7E90,
                0xE397: 0x7E93,
                0xE398: 0x7E94,
                0xE399: 0x7E96,
                0xE39A: 0x7E8E,
                0xE39B: 0x7E9B,
                0xE39C: 0x7E9C,
                0xE39D: 0x7F38,
                0xE39E: 0x7F3A,
                0xE39F: 0x7F45,
                0xE3A0: 0x7F4C,
                0xE3A1: 0x7F4D,
                0xE3A2: 0x7F4E,
                0xE3A3: 0x7F50,
                0xE3A4: 0x7F51,
                0xE3A5: 0x7F55,
                0xE3A6: 0x7F54,
                0xE3A7: 0x7F58,
                0xE3A8: 0x7F5F,
                0xE3A9: 0x7F60,
                0xE3AA: 0x7F68,
                0xE3AB: 0x7F69,
                0xE3AC: 0x7F67,
                0xE3AD: 0x7F78,
                0xE3AE: 0x7F82,
                0xE3AF: 0x7F86,
                0xE3B0: 0x7F83,
                0xE3B1: 0x7F88,
                0xE3B2: 0x7F87,
                0xE3B3: 0x7F8C,
                0xE3B4: 0x7F94,
                0xE3B5: 0x7F9E,
                0xE3B6: 0x7F9D,
                0xE3B7: 0x7F9A,
                0xE3B8: 0x7FA3,
                0xE3B9: 0x7FAF,
                0xE3BA: 0x7FB2,
                0xE3BB: 0x7FB9,
                0xE3BC: 0x7FAE,
                0xE3BD: 0x7FB6,
                0xE3BE: 0x7FB8,
                0xE3BF: 0x8B71,
                0xE3C0: 0x7FC5,
                0xE3C1: 0x7FC6,
                0xE3C2: 0x7FCA,
                0xE3C3: 0x7FD5,
                0xE3C4: 0x7FD4,
                0xE3C5: 0x7FE1,
                0xE3C6: 0x7FE6,
                0xE3C7: 0x7FE9,
                0xE3C8: 0x7FF3,
                0xE3C9: 0x7FF9,
                0xE3CA: 0x98DC,
                0xE3CB: 0x8006,
                0xE3CC: 0x8004,
                0xE3CD: 0x800B,
                0xE3CE: 0x8012,
                0xE3CF: 0x8018,
                0xE3D0: 0x8019,
                0xE3D1: 0x801C,
                0xE3D2: 0x8021,
                0xE3D3: 0x8028,
                0xE3D4: 0x803F,
                0xE3D5: 0x803B,
                0xE3D6: 0x804A,
                0xE3D7: 0x8046,
                0xE3D8: 0x8052,
                0xE3D9: 0x8058,
                0xE3DA: 0x805A,
                0xE3DB: 0x805F,
                0xE3DC: 0x8062,
                0xE3DD: 0x8068,
                0xE3DE: 0x8073,
                0xE3DF: 0x8072,
                0xE3E0: 0x8070,
                0xE3E1: 0x8076,
                0xE3E2: 0x8079,
                0xE3E3: 0x807D,
                0xE3E4: 0x807F,
                0xE3E5: 0x8084,
                0xE3E6: 0x8086,
                0xE3E7: 0x8085,
                0xE3E8: 0x809B,
                0xE3E9: 0x8093,
                0xE3EA: 0x809A,
                0xE3EB: 0x80AD,
                0xE3EC: 0x5190,
                0xE3ED: 0x80AC,
                0xE3EE: 0x80DB,
                0xE3EF: 0x80E5,
                0xE3F0: 0x80D9,
                0xE3F1: 0x80DD,
                0xE3F2: 0x80C4,
                0xE3F3: 0x80DA,
                0xE3F4: 0x80D6,
                0xE3F5: 0x8109,
                0xE3F6: 0x80EF,
                0xE3F7: 0x80F1,
                0xE3F8: 0x811B,
                0xE3F9: 0x8129,
                0xE3FA: 0x8123,
                0xE3FB: 0x812F,
                0xE3FC: 0x814B,
                0xE440: 0x968B,
                0xE441: 0x8146,
                0xE442: 0x813E,
                0xE443: 0x8153,
                0xE444: 0x8151,
                0xE445: 0x80FC,
                0xE446: 0x8171,
                0xE447: 0x816E,
                0xE448: 0x8165,
                0xE449: 0x8166,
                0xE44A: 0x8174,
                0xE44B: 0x8183,
                0xE44C: 0x8188,
                0xE44D: 0x818A,
                0xE44E: 0x8180,
                0xE44F: 0x8182,
                0xE450: 0x81A0,
                0xE451: 0x8195,
                0xE452: 0x81A4,
                0xE453: 0x81A3,
                0xE454: 0x815F,
                0xE455: 0x8193,
                0xE456: 0x81A9,
                0xE457: 0x81B0,
                0xE458: 0x81B5,
                0xE459: 0x81BE,
                0xE45A: 0x81B8,
                0xE45B: 0x81BD,
                0xE45C: 0x81C0,
                0xE45D: 0x81C2,
                0xE45E: 0x81BA,
                0xE45F: 0x81C9,
                0xE460: 0x81CD,
                0xE461: 0x81D1,
                0xE462: 0x81D9,
                0xE463: 0x81D8,
                0xE464: 0x81C8,
                0xE465: 0x81DA,
                0xE466: 0x81DF,
                0xE467: 0x81E0,
                0xE468: 0x81E7,
                0xE469: 0x81FA,
                0xE46A: 0x81FB,
                0xE46B: 0x81FE,
                0xE46C: 0x8201,
                0xE46D: 0x8202,
                0xE46E: 0x8205,
                0xE46F: 0x8207,
                0xE470: 0x820A,
                0xE471: 0x820D,
                0xE472: 0x8210,
                0xE473: 0x8216,
                0xE474: 0x8229,
                0xE475: 0x822B,
                0xE476: 0x8238,
                0xE477: 0x8233,
                0xE478: 0x8240,
                0xE479: 0x8259,
                0xE47A: 0x8258,
                0xE47B: 0x825D,
                0xE47C: 0x825A,
                0xE47D: 0x825F,
                0xE47E: 0x8264,
                0xE480: 0x8262,
                0xE481: 0x8268,
                0xE482: 0x826A,
                0xE483: 0x826B,
                0xE484: 0x822E,
                0xE485: 0x8271,
                0xE486: 0x8277,
                0xE487: 0x8278,
                0xE488: 0x827E,
                0xE489: 0x828D,
                0xE48A: 0x8292,
                0xE48B: 0x82AB,
                0xE48C: 0x829F,
                0xE48D: 0x82BB,
                0xE48E: 0x82AC,
                0xE48F: 0x82E1,
                0xE490: 0x82E3,
                0xE491: 0x82DF,
                0xE492: 0x82D2,
                0xE493: 0x82F4,
                0xE494: 0x82F3,
                0xE495: 0x82FA,
                0xE496: 0x8393,
                0xE497: 0x8303,
                0xE498: 0x82FB,
                0xE499: 0x82F9,
                0xE49A: 0x82DE,
                0xE49B: 0x8306,
                0xE49C: 0x82DC,
                0xE49D: 0x8309,
                0xE49E: 0x82D9,
                0xE49F: 0x8335,
                0xE4A0: 0x8334,
                0xE4A1: 0x8316,
                0xE4A2: 0x8332,
                0xE4A3: 0x8331,
                0xE4A4: 0x8340,
                0xE4A5: 0x8339,
                0xE4A6: 0x8350,
                0xE4A7: 0x8345,
                0xE4A8: 0x832F,
                0xE4A9: 0x832B,
                0xE4AA: 0x8317,
                0xE4AB: 0x8318,
                0xE4AC: 0x8385,
                0xE4AD: 0x839A,
                0xE4AE: 0x83AA,
                0xE4AF: 0x839F,
                0xE4B0: 0x83A2,
                0xE4B1: 0x8396,
                0xE4B2: 0x8323,
                0xE4B3: 0x838E,
                0xE4B4: 0x8387,
                0xE4B5: 0x838A,
                0xE4B6: 0x837C,
                0xE4B7: 0x83B5,
                0xE4B8: 0x8373,
                0xE4B9: 0x8375,
                0xE4BA: 0x83A0,
                0xE4BB: 0x8389,
                0xE4BC: 0x83A8,
                0xE4BD: 0x83F4,
                0xE4BE: 0x8413,
                0xE4BF: 0x83EB,
                0xE4C0: 0x83CE,
                0xE4C1: 0x83FD,
                0xE4C2: 0x8403,
                0xE4C3: 0x83D8,
                0xE4C4: 0x840B,
                0xE4C5: 0x83C1,
                0xE4C6: 0x83F7,
                0xE4C7: 0x8407,
                0xE4C8: 0x83E0,
                0xE4C9: 0x83F2,
                0xE4CA: 0x840D,
                0xE4CB: 0x8422,
                0xE4CC: 0x8420,
                0xE4CD: 0x83BD,
                0xE4CE: 0x8438,
                0xE4CF: 0x8506,
                0xE4D0: 0x83FB,
                0xE4D1: 0x846D,
                0xE4D2: 0x842A,
                0xE4D3: 0x843C,
                0xE4D4: 0x855A,
                0xE4D5: 0x8484,
                0xE4D6: 0x8477,
                0xE4D7: 0x846B,
                0xE4D8: 0x84AD,
                0xE4D9: 0x846E,
                0xE4DA: 0x8482,
                0xE4DB: 0x8469,
                0xE4DC: 0x8446,
                0xE4DD: 0x842C,
                0xE4DE: 0x846F,
                0xE4DF: 0x8479,
                0xE4E0: 0x8435,
                0xE4E1: 0x84CA,
                0xE4E2: 0x8462,
                0xE4E3: 0x84B9,
                0xE4E4: 0x84BF,
                0xE4E5: 0x849F,
                0xE4E6: 0x84D9,
                0xE4E7: 0x84CD,
                0xE4E8: 0x84BB,
                0xE4E9: 0x84DA,
                0xE4EA: 0x84D0,
                0xE4EB: 0x84C1,
                0xE4EC: 0x84C6,
                0xE4ED: 0x84D6,
                0xE4EE: 0x84A1,
                0xE4EF: 0x8521,
                0xE4F0: 0x84FF,
                0xE4F1: 0x84F4,
                0xE4F2: 0x8517,
                0xE4F3: 0x8518,
                0xE4F4: 0x852C,
                0xE4F5: 0x851F,
                0xE4F6: 0x8515,
                0xE4F7: 0x8514,
                0xE4F8: 0x84FC,
                0xE4F9: 0x8540,
                0xE4FA: 0x8563,
                0xE4FB: 0x8558,
                0xE4FC: 0x8548,
                0xE540: 0x8541,
                0xE541: 0x8602,
                0xE542: 0x854B,
                0xE543: 0x8555,
                0xE544: 0x8580,
                0xE545: 0x85A4,
                0xE546: 0x8588,
                0xE547: 0x8591,
                0xE548: 0x858A,
                0xE549: 0x85A8,
                0xE54A: 0x856D,
                0xE54B: 0x8594,
                0xE54C: 0x859B,
                0xE54D: 0x85EA,
                0xE54E: 0x8587,
                0xE54F: 0x859C,
                0xE550: 0x8577,
                0xE551: 0x857E,
                0xE552: 0x8590,
                0xE553: 0x85C9,
                0xE554: 0x85BA,
                0xE555: 0x85CF,
                0xE556: 0x85B9,
                0xE557: 0x85D0,
                0xE558: 0x85D5,
                0xE559: 0x85DD,
                0xE55A: 0x85E5,
                0xE55B: 0x85DC,
                0xE55C: 0x85F9,
                0xE55D: 0x860A,
                0xE55E: 0x8613,
                0xE55F: 0x860B,
                0xE560: 0x85FE,
                0xE561: 0x85FA,
                0xE562: 0x8606,
                0xE563: 0x8622,
                0xE564: 0x861A,
                0xE565: 0x8630,
                0xE566: 0x863F,
                0xE567: 0x864D,
                0xE568: 0x4E55,
                0xE569: 0x8654,
                0xE56A: 0x865F,
                0xE56B: 0x8667,
                0xE56C: 0x8671,
                0xE56D: 0x8693,
                0xE56E: 0x86A3,
                0xE56F: 0x86A9,
                0xE570: 0x86AA,
                0xE571: 0x868B,
                0xE572: 0x868C,
                0xE573: 0x86B6,
                0xE574: 0x86AF,
                0xE575: 0x86C4,
                0xE576: 0x86C6,
                0xE577: 0x86B0,
                0xE578: 0x86C9,
                0xE579: 0x8823,
                0xE57A: 0x86AB,
                0xE57B: 0x86D4,
                0xE57C: 0x86DE,
                0xE57D: 0x86E9,
                0xE57E: 0x86EC,
                0xE580: 0x86DF,
                0xE581: 0x86DB,
                0xE582: 0x86EF,
                0xE583: 0x8712,
                0xE584: 0x8706,
                0xE585: 0x8708,
                0xE586: 0x8700,
                0xE587: 0x8703,
                0xE588: 0x86FB,
                0xE589: 0x8711,
                0xE58A: 0x8709,
                0xE58B: 0x870D,
                0xE58C: 0x86F9,
                0xE58D: 0x870A,
                0xE58E: 0x8734,
                0xE58F: 0x873F,
                0xE590: 0x8737,
                0xE591: 0x873B,
                0xE592: 0x8725,
                0xE593: 0x8729,
                0xE594: 0x871A,
                0xE595: 0x8760,
                0xE596: 0x875F,
                0xE597: 0x8778,
                0xE598: 0x874C,
                0xE599: 0x874E,
                0xE59A: 0x8774,
                0xE59B: 0x8757,
                0xE59C: 0x8768,
                0xE59D: 0x876E,
                0xE59E: 0x8759,
                0xE59F: 0x8753,
                0xE5A0: 0x8763,
                0xE5A1: 0x876A,
                0xE5A2: 0x8805,
                0xE5A3: 0x87A2,
                0xE5A4: 0x879F,
                0xE5A5: 0x8782,
                0xE5A6: 0x87AF,
                0xE5A7: 0x87CB,
                0xE5A8: 0x87BD,
                0xE5A9: 0x87C0,
                0xE5AA: 0x87D0,
                0xE5AB: 0x96D6,
                0xE5AC: 0x87AB,
                0xE5AD: 0x87C4,
                0xE5AE: 0x87B3,
                0xE5AF: 0x87C7,
                0xE5B0: 0x87C6,
                0xE5B1: 0x87BB,
                0xE5B2: 0x87EF,
                0xE5B3: 0x87F2,
                0xE5B4: 0x87E0,
                0xE5B5: 0x880F,
                0xE5B6: 0x880D,
                0xE5B7: 0x87FE,
                0xE5B8: 0x87F6,
                0xE5B9: 0x87F7,
                0xE5BA: 0x880E,
                0xE5BB: 0x87D2,
                0xE5BC: 0x8811,
                0xE5BD: 0x8816,
                0xE5BE: 0x8815,
                0xE5BF: 0x8822,
                0xE5C0: 0x8821,
                0xE5C1: 0x8831,
                0xE5C2: 0x8836,
                0xE5C3: 0x8839,
                0xE5C4: 0x8827,
                0xE5C5: 0x883B,
                0xE5C6: 0x8844,
                0xE5C7: 0x8842,
                0xE5C8: 0x8852,
                0xE5C9: 0x8859,
                0xE5CA: 0x885E,
                0xE5CB: 0x8862,
                0xE5CC: 0x886B,
                0xE5CD: 0x8881,
                0xE5CE: 0x887E,
                0xE5CF: 0x889E,
                0xE5D0: 0x8875,
                0xE5D1: 0x887D,
                0xE5D2: 0x88B5,
                0xE5D3: 0x8872,
                0xE5D4: 0x8882,
                0xE5D5: 0x8897,
                0xE5D6: 0x8892,
                0xE5D7: 0x88AE,
                0xE5D8: 0x8899,
                0xE5D9: 0x88A2,
                0xE5DA: 0x888D,
                0xE5DB: 0x88A4,
                0xE5DC: 0x88B0,
                0xE5DD: 0x88BF,
                0xE5DE: 0x88B1,
                0xE5DF: 0x88C3,
                0xE5E0: 0x88C4,
                0xE5E1: 0x88D4,
                0xE5E2: 0x88D8,
                0xE5E3: 0x88D9,
                0xE5E4: 0x88DD,
                0xE5E5: 0x88F9,
                0xE5E6: 0x8902,
                0xE5E7: 0x88FC,
                0xE5E8: 0x88F4,
                0xE5E9: 0x88E8,
                0xE5EA: 0x88F2,
                0xE5EB: 0x8904,
                0xE5EC: 0x890C,
                0xE5ED: 0x890A,
                0xE5EE: 0x8913,
                0xE5EF: 0x8943,
                0xE5F0: 0x891E,
                0xE5F1: 0x8925,
                0xE5F2: 0x892A,
                0xE5F3: 0x892B,
                0xE5F4: 0x8941,
                0xE5F5: 0x8944,
                0xE5F6: 0x893B,
                0xE5F7: 0x8936,
                0xE5F8: 0x8938,
                0xE5F9: 0x894C,
                0xE5FA: 0x891D,
                0xE5FB: 0x8960,
                0xE5FC: 0x895E,
                0xE640: 0x8966,
                0xE641: 0x8964,
                0xE642: 0x896D,
                0xE643: 0x896A,
                0xE644: 0x896F,
                0xE645: 0x8974,
                0xE646: 0x8977,
                0xE647: 0x897E,
                0xE648: 0x8983,
                0xE649: 0x8988,
                0xE64A: 0x898A,
                0xE64B: 0x8993,
                0xE64C: 0x8998,
                0xE64D: 0x89A1,
                0xE64E: 0x89A9,
                0xE64F: 0x89A6,
                0xE650: 0x89AC,
                0xE651: 0x89AF,
                0xE652: 0x89B2,
                0xE653: 0x89BA,
                0xE654: 0x89BD,
                0xE655: 0x89BF,
                0xE656: 0x89C0,
                0xE657: 0x89DA,
                0xE658: 0x89DC,
                0xE659: 0x89DD,
                0xE65A: 0x89E7,
                0xE65B: 0x89F4,
                0xE65C: 0x89F8,
                0xE65D: 0x8A03,
                0xE65E: 0x8A16,
                0xE65F: 0x8A10,
                0xE660: 0x8A0C,
                0xE661: 0x8A1B,
                0xE662: 0x8A1D,
                0xE663: 0x8A25,
                0xE664: 0x8A36,
                0xE665: 0x8A41,
                0xE666: 0x8A5B,
                0xE667: 0x8A52,
                0xE668: 0x8A46,
                0xE669: 0x8A48,
                0xE66A: 0x8A7C,
                0xE66B: 0x8A6D,
                0xE66C: 0x8A6C,
                0xE66D: 0x8A62,
                0xE66E: 0x8A85,
                0xE66F: 0x8A82,
                0xE670: 0x8A84,
                0xE671: 0x8AA8,
                0xE672: 0x8AA1,
                0xE673: 0x8A91,
                0xE674: 0x8AA5,
                0xE675: 0x8AA6,
                0xE676: 0x8A9A,
                0xE677: 0x8AA3,
                0xE678: 0x8AC4,
                0xE679: 0x8ACD,
                0xE67A: 0x8AC2,
                0xE67B: 0x8ADA,
                0xE67C: 0x8AEB,
                0xE67D: 0x8AF3,
                0xE67E: 0x8AE7,
                0xE680: 0x8AE4,
                0xE681: 0x8AF1,
                0xE682: 0x8B14,
                0xE683: 0x8AE0,
                0xE684: 0x8AE2,
                0xE685: 0x8AF7,
                0xE686: 0x8ADE,
                0xE687: 0x8ADB,
                0xE688: 0x8B0C,
                0xE689: 0x8B07,
                0xE68A: 0x8B1A,
                0xE68B: 0x8AE1,
                0xE68C: 0x8B16,
                0xE68D: 0x8B10,
                0xE68E: 0x8B17,
                0xE68F: 0x8B20,
                0xE690: 0x8B33,
                0xE691: 0x97AB,
                0xE692: 0x8B26,
                0xE693: 0x8B2B,
                0xE694: 0x8B3E,
                0xE695: 0x8B28,
                0xE696: 0x8B41,
                0xE697: 0x8B4C,
                0xE698: 0x8B4F,
                0xE699: 0x8B4E,
                0xE69A: 0x8B49,
                0xE69B: 0x8B56,
                0xE69C: 0x8B5B,
                0xE69D: 0x8B5A,
                0xE69E: 0x8B6B,
                0xE69F: 0x8B5F,
                0xE6A0: 0x8B6C,
                0xE6A1: 0x8B6F,
                0xE6A2: 0x8B74,
                0xE6A3: 0x8B7D,
                0xE6A4: 0x8B80,
                0xE6A5: 0x8B8C,
                0xE6A6: 0x8B8E,
                0xE6A7: 0x8B92,
                0xE6A8: 0x8B93,
                0xE6A9: 0x8B96,
                0xE6AA: 0x8B99,
                0xE6AB: 0x8B9A,
                0xE6AC: 0x8C3A,
                0xE6AD: 0x8C41,
                0xE6AE: 0x8C3F,
                0xE6AF: 0x8C48,
                0xE6B0: 0x8C4C,
                0xE6B1: 0x8C4E,
                0xE6B2: 0x8C50,
                0xE6B3: 0x8C55,
                0xE6B4: 0x8C62,
                0xE6B5: 0x8C6C,
                0xE6B6: 0x8C78,
                0xE6B7: 0x8C7A,
                0xE6B8: 0x8C82,
                0xE6B9: 0x8C89,
                0xE6BA: 0x8C85,
                0xE6BB: 0x8C8A,
                0xE6BC: 0x8C8D,
                0xE6BD: 0x8C8E,
                0xE6BE: 0x8C94,
                0xE6BF: 0x8C7C,
                0xE6C0: 0x8C98,
                0xE6C1: 0x621D,
                0xE6C2: 0x8CAD,
                0xE6C3: 0x8CAA,
                0xE6C4: 0x8CBD,
                0xE6C5: 0x8CB2,
                0xE6C6: 0x8CB3,
                0xE6C7: 0x8CAE,
                0xE6C8: 0x8CB6,
                0xE6C9: 0x8CC8,
                0xE6CA: 0x8CC1,
                0xE6CB: 0x8CE4,
                0xE6CC: 0x8CE3,
                0xE6CD: 0x8CDA,
                0xE6CE: 0x8CFD,
                0xE6CF: 0x8CFA,
                0xE6D0: 0x8CFB,
                0xE6D1: 0x8D04,
                0xE6D2: 0x8D05,
                0xE6D3: 0x8D0A,
                0xE6D4: 0x8D07,
                0xE6D5: 0x8D0F,
                0xE6D6: 0x8D0D,
                0xE6D7: 0x8D10,
                0xE6D8: 0x9F4E,
                0xE6D9: 0x8D13,
                0xE6DA: 0x8CCD,
                0xE6DB: 0x8D14,
                0xE6DC: 0x8D16,
                0xE6DD: 0x8D67,
                0xE6DE: 0x8D6D,
                0xE6DF: 0x8D71,
                0xE6E0: 0x8D73,
                0xE6E1: 0x8D81,
                0xE6E2: 0x8D99,
                0xE6E3: 0x8DC2,
                0xE6E4: 0x8DBE,
                0xE6E5: 0x8DBA,
                0xE6E6: 0x8DCF,
                0xE6E7: 0x8DDA,
                0xE6E8: 0x8DD6,
                0xE6E9: 0x8DCC,
                0xE6EA: 0x8DDB,
                0xE6EB: 0x8DCB,
                0xE6EC: 0x8DEA,
                0xE6ED: 0x8DEB,
                0xE6EE: 0x8DDF,
                0xE6EF: 0x8DE3,
                0xE6F0: 0x8DFC,
                0xE6F1: 0x8E08,
                0xE6F2: 0x8E09,
                0xE6F3: 0x8DFF,
                0xE6F4: 0x8E1D,
                0xE6F5: 0x8E1E,
                0xE6F6: 0x8E10,
                0xE6F7: 0x8E1F,
                0xE6F8: 0x8E42,
                0xE6F9: 0x8E35,
                0xE6FA: 0x8E30,
                0xE6FB: 0x8E34,
                0xE6FC: 0x8E4A,
                0xE740: 0x8E47,
                0xE741: 0x8E49,
                0xE742: 0x8E4C,
                0xE743: 0x8E50,
                0xE744: 0x8E48,
                0xE745: 0x8E59,
                0xE746: 0x8E64,
                0xE747: 0x8E60,
                0xE748: 0x8E2A,
                0xE749: 0x8E63,
                0xE74A: 0x8E55,
                0xE74B: 0x8E76,
                0xE74C: 0x8E72,
                0xE74D: 0x8E7C,
                0xE74E: 0x8E81,
                0xE74F: 0x8E87,
                0xE750: 0x8E85,
                0xE751: 0x8E84,
                0xE752: 0x8E8B,
                0xE753: 0x8E8A,
                0xE754: 0x8E93,
                0xE755: 0x8E91,
                0xE756: 0x8E94,
                0xE757: 0x8E99,
                0xE758: 0x8EAA,
                0xE759: 0x8EA1,
                0xE75A: 0x8EAC,
                0xE75B: 0x8EB0,
                0xE75C: 0x8EC6,
                0xE75D: 0x8EB1,
                0xE75E: 0x8EBE,
                0xE75F: 0x8EC5,
                0xE760: 0x8EC8,
                0xE761: 0x8ECB,
                0xE762: 0x8EDB,
                0xE763: 0x8EE3,
                0xE764: 0x8EFC,
                0xE765: 0x8EFB,
                0xE766: 0x8EEB,
                0xE767: 0x8EFE,
                0xE768: 0x8F0A,
                0xE769: 0x8F05,
                0xE76A: 0x8F15,
                0xE76B: 0x8F12,
                0xE76C: 0x8F19,
                0xE76D: 0x8F13,
                0xE76E: 0x8F1C,
                0xE76F: 0x8F1F,
                0xE770: 0x8F1B,
                0xE771: 0x8F0C,
                0xE772: 0x8F26,
                0xE773: 0x8F33,
                0xE774: 0x8F3B,
                0xE775: 0x8F39,
                0xE776: 0x8F45,
                0xE777: 0x8F42,
                0xE778: 0x8F3E,
                0xE779: 0x8F4C,
                0xE77A: 0x8F49,
                0xE77B: 0x8F46,
                0xE77C: 0x8F4E,
                0xE77D: 0x8F57,
                0xE77E: 0x8F5C,
                0xE780: 0x8F62,
                0xE781: 0x8F63,
                0xE782: 0x8F64,
                0xE783: 0x8F9C,
                0xE784: 0x8F9F,
                0xE785: 0x8FA3,
                0xE786: 0x8FAD,
                0xE787: 0x8FAF,
                0xE788: 0x8FB7,
                0xE789: 0x8FDA,
                0xE78A: 0x8FE5,
                0xE78B: 0x8FE2,
                0xE78C: 0x8FEA,
                0xE78D: 0x8FEF,
                0xE78E: 0x9087,
                0xE78F: 0x8FF4,
                0xE790: 0x9005,
                0xE791: 0x8FF9,
                0xE792: 0x8FFA,
                0xE793: 0x9011,
                0xE794: 0x9015,
                0xE795: 0x9021,
                0xE796: 0x900D,
                0xE797: 0x901E,
                0xE798: 0x9016,
                0xE799: 0x900B,
                0xE79A: 0x9027,
                0xE79B: 0x9036,
                0xE79C: 0x9035,
                0xE79D: 0x9039,
                0xE79E: 0x8FF8,
                0xE79F: 0x904F,
                0xE7A0: 0x9050,
                0xE7A1: 0x9051,
                0xE7A2: 0x9052,
                0xE7A3: 0x900E,
                0xE7A4: 0x9049,
                0xE7A5: 0x903E,
                0xE7A6: 0x9056,
                0xE7A7: 0x9058,
                0xE7A8: 0x905E,
                0xE7A9: 0x9068,
                0xE7AA: 0x906F,
                0xE7AB: 0x9076,
                0xE7AC: 0x96A8,
                0xE7AD: 0x9072,
                0xE7AE: 0x9082,
                0xE7AF: 0x907D,
                0xE7B0: 0x9081,
                0xE7B1: 0x9080,
                0xE7B2: 0x908A,
                0xE7B3: 0x9089,
                0xE7B4: 0x908F,
                0xE7B5: 0x90A8,
                0xE7B6: 0x90AF,
                0xE7B7: 0x90B1,
                0xE7B8: 0x90B5,
                0xE7B9: 0x90E2,
                0xE7BA: 0x90E4,
                0xE7BB: 0x6248,
                0xE7BC: 0x90DB,
                0xE7BD: 0x9102,
                0xE7BE: 0x9112,
                0xE7BF: 0x9119,
                0xE7C0: 0x9132,
                0xE7C1: 0x9130,
                0xE7C2: 0x914A,
                0xE7C3: 0x9156,
                0xE7C4: 0x9158,
                0xE7C5: 0x9163,
                0xE7C6: 0x9165,
                0xE7C7: 0x9169,
                0xE7C8: 0x9173,
                0xE7C9: 0x9172,
                0xE7CA: 0x918B,
                0xE7CB: 0x9189,
                0xE7CC: 0x9182,
                0xE7CD: 0x91A2,
                0xE7CE: 0x91AB,
                0xE7CF: 0x91AF,
                0xE7D0: 0x91AA,
                0xE7D1: 0x91B5,
                0xE7D2: 0x91B4,
                0xE7D3: 0x91BA,
                0xE7D4: 0x91C0,
                0xE7D5: 0x91C1,
                0xE7D6: 0x91C9,
                0xE7D7: 0x91CB,
                0xE7D8: 0x91D0,
                0xE7D9: 0x91D6,
                0xE7DA: 0x91DF,
                0xE7DB: 0x91E1,
                0xE7DC: 0x91DB,
                0xE7DD: 0x91FC,
                0xE7DE: 0x91F5,
                0xE7DF: 0x91F6,
                0xE7E0: 0x921E,
                0xE7E1: 0x91FF,
                0xE7E2: 0x9214,
                0xE7E3: 0x922C,
                0xE7E4: 0x9215,
                0xE7E5: 0x9211,
                0xE7E6: 0x925E,
                0xE7E7: 0x9257,
                0xE7E8: 0x9245,
                0xE7E9: 0x9249,
                0xE7EA: 0x9264,
                0xE7EB: 0x9248,
                0xE7EC: 0x9295,
                0xE7ED: 0x923F,
                0xE7EE: 0x924B,
                0xE7EF: 0x9250,
                0xE7F0: 0x929C,
                0xE7F1: 0x9296,
                0xE7F2: 0x9293,
                0xE7F3: 0x929B,
                0xE7F4: 0x925A,
                0xE7F5: 0x92CF,
                0xE7F6: 0x92B9,
                0xE7F7: 0x92B7,
                0xE7F8: 0x92E9,
                0xE7F9: 0x930F,
                0xE7FA: 0x92FA,
                0xE7FB: 0x9344,
                0xE7FC: 0x932E,
                0xE840: 0x9319,
                0xE841: 0x9322,
                0xE842: 0x931A,
                0xE843: 0x9323,
                0xE844: 0x933A,
                0xE845: 0x9335,
                0xE846: 0x933B,
                0xE847: 0x935C,
                0xE848: 0x9360,
                0xE849: 0x937C,
                0xE84A: 0x936E,
                0xE84B: 0x9356,
                0xE84C: 0x93B0,
                0xE84D: 0x93AC,
                0xE84E: 0x93AD,
                0xE84F: 0x9394,
                0xE850: 0x93B9,
                0xE851: 0x93D6,
                0xE852: 0x93D7,
                0xE853: 0x93E8,
                0xE854: 0x93E5,
                0xE855: 0x93D8,
                0xE856: 0x93C3,
                0xE857: 0x93DD,
                0xE858: 0x93D0,
                0xE859: 0x93C8,
                0xE85A: 0x93E4,
                0xE85B: 0x941A,
                0xE85C: 0x9414,
                0xE85D: 0x9413,
                0xE85E: 0x9403,
                0xE85F: 0x9407,
                0xE860: 0x9410,
                0xE861: 0x9436,
                0xE862: 0x942B,
                0xE863: 0x9435,
                0xE864: 0x9421,
                0xE865: 0x943A,
                0xE866: 0x9441,
                0xE867: 0x9452,
                0xE868: 0x9444,
                0xE869: 0x945B,
                0xE86A: 0x9460,
                0xE86B: 0x9462,
                0xE86C: 0x945E,
                0xE86D: 0x946A,
                0xE86E: 0x9229,
                0xE86F: 0x9470,
                0xE870: 0x9475,
                0xE871: 0x9477,
                0xE872: 0x947D,
                0xE873: 0x945A,
                0xE874: 0x947C,
                0xE875: 0x947E,
                0xE876: 0x9481,
                0xE877: 0x947F,
                0xE878: 0x9582,
                0xE879: 0x9587,
                0xE87A: 0x958A,
                0xE87B: 0x9594,
                0xE87C: 0x9596,
                0xE87D: 0x9598,
                0xE87E: 0x9599,
                0xE880: 0x95A0,
                0xE881: 0x95A8,
                0xE882: 0x95A7,
                0xE883: 0x95AD,
                0xE884: 0x95BC,
                0xE885: 0x95BB,
                0xE886: 0x95B9,
                0xE887: 0x95BE,
                0xE888: 0x95CA,
                0xE889: 0x6FF6,
                0xE88A: 0x95C3,
                0xE88B: 0x95CD,
                0xE88C: 0x95CC,
                0xE88D: 0x95D5,
                0xE88E: 0x95D4,
                0xE88F: 0x95D6,
                0xE890: 0x95DC,
                0xE891: 0x95E1,
                0xE892: 0x95E5,
                0xE893: 0x95E2,
                0xE894: 0x9621,
                0xE895: 0x9628,
                0xE896: 0x962E,
                0xE897: 0x962F,
                0xE898: 0x9642,
                0xE899: 0x964C,
                0xE89A: 0x964F,
                0xE89B: 0x964B,
                0xE89C: 0x9677,
                0xE89D: 0x965C,
                0xE89E: 0x965E,
                0xE89F: 0x965D,
                0xE8A0: 0x965F,
                0xE8A1: 0x9666,
                0xE8A2: 0x9672,
                0xE8A3: 0x966C,
                0xE8A4: 0x968D,
                0xE8A5: 0x9698,
                0xE8A6: 0x9695,
                0xE8A7: 0x9697,
                0xE8A8: 0x96AA,
                0xE8A9: 0x96A7,
                0xE8AA: 0x96B1,
                0xE8AB: 0x96B2,
                0xE8AC: 0x96B0,
                0xE8AD: 0x96B4,
                0xE8AE: 0x96B6,
                0xE8AF: 0x96B8,
                0xE8B0: 0x96B9,
                0xE8B1: 0x96CE,
                0xE8B2: 0x96CB,
                0xE8B3: 0x96C9,
                0xE8B4: 0x96CD,
                0xE8B5: 0x894D,
                0xE8B6: 0x96DC,
                0xE8B7: 0x970D,
                0xE8B8: 0x96D5,
                0xE8B9: 0x96F9,
                0xE8BA: 0x9704,
                0xE8BB: 0x9706,
                0xE8BC: 0x9708,
                0xE8BD: 0x9713,
                0xE8BE: 0x970E,
                0xE8BF: 0x9711,
                0xE8C0: 0x970F,
                0xE8C1: 0x9716,
                0xE8C2: 0x9719,
                0xE8C3: 0x9724,
                0xE8C4: 0x972A,
                0xE8C5: 0x9730,
                0xE8C6: 0x9739,
                0xE8C7: 0x973D,
                0xE8C8: 0x973E,
                0xE8C9: 0x9744,
                0xE8CA: 0x9746,
                0xE8CB: 0x9748,
                0xE8CC: 0x9742,
                0xE8CD: 0x9749,
                0xE8CE: 0x975C,
                0xE8CF: 0x9760,
                0xE8D0: 0x9764,
                0xE8D1: 0x9766,
                0xE8D2: 0x9768,
                0xE8D3: 0x52D2,
                0xE8D4: 0x976B,
                0xE8D5: 0x9771,
                0xE8D6: 0x9779,
                0xE8D7: 0x9785,
                0xE8D8: 0x977C,
                0xE8D9: 0x9781,
                0xE8DA: 0x977A,
                0xE8DB: 0x9786,
                0xE8DC: 0x978B,
                0xE8DD: 0x978F,
                0xE8DE: 0x9790,
                0xE8DF: 0x979C,
                0xE8E0: 0x97A8,
                0xE8E1: 0x97A6,
                0xE8E2: 0x97A3,
                0xE8E3: 0x97B3,
                0xE8E4: 0x97B4,
                0xE8E5: 0x97C3,
                0xE8E6: 0x97C6,
                0xE8E7: 0x97C8,
                0xE8E8: 0x97CB,
                0xE8E9: 0x97DC,
                0xE8EA: 0x97ED,
                0xE8EB: 0x9F4F,
                0xE8EC: 0x97F2,
                0xE8ED: 0x7ADF,
                0xE8EE: 0x97F6,
                0xE8EF: 0x97F5,
                0xE8F0: 0x980F,
                0xE8F1: 0x980C,
                0xE8F2: 0x9838,
                0xE8F3: 0x9824,
                0xE8F4: 0x9821,
                0xE8F5: 0x9837,
                0xE8F6: 0x983D,
                0xE8F7: 0x9846,
                0xE8F8: 0x984F,
                0xE8F9: 0x984B,
                0xE8FA: 0x986B,
                0xE8FB: 0x986F,
                0xE8FC: 0x9870,
                0xE940: 0x9871,
                0xE941: 0x9874,
                0xE942: 0x9873,
                0xE943: 0x98AA,
                0xE944: 0x98AF,
                0xE945: 0x98B1,
                0xE946: 0x98B6,
                0xE947: 0x98C4,
                0xE948: 0x98C3,
                0xE949: 0x98C6,
                0xE94A: 0x98E9,
                0xE94B: 0x98EB,
                0xE94C: 0x9903,
                0xE94D: 0x9909,
                0xE94E: 0x9912,
                0xE94F: 0x9914,
                0xE950: 0x9918,
                0xE951: 0x9921,
                0xE952: 0x991D,
                0xE953: 0x991E,
                0xE954: 0x9924,
                0xE955: 0x9920,
                0xE956: 0x992C,
                0xE957: 0x992E,
                0xE958: 0x993D,
                0xE959: 0x993E,
                0xE95A: 0x9942,
                0xE95B: 0x9949,
                0xE95C: 0x9945,
                0xE95D: 0x9950,
                0xE95E: 0x994B,
                0xE95F: 0x9951,
                0xE960: 0x9952,
                0xE961: 0x994C,
                0xE962: 0x9955,
                0xE963: 0x9997,
                0xE964: 0x9998,
                0xE965: 0x99A5,
                0xE966: 0x99AD,
                0xE967: 0x99AE,
                0xE968: 0x99BC,
                0xE969: 0x99DF,
                0xE96A: 0x99DB,
                0xE96B: 0x99DD,
                0xE96C: 0x99D8,
                0xE96D: 0x99D1,
                0xE96E: 0x99ED,
                0xE96F: 0x99EE,
                0xE970: 0x99F1,
                0xE971: 0x99F2,
                0xE972: 0x99FB,
                0xE973: 0x99F8,
                0xE974: 0x9A01,
                0xE975: 0x9A0F,
                0xE976: 0x9A05,
                0xE977: 0x99E2,
                0xE978: 0x9A19,
                0xE979: 0x9A2B,
                0xE97A: 0x9A37,
                0xE97B: 0x9A45,
                0xE97C: 0x9A42,
                0xE97D: 0x9A40,
                0xE97E: 0x9A43,
                0xE980: 0x9A3E,
                0xE981: 0x9A55,
                0xE982: 0x9A4D,
                0xE983: 0x9A5B,
                0xE984: 0x9A57,
                0xE985: 0x9A5F,
                0xE986: 0x9A62,
                0xE987: 0x9A65,
                0xE988: 0x9A64,
                0xE989: 0x9A69,
                0xE98A: 0x9A6B,
                0xE98B: 0x9A6A,
                0xE98C: 0x9AAD,
                0xE98D: 0x9AB0,
                0xE98E: 0x9ABC,
                0xE98F: 0x9AC0,
                0xE990: 0x9ACF,
                0xE991: 0x9AD1,
                0xE992: 0x9AD3,
                0xE993: 0x9AD4,
                0xE994: 0x9ADE,
                0xE995: 0x9ADF,
                0xE996: 0x9AE2,
                0xE997: 0x9AE3,
                0xE998: 0x9AE6,
                0xE999: 0x9AEF,
                0xE99A: 0x9AEB,
                0xE99B: 0x9AEE,
                0xE99C: 0x9AF4,
                0xE99D: 0x9AF1,
                0xE99E: 0x9AF7,
                0xE99F: 0x9AFB,
                0xE9A0: 0x9B06,
                0xE9A1: 0x9B18,
                0xE9A2: 0x9B1A,
                0xE9A3: 0x9B1F,
                0xE9A4: 0x9B22,
                0xE9A5: 0x9B23,
                0xE9A6: 0x9B25,
                0xE9A7: 0x9B27,
                0xE9A8: 0x9B28,
                0xE9A9: 0x9B29,
                0xE9AA: 0x9B2A,
                0xE9AB: 0x9B2E,
                0xE9AC: 0x9B2F,
                0xE9AD: 0x9B32,
                0xE9AE: 0x9B44,
                0xE9AF: 0x9B43,
                0xE9B0: 0x9B4F,
                0xE9B1: 0x9B4D,
                0xE9B2: 0x9B4E,
                0xE9B3: 0x9B51,
                0xE9B4: 0x9B58,
                0xE9B5: 0x9B74,
                0xE9B6: 0x9B93,
                0xE9B7: 0x9B83,
                0xE9B8: 0x9B91,
                0xE9B9: 0x9B96,
                0xE9BA: 0x9B97,
                0xE9BB: 0x9B9F,
                0xE9BC: 0x9BA0,
                0xE9BD: 0x9BA8,
                0xE9BE: 0x9BB4,
                0xE9BF: 0x9BC0,
                0xE9C0: 0x9BCA,
                0xE9C1: 0x9BB9,
                0xE9C2: 0x9BC6,
                0xE9C3: 0x9BCF,
                0xE9C4: 0x9BD1,
                0xE9C5: 0x9BD2,
                0xE9C6: 0x9BE3,
                0xE9C7: 0x9BE2,
                0xE9C8: 0x9BE4,
                0xE9C9: 0x9BD4,
                0xE9CA: 0x9BE1,
                0xE9CB: 0x9C3A,
                0xE9CC: 0x9BF2,
                0xE9CD: 0x9BF1,
                0xE9CE: 0x9BF0,
                0xE9CF: 0x9C15,
                0xE9D0: 0x9C14,
                0xE9D1: 0x9C09,
                0xE9D2: 0x9C13,
                0xE9D3: 0x9C0C,
                0xE9D4: 0x9C06,
                0xE9D5: 0x9C08,
                0xE9D6: 0x9C12,
                0xE9D7: 0x9C0A,
                0xE9D8: 0x9C04,
                0xE9D9: 0x9C2E,
                0xE9DA: 0x9C1B,
                0xE9DB: 0x9C25,
                0xE9DC: 0x9C24,
                0xE9DD: 0x9C21,
                0xE9DE: 0x9C30,
                0xE9DF: 0x9C47,
                0xE9E0: 0x9C32,
                0xE9E1: 0x9C46,
                0xE9E2: 0x9C3E,
                0xE9E3: 0x9C5A,
                0xE9E4: 0x9C60,
                0xE9E5: 0x9C67,
                0xE9E6: 0x9C76,
                0xE9E7: 0x9C78,
                0xE9E8: 0x9CE7,
                0xE9E9: 0x9CEC,
                0xE9EA: 0x9CF0,
                0xE9EB: 0x9D09,
                0xE9EC: 0x9D08,
                0xE9ED: 0x9CEB,
                0xE9EE: 0x9D03,
                0xE9EF: 0x9D06,
                0xE9F0: 0x9D2A,
                0xE9F1: 0x9D26,
                0xE9F2: 0x9DAF,
                0xE9F3: 0x9D23,
                0xE9F4: 0x9D1F,
                0xE9F5: 0x9D44,
                0xE9F6: 0x9D15,
                0xE9F7: 0x9D12,
                0xE9F8: 0x9D41,
                0xE9F9: 0x9D3F,
                0xE9FA: 0x9D3E,
                0xE9FB: 0x9D46,
                0xE9FC: 0x9D48,
                0xEA40: 0x9D5D,
                0xEA41: 0x9D5E,
                0xEA42: 0x9D64,
                0xEA43: 0x9D51,
                0xEA44: 0x9D50,
                0xEA45: 0x9D59,
                0xEA46: 0x9D72,
                0xEA47: 0x9D89,
                0xEA48: 0x9D87,
                0xEA49: 0x9DAB,
                0xEA4A: 0x9D6F,
                0xEA4B: 0x9D7A,
                0xEA4C: 0x9D9A,
                0xEA4D: 0x9DA4,
                0xEA4E: 0x9DA9,
                0xEA4F: 0x9DB2,
                0xEA50: 0x9DC4,
                0xEA51: 0x9DC1,
                0xEA52: 0x9DBB,
                0xEA53: 0x9DB8,
                0xEA54: 0x9DBA,
                0xEA55: 0x9DC6,
                0xEA56: 0x9DCF,
                0xEA57: 0x9DC2,
                0xEA58: 0x9DD9,
                0xEA59: 0x9DD3,
                0xEA5A: 0x9DF8,
                0xEA5B: 0x9DE6,
                0xEA5C: 0x9DED,
                0xEA5D: 0x9DEF,
                0xEA5E: 0x9DFD,
                0xEA5F: 0x9E1A,
                0xEA60: 0x9E1B,
                0xEA61: 0x9E1E,
                0xEA62: 0x9E75,
                0xEA63: 0x9E79,
                0xEA64: 0x9E7D,
                0xEA65: 0x9E81,
                0xEA66: 0x9E88,
                0xEA67: 0x9E8B,
                0xEA68: 0x9E8C,
                0xEA69: 0x9E92,
                0xEA6A: 0x9E95,
                0xEA6B: 0x9E91,
                0xEA6C: 0x9E9D,
                0xEA6D: 0x9EA5,
                0xEA6E: 0x9EA9,
                0xEA6F: 0x9EB8,
                0xEA70: 0x9EAA,
                0xEA71: 0x9EAD,
                0xEA72: 0x9761,
                0xEA73: 0x9ECC,
                0xEA74: 0x9ECE,
                0xEA75: 0x9ECF,
                0xEA76: 0x9ED0,
                0xEA77: 0x9ED4,
                0xEA78: 0x9EDC,
                0xEA79: 0x9EDE,
                0xEA7A: 0x9EDD,
                0xEA7B: 0x9EE0,
                0xEA7C: 0x9EE5,
                0xEA7D: 0x9EE8,
                0xEA7E: 0x9EEF,
                0xEA80: 0x9EF4,
                0xEA81: 0x9EF6,
                0xEA82: 0x9EF7,
                0xEA83: 0x9EF9,
                0xEA84: 0x9EFB,
                0xEA85: 0x9EFC,
                0xEA86: 0x9EFD,
                0xEA87: 0x9F07,
                0xEA88: 0x9F08,
                0xEA89: 0x76B7,
                0xEA8A: 0x9F15,
                0xEA8B: 0x9F21,
                0xEA8C: 0x9F2C,
                0xEA8D: 0x9F3E,
                0xEA8E: 0x9F4A,
                0xEA8F: 0x9F52,
                0xEA90: 0x9F54,
                0xEA91: 0x9F63,
                0xEA92: 0x9F5F,
                0xEA93: 0x9F60,
                0xEA94: 0x9F61,
                0xEA95: 0x9F66,
                0xEA96: 0x9F67,
                0xEA97: 0x9F6C,
                0xEA98: 0x9F6A,
                0xEA99: 0x9F77,
                0xEA9A: 0x9F72,
                0xEA9B: 0x9F76,
                0xEA9C: 0x9F95,
                0xEA9D: 0x9F9C,
                0xEA9E: 0x9FA0,
                0xEA9F: 0x582F,
                0xEAA0: 0x69C7,
                0xEAA1: 0x9059,
                0xEAA2: 0x7464,
                0xEAA3: 0x51DC,
                0xEAA4: 0x7199
            };
        /***/ },
        /* 9 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly_1 = __webpack_require__(2);
            function runEuclideanAlgorithm(field, a, b, R) {
                var _a;
                // Assume a's degree is >= b's
                if (a.degree() < b.degree()) _a = [
                    b,
                    a
                ], a = _a[0], b = _a[1];
                var rLast = a;
                var r = b;
                var tLast = field.zero;
                var t = field.one;
                // Run Euclidean algorithm until r's degree is less than R/2
                while(r.degree() >= R / 2){
                    var rLastLast = rLast;
                    var tLastLast = tLast;
                    rLast = r;
                    tLast = t;
                    // Divide rLastLast by rLast, with quotient in q and remainder in r
                    if (rLast.isZero()) // Euclidean algorithm already terminated?
                    return null;
                    r = rLastLast;
                    var q = field.zero;
                    var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
                    var dltInverse = field.inverse(denominatorLeadingTerm);
                    while(r.degree() >= rLast.degree() && !r.isZero()){
                        var degreeDiff = r.degree() - rLast.degree();
                        var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
                        q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
                        r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
                    }
                    t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
                    if (r.degree() >= rLast.degree()) return null;
                }
                var sigmaTildeAtZero = t.getCoefficient(0);
                if (sigmaTildeAtZero === 0) return null;
                var inverse = field.inverse(sigmaTildeAtZero);
                return [
                    t.multiply(inverse),
                    r.multiply(inverse)
                ];
            }
            function findErrorLocations(field, errorLocator) {
                // This is a direct application of Chien's search
                var numErrors = errorLocator.degree();
                if (numErrors === 1) return [
                    errorLocator.getCoefficient(1)
                ];
                var result = new Array(numErrors);
                var errorCount = 0;
                for(var i = 1; i < field.size && errorCount < numErrors; i++)if (errorLocator.evaluateAt(i) === 0) {
                    result[errorCount] = field.inverse(i);
                    errorCount++;
                }
                if (errorCount !== numErrors) return null;
                return result;
            }
            function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
                // This is directly applying Forney's Formula
                var s = errorLocations.length;
                var result = new Array(s);
                for(var i = 0; i < s; i++){
                    var xiInverse = field.inverse(errorLocations[i]);
                    var denominator = 1;
                    for(var j = 0; j < s; j++)if (i !== j) denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
                    result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
                    if (field.generatorBase !== 0) result[i] = field.multiply(result[i], xiInverse);
                }
                return result;
            }
            function decode(bytes, twoS) {
                var outputBytes = new Uint8ClampedArray(bytes.length);
                outputBytes.set(bytes);
                var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
                var poly = new GenericGFPoly_1.default(field, outputBytes);
                var syndromeCoefficients = new Uint8ClampedArray(twoS);
                var error = false;
                for(var s = 0; s < twoS; s++){
                    var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
                    syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
                    if (evaluation !== 0) error = true;
                }
                if (!error) return outputBytes;
                var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
                var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
                if (sigmaOmega === null) return null;
                var errorLocations = findErrorLocations(field, sigmaOmega[0]);
                if (errorLocations == null) return null;
                var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
                for(var i = 0; i < errorLocations.length; i++){
                    var position = outputBytes.length - 1 - field.log(errorLocations[i]);
                    if (position < 0) return null;
                    outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
                }
                return outputBytes;
            }
            exports.decode = decode;
        /***/ },
        /* 10 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.VERSIONS = [
                {
                    infoBits: null,
                    versionNumber: 1,
                    alignmentPatternCenters: [],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 7,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 13,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 17,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 2,
                    alignmentPatternCenters: [
                        6,
                        18
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 34
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 28
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 3,
                    alignmentPatternCenters: [
                        6,
                        22
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 15,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 55
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 4,
                    alignmentPatternCenters: [
                        6,
                        26
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 80
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 32
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 24
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 5,
                    alignmentPatternCenters: [
                        6,
                        30
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 108
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 43
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 12
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 6,
                    alignmentPatternCenters: [
                        6,
                        34
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 27
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x07C94,
                    versionNumber: 7,
                    alignmentPatternCenters: [
                        6,
                        22,
                        38
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 78
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 31
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 14
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x085BC,
                    versionNumber: 8,
                    alignmentPatternCenters: [
                        6,
                        24,
                        42
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 97
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 38
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 39
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 18
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 19
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x09A99,
                    versionNumber: 9,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0A4D3,
                    versionNumber: 10,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 69
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0BBF6,
                    versionNumber: 11,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 81
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 50
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 51
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0C762,
                    versionNumber: 12,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 92
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 93
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 21
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0D847,
                    versionNumber: 13,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 37
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 38
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 21
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0E60D,
                    versionNumber: 14,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46,
                        66
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 40
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0F928,
                    versionNumber: 15,
                    alignmentPatternCenters: [
                        6,
                        26,
                        48,
                        70
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 87
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 88
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 42
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x10B78,
                    versionNumber: 16,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 98
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 99
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1145D,
                    versionNumber: 17,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x12A17,
                    versionNumber: 18,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 120
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 121
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 44
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x13532,
                    versionNumber: 19,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 113
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 114
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 44
                                },
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 45
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 21
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 14
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x149A6,
                    versionNumber: 20,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 42
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x15683,
                    versionNumber: 21,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50,
                        72,
                        94
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 117
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 42
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x168C9,
                    versionNumber: 22,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 111
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 112
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x177EC,
                    versionNumber: 23,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        74,
                        102
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x18EC4,
                    versionNumber: 24,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 30,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x191E1,
                    versionNumber: 25,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 106
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1AFAB,
                    versionNumber: 26,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 114
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 115
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 33,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1B08E,
                    versionNumber: 27,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 24
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1CC1A,
                    versionNumber: 28,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98,
                        122
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1D33F,
                    versionNumber: 29,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 117
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 37,
                                    dataCodewordsPerBlock: 24
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1ED75,
                    versionNumber: 30,
                    alignmentPatternCenters: [
                        6,
                        26,
                        52,
                        78,
                        104,
                        130
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1F250,
                    versionNumber: 31,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82,
                        108,
                        134
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x209D5,
                    versionNumber: 32,
                    alignmentPatternCenters: [
                        6,
                        34,
                        60,
                        86,
                        112,
                        138
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x216F0,
                    versionNumber: 33,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x228BA,
                    versionNumber: 34,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118,
                        146
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 44,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 59,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x2379F,
                    versionNumber: 35,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126,
                        150
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 39,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 41,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x24B0B,
                    versionNumber: 36,
                    alignmentPatternCenters: [
                        6,
                        24,
                        50,
                        76,
                        102,
                        128,
                        154
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 64,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x2542E,
                    versionNumber: 37,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106,
                        132,
                        158
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 49,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 24,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x26A64,
                    versionNumber: 38,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110,
                        136,
                        162
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 48,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x27541,
                    versionNumber: 39,
                    alignmentPatternCenters: [
                        6,
                        26,
                        54,
                        82,
                        110,
                        138,
                        166
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 40,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 43,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 67,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x28C69,
                    versionNumber: 40,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142,
                        170
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 118
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 119
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 61,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                }, 
            ];
        /***/ },
        /* 11 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            function squareToQuadrilateral(p1, p2, p3, p4) {
                var dx3 = p1.x - p2.x + p3.x - p4.x;
                var dy3 = p1.y - p2.y + p3.y - p4.y;
                if (dx3 === 0 && dy3 === 0) return {
                    a11: p2.x - p1.x,
                    a12: p2.y - p1.y,
                    a13: 0,
                    a21: p3.x - p2.x,
                    a22: p3.y - p2.y,
                    a23: 0,
                    a31: p1.x,
                    a32: p1.y,
                    a33: 1
                };
                else {
                    var dx1 = p2.x - p3.x;
                    var dx2 = p4.x - p3.x;
                    var dy1 = p2.y - p3.y;
                    var dy2 = p4.y - p3.y;
                    var denominator = dx1 * dy2 - dx2 * dy1;
                    var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
                    var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
                    return {
                        a11: p2.x - p1.x + a13 * p2.x,
                        a12: p2.y - p1.y + a13 * p2.y,
                        a13: a13,
                        a21: p4.x - p1.x + a23 * p4.x,
                        a22: p4.y - p1.y + a23 * p4.y,
                        a23: a23,
                        a31: p1.x,
                        a32: p1.y,
                        a33: 1
                    };
                }
            }
            function quadrilateralToSquare(p1, p2, p3, p4) {
                // Here, the adjoint serves as the inverse:
                var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
                return {
                    a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
                    a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
                    a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
                    a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
                    a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
                    a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
                    a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
                    a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
                    a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21
                };
            }
            function times(a, b) {
                return {
                    a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
                    a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
                    a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
                    a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
                    a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
                    a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
                    a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
                    a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
                    a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33
                };
            }
            function extract(image, location) {
                var qToS = quadrilateralToSquare({
                    x: 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 6.5,
                    y: location.dimension - 6.5
                }, {
                    x: 3.5,
                    y: location.dimension - 3.5
                });
                var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
                var transform = times(sToQ, qToS);
                var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
                var mappingFunction = function(x, y) {
                    var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
                    return {
                        x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
                        y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator
                    };
                };
                for(var y1 = 0; y1 < location.dimension; y1++)for(var x1 = 0; x1 < location.dimension; x1++){
                    var xValue = x1 + 0.5;
                    var yValue = y1 + 0.5;
                    var sourcePixel = mappingFunction(xValue, yValue);
                    matrix.set(x1, y1, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
                }
                return {
                    matrix: matrix,
                    mappingFunction: mappingFunction
                };
            }
            exports.extract = extract;
        /***/ },
        /* 12 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var MAX_FINDERPATTERNS_TO_SEARCH = 4;
            var MIN_QUAD_RATIO = 0.5;
            var MAX_QUAD_RATIO = 1.5;
            var distance = function(a, b) {
                return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
            };
            function sum(values) {
                return values.reduce(function(a, b) {
                    return a + b;
                });
            }
            // Takes three finder patterns and organizes them into topLeft, topRight, etc
            function reorderFinderPatterns(pattern1, pattern2, pattern3) {
                var _a, _b, _c, _d;
                // Find distances between pattern centers
                var oneTwoDistance = distance(pattern1, pattern2);
                var twoThreeDistance = distance(pattern2, pattern3);
                var oneThreeDistance = distance(pattern1, pattern3);
                var bottomLeft;
                var topLeft;
                var topRight;
                // Assume one closest to other two is B; A and C will just be guesses at first
                if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) _a = [
                    pattern2,
                    pattern1,
                    pattern3
                ], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
                else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) _b = [
                    pattern1,
                    pattern2,
                    pattern3
                ], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
                else _c = [
                    pattern1,
                    pattern3,
                    pattern2
                ], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
                // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
                // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
                // we've got it flipped around and should swap topRight and bottomLeft.
                if ((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y) - (topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x) < 0) _d = [
                    topRight,
                    bottomLeft
                ], bottomLeft = _d[0], topRight = _d[1];
                return {
                    bottomLeft: bottomLeft,
                    topLeft: topLeft,
                    topRight: topRight
                };
            }
            // Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
            function computeDimension(topLeft, topRight, bottomLeft, matrix) {
                var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 + sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
                if (moduleSize < 1) throw new Error("Invalid module size");
                var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
                var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
                var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
                switch(dimension % 4){
                    case 0:
                        dimension++;
                        break;
                    case 2:
                        dimension--;
                        break;
                }
                return {
                    dimension: dimension,
                    moduleSize: moduleSize
                };
            }
            // Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
            // Returns an array of elements, representing the pixel size of the black white run.
            // Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
            function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
                var switchPoints = [
                    {
                        x: Math.floor(origin.x),
                        y: Math.floor(origin.y)
                    }
                ];
                var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
                var fromX;
                var fromY;
                var toX;
                var toY;
                if (steep) {
                    fromX = Math.floor(origin.y);
                    fromY = Math.floor(origin.x);
                    toX = Math.floor(end.y);
                    toY = Math.floor(end.x);
                } else {
                    fromX = Math.floor(origin.x);
                    fromY = Math.floor(origin.y);
                    toX = Math.floor(end.x);
                    toY = Math.floor(end.y);
                }
                var dx = Math.abs(toX - fromX);
                var dy = Math.abs(toY - fromY);
                var error = Math.floor(-dx / 2);
                var xStep = fromX < toX ? 1 : -1;
                var yStep = fromY < toY ? 1 : -1;
                var currentPixel = true;
                // Loop up until x == toX, but not beyond
                for(var x = fromX, y = fromY; x !== toX + xStep; x += xStep){
                    // Does current pixel mean we have moved white to black or vice versa?
                    // Scanning black in state 0,2 and white in state 1, so if we find the wrong
                    // color, advance to next state or end if we are in state 2 already
                    var realX = steep ? y : x;
                    var realY = steep ? x : y;
                    if (matrix.get(realX, realY) !== currentPixel) {
                        currentPixel = !currentPixel;
                        switchPoints.push({
                            x: realX,
                            y: realY
                        });
                        if (switchPoints.length === length + 1) break;
                    }
                    error += dy;
                    if (error > 0) {
                        if (y === toY) break;
                        y += yStep;
                        error -= dx;
                    }
                }
                var distances = [];
                for(var i = 0; i < length; i++)if (switchPoints[i] && switchPoints[i + 1]) distances.push(distance(switchPoints[i], switchPoints[i + 1]));
                else distances.push(0);
                return distances;
            }
            // Takes an origin point and an end point and counts the sizes of the black white run in the origin point
            // along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
            // of the black white run. Takes a length which represents the number of switches from black to white to look for.
            function countBlackWhiteRun(origin, end, matrix, length) {
                var _a;
                var rise = end.y - origin.y;
                var run = end.x - origin.x;
                var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
                var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, {
                    x: origin.x - run,
                    y: origin.y - rise
                }, matrix, Math.ceil(length / 2));
                var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
                return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
            }
            // Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
            // that is the amount the run diverges from the expected ratio
            function scoreBlackWhiteRun(sequence, ratios) {
                var averageSize = sum(sequence) / sum(ratios);
                var error = 0;
                ratios.forEach(function(ratio, i) {
                    error += Math.pow(sequence[i] - ratio * averageSize, 2);
                });
                return {
                    averageSize: averageSize,
                    error: error
                };
            }
            // Takes an X,Y point and an array of sizes and scores the point against those ratios.
            // For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
            // against that.
            function scorePattern(point, ratios, matrix) {
                try {
                    var horizontalRun = countBlackWhiteRun(point, {
                        x: -1,
                        y: point.y
                    }, matrix, ratios.length);
                    var verticalRun = countBlackWhiteRun(point, {
                        x: point.x,
                        y: -1
                    }, matrix, ratios.length);
                    var topLeftPoint = {
                        x: Math.max(0, point.x - point.y) - 1,
                        y: Math.max(0, point.y - point.x) - 1
                    };
                    var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
                    var bottomLeftPoint = {
                        x: Math.min(matrix.width, point.x + point.y) + 1,
                        y: Math.min(matrix.height, point.y + point.x) + 1
                    };
                    var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
                    var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
                    var vertError = scoreBlackWhiteRun(verticalRun, ratios);
                    var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
                    var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
                    var ratioError = Math.sqrt(horzError.error * horzError.error + vertError.error * vertError.error + diagDownError.error * diagDownError.error + diagUpError.error * diagUpError.error);
                    var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
                    var sizeError = (Math.pow(horzError.averageSize - avgSize, 2) + Math.pow(vertError.averageSize - avgSize, 2) + Math.pow(diagDownError.averageSize - avgSize, 2) + Math.pow(diagUpError.averageSize - avgSize, 2)) / avgSize;
                    return ratioError + sizeError;
                } catch (_a) {
                    return Infinity;
                }
            }
            function recenterLocation(matrix, p) {
                var leftX = Math.round(p.x);
                while(matrix.get(leftX, Math.round(p.y)))leftX--;
                var rightX = Math.round(p.x);
                while(matrix.get(rightX, Math.round(p.y)))rightX++;
                var x = (leftX + rightX) / 2;
                var topY = Math.round(p.y);
                while(matrix.get(Math.round(x), topY))topY--;
                var bottomY = Math.round(p.y);
                while(matrix.get(Math.round(x), bottomY))bottomY++;
                var y = (topY + bottomY) / 2;
                return {
                    x: x,
                    y: y
                };
            }
            function locate(matrix) {
                var finderPatternQuads = [];
                var activeFinderPatternQuads = [];
                var alignmentPatternQuads = [];
                var activeAlignmentPatternQuads = [];
                var _loop_1 = function(y) {
                    var length_1 = 0;
                    var lastBit = false;
                    var scans = [
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    var _loop_2 = function(x) {
                        var v = matrix.get(x, y);
                        if (v === lastBit) length_1++;
                        else {
                            scans = [
                                scans[1],
                                scans[2],
                                scans[3],
                                scans[4],
                                length_1
                            ];
                            length_1 = 1;
                            lastBit = v;
                            // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
                            var averageFinderPatternBlocksize = sum(scans) / 7;
                            var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize && Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && !v; // And make sure the current pixel is white since finder patterns are bordered in white
                            // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
                            var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
                            var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && v; // Is the current pixel black since alignment patterns are bordered in black
                            if (validFinderPattern) {
                                // Compute the start and end x values of the large center black square
                                var endX_1 = x - scans[3] - scans[4];
                                var startX_1 = endX_1 - scans[2];
                                var line = {
                                    startX: startX_1,
                                    endX: endX_1,
                                    y: y
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeFinderPatternQuads.filter(function(q) {
                                    return startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeFinderPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                            if (validAlignmentPattern) {
                                // Compute the start and end x values of the center black square
                                var endX_2 = x - scans[4];
                                var startX_2 = endX_2 - scans[3];
                                var line = {
                                    startX: startX_2,
                                    y: y,
                                    endX: endX_2
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeAlignmentPatternQuads.filter(function(q) {
                                    return startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeAlignmentPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                        }
                    };
                    for(var x2 = -1; x2 <= matrix.width; x2++)_loop_2(x2);
                    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y !== y && q.bottom.y - q.top.y >= 2;
                    }));
                    activeFinderPatternQuads = activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y !== y;
                    }));
                    activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                };
                for(var y2 = 0; y2 <= matrix.height; y2++)_loop_1(y2);
                finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }));
                alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
                var finderPatternGroups = finderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }) // All quads must be at least 2px tall since the center square is larger than a block
                .map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.round(x), Math.round(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var score = scorePattern({
                        x: Math.round(x),
                        y: Math.round(y)
                    }, [
                        1,
                        1,
                        3,
                        1,
                        1
                    ], matrix);
                    return {
                        score: score,
                        x: x,
                        y: y,
                        size: size
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected quads from above
                .sort(function(a, b) {
                    return a.score - b.score;
                })// Now take the top finder pattern options and try to find 2 other options with a similar size.
                .map(function(point, i, finderPatterns) {
                    if (i > MAX_FINDERPATTERNS_TO_SEARCH) return null;
                    var otherPoints = finderPatterns.filter(function(p, ii) {
                        return i !== ii;
                    }).map(function(p) {
                        return {
                            x: p.x,
                            y: p.y,
                            score: p.score + Math.pow(p.size - point.size, 2) / point.size,
                            size: p.size
                        };
                    }).sort(function(a, b) {
                        return a.score - b.score;
                    });
                    if (otherPoints.length < 2) return null;
                    var score = point.score + otherPoints[0].score + otherPoints[1].score;
                    return {
                        points: [
                            point
                        ].concat(otherPoints.slice(0, 2)),
                        score: score
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected finder patterns from above
                .sort(function(a, b) {
                    return a.score - b.score;
                });
                if (finderPatternGroups.length === 0) return null;
                var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
                var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
                var result = [];
                if (alignment) result.push({
                    alignmentPattern: {
                        x: alignment.alignmentPattern.x,
                        y: alignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: bottomLeft.x,
                        y: bottomLeft.y
                    },
                    dimension: alignment.dimension,
                    topLeft: {
                        x: topLeft.x,
                        y: topLeft.y
                    },
                    topRight: {
                        x: topRight.x,
                        y: topRight.y
                    }
                });
                // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
                // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
                // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
                // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
                // attempts at decoding harder images.
                var midTopRight = recenterLocation(matrix, topRight);
                var midTopLeft = recenterLocation(matrix, topLeft);
                var midBottomLeft = recenterLocation(matrix, bottomLeft);
                var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
                if (centeredAlignment) result.push({
                    alignmentPattern: {
                        x: centeredAlignment.alignmentPattern.x,
                        y: centeredAlignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: midBottomLeft.x,
                        y: midBottomLeft.y
                    },
                    topLeft: {
                        x: midTopLeft.x,
                        y: midTopLeft.y
                    },
                    topRight: {
                        x: midTopRight.x,
                        y: midTopRight.y
                    },
                    dimension: centeredAlignment.dimension
                });
                if (result.length === 0) return null;
                return result;
            }
            exports.locate = locate;
            function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
                var _a;
                // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
                // We'll use these to help find the alignment pattern but also later when we do the extraction.
                var dimension;
                var moduleSize;
                try {
                    _a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize;
                } catch (e) {
                    return null;
                }
                // Now find the alignment pattern
                var bottomRightFinderPattern = {
                    x: topRight.x - topLeft.x + bottomLeft.x,
                    y: topRight.y - topLeft.y + bottomLeft.y
                };
                var modulesBetweenFinderPatterns = (distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize;
                var correctionToTopLeft = 1 - 3 / modulesBetweenFinderPatterns;
                var expectedAlignmentPattern = {
                    x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
                    y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y)
                };
                var alignmentPatterns = alignmentPatternQuads.map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.floor(x), Math.floor(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var sizeScore = scorePattern({
                        x: Math.floor(x),
                        y: Math.floor(y)
                    }, [
                        1,
                        1,
                        1
                    ], matrix);
                    var score = sizeScore + distance({
                        x: x,
                        y: y
                    }, expectedAlignmentPattern);
                    return {
                        x: x,
                        y: y,
                        score: score
                    };
                }).filter(function(v) {
                    return !!v;
                }).sort(function(a, b) {
                    return a.score - b.score;
                });
                // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
                // so we can only use our best guess.
                var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
                return {
                    alignmentPattern: alignmentPattern,
                    dimension: dimension
                };
            }
        /***/ }
    ])["default"];
});

},{}],"iNbej":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @type {import('.').identicon}
 */ parcelHelpers.export(exports, "identicon", ()=>identicon
);
parcelHelpers.export(exports, "identiconSvg", ()=>identiconSvg
);
// density of 4 for the lowest probability of collision
const SQUARE_DENSITY = 4;
// 18 different colors only for easy distinction
const COLORS_NB = 18;
const DEFAULT_SATURATION = 50;
const DEFAULT_LIGHTNESS = 50;
// 32 bit FNV-1a hash parameters
const FNV_PRIME = 16777619;
const OFFSET_BASIS = 2166136261;
/**
 * @type {(str: string): number}
 */ // based on the FNV-1a hash algorithm, modified for *signed* 32 bit integers http://www.isthe.com/chongo/tech/comp/fnv/index.html
function simpleHash(str) {
    return str.split('')// >>> 0 for 32 bit unsigned integer conversion https://2ality.com/2012/02/js-integers.html
    .reduce((hash, char)=>((hash ^ char.charCodeAt(0)) >>> 0) * FNV_PRIME
    , OFFSET_BASIS);
}
function identicon(username, saturation = DEFAULT_SATURATION, lightness = DEFAULT_LIGHTNESS) {
    const hash = simpleHash(username);
    // dividing hash by FNV_PRIME to get last XOR result for better color randomness (will be an integer except for empty string hash)
    const hue = hash / FNV_PRIME % COLORS_NB * (360 / COLORS_NB);
    const rects = [
        ...Array(username ? 25 : 0).keys()
    ]// 2 + ((3 * 5 - 1) - modulo) to concentrate squares at the center
    .map((i)=>hash % (16 - i % 15) < SQUARE_DENSITY ? `<rect x="${i > 14 ? 7 - ~~(i / 5) : ~~(i / 5)}" y="${i % 5}" width="1" height="1"/>` : ''
    ).join('');
    // xmlns attribute added in case of SVG file generation https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg#sect1
    return `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(${hue} ${saturation}% ${lightness}%)">${rects}</svg>`;
}
const identiconSvg = // optional chaining only available on node 14+
globalThis.customElements && /*@__PURE__*/ customElements.define('identicon-svg', class extends HTMLElement {
    connectedCallback() {
        this.identiconSvg();
    }
    attributeChangedCallback() {
        this.identiconSvg();
    }
    static get observedAttributes() {
        return [
            'username',
            'saturation',
            'lightness'
        ];
    }
    identiconSvg() {
        this.innerHTML = identicon(this.getAttribute('username') || "", this.getAttribute('saturation') || DEFAULT_SATURATION, this.getAttribute('lightness') || DEFAULT_LIGHTNESS);
    }
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7Zp8Z":[function(require,module,exports) {
/*
 * QRious v4.0.2
 * Copyright (C) 2017 Alasdair Mercer
 * Copyright (C) 2010 Tom Zerucha
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */ (function(global, factory) {
    module.exports = factory();
})(this, function() {
    'use strict';
    /*
   * Copyright (C) 2017 Alasdair Mercer, !ninja
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */ /**
   * A bare-bones constructor for surrogate prototype swapping.
   *
   * @private
   * @constructor
   */ var Constructor = /* istanbul ignore next */ function() {};
    /**
   * A reference to <code>Object.prototype.hasOwnProperty</code>.
   *
   * @private
   * @type {Function}
   */ var hasOwnProperty = Object.prototype.hasOwnProperty;
    /**
   * A reference to <code>Array.prototype.slice</code>.
   *
   * @private
   * @type {Function}
   */ var slice = Array.prototype.slice;
    /**
   * Creates an object which inherits the given <code>prototype</code>.
   *
   * Optionally, the created object can be extended further with the specified <code>properties</code>.
   *
   * @param {Object} prototype - the prototype to be inherited by the created object
   * @param {Object} [properties] - the optional properties to be extended by the created object
   * @return {Object} The newly created object.
   * @private
   */ function createObject(prototype, properties) {
        var result;
        /* istanbul ignore next */ if (typeof Object.create === 'function') result = Object.create(prototype);
        else {
            Constructor.prototype = prototype;
            result = new Constructor();
            Constructor.prototype = null;
        }
        if (properties) extendObject(true, result, properties);
        return result;
    }
    /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   */ function extend(name, constructor, prototype, statics) {
        var superConstructor = this;
        if (typeof name !== 'string') {
            statics = prototype;
            prototype = constructor;
            constructor = name;
            name = null;
        }
        if (typeof constructor !== 'function') {
            statics = prototype;
            prototype = constructor;
            constructor = function() {
                return superConstructor.apply(this, arguments);
            };
        }
        extendObject(false, constructor, superConstructor, statics);
        constructor.prototype = createObject(superConstructor.prototype, prototype);
        constructor.prototype.constructor = constructor;
        constructor.class_ = name || superConstructor.class_;
        constructor.super_ = superConstructor;
        return constructor;
    }
    /**
   * Extends the specified <code>target</code> object with the properties in each of the <code>sources</code> provided.
   *
   * if any source is <code>null</code> it will be ignored.
   *
   * @param {boolean} own - <code>true</code> to only copy <b>own</b> properties from <code>sources</code> onto
   * <code>target</code>; otherwise <code>false</code>
   * @param {Object} target - the target object which should be extended
   * @param {...Object} [sources] - the source objects whose properties are to be copied onto <code>target</code>
   * @return {void}
   * @private
   */ function extendObject(own, target, sources) {
        sources = slice.call(arguments, 2);
        var property;
        var source;
        for(var i = 0, length = sources.length; i < length; i++){
            source = sources[i];
            for(property in source)if (!own || hasOwnProperty.call(source, property)) target[property] = source[property];
        }
    }
    var extend_1 = extend;
    /**
   * The base class from which all others should extend.
   *
   * @public
   * @constructor
   */ function Nevis() {}
    Nevis.class_ = 'Nevis';
    Nevis.super_ = Object;
    /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   * @static
   * @memberof Nevis
   */ Nevis.extend = extend_1;
    var nevis = Nevis;
    var lite = nevis;
    /**
   * Responsible for rendering a QR code {@link Frame} on a specific type of element.
   *
   * A renderer may be dependant on the rendering of another element, so the ordering of their execution is important.
   *
   * The rendering of a element can be deferred by disabling the renderer initially, however, any attempt get the element
   * from the renderer will result in it being immediately enabled and the element being rendered.
   *
   * @param {QRious} qrious - the {@link QRious} instance to be used
   * @param {*} element - the element onto which the QR code is to be rendered
   * @param {boolean} [enabled] - <code>true</code> this {@link Renderer} is enabled; otherwise <code>false</code>.
   * @public
   * @class
   * @extends Nevis
   */ var Renderer = lite.extend(function(qrious, element, enabled) {
        /**
     * The {@link QRious} instance.
     *
     * @protected
     * @type {QRious}
     * @memberof Renderer#
     */ this.qrious = qrious;
        /**
     * The element onto which this {@link Renderer} is rendering the QR code.
     *
     * @protected
     * @type {*}
     * @memberof Renderer#
     */ this.element = element;
        this.element.qrious = qrious;
        /**
     * Whether this {@link Renderer} is enabled.
     *
     * @protected
     * @type {boolean}
     * @memberof Renderer#
     */ this.enabled = Boolean(enabled);
    }, {
        /**
     * Draws the specified QR code <code>frame</code> on the underlying element.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @param {Frame} frame - the {@link Frame} to be drawn
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */ draw: function(frame) {},
        /**
     * Returns the element onto which this {@link Renderer} is rendering the QR code.
     *
     * If this method is called while this {@link Renderer} is disabled, it will be immediately enabled and rendered
     * before the element is returned.
     *
     * @return {*} The element.
     * @public
     * @memberof Renderer#
     */ getElement: function() {
            if (!this.enabled) {
                this.enabled = true;
                this.render();
            }
            return this.element;
        },
        /**
     * Calculates the size (in pixel units) to represent an individual module within the QR code based on the
     * <code>frame</code> provided.
     *
     * Any configured padding will be excluded from the returned size.
     *
     * The returned value will be at least one, even in cases where the size of the QR code does not fit its contents.
     * This is done so that the inevitable clipping is handled more gracefully since this way at least something is
     * displayed instead of just a blank space filled by the background color.
     *
     * @param {Frame} frame - the {@link Frame} from which the module size is to be derived
     * @return {number} The pixel size for each module in the QR code which will be no less than one.
     * @protected
     * @memberof Renderer#
     */ getModuleSize: function(frame) {
            var qrious = this.qrious;
            var padding = qrious.padding || 0;
            var pixels = Math.floor((qrious.size - padding * 2) / frame.width);
            return Math.max(1, pixels);
        },
        /**
     * Calculates the offset/padding (in pixel units) to be inserted before the QR code based on the <code>frame</code>
     * provided.
     *
     * The returned value will be zero if there is no available offset or if the size of the QR code does not fit its
     * contents. It will never be a negative value. This is done so that the inevitable clipping appears more naturally
     * and it is not clipped from all directions.
     *
     * @param {Frame} frame - the {@link Frame} from which the offset is to be derived
     * @return {number} The pixel offset for the QR code which will be no less than zero.
     * @protected
     * @memberof Renderer#
     */ getOffset: function(frame) {
            var qrious = this.qrious;
            var padding = qrious.padding;
            if (padding != null) return padding;
            var moduleSize = this.getModuleSize(frame);
            var offset = Math.floor((qrious.size - moduleSize * frame.width) / 2);
            return Math.max(0, offset);
        },
        /**
     * Renders a QR code on the underlying element based on the <code>frame</code> provided.
     *
     * @param {Frame} frame - the {@link Frame} to be rendered
     * @return {void}
     * @public
     * @memberof Renderer#
     */ render: function(frame) {
            if (this.enabled) {
                this.resize();
                this.reset();
                this.draw(frame);
            }
        },
        /**
     * Resets the underlying element, effectively clearing any previously rendered QR code.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */ reset: function() {},
        /**
     * Ensures that the size of the underlying element matches that defined on the associated {@link QRious} instance.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */ resize: function() {}
    });
    var Renderer_1 = Renderer;
    /**
   * An implementation of {@link Renderer} for working with <code>canvas</code> elements.
   *
   * @public
   * @class
   * @extends Renderer
   */ var CanvasRenderer = Renderer_1.extend({
        /**
     * @override
     */ draw: function(frame) {
            var i, j;
            var qrious = this.qrious;
            var moduleSize = this.getModuleSize(frame);
            var offset = this.getOffset(frame);
            var context = this.element.getContext('2d');
            context.fillStyle = qrious.foreground;
            context.globalAlpha = qrious.foregroundAlpha;
            for(i = 0; i < frame.width; i++){
                for(j = 0; j < frame.width; j++)if (frame.buffer[j * frame.width + i]) context.fillRect(moduleSize * i + offset, moduleSize * j + offset, moduleSize, moduleSize);
            }
        },
        /**
     * @override
     */ reset: function() {
            var qrious = this.qrious;
            var context = this.element.getContext('2d');
            var size = qrious.size;
            context.lineWidth = 1;
            context.clearRect(0, 0, size, size);
            context.fillStyle = qrious.background;
            context.globalAlpha = qrious.backgroundAlpha;
            context.fillRect(0, 0, size, size);
        },
        /**
     * @override
     */ resize: function() {
            var element = this.element;
            element.width = element.height = this.qrious.size;
        }
    });
    var CanvasRenderer_1 = CanvasRenderer;
    /* eslint no-multi-spaces: "off" */ /**
   * Contains alignment pattern information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Alignment = lite.extend(null, {
        /**
     * The alignment pattern block.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Alignment
     */ BLOCK: [
            0,
            11,
            15,
            19,
            23,
            27,
            31,
            16,
            18,
            20,
            22,
            24,
            26,
            28,
            20,
            22,
            24,
            24,
            26,
            28,
            28,
            22,
            24,
            24,
            26,
            26,
            28,
            28,
            24,
            24,
            26,
            26,
            26,
            28,
            28,
            24,
            26,
            26,
            26,
            28,
            28
        ]
    });
    var Alignment_1 = Alignment;
    /* eslint no-multi-spaces: "off" */ /**
   * Contains error correction information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var ErrorCorrection = lite.extend(null, {
        /**
     * The error correction blocks.
     *
     * There are four elements per version. The first two indicate the number of blocks, then the data width, and finally
     * the ECC width.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof ErrorCorrection
     */ BLOCKS: [
            1,
            0,
            19,
            7,
            1,
            0,
            16,
            10,
            1,
            0,
            13,
            13,
            1,
            0,
            9,
            17,
            1,
            0,
            34,
            10,
            1,
            0,
            28,
            16,
            1,
            0,
            22,
            22,
            1,
            0,
            16,
            28,
            1,
            0,
            55,
            15,
            1,
            0,
            44,
            26,
            2,
            0,
            17,
            18,
            2,
            0,
            13,
            22,
            1,
            0,
            80,
            20,
            2,
            0,
            32,
            18,
            2,
            0,
            24,
            26,
            4,
            0,
            9,
            16,
            1,
            0,
            108,
            26,
            2,
            0,
            43,
            24,
            2,
            2,
            15,
            18,
            2,
            2,
            11,
            22,
            2,
            0,
            68,
            18,
            4,
            0,
            27,
            16,
            4,
            0,
            19,
            24,
            4,
            0,
            15,
            28,
            2,
            0,
            78,
            20,
            4,
            0,
            31,
            18,
            2,
            4,
            14,
            18,
            4,
            1,
            13,
            26,
            2,
            0,
            97,
            24,
            2,
            2,
            38,
            22,
            4,
            2,
            18,
            22,
            4,
            2,
            14,
            26,
            2,
            0,
            116,
            30,
            3,
            2,
            36,
            22,
            4,
            4,
            16,
            20,
            4,
            4,
            12,
            24,
            2,
            2,
            68,
            18,
            4,
            1,
            43,
            26,
            6,
            2,
            19,
            24,
            6,
            2,
            15,
            28,
            4,
            0,
            81,
            20,
            1,
            4,
            50,
            30,
            4,
            4,
            22,
            28,
            3,
            8,
            12,
            24,
            2,
            2,
            92,
            24,
            6,
            2,
            36,
            22,
            4,
            6,
            20,
            26,
            7,
            4,
            14,
            28,
            4,
            0,
            107,
            26,
            8,
            1,
            37,
            22,
            8,
            4,
            20,
            24,
            12,
            4,
            11,
            22,
            3,
            1,
            115,
            30,
            4,
            5,
            40,
            24,
            11,
            5,
            16,
            20,
            11,
            5,
            12,
            24,
            5,
            1,
            87,
            22,
            5,
            5,
            41,
            24,
            5,
            7,
            24,
            30,
            11,
            7,
            12,
            24,
            5,
            1,
            98,
            24,
            7,
            3,
            45,
            28,
            15,
            2,
            19,
            24,
            3,
            13,
            15,
            30,
            1,
            5,
            107,
            28,
            10,
            1,
            46,
            28,
            1,
            15,
            22,
            28,
            2,
            17,
            14,
            28,
            5,
            1,
            120,
            30,
            9,
            4,
            43,
            26,
            17,
            1,
            22,
            28,
            2,
            19,
            14,
            28,
            3,
            4,
            113,
            28,
            3,
            11,
            44,
            26,
            17,
            4,
            21,
            26,
            9,
            16,
            13,
            26,
            3,
            5,
            107,
            28,
            3,
            13,
            41,
            26,
            15,
            5,
            24,
            30,
            15,
            10,
            15,
            28,
            4,
            4,
            116,
            28,
            17,
            0,
            42,
            26,
            17,
            6,
            22,
            28,
            19,
            6,
            16,
            30,
            2,
            7,
            111,
            28,
            17,
            0,
            46,
            28,
            7,
            16,
            24,
            30,
            34,
            0,
            13,
            24,
            4,
            5,
            121,
            30,
            4,
            14,
            47,
            28,
            11,
            14,
            24,
            30,
            16,
            14,
            15,
            30,
            6,
            4,
            117,
            30,
            6,
            14,
            45,
            28,
            11,
            16,
            24,
            30,
            30,
            2,
            16,
            30,
            8,
            4,
            106,
            26,
            8,
            13,
            47,
            28,
            7,
            22,
            24,
            30,
            22,
            13,
            15,
            30,
            10,
            2,
            114,
            28,
            19,
            4,
            46,
            28,
            28,
            6,
            22,
            28,
            33,
            4,
            16,
            30,
            8,
            4,
            122,
            30,
            22,
            3,
            45,
            28,
            8,
            26,
            23,
            30,
            12,
            28,
            15,
            30,
            3,
            10,
            117,
            30,
            3,
            23,
            45,
            28,
            4,
            31,
            24,
            30,
            11,
            31,
            15,
            30,
            7,
            7,
            116,
            30,
            21,
            7,
            45,
            28,
            1,
            37,
            23,
            30,
            19,
            26,
            15,
            30,
            5,
            10,
            115,
            30,
            19,
            10,
            47,
            28,
            15,
            25,
            24,
            30,
            23,
            25,
            15,
            30,
            13,
            3,
            115,
            30,
            2,
            29,
            46,
            28,
            42,
            1,
            24,
            30,
            23,
            28,
            15,
            30,
            17,
            0,
            115,
            30,
            10,
            23,
            46,
            28,
            10,
            35,
            24,
            30,
            19,
            35,
            15,
            30,
            17,
            1,
            115,
            30,
            14,
            21,
            46,
            28,
            29,
            19,
            24,
            30,
            11,
            46,
            15,
            30,
            13,
            6,
            115,
            30,
            14,
            23,
            46,
            28,
            44,
            7,
            24,
            30,
            59,
            1,
            16,
            30,
            12,
            7,
            121,
            30,
            12,
            26,
            47,
            28,
            39,
            14,
            24,
            30,
            22,
            41,
            15,
            30,
            6,
            14,
            121,
            30,
            6,
            34,
            47,
            28,
            46,
            10,
            24,
            30,
            2,
            64,
            15,
            30,
            17,
            4,
            122,
            30,
            29,
            14,
            46,
            28,
            49,
            10,
            24,
            30,
            24,
            46,
            15,
            30,
            4,
            18,
            122,
            30,
            13,
            32,
            46,
            28,
            48,
            14,
            24,
            30,
            42,
            32,
            15,
            30,
            20,
            4,
            117,
            30,
            40,
            7,
            47,
            28,
            43,
            22,
            24,
            30,
            10,
            67,
            15,
            30,
            19,
            6,
            118,
            30,
            18,
            31,
            47,
            28,
            34,
            34,
            24,
            30,
            20,
            61,
            15,
            30
        ],
        /**
     * The final format bits with mask (level << 3 | mask).
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof ErrorCorrection
     */ FINAL_FORMAT: [
            // L
            0x77c4,
            0x72f3,
            0x7daa,
            0x789d,
            0x662f,
            0x6318,
            0x6c41,
            0x6976,
            // M
            0x5412,
            0x5125,
            0x5e7c,
            0x5b4b,
            0x45f9,
            0x40ce,
            0x4f97,
            0x4aa0,
            // Q
            0x355f,
            0x3068,
            0x3f31,
            0x3a06,
            0x24b4,
            0x2183,
            0x2eda,
            0x2bed,
            // H
            0x1689,
            0x13be,
            0x1ce7,
            0x19d0,
            0x0762,
            0x0255,
            0x0d0c,
            0x083b
        ],
        /**
     * A map of human-readable ECC levels.
     *
     * @public
     * @static
     * @type {Object.<string, number>}
     * @memberof ErrorCorrection
     */ LEVELS: {
            L: 1,
            M: 2,
            Q: 3,
            H: 4
        }
    });
    var ErrorCorrection_1 = ErrorCorrection;
    /**
   * Contains Galois field information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Galois = lite.extend(null, {
        /**
     * The Galois field exponent table.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Galois
     */ EXPONENT: [
            0x01,
            0x02,
            0x04,
            0x08,
            0x10,
            0x20,
            0x40,
            0x80,
            0x1d,
            0x3a,
            0x74,
            0xe8,
            0xcd,
            0x87,
            0x13,
            0x26,
            0x4c,
            0x98,
            0x2d,
            0x5a,
            0xb4,
            0x75,
            0xea,
            0xc9,
            0x8f,
            0x03,
            0x06,
            0x0c,
            0x18,
            0x30,
            0x60,
            0xc0,
            0x9d,
            0x27,
            0x4e,
            0x9c,
            0x25,
            0x4a,
            0x94,
            0x35,
            0x6a,
            0xd4,
            0xb5,
            0x77,
            0xee,
            0xc1,
            0x9f,
            0x23,
            0x46,
            0x8c,
            0x05,
            0x0a,
            0x14,
            0x28,
            0x50,
            0xa0,
            0x5d,
            0xba,
            0x69,
            0xd2,
            0xb9,
            0x6f,
            0xde,
            0xa1,
            0x5f,
            0xbe,
            0x61,
            0xc2,
            0x99,
            0x2f,
            0x5e,
            0xbc,
            0x65,
            0xca,
            0x89,
            0x0f,
            0x1e,
            0x3c,
            0x78,
            0xf0,
            0xfd,
            0xe7,
            0xd3,
            0xbb,
            0x6b,
            0xd6,
            0xb1,
            0x7f,
            0xfe,
            0xe1,
            0xdf,
            0xa3,
            0x5b,
            0xb6,
            0x71,
            0xe2,
            0xd9,
            0xaf,
            0x43,
            0x86,
            0x11,
            0x22,
            0x44,
            0x88,
            0x0d,
            0x1a,
            0x34,
            0x68,
            0xd0,
            0xbd,
            0x67,
            0xce,
            0x81,
            0x1f,
            0x3e,
            0x7c,
            0xf8,
            0xed,
            0xc7,
            0x93,
            0x3b,
            0x76,
            0xec,
            0xc5,
            0x97,
            0x33,
            0x66,
            0xcc,
            0x85,
            0x17,
            0x2e,
            0x5c,
            0xb8,
            0x6d,
            0xda,
            0xa9,
            0x4f,
            0x9e,
            0x21,
            0x42,
            0x84,
            0x15,
            0x2a,
            0x54,
            0xa8,
            0x4d,
            0x9a,
            0x29,
            0x52,
            0xa4,
            0x55,
            0xaa,
            0x49,
            0x92,
            0x39,
            0x72,
            0xe4,
            0xd5,
            0xb7,
            0x73,
            0xe6,
            0xd1,
            0xbf,
            0x63,
            0xc6,
            0x91,
            0x3f,
            0x7e,
            0xfc,
            0xe5,
            0xd7,
            0xb3,
            0x7b,
            0xf6,
            0xf1,
            0xff,
            0xe3,
            0xdb,
            0xab,
            0x4b,
            0x96,
            0x31,
            0x62,
            0xc4,
            0x95,
            0x37,
            0x6e,
            0xdc,
            0xa5,
            0x57,
            0xae,
            0x41,
            0x82,
            0x19,
            0x32,
            0x64,
            0xc8,
            0x8d,
            0x07,
            0x0e,
            0x1c,
            0x38,
            0x70,
            0xe0,
            0xdd,
            0xa7,
            0x53,
            0xa6,
            0x51,
            0xa2,
            0x59,
            0xb2,
            0x79,
            0xf2,
            0xf9,
            0xef,
            0xc3,
            0x9b,
            0x2b,
            0x56,
            0xac,
            0x45,
            0x8a,
            0x09,
            0x12,
            0x24,
            0x48,
            0x90,
            0x3d,
            0x7a,
            0xf4,
            0xf5,
            0xf7,
            0xf3,
            0xfb,
            0xeb,
            0xcb,
            0x8b,
            0x0b,
            0x16,
            0x2c,
            0x58,
            0xb0,
            0x7d,
            0xfa,
            0xe9,
            0xcf,
            0x83,
            0x1b,
            0x36,
            0x6c,
            0xd8,
            0xad,
            0x47,
            0x8e,
            0x00
        ],
        /**
     * The Galois field log table.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Galois
     */ LOG: [
            0xff,
            0x00,
            0x01,
            0x19,
            0x02,
            0x32,
            0x1a,
            0xc6,
            0x03,
            0xdf,
            0x33,
            0xee,
            0x1b,
            0x68,
            0xc7,
            0x4b,
            0x04,
            0x64,
            0xe0,
            0x0e,
            0x34,
            0x8d,
            0xef,
            0x81,
            0x1c,
            0xc1,
            0x69,
            0xf8,
            0xc8,
            0x08,
            0x4c,
            0x71,
            0x05,
            0x8a,
            0x65,
            0x2f,
            0xe1,
            0x24,
            0x0f,
            0x21,
            0x35,
            0x93,
            0x8e,
            0xda,
            0xf0,
            0x12,
            0x82,
            0x45,
            0x1d,
            0xb5,
            0xc2,
            0x7d,
            0x6a,
            0x27,
            0xf9,
            0xb9,
            0xc9,
            0x9a,
            0x09,
            0x78,
            0x4d,
            0xe4,
            0x72,
            0xa6,
            0x06,
            0xbf,
            0x8b,
            0x62,
            0x66,
            0xdd,
            0x30,
            0xfd,
            0xe2,
            0x98,
            0x25,
            0xb3,
            0x10,
            0x91,
            0x22,
            0x88,
            0x36,
            0xd0,
            0x94,
            0xce,
            0x8f,
            0x96,
            0xdb,
            0xbd,
            0xf1,
            0xd2,
            0x13,
            0x5c,
            0x83,
            0x38,
            0x46,
            0x40,
            0x1e,
            0x42,
            0xb6,
            0xa3,
            0xc3,
            0x48,
            0x7e,
            0x6e,
            0x6b,
            0x3a,
            0x28,
            0x54,
            0xfa,
            0x85,
            0xba,
            0x3d,
            0xca,
            0x5e,
            0x9b,
            0x9f,
            0x0a,
            0x15,
            0x79,
            0x2b,
            0x4e,
            0xd4,
            0xe5,
            0xac,
            0x73,
            0xf3,
            0xa7,
            0x57,
            0x07,
            0x70,
            0xc0,
            0xf7,
            0x8c,
            0x80,
            0x63,
            0x0d,
            0x67,
            0x4a,
            0xde,
            0xed,
            0x31,
            0xc5,
            0xfe,
            0x18,
            0xe3,
            0xa5,
            0x99,
            0x77,
            0x26,
            0xb8,
            0xb4,
            0x7c,
            0x11,
            0x44,
            0x92,
            0xd9,
            0x23,
            0x20,
            0x89,
            0x2e,
            0x37,
            0x3f,
            0xd1,
            0x5b,
            0x95,
            0xbc,
            0xcf,
            0xcd,
            0x90,
            0x87,
            0x97,
            0xb2,
            0xdc,
            0xfc,
            0xbe,
            0x61,
            0xf2,
            0x56,
            0xd3,
            0xab,
            0x14,
            0x2a,
            0x5d,
            0x9e,
            0x84,
            0x3c,
            0x39,
            0x53,
            0x47,
            0x6d,
            0x41,
            0xa2,
            0x1f,
            0x2d,
            0x43,
            0xd8,
            0xb7,
            0x7b,
            0xa4,
            0x76,
            0xc4,
            0x17,
            0x49,
            0xec,
            0x7f,
            0x0c,
            0x6f,
            0xf6,
            0x6c,
            0xa1,
            0x3b,
            0x52,
            0x29,
            0x9d,
            0x55,
            0xaa,
            0xfb,
            0x60,
            0x86,
            0xb1,
            0xbb,
            0xcc,
            0x3e,
            0x5a,
            0xcb,
            0x59,
            0x5f,
            0xb0,
            0x9c,
            0xa9,
            0xa0,
            0x51,
            0x0b,
            0xf5,
            0x16,
            0xeb,
            0x7a,
            0x75,
            0x2c,
            0xd7,
            0x4f,
            0xae,
            0xd5,
            0xe9,
            0xe6,
            0xe7,
            0xad,
            0xe8,
            0x74,
            0xd6,
            0xf4,
            0xea,
            0xa8,
            0x50,
            0x58,
            0xaf
        ]
    });
    var Galois_1 = Galois;
    /**
   * Contains version pattern information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Version = lite.extend(null, {
        /**
     * The version pattern block.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Version
     */ BLOCK: [
            0xc94,
            0x5bc,
            0xa99,
            0x4d3,
            0xbf6,
            0x762,
            0x847,
            0x60d,
            0x928,
            0xb78,
            0x45d,
            0xa17,
            0x532,
            0x9a6,
            0x683,
            0x8c9,
            0x7ec,
            0xec4,
            0x1e1,
            0xfab,
            0x08e,
            0xc1a,
            0x33f,
            0xd75,
            0x250,
            0x9d5,
            0x6f0,
            0x8ba,
            0x79f,
            0xb0b,
            0x42e,
            0xa64,
            0x541,
            0xc69
        ]
    });
    var Version_1 = Version;
    /**
   * Generates information for a QR code frame based on a specific value to be encoded.
   *
   * @param {Frame~Options} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */ var Frame = lite.extend(function(options) {
        var dataBlock, eccBlock, index, neccBlock1, neccBlock2;
        var valueLength = options.value.length;
        this._badness = [];
        this._level = ErrorCorrection_1.LEVELS[options.level];
        this._polynomial = [];
        this._value = options.value;
        this._version = 0;
        this._stringBuffer = [];
        while(this._version < 40){
            this._version++;
            index = (this._level - 1) * 4 + (this._version - 1) * 16;
            neccBlock1 = ErrorCorrection_1.BLOCKS[index++];
            neccBlock2 = ErrorCorrection_1.BLOCKS[index++];
            dataBlock = ErrorCorrection_1.BLOCKS[index++];
            eccBlock = ErrorCorrection_1.BLOCKS[index];
            index = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (this._version <= 9);
            if (valueLength <= index) break;
        }
        this._dataBlock = dataBlock;
        this._eccBlock = eccBlock;
        this._neccBlock1 = neccBlock1;
        this._neccBlock2 = neccBlock2;
        /**
     * The data width is based on version.
     *
     * @public
     * @type {number}
     * @memberof Frame#
     */ // FIXME: Ensure that it fits instead of being truncated.
        var width = this.width = 17 + 4 * this._version;
        /**
     * The image buffer.
     *
     * @public
     * @type {number[]}
     * @memberof Frame#
     */ this.buffer = Frame._createArray(width * width);
        this._ecc = Frame._createArray(dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2);
        this._mask = Frame._createArray((width * (width + 1) + 1) / 2);
        this._insertFinders();
        this._insertAlignments();
        // Insert single foreground cell.
        this.buffer[8 + width * (width - 8)] = 1;
        this._insertTimingGap();
        this._reverseMask();
        this._insertTimingRowAndColumn();
        this._insertVersion();
        this._syncMask();
        this._convertBitStream(valueLength);
        this._calculatePolynomial();
        this._appendEccToData();
        this._interleaveBlocks();
        this._pack();
        this._finish();
    }, {
        _addAlignment: function(x, y) {
            var i;
            var buffer = this.buffer;
            var width = this.width;
            buffer[x + width * y] = 1;
            for(i = -2; i < 2; i++){
                buffer[x + i + width * (y - 2)] = 1;
                buffer[x - 2 + width * (y + i + 1)] = 1;
                buffer[x + 2 + width * (y + i)] = 1;
                buffer[x + i + 1 + width * (y + 2)] = 1;
            }
            for(i = 0; i < 2; i++){
                this._setMask(x - 1, y + i);
                this._setMask(x + 1, y - i);
                this._setMask(x - i, y - 1);
                this._setMask(x + i, y + 1);
            }
        },
        _appendData: function(data, dataLength, ecc, eccLength) {
            var bit, i, j;
            var polynomial = this._polynomial;
            var stringBuffer = this._stringBuffer;
            for(i = 0; i < eccLength; i++)stringBuffer[ecc + i] = 0;
            for(i = 0; i < dataLength; i++){
                bit = Galois_1.LOG[stringBuffer[data + i] ^ stringBuffer[ecc]];
                if (bit !== 255) for(j = 1; j < eccLength; j++)stringBuffer[ecc + j - 1] = stringBuffer[ecc + j] ^ Galois_1.EXPONENT[Frame._modN(bit + polynomial[eccLength - j])];
                else for(j = ecc; j < ecc + eccLength; j++)stringBuffer[j] = stringBuffer[j + 1];
                stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois_1.EXPONENT[Frame._modN(bit + polynomial[0])];
            }
        },
        _appendEccToData: function() {
            var i;
            var data = 0;
            var dataBlock = this._dataBlock;
            var ecc = this._calculateMaxLength();
            var eccBlock = this._eccBlock;
            for(i = 0; i < this._neccBlock1; i++){
                this._appendData(data, dataBlock, ecc, eccBlock);
                data += dataBlock;
                ecc += eccBlock;
            }
            for(i = 0; i < this._neccBlock2; i++){
                this._appendData(data, dataBlock + 1, ecc, eccBlock);
                data += dataBlock + 1;
                ecc += eccBlock;
            }
        },
        _applyMask: function(mask) {
            var r3x, r3y, x, y;
            var buffer = this.buffer;
            var width = this.width;
            switch(mask){
                case 0:
                    for(y = 0; y < width; y++){
                        for(x = 0; x < width; x++)if (!(x + y & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 1:
                    for(y = 0; y < width; y++){
                        for(x = 0; x < width; x++)if (!(y & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 2:
                    for(y = 0; y < width; y++)for(r3x = 0, x = 0; x < width; x++, r3x++){
                        if (r3x === 3) r3x = 0;
                        if (!r3x && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 3:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = r3y, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!r3x && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
                case 4:
                    for(y = 0; y < width; y++)for(r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++){
                        if (r3x === 3) {
                            r3x = 0;
                            r3y = !r3y;
                        }
                        if (!r3y && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 5:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = 0, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
                case 6:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = 0, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!((x & y & 1) + (r3x && r3x === r3y) & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
                case 7:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = 0, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!((r3x && r3x === r3y) + (x + y & 1) & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
            }
        },
        _calculateMaxLength: function() {
            return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
        },
        _calculatePolynomial: function() {
            var i, j;
            var eccBlock = this._eccBlock;
            var polynomial = this._polynomial;
            polynomial[0] = 1;
            for(i = 0; i < eccBlock; i++){
                polynomial[i + 1] = 1;
                for(j = i; j > 0; j--)polynomial[j] = polynomial[j] ? polynomial[j - 1] ^ Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[j]] + i)] : polynomial[j - 1];
                polynomial[0] = Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[0]] + i)];
            }
            // Use logs for generator polynomial to save calculation step.
            for(i = 0; i <= eccBlock; i++)polynomial[i] = Galois_1.LOG[polynomial[i]];
        },
        _checkBadness: function() {
            var b, b1, h, x, y;
            var bad = 0;
            var badness = this._badness;
            var buffer = this.buffer;
            var width = this.width;
            // Blocks of same colour.
            for(y = 0; y < width - 1; y++){
                for(x = 0; x < width - 1; x++)// All foreground colour.
                if (buffer[x + width * y] && buffer[x + 1 + width * y] && buffer[x + width * (y + 1)] && buffer[x + 1 + width * (y + 1)] || // All background colour.
                !(buffer[x + width * y] || buffer[x + 1 + width * y] || buffer[x + width * (y + 1)] || buffer[x + 1 + width * (y + 1)])) bad += Frame.N2;
            }
            var bw = 0;
            // X runs.
            for(y = 0; y < width; y++){
                h = 0;
                badness[0] = 0;
                for(b = 0, x = 0; x < width; x++){
                    b1 = buffer[x + width * y];
                    if (b === b1) badness[h]++;
                    else badness[++h] = 1;
                    b = b1;
                    bw += b ? 1 : -1;
                }
                bad += this._getBadness(h);
            }
            if (bw < 0) bw = -bw;
            var count = 0;
            var big = bw;
            big += big << 2;
            big <<= 1;
            while(big > width * width){
                big -= width * width;
                count++;
            }
            bad += count * Frame.N4;
            // Y runs.
            for(x = 0; x < width; x++){
                h = 0;
                badness[0] = 0;
                for(b = 0, y = 0; y < width; y++){
                    b1 = buffer[x + width * y];
                    if (b === b1) badness[h]++;
                    else badness[++h] = 1;
                    b = b1;
                }
                bad += this._getBadness(h);
            }
            return bad;
        },
        _convertBitStream: function(length) {
            var bit, i;
            var ecc = this._ecc;
            var version = this._version;
            // Convert string to bit stream. 8-bit data to QR-coded 8-bit data (numeric, alphanumeric, or kanji not supported).
            for(i = 0; i < length; i++)ecc[i] = this._value.charCodeAt(i);
            var stringBuffer = this._stringBuffer = ecc.slice();
            var maxLength = this._calculateMaxLength();
            if (length >= maxLength - 2) {
                length = maxLength - 2;
                if (version > 9) length--;
            }
            // Shift and re-pack to insert length prefix.
            var index = length;
            if (version > 9) {
                stringBuffer[index + 2] = 0;
                stringBuffer[index + 3] = 0;
                while(index--){
                    bit = stringBuffer[index];
                    stringBuffer[index + 3] |= 255 & bit << 4;
                    stringBuffer[index + 2] = bit >> 4;
                }
                stringBuffer[2] |= 255 & length << 4;
                stringBuffer[1] = length >> 4;
                stringBuffer[0] = 0x40 | length >> 12;
            } else {
                stringBuffer[index + 1] = 0;
                stringBuffer[index + 2] = 0;
                while(index--){
                    bit = stringBuffer[index];
                    stringBuffer[index + 2] |= 255 & bit << 4;
                    stringBuffer[index + 1] = bit >> 4;
                }
                stringBuffer[1] |= 255 & length << 4;
                stringBuffer[0] = 0x40 | length >> 4;
            }
            // Fill to end with pad pattern.
            index = length + 3 - (version < 10);
            while(index < maxLength){
                stringBuffer[index++] = 0xec;
                stringBuffer[index++] = 0x11;
            }
        },
        _getBadness: function(length) {
            var i;
            var badRuns = 0;
            var badness = this._badness;
            for(i = 0; i <= length; i++)if (badness[i] >= 5) badRuns += Frame.N1 + badness[i] - 5;
            // FBFFFBF as in finder.
            for(i = 3; i < length - 1; i += 2)if (badness[i - 2] === badness[i + 2] && badness[i + 2] === badness[i - 1] && badness[i - 1] === badness[i + 1] && badness[i - 1] * 3 === badness[i] && (badness[i - 3] === 0 || i + 3 > length || badness[i - 3] * 3 >= badness[i] * 4 || badness[i + 3] * 3 >= badness[i] * 4)) badRuns += Frame.N3;
            return badRuns;
        },
        _finish: function() {
            // Save pre-mask copy of frame.
            this._stringBuffer = this.buffer.slice();
            var currentMask, i;
            var bit = 0;
            var mask = 30000;
            /*
       * Using for instead of while since in original Arduino code if an early mask was "good enough" it wouldn't try for
       * a better one since they get more complex and take longer.
       */ for(i = 0; i < 8; i++){
                // Returns foreground-background imbalance.
                this._applyMask(i);
                currentMask = this._checkBadness();
                // Is current mask better than previous best?
                if (currentMask < mask) {
                    mask = currentMask;
                    bit = i;
                }
                // Don't increment "i" to a void redoing mask.
                if (bit === 7) break;
                // Reset for next pass.
                this.buffer = this._stringBuffer.slice();
            }
            // Redo best mask as none were "good enough" (i.e. last wasn't bit).
            if (bit !== i) this._applyMask(bit);
            // Add in final mask/ECC level bytes.
            mask = ErrorCorrection_1.FINAL_FORMAT[bit + (this._level - 1 << 3)];
            var buffer = this.buffer;
            var width = this.width;
            // Low byte.
            for(i = 0; i < 8; i++, mask >>= 1)if (mask & 1) {
                buffer[width - 1 - i + width * 8] = 1;
                if (i < 6) buffer[8 + width * i] = 1;
                else buffer[8 + width * (i + 1)] = 1;
            }
            // High byte.
            for(i = 0; i < 7; i++, mask >>= 1)if (mask & 1) {
                buffer[8 + width * (width - 7 + i)] = 1;
                if (i) buffer[6 - i + width * 8] = 1;
                else buffer[7 + width * 8] = 1;
            }
        },
        _interleaveBlocks: function() {
            var i, j;
            var dataBlock = this._dataBlock;
            var ecc = this._ecc;
            var eccBlock = this._eccBlock;
            var k = 0;
            var maxLength = this._calculateMaxLength();
            var neccBlock1 = this._neccBlock1;
            var neccBlock2 = this._neccBlock2;
            var stringBuffer = this._stringBuffer;
            for(i = 0; i < dataBlock; i++){
                for(j = 0; j < neccBlock1; j++)ecc[k++] = stringBuffer[i + j * dataBlock];
                for(j = 0; j < neccBlock2; j++)ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
            }
            for(j = 0; j < neccBlock2; j++)ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
            for(i = 0; i < eccBlock; i++)for(j = 0; j < neccBlock1 + neccBlock2; j++)ecc[k++] = stringBuffer[maxLength + i + j * eccBlock];
            this._stringBuffer = ecc;
        },
        _insertAlignments: function() {
            var i, x, y;
            var version = this._version;
            var width = this.width;
            if (version > 1) {
                i = Alignment_1.BLOCK[version];
                y = width - 7;
                for(;;){
                    x = width - 7;
                    while(x > i - 3){
                        this._addAlignment(x, y);
                        if (x < i) break;
                        x -= i;
                    }
                    if (y <= i + 9) break;
                    y -= i;
                    this._addAlignment(6, y);
                    this._addAlignment(y, 6);
                }
            }
        },
        _insertFinders: function() {
            var i, j, x, y;
            var buffer = this.buffer;
            var width = this.width;
            for(i = 0; i < 3; i++){
                j = 0;
                y = 0;
                if (i === 1) j = width - 7;
                if (i === 2) y = width - 7;
                buffer[y + 3 + width * (j + 3)] = 1;
                for(x = 0; x < 6; x++){
                    buffer[y + x + width * j] = 1;
                    buffer[y + width * (j + x + 1)] = 1;
                    buffer[y + 6 + width * (j + x)] = 1;
                    buffer[y + x + 1 + width * (j + 6)] = 1;
                }
                for(x = 1; x < 5; x++){
                    this._setMask(y + x, j + 1);
                    this._setMask(y + 1, j + x + 1);
                    this._setMask(y + 5, j + x);
                    this._setMask(y + x + 1, j + 5);
                }
                for(x = 2; x < 4; x++){
                    buffer[y + x + width * (j + 2)] = 1;
                    buffer[y + 2 + width * (j + x + 1)] = 1;
                    buffer[y + 4 + width * (j + x)] = 1;
                    buffer[y + x + 1 + width * (j + 4)] = 1;
                }
            }
        },
        _insertTimingGap: function() {
            var x, y;
            var width = this.width;
            for(y = 0; y < 7; y++){
                this._setMask(7, y);
                this._setMask(width - 8, y);
                this._setMask(7, y + width - 7);
            }
            for(x = 0; x < 8; x++){
                this._setMask(x, 7);
                this._setMask(x + width - 8, 7);
                this._setMask(x, width - 8);
            }
        },
        _insertTimingRowAndColumn: function() {
            var x;
            var buffer = this.buffer;
            var width = this.width;
            for(x = 0; x < width - 14; x++)if (x & 1) {
                this._setMask(8 + x, 6);
                this._setMask(6, 8 + x);
            } else {
                buffer[8 + x + width * 6] = 1;
                buffer[6 + width * (8 + x)] = 1;
            }
        },
        _insertVersion: function() {
            var i, j, x, y;
            var buffer = this.buffer;
            var version = this._version;
            var width = this.width;
            if (version > 6) {
                i = Version_1.BLOCK[version - 7];
                j = 17;
                for(x = 0; x < 6; x++){
                    for(y = 0; y < 3; y++, j--)if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
                        buffer[5 - x + width * (2 - y + width - 11)] = 1;
                        buffer[2 - y + width - 11 + width * (5 - x)] = 1;
                    } else {
                        this._setMask(5 - x, 2 - y + width - 11);
                        this._setMask(2 - y + width - 11, 5 - x);
                    }
                }
            }
        },
        _isMasked: function(x, y) {
            var bit = Frame._getMaskBit(x, y);
            return this._mask[bit] === 1;
        },
        _pack: function() {
            var bit, i, j;
            var k = 1;
            var v = 1;
            var width = this.width;
            var x = width - 1;
            var y = width - 1;
            // Interleaved data and ECC codes.
            var length = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
            for(i = 0; i < length; i++){
                bit = this._stringBuffer[i];
                for(j = 0; j < 8; j++, bit <<= 1){
                    if (0x80 & bit) this.buffer[x + width * y] = 1;
                    // Find next fill position.
                    do {
                        if (v) x--;
                        else {
                            x++;
                            if (k) {
                                if (y !== 0) y--;
                                else {
                                    x -= 2;
                                    k = !k;
                                    if (x === 6) {
                                        x--;
                                        y = 9;
                                    }
                                }
                            } else if (y !== width - 1) y++;
                            else {
                                x -= 2;
                                k = !k;
                                if (x === 6) {
                                    x--;
                                    y -= 8;
                                }
                            }
                        }
                        v = !v;
                    }while (this._isMasked(x, y))
                }
            }
        },
        _reverseMask: function() {
            var x, y;
            var width = this.width;
            for(x = 0; x < 9; x++)this._setMask(x, 8);
            for(x = 0; x < 8; x++){
                this._setMask(x + width - 8, 8);
                this._setMask(8, x);
            }
            for(y = 0; y < 7; y++)this._setMask(8, y + width - 7);
        },
        _setMask: function(x, y) {
            var bit = Frame._getMaskBit(x, y);
            this._mask[bit] = 1;
        },
        _syncMask: function() {
            var x, y;
            var width = this.width;
            for(y = 0; y < width; y++){
                for(x = 0; x <= y; x++)if (this.buffer[x + width * y]) this._setMask(x, y);
            }
        }
    }, {
        _createArray: function(length) {
            var i;
            var array = [];
            for(i = 0; i < length; i++)array[i] = 0;
            return array;
        },
        _getMaskBit: function(x, y) {
            var bit;
            if (x > y) {
                bit = x;
                x = y;
                y = bit;
            }
            bit = y;
            bit += y * y;
            bit >>= 1;
            bit += x;
            return bit;
        },
        _modN: function(x) {
            while(x >= 255){
                x -= 255;
                x = (x >> 8) + (x & 255);
            }
            return x;
        },
        // *Badness* coefficients.
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
    });
    var Frame_1 = Frame;
    /**
   * The options used by {@link Frame}.
   *
   * @typedef {Object} Frame~Options
   * @property {string} level - The ECC level to be used.
   * @property {string} value - The value to be encoded.
   */ /**
   * An implementation of {@link Renderer} for working with <code>img</code> elements.
   *
   * This depends on {@link CanvasRenderer} being executed first as this implementation simply applies the data URL from
   * the rendered <code>canvas</code> element as the <code>src</code> for the <code>img</code> element being rendered.
   *
   * @public
   * @class
   * @extends Renderer
   */ var ImageRenderer = Renderer_1.extend({
        /**
     * @override
     */ draw: function() {
            this.element.src = this.qrious.toDataURL();
        },
        /**
     * @override
     */ reset: function() {
            this.element.src = '';
        },
        /**
     * @override
     */ resize: function() {
            var element = this.element;
            element.width = element.height = this.qrious.size;
        }
    });
    var ImageRenderer_1 = ImageRenderer;
    /**
   * Defines an available option while also configuring how values are applied to the target object.
   *
   * Optionally, a default value can be specified as well a value transformer for greater control over how the option
   * value is applied.
   *
   * If no value transformer is specified, then any specified option will be applied directly. All values are maintained
   * on the target object itself as a field using the option name prefixed with a single underscore.
   *
   * When an option is specified as modifiable, the {@link OptionManager} will be required to include a setter for the
   * property that is defined on the target object that uses the option name.
   *
   * @param {string} name - the name to be used
   * @param {boolean} [modifiable] - <code>true</code> if the property defined on target objects should include a setter;
   * otherwise <code>false</code>
   * @param {*} [defaultValue] - the default value to be used
   * @param {Option~ValueTransformer} [valueTransformer] - the value transformer to be used
   * @public
   * @class
   * @extends Nevis
   */ var Option = lite.extend(function(name, modifiable, defaultValue, valueTransformer) {
        /**
     * The name for this {@link Option}.
     *
     * @public
     * @type {string}
     * @memberof Option#
     */ this.name = name;
        /**
     * Whether a setter should be included on the property defined on target objects for this {@link Option}.
     *
     * @public
     * @type {boolean}
     * @memberof Option#
     */ this.modifiable = Boolean(modifiable);
        /**
     * The default value for this {@link Option}.
     *
     * @public
     * @type {*}
     * @memberof Option#
     */ this.defaultValue = defaultValue;
        this._valueTransformer = valueTransformer;
    }, {
        /**
     * Transforms the specified <code>value</code> so that it can be applied for this {@link Option}.
     *
     * If a value transformer has been specified for this {@link Option}, it will be called upon to transform
     * <code>value</code>. Otherwise, <code>value</code> will be returned directly.
     *
     * @param {*} value - the value to be transformed
     * @return {*} The transformed value or <code>value</code> if no value transformer is specified.
     * @public
     * @memberof Option#
     */ transform: function(value) {
            var transformer = this._valueTransformer;
            if (typeof transformer === 'function') return transformer(value, this);
            return value;
        }
    });
    var Option_1 = Option;
    /**
   * Returns a transformed value for the specified <code>value</code> to be applied for the <code>option</code> provided.
   *
   * @callback Option~ValueTransformer
   * @param {*} value - the value to be transformed
   * @param {Option} option - the {@link Option} for which <code>value</code> is being transformed
   * @return {*} The transform value.
   */ /**
   * Contains utility methods that are useful throughout the library.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Utilities = lite.extend(null, {
        /**
     * Returns the absolute value of a given number.
     *
     * This method is simply a convenient shorthand for <code>Math.abs</code> while ensuring that nulls are returned as
     * <code>null</code> instead of zero.
     *
     * @param {number} value - the number whose absolute value is to be returned
     * @return {number} The absolute value of <code>value</code> or <code>null</code> if <code>value</code> is
     * <code>null</code>.
     * @public
     * @static
     * @memberof Utilities
     */ abs: function(value) {
            return value != null ? Math.abs(value) : null;
        },
        /**
     * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
     * (not inherited) property.
     *
     * @param {Object} object - the object on which the property is to be checked
     * @param {string} name - the name of the property to be checked
     * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
     * @public
     * @static
     * @memberof Utilities
     */ hasOwn: function(object, name) {
            return Object.prototype.hasOwnProperty.call(object, name);
        },
        /**
     * A non-operation method that does absolutely nothing.
     *
     * @return {void}
     * @public
     * @static
     * @memberof Utilities
     */ noop: function() {},
        /**
     * Transforms the specified <code>string</code> to upper case while remaining null-safe.
     *
     * @param {string} string - the string to be transformed to upper case
     * @return {string} <code>string</code> transformed to upper case if <code>string</code> is not <code>null</code>.
     * @public
     * @static
     * @memberof Utilities
     */ toUpperCase: function(string) {
            return string != null ? string.toUpperCase() : null;
        }
    });
    var Utilities_1 = Utilities;
    /**
   * Manages multiple {@link Option} instances that are intended to be used by multiple implementations.
   *
   * Although the option definitions are shared between targets, the values are maintained on the targets themselves.
   *
   * @param {Option[]} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */ var OptionManager = lite.extend(function(options) {
        /**
     * The available options for this {@link OptionManager}.
     *
     * @public
     * @type {Object.<string, Option>}
     * @memberof OptionManager#
     */ this.options = {};
        options.forEach(function(option) {
            this.options[option.name] = option;
        }, this);
    }, {
        /**
     * Returns whether an option with the specified <code>name</code> is available.
     *
     * @param {string} name - the name of the {@link Option} whose existence is to be checked
     * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
     * <code>false</code>.
     * @public
     * @memberof OptionManager#
     */ exists: function(name) {
            return this.options[name] != null;
        },
        /**
     * Returns the value of the option with the specified <code>name</code> on the <code>target</code> object provided.
     *
     * @param {string} name - the name of the {@link Option} whose value on <code>target</code> is to be returned
     * @param {Object} target - the object from which the value of the named {@link Option} is to be returned
     * @return {*} The value of the {@link Option} with <code>name</code> on <code>target</code>.
     * @public
     * @memberof OptionManager#
     */ get: function(name, target) {
            return OptionManager._get(this.options[name], target);
        },
        /**
     * Returns a copy of all of the available options on the <code>target</code> object provided.
     *
     * @param {Object} target - the object from which the option name/value pairs are to be returned
     * @return {Object.<string, *>} A hash containing the name/value pairs of all options on <code>target</code>.
     * @public
     * @memberof OptionManager#
     */ getAll: function(target) {
            var name;
            var options = this.options;
            var result = {};
            for(name in options)if (Utilities_1.hasOwn(options, name)) result[name] = OptionManager._get(options[name], target);
            return result;
        },
        /**
     * Initializes the available options for the <code>target</code> object provided and then applies the initial values
     * within the speciifed <code>options</code>.
     *
     * This method will throw an error if any of the names within <code>options</code> does not match an available option.
     *
     * This involves setting the default values and defining properties for all of the available options on
     * <code>target</code> before finally calling {@link OptionMananger#setAll} with <code>options</code> and
     * <code>target</code>. Any options that are configured to be modifiable will have a setter included in their defined
     * property that will allow its corresponding value to be modified.
     *
     * If a change handler is specified, it will be called whenever the value changes on <code>target</code> for a
     * modifiable option, but only when done so via the defined property's setter.
     *
     * @param {Object.<string, *>} options - the name/value pairs of the initial options to be set
     * @param {Object} target - the object on which the options are to be initialized
     * @param {Function} [changeHandler] - the function to be called whenever the value of an modifiable option changes on
     * <code>target</code>
     * @return {void}
     * @throws {Error} If <code>options</code> contains an invalid option name.
     * @public
     * @memberof OptionManager#
     */ init: function(options, target, changeHandler) {
            if (typeof changeHandler !== 'function') changeHandler = Utilities_1.noop;
            var name, option;
            for(name in this.options)if (Utilities_1.hasOwn(this.options, name)) {
                option = this.options[name];
                OptionManager._set(option, option.defaultValue, target);
                OptionManager._createAccessor(option, target, changeHandler);
            }
            this._setAll(options, target, true);
        },
        /**
     * Sets the value of the option with the specified <code>name</code> on the <code>target</code> object provided to
     * <code>value</code>.
     *
     * This method will throw an error if <code>name</code> does not match an available option or matches an option that
     * cannot be modified.
     *
     * If <code>value</code> is <code>null</code> and the {@link Option} has a default value configured, then that default
     * value will be used instead. If the {@link Option} also has a value transformer configured, it will be used to
     * transform whichever value was determined to be used.
     *
     * This method returns whether the value of the underlying field on <code>target</code> was changed as a result.
     *
     * @param {string} name - the name of the {@link Option} whose value is to be set
     * @param {*} value - the value to be set for the named {@link Option} on <code>target</code>
     * @param {Object} target - the object on which <code>value</code> is to be set for the named {@link Option}
     * @return {boolean} <code>true</code> if the underlying field on <code>target</code> was changed; otherwise
     * <code>false</code>.
     * @throws {Error} If <code>name</code> is invalid or is for an option that cannot be modified.
     * @public
     * @memberof OptionManager#
     */ set: function(name, value, target) {
            return this._set(name, value, target);
        },
        /**
     * Sets all of the specified <code>options</code> on the <code>target</code> object provided to their corresponding
     * values.
     *
     * This method will throw an error if any of the names within <code>options</code> does not match an available option
     * or matches an option that cannot be modified.
     *
     * If any value within <code>options</code> is <code>null</code> and the corresponding {@link Option} has a default
     * value configured, then that default value will be used instead. If an {@link Option} also has a value transformer
     * configured, it will be used to transform whichever value was determined to be used.
     *
     * This method returns whether the value for any of the underlying fields on <code>target</code> were changed as a
     * result.
     *
     * @param {Object.<string, *>} options - the name/value pairs of options to be set
     * @param {Object} target - the object on which the options are to be set
     * @return {boolean} <code>true</code> if any of the underlying fields on <code>target</code> were changed; otherwise
     * <code>false</code>.
     * @throws {Error} If <code>options</code> contains an invalid option name or an option that cannot be modiifed.
     * @public
     * @memberof OptionManager#
     */ setAll: function(options, target) {
            return this._setAll(options, target);
        },
        _set: function(name, value, target, allowUnmodifiable) {
            var option = this.options[name];
            if (!option) throw new Error('Invalid option: ' + name);
            if (!option.modifiable && !allowUnmodifiable) throw new Error('Option cannot be modified: ' + name);
            return OptionManager._set(option, value, target);
        },
        _setAll: function(options, target, allowUnmodifiable) {
            if (!options) return false;
            var name;
            var changed = false;
            for(name in options)if (Utilities_1.hasOwn(options, name) && this._set(name, options[name], target, allowUnmodifiable)) changed = true;
            return changed;
        }
    }, {
        _createAccessor: function(option, target, changeHandler) {
            var descriptor = {
                get: function() {
                    return OptionManager._get(option, target);
                }
            };
            if (option.modifiable) descriptor.set = function(value) {
                if (OptionManager._set(option, value, target)) changeHandler(value, option);
            };
            Object.defineProperty(target, option.name, descriptor);
        },
        _get: function(option, target) {
            return target['_' + option.name];
        },
        _set: function(option, value, target) {
            var fieldName = '_' + option.name;
            var oldValue = target[fieldName];
            var newValue = option.transform(value != null ? value : option.defaultValue);
            target[fieldName] = newValue;
            return newValue !== oldValue;
        }
    });
    var OptionManager_1 = OptionManager;
    /**
   * Called whenever the value of a modifiable {@link Option} is changed on a target object via the defined property's
   * setter.
   *
   * @callback OptionManager~ChangeHandler
   * @param {*} value - the new value for <code>option</code> on the target object
   * @param {Option} option - the modifable {@link Option} whose value has changed on the target object.
   * @return {void}
   */ /**
   * A basic manager for {@link Service} implementations that are mapped to simple names.
   *
   * @public
   * @class
   * @extends Nevis
   */ var ServiceManager = lite.extend(function() {
        this._services = {};
    }, {
        /**
     * Returns the {@link Service} being managed with the specified <code>name</code>.
     *
     * @param {string} name - the name of the {@link Service} to be returned
     * @return {Service} The {@link Service} is being managed with <code>name</code>.
     * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */ getService: function(name) {
            var service = this._services[name];
            if (!service) throw new Error('Service is not being managed with name: ' + name);
            return service;
        },
        /**
     * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
     * <code>service</code> provided.
     *
     * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
     * @param {Service} service - the {@link Service} implementation to be managed
     * @return {void}
     * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */ setService: function(name, service) {
            if (this._services[name]) throw new Error('Service is already managed with name: ' + name);
            if (service) this._services[name] = service;
        }
    });
    var ServiceManager_1 = ServiceManager;
    var optionManager = new OptionManager_1([
        new Option_1('background', true, 'white'),
        new Option_1('backgroundAlpha', true, 1, Utilities_1.abs),
        new Option_1('element'),
        new Option_1('foreground', true, 'black'),
        new Option_1('foregroundAlpha', true, 1, Utilities_1.abs),
        new Option_1('level', true, 'L', Utilities_1.toUpperCase),
        new Option_1('mime', true, 'image/png'),
        new Option_1('padding', true, null, Utilities_1.abs),
        new Option_1('size', true, 100, Utilities_1.abs),
        new Option_1('value', true, '')
    ]);
    var serviceManager = new ServiceManager_1();
    /**
   * Enables configuration of a QR code generator which uses HTML5 <code>canvas</code> for rendering.
   *
   * @param {QRious~Options} [options] - the options to be used
   * @throws {Error} If any <code>options</code> are invalid.
   * @public
   * @class
   * @extends Nevis
   */ var QRious = lite.extend(function(options) {
        optionManager.init(options, this, this.update.bind(this));
        var element = optionManager.get('element', this);
        var elementService = serviceManager.getService('element');
        var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
        var image = element && elementService.isImage(element) ? element : elementService.createImage();
        this._canvasRenderer = new CanvasRenderer_1(this, canvas, true);
        this._imageRenderer = new ImageRenderer_1(this, image, image === element);
        this.update();
    }, {
        /**
     * Returns all of the options configured for this {@link QRious}.
     *
     * Any changes made to the returned object will not be reflected in the options themselves or their corresponding
     * underlying fields.
     *
     * @return {Object.<string, *>} A copy of the applied options.
     * @public
     * @memberof QRious#
     */ get: function() {
            return optionManager.getAll(this);
        },
        /**
     * Sets all of the specified <code>options</code> and automatically updates this {@link QRious} if any of the
     * underlying fields are changed as a result.
     *
     * This is the preferred method for updating multiple options at one time to avoid unnecessary updates between
     * changes.
     *
     * @param {QRious~Options} options - the options to be set
     * @return {void}
     * @throws {Error} If any <code>options</code> are invalid or cannot be modified.
     * @public
     * @memberof QRious#
     */ set: function(options) {
            if (optionManager.setAll(options, this)) this.update();
        },
        /**
     * Returns the image data URI for the generated QR code using the <code>mime</code> provided.
     *
     * @param {string} [mime] - the MIME type for the image
     * @return {string} The image data URI for the QR code.
     * @public
     * @memberof QRious#
     */ toDataURL: function(mime) {
            return this.canvas.toDataURL(mime || this.mime);
        },
        /**
     * Updates this {@link QRious} by generating a new {@link Frame} and re-rendering the QR code.
     *
     * @return {void}
     * @protected
     * @memberof QRious#
     */ update: function() {
            var frame = new Frame_1({
                level: this.level,
                value: this.value
            });
            this._canvasRenderer.render(frame);
            this._imageRenderer.render(frame);
        }
    }, {
        /**
     * Configures the <code>service</code> provided to be used by all {@link QRious} instances.
     *
     * @param {Service} service - the {@link Service} to be configured
     * @return {void}
     * @throws {Error} If a {@link Service} has already been configured with the same name.
     * @public
     * @static
     * @memberof QRious
     */ use: function(service) {
            serviceManager.setService(service.getName(), service);
        }
    });
    Object.defineProperties(QRious.prototype, {
        canvas: {
            /**
       * Returns the <code>canvas</code> element being used to render the QR code for this {@link QRious}.
       *
       * @return {*} The <code>canvas</code> element.
       * @public
       * @memberof QRious#
       * @alias canvas
       */ get: function() {
                return this._canvasRenderer.getElement();
            }
        },
        image: {
            /**
       * Returns the <code>img</code> element being used to render the QR code for this {@link QRious}.
       *
       * @return {*} The <code>img</code> element.
       * @public
       * @memberof QRious#
       * @alias image
       */ get: function() {
                return this._imageRenderer.getElement();
            }
        }
    });
    var QRious_1$2 = QRious;
    /**
   * The options used by {@link QRious}.
   *
   * @typedef {Object} QRious~Options
   * @property {string} [background="white"] - The background color to be applied to the QR code.
   * @property {number} [backgroundAlpha=1] - The background alpha to be applied to the QR code.
   * @property {*} [element] - The element to be used to render the QR code which may either be an <code>canvas</code> or
   * <code>img</code>. The element(s) will be created if needed.
   * @property {string} [foreground="black"] - The foreground color to be applied to the QR code.
   * @property {number} [foregroundAlpha=1] - The foreground alpha to be applied to the QR code.
   * @property {string} [level="L"] - The error correction level to be applied to the QR code.
   * @property {string} [mime="image/png"] - The MIME type to be used to render the image for the QR code.
   * @property {number} [padding] - The padding for the QR code in pixels.
   * @property {number} [size=100] - The size of the QR code in pixels.
   * @property {string} [value=""] - The value to be encoded within the QR code.
   */ var index1 = QRious_1$2;
    /**
   * Defines a service contract that must be met by all implementations.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Service = lite.extend({
        /**
     * Returns the name of this {@link Service}.
     *
     * @return {string} The service name.
     * @public
     * @abstract
     * @memberof Service#
     */ getName: function() {}
    });
    var Service_1 = Service;
    /**
   * A service for working with elements.
   *
   * @public
   * @class
   * @extends Service
   */ var ElementService = Service_1.extend({
        /**
     * Creates an instance of a canvas element.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @return {*} The newly created canvas element.
     * @public
     * @abstract
     * @memberof ElementService#
     */ createCanvas: function() {},
        /**
     * Creates an instance of a image element.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @return {*} The newly created image element.
     * @public
     * @abstract
     * @memberof ElementService#
     */ createImage: function() {},
        /**
     * @override
     */ getName: function() {
            return 'element';
        },
        /**
     * Returns whether the specified <code>element</code> is a canvas.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @param {*} element - the element to be checked
     * @return {boolean} <code>true</code> if <code>element</code> is a canvas; otherwise <code>false</code>.
     * @public
     * @abstract
     * @memberof ElementService#
     */ isCanvas: function(element) {},
        /**
     * Returns whether the specified <code>element</code> is an image.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @param {*} element - the element to be checked
     * @return {boolean} <code>true</code> if <code>element</code> is an image; otherwise <code>false</code>.
     * @public
     * @abstract
     * @memberof ElementService#
     */ isImage: function(element) {}
    });
    var ElementService_1 = ElementService;
    /**
   * An implementation of {@link ElementService} intended for use within a browser environment.
   *
   * @public
   * @class
   * @extends ElementService
   */ var BrowserElementService = ElementService_1.extend({
        /**
     * @override
     */ createCanvas: function() {
            return document.createElement('canvas');
        },
        /**
     * @override
     */ createImage: function() {
            return document.createElement('img');
        },
        /**
     * @override
     */ isCanvas: function(element) {
            return element instanceof HTMLCanvasElement;
        },
        /**
     * @override
     */ isImage: function(element) {
            return element instanceof HTMLImageElement;
        }
    });
    var BrowserElementService_1 = BrowserElementService;
    index1.use(new BrowserElementService_1());
    var QRious_1 = index1;
    return QRious_1;
});

},{}]},["7Clwv","giHfk"], "giHfk", "parcelRequire94c2")

