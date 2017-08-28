class User {
    firstName: string;
    lastName: string;
    constructor(name: string) {
        this.firstName = name;
    }

    getFullName(): string {
        return this.lastName + ' ' + this.firstName;
    }
}

export {User} 
