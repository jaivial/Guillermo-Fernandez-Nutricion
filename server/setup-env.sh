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

# Configuración de email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu_email@example.com
EMAIL_PASS=tu_contraseña
EMAIL_TO=destinatario@example.com
EOL

echo "Archivo .env creado correctamente."
echo "Por favor, edita el archivo con tus credenciales reales:"
echo "nano .env"

# Dar permisos de ejecución
chmod +x setup-env.sh 