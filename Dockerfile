FROM nginx:latest

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY js /usr/share/nginx/html/js

#configuracoin personalizada de NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
