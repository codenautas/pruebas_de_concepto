"use strict";

var fs = require('fs');
var sav = fs.createReadStream('local-data.sav');
var spss = require('node-spss');

var process = require('process');

var result = sav.pipe(spss)

result.tap(function () {
    console.log('-------------- TAP');
    console.log(this.vars.variables);
});

result.loop(function () {
    console.log('-------------- LOOP');
    console.log(this);
    process.exit(1);
});

// result.end();

