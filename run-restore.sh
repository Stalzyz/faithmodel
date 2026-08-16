#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@"
set ip "200.97.163.236"

spawn scp -o StrictHostKeyChecking=no dump.json restore-data.ts root@$ip:/var/www/faithmodel/
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}

spawn ssh -o StrictHostKeyChecking=no root@$ip "cd /var/www/faithmodel && npx tsx restore-data.ts && npm run build && pm2 restart faithmodel"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
