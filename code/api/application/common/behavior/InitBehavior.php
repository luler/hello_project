<?php

namespace app\common\behavior;

use think\facade\Config;

class InitBehavior
{
    public function run()
    {
        //初始化时，自动配置jwt秘钥
        if (!config('jwt.jwt_secret')) {
            $env_path = app()->getRootPath() . '.env';
            $env_data = file_get_contents($env_path);
            $jwt_secret = session_create_id();
            $env_data = str_replace('JWT_SELECT=', 'JWT_SELECT=' . $jwt_secret, $env_data);
            file_put_contents($env_path, $env_data);
            Config::set('jwt.jwt_secret', $jwt_secret);
        }
    }
}