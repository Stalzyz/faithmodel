#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@"
set ip "200.97.163.236"

spawn scp -o StrictHostKeyChecking=no investigate.sh root@$ip:/root/investigate.sh
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}

spawn ssh -o StrictHostKeyChecking=no root@$ip "chmod +x /root/investigate.sh && /root/investigate.sh"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
