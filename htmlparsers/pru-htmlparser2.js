var fs = require("fs-promise");
var htmlparser = require("htmlparser2");

fs.readFile('./pag1.htm', {enconding:'utf8'}).catch(function(err) {
    console.log("error", err);
}).then(function(content) {
});
