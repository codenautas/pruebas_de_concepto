function decorarc(constructor: Function):void{
    console.log(constructor)
}

function decorarm(target: any, propertyKey: string):void{
    console.log(target, propertyKey)
}

function decorar(target: any, propertyKey: string, descriptor: PropertyDescriptor):void{
    console.log(target, propertyKey, descriptor)
}

@decorarc
class Log{
    @decorarm
    name:string = 'hola'
    @decorar
    pepe(a:any){
        console.log(a);
    }
    @decorar
    pepe2(a:any){
        console.log(a);
    }
}

var x={a:'anda', b:'bien'}

var l=new Log()
var pepe = l.pepe

pepe(x);

var y={b:'bien'}

pepe(y)

/*
async function query<T extends object>(queryText:string, placeHolder:T[]):Promise<void>{
    placeHolder = placeHolder.slice(1);    
}

async function query1<T extends object>(queryText:string):Promise<T[]>{
    return [] as T[];    
}

async function traer(){
    await query("select 3 as a, 'hola' as b ", x);
}


async function traer1(){
    var ls = await query1("select 3 as a, 'hola' as b ");
}

var xs = await query1<typeof x>("mensaje");
*/