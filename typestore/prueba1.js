"use strict"

var JSON4all=require('json4all');
var typeStore=require('type-store');

JSON4all.instancia=1;

var bigInt='1234567812345678';
var typeStoreTest=typeStore.type.bigint.fromString(bigInt);
console.log("orignal ",typeStoreTest)
var JSON4allString=JSON4all.stringify(typeStoreTest);
console.log("string  ",JSON4allString)
var JSON4allParseTest=JSON4all.parse(JSON4allString);
console.log("parseado",JSON4allParseTest)

var json4allx=require('json4all');

console.log('instancia',JSON4all.instancia,json4allx.instancia);