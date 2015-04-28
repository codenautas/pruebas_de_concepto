"use strict";

var expect = require('expect.js');
var fs = require('fs-promise');
var expectCalled = require('expect-called');
var Promise = require('promise');
var gitcheck = require('../gitcheck/gitcheck.js');

describe('realpath', function(){
    it('fail on invalid filename', function(done) {
        gitcheck.realPath(null).then(function(rv){
            done("Must return a reject promise, because file is null");
        }).catch(function(err){
            expect(err).to.be.a(Error);
            expect(err.message).to.match(/null file/);
            done();
        });
        gitcheck.realPath("c:\\dir1\\file1").then(function(rv){
            expect(rv).to.eql("c:\\dir1");
        }).catch(function(err){
            done(err);
        });
    });
});

describe('gitcheck', function(){
    it('fail on invalid path', function(done) {
        gitcheck.check(null).then(function(rv){
            done("Must return a reject promise, because parameter is null");
        }).catch(function(err){
            //console.log(err);
            expect(err).to.be.a(Error);
            expect(err.message).to.match(/null path/);
            done();
        });
        gitcheck.check('thisIsAnUnexistentFile.js').then(function(rv){
            done("Must return a reject promise, because parameter is not a directory");
        }).catch(function(err){
            //console.log(err);
            expect(err).to.be.a(Error);
            expect(err.message).to.match(/not a directory/);
            done();
        });
    });
    it('check remote repo', function(done) {
        gitcheck.check('./test/git_remoto').then(function(rv){
            //console.log("rv", rv);
            expect(rv).to.eql({'git': true, 'github': true, 'needs_update': false});
            done();
        }).catch(function(err){
            //console.log("mal", err);
            done(err);
        });
    });
    it.skip('check local repo', function(done) {
        gitcheck.check('./test/git_local').then(function(rv){
            console.log("rv", rv);
            expect(rv).to.eql({'git': true, 'github': false, 'needs_update': false});
            done();
        }).catch(function(err){
            console.log("mal", err);
            done(err);
        });
    });
});
