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
        return <div className="json-displayer"><ObjectDisplayer data={data} depth={1} opts={{showDepth:2}}></ObjectDisplayer></div>;
    }catch(err){
        return <div style={{color:"red"}} >{err.message}</div>
    }
}

namespace ObjectDisplayer{
    export type Opts={
        showDepth: number
    }
}
function ObjectDisplayer(props:{data:any, depth:number, opts:ObjectDisplayer.Opts}){
    var {data, depth, opts}=props;
    const [keys, setKeys] = useState(data instanceof Array && isPlainObject(data[0])?Object.keys(data[0]):null);
    const [visible, setVisible] = useState(depth<=opts.showDepth);
    if(data && typeof data === "object"){
        if(data instanceof Array){
            if(data.length && isPlainObject(data[0])){
                var keyCount = keys.length;
                var keyIndex:{[key:string]:number} = likeAr(keys).build((k:string, i:number)=>{return{[k]:i}}).plain();
                var result = (
                    <table>
                        <thead>
                            <tr>
                                <th className="margin" onClick={()=>setVisible(!visible)}>{visible?"⊟":"⊞"}</th>
                                { visible ? keys.map((k:string)=><th key={k}>{k}</th>) : <td className="table-count">{data.length} <small>(×{keys.length})</small></td> }
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row,i)=>{
                                var content;
                                if(row && typeof row == "object"){
                                    content = keys.map((k)=>
                                        <td key={k}><ObjectDisplayer data={row[k]} depth={depth+1} opts={opts}></ObjectDisplayer></td>
                                    );
                                    likeAr(row).forEach((_,k:string)=>{
                                        var i = keyIndex[k];
                                        if(i == null){
                                            keys.push(k);
                                            keyIndex[k]=keys.length;
                                        }
                                    });
                                }else{
                                    content = <td colSpan={keyCount}><ObjectDisplayer data={row} depth={depth+1} opts={opts}></ObjectDisplayer></td>;
                                }
                                return visible?<tr key={i}>
                                    <td className="margin"></td>
                                    {content}
                                </tr>:null;
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
                {data.map((v:any)=><ObjectDisplayer data={v} depth={depth+1} opts={opts}></ObjectDisplayer>)}
            </div>;
        }else if(data instanceof RegExp){
            return <span datatype={data.constructor.name}>/{data.source}/{data.flags}</span>;
        }else if(data instanceof Date){
            return <span datatype={data.constructor.name}>{data.toLocaleString()}</span>;
        }else{
            return (
                <table>
                    <caption>{data.constructor.name=='Object'?null:data.constructor.name||''}</caption>
                    <thead>
                        <tr>{likeAr(data).map((_,k:string)=><th key={k}>{k}</th>).array()}</tr>
                    </thead>
                    <tbody>
                        <tr>{likeAr(data).map((v,k:string)=><td key={k}><ObjectDisplayer data={v} depth={depth+1} opts={opts}></ObjectDisplayer></td>).array()}</tr>
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
        {nombre:'Agata'   , edad:55, title:[
            {title:'Lic.', year:1990},
            {title:'Mag.', year:1995},
            {title:'Dr.' , year:1999},
        ]},
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