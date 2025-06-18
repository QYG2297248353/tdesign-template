import { download, upload } from '@tauri-apps/plugin-upload';

export interface ProgressPayload {
  progress: number;
  progressTotal: number;
  total: number;
  transferSpeed: number;
}

/**
 * 上传文件
 *
 * @param url 上传地址
 * @param filePath 文件路径
 * @param onProgress 上传进度回调
 * @param headers 可选头信息
 */
export async function uploadFile(
  url: string,
  filePath: string,
  progressHandler?: (progress: ProgressPayload) => void,
  headers?: Map<string, string>,
): Promise<string> {
  return upload(url, filePath, progressHandler, headers);
}

/**
 * 下载文件
 *
 * @param url 下载地址
 * @param filePath 文件路径
 * @param onProgress 下载进度回调
 * @param headers 可选头信息
 * @param body 可选请求体
 */
export async function downloadFile(
  url: string,
  filePath: string,
  progressHandler?: (progress: ProgressPayload) => void,
  headers?: Map<string, string>,
  body?: string,
): Promise<void> {
  return download(url, filePath, progressHandler, headers, body);
}
