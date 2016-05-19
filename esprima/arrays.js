"use strict";

var esprima=require('esprima');

var obj={other: 1, two:2};
var other='two';

console.dir(esprima.parse("obj.other") ,{depth:4})
console.dir(esprima.parse("obj[other]"),{depth:4})
console.dir(esprima.parse("obj['other']"),{depth:4})
console.dir(esprima.parse("obj[3]"),{depth:4})