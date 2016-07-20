    var arreglo1 = [
                    {id:1, identity:123456,  name: "Pepito Perez"},
                    {id:2, identity:1234567, name: "Carlos Perez"},
                    {id:3, identity:24689,   name: "Fabián Sierra"}
                   ]
    
    
    
    var arreglo2 = [
                    {id:123456,  name: "Pepito Perez"},
                    {id:1234567, name: "Carlos Perez"},
                    {id:36912,   name: "Jhon Smith"}
                   ]
    
    var arr = [];
                   
    for(var x in arreglo1){
      var existe=false;
      for(var i in arreglo2){
        existe=existe || arreglo2[i].id === arreglo1[x].identity
      }
      if(!existe){
        arr.push(arreglo1[x])
      }
    }
    
    console.log(arr);