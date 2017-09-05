var User = (function () {
    function User(name) {
        this.firstName = name;
    }
    User.prototype.getFullName = function () {
        return 'Hola ' + this.lastName + ' ' + this.firstName;
    };
    User.prototype.printFullName = function () {
        document.getElementsByTagName('body')[0].innerHTML += this.getFullName();
    };
    return User;
}());
