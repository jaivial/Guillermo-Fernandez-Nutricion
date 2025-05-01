#!/bin/bash

# Script para crear archivo .env en producción

# Verificar si el archivo ya existe
if [ -f .env ]; then
  echo "El archivo .env ya existe. ¿Deseas sobrescribirlo? (s/n)"
  read respuesta
  if [ "$respuesta" != "s" ]; then
    echo "Operación cancelada."
    exit 0
  fi
fi

# Crear archivo .env
cat > .env << EOL
# Configuración del servidor
PORT=5001
NODE_ENV=production
FRONTEND_DOMAIN=https://guillermofernandeznutricion.es

# Configuración de email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=guillermo198f@gmail.com
EMAIL_PASS=bwob mipt dpql oywb
EMAIL_TO=jaimevillalcon@hotmail.com
EOL

echo "Archivo .env creado correctamente con tus credenciales de Gmail."
echo "Si necesitas editar el archivo:"
echo "nano .env"

# Dar permisos de ejecución
chmod +x setup-env.sh 