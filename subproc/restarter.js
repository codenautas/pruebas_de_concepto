require('./logstamper.js');
var fsp = require('fs-promise');
console.log("Restarter (PID:%d) starts", process.pid);

var fs = require('fs')
var restarter_out = './subproc_out.log';
var out = fs.openSync(restarter_out, 'a'),
     err = fs.openSync(restarter_out, 'a');

// poner true o 1 para activar la prueba de superspawn
// no es usable porque levanta una consola
// probado solo en windows XP
if(0) {
    var spawn = require("superspawn").spawn;
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
    var pkgjson='./package.json';
    fsp.exists(pkgjson).then(function(exists) {
        console.log("exists", exists);
        if(!exists) { throw new Error("'"+pkgjson+"' does not exists"); }
        console.log("pkgjson", pkgjson ? pkgjson : "undefined pkgjson");
        return fsp.readJson(pkgjson);
    }).then(function(json) {
        //console.log("json", json ? json : "undefined json");
        var scriptName='wrong';//='subproc/server.js';
        if(json.scripts && json.scripts.startABC) {
            console.log("script (%s)", json.scripts.startABC);
            var jrun=json.scripts.startABC.match(/^(node (.*))/);
            if(jrun) {
                console.log("Tengo exe (%s)", jrun[2]);
                scriptName = jrun[2];
            }
        }
        return scriptName;
    }).then(function(proc) {
        var spawn = require("child_process").spawn;
        //var childspawned = spawn('cmd.exe', ['/c', 'c:\\nodejs\\npm.cmd', 'run-script', 'startABC'],
        var childspawned = spawn('node', [proc],
                                { detached: true, stdio: [ 'ignore', out, err ] });
        console.log("Restarter (PID:%d) starts server(PID=%d)", process.pid, childspawned.pid);
        setTimeout(function() {
            console.log("Restarter (PID:%d) ends", process.pid);
            process.exit(0);
        }, 3000); 
    }).catch(function(err) {
        console.log("Error: ", err);
        console.log('STACK',err.stack);
    });
}
