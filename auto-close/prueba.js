"use strict";

var miniTools = require('mini-tools');
var bestGlobals = require('best-globals');

function cerrara(f){
    console.log('abriendo')
    f().then(function(){
        console.log('close');
    },function(err){
        console.log('close with err',err);
    });
}

function unaParte(){
    var q=Promise.resolve();
    var p = bestGlobals.sleep(100).then(function(){
        console.log('primera parada');
        q=q.then(function(){
            console.log('segunda parada');
        });
    }).then(function(){
        return q;
    });
    return p;
}

cerrara(unaParte);
