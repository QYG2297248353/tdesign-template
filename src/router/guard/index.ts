import 'nprogress/nprogress.css';

import NProgress from 'nprogress';
import type { Router } from 'vue-router';

import { getPermissionStore, useUserStore } from '@/store';
import { setRouteEmitter } from '@/utils/route/route-listener';

import setupLoginGuard from './login';
import setupMetaInfo from './metainfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  setupLoginGuard(router);
  setupPermissionGuard(router);
  // 自定义守卫
  setupMetaInfo(router);
  cleanRouter(router);
}

function cleanRouter(router: Router) {
  router.afterEach((to) => {
    if (to.path === '/login') {
      const userStore = useUserStore();
      const permissionStore = getPermissionStore();

      userStore.logout();
      permissionStore.restoreRoutes();
    }
    NProgress.done();
  });
}
