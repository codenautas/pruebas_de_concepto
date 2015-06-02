require('./logstamper.js');

console.log("Restarter (PID:%d) starts", process.pid);

var fs = require('fs')
var restarter_out = './subproc_out.log';
var out = fs.openSync(restarter_out, 'a'),
     err = fs.openSync(restarter_out, 'a');

// poner true o 1 para activar la prueba de superspawn
// no es usable porque levanta una consola
// probado solo en windows XP
if(0) {
    var spawn = require("superspawn").spawn
    var childspawned = spawn('npm', ['run-script', 'startABC'],
                             {detached: true, stdio: [ 'ignore', out, err ] }, "/c");
    childspawned.catch(function(err) {
        console.log("Error: ", err); 
    })
    .then(function(stdout) {
        console.log("OK", stdout);    
        console.log("Restarter (PID:%d) starts server(PID=%d)", process.pid, childspawned.pid);
        setTimeout(function() {
            console.log("Restarter (PID:%d) ends", process.pid);
            process.exit(0);
        }, 3000);
    });
} else {
    var spawn = require("child_process").spawn
    var childspawned = spawn('node', ['subproc/server.js'],
                            { detached: true, stdio: [ 'ignore', out, err ] });
    console.log("Restarter (PID:%d) starts server(PID=%d)", process.pid, childspawned.pid);
    setTimeout(function() {
        console.log("Restarter (PID:%d) ends", process.pid);
        process.exit(0);
    }, 3000);    
}
