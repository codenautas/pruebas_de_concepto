# Estudio sobre encoders

## objetivo

Tener un ENCODER/DESENCODER con las siguientes característias:

1. Que sea lo más estándar posible
2. Que maneje bien los `Date`
3. Que no falle al serializar un objeto que contenga un `undefined` (ya sea porque lo serialice como `null`, como `undefined`o que no lo serialice)
4. Que no serialize `Functions` (pero que no lance una excepción, que lo trate igual al objeto `undefined`)
5. Que se le puedan agregar tipos de usuario
6. Que se puedan mandar streams de objetos (por ejemplo: en JSON es `/,?\r?\n/` y en yaml `"\n---\n"`)
7. Que el módulo sea suficientemente reconocido (con muchas descargas y/o tests) o que el usuario que lo creó lo sea

## análisis

Según los experimentos que hicimos (acá en `mostrar.js`) los que mejor se adaptan son: `EJSON` Y `custom-yaml`.

Vamos a elegir **`EJSON`** por las siguientes razones:

1. Está basado en JSON lo que facilita:
    1. La separación en streams (cada renglón es un objeto)
    2. Guardar provisoriamente en la base de datos objetos EJSON
2. No necesita configurarse ni adaptarse (salvo para agregar tipos). `custom-yaml` es `yaml` con un mínimo grado de customización que se necesita para el tratamiento de los `undefined`.
3. Tiene a *TJ Holowaychuk* como colaborador (y colabora en tantísimos módulos importantes como `yaml` y `stylus`, según [npm](https://www.npmjs.com/~tjholowaychuk)).
