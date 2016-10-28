"use strict"

var XLSX = require('xlsx');

var workbook = XLSX.readFile('ejemplo-2003.xls');

var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) { /* iterate through sheets */
  var worksheet = workbook.Sheets[y];
  for (var z in worksheet) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(z[0] === '!') continue;
    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
  }
});