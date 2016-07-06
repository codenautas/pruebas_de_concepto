"use strict";

function sleep(ms){
    var hasta = new Date().getTime()+ms;
    console.log('durmiento',new Date());
    while(new Date().getTime()<hasta);
    console.log('despertando',new Date());
}

module.exports = sleep;