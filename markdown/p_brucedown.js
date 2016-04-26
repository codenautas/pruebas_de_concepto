"use strict";
var pruMD = require('./pru-md.js');
var Promises = require('best-promise');
var brucedown = require('brucedown');

function bruce(html) {
    return Promises.make(function(resolve, reject) {
        brucedown(html, function (err, htmlResult) {
            if(err) { reject(err); }
            resolve (htmlResult);
        })
    });
};

pruMD.probar({parse : function(content) { return bruce(content).then(function(res) { return res; }); },
              name : function() { return 'brucedown'; }}).then(function(out) { console.log(out); });
