(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./encorchetar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var encorchetar_1 = require("./encorchetar");
    var Student = /** @class */ (function () {
        function Student(firstName, middleInitial, lastName, edad) {
            this.firstName = firstName;
            this.middleInitial = middleInitial;
            this.lastName = lastName;
            this.edad = edad;
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
        return Student;
    }());
    function greeter(person) {
        return "Hello, " + encorchetar_1.encorchetar(person.firstName) + " " + encorchetar_1.encorchetar(person.lastName) + " (" + person.edad + ")";
    }
    var user = new Student("Jane", "M.", "Userlove", 36);
    console.log(greeter(user));
    if (typeof document === 'object') {
        document.body.innerHTML = greeter(user);
    }
});
//# sourceMappingURL=greeter.js.map