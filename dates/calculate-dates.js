"use strict";

var now=new Date();

var today = roundDate(now);

function roundDate(d){
    var datetime = new Date(d.getTime()-12*60*60*1000)
    return new Date(datetime-(((datetime.getHours()*60+datetime.getMinutes())*60+datetime.getSeconds())*1000+datetime.getMilliseconds())/*+24*60*60*1000*/)
}

function mostrar(datetime){
    return datetime.toLocaleDateString()+' '+datetime.toTimeString();
}

console.log(mostrar(now), mostrar(today));

var rd=today;
var ant=rd;

while(rd.toJSON()>"1901-01-01"){
    ant=rd;
    var dt = new Date(rd-1000*60*60*24);
    var rd=roundDate(dt);
    if(rd.getHours()!=0){
        console.log('xxxxx anterior:',mostrar(ant));
        console.log('xxxxx redondear',mostrar(dt),mostrar(rd),rd.getHours())
        console.log('xxxxx con 12 hs',mostrar(new Date(dt.getTime()+12*60*60*1000)),mostrar(rd),rd.getHours())
        return;
    }
    if(dt.getTime()!=rd.getTime()){
        console.log(ant.toLocaleDateString(),rd.toLocaleDateString(), '     ', (dt-rd)/1000/60, '      ', mostrar(dt), mostrar(rd));
    }
}