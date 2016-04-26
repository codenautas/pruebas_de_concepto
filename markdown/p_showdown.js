"use strict";
var pruMD = require('./pru-md.js');
var hljs       = require('highlight.js'); // https://highlightjs.org/ 
var showdown  = require('showdown');
 
var extHL = function () {
  var myext1 = {
    type: 'output',
    filter:function(text, converter, options) {
        try {
            return hljs.highlightAuto(text).value;
        } catch (err) { console.log('hightlight error', err); }
        return text;
    }
  };
  return [myext1];
}
showdown.extension('extHL', extHL);

var converter = new showdown.Converter({ extensions: ['extHL'] });


pruMD.probar({parse : function(content) { return converter.makeHtml(content); },
              name : function() { return 'showdown'; }}).then(function(out) { console.log(out); });