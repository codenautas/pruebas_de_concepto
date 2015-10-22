var TextToSVG = require('text-to-svg').TextToSVG;
var textToSVG = new TextToSVG();

var attributes = {fill: 'red', stroke: 'black'};
var options = {x: 0, y: 0, fontSize: 72, attributes: attributes};

var svg = textToSVG.getSVG('hello', options);

console.log(svg);