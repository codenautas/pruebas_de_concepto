"use strict";

var expect = require('expect.js');
var fs = require('fs-promise');
var expectCalled = require('expect-called');
var Promise = require('promise');
var gitcheck = require('../gitcheck/gitcheck.js');
 
describe('gitcheck', function(){
    it('fail on invalid path', function(done) {
        expect(function() { gitcheck.check(null); }).to.throwException(/null path/);
        expect(function() { gitcheck.check("thisIsNotADirectory.js"); console.log("listo"); }).to.throwException();
        expect(function() { gitcheck.check("thisIsAnUnexistentFile.js"); }).to.throwException();
        //var gc = gitcheck.check("D:\\cn\\multilang_last");
        var gc = gitcheck.check("..");
        expect(gc).to.eql({git : false});
        gc = gitcheck.check(".");
        //expect(gc.git).to.be(true);
        done();
    });
});
