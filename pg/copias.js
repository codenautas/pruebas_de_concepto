"use strict";

var expect = require('expect.js');
var assert = require('assert');
var auditCopy = require('audit-copy');

var c = [1,2];

var a = [[1,2], [1,3]];
console.log(a, JSON.stringify(a));
var a2 = [[1,2], [1,2]];

var b = [c, c];

var d = [[1,2]];
d.push(d[0]);

function comparar(a,b){
    expect(a).to.eql(b);
}


describe("pruebas", function(){
    it("prueba" ,function(){

        console.log(b, JSON.stringify(b));
        console.log('a==b'  , a==b );
        console.log('a===b' , a===b);
        console.log('a==a2' , a==a2 );
        console.log('a===a2', a===a2);

        // comparar(a, a2);
        // comparar(a, b, 'a===a2');

        console.log(b,d);
        comparar(auditCopy.inObject(a), auditCopy.inObject(a2), 'a===a2');
        comparar(auditCopy.inObject(d), auditCopy.inObject(b), 'd===b');
        comparar(auditCopy.inObject(a), auditCopy.inObject(b), 'a===b');
    });
});