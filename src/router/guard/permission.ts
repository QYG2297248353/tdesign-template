import type { Router } from 'vue-router';

import usePermission from '@/hooks/permission';
import { useUserStore } from '@/store';

import { allRoutes, NOT_FOUND_ROUTE } from '..';

// 权限守卫
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const Permission = usePermission();
    const permissionsAllow = Permission.accessRouter(to);

    if (permissionsAllow) {
      next();
    } else {
      const destination = Permission.findFirstPermissionRoute(allRoutes, userStore.roles) || NOT_FOUND_ROUTE;
      next(destination);
    }
  });
}
