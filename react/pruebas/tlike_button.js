"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React_1 = require("React");
var ReactDOM = require("react-dom");
var LikeButton = /** @class */ (function (_super) {
    __extends(LikeButton, _super);
    function LikeButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { liked: false };
        return _this;
    }
    LikeButton.prototype.render = function () {
        var _this = this;
        if (this.state.liked) {
            return 'You liked this.';
        }
        return React.createElement("button", { onClick: function () { return _this.setState({ liked: true }); } }, "Like");
    };
    return LikeButton;
}(React_1.Component));
function LikeButtonFun() {
    var _a = React_1.useState(false), liked = _a[0], setLiked = _a[1];
    if (liked) {
        return React.createElement("pre", null, "Liked!");
    }
    return React.createElement("button", { onClick: function () { return setLiked(true); } }, "Like!");
}
var domContainer = document.querySelector('#like_button_container');
ReactDOM.render(React.createElement(LikeButton, null), domContainer);
var domContainer2 = document.querySelector('#like_button_container_fun');
ReactDOM.render(React.createElement(LikeButtonFun, null), domContainer2);
