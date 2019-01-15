

    /**
     * @function
     * @param {string} nombre
     * @param {Date|null} [momento]
     */
    function saludo(nombre, momento){
        /** @type {string} saludo */
        var saludo 
        if(momento == null){
            saludo = 'hola'
        }else if(momento.getHours()<12){
            saludo = 'buenos días'
        }else{
            saludo = 'buenas tardes'
        }
        return saludo + ' ' + nombre
    }

    console.log(saludo('AAron', new Date())) 
    console.log(saludo('Abel'))  // ok, momento es opcional
    console.log(saludo())  // error, nombre no es opcional
    console.log(saludo('Adela',10))  // error, momento no es numero