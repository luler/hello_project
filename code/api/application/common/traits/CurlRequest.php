<?php
/**
 * Created by PhpStorm.
 * User: lihq
 * Date: 2018/10/14
 * Time: 15:29
 */
namespace app\common\traits;

trait CurlRequest
{
    /**
     * curl get请求
     * @param $url
     * @return mixed
     * @throws \Exception
     * @author lihq1403 <lihaiqing1994@163.com>
     */
    final static function curlGet($url)
    {
        //初始化
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        // 执行后不直接打印出来
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // 不从证书中检查SSL加密算法是否存在
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        //执行并获取HTML文档内容
        try{
            $output = curl_exec($ch);
            if ($output === FALSE) {
                throw new \Exception("CURL Error:" . curl_error($ch));
            }
        } finally{
            //释放curl句柄
            curl_close($ch);
        }
        return $output;
    }

    /**
     * curl post 请求
     * @param $url
     * @param $post_data
     * @return mixed
     * author lihq1403 <lihaiqing1994@163.com>
     * @throws \Exception
     */
    final static function curlPost($url, $post_data, $json = false)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        // 执行后不直接打印出来
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if($json && is_array($post_data)) {
            $post_data = json_encode($post_data);
        }
        // 设置请求方式为post
        curl_setopt($ch, CURLOPT_POST, true);
        // post的变量
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        if ($json){
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json; charset=utf-8',
                'Content-Length:' . strlen($post_data)
            ));
        }

        // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // 不从证书中检查SSL加密算法是否存在
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        //超时处理
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);

        try{
            $output = curl_exec($ch);
            if ($output === FALSE) {
                throw new \Exception("CURL Error:" . curl_error($ch));
            }
        } finally{
            //释放curl句柄
            curl_close($ch);
        }
        return $output;
    }

    /**
     * @param $URL
     * @param $type
     * @param null $params
     * @param null $headers
     * @return mixed
     * @throws \Exception
     * @author lihq1403 <lihaiqing1994@163.com>
     */
    final static function curlRequest($URL,$type,$params=null,$headers=null){
        $ch = curl_init($URL);
        $timeout = 5;
        if(isset($headers)){
            curl_setopt ($ch, CURLOPT_HTTPHEADER, $headers);
        }else {
            curl_setopt ($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        }
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        switch ($type){
            case "GET" : curl_setopt($ch, CURLOPT_HTTPGET, true);break;
            case "POST": curl_setopt($ch, CURLOPT_POST,true);
                curl_setopt($ch, CURLOPT_POSTFIELDS,$params);break;
            case "PUT" : curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "PUT");
                curl_setopt($ch, CURLOPT_POSTFIELDS,$params);break;
            case "PATCH": curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
                curl_setopt($ch, CURLOPT_POSTFIELDS, $params);break;
            case "DELETE":curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
                curl_setopt($ch, CURLOPT_POSTFIELDS,$params);break;
        }

        try{
            $file_contents = curl_exec($ch);
            if ($file_contents === FALSE) {
                throw new \Exception("CURL Error:" . curl_error($ch));
            }
        } finally{
            //释放curl句柄
            curl_close($ch);
        }

        return $file_contents;
    }
}