var x = NNNaaaNNN;

type Eme={n:string}

type NonSparse<T>=T[];

var a:NonSparse<Eme>=[{n:'uno'},{n:'dos'},{n:'tres'}];
var ax:Eme[]=[{n:'uno'},{n:'dos'},{n:'tres'}];

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
