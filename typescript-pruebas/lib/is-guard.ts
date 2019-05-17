
class ANumber{
    number:number
}

class AOne extends ANumber{
    label:string
}

type TNumber={
    number:number
}

type TOne = ANumber & {
    number:1,
    label:string
}

// function isOne<T extends ANumber>(one:T): one is One{
function isAOne(one:ANumber): one is AOne{
    return one.number==1;
}

function isTOne(one:TNumber): one is TOne{
    return one.number==1;
}

var anum:ANumber;

if(isAOne(anum)){
    console.log(anum.label);
}

var tnum:TNumber;
if(isTOne(tnum)){
    console.log(tnum.label);
}

var tone:TOne={number:1, label:'one'};
tnum=tone;
if(isTOne(tnum)){
    tnum.label;
}
