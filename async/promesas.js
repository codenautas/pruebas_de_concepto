"use strict";

var fs=require('fs-extra');

const THROW_ON_ERR=false;

function ordenarArchivo(entrada, salida){
    console.log('=========');
    console.log('empezando a ordenar',entrada,salida);
    return fs.readFile(entrada, {encoding:'utf8'}).then(function(contenido){
        var lineas=contenido.split(/\r?\n/);
        lineas.sort();
        var nuevoContenido=lineas.join('\n');
        return fs.readFile(salida, {encoding:'utf8'}).then(function(contenidoSalidaEncontrado){
            if(contenidoSalidaEncontrado!==nuevoContenido){
                throw new Error('el archivo de salida existe y el contenido no coincide');
            }
        },function(err){
            if(err.code=='ENOENT'){
                return fs.writeFile(salida, nuevoContenido);
            }
        });
    }).then(function(ok){
        console.log('----------');
        console.log('ok',entrada,salida);
        return 'ok '+entrada+'=>'+salida;
    },function(err){
        console.log('----------');
        console.log('ERROR',entrada,salida);
        console.log(err)
        if(THROW_ON_ERR) throw err;
        return 'err '+entrada+'=>'+salida+' '+err.message;
    });
};

Promise.all([
      ordenarArchivo('/pepe/pepito/pepon/entrada.txt', 'salida_existente.txt')
    , ordenarArchivo('entrada.txt', 'salida_existente.txt')
    , ordenarArchivo('entrada.txt', 'salida_equivocada.txt')
    , fs.unlink('local-salida.txt').catch(function(err){
        if(err.code!=='ENOENT'){
            console.log('*************')
            console.log('ERROR AL BORRAR')
            console.log(err)
            throw err;
        }
    }).then(function(){
        return ordenarArchivo('entrada.txt', 'local-salida.txt');
    })
]).then(function(results){
    console.log('/////////////');
    console.log(results);
},function(err){
    console.log('/////////////!');
    console.log('ERROR');
    console.log(err);
},);
