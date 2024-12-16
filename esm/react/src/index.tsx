import * as React from 'react';
import { createRoot } from 'react-dom/client';

// import { Button } from '@mui/material';
import Button from '@mui/material/Button';

const {date} = require("best-globals");

function NavigationBar() {
    return <div>
        <h1>Hola desde React!</h1>
        <p>hoy es {date.today().toDmy()}</p>
        <Button>ok</Button>
    </div>;
}

window.addEventListener('load', ()=>{
    const domNode = document.getElementById('main');
    const root = createRoot(domNode);
    root.render(<NavigationBar />);
})