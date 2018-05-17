import {BaseApp} from "./base-app";

import {emergeLogApp} from "./log-app";
import {emergeSecuredApp} from "./secured";

var LogApp = emergeLogApp(BaseApp);
class LogAppClass extends LogApp{}

class TheLogApp extends LogApp{
    getName(){
        return "TheLogApp";
    }
}

var chain=Promise.resolve();

var myTheLogApp = new TheLogApp();
myTheLogApp.enableLog(true);
chain = chain.then(function(){
    return myTheLogApp.install();
});

var SecuredLogApp = emergeSecuredApp(LogApp);

class TheSecuredLogApp extends SecuredLogApp{
    getName(){
        return "TheSecuredLogApp";
    }
    doThe(){
        console.log('doing')
    }
}

var myTheSecuredLogApp:TheSecuredLogApp & LogAppClass;
myTheSecuredLogApp = new TheSecuredLogApp() as TheSecuredLogApp & LogAppClass;
myTheSecuredLogApp.enableLog(true);
myTheSecuredLogApp.setUser("ADMIN");
myTheSecuredLogApp.doThe();
chain = chain.then(function(){
    return myTheSecuredLogApp.install();
});
