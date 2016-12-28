"use strict";

var grande1 = "1234567890123456789012345678901";
var grande2 = "2469135780246913578024691357802";
//var grande1 = "12345678901";
var assert = require('assert');
var Big = require('big.js');

function big(t){
    return new Big(t);
}

console.log("ok !");

describe("big", function(){
    it("add 1 to a big number", function(){
        var a = big(grande1);
        var b = a.add(big(1));
        var e = big(grande1.replace(/1$/,'2'));
        console.log("ok");
        assert(b.eq(e));
    });
    it("multiply by 2", function(){
        var a = big(grande1);
        var b = a.mul(big(2));
        var e = big(grande2);
        assert(b.eq(e));
    });
    it("divide by 5", function(){
        var a = big(grande1);
        var b = a.div(big(5));
        var e = big(grande2.replace(/2$/,'.2'));
        assert(b.eq(e));
    });
});