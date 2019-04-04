var contestado={}
var antecedentes={
     0:{1:'🍁',                    6:'♞'},
     2:{                           6:'|'},
     1:{                           6:'|'},
     5:{              3:'🎒'},
     6:{              3:'🎒'},
     7:{              3:'🎒'},
     8:{1:'🌎',2:'🚛',3:'🎒'},
     9:{              3:'🎒'},
    10:{              3:'🎒'},
    11:{              3:'🎒'},
    12:{              3:'👔'},
    13:{              3:'👔'},
    14:{              3:'👔'},
    15:{              3:'👔'},
    16:{              3:'👔'},
    17:{              3:'🏛'},
    18:{1:'🍁',2:'🚛',3:'🏛'             ,13:'♨'},
    19:{              3:'🏛',4:'🔨'      ,13:'♨'},
    20:{              3:'🏛',4:'|'       ,13:'💊'},
    21:{              3:'🏛',4:'|'       ,13:'💊'},
    22:{                    4:'|'       ,13:'💊'},
    23:{                    4:'|',      7:'💍'},
    24:{                    4:'🔨',     7:'|'},
    25:{                    4:'|',      7:'|',      10:'👶'},
    26:{                    4:'|',      7:'|'      },
    27:{                    4:'|',      7:'|', 9:'♛',     11:'👶'},
    28:{                    4:'|',      7:'|', 9:'|'},
    29:{                    4:'|',      7:'💔',9:'|'},
    30:{                    4:'|',      },
    31:{                    4:'|',      8:'💍'},
}
var annioNacimiento=1987;
var annioActual=2019;
var maxButtons=14;

function AgregarBoton(tr, clase, contenido){
    var td=tr.insertCell(-1);
    td.className=clase;
    td.textContent=contenido;

}

function agregarCelda(annio, edad){
    /** @type {HTMLTableRowElement} */
    var tr=serie_tiempo.insertRow(-1);
    var mostrar=function(){
        if(contestado[edad]){
            var trC=serie_tiempo.insertRow(tr.rowIndex);
            var tdC=document.createElement('td');
            tdC.innerHTML=traerBloque();
            trC.appendChild(tdC);
            setTimeout(function(){
                ['p1', 'p2', 'p3', 'p4'].forEach(function(nombre){
                    var variable = tr.querySelector('[name='+nombre+']');
                    variable.value = contestado[edad][nombre]||null;
                    variable.onchange=function(){
                        contestado[edad][nombre] = variable.value;
                    }
                });
            },100);
        }
    };
    var accion=function(){
        if(!contestado[edad]){
            contestado[edad]={};
            mostrar();
        }
    }
    AgregarBoton(tr,'boton-annio',annio,accion);
    AgregarBoton(tr,'boton-edad' ,edad ,accion);
    var numero=1;
    while(numero<=maxButtons){
        var td=tr.insertCell(-1);
        if(antecedentes[edad]){
            td.innerText=antecedentes[edad][numero]||'\u00A0';
            td.className='icono';
        }
        numero++;
    }
    mostrar();
}

window.addEventListener('load', function(){
    var annio=annioNacimiento;
    var edad=0;
    while(annio<annioActual){
        agregarCelda(annio, edad);
        edad++;
        annio++;
        if(edad % 10 == 0){
            serie_tiempo.appendChild(document.createElement('hr'))
        }
    }
});

function traerBloque(){
return `
        <p>¿Qué tipo de techo tenía la vivienda</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p1 type=radio ><label>Con cielo raso</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p1 type=radio ><label>Chapa</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p1 type=radio ><label>Sin techo</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p1 type=radio ><label>otro</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Especifique</span><input name=p4 >
    <hr>
    <p>¿Cuál es el material predominante de los pisos?</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p2 type=radio ><label>Madera o cerámica</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p2 type=radio ><label>Cemento alisado</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p2 type=radio ><label>Tierra pisada</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p2 type=radio ><label>otro</label>
    <hr>
    <p>Respecto a la propiedad de la vivienda ¿La vivienda era?</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p3 type=radio ><label>Alquilada</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p3 type=radio ><label>Prestada por un familiar o amigo</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p3 type=radio ><label>Otorgada por el empleador como parte de la relación laboral</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p3 type=radio ><label>Propiedad de un miembro del hogar o familiar directo</label>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=p3 type=radio ><label>otro</label>
    <hr>
`
}
