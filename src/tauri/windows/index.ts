import { TauriEvent } from '@tauri-apps/api/event';

import { MAIN_WINDOW_ID, MAIN_WINDOW_INIT } from '../constant';
import { exitCleanApp } from '../plugin/app/init';
import { exitAllCommand } from '../plugin/shell';
import { getStoreValue } from '../plugin/store';
import { closeAllWindows, exitAllWindows, getWindow } from './operation';

export async function setupWindows() {
  const isInitialized = await getStoreValue<boolean>(MAIN_WINDOW_INIT);
  console.log('[Tauri][主窗口] 初始化', isInitialized);
  if (isInitialized) return;

  const mainWindow = await getWindow(MAIN_WINDOW_ID);
  if (!mainWindow) {
    throw new Error('[系统] 初始化异常');
  }

  console.log('[Tauri][主窗口] 初始化完成');

  mainWindow.listen(
    TauriEvent.WINDOW_CLOSE_REQUESTED,
    async ({ payload }: { event: string; payload: { exit: boolean } }) => {
      console.log(`[Tauri][主窗口] ${payload?.exit ? '退出' : '关闭'}请求`);
      if (payload?.exit) {
        // 退出其他窗口应用
        await exitAllWindows();
        // 更新主窗口初始化状态
        await exitCleanApp();
        // 退出子程序
        await exitAllCommand();
        // 退出主应用窗口
        const main = await getWindow(MAIN_WINDOW_ID);
        await main?.destroy();
      } else {
        // 关闭其他窗口应用
        await closeAllWindows();
      }
    },
  );
}
