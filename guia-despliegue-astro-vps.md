# Guía Completa para Desplegar Aplicación Astro en VPS

Esta guía detalla los pasos necesarios para desplegar una aplicación Astro en modo SSR (Server-Side Rendering) en un VPS y configurarla para que sea accesible a través del dominio `guillermofernandeznutricion.es`.

## Requisitos Previos

- VPS con acceso SSH (preferiblemente Ubuntu/Debian)
- Un dominio configurado (`guillermofernandeznutricion.es`)
- Conocimientos básicos de línea de comandos Linux
- Node.js 18.x o superior instalado en el VPS
- Git instalado en el VPS

## 1. Preparación del VPS

### Actualizar el sistema

```bash
sudo apt update
sudo apt upgrade -y
```

### Instalar dependencias necesarias

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Instalar Node.js (si no está instalado)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verificar la instalación
npm --version   # Verificar npm
```

### Instalar PM2 globalmente

```bash
sudo npm install -g pm2
```

## 2. Configuración del Dominio

### Configurar los registros DNS

Asegúrate de que tu dominio `guillermofernandeznutricion.es` tenga los siguientes registros DNS configurados:

1. Registro A apuntando a la dirección IP de tu VPS
2. Registro CNAME para `www` apuntando a `guillermofernandeznutricion.es`

## 3. Despliegue de la Aplicación Astro

### Clonar/Transferir el Repositorio

Puedes clonar tu repositorio desde GitHub o transferir los archivos usando SCP/SFTP a `/var/www/guillermofernandeznutricion.es`:

```bash
# Opción 1: Clonar desde Git
sudo mkdir -p /var/www/guillermofernandeznutricion.es
sudo chown -R $USER:$USER /var/www/guillermofernandeznutricion.es
cd /var/www
git clone [URL_DEL_REPOSITORIO] guillermofernandeznutricion.es

# Opción 2: Transferir archivos usando SCP (desde tu máquina local)
scp -r ./tu-proyecto-local/* usuario@tu-servidor:/var/www/guillermofernandeznutricion.es/
```

### Instalar dependencias y construir la aplicación

```bash
cd /var/www/guillermofernandeznutricion.es
npm install
npm run build
```

Esto creará una carpeta `dist` con los archivos compilados y optimizados.

## 4. Configuración del Servidor Nginx

### Crear un archivo de configuración para el sitio

```bash
sudo nano /etc/nginx/sites-available/guillermofernandeznutricion.es
```

Añade el siguiente contenido:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name guillermofernandeznutricion.es www.guillermofernandeznutricion.es;

    # Redireccionar HTTP a HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name guillermofernandeznutricion.es www.guillermofernandeznutricion.es;

    # Configuración SSL (se actualizará con Certbot)
    ssl_certificate /etc/letsencrypt/live/guillermofernandeznutricion.es/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/guillermofernandeznutricion.es/privkey.pem;

    # Directorio raíz del sitio web
    root /var/www/guillermofernandeznutricion.es/dist;
    index index.html;

    # Configuración de proxy para el servidor Astro SSR
    location / {
        proxy_pass http://localhost:4321;  # Puerto por defecto de Astro
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Configuración de proxy para el servidor de emails
    location /send-email {
        proxy_pass http://localhost:5002/send-email;  # Puerto del servidor Express
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Restricciones de seguridad
    location ~ /\.ht {
        deny all;
    }
}
```

### Activar el sitio y verificar la configuración

```bash
sudo ln -s /etc/nginx/sites-available/guillermofernandeznutricion.es /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar la sintaxis de la configuración
sudo systemctl reload nginx
```

### Obtener un certificado SSL con Certbot

```bash
sudo certbot --nginx -d guillermofernandeznutricion.es -d www.guillermofernandeznutricion.es
```

Sigue las instrucciones para completar la configuración de SSL.

## 5. Configuración del Servidor Astro

### Configurar el script de inicio para el servidor Astro

Asegúrate de que el archivo `start-server.sh` esté presente en el directorio de la aplicación:

```bash
cd /var/www/guillermofernandeznutricion.es
nano start-astro.sh
```

Añade el siguiente contenido:

```bash
#!/bin/bash

# Navegar al directorio del proyecto
cd /var/www/guillermofernandeznutricion.es

# Iniciar el servidor Astro con PM2
echo "Iniciando el servidor Astro..."
pm2 delete astro-server 2>/dev/null || true  # Eliminar la instancia antigua si existe
pm2 start "node ./dist/server/entry.mjs" --name "astro-server"

# Guardar la configuración de PM2 para que se reinicie después de un reinicio del sistema
pm2 save

echo "Servidor Astro iniciado con éxito. Para ver los logs, ejecuta: pm2 logs astro-server"
```

### Hacer el script ejecutable e iniciarlo

```bash
chmod +x start-astro.sh
./start-astro.sh
```

## 6. Configuración del Servidor de Emails

### Configurar el script de inicio para el servidor Express

Asegúrate de que el archivo `server.cjs` y `start-server.sh` estén presentes:

```bash
cd /var/www/guillermofernandeznutricion.es
chmod +x start-server.sh
./start-server.sh
```

## 7. Verificación del Despliegue

### Verificar que los servidores estén funcionando

```bash
pm2 status  # Debería mostrar tanto astro-server como server (Express)
```

### Probar la aplicación

Visita `https://guillermofernandeznutricion.es` en tu navegador y verifica que:
- La aplicación se carga correctamente
- El formulario de contacto funciona (prueba enviando un correo)

## 8. Optimización y Mantenimiento

### Configurar renovación automática de certificados SSL

Certbot configura automáticamente la renovación de certificados, pero puedes verificarlo:

```bash
sudo certbot renew --dry-run
```

### Configurar respaldo automático de la aplicación

```bash
sudo apt install -y cron
crontab -e
```

Añade una línea para hacer respaldos diarios:

```
0 2 * * * tar -czf /var/backups/guillermofernandeznutricion-$(date +\%Y\%m\%d).tar.gz /var/www/guillermofernandeznutricion.es/
```

### Mantenimiento y actualizaciones

Para actualizar la aplicación en el futuro:

```bash
cd /var/www/guillermofernandeznutricion.es
git pull  # Si usas Git
npm install
npm run build
pm2 restart astro-server
```

## 9. Resolución de Problemas

### Verificar logs de Nginx

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Verificar logs de los servidores Node.js

```bash
pm2 logs astro-server
pm2 logs server
```

### Reiniciar servicios

```bash
sudo systemctl restart nginx
pm2 restart astro-server
pm2 restart server
```

## 10. Referencias y Recursos

- [Documentación oficial de Astro](https://docs.astro.build/)
- [Guía de despliegue SSR de Astro](https://docs.astro.build/en/guides/server-side-rendering/)
- [Documentación de PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Guía de Nginx](https://nginx.org/en/docs/)
- [Certbot Instructions](https://certbot.eff.org/) 