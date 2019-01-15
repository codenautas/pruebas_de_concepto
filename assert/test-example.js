"use strict";

const assert = require("assert")

describe("examples",function(){
    var lista=[1,2,"hola!"];
    var lista2=[1,null,"hola!","chau"]
    it("ok == lists", function(){
        assert.ok(lista==[1,2,"hola!"]);
    })
    describe("deepStrictEqual",function(){
        it("lists", function(){
            assert.deepStrictEqual(lista,lista2);
        })
    })
})