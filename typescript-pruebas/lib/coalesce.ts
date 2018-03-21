function coalesce<T>(...a1: T[]):T{
    var i=0;
    while(a1[i]==null && i<a1.length-1) i++;
    return a1[i];
}
console.log(coalesce<number>(undefined, null, 0.12, 1));

console.log(coalesce("hola", "no"));
console.log(coalesce(null, "che"));
console.log(coalesce(undefined, "che"));
console.log(coalesce<boolean>(null, true, false));
console.log(coalesce());
console.log(coalesce(undefined, null));

var que:boolean = coalesce(null, true, false);

var [x, y, ...arr] = [1, 4, 7, 8, 9, 10];

/*
assign x y + 7
print u
text j "in the mornig"
*/

var [sentencia, variable, expresion ] = linea.split(' ');