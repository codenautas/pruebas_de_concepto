"use strict";

// pretende usar d:\Microsoft.Cpp.Default.props

var read = require('excel-data').read; 
var fs = require('fs');

[
  {nombre: 'ejemplo.xlsx',    blanks:true },
].forEach(function(fixture){
    console.log('fixture',fixture)
    read([fixture.nombre]).then(function(records){
      fs.writeFile(fixture.nombre+'.json',JSON.stringify(records,null,'  '),err=>console.log('listo',fixture));
    },function(err){
      console.error(err);
    });
});