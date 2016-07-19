"use strict";

function PopUp(cb) {
    var divName = 'pu_div';
    this.cb = cb;
    var me = this;
    this.div = document.getElementById(divName);
    var body = document.body;
    if(this.div) {
        body.removeChild(this.div);
        //throw new Error('PopUp() needs to create div "'+divName+'"'); 
    }
    
    var html=jsToHtml.html;
    //var btnCancel = html.input({id:'pu_cancel', type:'button', class:'cancelbtn', value:'X'}).create();
    //var btnOK = html.input({id:'pu_ok', type:'button', class:'okbtn', value:'OK'});
    var margen = 'margen';
    var cruz = html.span({class:'close', title:'Cerrar'}, "x").create();
    var imgContainer = html.div({class:'imgcontainer'}, [cruz]);
    var innerContainer = html.div({class:'cancelbtn'}).create();
    var container = html.div({id:'container', class:'container'}, [
        //html.span({class:margen}, btnCancel),
        innerContainer,
        //html.span({class:margen}, btnOK)
    ]).create();
    
    var outDiv = html.div({class:['modalcontent','animate']}, [imgContainer, container]).create();
    this.div = html.div({id:divName, class:'modal'}).create();
    this.div.appendChild(outDiv);
    
    this.setResult = function(result) {
        me.result = result;
        me.hide();
        return result;
    }
    this.show = function() {
        me.div.style.display='block';
        me.cb(innerContainer, me.setResult);
    }
    this.shown = function() { return me.div.style.display=='block'; }
    this.hide = function() { me.div.style.display='none'; }

    // btnCancel.addEventListener('click', this.hide);
    cruz.addEventListener('click', this.hide);
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
