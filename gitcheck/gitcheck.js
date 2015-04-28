"use strict";

var fs = require('fs-promise');
var Promise = require('promise');
var gitcmd = require('git-command-line');

var gitcheck = {};

gitcheck.check=function check(path) {
    //console.log("check("+path+")");
    var rv = {};
    rv.git = false;
    rv.github = false;
    rv.needs_update = false;
    return Promise.resolve(path).then(function(path) {
        if(!path) { throw new Error('null path'); }
        return fs.stat(path);
    }).then(function(stats) {
        //console.log("Es directory", stats.isDirectory())
        if(false == stats.isDirectory()) {
            throw new Error("'"+path+"' is not a directory");
        }
    }).then(function() {
        return fs.stat(path+"/.git");
    }).then(function(stats) {
        //console.log("Es directory", stats.isDirectory())
        rv.git = stats.isDirectory();
    }).then(function() {
        var Git = new gitcmd(path);
        return Git.pull("--dry-run")
    }).then(function(res) {
        //console.log("git res", res);
        return Promise.resolve(0);
    }).catch(function(err) {
        return Promise.reject(err);
    });
}

module.exports = gitcheck;
