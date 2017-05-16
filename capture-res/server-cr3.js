"use strict";

var express = require('express')
var app = express()
var fs = require('fs');

app.use(function(req,res,next){
    fs.appendFile('res.log','\n------ comienzo\n'+res.body);
    res.outputCallbacks.push(function(){
        console.log('outputCallbacks',arguments);
    });
    res.on('finish', function(){
        fs.appendFile('res.log','\n------ finish\n'+res.body);
        fs.appendFile('res.log','\n------ finish2\n'+this.body);
        console.log('finihs');
        console.log(res);
    });
    res.on('end', function(){
        fs.appendFile('res.log','\n------ end\n'+res.body);
        fs.appendFile('res.log','\n------ end2\n'+this.body);
    });
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

app.use(function(req,res,next){
    fs.appendFile('res.log','\n------ fin\n'+res.body);
    next();
});
