<?php
/**
 * Created by PhpStorm.
 * User: author lihq1403 <lihaiqing1994@163.com>
 * Date: 2018/10/12
 * Time: 16:09
 */

namespace app\common\exception;

use think\Exception;
use Throwable;

class ForbiddenException extends Exception
{
    public function __construct($message = "无权访问", $code = 403, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}