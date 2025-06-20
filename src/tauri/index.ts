import { invoke } from '@tauri-apps/api/tauri';

import { isTauriEnv } from './core';
import { setupMenu } from './menu';
import { initialCheck, launchApp } from './plugin/app/init';
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
 * 打开控制台
 *
 * @description 打开控制台
 */
async function openDevtools() {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
      invoke('open_devtools');
    }
  });
}

export async function setupTauri() {
  if (isTauriEnv()) {
    // 初始检查
    await initialCheck();
    // 初始化主窗口
    await setupWindows();
    // 初始化主窗口视图
    await setupWebview();
    // 初始化主窗口菜单
    await setupMenu();
    // 初始化主窗口托盘
    await setupTray();
    // 启动应用
    await launchApp();

    // 全部禁用右键菜单
    disableRightClickMenu();
    openDevtools();
  }
}
