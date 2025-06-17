export const LAYOUT = () => import('@/layouts/index.vue');
export const BLANK_LAYOUT = () => import('@/layouts/blank.vue');
export const IFRAME = () => import('@/layouts/components/FrameBlank.vue');
// 403
export const FORBIDDEN = () => import('@/pages/result/403/index.vue');
// 404
export const NOT_FOUND = () => import('@/pages/result/404/index.vue');
// 500
export const SERVER_ERROR = () => import('@/pages/result/500/index.vue');
// 浏览器不支持
export const BROWSER_INCOMPATIBLE = () => import('@/pages/result/browser-incompatible/index.vue');
// 网络错误
export const NETWORK_ERROR = () => import('@/pages/result/network-error/index.vue');
// 维护中
export const MAINTENANCE = () => import('@/pages/result/maintenance/index.vue');

export const PARENT_LAYOUT = () =>
  new Promise((resolve) => {
    resolve({ name: 'ParentLayout' });
  });

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:w+',
  name: '404Page',
  redirect: '/result/404',
};
