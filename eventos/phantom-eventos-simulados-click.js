var page = require('webpage').create();
var fs = require('fs');
var fileName = fs.absolute('./eventos-simulados-click.html');
console.log('rendering '+fileName)
//page.open('file:///D:/hecho/npm/pruebas_de_concepto/eventos/eventos-simulados-click.html', function() {
page.open('file:///'+fileName, function() {
  page.render(fileName+'.png');
  phantom.exit();
});