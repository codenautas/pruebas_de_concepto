"use strict";

var expect = require('expect.js');
var fs = require('fs-promise');
var expectCalled = require('expect-called');
var promexcep = require('../varios/promesas_execp.js');

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
