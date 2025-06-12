import { DashboardIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/web.vue';

export default [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/base',
    name: 'home',
    meta: {
      title: {
        zh_CN: '关于',
        en_US: 'About',
      },
      icon: shallowRef(DashboardIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'base',
        name: 'HomeBase',
        component: () => import('@/pages/web/home/base/index.vue'),
        meta: {
          title: {
            zh_CN: '首页',
            en_US: 'Home',
          },
        },
      },
    ],
  },
];
