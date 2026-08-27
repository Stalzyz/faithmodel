sed -i 's|NEXTAUTH_URL=.*|NEXTAUTH_URL="https://fm.grekam.in"|g' /var/www/faithmodel/.env

cat << 'NGINX' > /etc/nginx/sites-available/faithmodel
server {
    listen 80;
    listen [::]:80;
    server_name fm.grekam.in www.fm.grekam.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name fm.grekam.in www.fm.grekam.in;

    client_max_body_size 50M;

    ssl_certificate /etc/letsencrypt/live/fm.grekam.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fm.grekam.in/privkey.pem;

    location /uploads/ {
        alias /var/www/faithmodel/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

nginx -t && systemctl restart nginx
certbot --nginx -d fm.grekam.in --non-interactive --agree-tos -m stalin@grekam.in

cd /var/www/faithmodel
npm run build
pm2 restart faithmodel
