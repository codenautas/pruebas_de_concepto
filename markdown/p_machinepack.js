"use strict";
var pruMD = require('./pru-md.js');
var Promises = require('best-promise');
var Markdown = require('machinepack-markdown');

function mpPromise(html) {
    return Promises.make(function(resolve, reject) {
        return Markdown.compileToHtml({ mdString: html, escapeHtml: false/*, compileCodeBlock: '->',*/}).exec({
            error: function (err){
                //console.log("err", err);
                return reject(err);
            },
            success: function (result){
                return resolve(result);
            },
         });
    });
};

pruMD.probar({parse : function(content) { return mpPromise(content).then(function(res) { return res }); },
              name : function() { return 'machinepack'; }}).then(function(out) { console.log(out); });
