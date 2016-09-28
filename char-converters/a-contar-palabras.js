var iconv = require('iconv-lite');
var fs = require('fs-promise');

var fixtures=[
    {nombre:'ansi'         , encoded: 'win1252'},
    {nombre:'ansi-win1250' , encoded: 'win1250'},
    {nombre:'ascii7'       ,                   },
    {nombre:'utf8'         ,                   },
];

function contarPalabras(str){
    return str.split(/[,;.!¡?¿: '"\n\r\t%&^[\](){}]+/g).filter(function(word){ return word; }).length
}

Promise.all(
    fixtures.map(function(fixture){
        return fs.readFile('in-'+fixture.nombre+'.txt').then(function(bufferNode){
            var buffer = new ArrayBuffer(bufferNode);
            if(fixture.encoded){
                try{
                    console.log('buffer', buffer);
                    var imposible = buffer.toString();
                    console.log('imposible', imposible);
                    var bufferConv = new Buffer(imposible, 'utf8');
                    if(imposible.substr(1).indexOf('\uFFFD')<0){
                        console.log('Error. Se esperaba detectar un problema al considerar UTF8 a '+fixture.nombre+' que esta en '+fixture.encoded,imposible.substr(1).indexOf('\uFFFD'));
                    }
                    if(buffer==bufferConv){
                        console.log('Error. Se esperaba detectar un problema al considerar UTF8 a '+fixture.nombre+' que esta en '+fixture.encoded,'son iguales');
                    }
                    fs.writeFile('local-in-'+fixture.nombre+'.txt', imposible);
                }catch(err){
                    console.log('Error ok',err);
                    console.log(err.stack);
                }
                return iconv.decode(buffer, fixture.encoded);
            }
            return buffer.toString();
        }).then(function(str){
            return fs.writeFile('local-res-step1-'+fixture.nombre+'.txt', str).then(function(){return str;});
        }).then(function(str){
            var count=contarPalabras(str);
            var outstr=str+'\r\nPalabras: '+count+'\r\n';
            return fs.writeFile('local-res-step2-'+fixture.nombre+'.txt', outstr).then(function(){return outstr;});
        }).then(function(outstr){
            if(fixture.encoded){
                return iconv.encode(outstr, fixture.encoded);
            }
            return outstr;
        }).then(function(outbuf){
            return fs.writeFile('local-res-step3-'+fixture.nombre+'.txt', outbuf);
        }).catch(function(err){
            console.log('Error inesperado al procesar '+fixture.nombre);
            console.log(err);
            throw err;
        });
    })
).then(function(){
    return fs.readdir('.');
}).then(function(names){
    return Promise.all(
        names.filter(function(name){
            return name.startsWith('local-res-');
        }).map(function(name){
            return fs.readFile(name).then(function(obtainedBuffer){
                return fs.readFile(name.substr('local-res-'.length)).then(function(expectedBuffer){
                    for(var i=0; i<Math.max(obtainedBuffer.length,expectedBuffer.length); i++){
                        if(obtainedBuffer[i]!=expectedBuffer[i]){
                            return 'Dif '+name+' pos '+i+' '+obtainedBuffer[i]+' != '+expectedBuffer[i];
                        }
                    }
                    return null;
                });
            });
        })
    );
}).then(function(results){
    console.log('Fin');
    console.log(results.filter(function(result){ return result; }));
}).catch(function(err){
    console.log('Error inesperado');
    console.log(err);
});

// Convert from js string to an encoded buffer. 
// buf = iconv.encode("Sample input string", 'win1251');
 
// Check if encoding is supported 
// iconv.encodingExists("us-ascii")