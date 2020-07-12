"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function RegistrarAplicacion(target) {
    console.log('Registro', arguments);
}
function listened(target, propertyKey, descriptor) {
    console.log('Escuchando', arguments);
}
function dontSerialize(target, propertyKey, parameterIndex) {
    console.log('dontSerialize', arguments);
}
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
let Aplicacion = /** @class */ (() => {
    let Aplicacion = class Aplicacion {
        constructor(name) {
            this.name = name;
            console.log('constructed', name);
        }
        algo(x) {
            console.log('algo', x);
        }
        doing(x, y) {
            console.log('doing', x, y);
        }
    };
    __decorate([
        enumerable(true),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Aplicacion.prototype, "algo", null);
    __decorate([
        listened,
        __param(0, dontSerialize),
        __param(1, dontSerialize),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], Aplicacion.prototype, "doing", null);
    Aplicacion = __decorate([
        RegistrarAplicacion,
        __metadata("design:paramtypes", [String])
    ], Aplicacion);
    return Aplicacion;
})();
console.log('voy a construir');
var aplicacion = new Aplicacion('hi');
aplicacion.doing(2, 3);
console.log(Aplicacion);
console.log(Aplicacion.__proto__);
console.log(Aplicacion.prototype);
//# sourceMappingURL=decorating.js.map