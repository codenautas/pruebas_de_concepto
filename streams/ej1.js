// http://stackoverflow.com/questions/16010915/parsing-huge-logfiles-in-node-js-read-in-line-by-line

var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var lineNr = 0;

var s = fs.createReadStream('big.txt')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        s.pause();

        lineNr += 1;

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        //logMemoryUsage(lineNr);
        console.log("line", lineNr, line)

        // resume the readstream, possibly from a callback
        s.resume();
    })
    .on('error', function(e){
        console.log('Error while reading file.', e);
    })
    .on('end', function(){
        console.log('Read entire file.')
    })
);