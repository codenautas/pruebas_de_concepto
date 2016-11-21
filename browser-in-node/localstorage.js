"use strict";

var localStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

if(localStorage.getItem('myFirstKey')) {
    console.log("got it");
} else {
    console.log("setting it");
    localStorage.setItem('myFirstKey', 'myFirstValue');
}
console.log(localStorage.getItem('myFirstKey'));