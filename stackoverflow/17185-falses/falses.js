[null, undefined, false, 0, '', [], {}, "0", true, 1]
.forEach(function(valor){
    console.log('el valor',JSON.stringify(valor));
    if(!valor) console.log('!');
    if(valor == false) console.log('==false');
    if(valor === false) console.log('===false');
    if(valor == null) console.log('==null');
    if(valor === null) console.log('===null');
    if(valor == 0) console.log('==0');
    console.log('**********');
});