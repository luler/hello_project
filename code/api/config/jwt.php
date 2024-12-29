<?php

return [
    'jwt_secret' => env('jwt.JWT_SELECT', 'sfdghdf$%&$%^fdsgfdf*/*-+vdf'),
    'auth_expires' => env('jwt.AUTH_EXPIRES', 7200), //两小时间
    'refresh_timeout' => env('jwt.REFRESH_TIMEOUT', 604800), //刷新时间限制，7天
];