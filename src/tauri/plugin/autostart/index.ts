import { disable, enable, isEnabled } from '@tauri-apps/plugin-autostart';

/**
 * 开机启动
 */
export async function setAutostart(enableAutostart: boolean): Promise<void> {
  if (enableAutostart) {
    await enable();
  } else {
    await disable();
  }
}

/**
 * 获取开机启动状态
 */
export async function getAutostart(): Promise<boolean> {
  return isEnabled();
}

/**
 * 切换开机启动状态
 */
export async function toggleAutostart(): Promise<void> {
  const autostart = await getAutostart();
  await setAutostart(!autostart);
}
