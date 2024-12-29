<?php

namespace app\common\model;


class ProjectVersion extends BaseModel
{
    /**
     * 删除空或废弃项目文件
     * @return bool
     * @author 我只想看看蓝天 
     */
    public static function delNotUseDir()
    {
        $path = app()->getRootPath() . 'public/backend/uploads';
        $dir1 = scandir($path);
        $dirs = [];
        foreach ($dir1 as $value) {
            $dir = $path . '/' . $value;
            if (!in_array($value, ['.', '..']) && is_dir($dir)) {
                $dir2 = scandir($dir);
                $dir2 = array_diff($dir2, ['.', '..']);
                if (count($dir2) == 0) {
                    @rmdir($dir);
                }
                $dir2 = array_map(function ($value) use ($dir) {
                    return $dir . '/' . $value;
                }, $dir2);
                $dirs = array_merge($dirs, $dir2);
            }
        }
        $res = ProjectVersion::column('path');
        $del_dirs1 = array_diff($dirs, $res);

        //删除固定链接
        $path = app()->getRootPath() . 'public/backend/fixed';
        $scandirs = scandir($path);
        $dirs = [];
        foreach ($scandirs as $dir) {
            $temp = $path . '/' . $dir;
            if (!in_array($dir, ['.', '..']) && is_dir($temp)) {
                $dirs[] = $temp;
            }
        }
        $dir2 = Project::column('id');
        $dir2 = array_map(function ($value) use ($path) {
            return $path . '/' . $value;
        }, $dir2);
        $del_dirs2 = array_diff($dirs, $dir2);

        $del_dirs = array_merge($del_dirs1, $del_dirs2);
        foreach ($del_dirs as $del_dir) {
            @deletedir($del_dir);
        }
        return true;
    }

    /**
     * 固定链接排除文件名干扰
     * @param $dir
     * @return string
     * @author 我只想看看蓝天 
     */
    public static function getSkipFilenameDir($dir)
    {
        $dir = rtrim($dir, '/');
        $res = scandir($dir);
        if (count($res) == 3) {
            foreach ($res as $value) {
                if (!in_array($value, ['.', '..'])) {
                    $dir .= '/' . $value;
                }
            }
        }
        return $dir;
    }
}
