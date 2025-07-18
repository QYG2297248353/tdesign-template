export default {
  path: '/frame/blog',
  name: 'Blog',
  component: () => import('@/layouts/components/FrameBlank.vue'),
  meta: {
    icon: 'system-interface',
    frameSrc: 'https://blog.lifebus.top',
    frameBlank: true,
    title: {
      zh_CN: '人生足迹',
      en_US: 'Life Bus',
    },
    orderNo: 999,
  },
};
