import { MAIN_WINDOW_ID, MAIN_WINDOW_INIT } from '../constant';
import { getStoreValue } from '../plugin/store';
import { getWebviewWindow } from './operation';

export async function setupWebview() {
  const isInitialized = await getStoreValue<boolean>(MAIN_WINDOW_INIT);
  console.log('[Tauri][主窗口菜单] 初始化', isInitialized);
  if (isInitialized) return;

  const mainWebviewWindow = await getWebviewWindow(MAIN_WINDOW_ID);
  if (!mainWebviewWindow) {
    throw new Error('[系统] 初始化异常');
  }

  console.log('[Tauri][主窗口视图] 初始化完成');
}
