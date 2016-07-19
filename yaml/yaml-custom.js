"use strict";

var yaml = require('js-yaml');
var fs = require('fs');

var parte={
    parteA: "A",
}

function MiClase(date){
    this.miDate=date;
}
MiClase.prototype.toString=function(){
    return "tengo "+this.miDate;
}

var DateYamlType = new yaml.Type('!date1', {
  kind: 'sequence',

  resolve: function (data) {
    return data !== null && data.length === 3;
  },

  construct: function (data) {
    return new Date(data[0], data[1]-1, data[2]);
  },

  instanceOf: Date,
  represent: function (date) {
    return [ date.getFullYear(), date.getMonth()+1, date.getDate() ];
  }
});

var MiClaseYamlType = new yaml.Type('!date2', {
  kind: 'sequence',

  resolve: function (data) {
    return data !== null && data.length === 3;
  },

  construct: function (data) {
    return new MiClase(new Date(data[0], data[1]-1, data[2]));
  },

  instanceOf: MiClase,
  represent: function (date) {
    return [ date.miDate.getFullYear(), date.miDate.getMonth()+1, date.miDate.getDate() ];
  }
});

var schema = yaml.DEFAULT_SAFE_SCHEMA;
var schema = yaml.Schema.create([ DateYamlType, MiClaseYamlType ]);

var convertir={
    //fecha: new Date(1969, 5-1, 6),
    //undef: undefined,
    miFecha: new MiClase(new Date(1969, 5-1, 6)),
};

for(var p in convertir){
    console.log('------',p,':',convertir[p]);
    var u=yaml.dump(convertir[p], {schema});
    console.log("unsafe", u);
    try{
        var s=yaml.safeDump(convertir[p], {schema});
    }catch(err){
        s=err;
    }
    //fs.writeFileSync("./yaml-custom.yaml", s);
    console.log("safe", s.toString());
    if(u!=s){
        console.log("ERROR", s);
    }
    var o=yaml.load(u, {schema})
    console.log(o,o && o.a?(o.a===o.b):'');
}

console.log('-------------');
//console.log(yaml.load(" id_type: pepe\n "));
//console.log(yaml.load('- card\n- 123456\n '));