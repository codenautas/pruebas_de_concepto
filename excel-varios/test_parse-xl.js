"use strict"

var Parser = require('parse-xl')
var Promises = require('best-promise');
var fs = require('fs-promise');

fs.readdir('.').then(function(files) {
    return Promises.all(files.filter(function(file) { return file.match(/(\.xlsx?)$/); }).map(function(xls) {
        console.log('xls: ', xls);
        var sample = new Parser(xls);
        console.log("  ", JSON.stringify(sample,null,'  '));
    }));
}).catch(function(err) {
    console.log("Error", err)
});
