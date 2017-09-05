Si compila en el mismo archivo con la opcion
"outFile": "dist/bundle.js",
entonces se puede usar el triple slash 
/// <reference path="./user.ts" />
para referenciar modulos internos (otros archivos ts).
Not use import neighther export