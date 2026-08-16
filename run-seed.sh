#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@"
set ip "200.97.163.236"

spawn scp -o StrictHostKeyChecking=no -o PubkeyAuthentication=no seed-vps.ts root@$ip:/var/www/faithmodel/seed-vps.ts
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}

spawn ssh -o StrictHostKeyChecking=no -o PubkeyAuthentication=no root@$ip "cd /var/www/faithmodel && npx tsx seed-vps.ts"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
