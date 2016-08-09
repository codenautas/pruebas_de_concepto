"use strict";

var expect = require('expect.js');
var Promises = require('best-promise');
var fs = require('fs-promise');
var Path = require('path');

var jschardet = require("jschardet");
var charsetDetector = require('charset-detector');
var is_utf8 = require('is-utf8');
var isUtf8 = require('isutf8');

var skipped = (process.env.SKIP || "").split(',');
//console.log("skipped", skipped)

var encFiles=[];
function setupFiles() {
    if(encFiles.length) { return Promise.resolve(encFiles); }
    var filesDir = Path.join(__dirname, "files");
    return fs.readdir(filesDir).then(function(files) {
        return Promises.all(files.map(function(file){
            var iFile = Path.join(filesDir, file);
            return fs.readFile(iFile).then(function(content){
                encFiles.push({
                    file: file,
                    content: content
                });
            });
        }));
    });
}

describe('detect encoding', function(){
    var testName = 'jschardet';
    if(skipped.indexOf(testName) == -1) {
        it(testName, function(done){
            setupFiles().then(function() {
                encFiles.forEach(function(file) {
                    var detected = jschardet.detect(file.content).encoding.toLowerCase();
                    var enc = file.file.split('_')[0];
                    if(detected=='iso-8859-2') {
                        console.log("expected failure on '"+file.file+"'", detected, enc)
                    } else {
                        expect(detected).to.eql(enc);
                    }
                });
                done();
            }).catch(function(err) {
                console.log("mal", err);
                done(err);
            });
        });   
    } else it.skip(testName);
    testName = 'charset-detector';
    if(skipped.indexOf(testName) == -1) {
        it(testName, function(done){
            setupFiles().then(function() {
                encFiles.forEach(function(file) {
                    var detected = charsetDetector(file.content)[0].charsetName.toLowerCase();
                    var enc = file.file.split('_')[0];
                    //console.log("detected", detected, "enc", enc, file.file)
                    if(file.file.match(/con-bom/)) {
                        expect(detected).to.eql('utf-8');
                    } else {
                        expect(detected).to.eql('iso-8859-1');
                    }
                });
                done();
            }).catch(function(err) {
                console.log("mal", err);
                done(err);
            });
        });   
    } else it.skip(testName);
    testName = 'is_utf8';
    if(skipped.indexOf(testName) == -1) {
        it(testName, function(done){
            setupFiles().then(function() {
                encFiles.forEach(function(file) {
                    var detected = is_utf8(file.content);
                    var enc = file.file.split('_')[0];
                    //console.log("detected", detected, "enc", enc)
                    if(enc.match(/utf-8/)) {
                        expect(detected).to.be.ok();
                    } else {
                        expect(detected).not.to.be.ok();
                    }
                });
                done();
            }).catch(function(err) {
                console.log("mal", err);
                done(err);
            });
        });   
    } else it.skip(testName);
    testName = 'isUtf8';
    if(skipped.indexOf(testName) == -1) {
        it(testName, function(done){
            setupFiles().then(function() {
                encFiles.forEach(function(file) {
                    var detected = isUtf8(file.content);
                    var enc = file.file.split('_')[0];
                    //console.log("detected", detected, "enc", enc)
                    if(enc.match(/utf-8/)) {
                        expect(detected).to.be.ok();
                    } else {
                        expect(detected).not.to.be.ok();
                    }
                });
                done();
            }).catch(function(err) {
                console.log("mal", err);
                done(err);
            });
        });   
    } else it.skip(testName);
});
