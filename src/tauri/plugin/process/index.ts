import { exit, relaunch } from '@tauri-apps/plugin-process';

import { exitCleanApp } from '../app/init';

/**
 * 强制退出
 */
export const exitApp = async () => {
  await exitCleanApp();
  await exit();
};

/**
 * 重启应用
 */
export const relaunchApp = async () => {
  await exitCleanApp();
  await relaunch();
};
