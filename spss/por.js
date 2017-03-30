"use strict";

var por = require('por');

var rw = require("rw");

var reader = rw.fileReader('local-data.sav'),
    writer = rw.fileWriter("local-salida.txt"),
    parser = por.parser();

reader.fill(function pipe(error) {
  if (error) throw error;
  var data = reader.read(),
      row;

  if (data) parser.push(data);

  while ((row = parser.pop()) != null) {
    if (!writer.write(row.join("\t") + '\n')) {
      return writer.drain(pipe);
    }
  }

  if (reader.ended) return writer.end();

  reader.fill(pipe);
});