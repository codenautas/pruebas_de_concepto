"use strict";

var express = require('express')
var app = express()
var fs = require('fs');

app.use(function(req,res,next){
    fs.appendFile('res.log','\n------ comienzo\n');
    res.originales={write:res.write, end:res.end};
    console.log('res.originales',res.originales);   
    console.log('res.originales',res.write);   
    res.write = function write(chunk, encoding, cb){
        console.log('write', arguments);
        fs.appendFileSync('res.log','\n--- chunk\n');
        fs.appendFileSync('res.log',chunk);
        return res.originales.write.apply(res, arguments);
    };
    res.end = function end(chunk, encoding, cb){
        console.log('end', arguments);
        fs.appendFileSync('res.log','\n--- end\n');
        fs.appendFileSync('res.log',chunk);
        return res.originales.end.apply(res, arguments);
    };
    next();
});

app.get('/hola.txt', function (req, res) {
    res.send('<b>Hola</b> Mundo!')
})

app.get('/hola.html', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<b>Hola</b> Mundo!');
    res.end();
})

app.use(express.static('public'))

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})