spawn ssh -o StrictHostKeyChecking=no root@200.97.163.236
expect "assword:"
send "Photoshop09@.\r"
expect "#"
send "cd /var/www/faithmodel && git pull origin main && npm install && npx tsx seed-detailed-home.ts && rm -f seed-detailed-home.ts && npm run build && pm2 restart faithmodel\r"
expect "#"
send "exit\r"
