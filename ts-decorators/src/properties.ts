import "reflect-metadata";

const formatoCompuesto = ['Hola, ', 'che ', 'vos ', '%s']
const formatMetadataKey = Symbol("formatooooo");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
    @format(formatoCompuesto.join())
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}
 let a = new Greeter('typescript world');
 console.log(a.greet());
