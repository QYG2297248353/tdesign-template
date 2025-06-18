import { restoreStateCurrent, saveWindowState, StateFlags } from '@tauri-apps/plugin-window-state';

/**
 * 恢复窗口状态
 */
export async function restoreCurrentWindowState() {
  await restoreStateCurrent(StateFlags.ALL);
}

/**
 * 保存窗口状态
 */
export async function saveCurrentWindowState() {
  saveWindowState(StateFlags.ALL);
}
