"use strict";

var net = require('net');
var http = require('http');
require('colors');

var conf = {
    listen:12344,
    forward:12348
};

var options = {
    port: conf.forward,
    hostname: '127.0.0.1',
    method: 'GET',
    path: '/unlogged/Oxygen480-actions-key-enter.svg.png',
    headers:{
        host: 'localhost:12348',
        connection: 'keep-alive',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/46.0.2490.71 Safari/537.36',
        'accept-encoding': 'gzip, deflate, sdch',
        'accept-language': 'es-419,es;q=0.8,en;q=0.6',
    }
};

// http://localhost:12348/unlogged/Oxygen480-actions-key-enter.svg.png

console.log('pre-connect');
var conRemote = net.connect(conf.forward,'localhost');

conRemote.on('connect',function(){
    console.log('connected'.green);
    conRemote.write("GET /index.html HTTP/1.1\n");
    conRemote.write("Host: localhost:12348\n");
    conRemote.write("\n");
    conRemote.end();
    console.log('sendend'.green);
});

conRemote.on('data',function(data){
    console.log(('data:\n'+data.toString()).cyan);
});

conRemote.on('error',function(err){
    console.log('error'.red);
    console.error(err.toString().red);
});

// conRemote.write("");

var server = http.createServer();

server.listen(conf.listen)

server.on('listening', function(){
    console.log(('server started at '+conf.listen).green);
});