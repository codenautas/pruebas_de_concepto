System.register(["./user"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function main() {
        var user = new user_1.User('Eugenio');
        user.lastName = 'Arosteguy';
        user.printFullName();
    }
    exports_1("main", main);
    var user_1;
    return {
        setters: [
            function (user_1_1) {
                user_1 = user_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=app.js.map