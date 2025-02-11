#!/bin/bash
#dns网路问题
#echo "nameserver 114.114.114.114" >/etc/resolv.conf
#执行数据库迁移
cd /home/wwwroot/api && php think migrate:run
#更改php代码存放目录的权限，防止出现文件权限问题
chown -R www.www /home/wwwroot
