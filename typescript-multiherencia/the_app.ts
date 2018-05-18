import {emergeLogApp,LogApp,LogAppType} from "./log-app";
import {emergeSecuredApp,SecuredApp,SecuredAppType} from "./secured";

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

var myTheSecuredLogApp:TheSecuredLogApp & LogAppType;
var myTheSecuredLogAppTemp = new TheSecuredLogApp();
if(!(myTheSecuredLogAppTemp instanceof LogApp)){
    throw new TypeError('!(myTheSecuredLogAppTemp instanceof LogAppType)')
}else{
    myTheSecuredLogApp=myTheSecuredLogAppTemp;
    myTheSecuredLogApp.enableLog(true);
    myTheSecuredLogApp.setUser("ADMIN");
    myTheSecuredLogApp.doThe();
    chain = chain.then(function(){
        return myTheSecuredLogApp.install();
    });
}

var LogSecuredApp = emergeLogApp(SecuredApp);

class TheLogSecuredApp extends LogSecuredApp{
    getName(){
        return "TheLogSecuredApp";
    }
}

var myTheLogSecuredApp:TheLogSecuredApp & SecuredAppType;
var myTheLogSecuredAppTemp = new TheLogSecuredApp();
if(!(myTheLogSecuredAppTemp instanceof SecuredApp)){
    throw new TypeError('!(myTheLogSecuredAppTemp instanceof SecuredAppType)')
}else{
    myTheLogSecuredApp=myTheLogSecuredAppTemp;
    myTheLogSecuredApp.enableLog(true);
    myTheLogSecuredApp.setUser("ADMIN");
    chain = chain.then(function(){
        return myTheLogSecuredApp.install();
    });
}
