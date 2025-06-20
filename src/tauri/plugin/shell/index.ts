import { Command, open } from '@tauri-apps/plugin-shell';

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
export const runCommand = async (path: string) => {
  const command = Command.sidecar(path);
  const output = await command.execute();
  console.log('output', output);
};
