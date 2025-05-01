#!/bin/bash

# Script de despliegue para guillermofernandeznutricion.es
# Uso: ./deploy-script.sh TU_USUARIO TU_IP_VPS

# Verificar argumentos
if [ $# -ne 2 ]; then
    echo "Uso: ./deploy-script.sh USUARIO IP_VPS"
    exit 1
fi

USER=$1
VPS_IP=$2
DEST_DIR="/var/www/guillermofernandeznutricion.es"

# 1. Construir el proyecto
echo "🚀 Construyendo el proyecto..."
npm run build

# 2. Verificar si el build fue exitoso
if [ $? -ne 0 ]; then
    echo "❌ Error en el build. Verifica la configuración del adaptador."
    exit 1
fi

echo "✅ Build completado con éxito."

# 3. Transferir archivos al servidor
echo "📦 Transfiriendo archivos al servidor..."
rsync -avz --exclude='node_modules' --exclude='.git' \
    dist/ package.json package-lock.json .env \
    $USER@$VPS_IP:$DEST_DIR/

# 4. Conectar al servidor y configurar
echo "⚙️ Configurando en el servidor..."
ssh $USER@$VPS_IP << 'EOF'
    cd /var/www/guillermofernandeznutricion.es
    
    # Instalar dependencias
    echo "📚 Instalando dependencias..."
    npm install --production --prefer-offline
    
    # Configurar nginx si no existe
    if [ ! -f /etc/nginx/sites-available/guillermofernandeznutricion.es ]; then
        echo "🔧 Configurando Nginx..."
        sudo bash -c 'cat > /etc/nginx/sites-available/guillermofernandeznutricion.es << EOL
server {
    listen 80;
    server_name guillermofernandeznutricion.es www.guillermofernandeznutricion.es;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL'
        
        # Activar sitio
        sudo ln -sf /etc/nginx/sites-available/guillermofernandeznutricion.es /etc/nginx/sites-enabled/
        sudo nginx -t
        sudo systemctl restart nginx
    fi
    
    # Iniciar o reiniciar la aplicación con PM2
    if command -v pm2 &> /dev/null; then
        echo "🚀 Configurando PM2..."
        pm2 stop guillermo-web || true
        pm2 delete guillermo-web || true
        pm2 start ./server/entry.mjs --name "guillermo-web"
        pm2 save
    else
        echo "📦 Instalando PM2..."
        sudo npm install -g pm2
        pm2 start ./server/entry.mjs --name "guillermo-web"
        pm2 save
        pm2 startup
    fi
    
    # Configurar SSL si no existe
    if [ ! -f /etc/letsencrypt/live/guillermofernandeznutricion.es/fullchain.pem ]; then
        echo "🔒 Configurando SSL..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
        sudo certbot --nginx -d guillermofernandeznutricion.es -d www.guillermofernandeznutricion.es --non-interactive --agree-tos --email guillermo198f@gmail.com
    fi
EOF

echo "✅ ¡Despliegue completado! Visita https://guillermofernandeznutricion.es" 