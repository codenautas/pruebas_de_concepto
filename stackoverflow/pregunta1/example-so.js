var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.listen(3000);

app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(function(req,res,next) {
    console.log('= captured request =');
    console.log(req.method);
    console.log(req.path);
    console.log(req.query);
    console.log(req.body);
    next();
});

app.get('/example',function(req,res) {
    res.header('Content-Type','text/plain');
    res.end('example data');
});