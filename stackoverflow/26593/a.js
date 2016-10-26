var ports=[];

self.addEventListener("connect",function(event1){
    var port = event1.ports[0];
    ports.push(port);
    port.addEventListener("message",function(event2){
        for(var i=0; i<ports.length; i++){
            ports[i].postMessage(event2.data)
        }
    },false);
    port.start();
})
