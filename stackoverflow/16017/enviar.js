"use strict";

var request = require('request');
var sleep = require('./sleep-js.js');

if(!"version1"){

  var sensors=["Rimac","Cercado"];

  for (var sensor in sensors){
    var date = new Date().toJSON();
  
    var datos={
      name:sensors[sensor],
      valor:Math.random()*20,
      fecha:date
    };
  
    console.log(datos);
    var options = {
      uri: 'http://localhost:7777/api/sensor',
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      json: datos
    };
  
    request(options,function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage. 
      }
    });
    sleep(1000);
  }
}else{
  for(var i=0;i<100;i++){
    var i = 11;
    console.log('i',i)
    var sensors=["Rimac","Cercado"];
    for (sensor in sensors){
      var date = new Date().toJSON();

      var datos={
        name:sensors[sensor],
        valor:Math.random()*20,
        fecha:date
      };

      console.log(datos);
      var options = {
        uri: 'http://localhost:7777/api/sensor',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: datos
      };
  
      request(options,function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 
        }
      });
      sleep(10000);
    }
  }   
}