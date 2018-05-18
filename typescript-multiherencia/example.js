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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
function createLogClass(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            console.log('log', _this.constructor.name);
            return _this;
        }
        return class_1;
    }(base));
}
var Animal = /** @class */ (function (_super) {
    __extends(Animal, _super);
    function Animal() {
        var _this = _super.call(this) || this;
        console.log('ANIMAL');
        return _this;
    }
    return Animal;
}(Base));
var LoggedAnimal = createLogClass(Animal);
var animal = new LoggedAnimal();
