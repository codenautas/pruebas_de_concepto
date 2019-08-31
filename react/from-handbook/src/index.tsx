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
                const [keyCount, setKeyCount] = useState(likeAr(keys).keyCount());
                var newKeyCount = keyCount;
                var result = (
                    <table>
                        <thead>
                            <tr>{ likeAr(keys).map((_,k:string)=><th key={k}>{k}</th>).array() }</tr>
                        </thead>
                        <tbody>
                            {obj.map((row,i)=>{
                                var columns:any[] = [];
                                likeAr(row).forEach((v,k:string)=>{
                                    var i = keys[k];
                                    if(i == null){
                                        i = keys[k] = newKeyCount++;
                                    }
                                    if(i<keyCount){
                                        columns[i]=v;
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
                if(newKeyCount!=keyCount){
                    setTimeout(function(){
                        setKeyCount(newKeyCount);
                        setKeys(keys);
                    },1000)
                }
                return result;
            }
            return <div>
                {obj.map((v:any)=><ObjectDisplayer data={v}></ObjectDisplayer>)}
            </div>;
        }if(obj == null){
            return <b>null</b>;
        }else{
            return (
                <table>
                    <thead>
                        <tr>{likeAr(obj).map((_,k:string)=><th key={k}>{k}</th>).array()}</tr>
                    </thead>
                    <tbody>
                        <tr>{likeAr(obj).map((v,k:string)=><td key={k}><ObjectDisplayer data={v}></ObjectDisplayer></td>).array()}</tr>
                    </tbody>
                </table>
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
        null,
        // "this row isn't a row",
        {nombre:'Adela'   , edad:38, title:'Dr.'},
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