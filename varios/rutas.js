var Promise = require('promise');
var path = require('path');
var fsp = require('fs-promise');

var rutas = {};

rutas.realPath = function realPath(inFile) {
    return Promise.resolve(inFile).then(function(inFile) {
        if(!inFile) { throw new Error("null file"); }
        return Promise.resolve(path.dirname(path.resolve(inFile)));
    }).catch(function(err) {
        return Promise.reject(err);
    });
};

module.exports = rutas;