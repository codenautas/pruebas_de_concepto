import {BaseApp} from "./base-app";
import {emergeLogApp} from "./log-app";
import {emergeSecuredApp} from "./secured";

var LogApp = emergeLogApp(BaseApp);

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

var myTheSecuredLogApp = new TheSecuredLogApp();
myTheSecuredLogApp.enableLog(true);
myTheSecuredLogApp.setUser("ADMIN");
myTheSecuredLogApp.doThe();
chain = chain.then(function(){
    return myTheSecuredLogApp.install();
});

var SecuredApp = emergeSecuredApp(BaseApp);
var LogSecuredApp = emergeLogApp(SecuredApp);

class TheLogSecuredApp extends LogSecuredApp{
    getName(){
        return "TheLogSecuredApp";
    }
}

var myTheLogSecuredApp = new TheLogSecuredApp();
myTheLogSecuredApp.enableLog(true);
myTheLogSecuredApp.setUser("ADMIN");
chain = chain.then(function(){
    return myTheLogSecuredApp.install();
});


class OtherLogSecuredApp extends LogSecuredApp{
    getName(){
        return "OtherLogSecuredApp";
    }
    constructor(){
        super();
        this.setUser('admin');
        this.enableLog(true);
    }
}

var otherLogSecuredApp = new OtherLogSecuredApp();
chain = chain.then(function(){
    return otherLogSecuredApp.install();
});
