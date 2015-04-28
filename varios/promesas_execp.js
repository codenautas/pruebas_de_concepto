"use strict";

var fs = require('fs-promise');
var Promise = require('promise');
var varios = {};

varios.check = function check(path) {
    return Promise.resolve().then(function() {
        if(!path) { throw new Error('null path'); }
        return fs.stat(path);
    }).then(function(stats) {
        if(false == stats.isDirectory()) {
            return Promise.reject(new Error("'"+path+"' no es un directorio"));
        }
        else {
            return Promise.resolve();
        }
    });
}

module.exports = varios;