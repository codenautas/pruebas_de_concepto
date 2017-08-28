//  import vs reference example
//// <reference path="User.ts" /> // si compila en el mismo archivo usar esto (opcion <<"outFile": "scripts/main.js">> en tsconfig.json )
 import { User } from "./user"; // not needed if referenced
let user = new User('Eugenio');
user.lastName = 'Arosteguy';

document.getElementsByTagName('body')[0].innerHTML += user.getFullName();