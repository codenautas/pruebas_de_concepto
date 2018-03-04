import {encorchetar} from './encorchetar';

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + encorchetar(person.firstName) + " " + encorchetar(person.lastName);
}

let user = new Student("Jane", "M.", "Userlove");

console.log(greeter(user));

if(typeof document === 'object'){
    document.body.innerHTML = greeter(user);
}