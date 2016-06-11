"use strict";

function tarea(){
    console.log('acá va la tarea', new Date());
}

function lanzarElDia(momento, tarea){
    console.log('lanzado',new Date());
    console.log('para ser ejecutado en',momento);
    setTimeout(tarea, momento.getTime()-(new Date()).getTime());
}

lanzarElDia(new Date('2016-06-10 20:29'), tarea);

