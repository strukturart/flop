!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={};function t(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}n=(function e(n,t,r){function o(a,u){if(!t[a]){if(!n[a]){var c=void 0;if(!u&&c)return c(a,!0);if(i)return i(a,!0);var f=Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var s=t[a]={exports:{}};n[a][0].call(s.exports,function(e){return o(n[a][1][e]||e)},s,s.exports,e,n,t,r)}return t[a].exports}for(var i=void 0,a=0;a<r.length;a++)o(r[a]);return o})({1:[function(n,t,r){(function(e){var n,r,o=e.MutationObserver||e.WebKitMutationObserver;if(o){var i=0,a=new o(s),u=e.document.createTextNode("");a.observe(u,{characterData:!0}),n=function(){u.data=i=++i%2}}else if(e.setImmediate||void 0===e.MessageChannel)n="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var n=e.document.createElement("script");n.onreadystatechange=function(){s(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n)}:function(){setTimeout(s,0)};else{var c=new e.MessageChannel;c.port1.onmessage=s,n=function(){c.port2.postMessage(0)}}var f=[];function s(){r=!0;for(var e,n,t=f.length;t;){for(n=f,f=[],e=-1;++e<t;)n[e]();t=f.length}r=!1}t.exports=function(e){1!==f.push(e)||r||n()}}).call(this,void 0!==e?e:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,n,t){var r=e(1);function o(){}var i={},a=["REJECTED"],u=["FULFILLED"],c=["PENDING"];function f(e){if("function"!=typeof e)throw TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,e!==o&&v(this,e)}function s(e,n,t){this.promise=e,"function"==typeof n&&(this.onFulfilled=n,this.callFulfilled=this.otherCallFulfilled),"function"==typeof t&&(this.onRejected=t,this.callRejected=this.otherCallRejected)}function l(e,n,t){r(function(){var r;try{r=n(t)}catch(n){return i.reject(e,n)}r===e?i.reject(e,TypeError("Cannot resolve promise with itself")):i.resolve(e,r)})}function d(e){var n=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof n)return function(){n.apply(e,arguments)}}function v(e,n){var t=!1;function r(n){t||(t=!0,i.reject(e,n))}function o(n){t||(t=!0,i.resolve(e,n))}var a=h(function(){n(o,r)});"error"===a.status&&r(a.value)}function h(e,n){var t={};try{t.value=e(n),t.status="success"}catch(e){t.status="error",t.value=e}return t}n.exports=f,f.prototype.catch=function(e){return this.then(null,e)},f.prototype.then=function(e,n){if("function"!=typeof e&&this.state===u||"function"!=typeof n&&this.state===a)return this;var t=new this.constructor(o);return this.state!==c?l(t,this.state===u?e:n,this.outcome):this.queue.push(new s(t,e,n)),t},s.prototype.callFulfilled=function(e){i.resolve(this.promise,e)},s.prototype.otherCallFulfilled=function(e){l(this.promise,this.onFulfilled,e)},s.prototype.callRejected=function(e){i.reject(this.promise,e)},s.prototype.otherCallRejected=function(e){l(this.promise,this.onRejected,e)},i.resolve=function(e,n){var t=h(d,n);if("error"===t.status)return i.reject(e,t.value);var r=t.value;if(r)v(e,r);else{e.state=u,e.outcome=n;for(var o=-1,a=e.queue.length;++o<a;)e.queue[o].callFulfilled(n)}return e},i.reject=function(e,n){e.state=a,e.outcome=n;for(var t=-1,r=e.queue.length;++t<r;)e.queue[t].callRejected(n);return e},f.resolve=function(e){return e instanceof this?e:i.resolve(new this(o),e)},f.reject=function(e){var n=new this(o);return i.reject(n,e)},f.all=function(e){var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var a=Array(t),u=0,c=-1,f=new this(o);++c<t;)!function(e,o){n.resolve(e).then(function(e){a[o]=e,++u!==t||r||(r=!0,i.resolve(f,a))},function(e){r||(r=!0,i.reject(f,e))})}(e[c],c);return f},f.race=function(e){var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var a=-1,u=new this(o);++a<t;)!function(e){n.resolve(e).then(function(e){r||(r=!0,i.resolve(u,e))},function(e){r||(r=!0,i.reject(u,e))})}(e[a]);return u}},{1:1}],3:[function(n,t,r){(function(e){"function"!=typeof e.Promise&&(e.Promise=n(2))}).call(this,void 0!==e?e:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(e,n,r){var o="function"==typeof Symbol&&"symbol"===t(Symbol.iterator)?function(e){return void 0===e?"undefined":t(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":t(e)},i=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}();function a(e,n){e=e||[],n=n||{};try{return new Blob(e,n)}catch(o){if("TypeError"!==o.name)throw o;for(var t=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),r=0;r<e.length;r+=1)t.append(e[r]);return t.getBlob(n.type)}}"undefined"==typeof Promise&&e(3);var u=Promise;function c(e,n){n&&e.then(function(e){n(null,e)},function(e){n(e)})}function f(e,n,t){"function"==typeof n&&e.then(n),"function"==typeof t&&e.catch(t)}function s(e){return"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function l(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}var d="local-forage-detect-blob-support",v=void 0,h={},y=Object.prototype.toString,p="readonly",b="readwrite";function m(e){var n=h[e.name],t={};t.promise=new u(function(e,n){t.resolve=e,t.reject=n}),n.deferredOperations.push(t),n.dbReady?n.dbReady=n.dbReady.then(function(){return t.promise}):n.dbReady=t.promise}function g(e){var n=h[e.name].deferredOperations.pop();if(n)return n.resolve(),n.promise}function _(e,n){var t=h[e.name].deferredOperations.pop();if(t)return t.reject(n),t.promise}function I(e,n){return new u(function(t,r){if(h[e.name]=h[e.name]||A(),e.db){if(!n)return t(e.db);m(e),e.db.close()}var o=[e.name];n&&o.push(e.version);var a=i.open.apply(i,o);n&&(a.onupgradeneeded=function(n){var t=a.result;try{t.createObjectStore(e.storeName),n.oldVersion<=1&&t.createObjectStore(d)}catch(t){if("ConstraintError"===t.name)console.warn('The database "'+e.name+'" has been upgraded from version '+n.oldVersion+" to version "+n.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw t}}),a.onerror=function(e){e.preventDefault(),r(a.error)},a.onsuccess=function(){var n=a.result;n.onversionchange=function(e){e.target.close()},t(n),g(e)}})}function w(e,n){if(!e.db)return!0;var t=!e.db.objectStoreNames.contains(e.storeName),r=e.version<e.db.version,o=e.version>e.db.version;if(r&&(e.version!==n&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||t){if(t){var i=e.db.version+1;i>e.version&&(e.version=i)}return!0}return!1}function S(e){return a([function(e){for(var n=e.length,t=new ArrayBuffer(n),r=new Uint8Array(t),o=0;o<n;o++)r[o]=e.charCodeAt(o);return t}(atob(e.data))],{type:e.type})}function E(e){return e&&e.__local_forage_encoded_blob}function N(e){var n=this,t=n._initReady().then(function(){var e=h[n._dbInfo.name];if(e&&e.dbReady)return e.dbReady});return f(t,e,e),t}function j(e,n,t,r){void 0===r&&(r=1);try{var o=e.db.transaction(e.storeName,n);t(null,o)}catch(o){if(r>0&&(!e.db||"InvalidStateError"===o.name||"NotFoundError"===o.name))return u.resolve().then(function(){if(!e.db||"NotFoundError"===o.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),I(e,!0)}).then(function(){return(function(e){m(e);for(var n=h[e.name],t=n.forages,r=0;r<t.length;r++){var o=t[r];o._dbInfo.db&&(o._dbInfo.db.close(),o._dbInfo.db=null)}return e.db=null,I(e,!1).then(function(n){return(e.db=n,w(e))?I(e,!0):n}).then(function(r){e.db=n.db=r;for(var o=0;o<t.length;o++)t[o]._dbInfo.db=r}).catch(function(n){throw _(e,n),n})})(e).then(function(){j(e,n,t,r-1)})}).catch(t);t(o)}}function A(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}var R={_driver:"asyncStorage",_initStorage:function(e){var n=this,t={db:null};if(e)for(var r in e)t[r]=e[r];var o=h[t.name];o||(o=A(),h[t.name]=o),o.forages.push(n),n._initReady||(n._initReady=n.ready,n.ready=N);var i=[];function a(){return u.resolve()}for(var c=0;c<o.forages.length;c++){var f=o.forages[c];f!==n&&i.push(f._initReady().catch(a))}var s=o.forages.slice(0);return u.all(i).then(function(){return t.db=o.db,I(t,!1)}).then(function(e){return(t.db=e,w(t,n._defaultConfig.version))?I(t,!0):e}).then(function(e){t.db=o.db=e,n._dbInfo=t;for(var r=0;r<s.length;r++){var i=s[r];i!==n&&(i._dbInfo.db=t.db,i._dbInfo.version=t.version)}})},_support:function(){try{if(!i||!i.open)return!1;var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),n="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!e||n)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}(),iterate:function(e,n){var t=this,r=new u(function(n,r){t.ready().then(function(){j(t._dbInfo,p,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName).openCursor(),u=1;a.onsuccess=function(){var t=a.result;if(t){var r=t.value;E(r)&&(r=S(r));var o=e(r,t.key,u++);void 0!==o?n(o):t.continue()}else n()},a.onerror=function(){r(a.error)}}catch(e){r(e)}})}).catch(r)});return c(r,n),r},getItem:function(e,n){var t=this;e=s(e);var r=new u(function(n,r){t.ready().then(function(){j(t._dbInfo,p,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName).get(e);a.onsuccess=function(){var e=a.result;void 0===e&&(e=null),E(e)&&(e=S(e)),n(e)},a.onerror=function(){r(a.error)}}catch(e){r(e)}})}).catch(r)});return c(r,n),r},setItem:function(e,n,t){var r=this;e=s(e);var o=new u(function(t,o){var i;r.ready().then(function(){var e;return(i=r._dbInfo,"[object Blob]"===y.call(n))?(e=i.db,"boolean"==typeof v?u.resolve(v):new u(function(n){var t=e.transaction(d,b),r=a([""]);t.objectStore(d).put(r,"key"),t.onabort=function(e){e.preventDefault(),e.stopPropagation(),n(!1)},t.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/);n(navigator.userAgent.match(/Edge\//)||!e||parseInt(e[1],10)>=43)}}).catch(function(){return!1}).then(function(e){return v=e})).then(function(e){return e?n:new u(function(e,t){var r=new FileReader;r.onerror=t,r.onloadend=function(t){e({__local_forage_encoded_blob:!0,data:btoa(t.target.result||""),type:n.type})},r.readAsBinaryString(n)})}):n}).then(function(n){j(r._dbInfo,b,function(i,a){if(i)return o(i);try{var u=a.objectStore(r._dbInfo.storeName);null===n&&(n=void 0);var c=u.put(n,e);a.oncomplete=function(){void 0===n&&(n=null),t(n)},a.onabort=a.onerror=function(){var e=c.error?c.error:c.transaction.error;o(e)}}catch(e){o(e)}})}).catch(o)});return c(o,t),o},removeItem:function(e,n){var t=this;e=s(e);var r=new u(function(n,r){t.ready().then(function(){j(t._dbInfo,b,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName).delete(e);i.oncomplete=function(){n()},i.onerror=function(){r(a.error)},i.onabort=function(){var e=a.error?a.error:a.transaction.error;r(e)}}catch(e){r(e)}})}).catch(r)});return c(r,n),r},clear:function(e){var n=this,t=new u(function(e,t){n.ready().then(function(){j(n._dbInfo,b,function(r,o){if(r)return t(r);try{var i=o.objectStore(n._dbInfo.storeName).clear();o.oncomplete=function(){e()},o.onabort=o.onerror=function(){var e=i.error?i.error:i.transaction.error;t(e)}}catch(e){t(e)}})}).catch(t)});return c(t,e),t},length:function(e){var n=this,t=new u(function(e,t){n.ready().then(function(){j(n._dbInfo,p,function(r,o){if(r)return t(r);try{var i=o.objectStore(n._dbInfo.storeName).count();i.onsuccess=function(){e(i.result)},i.onerror=function(){t(i.error)}}catch(e){t(e)}})}).catch(t)});return c(t,e),t},key:function(e,n){var t=this,r=new u(function(n,r){if(e<0){n(null);return}t.ready().then(function(){j(t._dbInfo,p,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName),u=!1,c=a.openKeyCursor();c.onsuccess=function(){var t=c.result;if(!t){n(null);return}0===e?n(t.key):u?n(t.key):(u=!0,t.advance(e))},c.onerror=function(){r(c.error)}}catch(e){r(e)}})}).catch(r)});return c(r,n),r},keys:function(e){var n=this,t=new u(function(e,t){n.ready().then(function(){j(n._dbInfo,p,function(r,o){if(r)return t(r);try{var i=o.objectStore(n._dbInfo.storeName).openKeyCursor(),a=[];i.onsuccess=function(){var n=i.result;if(!n){e(a);return}a.push(n.key),n.continue()},i.onerror=function(){t(i.error)}}catch(e){t(e)}})}).catch(t)});return c(t,e),t},dropInstance:function(e,n){n=l.apply(this,arguments);var t,r=this.config();if((e="function"!=typeof e&&e||{}).name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName),e.name){var o=e.name===r.name&&this._dbInfo.db?u.resolve(this._dbInfo.db):I(e,!1).then(function(n){var t=h[e.name],r=t.forages;t.db=n;for(var o=0;o<r.length;o++)r[o]._dbInfo.db=n;return n});t=e.storeName?o.then(function(n){if(n.objectStoreNames.contains(e.storeName)){var t=n.version+1;m(e);var r=h[e.name],o=r.forages;n.close();for(var a=0;a<o.length;a++){var c=o[a];c._dbInfo.db=null,c._dbInfo.version=t}return new u(function(n,r){var o=i.open(e.name,t);o.onerror=function(e){o.result.close(),r(e)},o.onupgradeneeded=function(){o.result.deleteObjectStore(e.storeName)},o.onsuccess=function(){var e=o.result;e.close(),n(e)}}).then(function(e){r.db=e;for(var n=0;n<o.length;n++){var t=o[n];t._dbInfo.db=e,g(t._dbInfo)}}).catch(function(n){throw(_(e,n)||u.resolve()).catch(function(){}),n})}}):o.then(function(n){m(e);var t=h[e.name],r=t.forages;n.close();for(var o=0;o<r.length;o++)r[o]._dbInfo.db=null;return new u(function(n,t){var r=i.deleteDatabase(e.name);r.onerror=function(){var e=r.result;e&&e.close(),t(r.error)},r.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},r.onsuccess=function(){var e=r.result;e&&e.close(),n(e)}}).then(function(e){t.db=e;for(var n=0;n<r.length;n++)g(r[n]._dbInfo)}).catch(function(n){throw(_(e,n)||u.resolve()).catch(function(){}),n})})}else t=u.reject("Invalid arguments");return c(t,n),t}},O="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",D=/^~~local_forage_type~([^~]+)~/,k="__lfsc__:",x=k.length,B="arbf",T="blob",C="si08",F="ui08",L="uic8",M="si16",P="si32",z="ur16",U="ui32",q="fl32",W="fl64",H=x+B.length,K=Object.prototype.toString;function Q(e){var n,t,r,o,i,a=.75*e.length,u=e.length,c=0;"="===e[e.length-1]&&(a--,"="===e[e.length-2]&&a--);var f=new ArrayBuffer(a),s=new Uint8Array(f);for(n=0;n<u;n+=4)t=O.indexOf(e[n]),r=O.indexOf(e[n+1]),o=O.indexOf(e[n+2]),i=O.indexOf(e[n+3]),s[c++]=t<<2|r>>4,s[c++]=(15&r)<<4|o>>2,s[c++]=(3&o)<<6|63&i;return f}function X(e){var n,t=new Uint8Array(e),r="";for(n=0;n<t.length;n+=3)r+=O[t[n]>>2]+O[(3&t[n])<<4|t[n+1]>>4]+O[(15&t[n+1])<<2|t[n+2]>>6]+O[63&t[n+2]];return t.length%3==2?r=r.substring(0,r.length-1)+"=":t.length%3==1&&(r=r.substring(0,r.length-2)+"=="),r}var G={serialize:function(e,n){var t="";if(e&&(t=K.call(e)),e&&("[object ArrayBuffer]"===t||e.buffer&&"[object ArrayBuffer]"===K.call(e.buffer))){var r,o=k;e instanceof ArrayBuffer?(r=e,o+=B):(r=e.buffer,"[object Int8Array]"===t?o+=C:"[object Uint8Array]"===t?o+=F:"[object Uint8ClampedArray]"===t?o+=L:"[object Int16Array]"===t?o+=M:"[object Uint16Array]"===t?o+=z:"[object Int32Array]"===t?o+=P:"[object Uint32Array]"===t?o+=U:"[object Float32Array]"===t?o+=q:"[object Float64Array]"===t?o+=W:n(Error("Failed to get type for BinaryArray"))),n(o+X(r))}else if("[object Blob]"===t){var i=new FileReader;i.onload=function(){n(k+T+("~~local_forage_type~"+e.type)+"~"+X(this.result))},i.readAsArrayBuffer(e)}else try{n(JSON.stringify(e))}catch(t){console.error("Couldn't convert value into a JSON string: ",e),n(null,t)}},deserialize:function(e){if(e.substring(0,x)!==k)return JSON.parse(e);var n,t=e.substring(H),r=e.substring(x,H);if(r===T&&D.test(t)){var o=t.match(D);n=o[1],t=t.substring(o[0].length)}var i=Q(t);switch(r){case B:return i;case T:return a([i],{type:n});case C:return new Int8Array(i);case F:return new Uint8Array(i);case L:return new Uint8ClampedArray(i);case M:return new Int16Array(i);case z:return new Uint16Array(i);case P:return new Int32Array(i);case U:return new Uint32Array(i);case q:return new Float32Array(i);case W:return new Float64Array(i);default:throw Error("Unkown type: "+r)}},stringToBuffer:Q,bufferToString:X};function J(e,n,t,r){e.executeSql("CREATE TABLE IF NOT EXISTS "+n.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],t,r)}function V(e,n,t,r,o,i){e.executeSql(t,r,o,function(e,a){a.code===a.SYNTAX_ERR?e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[n.storeName],function(e,u){u.rows.length?i(e,a):J(e,n,function(){e.executeSql(t,r,o,i)},i)},i):i(e,a)},i)}function Y(e,n,t,r){var o=this;e=s(e);var i=new u(function(i,a){o.ready().then(function(){void 0===n&&(n=null);var u=n,c=o._dbInfo;c.serializer.serialize(n,function(n,f){f?a(f):c.db.transaction(function(t){V(t,c,"INSERT OR REPLACE INTO "+c.storeName+" (key, value) VALUES (?, ?)",[e,n],function(){i(u)},function(e,n){a(n)})},function(n){if(n.code===n.QUOTA_ERR){if(r>0){i(Y.apply(o,[e,u,t,r-1]));return}a(n)}})})}).catch(a)});return c(i,t),i}var Z={_driver:"webSQLStorage",_initStorage:function(e){var n=this,t={db:null};if(e)for(var r in e)t[r]="string"!=typeof e[r]?e[r].toString():e[r];var o=new u(function(e,r){try{t.db=openDatabase(t.name,String(t.version),t.description,t.size)}catch(e){return r(e)}t.db.transaction(function(o){J(o,t,function(){n._dbInfo=t,e()},function(e,n){r(n)})},r)});return t.serializer=G,o},_support:"function"==typeof openDatabase,iterate:function(e,n){var t=this,r=new u(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){V(t,o,"SELECT * FROM "+o.storeName,[],function(t,r){for(var i=r.rows,a=i.length,u=0;u<a;u++){var c=i.item(u),f=c.value;if(f&&(f=o.serializer.deserialize(f)),void 0!==(f=e(f,c.key,u+1))){n(f);return}}n()},function(e,n){r(n)})})}).catch(r)});return c(r,n),r},getItem:function(e,n){var t=this;e=s(e);var r=new u(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){V(t,o,"SELECT * FROM "+o.storeName+" WHERE key = ? LIMIT 1",[e],function(e,t){var r=t.rows.length?t.rows.item(0).value:null;r&&(r=o.serializer.deserialize(r)),n(r)},function(e,n){r(n)})})}).catch(r)});return c(r,n),r},setItem:function(e,n,t){return Y.apply(this,[e,n,t,1])},removeItem:function(e,n){var t=this;e=s(e);var r=new u(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){V(t,o,"DELETE FROM "+o.storeName+" WHERE key = ?",[e],function(){n()},function(e,n){r(n)})})}).catch(r)});return c(r,n),r},clear:function(e){var n=this,t=new u(function(e,t){n.ready().then(function(){var r=n._dbInfo;r.db.transaction(function(n){V(n,r,"DELETE FROM "+r.storeName,[],function(){e()},function(e,n){t(n)})})}).catch(t)});return c(t,e),t},length:function(e){var n=this,t=new u(function(e,t){n.ready().then(function(){var r=n._dbInfo;r.db.transaction(function(n){V(n,r,"SELECT COUNT(key) as c FROM "+r.storeName,[],function(n,t){e(t.rows.item(0).c)},function(e,n){t(n)})})}).catch(t)});return c(t,e),t},key:function(e,n){var t=this,r=new u(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){V(t,o,"SELECT key FROM "+o.storeName+" WHERE id = ? LIMIT 1",[e+1],function(e,t){n(t.rows.length?t.rows.item(0).key:null)},function(e,n){r(n)})})}).catch(r)});return c(r,n),r},keys:function(e){var n=this,t=new u(function(e,t){n.ready().then(function(){var r=n._dbInfo;r.db.transaction(function(n){V(n,r,"SELECT key FROM "+r.storeName,[],function(n,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o).key);e(r)},function(e,n){t(n)})})}).catch(t)});return c(t,e),t},dropInstance:function(e,n){n=l.apply(this,arguments);var t,r=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this;return c(t=e.name?new u(function(n){var t;(t=e.name===r.name?o._dbInfo.db:openDatabase(e.name,"","",0),e.storeName)?n({db:t,storeNames:[e.storeName]}):n(new u(function(e,n){t.transaction(function(r){r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(n,r){for(var o=[],i=0;i<r.rows.length;i++)o.push(r.rows.item(i).name);e({db:t,storeNames:o})},function(e,t){n(t)})},function(e){n(e)})}))}).then(function(e){return new u(function(n,t){e.db.transaction(function(r){for(var o=[],i=0,a=e.storeNames.length;i<a;i++)o.push(function(e){return new u(function(n,t){r.executeSql("DROP TABLE IF EXISTS "+e,[],function(){n()},function(e,n){t(n)})})}(e.storeNames[i]));u.all(o).then(function(){n()}).catch(function(e){t(e)})},function(e){t(e)})})}):u.reject("Invalid arguments"),n),t}};function $(e,n){var t=e.name+"/";return e.storeName!==n.storeName&&(t+=e.storeName+"/"),t}var ee={_driver:"localStorageWrapper",_initStorage:function(e){var n={};if(e)for(var t in e)n[t]=e[t];return(n.keyPrefix=$(e,this._defaultConfig),!function(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch(e){return!0}}()||localStorage.length>0)?(this._dbInfo=n,n.serializer=G,u.resolve()):u.reject()},_support:function(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}(),iterate:function(e,n){var t=this,r=t.ready().then(function(){for(var n=t._dbInfo,r=n.keyPrefix,o=r.length,i=localStorage.length,a=1,u=0;u<i;u++){var c=localStorage.key(u);if(0===c.indexOf(r)){var f=localStorage.getItem(c);if(f&&(f=n.serializer.deserialize(f)),void 0!==(f=e(f,c.substring(o),a++)))return f}}});return c(r,n),r},getItem:function(e,n){var t=this;e=s(e);var r=t.ready().then(function(){var n=t._dbInfo,r=localStorage.getItem(n.keyPrefix+e);return r&&(r=n.serializer.deserialize(r)),r});return c(r,n),r},setItem:function(e,n,t){var r=this;e=s(e);var o=r.ready().then(function(){void 0===n&&(n=null);var t=n;return new u(function(o,i){var a=r._dbInfo;a.serializer.serialize(n,function(n,r){if(r)i(r);else try{localStorage.setItem(a.keyPrefix+e,n),o(t)}catch(e){("QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&i(e),i(e)}})})});return c(o,t),o},removeItem:function(e,n){var t=this;e=s(e);var r=t.ready().then(function(){var n=t._dbInfo;localStorage.removeItem(n.keyPrefix+e)});return c(r,n),r},clear:function(e){var n=this,t=n.ready().then(function(){for(var e=n._dbInfo.keyPrefix,t=localStorage.length-1;t>=0;t--){var r=localStorage.key(t);0===r.indexOf(e)&&localStorage.removeItem(r)}});return c(t,e),t},length:function(e){var n=this.keys().then(function(e){return e.length});return c(n,e),n},key:function(e,n){var t=this,r=t.ready().then(function(){var n,r=t._dbInfo;try{n=localStorage.key(e)}catch(e){n=null}return n&&(n=n.substring(r.keyPrefix.length)),n});return c(r,n),r},keys:function(e){var n=this,t=n.ready().then(function(){for(var e=n._dbInfo,t=localStorage.length,r=[],o=0;o<t;o++){var i=localStorage.key(o);0===i.indexOf(e.keyPrefix)&&r.push(i.substring(e.keyPrefix.length))}return r});return c(t,e),t},dropInstance:function(e,n){if(n=l.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){var t,r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var o=this;return c(t=e.name?new u(function(n){n(e.storeName?$(e,o._defaultConfig):e.name+"/")}).then(function(e){for(var n=localStorage.length-1;n>=0;n--){var t=localStorage.key(n);0===t.indexOf(e)&&localStorage.removeItem(t)}}):u.reject("Invalid arguments"),n),t}},en=function(e,n){for(var t,r=e.length,o=0;o<r;){if((t=e[o])===n||"number"==typeof t&&"number"==typeof n&&isNaN(t)&&isNaN(n))return!0;o++}return!1},et=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},er={},eo={},ei={INDEXEDDB:R,WEBSQL:Z,LOCALSTORAGE:ee},ea=[ei.INDEXEDDB._driver,ei.WEBSQL._driver,ei.LOCALSTORAGE._driver],eu=["dropInstance"],ec=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(eu),ef={description:"",driver:ea.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function es(){for(var e=1;e<arguments.length;e++){var n=arguments[e];if(n)for(var t in n)n.hasOwnProperty(t)&&(et(n[t])?arguments[0][t]=n[t].slice():arguments[0][t]=n[t])}return arguments[0]}var el=new(function(){function e(n){for(var t in!function(e,n){if(!(e instanceof n))throw TypeError("Cannot call a class as a function")}(this,e),ei)if(ei.hasOwnProperty(t)){var r=ei[t],o=r._driver;this[t]=o,er[o]||this.defineDriver(r)}this._defaultConfig=es({},ef),this._config=es({},this._defaultConfig,n),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(e){if((void 0===e?"undefined":o(e))==="object"){if(this._ready)return Error("Can't call config() after localforage has been used.");for(var n in e){if("storeName"===n&&(e[n]=e[n].replace(/\W/g,"_")),"version"===n&&"number"!=typeof e[n])return Error("Database version must be a number.");this._config[n]=e[n]}return!("driver"in e)||!e.driver||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,n,t){var r=new u(function(n,t){try{var r=e._driver,o=Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver){t(o);return}for(var i=ec.concat("_initStorage"),a=0,f=i.length;a<f;a++){var s=i[a];if((!en(eu,s)||e[s])&&"function"!=typeof e[s]){t(o);return}}!function(){for(var n=function(e){return function(){var n=Error("Method "+e+" is not implemented by the current driver"),t=u.reject(n);return c(t,arguments[arguments.length-1]),t}},t=0,r=eu.length;t<r;t++){var o=eu[t];e[o]||(e[o]=n(o))}}();var l=function(t){er[r]&&console.info("Redefining LocalForage driver: "+r),er[r]=e,eo[r]=t,n()};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(l,t):l(!!e._support):l(!0)}catch(e){t(e)}});return f(r,n,t),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,n,t){var r=er[e]?u.resolve(er[e]):u.reject(Error("Driver not found."));return f(r,n,t),r},e.prototype.getSerializer=function(e){var n=u.resolve(G);return f(n,e),n},e.prototype.ready=function(e){var n=this,t=n._driverSet.then(function(){return null===n._ready&&(n._ready=n._initDriver()),n._ready});return f(t,e,e),t},e.prototype.setDriver=function(e,n,t){var r=this;et(e)||(e=[e]);var o=this._getSupportedDrivers(e);function i(){r._config.driver=r.driver()}function a(e){return r._extend(e),i(),r._ready=r._initStorage(r._config),r._ready}var c=null!==this._driverSet?this._driverSet.catch(function(){return u.resolve()}):u.resolve();return this._driverSet=c.then(function(){var e=o[0];return r._dbInfo=null,r._ready=null,r.getDriver(e).then(function(e){r._driver=e._driver,i(),r._wrapLibraryMethodsWithReady(),r._initDriver=function(){var e=0;return function n(){for(;e<o.length;){var t=o[e];return e++,r._dbInfo=null,r._ready=null,r.getDriver(t).then(a).catch(n)}i();var c=Error("No available storage method found.");return r._driverSet=u.reject(c),r._driverSet}()}})}).catch(function(){i();var e=Error("No available storage method found.");return r._driverSet=u.reject(e),r._driverSet}),f(this._driverSet,n,t),this._driverSet},e.prototype.supports=function(e){return!!eo[e]},e.prototype._extend=function(e){es(this,e)},e.prototype._getSupportedDrivers=function(e){for(var n=[],t=0,r=e.length;t<r;t++){var o=e[t];this.supports(o)&&n.push(o)}return n},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0,n=ec.length;e<n;e++)!function(e,n){e[n]=function(){var t=arguments;return e.ready().then(function(){return e[n].apply(e,t)})}}(this,ec[e])},e.prototype.createInstance=function(n){return new e(n)},e}());n.exports=el},{3:3}]},{},[4])(4);var r=new BroadcastChannel("sw-messages");self.onsystemmessage=function(e){e.waitUntil(function(){if("activity"===e.name&&"flop"==(handler=e.data.webActivityRequestHandler()).source.name){var t;((t=n)&&t.__esModule?t.default:t).setItem("connect_to_id",handler.source.data).then(function(e){}),self.clients.openWindow("index.html")}}())},r.addEventListener("message",function(e){"startInterval"===e.data&&setInterval(function(){r.postMessage("intervalTriggered")},1e4)});var o=navigator.userAgent||"";if(o&&!o.includes("KAIOS")){var i="pwa-cache-v0.13578";self.addEventListener("install",function(e){e.waitUntil(caches.open(i).then(function(e){return console.log("Opened cache"),fetch("/file-list.json").then(function(e){if(!e.ok)throw Error("HTTP error! Status: ".concat(e.status));return e.json()}).then(function(n){if(Array.isArray(n))return Promise.all(n.map(function(n){return e.add(n).catch(function(e){console.error("Failed to cache ".concat(n,":"),e)})}));console.error("Fetched data is not an array:",n)})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=[i];e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.includes(e))return caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(n){return n||fetch(e.request)}))})}}();