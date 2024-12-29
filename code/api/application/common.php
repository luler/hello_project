<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

/**
 * 判断登陆，获取uid
 * @return bool|mixed
 * @author 我只想看看蓝天 
 */
function is_login()
{
    //返回登录用户的uid
    if (request()->__uid__) {
        return request()->__uid__;
    } else {
        try {
            $authInfo = \app\common\tools\JwtTools::instance()->authenticate();
            return $authInfo['uid'];
        } catch (\Exception $e) {
            return false;
        }
    }
}

/**
 * 检查数据
 * @param $param
 * @param $rule
 * @param $message
 * @throws CommonException
 * @author 我只想看看蓝天 
 */
function checkData($param, $rule, $message = [])
{
    $check = \think\Validate::make($rule, $message);
    if (!$check->check($param)) {
        throw new \app\common\exception\CommonException($check->getError());
    }
}

/**
 * 扫描目录文件
 * @author 我只想看看蓝天 
 */
function getAllFiles($dir)
{
    $res = [];
    if (!is_dir($dir)) {
        return $res;
    }
    $handle = opendir($dir);
    while (($file = readdir($handle)) !== false) {
        if ($file != '.' && $file != '..') {
            $path = $dir . '/' . $file;
            if (is_dir($path)) {
                $res = array_merge($res, getAllFiles($path));
            } else {
                $res[] = $path;
            }
        }
    }
    closedir($handle);
    return $res;
}

/**
 * 文件数组中搜索路径最短的指定文件
 * @param $file_array
 * @param string $search_file
 * @return bool|mixed
 * @author 我只想看看蓝天 
 */
function getFirstExistFile($file_array, $search_file = 'index.html')
{
    $match_files = [];
    foreach ($file_array as $value) {
        if (basename($value) === $search_file) {
            $match_files[] = $value;
        }
    }

    usort($match_files, function ($a, $b) {
        $a = strlen($a);
        $b = strlen($b);
        return $a > $b ? true : false;
    });
    return array_shift($match_files);
}

/**
 * 删除目录函数
 * @param $dirname
 * @return bool
 * @author 我只想看看蓝天 
 */
function deletedir($dirname)
{
    if (file_exists($dirname)) {
        $handle = opendir($dirname);
        while (($file = readdir($handle)) !== false) {
            if ($file != '.' && $file != '..') {
                if (is_dir($dirname . "/$file")) {
                    deletedir($dirname . "/$file");
                } else {
                    unlink($dirname . "/$file");
                }
            }
        }
        closedir($handle);
        rmdir($dirname);
        return true;
    } else {
        return false;
    }
}

/**
 * 解压zip文件
 * @param string $zip_file 需要解压的文件路径加文件名
 * @param string $to_dir 解压后的文件夹路径
 * @return bool
 */
function extractZipToFile($zip_file, $to_dir)
{
    $zip = new \ZipArchive;
    if ($zip->open($zip_file) === TRUE) {
        if (!is_dir($to_dir)) {
            mkdir($to_dir, 0775, true);
        }
        $docnum = $zip->numFiles;
        for ($i = 0; $i < $docnum; $i++) {
            $statInfo = $zip->statIndex($i, \ZipArchive::FL_ENC_RAW);
            $filename = transcoding($statInfo['name']);
            if ($statInfo['crc'] == 0) {
                //新建目录
                if (!is_dir($to_dir . '/' . substr($filename, 0, -1))) mkdir($to_dir . '/' . substr($filename, 0, -1), 0775, true);
            } else {
                //拷贝文件
                copy('zip://' . $zip_file . '#' . $zip->getNameIndex($i), $to_dir . '/' . $filename);
            }
        }
        $zip->close();
        return true;
    } else {
        return false;
    }
}

/**
 * 中文乱码兼容
 * @param $filename
 * @return false|mixed|string
 * @author 我只想看看蓝天 
 */
function transcoding($filename)
{
    $encoding = mb_detect_encoding($filename, ['UTF-8', 'GBK', 'BIG5', 'CP936']);
    $filename = str_replace('\\', '/', $filename);
    if (DIRECTORY_SEPARATOR == '/') {    //linux
        $filename = iconv($encoding, 'UTF-8', $filename);
    } else {  //win
        $filename = iconv($encoding, 'GBK', $filename);
    }
    return $filename;
}


/**
 * 复制文件夹
 * @param $source
 * @param $dest
 */
function copydir($source, $dest)
{
    if (!file_exists($dest)) mkdir($dest);
    $handle = opendir($source);
    while (($item = readdir($handle)) !== false) {
        if ($item == '.' || $item == '..') continue;
        $_source = $source . '/' . $item;
        $_dest = $dest . '/' . $item;
        if (is_file($_source)) copy($_source, $_dest);
        if (is_dir($_source)) copydir($_source, $_dest);
    }
    closedir($handle);
}

/**
 * 设置前端立即返回，后端继续运行任务
 * @param $message
 * @param int $code
 * @param array $info
 */
function background_task($message, $code = 200, $info = [])
{
    $return = [
        'message' => $message,
        'code' => $code,
        'info' => $info
    ];
    http_response_code($code);
    header('Content-Type:application/json; charset=utf-8');
    echo json_encode($return, 256);
    fastcgi_finish_request();
}

/**
 * 设置浏览器缓存
 * @param int $interval //浏览器缓存的时间，单位：秒
 */
function browserCacheControl(int $interval)
{
    //必须先设置头，防止下面304返回的请求覆盖原来的请求头
    header("Last-Modified: " . gmdate('D, d M Y H:i:s') . ' GMT');
    header("Expires: " . gmdate('D, d M Y H:i:s', time() + $interval) . ' GMT');
    header("Cache-Control: max-age=$interval");
    header("Pragma: public"); //防止session_start会将该值置为no-cache
    //如果浏览器请求头带这个，判断过期时间，缓存有效则返回304即可
    if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
        $c_time = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) + $interval;
        if ($c_time > time()) {
            header('HTTP/1.1 304 Not Modified');
            exit();
        }
    }
}
