importScripts('./sample.js');

self.addEventListener("install", function(event){
    console.log("Service Worker Installing!!");
});

self.addEventListener("activate", function(event){
    console.log("Service Worker is Activating!!");
    // event Listeer가 이상 없이 작동한다는 것을 확실하게 하기 위해
    return self.clients.claim();
});

// fetch : web resource에 접근하기 위해 행해지는 모든 request action
// SW가 client-side programmable proxy로서 동작하게 함
self.addEventListener("fetch", function(event){
    // Request를 intercept하여 로그 찍고 그대로 요청을 보내기
    console.log("Fetching something!!", event.request.url);

    // respondWidth : hijack HTTP response and update them
    event.respondWith(fetch(event.request));
});

self.addEventListener("push", function(event){
    const data = JSON.parse(event.data.text());
    console.log("PUSH로 전달 받은 데이터" + data);


    // event.waitUntil(async function(){
        
    // });
});


self.addEventListener("foreignfetch", function(event){
    // Request를 intercept하여 로그 찍고 그대로 요청을 보내기
    console.log("Fetching something!!", event.request.url);

    // respondWidth : hijack HTTP response and update them
    event.respondWith(
        requestLogic(event.request).then(response => {
            return {
            response: response,
            // Omit to origin to return an opaque response.
            // With this set, the client will receive a CORS response.
            origin: event.origin,
            // Omit headers unless you need additional header filtering.
            // With this set, only Content-Type will be exposed.
            headers: ['Content-Type']
            };
        })
        );
});
