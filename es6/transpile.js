"use strict";

var Path = require('path');

console.log('transpiling... accounting-machine');

require('es6-transpiler').run({
    filename: 'hola.js',
    outputFilename: 'hola5.js'
});
