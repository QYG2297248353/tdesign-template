import { open } from '@tauri-apps/plugin-shell';

/**
 * 打开链接
 * @param url 链接
 */
export const openLink = (url: string) => {
  open(url);
};
