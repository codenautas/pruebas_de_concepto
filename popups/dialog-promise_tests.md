## Pruebas en navegadores con dialog-promise

Para las mismas se utilizó https://github.com/codenautas/dialog-promise/blob/master/example/popup-dp.html.

Para cada tipo de diálogo se probó:
  * English, close button on
  * English, close button off
  * Spanish, close button on
  * Spanish, close button off
  * En todos los casos verificando:
    * Resultado del click en todos los botones o entrada tipeada
    * click fuera del diálogo
    * idioma del texto de los botones


#### Resultados esperados en los clicks

Button/Spot | Resultado
----|----
ok | true o el valor del input
cancel | false
input | valor tipeado
close | undefined
outside | undefined

*** 
Navegador | Plataforma | Alert | Confirm | Prompt | Menu
----|----|----|----|---|----
Chrome | Windows | OK | OK | OK | OK
Firefox | Windows | OK | OK | OK | OK
Internet Explorer | Windows | OK | OK | OK | OK,W1 
Safari | Windows | OK | OK | OK | OK
Chrome | Android | OK | OK | OK | OK
Chrome | Linux | OK | OK | OK | OK
Firefox | Linux | OK | OK | OK | OK

***
### Referencia/Comentarios
- **OK** Funciona correctamente
- **W1** Agrega scrollbar (no deseado)

