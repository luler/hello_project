<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\facade\Route;

Route::group('api', function () {
    Route::post('getAccessToken', 'home/Login/getAccessToken')->middleware('Throttle:10,1');
    Route::any('show', 'home/Index/show');
    Route::any('downloadZipFile', 'home/Index/downloadZipFile');
    Route::any('casLogin', 'home/Login/casLogin');
    //需要登录的路由
    Route::group('', function () {
        // +----------------------------------------------------------------------
        // | 前后台公共
        // +----------------------------------------------------------------------
        Route::post('editUserInfo', 'home/Login/editUserInfo');
        Route::post('uploadProject', 'home/Index/uploadProject');
        Route::get('getH5List', 'home/Index/getH5List');
        Route::post('addH5List', 'home/Index/addH5List');
        Route::get('getProjectVersionList', 'home/Index/getProjectVersionList');
        Route::post('delProjectVersion', 'home/Index/delProjectVersion');
        Route::post('delProject', 'home/Index/delProject');
        Route::post('editH5List', 'home/Index/editH5List');
        Route::get('getUserList', 'home/Index/getUserList');
        Route::post('addUser', 'home/Index/addUser');
        Route::post('editUser', 'home/Index/editUser');
        Route::get('getFixedLink', 'home/Index/getFixedLink');

    })->middleware('Auth');
}); //解决跨域问题

// miss 路由
Route::miss(function () {
    throw new \think\exception\RouteNotFoundException();
});
