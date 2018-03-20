var sqlExpression = 'SELECT * WHERE foo <> "bar" OR bar LIKE "asfd"';


console.log('\n##########AST generado con sqlite-parser ########## ');
var sqliteParser = require('sqlite-parser');
var ast = sqliteParser(sqlExpression);
console.log(JSON.stringify(ast));


console.log('\n##########AST generado con flora-sql-parser ##########');
var Parser = require('flora-sql-parser').Parser;
var parser = new Parser();
var ast = parser.parse(sqlExpression);
console.log(JSON.stringify(ast));


console.log('\n##########AST generado con node-sqlparser ########## ');
var parse = require('node-sqlparser').parse;
var astObj = parse(sqlExpression);
console.log(JSON.stringify(astObj));

