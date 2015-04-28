"use strict";

var gitcmd = require('git-command-line');
var Promise = require('promise');
var Path = require('path');
var fsp = require('fs-promise');

var gitcheck = {};

gitcheck.realPath = function realPath(inFile) {
    return Promise.resolve(inFile).then(function(inFile) {
        if(!inFile) { throw new Error("null file"); }
        return Promise.resolve(Path.dirname(Path.resolve(inFile)));
    }).catch(function(err) {
        return Promise.reject(err);
    });
};

gitcheck.check=function check(path) {
    var rv = {};
    rv.git = false;
    rv.github = false;
    rv.needs_update = false;
    var cwd = Path.normalize(process.cwd());
    var Git = null;
    //console.log("corriendo en ", cwd);
    return Promise.resolve(path).then(function(path) {
        if(!path) { throw new Error('null path'); }
        return fsp.stat(path);
    }).then(function(stats) {
        if(false == stats.isDirectory()) {
            throw new Error("'"+path+"' is not a directory");
        }
        return rv;
    }).then(function() {
        return fsp.stat(path+"/.git");
    }).then(function(stats) {
        rv.git = stats.isDirectory();
        return gitcheck.realPath(path);
    })
    .then(function(rPath) {
        process.chdir(Path.normalize(path));
        //console.log("WD", process.cwd());
        Git = new gitcmd(process.cwd());
        return Git.config('--get remote.origin.url');
    }).then(function(p) {
        if(p && p.res && p.res.match(/github.com/)) { rv.github = true; }
        return Git.pull("--dry-run") ;
    }).then(function(p) {
        //console.log("pull", p);
        if(p.res && p.res != "") {
            rv.needs_update = true;
        }
        //return Promise.resolve(rv);
        return rv;
    }).then(function() {
        //console.log("en '"+process.cwd()+"', restaurando wd", cwd);
        process.chdir(cwd);
        return Promise.resolve(rv);
    }).catch(function(err) {
        //console.log("en '"+process.cwd()+"', restaurando wd (ERR)", cwd);
        process.chdir(cwd);
        return Promise.reject(err);
    });
}

module.exports = gitcheck;
