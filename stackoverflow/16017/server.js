"use strict";
//from: https://nodejs.org/dist/latest-v4.x/docs/api/net.html#net_net_createserver_options_connectionlistener
var net=require('net');

var server=net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(7777, () => {
  console.log('server bound');
});
