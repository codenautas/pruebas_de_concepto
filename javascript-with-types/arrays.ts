

function uno():Readonly<string[]>{
    return ['uno'];
}

function dos(uno:string[]){
    uno.push('dos');
}

var tres = uno();
// dos(tres);
console.log(tres);