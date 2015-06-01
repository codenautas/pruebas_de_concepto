var express = require('express');
var app = express();

var prg = require('commander');
prg.version(require('../package').version).usage('nombre').parse(process.argv); 
yo = prg.args[0];

var server = app.listen(5555, function() {
    console.log('Listening on port %d', server.address().port);
});

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return day + ":" + month + ":" + year+ " a las " + hour + ":" + min + ":" + sec;
}

function site_up(req,res){
    res.send('Child '+yo+': '+process.pid+'<br>'+getDateTime());
}

app.get('/index.html',site_up);
app.get('/',site_up);

