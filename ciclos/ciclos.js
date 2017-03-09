"use strict";

var expect=require('expect.js')

function ObjectWithArrayMethods(o){
    this._object = o;
}

function id(x){ return x; };

function object2Array(o){
    return new ObjectWithArrayMethods(o);
}

function ArrayAndKeys2Object(result, keys){ 
    var adapted = {};
    keys.forEach(function(arrayKey, arrayIndex){
        adapted[arrayKey]=result[arrayIndex];
    });
    return adapted;
} 

function Argument3(__,___,x){ return x; };

[
    {name:'forEach'},
    {name:'map'     , resultAdapt: ArrayAndKeys2Object, },
    {name:'filter'  , resultAdapt: Argument3, stepAdapt:function(x, v, n, a){ if(x){a[n]=v;} }},
].forEach(function(method){
    ObjectWithArrayMethods.prototype[method.name] = function (f, fThis){
        var oThis=this._object;
        var keys=Object.keys(oThis);
        var acumulator={}
        var result=keys[method.name](function(arrayKey, arrayIndex){
            var arrayValue=oThis[arrayKey]
            return (method.stepAdapt||id)(f.call(fThis, arrayValue, arrayKey, oThis), arrayValue, arrayKey, acumulator);
        }, fThis);
        return (method.resultAdapt||id)(result, keys, acumulator);
    }
});

describe("array", function(){
    var algo;
    beforeEach(function(){
        algo=['7', '8', '9']
    })
    it("filter with modifies", function(){
        var res = algo.filter(function(valor, indice, contenedor){
            if(indice==1){
                contenedor[indice]='z';
            }
            return valor!='9';
        });
        expect(res).to.eql([
            '7',
            '8',
        ])
        expect(algo).to.eql(['7', 'z', '9'])
    });
});

describe("object2Array", function(){
    var algo;
    beforeEach(function(){
        algo={a:'7', b:'8', c:'9'};
    })
    it("forEach", function(){
        var res=[];
        object2Array(algo).forEach(function(valor, indice, contenedor){
            res.push([valor, indice, contenedor]);
            if(indice=='b'){
                contenedor[indice]='x';
            }
        });
        expect(res).to.eql([
            ['7', 'a', algo],
            ['8', 'b', algo],
            ['9', 'c', algo],
        ]);
        expect(algo).to.eql({a:'7', b:'x', c:'9'})
    });
    it("map", function(){
        var res = object2Array(algo).map(function(valor, indice, contenedor){
            if(indice=='b'){
                contenedor[indice]='y';
            }
            return [valor, indice, contenedor];
        });
        expect(res).to.eql({
            a:['7', 'a', algo],
            b:['8', 'b', algo],
            c:['9', 'c', algo],
        })
        expect(algo).to.eql({a:'7', b:'y', c:'9'})
    });
    it("filter", function(){
        var res = object2Array(algo).filter(function(valor, indice, contenedor){
            if(indice=='b'){
                contenedor[indice]='z';
            }
            return indice!='c';
        });
        expect(res).to.eql({
            a:'7',
            b:'8',
        })
        expect(algo).to.eql({a:'7', b:'z', c:'9'})
    });
});