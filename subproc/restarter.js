require('./logstamper.js');
var spawn = require("child_process").spawn

 var fs = require('fs')
 var restarter_out = './subproc_out.log';
 var out = fs.openSync(restarter_out, 'a'),
     err = fs.openSync(restarter_out, 'a');

console.log("Restarter (PID:%d) starts", process.pid);
var childspawned = spawn('node', ['subproc/server.js'], {
   detached: true, stdio: [ 'ignore', out, err ] });
console.log("Restarter (PID:%d) starts server(PID=%d)", process.pid, childspawned.pid);
setTimeout(function() {
    console.log("Restarter (PID:%d) ends", process.pid);
    process.exit(0);
}, 3000);
