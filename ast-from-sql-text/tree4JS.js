// Recorrido de arbol, 

global.finalResult = '';

// ejemplos 

// ejemplos simples
t = {
    a: 2,
    b: 4,
    c: true
};
// var sqlExpression = "select 1+t.a is 3"; // ok da true
// var sqlExpression = "select (1+t.a) * (1+t.b) is 15 AND t.c"; //ok
// var sqlExpression = "select 1+t.a * 1+t.b is 15 AND t.c"; // ok da false
// var sqlExpression = "select 1+t.a * 1+t.b is 7 AND t.c"; // ok da true


// ejemplos mas complejos
 c = {f:50};
 var sqlExpression = "select 2+4 AND 8+c.f+3 AND 'hola' is null";

try {
    console.log(sqlExpression);
    var sqliteParser = require('sqlite-parser');
    var ast = sqliteParser(sqlExpression);
    var astStatement = ast.statement[0].result[0];
    console.log('\n resolución en JS');
    console.log(processTree(astStatement));
    console.log(finalResult);
} catch (e) {
    console.log('ERROR ', e);
}

//probar ternario
//recursive function
function processTree(ast) {
    var returnValue;
    if (ast.type == 'literal') {
        returnValue = isNaN(ast.value) ? ast.value : Number(ast.value);
        global.finalResult += ' ' + returnValue + ' ';
    } else if (ast.type == 'identifier') {
        //split in table and column
        var idParts = ast.name.split('.');
        returnValue = global[idParts[0]][idParts[1]];
        global.finalResult += ' ' + returnValue + ' ';
    } else {
        //recursive call
        global.finalResult += '(';
        var leftVal = processTree(ast.left);
        global.finalResult += ' ' + ast.operation + ' ';
        var rightVal = processTree(ast.right);
        global.finalResult += ')';
        returnValue = evaluate(ast.operation, leftVal, rightVal);
    }
    return returnValue;
}

//las operaciones binarias simples se pueden reimplementar con eval y un diccionario "sql to js" asi -> eval(a+'*'+b)
function evaluate(operation, leftValue, rightValue) {
    var returnValue;
    switch (operation) {
        case '+':
            returnValue = leftValue + rightValue;
            break;
        case '*':
            returnValue = leftValue * rightValue;
            break;
        case 'is':
            returnValue = leftValue == rightValue;
            break;
        case 'and':
            returnValue = leftValue && rightValue;
            break;
        default:
            throw new Error('Tipo de operación "' + operation + '" no conocido');
    }
    return returnValue;
}
