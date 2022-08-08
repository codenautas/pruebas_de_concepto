// mi issue: https://github.com/microsoft/TypeScript/issues/39569
// continúa en: https://github.com/microsoft/TypeScript/issues/27808
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
    exports.DigitoVerificador = void 0;
    class DigitoVerificador {
        constructor(cast, multiplicadores, divisor, desplazamiento) {
            this.cast = cast;
            this.multiplicadores = multiplicadores;
            this.divisor = divisor;
            this.desplazamiento = desplazamiento;
        }
        obtenerDigito(numero) {
            var digitos = numero.toString().split('');
            var i = 0;
            var sumador = this.cast(0);
            while (digitos.length) {
                var digito = this.cast(digitos.pop() || 0);
                var multiplicador = this.multiplicadores[i];
                // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
                var producto = digito * multiplicador;
                // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
                sumador = sumador + producto;
                i++;
            }
            if (this.desplazamiento) {
                // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
                sumador = sumador + this.desplazamiento;
            }
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            var verificador = sumador % this.divisor;
            if (!verificador)
                return this.cast(0);
            if (this.divisor - verificador > 9)
                return null;
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            return this.divisor - verificador;
        }
    }
    exports.DigitoVerificador = DigitoVerificador;
});
