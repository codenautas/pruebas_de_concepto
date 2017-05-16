"use strict";

var express = require('express')
var app = express()
var fs = require('fs');

app.use(function(req,res,next){
    fs.appendFile('res.log','\n------ comienzo\n');
    res.originales={_send:res._send, _writeRaw:res._writeRaw};
    console.log('res.originales',res._send);
    /*
    res._send = function _send(data, encoding, cb){
        console.log('_send', arguments);
        fs.appendFileSync('res.log','\n--- _send\n');
        fs.appendFileSync('res.log',data);
        return res.originales._send.apply(res, Array.prototype.slice.call(arguments));
    };
    */
    res._writeRaw = function _writeRaw(data, encoding, cb){
        console.log('_writeRaw', arguments);
        fs.appendFileSync('res.log','\n--- _writeRaw\n');
        fs.appendFileSync('res.log',data);
        return res.originales._writeRaw.apply(res, Array.prototype.slice.call(arguments));
    };
    next();
});

app.get('/hola2.txt', function (req, res) {
    res.send('<b>Hola</b> Mundo!')
})

app.get('/hola2.html', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<b>Hola</b> Mundo!');
    res.end();
})

app.use(express.static('public'))

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})