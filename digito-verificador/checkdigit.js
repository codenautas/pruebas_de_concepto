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
    exports.checkdigit = void 0;
    function checkdigit(number, cast, multipliers, divider, shift, turn) {
        var digitos = number.toString().split('');
        var i = 0;
        var sumador = cast(0);
        while (digitos.length) {
            var digito = cast(digitos.pop() || 0);
            var multiplicador = multipliers[i];
            // @ts-expect-error until I have https://github.com/microsoft/TypeScript/issues/39569
            var producto = digito * multiplicador;
            // @ts-expect-error until I have https://github.com/microsoft/TypeScript/issues/39569
            sumador = sumador + producto;
            i++;
        }
        if (shift) {
            // @ts-expect-error until I have https://github.com/microsoft/TypeScript/issues/39569
            sumador = sumador + shift;
        }
        // @ts-expect-error until I have https://github.com/microsoft/TypeScript/issues/39569
        var remainder = sumador % divider;
        if (!remainder)
            return cast(0);
        if (divider - remainder > 9)
            return null;
        // @ts-expect-error until I have https://github.com/microsoft/TypeScript/issues/39569
        return turn ? divider - remainder : remainder;
    }
    exports.checkdigit = checkdigit;
    var isbnBook1 = "007140638"; // 7
    var isbnBook2 = "046505065"; // 4
    console.log(checkdigit(isbnBook1, Number, [9, 8, 7, 6, 5, 4, 3, 2, 1], 11), "= 7?");
    console.log(checkdigit(isbnBook2, BigInt, [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n], 11n), "= 4?");
});
