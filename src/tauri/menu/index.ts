import { TauriEvent } from '@tauri-apps/api/event';
import { Menu } from '@tauri-apps/api/menu';

import { MAIN_WINDOW_ID, MAIN_WINDOW_INIT } from '../constant';
import { createInfoDialog } from '../plugin/dialog';
import { sendDesktopNotification } from '../plugin/notification';
import { startCommand, stopCommand } from '../plugin/shell';
import { getStoreValue } from '../plugin/store';
import { createWebviewWindow } from '../webview/operation';
import { closeAllWindows, getWindow } from '../windows/operation';

async function openAboutView(): Promise<(id: string) => void> {
  const aboutWinId = `${MAIN_WINDOW_ID}-about`;
  const aboutWin = await getWindow(aboutWinId);
  if (aboutWin) {
    await aboutWin.show();
    return;
  }
  const aboutView = await createWebviewWindow(aboutWinId, {
    url: '/about',
    width: 600,
    height: 400,
    center: true,
  });
  aboutView.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async () => {
    await aboutView.destroy();
  });
}

export async function flushMenu() {
  const menu = await Menu.new({
    items: [
      {
        id: 'notice',
        text: '通知',
        items: [
          {
            id: 'send',
            text: '发送通知',
            action: async () => {
              await sendDesktopNotification({
                title: '通知',
                body: '这是一个通知',
              });
            },
          },
        ],
      },
      {
        id: 'app',
        text: '应用',
        items: [
          {
            id: 'runBack',
            text: '启动后台服务',
            action: async () => {
              await startCommand('ammds', 'binaries/ammds');
            },
          },
          {
            id: 'stopBack',
            text: '停止后台服务',
            action: async () => {
              await stopCommand('ammds');
            },
          },
          {
            id: 'aboutTauri',
            text: '关于 Tauri',
            action: async () => {
              await openAboutView();
            },
          },
          {
            id: 'about',
            text: '关于',
            action: async () => {
              await createInfoDialog('这是一个基于 Tauri 的应用', {
                title: '关于',
                kind: 'info',
                okLabel: '确定',
              });
            },
          },
        ],
      },
      {
        id: 'close',
        text: '关闭窗口',
        action: async () => {
          await closeAllWindows();
        },
      },
    ],
  });
  const mainWindow = await getWindow(MAIN_WINDOW_ID);
  await menu.setAsWindowMenu(mainWindow);
}

export async function setupMenu() {
  const isInitialized = await getStoreValue<boolean>(MAIN_WINDOW_INIT);
  console.log('[Tauri][主窗口菜单] 初始化', isInitialized);
  if (isInitialized) return;

  const mainWebviewWindow = await getWindow(MAIN_WINDOW_ID);
  if (!mainWebviewWindow) {
    throw new Error('[系统] 初始化异常');
  }

  await flushMenu();
  console.log('[Tauri][主窗口菜单] 初始化完成');
}
