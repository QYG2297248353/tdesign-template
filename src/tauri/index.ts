import { setupMenu } from './menu';
import { setupTray } from './tray';
import { setupWindows } from './windows';

export async function setupTauri() {
  // 初始化窗口
  await setupWindows();
  // 初始化菜单
  await setupMenu();
  // 初始化托盘
  await setupTray();
}
