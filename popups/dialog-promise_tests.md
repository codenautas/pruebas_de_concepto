## Pruebas en navegadores con dialog-promise

Para las mismas se utilizó https://github.com/codenautas/dialog-promise/blob/master/example/popup-dp.html.

Para cada tipo de diálogo se probó:
  * English, close button on
  * English, close button off
  * Spanish, close button on
  * Spanish, close button off
  * En todos los casos verificando el resultado del click en todos los botones o entrada tipeada y el click fuera del diálogo

*** 
Navegador | Plataforma | Alert | Confirm | Prompt | Menu
----|----|----|----|---|----
Chrome | Windows | OK | OK | OK | OK

***
### Referencia
- **OK** Funciona correctamente
- **ER** Da error 
