"use strict";

var Remarkable = require("remarkable");
var md = new Remarkable("full",{html:true});

console.log(md.render("# title\n")); //ok
// bad:
console.log(md.render("<!-- comment -->\n# title\n"));
