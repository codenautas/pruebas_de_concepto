export class Mister{
    mr(name:string):string{
        return 'Mr. '+name;
    }
}

export type Constructor<T> = new(...args: any[]) => T;

export class Senior extends Mister{

}

export class Master extends Senior{
    mr(name:string):string{
        return super.mr(name)+' master of the Universe'
    }
}
