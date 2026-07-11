#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@."
set ip "200.97.163.236"

spawn scp -o StrictHostKeyChecking=no deploy-vps.sh root@$ip:/root/deploy-vps.sh
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}

spawn ssh -o StrictHostKeyChecking=no root@$ip "chmod +x /root/deploy-vps.sh && /root/deploy-vps.sh"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
