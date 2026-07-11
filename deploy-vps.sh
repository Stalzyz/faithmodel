#!/bin/bash
set -e

echo "Starting deployment setup..."

# 1. Update system and install dependencies
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git nginx postgresql postgresql-contrib

# 2. Setup Node.js v20
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# 3. Setup PM2
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# 4. Setup PostgreSQL Database (if not already set up)
# We will create a database 'faithmodel', user 'faithmodel' with password 'Photoshop09@.'
sudo -u postgres psql -c "SELECT 1 FROM pg_roles WHERE rolname='faithmodel'" | grep -q 1 || sudo -u postgres psql -c "CREATE USER faithmodel WITH PASSWORD 'Photoshop09@.';"
sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw faithmodel || sudo -u postgres psql -c "CREATE DATABASE faithmodel OWNER faithmodel;"
sudo -u postgres psql -c "ALTER USER faithmodel CREATEDB;" || true

# 5. Clone/Update the repository
APP_DIR="/var/www/faithmodel"
if [ ! -d "$APP_DIR" ]; then
    mkdir -p /var/www
    git clone https://github.com/Stalzyz/faithmodel.git $APP_DIR
else
    cd $APP_DIR
    git reset --hard
    git pull origin main
fi

cd $APP_DIR

# 6. Create .env file for production
cat > .env << EOL
DATABASE_URL="postgresql://faithmodel:Photoshop09@.@localhost:5432/faithmodel?schema=public"
NEXTAUTH_SECRET="faithmodel_super_secret_production_key_123_456"
NEXTAUTH_URL="https://faithmodel.grekam.in"
EOL

# 7. Install dependencies and build
npm install
npx prisma generate
npx prisma db push
npm run build

# 8. Start with PM2
pm2 delete faithmodel || true
pm2 start npm --name "faithmodel" -- run start
pm2 save
pm2 startup systemd -u root --hp /root || true

# 9. Configure Nginx
cat > /etc/nginx/sites-available/faithmodel << EOL
server {
    listen 80;
    server_name faithmodel.grekam.in fmadmin.grekam.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

ln -sf /etc/nginx/sites-available/faithmodel /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "Deployment completed successfully! The app is running on port 3000 and exposed via Nginx."
