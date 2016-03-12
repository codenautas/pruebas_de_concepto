function isDOM(){
    try{
        var key;
        while(localStorage[key='detect-dom-'+Math.random()]) ;
        localStorage[key]=1;
        return localStorage[key]!==1;
    }catch(err){
        return false;
    }
}

console.log('isDOM', isDOM());

if(!isDOM()){
    global.localStorage=[];
    Object.observe(global.localStorage, function(changes){
        changes.forEach(function(change){
            if(typeof change.object[change.name] != "string" && change.name=='add' || change.name=='update'){
                change.object[change.name] = ""+change.object[change.name];
            }
            console.log(change, JSON.stringify(change.object[change.name]));
        });
    });
}

console.log('cheat isDOM', isDOM());
