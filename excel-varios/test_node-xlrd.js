"use strict"

var xl = require('node-xlrd')
var Promises = require('best-promise');
var fs = require('fs-promise');

function promiseXLRD(file) {
    return Promises.make(function(resolve, reject) {
        xl.open(file, function(err,bk) {
            if(err) { return reject(err); }
            return resolve(bk);
        });
    });
}

fs.readdir('.').then(function(files) {
    // return Promises.all(files.filter(function(file) { return file.match(/(\.xlsx?)$/); }).map(function(xls) {
    return Promises.all(files.filter(function(file) { return file.match(/(\.xls)$/); }).map(function(xls) {
        promiseXLRD(xls).then(function(bk) {
            //console.log('xls: ', bk);
            var shtCount = bk.sheet.count;
            for(var sIdx = 0; sIdx < shtCount; sIdx++ ){
                console.log('sheet "%d" ', sIdx);
                console.log('  check loaded : %s', bk.sheet.loaded(sIdx) );
                var sht = bk.sheets[sIdx],
                    rCount = sht.row.count,
                    cCount = sht.column.count;
                console.log('  name = %s; index = %d; rowCount = %d; columnCount = %d', sht.name, sIdx, rCount, cCount);
                for(var rIdx = 0; rIdx < rCount; rIdx++){
                    for(var cIdx = 0; cIdx < cCount; cIdx++){
                        try{
                            console.log('  cell : row = %d, col = %d, value = "%s"', rIdx, cIdx, sht.cell(rIdx,cIdx));
                        }catch(e){
                            console.log(e.message);
                        }
                    }
                }
            }
        });
    }));
}).catch(function(err) {
    console.log("Error", err)
});
