## Pruebas en navegadores con dialog-promise

Para las mismas se utilizó https://github.com/codenautas/dialog-promise/blob/master/example/popup-dp.html.

Para cada tipo de diálogo se probó:
  * English, close button on
  * English, close button off
  * Spanish, close button on
  * Spanish, close button off
  * En todos los casos verificando el resultado del click en todos los botones o entrada tipeada y el click fuera del diálogo


#### Resultados esperados en los clicks

Button/Spot | Resultado
----|----
ok | true
cancel | false
close | undefined
outside | undefined

*** 
Navegador | Plataforma | Alert | Confirm | Prompt | Menu
----|----|----|----|---|----
Chrome | Windows | OK | OK | OK | OK
Firefox | Windows | OK | OK | OK | OK

***
### Referencia
- **OK** Funciona correctamente

