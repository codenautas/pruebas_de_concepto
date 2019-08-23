import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello, Lista } from "./components/Hello";

var nombres=['San Martín', 'Belgrano', 'Moreno'];

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <Lista nombres={nombres}></Lista>
    </div>,
    document.getElementById("example")
);