import Layout from '@/layouts/admin.vue';
import Iframe from '@/layouts/components/FrameBlank.vue';

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
      component: Iframe,
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
