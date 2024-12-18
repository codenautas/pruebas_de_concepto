"use strict";

function showEvent(eventName){
    document.body.addEventListener(eventName, function(e){
        var ae=document.activeElement;
        messages.textContent+='\n'+e.type+' '+e.which+' '+e.keyCode+' '+e.altKey+' ---> '+(ae.id||ae.tagName);
        console.log(e.type+' '+e.which+' '+e.keyCode+' '+e.altKey+' ---> '+(ae.id||ae.tagName));
    },true);
}

window.addEventListener('load', function(){
    Tedede.adaptElement(bool1, 'boolean');
    Tedede.adaptElement(text1, 'text');
    // showEvent('keydown');
    // showEvent('keypress');
    // showEvent('keyup');
});

