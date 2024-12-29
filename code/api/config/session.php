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
// | 会话设置
// +----------------------------------------------------------------------

return [
    'id' => '',
    // SESSION_ID的提交变量,解决flash上传跨域
    'var_session_id' => '',
    // SESSION 前缀
    'prefix' => 'think',
    // 驱动方式 支持redis memcache memcached
    'type' => Env::get('session.SESSION_DRIVER', ''),
    // 是否自动开启 SESSION
    'auto_start' => true,
    //session 有效时间2小时
    'expire' => 7200,
    //redis主机
    'host' => Env::get('redis.REDIS_HOST', ''),
    //redis密码
    'password' => Env::get('redis.REDIS_PASSWORD', ''),
    //redis端口
    'port' => Env::get('redis.REDIS_PORT', 6379),
    // 操作库
    'select' => Env::get('redis.SELECT', 0),
    //会话名
    'session_name' => Env::get('session.SESSION_PREFIX', ''),
];
