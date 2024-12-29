<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use \think\facade\Env;

// +----------------------------------------------------------------------
// | 缓存设置
// +----------------------------------------------------------------------

return [
    'type' => 'complex',
    'default' => [
        // 驱动方式
        'type' => Env::get('cache.CACHE_DRIVER', 'file'),
        // 缓存保存目录
        'path' => '',
        // 缓存前缀
        'prefix' => Env::get('cache.CACHE_PREFIX', ''),
        // 缓存有效期 0表示永久缓存
        'expire' => 0,
        //redis主机
        'host' => Env::get('redis.REDIS_HOST', ''),
        //redis密码
        'password' => Env::get('redis.REDIS_PASSWORD', ''),
        //redis端口
        'port' => Env::get('redis.REDIS_PORT', 6379),
        // 操作库
        'select' => Env::get('redis.SELECT', 0),
    ],

];
