"use strict";

function dialogPromise(dialogConstructor){
    return new Promise(function(resolve, reject) {
        var divName = 'pu_div';
        var dialogWindow = document.getElementById(divName);
        var body = document.body;
        if(dialogWindow) {
            body.removeChild(dialogWindow);
        }
        var html=jsToHtml.html;
        var margen = 'margen';
        var cruz = html.span({class:'close', title:'Cerrar'}, "x").create();
        var imgContainer = html.div({class:'imgcontainer'}, [cruz]);
        var innerContainer = html.div({class:'cancelbtn'}).create();
        var container = html.div({id:'container', class:'container'}, [
            innerContainer,
        ]).create();
        var innerDiv = html.div().create(); // a dialogConstructor hay que pasarle un DIV vacío para que haga lo que quiera.
        var outDiv = html.div({class:['modalcontent','animate']}, [imgContainer, container, innerDiv]).create();
        dialogWindow = html.div({id:divName, class:'modal'}).create();
        dialogWindow.appendChild(outDiv);
        dialogConstructor(innerDiv, function doneWithGoodAnswer(answer){
            hide();
            resolve(answer)
        });
        body.appendChild(dialogWindow);
        // show:
        dialogWindow.style.display='block';
        // hide:
        var hide = function() { 
            dialogWindow.style.display='none'; 
        }
        var doneWithoutAnswer = function doneWithoutAnswer(message){
            hide();
            reject(new Error(message));
        }
        cruz.addEventListener('click', doneWithoutAnswer.bind(null,'closed by the \u00d7'));
    });
}
