"use strict";

// pretende usar d:\Microsoft.Cpp.Default.props

var parseXlsx = require('excel');
var fs = require('fs');

[
  {nombre: 'ejemplo.xlsx',    blanks:true },
].forEach(function(fixture){
    console.log('fixture',fixture)
    parseXlsx(fixture.nombre, '2', function(err, records){
      if(err){
          console.error(err);
      }
      fs.writeFile(fixture.nombre+'.json',JSON.stringify(records,null,'  '),err=>console.log('listo',fixture,err));
    });
});