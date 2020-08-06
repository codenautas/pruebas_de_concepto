/**
 * @param {string} id
 */
function existingId(id){
    var element = document.getElementById(id);
    if(element==null){
        throw new Error("No existe el id "+id);
    }
    return element;
}

/**
 * @param {string} message
 */
function print(message){
    var mainDiv = existingId('main');
    mainDiv.appendChild(document.createTextNode('\n'+message));
}

function loadListener(){
    var mainDiv = existingId('main');
    mainDiv.innerHTML='';
    mainDiv.appendChild(document.createTextNode('Arrancando...'));
    var bc = new BroadcastChannel('contador');
    var myId=String.fromCodePoint(100+Math.floor(Math.random()*1000))+Math.floor(Math.random()*100);
    var somos={[myId]:1};
    var mostrarQuienesSomos=()=>{
        var somosDiv=existingId('somos');
        somosDiv.innerHTML='';
        somosDiv.innerText=JSON.stringify(somos,null,'   ');
    }
    /** @param {MessageEvent} ev */
    bc.onmessage=function(ev){
        print('recibo '+JSON.stringify(ev.data));
        if(ev.data.que=='soy'){
            if(!somos[ev.data.id]){
                somos[ev.data.id]=0;
            }
            somos[ev.data.id]++;
        }
        if(ev.data.que=='unload'){
            delete somos[ev.data.id];
        }
        if(ev.data.que=='load'){
            somos[ev.data.id]=1;
            bc.postMessage({que:'soy',id:myId});
        }
        mostrarQuienesSomos();
    };
    print('soy '+myId);
    bc.postMessage({que:'load',id:myId});
    window.addEventListener('unload',function(){
        bc.postMessage({que:'unload',id:myId});
    })
    mostrarQuienesSomos();
}

window.addEventListener('load',loadListener);