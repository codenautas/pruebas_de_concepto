"use strict";
var pruMD = require('./pru-md.js');
var hljs       = require('highlight.js'); // https://highlightjs.org/ 
var showdown  = require('showdown');
 
// este hack es porque npm no tiene la última versión de showdown!!!!
if(! showdown.helper.replaceRecursiveRegExp) {
var rgxFindMatchPos = function (str, left, right, flags) {
  'use strict';
  var f = flags || '',
    g = f.indexOf('g') > -1,
    x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
    l = new RegExp(left, f.replace(/g/g, '')),
    pos = [],
    t, s, m, start, end;

  do {
    t = 0;
    while ((m = x.exec(str))) {
      if (l.test(m[0])) {
        if (!(t++)) {
          s = x.lastIndex;
          start = s - m[0].length;
        }
      } else if (t) {
        if (!--t) {
          end = m.index + m[0].length;
          var obj = {
            left: {start: start, end: s},
            match: {start: s, end: m.index},
            right: {start: m.index, end: end},
            wholeMatch: {start: start, end: end}
          };
          pos.push(obj);
          if (!g) {
            return pos;
          }
        }
      }
    }
  } while (t && (x.lastIndex = s));

  return pos;
};

    showdown.helper.isFunction = function isFunction(a) {
  'use strict';
  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

    showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
  'use strict';

  if (!showdown.helper.isFunction(replacement)) {
    var repStr = replacement;
    replacement = function () {
      return repStr;
    };
  }

  var matchPos = rgxFindMatchPos(str, left, right, flags),
      finalStr = str,
      lng = matchPos.length;

  if (lng > 0) {
    var bits = [];
    if (matchPos[0].wholeMatch.start !== 0) {
      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
    }
    for (var i = 0; i < lng; ++i) {
      bits.push(
        replacement(
          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
          str.slice(matchPos[i].match.start, matchPos[i].match.end),
          str.slice(matchPos[i].left.start, matchPos[i].left.end),
          str.slice(matchPos[i].right.start, matchPos[i].right.end)
        )
      );
      if (i < lng - 1) {
        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
      }
    }
    if (matchPos[lng - 1].wholeMatch.end < str.length) {
      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
    }
    finalStr = bits.join('');
  }
  return finalStr;
};
   
}
 
showdown.extension('codehighlight', function() {
  function htmlunencode(text) {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
      );
  }
  return [
    {
      type: 'output',
      filter: function (text, converter, options) {
          try {
            // use new shodown's regexp engine to conditionally parse codeblocks
            var left  = '<pre><code\\b[^>]*>',
                right = '</code></pre>',
                flags = 'g',
                replacement = function (wholeMatch, match, left, right) {
                  // unescape match to prevent double escaping
                  match = htmlunencode(match);
                  return left + hljs.highlightAuto(match).value + right;
                };
            return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);              
          }catch(err) {
              console.log('hightlight error', err);
          }
      }
    }
  ];
});

var opts = {
    extensions: ['codehighlight'],
    tables:true,
    tablesHeaderId: true,
    omitExtraWLInCodeBlocks: true,
    noHeaderId: true,
    prefixHeaderId: true,
    headerLevelStart: true,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    literalMidWordUnderscores: true,
    strikethrough: true,
    ghCodeBlocks: true,
    tasklists: true,
    smoothLivePreview: true
};
  
var converter = new showdown.Converter(opts);
//console.log("converter.options", converter.getOptions());
pruMD.probar({parse : function(content) { return converter.makeHtml(content); },
              name : function() { return 'showdown'; }}).then(function(out) { console.log(out); });