require('./logstamper.js');
var express = require('express');
var app = express();
var autoDeploy = require('auto-deploy');

var server = app.listen(5555, function() {
    console.log('-------------------------------------------');
    console.log('Server (PID:%d): listening on port %d ', process.pid, server.address().port);
});

function site_up(req,res){
    var restart_url='auto-deploy?restart=1&pid='+process.pid;
    var kill_url='auto-deploy?pid='+process.pid;
    res.send("<h1>auto-deploy demo <b>"+process.pid+"</b></h1><p>this site now is up"
            +"<p>try<a href="+restart_url+">"+restart_url+"</a>"
            +"<p>or <a href="+kill_url+">"+kill_url+"</a>");
}

app.get('/index.html',site_up);
app.get('/',site_up);

app.use(autoDeploy({log:true, scriptName:'start_ad'}));

