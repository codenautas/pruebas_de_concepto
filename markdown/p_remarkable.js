"use strict";
var pruMD = require('./pru-md.js');
var Remarkable = require("remarkable");
var md = new Remarkable("full",{html:true});

var Promises = require('best-promise');

function remarkablePromise(html) {
    return Promises.make(function(resolve, reject) {
        resolve(md.render(html));
    });
};

pruMD.probar({parse : function(content) { return remarkablePromise(content); },
              name : function() { return 'remarkable'; }}).then(function(out) { console.log(out); });
              
