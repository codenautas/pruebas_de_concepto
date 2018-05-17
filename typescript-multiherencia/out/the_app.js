"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_app_1 = require("./base-app");
const log_app_1 = require("./log-app");
var AppType = log_app_1.emergeLogApp(base_app_1.BaseApp);
class TheApp extends AppType {
    getName() {
        return "The App";
    }
}
var myApp = new TheApp();
myApp.enableLog(true);
myApp.install();
