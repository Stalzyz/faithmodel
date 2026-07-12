#!/bin/bash
echo "PM2 Status:"
pm2 status

echo "\nListening Ports:"
lsof -i -P -n | grep LISTEN

echo "\nNginx Configs:"
ls -la /etc/nginx/sites-enabled/
cat /etc/nginx/sites-enabled/*
