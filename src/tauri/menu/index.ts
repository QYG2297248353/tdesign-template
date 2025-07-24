import { TauriEvent } from '@tauri-apps/api/event';
import { Menu } from '@tauri-apps/api/menu';

import { MAIN_WINDOW_ID, MAIN_WINDOW_INIT } from '../constant';
import { createInfoDialog } from '../plugin/dialog';
import {
  getAppDataDir,
  getAudioDir,
  getDesktopDir,
  getDocumentDir,
  getDownloadDir,
  getPictureDir,
  getVideoDir,
  resolvePath,
} from '../plugin/fs';
import { sendDesktopNotification } from '../plugin/notification';
import { startCommandWithEnvs, stopCommand } from '../plugin/shell';
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
              const appDataDir = await getAppDataDir();
              const logPath = await resolvePath(appDataDir, 'logs');
              await startCommandWithEnvs('ammds', 'binaries/ammds', {
                AMMDS_LOG_PATH: logPath,
              });
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
            id: 'getDir',
            text: '获取目录',
            action: async () => {
              const appDataDir = await getAppDataDir();
              console.log('📁 应用数据目录', appDataDir);
              const desktopDir = await getDesktopDir();
              console.log('📁 桌面目录', desktopDir);
              const downloadDir = await getDownloadDir();
              console.log('📁 下载目录', downloadDir);
              const documentDir = await getDocumentDir();
              console.log('📁 文档目录', documentDir);
              const pictureDir = await getPictureDir();
              console.log('📁 图片目录', pictureDir);
              const videoDir = await getVideoDir();
              console.log('📁 视频目录', videoDir);
              const audioDir = await getAudioDir();
              console.log('📁 音乐目录', audioDir);
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
