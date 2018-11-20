(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    var code = "enum { x = 1 }";
    var sc = ts.createSourceFile('x.ts', code, ts.ScriptTarget.Latest, true);
    var indent = 0;
    function print(node) {
        console.log(new Array(indent + 1).join(' ') + ts.SyntaxKind[node.kind]);
        indent++;
        ts.forEachChild(node, print);
        indent--;
    }
    print(sc);
});
//# sourceMappingURL=read-ast.js.map