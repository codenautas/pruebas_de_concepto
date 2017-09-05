Proof of concept of javascript modules

topics to test:

- javascript raw modules approaches
    * manual vainilla es5 - **done**
    * chrome experimental es6 native support (type=mdule + nomodule for older browsers)  - **done**
    * polifills for es5 - those polifills are module loaders
- module loaders
    * system js (para soportar modulos necesita transpilar el codigo js con imports a es5 (con algun plugin transpiler como TS o babel))
    * webpack (resuelve modulos en es6 y dependencias externas, pero genera un archivo con todo adentro (bundle)...)
    * browserify
- Typescript approaches (en pruebas de conceptos/Typescript)
    * No module manual dependency management (target: es5, module: none) (including files in index.html)
    * NO modules (one file)
    * module and target: es6 (with chrome experimental flag)
    * triple slash
    * module loader 
        + systemjs
        + webpack
