"use strict";

var Promises = require('best-promise');
var fs = require('fs-promise');

var pruMD = {}

function pruFile(fileName, parser) {
    var inFile = fileName+'.md';
    var outFile = fileName+'_'+parser.name()+'.html';
    return fs.readFile(inFile,'utf8').then(function(content) {
        //console.log(content);
        return parser.parse(content);
    }).then(function(parsed) {
        //console.log("parsed", parsed);
        return fs.writeFile(outFile, parsed);
    }).catch(function(err) {
        return "Error generando '"+outFile+"': "+err;
    }).then(function() {
        return "Se ha generado '"+outFile+"'";
    });
    
};

pruMD.probar = function probar(parser) {
    var files = ['./LEEME', './bug', './estilos'];
    return Promises.all(files.map(function(file) {
        return pruFile(file, parser);
    })).then(function(out) {
        return out.join('\n');
    });
} 

module.exports=pruMD;
