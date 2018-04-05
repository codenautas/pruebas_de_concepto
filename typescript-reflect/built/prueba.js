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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function decorar() {
    return (target, propertyKey, descriptor) => {
        console.log(target);
    };
}
class Log {
    pepe(a) {
        console.log(a);
    }
}
__decorate([
    decorar(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Log.prototype, "pepe", null);
var x = { a: 'anda', b: 'bien' };
var l = new Log();
var pepe = l.pepe;
pepe(x);
var y = { b: 'bien' };
pepe(y);
function query(queryText, placeHolder) {
    return __awaiter(this, void 0, void 0, function* () {
        placeHolder = placeHolder.slice(1);
    });
}
function query1(queryText) {
    return __awaiter(this, void 0, void 0, function* () {
        return [];
    });
}
function traer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield query("select 3 as a, 'hola' as b ", x);
    });
}
function traer1() {
    return __awaiter(this, void 0, void 0, function* () {
        var ls = yield query1("select 3 as a, 'hola' as b ");
    });
}
var xs = yield query1("mensaje");
//# sourceMappingURL=prueba.js.map