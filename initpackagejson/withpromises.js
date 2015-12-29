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

var initFile = path.resolve(process.env.HOME || process.env.HOMEPATH, '.npm-init');
var dir = process.cwd();

ipj(dir, initFile, {}).then(function(data) {
    console.log("init", data);
    return pz('input.js', null);
}).then(function(res) {
    console.log(res.greeting);
    console.log("Version seleccionada: ", res['qa-control-version']);
    //console.log("pz", res);
}).catch(function(e) {
    console.log("Error", e);
});
