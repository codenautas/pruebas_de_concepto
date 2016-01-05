function getInfo(id){
    var theElement = document.getElementById(id);
    var rect = theElement.getBoundingClientRect();
    return {
        value: 'getTypedValue' in theElement?theElement.getTypedValue():'not adapted',
        cx: Math.floor((rect.left+rect.right)/2),
        cy: Math.floor((rect.top+rect.bottom)/2),
        isActive: document.activeElement === theElement
    };
}

casper.on("remote.message", function(msg) {
    this.echo("Console: " + msg);
});

casper.on("page.error", function(msg, trace) {
    this.echo("page Error: " + msg);
});

casper.on("resource.error", function(msg, trace) {
    this.echo("Res.Error: " + msg);
});

casper.test.begin("Test checkbox", function(test) {
    casper.start('demo.html', function() {
        test.assertTitle('tedede demo', 'titulo correcto');
        test.assertExists('#bool1', 'tengo bool1');
        
        var theElement = this.evaluate(getInfo, 'bool1');
        this.echo("theElement.getInfo");
        for(var v in theElement) {
            this.echo(" "+v+":"+theElement[v]);
        }
    }).run(function() {
        test.done();
    });    
});
