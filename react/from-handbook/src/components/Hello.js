"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
exports.Hello = function (props) { return React.createElement("h1", null,
    "Hello from ",
    props.compiler,
    " and ",
    props.framework,
    "!"); };
exports.ElementoLista = function (nombre) { return React.createElement("div", { key: nombre, className: "elementoLista" }, nombre); };
exports.Lista = function (props) {
    var _a = react_1.useState(props.nombres), nombresOrdenado = _a[0], setNombresOrdenado = _a[1];
    var _b = react_1.useState(null), orden = _b[0], setOrden = _b[1];
    var ordenarLista = function () {
        setOrden(!orden);
        if (orden) {
            setNombresOrdenado(nombresOrdenado.sort());
        }
        else {
            setNombresOrdenado(nombresOrdenado.sort(function (a, b) { return (a > b ? -1 : (a < b ? 1 : 0)); }));
        }
    };
    return (React.createElement("div", { className: "lista", onClick: ordenarLista },
        React.createElement("div", { className: "lista-titulo" }, "Lista:"),
        nombresOrdenado.map(exports.ElementoLista)));
};
