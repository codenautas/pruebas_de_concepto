"use strict";
var pruMD = require('./pru-md.js');

var remark = require('remark');
var html = require('remark-html');

pruMD.probar({parse : function(content) { return remark().use(html, {/*sanitize:true, */commonmark: true}).process([content].join('\n')); },
              name : function() { return 'remark'; }}).then(function(out) { console.log(out); });