"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('aaaAAA');
//  import vs reference example
//// <reference path="user.ts" /> // si compila en el mismo archivo usar esto (opcion <<"outFile": "scripts/main.js">> en tsconfig.json )
var user_1 = require("./user"); // not needed if referenced
var user = new user_1.User('Eugenio');
user.lastName = 'Arosteguy';
user.printFullName();
