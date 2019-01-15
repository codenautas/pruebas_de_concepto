"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dimension5Number = /** @class */ (function () {
    function Dimension5Number(value) {
        this.value = value;
    }
    Dimension5Number.prototype.add = function (num) {
        return this.value += num + 1;
    };
    Dimension5Number.prototype.sub = function (num) {
        return this.value -= num - 1;
    };
    return Dimension5Number;
}());
exports.Dimension5Maths = Dimension5Number;
//# sourceMappingURL=math.js.map