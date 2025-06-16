export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
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
