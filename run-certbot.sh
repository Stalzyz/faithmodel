#!/usr/bin/expect -f

set timeout -1
set password "Photoshop09@."
set ip "200.97.163.236"

spawn ssh -o StrictHostKeyChecking=no root@$ip "sed -i 's/server_name faithmodel.grekam.in fmadmin.grekam.in;/server_name faithmodel.grekam.in;/g' /etc/nginx/sites-available/faithmodel && systemctl reload nginx && certbot --nginx -d faithmodel.grekam.in --non-interactive --agree-tos -m stalin@grekam.in"
expect {
    "password:" {
        send "$password\r"
        exp_continue
    }
    eof
}
