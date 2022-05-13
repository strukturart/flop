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
var _helperJs = require("./assets/js/helper.js");
var _dummyDataJs = require("./assets/js/dummy-data.js");
"use strict";
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
    view: function() {
        return m("div", {
            class: "flex",
            id: "login"
        }, [
            m("div", {
                class: "item input-parent  width-100",
                tabindex: 0
            }, [
                m("input", {
                    class: "title",
                    placeholder: "name"
                }), 
            ]),
            m("div", {
                class: "item input-parent  width-100",
                tabindex: 1
            }, [
                m("input", {
                    class: "width-70",
                    placeholder: "password"
                }), 
            ]),
            m("button", {
                class: "item",
                "data-function": "login-check",
                tabindex: 2,
                onclick: function() {
                    window.location.replace("!#/chats");
                }
            }, "login"), 
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
                onclick: function() {
                    alert("h");
                }
            }, item.chat_group);
        });
    }
};
var chat = {
    view: function(vnode) {
        return _dummyDataJs.dummy_data.map(function(item, index) {
            if (item.chat_group == "t") return m("div", {
                tabindex: index,
                class: "item"
            }, "hey");
        });
    }
};
m.route(root, "/login", {
    "/login": login,
    "/chats": chats,
    "/chat": chat
});
document.addEventListener("DOMContentLoaded", function(e) {
    _helperJs.bottom_bar("", "", "");
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
                if (document.activeElement.classList.contains("input-parent")) document.activeElement.children[1].focus();
                document.activeElement.tagName;
                document.activeElement.getAttribute("data-function");
                break;
            case "Backspace":
                break;
        }
    }
    // ///////////////////////////////
    // //shortpress / longpress logic
    // //////////////////////////////
    function handleKeyDown(evt) {
        evt.key;
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

},{"./assets/js/helper.js":"db1Xp","./assets/js/dummy-data.js":"gmFgS"}],"db1Xp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
        console.log("Activity successfuly handled");
        let p = this.result.blob;
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
        chat_group: "chaos",
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},["7Clwv","giHfk"], "giHfk", "parcelRequire94c2")

