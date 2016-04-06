"use strict";

if(typeof window == "undefined"){
    var fs = require('fs');
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
    console.log("lin-1",lines[matches[2]-1]);
    console.log("linea",lines[matches[2]]);
    console.log("lin+1",lines[matches[2]+1]);
    console.log("linea",line);
    return "console.log(`"+line+"`)";
}

function ejemplo1(){
var x = "vacío";
eval(superassert("esto" == x));

return "si!"
}

eval(superassert(ejemplo1()));

