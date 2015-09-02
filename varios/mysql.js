"use strict";

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host       : 'localhost',
  user       : 'node',
  password   : 'edon',
  database   : 'nodepru',
  socketPath : '/var/run/mysql/mysql.sock'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err; 
  console.log('The solution is: ', rows[0].solution);
});

connection.query('DROP TABLE IF EXISTS t1', function(err, rows, fields) { if (err) throw err; });
connection.query('CREATE TABLE t1(texto varchar(255))', function(err, rows, fields) { if (err) throw err; });

for(var i=0; i<30; ++i) {
    connection.query("INSERT INTO t1 VALUES('texto #"+i+"')", function(err, rows, fields) { if (err) throw err; });    
}

var query = connection.query('SELECT * FROM t1');
query
  .on('error', function(err) {
    // Handle error, an 'end' event will be emitted after this as well 
    console.log('error', err);
  })
  .on('fields', function(fields) {
    // the field packets for the rows to follow 
    console.log('fields', fields);
  })
  .on('result', function(row) {
    // Pausing the connnection is useful if your processing involves I/O 
    connection.pause();
    console.log('row', row);
    //processRow(row, function() {
        
      connection.resume();
    //});
  })
  .on('end', function() {
    // all rows have been received 
    console.log('end');
  });

connection.end();