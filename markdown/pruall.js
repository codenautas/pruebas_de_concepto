"use strict";

var Promises = require('best-promise');
var fs = require('fs-promise');
var exec = require('child-process-promise').exec;

fs.readdir(".").then(function(files) {
    return Promises.all(files.map(function(file) {
        if(file.match(/^(p_)/)) {
            return exec('node '+file, {});
        }
    })).then(function(outs) {
        for(var o in outs) {
            var out  = outs[o];
            if(out) { console.log(out.stdout); }
        }
    });
});