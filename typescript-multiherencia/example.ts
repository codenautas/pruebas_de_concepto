
class Base{
    constructor(){

    }
}

function createLogClass(base:typeof Base){
    return class extends base{
        constructor(){
            super();
            console.log('log',this.constructor.name)
        }
        isLogging(){
            return true;
        }
    }
}

class Animal extends Base{
    constructor(){
        super();
        console.log('ANIMAL')
    }
}

var LoggedAnimal = createLogClass(Animal);
var lanimal = new LoggedAnimal();
lanimal.isLogging(); // OK

class BigLoggedAnimal extends LoggedAnimal{
    do(){
        console.log('do');
    }
}

var bigLoggedAnimal = new BigLoggedAnimal();
bigLoggedAnimal.isLogging(); // OK
bigLoggedAnimal.do();

function createJumpingClass(base:typeof Base){
    return class extends base{
        constructor(){
            super();
            console.log('constructing a jumping class');
        }
        jump(){
            console.log('jump')
        }
    }
}

var JumpmingLogAnimal = createJumpingClass(BigLoggedAnimal)
var jumpmingLogAnimal = new JumpmingLogAnimal();
jumpmingLogAnimal.jump(); // OK 
jumpmingLogAnimal.isLogging(); // [ts] Property 'isLogging' does not exist on type '(Anonymous class)'
