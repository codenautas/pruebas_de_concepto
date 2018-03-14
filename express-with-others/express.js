"use strict";

var express      = require('express')
var cookieParser = require('cookie-parser')

// var logWhy = require('why-is-node-running') // should be your first require
// var logWhy = require('why-is-node-running') // should be your first require
var logWhy = null // require('why-is-node-running') // should be your first require
var logWhy = null // require('why-is-node-running') // should be your first require
var express = require('express');
var session = require('express-session')
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var Path = require('path');
var useragent = require('express-useragent');
var numeral = require('numeral');
var MiniTools = require('mini-tools');
var crypto = require('crypto');
var serveContent = require('serve-content');
var pg = require('pg-promise-strict');
var SessionFileStore = null // require('session-file-store');
var MemoryStore = require('memorystore')(session);
var jsToHtml=require('js-to-html');
const escapeStringRegexp = require('escape-string-regexp');
var packagejson = require(process.cwd()+'/package.json');
var likeAr = require('like-ar');
var readYaml = require('read-yaml-promise');
var fs = require('fs-extra');
var bestGlobals = require('best-globals');
// var myOwn = require('../for-client/my-things.js');
var typeStore = require('type-store');
var json4all = require('json4all');
var loginPlus = require('login-plus');
var kill9 = require('kill-9');
// var tableDefAdapt = require('./table-def-adapt.js');
// var tableMixin = require('./table-mixin.js');

 
var app = express()
console.dir(app);
app.use(cookieParser())
var memoryStore=new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
})
app.use(session({
    store: memoryStore,
    secret: 'keyboard cat'
}))
console.log('-----------');
console.dir(app);
console.dir(app._router.stack);
 
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies)
})
 
var server = app.listen(8080);

MiniTools.readConfig([
    'def-config',
    {db:
        {
            user: 'test_user',
            password: 'test_pass',
            database: 'test_db',
            host: 'localhost',
            port: 5432
        }
    }
]).then(function(config){
    pg.easy=true;
    pg.debug.pool=true;
    pg.setAllTypes();
    return pg.connect(config.db).then(function(client){
        return client.query("select current_timestamp").fetchUniqueValue().then(function(value){
            console.log('Time in server', value);
            return client.done();
        })
    }).then(function(){
        return config;
    })
}).then(function(config){
    var cuenta=config.server.timeout;
    console.log('shooting down in',cuenta,'seconds');
    var contador=setInterval(function(){
        console.log('shooting down in',--cuenta);
    },1000);
    setTimeout(function(){
        server.close();
        memoryStore.stopInterval();
        clearInterval(contador);
        console.log('closed'); // esto prueba que al cerrar el node se libera 
        console.log(pg.poolBalanceControl());
    },1000*cuenta+100);
});
