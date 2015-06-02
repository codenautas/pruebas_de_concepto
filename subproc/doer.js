"use strict";
 
/**
 * Module dependencies.
 */

var express = require('express');

var doer = exports = module.exports = function doer(opts){
    var killer=express();
    var _process=opts.process || process;
    var pid=opts.pid || _process.pid;
    if(doer.isRedirectCode(opts.statusKilled) && !('location' in opts)){
        throw new Error('do-er: options.location required');
    };
    if(doer.isRedirectCode(opts.statusBad) && !('locationBad' in opts)){
        throw new Error('do-er: options.locationBad required');
    };
    if(!doer.isRedirectCode(opts.statusKilled) && ('location' in opts)){
        throw new Error('do-er: options.location is only for redirect');
    };
    if(!doer.isRedirectCode(opts.statusBad) && ('locationBad' in opts)){
        throw new Error('do-er: options.locationBad is only for redirect');
    };
    if(opts.log){
        console.log('do-er (PID:%d) installed', pid);
    }
    killer.get('/'+(opts.statement||'do-er'),function killer(req,res){
        if(req.query.pid==pid){
            res.status(opts.statusKilled||doer.defaults.statusKilled);
            if(opts.location){
                res.header('Location',opts.location);
            }

            if(req.query.restart == 1) {
                var fs = require('fs');
                var doer_out = './subproc_out.log';
                var out = fs.openSync(doer_out, 'a'),
                    err = fs.openSync(doer_out, 'a');

                var spawn=require("child_process").spawn;
                var restarter = spawn('node', [require('path').normalize(__dirname + "/restarter.js")],
                                    { detached: true, stdio: [ 'ignore', out, err ] });
                console.log('do-er (PID:%d) starts restarter (PID:%d)', pid, restarter.pid);
                res.send('<html><head>'+
                         '<meta http-equiv="refresh" content="2; url=/" /><head>'+
                         '<body><h3>Reiniciando el servidor...</h3></body></html>');
            }
            else {
                res.send(opts.messageKilled||'do-er success');
            }
            console.log('do-er (PID:%d) ends', pid);
            _process.exit(opts.exitCode||doer.defaults.exitCode);

        }else{
            res.status(opts.statusBad||doer.defaults.statusBad);
            if(opts.locationBad){
                res.header('Location',opts.locationBad);
            }
            res.send(opts.messageBad||'do-er unknown');
        }
    });
    return killer;
};

doer.defaults={
    statusKilled:200,
    exitCode:0,
    statusBad:404
};

doer.isRedirectCode = function isRedirectCode(htmlCode){
    return htmlCode>=300 && htmlCode<=303;
};
