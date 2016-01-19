var fs = require("fs-promise");
var parse5 = require('parse5');

var ident=0;
var tab=3;
function printNode(node) {
    //console.log("IDENT", ident);
    var margen = Array(ident).join(' ');
    console.log(margen+"Node: ", node.nodeName);
    for(var attrName in node.attrs) {
        var attr = node.attrs[attrName];
        console.log(margen+"   Atribute", attr);
    }
    for(var childName in node.childNodes) {
        var child = node.childNodes[childName];
        ident+=tab;
        printNode(child);
        ident-=tab;
    }
};

fs.readFile('./pag1.htm', {enconding:'utf8'}).catch(function(err) {
    console.log("error", err);
}).then(function(content) {
   var html = content.toString();
   //console.log("content", html);
   var document = parse5.parse(html);
   // var documentHtml = parse5.serialize(document);
   //console.log("documentHtml", documentHtml);
   printNode(document);
});