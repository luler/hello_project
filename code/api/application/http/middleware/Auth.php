<?php

namespace app\http\middleware;


use app\common\tools\JwtTools;

class Auth
{
    public function handle($request, \Closure $next)
    {
        //验证
        $jwt=new JwtTools();
        $authInfo=$jwt->authenticate();
        $request->__uid__ = $authInfo['uid'];
        return $next($request);
    }
}
