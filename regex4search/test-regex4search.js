// import "./regex4search";
var {regex4search} = require('./regex4search.js')

var xxxx = require('./regex4search.js')

var fixtures={
    'Jose Martin\r\n\u00a0':{
        'San José de San Martín':true,
        'José Martínez':true,
        'Josefina Dimartinani':true,
        Jose:false,
        Martin:false
    },
    Carlos:{
        "ÇARLOS": true,
        Carlo:false
    },
    /* imposible por ahora:
    '"Aná"':{
        Ana:true,
        Aná:true,
        banana:false,
        "Dr. Ana Bolena":true,
    },
    */
    "Soy?":{
        "SOY?":true,
        "Soy yo?":false
    },
    ñoqui:{
        gnoquis: true,
        CAÑOQUI:true,
        OQUI:false,
        nioquis:true,
        nnoquis:true,
        noquis:true,
        nnioquis:true,
    },
    "Diego de la Vega":{
        "Diego DelaVega":true
    }
}

var tests = 0;
var errores = 0;

for(var busco in fixtures){
    var fixture = fixtures[busco];
    var regex = regex4search(busco);
    for(var encuentro in fixture){
        if(regex.test(encuentro) != fixture[encuentro]){
            console.log('ERROR buscando',busco,'en',encuentro,'obtenido:',regex.test(encuentro),'esperado:',fixture[encuentro],'usando',regex.source)
            errores++;
        }
        tests++;
    }
}
console.log('tests', tests, 'errores', errores);