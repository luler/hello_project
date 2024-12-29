export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // frontend
  {
    path: '/frontend',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/frontend/casLogin', name: 'login', component: './Frontend/CasLogin' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'super_admin'],
    routes: [
      { path: '/', redirect: '/h5/index' },
      {
        path: '/h5',
        name: 'H5项目',
        icon: 'dashboard',
        // redirect: '/h5/index',
        routes: [
          {
            path: '/h5/index',
            name: 'H5项目列表',
            component: './H5/Index',
          },
          {
            path: '/h5/index/version/:project_id',
            name: 'H5项目详情',
            hideInMenu: true,
            component: './H5/Version',
          },
        ],
      },
      {
        path: '/admin',
        name: '用户管理',
        icon: 'team',
        component: './H5/Admin',
        authority: ['super_admin'],
      },
      {
        component: '404',
      },
    ],
  },
];
