export abstract class BaseC {
    config = {};

    constructor() {
        this.addConf({ baseOpt: 'baseOpt' });
    }

    addConf(newConf = {}) {
        this.config = { ...this.config, ...newConf };
    }
}
export class Serial extends BaseC {
    constructor() {
        super();
        this.addConf({ serialOpt: 'serialOpt' });
    }
}
export class Bar extends Serial {
    constructor() {
        super();
        this.addConf({ barOpt: 'barOpt' });
    }
}
export class Pyramid extends Bar {
    constructor() {
        super();
        this.addConf({ pyramidOpt: 'pyramidOpt' });
    }
}

var p = new Pyramid();
console.log(JSON.stringify(p.config));