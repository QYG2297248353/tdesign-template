import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Layout from '@/layouts/web.vue';
import { MenuRoute } from '@/types/interface';

// 导入后台路由
const adminpageModules = import.meta.glob('./modules/admin/**/*.ts', { eager: true });

// 导入前台路由
const webModules = import.meta.glob('./modules/web/**/*.ts', { eager: true });

// 其他基础路由
const defaultModules = import.meta.glob('./modules/base/**/*.ts', { eager: true });

// 存放固定路由
export const adminRouterList: Array<MenuRoute> = mapModuleRouterList(adminpageModules);
export const webRouterList: Array<MenuRoute> = mapModuleRouterList(webModules);
export const defaultRouterList: Array<MenuRoute> = mapModuleRouterList(defaultModules);

// 前台路由
const homeRouter = {
  path: '/',
  name: 'Web',
  component: Layout,
  redirect: '/home',
  meta: {
    title: {
      zh_CN: '前台',
      en_US: 'Web',
    },
  },
  children: [...webRouterList],
};

export const allRoutes = [...adminRouterList, homeRouter, ...defaultRouterList];

// 固定路由模块转换为路由
export function mapModuleRouterList(modules: Record<string, unknown>): Array<MenuRoute> {
  const routerList: Array<MenuRoute> = [];
  Object.keys(modules).forEach((key) => {
    // @ts-ignore
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routerList.push(...modList);
  });
  return routerList;
}

export const getActive = (maxLevel = 3): string => {
  // 非组件内调用必须通过Router实例获取当前路由
  const route = router.currentRoute.value;

  if (!route.path) {
    return '';
  }

  return route.path
    .split('/')
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join('');
};

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: allRoutes as RouteRecordRaw[],
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
