sed -i 's|NEXTAUTH_URL="https://faithmodel.grekam.in"|NEXTAUTH_URL="https://test.faithmodelschool.com"|g' /var/www/faithmodel/.env

cat << 'NGINX' > /etc/nginx/sites-available/faithmodel
server {
    server_name test.faithmodelschool.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
NGINX

nginx -t && systemctl restart nginx
certbot --nginx -d test.faithmodelschool.com --non-interactive --agree-tos -m stalin@grekam.in

cd /var/www/faithmodel
npm run build
pm2 restart faithmodel
