# Servidor de Email para Guillermo Fernández Nutrición

Este servidor Node.js maneja el envío de emails desde el formulario de contacto de la web.

## Requisitos previos

- Node.js 14.x o superior
- npm 6.x o superior

## Instalación

1. Clona este repositorio o copia estos archivos al servidor
2. Entra en la carpeta del proyecto:
   ```
   cd server
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura las variables de entorno:
   ```
   ./setup-env.sh
   ```
   Y edita el archivo .env con tus credenciales reales.

## Uso

### Desarrollo

Para ejecutar el servidor en modo desarrollo con recarga automática:

```
npm run dev
```

### Producción

Para ejecutar el servidor en producción:

```
npm start
```

Se recomienda usar un gestor de procesos como PM2:

```
npm install -g pm2
pm2 start index.js --name "guillermofernandez-email-server"
```

Para configurar el inicio automático:

```
pm2 startup
pm2 save
```

## Configuración de NGINX

Asegúrate de que tu configuración de NGINX incluya:

```nginx
location /send-email {
    proxy_pass http://localhost:5002/send-email;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
``` 