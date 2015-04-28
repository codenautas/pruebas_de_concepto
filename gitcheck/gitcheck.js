"use strict";

var fs = require('fs');
//var Promise = require('promise');
var gitcmd = require('git-command-line');

var gitcheck = {};

gitcheck.check=function check(path) {
    //console.log("check("+path+")");
    if(!path) { throw new Error('null path'); }
    var base=fs.statSync(path);
    var base = fs.statSync(path);
    if(!base.isDirectory()) {
        throw new Error("wrong input:'"+path+"' is not a directory");
    }
    var rv = new Promise(function(resolve, reject) {
        this.rv={};
        resolve(0);
    });
    return rv.then(function() {
        try {
            var gd = fs.statSync(path+"/.git");
            this.rv.git = gd.isDirectory();
        }
        catch(e) {
            this.rv.git = false;
        }
        if(this.rv.git) {
            var Git = new gitcmd(path);
            return Git.status().then(function(res) {
                return Git.pull("--dry-run").then(function(res) {
                    resolve(0);
                })
            });
        }
        else {
            resolve(0);
        }
    }).fail(function(err) {
        console.error(err);
        reject(1); 
    });
}

module.exports = gitcheck;
