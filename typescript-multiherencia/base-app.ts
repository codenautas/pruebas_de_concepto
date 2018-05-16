// module BaseApp

export interface DataApp{
    base:string
}

export class BaseApp{
    constructor(public data:DataApp){}
    getData():DataApp{
        return this.data;
    }
}