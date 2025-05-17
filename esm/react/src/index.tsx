import * as React from 'react';
import * as _ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa ThemeProvider y createTheme

const theme = createTheme(); // Crea un tema
var {Fragment} = React;

import * as _Mui from '@mui/material';
import Button from '@mui/material/Button';

// const {date} = require("best-globals");
var date = {today:()=>({toDmy:()=>"HOY"})}

class CaptureError extends React.Component<
    {children:any},
    {hasError:boolean, error:Error|{message:string}, info?:any}
>{
    constructor(props:{children:any}) {
        super(props);
        this.state = { hasError: false, error:{message:''} };
    }
    override componentDidCatch(error:Error, info:any){
        console.log(error);
        this.setState({ hasError: true , error, info });
    }
    override render(){
        if(this.state.hasError){
            var {componentStack, ...rest} = this.state.info;
            return <>
                <p>Hubo un problema en la programación del despliegue de pantalla.</p>
                <p>Error detectado:</p>
                <p>{this.state.error.message}</p>
                <pre>{componentStack}</pre>
                <p>{JSON.stringify(rest)}</p>
            </>;
        }
        return this.props.children;
    }
}

function NavigationBar() {
    return <div>
        <h1>Hola desde React!</h1>
        <p>hoy es {date.today().toDmy()}</p>
        <Button>ok</Button>     
    </div>;
}

// 

window.addEventListener('load', ()=>{
    const domNode = document.getElementById('main');
    const root = createRoot(domNode);
    root.render(
            <ThemeProvider theme={theme}>
        <CaptureError>
                <Fragment> 
                    <NavigationBar />
                </Fragment> 
        </CaptureError>
            </ThemeProvider>
    );
})