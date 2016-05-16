"use strict";

class BigFella {
  constructor() {
    console.log('cons');
  }

  bigMethod1() {
    console.log('big1');
  }
  
  main() {
    this.bigMethod1();
    this.bigMethod2();
  }
}

module.exports = BigFella;