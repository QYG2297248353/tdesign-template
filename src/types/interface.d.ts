import type { TabValue } from 'tdesign-vue-next';
import { LocationQueryRaw, RouteRecordName } from 'vue-router';

export interface RouteMeta {
  // 展示在侧边栏
  showInSidebar?: boolean;
  // 侧边栏标题
  title?: string | Record<string, string>;
  // 侧边栏图标
  icon?: string;
  // 扩展
  expanded?: boolean;
  // 排序
  orderNo?: number;
  // 路由是否隐藏
  hidden?: boolean;
  // 面包屑是否隐藏
  hiddenBreadcrumb?: boolean;
  // 单例
  single?: boolean;
  // 缓存
  keepAlive?: boolean;
  // 嵌套路由 (Url地址)
  frameSrc?: string;
  // 嵌套路由(新窗口打开)
  frameBlank?: boolean;
  // 路由需要登录权限
  unAuth?: boolean;
}

export interface MenuRoute {
  path: any;
  title?: string | Record<string, string>;
  name?: string;
  icon?:
    | string
    | {
        render: () => void;
      };
  redirect?: string;
  children?: MenuRoute[];
  meta: RouteMeta;
}

export type ModeType = 'dark' | 'light';

export interface UserInfo {
  name: string;
  roles: string[];
}

export interface NotificationItem {
  id: string;
  content: string;
  type: string;
  status: boolean;
  collected: boolean;
  date: string;
  quality: string;
}

export interface TRouterInfo {
  path: string;
  query?: LocationQueryRaw;
  routeIdx?: number;
  title?: string;
  name?: RouteRecordName;
  isAlive?: boolean;
  isHome?: boolean;
  meta?: any;
}

export interface TTabRouterType {
  isRefreshing: boolean;
  tabRouterList: Array<TRouterInfo>;
}

export interface TTabRemoveOptions {
  value: TabValue;
  index: number;
  e: MouseEvent;
}
