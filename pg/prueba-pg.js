"use strict";


var pg=require("pg");
var PostgresInterval = require('postgres-interval');

var auditCopy=require('audit-copy');

var sleep=require('best-globals').sleep;
var MiniTools=require('mini-tools');

function logErr(err){
    console.log(err)
    console.log(err.stack)
}

var hola = function Saludo(texto){
    this.texto=texto;
}

console.log('******************');
console.log(new hola('hi'));

var y = new PostgresInterval("4:12:00");
var x = new PostgresInterval();

console.log('-----------------');
console.log('is theirs');
console.log(y);
console.log(JSON.stringify(y));
console.log(y.toPostgres());
console.log('is ours');
x.hours=4;
x.minutes=12;
console.log(x);
console.log(JSON.stringify(x));
console.log(x.toPostgres());

process.exit();

MiniTools.readConfig([
    {db:{idleTimeoutMillis:2000}},
    'def-config.yaml',
    'local-config.yaml'
]).then(function(config){
    console.log('======== TEST 1');
    return testTimeOut(config).then(sleep(6000)).then(function(){
        console.log('======== TEST 2');
        return testTimeOut(config);
    });
}).catch(logErr);

var pool1;


function testTimeOut(config){
    var pool = new pg.Pool(config.db);
    console.log('SIN CONEXIONES');
    return pool.connect().then(function(client){
        console.log('1 CONEXION');
        console.log('pool', pool.pool._inUseObjects.length, pool.pool._inUseObjects[0]);
        client.query("SELECT '1 year 11 days 13:45:15.12'::interval el_intervalo", function(err, result) {
            console.log(result.rows[0]);
            console.dir(result.rows[0].el_intervalo);
            console.log(result.rows[0].el_intervalo);
            console.log(JSON.stringify(result.rows[0].el_intervalo));
            console.log(''+result.rows[0].el_intervalo);
            console.log(result.rows[0].el_intervalo.toString());
            console.log('=========');
            for(var attr in result.rows[0].el_intervalo){
                console.log(attr, result.rows[0].el_intervalo[attr]);
            }
            client.release();
            console.log('pool release', pool.pool._inUseObjects.length, pool.pool.borrowed);
            [1000,2000,3000].forEach(function(time){
                sleep(time).then(function(){
                    console.log('FINALLY CONEXIONES');
                    console.log('pool',time,'sleep', pool.pool._inUseObjects.length, pool.pool.borrowed);
                }).catch(logErr);
            });
        });
    });
}

