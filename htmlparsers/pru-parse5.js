var fs = require("fs-promise");
var parse5 = require('parse5');

fs.readFile('./pag1.htm', {enconding:'utf8'}).catch(function(err) {
    console.log("error", err);
}).then(function(content) {
   var html = content.toString();
   console.log("content", html);
});