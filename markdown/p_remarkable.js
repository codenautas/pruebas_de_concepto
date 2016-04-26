"use strict";
var pruMD = require('./pru-md.js');
var Remarkable = require("remarkable");
var md = new Remarkable("full",{html:true});

pruMD.probar({parse : function(content) { return md.render(content); },
              name : function() { return 'remarkable'; }}).then(function(out) { console.log(out); });
              
