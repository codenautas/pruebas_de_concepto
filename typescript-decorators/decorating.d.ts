declare function RegistrarAplicacion(target: Function): void;
declare function listened(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
declare function dontSerialize(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
declare function enumerable(value: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare class Aplicacion {
    name: string;
    constructor(name: string);
    algo(x: number): void;
    doing(x: number, y: number): void;
}
declare var aplicacion: Aplicacion;
