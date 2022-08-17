(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "./digito_verificador"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fs_1 = require("fs");
    const digito_verificador_1 = require("./digito_verificador");
    var parametros = {
        fuentes: [
            // '/temp/emilio_tem_ggs2022_dominio3.txt',
            // '/temp/emilio_tem_ggs2022_dominio5.txt',
            '/temp/ggs2022_encuestas_para_ids.txt'
        ],
        separador: '|',
        saltearPrimerasLineas: 1,
        columna: 0,
        agregados: 4,
        prefijo: '54',
        archivoSalida: '/temp/cond_digito_verificador_yp.txt',
        todo: true // true = encuesta, hogar, codigo, false = codigo
    };
    var dv = new digito_verificador_1.DigitoVerificador(Number, [3, 1, 7, 9, 3, 1, 7, 9], 10, 0);
    async function procesar(params) {
        const { fuentes, separador, saltearPrimerasLineas, columna, agregados, prefijo, archivoSalida, todo } = params;
        let lista = [];
        for (const fuente of fuentes) {
            let contenido = await fs_1.promises.readFile(fuente, 'utf-8');
            lista = lista.concat(contenido.split(/\r?\n/).slice(saltearPrimerasLineas).map(linea => linea.split(separador)[columna]).filter(x => x && x.trim()));
        }
        var resultados = [];
        for (const elemento of lista) {
            for (let i = 1; i <= agregados; i++) {
                var numero = prefijo + elemento.toString() + i;
                var codigo = numero + dv.obtenerDigito(numero);
                resultados.push(todo ? [elemento, i, codigo].join(separador) : codigo);
            }
        }
        fs_1.promises.writeFile(archivoSalida, resultados.join('\r\n'));
    }
    console.log('procesando');
    procesar(parametros);
});
/* correr con
 * npx tsc && node agregar_un_digito.js
 */ 
