import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { useUserStore } from '@/store';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        route.meta?.unAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        userStore.roles.some((role) => route.meta?.roles?.includes(role))
      );
    },
    // 自定义规则
    findFirstPermissionRoute(_routers: any, roles: string[] = ['admin']) {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string) => {
            return el.includes('*') || roles.includes(el);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // 自定义规则
  };
}
