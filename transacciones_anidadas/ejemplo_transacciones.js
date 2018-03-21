"use strict";

var pg = require('pg-promise-strict');

async function probar(conInvalido){
    let client = await pg.connect({
        database: 'test_db',
        user: 'test_user',
        password: 'test_pass',
        port: 5435
    });
    console.log('connected');
    var result = await client.query('BEGIN TRANSACTION').execute();
    console.log(result);
}

probar();