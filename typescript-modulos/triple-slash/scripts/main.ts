// si compila en el mismo archivo usar esto (opcion <<"outFile": "scripts/main.js">> en tsconfig.json )
/// <reference path="./user.ts" />
let user = new User('Eugenio');
user.lastName = 'Arosteguy';
user.printFullName();