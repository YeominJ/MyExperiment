/*! UA-Web-Push: 177659c:1576868476013 */
(function (modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }

        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }

    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;

    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
        }
    };

    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
        }

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };

    __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
        var ns = Object.create(null);

        __webpack_require__.r(ns);

        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != "string")
            for (var key in value) __webpack_require__.d(ns, key, function (key) {
                return value[key];
            }.bind(null, key));
        return ns;
    };

    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };

        __webpack_require__.d(getter, "a", getter);

        return getter;
    };

    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };

    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 0);
})([function (module, exports, __webpack_require__) {
    var UaSDK = __webpack_require__(1);

    var isSupported = __webpack_require__(33);

    var secureBridge = __webpack_require__(45);

    var setupWorker = __webpack_require__(49);

    var configure = __webpack_require__(46);

    try {
        var script = document.getElementById("_uasdk");

        if (script && window[script.rel]) {
            if (typeof window[script.rel]._async_setup === "function") {
                window[script.rel]._async_setup(asyncSetup);
            } else if (typeof window[script.rel]._setup === "function") {
                window[script.rel]._setup(setup);
            }
        } else if (script && script.getAttribute("rel") === "secureBridge") {
            window.uaSetup = {
                secureBridge: secureBridge.setupBridge
            };
        }
    } catch (e) {
        if (e instanceof ReferenceError && self) {
            self.uaSetup = {
                worker: setupWorker
            };
        }
    }

    function setup() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        configure(opts);

        if (!isSupported()) {
            throw new Error("Browser is not supported");
        }

        var sdk = new UaSDK();

        sdk._legacySetup();

        return sdk;
    }

    function asyncSetup() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        configure(opts);

        if (!isSupported()) {
            throw new Error("Browser is not supported");
        }

        var sdk = new UaSDK();
        return sdk._setup().then(function () {
            return sdk;
        });
    }
}, function (module, exports, __webpack_require__) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
        }

        return _assertThisInitialized(self);
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
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
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };

        return _setPrototypeOf(o, p);
    }

    var EventTarget = __webpack_require__(2);

    var Channel = __webpack_require__(6);

    var CustomEvent = __webpack_require__(19);

    var canRegister = __webpack_require__(32);

    var isRegistrationDomain = __webpack_require__(36);

    var config = __webpack_require__(9);

    var debug = __webpack_require__(11).default;

    var db = __webpack_require__(14);

    var waitUntilActive = __webpack_require__(37).default;

    var isAfter = __webpack_require__(27);

    var isSupported = __webpack_require__(33);

    var isSafari = __webpack_require__(34);

    var isSecure = __webpack_require__(35);

    var getRegistration = __webpack_require__(38);

    var reports = __webpack_require__(22);

    var request = __webpack_require__(8);

    var secureBridge = __webpack_require__(45);

    var storage = __webpack_require__(13);

    var EVENT_TYPES = ["channel", "push", "tags"];

    var UaSDK = function (_EventTarget) {
        _inherits(UaSDK, _EventTarget);

        function UaSDK() {
            var _this;

            _classCallCheck(this, UaSDK);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(UaSDK).call(this));

            var sdk = _assertThisInitialized(_this);

            _this._channelPromise = new Promise(function (resolve) {
                _this.addEventListener("channel", function () {
                    return resolve(_this.channel);
                });
            });

            if (!isSafari() && navigator.serviceWorker) {
                _this._workerRegistration = navigator.serviceWorker.register(config.workerUrl).then(waitUntilActive).catch(function (error) {
                    return debug(error);
                });
            } else {
                _this._workerRegistration = Promise.reject("Worker registration not available in this context").catch(function (e) {
                    return debug(e);
                });
            }

            _this._channelPromise.then(heartbeat);

            _this._channelPromise.then(checkPermission);

            _this.isSupported = isSupported();
            _this.canRegister = canRegister();
            _this.isRegistrationDomain = isRegistrationDomain();

            if (!isSecure() && config.secureIframeUrl) {
                _this.setupIframe = secureBridge.setupIframe;

                _this.setupIframe(config.secureIframeUrl);
            } else {
                _this._channelPromise.then(function (channel) {
                    return reports.session(channel);
                });
            }

            _this.channel = null;
            _this.CustomEvent = CustomEvent;
            window.addEventListener("storage", storage.onStorage(function (data) {
                return _this._set(data);
            }));

            if (navigator.serviceWorker) {
                navigator.serviceWorker.addEventListener("message", function (message) {
                    debug("Push event from worker", message);

                    if (message.data.type === "push") {
                        _this.dispatchEvent({
                            type: "push",
                            push: message.data.push
                        });
                    }
                });
            }

            function heartbeat(channel) {
                var _isAfter = isAfter("heartbeat", 24),
                    after = _isAfter.after,
                    store = _isAfter.store;

                if (after) {
                    debug("SENDING heartbeat");
                    store();

                    if (channel.optedIn) {
                        sdk.register().catch(function () {
                            return channel._update();
                        });
                    } else {
                        channel._update();
                    }
                }
            }

            function checkPermission(channel) {
                if (sdk.permission && sdk.permission !== "granted" && channel.optedIn) {
                    channel.optOut();
                }
            }

            return _this;
        }

        _createClass(UaSDK, [{
            key: "_legacySetup",
            value: function _legacySetup() {
                var channel = storage.getJSON("channel");

                if (channel && channel.channel_id) {
                    this._setChannel(channel);
                }
            }
        }, {
            key: "_setup",
            value: function _setup() {
                var _this2 = this;

                var setupPromises = [];
                setupPromises.push(db.get("channel").then(function (channel) {
                    if (channel && channel.channel_id) {
                        _this2._setChannel(channel);
                    }
                }));
                return Promise.all(setupPromises);
            }
        }, {
            key: "register",
            value: function register() {
                var _this3 = this;

                var sdk = this;

                if (!this.isRegistrationDomain) {
                    return Promise.reject("Domain is not allowed for registration.");
                }

                return getRegistration(sdk).then(function (registration) {
                    if (sdk.channel) {
                        return request(sdk.channel.path, {
                            method: "put",
                            body: registration
                        });
                    }

                    return request(config.paths.cra, {
                        method: "post",
                        body: registration
                    });
                }).then(function (response) {
                    return response.json();
                }).then(function (body) {
                    debug("CRA RESPONSE", body);

                    var _isAfter2 = isAfter("heartbeat", 24),
                        store = _isAfter2.store;

                    store();

                    sdk._setChannel(body);

                    return Promise.resolve(_this3.channel);
                });
            }
        }, {
            key: "_set",
            value: function _set() {
                var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                if (data.channel) {
                    this._setChannel(data.channel);
                }

                if (data.tags) {
                    if (this.channel) {
                        this.channel.tags._load(data.tags);

                        this.channel.tags._store();
                    }
                }

                if (data.session) {
                    this._setSession(data.session);
                }
            }
        }, {
            key: "_setChannel",
            value: function _setChannel(channelData) {
                var _this4 = this;

                if (!channelData) {
                    return;
                }

                if (this.channel) {
                    this.channel._set(channelData);

                    this.channel._store();

                    return;
                }

                if (channelData && !channelData.channel_id) {
                    return;
                }

                this.channel = new Channel(channelData);

                this.channel._store();

                this.channel.addEventListener("channel", function (ev) {
                    _this4.dispatchEvent({
                        type: "channel",
                        channel: ev.channel
                    });
                });
                this.channel.tags.addEventListener("tags", function (ev) {
                    _this4.dispatchEvent({
                        type: "tags",
                        tags: ev.tags
                    });
                });

                this.channel._store();
            }
        }, {
            key: "_setSession",
            value: function _setSession(session) {
                storage.setJSON("session", session);

                this._channelPromise.then(function (channel) {
                    reports.session(channel, session);
                });
            }
        }, {
            key: "disableAnalytics",
            get: function () {
                return db.get(config.consts.DISABLE_ANALYTICS).then(function (value) {
                    return !!value;
                });
            },
            set: function (bool) {
                return db.set(config.consts.DISABLE_ANALYTICS, !!bool);
            }
        }, {
            key: "permission",
            get: function () {
                if (isSecure()) {
                    return window.Notification.permission;
                }
            }
        }]);

        return UaSDK;
    }(EventTarget.apply(void 0, EVENT_TYPES));

    module.exports = UaSDK;
}, function (module, exports, __webpack_require__) {
    "use strict";

    var Commons = __webpack_require__(3);

    var CustomEventTarget = __webpack_require__(4);

    var EventWrapper = __webpack_require__(5);

    var isObject = Commons.isObject;
    var LISTENERS = Commons.LISTENERS;
    var CAPTURE = Commons.CAPTURE;
    var BUBBLE = Commons.BUBBLE;
    var ATTRIBUTE = Commons.ATTRIBUTE;
    var newNode = Commons.newNode;
    var defineCustomEventTarget = CustomEventTarget.defineCustomEventTarget;
    var createEventWrapper = EventWrapper.createEventWrapper;
    var STOP_IMMEDIATE_PROPAGATION_FLAG = EventWrapper.STOP_IMMEDIATE_PROPAGATION_FLAG;
    var PASSIVE_LISTENER_FLAG = EventWrapper.PASSIVE_LISTENER_FLAG;
    var HAS_EVENTTARGET_INTERFACE = typeof window !== "undefined" && typeof window.EventTarget !== "undefined";

    var EventTarget = module.exports = function EventTarget() {
        if (this instanceof EventTarget) {
            Object.defineProperty(this, LISTENERS, {
                value: Object.create(null)
            });
        } else if (arguments.length === 1 && Array.isArray(arguments[0])) {
            return defineCustomEventTarget(EventTarget, arguments[0]);
        } else if (arguments.length > 0) {
            var types = Array(arguments.length);

            for (var i = 0; i < arguments.length; ++i) {
                types[i] = arguments[i];
            }

            return defineCustomEventTarget(EventTarget, types);
        } else {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    EventTarget.prototype = Object.create((HAS_EVENTTARGET_INTERFACE ? window.EventTarget : Object).prototype, {
        constructor: {
            value: EventTarget,
            writable: true,
            configurable: true
        },
        addEventListener: {
            value: function addEventListener(type, listener, options) {
                if (listener == null) {
                    return false;
                }

                if (typeof listener !== "function" && typeof listener !== "object") {
                    throw new TypeError('"listener" is not an object.');
                }

                var capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
                var kind = capture ? CAPTURE : BUBBLE;
                var node = this[LISTENERS][type];

                if (node == null) {
                    this[LISTENERS][type] = newNode(listener, kind, options);
                    return true;
                }

                var prev = null;

                while (node != null) {
                    if (node.listener === listener && node.kind === kind) {
                        return false;
                    }

                    prev = node;
                    node = node.next;
                }

                prev.next = newNode(listener, kind, options);
                return true;
            },
            configurable: true,
            writable: true
        },
        removeEventListener: {
            value: function removeEventListener(type, listener, options) {
                if (listener == null) {
                    return false;
                }

                var capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
                var kind = capture ? CAPTURE : BUBBLE;
                var prev = null;
                var node = this[LISTENERS][type];

                while (node != null) {
                    if (node.listener === listener && node.kind === kind) {
                        if (prev == null) {
                            this[LISTENERS][type] = node.next;
                        } else {
                            prev.next = node.next;
                        }

                        return true;
                    }

                    prev = node;
                    node = node.next;
                }

                return false;
            },
            configurable: true,
            writable: true
        },
        dispatchEvent: {
            value: function dispatchEvent(event) {
                var type = event.type;
                var node = this[LISTENERS][type];

                if (node == null) {
                    return true;
                }

                var wrapped = createEventWrapper(event, this);
                var prev = null;

                while (node != null) {
                    if (node.once) {
                        if (prev == null) {
                            this[LISTENERS][type] = node.next;
                        } else {
                            prev.next = node.next;
                        }
                    } else {
                        prev = node;
                    }

                    wrapped[PASSIVE_LISTENER_FLAG] = node.passive;

                    if (typeof node.listener === "function") {
                        node.listener.call(this, wrapped);
                    } else if (node.kind !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
                        node.listener.handleEvent(wrapped);
                    }

                    if (wrapped[STOP_IMMEDIATE_PROPAGATION_FLAG]) {
                        break;
                    }

                    node = node.next;
                }

                return !wrapped.defaultPrevented;
            },
            configurable: true,
            writable: true
        }
    });
}, function (module, exports, __webpack_require__) {
    "use strict";

    var createUniqueKey = module.exports.createUniqueKey = typeof Symbol !== "undefined" ? Symbol : function createUniqueKey(name) {
        return "[[" + name + "_" + Math.random().toFixed(8).slice(2) + "]]";
    };

    var isObject = module.exports.isObject = function isObject(x) {
        return typeof x === "object" && x !== null;
    };

    module.exports.LISTENERS = createUniqueKey("listeners");
    module.exports.CAPTURE = 1;
    module.exports.BUBBLE = 2;
    module.exports.ATTRIBUTE = 3;

    module.exports.newNode = function newNode(listener, kind, options) {
        var obj = isObject(options);
        return {
            listener: listener,
            kind: kind,
            once: obj && Boolean(options.once),
            passive: obj && Boolean(options.passive),
            next: null
        };
    };
}, function (module, exports, __webpack_require__) {
    "use strict";

    var Commons = __webpack_require__(3);

    var LISTENERS = Commons.LISTENERS;
    var ATTRIBUTE = Commons.ATTRIBUTE;
    var newNode = Commons.newNode;

    function getAttributeListener(eventTarget, type) {
        var node = eventTarget[LISTENERS][type];

        while (node != null) {
            if (node.kind === ATTRIBUTE) {
                return node.listener;
            }

            node = node.next;
        }

        return null;
    }

    function setAttributeListener(eventTarget, type, listener) {
        if (typeof listener !== "function" && typeof listener !== "object") {
            listener = null;
        }

        var prev = null;
        var node = eventTarget[LISTENERS][type];

        while (node != null) {
            if (node.kind === ATTRIBUTE) {
                if (prev == null) {
                    eventTarget[LISTENERS][type] = node.next;
                } else {
                    prev.next = node.next;
                }
            } else {
                prev = node;
            }

            node = node.next;
        }

        if (listener != null) {
            if (prev == null) {
                eventTarget[LISTENERS][type] = newNode(listener, ATTRIBUTE);
            } else {
                prev.next = newNode(listener, ATTRIBUTE);
            }
        }
    }

    module.exports.defineCustomEventTarget = function (EventTargetBase, types) {
        function EventTarget() {
            EventTargetBase.call(this);
        }

        var descripter = {
            constructor: {
                value: EventTarget,
                configurable: true,
                writable: true
            }
        };
        types.forEach(function (type) {
            descripter["on" + type] = {
                get: function () {
                    return getAttributeListener(this, type);
                },
                set: function (listener) {
                    setAttributeListener(this, type, listener);
                },
                configurable: true,
                enumerable: true
            };
        });
        EventTarget.prototype = Object.create(EventTargetBase.prototype, descripter);
        return EventTarget;
    };
}, function (module, exports, __webpack_require__) {
    "use strict";

    var createUniqueKey = __webpack_require__(3).createUniqueKey;

    var STOP_IMMEDIATE_PROPAGATION_FLAG = createUniqueKey("stop_immediate_propagation_flag");
    var CANCELED_FLAG = createUniqueKey("canceled_flag");
    var PASSIVE_LISTENER_FLAG = createUniqueKey("passive_listener_flag");
    var ORIGINAL_EVENT = createUniqueKey("original_event");
    var wrapperPrototypeDefinition = Object.freeze({
        stopPropagation: Object.freeze({
            value: function stopPropagation() {
                var e = this[ORIGINAL_EVENT];

                if (typeof e.stopPropagation === "function") {
                    e.stopPropagation();
                }
            },
            writable: true,
            configurable: true
        }),
        stopImmediatePropagation: Object.freeze({
            value: function stopImmediatePropagation() {
                this[STOP_IMMEDIATE_PROPAGATION_FLAG] = true;
                var e = this[ORIGINAL_EVENT];

                if (typeof e.stopImmediatePropagation === "function") {
                    e.stopImmediatePropagation();
                }
            },
            writable: true,
            configurable: true
        }),
        preventDefault: Object.freeze({
            value: function preventDefault() {
                if (this[PASSIVE_LISTENER_FLAG]) {
                    return;
                }

                if (this.cancelable === true) {
                    this[CANCELED_FLAG] = true;
                }

                var e = this[ORIGINAL_EVENT];

                if (typeof e.preventDefault === "function") {
                    e.preventDefault();
                }
            },
            writable: true,
            configurable: true
        }),
        defaultPrevented: Object.freeze({
            get: function defaultPrevented() {
                return this[CANCELED_FLAG];
            },
            enumerable: true,
            configurable: true
        })
    });
    module.exports.STOP_IMMEDIATE_PROPAGATION_FLAG = STOP_IMMEDIATE_PROPAGATION_FLAG;
    module.exports.PASSIVE_LISTENER_FLAG = PASSIVE_LISTENER_FLAG;

    module.exports.createEventWrapper = function createEventWrapper(event, eventTarget) {
        var timeStamp = typeof event.timeStamp === "number" ? event.timeStamp : Date.now();
        var propertyDefinition = {
            type: {
                value: event.type,
                enumerable: true
            },
            target: {
                value: eventTarget,
                enumerable: true
            },
            currentTarget: {
                value: eventTarget,
                enumerable: true
            },
            eventPhase: {
                value: 2,
                enumerable: true
            },
            bubbles: {
                value: Boolean(event.bubbles),
                enumerable: true
            },
            cancelable: {
                value: Boolean(event.cancelable),
                enumerable: true
            },
            timeStamp: {
                value: timeStamp,
                enumerable: true
            },
            isTrusted: {
                value: false,
                enumerable: true
            }
        };
        propertyDefinition[STOP_IMMEDIATE_PROPAGATION_FLAG] = {
            value: false,
            writable: true
        };
        propertyDefinition[CANCELED_FLAG] = {
            value: false,
            writable: true
        };
        propertyDefinition[PASSIVE_LISTENER_FLAG] = {
            value: false,
            writable: true
        };
        propertyDefinition[ORIGINAL_EVENT] = {
            value: event
        };

        if (typeof event.detail !== "undefined") {
            propertyDefinition.detail = {
                value: event.detail,
                enumerable: true
            };
        }

        return Object.create(Object.create(event, wrapperPrototypeDefinition), propertyDefinition);
    };
}, function (module, exports, __webpack_require__) {
    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
        }

        return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
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
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };

        return _setPrototypeOf(o, p);
    }

    var EventTarget = __webpack_require__(2);

    var NamedUser = __webpack_require__(7);

    var Tags = __webpack_require__(12);

    var config = __webpack_require__(9);

    var db = __webpack_require__(14);

    var registrationBase = __webpack_require__(16);

    var request = __webpack_require__(8);

    var storage = __webpack_require__(13);

    var Channel = function (_EventTarget) {
        _inherits(Channel, _EventTarget);

        function Channel() {
            var _this;

            var channelData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _classCallCheck(this, Channel);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(Channel).call(this));

            _this._set(channelData);

            return _this;
        }

        _createClass(Channel, [{
            key: "optOut",
            value: function optOut() {
                this.opt_in = false;

                this._store();

                return this._update(false).then(function () {
                    return Promise.resolve(true);
                });
            }
        }, {
            key: "toJSON",
            value: function toJSON() {
                return _extends(registrationBase(), {
                    channel_id: this.id,
                    opt_in: this.optedIn,
                    named_user_id: this.named_user_id
                });
            }
        }, {
            key: "_set",
            value: function _set(channelData) {
                this.channel_id = channelData.hasOwnProperty("channel_id") ? channelData.channel_id : this.channel_id;
                this.opt_in = channelData.hasOwnProperty("opt_in") ? channelData.opt_in : "true";
                this.named_user_id = channelData.hasOwnProperty("named_user_id") ? channelData.named_user_id : this.named_user_id;
            }
        }, {
            key: "_store",
            value: function _store() {
                var _this2 = this;

                storage.setJSON("channel", {
                    channel_id: this.id,
                    opt_in: this.optedIn,
                    named_user_id: this.named_user_id
                });
                db.set("channel", this.toJSON()).then(function () {
                    _this2.dispatchEvent({
                        type: "channel",
                        channel: _this2
                    });
                });
            }
        }, {
            key: "_update",
            value: function _update() {
                var omitOptIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
                var channel = this.toJSON();

                if (omitOptIn) {
                    delete channel.opt_in;
                }

                delete channel.named_user_id;
                return request(this.path, {
                    method: "put",
                    body: {
                        channel: channel
                    }
                });
            }
        }, {
            key: "id",
            get: function () {
                return this.channel_id;
            }
        }, {
            key: "optedIn",
            get: function () {
                try {
                    return JSON.parse(this.opt_in);
                } catch (e) {
                    return true;
                }
            }
        }, {
            key: "namedUser",
            get: function () {
                if (!this._namedUser) {
                    this._namedUser = new NamedUser(this);
                }

                return this._namedUser;
            }
        }, {
            key: "path",
            get: function () {
                return "".concat(config.paths.cra, "/").concat(this.id);
            }
        }, {
            key: "tags",
            get: function () {
                if (!this._tags) {
                    this._tags = new Tags(this.channel_id);
                }

                return this._tags;
            }
        }]);

        return Channel;
    }(EventTarget("channel"));

    module.exports = Channel;
}, function (module, exports, __webpack_require__) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    var request = __webpack_require__(8);

    var config = __webpack_require__(9);

    var NamedUser = function () {
        function NamedUser(channel) {
            _classCallCheck(this, NamedUser);

            this.channel = channel;
        }

        _createClass(NamedUser, [{
            key: "set",
            value: function set(name) {
                var existing = this.channel.named_user_id;

                if (!name || existing === name) {
                    return Promise.resolve(false);
                }

                return this._request(name, "associate");
            }
        }, {
            key: "remove",
            value: function remove() {
                var existing = this.channel.named_user_id;

                if (!existing) {
                    return Promise.resolve(false);
                }

                return this._request(null, "disassociate");
            }
        }, {
            key: "_request",
            value: function _request(name, method) {
                var _this = this;

                var path = config.paths.named_user[method];
                var body = {
                    channel_id: this.channel.id,
                    device_type: "web"
                };

                if (name) {
                    body["named_user_id"] = name;
                }

                return request(path, {
                    method: "post",
                    body: body
                }).then(function (response) {
                    _this.channel._set({
                        named_user_id: name
                    });

                    _this.channel._store();

                    return Promise.resolve(true);
                });
            }
        }, {
            key: "id",
            get: function () {
                return this.channel.named_user_id || null;
            }
        }]);

        return NamedUser;
    }();

    module.exports = NamedUser;
}, function (module, exports, __webpack_require__) {
    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    var config = __webpack_require__(9);

    var debug = __webpack_require__(11).default;

    var global;

    try {
        global = window;
    } catch (e) {
        global = self;
    }

    module.exports = function request(path, options) {
        path = "".concat(config.apiUrl).concat(path);
        var headers = {
            Accept: "application/vnd.urbanairship+json; version=3;"
        };

        if (config.appKey && config.token) {
            headers["X-UA-Appkey"] = config.appKey;
            headers.Authorization = "Bearer ".concat(config.token);
        } else if (config.appKey && config.secret) {
            var authstr = global.btoa("".concat(config.appKey, ":").concat(config.secret));
            headers.Authorization = "Basic ".concat(authstr);
        }

        options.credentials = "include";

        if (options.body) {
            headers["Content-type"] = "application/json";

            if (typeof options.body !== "string") {
                options.body = JSON.stringify(options.body);
            }
        }

        options.headers = options.headers || {};

        _extends(options.headers, headers);

        debug("REQUEST", path, options);
        return global.fetch(path, options);
    };
}, function (module, exports, __webpack_require__) {
    var VERSION = __webpack_require__(10).version;

    var API_URL = false ? undefined : "https://aswpapius.com";
    var config = {
        VERSION: VERSION,
        configured: false,
        workerUrl: "/push-worker.js",
        apiUrl: API_URL,
        storagePrefix: "_ua_sdk",
        disableAnalytics: false,
        appKey: null,
        secret: null,
        token: null,
        vapidPublicKey: null,
        debug: false,
        websitePushId: null,
        registrationDomain: null,
        secureBridgePath: null,
        skipWaiting: true,
        allowedDomains: null,
        safariServiceUrl: API_URL + "/api/safari/web-service/",
        paths: {
            cla: "/api/channels",
            cra: "/api/web-channels",
            tags: "/api/web-channels/tags/",
            custom_events: "/api/web-events/custom",
            named_user: {
                associate: "/api/named_users/associate",
                disassociate: "/api/named_users/disassociate"
            },
            reports: {
                direct: "/api/web-events/direct",
                session: "/api/web-events/session"
            }
        },
        consts: {
            DISABLE_ANALYTICS: "disable_analytics"
        }
    };
    module.exports = config;
}, function (module) {
    module.exports = JSON.parse('{"version":"1.2.1"}');
}, function (module, exports, __webpack_require__) {
    "use strict";

    var __read = this && this.__read || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
            r,
            ar = [],
            e;

        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }

        return ar;
    };

    var __spread = this && this.__spread || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

        return ar;
    };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var config = __webpack_require__(9);

    function debug() {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }

        if (config.debug) {
            console.log.apply(console, __spread(args));
        }
    }

    exports.default = debug;
}, function (module, exports, __webpack_require__) {
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function _iterableToArrayLimit(arr, i) {
        if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
            return;
        }

        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }

        return _arr;
    }

    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
        }

        return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
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
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };

        return _setPrototypeOf(o, p);
    }

    var EventTarget = __webpack_require__(2);

    var config = __webpack_require__(9);

    var debug = __webpack_require__(11).default;

    var request = __webpack_require__(8);

    var storage = __webpack_require__(13);

    var Tags = function (_EventTarget) {
        _inherits(Tags, _EventTarget);

        function Tags(channelId) {
            var _this;

            _classCallCheck(this, Tags);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(Tags).call(this));
            _this.channel_id = channelId;

            _this._load();

            return _this;
        }

        _createClass(Tags, [{
            key: "has",
            value: function has(tag) {
                var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "device";
                var groupTags = this.tagMap.get(group);
                return groupTags && groupTags.has(tag);
            }
        }, {
            key: "add",
            value: function add(tag) {
                var _this2 = this;

                var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "device";
                return new Promise(function (resolve) {
                    if (_this2.has(tag, group)) {
                        return resolve(true);
                    }

                    if (!_this2.tagMap.has(group)) {
                        _this2.tagMap.set(group, new Set([tag]));
                    } else {
                        _this2.tagMap.get(group).add(tag);
                    }

                    return resolve(_this2._send("add", [tag], group));
                });
            }
        }, {
            key: "remove",
            value: function remove(tag) {
                var _this3 = this;

                var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "device";
                return new Promise(function (resolve) {
                    if (!_this3.has(tag, group)) {
                        return resolve(true);
                    }

                    if (_this3.tagMap.has(group)) {
                        _this3.tagMap.get(group).delete(tag);
                    }

                    return resolve(_this3._send("remove", [tag], group));
                });
            }
        }, {
            key: "set",
            value: function set(newTags) {
                var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "device";
                this.tagMap.set(group, new Set(newTags));
                return this._send("set", newTags, group);
            }
        }, {
            key: "_load",
            value: function _load() {
                var storedTags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storage.getJSON("tags");
                var tags = new Map();

                try {
                    if (storedTags) {
                        for (var _i = 0, _Object$keys = Object.keys(storedTags); _i < _Object$keys.length; _i++) {
                            var group = _Object$keys[_i];
                            tags.set(group, new Set(storedTags[group]));
                        }
                    }
                } catch (err) {
                    debug("Error loading tags:", err);
                }

                this.tagMap = tags;
                return this.tagMap;
            }
        }, {
            key: "_fetch",
            value: function _fetch() {
                var _this4 = this;

                return request("".concat(config.paths.cla, "/").concat(this.channel_id), {
                    method: "get"
                }).then(function (response) {
                    return response.json();
                }).then(function (body) {
                    debug("Tags from server");

                    if (body.channel.tags) {
                        _this4.tagMap.set("device", new Set(body.channel.tags));
                    }

                    for (var _i2 = 0, _Object$keys2 = Object.keys(body.channel.tag_groups); _i2 < _Object$keys2.length; _i2++) {
                        var group = _Object$keys2[_i2];

                        _this4.tagMap.set(group, new Set(body.channel.tag_groups[group]));
                    }

                    _this4._store();

                    return _this4.tagMap;
                });
            }
        }, {
            key: "_send",
            value: function _send(verb, tags, group) {
                var body = {
                    audience: {
                        web_channel: this.channel_id
                    }
                };
                body[verb] = {};
                body[verb][group] = tags;

                this._store();

                return request(config.paths.tags, {
                    method: "post",
                    body: body
                }).then(function (response) {
                    return response.ok;
                });
            }
        }, {
            key: "_store",
            value: function _store() {
                var newTags = this.list;

                if (newTags !== this._tagList) {
                    storage.setJSON("tags", newTags);
                    this._tagList = newTags;
                    this.dispatchEvent({
                        type: "tags",
                        tags: newTags
                    });
                }
            }
        }, {
            key: "list",
            get: function () {
                var tagObj = {};
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.tagMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _ref3 = _step.value;

                        var _ref2 = _slicedToArray(_ref3, 2);

                        var _group = _ref2[0];
                        var _tags = _ref2[1];

                        if (_tags.size) {
                            tagObj[_group] = Array.from(_tags);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return tagObj;
            }
        }]);

        return Tags;
    }(EventTarget("tags"));

    module.exports = Tags;
}, function (module, exports, __webpack_require__) {
    var config = __webpack_require__(9);

    var EVENT_TYPES = ["tags", "channel"];
    module.exports = {
        set: function (key, value) {
            return window.localStorage.setItem(keyName(key), value);
        },
        get: function (key) {
            return window.localStorage.getItem(keyName(key));
        },
        setJSON: function (key, value) {
            return this.set(key, JSON.stringify(value));
        },
        getJSON: function (key) {
            return JSON.parse(this.get(key));
        },
        remove: function (key) {
            return window.localStorage.removeItem(keyName(key));
        },
        onStorage: function (ready) {
            return function onStorage(ev) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = EVENT_TYPES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _type = _step.value;
                        var key = "".concat(config.storagePrefix, ":").concat(_type);

                        if (ev.key === key) {
                            var data = {};
                            data[_type] = JSON.parse(ev.newValue);
                            ready(data);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            };
        }
    };

    function keyName(key) {
        return "".concat(config.storagePrefix, ":").concat(key);
    }
}, function (module, exports, __webpack_require__) {
    var config = __webpack_require__(9);

    var createDbModule = __webpack_require__(15);

    var db = createDbModule(function () {
        return "".concat(config.storagePrefix, ":db");
    }, "blob", {
        keyPath: "type"
    }, function (ev) {
        return ev.target.result.value;
    }, 1);
    module.exports = db;
}, function (module, exports, __webpack_require__) {
    var debug = __webpack_require__(11).default;

    var global;

    try {
        global = window;
    } catch (e) {
        global = self;
    }

    module.exports = createDbModule;

    function createDbModule(getDbName, store, storeOpts, resultMapper, dbVersion) {
        var DB;

        function getDB() {
            if (DB) {
                return DB;
            }

            DB = new Promise(function (resolve, reject) {
                var request = global.indexedDB.open(getDbName(), dbVersion);
                request.addEventListener("upgradeneeded", function (ev) {
                    var db = ev.target.result;

                    try {
                        db.createObjectStore(store, storeOpts);
                    } catch (err) {
                        debug('Error when "upgrading" indexedDB', err);
                    }
                });
                request.addEventListener("success", function (ev) {
                    return resolve(request.result);
                });
                request.addEventListener("error", function (ev) {
                    return reject(ev);
                });
            });
            return DB;
        }

        function getObjectStore(db) {
            var writable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var readwrite = writable ? "readwrite" : "readonly";
            return db.transaction([store], readwrite).objectStore(store);
        }

        function requestToPromise(request) {
            var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (ev) {
                return ev.target.result;
            };
            var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (ev) {
                return ev.target.error;
            };
            return new Promise(function (resolve, reject) {
                request.addEventListener("success", function (ev) {
                    return resolve(success(ev));
                });
                request.addEventListener("error", function (ev) {
                    return reject(error(ev));
                });
            });
        }

        function get(key) {
            return getDB().then(function (db) {
                return requestToPromise(getObjectStore(db).get(key), function (ev) {
                    if (ev.target.result === undefined) {
                        return undefined;
                    }

                    return resultMapper(ev);
                });
            });
        }

        function set(key, value) {
            return getDB().then(function (db) {
                if (!storeOpts.keyPath) {
                    return requestToPromise(getObjectStore(db, true).put(value, key));
                }

                return requestToPromise(getObjectStore(db, true).put({
                    type: key,
                    value: value
                }));
            });
        }

        function remove(key) {
            return getDB().then(function (db) {
                return requestToPromise(getObjectStore(db, true).delete(key));
            });
        }

        return {
            getDB: getDB,
            getObjectStore: getObjectStore,
            requestToPromise: requestToPromise,
            get: get,
            set: set,
            remove: remove
        };
    }
}, function (module, exports, __webpack_require__) {
    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function _iterableToArrayLimit(arr, i) {
        if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
            return;
        }

        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }

        return _arr;
    }

    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }

    var bowser = __webpack_require__(17);

    var config = __webpack_require__(9);

    var SUPPORTED_BROWSERS = ["chrome", "edge", "firefox", "opera", "safari"];

    module.exports = function getRegistrationBase() {
        var windowOpts = {};

        try {
            var localeOptions = window.Intl.DateTimeFormat().resolvedOptions();
            var timezone = localeOptions.timeZone;

            var _localeOptions$locale = localeOptions.locale.split("-"),
                _localeOptions$locale2 = _slicedToArray(_localeOptions$locale, 2),
                locale_language = _localeOptions$locale2[0],
                locale_country = _localeOptions$locale2[1];

            windowOpts = {
                timezone: timezone,
                locale_country: locale_country,
                locale_language: locale_language
            };
        } catch (e) {}

        var user_agent_string = navigator.userAgent;
        var browser_name = getBrowserName(bowser.name);
        var browser_version = "".concat(browser_name, "-").concat(Number(bowser.version));
        var browser_type = bowser.mobile || bowser.tablet ? "mobile" : "desktop";
        var web_sdk_version = config.VERSION;
        return _extends(windowOpts, {
            device_type: "web",
            opt_in: true,
            web: {
                user_agent_string: user_agent_string,
                browser_name: browser_name,
                browser_version: browser_version,
                browser_type: browser_type,
                web_sdk_version: web_sdk_version
            }
        });
    };

    function getBrowserName(name) {
        name = name.toLowerCase();

        if (!SUPPORTED_BROWSERS.includes(name)) {
            return "unknown";
        }

        return name;
    }
}, function (module, exports, __webpack_require__) {
    ! function (root, name, definition) {
        if (true && module.exports) module.exports = definition();
        else if (true) __webpack_require__(18)(name, definition);
        else {}
    }(this, "bowser", function () {
        var t = true;

        function detect(ua) {
            function getFirstMatch(regex) {
                var match = ua.match(regex);
                return match && match.length > 1 && match[1] || "";
            }

            function getSecondMatch(regex) {
                var match = ua.match(regex);
                return match && match.length > 1 && match[2] || "";
            }

            var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
                likeAndroid = /like android/i.test(ua),
                android = !likeAndroid && /android/i.test(ua),
                nexusMobile = /nexus\s*[0-6]\s*/i.test(ua),
                nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua),
                chromeos = /CrOS/.test(ua),
                silk = /silk/i.test(ua),
                sailfish = /sailfish/i.test(ua),
                tizen = /tizen/i.test(ua),
                webos = /(web|hpw)(o|0)s/i.test(ua),
                windowsphone = /windows phone/i.test(ua),
                samsungBrowser = /SamsungBrowser/i.test(ua),
                windows = !windowsphone && /windows/i.test(ua),
                mac = !iosdevice && !silk && /macintosh/i.test(ua),
                linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua),
                edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
                versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
                tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua),
                mobile = !tablet && /[^-]mobi/i.test(ua),
                xbox = /xbox/i.test(ua),
                result;

            if (/opera/i.test(ua)) {
                result = {
                    name: "Opera",
                    opera: t,
                    version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/opr\/|opios/i.test(ua)) {
                result = {
                    name: "Opera",
                    opera: t,
                    version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
                };
            } else if (/SamsungBrowser/i.test(ua)) {
                result = {
                    name: "Samsung Internet for Android",
                    samsungBrowser: t,
                    version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/Whale/i.test(ua)) {
                result = {
                    name: "NAVER Whale browser",
                    whale: t,
                    version: getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/MZBrowser/i.test(ua)) {
                result = {
                    name: "MZ Browser",
                    mzbrowser: t,
                    version: getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/coast/i.test(ua)) {
                result = {
                    name: "Opera Coast",
                    coast: t,
                    version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/focus/i.test(ua)) {
                result = {
                    name: "Focus",
                    focus: t,
                    version: getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/yabrowser/i.test(ua)) {
                result = {
                    name: "Yandex Browser",
                    yandexbrowser: t,
                    version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/ucbrowser/i.test(ua)) {
                result = {
                    name: "UC Browser",
                    ucbrowser: t,
                    version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/mxios/i.test(ua)) {
                result = {
                    name: "Maxthon",
                    maxthon: t,
                    version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/epiphany/i.test(ua)) {
                result = {
                    name: "Epiphany",
                    epiphany: t,
                    version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/puffin/i.test(ua)) {
                result = {
                    name: "Puffin",
                    puffin: t,
                    version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
                };
            } else if (/sleipnir/i.test(ua)) {
                result = {
                    name: "Sleipnir",
                    sleipnir: t,
                    version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/k-meleon/i.test(ua)) {
                result = {
                    name: "K-Meleon",
                    kMeleon: t,
                    version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (windowsphone) {
                result = {
                    name: "Windows Phone",
                    osname: "Windows Phone",
                    windowsphone: t
                };

                if (edgeVersion) {
                    result.msedge = t;
                    result.version = edgeVersion;
                } else {
                    result.msie = t;
                    result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
                }
            } else if (/msie|trident/i.test(ua)) {
                result = {
                    name: "Internet Explorer",
                    msie: t,
                    version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                };
            } else if (chromeos) {
                result = {
                    name: "Chrome",
                    osname: "Chrome OS",
                    chromeos: t,
                    chromeBook: t,
                    chrome: t,
                    version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                };
            } else if (/edg([ea]|ios)/i.test(ua)) {
                result = {
                    name: "Microsoft Edge",
                    msedge: t,
                    version: edgeVersion
                };
            } else if (/vivaldi/i.test(ua)) {
                result = {
                    name: "Vivaldi",
                    vivaldi: t,
                    version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
                };
            } else if (sailfish) {
                result = {
                    name: "Sailfish",
                    osname: "Sailfish OS",
                    sailfish: t,
                    version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                };
            } else if (/seamonkey\//i.test(ua)) {
                result = {
                    name: "SeaMonkey",
                    seamonkey: t,
                    version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
                };
            } else if (/firefox|iceweasel|fxios/i.test(ua)) {
                result = {
                    name: "Firefox",
                    firefox: t,
                    version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
                };

                if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                    result.firefoxos = t;
                    result.osname = "Firefox OS";
                }
            } else if (silk) {
                result = {
                    name: "Amazon Silk",
                    silk: t,
                    version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
                };
            } else if (/phantom/i.test(ua)) {
                result = {
                    name: "PhantomJS",
                    phantom: t,
                    version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
                };
            } else if (/slimerjs/i.test(ua)) {
                result = {
                    name: "SlimerJS",
                    slimer: t,
                    version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
                };
            } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
                result = {
                    name: "BlackBerry",
                    osname: "BlackBerry OS",
                    blackberry: t,
                    version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                };
            } else if (webos) {
                result = {
                    name: "WebOS",
                    osname: "WebOS",
                    webos: t,
                    version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                };
                /touchpad\//i.test(ua) && (result.touchpad = t);
            } else if (/bada/i.test(ua)) {
                result = {
                    name: "Bada",
                    osname: "Bada",
                    bada: t,
                    version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
                };
            } else if (tizen) {
                result = {
                    name: "Tizen",
                    osname: "Tizen",
                    tizen: t,
                    version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
                };
            } else if (/qupzilla/i.test(ua)) {
                result = {
                    name: "QupZilla",
                    qupzilla: t,
                    version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
                };
            } else if (/chromium/i.test(ua)) {
                result = {
                    name: "Chromium",
                    chromium: t,
                    version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
                };
            } else if (/chrome|crios|crmo/i.test(ua)) {
                result = {
                    name: "Chrome",
                    chrome: t,
                    version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                };
            } else if (android) {
                result = {
                    name: "Android",
                    version: versionIdentifier
                };
            } else if (/safari|applewebkit/i.test(ua)) {
                result = {
                    name: "Safari",
                    safari: t
                };

                if (versionIdentifier) {
                    result.version = versionIdentifier;
                }
            } else if (iosdevice) {
                result = {
                    name: iosdevice == "iphone" ? "iPhone" : iosdevice == "ipad" ? "iPad" : "iPod"
                };

                if (versionIdentifier) {
                    result.version = versionIdentifier;
                }
            } else if (/googlebot/i.test(ua)) {
                result = {
                    name: "Googlebot",
                    googlebot: t,
                    version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
                };
            } else {
                result = {
                    name: getFirstMatch(/^(.*)\/(.*) /),
                    version: getSecondMatch(/^(.*)\/(.*) /)
                };
            }

            if (!result.msedge && /(apple)?webkit/i.test(ua)) {
                if (/(apple)?webkit\/537\.36/i.test(ua)) {
                    result.name = result.name || "Blink";
                    result.blink = t;
                } else {
                    result.name = result.name || "Webkit";
                    result.webkit = t;
                }

                if (!result.version && versionIdentifier) {
                    result.version = versionIdentifier;
                }
            } else if (!result.opera && /gecko\//i.test(ua)) {
                result.name = result.name || "Gecko";
                result.gecko = t;
                result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
            }

            if (!result.windowsphone && (android || result.silk)) {
                result.android = t;
                result.osname = "Android";
            } else if (!result.windowsphone && iosdevice) {
                result[iosdevice] = t;
                result.ios = t;
                result.osname = "iOS";
            } else if (mac) {
                result.mac = t;
                result.osname = "macOS";
            } else if (xbox) {
                result.xbox = t;
                result.osname = "Xbox";
            } else if (windows) {
                result.windows = t;
                result.osname = "Windows";
            } else if (linux) {
                result.linux = t;
                result.osname = "Linux";
            }

            function getWindowsVersion(s) {
                switch (s) {
                    case "NT":
                        return "NT";

                    case "XP":
                        return "XP";

                    case "NT 5.0":
                        return "2000";

                    case "NT 5.1":
                        return "XP";

                    case "NT 5.2":
                        return "2003";

                    case "NT 6.0":
                        return "Vista";

                    case "NT 6.1":
                        return "7";

                    case "NT 6.2":
                        return "8";

                    case "NT 6.3":
                        return "8.1";

                    case "NT 10.0":
                        return "10";

                    default:
                        return undefined;
                }
            }

            var osVersion = "";

            if (result.windows) {
                osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i));
            } else if (result.windowsphone) {
                osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
            } else if (result.mac) {
                osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
                osVersion = osVersion.replace(/[_\s]/g, ".");
            } else if (iosdevice) {
                osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
                osVersion = osVersion.replace(/[_\s]/g, ".");
            } else if (android) {
                osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
            } else if (result.webos) {
                osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
            } else if (result.blackberry) {
                osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
            } else if (result.bada) {
                osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
            } else if (result.tizen) {
                osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
            }

            if (osVersion) {
                result.osversion = osVersion;
            }

            var osMajorVersion = !result.windows && osVersion.split(".")[0];

            if (tablet || nexusTablet || iosdevice == "ipad" || android && (osMajorVersion == 3 || osMajorVersion >= 4 && !mobile) || result.silk) {
                result.tablet = t;
            } else if (mobile || iosdevice == "iphone" || iosdevice == "ipod" || android || nexusMobile || result.blackberry || result.webos || result.bada) {
                result.mobile = t;
            }

            if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.vivaldi && result.version >= 1 || result.chrome && result.version >= 20 || result.samsungBrowser && result.version >= 4 || result.whale && compareVersions([result.version, "1.0"]) === 1 || result.mzbrowser && compareVersions([result.version, "6.0"]) === 1 || result.focus && compareVersions([result.version, "1.0"]) === 1 || result.firefox && result.version >= 20 || result.safari && result.version >= 6 || result.opera && result.version >= 10 || result.ios && result.osversion && result.osversion.split(".")[0] >= 6 || result.blackberry && result.version >= 10.1 || result.chromium && result.version >= 20) {
                result.a = t;
            } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20 || result.safari && result.version < 6 || result.opera && result.version < 10 || result.ios && result.osversion && result.osversion.split(".")[0] < 6 || result.chromium && result.version < 20) {
                result.c = t;
            } else result.x = t;

            return result;
        }

        var bowser = detect(typeof navigator !== "undefined" ? navigator.userAgent || "" : "");

        bowser.test = function (browserList) {
            for (var i = 0; i < browserList.length; ++i) {
                var browserItem = browserList[i];

                if (typeof browserItem === "string") {
                    if (browserItem in bowser) {
                        return true;
                    }
                }
            }

            return false;
        };

        function getVersionPrecision(version) {
            return version.split(".").length;
        }

        function map(arr, iterator) {
            var result = [],
                i;

            if (Array.prototype.map) {
                return Array.prototype.map.call(arr, iterator);
            }

            for (i = 0; i < arr.length; i++) {
                result.push(iterator(arr[i]));
            }

            return result;
        }

        function compareVersions(versions) {
            var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
            var chunks = map(versions, function (version) {
                var delta = precision - getVersionPrecision(version);
                version = version + new Array(delta + 1).join(".0");
                return map(version.split("."), function (chunk) {
                    return new Array(20 - chunk.length).join("0") + chunk;
                }).reverse();
            });

            while (--precision >= 0) {
                if (chunks[0][precision] > chunks[1][precision]) {
                    return 1;
                } else if (chunks[0][precision] === chunks[1][precision]) {
                    if (precision === 0) {
                        return 0;
                    }
                } else {
                    return -1;
                }
            }
        }

        function isUnsupportedBrowser(minVersions, strictMode, ua) {
            var _bowser = bowser;

            if (typeof strictMode === "string") {
                ua = strictMode;
                strictMode = void 0;
            }

            if (strictMode === void 0) {
                strictMode = false;
            }

            if (ua) {
                _bowser = detect(ua);
            }

            var version = "" + _bowser.version;

            for (var browser in minVersions) {
                if (minVersions.hasOwnProperty(browser)) {
                    if (_bowser[browser]) {
                        if (typeof minVersions[browser] !== "string") {
                            throw new Error("Browser version in the minVersion map should be a string: " + browser + ": " + String(minVersions));
                        }

                        return compareVersions([version, minVersions[browser]]) < 0;
                    }
                }
            }

            return strictMode;
        }

        function check(minVersions, strictMode, ua) {
            return !isUnsupportedBrowser(minVersions, strictMode, ua);
        }

        bowser.isUnsupportedBrowser = isUnsupportedBrowser;
        bowser.compareVersions = compareVersions;
        bowser.check = check;
        bowser._detect = detect;
        bowser.detect = detect;
        return bowser;
    });
}, function (module, exports) {
    module.exports = function () {
        throw new Error("define cannot be used indirect");
    };
}, function (module, exports, __webpack_require__) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    var isIsoDate = __webpack_require__(20);

    var location = __webpack_require__(21);

    var storage = __webpack_require__(13);

    var request = __webpack_require__(8);

    var config = __webpack_require__(9);

    var shouldReport = __webpack_require__(22).shouldReport;

    var MAX_STRING_LENGTH = 255;
    var MAX_PROPERTY_ARRAY_LENGTH = 20;
    var MAX_PROPERTIES = 100;

    var CustomEvent = function () {
        function CustomEvent(name) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var transactionId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

            _classCallCheck(this, CustomEvent);

            if (!name) {
                throw new ReferenceError("argument: `name` is required.");
            }

            this._channel = storage.getJSON("channel") || {};

            if (!this._channel.channel_id) {
                throw new ReferenceError("You must have a registered channel to send events.");
            }

            this._name = name;
            this.value = value;
            this.properties = properties;
            this.transactionId = transactionId;
            this.interactionId = location().href;
            this.interactionType = "url";
        }

        _createClass(CustomEvent, [{
            key: "_prepareProperties",
            value: function _prepareProperties() {
                return this.properties;
            }
        }, {
            key: "_prepareInteractionId",
            value: function _prepareInteractionId() {
                var _this = this;

                if (this.interactionId === location().href && this.interactionId.length <= 255) {
                    return Promise.resolve(false);
                }

                var buffer = new window.TextEncoder("utf-8").encode(this.interactionId);
                return window.crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
                    var digest = Array.from(new Uint8Array(hash)).map(function (b) {
                        return ("0" + b.toString(16)).slice(-2);
                    }).join("");
                    _this.interactionId = "".concat(_this.interactionId.slice(0, 230), "...").concat(digest.slice(0, 20));
                    return true;
                });
            }
        }, {
            key: "validate",
            value: function validate() {
                if (Object.keys(this.properties).length > MAX_PROPERTIES) {
                    throw new RangeError("CustomEvent: Can not have more than ".concat(MAX_PROPERTIES, " properties."));
                }

                var stringProperties = ["name", "transactionId", "interactionId", "interactionId"];
                checkStrings(this, stringProperties);
                checkStrings(this.properties, Object.keys(this.properties), "CustomEvent.properties", false);

                function checkStrings(obj, keys) {
                    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "CustomEvent";
                    var stringsOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _str = _step.value;
                            var val = obj[_str];

                            if (val !== undefined) {
                                if (stringsOnly) {
                                    if (typeof val !== "string") {
                                        throw new TypeError("".concat(name, ".").concat(_str, " must be a string"));
                                    }
                                } else {
                                    var type = typeof val;

                                    if (!(type === "string" || type === "number" || type === "boolean" || Array.isArray(val))) {
                                        throw new TypeError("".concat(name, ".").concat(_str, " must be one of String, Number, Boolean or Array"));
                                    }
                                }

                                if (typeof val === "string" && val.length > MAX_STRING_LENGTH) {
                                    throw new RangeError("".concat(name, ".").concat(_str, " has a ").concat(MAX_STRING_LENGTH, " character limit"));
                                }

                                if (Array.isArray(val)) {
                                    if (val.some(function (s) {
                                            return typeof s !== "string" || s.length > MAX_STRING_LENGTH;
                                        })) {
                                        throw new TypeError("".concat(name, ".").concat(_str, ": Array properties may only contain strings less than ").concat(MAX_STRING_LENGTH, " characters in length"));
                                    }

                                    if (val.length > MAX_PROPERTY_ARRAY_LENGTH) {
                                        throw new RangeError("".concat(name, ".").concat(_str, ": Array properties have a max-length of ").concat(MAX_PROPERTY_ARRAY_LENGTH));
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        }, {
            key: "_validateBooleanProperty",
            value: function _validateBooleanProperty(prop) {
                if (this.properties && this.properties.hasOwnProperty(prop) && typeof this.properties[prop] !== "boolean") {
                    throw new TypeError("CustomEvent property '".concat(prop, "' must be a Boolean"));
                }
            }
        }, {
            key: "_validateIsoDateProperty",
            value: function _validateIsoDateProperty(prop) {
                if (this.properties && this.properties.hasOwnProperty(prop) && !isIsoDate(this.properties[prop])) {
                    throw new TypeError("CustomEvent property '".concat(prop, "' must be an ISO_8601 date string"));
                }
            }
        }, {
            key: "toJSON",
            value: function toJSON() {
                var session = storage.getJSON("session") || {};
                var user = {
                    web_channel: this._channel.channel_id
                };
                var occurred = "".concat(new Date().toISOString().split(".")[0], "Z");
                var send_id = session.send_id;
                var body = {
                    name: this.name,
                    value: this.value,
                    transaction: this.transactionId,
                    interaction_id: this.interactionId,
                    interaction_type: this.interactionType,
                    template_type: this.templateType,
                    session_id: session.id
                };

                var properties = this._prepareProperties();

                if (Object.keys(properties).length) {
                    body.properties = properties;
                }

                return {
                    occurred: occurred,
                    user: user,
                    send_id: send_id,
                    body: body
                };
            }
        }, {
            key: "track",
            value: function track() {
                var _this2 = this;

                return shouldReport(this._channel.opt_in).then(function (should) {
                    if (!should) {
                        return {
                            ok: false,
                            message: "Channel is not opted in or analytics are disabled."
                        };
                    }

                    return _this2._prepareInteractionId().then(function () {
                        _this2.validate();

                        return request(config.paths.custom_events, {
                            method: "post",
                            body: _this2.toJSON()
                        }).then(function (resp) {
                            return resp.json();
                        });
                    });
                });
            }
        }, {
            key: "value",
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value) {
                    value = Number(value);

                    if (Number.isNaN(value) || typeof value !== "number") {
                        throw new TypeError("`value` must be a number");
                    }
                }

                this._value = value;
            }
        }, {
            key: "name",
            get: function () {
                return this._name;
            }
        }]);

        return CustomEvent;
    }();

    module.exports = CustomEvent;
    module.exports.templates = {
        account: __webpack_require__(29),
        media: __webpack_require__(30),
        retail: __webpack_require__(31)
    };
}, function (module, exports) {
    module.exports = isIsodate;
    var matcher = new RegExp("^\\d{4}-\\d{2}-\\d{2}" + "((T\\d{2}:\\d{2}(:\\d{2})?)" + "(\\.\\d{1,6})?" + "(Z|(\\+|-)\\d{2}:\\d{2})?)?$");

    function isIsodate(string) {
        return typeof string === "string" && matcher.test(string) && !isNaN(Date.parse(string));
    }
}, function (module, exports) {
    module.exports = function () {
        return window.location;
    };
}, function (module, exports, __webpack_require__) {
    var uuid = __webpack_require__(23);

    var config = __webpack_require__(9);

    var db = __webpack_require__(14);

    var request = __webpack_require__(8);

    var storage = __webpack_require__(13);

    var isAfter = __webpack_require__(27);

    var getSendId = __webpack_require__(28);

    module.exports = {
        direct: direct,
        session: session,
        sendSession: sendSession,
        getSession: getSession,
        shouldReport: shouldReport
    };

    function direct(channel, send_id) {
        return shouldReport(channel.optedIn).then(function (should) {
            if (!should) {
                return false;
            }

            var path = config.paths.reports.direct;
            var body = {
                channel: channel.toJSON(),
                send_id: send_id
            };
            return request(path, {
                method: "post",
                body: body
            });
        });
    }

    function session(channel, _sessionObj) {
        if (_sessionObj) {
            return sendSession(channel, _sessionObj);
        }

        return getSession().then(function (sessionObj) {
            return sessionObj && sendSession(channel, sessionObj);
        });
    }

    function sendSession(channel, sessionObj) {
        return shouldReport(channel.optedIn).then(function (should) {
            if (!should) {
                return false;
            }

            var body = {
                session_id: sessionObj.id,
                send_id: sessionObj.send_id,
                channel: channel.toJSON()
            };
            storage.setJSON("session", sessionObj);
            return request(config.paths.reports.session, {
                method: "post",
                body: body
            });
        });
    }

    function getSession() {
        var _isAfter = isAfter("activity", .5),
            after = _isAfter.after,
            store = _isAfter.store;

        store();
        return getSendId().then(function (sendId) {
            if (sendId || after) {
                var sessionId = uuid();
                return {
                    id: sessionId,
                    send_id: sendId
                };
            }
        });
    }

    function shouldReport(optedIn) {
        if (!optedIn || config.disableAnalytics) {
            return Promise.resolve(false);
        }

        return db.get(config.consts.DISABLE_ANALYTICS).then(function (disabled) {
            return !disabled;
        });
    }
}, function (module, exports, __webpack_require__) {
    var rng = __webpack_require__(24);

    var bytesToUuid = __webpack_require__(26);

    function v4(options, buf, offset) {
        var i = buf && offset || 0;

        if (typeof options == "string") {
            buf = options == "binary" ? new Array(16) : null;
            options = null;
        }

        options = options || {};
        var rnds = options.random || (options.rng || rng)();
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;

        if (buf) {
            for (var ii = 0; ii < 16; ++ii) {
                buf[i + ii] = rnds[ii];
            }
        }

        return buf || bytesToUuid(rnds);
    }

    module.exports = v4;
}, function (module, exports, __webpack_require__) {
    (function (global) {
        var rng;
        var crypto = global.crypto || global.msCrypto;

        if (crypto && crypto.getRandomValues) {
            var rnds8 = new Uint8Array(16);

            rng = function whatwgRNG() {
                crypto.getRandomValues(rnds8);
                return rnds8;
            };
        }

        if (!rng) {
            var rnds = new Array(16);

            rng = function () {
                for (var i = 0, r; i < 16; i++) {
                    if ((i & 3) === 0) r = Math.random() * 4294967296;
                    rnds[i] = r >>> ((i & 3) << 3) & 255;
                }

                return rnds;
            };
        }

        module.exports = rng;
    }).call(this, __webpack_require__(25));
}, function (module, exports) {
    var g;

    g = function () {
        return this;
    }();

    try {
        g = g || new Function("return this")();
    } catch (e) {
        if (typeof window === "object") g = window;
    }

    module.exports = g;
}, function (module, exports) {
    var byteToHex = [];

    for (var i = 0; i < 256; ++i) {
        byteToHex[i] = (i + 256).toString(16).substr(1);
    }

    function bytesToUuid(buf, offset) {
        var i = offset || 0;
        var bth = byteToHex;
        return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
    }

    module.exports = bytesToUuid;
}, function (module, exports, __webpack_require__) {
    var storage = __webpack_require__(13);

    module.exports = isAfter;

    function isAfter(key, hours) {
        key = "last_".concat(key);
        var HOUR = 1e3 * 60 * 60;
        var now = +new Date();
        var lastActivity = storage.getJSON(key);

        var store = function () {
            return storage.setJSON(key, now);
        };

        var after = !lastActivity || now - lastActivity > HOUR * hours;
        return {
            store: store,
            after: after
        };
    }
}, function (module, exports, __webpack_require__) {
    var db = __webpack_require__(14);

    var DELTA = 20 * 1e3;

    module.exports = function getSendId() {
        var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
        return db.get("last_send_id").then(function (result) {
            if (result && now - result.timestamp <= DELTA) {
                return db.remove("last_send_id").then(function () {
                    return result.id;
                });
            }
        });
    };
}, function (module, exports, __webpack_require__) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
        }

        return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
    }

    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        } else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);

                if (!base) return;
                var desc = Object.getOwnPropertyDescriptor(base, property);

                if (desc.get) {
                    return desc.get.call(receiver);
                }

                return desc.value;
            };
        }

        return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
        }

        return object;
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
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
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };

        return _setPrototypeOf(o, p);
    }

    var CustomEvent = __webpack_require__(19);

    var RegisterEvent = function (_CustomEvent) {
        _inherits(RegisterEvent, _CustomEvent);

        function RegisterEvent(value, properties, transactionId) {
            var _this;

            _classCallCheck(this, RegisterEvent);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(RegisterEvent).call(this, "registered_account", value, properties, transactionId));
            _this.templateType = "account";
            return _this;
        }

        _createClass(RegisterEvent, [{
            key: "_prepareProperties",
            value: function _prepareProperties() {
                if (this.value) {
                    this.properties.ltv = true;
                }

                return _get(_getPrototypeOf(RegisterEvent.prototype), "_prepareProperties", this).call(this);
            }
        }]);

        return RegisterEvent;
    }(CustomEvent);

    module.exports = {
        RegisterEvent: RegisterEvent
    };
}, function (module, exports, __webpack_require__) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
        }

        return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
    }

    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        } else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);

                if (!base) return;
                var desc = Object.getOwnPropertyDescriptor(base, property);

                if (desc.get) {
                    return desc.get.call(receiver);
                }

                return desc.value;
            };
        }

        return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
        }

        return object;
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
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
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };

        return _setPrototypeOf(o, p);
    }

    var CustomEvent = __webpack_require__(19);

    var MediaEvent = function (_CustomEvent) {
        _inherits(MediaEvent, _CustomEvent);

        function MediaEvent(name, value, properties, transactionId) {
            var _this;

            _classCallCheck(this, MediaEvent);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(MediaEvent).call(this, name, value, properties, transactionId));
            _this.templateType = "media";
            return _this;
        }

        _createClass(MediaEvent, [{
            key: "validate",
            value: function validate() {
                this._validateBooleanProperty("feature");

                this._validateIsoDateProperty("published_date");

                return _get(_getPrototypeOf(MediaEvent.prototype), "validate", this).call(this);
            }
        }, {
            key: "_prepareProperties",
            value: function _prepareProperties() {
                if (this.value) {
                    this.properties.ltv = true;
                }

                return _get(_getPrototypeOf(MediaEvent.prototype), "_prepareProperties", this).call(this);
            }
        }]);

        return MediaEvent;
    }(CustomEvent);

    var BrowsedContentEvent = function (_MediaEvent) {
        _inherits(BrowsedContentEvent, _MediaEvent);

        function BrowsedContentEvent(value, properties, transactionId) {
            _classCallCheck(this, BrowsedContentEvent);

            return _possibleConstructorReturn(this, _getPrototypeOf(BrowsedContentEvent).call(this, "browsed_content", value, properties, transactionId));
        }

        return BrowsedContentEvent;
    }(MediaEvent);

    var ConsumedContentEvent = function (_MediaEvent2) {
        _inherits(ConsumedContentEvent, _MediaEvent2);

        function ConsumedContentEvent(value, properties, transactionId) {
            _classCallCheck(this, ConsumedContentEvent);

            return _possibleConstructorReturn(this, _getPrototypeOf(ConsumedContentEvent).call(this, "consumed_content", value, properties, transactionId));
        }

        return ConsumedContentEvent;
    }(MediaEvent);

    var StarredContentEvent = function (_MediaEvent3) {
        _inherits(StarredContentEvent, _MediaEvent3);

        function StarredContentEvent(value, properties, transactionId) {
            _classCallCheck(this, StarredContentEvent);

            return _possibleConstructorReturn(this, _getPrototypeOf(StarredContentEvent).call(this, "starred_content", value, properties, transactionId));
        }

        return StarredContentEvent;
    }(MediaEvent);

    var SharedContentEvent = function (_MediaEvent4) {
        _inherits(SharedContentEvent, _MediaEvent4);

        function SharedContentEvent(source, medium, properties, transactionId) {
            var _this2;

            _classCallCheck(this, SharedContentEvent);

            _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SharedContentEvent).call(this, "shared_content", undefined, properties, transactionId));
            _this2.properties.source = source;
            _this2.properties.medium = medium;
            return _this2;
        }

        return SharedContentEvent;
    }(MediaEvent);

    module.exports = {
        _MediaEvent: MediaEvent,
        BrowsedContentEvent: BrowsedContentEvent,
        ConsumedContentEvent: ConsumedContentEvent,
        StarredContentEvent: StarredContentEvent,
        SharedContentEvent: SharedContentEvent
    };
}, function (module, exports, __webpack_require__) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
        }

        return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
    }

    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        } else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);

                if (!base) return;
                var desc = Object.getOwnPropertyDescriptor(base, property);

                if (desc.get) {
                    return desc.get.call(receiver);
                }

                return desc.value;
            };
        }

        return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
        }

        return object;
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
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
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };

        return _setPrototypeOf(o, p);
    }

    var CustomEvent = __webpack_require__(19);

    var RetailEvent = function (_CustomEvent) {
        _inherits(RetailEvent, _CustomEvent);

        function RetailEvent(name, value, properties, transactionId) {
            var _this;

            _classCallCheck(this, RetailEvent);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(RetailEvent).call(this, name, value, properties, transactionId));
            _this.templateType = "retail";
            return _this;
        }

        _createClass(RetailEvent, [{
            key: "validate",
            value: function validate() {
                this._validateBooleanProperty("new_item");

                return _get(_getPrototypeOf(RetailEvent.prototype), "validate", this).call(this);
            }
        }]);

        return RetailEvent;
    }(CustomEvent);

    var BrowsedEvent = function (_RetailEvent) {
        _inherits(BrowsedEvent, _RetailEvent);

        function BrowsedEvent(value, properties, transactionId) {
            _classCallCheck(this, BrowsedEvent);

            return _possibleConstructorReturn(this, _getPrototypeOf(BrowsedEvent).call(this, "browsed", value, properties, transactionId));
        }

        return BrowsedEvent;
    }(RetailEvent);

    var AddedToCartEvent = function (_RetailEvent2) {
        _inherits(AddedToCartEvent, _RetailEvent2);

        function AddedToCartEvent(value, properties, transactionId) {
            _classCallCheck(this, AddedToCartEvent);

            return _possibleConstructorReturn(this, _getPrototypeOf(AddedToCartEvent).call(this, "added_to_cart", value, properties, transactionId));
        }

        return AddedToCartEvent;
    }(RetailEvent);

    var PurchasedEvent = function (_RetailEvent3) {
        _inherits(PurchasedEvent, _RetailEvent3);

        function PurchasedEvent(value, properties, transactionId) {
            _classCallCheck(this, PurchasedEvent);

            return _possibleConstructorReturn(this, _getPrototypeOf(PurchasedEvent).call(this, "purchased", value, properties, transactionId));
        }

        _createClass(PurchasedEvent, [{
            key: "_prepareProperties",
            value: function _prepareProperties() {
                if (this.value) {
                    this.properties.ltv = true;
                }

                return _get(_getPrototypeOf(PurchasedEvent.prototype), "_prepareProperties", this).call(this);
            }
        }]);

        return PurchasedEvent;
    }(RetailEvent);

    var StarredProductEvent = function (_RetailEvent4) {
        _inherits(StarredProductEvent, _RetailEvent4);

        function StarredProductEvent(value, properties, transactionId) {
            _classCallCheck(this, StarredProductEvent);

            return _possibleConstructorReturn(this, _getPrototypeOf(StarredProductEvent).call(this, "starred_product", value, properties, transactionId));
        }

        return StarredProductEvent;
    }(RetailEvent);

    var SharedProductEvent = function (_RetailEvent5) {
        _inherits(SharedProductEvent, _RetailEvent5);

        function SharedProductEvent(source, medium, properties, transactionId) {
            var _this2;

            _classCallCheck(this, SharedProductEvent);

            _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SharedProductEvent).call(this, "shared_product", undefined, properties, transactionId));
            _this2.properties.source = source;
            _this2.properties.medium = medium;
            return _this2;
        }

        return SharedProductEvent;
    }(RetailEvent);

    module.exports = {
        _RetailEvent: RetailEvent,
        AddedToCartEvent: AddedToCartEvent,
        BrowsedEvent: BrowsedEvent,
        PurchasedEvent: PurchasedEvent,
        StarredProductEvent: StarredProductEvent,
        SharedProductEvent: SharedProductEvent
    };
}, function (module, exports, __webpack_require__) {
    var isSupported = __webpack_require__(33);

    var isSecure = __webpack_require__(35);

    var isRegistrationDomain = __webpack_require__(36);

    module.exports = function canRegister() {
        return !!(isSupported() && isSecure() && isRegistrationDomain() && Notification.permission !== "denied");
    };
}, function (module, exports, __webpack_require__) {
    var isSafari = __webpack_require__(34);

    var config = __webpack_require__(9);

    module.exports = function isSupported() {
        var isChrome = navigator.userAgent.match(/Chrome\/(\d\d)\./);

        if (isChrome && Number(isChrome[1]) < 52) {
            return false;
        }

        var isDesktopEdge = navigator.userAgent.match(/Windows NT.*Edge/i);

        if (isDesktopEdge) {
            return false;
        }

        return !!(window.PushManager || isSafari() && config.websitePushId && "pushNotification" in window.safari);
    };
}, function (module, exports) {
    var global;

    try {
        global = window;
    } catch (e) {
        global = self;
    }

    module.exports = function () {
        return "safari" in global;
    };
}, function (module, exports) {
    module.exports = function isSecure() {
        var secureContext = window.isSecureContext;

        if (typeof secureContext !== "undefined") {
            return secureContext;
        }

        return !!window.location.protocol.match("https");
    };
}, function (module, exports, __webpack_require__) {
    var config = __webpack_require__(9);

    module.exports = function isRegistrationDomain() {
        var hostname = window.location.hostname;
        return !config.registrationDomain || hostname === config.registrationDomain;
    };
}, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var ACTIVE_STATES = ["activating", "activated"];

    function waitUntilActive(registration) {
        return new Promise(function (resolve, reject) {
            if (registration.active) {
                resolve(registration);
            }

            var inactiveWorker = registration.installing || registration.waiting;

            if (inactiveWorker) {
                inactiveWorker.addEventListener("statechange", function () {
                    if (ACTIVE_STATES.includes(inactiveWorker.state)) {
                        resolve(registration);
                    }
                });
            } else {
                reject("Service worker in an unknown state");
            }
        });
    }

    exports.default = waitUntilActive;
}, function (module, exports, __webpack_require__) {
    var isSafari = __webpack_require__(34);

    var getSafariSubscription = __webpack_require__(39);

    var getVapidSubscription = __webpack_require__(40);

    var getSafariData = __webpack_require__(43);

    var getVapidData = __webpack_require__(44);

    module.exports = function getRegistration(sdk) {
        if (isSafari()) {
            return getSafariSubscription(sdk).then(getSafariData);
        }

        return sdk._workerRegistration.then(getVapidSubscription).then(getVapidData);
    };
}, function (module, exports, __webpack_require__) {
    var config = __webpack_require__(9);

    module.exports = function getSafariSubscription(sdk) {
        return new Promise(function (resolve, reject) {
            window.safari.pushNotification.requestPermission(new window.URL("".concat(config.appKey, "/"), config.safariServiceUrl).href, config.websitePushId, {}, function (data) {
                if (data.permission === "granted") {
                    return resolve(data);
                }

                reject("Registration failed - permission denied");
            });
        });
    };
}, function (module, exports, __webpack_require__) {
    var config = __webpack_require__(9);

    var compareArrays = __webpack_require__(41).default;

    var urlBase64ToUint8Array = __webpack_require__(42);

    module.exports = function getSubscriptions(registration) {
        return registration.pushManager.getSubscription().then(function (subscription) {
            var vapidKey = urlBase64ToUint8Array(config.vapidPublicKey);

            if (subscription) {
                if (compareArrays(new Uint8Array(subscription.options.applicationServerKey), vapidKey)) {
                    return subscription;
                } else {
                    return subscription.unsubscribe().then(function (success) {
                        return newSubscription();
                    });
                }
            }

            return newSubscription();

            function newSubscription() {
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: vapidKey
                });
            }
        });
    };
}, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function compareArrays(a1, a2) {
        return a1.length === a2.length && a1.every(function (val, i) {
            return val === a2[i];
        });
    }

    exports.default = compareArrays;
}, function (module, exports) {
    var global;

    try {
        global = window;
    } catch (e) {
        global = self;
    }

    module.exports = function urlBase64ToUint8Array(base64String) {
        var padding = "=".repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
        var rawData = global.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    };
}, function (module, exports, __webpack_require__) {
    var getBase = __webpack_require__(16);

    module.exports = function getSafariData(subscription) {
        var channel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getBase();
        channel.push_address = subscription.deviceToken;
        channel.web.subscription = {
            subscription_type: "apns"
        };
        return {
            channel: channel
        };
    };
}, function (module, exports, __webpack_require__) {
    var getBase = __webpack_require__(16);

    module.exports = function getVapidData(subscription) {
        var channel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getBase();
        channel.push_address = subscription.endpoint;
        channel.web.subscription = subscription.toJSON().keys;
        return {
            channel: channel
        };
    };
}, function (module, exports, __webpack_require__) {
    var config = __webpack_require__(9);

    var configure = __webpack_require__(46);

    var storage = __webpack_require__(13);

    var reports = __webpack_require__(22);

    var _require = __webpack_require__(48),
        getMessageDataFrom = _require.getMessageDataFrom,
        debounceMessage = _require.debounceMessage;

    var db = __webpack_require__(14);

    module.exports = {
        setupBridge: setupBridge,
        setupIframe: setupIframe
    };

    function getTargetOrigin(allowedDomains) {
        if (Array.isArray(allowedDomains) && allowedDomains.length) {
            var params = new URL(window.location.href).searchParams;
            var secondaryOrigin = params.get("__ua_secondary_origin");

            if (!secondaryOrigin) {
                throw new Error("Secondary origin not specified. Missing `__ua_secondary_origin` query parameter.");
            }

            if (!allowedDomains.includes(secondaryOrigin)) {
                throw new Error("Secondary origin not allowed. Got: " + secondaryOrigin + ". Allowed: " + JSON.stringify(allowedDomains));
            }

            return secondaryOrigin;
        }

        return "http://".concat(window.location.host);
    }

    function setupBridge(opts) {
        if (window.location.protocol !== "https:") {
            throw new Error("The secure bridge must be run on an HTTPS domain that " + "is shared with the push registration page.");
        }

        configure(opts);
        var targetOrigin = getTargetOrigin(opts.allowedDomains);
        var channelPromise = db.get("channel");
        var tags = storage.getJSON("tags");
        channelPromise.then(function (channel) {
            post({
                channel: channel,
                tags: tags
            });

            if (channel) {
                reports.getSession().then(function (session) {
                    if (session) {
                        storage.setJSON("session", session);
                        post({
                            session: session
                        });
                    }
                });
            }
        });
        window.addEventListener("storage", storage.onStorage(post));
        window.addEventListener("message", debounceMessage(onMessage, targetOrigin));

        function onMessage(data) {
            if (data.tags) {
                storage.setJSON("tags", data.tags);
            }

            if (data.channel) {
                db.set("channel", data.channel);
            }
        }

        function post(objs) {
            window.parent.postMessage(prefixObject(objs), targetOrigin);
        }
    }

    function setupIframe(url) {
        var secureHost = config.secureHost;
        var sdk = this;
        var el = document.createElement("iframe");
        var ready = new Promise(function (resolve) {
            el.onload = function () {
                return resolve(el);
            };
        });
        var finalUrl = new URL(url);
        finalUrl.searchParams.append("__ua_secondary_origin", window.location.origin);
        el.style.display = "none";
        el.src = finalUrl.toString();
        document.body.appendChild(el);
        window.addEventListener("message", onMessage);
        sdk.addEventListener("tags", function (ev) {
            queue({
                tags: ev.tags
            });
        });
        sdk.addEventListener("channel", function () {
            db.get("channel").then(function (result) {
                queue({
                    channel: result
                });
            });
        });

        function onMessage(ev) {
            var data = getMessageDataFrom(ev, secureHost);

            sdk._set(data);
        }

        function queue(obj) {
            ready.then(function (frame) {
                frame.contentWindow.postMessage(prefixObject(obj), secureHost);
            });
        }
    }

    function prefixObject(obj) {
        var data = {};
        data[config.storagePrefix] = obj;
        return data;
    }
}, function (module, exports, __webpack_require__) {
    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    var config = __webpack_require__(9);

    var buildSecureURL = __webpack_require__(47);

    var global;

    try {
        global = window;
    } catch (e) {
        global = self;
    }

    module.exports = function configure() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (config.configured) {
            return config;
        }

        delete opts.paths;
        delete opts.consts;

        _extends(config, opts);

        config.storagePrefix = global.btoa("".concat(config.storagePrefix, ":").concat(config.appKey, ":").concat(config.workerUrl));
        config.secureBridgeUrl = buildSecureURL(config);

        if (config.registrationDomain) {
            config.secureHost = "https://".concat(config.registrationDomain);
        } else if (config.secureIframeUrl) {
            config.secureHost = new URL(config.secureIframeUrl).origin;
        }

        config.configured = true;
        return config;
    };
}, function (module, exports) {
    module.exports = function buildSecureBridgeURL(config) {
        if (config.secureBridgeUrl) {
            return config.secureBridgeUrl;
        }

        if (config.registrationDomain && config.secureBridgePath) {
            return new URL(config.secureBridgePath, "https://".concat(config.registrationDomain)).href;
        }

        return null;
    };
}, function (module, exports, __webpack_require__) {
    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    var config = __webpack_require__(9);

    module.exports = {
        getMessageDataFrom: getMessageDataFrom,
        debounceMessage: debounceMessage
    };

    function debounceMessage(onMessage, fromHost) {
        var timeout;
        var cache = {};
        return function call(ev) {
            clearTimeout(timeout);
            var data = getMessageDataFrom(ev, fromHost);

            _extends(cache, data);

            timeout = setTimeout(function () {
                onMessage(cache);
                cache = {};
            }, 20);
        };
    }

    function getMessageDataFrom(ev, fromHost) {
        var data = ev.data[config.storagePrefix];

        if (fromHost !== "*" && ev.origin !== fromHost || !data) {
            return {};
        }

        return data;
    }
}, function (module, exports, __webpack_require__) {
    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function _iterableToArrayLimit(arr, i) {
        if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
            return;
        }

        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }

        return _arr;
    }

    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }

    var Channel = __webpack_require__(6);

    var config = __webpack_require__(9);

    var configure = __webpack_require__(46);

    var debug = __webpack_require__(11).default;

    var db = __webpack_require__(14);

    var getChannelId = __webpack_require__(50).default;

    var getAccId = __webpack_require__(51).default;

    var registrationData = __webpack_require__(44);

    var reports = __webpack_require__(22);

    var request = __webpack_require__(8);

    var subscribe = __webpack_require__(40);

    var _require = __webpack_require__(53),
        isAccPayload = _require.isAccPayload,
        mapFromAccPayload = _require.default;

    module.exports = setupWorker;

    function setupWorker(self) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        configure(opts);
        self.addEventListener("push", function (ev) {
            var now = Date.now() / 1e3;
            var payload = ev.data ? ev.data.json() : {};
            var promises = [];

            if (payload.expiry && payload.expiry < now) {
                return ev.waitUntil(clearExpiredNotifications());
            }

            var payloadPromise = isAccPayload(payload) ? mapFromAccPayload(payload) : Promise.resolve(payload);
            ev.waitUntil(process());

            function process() {
                return payloadPromise.then(function (payload) {
                    promises.push(sendToClients(payload));
                    var title = payload.title || config.defaultTitle;
                    var requireInteraction = payload.require_interaction || false;
                    var sendId = payload.send_id;

                    if (payload.body) {
                        promises.push(self.registration.showNotification(title, {
                            body: payload.body,
                            icon: payload.icon || config.defaultIcon,
                            image: payload.image,
                            data: payload,
                            requireInteraction: requireInteraction
                        }));
                    }

                    return Promise.all(promises).catch(function (err) {
                        return console.error("error processing notification", err);
                    }).then(function () {
                        return clearExpiredNotifications(sendId);
                    }).catch(function (err) {
                        return console.error("error clearing notifications", err);
                    });
                });
            }

            function clearExpiredNotifications(sendId) {
                return self.registration.getNotifications().then(function (notifications) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = notifications[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _notification = _step.value;

                            if (sendId && _notification.data.send_id === sendId) {
                                continue;
                            }

                            if (_notification.data.expiry && _notification.data.expiry < now) {
                                _notification.close();
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                });
            }
        });
        self.addEventListener("notificationclick", function (ev) {
            ev.notification.close();
            var data = ev.notification.data;
            var action = data.action || {};
            var link = action["^u"] || action["^d_a"] || action["^p_a"] || config.defaultActionURL;
            var channelId = data.channel_id;
            var sendId = data.send_id;
            var promises = [];

            if (link && self.clients.openWindow) {
                promises.push(self.clients.openWindow(link));
            }

            if (channelId) {
                promises.push(handleTags(channelId, data.action));
            }

            if (sendId && channelId) {
                promises.push(reports.direct(new Channel({
                    channel_id: channelId
                }), sendId), storeSendId(sendId));
            }

            ev.waitUntil(Promise.all(promises));
        });
        self.addEventListener("install", function (ev) {
            function registrationError(err) {
                debug("Unable to migrate registration on service worker startup.", "Proceeding with installation.", err);
            }

            function handleRegistration() {
                return Promise.all([getChannelId(), getAccId()]).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        channelId = _ref2[0],
                        accId = _ref2[1];

                    if (channelId || !self.registration.active) {
                        return;
                    }

                    return subscribe(self.registration).then(function (subscription) {
                        return register(subscription, accId).then(function (response) {
                            return response.json();
                        }).then(function (body) {
                            debug("CRA response", body);
                            return saveChannel(body);
                        });
                    }).catch(registrationError);
                });
            }

            function saveChannel(channelBody) {
                var channel = new Channel(channelBody);
                return db.set("channel", channel.toJSON());
            }

            if (config.skipWaiting) {
                self.skipWaiting();
            }

            ev.waitUntil(handleRegistration());
        });
        self.addEventListener("activate", function (ev) {
            ev.waitUntil(self.clients.claim());
        });
        self.addEventListener("pushsubscriptionchange", function () {
            subscribe(self.registration).then(function (subscription) {
                getChannelId().then(function (channelId) {
                    if (!channelId) {
                        return;
                    }

                    return updateChannel(subscription, channelId);
                });
            });
        });

        function updateChannel(subscription, channelId) {
            var registration = registrationData(subscription);
            var path = "".concat(config.paths.cra, "/").concat(channelId);
            return request(path, {
                method: "put",
                body: registration
            });
        }

        function register(subscription, accengageId) {
            var regOpts = accengageId ? {
                identity_hints: {
                    accengage_device_id: accengageId
                }
            } : {};
            var registration = registrationData(subscription);
            registration = _extends(registration, regOpts);
            return request(config.paths.cra, {
                method: "post",
                body: registration
            });
        }

        function sendToClients(payload) {
            var msg = {
                type: "push",
                push: payload
            };
            return self.clients.matchAll().then(function (clients) {
                clients.forEach(function (client) {
                    return client.postMessage(msg);
                });
            });
        }

        function handleTags(channelId) {
            var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var add = arrayify(action["^+t"]);
            var remove = arrayify(action["^-t"]);
            var body = {
                audience: {
                    channel: channelId
                }
            };

            if (!add && !remove) {
                return Promise.resolve(true);
            }

            if (add) {
                body.add = {
                    device: add
                };
            }

            if (remove) {
                body.remove = {
                    device: remove
                };
            }

            return request(config.paths.tags, {
                method: "post",
                body: body
            }).then(function (response) {
                return response.ok;
            });

            function arrayify(value) {
                if (typeof value === "string") {
                    return [value];
                }

                return value;
            }
        }

        function storeSendId(id) {
            var timestamp = Date.now();
            return db.set("last_send_id", {
                id: id,
                timestamp: timestamp
            });
        }
    }
}, function (module, exports, __webpack_require__) {
    "use strict";

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
        return new(P || (P = Promise))(function (resolve, reject) {
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
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    var __generator = this && this.__generator || function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
            return this;
        }), g;

        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }

        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");

            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];

                switch (op[0]) {
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
                        op = [0];
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
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }

            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var db = __webpack_require__(14);

    var debug_1 = __webpack_require__(11);

    function getChannelId() {
        return __awaiter(this, void 0, void 0, function () {
            var channel, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);

                        return [4, db.get("channel")];

                    case 1:
                        channel = _a.sent();
                        return [2, channel && channel.channel_id ? channel.channel_id : undefined];

                    case 2:
                        err_1 = _a.sent();
                        debug_1.default("Error fetching channel ID from indexedDB", err_1);
                        return [3, 3];

                    case 3:
                        return [2];
                }
            });
        });
    }

    exports.default = getChannelId;
}, function (module, exports, __webpack_require__) {
    "use strict";

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
        return new(P || (P = Promise))(function (resolve, reject) {
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
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    var __generator = this && this.__generator || function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
            return this;
        }), g;

        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }

        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");

            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];

                switch (op[0]) {
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
                        op = [0];
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
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }

            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var db = __webpack_require__(52);

    var debug_1 = __webpack_require__(11);

    function getAccId() {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);

                        return [4, db.get("me")];

                    case 1:
                        user = _a.sent();
                        return [2, user && user.UDID ? user.UDID : undefined];

                    case 2:
                        err_1 = _a.sent();
                        debug_1.default("Error fetching Accengage ID from indexedDB", err_1);
                        return [3, 3];

                    case 3:
                        return [2];
                }
            });
        });
    }

    exports.default = getAccId;
}, function (module, exports, __webpack_require__) {
    var createDbModule = __webpack_require__(15);

    var db = createDbModule(function () {
        return "ACC";
    }, "settings", {}, function (ev) {
        return ev.target.result;
    }, 2);
    module.exports = db;
}, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var querystring_1 = __webpack_require__(54);

    var get = __webpack_require__(14).get;

    function isAirshipPayload(payload) {
        return "channel_id" in payload && typeof payload.channel_id === "string" && typeof payload.send_id === "string";
    }

    exports.isAirshipPayload = isAirshipPayload;

    function isAccPayload(payload) {
        return "a4sid" in payload && typeof payload.a4sid === "string";
    }

    exports.isAccPayload = isAccPayload;

    function buildUrl(payload) {
        if (payload && payload.onClick) {
            var url = payload.onClick.url;
            var params = payload.onClick.params;

            if (params && Object.keys(params).length) {
                url += url.includes("?") ? "&" : "?";
                url += querystring_1.stringify(params);
            }

            return url;
        }
    }

    function retrieveChannelId() {
        return get("channel").then(function (channel) {
            if (!channel || !channel.channel_id) {
                return;
            }

            return channel.channel_id;
        });
    }

    function mapFromAccPayload(payload) {
        return retrieveChannelId().then(function (channelId) {
            var uaPayload = {
                channel_id: channelId,
                body: payload.body || undefined,
                title: payload.title || undefined,
                data: {},
                icon: payload.icon || undefined,
                send_id: undefined,
                require_interaction: "reqInt" in payload && Boolean(payload.reqInt),
                action: {
                    "^u": buildUrl(payload)
                }
            };

            if ("a4sbigpicture" in payload) {
                uaPayload.image = payload.a4sbigpicture;
            }

            return uaPayload;
        });
    }

    exports.default = mapFromAccPayload;
}, function (module, exports, __webpack_require__) {
    "use strict";

    exports.decode = exports.parse = __webpack_require__(55);
    exports.encode = exports.stringify = __webpack_require__(56);
}, function (module, exports, __webpack_require__) {
    "use strict";

    function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    module.exports = function (qs, sep, eq, options) {
        sep = sep || "&";
        eq = eq || "=";
        var obj = {};

        if (typeof qs !== "string" || qs.length === 0) {
            return obj;
        }

        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1e3;

        if (options && typeof options.maxKeys === "number") {
            maxKeys = options.maxKeys;
        }

        var len = qs.length;

        if (maxKeys > 0 && len > maxKeys) {
            len = maxKeys;
        }

        for (var i = 0; i < len; ++i) {
            var x = qs[i].replace(regexp, "%20"),
                idx = x.indexOf(eq),
                kstr,
                vstr,
                k,
                v;

            if (idx >= 0) {
                kstr = x.substr(0, idx);
                vstr = x.substr(idx + 1);
            } else {
                kstr = x;
                vstr = "";
            }

            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);

            if (!hasOwnProperty(obj, k)) {
                obj[k] = v;
            } else if (isArray(obj[k])) {
                obj[k].push(v);
            } else {
                obj[k] = [obj[k], v];
            }
        }

        return obj;
    };

    var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
    };
}, function (module, exports, __webpack_require__) {
    "use strict";

    var stringifyPrimitive = function (v) {
        switch (typeof v) {
            case "string":
                return v;

            case "boolean":
                return v ? "true" : "false";

            case "number":
                return isFinite(v) ? v : "";

            default:
                return "";
        }
    };

    module.exports = function (obj, sep, eq, name) {
        sep = sep || "&";
        eq = eq || "=";

        if (obj === null) {
            obj = undefined;
        }

        if (typeof obj === "object") {
            return map(objectKeys(obj), function (k) {
                var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

                if (isArray(obj[k])) {
                    return map(obj[k], function (v) {
                        return ks + encodeURIComponent(stringifyPrimitive(v));
                    }).join(sep);
                } else {
                    return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                }
            }).join(sep);
        }

        if (!name) return "";
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
    };

    var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
    };

    function map(xs, f) {
        if (xs.map) return xs.map(f);
        var res = [];

        for (var i = 0; i < xs.length; i++) {
            res.push(f(xs[i], i));
        }

        return res;
    }

    var objectKeys = Object.keys || function (obj) {
        var res = [];

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
        }

        return res;
    };
}]);