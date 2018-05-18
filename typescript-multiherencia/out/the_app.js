"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_app_1 = require("./base-app");
const log_app_1 = require("./log-app");
const secured_1 = require("./secured");
var LogApp = log_app_1.emergeLogApp(base_app_1.BaseApp);
class TheLogApp extends LogApp {
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
var SecuredLogApp = secured_1.emergeSecuredApp(LogApp);
class TheSecuredLogApp extends SecuredLogApp {
    getName() {
        return "TheSecuredLogApp";
    }
    doThe() {
        console.log('doing');
    }
}
var myTheSecuredLogApp = new TheSecuredLogApp();
myTheSecuredLogApp.enableLog(true);
myTheSecuredLogApp.setUser("ADMIN");
myTheSecuredLogApp.doThe();
chain = chain.then(function () {
    return myTheSecuredLogApp.install();
});
var SecuredApp = secured_1.emergeSecuredApp(LogApp);
var LogSecuredApp = log_app_1.emergeLogApp(SecuredApp);
class TheLogSecuredApp extends LogSecuredApp {
    getName() {
        return "TheLogSecuredApp";
    }
}
var myTheLogSecuredApp = new TheLogSecuredApp();
myTheLogSecuredApp.enableLog(true);
myTheLogSecuredApp.setUser("ADMIN");
chain = chain.then(function () {
    return myTheLogSecuredApp.install();
});
class OtherLogSecuredApp extends LogSecuredApp {
    getName() {
        return "OtherLogSecuredApp";
    }
    constructor() {
        super();
        this.setUser('admin');
        this.enableLog(true);
    }
}
var otherLogSecuredApp = new OtherLogSecuredApp();
chain = chain.then(function () {
    return otherLogSecuredApp.install();
});
//# sourceMappingURL=the_app.js.map