"use strict";

var bestGlobals = require('best-globals');

(async function(){

console.log('empiezo');

await bestGlobals.sleep(1000);

console.log('despierto');

var x = await Promise.all([async function(){
    await bestGlobals.sleep(1500);
    console.log('1500')
}(), async function(){
    await bestGlobals.sleep(500);
    console.log('500')
}()]);

console.log('espere', x)

})();