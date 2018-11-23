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

    }
}

class AppGenerica{
}

class AppEncuestas extends AppGenerica{
    instalar(){
        var be=this;
        app.get('/grabar_encuesta', async function(req,res){
            var result = await be.procedure_grabar_encuesta(req.query.vivienda, req.query.contenido)
            res.send(result);
        })
        app.get('/traer_encuesta', async function(req,res){
            var result = await be.procedure_traer_encuesta(req.query.vivienda)
            res.send(result);
        })
    }

    procedure_grabar_encuesta(vivienda:number, contenido:object){

    }
    async procedure_traer_encuesta(vivienda:number):Promise<Encuesta>{
        return ;
    };
}

var appEncuestas=new AppEncuestas();

