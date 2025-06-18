import { Webview } from '@tauri-apps/api/webview';
import { Window, WindowOptions } from '@tauri-apps/api/window';

import { MAIN_WINDOW_ID } from '../constant';

/**
 * 创建新窗口
 *
 * @param label 窗口标签
 * @param options 窗口选项
 * @returns 新窗口实例
 */
export async function createWindow(label: string, options: WindowOptions) {
  const window = new Window(label, options);
  return window;
}

/**
 * 获取当前窗口
 *
 * @returns 当前窗口实例
 */
export function getCurrentWindow() {
  return Window.getCurrent();
}

/**
 * 获取当前窗口的 Webview 实例
 *
 * @returns 当前窗口的 Webview 实例
 */
export function getCurrentWebview() {
  return Webview.getCurrent();
}

/**
 * 获取指定窗口的 Webview 实例
 *
 * @param label 窗口标签
 * @returns 指定窗口的 Webview 实例
 */
export function getWindowWebview(label: string) {
  return Webview.getByLabel(label);
}

/**
 * 获取指定窗口
 *
 * @param label 窗口标签
 * @returns 指定窗口实例
 */
export async function getWindow(label: string): Promise<Window> {
  const window = await Window.getByLabel(label);
  if (!window) {
    throw new Error(`窗口 ${label} 不存在`);
  }
  return window;
}

/**
 * 获取所有窗口
 *
 * @returns 所有窗口实例
 */
export function getWindows() {
  return Window.getAll();
}

/**
 * 关闭指定窗口
 *
 * @param label 窗口标签
 */
export async function closeWindow(label: string) {
  const window = await getWindow(label);
  if (window) {
    if (window.label === MAIN_WINDOW_ID) {
      await window.hide();
      return;
    }
    await window.close();
  }
}

/**
 * 关闭所有窗口
 *
 * 关闭所有窗口，最后隐藏主窗口
 */
export async function closeAllWindows() {
  await closeOtherWindows();
  const mainWindow = await getWindow(MAIN_WINDOW_ID);
  await mainWindow.hide();
}

/**
 * 退出所有窗口
 *
 * 退出所有窗口，最后关闭主窗口
 */
export async function exitAllWindows() {
  await closeOtherWindows();
  const mainWindow = await getWindow(MAIN_WINDOW_ID);
  await mainWindow.close();
}

/**
 * 关闭其他窗口
 *
 * 关闭所有非主窗口
 */
export async function closeOtherWindows() {
  const windows = await getWindows();
  windows.forEach(async (window) => {
    if (window.label !== MAIN_WINDOW_ID) {
      await window.close();
    }
  });
}

/**
 * 最小化所有窗口
 */
export async function minimizeAllWindows() {
  const windows = await getWindows();
  windows.forEach((window) => {
    window.minimize();
  });
}

/**
 * 最大化所有窗口
 */
export async function maximizeAllWindows() {
  const windows = await getWindows();
  windows.forEach((window) => {
    window.maximize();
  });
}

/**
 * 显示指定窗口
 *
 * @param label 窗口标签
 */
export async function showWindow(label: string) {
  const window = await getWindow(label);
  if (window) {
    window.show();
  }
}

/**
 * 隐藏指定窗口
 *
 * @param label 窗口标签
 */
export async function hideWindow(label: string) {
  const window = await getWindow(label);
  if (window) {
    window.hide();
  }
}
