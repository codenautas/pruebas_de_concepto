var fs = require("fs-promise");
var htmlparser = require("htmlparser2");

if(false) {
    fs.readFile('./pag0.htm', {enconding:'utf8'}).catch(function(err) {
        console.log("error", err);
    }).then(function(content) {
        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs){
                console.log("open", name);
                if(name === "script" && attribs.type === "text/javascript"){
                    console.log("JS! Hooray!");
                }
            },
            ontext: function(text){
                console.log("-->", text);
            },
            onclosetag: function(tagname){
                console.log("close", tagname);
                if(tagname === "script"){
                    console.log("That's it?!");
                }
            }
        }, {decodeEntities: true});
        parser.write(content);
        parser.end();
    }).catch(function(err) {
        console.log("error", err);
    });
}

var space = '   ';
function printElem(elem, pad) {
    console.log(pad+"name:"+elem.name+", type:", elem.type);
    if(elem.attribs) {
        //console.log(pad+"attribs", elem.attribs)
        for(var a in elem.attribs) {
            console.log(pad+space+"attrib:"+a+"='"+elem.attribs[a]+'"');
        }
    }
    if(elem.children && elem.children.length) {
        for(var c=0; c<elem.children.length; ++c) {
            pad += space;
            printElem(elem.children[c], pad);
            pad = pad.substring(pad.length-space.length)
        }
    }
}

fs.readFile('./pag0.htm', {enconding:'utf8'}).catch(function(err) {
    console.log("error", err);
}).then(function(content) {
    var dom = htmlparser.parseDOM(content);
    for(var d=0; d<dom.length; ++d) {
        printElem(dom[d], '');
    }
}).catch(function(err) {
    console.log("error", err);
});

