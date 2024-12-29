<?php

namespace app\common\model;


class User extends BaseModel
{
    /**
     * 是否超级管理员
     * @return mixed
     * @author 我只想看看蓝天 
     */
    public static function isSuperAdmin()
    {
        return User::where('id', is_login())->value('is_super_admin');
    }

    /**
     * 加密密码
     * @param $clear
     * @return string
     * @author 我只想看看蓝天 
     */
    public static function translatePassword($clear)
    {
        return md5($clear . 'hello_project');
    }
}
