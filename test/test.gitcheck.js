"use strict";

var expect = require('expect.js');
var fs = require('fs-promise');
var expectCalled = require('expect-called');
var Promise = require('promise');
var gitcheck = require('../gitcheck/gitcheck.js');

describe('gitcheck', function(){
    it('fail on invalid path', function(done) {
        gitcheck.check(null).then(function(rv){
            done("Must return a reject promise, because parameter is null");
        }).catch(function(err){
            expect(err).to.be.a(Error);
            expect(err.message).to.match(/null path/);
            done();
        });
        gitcheck.check('thisIsAnUnexistentFile.js').then(function(rv){
            done("Must return a reject promise, because parameter is not a directory");
        }).catch(function(err){
            expect(err).to.be.a(Error);
            expect(err.message).to.match(/not a directory/);
            done();
        });
    });
});
