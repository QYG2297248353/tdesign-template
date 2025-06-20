import Layout from '@/layouts/admin.vue';

export default {
  path: '/frame',
  name: 'Frame',
  component: Layout,
  redirect: '/frame/blog',
  meta: {
    icon: 'internet',
    title: {
      zh_CN: '外部页面',
      en_US: 'External',
    },
    orderNo: 9,
  },
  children: [
    {
      path: 'baidu',
      name: 'Baidu',
      component: () => import('@/layouts/components/FrameBlank.vue'),
      meta: {
        icon: 'logo-chrome',
        frameSrc: 'https://www.baidu.com/',
        frameBlank: false,
        title: {
          zh_CN: '百度一下',
          en_US: 'Baidu',
        },
      },
    },
  ],
};
