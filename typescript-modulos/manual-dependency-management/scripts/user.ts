class User {
    firstName: string;
    lastName: string;
    constructor(name: string) {
        this.firstName = name;
    }

    getFullName(): string {
        return 'Hola ' + this.lastName + ' ' + this.firstName;
    }

    printFullName():void{
        document.getElementsByTagName('body')[0].innerHTML += this.getFullName();
    }
}
