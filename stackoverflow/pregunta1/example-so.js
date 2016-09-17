var express = require('express')
var bodyParser = require('body-parser')
var app = express();

var onFinished = require('on-finished')

app.listen(3000);

function logRes(res){
    console.log('* captured response *')
    console.log(res._header)
    console.log(res.statusCode)
    console.log(res.statusMessage)
    console.log(res.body)
}

app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(function(req,res,next){
    onFinished(res, function (err, res) {
        logRes(res)
    })
    console.log('= captured request =');
    console.log(req.method)
    console.log(req.path)
    console.log(req.query)
    next();
});

app.get('/example',function(req,res){
    res.header('Content-Type','text/plain');
    res.end('example data');
});