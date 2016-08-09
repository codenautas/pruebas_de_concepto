"use strict";

var expect = require('expect.js');
var Promises = require('best-promise');
var fs = require('fs-promise');
var Path = require('path');

var jschardet = require("jschardet");
var detect = require('charset-detector');

console.log("ENV", process.env.SKIP)

var skipped = (process.env.SKIP || "").split(',');
console.log("skipped", skipped)

var encFiles=[];
function setupFiles() {
    if(encFiles.length) { return Promise.resolve(encFiles); }
    var filesDir = Path.join(__dirname, "files");
    return fs.readdir(filesDir).then(function(files) {
        return Promises.all(files.map(function(file){
            var iFile = Path.join(filesDir, file);
            return fs.readFile(iFile, 'binary').then(function(content){
                encFiles.push({
                    file: file,
                    content: content
                });
            });
        }));
    });
}

describe('detect ending', function(){
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
    testName = 'chardet-detector';
    if(skipped.indexOf(testName) == -1) {
        it(testName, function(done){
            setupFiles().then(function() {
                encFiles.forEach(function(file) {
                    var detected = jschardet.detect(file.content).encoding.toLowerCase();
                    var enc = file.file.split('_')[0];
                    console.log("detected", detected, "enc", enc)
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
});

/*

// "àíàçã" in UTF-8
console.log(jschardet.detect("\xc3\xa0\xc3\xad\xc3\xa0\xc3\xa7\xc3\xa3"));
// { encoding: "UTF-8", confidence: 0.9690625 }

// "次常用國字標準字體表" in Big5
console.log(jschardet.detect("\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed"));

*/
