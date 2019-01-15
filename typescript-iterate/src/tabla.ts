var classInspector = require('class-inspector');
classInspector.getMethodNames=function(o:object):string[]{
    return Object.keys(classInspector( o.constructor ).instanceMethods);
}

var tabla_pepe={
    name:'hogares',
    fields:[
        {name:'vivienda', type:'integer'},
        {name:'hogar'   , type:'integer'},
        {name:'h1'      , type:'integer'},
        {name:'h2'      , type:'integer'},
    ]
}


var procedures_encuesta=[
    {
        action:'traer_encuesta',
        parameters:[
            {name:'vivienda', type:'integer'},

        ],
        coreFunction:function(){

        }
    },
    {
        action:'grabar_encuesta',
        parameters:[
            {name:'vivienda', type:'integer'},
            {name:'conenido', type:'json'},
        ],
        coreFunction:function(){

        }
    },
];

type integer=number;

type Hogar={
    hogar:integer,
    h1: integer,
    h2: integer
}

type Encuesta={
    vivienda: integer,
    hogares: Hogar[],
}

var app={
    get(url:string, fun:(req:{query:any}, res:{send:(any)=>void})=>void){
        console.log('SE HIZO UN GET CON',url);
    }
}

class AppGenerica{
    instalar(){
        console.log('instalando')
        var be=this;
        var procedure_name:string;
        classInspector.getMethodNames(be).forEach(function(procedure_name){
            console.log('intentando',procedure_name)
            if(procedure_name.startsWith('procedure_')){
                app.get('/'+procedure_name.replace(/^procedure_/,''), async function(req,res){
                    // FALTA GENERALIZAR PARAMETROS:
                    var parametros = [req.query.vivienda, req.query.contenido]
                    var result = await be[procedure_name].apply(be,parametros)
                    res.send(result);
                })
            }
        });
        console.log('fin instalación')
    }
    procedure_login(){

    }
}

class AppEncuestas extends AppGenerica{

    procedure_grabar_encuesta(vivienda:number, contenido:object){

    }
    async procedure_traer_encuesta(vivienda:number):Promise<Encuesta>{
        return ;
    };
}

var appEncuestas=new AppEncuestas();

appEncuestas.algo='true';

appEncuestas.instalar();