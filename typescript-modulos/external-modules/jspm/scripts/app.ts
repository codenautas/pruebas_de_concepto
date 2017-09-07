import { User } from "./user";

export function main():void {
    let user = new User('Eugenio');
    user.lastName = 'Arosteguy';
    user.printFullName();
}