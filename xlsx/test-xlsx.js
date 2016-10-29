"use strict"

var XLSX = require('xlsx');
var Promises = require('best-promise');
var fs = require('fs-promise');

fs.readdir('.').then(function(files) {
    return Promises.all(files.filter(function(fileName) { return fileName.match(/(\.xlsx?)$/); }).map(function(excelFileName) {
        console.log('========== file: ', excelFileName);
        var workbook = XLSX.readFile(excelFileName);
        var sheetNameList = workbook.SheetNames;
        sheetNameList.forEach(function(sheetName) { // iterate through sheets
          console.log('sheet name',sheetName)
          var worksheet = workbook.Sheets[sheetName];
          console.log(worksheet);
          return;
          for(var z in worksheet) {
              console.log(z, worksheet[z]);
            // all keys that do not begin with "!" correspond to cell addresses
            //if(z[0] === '!') continue;
            //console.log('  ', y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
          }
        });
    })).catch(function(err){
        console.log(err);
    }).then(function(){
        console.log('Así se verá');
    });
});
