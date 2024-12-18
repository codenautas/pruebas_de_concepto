import * as _ from "lodash";
class User {
    firstName: string;
    lastName: string;
    constructor(name: string) {
        this.firstName = name;
    }

    getFullName(): string {
        // using lodash external library... try typing _ and crtl + spacebar
        return 'Hola ' + this.lastName + ' ' + this.firstName + _.isBoolean("adsf");
    }

    printFullName():void{
        document.getElementsByTagName('body')[0].innerHTML += this.getFullName();
    }
}

export {User}
