"use strict";

var expect = require('expect.js');
var fs = require('fs-promise');
var expectCalled = require('expect-called');
var promexcep = require('../varios/promesas_execp.js');
var rutas = require('../varios/rutas.js');

describe('rutas', function(){
    it('fail on invalid filename', function(done) {
        rutas.realPath(null).then(function(rv){
            done("Must return a reject promise, because file is null");
        }).catch(function(err){
            expect(err).to.be.a(Error);
            expect(err.message).to.match(/null file/);
            done();
        });
        rutas.realPath("wrongfile.nonexistent").then(function(rv){
            //console.log("rv", rv);
            done("Must return a reject promise, because file is invalid");
        }).catch(function(err){
            //console.log("err", err);
            expect(err).to.be.a(Error);
            console.log("err.message", err.message, "\nmatches: ", err.message.match(/is not a file/) ? "yes" : "no");
            expect(err.message).to.match(/is not a file/);
            done();
        });
    });
});

describe('varios', function(){
    it('exceptions in promises', function(done) {
        promexcep.check(null).then(function(rv){
            done("Must return a reject promise, because parameter is null");
        }).catch(function(err){
            expect(err).to.be.a(Error);
            expect(err.message).to.match(/null path/);
            done();
        });
    });
});
