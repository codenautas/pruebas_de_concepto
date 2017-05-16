"use strict";

var express = require('express')
var app = express()
var interceptor = require('express-interceptor')
var fs = require('fs');

/*
app.use(function(req,res,next){
    fs.appendFile('res.log','\n------ comienzo\n');
    'drain,close,error,finish,pipe,unpipe,data'.split(',').forEach(function(evento){
        res.on(evento, function(data){
            fs.appendFile('res.log','\n--- on '+evento+'\n');
            fs.appendFile('res.log',data);
        });
    });
    next();
});
*/
var logInterceptor = interceptor(function(req, res){
  return {
    isInterceptable: function(){
      // return /text\/html/.test(res.get('Content-Type'));
      return true;
    },
    // Appends a paragraph at the end of the response body 
    intercept: function(body, send) {
      fs.appendFile('res.log','\n------ comienzo\n');
      fs.appendFile('res.log',body);
      send(body);
    }
  };
})

app.use(logInterceptor);

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