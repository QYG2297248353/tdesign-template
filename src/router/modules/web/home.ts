export default [
  {
    path: 'home',
    name: 'Home',
    component: () => import('@/pages/web/home/index.vue'),
    meta: {
      title: {
        zh_CN: '首页',
        en_US: 'Home',
      },
      orderNo: 0,
    },
  },
];
