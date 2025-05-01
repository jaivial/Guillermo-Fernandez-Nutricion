# Configuración del Servidor para el Formulario de Contacto

Este documento explica cómo configurar el servidor Express para manejar el envío de correos electrónicos desde el formulario de contacto.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (viene con Node.js)

## Configuración en el VPS

### 1. Verificar que los archivos estén en el lugar correcto

- Los archivos generados por Astro deben estar en la carpeta `/dist` 
- El archivo `server.cjs` debe estar en el directorio raíz del proyecto
- El script `start-server.sh` debe estar en el directorio raíz del proyecto

### 2. Hacer ejecutable el script de inicio

```bash
chmod +x start-server.sh
```

### 3. Editar el script para apuntar al directorio correcto

Abre `start-server.sh` y edita la línea que contiene:

```bash
cd /ruta/a/tu/proyecto
```

Reemplaza `/ruta/a/tu/proyecto` con la ruta absoluta al directorio raíz de tu proyecto en el VPS.

### 4. Iniciar el servidor

```bash
./start-server.sh
```

Esto instalará PM2 (si no está instalado), iniciará el servidor Express y lo configurará para que se reinicie automáticamente después de un reinicio del sistema.

### 5. Verificar que el servidor esté funcionando

```bash
pm2 status
```

Deberías ver que el servidor está funcionando.

### 6. Verificar los logs (en caso de errores)

```bash
pm2 logs server
```

## Solución de problemas

Si encuentras un "Internal Server Error" al intentar enviar un correo electrónico, verifica:

1. **Logs del servidor**:
   ```bash
   pm2 logs server
   ```

2. **Permisos y accesibilidad**:
   - Asegúrate de que el firewall permita conexiones al puerto 5001
   - Puedes verificar si el servidor está accesible con:
     ```bash
     curl http://localhost:5001/send-email
     ```

3. **Conexión entre el frontend y el backend**:
   - Asegúrate de que el formulario en el frontend esté enviando solicitudes a la URL correcta
   - Verifica la consola del navegador para errores de red o CORS

## Notas adicionales

- Si necesitas cambiar el puerto, edita la variable `PORT` en `server.cjs`
- Si necesitas modificar la configuración de correo electrónico, edita los datos de autenticación del transportador en `server.cjs` 