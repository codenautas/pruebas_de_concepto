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
        rutas.realPath("c:\\dir1\\file1").then(function(rv){
            expect(rv).to.eql("c:\\dir1");
        }).catch(function(err){
            done(err);
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
