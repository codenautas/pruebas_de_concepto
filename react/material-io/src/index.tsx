import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";

import { Hello, Lista } from "./components/Hello";

var nombres=['San Martín', 'Belgrano', 'Moreno', 'Saavedra'];

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <Lista nombres={nombres}></Lista>
    </div>,
    document.getElementById("example")
);