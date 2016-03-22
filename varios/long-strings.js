"use strict";

console.log('one:' , `this is a long string
that continues in second
and third line`);

function show(strings, values){
    console.log('raw', strings.raw);
    console.log('strings', strings);
    console.log('values', values);
    console.log('arguments', arguments);
    return 'ok';
}

console.log(String.raw`uno ${1} true ${true}, suma ${2+3}, objeto ${{uno:1, dos:2}}, arreglo ${['alfa', 'beta']}`);
console.log(show`uno ${1} true ${true}, suma ${2+3}, objeto ${{uno:1, dos:2}}, arreglo ${['alfa', 'beta']} \n fin \u0065`);
