"use strict";

var fs = require('fs-promise');
var Promise = require('promise');
var path = require('path');

var realPath=function(input) {
    console.log("realPath", input);
    return Promise.resolve(path.dirname(path.resolve(input)))
};

realPath("promesas.s").then(function(rp) {
      console.log("OK", rp); 
});
