sed -i 's|NEXTAUTH_URL=.*|NEXTAUTH_URL="https://faithmodel.grekam.in"|g' /var/www/faithmodel/.env

cat << 'NGINX' > /etc/nginx/sites-available/faithmodel
server {
    server_name faithmodel.grekam.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/faithmodel.grekam.in/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/faithmodel.grekam.in/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = faithmodel.grekam.in) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name faithmodel.grekam.in;
    return 404; # managed by Certbot
}
NGINX

nginx -t && systemctl restart nginx

cd /var/www/faithmodel
npm run build
pm2 restart faithmodel
