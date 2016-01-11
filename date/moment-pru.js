"use strict";

var moment=require('moment');

console.log("-------------------------- moment");

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

if(true) {
    console.log("-------------------------- moment-timezone");
    var momentTZ=require('moment-timezone');

    var arr = [2013, 5, 1];
    var str = "2013-12-01";
    var obj = { year : 2013, month : 5, day : 1 };

    var zone = "America/Buenos_Aires",
        zone2 = "America/New_York";

    var timestamp = 1403454068850,
        date = new Date(timestamp);
        
    var mtzs = [
        momentTZ.tz(arr, zone), // 2013-06-01T00:00:00-07:00
        momentTZ.tz(str, zone), // 2013-12-01T00:00:00-08:00
        momentTZ.tz(obj, zone), // 2013-06-01T00:00:00-07:00

        momentTZ.tz(arr, zone2),    // 2013-06-01T00:00:00-04:00
        momentTZ.tz(str, zone2),    // 2013-12-01T00:00:00-05:00
        momentTZ.tz(obj, zone2),    // 2013-06-01T00:00:00-04:00


        momentTZ.tz('2013-06-01T00:00:00',       zone), // 2013-06-01T00:00:00-07:00
        momentTZ.tz('2013-06-01T00:00:00-04:00', zone), // 2013-05-31T21:00:00-07:00
        momentTZ.tz('2013-06-01T00:00:00+00:00', zone), // 2013-05-31T17:00:00-07:00


        momentTZ.tz(timestamp, zone), // 2014-06-22T09:21:08-07:00
        momentTZ(timestamp).tz(zone), // 2014-06-22T09:21:08-07:00

        momentTZ.tz(date, zone),      // 2014-06-22T09:21:08-07:00
        momentTZ(date).tz(zone),      // 2014-06-22T09:21:08-07:00

        // ambiguities
        momentTZ.tz("2012-03-11 01:59:59", zone2), // 2012-03-11T01:59:59-05:00
        momentTZ.tz("2012-03-11 02:00:00", zone2), // 2012-03-11T01:00:00-05:00
        momentTZ.tz("2012-03-11 02:59:59", zone2), // 2012-03-11T01:59:59-05:00
        momentTZ.tz("2012-03-11 03:00:00", zone2), // 2012-03-11T03:00:00-04:00

        momentTZ.tz("2012-11-04 00:59:59", zone2), // 2012-11-04T00:59:59-04:00
        momentTZ.tz("2012-11-04 01:00:00", zone2), // 2012-11-04T01:00:00-04:00
        momentTZ.tz("2012-11-04 01:59:59", zone2), // 2012-11-04T01:59:59-04:00
        momentTZ.tz("2012-11-04 02:00:00", zone2), // 2012-11-04T02:00:00-05:00

    ];

    for(var m in mtzs) {
        var mom = mtzs[m];
        console.log(mom.format('ll'), mom.zoneAbbr());
    }

    console.log("Guessing: ", momentTZ.tz.guess())    
}
