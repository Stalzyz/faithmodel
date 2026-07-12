#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@."
set ip "200.97.163.236"

spawn ssh -o StrictHostKeyChecking=no root@$ip "cd /var/www/faithmodel && rm -f restore-data.ts seed-vps.ts && npm run build && pm2 restart faithmodel"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
