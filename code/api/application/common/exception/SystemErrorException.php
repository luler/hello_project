<?php
/**
 * Created by PhpStorm.
 * User: author lihq1403 <lihaiqing1994@163.com>
 * Date: 2018/10/12
 * Time: 14:15
 */

namespace app\common\exception;


use think\Exception;
use Throwable;

class SystemErrorException extends Exception
{
    public function __construct($message = "系统内部错误", $code = 500, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}