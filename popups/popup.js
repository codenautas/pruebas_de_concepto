"use strict";

function PopUp(divName) {
    this.divName = divName;
    var me = this;
    //var divID = divName;
    var divID = 'pepe';
    this.div = document.getElementById(divID);
    if(this.div) { throw new Error('PopUp() needs to create div "'+divName+'"'); }
    var html=jsToHtml.html;
    this.div = html.div({id:divID}).create();
    var body = document.body;
    body.insertBefore(this.div, body.firstChild);
    // cerrar ventana al clickear afuera
    function windowOnClick(event) { if(event.target == me.w()) { me.hide(); } };
    var wok = window.onclick;
    if(wok) {
        window.onclick = function(event) {
            wok(event);
            windowOnClick(event);
        }
    } else { window.onclick = windowOnClick; }
}
PopUp.prototype.w = function w() {
    return document.getElementById(this.divName);
}
PopUp.prototype.show = function show() {
    this.w().style.display='block';
}
PopUp.prototype.hide = function show() {
    this.w().style.display='none';
}
