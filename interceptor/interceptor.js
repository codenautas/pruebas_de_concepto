"use strict";

var http = require('http');

var conf = {
    listen:12344,
    forward:12348
};

var options = {
    port: conf.forward,
    hostname: 'localhost',
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

console.log('pre-request');
var req = http.request(options);

req.on('connect',function(inn){
    console.log('connected');
    inn.on('data',function(data){
        console.log(data);
    });
});

req.on('error',function(err){
    console.log('error');
    console.error(err);
});

req.write("");
req.end();

var server = http.createServer();

server.listen(conf.listen)

server.on('listening', function(){
    console.log('server started at',conf.listen);
});