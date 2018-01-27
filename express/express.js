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
 
app.listen(8080)