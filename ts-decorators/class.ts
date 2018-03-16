function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        hello = "override";
        newProperty = "new property"; 
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    other: string;
    constructor(m: string) {
        console.log(this);
        this.hello = m;
        this.other = m;
        console.log(this);
    }
}

console.log(new Greeter("world"));