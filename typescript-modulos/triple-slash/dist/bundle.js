var User = (function () {
    function User(name) {
        this.firstName = name;
    }
    User.prototype.getFullName = function () {
        return 'Hola ' + this.lastName + ' ' + this.firstName;
    };
    User.prototype.printFullName = function () {
        document.getElementsByTagName('body')[0].innerHTML += this.getFullName();
    };
    return User;
}());
// si compila en el mismo archivo usar esto (opcion <<"outFile": "scripts/main.js">> en tsconfig.json )
/// <reference path="./user.ts" />
var user = new User('Eugenio');
user.lastName = 'Arosteguy';
user.printFullName();
