import { defineStore } from 'pinia';

import { RouteItem } from '@/api/model/permissionModel';
import { getMenuList } from '@/api/permission';
import router, { adminRouterList, webRouterList } from '@/router';
import { store } from '@/store';
import { MenuRoute } from '@/types/interface';
import { transformObjectToRoute } from '@/utils/route';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [] as MenuRoute[],
    webRouters: [] as MenuRoute[],
    removeRoutes: [] as MenuRoute[],
    asyncRoutes: [] as MenuRoute[],
  }),
  actions: {
    async initRoutes() {
      const accessedRouters = this.asyncRoutes;

      // 在菜单展示全部路由
      this.routers = [...adminRouterList, ...accessedRouters];
      this.webRouters = [...webRouterList];
    },
    async buildAsyncRoutes(): Promise<MenuRoute[]> {
      try {
        // 发起菜单权限请求 获取菜单列表
        const asyncRoutes: Array<RouteItem> = (await getMenuList()).list;
        this.asyncRoutes = transformObjectToRoute(asyncRoutes);
        await this.initRoutes();
        return this.asyncRoutes;
      } catch (error) {
        console.log(error);
        throw new Error("Can't build routes");
      }
    },
    async restoreRoutes() {
      // 不需要在此额外调用initRoutes更新侧边导肮内容，在登录后asyncRoutes为空会调用
      this.asyncRoutes.forEach((item: any) => {
        if (item.name) {
          router.removeRoute(item.name);
        }
      });
      this.asyncRoutes = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
