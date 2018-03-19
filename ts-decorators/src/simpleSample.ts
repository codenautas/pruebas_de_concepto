
function decFunction() {
    console.log("decoratorFunction(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("decoratorFunction(): called");
        console.log('targ ->' + target)
        console.log('propertyKey ->' + propertyKey);
        console.log('descriptor ->' + JSON.stringify(descriptor));
    }
}

class HotDog {
    @decFunction()
    ladrarFinito(): string {
        return 'guA guA guA guA'
    }
}

console.log('lalala')

