#!/bin/bash

#apagar ngrok y nginx
echo "Apagamos NGINX y NGROK"
sudo systemctl stop nginx
pkill ngrok

#vamos a la carpeta de repo y obtenemos la última actualización
echo "obteniendo archivos actualizados del repo"
cd /var/www/cvdevops
git reset --hard origin/main
git pull origin main --force

#nginx online
sudo systemctl daemon-reload
sudo systemctl start nginx

#ngrok online: nohup ngrok http 80 > /dev/null 2>&1 & se supone que permite que siga corriendo
#si cierras incluso terminal
ngrok http 80 > /dev/null &

#damos tiempo que prenda y obtenemos la url
sleep 5
NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[0].public_url')

#mostramos la url del sitio
echo "Consulta el sitio en $NGROK_URL"
