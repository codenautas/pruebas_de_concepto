var numero_conexion = 0;

self.addEventListener("connect",function(event1){
    numero_conexion++;
    var port = event1.ports[0];
    // port.numero_conexion=numero_conexion
    self.addEventListener("message",function(event2){
        for(var i=0; i<event1.ports.length; i++){
            // event1.ports[i].postMessage(event2.data+" from "+event2.port)
            port.postMessage(event2.data+" from "+event2.port.numero_conexion)
        }
    })
    port.postMessage(numero_conexion+" conectado")
})
/*
var connections = 0; // count active connections

self.addEventListener("connect", function (e) {

	var port = e.ports[0];
	connections++;

	port.addEventListener("message", function (e) {
		port.postMessage("Hello " + e.data + " (port #" + connections + ")");
	}, false);

	port.start();

}, false);
*/