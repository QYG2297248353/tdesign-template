import { TauriEvent } from '@tauri-apps/api/event';
import { Menu } from '@tauri-apps/api/menu';
import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray';

import { MAIN_WINDOW_ID, MAIN_WINDOW_TRAY_ID } from '../constant';
import { exitAllWindows, getWindow, showWindow } from '../windows/operation';

export async function setupTray() {
  const tray = await TrayIcon.getById(MAIN_WINDOW_TRAY_ID);
  if (tray) {
    console.log('[Tauri][托盘] 触发更新');
    tray.close();
  }

  const trayMenu = await Menu.new({
    items: [
      {
        text: '打开主界面',
        action: async () => {
          await showWindow(MAIN_WINDOW_ID);
        },
      },
      {
        text: '退出',
        action: async () => {
          console.log('[Tauri] 退出应用');
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

  const options = {
    id: MAIN_WINDOW_TRAY_ID,
    icon: 'icons/icon.png',
    tooltip: '托盘图标工具提示',
    menu: trayMenu,
    showMenuOnLeftClick: false,
    action: async (event: TrayIconEvent) => {
      if (event.type === 'DoubleClick') {
        await showWindow(MAIN_WINDOW_ID);
      }
    },
  };

  await TrayIcon.new(options);
  console.log('[Tauri][托盘] 初始化完成');
}
