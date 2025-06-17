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
];
