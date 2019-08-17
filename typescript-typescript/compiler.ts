import * as ts from "typescript";
import {readFileSync} from "fs";

console.log('x323',process.cwd())

var options:ts.CompilerOptions={
  noEmitOnError: true,
  noImplicitAny: true,
  strict: true, 
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  experimentalDecorators:true
};

var fileName='../ts-decorators/src/class.ts';

/*
var program = ts.createProgram([fileName],options);
console.log(program.emit())
*/

const sourceFile = ts.createSourceFile(
  fileName,
  readFileSync(fileName).toString(),
  ts.ScriptTarget.ES2015,
  /*setParentNodes */ true
);

export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile,'');
  function delintNode(node: ts.Node, prefix:string) {
    console.dir(node, {depth:1});
    ts.forEachChild(node, function(node){
      delintNode(node, prefix+'   ')
    });
  }
}

delint(sourceFile)