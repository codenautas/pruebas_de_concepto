require('./logstamper.js');
var fsp = require('fs-promise');
var fs = require('fs');
console.log("Runner (PID:%d): starts", process.pid);

var fs = require('fs')
var restarter_out = './runner_out.log';

var serv = require("child_process").spawn('node', ['subproc/serv.js'],
                    {stdio: [ 'ignore', process.stdout, process.stderr, 'pipe', 'pipe' ] });


//serv.stdio[4].pipe(process.stdout);
serv.stdio[4].on('data', function(d) {
   console.log("parent recives: ", d.toString('utf8')); 
});
serv.stdio[3].write("Hola hijo", 'utf8');

console.log("Runner (PID:%d): starts server(PID=%d)", process.pid, serv.pid);
