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
    var rv={};
        try {
            var gd = fs.statSync(path+"/.git");
            rv.git = gd.isDirectory();
        }
        catch(e) {
            rv.git = false;
        }
        //console.log("'"+path+"' "+(rv.git ? "ES git" : "NO es git"));
        if(rv.git) {
            var Git = new gitcmd(path);
            return Git.status().then(function(res) {
                return Git.pull("--dry-run").then(function(res) {
                    console.log("git pull on '", path, "': ", res, "\n---\n"); 
                    return rv;
            }).fail(function(err) {
                console.error(err);
                return rv;
            })
            });
        }
        else {
            return rv;
        }
}

module.exports = gitcheck;
