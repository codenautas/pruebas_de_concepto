"use strict";

var express = require('express')
var session = require('express-session')
var MemoryStore = require('memorystore')(session)

var app = express()

var memoryStore=new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
});

app.use(session({
    // from [1]
    store: memoryStore,
    // to [2]
    // // from [1]
    // store: new MemoryStore({
    //   checkPeriod: 86400000 // prune expired entries every 24h
    // }),
    // // to [2]
    secret: 'keyboard cat'
})) 
 
app.get('/hw', function(req, res) {
    res.send('hello world!');
    res.end();
    console.log('hello world!');
})
 
var server = app.listen(8080);
console.log('listening');

setTimeout(function(){
    server.close();
    memoryStore.stopInterval();
    console.log('closed?'); 
},2000);