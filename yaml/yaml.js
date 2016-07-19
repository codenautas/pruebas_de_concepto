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
    array: [1,"2", false]
};

for(var p in convertir){
    console.log('------',p,':');
    var u=yaml.dump(convertir[p]);
    console.log(u);
    try{
        var s=yaml.safeDump(convertir[p], {schema:yaml.SPACE_SCHEMA});
    }catch(err){
        s=err;
    }
    if(u!=s){
        console.log(s);
    }
    var o=yaml.load(u)
    console.log(o,o && o.a?(o.a===o.b):'');
}

console.log('-------------');
console.log(yaml.load(" id_type: pepe\n "));
console.log(yaml.load('- card\n- 123456\n '));
