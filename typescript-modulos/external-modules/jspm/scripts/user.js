System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters: [],
        execute: function () {
            User = /** @class */ (function () {
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
            exports_1("User", User);
        }
    };
});
//# sourceMappingURL=user.js.map