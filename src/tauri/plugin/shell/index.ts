import { Child, Command, open, SpawnOptions } from '@tauri-apps/plugin-shell';

import { APP_LAUNCH_PREFIX } from '@/tauri/constant';

import { deleteStoreValue, getStoreKeys, getStoreValue, hasStoreKey, saveStore, setStoreValue } from '../store';

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
  return startFullCommand(name, path);
};

/**
 * 启动程序
 */
export const startCommandWithArgs = async (name: string, path: string, args?: string | string[]) => {
  return startFullCommand(name, path, args);
};

/**
 * 启动程序
 */
export const startCommandWithOptions = async (name: string, path: string, options?: SpawnOptions) => {
  return startFullCommand(name, path, [], options);
};

/**
 * 启动程序
 */
export const startCommandWithEnvs = async (name: string, path: string, envs?: Record<string, string>) => {
  return startFullCommand(name, path, [], {
    env: envs,
  });
};

/**
 * 启动程序
 * @param name 程序名称
 * @param path 程序路径
 * @param args 程序参数
 * @param options 程序选项
 * @returns 运行结果
 */
export const startFullCommand = async (
  name: string,
  path: string,
  args?: string | string[],
  options?: SpawnOptions,
) => {
  try {
    const launchName = APP_LAUNCH_PREFIX + name;
    const isRunning = await hasStoreKey(launchName);
    if (isRunning) {
      console.log('❌ 程序已启动');
      return;
    }
    const command = Command.sidecar(path, args, options);
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
 * 退出所有子程序
 */
export const exitAllCommand = async () => {
  const launchKeys = await getStoreKeys(APP_LAUNCH_PREFIX);
  for (const key of launchKeys) {
    stopCommand(key);
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
