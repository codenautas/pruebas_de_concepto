import {BaseApp, TableDef} from "./base-app"

export function emergeLogApp(base:typeof BaseApp){
    abstract class LogApp extends base{
        enabled:boolean=false
        getTables():TableDef[]{
            return super.getTables().concat([
                {name:'log'}
            ]);
        }
        async installPart(part:string, content:string){
            console.log('installing part',part,content);
            await super.installPart(part, content);
        }
        async install(){
            console.log("INSTALL ",this.getName());
            await super.install();
            await this.installPart('log-part','log part');
            return 
        }
        enableLog(enable:boolean){
            this.enabled=enable;
        }

    }
    return LogApp;
}