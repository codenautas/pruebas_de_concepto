import * as pg from "pg-promise-strict";

pg.easy=true;

import "mocha";

async function test_trans(client:pg.Client, fileName:string, regexp?:RegExp){
    try{
        await client.query('BEGIN TRANSACTION').execute();
        await client.executeSqlScript(fileName);
        await client.query('COMMIT').execute();
        if(regexp){
            throw 'Debió dar error y no lanzó';
        }
    }catch(err){
        if(!regexp || !regexp.test(err.message)){
            throw err;
        }else{
            console.log('OK',err.message)
        }
    }
}

describe("test de cumpo femenino", async function(){
    var client:pg.Client;
    before(async function(){
        client = await pg.connect({
            database: 'test_db',
            user: 'test_user',
            password: 'test_pass',
            port: '5430'
        });
        await client.executeSqlScript('create_schema.sql'); 
    });
    after(function(){
        client.done();
    })
    it("acepta con cupo al 50%", async function(){
        await test_trans(client, 'cupo_ok_2y2.sql');
    })
    it("rechaza un vacío", async function(){
        await test_trans(client, 'vacio.sql', /vacio/i);
    })
    it("rechaza si no cumple el cupo", async function(){
        await test_trans(client, 'sin_cupo_2y1.sql', /no respeta/i);
    })
});