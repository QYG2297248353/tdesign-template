import { WebviewOptions } from '@tauri-apps/api/webview';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { WindowOptions } from '@tauri-apps/api/window';

/**
 * 创建新窗口新视图
 *
 * @param label 窗口标签
 * @param options 窗口选项
 */
export async function createWebviewWindow(
  label: string,
  options?: Omit<WebviewOptions, 'x' | 'y' | 'width' | 'height'> & WindowOptions,
): Promise<WebviewWindow> {
  const webviewWindow = new WebviewWindow(label, options);
  return webviewWindow;
}

/**
 * 获取当前窗口视图
 */
export function getCurrentWebviewWindow(): WebviewWindow {
  const current = WebviewWindow.getCurrent();
  return current;
}

/**
 * 获取指定窗口视图
 *
 * @param label 窗口标签
 */
export async function getWebviewWindow(label: string): Promise<WebviewWindow | null> {
  const webviewWindow = await WebviewWindow.getByLabel(label);
  return webviewWindow;
}
