import {LogApp} from "./log-app"

var x = new LogApp();

export type Constructor<T> = new(...args: any[]) => T;

export function emergeDobleLogApp<T extends typeof LogApp>(Base:T){
    return class extends Base{
        enabled:boolean=false
        constructor(...args:any[]){
            super(args);
            this.enabled(true);
        }
        getName():string{
            throw new Error('must implemente getName')
        }
    }
}

// export var DobleLogApp=emergeDobleLogApp(BaseApp);
// export class DobleLogAppType extends DobleLogApp{};
