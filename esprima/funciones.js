"use strict";

var esprima=require('esprima');

console.dir(esprima.parse("(function(x){return x-1;}(1))") ,{depth:7})