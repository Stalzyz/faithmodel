#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@."
set ip "200.97.163.236"

spawn ssh -o StrictHostKeyChecking=no root@$ip "sed -i 's/server_name fm.grekam.in fmadmin.grekam.in;/server_name fm.grekam.in;/g' /etc/nginx/sites-available/faithmodel && systemctl reload nginx && certbot --nginx -d fm.grekam.in --non-interactive --agree-tos -m stalin@grekam.in"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
