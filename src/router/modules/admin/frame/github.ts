export default {
  path: '/frame/tdesign-template',
  name: 'TDesignTemplate',
  component: () => import('@/layouts/components/FrameBlank.vue'),
  meta: {
    icon: 'logo-github',
    frameSrc: 'https://github.com/QYG2297248353/tdesign-template',
    frameBlank: true,
    title: {
      zh_CN: 'TDesign 模板',
      en_US: 'TDesign Template',
    },
    orderNo: 9999,
  },
};
