
// mi issue: https://github.com/microsoft/TypeScript/issues/39569
// continúa en: https://github.com/microsoft/TypeScript/issues/27808

export class DigitoVerificador<Num extends bigint|number>{
    constructor(private cast:(numbreString:string|number)=>Num, private multiplicadores:Num[], private divisor:Num, private desplazamiento?:Num){
    }
    obtenerDigito(numero:Num):Num|null{
        var digitos=numero.toString().split('');
        var i=0;
        var sumador:Num = this.cast(0);
        while(digitos.length){
            var digito = this.cast(digitos.pop()||0);
            var multiplicador = this.multiplicadores[i];
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            var producto:Num = digito * multiplicador;
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            sumador = sumador + producto;
            i++;
        }
        if(this.desplazamiento){
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            sumador = sumador + this.desplazamiento;
        }
        // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
        var verificador:Num = sumador % this.divisor;
        if(!verificador) return this.cast(0);
        if(this.divisor-verificador>9) return null;
        // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
        return this.divisor-verificador;
    }
}
