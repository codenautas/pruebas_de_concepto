"use strict";

class Emiter{
    constructor(delayMs, max){
        this.delayMs = delayMs;
        this.max = max;
        this.currentNext = 0;
        this.nextTick=new Date().getTime();
    }
    next(){
        var emiter = this;
        if(this.currentNext>=this.max){
            return Promise.resolve(false);
        }
        this.currentNext++;
        console.log('pidió next',this.currentNext)
        this.nextTick = Math.max(new Date().getTime(),this.nextTick)+this.delayMs;
        return new Promise(function(resolve, reject){
            setTimeout(function(current){
                return function(){
                    console.log('dio 1 next',current);
                    resolve(current);
                }
            }(emiter.currentNext),Math.max(emiter.nextTick-new Date(),emiter.delayMs));
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
            setTimeout(function(){
                console.log('digesté a',data);
                resolve(data);
            },Math.max(digester.nextTick-new Date(),digester.delayMs));
        });
    }
}

var emiter = new Emiter(100,100);
var digester = new Digester(1000);

function stepByStep(){
    emiter.next().then(function(data){
        console.log('recibio ',data);
        if(data){
            digester.digest(data).then(function(){
                stepByStep();
            });
        }
    });
}

stepByStep();