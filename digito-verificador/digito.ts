import {promises as fs} from "fs";

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

var cuitN = new DigitoVerificador(Number, [2,3,4,5,6,7,2,3,4,5], 11);
//var cuitN = new DigitoVerificador(Number, [2,3,4,5,6,7,1,2,3,4,5], 11);
var cuitB = new DigitoVerificador(BigInt, [2n,3n,4n,5n,6n,7n,2n,3n,4n,5n], 11n);



var cbu = '2850590940090418135201';

var vCBU1 = new DigitoVerificador(Number, [3,1,7,9,3,1,7],10,0);
var vCBU2 = new DigitoVerificador(Number, [3,1,7,9,3,1,7,9,3,1,7,9,3],10,0);
var vCBU3 = new DigitoVerificador(Number, [7,9,3,1,7,9,3,1,7,9,3,1,7,9,3,1,7,9,3,1,7],10,0);

console.log('CBU', cbu.substr(0,7), vCBU1.obtenerDigito(cbu.substr(0,7) as unknown as number), cbu[7]);
console.log('CBU', cbu.substr(8,13), vCBU2.obtenerDigito(cbu.substr(8,13) as unknown as number), cbu[21]);

function validarCBU(cbu:string){
    return cbu.length == 22 && 
        vCBU1.obtenerDigito(cbu.substr(0,7 ) as unknown as number) == Number(cbu[7]) &&
        vCBU2.obtenerDigito(cbu.substr(8,13) as unknown as number) == Number(cbu[21])
}

console.log('CBU val', cbu, validarCBU(cbu));
console.log('CBU val', '0290002510000002472839', validarCBU('0290002510000002472839'));
console.log('no CBU val', '290002510000002472839', validarCBU('290002510000002472839'));
console.log('no CBU val', '1290002510000002472839', validarCBU('1290002510000002472839'));


if(Math.random()<0.9999999999999) process.exit(0)

function medir<Num extends bigint|number>(cast:(n:string|number)=>Num){
    var j=cast('2320729336');
    var cuit = new DigitoVerificador(cast, [2,3,4,5,6,7,2,3,4,5].map(cast), cast(11));
    var ahora = new Date().getTime()+1000;
    var i=1;
    while(new Date().getTime()<ahora){
        var d=cuit.obtenerDigito(j);
        i++;
    }
    console.log(cast.name, i);
}

function probar(texto:string){
    return {
        texto,
        cuitN:cuitN.obtenerDigito(Number(texto)),
        cuitB:cuitB.obtenerDigito(BigInt(texto)),
    }
}

console.log(probar('2320729336'))

medir(Number);
medir(BigInt);
//@ts-expect-error
medir(String);

var v1 = new DigitoVerificador(Number, [2,3,4,7],11,3);
var v2 = new DigitoVerificador(Number, [3,4,5,9],11,0);

var cant=0;
var i=1000;
var a=[];
var o={};
while(i<=9999){
    var d1=v1.obtenerDigito(i);
    var d2=v2.obtenerDigito(i);
    // if(d1!=null){
    if(d1!=null && d2!=null){
        // var codigo = i+"-"+d1;
        var codigo = i+"-"+d1+d2;
        a.push(codigo);
        o[codigo]=true;
        cant++;
    }
    i++
}

fs.writeFile('numeros.txt',a.join('\n'),'utf8').then(function(){ console.log('ok')}, function(err){ console.log(err)});

console.log('generados');

var digitos="0123456789";
/*
// a.push("1022-71"); o["1022-71"]=true;
a.push("2210-71"); o["2210-71"]=true;
a.push("1029-71"); o["1029-71"]=true;
a.push("2021-71"); o["2021-71"]=true;
*/

var problemas=[];

function buscar(nuevo, viejo, que){
    if(nuevo.substr(0,4)!=viejo.substr(0,4)){
        if(o[nuevo]){
            problemas.push({viejo, nuevo, que});
        }
    }
}

for(codigo in o){
    var que = "error en un dígito";
    for(var j=0; j<4; j++){
        for(var k=0; k<10; k++){
            var nuevo=codigo.substr(0,j)+digitos[k]+codigo.substr(j+1);
            buscar(nuevo, codigo, que)
        }
    }
    var que = "inversión en dos dígitos en cualquier posición";
    for(var j=0; j<4; j++){ // quito
        for(var k=0; k<3; k++){ // dónde agrego
            var auxiliar=codigo.substr(0,j)+codigo.substr(j+1);
            var nuevo=auxiliar.substr(0,k)+codigo[j]+auxiliar.substr(k+1);
            buscar(nuevo, codigo, que)
        }
    }
    var que = "inversión del par de dígitos";
    nuevo = codigo[2]+codigo[3]+codigo[0]+codigo[1]+'-'+codigo[5]+codigo[6];
    buscar(nuevo, codigo, que)
}

console.log('problemas encontrados',problemas.length)

fs.writeFile('problemas.txt',problemas.map(x=>JSON.stringify(x)).join('\n'),'utf8').then(function(){ console.log('ok')}, function(err){ console.log(err)});

