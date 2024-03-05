function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _construct(Parent, args, Class) {
    if (_is_native_reflect_construct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function get(target, property, receiver) {
            var base = _super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrap_native_super = function wrapNativeSuper(Class) {
        if (Class === null || !_is_native_function(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _set_prototype_of(Wrapper, Class);
    };
    return _wrap_native_super(Class);
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
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
}
(function() {
    var e = function e(e, t, n, r) {
        Object.defineProperty(e, t, {
            get: n,
            set: r,
            enumerable: !0,
            configurable: !0
        });
    };
    var t = function t(e) {
        return e && e.__esModule ? e.default : e;
    };
    var i = function i(e) {
        return new s(e).unpack();
    };
    var o = function o(e) {
        var t = new a, n = t.pack(e);
        return n instanceof Promise ? n.then(function() {
            return t.getBuffer();
        }) : t.getBuffer();
    };
    var p = function p(e, t, n) {
        var r = e.match(t);
        return r && r.length >= n && parseInt(r[n], 10);
    };
    var d = function d(e, t, n) {
        if (!e.RTCPeerConnection) return;
        var r = e.RTCPeerConnection.prototype, i = r.addEventListener;
        r.addEventListener = function(e, r) {
            if (e !== t) return i.apply(this, arguments);
            var o = function(e) {
                var _$t = n(e);
                _$t && (r.handleEvent ? r.handleEvent(_$t) : r(_$t));
            };
            return this._eventMap = this._eventMap || {}, this._eventMap[t] || (this._eventMap[t] = new Map), this._eventMap[t].set(r, o), i.apply(this, [
                e,
                o
            ]);
        };
        var o = r.removeEventListener;
        r.removeEventListener = function(e, n) {
            if (e !== t || !this._eventMap || !this._eventMap[t] || !this._eventMap[t].has(n)) return o.apply(this, arguments);
            var r = this._eventMap[t].get(n);
            return this._eventMap[t].delete(n), 0 === this._eventMap[t].size && delete this._eventMap[t], 0 === Object.keys(this._eventMap).length && delete this._eventMap, o.apply(this, [
                e,
                r
            ]);
        }, Object.defineProperty(r, "on" + t, {
            get: function() {
                return this["_on" + t];
            },
            set: function(e) {
                this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e);
            },
            enumerable: !0,
            configurable: !0
        });
    };
    var h = function h(e) {
        return "boolean" != typeof e ? Error("Argument type: " + (typeof e === "undefined" ? "undefined" : _type_of(e)) + ". Please use a boolean.") : (c = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled");
    };
    var u = function u(e) {
        return "boolean" != typeof e ? Error("Argument type: " + (typeof e === "undefined" ? "undefined" : _type_of(e)) + ". Please use a boolean.") : (l = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
    };
    var f = function f() {
        "object" != typeof window || c || "undefined" == typeof console || "function" != typeof console.log || console.log.apply(console, arguments);
    };
    var m = function m(e, t) {
        l && console.warn(e + " is deprecated, please use " + t + " instead.");
    };
    var g = function g(e) {
        return "[object Object]" === Object.prototype.toString.call(e);
    };
    var y = function y(e, t, n) {
        var r = n ? "outbound-rtp" : "inbound-rtp", i = new Map;
        if (null === t) return i;
        var o = [];
        return e.forEach(function(e) {
            "track" === e.type && e.trackIdentifier === t.id && o.push(e);
        }), o.forEach(function(t) {
            e.forEach(function(n) {
                n.type === r && n.trackId === t.id && function e(t, n, r) {
                    !n || r.has(n.id) || (r.set(n.id, n), Object.keys(n).forEach(function(i) {
                        i.endsWith("Id") ? e(t, t.get(n[i]), r) : i.endsWith("Ids") && n[i].forEach(function(n) {
                            e(t, t.get(n), r);
                        });
                    }));
                }(e, n, i);
            });
        }), i;
    };
    var L = function L(e, t) {
        var n = e && e.navigator;
        if (!n.mediaDevices) return;
        var r = function r(e) {
            if ("object" != typeof e || e.mandatory || e.optional) return e;
            var t = {};
            return Object.keys(e).forEach(function(n) {
                if ("require" === n || "advanced" === n || "mediaSource" === n) return;
                var r = "object" == typeof e[n] ? e[n] : {
                    ideal: e[n]
                };
                void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                var i = function i(e, t) {
                    return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t;
                };
                if (void 0 !== r.ideal) {
                    t.optional = t.optional || [];
                    var _$e = {};
                    "number" == typeof r.ideal ? (_$e[i("min", n)] = r.ideal, t.optional.push(_$e), (_$e = {})[i("max", n)] = r.ideal) : _$e[i("", n)] = r.ideal, t.optional.push(_$e);
                }
                void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : [
                    "min",
                    "max"
                ].forEach(function(e) {
                    void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e]);
                });
            }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t;
        }, i = function i(e, i) {
            if (t.version >= 61) return i(e);
            if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
                var _$t = function t(e, t, n) {
                    t in e && !(n in e) && (e[n] = e[t], delete e[t]);
                };
                _$t((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), _$t(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = r(e.audio);
            }
            if (e && "object" == typeof e.video) {
                var o = e.video.facingMode;
                o = o && ("object" == typeof o ? o : {
                    ideal: o
                });
                var s = t.version < 66;
                if (o && ("user" === o.exact || "environment" === o.exact || "user" === o.ideal || "environment" === o.ideal) && !(n.mediaDevices.getSupportedConstraints && n.mediaDevices.getSupportedConstraints().facingMode && !s)) {
                    var _$t1;
                    if (delete e.video.facingMode, "environment" === o.exact || "environment" === o.ideal ? _$t1 = [
                        "back",
                        "rear"
                    ] : ("user" === o.exact || "user" === o.ideal) && (_$t1 = [
                        "front"
                    ]), _$t1) return n.mediaDevices.enumerateDevices().then(function(n) {
                        var s = (n = n.filter(function(e) {
                            return "videoinput" === e.kind;
                        })).find(function(e) {
                            return _$t1.some(function(t) {
                                return e.label.toLowerCase().includes(t);
                            });
                        });
                        return !s && n.length && _$t1.includes("back") && (s = n[n.length - 1]), s && (e.video.deviceId = o.exact ? {
                            exact: s.deviceId
                        } : {
                            ideal: s.deviceId
                        }), e.video = r(e.video), f("chrome: " + JSON.stringify(e)), i(e);
                    });
                }
                e.video = r(e.video);
            }
            return f("chrome: " + JSON.stringify(e)), i(e);
        }, o = function o(e) {
            return t.version >= 64 ? e : {
                name: ({
                    PermissionDeniedError: "NotAllowedError",
                    PermissionDismissedError: "NotAllowedError",
                    InvalidStateError: "NotAllowedError",
                    DevicesNotFoundError: "NotFoundError",
                    ConstraintNotSatisfiedError: "OverconstrainedError",
                    TrackStartError: "NotReadableError",
                    MediaDeviceFailedDueToShutdown: "NotAllowedError",
                    MediaDeviceKillSwitchOn: "NotAllowedError",
                    TabCaptureError: "AbortError",
                    ScreenCaptureError: "AbortError",
                    DeviceCaptureError: "AbortError"
                })[e.name] || e.name,
                message: e.message,
                constraint: e.constraint || e.constraintName,
                toString: function() {
                    return this.name + (this.message && ": ") + this.message;
                }
            };
        };
        if (n.getUserMedia = (function(e, t, r) {
            i(e, function(e) {
                n.webkitGetUserMedia(e, t, function(e) {
                    r && r(o(e));
                });
            });
        }).bind(n), n.mediaDevices.getUserMedia) {
            var _$e = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
            n.mediaDevices.getUserMedia = function(t) {
                return i(t, function(t) {
                    return _$e(t).then(function(e) {
                        if (t.audio && !e.getAudioTracks().length || t.video && !e.getVideoTracks().length) throw e.getTracks().forEach(function(e) {
                            e.stop();
                        }), new DOMException("", "NotFoundError");
                        return e;
                    }, function(e) {
                        return Promise.reject(o(e));
                    });
                });
            };
        }
    };
    var A = function A(e, t) {
        if ((!e.navigator.mediaDevices || !("getDisplayMedia" in e.navigator.mediaDevices)) && e.navigator.mediaDevices) {
            if ("function" != typeof t) {
                console.error("shimGetDisplayMedia: getSourceId argument is not a function");
                return;
            }
            e.navigator.mediaDevices.getDisplayMedia = function(n) {
                return t(n).then(function(t) {
                    var r = n.video && n.video.width, i = n.video && n.video.height, o = n.video && n.video.frameRate;
                    return n.video = {
                        mandatory: {
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: t,
                            maxFrameRate: o || 3
                        }
                    }, r && (n.video.mandatory.maxWidth = r), i && (n.video.mandatory.maxHeight = i), e.navigator.mediaDevices.getUserMedia(n);
                });
            };
        }
    };
    var B = function B(e) {
        e.MediaStream = e.MediaStream || e.webkitMediaStream;
    };
    var F = function F(e) {
        if ("object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype) d(e, "track", function(e) {
            return e.transceiver || Object.defineProperty(e, "transceiver", {
                value: {
                    receiver: e.receiver
                }
            }), e;
        });
        else {
            Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                get: function() {
                    return this._ontrack;
                },
                set: function(e) {
                    this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e);
                },
                enumerable: !0,
                configurable: !0
            });
            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                var _this = this;
                return this._ontrackpoly || (this._ontrackpoly = function(t) {
                    t.stream.addEventListener("addtrack", function(n) {
                        var r;
                        r = e.RTCPeerConnection.prototype.getReceivers ? _this.getReceivers().find(function(e) {
                            return e.track && e.track.id === n.track.id;
                        }) : {
                            track: n.track
                        };
                        var i = new Event("track");
                        i.track = n.track, i.receiver = r, i.transceiver = {
                            receiver: r
                        }, i.streams = [
                            t.stream
                        ], _this.dispatchEvent(i);
                    }), t.stream.getTracks().forEach(function(n) {
                        var r;
                        r = e.RTCPeerConnection.prototype.getReceivers ? _this.getReceivers().find(function(e) {
                            return e.track && e.track.id === n.id;
                        }) : {
                            track: n
                        };
                        var i = new Event("track");
                        i.track = n, i.receiver = r, i.transceiver = {
                            receiver: r
                        }, i.streams = [
                            t.stream
                        ], _this.dispatchEvent(i);
                    });
                }, this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments);
            };
        }
    };
    var U = function U(e) {
        if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
            var t = function t(e, t) {
                return {
                    track: t,
                    get dtmf () {
                        return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf;
                    },
                    _pc: e
                };
            };
            if (!e.RTCPeerConnection.prototype.getSenders) {
                e.RTCPeerConnection.prototype.getSenders = function() {
                    return this._senders = this._senders || [], this._senders.slice();
                };
                var n = e.RTCPeerConnection.prototype.addTrack;
                e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                    var i = n.apply(this, arguments);
                    return i || (i = t(this, e), this._senders.push(i)), i;
                };
                var r = e.RTCPeerConnection.prototype.removeTrack;
                e.RTCPeerConnection.prototype.removeTrack = function(e) {
                    r.apply(this, arguments);
                    var t = this._senders.indexOf(e);
                    -1 !== t && this._senders.splice(t, 1);
                };
            }
            var n1 = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function(e) {
                var _this = this;
                this._senders = this._senders || [], n1.apply(this, [
                    e
                ]), e.getTracks().forEach(function(e) {
                    _this._senders.push(t(_this, e));
                });
            };
            var r1 = e.RTCPeerConnection.prototype.removeStream;
            e.RTCPeerConnection.prototype.removeStream = function(e) {
                var _this = this;
                this._senders = this._senders || [], r1.apply(this, [
                    e
                ]), e.getTracks().forEach(function(e) {
                    var t = _this._senders.find(function(t) {
                        return t.track === e;
                    });
                    t && _this._senders.splice(_this._senders.indexOf(t), 1);
                });
            };
        } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
            var t1 = e.RTCPeerConnection.prototype.getSenders;
            e.RTCPeerConnection.prototype.getSenders = function() {
                var _this = this;
                var _$e = t1.apply(this, []);
                return _$e.forEach(function(e) {
                    return e._pc = _this;
                }), _$e;
            }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                get: function() {
                    return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
                }
            });
        }
    };
    var z = function z(e) {
        if (!e.RTCPeerConnection) return;
        var t = e.RTCPeerConnection.prototype.getStats;
        e.RTCPeerConnection.prototype.getStats = function() {
            var _this = this;
            var _arguments = _sliced_to_array(arguments, 3), _$e = _arguments[0], n = _arguments[1], r = _arguments[2];
            if (arguments.length > 0 && "function" == typeof _$e) return t.apply(this, arguments);
            if (0 === t.length && (0 == arguments.length || "function" != typeof _$e)) return t.apply(this, []);
            var i = function i(e) {
                var t = {};
                return e.result().forEach(function(e) {
                    var n = {
                        id: e.id,
                        timestamp: e.timestamp,
                        type: {
                            localcandidate: "local-candidate",
                            remotecandidate: "remote-candidate"
                        }[e.type] || e.type
                    };
                    e.names().forEach(function(t) {
                        n[t] = e.stat(t);
                    }), t[n.id] = n;
                }), t;
            }, o = function o(e) {
                return new Map(Object.keys(e).map(function(t) {
                    return [
                        t,
                        e[t]
                    ];
                }));
            };
            return arguments.length >= 2 ? t.apply(this, [
                function(e) {
                    n(o(i(e)));
                },
                _$e
            ]) : new Promise(function(e, n) {
                t.apply(_this, [
                    function(t) {
                        e(o(i(t)));
                    },
                    n
                ]);
            }).then(n, r);
        };
    };
    var N = function N(e) {
        if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver)) return;
        if (!("getStats" in e.RTCRtpSender.prototype)) {
            var t = e.RTCPeerConnection.prototype.getSenders;
            t && (e.RTCPeerConnection.prototype.getSenders = function() {
                var _this = this;
                var _$e = t.apply(this, []);
                return _$e.forEach(function(e) {
                    return e._pc = _this;
                }), _$e;
            });
            var n = e.RTCPeerConnection.prototype.addTrack;
            n && (e.RTCPeerConnection.prototype.addTrack = function() {
                var _$e = n.apply(this, arguments);
                return _$e._pc = this, _$e;
            }), e.RTCRtpSender.prototype.getStats = function() {
                var _$e = this;
                return this._pc.getStats().then(function(t) {
                    return y(t, _$e.track, !0);
                });
            };
        }
        if (!("getStats" in e.RTCRtpReceiver.prototype)) {
            var t1 = e.RTCPeerConnection.prototype.getReceivers;
            t1 && (e.RTCPeerConnection.prototype.getReceivers = function() {
                var _this = this;
                var _$e = t1.apply(this, []);
                return _$e.forEach(function(e) {
                    return e._pc = _this;
                }), _$e;
            }), d(e, "track", function(e) {
                return e.receiver._pc = e.srcElement, e;
            }), e.RTCRtpReceiver.prototype.getStats = function() {
                var _$e = this;
                return this._pc.getStats().then(function(t) {
                    return y(t, _$e.track, !1);
                });
            };
        }
        if (!("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype)) return;
        var t2 = e.RTCPeerConnection.prototype.getStats;
        e.RTCPeerConnection.prototype.getStats = function() {
            if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                var _$e, t, n;
                var r = arguments[0];
                return (this.getSenders().forEach(function(t) {
                    t.track === r && (_$e ? n = !0 : _$e = t);
                }), this.getReceivers().forEach(function(e) {
                    return e.track === r && (t ? n = !0 : t = e), e.track === r;
                }), n || _$e && t) ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : _$e ? _$e.getStats() : t ? t.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
            }
            return t2.apply(this, arguments);
        };
    };
    var $ = function $(e) {
        e.RTCPeerConnection.prototype.getLocalStreams = function() {
            var _this = this;
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(function(e) {
                return _this._shimmedLocalStreams[e][0];
            });
        };
        var t = e.RTCPeerConnection.prototype.addTrack;
        e.RTCPeerConnection.prototype.addTrack = function(e, n) {
            if (!n) return t.apply(this, arguments);
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            var r = t.apply(this, arguments);
            return this._shimmedLocalStreams[n.id] ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) && this._shimmedLocalStreams[n.id].push(r) : this._shimmedLocalStreams[n.id] = [
                n,
                r
            ], r;
        };
        var n = e.RTCPeerConnection.prototype.addStream;
        e.RTCPeerConnection.prototype.addStream = function(e) {
            var _this = this;
            this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e.getTracks().forEach(function(e) {
                if (_this.getSenders().find(function(t) {
                    return t.track === e;
                })) throw new DOMException("Track already exists.", "InvalidAccessError");
            });
            var t = this.getSenders();
            n.apply(this, arguments);
            var r = this.getSenders().filter(function(e) {
                return -1 === t.indexOf(e);
            });
            this._shimmedLocalStreams[e.id] = [
                e
            ].concat(r);
        };
        var r = e.RTCPeerConnection.prototype.removeStream;
        e.RTCPeerConnection.prototype.removeStream = function(e) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e.id], r.apply(this, arguments);
        };
        var i = e.RTCPeerConnection.prototype.removeTrack;
        e.RTCPeerConnection.prototype.removeTrack = function(e) {
            var _this = this;
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e && Object.keys(this._shimmedLocalStreams).forEach(function(t) {
                var n = _this._shimmedLocalStreams[t].indexOf(e);
                -1 !== n && _this._shimmedLocalStreams[t].splice(n, 1), 1 === _this._shimmedLocalStreams[t].length && delete _this._shimmedLocalStreams[t];
            }), i.apply(this, arguments);
        };
    };
    var J = function J(e, t) {
        if (!e.RTCPeerConnection) return;
        if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return $(e);
        var n = e.RTCPeerConnection.prototype.getLocalStreams;
        e.RTCPeerConnection.prototype.getLocalStreams = function() {
            var _this = this;
            var _$e = n.apply(this);
            return this._reverseStreams = this._reverseStreams || {}, _$e.map(function(e) {
                return _this._reverseStreams[e.id];
            });
        };
        var r = e.RTCPeerConnection.prototype.addStream;
        e.RTCPeerConnection.prototype.addStream = function(t) {
            var _this = this;
            if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t.getTracks().forEach(function(e) {
                if (_this.getSenders().find(function(t) {
                    return t.track === e;
                })) throw new DOMException("Track already exists.", "InvalidAccessError");
            }), !this._reverseStreams[t.id]) {
                var n = new e.MediaStream(t.getTracks());
                this._streams[t.id] = n, this._reverseStreams[n.id] = t, t = n;
            }
            r.apply(this, [
                t
            ]);
        };
        var i = e.RTCPeerConnection.prototype.removeStream;
        function o(e, t) {
            var n = t.sdp;
            return Object.keys(e._reverseStreams || []).forEach(function(t) {
                var r = e._reverseStreams[t], i = e._streams[r.id];
                n = n.replace(RegExp(i.id, "g"), r.id);
            }), new RTCSessionDescription({
                type: t.type,
                sdp: n
            });
        }
        e.RTCPeerConnection.prototype.removeStream = function(e) {
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, i.apply(this, [
                this._streams[e.id] || e
            ]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id];
        }, e.RTCPeerConnection.prototype.addTrack = function(t, n) {
            var _this = this;
            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            var r = [].slice.call(arguments, 1);
            if (1 !== r.length || !r[0].getTracks().find(function(e) {
                return e === t;
            })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
            if (this.getSenders().find(function(e) {
                return e.track === t;
            })) throw new DOMException("Track already exists.", "InvalidAccessError");
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
            var i = this._streams[n.id];
            if (i) i.addTrack(t), Promise.resolve().then(function() {
                _this.dispatchEvent(new Event("negotiationneeded"));
            });
            else {
                var r1 = new e.MediaStream([
                    t
                ]);
                this._streams[n.id] = r1, this._reverseStreams[r1.id] = n, this.addStream(r1);
            }
            return this.getSenders().find(function(e) {
                return e.track === t;
            });
        }, [
            "createOffer",
            "createAnswer"
        ].forEach(function(t) {
            var n = e.RTCPeerConnection.prototype[t];
            e.RTCPeerConnection.prototype[t] = _define_property({}, t, function() {
                var _this = this;
                var _$e = arguments, _$t = arguments.length && "function" == typeof arguments[0];
                return _$t ? n.apply(this, [
                    function(t) {
                        var n = o(_this, t);
                        _$e[0].apply(null, [
                            n
                        ]);
                    },
                    function(t) {
                        _$e[1] && _$e[1].apply(null, t);
                    },
                    arguments[2]
                ]) : n.apply(this, arguments).then(function(e) {
                    return o(_this, e);
                });
            })[t];
        });
        var s = e.RTCPeerConnection.prototype.setLocalDescription;
        e.RTCPeerConnection.prototype.setLocalDescription = function() {
            var _$e, _$t;
            var n;
            return arguments.length && arguments[0].type && (arguments[0] = (_$e = this, _$t = arguments[0], n = _$t.sdp, Object.keys(_$e._reverseStreams || []).forEach(function(t) {
                var r = _$e._reverseStreams[t], i = _$e._streams[r.id];
                n = n.replace(RegExp(r.id, "g"), i.id);
            }), new RTCSessionDescription({
                type: _$t.type,
                sdp: n
            }))), s.apply(this, arguments);
        };
        var a = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
        Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
            get: function() {
                var _$e = a.get.apply(this);
                return "" === _$e.type ? _$e : o(this, _$e);
            }
        }), e.RTCPeerConnection.prototype.removeTrack = function(e) {
            var _this = this;
            var _$t;
            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
            if (e._pc !== this) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
            this._streams = this._streams || {}, Object.keys(this._streams).forEach(function(n) {
                _this._streams[n].getTracks().find(function(t) {
                    return e.track === t;
                }) && (_$t = _this._streams[n]);
            }), _$t && (1 === _$t.getTracks().length ? this.removeStream(this._reverseStreams[_$t.id]) : _$t.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded")));
        };
    };
    var V = function V(e, t) {
        !e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), e.RTCPeerConnection && t.version < 53 && [
            "setLocalDescription",
            "setRemoteDescription",
            "addIceCandidate"
        ].forEach(function(t) {
            var n = e.RTCPeerConnection.prototype[t];
            e.RTCPeerConnection.prototype[t] = _define_property({}, t, function() {
                return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments);
            })[t];
        });
    };
    var G = function G(e, t) {
        d(e, "negotiationneeded", function(e) {
            var n = e.target;
            if (!(t.version < 72) && (!n.getConfiguration || "plan-b" !== n.getConfiguration().sdpSemantics) || "stable" === n.signalingState) return e;
        });
    };
    var H = function H(e, t) {
        var n = e && e.navigator, r = e && e.MediaStreamTrack;
        if (n.getUserMedia = function(e, t, r) {
            m("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(e).then(t, r);
        }, !(t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
            var _$e = function e(e, t, n) {
                t in e && !(n in e) && (e[n] = e[t], delete e[t]);
            }, _$t = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
            if (n.mediaDevices.getUserMedia = function(n) {
                return "object" == typeof n && "object" == typeof n.audio && (_$e((n = JSON.parse(JSON.stringify(n))).audio, "autoGainControl", "mozAutoGainControl"), _$e(n.audio, "noiseSuppression", "mozNoiseSuppression")), _$t(n);
            }, r && r.prototype.getSettings) {
                var _$t1 = r.prototype.getSettings;
                r.prototype.getSettings = function() {
                    var n = _$t1.apply(this, arguments);
                    return _$e(n, "mozAutoGainControl", "autoGainControl"), _$e(n, "mozNoiseSuppression", "noiseSuppression"), n;
                };
            }
            if (r && r.prototype.applyConstraints) {
                var _$t2 = r.prototype.applyConstraints;
                r.prototype.applyConstraints = function(n) {
                    return "audio" === this.kind && "object" == typeof n && (_$e(n = JSON.parse(JSON.stringify(n)), "autoGainControl", "mozAutoGainControl"), _$e(n, "noiseSuppression", "mozNoiseSuppression")), _$t2.apply(this, [
                        n
                    ]);
                };
            }
        }
    };
    var Y = function Y(e, t) {
        e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || !e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = function(n) {
            if (!(n && n.video)) {
                var _$e = new DOMException("getDisplayMedia without video constraints is undefined");
                return _$e.name = "NotFoundError", _$e.code = 8, Promise.reject(_$e);
            }
            return !0 === n.video ? n.video = {
                mediaSource: t
            } : n.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(n);
        });
    };
    var K = function K(e) {
        "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
            get: function() {
                return {
                    receiver: this.receiver
                };
            }
        });
    };
    var X = function X(e, t) {
        if ("object" != typeof e || !(e.RTCPeerConnection || e.mozRTCPeerConnection)) return;
        !e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), t.version < 53 && [
            "setLocalDescription",
            "setRemoteDescription",
            "addIceCandidate"
        ].forEach(function(t) {
            var n = e.RTCPeerConnection.prototype[t];
            e.RTCPeerConnection.prototype[t] = _define_property({}, t, function() {
                return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments);
            })[t];
        });
        var n = {
            inboundrtp: "inbound-rtp",
            outboundrtp: "outbound-rtp",
            candidatepair: "candidate-pair",
            localcandidate: "local-candidate",
            remotecandidate: "remote-candidate"
        }, r = e.RTCPeerConnection.prototype.getStats;
        e.RTCPeerConnection.prototype.getStats = function() {
            var _arguments = _sliced_to_array(arguments, 3), _$e = _arguments[0], i = _arguments[1], o = _arguments[2];
            return r.apply(this, [
                _$e || null
            ]).then(function(e) {
                if (t.version < 53 && !i) try {
                    e.forEach(function(e) {
                        e.type = n[e.type] || e.type;
                    });
                } catch (t) {
                    if ("TypeError" !== t.name) throw t;
                    e.forEach(function(t, r) {
                        e.set(r, Object.assign({}, t, {
                            type: n[t.type] || t.type
                        }));
                    });
                }
                return e;
            }).then(i, o);
        };
    };
    var q = function q(e) {
        if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender) || e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return;
        var t = e.RTCPeerConnection.prototype.getSenders;
        t && (e.RTCPeerConnection.prototype.getSenders = function() {
            var _this = this;
            var _$e = t.apply(this, []);
            return _$e.forEach(function(e) {
                return e._pc = _this;
            }), _$e;
        });
        var n = e.RTCPeerConnection.prototype.addTrack;
        n && (e.RTCPeerConnection.prototype.addTrack = function() {
            var _$e = n.apply(this, arguments);
            return _$e._pc = this, _$e;
        }), e.RTCRtpSender.prototype.getStats = function() {
            return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map);
        };
    };
    var Q = function Q(e) {
        if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender) || e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return;
        var t = e.RTCPeerConnection.prototype.getReceivers;
        t && (e.RTCPeerConnection.prototype.getReceivers = function() {
            var _this = this;
            var _$e = t.apply(this, []);
            return _$e.forEach(function(e) {
                return e._pc = _this;
            }), _$e;
        }), d(e, "track", function(e) {
            return e.receiver._pc = e.srcElement, e;
        }), e.RTCRtpReceiver.prototype.getStats = function() {
            return this._pc.getStats(this.track);
        };
    };
    var Z = function Z(e) {
        !e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
            var _this = this;
            m("removeStream", "removeTrack"), this.getSenders().forEach(function(t) {
                t.track && e.getTracks().includes(t.track) && _this.removeTrack(t);
            });
        });
    };
    var ee = function ee(e) {
        e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
    };
    var et = function et(e) {
        if (!("object" == typeof e && e.RTCPeerConnection)) return;
        var t = e.RTCPeerConnection.prototype.addTransceiver;
        t && (e.RTCPeerConnection.prototype.addTransceiver = function() {
            this.setParametersPromises = [];
            var _$e = arguments[1] && arguments[1].sendEncodings;
            void 0 === _$e && (_$e = []);
            var n = (_$e = _to_consumable_array(_$e)).length > 0;
            n && _$e.forEach(function(e) {
                if ("rid" in e && !/^[a-z0-9]{0,16}$/i.test(e.rid)) throw TypeError("Invalid RID value provided.");
                if ("scaleResolutionDownBy" in e && !(parseFloat(e.scaleResolutionDownBy) >= 1)) throw RangeError("scale_resolution_down_by must be >= 1.0");
                if ("maxFramerate" in e && !(parseFloat(e.maxFramerate) >= 0)) throw RangeError("max_framerate must be >= 0.0");
            });
            var r = t.apply(this, arguments);
            if (n) {
                var t1 = r.sender, n1 = t1.getParameters();
                "encodings" in n1 && (1 !== n1.encodings.length || 0 !== Object.keys(n1.encodings[0]).length) || (n1.encodings = _$e, t1.sendEncodings = _$e, this.setParametersPromises.push(t1.setParameters(n1).then(function() {
                    delete t1.sendEncodings;
                }).catch(function() {
                    delete t1.sendEncodings;
                })));
            }
            return r;
        });
    };
    var en = function en(e) {
        if (!("object" == typeof e && e.RTCRtpSender)) return;
        var t = e.RTCRtpSender.prototype.getParameters;
        t && (e.RTCRtpSender.prototype.getParameters = function() {
            var _$e = t.apply(this, arguments);
            return "encodings" in _$e || (_$e.encodings = [].concat(this.sendEncodings || [
                {}
            ])), _$e;
        });
    };
    var er = function er(e) {
        if (!("object" == typeof e && e.RTCPeerConnection)) return;
        var t = e.RTCPeerConnection.prototype.createOffer;
        e.RTCPeerConnection.prototype.createOffer = function() {
            var _this = this, _arguments = arguments;
            return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
                return t.apply(_this, _arguments);
            }).finally(function() {
                _this.setParametersPromises = [];
            }) : t.apply(this, arguments);
        };
    };
    var ei = function ei(e) {
        if (!("object" == typeof e && e.RTCPeerConnection)) return;
        var t = e.RTCPeerConnection.prototype.createAnswer;
        e.RTCPeerConnection.prototype.createAnswer = function() {
            var _this = this, _arguments = arguments;
            return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
                return t.apply(_this, _arguments);
            }).finally(function() {
                _this.setParametersPromises = [];
            }) : t.apply(this, arguments);
        };
    };
    var es = function es(e) {
        if ("object" == typeof e && e.RTCPeerConnection) {
            if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                return this._localStreams || (this._localStreams = []), this._localStreams;
            }), !("addStream" in e.RTCPeerConnection.prototype)) {
                var t = e.RTCPeerConnection.prototype.addTrack;
                e.RTCPeerConnection.prototype.addStream = function(e) {
                    var _this = this;
                    this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getAudioTracks().forEach(function(n) {
                        return t.call(_this, n, e);
                    }), e.getVideoTracks().forEach(function(n) {
                        return t.call(_this, n, e);
                    });
                }, e.RTCPeerConnection.prototype.addTrack = function(e) {
                    var _this = this;
                    for(var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                        n[_key - 1] = arguments[_key];
                    }
                    return n && n.forEach(function(e) {
                        _this._localStreams ? _this._localStreams.includes(e) || _this._localStreams.push(e) : _this._localStreams = [
                            e
                        ];
                    }), t.apply(this, arguments);
                };
            }
            "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                var _this = this;
                this._localStreams || (this._localStreams = []);
                var t = this._localStreams.indexOf(e);
                if (-1 === t) return;
                this._localStreams.splice(t, 1);
                var n = e.getTracks();
                this.getSenders().forEach(function(e) {
                    n.includes(e.track) && _this.removeTrack(e);
                });
            });
        }
    };
    var ea = function ea(e) {
        if ("object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
            return this._remoteStreams ? this._remoteStreams : [];
        }), !("onaddstream" in e.RTCPeerConnection.prototype))) {
            Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
                get: function() {
                    return this._onaddstream;
                },
                set: function(e) {
                    var _this = this;
                    this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = function(e) {
                        e.streams.forEach(function(e) {
                            if (_this._remoteStreams || (_this._remoteStreams = []), _this._remoteStreams.includes(e)) return;
                            _this._remoteStreams.push(e);
                            var t = new Event("addstream");
                            t.stream = e, _this.dispatchEvent(t);
                        });
                    });
                }
            });
            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                var _$e = this;
                return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t) {
                    t.streams.forEach(function(t) {
                        if (_$e._remoteStreams || (_$e._remoteStreams = []), _$e._remoteStreams.indexOf(t) >= 0) return;
                        _$e._remoteStreams.push(t);
                        var n = new Event("addstream");
                        n.stream = t, _$e.dispatchEvent(n);
                    });
                }), t.apply(_$e, arguments);
            };
        }
    };
    var ec = function ec(e) {
        if ("object" != typeof e || !e.RTCPeerConnection) return;
        var t = e.RTCPeerConnection.prototype, n = t.createOffer, r = t.createAnswer, i = t.setLocalDescription, o = t.setRemoteDescription, s = t.addIceCandidate;
        t.createOffer = function(e, t) {
            var r = arguments.length >= 2 ? arguments[2] : arguments[0], i = n.apply(this, [
                r
            ]);
            return t ? (i.then(e, t), Promise.resolve()) : i;
        }, t.createAnswer = function(e, t) {
            var n = arguments.length >= 2 ? arguments[2] : arguments[0], i = r.apply(this, [
                n
            ]);
            return t ? (i.then(e, t), Promise.resolve()) : i;
        };
        var a = function a(e, t, n) {
            var r = i.apply(this, [
                e
            ]);
            return n ? (r.then(t, n), Promise.resolve()) : r;
        };
        t.setLocalDescription = a, a = function a(e, t, n) {
            var r = o.apply(this, [
                e
            ]);
            return n ? (r.then(t, n), Promise.resolve()) : r;
        }, t.setRemoteDescription = a, a = function a(e, t, n) {
            var r = s.apply(this, [
                e
            ]);
            return n ? (r.then(t, n), Promise.resolve()) : r;
        }, t.addIceCandidate = a;
    };
    var el = function el(e) {
        var t = e && e.navigator;
        if (t.mediaDevices && t.mediaDevices.getUserMedia) {
            var _$e = t.mediaDevices, n = _$e.getUserMedia.bind(_$e);
            t.mediaDevices.getUserMedia = function(e) {
                return n(ep(e));
            };
        }
        !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = (function(e, n, r) {
            t.mediaDevices.getUserMedia(e).then(n, r);
        }).bind(t));
    };
    var ep = function ep(e) {
        return e && void 0 !== e.video ? Object.assign({}, e, {
            video: function e(t) {
                return g(t) ? Object.keys(t).reduce(function(n, r) {
                    var i = g(t[r]), o = i ? e(t[r]) : t[r], s = i && !Object.keys(o).length;
                    return void 0 === o || s ? n : Object.assign(n, _define_property({}, r, o));
                }, {}) : t;
            }(e.video)
        }) : e;
    };
    var ed = function ed(e) {
        if (!e.RTCPeerConnection) return;
        var t = e.RTCPeerConnection;
        e.RTCPeerConnection = function(e, n) {
            if (e && e.iceServers) {
                var t1 = [];
                for(var _$n = 0; _$n < e.iceServers.length; _$n++){
                    var r = e.iceServers[_$n];
                    void 0 === r.urls && r.url ? (m("RTCIceServer.url", "RTCIceServer.urls"), (r = JSON.parse(JSON.stringify(r))).urls = r.url, delete r.url, t1.push(r)) : t1.push(e.iceServers[_$n]);
                }
                e.iceServers = t1;
            }
            return new t(e, n);
        }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in t && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
            get: function() {
                return t.generateCertificate;
            }
        });
    };
    var eh = function eh(e) {
        "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
            get: function() {
                return {
                    receiver: this.receiver
                };
            }
        });
    };
    var eu = function eu(e) {
        var t = e.RTCPeerConnection.prototype.createOffer;
        e.RTCPeerConnection.prototype.createOffer = function(e) {
            if (e) {
                void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                var t1 = this.getTransceivers().find(function(e) {
                    return "audio" === e.receiver.track.kind;
                });
                !1 === e.offerToReceiveAudio && t1 ? "sendrecv" === t1.direction ? t1.setDirection ? t1.setDirection("sendonly") : t1.direction = "sendonly" : "recvonly" === t1.direction && (t1.setDirection ? t1.setDirection("inactive") : t1.direction = "inactive") : !0 !== e.offerToReceiveAudio || t1 || this.addTransceiver("audio", {
                    direction: "recvonly"
                }), void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                var n = this.getTransceivers().find(function(e) {
                    return "video" === e.receiver.track.kind;
                });
                !1 === e.offerToReceiveVideo && n ? "sendrecv" === n.direction ? n.setDirection ? n.setDirection("sendonly") : n.direction = "sendonly" : "recvonly" === n.direction && (n.setDirection ? n.setDirection("inactive") : n.direction = "inactive") : !0 !== e.offerToReceiveVideo || n || this.addTransceiver("video", {
                    direction: "recvonly"
                });
            }
            return t.apply(this, arguments);
        };
    };
    var ef = function ef(e) {
        "object" != typeof e || e.AudioContext || (e.AudioContext = e.webkitAudioContext);
    };
    var e_ = function e_(e) {
        if (!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype) return;
        var n = e.RTCIceCandidate;
        e.RTCIceCandidate = function(e) {
            if ("object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substring(2)), e.candidate && e.candidate.length) {
                var r = new n(e), i = t(eg).parseCandidate(e.candidate);
                for(var _$e in i)_$e in r || Object.defineProperty(r, _$e, {
                    value: i[_$e]
                });
                return r.toJSON = function() {
                    return {
                        candidate: r.candidate,
                        sdpMid: r.sdpMid,
                        sdpMLineIndex: r.sdpMLineIndex,
                        usernameFragment: r.usernameFragment
                    };
                }, r;
            }
            return new n(e);
        }, e.RTCIceCandidate.prototype = n.prototype, d(e, "icecandidate", function(t) {
            return t.candidate && Object.defineProperty(t, "candidate", {
                value: new e.RTCIceCandidate(t.candidate),
                writable: "false"
            }), t;
        });
    };
    var eC = function eC(e) {
        !e.RTCIceCandidate || e.RTCIceCandidate && "relayProtocol" in e.RTCIceCandidate.prototype || d(e, "icecandidate", function(e) {
            if (e.candidate) {
                var n = t(eg).parseCandidate(e.candidate.candidate);
                "relay" === n.type && (e.candidate.relayProtocol = ({
                    0: "tls",
                    1: "tcp",
                    2: "udp"
                })[n.priority >> 24]);
            }
            return e;
        });
    };
    var ev = function ev(e, n) {
        if (!e.RTCPeerConnection) return;
        "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
            get: function() {
                return void 0 === this._sctp ? null : this._sctp;
            }
        });
        var r = function r(e) {
            if (!e || !e.sdp) return !1;
            var n = t(eg).splitSections(e.sdp);
            return n.shift(), n.some(function(e) {
                var n = t(eg).parseMLine(e);
                return n && "application" === n.kind && -1 !== n.protocol.indexOf("SCTP");
            });
        }, i = function i(e) {
            var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
            if (null === t || t.length < 2) return -1;
            var n = parseInt(t[1], 10);
            return n != n ? -1 : n;
        }, o = function o(e) {
            var t = 65536;
            return "firefox" === n.browser && (t = n.version < 57 ? -1 === e ? 16384 : 2147483637 : n.version < 60 ? 57 === n.version ? 65535 : 65536 : 2147483637), t;
        }, s = function s(e, r) {
            var i = 65536;
            "firefox" === n.browser && 57 === n.version && (i = 65535);
            var o = t(eg).matchPrefix(e.sdp, "a=max-message-size:");
            return o.length > 0 ? i = parseInt(o[0].substring(19), 10) : "firefox" === n.browser && -1 !== r && (i = 2147483637), i;
        }, a = e.RTCPeerConnection.prototype.setRemoteDescription;
        e.RTCPeerConnection.prototype.setRemoteDescription = function() {
            if (this._sctp = null, "chrome" === n.browser && n.version >= 76) {
                var _this_getConfiguration = this.getConfiguration(), _$e = _this_getConfiguration.sdpSemantics;
                "plan-b" === _$e && Object.defineProperty(this, "sctp", {
                    get: function() {
                        return void 0 === this._sctp ? null : this._sctp;
                    },
                    enumerable: !0,
                    configurable: !0
                });
            }
            if (r(arguments[0])) {
                var _$e1;
                var t = i(arguments[0]), _$n = o(t), r1 = s(arguments[0], t);
                _$e1 = 0 === _$n && 0 === r1 ? Number.POSITIVE_INFINITY : 0 === _$n || 0 === r1 ? Math.max(_$n, r1) : Math.min(_$n, r1);
                var a1 = {};
                Object.defineProperty(a1, "maxMessageSize", {
                    get: function() {
                        return _$e1;
                    }
                }), this._sctp = a1;
            }
            return a.apply(this, arguments);
        };
    };
    var eb = function eb(e) {
        if (!(e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype)) return;
        function t(e, t) {
            var n = e.send;
            e.send = function() {
                var r = arguments[0], i = r.length || r.size || r.byteLength;
                if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize) throw TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
                return n.apply(e, arguments);
            };
        }
        var n = e.RTCPeerConnection.prototype.createDataChannel;
        e.RTCPeerConnection.prototype.createDataChannel = function() {
            var _$e = n.apply(this, arguments);
            return t(_$e, this), _$e;
        }, d(e, "datachannel", function(e) {
            return t(e.channel, e.target), e;
        });
    };
    var ek = function ek(e) {
        if (!e.RTCPeerConnection || "connectionState" in e.RTCPeerConnection.prototype) return;
        var t = e.RTCPeerConnection.prototype;
        Object.defineProperty(t, "connectionState", {
            get: function() {
                return ({
                    completed: "connected",
                    checking: "connecting"
                })[this.iceConnectionState] || this.iceConnectionState;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "onconnectionstatechange", {
            get: function() {
                return this._onconnectionstatechange || null;
            },
            set: function(e) {
                this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e);
            },
            enumerable: !0,
            configurable: !0
        }), [
            "setLocalDescription",
            "setRemoteDescription"
        ].forEach(function(e) {
            var n = t[e];
            t[e] = function() {
                return this._connectionstatechangepoly || (this._connectionstatechangepoly = function(e) {
                    var t = e.target;
                    if (t._lastConnectionState !== t.connectionState) {
                        t._lastConnectionState = t.connectionState;
                        var n = new Event("connectionstatechange", e);
                        t.dispatchEvent(n);
                    }
                    return e;
                }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments);
            };
        });
    };
    var eS = function eS(e, t) {
        if (!e.RTCPeerConnection || "chrome" === t.browser && t.version >= 71 || "safari" === t.browser && t.version >= 605) return;
        var n = e.RTCPeerConnection.prototype.setRemoteDescription;
        e.RTCPeerConnection.prototype.setRemoteDescription = function(t) {
            if (t && t.sdp && -1 !== t.sdp.indexOf("\na=extmap-allow-mixed")) {
                var n1 = t.sdp.split("\n").filter(function(e) {
                    return "a=extmap-allow-mixed" !== e.trim();
                }).join("\n");
                e.RTCSessionDescription && t instanceof e.RTCSessionDescription ? arguments[0] = new e.RTCSessionDescription({
                    type: t.type,
                    sdp: n1
                }) : t.sdp = n1;
            }
            return n.apply(this, arguments);
        };
    };
    var eT = function eT(e, t) {
        if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype)) return;
        var n = e.RTCPeerConnection.prototype.addIceCandidate;
        n && 0 !== n.length && (e.RTCPeerConnection.prototype.addIceCandidate = function() {
            return arguments[0] ? ("chrome" === t.browser && t.version < 78 || "firefox" === t.browser && t.version < 68 || "safari" === t.browser) && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
        });
    };
    var eR = function eR(e, t) {
        if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype)) return;
        var n = e.RTCPeerConnection.prototype.setLocalDescription;
        n && 0 !== n.length && (e.RTCPeerConnection.prototype.setLocalDescription = function() {
            var _this = this;
            var _$e = arguments[0] || {};
            if ("object" != typeof _$e || _$e.type && _$e.sdp) return n.apply(this, arguments);
            if (!(_$e = {
                type: _$e.type,
                sdp: _$e.sdp
            }).type) switch(this.signalingState){
                case "stable":
                case "have-local-offer":
                case "have-remote-pranswer":
                    _$e.type = "offer";
                    break;
                default:
                    _$e.type = "answer";
            }
            return _$e.sdp || "offer" !== _$e.type && "answer" !== _$e.type ? n.apply(this, [
                _$e
            ]) : ("offer" === _$e.type ? this.createOffer : this.createAnswer).apply(this).then(function(e) {
                return n.apply(_this, [
                    e
                ]);
            });
        });
    };
    var eB = function eB() {};
    var eF = function eF(e, t, n) {
        this.fn = e, this.context = t, this.once = n || !1;
    };
    var eU = function eU(e, t, n, r, i) {
        if ("function" != typeof n) throw TypeError("The listener must be a function");
        var o = new eF(n, r || e, i), s = eA ? eA + t : t;
        return e._events[s] ? e._events[s].fn ? e._events[s] = [
            e._events[s],
            o
        ] : e._events[s].push(o) : (e._events[s] = o, e._eventsCount++), e;
    };
    var ez = function ez(e, t) {
        0 == --e._eventsCount ? e._events = new eB : delete e._events[t];
    };
    var eN = function eN() {
        this._events = new eB, this._eventsCount = 0;
    };
    var n = function n() {
        "use strict";
        var _this = this;
        _class_call_check(this, n);
        this.chunkedMTU = 16300, this._dataCount = 1, this.chunk = function(e) {
            var t = [], _$n = e.byteLength, r = Math.ceil(_$n / _this.chunkedMTU), i = 0, o = 0;
            for(; o < _$n;){
                var s = Math.min(_$n, o + _this.chunkedMTU), a = e.slice(o, s), c = {
                    __peerData: _this._dataCount,
                    n: i,
                    data: a,
                    total: r
                };
                t.push(c), o = s, i++;
            }
            return _this._dataCount++, t;
        };
    };
    var r = /*#__PURE__*/ function() {
        "use strict";
        function r() {
            _class_call_check(this, r);
            this.encoder = new TextEncoder, this._pieces = [], this._parts = [];
        }
        _create_class(r, [
            {
                key: "append_buffer",
                value: function append_buffer(e) {
                    this.flush(), this._parts.push(e);
                }
            },
            {
                key: "append",
                value: function append(e) {
                    this._pieces.push(e);
                }
            },
            {
                key: "flush",
                value: function flush() {
                    if (this._pieces.length > 0) {
                        var e = new Uint8Array(this._pieces);
                        this._parts.push(e), this._pieces = [];
                    }
                }
            },
            {
                key: "toArrayBuffer",
                value: function toArrayBuffer() {
                    var e = [];
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var t = _step.value;
                            e.push(t);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    return function(e) {
                        var t = 0;
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            for(var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                var n = _step.value;
                                t += n.byteLength;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        var n1 = new Uint8Array(t), _$r = 0;
                        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                        try {
                            for(var _iterator1 = e[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                var t1 = _step1.value;
                                var _$e = new Uint8Array(t1.buffer, t1.byteOffset, t1.byteLength);
                                n1.set(_$e, _$r), _$r += t1.byteLength;
                            }
                        } catch (err) {
                            _didIteratorError1 = true;
                            _iteratorError1 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                    _iterator1.return();
                                }
                            } finally{
                                if (_didIteratorError1) {
                                    throw _iteratorError1;
                                }
                            }
                        }
                        return n1;
                    }(e).buffer;
                }
            }
        ]);
        return r;
    }();
    var s = /*#__PURE__*/ function() {
        "use strict";
        function s(e) {
            _class_call_check(this, s);
            this.index = 0, this.dataBuffer = e, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength;
        }
        _create_class(s, [
            {
                key: "unpack",
                value: function unpack() {
                    var e;
                    var t = this.unpack_uint8();
                    if (t < 128) return t;
                    if ((224 ^ t) < 32) return (224 ^ t) - 32;
                    if ((e = 160 ^ t) <= 15) return this.unpack_raw(e);
                    if ((e = 176 ^ t) <= 15) return this.unpack_string(e);
                    if ((e = 144 ^ t) <= 15) return this.unpack_array(e);
                    if ((e = 128 ^ t) <= 15) return this.unpack_map(e);
                    switch(t){
                        case 192:
                            return null;
                        case 193:
                        case 212:
                        case 213:
                        case 214:
                        case 215:
                            return;
                        case 194:
                            return !1;
                        case 195:
                            return !0;
                        case 202:
                            return this.unpack_float();
                        case 203:
                            return this.unpack_double();
                        case 204:
                            return this.unpack_uint8();
                        case 205:
                            return this.unpack_uint16();
                        case 206:
                            return this.unpack_uint32();
                        case 207:
                            return this.unpack_uint64();
                        case 208:
                            return this.unpack_int8();
                        case 209:
                            return this.unpack_int16();
                        case 210:
                            return this.unpack_int32();
                        case 211:
                            return this.unpack_int64();
                        case 216:
                            return e = this.unpack_uint16(), this.unpack_string(e);
                        case 217:
                            return e = this.unpack_uint32(), this.unpack_string(e);
                        case 218:
                            return e = this.unpack_uint16(), this.unpack_raw(e);
                        case 219:
                            return e = this.unpack_uint32(), this.unpack_raw(e);
                        case 220:
                            return e = this.unpack_uint16(), this.unpack_array(e);
                        case 221:
                            return e = this.unpack_uint32(), this.unpack_array(e);
                        case 222:
                            return e = this.unpack_uint16(), this.unpack_map(e);
                        case 223:
                            return e = this.unpack_uint32(), this.unpack_map(e);
                    }
                }
            },
            {
                key: "unpack_uint8",
                value: function unpack_uint8() {
                    var e = 255 & this.dataView[this.index];
                    return this.index++, e;
                }
            },
            {
                key: "unpack_uint16",
                value: function unpack_uint16() {
                    var e = this.read(2), t = (255 & e[0]) * 256 + (255 & e[1]);
                    return this.index += 2, t;
                }
            },
            {
                key: "unpack_uint32",
                value: function unpack_uint32() {
                    var e = this.read(4), t = ((256 * e[0] + e[1]) * 256 + e[2]) * 256 + e[3];
                    return this.index += 4, t;
                }
            },
            {
                key: "unpack_uint64",
                value: function unpack_uint64() {
                    var e = this.read(8), t = ((((((256 * e[0] + e[1]) * 256 + e[2]) * 256 + e[3]) * 256 + e[4]) * 256 + e[5]) * 256 + e[6]) * 256 + e[7];
                    return this.index += 8, t;
                }
            },
            {
                key: "unpack_int8",
                value: function unpack_int8() {
                    var e = this.unpack_uint8();
                    return e < 128 ? e : e - 256;
                }
            },
            {
                key: "unpack_int16",
                value: function unpack_int16() {
                    var e = this.unpack_uint16();
                    return e < 32768 ? e : e - 65536;
                }
            },
            {
                key: "unpack_int32",
                value: function unpack_int32() {
                    var e = this.unpack_uint32();
                    return e < 2147483648 ? e : e - 4294967296;
                }
            },
            {
                key: "unpack_int64",
                value: function unpack_int64() {
                    var e = this.unpack_uint64();
                    return e < 0x7fffffffffffffff ? e : e - 18446744073709552e3;
                }
            },
            {
                key: "unpack_raw",
                value: function unpack_raw(e) {
                    if (this.length < this.index + e) throw Error("BinaryPackFailure: index is out of range ".concat(this.index, " ").concat(e, " ").concat(this.length));
                    var t = this.dataBuffer.slice(this.index, this.index + e);
                    return this.index += e, t;
                }
            },
            {
                key: "unpack_string",
                value: function unpack_string(e) {
                    var t, n;
                    var r = this.read(e), i = 0, o = "";
                    for(; i < e;)(t = r[i]) < 160 ? (n = t, i++) : (192 ^ t) < 32 ? (n = (31 & t) << 6 | 63 & r[i + 1], i += 2) : (224 ^ t) < 16 ? (n = (15 & t) << 12 | (63 & r[i + 1]) << 6 | 63 & r[i + 2], i += 3) : (n = (7 & t) << 18 | (63 & r[i + 1]) << 12 | (63 & r[i + 2]) << 6 | 63 & r[i + 3], i += 4), o += String.fromCodePoint(n);
                    return this.index += e, o;
                }
            },
            {
                key: "unpack_array",
                value: function unpack_array(e) {
                    var t = Array(e);
                    for(var n = 0; n < e; n++)t[n] = this.unpack();
                    return t;
                }
            },
            {
                key: "unpack_map",
                value: function unpack_map(e) {
                    var t = {};
                    for(var n = 0; n < e; n++)t[this.unpack()] = this.unpack();
                    return t;
                }
            },
            {
                key: "unpack_float",
                value: function unpack_float() {
                    var e = this.unpack_uint32();
                    return (0 == e >> 31 ? 1 : -1) * (8388607 & e | 8388608) * Math.pow(2, (e >> 23 & 255) - 127 - 23);
                }
            },
            {
                key: "unpack_double",
                value: function unpack_double() {
                    var e = this.unpack_uint32(), t = this.unpack_uint32(), n = (e >> 20 & 2047) - 1023;
                    return (0 == e >> 31 ? 1 : -1) * ((1048575 & e | 1048576) * Math.pow(2, n - 20) + t * Math.pow(2, n - 52));
                }
            },
            {
                key: "read",
                value: function read(e) {
                    var t = this.index;
                    if (t + e <= this.length) return this.dataView.subarray(t, t + e);
                    throw Error("BinaryPackFailure: read index out of range");
                }
            }
        ]);
        return s;
    }();
    var a = /*#__PURE__*/ function() {
        "use strict";
        function a() {
            _class_call_check(this, a);
            this._bufferBuilder = new r, this._textEncoder = new TextEncoder;
        }
        _create_class(a, [
            {
                key: "getBuffer",
                value: function getBuffer() {
                    return this._bufferBuilder.toArrayBuffer();
                }
            },
            {
                key: "pack",
                value: function pack(e) {
                    var _this = this;
                    if ("string" == typeof e) this.pack_string(e);
                    else if ("number" == typeof e) Math.floor(e) === e ? this.pack_integer(e) : this.pack_double(e);
                    else if ("boolean" == typeof e) !0 === e ? this._bufferBuilder.append(195) : !1 === e && this._bufferBuilder.append(194);
                    else if (void 0 === e) this._bufferBuilder.append(192);
                    else if ("object" == typeof e) {
                        if (null === e) this._bufferBuilder.append(192);
                        else {
                            var t = e.constructor;
                            if (e instanceof Array) {
                                var t1 = this.pack_array(e);
                                if (t1 instanceof Promise) return t1.then(function() {
                                    return _this._bufferBuilder.flush();
                                });
                            } else if (e instanceof ArrayBuffer) this.pack_bin(new Uint8Array(e));
                            else if ("BYTES_PER_ELEMENT" in e) this.pack_bin(new Uint8Array(e.buffer, e.byteOffset, e.byteLength));
                            else if (e instanceof Date) this.pack_string(e.toString());
                            else if (e instanceof Blob) return e.arrayBuffer().then(function(e) {
                                _this.pack_bin(new Uint8Array(e)), _this._bufferBuilder.flush();
                            });
                            else if (t == Object || t.toString().startsWith("class")) {
                                var t2 = this.pack_object(e);
                                if (t2 instanceof Promise) return t2.then(function() {
                                    return _this._bufferBuilder.flush();
                                });
                            } else throw Error('Type "'.concat(t.toString(), '" not yet supported'));
                        }
                    } else throw Error('Type "'.concat(typeof e === "undefined" ? "undefined" : _type_of(e), '" not yet supported'));
                    this._bufferBuilder.flush();
                }
            },
            {
                key: "pack_bin",
                value: function pack_bin(e) {
                    var t = e.length;
                    if (t <= 15) this.pack_uint8(160 + t);
                    else if (t <= 65535) this._bufferBuilder.append(218), this.pack_uint16(t);
                    else if (t <= 4294967295) this._bufferBuilder.append(219), this.pack_uint32(t);
                    else throw Error("Invalid length");
                    this._bufferBuilder.append_buffer(e);
                }
            },
            {
                key: "pack_string",
                value: function pack_string(e) {
                    var t = this._textEncoder.encode(e), n = t.length;
                    if (n <= 15) this.pack_uint8(176 + n);
                    else if (n <= 65535) this._bufferBuilder.append(216), this.pack_uint16(n);
                    else if (n <= 4294967295) this._bufferBuilder.append(217), this.pack_uint32(n);
                    else throw Error("Invalid length");
                    this._bufferBuilder.append_buffer(t);
                }
            },
            {
                key: "pack_array",
                value: function pack_array(e) {
                    var _this = this;
                    var t = e.length;
                    if (t <= 15) this.pack_uint8(144 + t);
                    else if (t <= 65535) this._bufferBuilder.append(220), this.pack_uint16(t);
                    else if (t <= 4294967295) this._bufferBuilder.append(221), this.pack_uint32(t);
                    else throw Error("Invalid length");
                    var n = function(r) {
                        if (r < t) {
                            var t1 = _this.pack(e[r]);
                            return t1 instanceof Promise ? t1.then(function() {
                                return n(r + 1);
                            }) : n(r + 1);
                        }
                    };
                    return n(0);
                }
            },
            {
                key: "pack_integer",
                value: function pack_integer(e) {
                    if (e >= -32 && e <= 127) this._bufferBuilder.append(255 & e);
                    else if (e >= 0 && e <= 255) this._bufferBuilder.append(204), this.pack_uint8(e);
                    else if (e >= -128 && e <= 127) this._bufferBuilder.append(208), this.pack_int8(e);
                    else if (e >= 0 && e <= 65535) this._bufferBuilder.append(205), this.pack_uint16(e);
                    else if (e >= -32768 && e <= 32767) this._bufferBuilder.append(209), this.pack_int16(e);
                    else if (e >= 0 && e <= 4294967295) this._bufferBuilder.append(206), this.pack_uint32(e);
                    else if (e >= -2147483648 && e <= 2147483647) this._bufferBuilder.append(210), this.pack_int32(e);
                    else if (e >= -9223372036854776000 && e <= 0x7fffffffffffffff) this._bufferBuilder.append(211), this.pack_int64(e);
                    else if (e >= 0 && e <= 18446744073709552e3) this._bufferBuilder.append(207), this.pack_uint64(e);
                    else throw Error("Invalid integer");
                }
            },
            {
                key: "pack_double",
                value: function pack_double(e) {
                    var t = 0;
                    e < 0 && (t = 1, e = -e);
                    var n = Math.floor(Math.log(e) / Math.LN2), r = Math.floor((e / Math.pow(2, n) - 1) * 4503599627370496), i = t << 31 | n + 1023 << 20 | r / 4294967296 & 1048575;
                    this._bufferBuilder.append(203), this.pack_int32(i), this.pack_int32(r % 4294967296);
                }
            },
            {
                key: "pack_object",
                value: function pack_object(e) {
                    var _this = this;
                    var t = Object.keys(e), n = t.length;
                    if (n <= 15) this.pack_uint8(128 + n);
                    else if (n <= 65535) this._bufferBuilder.append(222), this.pack_uint16(n);
                    else if (n <= 4294967295) this._bufferBuilder.append(223), this.pack_uint32(n);
                    else throw Error("Invalid length");
                    var r = function(n) {
                        if (n < t.length) {
                            var i = t[n];
                            if (e.hasOwnProperty(i)) {
                                _this.pack(i);
                                var t1 = _this.pack(e[i]);
                                if (t1 instanceof Promise) return t1.then(function() {
                                    return r(n + 1);
                                });
                            }
                            return r(n + 1);
                        }
                    };
                    return r(0);
                }
            },
            {
                key: "pack_uint8",
                value: function pack_uint8(e) {
                    this._bufferBuilder.append(e);
                }
            },
            {
                key: "pack_uint16",
                value: function pack_uint16(e) {
                    this._bufferBuilder.append(e >> 8), this._bufferBuilder.append(255 & e);
                }
            },
            {
                key: "pack_uint32",
                value: function pack_uint32(e) {
                    var t = 4294967295 & e;
                    this._bufferBuilder.append((4278190080 & t) >>> 24), this._bufferBuilder.append((16711680 & t) >>> 16), this._bufferBuilder.append((65280 & t) >>> 8), this._bufferBuilder.append(255 & t);
                }
            },
            {
                key: "pack_uint64",
                value: function pack_uint64(e) {
                    var t = e / 4294967296, n = e % 4294967296;
                    this._bufferBuilder.append((4278190080 & t) >>> 24), this._bufferBuilder.append((16711680 & t) >>> 16), this._bufferBuilder.append((65280 & t) >>> 8), this._bufferBuilder.append(255 & t), this._bufferBuilder.append((4278190080 & n) >>> 24), this._bufferBuilder.append((16711680 & n) >>> 16), this._bufferBuilder.append((65280 & n) >>> 8), this._bufferBuilder.append(255 & n);
                }
            },
            {
                key: "pack_int8",
                value: function pack_int8(e) {
                    this._bufferBuilder.append(255 & e);
                }
            },
            {
                key: "pack_int16",
                value: function pack_int16(e) {
                    this._bufferBuilder.append((65280 & e) >> 8), this._bufferBuilder.append(255 & e);
                }
            },
            {
                key: "pack_int32",
                value: function pack_int32(e) {
                    this._bufferBuilder.append(e >>> 24 & 255), this._bufferBuilder.append((16711680 & e) >>> 16), this._bufferBuilder.append((65280 & e) >>> 8), this._bufferBuilder.append(255 & e);
                }
            },
            {
                key: "pack_int64",
                value: function pack_int64(e) {
                    var t = Math.floor(e / 4294967296), n = e % 4294967296;
                    this._bufferBuilder.append((4278190080 & t) >>> 24), this._bufferBuilder.append((16711680 & t) >>> 16), this._bufferBuilder.append((65280 & t) >>> 8), this._bufferBuilder.append(255 & t), this._bufferBuilder.append((4278190080 & n) >>> 24), this._bufferBuilder.append((16711680 & n) >>> 16), this._bufferBuilder.append((65280 & n) >>> 8), this._bufferBuilder.append(255 & n);
                }
            }
        ]);
        return a;
    }();
    var c = !0, l = !0;
    var _, C, v, b, k, S, T, R, w, P, E, D, x, I, M, O, j = {};
    e(j, "shimMediaStream", function() {
        return B;
    }), e(j, "shimOnTrack", function() {
        return F;
    }), e(j, "shimGetSendersWithDtmf", function() {
        return U;
    }), e(j, "shimGetStats", function() {
        return z;
    }), e(j, "shimSenderReceiverGetStats", function() {
        return N;
    }), e(j, "shimAddTrackRemoveTrackWithNative", function() {
        return $;
    }), e(j, "shimAddTrackRemoveTrack", function() {
        return J;
    }), e(j, "shimPeerConnection", function() {
        return V;
    }), e(j, "fixNegotiationNeeded", function() {
        return G;
    }), e(j, "shimGetUserMedia", function() {
        return L;
    }), e(j, "shimGetDisplayMedia", function() {
        return A;
    });
    var W = {};
    e(W, "shimOnTrack", function() {
        return K;
    }), e(W, "shimPeerConnection", function() {
        return X;
    }), e(W, "shimSenderGetStats", function() {
        return q;
    }), e(W, "shimReceiverGetStats", function() {
        return Q;
    }), e(W, "shimRemoveStream", function() {
        return Z;
    }), e(W, "shimRTCDataChannel", function() {
        return ee;
    }), e(W, "shimAddTransceiver", function() {
        return et;
    }), e(W, "shimGetParameters", function() {
        return en;
    }), e(W, "shimCreateOffer", function() {
        return er;
    }), e(W, "shimCreateAnswer", function() {
        return ei;
    }), e(W, "shimGetUserMedia", function() {
        return H;
    }), e(W, "shimGetDisplayMedia", function() {
        return Y;
    });
    var eo = {};
    e(eo, "shimLocalStreamsAPI", function() {
        return es;
    }), e(eo, "shimRemoteStreamsAPI", function() {
        return ea;
    }), e(eo, "shimCallbacksAPI", function() {
        return ec;
    }), e(eo, "shimGetUserMedia", function() {
        return el;
    }), e(eo, "shimConstraints", function() {
        return ep;
    }), e(eo, "shimRTCIceServerUrls", function() {
        return ed;
    }), e(eo, "shimTrackEventTransceiver", function() {
        return eh;
    }), e(eo, "shimCreateOfferLegacy", function() {
        return eu;
    }), e(eo, "shimAudioContext", function() {
        return ef;
    });
    var em = {};
    e(em, "shimRTCIceCandidate", function() {
        return e_;
    }), e(em, "shimRTCIceCandidateRelayProtocol", function() {
        return eC;
    }), e(em, "shimMaxMessageSize", function() {
        return ev;
    }), e(em, "shimSendThrowTypeError", function() {
        return eb;
    }), e(em, "shimConnectionState", function() {
        return ek;
    }), e(em, "removeExtmapAllowMixed", function() {
        return eS;
    }), e(em, "shimAddIceCandidateNullOrEmpty", function() {
        return eT;
    }), e(em, "shimParameterlessSetLocalDescription", function() {
        return eR;
    });
    var eg = {};
    var ey = {};
    ey.generateIdentifier = function() {
        return Math.random().toString(36).substring(2, 12);
    }, ey.localCName = ey.generateIdentifier(), ey.splitLines = function(e) {
        return e.trim().split("\n").map(function(e) {
            return e.trim();
        });
    }, ey.splitSections = function(e) {
        return e.split("\nm=").map(function(e, t) {
            return (t > 0 ? "m=" + e : e).trim() + "\r\n";
        });
    }, ey.getDescription = function(e) {
        var t = ey.splitSections(e);
        return t && t[0];
    }, ey.getMediaSections = function(e) {
        var t = ey.splitSections(e);
        return t.shift(), t;
    }, ey.matchPrefix = function(e, t) {
        return ey.splitLines(e).filter(function(e) {
            return 0 === e.indexOf(t);
        });
    }, ey.parseCandidate = function(e) {
        var t;
        var n = {
            foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
            component: {
                1: "rtp",
                2: "rtcp"
            }[t[1]] || t[1],
            protocol: t[2].toLowerCase(),
            priority: parseInt(t[3], 10),
            ip: t[4],
            address: t[4],
            port: parseInt(t[5], 10),
            type: t[7]
        };
        for(var _$e = 8; _$e < t.length; _$e += 2)switch(t[_$e]){
            case "raddr":
                n.relatedAddress = t[_$e + 1];
                break;
            case "rport":
                n.relatedPort = parseInt(t[_$e + 1], 10);
                break;
            case "tcptype":
                n.tcpType = t[_$e + 1];
                break;
            case "ufrag":
                n.ufrag = t[_$e + 1], n.usernameFragment = t[_$e + 1];
                break;
            default:
                void 0 === n[t[_$e]] && (n[t[_$e]] = t[_$e + 1]);
        }
        return n;
    }, ey.writeCandidate = function(e) {
        var t = [];
        t.push(e.foundation);
        var n = e.component;
        "rtp" === n ? t.push(1) : "rtcp" === n ? t.push(2) : t.push(n), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.address || e.ip), t.push(e.port);
        var r = e.type;
        return t.push("typ"), t.push(r), "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ");
    }, ey.parseIceOptions = function(e) {
        return e.substring(14).split(" ");
    }, ey.parseRtpMap = function(e) {
        var t = e.substring(9).split(" "), n = {
            payloadType: parseInt(t.shift(), 10)
        };
        return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.channels = 3 === t.length ? parseInt(t[2], 10) : 1, n.numChannels = n.channels, n;
    }, ey.writeRtpMap = function(e) {
        var t = e.payloadType;
        void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
        var n = e.channels || e.numChannels || 1;
        return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n : "") + "\r\n";
    }, ey.parseExtmap = function(e) {
        var t = e.substring(9).split(" ");
        return {
            id: parseInt(t[0], 10),
            direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
            uri: t[1],
            attributes: t.slice(2).join(" ")
        };
    }, ey.writeExtmap = function(e) {
        return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + (e.attributes ? " " + e.attributes : "") + "\r\n";
    }, ey.parseFmtp = function(e) {
        var t;
        var n = {}, r = e.substring(e.indexOf(" ") + 1).split(";");
        for(var _$e = 0; _$e < r.length; _$e++)n[(t = r[_$e].trim().split("="))[0].trim()] = t[1];
        return n;
    }, ey.writeFmtp = function(e) {
        var t = "", n = e.payloadType;
        if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
            var r = [];
            Object.keys(e.parameters).forEach(function(t) {
                void 0 !== e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t);
            }), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n";
        }
        return t;
    }, ey.parseRtcpFb = function(e) {
        var t = e.substring(e.indexOf(" ") + 1).split(" ");
        return {
            type: t.shift(),
            parameter: t.join(" ")
        };
    }, ey.writeRtcpFb = function(e) {
        var t = "", n = e.payloadType;
        return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
            t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n";
        }), t;
    }, ey.parseSsrcMedia = function(e) {
        var t = e.indexOf(" "), n = {
            ssrc: parseInt(e.substring(7, t), 10)
        }, r = e.indexOf(":", t);
        return r > -1 ? (n.attribute = e.substring(t + 1, r), n.value = e.substring(r + 1)) : n.attribute = e.substring(t + 1), n;
    }, ey.parseSsrcGroup = function(e) {
        var t = e.substring(13).split(" ");
        return {
            semantics: t.shift(),
            ssrcs: t.map(function(e) {
                return parseInt(e, 10);
            })
        };
    }, ey.getMid = function(e) {
        var t = ey.matchPrefix(e, "a=mid:")[0];
        if (t) return t.substring(6);
    }, ey.parseFingerprint = function(e) {
        var t = e.substring(14).split(" ");
        return {
            algorithm: t[0].toLowerCase(),
            value: t[1].toUpperCase()
        };
    }, ey.getDtlsParameters = function(e, t) {
        return {
            role: "auto",
            fingerprints: ey.matchPrefix(e + t, "a=fingerprint:").map(ey.parseFingerprint)
        };
    }, ey.writeDtlsParameters = function(e, t) {
        var n = "a=setup:" + t + "\r\n";
        return e.fingerprints.forEach(function(e) {
            n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n";
        }), n;
    }, ey.parseCryptoLine = function(e) {
        var t = e.substring(9).split(" ");
        return {
            tag: parseInt(t[0], 10),
            cryptoSuite: t[1],
            keyParams: t[2],
            sessionParams: t.slice(3)
        };
    }, ey.writeCryptoLine = function(e) {
        return "a=crypto:" + e.tag + " " + e.cryptoSuite + " " + ("object" == typeof e.keyParams ? ey.writeCryptoKeyParams(e.keyParams) : e.keyParams) + (e.sessionParams ? " " + e.sessionParams.join(" ") : "") + "\r\n";
    }, ey.parseCryptoKeyParams = function(e) {
        if (0 !== e.indexOf("inline:")) return null;
        var t = e.substring(7).split("|");
        return {
            keyMethod: "inline",
            keySalt: t[0],
            lifeTime: t[1],
            mkiValue: t[2] ? t[2].split(":")[0] : void 0,
            mkiLength: t[2] ? t[2].split(":")[1] : void 0
        };
    }, ey.writeCryptoKeyParams = function(e) {
        return e.keyMethod + ":" + e.keySalt + (e.lifeTime ? "|" + e.lifeTime : "") + (e.mkiValue && e.mkiLength ? "|" + e.mkiValue + ":" + e.mkiLength : "");
    }, ey.getCryptoParameters = function(e, t) {
        return ey.matchPrefix(e + t, "a=crypto:").map(ey.parseCryptoLine);
    }, ey.getIceParameters = function(e, t) {
        var n = ey.matchPrefix(e + t, "a=ice-ufrag:")[0], r = ey.matchPrefix(e + t, "a=ice-pwd:")[0];
        return n && r ? {
            usernameFragment: n.substring(12),
            password: r.substring(10)
        } : null;
    }, ey.writeIceParameters = function(e) {
        var t = "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n";
        return e.iceLite && (t += "a=ice-lite\r\n"), t;
    }, ey.parseRtpParameters = function(e) {
        var t = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
        }, n = ey.splitLines(e)[0].split(" ");
        t.profile = n[2];
        for(var r = 3; r < n.length; r++){
            var i = n[r], o = ey.matchPrefix(e, "a=rtpmap:" + i + " ")[0];
            if (o) {
                var n1 = ey.parseRtpMap(o), r1 = ey.matchPrefix(e, "a=fmtp:" + i + " ");
                switch(n1.parameters = r1.length ? ey.parseFmtp(r1[0]) : {}, n1.rtcpFeedback = ey.matchPrefix(e, "a=rtcp-fb:" + i + " ").map(ey.parseRtcpFb), t.codecs.push(n1), n1.name.toUpperCase()){
                    case "RED":
                    case "ULPFEC":
                        t.fecMechanisms.push(n1.name.toUpperCase());
                }
            }
        }
        ey.matchPrefix(e, "a=extmap:").forEach(function(e) {
            t.headerExtensions.push(ey.parseExtmap(e));
        });
        var r2 = ey.matchPrefix(e, "a=rtcp-fb:* ").map(ey.parseRtcpFb);
        return t.codecs.forEach(function(e) {
            r2.forEach(function(t) {
                e.rtcpFeedback.find(function(e) {
                    return e.type === t.type && e.parameter === t.parameter;
                }) || e.rtcpFeedback.push(t);
            });
        }), t;
    }, ey.writeRtpDescription = function(e, t) {
        var n = "";
        n += "m=" + e + " " + (t.codecs.length > 0 ? "9" : "0") + " " + (t.profile || "UDP/TLS/RTP/SAVPF") + " " + t.codecs.map(function(e) {
            return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType;
        }).join(" ") + "\r\nc=IN IP4 0.0.0.0\r\na=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
            n += ey.writeRtpMap(e) + ey.writeFmtp(e) + ey.writeRtcpFb(e);
        });
        var r = 0;
        return t.codecs.forEach(function(e) {
            e.maxptime > r && (r = e.maxptime);
        }), r > 0 && (n += "a=maxptime:" + r + "\r\n"), t.headerExtensions && t.headerExtensions.forEach(function(e) {
            n += ey.writeExtmap(e);
        }), n;
    }, ey.parseRtpEncodingParameters = function(e) {
        var t;
        var n = [], r = ey.parseRtpParameters(e), i = -1 !== r.fecMechanisms.indexOf("RED"), o = -1 !== r.fecMechanisms.indexOf("ULPFEC"), s = ey.matchPrefix(e, "a=ssrc:").map(function(e) {
            return ey.parseSsrcMedia(e);
        }).filter(function(e) {
            return "cname" === e.attribute;
        }), a = s.length > 0 && s[0].ssrc, c = ey.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
            return e.substring(17).split(" ").map(function(e) {
                return parseInt(e, 10);
            });
        });
        c.length > 0 && c[0].length > 1 && c[0][0] === a && (t = c[0][1]), r.codecs.forEach(function(e) {
            if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
                var r = {
                    ssrc: a,
                    codecPayloadType: parseInt(e.parameters.apt, 10)
                };
                a && t && (r.rtx = {
                    ssrc: t
                }), n.push(r), i && ((r = JSON.parse(JSON.stringify(r))).fec = {
                    ssrc: a,
                    mechanism: o ? "red+ulpfec" : "red"
                }, n.push(r));
            }
        }), 0 === n.length && a && n.push({
            ssrc: a
        });
        var l = ey.matchPrefix(e, "b=");
        return l.length && (l = 0 === l[0].indexOf("b=TIAS:") ? parseInt(l[0].substring(7), 10) : 0 === l[0].indexOf("b=AS:") ? 950 * parseInt(l[0].substring(5), 10) - 16e3 : void 0, n.forEach(function(e) {
            e.maxBitrate = l;
        })), n;
    }, ey.parseRtcpParameters = function(e) {
        var t = {}, n = ey.matchPrefix(e, "a=ssrc:").map(function(e) {
            return ey.parseSsrcMedia(e);
        }).filter(function(e) {
            return "cname" === e.attribute;
        })[0];
        n && (t.cname = n.value, t.ssrc = n.ssrc);
        var r = ey.matchPrefix(e, "a=rtcp-rsize");
        t.reducedSize = r.length > 0, t.compound = 0 === r.length;
        var i = ey.matchPrefix(e, "a=rtcp-mux");
        return t.mux = i.length > 0, t;
    }, ey.writeRtcpParameters = function(e) {
        var t = "";
        return e.reducedSize && (t += "a=rtcp-rsize\r\n"), e.mux && (t += "a=rtcp-mux\r\n"), void 0 !== e.ssrc && e.cname && (t += "a=ssrc:" + e.ssrc + " cname:" + e.cname + "\r\n"), t;
    }, ey.parseMsid = function(e) {
        var t;
        var n = ey.matchPrefix(e, "a=msid:");
        if (1 === n.length) return {
            stream: (t = n[0].substring(7).split(" "))[0],
            track: t[1]
        };
        var r = ey.matchPrefix(e, "a=ssrc:").map(function(e) {
            return ey.parseSsrcMedia(e);
        }).filter(function(e) {
            return "msid" === e.attribute;
        });
        if (r.length > 0) return {
            stream: (t = r[0].value.split(" "))[0],
            track: t[1]
        };
    }, ey.parseSctpDescription = function(e) {
        var t;
        var n = ey.parseMLine(e), r = ey.matchPrefix(e, "a=max-message-size:");
        r.length > 0 && (t = parseInt(r[0].substring(19), 10)), isNaN(t) && (t = 65536);
        var i = ey.matchPrefix(e, "a=sctp-port:");
        if (i.length > 0) return {
            port: parseInt(i[0].substring(12), 10),
            protocol: n.fmt,
            maxMessageSize: t
        };
        var o = ey.matchPrefix(e, "a=sctpmap:");
        if (o.length > 0) {
            var _$e = o[0].substring(10).split(" ");
            return {
                port: parseInt(_$e[0], 10),
                protocol: _$e[1],
                maxMessageSize: t
            };
        }
    }, ey.writeSctpDescription = function(e, t) {
        var n = [];
        return n = "DTLS/SCTP" !== e.protocol ? [
            "m=" + e.kind + " 9 " + e.protocol + " " + t.protocol + "\r\n",
            "c=IN IP4 0.0.0.0\r\n",
            "a=sctp-port:" + t.port + "\r\n"
        ] : [
            "m=" + e.kind + " 9 " + e.protocol + " " + t.port + "\r\n",
            "c=IN IP4 0.0.0.0\r\n",
            "a=sctpmap:" + t.port + " " + t.protocol + " 65535\r\n"
        ], void 0 !== t.maxMessageSize && n.push("a=max-message-size:" + t.maxMessageSize + "\r\n"), n.join("");
    }, ey.generateSessionId = function() {
        return Math.random().toString().substr(2, 22);
    }, ey.writeSessionBoilerplate = function(e, t, n) {
        return "v=0\r\no=" + (n || "thisisadapterortc") + " " + (e || ey.generateSessionId()) + " " + (void 0 !== t ? t : 2) + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
    }, ey.getDirection = function(e, t) {
        var n = ey.splitLines(e);
        for(var _$e = 0; _$e < n.length; _$e++)switch(n[_$e]){
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
                return n[_$e].substring(2);
        }
        return t ? ey.getDirection(t) : "sendrecv";
    }, ey.getKind = function(e) {
        return ey.splitLines(e)[0].split(" ")[0].substring(2);
    }, ey.isRejected = function(e) {
        return "0" === e.split(" ", 2)[1];
    }, ey.parseMLine = function(e) {
        var t = ey.splitLines(e)[0].substring(2).split(" ");
        return {
            kind: t[0],
            port: parseInt(t[1], 10),
            protocol: t[2],
            fmt: t.slice(3).join(" ")
        };
    }, ey.parseOLine = function(e) {
        var t = ey.matchPrefix(e, "o=")[0].substring(2).split(" ");
        return {
            username: t[0],
            sessionId: t[1],
            sessionVersion: parseInt(t[2], 10),
            netType: t[3],
            addressType: t[4],
            address: t[5]
        };
    }, ey.isValidSDP = function(e) {
        if ("string" != typeof e || 0 === e.length) return !1;
        var t = ey.splitLines(e);
        for(var _$e = 0; _$e < t.length; _$e++)if (t[_$e].length < 2 || "=" !== t[_$e].charAt(1)) return !1;
        return !0;
    }, eg = ey;
    var ew = function() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = _ref.window, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            shimChrome: !0,
            shimFirefox: !0,
            shimSafari: !0
        };
        var n = function(e) {
            var t = {
                browser: null,
                version: null
            };
            if (void 0 === e || !e.navigator || !e.navigator.userAgent) return t.browser = "Not a browser.", t;
            var n = e.navigator;
            return n.mozGetUserMedia ? (t.browser = "firefox", t.version = p(n.userAgent, /Firefox\/(\d+)\./, 1)) : n.webkitGetUserMedia || !1 === e.isSecureContext && e.webkitRTCPeerConnection ? (t.browser = "chrome", t.version = p(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)) : e.RTCPeerConnection && n.userAgent.match(/AppleWebKit\/(\d+)\./) ? (t.browser = "safari", t.version = p(n.userAgent, /AppleWebKit\/(\d+)\./, 1), t.supportsUnifiedPlan = e.RTCRtpTransceiver && "currentDirection" in e.RTCRtpTransceiver.prototype) : t.browser = "Not a supported browser.", t;
        }(e), r = {
            browserDetails: n,
            commonShim: em,
            extractVersion: p,
            disableLog: h,
            disableWarnings: u,
            sdp: eg
        };
        switch(n.browser){
            case "chrome":
                if (!j || !j.shimPeerConnection || !t.shimChrome) {
                    f("Chrome shim is not included in this adapter release.");
                    break;
                }
                if (null === n.version) {
                    f("Chrome shim can not determine version, not shimming.");
                    break;
                }
                f("adapter.js shimming chrome."), r.browserShim = j, eT(e, n), eR(e, n), j.shimGetUserMedia(e, n), j.shimMediaStream(e, n), j.shimPeerConnection(e, n), j.shimOnTrack(e, n), j.shimAddTrackRemoveTrack(e, n), j.shimGetSendersWithDtmf(e, n), j.shimGetStats(e, n), j.shimSenderReceiverGetStats(e, n), j.fixNegotiationNeeded(e, n), e_(e, n), eC(e, n), ek(e, n), ev(e, n), eb(e, n), eS(e, n);
                break;
            case "firefox":
                if (!W || !W.shimPeerConnection || !t.shimFirefox) {
                    f("Firefox shim is not included in this adapter release.");
                    break;
                }
                f("adapter.js shimming firefox."), r.browserShim = W, eT(e, n), eR(e, n), W.shimGetUserMedia(e, n), W.shimPeerConnection(e, n), W.shimOnTrack(e, n), W.shimRemoveStream(e, n), W.shimSenderGetStats(e, n), W.shimReceiverGetStats(e, n), W.shimRTCDataChannel(e, n), W.shimAddTransceiver(e, n), W.shimGetParameters(e, n), W.shimCreateOffer(e, n), W.shimCreateAnswer(e, n), e_(e, n), ek(e, n), ev(e, n), eb(e, n);
                break;
            case "safari":
                if (!eo || !t.shimSafari) {
                    f("Safari shim is not included in this adapter release.");
                    break;
                }
                f("adapter.js shimming safari."), r.browserShim = eo, eT(e, n), eR(e, n), eo.shimRTCIceServerUrls(e, n), eo.shimCreateOfferLegacy(e, n), eo.shimCallbacksAPI(e, n), eo.shimLocalStreamsAPI(e, n), eo.shimRemoteStreamsAPI(e, n), eo.shimTrackEventTransceiver(e, n), eo.shimGetUserMedia(e, n), eo.shimAudioContext(e, n), e_(e, n), eC(e, n), ev(e, n), eb(e, n), eS(e, n);
                break;
            default:
                f("Unsupported browser!");
        }
        return r;
    }({
        window: "undefined" == typeof window ? void 0 : window
    }), eP = ew.default || ew, eE = new /*#__PURE__*/ (function() {
        "use strict";
        function _class() {
            _class_call_check(this, _class);
            this.isIOS = [
                "iPad",
                "iPhone",
                "iPod"
            ].includes(navigator.platform), this.supportedBrowsers = [
                "firefox",
                "chrome",
                "safari"
            ], this.minFirefoxVersion = 59, this.minChromeVersion = 72, this.minSafariVersion = 605;
        }
        _create_class(_class, [
            {
                key: "isWebRTCSupported",
                value: function isWebRTCSupported() {
                    return "undefined" != typeof RTCPeerConnection;
                }
            },
            {
                key: "isBrowserSupported",
                value: function isBrowserSupported() {
                    var e = this.getBrowser(), t = this.getVersion();
                    return !!this.supportedBrowsers.includes(e) && ("chrome" === e ? t >= this.minChromeVersion : "firefox" === e ? t >= this.minFirefoxVersion : "safari" === e && !this.isIOS && t >= this.minSafariVersion);
                }
            },
            {
                key: "getBrowser",
                value: function getBrowser() {
                    return eP.browserDetails.browser;
                }
            },
            {
                key: "getVersion",
                value: function getVersion() {
                    return eP.browserDetails.version || 0;
                }
            },
            {
                key: "isUnifiedPlanSupported",
                value: function isUnifiedPlanSupported() {
                    var e;
                    var t = this.getBrowser(), n = eP.browserDetails.version || 0;
                    if ("chrome" === t && n < this.minChromeVersion) return !1;
                    if ("firefox" === t && n >= this.minFirefoxVersion) return !0;
                    if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype)) return !1;
                    var r = !1;
                    try {
                        (e = new RTCPeerConnection).addTransceiver("audio"), r = !0;
                    } catch (e) {} finally{
                        e && e.close();
                    }
                    return r;
                }
            },
            {
                key: "toString",
                value: function toString() {
                    return "Supports:\n    browser:".concat(this.getBrowser(), "\n    version:").concat(this.getVersion(), "\n    isIOS:").concat(this.isIOS, "\n    isWebRTCSupported:").concat(this.isWebRTCSupported(), "\n    isBrowserSupported:").concat(this.isBrowserSupported(), "\n    isUnifiedPlanSupported:").concat(this.isUnifiedPlanSupported());
                }
            }
        ]);
        return _class;
    }()), eD = function(e) {
        return !e || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e);
    }, ex = function() {
        return Math.random().toString(36).slice(2);
    }, eI = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302"
            },
            {
                urls: [
                    "turn:eu-0.turn.peerjs.com:3478",
                    "turn:us-0.turn.peerjs.com:3478"
                ],
                username: "peerjs",
                credential: "peerjsp"
            }
        ],
        sdpSemantics: "unified-plan"
    }, eM = new /*#__PURE__*/ (function(n) {
        "use strict";
        _inherits(_class, n);
        var _super = _create_super(_class);
        function _class() {
            for(var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++){
                e[_key] = arguments[_key];
            }
            _class_call_check(this, _class);
            var _this;
            _this = _super.call.apply(_super, [
                this
            ].concat(_to_consumable_array(e))), _this.CLOUD_HOST = "0.peerjs.com", _this.CLOUD_PORT = 443, _this.chunkedBrowsers = {
                Chrome: 1,
                chrome: 1
            }, _this.defaultConfig = eI, _this.browser = eE.getBrowser(), _this.browserVersion = eE.getVersion(), _this.pack = o, _this.unpack = i, _this.supports = function() {
                var e;
                var t = {
                    browser: eE.isBrowserSupported(),
                    webRTC: eE.isWebRTCSupported(),
                    audioVideo: !1,
                    data: !1,
                    binaryBlob: !1,
                    reliable: !1
                };
                if (!t.webRTC) return t;
                try {
                    var _$n;
                    e = new RTCPeerConnection(eI), t.audioVideo = !0;
                    try {
                        _$n = e.createDataChannel("_PEERJSTEST", {
                            ordered: !0
                        }), t.data = !0, t.reliable = !!_$n.ordered;
                        try {
                            _$n.binaryType = "blob", t.binaryBlob = !eE.isIOS;
                        } catch (e) {}
                    } catch (e) {} finally{
                        _$n && _$n.close();
                    }
                } catch (e) {} finally{
                    e && e.close();
                }
                return t;
            }(), _this.validateId = eD, _this.randomToken = ex;
            return _possible_constructor_return(_this);
        }
        _create_class(_class, [
            {
                key: "noop",
                value: function noop() {}
            },
            {
                key: "blobToArrayBuffer",
                value: function blobToArrayBuffer(e, t) {
                    var _$n = new FileReader;
                    return _$n.onload = function(e) {
                        e.target && t(e.target.result);
                    }, _$n.readAsArrayBuffer(e), _$n;
                }
            },
            {
                key: "binaryStringToArrayBuffer",
                value: function binaryStringToArrayBuffer(e) {
                    var t = new Uint8Array(e.length);
                    for(var _$n = 0; _$n < e.length; _$n++)t[_$n] = 255 & e.charCodeAt(_$n);
                    return t.buffer;
                }
            },
            {
                key: "isSecure",
                value: function isSecure() {
                    return "https:" === location.protocol;
                }
            }
        ]);
        return _class;
    }(n));
    (_ = w || (w = {}))[_.Disabled = 0] = "Disabled", _[_.Errors = 1] = "Errors", _[_.Warnings = 2] = "Warnings", _[_.All = 3] = "All";
    var eO = new /*#__PURE__*/ (function() {
        "use strict";
        function _class() {
            _class_call_check(this, _class);
            this._logLevel = 0;
        }
        _create_class(_class, [
            {
                key: "logLevel",
                get: function get() {
                    return this._logLevel;
                },
                set: function set(e) {
                    this._logLevel = e;
                }
            },
            {
                key: "log",
                value: function log() {
                    for(var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++){
                        e[_key] = arguments[_key];
                    }
                    this._logLevel >= 3 && this._print.apply(this, [
                        3
                    ].concat(_to_consumable_array(e)));
                }
            },
            {
                key: "warn",
                value: function warn() {
                    for(var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++){
                        e[_key] = arguments[_key];
                    }
                    this._logLevel >= 2 && this._print.apply(this, [
                        2
                    ].concat(_to_consumable_array(e)));
                }
            },
            {
                key: "error",
                value: function error() {
                    for(var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++){
                        e[_key] = arguments[_key];
                    }
                    this._logLevel >= 1 && this._print.apply(this, [
                        1
                    ].concat(_to_consumable_array(e)));
                }
            },
            {
                key: "setLogFunction",
                value: function setLogFunction(e) {
                    this._print = e;
                }
            },
            {
                key: "_print",
                value: function _print(e) {
                    for(var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                        t[_key - 1] = arguments[_key];
                    }
                    var _console, _console1, _console2;
                    var n = [
                        "PeerJS: "
                    ].concat(_to_consumable_array(t));
                    for(var _$e in n)n[_$e] instanceof Error && (n[_$e] = "(" + n[_$e].name + ") " + n[_$e].message);
                    e >= 3 ? (_console = console).log.apply(_console, _to_consumable_array(n)) : e >= 2 ? (_console1 = console).warn.apply(_console1, [
                        "WARNING"
                    ].concat(_to_consumable_array(n))) : e >= 1 && (_console2 = console).error.apply(_console2, [
                        "ERROR"
                    ].concat(_to_consumable_array(n)));
                }
            }
        ]);
        return _class;
    }()), ej = {}, eL = Object.prototype.hasOwnProperty, eA = "~";
    Object.create && (eB.prototype = Object.create(null), new eB().__proto__ || (eA = !1)), eN.prototype.eventNames = function() {
        var e, t, n = [];
        if (0 === this._eventsCount) return n;
        for(t in e = this._events)eL.call(e, t) && n.push(eA ? t.slice(1) : t);
        return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
    }, eN.prototype.listeners = function(e) {
        var t = eA ? eA + e : e, n = this._events[t];
        if (!n) return [];
        if (n.fn) return [
            n.fn
        ];
        for(var r = 0, i = n.length, o = Array(i); r < i; r++)o[r] = n[r].fn;
        return o;
    }, eN.prototype.listenerCount = function(e) {
        var t = eA ? eA + e : e, n = this._events[t];
        return n ? n.fn ? 1 : n.length : 0;
    }, eN.prototype.emit = function(e, t, n, r, i, o) {
        var s = eA ? eA + e : e;
        if (!this._events[s]) return !1;
        var a, c, l = this._events[s], p = arguments.length;
        if (l.fn) {
            switch(l.once && this.removeListener(e, l.fn, void 0, !0), p){
                case 1:
                    return l.fn.call(l.context), !0;
                case 2:
                    return l.fn.call(l.context, t), !0;
                case 3:
                    return l.fn.call(l.context, t, n), !0;
                case 4:
                    return l.fn.call(l.context, t, n, r), !0;
                case 5:
                    return l.fn.call(l.context, t, n, r, i), !0;
                case 6:
                    return l.fn.call(l.context, t, n, r, i, o), !0;
            }
            for(c = 1, a = Array(p - 1); c < p; c++)a[c - 1] = arguments[c];
            l.fn.apply(l.context, a);
        } else {
            var d, h = l.length;
            for(c = 0; c < h; c++)switch(l[c].once && this.removeListener(e, l[c].fn, void 0, !0), p){
                case 1:
                    l[c].fn.call(l[c].context);
                    break;
                case 2:
                    l[c].fn.call(l[c].context, t);
                    break;
                case 3:
                    l[c].fn.call(l[c].context, t, n);
                    break;
                case 4:
                    l[c].fn.call(l[c].context, t, n, r);
                    break;
                default:
                    if (!a) for(d = 1, a = Array(p - 1); d < p; d++)a[d - 1] = arguments[d];
                    l[c].fn.apply(l[c].context, a);
            }
        }
        return !0;
    }, eN.prototype.on = function(e, t, n) {
        return eU(this, e, t, n, !1);
    }, eN.prototype.once = function(e, t, n) {
        return eU(this, e, t, n, !0);
    }, eN.prototype.removeListener = function(e, t, n, r) {
        var i = eA ? eA + e : e;
        if (!this._events[i]) return this;
        if (!t) return ez(this, i), this;
        var o = this._events[i];
        if (o.fn) o.fn !== t || r && !o.once || n && o.context !== n || ez(this, i);
        else {
            for(var s = 0, a = [], c = o.length; s < c; s++)(o[s].fn !== t || r && !o[s].once || n && o[s].context !== n) && a.push(o[s]);
            a.length ? this._events[i] = 1 === a.length ? a[0] : a : ez(this, i);
        }
        return this;
    }, eN.prototype.removeAllListeners = function(e) {
        var t;
        return e ? (t = eA ? eA + e : e, this._events[t] && ez(this, t)) : (this._events = new eB, this._eventsCount = 0), this;
    }, eN.prototype.off = eN.prototype.removeListener, eN.prototype.addListener = eN.prototype.on, eN.prefixed = eA, eN.EventEmitter = eN, ej = eN, (C = P || (P = {})).Data = "data", C.Media = "media", (v = E || (E = {})).BrowserIncompatible = "browser-incompatible", v.Disconnected = "disconnected", v.InvalidID = "invalid-id", v.InvalidKey = "invalid-key", v.Network = "network", v.PeerUnavailable = "peer-unavailable", v.SslUnavailable = "ssl-unavailable", v.ServerError = "server-error", v.SocketError = "socket-error", v.SocketClosed = "socket-closed", v.UnavailableID = "unavailable-id", v.WebRTC = "webrtc", (b = D || (D = {})).NegotiationFailed = "negotiation-failed", b.ConnectionClosed = "connection-closed", (k = x || (x = {})).NotOpenYet = "not-open-yet", k.MessageToBig = "message-too-big", (S = I || (I = {})).Binary = "binary", S.BinaryUTF8 = "binary-utf8", S.JSON = "json", S.None = "raw", (T = M || (M = {})).Message = "message", T.Disconnected = "disconnected", T.Error = "error", T.Close = "close", (R = O || (O = {})).Heartbeat = "HEARTBEAT", R.Candidate = "CANDIDATE", R.Offer = "OFFER", R.Answer = "ANSWER", R.Open = "OPEN", R.Error = "ERROR", R.IdTaken = "ID-TAKEN", R.InvalidKey = "INVALID-KEY", R.Leave = "LEAVE", R.Expire = "EXPIRE";
    var e$ = {};
    e$ = JSON.parse('{"name":"peerjs","version":"1.5.2","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz St\xfcckler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","So\u0308ren Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-cbor":"dist/serializer.cbor.mjs","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-minified-cbor":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/Cbor.ts"},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","parcel":"^2.9.3","prettier":"^3.0.0","semantic-release":"^21.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","cbor-x":"1.5.4","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","webrtc-adapter":"^8.0.0"},"alias":{"process":false,"buffer":false}}');
    var eJ = /*#__PURE__*/ function(_ej_EventEmitter) {
        "use strict";
        _inherits(eJ, _ej_EventEmitter);
        var _super = _create_super(eJ);
        function eJ(e, t, n, r, i) {
            var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 5e3;
            _class_call_check(this, eJ);
            var _this;
            _this = _super.call(this), _this.pingInterval = o, _this._disconnected = !0, _this._messagesQueue = [], _this._baseUrl = (e ? "wss://" : "ws://") + t + ":" + n + r + "peerjs?key=" + i;
            return _possible_constructor_return(_this);
        }
        _create_class(eJ, [
            {
                key: "start",
                value: function start(e, t) {
                    var _this = this;
                    this._id = e;
                    var n = "".concat(this._baseUrl, "&id=").concat(e, "&token=").concat(t);
                    !this._socket && this._disconnected && (this._socket = new WebSocket(n + "&version=" + e$.version), this._disconnected = !1, this._socket.onmessage = function(e) {
                        var _$t;
                        try {
                            _$t = JSON.parse(e.data), eO.log("Server message received:", _$t);
                        } catch (t) {
                            eO.log("Invalid server message", e.data);
                            return;
                        }
                        _this.emit(M.Message, _$t);
                    }, this._socket.onclose = function(e) {
                        _this._disconnected || (eO.log("Socket closed.", e), _this._cleanup(), _this._disconnected = !0, _this.emit(M.Disconnected));
                    }, this._socket.onopen = function() {
                        _this._disconnected || (_this._sendQueuedMessages(), eO.log("Socket open"), _this._scheduleHeartbeat());
                    });
                }
            },
            {
                key: "_scheduleHeartbeat",
                value: function _scheduleHeartbeat() {
                    var _this = this;
                    this._wsPingTimer = setTimeout(function() {
                        _this._sendHeartbeat();
                    }, this.pingInterval);
                }
            },
            {
                key: "_sendHeartbeat",
                value: function _sendHeartbeat() {
                    if (!this._wsOpen()) {
                        eO.log("Cannot send heartbeat, because socket closed");
                        return;
                    }
                    var e = JSON.stringify({
                        type: O.Heartbeat
                    });
                    this._socket.send(e), this._scheduleHeartbeat();
                }
            },
            {
                key: "_wsOpen",
                value: function _wsOpen() {
                    return !!this._socket && 1 === this._socket.readyState;
                }
            },
            {
                key: "_sendQueuedMessages",
                value: function _sendQueuedMessages() {
                    var e = _to_consumable_array(this._messagesQueue);
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = (this._messagesQueue = [], e)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var t = _step.value;
                            this.send(t);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            },
            {
                key: "send",
                value: function send(e) {
                    if (this._disconnected) return;
                    if (!this._id) {
                        this._messagesQueue.push(e);
                        return;
                    }
                    if (!e.type) {
                        this.emit(M.Error, "Invalid message");
                        return;
                    }
                    if (!this._wsOpen()) return;
                    var t = JSON.stringify(e);
                    this._socket.send(t);
                }
            },
            {
                key: "close",
                value: function close() {
                    this._disconnected || (this._cleanup(), this._disconnected = !0);
                }
            },
            {
                key: "_cleanup",
                value: function _cleanup() {
                    this._socket && (this._socket.onopen = this._socket.onmessage = this._socket.onclose = null, this._socket.close(), this._socket = void 0), clearTimeout(this._wsPingTimer);
                }
            }
        ]);
        return eJ;
    }(ej.EventEmitter);
    var eV = /*#__PURE__*/ function() {
        "use strict";
        function eV(e) {
            _class_call_check(this, eV);
            this.connection = e;
        }
        _create_class(eV, [
            {
                key: "startConnection",
                value: function startConnection(e) {
                    var t = this._startPeerConnection();
                    if (this.connection.peerConnection = t, this.connection.type === P.Media && e._stream && this._addTracksToConnection(e._stream, t), e.originator) {
                        var n = this.connection, r = {
                            ordered: !!e.reliable
                        }, i = t.createDataChannel(n.label, r);
                        n._initializeDataChannel(i), this._makeOffer();
                    } else this.handleSDP("OFFER", e.sdp);
                }
            },
            {
                key: "_startPeerConnection",
                value: function _startPeerConnection() {
                    eO.log("Creating RTCPeerConnection.");
                    var e = new RTCPeerConnection(this.connection.provider.options.config);
                    return this._setupListeners(e), e;
                }
            },
            {
                key: "_setupListeners",
                value: function _setupListeners(e) {
                    var _this = this;
                    var t = this.connection.peer, n = this.connection.connectionId, r = this.connection.type, i = this.connection.provider;
                    eO.log("Listening for ICE candidates."), e.onicecandidate = function(e) {
                        e.candidate && e.candidate.candidate && (eO.log("Received ICE candidates for ".concat(t, ":"), e.candidate), i.socket.send({
                            type: O.Candidate,
                            payload: {
                                candidate: e.candidate,
                                type: r,
                                connectionId: n
                            },
                            dst: t
                        }));
                    }, e.oniceconnectionstatechange = function() {
                        switch(e.iceConnectionState){
                            case "failed":
                                eO.log("iceConnectionState is failed, closing connections to " + t), _this.connection.emitError(D.NegotiationFailed, "Negotiation of connection to " + t + " failed."), _this.connection.close();
                                break;
                            case "closed":
                                eO.log("iceConnectionState is closed, closing connections to " + t), _this.connection.emitError(D.ConnectionClosed, "Connection to " + t + " closed."), _this.connection.close();
                                break;
                            case "disconnected":
                                eO.log("iceConnectionState changed to disconnected on the connection with " + t);
                                break;
                            case "completed":
                                e.onicecandidate = function() {};
                        }
                        _this.connection.emit("iceStateChanged", e.iceConnectionState);
                    }, eO.log("Listening for data channel"), e.ondatachannel = function(e) {
                        eO.log("Received data channel");
                        var r = e.channel;
                        i.getConnection(t, n)._initializeDataChannel(r);
                    }, eO.log("Listening for remote stream"), e.ontrack = function(e) {
                        eO.log("Received remote stream");
                        var r = e.streams[0], o = i.getConnection(t, n);
                        o.type === P.Media && _this._addStreamToMediaConnection(r, o);
                    };
                }
            },
            {
                key: "cleanup",
                value: function cleanup() {
                    eO.log("Cleaning up PeerConnection to " + this.connection.peer);
                    var e = this.connection.peerConnection;
                    if (!e) return;
                    this.connection.peerConnection = null, e.onicecandidate = e.oniceconnectionstatechange = e.ondatachannel = e.ontrack = function() {};
                    var t = "closed" !== e.signalingState, n = !1, r = this.connection.dataChannel;
                    r && (n = !!r.readyState && "closed" !== r.readyState), (t || n) && e.close();
                }
            },
            {
                key: "_makeOffer",
                value: function _makeOffer() {
                    var _this = this;
                    return _async_to_generator(function() {
                        var _$e, t, n, r, _$e1, e, e1;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    _$e = _this.connection.peerConnection, t = _this.connection.provider;
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        7,
                                        ,
                                        8
                                    ]);
                                    return [
                                        4,
                                        _$e.createOffer(_this.connection.options.constraints)
                                    ];
                                case 2:
                                    n = _state.sent();
                                    eO.log("Created offer."), _this.connection.options.sdpTransform && "function" == typeof _this.connection.options.sdpTransform && (n.sdp = _this.connection.options.sdpTransform(n.sdp) || n.sdp);
                                    _state.label = 3;
                                case 3:
                                    _state.trys.push([
                                        3,
                                        5,
                                        ,
                                        6
                                    ]);
                                    return [
                                        4,
                                        _$e.setLocalDescription(n)
                                    ];
                                case 4:
                                    _state.sent(), eO.log("Set localDescription:", n, "for:".concat(_this.connection.peer));
                                    r = {
                                        sdp: n,
                                        type: _this.connection.type,
                                        connectionId: _this.connection.connectionId,
                                        metadata: _this.connection.metadata
                                    };
                                    if (_this.connection.type === P.Data) {
                                        _$e1 = _this.connection;
                                        r = _object_spread_props(_object_spread({}, r), {
                                            label: _$e1.label,
                                            reliable: _$e1.reliable,
                                            serialization: _$e1.serialization
                                        });
                                    }
                                    t.socket.send({
                                        type: O.Offer,
                                        payload: r,
                                        dst: _this.connection.peer
                                    });
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    e = _state.sent();
                                    "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" != e && (t.emitError(E.WebRTC, e), eO.log("Failed to setLocalDescription, ", e));
                                    return [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        3,
                                        8
                                    ];
                                case 7:
                                    e1 = _state.sent();
                                    t.emitError(E.WebRTC, e1), eO.log("Failed to createOffer, ", e1);
                                    return [
                                        3,
                                        8
                                    ];
                                case 8:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "_makeAnswer",
                value: function _makeAnswer() {
                    var _this = this;
                    return _async_to_generator(function() {
                        var _$e, t, n, e, e1;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    _$e = _this.connection.peerConnection, t = _this.connection.provider;
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        7,
                                        ,
                                        8
                                    ]);
                                    return [
                                        4,
                                        _$e.createAnswer()
                                    ];
                                case 2:
                                    n = _state.sent();
                                    eO.log("Created answer."), _this.connection.options.sdpTransform && "function" == typeof _this.connection.options.sdpTransform && (n.sdp = _this.connection.options.sdpTransform(n.sdp) || n.sdp);
                                    _state.label = 3;
                                case 3:
                                    _state.trys.push([
                                        3,
                                        5,
                                        ,
                                        6
                                    ]);
                                    return [
                                        4,
                                        _$e.setLocalDescription(n)
                                    ];
                                case 4:
                                    _state.sent(), eO.log("Set localDescription:", n, "for:".concat(_this.connection.peer)), t.socket.send({
                                        type: O.Answer,
                                        payload: {
                                            sdp: n,
                                            type: _this.connection.type,
                                            connectionId: _this.connection.connectionId
                                        },
                                        dst: _this.connection.peer
                                    });
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    e = _state.sent();
                                    t.emitError(E.WebRTC, e), eO.log("Failed to setLocalDescription, ", e);
                                    return [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        3,
                                        8
                                    ];
                                case 7:
                                    e1 = _state.sent();
                                    t.emitError(E.WebRTC, e1), eO.log("Failed to create answer, ", e1);
                                    return [
                                        3,
                                        8
                                    ];
                                case 8:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "handleSDP",
                value: function handleSDP(e, t) {
                    var _this = this;
                    return _async_to_generator(function() {
                        var n, r, _tmp, e1;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    t = new RTCSessionDescription(t);
                                    n = _this.connection.peerConnection, r = _this.connection.provider;
                                    eO.log("Setting remote description", t);
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        5,
                                        ,
                                        6
                                    ]);
                                    return [
                                        4,
                                        n.setRemoteDescription(t)
                                    ];
                                case 2:
                                    _state.sent(), eO.log("Set remoteDescription:".concat(e, " for:").concat(_this.connection.peer));
                                    _tmp = "OFFER" === e;
                                    if (!_tmp) return [
                                        3,
                                        4
                                    ];
                                    return [
                                        4,
                                        _this._makeAnswer()
                                    ];
                                case 3:
                                    _tmp = _state.sent();
                                    _state.label = 4;
                                case 4:
                                    _tmp;
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    e1 = _state.sent();
                                    r.emitError(E.WebRTC, e1), eO.log("Failed to setRemoteDescription, ", e1);
                                    return [
                                        3,
                                        6
                                    ];
                                case 6:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "handleCandidate",
                value: function handleCandidate(e) {
                    var _this = this;
                    return _async_to_generator(function() {
                        var e1;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    eO.log("handleCandidate:", e);
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        _this.connection.peerConnection.addIceCandidate(e)
                                    ];
                                case 2:
                                    _state.sent(), eO.log("Added ICE candidate for:".concat(_this.connection.peer));
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    e1 = _state.sent();
                                    _this.connection.provider.emitError(E.WebRTC, e1), eO.log("Failed to handleCandidate, ", e1);
                                    return [
                                        3,
                                        4
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "_addTracksToConnection",
                value: function _addTracksToConnection(e, t) {
                    if (eO.log("add tracks from stream ".concat(e.id, " to peer connection")), !t.addTrack) return eO.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
                    e.getTracks().forEach(function(n) {
                        t.addTrack(n, e);
                    });
                }
            },
            {
                key: "_addStreamToMediaConnection",
                value: function _addStreamToMediaConnection(e, t) {
                    eO.log("add stream ".concat(e.id, " to media connection ").concat(t.connectionId)), t.addStream(e);
                }
            }
        ]);
        return eV;
    }();
    var eG = /*#__PURE__*/ function(_ej_EventEmitter) {
        "use strict";
        _inherits(eG, _ej_EventEmitter);
        var _super = _create_super(eG);
        function eG() {
            _class_call_check(this, eG);
            return _super.apply(this, arguments);
        }
        _create_class(eG, [
            {
                key: "emitError",
                value: function emitError(e, t) {
                    eO.error("Error:", t), this.emit("error", new eW("".concat(e), t));
                }
            }
        ]);
        return eG;
    }(ej.EventEmitter);
    var eW = /*#__PURE__*/ function(Error1) {
        "use strict";
        _inherits(eW, Error1);
        var _super = _create_super(eW);
        function eW(e, t) {
            _class_call_check(this, eW);
            var _this;
            "string" == typeof t ? _this = _super.call(this, t) : (_this = _super.call(this), Object.assign(_assert_this_initialized(_this), t)), _this.type = e;
            return _possible_constructor_return(_this);
        }
        return eW;
    }(_wrap_native_super(Error));
    var eH = /*#__PURE__*/ function(eG) {
        "use strict";
        _inherits(eH, eG);
        var _super = _create_super(eH);
        function eH(e, t, n) {
            _class_call_check(this, eH);
            var _this;
            _this = _super.call(this), _this.peer = e, _this.provider = t, _this.options = n, _this._open = !1, _this.metadata = n.metadata;
            return _possible_constructor_return(_this);
        }
        _create_class(eH, [
            {
                key: "open",
                get: function get() {
                    return this._open;
                }
            }
        ]);
        return eH;
    }(eG);
    var eY = /*#__PURE__*/ function(eH) {
        "use strict";
        _inherits(eY, eH);
        var _super = _create_super(eY);
        function eY(e, t, n) {
            _class_call_check(this, eY);
            var _this;
            _this = _super.call(this, e, t, n), _this._localStream = _this.options._stream, _this.connectionId = _this.options.connectionId || eY.ID_PREFIX + eM.randomToken(), _this._negotiator = new eV(_assert_this_initialized(_this)), _this._localStream && _this._negotiator.startConnection({
                _stream: _this._localStream,
                originator: !0
            });
            return _possible_constructor_return(_this);
        }
        _create_class(eY, [
            {
                key: "type",
                get: function get() {
                    return P.Media;
                }
            },
            {
                key: "localStream",
                get: function get() {
                    return this._localStream;
                }
            },
            {
                key: "remoteStream",
                get: function get() {
                    return this._remoteStream;
                }
            },
            {
                key: "_initializeDataChannel",
                value: function _initializeDataChannel(e) {
                    var _this = this;
                    this.dataChannel = e, this.dataChannel.onopen = function() {
                        eO.log("DC#".concat(_this.connectionId, " dc connection success")), _this.emit("willCloseOnRemote");
                    }, this.dataChannel.onclose = function() {
                        eO.log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer), _this.close();
                    };
                }
            },
            {
                key: "addStream",
                value: function addStream(e) {
                    eO.log("Receiving stream", e), this._remoteStream = e, _get(_get_prototype_of(eY.prototype), "emit", this).call(this, "stream", e);
                }
            },
            {
                key: "handleMessage",
                value: function handleMessage(e) {
                    var t = e.type, n = e.payload;
                    switch(e.type){
                        case O.Answer:
                            this._negotiator.handleSDP(t, n.sdp), this._open = !0;
                            break;
                        case O.Candidate:
                            this._negotiator.handleCandidate(n.candidate);
                            break;
                        default:
                            eO.warn("Unrecognized message type:".concat(t, " from peer:").concat(this.peer));
                    }
                }
            },
            {
                key: "answer",
                value: function answer(e) {
                    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                    if (this._localStream) {
                        eO.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
                        return;
                    }
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = (this._localStream = e, t && t.sdpTransform && (this.options.sdpTransform = t.sdpTransform), this._negotiator.startConnection(_object_spread_props(_object_spread({}, this.options._payload), {
                            _stream: e
                        })), this.provider._getMessages(this.connectionId))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var n = _step.value;
                            this.handleMessage(n);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    this._open = !0;
                }
            },
            {
                key: "close",
                value: function close() {
                    this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = !1, _get(_get_prototype_of(eY.prototype), "emit", this).call(this, "close"));
                }
            }
        ]);
        return eY;
    }(eH);
    eY.ID_PREFIX = "mc_";
    var eK = /*#__PURE__*/ function() {
        "use strict";
        function eK(e) {
            _class_call_check(this, eK);
            this._options = e;
        }
        _create_class(eK, [
            {
                key: "_buildRequest",
                value: function _buildRequest(e) {
                    var t = this._options.secure ? "https" : "http", _this__options = this._options, n = _this__options.host, r = _this__options.port, i = _this__options.path, o = _this__options.key, s = new URL("".concat(t, "://").concat(n, ":").concat(r).concat(i).concat(o, "/").concat(e));
                    return s.searchParams.set("ts", "".concat(Date.now()).concat(Math.random())), s.searchParams.set("version", e$.version), fetch(s.href, {
                        referrerPolicy: this._options.referrerPolicy
                    });
                }
            },
            {
                key: "retrieveId",
                value: function retrieveId() {
                    var _this = this;
                    return _async_to_generator(function() {
                        var e, t, e1;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    _state.trys.push([
                                        0,
                                        2,
                                        ,
                                        3
                                    ]);
                                    return [
                                        4,
                                        _this._buildRequest("id")
                                    ];
                                case 1:
                                    e = _state.sent();
                                    if (200 !== e.status) throw Error("Error. Status:".concat(e.status));
                                    return [
                                        2,
                                        e.text()
                                    ];
                                case 2:
                                    t = _state.sent();
                                    eO.error("Error retrieving ID", t);
                                    e1 = "";
                                    throw "/" === _this._options.path && _this._options.host !== eM.CLOUD_HOST && (e1 = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), Error("Could not get an ID from the server." + e1);
                                case 3:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "listAllPeers",
                value: function listAllPeers() {
                    var _this = this;
                    return _async_to_generator(function() {
                        var _$e, _$e1, e;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    _state.trys.push([
                                        0,
                                        2,
                                        ,
                                        3
                                    ]);
                                    return [
                                        4,
                                        _this._buildRequest("peers")
                                    ];
                                case 1:
                                    _$e = _state.sent();
                                    if (200 !== _$e.status) {
                                        if (401 === _$e.status) {
                                            _$e1 = "";
                                            throw _$e1 = _this._options.host === eM.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", Error("It doesn't look like you have permission to list peers IDs. " + _$e1);
                                        }
                                        throw Error("Error. Status:".concat(_$e.status));
                                    }
                                    return [
                                        2,
                                        _$e.json()
                                    ];
                                case 2:
                                    e = _state.sent();
                                    throw eO.error("Error retrieving list peers", e), Error("Could not get list peers from the server." + e);
                                case 3:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            }
        ]);
        return eK;
    }();
    var eX = /*#__PURE__*/ function(eH) {
        "use strict";
        _inherits(eX, eH);
        var _super = _create_super(eX);
        function eX(e, t, n) {
            _class_call_check(this, eX);
            var _this;
            _this = _super.call(this, e, t, n), _this.connectionId = _this.options.connectionId || eX.ID_PREFIX + ex(), _this.label = _this.options.label || _this.connectionId, _this.reliable = !!_this.options.reliable, _this._negotiator = new eV(_assert_this_initialized(_this)), _this._negotiator.startConnection(_this.options._payload || {
                originator: !0,
                reliable: _this.reliable
            });
            return _possible_constructor_return(_this);
        }
        _create_class(eX, [
            {
                key: "type",
                get: function get() {
                    return P.Data;
                }
            },
            {
                key: "_initializeDataChannel",
                value: function _initializeDataChannel(e) {
                    var _this = this;
                    this.dataChannel = e, this.dataChannel.onopen = function() {
                        eO.log("DC#".concat(_this.connectionId, " dc connection success")), _this._open = !0, _this.emit("open");
                    }, this.dataChannel.onmessage = function(e) {
                        eO.log("DC#".concat(_this.connectionId, " dc onmessage:"), e.data);
                    }, this.dataChannel.onclose = function() {
                        eO.log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer), _this.close();
                    };
                }
            },
            {
                key: "close",
                value: function close(e) {
                    if (e === null || e === void 0 ? void 0 : e.flush) {
                        this.send({
                            __peerData: {
                                type: "close"
                            }
                        });
                        return;
                    }
                    this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.dataChannel && (this.dataChannel.onopen = null, this.dataChannel.onmessage = null, this.dataChannel.onclose = null, this.dataChannel = null), this.open && (this._open = !1, _get(_get_prototype_of(eX.prototype), "emit", this).call(this, "close"));
                }
            },
            {
                key: "send",
                value: function send(e) {
                    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                    if (!this.open) {
                        this.emitError(x.NotOpenYet, "Connection is not open. You should listen for the `open` event before sending messages.");
                        return;
                    }
                    return this._send(e, t);
                }
            },
            {
                key: "handleMessage",
                value: function handleMessage(e) {
                    var _this = this;
                    return _async_to_generator(function() {
                        var t, _;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    t = e.payload;
                                    _ = e.type;
                                    switch(_){
                                        case O.Answer:
                                            return [
                                                3,
                                                1
                                            ];
                                        case O.Candidate:
                                            return [
                                                3,
                                                3
                                            ];
                                    }
                                    return [
                                        3,
                                        5
                                    ];
                                case 1:
                                    return [
                                        4,
                                        _this._negotiator.handleSDP(e.type, t.sdp)
                                    ];
                                case 2:
                                    _state.sent();
                                    return [
                                        3,
                                        6
                                    ];
                                case 3:
                                    return [
                                        4,
                                        _this._negotiator.handleCandidate(t.candidate)
                                    ];
                                case 4:
                                    _state.sent();
                                    return [
                                        3,
                                        6
                                    ];
                                case 5:
                                    eO.warn("Unrecognized message type:", e.type, "from peer:", _this.peer);
                                    _state.label = 6;
                                case 6:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            }
        ]);
        return eX;
    }(eH);
    eX.ID_PREFIX = "dc_", eX.MAX_BUFFERED_AMOUNT = 8388608;
    var eq = /*#__PURE__*/ function(eX1) {
        "use strict";
        _inherits(eq, eX1);
        var _super = _create_super(eq);
        function eq() {
            for(var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++){
                e[_key] = arguments[_key];
            }
            _class_call_check(this, eq);
            var _this;
            _this = _super.call.apply(_super, [
                this
            ].concat(_to_consumable_array(e))), _this._buffer = [], _this._bufferSize = 0, _this._buffering = !1;
            return _possible_constructor_return(_this);
        }
        _create_class(eq, [
            {
                key: "bufferSize",
                get: function get() {
                    return this._bufferSize;
                }
            },
            {
                key: "_initializeDataChannel",
                value: function _initializeDataChannel(e) {
                    var _this = this;
                    _get(_get_prototype_of(eq.prototype), "_initializeDataChannel", this).call(this, e), this.dataChannel.binaryType = "arraybuffer", this.dataChannel.addEventListener("message", function(e) {
                        return _this._handleDataMessage(e);
                    });
                }
            },
            {
                key: "_bufferedSend",
                value: function _bufferedSend(e) {
                    (this._buffering || !this._trySend(e)) && (this._buffer.push(e), this._bufferSize = this._buffer.length);
                }
            },
            {
                key: "_trySend",
                value: function _trySend(e) {
                    var _this = this;
                    if (!this.open) return !1;
                    if (this.dataChannel.bufferedAmount > eX.MAX_BUFFERED_AMOUNT) return this._buffering = !0, setTimeout(function() {
                        _this._buffering = !1, _this._tryBuffer();
                    }, 50), !1;
                    try {
                        this.dataChannel.send(e);
                    } catch (e) {
                        return eO.error("DC#:".concat(this.connectionId, " Error when sending:"), e), this._buffering = !0, this.close(), !1;
                    }
                    return !0;
                }
            },
            {
                key: "_tryBuffer",
                value: function _tryBuffer() {
                    if (!this.open || 0 === this._buffer.length) return;
                    var e = this._buffer[0];
                    this._trySend(e) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer());
                }
            },
            {
                key: "close",
                value: function close(e) {
                    if (e === null || e === void 0 ? void 0 : e.flush) {
                        this.send({
                            __peerData: {
                                type: "close"
                            }
                        });
                        return;
                    }
                    this._buffer = [], this._bufferSize = 0, _get(_get_prototype_of(eq.prototype), "close", this).call(this);
                }
            }
        ]);
        return eq;
    }(eX);
    var eQ = /*#__PURE__*/ function(eq) {
        "use strict";
        _inherits(eQ, eq);
        var _super = _create_super(eQ);
        function eQ(e, t, r) {
            _class_call_check(this, eQ);
            var _this;
            _this = _super.call(this, e, t, r), _this.chunker = new n, _this.serialization = I.Binary, _this._chunkedData = {};
            return _possible_constructor_return(_this);
        }
        _create_class(eQ, [
            {
                key: "close",
                value: function close(e) {
                    _get(_get_prototype_of(eQ.prototype), "close", this).call(this, e), this._chunkedData = {};
                }
            },
            {
                key: "_handleDataMessage",
                value: function _handleDataMessage(param) {
                    var e = param.data;
                    var t = i(e), n = t.__peerData;
                    if (n) {
                        if ("close" === n.type) {
                            this.close();
                            return;
                        }
                        this._handleChunk(t);
                        return;
                    }
                    this.emit("data", t);
                }
            },
            {
                key: "_handleChunk",
                value: function _handleChunk(e) {
                    var t = e.__peerData, n = this._chunkedData[t] || {
                        data: [],
                        count: 0,
                        total: e.total
                    };
                    if (n.data[e.n] = new Uint8Array(e.data), n.count++, this._chunkedData[t] = n, n.total === n.count) {
                        delete this._chunkedData[t];
                        var _$e = function(e) {
                            var t = 0;
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var n = _step.value;
                                    t += n.byteLength;
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            var n1 = new Uint8Array(t), r = 0;
                            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                            try {
                                for(var _iterator1 = e[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                    var t1 = _step1.value;
                                    n1.set(t1, r), r += t1.byteLength;
                                }
                            } catch (err) {
                                _didIteratorError1 = true;
                                _iteratorError1 = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                        _iterator1.return();
                                    }
                                } finally{
                                    if (_didIteratorError1) {
                                        throw _iteratorError1;
                                    }
                                }
                            }
                            return n1;
                        }(n.data);
                        this._handleDataMessage({
                            data: _$e
                        });
                    }
                }
            },
            {
                key: "_send",
                value: function _send(e, t) {
                    var n = o(e);
                    if (n instanceof Promise) return this._send_blob(n);
                    if (!t && n.byteLength > this.chunker.chunkedMTU) {
                        this._sendChunks(n);
                        return;
                    }
                    this._bufferedSend(n);
                }
            },
            {
                key: "_send_blob",
                value: function _send_blob(e) {
                    var _this = this;
                    return _async_to_generator(function() {
                        var t;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    return [
                                        4,
                                        e
                                    ];
                                case 1:
                                    t = _state.sent();
                                    if (t.byteLength > _this.chunker.chunkedMTU) {
                                        _this._sendChunks(t);
                                        return [
                                            2
                                        ];
                                    }
                                    _this._bufferedSend(t);
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "_sendChunks",
                value: function _sendChunks(e) {
                    var t = this.chunker.chunk(e);
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = (eO.log("DC#".concat(this.connectionId, " Try to send ").concat(t.length, " chunks...")), t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _$e = _step.value;
                            this.send(_$e, !0);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        ]);
        return eQ;
    }(eq);
    var eZ = /*#__PURE__*/ function(eq) {
        "use strict";
        _inherits(eZ, eq);
        var _super = _create_super(eZ);
        function eZ() {
            for(var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++){
                e[_key] = arguments[_key];
            }
            _class_call_check(this, eZ);
            var _this;
            _this = _super.call.apply(_super, [
                this
            ].concat(_to_consumable_array(e))), _this.serialization = I.None;
            return _possible_constructor_return(_this);
        }
        _create_class(eZ, [
            {
                key: "_handleDataMessage",
                value: function _handleDataMessage(param) {
                    var e = param.data;
                    _get(_get_prototype_of(eZ.prototype), "emit", this).call(this, "data", e);
                }
            },
            {
                key: "_send",
                value: function _send(e, t) {
                    this._bufferedSend(e);
                }
            }
        ]);
        return eZ;
    }(eq);
    var e0 = /*#__PURE__*/ function(eq) {
        "use strict";
        _inherits(e0, eq);
        var _super = _create_super(e0);
        function e0() {
            for(var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++){
                e[_key] = arguments[_key];
            }
            _class_call_check(this, e0);
            var _this;
            _this = _super.call.apply(_super, [
                this
            ].concat(_to_consumable_array(e))), _this.serialization = I.JSON, _this.encoder = new TextEncoder, _this.decoder = new TextDecoder, _this.stringify = JSON.stringify, _this.parse = JSON.parse;
            return _possible_constructor_return(_this);
        }
        _create_class(e0, [
            {
                key: "_handleDataMessage",
                value: function _handleDataMessage(param) {
                    var e = param.data;
                    var t = this.parse(this.decoder.decode(e)), n = t.__peerData;
                    if (n && "close" === n.type) {
                        this.close();
                        return;
                    }
                    this.emit("data", t);
                }
            },
            {
                key: "_send",
                value: function _send(e, t) {
                    var n = this.encoder.encode(this.stringify(e));
                    if (n.byteLength >= eM.chunkedMTU) {
                        this.emitError(x.MessageToBig, "Message too big for JSON channel");
                        return;
                    }
                    this._bufferedSend(n);
                }
            }
        ]);
        return e0;
    }(eq);
    var e1 = /*#__PURE__*/ function(eG) {
        "use strict";
        _inherits(e1, eG);
        var _super = _create_super(e1);
        function e1(e, t) {
            _class_call_check(this, e1);
            var _this;
            var n;
            if (_this = _super.call(this), _this._serializers = {
                raw: eZ,
                json: e0,
                binary: eQ,
                "binary-utf8": eQ,
                default: eQ
            }, _this._id = null, _this._lastServerId = null, _this._destroyed = !1, _this._disconnected = !1, _this._open = !1, _this._connections = new Map, _this._lostMessages = new Map, e && e.constructor == Object ? t = e : e && (n = e.toString()), t = _object_spread({
                debug: 0,
                host: eM.CLOUD_HOST,
                port: eM.CLOUD_PORT,
                path: "/",
                key: e1.DEFAULT_KEY,
                token: eM.randomToken(),
                config: eM.defaultConfig,
                referrerPolicy: "strict-origin-when-cross-origin",
                serializers: {}
            }, t), _this._options = t, _this._serializers = _object_spread({}, _this._serializers, _this.options.serializers), "/" === _this._options.host && (_this._options.host = window.location.hostname), _this._options.path && ("/" !== _this._options.path[0] && (_this._options.path = "/" + _this._options.path), "/" !== _this._options.path[_this._options.path.length - 1] && (_this._options.path += "/")), void 0 === _this._options.secure && _this._options.host !== eM.CLOUD_HOST ? _this._options.secure = eM.isSecure() : _this._options.host == eM.CLOUD_HOST && (_this._options.secure = !0), _this._options.logFunction && eO.setLogFunction(_this._options.logFunction), eO.logLevel = _this._options.debug || 0, _this._api = new eK(t), _this._socket = _this._createServerConnection(), !eM.supports.audioVideo && !eM.supports.data) {
                _this._delayedAbort(E.BrowserIncompatible, "The current browser does not support WebRTC");
                return _possible_constructor_return(_this);
            }
            if (n && !eM.validateId(n)) {
                _this._delayedAbort(E.InvalidID, 'ID "'.concat(n, '" is invalid'));
                return _possible_constructor_return(_this);
            }
            n ? _this._initialize(n) : _this._api.retrieveId().then(function(e) {
                return _this._initialize(e);
            }).catch(function(e) {
                return _this._abort(E.ServerError, e);
            });
            return _possible_constructor_return(_this);
        }
        _create_class(e1, [
            {
                key: "id",
                get: function get() {
                    return this._id;
                }
            },
            {
                key: "options",
                get: function get() {
                    return this._options;
                }
            },
            {
                key: "open",
                get: function get() {
                    return this._open;
                }
            },
            {
                key: "socket",
                get: function get() {
                    return this._socket;
                }
            },
            {
                key: "connections",
                get: function get() {
                    var e = Object.create(null);
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._connections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _step_value = _sliced_to_array(_step.value, 2), t = _step_value[0], n = _step_value[1];
                            e[t] = n;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    return e;
                }
            },
            {
                key: "destroyed",
                get: function get() {
                    return this._destroyed;
                }
            },
            {
                key: "disconnected",
                get: function get() {
                    return this._disconnected;
                }
            },
            {
                key: "_createServerConnection",
                value: function _createServerConnection() {
                    var _this = this;
                    var e = new eJ(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
                    return e.on(M.Message, function(e) {
                        _this._handleMessage(e);
                    }), e.on(M.Error, function(e) {
                        _this._abort(E.SocketError, e);
                    }), e.on(M.Disconnected, function() {
                        _this.disconnected || (_this.emitError(E.Network, "Lost connection to server."), _this.disconnect());
                    }), e.on(M.Close, function() {
                        _this.disconnected || _this._abort(E.SocketClosed, "Underlying socket is already closed.");
                    }), e;
                }
            },
            {
                key: "_initialize",
                value: function _initialize(e) {
                    this._id = e, this.socket.start(e, this._options.token);
                }
            },
            {
                key: "_handleMessage",
                value: function _handleMessage(e) {
                    var t = e.type, n = e.payload, r = e.src;
                    switch(t){
                        case O.Open:
                            this._lastServerId = this.id, this._open = !0, this.emit("open", this.id);
                            break;
                        case O.Error:
                            this._abort(E.ServerError, n.msg);
                            break;
                        case O.IdTaken:
                            this._abort(E.UnavailableID, 'ID "'.concat(this.id, '" is taken'));
                            break;
                        case O.InvalidKey:
                            this._abort(E.InvalidKey, 'API KEY "'.concat(this._options.key, '" is invalid'));
                            break;
                        case O.Leave:
                            eO.log("Received leave message from ".concat(r)), this._cleanupPeer(r), this._connections.delete(r);
                            break;
                        case O.Expire:
                            this.emitError(E.PeerUnavailable, "Could not connect to peer ".concat(r));
                            break;
                        case O.Offer:
                            {
                                var _$e = n.connectionId, t1 = this.getConnection(r, _$e);
                                if (t1 && (t1.close(), eO.warn("Offer received for existing Connection ID:".concat(_$e))), n.type === P.Media) {
                                    var i = new eY(r, this, {
                                        connectionId: _$e,
                                        _payload: n,
                                        metadata: n.metadata
                                    });
                                    t1 = i, this._addConnection(r, t1), this.emit("call", i);
                                } else if (n.type === P.Data) {
                                    var i1 = new this._serializers[n.serialization](r, this, {
                                        connectionId: _$e,
                                        _payload: n,
                                        metadata: n.metadata,
                                        label: n.label,
                                        serialization: n.serialization,
                                        reliable: n.reliable
                                    });
                                    t1 = i1, this._addConnection(r, t1), this.emit("connection", i1);
                                } else {
                                    eO.warn("Received malformed connection type:".concat(n.type));
                                    return;
                                }
                                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                try {
                                    for(var _iterator = this._getMessages(_$e)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                        var n1 = _step.value;
                                        t1.handleMessage(n1);
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally{
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally{
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                                break;
                            }
                        default:
                            {
                                if (!n) {
                                    eO.warn("You received a malformed message from ".concat(r, " of type ").concat(t));
                                    return;
                                }
                                var i2 = n.connectionId, o = this.getConnection(r, i2);
                                o && o.peerConnection ? o.handleMessage(e) : i2 ? this._storeMessage(i2, e) : eO.warn("You received an unrecognized message:", e);
                            }
                    }
                }
            },
            {
                key: "_storeMessage",
                value: function _storeMessage(e, t) {
                    this._lostMessages.has(e) || this._lostMessages.set(e, []), this._lostMessages.get(e).push(t);
                }
            },
            {
                key: "_getMessages",
                value: function _getMessages(e) {
                    var t = this._lostMessages.get(e);
                    return t ? (this._lostMessages.delete(e), t) : [];
                }
            },
            {
                key: "connect",
                value: function connect(e) {
                    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                    if (t = _object_spread({
                        serialization: "default"
                    }, t), this.disconnected) {
                        eO.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), this.emitError(E.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
                        return;
                    }
                    var n = new this._serializers[t.serialization](e, this, t);
                    return this._addConnection(e, n), n;
                }
            },
            {
                key: "call",
                value: function call(e, t) {
                    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                    if (this.disconnected) {
                        eO.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), this.emitError(E.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
                        return;
                    }
                    if (!t) {
                        eO.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
                        return;
                    }
                    var r = new eY(e, this, _object_spread_props(_object_spread({}, n), {
                        _stream: t
                    }));
                    return this._addConnection(e, r), r;
                }
            },
            {
                key: "_addConnection",
                value: function _addConnection(e, t) {
                    eO.log("add connection ".concat(t.type, ":").concat(t.connectionId, " to peerId:").concat(e)), this._connections.has(e) || this._connections.set(e, []), this._connections.get(e).push(t);
                }
            },
            {
                key: "_removeConnection",
                value: function _removeConnection(e) {
                    var t = this._connections.get(e.peer);
                    if (t) {
                        var n = t.indexOf(e);
                        -1 !== n && t.splice(n, 1);
                    }
                    this._lostMessages.delete(e.connectionId);
                }
            },
            {
                key: "getConnection",
                value: function getConnection(e, t) {
                    var n = this._connections.get(e);
                    if (!n) return null;
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = n[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _$e = _step.value;
                            if (_$e.connectionId === t) return _$e;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    return null;
                }
            },
            {
                key: "_delayedAbort",
                value: function _delayedAbort(e, t) {
                    var _this = this;
                    setTimeout(function() {
                        _this._abort(e, t);
                    }, 0);
                }
            },
            {
                key: "_abort",
                value: function _abort(e, t) {
                    eO.error("Aborting!"), this.emitError(e, t), this._lastServerId ? this.disconnect() : this.destroy();
                }
            },
            {
                key: "destroy",
                value: function destroy() {
                    this.destroyed || (eO.log("Destroy peer with ID:".concat(this.id)), this.disconnect(), this._cleanup(), this._destroyed = !0, this.emit("close"));
                }
            },
            {
                key: "_cleanup",
                value: function _cleanup() {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._connections.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var e = _step.value;
                            this._cleanupPeer(e), this._connections.delete(e);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    this.socket.removeAllListeners();
                }
            },
            {
                key: "_cleanupPeer",
                value: function _cleanupPeer(e) {
                    var t = this._connections.get(e);
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    if (t) try {
                        for(var _iterator = t[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _$e = _step.value;
                            _$e.close();
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            },
            {
                key: "disconnect",
                value: function disconnect() {
                    if (this.disconnected) return;
                    var e = this.id;
                    eO.log("Disconnect peer with ID:".concat(e)), this._disconnected = !0, this._open = !1, this.socket.close(), this._lastServerId = e, this._id = null, this.emit("disconnected", e);
                }
            },
            {
                key: "reconnect",
                value: function reconnect() {
                    if (this.disconnected && !this.destroyed) eO.log("Attempting reconnection to server with ID ".concat(this._lastServerId)), this._disconnected = !1, this._initialize(this._lastServerId);
                    else if (this.destroyed) throw Error("This peer cannot reconnect to the server. It has already been destroyed.");
                    else if (this.disconnected || this.open) throw Error("Peer ".concat(this.id, " cannot reconnect because it is not disconnected from the server!"));
                    else eO.error("In a hurry? We're still trying to make the initial connection!");
                }
            },
            {
                key: "listAllPeers",
                value: function listAllPeers() {
                    var _this = this;
                    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(e) {};
                    this._api.listAllPeers().then(function(t) {
                        return e(t);
                    }).catch(function(e) {
                        return _this._abort(E.ServerError, e);
                    });
                }
            }
        ]);
        return e1;
    }(eG);
    e1.DEFAULT_KEY = "peerjs", window.peerjs = {
        Peer: e1,
        util: eM
    }, window.Peer = e1;
})(); //# sourceMappingURL=peerjs.min.js.map

