"use strict";

//var yaml = require('js-yaml');
var yaml = require('./custom-yaml.js');

var parte={
    parteA: "A",
}

var convertir={
    fecha: new Date(1969, 5-1, 6),
    bigNumber: 12345678901234567890,
    bool: true,
    null: null,
    undef: undefined,
    strDate: "2012-01-02",
    strStr: "hola",
    parte: parte,
    partes: [parte, parte],
    rombo: {a:parte, b:parte},
    array: [1,"2", false],
    regex: /hola/,
    fun: function(x){ return x+1; }
};

console.log("undefined", yaml.customLoad(yaml.customDump(undefined)))

for(var p in convertir){
    console.log('------',p,':');
    // usa este par de funciones que andan (hasta que llegan regex/fun)
    try {
       console.log(yaml.customLoad(yaml.customDump(convertir[p]))); 
    }
    catch(err) {
        var ok = (p === 'fun' || p === 'regex');
        var m = ok ? "OK" : "INESPERADO";
        console.log(ok ? m+" falla con "+p : m+":"+err)
    }
    
}

console.log('-------------');
console.log(yaml.load(" id_type: pepe\n "));
console.log(yaml.load('- card\n- 123456\n '));

console.log(yaml.load(yaml.dump(convertir.fun)).toString());