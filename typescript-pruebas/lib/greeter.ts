import {encorchetar} from './encorchetar';

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string, public edad: number) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
    edad: number;
}

function greeter(person : Person) {
    return "Hello, " + encorchetar(person.firstName) + " " + encorchetar(person.lastName) + " (" + person.edad +")";
}

let user = new Student("Jane", "M.", "Userlove", 36);

console.log(greeter(user));

if(typeof document === 'object'){
    document.body.innerHTML = greeter(user);
}