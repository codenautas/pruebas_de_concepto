(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = /** @class */ (function () {
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
    exports.User = User;
});
