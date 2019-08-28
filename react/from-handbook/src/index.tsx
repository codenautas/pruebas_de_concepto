import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";
import { Hello, Lista } from "./components/Hello";
// import * as likeAr from "like-ar";

function JsonDiplayer(props:{json:string}){
    try{
        var data=JSON.parse(props.json);
        return <Object data={data}></Object>
    }catch(err){
        return <div style={{color:"red"}} >{err.message}</div>
    }
}

function Object(props:{data:any}){
        var obj=props.data;
        if(typeof obj === "object"){
            if(obj instanceof Array){
                /*
                return <div>
                    {obj.map((v:any)=><Object data={v}></Object>)}
                </div>;
                */
            }if(obj == null){
                return <b>null</b>;
            }else{
                /*
                return <table>
                    <tr>{likeAr(obj).map((_v,k)=><th>{k}</th>)}</tr>
                    <tr>{likeAr(obj).map((v,_k)=><td>{v}</td>)}</tr>
                </table>
                */
            }
        }else{
            return <span>JSON.stringify(props.data)</span>
        }
        return <div> nada </div>
}

function RenderDirectJsonApp(){
    var [content, setContent] = useState(JSON.stringify({este:'objeto'}));
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