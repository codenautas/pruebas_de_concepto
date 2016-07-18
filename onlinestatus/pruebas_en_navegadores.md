## Registro del funcionamiento de window.navigator.onLine y err.originalError (ProgressEvent en un request AJAX)

### Nomenclatura:
- **Invalidar la sesión**: borrar los archivos de sesión o reiniciar el servidor con otra clave
- **Detener servidor**: ejecutar Control+C para detener el servidor node
- **Sacar cable de red**: desconectar cable físicamente o hacerlo con el switch correspondiente en una máquina virtual.
- **N/A**: No Aplica ese control porque cachea el error antes
- **V** = Verdadero
- **F** = Falso
- **Latencia** = Tiempo aproximado en segundos que tarda en responder (esto depende de la conexión de red pero sirve para estimar)

#### Las pruebas se realizaron con los clientes en una máquina virtual y el servidor en otra. Ambas con windows 7.

***

### Chrome

prueba / funcion | window.onLine | !!err.originalError | Latencia |  not logged
----|----|----|---|----
Invalidar la sesión | N/A | N/A  | 1 | V
Detener servidor | V | V |  20 | N/A
Sacar cable de red | F | V | 0 | N/A

### Firefox

prueba / funcion | window.onLine | !!err.originalError | Latencia |  not logged
----|----|----|---|----
Invalidar la sesión | N/A | N/A  | 1 | V
Detener servidor | V | V |  42 | N/A
Sacar cable de red | F | V | 9 | N/A
