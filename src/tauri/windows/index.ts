import { TauriEvent } from '@tauri-apps/api/event';

import { MAIN_WINDOW_ID } from '../constant';
import { closeAllWindows, exitAllWindows, getWindow } from './operation';

export async function setupWindows() {
  // 主窗口
  const mainWindow = await getWindow(MAIN_WINDOW_ID);
  if (!mainWindow) {
    throw new Error('主窗口不存在');
  }

  console.log('[Tauri][窗口] 初始化完成');

  mainWindow.listen(
    TauriEvent.WINDOW_CLOSE_REQUESTED,
    async ({ payload }: { event: string; payload: { exit: boolean } }) => {
      console.log('[Tauri][窗口] 关闭请求');
      if (payload?.exit) {
        await exitAllWindows();
        await mainWindow.destroy();
      } else {
        await closeAllWindows();
      }
    },
  );
}
