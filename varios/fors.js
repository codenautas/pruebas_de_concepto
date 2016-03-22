"use strict";

var mapa = new Map({uno:1, dos:2});

(function no_anda(){
    for(let a of mapa){
        console.log('a,b',a);
    }
})();

let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (let entry of iterable) {
  console.log(entry);
}
// [a, 1]
// [b, 2]
// [c, 3]

//for (let [key, value] of iterable) {
//  console.log(value);
//}