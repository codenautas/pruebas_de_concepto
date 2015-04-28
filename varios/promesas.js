"use strict";

var fs = require('fs-promise');
var Promise = require('promise');
var path = require('path');

// var realPath=function(input) {
    // console.log("realPath", input);
    // return Promise.resolve(path.dirname(path.resolve(input)));
// };

// realPath("promesas.s").then(function(rp) {
      // console.log("OK", rp); 
// });

function readFile(filename){
    return Promise.resolve().then(function(){
        return fs.readFile(filename,{encoding:'utf8'});
    });
}

readFile("promesas.js").then(function(p) {
   console.log("Leido promesas.js\n", p); 
});