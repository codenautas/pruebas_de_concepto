"use strict";
var pruMD = require('./pru-md.js');
var Promises = require('best-promise');
var Markdown = require('machinepack-markdown');

function mpmd(html) {
    return Promises.make(function(resolve, reject) {
        return Markdown.compileToHtml({ mdString: html, escapeHtml: false/*, compileCodeBlock: '->',*/}).exec({
            error: function (err){
                //console.log("err", err);
                return reject(err);
            },
            success: function (result){
                //for(var p in result) {  console.log(p, result[p]);  }
                console.log("ok", result.substring(0,10))
                return resolve(result);
            },
         });
    });
};

/*
pruMD.probar({parse : function(content) {
                  console.log("antes");
                  return mpmd(content).then(function(res) {
                      //console.log(res)
                      //for(var p in res) {  console.log(p, res[p]);  }
                  console.log("despues");
                  return res });
             },
              name : function() { return 'machinepack'; }}).then(function(out) { console.log(out); });
*/