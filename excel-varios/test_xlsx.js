"use strict"

var XLSX = require('xlsx');
var Promises = require('best-promise');
var fs = require('fs-promise');

fs.readdir('.').then(function(files) {
    return Promises.all(files.filter(function(file) { return file.match(/(\.xlsx?)$/); }).map(function(xls) {
        console.log('----xls: ', xls);
        var workbook = XLSX.readFile(xls);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function(y) { // iterate through sheets
          var worksheet = workbook.Sheets[y];
          console.log('----sheet',y);
          for(var z in worksheet) {
              console.log('',z, worksheet[z]);
            // all keys that do not begin with "!" correspond to cell addresses
            //if(z[0] === '!') continue;
            //console.log('  ', y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
          }
        });
    }));
});
