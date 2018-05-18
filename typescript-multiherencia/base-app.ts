// module BaseApp

import fs from 'fs-extra';

export interface TableDef{
    name:string
}

export class BaseApp{
    tables:TableDef[]=[{name:'usuarios'}];
    constructor(){
    }
    getName():string
    getTables():TableDef[]{
        return this.tables;
    }
    async installPart(part:string, content:string){
        await fs.writeFile(`./out/${part}.txt`,content,{encoding:'utf8'});
        return;
    }
    async install():Promise<void>{
        console.log('INSTALLING',this.getName());
        await this.installPart('base-part','la base');
        await this.installPart('table-part',JSON.stringify(this.getTables(),null,'    '));
        return ;
    }
}