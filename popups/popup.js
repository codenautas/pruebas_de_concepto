"use strict";

function PopUp(opts) {
    var ops = opts || {};
    var divName = ops.divName || 'pu_div';
    var me = this;
    this.div = document.getElementById(divName);
    if(this.div) { throw new Error('PopUp() needs to create div "'+divName+'"'); }
    
    var html=jsToHtml.html;
    var btnCancel = html.input({id:'pu_cancel', type:'button', class:'cancelbtn', value:'Cancel'}).create();
    var btnOK = html.input({id:'pu_ok', type:'button', class:'okbtn', value:'OK'});
    var margen = 'margen';
    var container = html.div({id:'container', class:'container'}, [
        html.span({class:margen}, btnCancel),
        html.span({class:margen}, btnOK)
    ]).create();
    
    var outDiv = html.div({class:['modalcontent','animate']}, [container]).create();
    this.div = html.div({id:divName, class:'modal'}).create();
    this.div.appendChild(outDiv);
    
    this.show = function() { me.div.style.display='block'; }
    this.hide = function() { me.div.style.display='none'; }

    btnCancel.addEventListener('click', this.hide);
    var body = document.body;
    body.appendChild(this.div);
    /*
    // cerrar ventana al clickear afuera (no funciona)
    function windowOnClick(event) { if(event.target==me.div) { me.hide(); } };
    var wok = window.onclick;
    window.addEventListener('click',
                            !wok ? windowOnClick : function(event) { wok(event); windowOnClick(event); }
                           );
    */
}
