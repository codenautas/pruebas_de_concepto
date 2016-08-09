"use strict";

var txtToSql = {};

var margin = ' ';
var separators=';,\t|';

function generateScripts(info){
    return Promise.resolve(info)
    .then(function(info){
        return info.scripts.map(function(script){ return script.sql; }).join('\n');
    });
}

txtToSql.generateScripts = generateScripts;

module.exports = txtToSql;