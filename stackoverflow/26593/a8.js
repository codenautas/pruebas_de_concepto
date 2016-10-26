var ports=[];

self.addEventListener("connect",function(event1){
    var port = event1.ports[0];
    port.numero_conexion = ports.push(port);
    port.addEventListener("message",function(event2){
        port.postMessage(port.numero_conexion+" envio mensaje");
        port.postMessage(event2.data);
        port.postMessage(JSON.stringify(ports));
        for(var i=0; i<ports.length; i++){
            ports[i].postMessage(event2.data+" from "+ports[i].numero_conexion)
        }
    },false);
    port.start();
    port.postMessage(port.numero_conexion+" conectado v8d")
})
