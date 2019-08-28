"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var ReactDOM = require("react-dom");
// import * as likeAr from "like-ar";
function JsonDiplayer(props) {
    try {
        var data = JSON.parse(props.json);
        return React.createElement(Object, { data: data });
    }
    catch (err) {
        return React.createElement("div", { style: { color: "red" } }, err.message);
    }
}
function Object(props) {
    var obj = props.data;
    if (typeof obj === "object") {
        if (obj instanceof Array) {
            /*
            return <div>
                {obj.map((v:any)=><Object data={v}></Object>)}
            </div>;
            */
        }
        if (obj == null) {
            return React.createElement("b", null, "null");
        }
        else {
            /*
            return <table>
                <tr>{likeAr(obj).map((_v,k)=><th>{k}</th>)}</tr>
                <tr>{likeAr(obj).map((v,_k)=><td>{v}</td>)}</tr>
            </table>
            */
        }
    }
    else {
        return React.createElement("span", null, "JSON.stringify(props.data)");
    }
    return React.createElement("div", null, " nada ");
}
function RenderDirectJsonApp() {
    var _a = react_1.useState(JSON.stringify({ este: 'objeto' })), content = _a[0], setContent = _a[1];
    return (React.createElement("div", null,
        React.createElement("div", null, "Visualizador de Json"),
        React.createElement("input", { type: 'text', value: content, onChange: function (event) { setContent(event.target.value); } }),
        React.createElement(JsonDiplayer, { json: content })));
}
ReactDOM.render(React.createElement(RenderDirectJsonApp, null), document.getElementById("example"));
