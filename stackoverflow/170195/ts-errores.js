var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var db = [];
var User = /** @class */ (function () {
    function User(name, userName, id, date) {
        if (date === void 0) { date = new Date(); }
        this.name = name;
        this.userName = userName;
        this.id = id;
        this.date = date;
    }
    User.prototype.UserInfoObject = function () {
        return { id: this.id, name: this.name, userName: this.userName, date: this.date };
    };
    User.prototype.RegisterUserData = function (info) {
        db.push(info || this.UserInfoObject());
    };
    return User;
}());
var premiumUser = /** @class */ (function (_super) {
    __extends(premiumUser, _super);
    function premiumUser(name, userName, id, date, premium) {
        if (date === void 0) { date = new Date(); }
        if (premium === void 0) { premium = true; }
        var _this = _super.call(this, name, userName, id, date) || this;
        _this.premium = premium;
        return _this;
    }
    premiumUser.prototype.PremiumUserInfo = function () {
        return { id: this.id, name: this.name, userName: this.userName, date: this.date, premium: this.premium };
    };
    premiumUser.prototype.RegisterUserData = function () {
        _super.prototype.RegisterUserData.call(this, this.PremiumUserInfo());
    };
    return premiumUser;
}(User));
var jose = new premiumUser("jose", "jose2018", 1);
jose.RegisterUserData();
var victor = new User("victor", "victorl", 2);
victor.RegisterUserData();
