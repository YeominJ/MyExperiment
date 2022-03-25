! function (e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var r = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) n.d(i, r, function (t) {
                return e[t]
            }.bind(null, r));
        return i
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 19)
}({
    0: function (e, t) {
        let n = {
            copy: function (e, t, n, i) {
                n = !1 !== n;
                for (let r in t)
                    if (t.hasOwnProperty(r) && (void 0 === e[r] || n)) {
                        if (i && null == t[r]) continue;
                        e[r] = t[r]
                    } return e
            },
            setDebugMode: function (e) {
                localStorage.setItem("_subscribers_debug_mode", e)
            },
            incrementPageViews: function () {
                let e = JSON.parse(sessionStorage.getItem("_subscribers_user_session"));
                e && e.lst + 18e5 > Date.now() ? (e.pv = e.pv + 1, e.lst = Date.now()) : e = {
                    lst: Date.now(),
                    pv: 1
                }, sessionStorage.setItem("_subscribers_user_session", JSON.stringify(e))
            },
            getPageViews: function () {
                let e = JSON.parse(sessionStorage.getItem("_subscribers_user_session"));
                if (e && e.pv) return e.pv
            },
            fetch: async function (e) {
                if (!e) return;
                const t = await fetch(e);
                return await t.json()
            },
            getCookie: function (e) {
                let t = e + "=",
                    n = decodeURIComponent(document.cookie).split(";");
                for (let e = 0; e < n.length; e++) {
                    let i = n[e];
                    for (;
                        " " == i.charAt(0);) i = i.substring(1);
                    if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
                }
                return null
            },
            setCookie: function (e) {
                document.cookie = e + ";path=/"
            },
            subCountCalculator: function (e) {
                let t = " subscribers",
                    n = 1,
                    i = "",
                    r = e || 0;
                return r >= 1e3 && r < 1e6 ? (i = "K", n = 1e3) : r >= 1e6 && r < 1e9 ? (i = "M", n = 1e6) : r >= 1e9 && r < 1e12 && (i = "B", n = 1e9), t = Math.floor(10 * r / n) / 10 + i + t, t
            },
            getSWPath: function () {
                return window.subscribersServiceWorkerPath ? window.subscribersServiceWorkerPath : window.Squarespace ? "/scripts/firebase-messaging-sw.js" : "/firebase-messaging-sw.js"
            },
            verifySite() {
                const e = "https://app.subscribers.com/api/v1/external/verify/?uuid=" + subscribersApp.subscribersSiteId;
                fetch(e)
            },
            urlBase64ToUint8Array: function (e) {
                const t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"),
                    n = atob(t),
                    i = new Uint8Array(n.length);
                for (let e = 0; e < n.length; ++e) i[e] = n.charCodeAt(e);
                return i
            },
            base64Encode: function (e) {
                return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (function (e, t) {
                    return String.fromCharCode("0x" + t)
                })))
            },
            processCustomCSS: function (e) {
                let t = e.replace(/}/g, "}\n").trim().split("\n");
                for (let e = 0; e < t.length; e++) {
                    let n = t[e],
                        i = n.split("{"),
                        r = i[0].trim();
                    r += r, n = r + "{" + i[1], t[e] = n
                }
                return t.join("")
            },
            daysToString: function (e) {
                let t = new Date,
                    n = new Date(t);
                return n.setDate(t.getDate() + e), n.toUTCString()
            },
            clientData: function () {
                let e = "safari" in window,
                    t = "opera" in window,
                    n = "chrome" in window,
                    i = "netscape" in window,
                    r = "Intl" in window ? Intl.DateTimeFormat().resolvedOptions().timeZone : null;
                return {
                    origin: window.location.href,
                    subscriptionCategories: window.subscribersApp.subscriptionCategories,
                    userAgent: navigator.userAgent,
                    appName: navigator.appName,
                    appVersion: navigator.appVersion,
                    vendor: navigator.vendor,
                    vendorSub: navigator.vendorSub,
                    platform: navigator.platform,
                    language: navigator.language,
                    languages: navigator.languages,
                    opera: t,
                    safari: e,
                    chrome: n,
                    netscape: i,
                    timezoneOffset: (new Date).getTimezoneOffset(),
                    timezone: r,
                    ...window.subscribersApp.geolocation
                }
            },
            getTokenFromEndpoint: function (e) {
                return e.match(/([^\/]*)\/*$/)[1]
            },
            logSubscribe: function (e) {
                fetch("https://hi.subscribers.com/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain;charset=UTF-8"
                    },
                    body: JSON.stringify(e)
                }).catch((function (e) {
                    console.log("Error in logging event", e)
                }))
            },
            logUnsubscribe: function (e) {
                fetch("https://hi.subscribers.com/unsubscribe/" + e.uuid + "/" + e.subscriber_uuid, {
                    method: "GET",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=UTF-8"
                    }
                }).catch((function (e) {
                    console.log("Error in logging event", e)
                }))
            },
            track: function (e) {
                function t(e) {
                    let t = [];
                    for (let n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                    let n = "&" + t.join("&");
                    return "&" !== n ? n : ""
                }

                function n(e, n) {
                    let i = "https://hi.subscribers.com",
                        r = (new Date).getTime();
                    return i += "/" + e.join("/"), i + "?v=1.5.1&t=" + r + t(n)
                }
                let i = [].slice.call(arguments, 1),
                    r = i[i.length - 1];
                r instanceof Object && !(r instanceof Array) ? i = i.slice(0, i.length - 1) : r = null;
                let s = [e],
                    o = s.concat(i);
                return fetch(n(o, r), {
                    mode: "no-cors"
                }).catch((function () {
                    "error" !== e && this.track("error", "Error on sending event: " + e)
                }))
            },
            updateSubscriptionCategories: function () {
                subscribersApp.subscriptionCategories = [], document.querySelectorAll(".subscribers-category-checkbox").forEach((function (e) {
                    e.checked && subscribersApp.subscriptionCategories.push(e.value)
                }));
                let e = document.getElementsByClassName("subscribers-cta-button")[0];
                subscribersApp.subscriptionCategories && 0 == subscribersApp.subscriptionCategories.length ? (e.disabled = !0, e.style.backgroundColor = "#ccc", e.style.cursor = "not-allowed") : subscribersApp.subscriptionCategories.length > 0 && (e.disabled = !1, e.style.backgroundColor = "#" + subscribersApp.effectiveConfigs.effectiveModalConfig.accent, e.style.cursor = "pointer")
            }
        };
        e.exports = n
    },
    19: function (e, t, n) {
        let i = n(0);
        const r = "amp-web-push-subscription-state",
            s = "amp-web-push-subscribe",
            o = "amp-web-push-unsubscribe",
            a = new URL(self.location).searchParams.get("subscribersSiteId");

        function c(e) {
            var t = indexedDB.open("SUBSCRIBERS_PUSH", 1);
            t.onupgradeneeded = function (e) {
                e.target.result.createObjectStore("user", {
                    keyPath: "id"
                })
            }, t.onsuccess = function (t) {
                var n = t.target.result;
                n.onerror = function (e) {
                    console.log("Error in indexedDB", e.target.error)
                }, "function" == typeof e && e(n)
            }
        }

        function u(e) {
            c((function (t) {
                var n = t.transaction(["user"], "readwrite").objectStore("user");
                n.get("web-push").onsuccess = function (r) {
                    var s = r.target.result;
                    if (s && (s.id && "granted" === s.permission && s.permission !== Notification.permission || e)) {
                        let e = {
                            service: s.service,
                            uuid: s.uuid,
                            vendor: s.vendor,
                            subscriber_uuid: s.subscriber_uuid,
                            token: i.getTokenFromEndpoint(s.subscription.endpoint)
                        };
                        i.logUnsubscribe(e), s.permission = Notification.permission, n.put(s), t.close()
                    }
                }
            }))
        }

        function l(e) {
            self.registration.pushManager.getSubscription().then((function (t) {
                t ? c((function (n) {
                    var r = n.transaction(["user"], "readwrite").objectStore("user");
                    r.get("web-push").onsuccess = function (s) {
                        let o = s.target.result,
                            a = e;
                        a.id = "web-push", a.permission = "granted", a.subscription = t.toJSON(), a.subscriber_uuid = a.subscriber_uuid || o.subscriber_uuid, r.put(a), n.close();
                        let c = {
                            service: e.service,
                            token: i.getTokenFromEndpoint(t.endpoint),
                            uuid: e.uuid,
                            vendor: e.vendor,
                            subscription_json: e.subscription,
                            metaData: e.metaData || o.metaData,
                            subscriber_uuid: e.subscriber_uuid || o.subscriber_uuid
                        };
                        i.logSubscribe(c)
                    }
                })) : (subscribeOptions = {
                    userVisibleOnly: !0,
                    applicationServerKey: i.urlBase64ToUint8Array(e.vapidPublicKey)
                }, self.registration.pushManager.subscribe(subscribeOptions).then((function () {
                    l(e)
                })).catch((function (e) {
                    console.log("Error in pushManager.subscribe()", e)
                })))
            }))
        }

        function p(e) {
            return (e = e || {}).data.data = e.data, "string" == typeof e.data.actions && (e.data.actions = JSON.parse(e.data.actions)), e.data.icon = e.data.icon || "", e.data.badge = e.data.badge || "", self.registration.showNotification(e.data.title, e.data)
        }

        function d(e, t) {
            self.clients.matchAll().then(n => {
                for (let i = 0; i < n.length; i++) {
                    n[i].postMessage({
                        command: e,
                        payload: t
                    })
                }
            })
        }
        self.addEventListener("install", (function (e) {
            e.waitUntil(self.skipWaiting().then((function () {
                c()
            })))
        })), self.addEventListener("activate", (function (e) {
            e.waitUntil(self.clients.claim().then((function () {
                setInterval(u(), 6e5)
            })))
        })), self.addEventListener("message", (function (e) {
            switch (e.data.command) {
                case r:
                    return void
                    function () {
                        let e = null;
                        self.registration.pushManager.getSubscription().then(t => (e = t, t ? self.registration.pushManager.permissionState(t.options) : null)).then(t => {
                            if (null == t) d(r, !1);
                            else {
                                d(r, !!e && "granted" === t)
                            }
                        })
                    }();
                case s:
                    return void self.registration.pushManager.subscribe({
                        userVisibleOnly: !0,
                        applicationServerKey: "BMZD6yIrbCTqDSNJ4qD3YuI4pa5p0qDPSIsD7PyLPBQPA2SgTQgprPZZHspwF2A4MrK0xZ9uQjFnVhH5RJUkIMQ"
                    }).then(() => {
                        l({
                            vapidPublicKey: "BMZD6yIrbCTqDSNJ4qD3YuI4pa5p0qDPSIsD7PyLPBQPA2SgTQgprPZZHspwF2A4MrK0xZ9uQjFnVhH5RJUkIMQ",
                            service: "webpush",
                            uuid: a,
                            vendor: "2"
                        }), d(s, null)
                    });
                case o:
                    return void self.registration.pushManager.getSubscription().then(e => e.unsubscribe()).then(() => {
                        u(!0), d(o, null)
                    })
            }
            try {
                var t = JSON.parse(e.data);
                "granted" === t.permission && l(t), "denied" === t.permission && u()
            } catch (e) {
                console.log("Error in parsing message data", e)
            }
        })), self.addEventListener("push", (function (e) {
            let t = e.data.json();
            e.waitUntil(Promise.all([p(t), i.track("received", 0, t.data.uuid)]))
        })), self.addEventListener("notificationclose", (function (e) {
            let t = e.notification.data && e.notification.data.uuid;
            e.waitUntil(i.track("closed", 0, t))
        })), self.addEventListener("notificationclick", (function (e) {
            e.notification.close();
            let t = e.notification.data && e.notification.data.uuid,
                n = e.notification.data && e.notification.data.target_url,
                r = Promise.resolve();
            e.action && "" !== e.action ? (n = e.action, r = clients.openWindow(e.action)) : n && (r = clients.openWindow(n)), e.waitUntil(Promise.all([r, i.track("clicked", 0, t, {
                url: n
            })]))
        }))
    }
});