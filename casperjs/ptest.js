
var system = require('system');
function getInfo(page, id){
    return JSON.parse(page.evaluate(function(id){
        var theElement = document.getElementById(id);
        var rect = theElement.getBoundingClientRect();
        console.log("theElement.id", theElement.id);
        return JSON.stringify({
            value: 'getTypedValue' in theElement?theElement.getTypedValue():'not adapted',
            cx: Math.floor((rect.left+rect.right)/2),
            cy: Math.floor((rect.top+rect.bottom)/2),
            isActive: document.activeElement === theElement
        });
    }, id));
}

function sendKey(key){
    casper.page.sendEvent('keydown', key);
    casper.page.sendEvent('keyup', key);
}

casper.test.begin("Test checkbox", function(test) {
    casper.start('demo.html', function() {
        this.onConsoleMessage = function(msg) {
            system.stderr.writeLine('console: ' + msg);
        };
        this.echo(this.getTitle());
        //var bool1 = getInfo(this, 'bool1');
        //this.echo("bool1", bool1);
        test.assert(true);
        var theElement = this.evaluate(function() {
            console.log("this.evaluate");
            return document.getElementById('bool1');
        });
        for(var v in theElement) {
            if(v.toString().match(/id|type/)) {
                this.echo("  "+v+":"+theElement[v]);
            }
        }
    }).run(function() {
        test.done();
    });    
});
