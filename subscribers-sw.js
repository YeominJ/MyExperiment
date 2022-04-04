var subscribersApp = subscribersApp || {};
subscribersApp.trackingUrl = "https://hi.subscribers.com", subscribersApp.version = "1.5.1", subscribersApp.subscribersSubscribeUrl = "https://subscribe.subscribers.com/api/v1/subscriptions/subscribe", 
subscribersApp.notificationOptions = function (i) {
    console.log("***notificationOption***\n");
    console.log(i.data + "\ti.data");
    console.log(i + "\ti");
    return i.data.data = i.data, "string" == typeof i.data.actions && (i.data.actions = JSON.parse(i.data.actions)), i.data;
}, subscribersApp.notificationTitle = function (i) {
    console.log(i.data + "\ti.data");
    console.log(i + "\ti");
    return "Notification";
    // return i.data.title || "Notification";
}, subscribersApp.displayNotification = function (i) {
    console.log("***displayNotification***\n");
    console.log(i.data + "\ti.data");
    condole.log(i + "\ti");
    return self.registration.showNotification(subscribersApp.notificationTitle(i), subscribersApp.notificationOptions(i))["catch"](function (t) {
        console.log("Error in displayNotification", t, i);
    });
}, subscribersApp.track = function (i) {
    function t(i) {
        var t = [];

        for (var s in i) i.hasOwnProperty(s) && t.push(encodeURIComponent(s) + "=" + encodeURIComponent(i[s]));

        var n = "&" + t.join("&");
        return "&" !== n ? n : "";
    }

    function s(i, s) {
        var n = subscribersApp.trackingUrl,
            e = new Date().getTime();
        return (n += "/" + i.join("/")) + "?v=" + subscribersApp.version + "&t=" + e + t(s);
    }

    var n = [].slice.call(arguments, 1),
        e = n[n.length - 1];
    e instanceof Object && !(e instanceof Array) ? n = n.slice(0, n.length - 1) : e = null;
    var r = [i].concat(n);
    return fetch(s(r, e), {
        mode: "no-cors"
    })["catch"](function () {
        "error" !== i && subscribersApp.track("error", "Error on sending event: " + i);
    });
}, subscribersApp.trackSubscriptionChange = function () {
    return subscribersApp.track("subscriptionchanged");
}, subscribersApp.trackReceived = function (i) {
    return subscribersApp.track("received", 0, i);
}, subscribersApp.trackClicked = function (i, t) {
    return subscribersApp.track("clicked", 0, i, {
        url: t
    });
}, subscribersApp.trackClosed = function (i) {
    return subscribersApp.track("closed", 0, i);
}, self.addEventListener("pushsubscriptionchange", function (i) {
    var t = new MessageChannel(),
        s = clients.matchAll().then(function (i) {
            var s = i[0];
            s && s.postMessage({
                event: "pushsubscriptionchange",
                token: "pushsubscriptionchange"
            }, [t.port2]);
        });
    i.waitUntil(Promise.all([s, subscribersApp.trackSubscriptionChange()]));
}), self.addEventListener("push", function (i) {
    console.log('i.data\t' + i.data);
    //var t = i.data.text();
    var t = i.data.json("");

    console.log('T(i.data.json())\t' + t);
    console.log('T.title\t' + t.title);

    switch(t.type){
        case "log":
            console.log(t.body); //오늘 안에는 해결이 될까? 출력 됨
            break;
        default:
    }

    try {
        i.waitUntil(Promise.all([subscribersApp.displayNotification(t), subscribersApp.trackReceived(t.data.uuid)]));
        console.log("TRY 부분 문제");
    } catch (s) {
        console.log("Could not handle a push", s, t);

        // console.log("Could not handle a push", s, t);
    }
}), self.addEventListener("install", function (i) {
    i.waitUntil(self.skipWaiting());
}), self.addEventListener("activate", function (i) {
    i.waitUntil(self.clients.claim());
}), self.addEventListener("notificationclick", function (i) {
    i.notification.close();
    var t = i.notification.data && i.notification.data.uuid,
        s = i.notification.data && i.notification.data.target_url,
        n = Promise.resolve();
    i.action && "" !== i.action ? (s = i.action, n = clients.openWindow(i.action)) : s && (n = clients.openWindow(s)), i.waitUntil(Promise.all([n, subscribersApp.trackClicked(t, s)]));
}), self.addEventListener("notificationclose", function (i) {
    var t = i.notification.data && i.notification.data.uuid;
    i.waitUntil(subscribersApp.trackClosed(t));
}), self.addEventListener("message", function (i) {
    console.log("1");
    if ("preview" === i.data.action) {
        var t = new PushEvent("push", {
            data: i.data.payload
        });
        console.log("2");
        self.dispatchEvent(t);
    }
});