import {BaseApp} from "./base-app";

import {emergeLogApp} from "./log-app";

var AppType = emergeLogApp(BaseApp);

class TheApp extends AppType{
    getName(){
        return "The App";
    }
}

var myApp = new TheApp();
myApp.enableLog(true);
myApp.install();

