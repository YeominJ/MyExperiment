// if (navigator.serviceWorker){

//     // postMessage로 받은 데이터 콘솔에 출력
//     navigator.serviceWorker.addEventListener('message', event => {      
//         console.print(event.data);                            
//     });

// }

var t = "https://sistinalove.github.io/SWtesting/ex.js";

self.addEventListener("fetch", function(event){
    console.log("Something is fetched!");
});


self.addEventListener("message", function (event) {
    // const{
    //     data : {
    //         command
    //     }
    // } = event;
    console.log("message is arrived");

    // if (event.data.command === "print"){
    //     console.log(event.data.sentence);
    //     this.self.addEventListener("fetch", function (event){
    //         importScripts(event.data.url);
    //         console.log("Script is imported");
    //     });
    // }
    console.log(event.data.url3);
    t = event.data.url3;
    console.log(t);
    this.fetch(t).then(function(response){
        console.log("아오 이거 어떻게 하라는 거냐??");
    });
});
//importScripts(t);
// self.addEventListener('install', function (event) {
//     return event.waitUntil(self.skipWaiting());
//   });

//importScripts("./subscribers-sw.js");

// self.addEventListener("message", function(event){
//     console.log(event.data.url);
//     //importScripts(event.data.url);
//     //importScripts(event.data.url2);
//     const t = event.data.url;
//     importScripts(t);
//     return;

// })
console.log(t);
//self.importScripts("https://sistinalove.github.io/SWtesting/sw.js");
self.importScripts(t);