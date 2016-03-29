function datalistDynamic() {
    try {
        var elemento = document.createElement('input');
        elemento.type='text';
        var datalist = document.createElement('datalist');
        datalist.id = "lista";
        //elemento.list='lista'; // da error
        elemento.setAttribute('list','lista'); // ok
        //document.write("elemento.list: "+elemento.list+"<br>");
        //document.write("elemento.getAttribute('list'): "+elemento.getAttribute('list')+"<br>")
        var marcasAuto = ['Ford','Wolkswagen','Fiat'];
        for(var marca in marcasAuto) {
            var option = document.createElement('option');
            option.label = marcasAuto[marca];
            option.value = marcasAuto[marca];
            datalist.appendChild(option);
        }
        if(true) {
            document.body.appendChild(elemento);
            document.body.appendChild(datalist);
            document.write('<br>\n');
        }
        return true;
    }catch(err){
        document.write("datalistDynamic error:"+err+"<br>\n")
        return false;
    }
}
