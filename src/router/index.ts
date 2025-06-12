import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 导入后台路由
const adminpageModules = import.meta.glob('./modules/admin/**/*.ts', { eager: true });

// 导入前台路由
const webModules = import.meta.glob('./modules/web/**/*.ts', { eager: true });

// 其他基础路由
const defaultModules = import.meta.glob('./modules/base/**/*.ts', { eager: true });

// 存放固定路由
export const adminRouterList: Array<RouteRecordRaw> = mapModuleRouterList(adminpageModules);
export const webRouterList: Array<RouteRecordRaw> = mapModuleRouterList(webModules);
export const defaultRouterList: Array<RouteRecordRaw> = mapModuleRouterList(defaultModules);

export const allRoutes = [...adminRouterList, ...webRouterList, ...defaultRouterList];

// 固定路由模块转换为路由
export function mapModuleRouterList(modules: Record<string, unknown>): Array<RouteRecordRaw> {
  const routerList: Array<RouteRecordRaw> = [];
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
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
