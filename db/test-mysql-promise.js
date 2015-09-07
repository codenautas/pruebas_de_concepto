"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
var Path = require('path');
var winOS = Path.sep==='\\';
var Promises = require('best-promise');

var mysqlPromise = require('./mysql-promise.js');

var params = {
  host       : 'localhost',
  user       : 'node',
  password   : 'edon',
  database   : 'nodepru'
};
if(! winOS) {
    params['socketPath']= '/var/run/mysql/mysql.sock';
}

var done;

Promises.start().then(function(){
    return mysqlPromise.connect(params, done);
}).then(function(client){
    console.log("client", client);
    return client.connect();
}).then(function(con) {
        console.log("con", con);
    con.end();
}).catch(function(err){
    console.log("err", err);
    console.log("err.stack", err.stack);
    console.log('Check your MySQL instalation. Then be sure to create the user and db with:');
    console.log("create user test_user password 'test_pass';");
    console.log("create database test_db owner test_user;");
});