function $pv(){
    var f = function(receivedValue){
        f.value = receivedValue;
    }
    return f;
}

function $po(){
    var f = function(receivedObject){
        for(var attr in receivedObject){
            f[attr] = receivedObject[attr];
        }
        f.$o = receivedObject;
        f.toString = function(){
            return '$o => '+util.inspect(receivedObject);
        }
    }
    return f;
}

Object.defineProperty(global, '$v', {get: $pv});
Object.defineProperty(global, '$o', {get: $po});

