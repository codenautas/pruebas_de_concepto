var prg = require('commander');

prg
    .version(require('../package').version)
    .usage('nombre')
    .parse(process.argv);

yo = prg.args[0];
console.log("yo: ", yo)
console.log('Child '+yo+': ', process.pid, " start");

process.on("SIGINT", function() {
    console.log('Child '+yo+': sigint caught: ', process.pid)
    //process.exit(0);
});

process.on("disconnect", function() {
    console.log('Child '+yo+':  disconnect caught: ', process.pid)
    process.exit(0);
});

process.on("exit", function() {
    console.log('Child '+yo+': EXIT caught: ', process.pid)
   // process.exit(0);
});

function to() {
    console.log('Child '+yo+': ', process.pid);
    setTimeout(to, 2000);
}
setTimeout(to, 2000);

process.on('close', function (code) {
   console.log('Child '+yo+': exited with code ' + code);
});
