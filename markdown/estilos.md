<link href="markdown.css" media="all" rel="stylesheet" />
<link href="markdown2.css" media="all" rel="stylesheet" />
<link href="github.css" media="all" rel="stylesheet" />

```javascript
"use strict";
var pruMD = require('./pru-md.js');
var hljs       = require('highlight.js'); // https://highlightjs.org/ 
var showdown  = require('showdown');
var converter = new showdown.Converter();
 
var extHL = function () {
  var myext1 = {
    type: 'output',
    regex: /markdown/g,
    replace: 'showdown'
  };
  return [myext1];
}

pruMD.probar({parse : function(content) { return converter.makeHtml(content); },
              name : function() { return 'showdown'; }}).then(function(out) { console.log(out); });

```
<h4>Y una tabla</h4>
| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |