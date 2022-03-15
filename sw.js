if (navigator.serviceWorker){

    // postMessage로 받은 데이터 콘솔에 출력
    navigator.serviceWorker.addEventListener('message', event => {      
        console.print(event.data);                            
    });
}

self.addEventListener("message", function (event){
    // const{
    //     data : {
    //         command
    //     }
    // } = event;

    if (event.data.command === 'print'){
        console.log(data);
    }
})