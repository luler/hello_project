#!/bin/bash
case "$1" in
    clear)
    php think clear
    echo "清除优化文件完成"
    composer dump-autoload
    echo "清除dump-autoload优化完成"
    ;;
    *)
    php think clear
    echo "清除优化文件完成"
    php think optimize:autoload
    echo "优化类库映射完成"
    php think optimize:route
    echo "优化路由完成"
    php think optimize:config
    echo "优化配置完成"
    composer dump-autoload -o
    echo "dump-autoload优化完成"
    ;;
esac