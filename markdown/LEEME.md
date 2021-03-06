<!--multilang v0 es:LEEME.md en:README.md -->
# self-explained
self explained tools - starting with "assert"

<!--lang:es-->
# Instalación
<!--lang:en--]
# Install
[!--lang:*-->
```sh
$ npm install self-explained
```

<!-- cucardas -->
![designing](https://img.shields.io/badge/stability-designing-red.svg)
[![npm-version](https://img.shields.io/npm/v/self-explain.svg)](https://npmjs.org/package/self-explain)
[![downloads](https://img.shields.io/npm/dm/self-explain.svg)](https://npmjs.org/package/self-explain)
[![build](https://img.shields.io/travis/codenautas/self-explain/master.svg)](https://travis-ci.org/codenautas/self-explain)
[![coverage](https://img.shields.io/coveralls/codenautas/self-explain/master.svg)](https://coveralls.io/r/codenautas/self-explain)
[![climate](https://img.shields.io/codeclimate/github/codenautas/self-explain.svg)](https://codeclimate.com/github/codenautas/self-explain)
[![dependencies](https://img.shields.io/david/codenautas/self-explain.svg)](https://david-dm.org/codenautas/self-explain)
[![qa-control](http://codenautas.com/github/codenautas/self-explain.svg)](http://codenautas.com/github/codenautas/self-explain)


<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->
## Uso
<!--lang:en--]
## Use
[!--lang:*-->
```js
var assert = require('self-exlain').assert;

var alpha = 10;
var betha = 7;

eval(assert(alpha / 2 > betha -1));
```

tabla 1    | min | max | return
-----------|-----|-----|--------------
execute    |  -  |  -  | result.rowCount
fetchAll   |  0  | inf | result.rows, result.rowCount
fetchUniqueValue | 1 | 1 | result.value
fetchUniqueRow | 1 | 1 | result.row
fetchOneRowIfExists | 0 | 1 | result.row, result.rowCount


<!--lang:es-->
Ejecuta la expresión como si fuera un `assert`, y si la expresión evalúa a `false` se genera
**mucha más información por la consola** 
(además de lanzar la excepción correspondiente)

<!--lang:en--]
It controls the expression like `assert` does. 
If the expression evaluates to `false` it will show 
**much more info in the console** 
(also throws the Exception)
[!--lang:*-->

```txt
ASSERT FAILED
alpha / 2 > betha -1
10 / 2 > 7 - 1
5 > 6
false 
```

<!--lang:es-->
## Licencia
<!--lang:en--]
## License
[!--lang:*-->

[MIT](LICENSE)

<!--multilang v0 es:LEEME.md en:README.md -->
# pg-promise-strict

<!--lang:es-->
**postgresql** con **promesas** en el sentido estricto

<!--lang:en--]
postgresql with strict interpretation of promises

[!--lang:*-->

<!-- cucardas -->
![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/pg-promise-strict.svg)](https://npmjs.org/package/pg-promise-strict)
[![downloads](https://img.shields.io/npm/dm/pg-promise-strict.svg)](https://npmjs.org/package/pg-promise-strict)
[![linux](https://img.shields.io/travis/codenautas/pg-promise-strict/master.svg)](https://travis-ci.org/codenautas/pg-promise-strict)
[![windows](https://ci.appveyor.com/api/projects/status/github/codenautas/pg-promise-strict?svg=true)](https://ci.appveyor.com/project/codenautas/pg-promise-strict)
[![coverage](https://img.shields.io/coveralls/codenautas/pg-promise-strict/master.svg)](https://coveralls.io/r/codenautas/pg-promise-strict)
[![climate](https://img.shields.io/codeclimate/github/codenautas/pg-promise-strict.svg)](https://codeclimate.com/github/codenautas/pg-promise-strict)
[![dependencies](https://img.shields.io/david/codenautas/pg-promise-strict.svg)](https://david-dm.org/codenautas/pg-promise-strict)
[![qa-control](http://codenautas.com/github/codenautas/pg-promise-strict.svg)](http://codenautas.com/github/codenautas/pg-promise-strict)

<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->

# Características

pg-strict-promise implementa una versión con Promise/A+ en el sentido estricto de la librería PG.
 * Tiene las mismas funciones que PG, con los mismos nombres, los mismos parámetros y que devuelven lo mismo, reemplazando los *callbacks* con promesas.
 * Con pruebas que cubren el 100% del código en dos grupos: un grupo de pruebas que usa una base de datos real (postgresl 9.3) y otro que testea solo las llamadas (adaptaciones) que se hacen sobre PG. Ambos grupos de pruebas cubren el 100% del código. Así obtenemos una **cobertura de 2 × 100%**.
 * No se reimplementa nada de lo que PG ya implementa
 * Algunos [agregados](docs/agregados.md) mínimos para mayor comodidad

<!--lang:en--]

# Features

PG Promise/A+ in the strict way:
 * The same functions, with the same name and same retunrs that in PG, but without callbacks
 * covers 100% by test in two groups: test with real database (postgresql 9.3) and test with mock functions. Each group covers 100% the code. It means that we have **2 × 100% of coverage**.
 * No reimplement nothing that PG does
 * Some minimal [additions](docs/additions.md) for comfort

<!--lang:es-->

# Instalación

<!--lang:en--]

# Install

[!--lang:*-->

```sh
$ npm install pg-promise-strict
```

<!--lang:es-->

# Ejemplo de uso

<!--lang:en--]

# Use example

[!--lang:*-->

```js 
var pg = require('pg-promise-strict');

pg.easy = true;

var conOpts = {
    user: 'test_user',
    password: 'test_pass',
    database: 'test_db',
    host: 'localhost',
    port: 5432
};

pg.connect(conOpts).then(function(client){
    return client.query('select * from table');
}).then(function(result){
    for(var i=0; i<result.rowCount; i++){
        console.log('row',i,result.row[i]);
    }
}).catch(function(err){
    console.log('ERROR',err);
});
```

<!--lang:es-->

## Ejemplos de PG

El primer ejemplo. Trae todas las filas de una consulta a la vez. Ejemplo basado en [PG](https://www.npmjs.com/package/pg#client-pooling)

<!--lang:en--]

## Examples of PG

The first easy example. One simple query that returns all rows. Example based in [PG](https://www.npmjs.com/package/pg#client-pooling)

[!--lang:*-->

```js
var pg = require('pg-promise-strict');

pg.easy = true;

var conString = "postgres://username:password@localhost/database";
 
pg.connect(conString).then(function(client){
    return client.query('SELECT $1::int AS number', ['1']);
}).then(function(result)){
    console.log(result.rows[0].number);
}).catch(err){
    return console.error('error fetching client from pool or running query', err);
}).then(function(){    
    client.done(); // original done function of callback of PG.connect
});
```

<!--lang:es-->

En este ejemplo se puede ver:
 * la cadena de promesas
 * los parámetros apsados a *libpq* en la función *query*
 * `.then(function(result)` es el equivalente a pasar callback a la función a *query*

<!--lang:en--]

In this example you see:
 * the Promise chain
 * parameters passed to *libpq* in the query function
 * `.then(function(result)` is the equivalent callback passed to query

<!--lang:es-->

### Ejemplo sin el pool de conexiones

Corresponde al ejemplo de llamada a [PG](https://github.com/brianc/node-postgres#client-instance)
con conexión directa del cliente

<!--lang:en--]

### Example without connection pool

Corresponds to calls to [PG](https://github.com/brianc/node-postgres#client-instance) 
direct client instance

[!--lang:*-->

```js
var pg = require('pg-promise-strict');

var conString = "postgres://username:password@localhost/database";

var client = new pg.Client(conString);

client.connect().then(function(client){
    return client.query('SELECT NOW() AS "theTime"');
}).then(function(result){
    console.log(result.rows[0].theTime);
    console.log(row.name);
    client.end();
}).catch(function(err){
    return console.error('error connecting or running query', err);
});
```

<!--lang:es-->

### Ejemplo procesando de a una fila a la vez

Corresponde al ejemplo de llamada a [PG](https://github.com/brianc/node-postgres/wiki/Client#simple-query-without-callback).query 
sin función callback. En la documentación de [PG](https://github.com/brianc/node-postgres/wiki/Client#parameters-1),
[Brian C](https://github.com/brianc) dice *no especifique una function callback para consultas que devuelven grandes conjuntos de datos salvo que quiera que se acumule todo en memoria*
 
Esta es la manera de procesar fila por fila

<!--lang:en--]

### Example with fetch row by row

Corresponds to calls to [PG](https://github.com/brianc/node-postgres/wiki/Client#simple-query-without-callback).query 
without callback. In [PG](https://github.com/brianc/node-postgres/wiki/Client#parameters-1) documentation 
[Brian C](https://github.com/brianc) says *do not provide callback function for large result sets unless you're okay with loading the entire result set into memory*
 
This is the way for process data row by row
 
[!--lang:*-->

```js
pg.connect({user: 'brianc', database: 'test'}).then(function(client){
    client.query("SELECT name FROM users").onRow(function(row){
        console.log(row.name);
    }).then(function(result){
        console.log('ready.',result.rowCount,'rows processed');
        client.done();
    });
});
```

<!--lang:es-->

# Corriendo los tests

Para correr los test, además de clonar el repositorio e instalar con npm
tenemos que proveer una conexión a la base de datos *postgresql-9.3* para
poder crear el usuario *test_user* y la base *test_db*.

<!--lang:en--]

# Running tests

Clone the repository and install the developer dependencies in then normal way. 
You must provide a *postgresql-9.3* instalation for create a *test_db*.
Then you can test pg-promise-strict
 
[!--lang:*-->
<!--lang:en-->

# Additions in pg-promise-strict

<!--lang:es--]

# Agregados en pg-promise-strict

[!--lang:*-->

<!--multilang v0 en:additions.md es:agregados.md -->

<!--multilang buttons-->

language: ![English](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)
also available in:
[![Spanish](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)](agregados.md) - 

<!--lang:en-->

(for this section see [spanish version](agregados.md))

Addings:
* explicit indication of how many rows are expected in the result
* explicit indication of `fetchAll` in `query(...).then` calls

<!--lang:es--]

Si bien el objetivo de ***pg-promise-strict*** es ser neutro respecto de la librería [pg](//npmjs.com/package/pg)
es conveniente hacer algunos agregados que persiguen los siguientes objetivos:
* indicar explícitamente (cuando *se sabe*) cuántas líneas se esperan en el resultado, 
para que en caso de no cumplirse se lance una excepción (porque estamos en una situación que *no se sabía que podía pasar*)
* indicar explícitamente que se desean traer todas las líneas de una sola vez
(en [pg](//npmjs.com/package/pg) eso es explícito al pasar un callback a la función query, 
pero como el equivalente en pg-promise-strict es esperar una promesa con la función then, 
podría pasar desapersibido el hecho de que se está haciendo un `fetchAll`)

[!--lang:*-->

function   | min | max | return
-----------|-----|-----|--------------
execute    |  -  |  -  | result.rowCount
fetchAll   |  0  | inf | result.rows, result.rowCount
fetchUniqueValue | 1 | 1 | result.value
fetchUniqueRow | 1 | 1 | result.row
fetchOneRowIfExists | 0 | 1 | result.row, result.rowCount



<!-- multilang from README.md




NO MODIFIQUE ESTE ARCHIVO. FUE GENERADO AUTOMÁTICAMENTE POR multilang.js




-->
# fast-devel-server
Fast developer server for displaying markdown and others

Working in resolving the unsecure dependencies!


<!-- cucardas -->
![designing](https://img.shields.io/badge/stability-desgining-red.svg)
[![npm-version](https://img.shields.io/npm/v/fast-devel-server.svg)](https://npmjs.org/package/fast-devel-server)
[![downloads](https://img.shields.io/npm/dm/fast-devel-server.svg)](https://npmjs.org/package/fast-devel-server)
[![build](https://img.shields.io/travis/codenautas/fast-devel-server/master.svg)](https://travis-ci.org/codenautas/fast-devel-server)
[![climate](https://img.shields.io/codeclimate/github/codenautas/fast-devel-server.svg)](https://codeclimate.com/github/codenautas/fast-devel-server)
[![dependencies](https://img.shields.io/david/codenautas/fast-devel-server.svg)](https://david-dm.org/codenautas/fast-devel-server)

<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)


## Instalación


```sh
$ npm install fast-devel-server
```

## USO


```js
npm start
```


Y luego usa en tu navegador para renderizar o ver y autorefrescar tus datos


![in your navigator put http://localhost:54321/auto/your-package/examples/example.txt](https://raw.githubusercontent.com/codenautas/fast-devel-server/master/examples/example.png)


***No necesitas refrescar con F5!***


## Licencias


[MIT](LICENSE)
