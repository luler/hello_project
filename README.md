H5项目发布系统
===============

主要实现技术：

 + Thinkphp5.1
 + Ant Design Pro
 + nginx
 + mysql
 + docker
 + docker-compose

## 安装

> 安装前，机器必须安装docker、和docker-compose环境

~~~
docker-compose -d up
~~~

然后就可以在浏览器中访问

~~~
http://localhost:1314
~~~

需要修改访问端口的，只需编辑docker-compose.yml的ports节点


## 目录结构

初始的目录结构如下：

~~~
hello_project
├── code
│   ├── api  //thinkphp5.1代码
│   │   └── hello_project
│   │       ├── application
│   │       ├── config
│   │       ├── database
│   │       ├── extend
│   │       ├── public
│   │       ├── route
│   │       ├── runtime
│   │       ├── thinkphp
│   │       └── vendor
│   └── web  //前端Ant Design Pro代码
│       └── hello_project
│           ├── config
│           ├── dist
│           ├── lambda
│           ├── mock
│           ├── public
│           ├── scripts
│           ├── src
│           └── tests
├── config  //nginx、php、supervisor配置文件
│   ├── nginx
│   │   └── vhost
│   ├── php
│   └── supervisor
│       └── supervisord.d
└── runtime //运行时产生的日志等文件
    └── nginx
        └── wwwlogs
~~~

## 在正常使用之前，要进入容器，进行数据库配置修改与初始化
进入容器
~~~
docker-compose exec php_nginx bash
~~~
然后进入指定目录，编辑配置文件
~~~
cd /home/wwwroot/api/hello_project/
vim .env
修改相关配置项，改成可用配置
[database]
DB_CONNECTION=mysql
DB_HOST=192.168.1.100
DB_PORT=3306
DB_DATABASE=hello_project
DB_USERNAME=root
DB_PASSWORD=root
DB_PREFIX=lz_

编辑完成，在该目录下执行命令
php think migrate:run
~~~

完成搭建

