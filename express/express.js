"use strict";

var express      = require('express')
var cookieParser = require('cookie-parser')
 
var app = express()
console.dir(app);
app.use(cookieParser())
console.log('-----------');
console.dir(app);
console.dir(app._router.stack);
 
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies)
})
 
var server = app.listen(8080);

setTimeout(function(){
    server.close();
    console.log('closed'); // esto prueba que al cerrar el node se libera 
},2000);