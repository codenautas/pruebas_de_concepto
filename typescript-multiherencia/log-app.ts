import {BaseApp, TableDef} from "./base-app"

export function emergeLogApp(base:typeof BaseApp){
    return class extends base{
        enabled:boolean=false
        getName():string{
            throw new Error('must implemente getName')
        }
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
            console.log('=====================');
            console.log("INSTALL ",this.getName());
            await super.install();
            await this.installPart('log-part','log part');
            return 
        }
        enableLog(enable:boolean){
            this.enabled=enable;
        }

    }
}