export default [
  {
    path: 'template',
    name: 'Template',
    component: () => import('@/pages/web/template/index.vue'),
    meta: {
      title: {
        zh_CN: '模板',
        en_US: 'Template',
      },
      orderNo: 99,
    },
  },
];
