var iconv = require('iconv-lite');
var fs = require('fs-promise');

var fixtures=[
    {nombre:'ansi'         , encoded: 'win1251'},
    {nombre:'ansi-win1250' , encoded: 'win1250'},
    {nombre:'ascii7'       ,                   },
    {nombre:'utf8'         ,                   },
];

function contarPalabras(str){
    return str.split(/[],;.!¡?¿: '"\n\r\t%&^[(){}]/).length
}

Promise.all(
    fixtures.map(function(fixture){
        return fs.readFile('in-'+fixture.nombre+'.txt').then(function(buffer){
            if(fixture.encoded){
                return iconv.decode(buffer, fixture.encoded);
            }
            return buffer.toString();
        }).then(function(str){
            return fs.writeFile('local-res-step1-'+fixture.nombre+'.txt', str).then(function(){return str;});
        }).then(function(str){
            var count=contarPalabras(str);
            var outstr=str+'Palabras: '+count+'\r\n';
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
        });
    })
).then(function(){
    
});

// Convert from js string to an encoded buffer. 
// buf = iconv.encode("Sample input string", 'win1251');
 
// Check if encoding is supported 
// iconv.encodingExists("us-ascii")