"use strict";

var moment=require('moment');
var momentTZ=require('moment-timezone');

moment.locale('es');

var ms = [
    moment().format('MMMM Do YYYY, h:mm:ss a'), // January 11th 2016, 11:28:54 am
    moment().format('dddd'),                   // Monday
    moment().format("MMM Do YY"),               // Jan 11th 16
    moment().format('YYYY [escaped] YYYY'),     // 2016 escaped 2016
    moment().format(),                          // 2016-01-11T11:28:54-03:00
    moment("20111031", "YYYYMMDD").fromNow(), // 4 years ago
    moment("20120620", "YYYYMMDD").fromNow(), // 4 years ago
    moment().startOf('day').fromNow(),        // 12 hours ago
    moment().endOf('day').fromNow(),          // in 12 hours
    moment().startOf('hour').fromNow(),       // 33 minutes ago
    moment().subtract(10, 'days').calendar(), // 01/01/2016
    moment().subtract(6, 'days').calendar(),  // Last Tuesday at 11:33 AM
    moment().subtract(3, 'days').calendar(),  // Last Friday at 11:33 AM
    moment().subtract(1, 'days').calendar(),  // Yesterday at 11:33 AM
    moment().calendar(),                      // Today at 11:33 AM
    moment().add(1, 'days').calendar(),       // Tomorrow at 11:33 AM
    moment().add(3, 'days').calendar(),       // Thursday at 11:33 AM
    moment().add(10, 'days').calendar(),      // 01/21/2016
    moment().format('L'),    // 11/01/2016
    moment().format('l'),    // 11/1/2016
    moment().format('LL'),   // 11 de enero de 2016
    moment().format('ll'),   // 11 de ene. de 2016
    moment().format('LLL'),  // 11 de enero de 2016 11:34
    moment().format('lll'),  // 11 de ene. de 2016 11:34
    moment().format('LLLL'), // lunes, 11 de enero de 2016 11:34
    moment().format('llll'), // lun., 11 de ene. de 2016 11:34
];

for(var m in ms) { console.log(ms[m]); }

var momEN = moment().locale('en');
console.log("En ingles: ", momEN.format('LL'));
