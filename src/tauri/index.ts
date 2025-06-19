import { open as openInShell } from '@tauri-apps/plugin-shell';

import { MAIN_WINDOW_INIT } from './constant';
import { isTauriEnv } from './core';
import { setupMenu } from './menu';
import { setStoreValue } from './plugin/store';
import { setupTray } from './tray';
import { setupWebview } from './webview';
import { setupWindows } from './windows';

/**
 * 禁用右键菜单
 *
 * @description 禁用所有窗口的右键菜单
 */
function disableRightClickMenu() {
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

/**
 * 拦截 window.open 避免重复打开窗口
 */
function interceptWindowOpen() {
  if (isTauriEnv()) {
    const rawOpen = window.open;
    window.open = function interceptedWindowOpen(
      url?: string | URL,
      target?: string,
      features?: string,
    ): Window | null {
      // 防御性判断
      const urlStr = typeof url === 'string' ? url : (url?.toString() ?? '');

      const isExternal = /^https?:\/\//.test(urlStr);

      if (isExternal) {
        openInShell(urlStr).catch(console.error);
        return null;
      }

      return rawOpen.call(window, url, target, features);
    };
  }
}

export async function setupTauri() {
  // 初始化主窗口
  await setupWindows();
  // 初始化主窗口视图
  await setupWebview();
  // 初始化主窗口菜单
  await setupMenu();
  // 初始化主窗口托盘
  await setupTray();
  await setStoreValue(MAIN_WINDOW_INIT, true);

  // 全部禁用右键菜单
  disableRightClickMenu();
  // 拦截外部地址
  interceptWindowOpen();
}
