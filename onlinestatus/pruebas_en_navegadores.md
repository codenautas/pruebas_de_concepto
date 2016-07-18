## Registro del funcionamiento de window.navigator.onLine y err.originalError (ProgressEvent en un request AJAX)

## Sobre las pruebas
- Invalidar la sesión: borrar los archivos de sesión o reiniciar el servidor con otra clave
- Detener servidor: ejecutar Control+C para detener el servidor node
- Sacar cable de red: desconectar cable físicamente o hacerlo con el switch correspondiente en una máquina virtual.

### Chrome

prueba / funcion | window.onLine | !!err.originalError | not logged
------------------------|-----------------------|--------------------------|-----------
Invalidar la sesión  | NO | NO                 | SI
Detener servidor | tarda en dar offline | enseguida   | no aplica
Sacar cable de red | tarda           | tarda                 | no aplica

### Aclaraciones
*no aplica* = no aplica ese control porque cachea el error antes

