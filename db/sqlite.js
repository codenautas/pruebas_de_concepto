"use strict";

var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('PEPE.db', sqlite3.OPEN_CREATE |sqlite3.OPEN_READWRITE);

console.log("db", db);

db.serialize(function() {
  db.run("DROP TABLE IF EXISTS lorem");
  db.run("CREATE TABLE lorem (info TEXT)");
    
  db.run("INSERT INTO lorem VALUES('simple run')");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  console.log("stmt", stmt);
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });

});

db.close();
