<?php
/**
 * Created by PhpStorm.
 * User: author lihq1403 <lihaiqing1994@163.com>
 * Date: 2018/10/12
 * Time: 10:19
 */
namespace app\common\exception;


use think\Exception;
use Throwable;

class UnauthorizedHttpException extends Exception
{
    public function __construct($message = "用户未登录", $code = 401, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}