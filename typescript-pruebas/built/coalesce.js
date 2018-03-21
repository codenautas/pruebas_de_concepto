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
console.log(coalesce("hola", "no"));
console.log(coalesce(null, "che"));
console.log(coalesce(undefined, "che"));
console.log(coalesce(undefined, null, null, "0", "1"));
console.log(coalesce("2"));
console.log(coalesce());
console.log(coalesce(undefined, null));
//# sourceMappingURL=coalesce.js.map