process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: "${chunk}"`);
    if (chunk.match(/\r?\n/)) {
      process.stdin.end();
    }
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});