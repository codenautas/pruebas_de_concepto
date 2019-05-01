function comma(){
    var x=4, 5;
    var y=7;
    // var z = await x*y;
    return x & y;
}


var x=["uno", 2, "tres", {cuatro:4}];

for(var [i,v] of x.entries()){
    var j:number;
    console.log(typeof i, i, typeof v, v);
    v.tocado=true;
}

var ab: any;
var ac;

switch(ab){
    case 1:
        console.log('2');
    case 2:
        console.log(3)
}

console.log(x);