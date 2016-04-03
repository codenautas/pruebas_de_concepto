    function isDOM(){
        try{
          if(typeof window !== "undefined" && this === window){
            if(window.window === window){
              try{
                window.temporarySaveWindow = window.window;
                delete window.window;
                if(window.window){
                  delete window.temporarySaveWindow;
                  return true;
                }
                global.window = window.temporarySaveWindow;
                delete window.temporarySaveWindow;
                return false;
              }catch(err){
                delete window.temporarySaveWindow;
                return false;
              }
            }
          }else{
            return false;
          }
        }catch(err){
          return false;
        }
    }

    var isDOM2=new Function("try {return this===window;}catch(e){ return false;}");

    console.log('isDOM', isDOM());

    if(!isDOM()){
        global.window = global;
        Object.defineProperty(global, 'window', {configurable: false});
    }

    console.log('cheat isDOM', isDOM());
