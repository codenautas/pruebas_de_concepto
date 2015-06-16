require('./logstamper.js');
var express = require('express');
var app = express();
var net = require('net');
var fs = require('fs');

var readable = fs.createReadStream(null, {fd: 3});
var writeable = fs.createWriteStream(null, {fd: 4});

readable.on('data', function(buf) {
    var m=buf.toString('utf8');
  console.log("readable recibe:", m);
  writeable.write('Dijiste: '+m);
});

var server = app.listen(1234, function() {
    console.log('-------------------------------------------');
    console.log('Server (PID:%d): listening on port %d ', process.pid, server.address().port);
});

function site_up(req,res){
    res.send("<h4>Running <b>("+process.pid+")</b>!... but... "
             +"<a href=\"/stop\">you can kill me</a>"
             +" or <a href=\"/pipa\">pipe some data</a>"
             +"</h4>");
}

app.get('/index.html',site_up);
app.get('/',site_up);

app.get('/stop', function(req, res) {
    console.log("saliendo");
    process.exit(0);
})


app.get('/pipa', function(req, res) {
    writeable.write('Hola padre, me pipearon esto:'+req.url+'\n');
})