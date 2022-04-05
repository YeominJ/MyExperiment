 //navigator.serviceWorker.register("./sw.js");
// navigator.serviceWorker.register("./subscribers-sw.js");
navigator.serviceWorker.register("./test.js").then(function(){
    console.log("Service Worker Registered!");
});

