"use strict";

function PopUp(divName) {
    this.divName = divName;
    var me = this;
    var divID = divName;
    //var divID = 'pepe';
    this.div = document.getElementById(divID);
    if(this.div) { throw new Error('PopUp() needs to create div "'+divName+'"'); }
    
    var html=jsToHtml.html;
    var btnCancel = html.input({id:'pu_cancel', type:'button', class:'cancelbtn', value:'Cancel'}).create();
    var btnOK = html.input({id:'pu_ok', type:'button', class:'okbtn', value:'OK'});
    var margen = 'margen';
    var container = html.div({class:'container'}, [
        html.span({class:margen}, btnCancel),
        html.span({class:margen}, btnOK)
    ]).create();
    this.div = html.div({id:divID, class:'modal'}).create();
    this.div.appendChild(container);
    
    this.show = function() { me.div.style.display='block'; }
    this.hide = function() { me.div.style.display='none'; }

    btnCancel.onclick = this.hide;
    
    var body = document.body;
    //body.insertBefore(this.div, body.firstChild);
    body.insertBefore(this.div, body.lastChild);
    // cerrar ventana al clickear afuera
    function windowOnClick(event) { if(event.target == me.div) { me.hide(); } };
    var wok = window.onclick;
    if(wok) {
        window.onclick = function(event) {
            wok(event);
            windowOnClick(event);
        }
    } else { window.onclick = windowOnClick; }
}
