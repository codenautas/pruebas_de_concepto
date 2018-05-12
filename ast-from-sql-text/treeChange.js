// Recorrido de arbol, 

global.operators = {
    '+': 'primitive',
    '-': 'primitive',
    '*': 'primitive',
    'not': 'sql',
    'is': 'sql',
    '=': 'sql',
    'and': 'sql',
    'or': 'sql',
    '/': 'function'
}
global.sqlToJsOps = {
    'is': '==',
    '=': '==',
    'and': '&&',
    'or': '||',
    'not': '!'
}

global.functionOpName = {
    '/': 'div'
}

global.pk='XXXXXX';


// ejemplos 

//  c = {f:50};
//  var sqlExpression = "select 2+4 AND 8+c.f+3 AND 'hola' is null";

var sqlExpression = "select 2+4 = 6 AND fun(a,b,c) AND not x.y OR  6/2          is 3";
//debería quedar 
// JS                       2+4 == 6 && fun(a,b,c)  &&  ! x.y  || div(6, 2, pk) == 3
// SQL                      2+4 = 6 AND fun(a,b,c) AND not x.y OR div(6, 2, pk) is 3

console.log(sqlExpression);
try {
    var sqliteParser = require('sqlite-parser');
    var ast = sqliteParser(sqlExpression);
    var astStatement = ast.statement[0].result[0];
    console.log(processTree(astStatement));
} catch (e) {
    console.log('ERROR ', e);
}

//probar ternario
//recursive function
function processTree(ast) {
    var returnValue;
    if (ast.type == 'literal') {
        returnValue = isNaN(ast.value) ? ast.value : Number(ast.value);
    } else if (ast.type == 'identifier') {
        returnValue = 'var('+ast.name+')';
    } else {
        var args = ast.args? ast.args.expression: ast.expression? [ast.expression]: [ast.left, ast.right];
        args = args.map(function(arg){ return processTree(arg)});
        if (ast.type == 'function') {
            returnValue = ast.name.name + '(' + args.join(',') + ')' ;
        
        } else {
            //recursive call
            returnValue = '(' + (ast.format == 'binary'? transformBinaryOperation(ast.operation, args): global.sqlToJsOps[ast.operator] +' '+ args[0]) + ')';
        }
    }
    return returnValue;
}

//las operaciones binarias simples se pueden reimplementar con eval y un diccionario "sql to js" asi -> eval(a+'*'+b)
function transformBinaryOperation(operator, args) {
    var leftValue = args[0];
    var rightValue = args[1];
    var result;
    switch (global.operators[operator]) {
        case 'primitive':
            result = leftValue + operator + rightValue;
            break;
        case 'sql':
            result = leftValue + global.sqlToJsOps[operator] + rightValue;
            break;
        case 'function':
            result = `${global.functionOpName[operator]}(${leftValue}, ${rightValue}, ${global.pk})`;
            break;
        default:
            break;
    }
    return result;
}
