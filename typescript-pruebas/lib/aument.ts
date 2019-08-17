type Uno = {
    uno:string;
}

type ConLabel<T> = T & {label:string};

var uno:Uno = {uno:'uno'};

console.log(uno);

var dos:ConLabel<Uno> = {uno:'uno'};

function ponerLabel<T>(o:ConLabel<T>, label:string){
    o.label=label;
}

ponerLabel(dos);

console.log(dos);
