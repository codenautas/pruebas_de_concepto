"use strict";

import BigFella from './big1.js';

// var BigFella = require('./class1.js');

BigFella.prototype.bigMethod2 = function() {
  console.log('big2');
}

var b=new BigFella();
b.main();