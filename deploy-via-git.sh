#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@"
set ip "200.97.163.236"

spawn ssh -o StrictHostKeyChecking=no -o PubkeyAuthentication=no root@$ip "cd /var/www/faithmodel && git pull origin main && chmod +x change-domain.sh && ./change-domain.sh"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
