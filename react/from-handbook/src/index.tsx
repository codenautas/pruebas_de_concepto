import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";
import { Hello, Lista } from "./components/Hello";
import * as likeAr from "like-ar";
import {isPlainObject, date} from "best-globals";

function JsonDiplayer(props:{json:string}):JSX.Element;
function JsonDiplayer(props:{object:any}):JSX.Element;
function JsonDiplayer(props:{json?:string, object?:any}){
    try{
        var data=props.object||JSON.parse(props.json);
        return <div className="json-displayer"><ObjectDisplayer data={data}></ObjectDisplayer></div>;
    }catch(err){
        return <div style={{color:"red"}} >{err.message}</div>
    }
}

function ObjectDisplayer(props:{data:any, previous?:any}){
    var obj=props.data;
    const [keys, setKeys] = useState(obj instanceof Array && isPlainObject(obj[0])?Object.keys(obj[0]):null);
    if(obj && typeof obj === "object"){
        if(obj instanceof Array){
            if(obj.length && isPlainObject(obj[0])){
                var keyCount = keys.length;
                var keyIndex:{[key:string]:number} = likeAr(keys).build((k:string, i:number)=>{return{[k]:i}}).plain();
                var result = (
                    <table>
                        <thead>
                            <tr>{ keys.map((k:string)=><th key={k}>{k}</th>) }</tr>
                        </thead>
                        <tbody>
                            {obj.map((row,i)=>{
                                var content;
                                if(row && typeof row == "object"){
                                    content = keys.map((k)=>
                                        <td key={k}><ObjectDisplayer data={row[k]}></ObjectDisplayer></td>
                                    );
                                    likeAr(row).forEach((_,k:string)=>{
                                        var i = keyIndex[k];
                                        if(i == null){
                                            keys.push(k);
                                            keyIndex[k]=keys.length;
                                        }
                                    });
                                }else{
                                    content = <td colSpan={keyCount}><ObjectDisplayer data={row}></ObjectDisplayer></td>;
                                }
                                return <tr key={i}>
                                    {content}
                                </tr>
                            })}
                        </tbody>
                    </table>
                );
                if(keys.length != keyCount){
                    setTimeout(function(){
                        setKeys(keys.slice());
                    },10)
                }
                return result;
            }
            return <div>
                {obj.map((v:any)=><ObjectDisplayer data={v}></ObjectDisplayer>)}
            </div>;
        }else if(obj instanceof RegExp){
            return <span datatype={obj.constructor.name}>/{obj.source}/{obj.flags}</span>;
        }else if(obj instanceof Date){
            return <span datatype={obj.constructor.name}>{obj.toLocaleString()}</span>;
        }else{
            return (
                <table>
                    <caption>{obj.constructor.name=='Object'?null:obj.constructor.name||''}</caption>
                    <thead>
                        <tr>{likeAr(obj).map((_,k:string)=><th key={k}>{k}</th>).array()}</tr>
                    </thead>
                    <tbody>
                        <tr>{likeAr(obj).map((v,k:string)=><td key={k}><ObjectDisplayer data={v}></ObjectDisplayer></td>).array()}</tr>
                    </tbody>
                </table>
            )
        }
    }else if(typeof props.data === "string"){
        return <span datatype="string">{props.data}</span>
    }else{
        return <span datatype={typeof props.data}>{JSON.stringify(props.data)}</span>
    }
}

function RenderDirectJsonApp(){
    var objetoInicial={este:'objeto', aquel:1, lista:[
        {nombre:'Aaron'   , edad:23},
        {nombre:'Abel'    , edad:31},
        {edad:34, nombre:'Aciago'  },
        null,
        "this row isn't a row",
        {nombre:'Adela'   , edad:38, title:'Dr.'},
        {nombre:'AEmilius', edad:50, title:'Mr.'},
        {nombre:'Afrodita', edad:19, nacimiento:new Date(2001,12,23,10,2,32), ok:true, filtro:/ok(!?)(\/\d+)*/g},
        ["one", "two", "three"],
    ]};
    // var [content, setContent] = useState(JSON.stringify(objetoInicial));
    var content = objetoInicial;
    return (
        <div>
            <div>Visualizador de Json</div>
            {/*
            <input type='text' value={content} onChange={
                (event)=>{ setContent(event.target.value); }
            }/>
            */}
            <JsonDiplayer object={content}></JsonDiplayer>
        </div>
    );
}

ReactDOM.render(
    <RenderDirectJsonApp></RenderDirectJsonApp>,
    document.getElementById("example")
)