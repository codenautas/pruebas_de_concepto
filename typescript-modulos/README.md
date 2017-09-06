- Internal Modules approaches to try
    * triple slash **done** solo para modulos internos (un solo archivo como output)
    * No module/manual dependency management (target: es5, module: none) (including manually files in index.html) **done** 
    * module: es6 (with chrome experimental flag) **done**
    * module loader (target:es5, module: es6 or commonjs)
        + systemjs + jspm
        + webpack **done** (working with sourcemaps for TS debugging in browser)
- External module approaches
    * webpack **done** (sourcemaps + typings for external library)
    * system js