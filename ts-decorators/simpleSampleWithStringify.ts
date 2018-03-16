//hack para stringificar las funciones y mostrarlas
function estringifai(obj, prop) {
    var placeholder = '____PLACEHOLDER____';
    var fns: any[] = [];
    var json = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function') {
            fns.push(value);
            return placeholder;
        }
        return value;
    }, 2);
    json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function (_) {
        return fns.shift();
    });
    return 'this["' + prop + '"] = ' + json + ';';
};

function decoratorFunction() {
    console.log("decoratorFunction(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("decoratorFunction(): called");
        console.log('targ ->' + estringifai(target, 'target'))
        console.log('propertyKey ->' + propertyKey);
        console.log('descriptor ->' + JSON.stringify(descriptor));
    }
}

class Caniche {
    @decoratorFunction()
    ladrarFinito(): string {
        return 'guA guA guA guA'
    }
}

console.log('lalala')

