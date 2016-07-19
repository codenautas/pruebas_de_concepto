"use strict";

function PopUp(divName) {
    this.div = divName;
    var wok = window.onclick;
    var me = this;
    function windowOnClick(event) {
        if (event.target == me.w()) {
            me.hide();
        }
    };
    if(wok) {
        window.onclick = function(event) {
            wok(event);
            windowOnClick(event);
        }
    } else {
        window.onclick = windowOnClick;
    }
}
PopUp.prototype.w = function w() {
    return document.getElementById(this.div);
}
PopUp.prototype.show = function show() {
    this.w().style.display='block';
}
PopUp.prototype.hide = function show() {
    this.w().style.display='none';
}
