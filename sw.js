// if (navigator.serviceWorker){

//     // postMessage로 받은 데이터 콘솔에 출력
//     navigator.serviceWorker.addEventListener('message', event => {      
//         console.print(event.data);                            
//     });

// }


// self.addEventListener("message", function (event){
//     // const{
//     //     data : {
//     //         command
//     //     }
//     // } = event;
//     console.log("message is arrived");

//     if (event.data.command === "print"){
//         console.log(event.data.sentence);
//         this.self.addEventListener("fetch", function (event){
//             importScripts(event.data.url);
//             console.log("Script is imported");
//         });
//     }
// })

// self.addEventListener('install', function (event) {
//     return event.waitUntil(self.skipWaiting());
//   });

importScripts("./subscribers-sw.js");