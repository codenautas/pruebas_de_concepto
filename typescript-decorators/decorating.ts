function RegistrarAplicacion(target:Function){
    console.log('Registro', arguments);
}

function listened(target: any, propertyKey: string, descriptor: PropertyDescriptor):void{
    console.log('Escuchando', arguments);
}

function dontSerialize(target: Object, propertyKey: string | symbol, parameterIndex: number){
    console.log('dontSerialize', arguments);
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
@RegistrarAplicacion
class Aplicacion{
    constructor(public name:string){
        console.log('constructed', name)
    }
    @enumerable(true)
    algo(x:number){
        console.log('algo',x)
    }
    @listened
    doing(
        @dontSerialize x:number,
        @dontSerialize y:number,
    ){
        console.log('doing',x, y)
    }
}

console.log('voy a construir')
var aplicacion = new Aplicacion('hi');
aplicacion.doing(2,3);

console.log(Aplicacion);
console.log(Aplicacion.__proto__);
console.log(Aplicacion.prototype);