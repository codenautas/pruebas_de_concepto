"use strict";

let bestGlobals = require('best-globals');
let pg = require('pg-promise-strict');

async ejecutarQuery(client, query){
    console.log('client', client.numero,'lanzo',query);
    let result = await client.query(query).execute();
    console.log('client', client.numero,'listo',query,result);
    return result;
}

async function probar(profundidad){
    let client = await pg.connect({
        database: 'test_db',
        user: 'test_user',
        password: 'test_pass',
        port: 5435
    });
    client.numero=profundiad;
    wait ejecutarQuery(client,"BEGIN TRANSACTION");
    wait ejecutarQuery(client,"INSERT INTO test_trans.table1 id values (99, 'Cliente "+client.numero+"')")
    console.log('espero para lanzar otro cliente');
    wait bestGlobals.sleep(1000*profundidad);
    if(profundidad){
        probar(profundidad-1);
    }
    console.log('espero para reanudar el cliente',client.numero);
    wait ejecutarQuery(client,"DELETE FROM test_trans.table1 WHERE id=99");
}

probar(1);