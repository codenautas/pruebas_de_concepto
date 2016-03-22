var a={uno:1, dos:2}
var b={dos:2, uno:1}
var c={dos:2, uno:1}

console.log('is a b', Object.is(a,b));
console.log('is b c', Object.is(c,b));