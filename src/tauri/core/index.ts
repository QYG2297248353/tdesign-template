import { isTauri } from '@tauri-apps/api/core';

/**
 * 是否为 Tauri 环境
 */
export function isTauriEnv(): boolean {
  return isTauri();
}
