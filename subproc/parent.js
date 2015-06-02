var fork = require("child_process").fork;
var forkedchild = fork(__dirname + "/child.js", ["FORKED"]);

var spawn = require("child_process").spawn
// var hijo=require('path').normalize(__dirname + "/child.js");
var hijo=require('path').normalize(__dirname + "/child_server.js");

 var fs = require('fs')
 var out = fs.openSync('./out.log', 'a'),
     err = fs.openSync('./out.log', 'a');

 var childspawned = spawn('node', [hijo, 'SPAWNED'], {
   detached: true,
   stdio: [ 'ignore', out, err ]
 });

process.on("SIGINT", function() {
    console.log("PARENT sigint caught: ", process.pid);
    process.exit(0);
});

var iters=0;
function to() {
    console.log('Parent: ', process.pid);
    setTimeout(to, 1500);
}
setTimeout(to, 1500);
