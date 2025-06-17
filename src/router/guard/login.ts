import NProgress from 'nprogress';
import type { LocationQueryRaw, Router } from 'vue-router';

import { useUserStore } from '@/store';

import { whiteListRouters } from '..';

// 登录状态守卫
export default function setupLoginGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 进度条开始
    NProgress.start();
    // 白名单路由
    if (whiteListRouters.includes(to.path)) {
      next();
      return;
    }
    // 不需要登录权限
    if (!to.meta.unAuth) {
      next();
      return;
    }
    // 登录状态判断
    const userStore = useUserStore();
    if (userStore.token) {
      await userStore.getUserInfo();
      if (router.hasRoute(to.name)) {
        next();
      } else {
        next('/');
      }
    } else {
      // 回到登录页面
      next({
        name: 'login',
        query: {
          redirect: to.path,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
  });
}
