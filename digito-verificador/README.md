# generación de dígitos verificadores.

## ¿Cómo se usa esta prueba de condepto?

En `digito.ts` hay varios ejemplos de uso. 

### La clase `DigitoVerificador` 

La clase `DigitoVerificador` devuelve un objeto que calcula el dígito verificador de un número sin dígito verificador.
El constructor de la clase recibe los parámetros del cálculo de los dígitos verificadores:
   * El tipo de número que se va usar. `Number` se debe usar cuando el número total (incluido el vericador) tiene hasta 14 dígitos. Si el número es más grande hay que usar `BigInt`.
   * El arreglo de coeficientes empezando por el que multiplica al menos significativo. 
   * El módulo, indicando cuántos dígitos verificadores son posibles. 
   * El desplazamiento del dígito verificador. Normalmente cero. 

```ts



