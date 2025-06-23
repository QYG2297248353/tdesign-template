import { invoke } from '@tauri-apps/api/core';

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
 * 仅允许 Ctrl + Shift + I 打开控制台，屏蔽其他方式（如 F12）
 */
function setupDevtoolsControl() {
  document.addEventListener('keydown', (e) => {
    // 允许 Ctrl+Shift+I 打开开发者工具
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      invoke('open_devtools');
      return;
    }

    // 屏蔽 F12
    if (e.key === 'F12') {
      e.preventDefault();
      return;
    }

    // 屏蔽 Ctrl+Shift+J / Ctrl+Shift+C / Ctrl+Shift+K（这些组合在浏览器/开发环境常用于打开控制台）
    if (e.ctrlKey && e.shiftKey && ['j', 'c', 'k'].includes(e.key.toLowerCase())) {
      e.preventDefault();
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
    // 调试控制台
    setupDevtoolsControl();
  }
}
