import { Perro, CumplirOrdenes } from "./common";

function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): calleeed");
        console.log('targ ->' + target);
        console.log('targ ->' + propertyKey);
        console.log('targ ->' + descriptor);
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
        console.log('targ ->' + target);
        console.log('targ ->' + propertyKey);
        console.log('targ ->' + descriptor);
    }
}

class Chihuahua extends Perro implements CumplirOrdenes {
    @f()
    @g()
    ladrarFinito(obj: any=''):string {
        return 'guA guA guA guA' + obj
     }

    traerDiario() {
        //caminarConPatasCortas()
        this.ladrarFinito()
        //romperDiario()
    }
    saludar() {
        return this.ladrarFinito()
    }

    atacar(objetivo: any) {
        this.ladrarFinito(objetivo)
    }
}

console.log('lalala')