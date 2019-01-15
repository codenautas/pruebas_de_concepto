"use strict";
function uno() {
    return ['uno'];
}
function dos(uno) {
    uno.push('dos');
}
var tres = uno();
// dos(tres);
console.log(tres);
