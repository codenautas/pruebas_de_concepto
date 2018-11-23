"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var classInspector = require('class-inspector');
classInspector.getMethodNames = function (o) {
    return Object.keys(classInspector(o.constructor).instanceMethods);
};
var tabla_pepe = {
    name: 'hogares',
    fields: [
        { name: 'vivienda', type: 'integer' },
        { name: 'hogar', type: 'integer' },
        { name: 'h1', type: 'integer' },
        { name: 'h2', type: 'integer' },
    ]
};
var procedures_encuesta = [
    {
        action: 'traer_encuesta',
        parameters: [
            { name: 'vivienda', type: 'integer' },
        ],
        coreFunction: function () {
        }
    },
    {
        action: 'grabar_encuesta',
        parameters: [
            { name: 'vivienda', type: 'integer' },
            { name: 'conenido', type: 'json' },
        ],
        coreFunction: function () {
        }
    },
];
var app = {
    get(url, fun) {
        console.log('SE HIZO UN GET CON', url);
    }
};
class AppGenerica {
    instalar() {
        console.log('instalando');
        var be = this;
        var procedure_name;
        classInspector.getMethodNames(be).forEach(function (procedure_name) {
            console.log('intentando', procedure_name);
            if (procedure_name.startsWith('procedure_')) {
                app.get('/' + procedure_name.replace(/^procedure_/, ''), function (req, res) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // FALTA GENERALIZAR PARAMETROS:
                        var parametros = [req.query.vivienda, req.query.contenido];
                        var result = yield be[procedure_name].apply(be, parametros);
                        res.send(result);
                    });
                });
            }
        });
        console.log('fin instalación');
    }
    procedure_login() {
    }
}
class AppEncuestas extends AppGenerica {
    procedure_grabar_encuesta(vivienda, contenido) {
    }
    procedure_traer_encuesta(vivienda) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    ;
}
var appEncuestas = new AppEncuestas();
appEncuestas.algo = 'true';
appEncuestas.instalar();
//# sourceMappingURL=tabla.js.map