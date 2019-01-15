type Campo={tipo:'entero'|'texto', label?:string};
type Campos={[key:string]:Campo}

type BaseType<T> = T extends 'entero'? number : string;

var Campos1:Campos={
    hogar: {tipo:'entero'},
    barrio: {tipo:'texto', label:'barrio'}
}

type MapToType<T> = { [K in keyof T]: T[K] extends {tipo: infer U}? BaseType<U> :never }

type TypeCampos1=MapToType<typeof Campos1>;

var t:TypeCampos1={
    hogar:7,
    barrio:'mitre'
}

// quiero llegar a:
type Result__TypeCampos1={
    hogar:number,
    barrio:string
}


class Consistencias{
    row: TypeConsistencias
    boolean()
    ddkdk()
}