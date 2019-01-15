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
function decorarc(constructor) {
    console.log(constructor);
}
function decorar(target, propertyKey, descriptor) {
    console.log(target, propertyKey, descriptor);
}
let Log = class Log {
    pepe(a) {
        console.log(a);
    }
    pepe2(a) {
        console.log(a);
    }
};
__decorate([
    decorar,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Log.prototype, "pepe", null);
__decorate([
    decorar,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Log.prototype, "pepe2", null);
Log = __decorate([
    decorarc
], Log);
var x = { a: 'anda', b: 'bien' };
var l = new Log();
var pepe = l.pepe;
pepe(x);
var y = { b: 'bien' };
pepe(y);
/*
async function query<T extends object>(queryText:string, placeHolder:T[]):Promise<void>{
    placeHolder = placeHolder.slice(1);
}

async function query1<T extends object>(queryText:string):Promise<T[]>{
    return [] as T[];
}

async function traer(){
    await query("select 3 as a, 'hola' as b ", x);
}


async function traer1(){
    var ls = await query1("select 3 as a, 'hola' as b ");
}

var xs = await query1<typeof x>("mensaje");
*/ 
//# sourceMappingURL=prueba.js.map