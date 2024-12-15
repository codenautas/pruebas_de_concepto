import { hola } from "./esm1.js";

window.addEventListener('load', ()=>{
    const ele = document.getElementById('canvan');
    ele.textContent = "cargando";
    ele.textContent = hola();
})