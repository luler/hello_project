<?php
/**
 * Created by PhpStorm.
 * User: lihq
 * Date: 2018/10/12
 * Time: 22:34
 */

namespace app\common\tools;

use app\common\exception\CommonException;
use app\common\exception\SystemErrorException;
use app\common\exception\UnauthorizedHttpException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use think\facade\Cache;
use think\facade\Config;
use think\facade\Request;

class JwtTools
{
    /**
     * 过期时间秒数
     *
     * @var int
     */
    public static $expires = 7200;//两个小时
    public static $refresh_timeout = 604800;//一周

    /**
     * The header prefix.
     *
     * @var string
     */
    public static $prefix = 'Bearer';

    /**
     * The header name.
     *
     * @var string
     */
    public static $header = 'authorization';

    /**
     * JwtTools constructor.
     */
    public function __construct()
    {
    }

    /**
     * 单例模式
     * @return JwtTools
     * @author 我只想看看蓝天 
     */
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    /**
     * @return mixed
     * @throws SystemErrorException
     * @throws UnauthorizedHttpException
     */
    final function authenticate()
    {
        return $this->certification($this->getClientInfo());
    }

    /**
     * 获取客户端信息
     * @return mixed
     * @throws UnauthorizedHttpException
     * @author lihq1403 <lihaiqing1994@163.com>
     */
    public function getClientInfo()
    {
        $jwt_encode = self::getCurrentToken();
        if (preg_match('/' . self::$prefix . '\s*(.*)\b/i', $jwt_encode, $matches)) {
            $jwt_encode = $matches[1];
        } else {
            throw new CommonException('登录凭证无效', 401);
        }
        return $jwt_encode;
    }

    /**
     * @param string $token
     * @return mixed
     * @throws SystemErrorException
     * @throws UnauthorizedHttpException
     */
    public function certification($token = '')
    {
        $res = $this->verification($token);
        return $res['data'];
    }

    /**
     * 签发token
     * @param $uid
     * @param int $expires
     * @return string
     * @throws SystemErrorException
     * @author lihq1403 <lihaiqing1994@163.com>
     */
    public function IssueToken($uid, $expires = 0)
    {
        if (empty($expires)) {
            $expires = $this->getExpires();
        }
        $key = $this->getKey();
        $time = time(); //当前时间
        $token = [
            'iss' => 'zemcho', //签发者 可选
            'aud' => '', //接收该JWT的一方，可选
            'iat' => $time, //签发时间
            'nbf' => $time, //(Not Before)：某个时间点后才能访问，比如设置time+30，表示当前时间30秒后才能使用
            'exp' => $time + $expires, //过期时间
            'data' => [ //自定义信息，不要定义敏感信息
                'uid' => $uid
            ]
        ];
        return self::$prefix . ' ' . JWT::encode($token, $key);
    }

    /**
     * 验证token
     * @param $jwt
     * @return array
     * @throws SystemErrorException
     * @throws UnauthorizedHttpException
     */
    public function verification($jwt)
    {
        //检验是否为注销token
        if (Cache::has('logout_token:' . $this->getClientInfo())) {
            throw new UnauthorizedHttpException();
        }
        $key = $this->getKey();
        try {
            $decoded = (array)JWT::decode($jwt, $key, ['HS256']); //HS256方式，这里要和签发的时候对应
            $decoded = json_decode(json_encode($decoded), true);
        } catch (ExpiredException $e) { //过期处理
            JWT::$leeway = $this->getRefreshTimeOut();//解密时间留点余地，默认1周
            try {
                $decoded = (array)JWT::decode($jwt, $key, ['HS256']); //HS256方式，这里要和签发的时候对应
                $decoded = json_decode(json_encode($decoded), true);
                //重新签发有效token
                $token = $this->IssueToken($decoded['data']['uid']);
                header('Authorization:' . $token);
            } catch (ExpiredException $e) { //过期处理
                throw new CommonException('登录凭证已过期', 401);
            }
            //注销刷新过的token
            $this->logout();
        } catch (\Exception $e) {
            throw new CommonException('登录凭证解析失败', 401);
        }
        return $decoded;
    }

    /**
     * 获取刷新token时间限制
     * Author:我只想看看蓝天
     * @return mixed
     */
    public function getRefreshTimeOut()
    {
        return (int)Config::get('jwt.refresh_timeout', self::$refresh_timeout);
    }

    /**
     * 获取是否刷新了token
     * @return int
     * @author 我只想看看蓝天 
     */
    public static function getRefreshToken()
    {
        $token = '';
        $has_sent_headers = headers_list();
        foreach ($has_sent_headers as $header) {
            if (strpos($header, 'Authorization') !== false) {
                $token = explode(':', $header);
                $token = $token[1];
            }
        }
        return $token;
    }

    /**
     * 获取当前请求的token
     * @return mixed
     * @throws UnauthorizedHttpException
     * @author 我只想看看蓝天 
     */
    public static function getCurrentToken()
    {
        $token = Request::header(self::$header);
        if (empty($token)) {
            $token = Request::param(self::$header);
            if (empty($token)) {
                throw new UnauthorizedHttpException();
            }
        }
        return $token;
    }

    /**
     * @throws SystemErrorException
     * @author lihq1403 <lihaiqing1994@163.com>
     */
    protected function getKey()
    {
        $jwt_secret = Config::get('jwt.jwt_secret');
        if (empty($jwt_secret)) {
            throw new SystemErrorException('jwt配置有误');
        }
        return $jwt_secret;
    }

    /**
     * 获取有效期
     * @return int|mixed
     */
    public function getExpires()
    {
        return (int)Config::get('jwt.auth_expires', self::$expires);
    }

    /**
     * @param $uid
     * @return array
     * @throws SystemErrorException
     */
    public function jsonReturnToken($uid)
    {
        if (empty($uid)) {//防止为空的情况
            throw new CommonException('uid格式有误', 401);
        }
        return [
            'access_token' => $this->IssueToken($uid),
            'token_type' => self::$prefix,
            'expires_in' => $this->getExpires()
        ];
    }

    /**
     * 关进注销小黑屋
     * @throws UnauthorizedHttpException
     */
    public function logout()
    {
        //加入注销缓存
        $token = $this->getClientInfo();
        Cache::set('logout_token:' . $token, $token, $this->getRefreshTimeOut());
    }
}
