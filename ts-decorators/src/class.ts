function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    console.log('constructor',constructor)
    return class extends constructor {
        hello = "override";
        newProperty = "new property"; 
    }
}

@classDecorator
class Greeter {
    property:number = 33;
    hello: string;
    other: string;
    constructor(m: string) {
        console.log(this);
        this.hello = m;
        this.other = m;
        console.log(this);
    }
    doSomething(what:string){
        console.log('doing',what)
    }
}

var g = new Greeter("world");
console.log(g);
g.doSomething('wrong');