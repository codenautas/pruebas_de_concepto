
async function slow(chanel:number,message:string,speed?:number){
    var margin = new Array(chanel).join(' ');
    var letters = message.split('');
    while(letters.length){
        console.log(margin,letters.shift())
        await new Promise(function(resolve){
            setTimeout(resolve,speed||300)
        })
    }
    console.log(margin,'.')
    return message+margin.length;
}

async function parallelExample(){
    var xp = {
        hola: slow(1,'hola'),
        chau: slow(4,'chau'),
    }
    var x = {
        hola: await xp.hola,
        chau: await xp.chau,
    }
    console.log('------------');
    console.log(x);
}

parallelExample();