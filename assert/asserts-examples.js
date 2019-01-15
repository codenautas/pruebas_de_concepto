var assert = require('assert')

function examples(){
    var lista=[1,2,"hola"];
    var lista2=[1,null,"hola!","chau"]
    try{
        assert.ok(lista==lista2);
    }catch(err){
        console.log('err 1',err);
    }
    assert.ok(lista==lista2);

}

examples();