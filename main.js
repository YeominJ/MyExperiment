 //navigator.serviceWorker.register("./sw.js");
// navigator.serviceWorker.register("./subscribers-sw.js");
navigator.serviceWorker.register("./test.js").then(function(){
    console.log("Service Worker Registered!");
});

// var button = document.getElementById("notifications");

// button.addEventListener("click", function(event){
//     Notification.requestPermission().then(function(result){
//         if(result === 'granted'){
//             // randomNotification();
//             console.log("Permission OK");
//         }
//     });
// });
