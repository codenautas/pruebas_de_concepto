"use strict";

// OPTIONS
var seeAll = false; // false=only errors and !=
// var seeAll = true; // false=only errors and !=

var orderBy = 2; // 1==encoders, 2==fixtures

var deepEqual = require('deep-equal');

var JSON3 = require('json3');
var yaml = require('js-yaml');

var cYaml = require('./custom-yaml.js');

var EJSON = require('ejson');

var parte={
    parteA: "A",
}

var Point=cYaml.Point;
// For EJSON
Point.prototype.typeName=function(){ return "Point";}
Point.prototype.toJSONValue=function(){ return JSON.stringify(this); }
Point.EJSONFactory=function(s){ var o=JSON.parse(s); return new Point(o.x, o.y, o.z); }
EJSON.addType("Point", Point.EJSONFactory);

var encoders=[
    {name: 'JSON3'      , object:JSON3, parseName:'parse'     , stringifyName:'stringify' },
    {name: 'JSON'       , object:JSON , parseName:'parse'     , stringifyName:'stringify' },
    {name: 'yaml'       , object:yaml , parseName:'load'      , stringifyName:'dump'      },
    {name: 'yaml-safe'  , object:yaml , parseName:'safeLoad'  , stringifyName:'safeDump'  },
    {name: 'yaml-custom', object:cYaml, parseName:'customLoad', stringifyName:'customDump'},
    {name: 'ejson'      , object:EJSON, parseName:'parse'     , stringifyName:'stringify' },
]

var fixtures=[
    {name:'fecha'     ,value: new Date(1969, 5-1, 6),    },
    {name:'bigNumber' ,value: 12345678901234567890,      },
    {name:'strDate'   ,value: "2012-01-02",              },
    {name:'strStr'    ,value: "hola",                    },
    {name:'parte'     ,value: parte,                     },
    {name:'partes'    ,value: [parte, parte],            },
    {name:'rombo'     ,value: {a:parte, b:parte},        },
    {name:'array'     ,value: [1,"2", false],            },
    {name:'bool'      ,value: true,                      },
    {name:'null'      ,value: null,                      },
    {name:'undef'     ,value: undefined,                 },
    {name:'{undef}'   ,value: {a:undefined}, expected:{} },
    {name:'regex'     ,value: /hola/,                    },
    {name:'fun'       ,value: function(x){ return x+1; } },
    {name:'{fun}'     ,value: {f:function(x){ return x+1; }}, expected:{} },
    {name:'Point'     ,value: new Point(1,2,3.3), check:function(o){ return o instanceof Point;} },
    {name:'hack-EJSON',value: {"$type":"Point","$value":"{\"klass\":\"Point\",\"x\":1,\"y\":2,\"z\":3.3}"} },
    {name:'hack2EJSON',value: {"$escape":{"$type":"Point","$value":"{\"klass\":\"Point\",\"x\":1,\"y\":2,\"z\":3.3}"}} },
];

var iterators=[null,null];

iterators[orderBy-1]=encoders;
iterators[2-orderBy]=fixtures;

iterators[0].forEach(function(firstDef){
    if(firstDef.skip) return;
    console.log('=======',firstDef.name);
    iterators[1].forEach(function(secondDef){
        var defs=[firstDef,secondDef];
        var encoderDef=defs[orderBy-1];
        var fixture=defs[2-orderBy];
        var withError=false;
        var dif=false;
        if(secondDef.skip) return;
        var results=[];
        results.push(['----',secondDef.name]);
        results.push(['value:',fixture.value]);
        try{
            var encoded=encoderDef.object[encoderDef.stringifyName](fixture.value);
            results.push(['encoded:',encoded]);
            var decoded=encoderDef.object[encoderDef.parseName](encoded);
            var res=['decoded:',decoded]; 
            dif=!deepEqual(decoded,'expected' in fixture?fixture.expected:fixture.value);
            if(dif){ res.push('* !='); }
            if('check' in fixture){
                if(!fixture.check(decoded)){
                    withError=true;
                    res.push('*fail check');
                }
            }
            results.push(res);
        }catch(err){
            withError=true;
            results.push(['*ERROR:',err]);
        }
        if(seeAll || dif || withError){
            results.forEach(function(resultData){
                console.log.apply(console,resultData);
            });
        }
    });
});

