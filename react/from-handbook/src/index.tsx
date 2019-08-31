import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";
import { Hello, Lista } from "./components/Hello";
import * as likeAr from "like-ar";
import {isPlainObject} from "best-globals";

function JsonDiplayer(props:{json:string}){
    try{
        var data=JSON.parse(props.json);
        return <ObjectDisplayer data={data}></ObjectDisplayer>
    }catch(err){
        return <div style={{color:"red"}} >{err.message}</div>
    }
}

function ObjectDisplayer(props:{data:any, previous?:any}){
    var obj=props.data;
    if(typeof obj === "object"){
        if(obj instanceof Array){
            if(obj.length && isPlainObject(obj[0])){
                const [keys, setKeys] = useState(likeAr(obj[0]).map((_v,_k,_o,i)=>i).plain());
                return (
                    <table>
                        <thead>
                            <tr>{ likeAr(keys).map((_,k:string)=><th key={k}>{k}</th>).array() }</tr>
                        </thead>
                        <tbody>
                            {obj.map((row,i)=>{
                                var columns:any[] = [];
                                likeAr(row).forEach((v,k:string)=>{
                                    if(k in keys){
                                        columns[keys[k]]=v;
                                    }
                                });
                                return (
                                    <tr key={i}>
                                        {columns.map((v,i)=>
                                            <td key={i}><ObjectDisplayer data={v}></ObjectDisplayer></td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                );
            }
            return <div>
                {obj.map((v:any)=><ObjectDisplayer data={v}></ObjectDisplayer>)}
            </div>;
        }if(obj == null){
            return <b>null</b>;
        }else{
            return (
                <div>
                <table>
                    <thead>
                        <tr>{likeAr(obj).map((_,k:string)=><th key={k}>{k}</th>).array()}</tr>
                    </thead>
                    <tbody>
                        <tr>{likeAr(obj).map((v,k:string)=><td key={k}><ObjectDisplayer data={v}></ObjectDisplayer></td>).array()}</tr>
                    </tbody>
                </table>
                </div>
            )
        }
    }else{
        return <span>{JSON.stringify(props.data)}</span>
    }
    return <div> nada </div>
}

function RenderDirectJsonApp(){
    var objetoInicial={este:'objeto', aquel:1, lista:[
        {nombre:'Aaron'   , edad:23},
        {nombre:'Abel'    , edad:31},
        {edad:34, nombre:'Aciago'  },
        {nombre:'Adela'   , edad:38},
        {nombre:'AEmilius', edad:50},
    ]};
    var [content, setContent] = useState(JSON.stringify(objetoInicial));
    return (
        <div>
            <div>Visualizador de Json</div>
            <input type='text' value={content} onChange={
                (event)=>{ setContent(event.target.value); }
            }/>
            <JsonDiplayer json={content}></JsonDiplayer>
        </div>
    );
}

ReactDOM.render(
    <RenderDirectJsonApp></RenderDirectJsonApp>,
    document.getElementById("example")
)