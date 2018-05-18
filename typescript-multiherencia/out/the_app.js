"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_app_1 = require("./log-app");
const secured_1 = require("./secured");
class TheLogApp extends log_app_1.LogApp {
    getName() {
        return "TheLogApp";
    }
}
var chain = Promise.resolve();
var myTheLogApp = new TheLogApp();
myTheLogApp.enableLog(true);
chain = chain.then(function () {
    return myTheLogApp.install();
});
var SecuredLogApp = secured_1.emergeSecuredApp(log_app_1.LogApp);
class TheSecuredLogApp extends SecuredLogApp {
    getName() {
        return "TheSecuredLogApp";
    }
    doThe() {
        console.log('doing');
    }
}
var myTheSecuredLogApp;
var myTheSecuredLogAppTemp = new TheSecuredLogApp();
if (!(myTheSecuredLogAppTemp instanceof log_app_1.LogApp)) {
    throw new TypeError('!(myTheSecuredLogAppTemp instanceof LogAppType)');
}
else {
    myTheSecuredLogApp = myTheSecuredLogAppTemp;
    myTheSecuredLogApp.enableLog(true);
    myTheSecuredLogApp.setUser("ADMIN");
    myTheSecuredLogApp.doThe();
    chain = chain.then(function () {
        return myTheSecuredLogApp.install();
    });
}
var LogSecuredApp = log_app_1.emergeLogApp(secured_1.SecuredApp);
class TheLogSecuredApp extends LogSecuredApp {
    getName() {
        return "TheLogSecuredApp";
    }
}
var myTheLogSecuredApp;
var myTheLogSecuredAppTemp = new TheLogSecuredApp();
if (!(myTheLogSecuredAppTemp instanceof secured_1.SecuredApp)) {
    throw new TypeError('!(myTheLogSecuredAppTemp instanceof SecuredAppType)');
}
else {
    myTheLogSecuredApp = myTheLogSecuredAppTemp;
    myTheLogSecuredApp.enableLog(true);
    myTheLogSecuredApp.setUser("ADMIN");
    chain = chain.then(function () {
        return myTheLogSecuredApp.install();
    });
}
//# sourceMappingURL=the_app.js.map