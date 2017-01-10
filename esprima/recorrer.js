"use strict";

var esprima=require('esprima');

var programa=`
   (x+4)*y
`;

var arbol = esprima.parse(programa);

console.dir(arbol ,{depth:8});

var mostrable={
    operator:true,
    name:true,
    value:true,
}

function tieneAlgoInteresante(nodo){
    for(var prop in nodo){
        if(mostrable[prop]){
            return true;
        }
    }
    return false;
}

function traducir(nodo){
    if(tieneAlgoInteresante(nodo)) console.log('[');
    for(var prop in nodo){
        if(nodo[prop] instanceof Object){
            traducir(nodo[prop]);
        }else if(mostrable[prop]){
            console.log(nodo[prop])
        }
    }
    if(tieneAlgoInteresante(nodo)) console.log(']');
}

traducir(arbol);


