// var sqlExpression = "select f(3,a,b>5) AND (c.f + 3 ) :: text || 'hola' is null";
var sqlExpression = "select f(3,a,b>5) AND (c.f + 3 ) || 'hola' is null";


console.log('\n##########AST generado con sqlite-parser ########## ');
try {
    var sqliteParser = require('sqlite-parser');
    var ast = sqliteParser(sqlExpression);
    console.log(JSON.stringify(ast));
} catch (e) {
    console.log('ERROR ', e);
}


console.log('\n##########AST generado con flora-sql-parser ##########');
try {
    var Parser = require('flora-sql-parser').Parser;
    var parser = new Parser();
    var ast = parser.parse(sqlExpression);
    console.log(JSON.stringify(ast));
} catch (e) {
    console.log('ERROR ', e);
}

console.log('\n##########AST generado con node-sqlparser ########## ');
try {
    var parse = require('node-sqlparser').parse;
    var astObj = parse(sqlExpression);
    console.log(JSON.stringify(astObj));
} catch (e) {
    console.log('ERROR ', e);
}

