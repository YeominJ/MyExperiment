 //navigator.serviceWorker.register("./sw.js");
// navigator.serviceWorker.register("./subscribers-sw.js");
navigator.serviceWorker.register("./test.js").then(function(){
    console.log("Service Worker Registered!");
});


self.addEventListener("activate", function(event){
    console.log("Service Worker is Activating!!");
    // event Listeer가 이상 없이 작동한다는 것을 확실하게 하기 위해
    return self.clients.claim();
});