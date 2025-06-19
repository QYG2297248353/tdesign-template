import { ask, confirm, message } from '@tauri-apps/plugin-dialog';

export interface MessageDialogOptions {
  /** The title of the dialog. Defaults to the app name. */
  title?: string;
  /** The kind of the dialog. Defaults to `info`. */
  kind?: 'info' | 'warning' | 'error';
  /** The label of the confirm button. */
  okLabel?: string;
}

export interface ConfirmDialogOptions extends MessageDialogOptions {
  /** The label of the cancel button. */
  cancelLabel?: string;
}

/**
 * 创建 Yes/No 对话框
 *
 * @param {string} message 消息
 * @param {ConfirmDialogOptions | string} options 选项
 * @returns {Promise<boolean>} 是否确认
 */
export async function createYesNoDialog(message: string, options?: ConfirmDialogOptions | string): Promise<boolean> {
  const answer = await ask(message, options);
  return answer;
}

/**
 * 创建 Ok/Cancel 对话框
 *
 * @param {string} message 消息
 * @param {ConfirmDialogOptions | string} options 选项
 * @returns {Promise<boolean>} 是否确认
 */
export async function createOkCancelDialog(message: string, options?: ConfirmDialogOptions | string): Promise<boolean> {
  const answer = await confirm(message, options);
  return answer;
}

/**
 * 创建信息对话框
 *
 * @param {string} msg 消息
 * @param {MessageDialogOptions | string} options 选项
 * @returns {Promise<void>} 无
 */
export async function createInfoDialog(msg: string, options?: MessageDialogOptions | string): Promise<void> {
  await message(msg, options);
}
