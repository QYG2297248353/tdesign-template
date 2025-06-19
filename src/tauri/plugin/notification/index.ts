import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

/**
 * 是否有权限发起通知
 *
 * @returns {Promise<boolean>} 是否有权限发起通知
 */
export async function isNotificationPermissionGranted(): Promise<boolean> {
  return isPermissionGranted();
}

/**
 * 请求通知权限
 *
 * @returns {Promise<boolean>} 是否请求成功
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const permission = await requestPermission();
  return permission === 'granted';
}

/**
 * 通知选项
 */
export interface NotificationOptions {
  title: string;
  body: string;
}

/**
 * 发送通知
 *
 * @param {NotificationOptions | string} options 通知选项或字符串
 * @returns {boolean} 是否发送成功
 */
export async function sendDesktopNotification(options: NotificationOptions | string): Promise<boolean> {
  try {
    if (await isNotificationPermissionGranted()) {
      sendNotification(options);
      return true;
    }
    if (await requestNotificationPermission()) {
      sendNotification(options);
      return true;
    }
    return false;
  } catch (error) {
    console.error('发送桌面通知失败:', error);
    return false;
  }
}
