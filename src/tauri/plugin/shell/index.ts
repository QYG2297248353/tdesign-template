import { Child, Command, open } from '@tauri-apps/plugin-shell';

import { APP_LAUNCH_PREFIX } from '@/tauri/constant';

import { deleteStoreValue, getStoreValue, hasStoreKey, saveStore, setStoreValue } from '../store';

/**
 * 打开链接
 * @param url 链接
 */
export const openLink = (url: string) => {
  open(url);
};

/**
 * 启动程序
 */
export const startCommand = async (name: string, path: string) => {
  try {
    const launchName = APP_LAUNCH_PREFIX + name;
    const isRunning = await hasStoreKey(launchName);
    if (isRunning) {
      console.log('❌ 程序已启动');
      return;
    }
    const command = Command.sidecar(path);
    command.on('close', (data) => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`);
      deleteStoreValue(launchName);
      saveStore();
    });
    command.on('error', (error) => console.error(`command error: "${error}"`));
    command.stdout.on('data', (line) => console.log(`command stdout: "${line}"`));
    command.stderr.on('data', (line) => console.log(`command stderr: "${line}"`));

    const childProcess = await command.spawn();
    console.log('✅ 程序已启动，PID:', childProcess.pid);
    await setStoreValue(launchName, childProcess.pid);
    await saveStore();
  } catch (err) {
    console.error('❌ 启动失败:', err);
  }
};

/**
 * 停止程序
 */
export const stopCommand = async (name: string) => {
  const launchName = APP_LAUNCH_PREFIX + name;
  const pid = await getStoreValue<number>(launchName);
  if (!pid) {
    console.log('❌ 程序未启动');
    return;
  }
  try {
    const childProcess = new Child(pid);
    childProcess.kill();
    console.log(`✅ 已终止进程 ${pid}`);
    await deleteStoreValue(launchName);
    await saveStore();
  } catch (err) {
    console.error(`❌ 终止失败:`, err);
  }
};

/**
 * 执行程序
 */
export const runCommand = async (path: string, args?: string | string[]) => {
  const command = Command.sidecar(path, args);
  const output = await command.execute();
  console.log(`✅ 已执行进程 code: ${output.code} signal: ${output.signal}`);
};
