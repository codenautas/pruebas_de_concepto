"use strict";

function controlog(){
    if(new Date()>controlog.nextLog){
        console.log.apply(console,arguments);
        controlog.nextLog=new Date().getTime()+1000;
    }
}
controlog.nextLog=0;

class Emiter{
    constructor(delayMs, max){
        this.delayMs = delayMs;
        this.max = max;
        this.currentNext = 0;
        this.nextTick=new Date().getTime();
    }
    next(){
        var emiter = this;
        if(this.currentNext>=this.max && this.max){
            return Promise.resolve(false);
        }
        this.currentNext++;
        controlog('pidió next',this.currentNext)
        this.nextTick = Math.max(new Date().getTime(),this.nextTick)+this.delayMs;
        return new Promise(function(resolve, reject){
            //setTimeout(function(current){ return function(){
                controlog('dio 1 next',emiter.currentNext);
                resolve(emiter.currentNext);
            //} }(emiter.currentNext),Math.max(emiter.nextTick-new Date(),emiter.delayMs));
        });
    }
}

class Digester{
    constructor(delayMs){
        this.delayMs = delayMs;
        this.nextTick=new Date().getTime();
    }
    digest(data){
        var digester = this;
        this.nextTick = Math.max(new Date().getTime(),this.nextTick)+this.delayMs;
        return new Promise(function(resolve, reject){
            // setTimeout(function(){
                controlog('digesté a',data);
                resolve(data);
            // },Math.max(digester.nextTick-new Date(),digester.delayMs));
        });
    }
}

var emiter = new Emiter(1,!10000000);
var digester = new Digester(1);

async function stepByStep(){
    // var pedir_mucha_memoria=new Array(1000000).join(new Date());
    while(true){
        var pedir_mucha_memoria=Date();
        var data = await emiter.next();
        controlog('recibio ',data);
        if(!data){
            return
        }
        await digester.digest(data);
        if(!pedir_mucha_memoria[0]){
            controlog('x')
        }
    }
}

stepByStep().catch(function(err){
    console.log('******** ERROR');
    console.log(err);
});