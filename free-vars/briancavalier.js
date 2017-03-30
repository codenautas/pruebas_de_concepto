// https://gist.github.com/briancavalier/4a820b32e0d2abca89f7

var a = 123, b = 'hello';
function test(x, y) {
	console.log(this);
	return a + x + b + y;
}

// Serialize a function *with its captured environment*
var sf = serialize(test, { a: a, b: b });

// Deserialize with captured environment
var pf = parse(sf);

// And call it
console.log(pf(10, ', world'));

function serialize(f, env) {
	return JSON.stringify({ src: f.toString(), env: env });
}

function parse(serialized) {
	var parsed = JSON.parse(serialized);
	return createFunction(parsed.src, parsed.env);
}

function createFunction(src, env) {
	return (new Function(createFunctionBody(src, env))(env));
}

function createFunctionBody(src, env) {
	return '"use strict";\n' + Object.keys(env).reduceRight(addVar, 'return ' + src + ';');
}

function addVar(s, k) {
	return 'var ' + k + ' = arguments[0].' + k + ';\n' + s;
}