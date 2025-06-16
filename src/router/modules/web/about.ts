export default [
  {
    path: 'about',
    name: 'About',
    component: () => import('@/pages/web/about/index.vue'),
    meta: {
      title: {
        zh_CN: '关于',
        en_US: 'About',
      },
      orderNo: 99,
    },
  },
];
