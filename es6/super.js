class FiguraC{
    mostrar(x){
        console.log("figura C",x);
    }
}

class CuadradoC extends FiguraC{
    mostrar(x){
        super.mostrar(x);
        console.log("CuadradoC",x);
    }
}

function FiguraF(){
}

FiguraF.prototype.mostrar = function(x){
    console.log('FiguraF',x);
}

function CuadradoF(){
}
CuadradoF.prototype = Object.create(FiguraF.prototype);

CuadradoF.prototype.mostrar = function(x){
    // Object.getPrototypeOf(this).mostrar.call(this);
    console.log('CuadradoF',x);
}

function TrianguloF(){
}
TrianguloF.prototype = Object.create(FiguraF.prototype);

TrianguloF.prototype.mostrar = function(x){
    this.__proto__.__proto__.mostrar.call(this,x);
    console.log('TrianguloF',x);
}

var cc=new CuadradoC();
var cf=new CuadradoF();
var tf=new TrianguloF();

cc.mostrar(1);
cf.mostrar(2);
tf.mostrar(3);
