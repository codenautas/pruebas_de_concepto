/*
var fork = require("child_process").fork,
    child = fork(__dirname + "/child.js");
*/
    
var hijo=require('path').normalize(__dirname + "/child.js");
var spawn = require("child_process").spawn,
    child = spawn('node', [hijo]/*, { detached: true }*/);

child.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

child.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

//child.disconnect();
child.unref();

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