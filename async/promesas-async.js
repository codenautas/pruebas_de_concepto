"use strict";

var fs=require('fs-extra');

const THROW_ON_ERR=false;

async function ordenarArchivo(entrada, salida){
    console.log('=========');
    console.log('empezando a ordenar',entrada,salida);
    try{
        const contenido = await fs.readFile(entrada, {encoding:'utf8'});
        var lineas=contenido.split(/\r?\n/);
        lineas.sort();
        const nuevoContenido=lineas.join('\n');
        try{
            const contenidoSalidaEncontrado = await fs.readFile(salida, {encoding:'utf8'});
            if(contenidoSalidaEncontrado!==nuevoContenido){
                throw new Error('el archivo de salida existe y el contenido no coincide');
            }
        }catch(err){
            if(err.code=='ENOENT'){
                await fs.writeFile(salida, nuevoContenido);
            }
        }
        console.log('----------');
        console.log('ok',entrada,salida);
        return 'ok '+entrada+'=>'+salida;
    }catch(err){
        console.log('----------');
        console.log('ERROR',entrada,salida);
        console.log(err)
        if(THROW_ON_ERR) throw err;
        return 'err '+entrada+'=>'+salida+' '+err.message;
    };
};

(async function(){

try{
    var results=[
          await ordenarArchivo('/pepe/pepito/pepon/entrada.txt', 'salida_existente.txt')
        , await ordenarArchivo('entrada.txt', 'salida_existente.txt')
        , await ordenarArchivo('entrada.txt', 'salida_equivocada.txt')
        , await fs.unlink('local-salida.txt').catch(function(err){
            if(err.code!=='ENOENT'){
                console.log('*************')
                console.log('ERROR AL BORRAR')
                console.log(err)
                throw err;
            }
        }).then(function(){
            return ordenarArchivo('entrada.txt', 'local-salida.txt');
        })
    ];
    console.log('/////////////');
    console.log(results);
}catch(err){
    console.log('/////////////!');
    console.log('ERROR');
    console.log(err);
}

})();