import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { LAUNCH_INFO_PATH, MAIN_WINDOW_INIT } from '@/tauri/constant';
import { getAppInfo } from '@/tauri/core';

import { deleteFile, existsPath, writeFile } from '../fs';
import { saveStore, setStoreValue } from '../store';

/**
 * 初始检查
 */
export const initialCheck = async () => {
  const exists = await existsPath(LAUNCH_INFO_PATH, {
    baseDir: BaseDirectory.AppData,
  });
  if (exists) {
    await exitCleanApp();
  }
};

/**
 * 启动应用
 */
export const launchApp = async () => {
  const info = await getAppInfo();
  info.launchTime = new Date().getTime();
  await writeFile(LAUNCH_INFO_PATH, JSON.stringify(info), {
    baseDir: BaseDirectory.AppData,
  });

  await setStoreValue(MAIN_WINDOW_INIT, true);
  await saveStore();
};

/**
 * 退出清理应用
 */
export const exitCleanApp = async () => {
  await deleteFile(LAUNCH_INFO_PATH, {
    baseDir: BaseDirectory.AppData,
  });

  await setStoreValue(MAIN_WINDOW_INIT, false);
  await saveStore();
  // 等待5s
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
};
