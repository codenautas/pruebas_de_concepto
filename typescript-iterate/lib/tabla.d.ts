declare var classInspector: any;
declare var tabla_pepe: {
    name: string;
    fields: {
        name: string;
        type: string;
    }[];
};
declare var procedures_encuesta: {
    action: string;
    parameters: {
        name: string;
        type: string;
    }[];
    coreFunction: () => void;
}[];
declare type integer = number;
declare type Hogar = {
    hogar: integer;
    h1: integer;
    h2: integer;
};
declare type Encuesta = {
    vivienda: integer;
    hogares: Hogar[];
};
declare var app: {
    get(url: string, fun: (req: {
        query: any;
    }, res: {
        send: (any: any) => void;
    }) => void): void;
};
declare class AppGenerica {
    instalar(): void;
    procedure_login(): void;
}
declare class AppEncuestas extends AppGenerica {
    procedure_grabar_encuesta(vivienda: number, contenido: object): void;
    procedure_traer_encuesta(vivienda: number): Promise<Encuesta>;
}
declare var appEncuestas: AppEncuestas;
