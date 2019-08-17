"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs_1 = require("fs");
console.log('x323', process.cwd());
var options = {
    noEmitOnError: true,
    noImplicitAny: true,
    strict: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    experimentalDecorators: true
};
var fileName = '../ts-decorators/src/class.ts';
/*
var program = ts.createProgram([fileName],options);
console.log(program.emit())
*/
var sourceFile = ts.createSourceFile(fileName, fs_1.readFileSync(fileName).toString(), ts.ScriptTarget.ES2015, 
/*setParentNodes */ true);
function delint(sourceFile) {
    delintNode(sourceFile, '');
    function delintNode(node, prefix) {
        console.dir(node, { depth: 1 });
        ts.forEachChild(node, function (node) {
            delintNode(node, prefix + '   ');
        });
    }
}
exports.delint = delint;
delint(sourceFile);
//# sourceMappingURL=compiler.js.map