"use strict";

// OPTIONS
var seeAll = false; // false=only errors and !=
var deepEqual = require('deep-equal');

// var yaml = require('./custom-yaml.js');

var JSON3 = require('json3');
var yaml = require('js-yaml');

var cYaml = require('../yaml/custom-yaml.js');

var parte={
    parteA: "A",
}

var encoders=[
    {name: 'JSON3'      , object:JSON3, parseName:'parse'     , stringifyName:'stringify' },
    {name: 'JSON'       , object:JSON , parseName:'parse'     , stringifyName:'stringify' },
    {name: 'yaml'       , object:yaml , parseName:'load'      , stringifyName:'dump'      },
    {name: 'yaml-safe'  , object:yaml , parseName:'safeLoad'  , stringifyName:'safeDump'  },
    {name: 'yaml-custom', object:cYaml, parseName:'customLoad', stringifyName:'customDump'},
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
    {name:'regex'     ,value: /hola/,                    },
    {name:'fun'       ,value: function(x){ return x+1; } },
];

encoders.forEach(function(encoderDef){
    if(encoderDef.skip) return;
    console.log('=======',encoderDef.name);
    fixtures.forEach(function(fixture){
        var withError=false;
        var dif=false;
        if(fixture.skip) return;
        var results=[];
        results.push(['----',fixture.name]);
        results.push(['value:',fixture.value]);
        try{
            var encoded=encoderDef.object[encoderDef.stringifyName](fixture.value);
            results.push(['encoded:',encoded]);
            var decoded=encoderDef.object[encoderDef.parseName](encoded);
            var res=['decoded:',decoded]; 
            dif=!deepEqual(decoded,fixture.value);
            if(dif){ res.push('* !='); }
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
