console.log("Child: ", process.pid, " start");

process.on("SIGINT", function() {
    console.log("CHILD sigint caught: ", process.pid)
    //process.exit(0);
});

process.on("exit", function() {
    console.log("CHILD EXIT caught: ", process.pid)
    //process.exit(0);
});

function to() {
    console.log('Child: ', process.pid);
    setTimeout(to, 2000);
}
setTimeout(to, 2000);

process.on('close', function (code) {
     console.log('child process exited with code ' + code);
});

/*
var spawn = require('child_process').spawn,
    ls    = spawn('ls', ['-l', '.']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

*/