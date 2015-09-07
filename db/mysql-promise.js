"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */

var Promises = require('best-promise');
var mysql = require('mysql');

var mysqlPromise = {};

mysqlPromise.Client = function Client(client){
   var self = this;
    var assignFunctionsPostConnect = function assignFunctionsPostConnect(){
        self.query = function query(){
            if(mysqlPromise.log){
                var sql=arguments[0];
                mysqlPromise.log('------');
                if(arguments[1]){
                    mysqlPromise.log('-- '+sql);
                    mysqlPromise.log('-- '+JSON.stringify(arguments[1]));
                    for(var i=1; i<=arguments[1].length; i++){
                        var valor=arguments[1][i-1];
                        if(typeof valor === 'string'){
                            valor="'"+valor.replace(/'/g,"''")+"'";
                        }
                        sql=sql.replace(new RegExp('\\$'+i+'\\b'), valor);
                    }
                }
                mysqlPromise.log(sql+';');
            }
            var queryArguments = arguments;
            var returnedQuery = client.query.apply(client,queryArguments);
            return new mysqlPromise.Query(returnedQuery, self);
        };
    };
    this.connect = function connect(){
        // mysqlPromise.log('Client.connect');
        if(arguments.length){
            return Promises.reject(new Error('client.connect must no receive parameters, it returns a Promise'));
        }
        return Promises.make(function(resolve, reject){
            client.connect(function(err){
                if(err){
                    reject(err);
                }else{
                    assignFunctionsPostConnect();
                    self.end = function end(){
                        client.end();
                    };
                    resolve(self);
                }
            });
        });
    };
};

function buildQueryCounterAdapter(minCountRow, maxCountRow, expectText, callbackOtherControl){
    return function queryCounterAdapter(result, resolve, reject){ 
        if(result.rows.length<minCountRow || result.rows.length>maxCountRow ){
            var err=new Error('query expects '+expectText+' and obtains '+result.rows.length+' rows');
            err.code='54011!';
            reject(err);
        }else{
            if(callbackOtherControl){
                callbackOtherControl(result, resolve, reject);
            }else{
                result.row = result.rows[0];
                delete result.rows;
                resolve(result);
            }
        }
    };
}

mysqlPromise.queryAdapters = {
    normal: function normalQueryAdapter(result, resolve/*, reject*/){ 
        resolve(result);
    },
    upto1:buildQueryCounterAdapter(0,1,'up to one row'),
    row:buildQueryCounterAdapter(1,1,'one row'),
    value: buildQueryCounterAdapter(1,1,'one row (with one field)',function(result, resolve, reject){
        if(result.fields.length!==1){
            var err=new Error('query expects one field and obtains '+result.fields.length);
            err.code='54U11!';
            reject(err);
        }else{
            var row = result.rows[0];
            result.value = row[result.fields[0].name];
            delete result.rows;
            resolve(result);
        }
    })
};

mysqlPromise.Query = function Query(query, client){
    var self = this;
    //mysqlPromise.allowAccessInternalIfDebugging(self, {query: query, client:client});
    this.execute = function execute(callbackForEachRow, adapterName){
        // mysqlPromise.log('Query.execute');
        if(callbackForEachRow && !(callbackForEachRow instanceof Function)){
            if(adapterName){
                return Promises.reject(new Error("Query.execute() must recive optional callback function and optional adapterName"));
            }
            adapterName=callbackForEachRow;
            callbackForEachRow=null;
        }
        var adapter = mysqlPromise.queryAdapters[adapterName||'normal'];
        return Promises.make(function(resolve, reject){
            query.on('error',function(err){
                console.log("error", err)
                reject(err);
            });
            query.on('row',function(row, result){
                console.log("row", row);
                if(callbackForEachRow){
                    callbackForEachRow(row, result);
                }else{
                    result.addRow(row);
                }
            });
            query.on('end',function(result){
                //console.log("result", result);
                //result.client = client;
                //if(mysqlPromise.log){
                //    mysqlPromise.log('-- '+JSON.stringify(result.rows));
                //}
                adapter(result, resolve, reject);
            });
        });
    };
    // new functions
    this.fetchOneRowIfExists = this.execute.bind(this,'upto1');
    this.fetchUniqueRow      = this.execute.bind(this,'row');
    this.fetchUniqueValue    = this.execute.bind(this,'value');
    this.fetchAll            = this.execute.bind(this,'normal');
    this.fetchRowByRow       = function fetchRowByRow(callback){
        // mysqlPromise.log('Query.onRow');
        if(!(callback instanceof Function)){
            var err=new Error('fetchRowByRow must recive a callback that executes for each row');
            err.code='39004!';
            return Promises.reject(err);
        }
        return this.execute(callback);
    };
    this.onRow = this.fetchRowByRow;
    /* why this then function is needed?
     *   pg.Client.query is synchronic (not need to recive a callback function) then not need to return a Promise
     *   but pg-promise-strict always returns a "theneable". Then "then" is here. 
     */
    if(mysqlPromise.easy){
        this.then = function then(callback,callbackE){
            delete this.then;
            delete this.catch;
            return this.execute().then(callback,callbackE);
        };
    }
};

mysqlPromise.connect = function connect(connectParameters){
    return Promises.make(function(resolve, reject){
        var client = mysql.createConnection(connectParameters);
        resolve(new mysqlPromise.Client(client));
    });
};

module.exports = mysqlPromise;