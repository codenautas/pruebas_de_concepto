"use strict";

if(typeof window == "undefined"){
    var fs = require('fs');
}

function extractExpressions(expresion){
    return [
        "x + '+ 1 || '+ y + '> 9'",
        "(x + 1) + ' || '+ y + '> 9'",
        "(x + 1) + ' || '+ (y > 9)",
        "(x + 1) || (y > 9)"
    ]
}

function superassert(expression){
    var stack=new Error().stack;
    console.log('RESULT', expression);
    var linea=stack.split(/\n\r?/)[2];
    var matches = linea.match(/\((.*):(\d+):(\d+)\)/);
    var fileName = matches[1];
    superassert.files = superassert.files || {};
    if(!(fileName in superassert.files)){
        var fuente = fs.readFileSync(fileName, 'utf8');
        superassert.files[fileName] = fuente;
    }else{
        fuente = superassert.files[fileName];
    }
    var lines = fuente.split(/\n\r?/);
    var line = lines[matches[2]-1].substr(matches[3]-1);
    console.log("expect fail",fileName+':'+matches[2]);
    console.log(line);
    return extractExpressions(line).map(function(expresionsToEval){
        return "console.log("+expresionsToEval+")";
    }).join(',');
}

var y = 9;

function ejemplo1(){
var x = "vacío";
eval(superassert(x + 1 && y > 9));
return false
}

var x = -1;

ejemplo1();

eval(superassert(x + 1 || y > 9 ));

