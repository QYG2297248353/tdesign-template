import { TauriEvent } from '@tauri-apps/api/event';
import { Menu } from '@tauri-apps/api/menu';
import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray';

import { MAIN_WINDOW_ID, MAIN_WINDOW_INIT, MAIN_WINDOW_TRAY_ID } from '../constant';
import { getStoreValue } from '../plugin/store';
import { exitAllWindows, getWindow, showWindow } from '../windows/operation';

export async function flushMenu() {
  // 创建菜单
  const trayMenu = await Menu.new({
    items: [
      {
        text: '打开主界面',
        action: async () => {
          console.log('[Tauri][系统托盘] 打开主界面');
          await showWindow(MAIN_WINDOW_ID);
        },
      },
      {
        text: '退出',
        action: async () => {
          console.log('[Tauri][系统托盘] 退出应用');
          await exitAllWindows();
          const mainWindow = await getWindow(MAIN_WINDOW_ID);
          if (mainWindow) {
            await mainWindow.emit(TauriEvent.WINDOW_CLOSE_REQUESTED, {
              exit: true,
            });
          }
        },
      },
    ],
  });

  // 获取托盘图标
  const tray = await TrayIcon.getById(MAIN_WINDOW_TRAY_ID);
  if (tray) {
    // 设置菜单
    await tray.setMenu(trayMenu);
  }
}

export async function initTray() {
  // 检查托盘图标是否存在
  const tray = await TrayIcon.getById(MAIN_WINDOW_TRAY_ID);
  if (tray) {
    return;
  }

  // 创建托盘图标
  const options = {
    id: MAIN_WINDOW_TRAY_ID,
    icon: 'icons/icon.png',
    tooltip: '托盘图标工具提示',
    showMenuOnLeftClick: false,
    action: async (event: TrayIconEvent) => {
      if (event.type === 'DoubleClick') {
        await showWindow(MAIN_WINDOW_ID);
      }
    },
  };

  await TrayIcon.new(options);
}

export async function flushTray() {
  await initTray();
  await flushMenu();
}

export async function setupTray() {
  const isInitialized = await getStoreValue<boolean>(MAIN_WINDOW_INIT);
  console.log('[Tauri][系统托盘] 初始化', isInitialized);
  if (isInitialized) return;

  const mainWebviewWindow = await getWindow(MAIN_WINDOW_ID);
  if (!mainWebviewWindow) {
    throw new Error('[系统] 初始化异常');
  }

  await flushTray();
  console.log('[Tauri][系统托盘] 初始化完成');
}
