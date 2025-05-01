#!/bin/bash

# Este script configura Nginx como proxy para el servidor Express

# Comprobar permisos de superusuario
if [ "$EUID" -ne 0 ]; then
  echo "Este script debe ejecutarse como superusuario (root)"
  echo "Por favor, ejecuta: sudo $0"
  exit 1
fi

# Ruta al archivo de configuración de Nginx
NGINX_CONF_FILE="/var/www/guillermofernandeznutricion.es/nginx-proxy-config.conf"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available/guillermofernandeznutricion.es"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled/guillermofernandeznutricion.es"

# Copiar el archivo de configuración
echo "Copiando archivo de configuración a sites-available..."
cp "$NGINX_CONF_FILE" "$NGINX_SITES_AVAILABLE"

# Crear enlace simbólico si no existe
if [ ! -f "$NGINX_SITES_ENABLED" ]; then
  echo "Creando enlace simbólico en sites-enabled..."
  ln -s "$NGINX_SITES_AVAILABLE" "$NGINX_SITES_ENABLED"
else
  echo "El enlace simbólico ya existe."
fi

# Verificar sintaxis de Nginx
echo "Verificando sintaxis de Nginx..."
nginx -t

if [ $? -eq 0 ]; then
  echo "La sintaxis de Nginx es correcta. Reiniciando Nginx..."
  systemctl restart nginx
  echo "¡Nginx reiniciado correctamente!"
  echo ""
  echo "Ahora asegúrate de que el servidor Express esté en ejecución con:"
  echo "cd /var/www/guillermofernandeznutricion.es && ./start-server.sh"
else
  echo "Error en la sintaxis de Nginx. Por favor, verifica la configuración."
fi 