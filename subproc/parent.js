
var fork = require("child_process").fork;
var forkedchild = fork(__dirname + "/child.js");

var spawn = require("child_process").spawn
    
var hijo=require('path').normalize(__dirname + "/child.js");
var childspawned = spawn('node', [hijo]/*, { detached: true }*/);

var hijophp=require('path').normalize(__dirname + "/tarea.php");
var childphp = spawn('php', [hijophp]/*, { detached: true }*/);

function setfds(_child) {
    _child.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    _child.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    _child.on('close', function (code) {
      console.log('_child process exited with code ' + code);
    });
}    

setfds(childspawned);
setfds(childphp);
//child.disconnect();
//child.unref();

process.on("SIGINT", function() {
    console.log("PARENT sigint caught: ", process.pid);
    //child.disconnect();
    process.exit(0);
});

function to() {
    console.log('Parent: ', process.pid);
    setTimeout(to, 1500);
}
setTimeout(to, 1500);