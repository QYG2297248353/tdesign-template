export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: {
        zh_CN: '登录',
        en_US: 'Login',
      },
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
  },
  {
    path: '/jump',
    name: 'Jump',
    component: () => import('@/pages/result/jump/index.vue'),
    meta: { title: { zh_CN: '跳转页', en_US: 'Jump' } },
  },
];
