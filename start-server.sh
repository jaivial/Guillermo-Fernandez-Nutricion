#!/bin/bash

# Instalar PM2 globalmente si no está instalado
if ! command -v pm2 &> /dev/null; then
    echo "PM2 no está instalado. Instalando..."
    npm install -g pm2
fi

# Navegar al directorio del proyecto
cd /var/www/guillermofernandeznutricion.es

# Iniciar el servidor con PM2
echo "Iniciando el servidor Express..."
pm2 delete server 2>/dev/null || true  # Eliminar la instancia antigua si existe
pm2 start server.cjs --name "server" --watch

# Guardar la configuración de PM2 para que se reinicie después de un reinicio del sistema
pm2 save

echo "Servidor Express iniciado con éxito. Para ver los logs, ejecuta: pm2 logs server"
echo "Para detener el servidor: pm2 stop server"
echo "Para reiniciar el servidor: pm2 restart server" 