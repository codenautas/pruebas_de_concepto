var express = require('express')
var app = express();

var changing = require('best-globals').changing;
var onFinished = require('on-finished')

app.listen(3000);

function logRes(res){
    console.log('***********')
    console.log(res._header)
    console.log(res.headers)
    console.log(res.statusCode)
    console.log(res.statusMessage)
    console.log(res.body)
    console.log(res._captured_data.toString())
    console.log('--------')
    // console.log(changing(res,{req:undefined},changing.options({deletingValue:undefined})))
    // console.log(changing(res,{req:undefined, app:undefined},changing.options({mostlyPlain:true,deletingValue:undefined})))
}

app.use(function(req,res,next){
    res._captured_data = new Buffer(0);
    res.on('data', function (str) {
        console.log('--',str);
        res._captured_data.write(str);
    })
    onFinished(res, function (err, res) {
        logRes(res)
    })
    onFinished(req, function (err, req) {
        console.log('99999999999')
    })
    console.log('=========');
    console.log(req.method)
    console.log(req.path)
    console.log(req.query)
    console.log(req.body)
    next();
});

app.get('/uno',function(req,res){
    res.header('Content-Type','text/html');
    res.send('algo');
});

app.get('/dos',function(req,res){
    res.header('Content-Type','text/plain');
    res.end('otra cosa');
});

