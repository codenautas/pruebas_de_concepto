console.log('aaaAAA');
//  import vs reference example
/// <reference path="user.ts" /> // si compila en el mismo archivo usar esto (opcion <<"outFile": "scripts/main.js">> en tsconfig.json )
//import { User } from "./user"; // not needed if referenced
let user = new User('Eugenio');
user.lastName = 'Arosteguy';
user.printFullName();