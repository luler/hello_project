<?php
/**
 * Created by PhpStorm.
 * User: author lihq1403 <lihaiqing1994@163.com>
 * Date: 2018/10/12
 * Time: 10:21
 */

namespace app\common\traits;

/*
@param string $message 获取返回提示语
 */

trait ApiReturn
{
    /**
     * 返回提示语
     * @var string
     * @author klinson <klinson@163.com>
     */
    protected $returnMessage = 'system error';
    /**
     * @var string
     * @author klinson <klinson@163.com>
     */
    protected $returnCode = '500';
    /**
     * 返回数据列表
     * @var array
     * @author klinson <klinson@163.com>
     */
    protected $returnInfo = [];
    /**
     * 返回数据类型
     * json, jsonp, exit
     * @var string
     * @author klinson <klinson@163.com>
     */
    protected $returnMethod = 'json';

    public function setReturnMessage($message)
    {
        $this->returnMessage = $message;
        return $this;
    }

    public function setReturnCode($code)
    {
        $this->returnCode = $code;
        return $this;
    }

    public function setReturnInfo($data = [])
    {
        $this->returnInfo = $data;
        return $this;
    }

    public function setReturnMethod($method)
    {
        $this->returnMethod = $method;
        return $this;
    }

    /**
     * 成功返回操作，已默认code=200
     * @param string $message
     * @param array $info
     * @return \think\response\Json|\think\response\Jsonp
     */
    public function successResponse($message = 'success', $info = [])
    {
        return $this->setReturnCode(200)->setReturnMessage($message)->setReturnInfo($info)->returnDo();
    }

    /**
     * 资源创建成功返回
     * Author:我只想看看蓝天
     * @param string $message
     * @param array $info
     * @return \think\response\Json|\think\response\Jsonp
     */
    public function createdResponse($message = 'success', $info = [])
    {
        return $this->setReturnCode(201)->setReturnMessage($message)->setReturnInfo($info)->returnDo();
    }

    /**
     * 资源删除后无内容返回
     * Author:我只想看看蓝天
     * @param string $message
     * @param array $info
     * @return \think\response\Json|\think\response\Jsonp
     */
    public function noContentResponse()
    {
        return response()->code(204);
    }

    /**
     * jsonp返回操作，已默认code=200
     * @param string $message
     * @param array $info
     * @return \think\response\Json|\think\response\Jsonp
     */
    public function jsonpResponse($code = 200, $message = 'success', $info = [])
    {
        return $this->setReturnMethod('jsonp')->setReturnCode($code)->setReturnMessage($message)->setReturnInfo($info)->returnDo();
    }

    /**
     * 常规失败返回操作，已默认code=400
     * @param string $message 提示语
     * @param array $info 返回数据
     * @return \think\response\Json|\think\response\Jsonp
     * @author klinson <klinson@163.com>
     */
    public function errorResponse($message = 'error', $info = [])
    {
        return $this->setReturnCode(400)->setReturnMessage($message)->setReturnInfo($info)->returnDo();
    }

    /**
     * 通用返回
     * Author:我只想看看蓝天
     * @param int $code
     * @param string $message
     * @param array $info
     * @return \think\response\Json|\think\response\Jsonp
     */
    public function commonResponse($code = 200, $message = 'success', $info = [])
    {
        return $this->setReturnCode($code)->setReturnMessage($message)->setReturnInfo($info)->returnDo();
    }

    /**
     * exit方式返回数据
     * 常见在初始化_initialize()方法使用
     * @param string $code
     * @param string $message
     * @param array $info
     * @return mixed
     * @author klinson <klinson@163.com>
     */
    public function exitResponse($code = 500, $message = 'error', $info = [])
    {
        return $this->setReturnMethod('exit')->setReturnCode($code)->setReturnMessage($message)->setReturnInfo($info)->returnDo();
    }

    /**
     * 返回接口数据
     * @return \think\response\Json|\think\response\Jsonp
     * @author klinson <klinson@163.com>
     */
    public function returnDo()
    {
        //设置跨域请求头
        header('Access-Control-Allow-Origin:*');
        header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE');
        header('Access-Control-Allow-Headers:Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-Requested-With');
        header('Access-Control-Allow-Credentials:true');
        //设置返回内容
        $return = [
            'message' => $this->returnMessage,
            'code' => (int)$this->returnCode,
            'info' => $this->returnInfo
        ];

        switch ($this->returnMethod) {
            case 'jsonp':
                return jsonp($return)->code($this->returnCode);
            case 'exit':
                //设置http返回码
                http_response_code($this->returnCode);
                header('Content-Type:application/json; charset=utf-8');
                exit(json_encode($return, 256));
            default:
                return json($return)->code($this->returnCode);
        }
    }
}
