var init = require('init-package-json');
var path = require('path');
var Promises = require('best-promise');
var promzard = require('promzard');

function ipj(dir, initFile, configData) {
    return Promises.make(function(resolve, reject) {
        init(dir, initFile, configData, function (er, data) {
            if(er) { reject(er); }
            resolve(data);
        });
    });
};

function pz(inputFile, optionalContextAdditions) {
    return Promises.make(function(resolve, reject) {
        promzard(inputFile, optionalContextAdditions, function (er, data) {
            if(er) { reject(er); }
            resolve(data);
        });
    });
};

// var initFile = path.resolve(process.env.HOME || process.env.HOMEPATH, '.npm-init');
var initFile = 'input.js';

var dir = process.cwd();
var qac = { "package" : { "qa-control": {
    "package-version": "0.0.2",
    "run-in": "server",
    "test-appveyor": true,
    "type": "app",
    "stage": "designing",
    "coverage": 70
} } } ;

ipj(dir, initFile, qac).then(function(data) {
    console.log("init", data);
}).catch(function(e) {
    console.log("Error", e);
});
