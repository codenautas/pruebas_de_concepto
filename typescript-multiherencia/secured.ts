import {BaseApp, TableDef} from "./base-app"

export function emergeSecuredApp(base:typeof BaseApp){
    return class extends base{
        user:string='UNLOGGED';
        constructor(){
            super();
            this.user='UNLOGGED';
        }
        getName():string{
            throw new Error('must implemente getName')
        }
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
            return user=='ADMIN' || part=='public';
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
}

export var SecuredApp = emergeSecuredApp(BaseApp);
export class SecuredAppType extends SecuredApp{};
