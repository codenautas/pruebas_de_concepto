"use strict";

var algo={a:'7', b:'8', c:'9'};

describe("object", function(){
    it("forEach", function(){
        var res=[];
        object(algo).forEach(function(valor, indice, contenedor){
            res.push([valor, indice, contenedor]);
        });
        expect(res).to.eql([
            ['7', 'a', algo],
            ['8', 'b', algo],
            ['9', 'c', algo],
        ])
    });
    it("map", function(){
        var res = object(algo).forEach(function(valor, indice, contenedor){
            return [valor, indice, contenedor];
        });
        expect(res).to.eql({
            a:['7', 'a', algo],
            b:['8', 'b', algo],
            c:['9', 'c', algo],
        })
    });
});