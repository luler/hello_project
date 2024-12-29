<?php

namespace app\http\middleware;

use app\common\exception\CommonException;
use think\facade\Cache;

class Throttle
{
    public function handle($request, \Closure $next, $param)
    {
        list($frequency, $minutes) = explode(',', $param);
        $ip = request()->ip();
        $key = 'throttle:' . $ip . ':' . request()->path();
        $res = Cache::get($key) ?: [];

        $time = time();
        $start_time = $time - $minutes * 60;
        $res = array_filter($res, function ($item) use ($start_time) {
            if ($item > $start_time) {
                return true;
            }
            return false;
        });
        $res[] = $time;
        if (count($res) > $frequency) {
            throw new CommonException('接口频率限制,每' . $minutes . '分钟' . $frequency . '次', 429);
        }
        Cache::set($key, $res, $minutes * 60);
        return $next($request);
    }
}
