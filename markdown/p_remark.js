"use strict";
var pruMD = require('./pru-md.js');

var remark = require('remark');
var html = require('remark-html');
var Promises = require('best-promise');

function remarkPromise(content) {
    return Promises.make(function(resolve, reject) {
        try {
            var res = remark().use(html, {/*sanitize:true, */commonmark: true}).process([content].join('\n'));
            resolve(res);            
        } catch (e) {
            console.log("remark error", e);
            reject(e);
        }

    });
};

pruMD.probar({parse : function(content) { return remarkPromise(content).then(function(res) { return res; }); },
              name : function() { return 'remark'; }}).then(function(out) { console.log(out); });