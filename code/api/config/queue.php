<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: yunwuxin <448901948@qq.com>
// +----------------------------------------------------------------------

return [
    'connector' => 'redis',
    //有效期限,
    'expire' => 0,
    //redis主机
    'host' => env('redis.REDIS_HOST', '127.0.0.1'),
    //redis密码
    'password' => env('redis.REDIS_PASSWORD', ''),
    //redis端口
    'port' => env('redis.REDIS_PORT', 6379),
    // 操作库,
    'select' => env('redis.SELECT', 0),
];
