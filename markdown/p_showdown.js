"use strict";
var pruMD = require('./pru-md.js');

var showdown  = require('showdown'),
    converter = new showdown.Converter();

pruMD.probar({parse : function(content) { return converter.makeHtml(content); },
              name : function() { return 'showdown'; }}).then(function(out) { console.log(out); });