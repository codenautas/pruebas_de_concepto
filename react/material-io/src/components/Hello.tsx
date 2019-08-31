import * as React from "react";
import {useState} from "react";

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;

export const ElementoLista = (nombre: string) => <div key={nombre} className="elementoLista">{nombre}</div>;

export const Lista = (props: {nombres: string[]}) => {
    const [nombresOrdenado, setNombresOrdenado] = useState(props.nombres);
    const [orden, setOrden] = useState(null);
    var ordenarLista = ()=>{
        const nuevoOrden=!orden;
        setOrden(nuevoOrden);
        if(nuevoOrden){
            setNombresOrdenado(nombresOrdenado.sort());
        }else{
            setNombresOrdenado(nombresOrdenado.sort(<T extends any>(a:T,b:T)=>(a>b?-1:(a<b?1:0))));
        }
    }
    return (
        <div className="lista" onClick={ordenarLista}>
            <div className="lista-titulo">Lista:</div>
            {nombresOrdenado.map(ElementoLista)}
        </div>
    )
};