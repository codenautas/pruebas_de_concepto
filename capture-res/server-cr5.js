    "use strict";

    var express = require('express')
    var app = express()
    var fs = require('fs');

    app.use(function(req,res,next){
        res.originales={_writeRaw:res._writeRaw};
        console.log('res.originales',res._send);
        res._writeRaw = function _writeRaw(data, encoding, cb){
            fs.appendFileSync('res.log',data);
            return res.originales._writeRaw.apply(res, Array.prototype.slice.call(arguments));
        };
        next();
    });

    app.get('/hola.txt', function (req, res) {
        res.send('<b>Hola</b> Mundo textual!')
    })

    app.get('/hola.html', function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.write('<b>Hola</b> Mundo hipervinculado!');
        res.end();
    })

    app.use(express.static('public'))

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    })
