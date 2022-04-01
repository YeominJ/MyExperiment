var childwin;
const childname = "popup";

function openChild() {
    childwin = window.open('page2.html', childname, 'height=300px, width=500px');
}

function sendMessage() {
    let msg = {
        pName: "Bob",
        pAge: "35"
    };
    // childwin.postMessage(msg);
    // childwin.focus();
}

function send2SW() {
    let msg = {
        command: "print",
        sentence: "Hello Service Worker!",
        url: '"https://sistinalove.github.io/SWtesting/sw.js"',
        url2: '"https://web-sdk.urbanairship.com/notify/v1/ua-sdk.min.js"',
        url3: "sample.js",
        type: "push",
        push: "https://www.google.com",
        action : "preview",
        headers: {
            "Content-Type": "application/json"
        },
        payload : JSON.stringify({                
            title : "제발 되면 좋겠다",
            body : JSON.stringify({
                title : "하나",
                bpdy : "둘"
            }),
            type : "log",
            uuid : "031125"
        })                 
    };

    // 서비스 워커가 있으면 DOM -> SW로 MSG 보내기
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(msg);
    }
}