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


mysqlPromise.connect = function connect(connectParameters){
    return Promises.make(function(resolve, reject){
        var client = mysql.createConnection(connectParameters);
        resolve(new mysqlPromise.Client(client));
    });
};

module.exports = mysqlPromise;