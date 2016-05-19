"use strict";

var localConfig = require('./local-config.json');

console.log('localConfig', localConfig);

var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key:    localConfig.consumer_key,
    consumer_secret: localConfig.consumer_secret,
    token:           localConfig.token,
    token_secret:    localConfig.token_secret
  })
 
t.on('tweet', function (tweet) {
  console.log('tweet received', tweet.text, tweet.created_at, tweet.user.name);
})
 
t.on('error', function (err) {
  console.log('Oh no', err)
})
 
t.track('nodejs')

setInterval(function(){
    console.log('stamp',new Date());
},5000);