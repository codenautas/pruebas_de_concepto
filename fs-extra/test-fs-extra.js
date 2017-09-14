const fs = require('fs-extra');

var data={message:'this data'};

fs.writeFile('data.txt', data.message).then(function(status){
    console.log('writeFile finished');
});

fs.writeJson('data.json', data).then(function(status){
    console.log('writeJson finished');
});
