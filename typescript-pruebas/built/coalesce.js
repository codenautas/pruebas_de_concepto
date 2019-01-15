function coalesce() {
    var a1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a1[_i] = arguments[_i];
    }
    var i = 0;
    while (a1[i] == null && i < a1.length - 1)
        i++;
    return a1[i];
}
console.log(coalesce(undefined, null, 0.12, 1));
console.log(coalesce("hola", "no"));
console.log(coalesce(null, "che"));
console.log(coalesce(undefined, "che"));
console.log(coalesce(null, true, false));
console.log(coalesce());
console.log(coalesce(undefined, null));
var que = coalesce(null, true, false);
var _a = [1, 4, 7, 8, 9, 10], x = _a[0], y = _a[1], arr = _a.slice(2);
/*
assign x y + 7
print u
text j "in the mornig"
*/
var _b = linea.split(' '), sentencia = _b[0], variable = _b[1], expresion = _b[2];
//# sourceMappingURL=coalesce.js.map