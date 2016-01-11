"use strict";

var moment=require('moment');
var momentTZ=require('moment-timezone');

var ms = [
    moment().format('MMMM Do YYYY, h:mm:ss a'), // January 11th 2016, 11:28:54 am
    moment().format('dddd'),                   // Monday
    moment().format("MMM Do YY"),               // Jan 11th 16
    moment().format('YYYY [escaped] YYYY'),     // 2016 escaped 2016
    moment().format()                          // 2016-01-11T11:28:54-03:00
];

for(var m in ms) { console.log(ms[m]); }
