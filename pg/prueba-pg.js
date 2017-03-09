"use strict";

var pg=require("pg");

var auditCopy=require('audit-copy');

var sleep=require('best-globals').sleep;
var MiniTools=require('mini-tools');

function logErr(err){
    console.log(err)
    console.log(err.stack)
}

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
        client.release();
        console.log('pool release', pool.pool._inUseObjects.length, pool.pool.borrowed);
        [1000,2000,3000].forEach(function(time){
            sleep(time).then(function(){
                console.log('FINALLY CONEXIONES');
                console.log('pool',time,'sleep', pool.pool._inUseObjects.length, pool.pool.borrowed);
            }).catch(logErr);
        });
    });
}

