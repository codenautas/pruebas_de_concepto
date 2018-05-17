import {BaseApp, TableDef} from "./base-app"

export function emergeSecuredApp(base:typeof BaseApp){
    abstract class SecuredApp extends base{
        user:string='UNLOGGED';
        getTables():TableDef[]{
            return super.getTables().concat([
                {name:'secured'},
                {name:'roles'}
            ]);
        }
        async installPart(part:string, content:string){
            if(this.hasPermission(this.user, part)){
                await super.installPart(part,content);
            }else{
                console.log("ERROR. Not authorized ",part);
            }
        }
        hasPermission(user:string, part:string):boolean{
            return user=='ADMIN';
        }
        async install(){
            await super.install();
            await this.installPart('log-part','the log');
            return ;
        }
        setUser(user:string){
            this.user=user;
        }

    }
    return SecuredApp;
}