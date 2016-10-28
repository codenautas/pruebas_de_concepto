"use strict";

var excelParser = require('excel-parser');
var fs = require('fs');

[
  {nombre: 'ejemplo.xlsx',    blanks:true },
  {nombre: 'ejemplo-200.xls', blanks:false},
].forEach(function(fixture){
    console.log('fixture',fixture)
    excelParser.parse({
      inFile: fixture.nombre,
      skipEmpty: !fixture.blanks,
    },function(err, records){
      if(err){
          console.error(err);
      }
      fs.writeFile(fixture.nombre+'.json',JSON.stringify(records,null,'  '),err=>console.log('listo',fixture,err));
    });
});