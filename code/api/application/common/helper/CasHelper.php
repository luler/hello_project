<?php
/**
 * Created by PhpStorm.
 * User: 我只想看看蓝天 
 * Date: 2020/1/19
 * Time: 13:52
 */

namespace app\common\helper;

use app\common\exception\CommonException;

class CasHelper
{
    public $host = '';
    public $appid = '';
    public $appsecret = '';
    public static $instance;

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct()
    {
        $this->host = env('cas.HOST');
        $this->appid = env('cas.APPID');
        $this->appsecret = env('cas.APPSECRET');
        if (empty($this->host) || empty($this->appid) || empty($this->appsecret)) {
            throw new CommonException('CAS配置不能为空');
        }
    }

    /**
     * 校验授权码（返回授权token）
     * @param $code
     * @return mixed
     * @throws \Exception
     */
    public function checkCode($code)
    {
        $url = $this->host . '/api/auth/checkCode';
        $param = [
            'code' => $code,
            'appid' => $this->appid,
            'appsecret' => $this->appsecret,
        ];
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-type:application/json;charset='utf-8'"]);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($param));
        $output = curl_exec($curl);
        curl_close($curl);
        $output = json_decode($output, true) ?: [];
        if (!isset($output['code']) || $output['code'] != 200) {
            throw new CommonException('CAS授权码失效');
        }

        return $output['info']['access_token'];
    }

    /**
     * 获取用户信息
     * @param $code
     * @return mixed
     * @throws \Exception
     */
    public function getUserInfo($code)
    {
        $url = $this->host . '/api/auth/getUserInfo';
        $header = [
            "Content-type:application/json;charset='utf-8'",
            'Authorization:' . $this->checkCode($code),
        ];
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        $output = curl_exec($curl);
        $output = json_decode($output, true) ?: [];
        curl_close($curl);
        if (!isset($output['code']) || $output['code'] != 200) {
            throw new CommonException('CAS获取用户信息失败');
        }

        return $output['info'];
    }
}
