"use strict";

var fetch = require('node-fetch');

// if you are on node v0.10, set a Promise library first, eg.
// fetch.Promise = require('bluebird');

// plain text or html
/*
fetch('https://github.com/')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        console.log(body);
    });
*/
// json

var headers;
fetch('https://api.github.com/users/github', {
    headers: { 'User-Agent': 'Node-Fetch agent' },
    })
    .then(function(res) {
        headers = res.headers.raw();
        console.log("headers", headers);
        return res.json();
    }).then(function(json) {
        console.log(json);
        console.log("New full request can be done at: ", new Date(headers['x-ratelimit-reset'] * 1000))
    });