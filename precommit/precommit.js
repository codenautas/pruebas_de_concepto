"use strict";

var Promises = require('best-promise');
require('fs-extra');
var fs = require('fs-promise');
var Path = require('path');

function processDirectory(srcDir, destDir) {
    return Promises.start(function() {
        return fs.readdir(srcDir)
    }).then(function(files) {
        return Promises.all(files.map(function(file) {
            var fullName = Path.join(srcDir, file);
            return Promises.start(function() {
                return fs.readFile(fullName,  {encoding:'utf8'});
            }).then(function(content) {
                var ext = Path.extname(file).substring(1);
                return { fullName:fullName,
                    baseName:Path.basename(file, ext),
                    ext:ext,
                    content:content
                };
            }).catch(function(err) {
                console.log("error", err)
            });
        })).then(function(files) {
            return Promises.all(files.map(function (file) {
                return Promises.start(function() {
                    switch(file.ext) {
                        default: return {};
                    }
                }).then(function(res) {
                    if(! res.skip) {
                        var destFile = Path.join(destDir, file.baseName+file.ext);
                        if(res.data) { return fs.writeFile(destFile, res.data); }
                        return fs.copy(file.fullName, destFile);
                    }
                });
            }));
        });
    });
}

function generateWeb() {
    console.log("Generating web content...");
    var desDir = './web';
    return processDirectory('./lib', desDir).then(function() {
        console.log("listo");
    });
}

generateWeb();
