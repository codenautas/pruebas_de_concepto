process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var util = require('util');

  process.stdin.on('data', function (text) {
      console.log("data", text);
    console.log('received data:', util.inspect(text));
    //if (text.match(/quit\r?\n/)) {
    if (text.match(/\r?\n/)) {
      done();
    }
  });

  function done() {
    console.log('Now that process.stdin is paused, there is nothing more to do.');
    process.exit();
  }