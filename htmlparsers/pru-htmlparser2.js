var fs = require("fs-promise");
var htmlparser = require("htmlparser2");

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


