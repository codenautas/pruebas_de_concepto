var Promise = require('promise');
var path = require('path');
var fsp = require('fs-promise');

var rutas = {};

rutas.realPath = function realPath(inFile) {
    return Promise.resolve(inFile).then(function(inFile) {
        if(!inFile) { throw new Error("null file"); }
        return fsp.stat(inFile);
    }).then(function(stats) {
        //console.log("Stats", stats);
        if(! stats.isFile()) { throw new Error("'"+inFile+"' is not a file"); }
        return inFile;
    }).then(function(inFile) {
        //console.log("va path", inFile);
        return Promise.resolve(path.dirname(path.resolve(inFile)));
    }).catch(function(err) {
        //console.log("rp error", err);
        return Promise.reject(err);
    });
};

module.exports = rutas;