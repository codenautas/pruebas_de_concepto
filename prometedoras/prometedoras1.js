"use strict";

function mostrar(que){
    if(que instanceof Array){
        que.forEach(mostrar);
    }else{
        console.log(que);
        if(typeof window){
            var p=document.createElement('p');
            p.textContent=que;
            document.body.appendChild(p);
        }
    }
}

mostrar('alfa');
mostrar([1,2,3]);

fetch('datos.json').then(mostrar).catch(err => mostrar(['Error leyendo datos', err]));