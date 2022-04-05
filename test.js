self.addEventListener("install", function(event){
    console.log("Service Worker Installing!!");
});

self.addEventListener("activate", function(event){
    console.log("Service Worker is Activating!!");
    // event Listeer가 이상 없이 작동한다는 것을 확실하게 하기 위해
    return self.clients.claim();
});

// fetch : web resource에 접근하기 위해 행해지는 모든 request action
self.addEventListener("fetch", function(event){
    // Request를 intercept하여 로그 찍고 그대로 요청을 보내기
    console.log("Fetching something!!", event.request.url);
    event.respondWith(fetch(event.request));
});

self.addEventListener("message", function(event){
    if(event.data.command === "push"){
        var t = new PushEvent("push",{
            data : event.data.payload
        });
        console.log("postMessage로 받은 Data로 Push 보내기", t);
        this.self.dispatchEvent(t);
    }
    
    if(event.data.command === "fetch"){
        this.fetch(event.data.url);
        console.log("postmessage로 받은 Data로 Fetch 하기\t", event.data.url);
    }
});

self.addEventListener("push", function(event){
    const data = JSON.parse(event.data.text());

    event.waitUntil(async function(){
        
    });
});