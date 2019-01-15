"use strict";


// a[9]={n:'pepe'};



    /////////// Actualy ///////////

    type Ene={n:string}
    var a:Ene[]=[{n:'uno'},{n:'dos'},{n:'tres'}];

    if(a.length){
        var e1 = a[a.length-1]; 
        var e2 = a.pop();  // e1 and e2 points to the same object
        console.log(e2.n); // [ts] Object is possibly 'undefined'.
        console.log(e1.n); // no error detects in e1 why?
    }

    /////////// SUGGESTION ///////////

    type Eme={n:string}
    var a:NonSparse<Eme[]>=[{n:'uno'},{n:'dos'},{n:'tres'}];

    if(a.length){
        var e1 = a[a.length-1]; 
        var e2 = a.pop();  // e1 and e2 points to the same object
        console.log(e2.n); // ok a is NonSparse
        console.log(e1.n); // ok a is NonSparse
        a.push({n:'tail'}); // ok
        a.unshift({n:'head'}); // ok
        a[a.length] = {n:'tail2'} // ok, same as push
        a[a.length+1] = {n:'far 1'} // ERROR, sparse
        a[7] = {n:'far 2'} // ERROR, may be sparse
        var i=8; 
        a[i] = {n:'far 3'} // ERROR, may be sparse
        if(i <= a.length){
            a[i] = {n:'far 2'} // ok, guard guarantees non sparse array
        }
        delete a[i]; // ERROR, me be transforming a into sparse array
        if(i >= a.length){
            delete a[i]; // ok, guard guarantees non sparse array
        }
    }

    /////////// CASE OF USE ///////////

    async function callSeq1(listOfFunctions:NonSparse<(()=>Promise<void>)[]>):Promise<void>{
        while(listOfFunctions.length){
            var f = listOfFunctions.pop();
            await f(); // [ts] Cannot invoke an object which is possibly 'undefined'.
        }
    }

    /////////// WORKARROUND ///////////

    async function callSeq2(listOfFunctions:NonSparse<(()=>Promise<void>)>[]):Promise<void>{
        var f;
        while(f = listOfFunctions.pop()){
            await f();
        }
    }





function alog(a:Ene[]){
    if(a.length){
        var f=a[a.length-1];
        console.log(f.n);
        var e=a.pop();
        console.log(e.n);
    }
    while(a.length){
        var e=a.pop()
        console.log(e.n);
    }
}

alog(a)

var x:{n:string}|null;

x={n:'hola'}

while(x !=null ){
    console.log(x.n);
    if(x.n.length){
        x.n=x.n.substr(0,x.n.length-1);
    }else{
        x=null;
    }
}
