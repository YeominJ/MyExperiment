self.addEventListener("install", function(event){
    console,log("Service Worker Installing!!");
});

self.addEventListener("activate", function(event){
    console.log("Service Worker is Activating!!");
    // event Listeer가 이상 없이 작동한다는 것을 확실하게 하기 위해
    return self.clients.claim();
});

// fetch : web resource에 접근하기 위해 행해지는 모든 request action
self.addEventListener("fetch", function(event){

});