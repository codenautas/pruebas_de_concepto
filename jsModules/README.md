Proof of concept of javascript modules

topics to test:

- javascript raw modules approaches
    * manual vainilla es5 - **done**
    * chrome experimental es6 native support (type=mdule + nomodule for older browsers)  - **done**
    * polifills for es5 - those polifills are module loaders
- module loaders
    * system js (para soportar modulos necesita transpilar el codigo js con imports a es5 (con algun plugin transpiler como TS o babel))
    * webpack
    * browserify
- Typescript approaches (en pruebas de conceptos/Typescript)
    * No module (target: es5, module: none) (including files in index.html)
    * module: es6 (with chrome experimental flag)
    * one file
    * triple slash
    * no module / manual dependency management
    * module loader

    DIFERENCIA ENTRE 
        - Soportar modulos en js para archivos propios
        vs
        - Incluir otras librerías de manera transparente (jspm)
