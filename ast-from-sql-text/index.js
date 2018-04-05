// var sqlExpression = "select f(3,a,b>5) AND (c.f + 3 ) :: text || 'hola' is null";
 var sqlExpression = "select f(3,a,b>5) AND (c.f + 3 ) || 'hola' is null";

try {
    var sqliteParser = require('sqlite-parser');
    var ast = sqliteParser(sqlExpression);
    var astStatement = ast.statement[0].result[0];
    console.log('\n##########AST generado con sqlite-parser ########## ');
    console.log(JSON.stringify(ast));
} catch (e) {
    console.log('ERROR ', e);
}