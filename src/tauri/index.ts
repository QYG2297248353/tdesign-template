import { MAIN_WINDOW_INIT } from './constant';
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
}
