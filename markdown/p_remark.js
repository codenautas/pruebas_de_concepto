"use strict";
var pruMD = require('./pru-md.js');

var remark = require('remark');
var html = require('remark-html');
var Promises = require('best-promise');

function remarkPromise(html) {
    return Promises.make(function(resolve, reject) {
        resolve(remark().use(html, {/*sanitize:true, */commonmark: true}).process([content].join('\n')));
    });
};

pruMD.probar({parse : function(content) { return remarkPromise(content); },
              name : function() { return 'remark'; }}).then(function(out) { console.log(out); });