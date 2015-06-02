require('./logstamper.js');
var express = require('express');
var app = express();
var doer = require('./doer.js');

var server = app.listen(5555, function() {
    console.log('-------------------------------------------');
    console.log('Server (PID:%d): listening on port %d ', process.pid, server.address().port);
});

function site_up(req,res){
    var restart_url='do-er?restart=1&pid='+process.pid;
    var kill_url='do-er?pid='+process.pid;
    res.send("<h1>do-er demo <b>"+process.pid+"</b></h1><p>this site now is up"
            +"<p>try<a href="+restart_url+">"+restart_url+"</a>"
            +"<p>or <a href="+kill_url+">"+kill_url+"</a>");
}

app.get('/index.html',site_up);
app.get('/',site_up);

app.use(doer({log:true, scriptName:'start_doer'}));

