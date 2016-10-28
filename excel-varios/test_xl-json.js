"use strict"

const Converter = require('xl-json');
var Promises = require('best-promise');
var fs = require('fs-promise');

fs.readdir('.').then(function(files) {
    return Promises.all(files.filter(function(file) { return file.match(/(\.xlsx?)$/); }).map(function(xls) {
        console.log('xls: ', xls);
        const options = {
            input: Path.resolve(__dirname, xls),
            output: './out/'+xls,
            spacer: 2, // optional for JSON.stringify
            replacer: ['key'] // optional array or function to be passed to JSON.stringify
            // formatter: {
                 // optional object with keys representing the name of sheet within workbook
                 // you would like to format and the value is a function that takes one parameter
                 // which is an array of objects.  Defaults to standard format which doesn't
                 // affect parsing done by j module
                // organisation: formatter
            // }
        };
        const results = new Converter(options);
        console.log("  ", results.toJson());
    }));
}).catch(function(err) {
    console.log("Error", err)
});
