## Registro del funcionamiento de window.navigator.onLine y err.originalError (ProgressEvent en un request AJAX)

## Sobre las pruebas
- Invalidar la sesión: borrar los archivos de sesión o reiniciar el servidor con otra clave
- Detener servidor: ejecutar Control+C para detener el servidor node
- Sacar cable de red: desconectar cable físicamente o hacerlo con el switch correspondiente en una máquina virtual.

### Chrome

prueba / funcion | window.onLine | !!err.originalError | not logged
------------------------|-----------------------|--------------------------|-----------
Invalidar la sesión  | N/A | N/A                 | V
Detener servidor | V, tarda | V, tarda   | N/A
Sacar cable de red | F           | V                 | N/A

### Aclaraciones
- V = Verdadero
- F = Falso
- N/A = No Aplica ese control porque cachea el error antes

