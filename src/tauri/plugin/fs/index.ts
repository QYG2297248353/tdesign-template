import {
  appDataDir,
  audioDir,
  desktopDir,
  dirname,
  documentDir,
  downloadDir,
  pictureDir,
  resolve,
  videoDir,
} from '@tauri-apps/api/path';
import {
  exists,
  ExistsOptions,
  mkdir,
  ReadFileOptions,
  readTextFile,
  remove,
  RemoveOptions,
  WriteFileOptions,
  writeTextFile,
} from '@tauri-apps/plugin-fs';
/**
 * 判断路径是否存在
 *
 * @param path 路径
 * @returns 是否存在
 */
export const existsPath = async (path: string | URL, options?: ExistsOptions): Promise<boolean> => {
  const result = await exists(path, options);
  return result;
};
/**
 * 写入文件
 *
 * @param path 路径
 * @param data 数据
 * @returns 是否成功
 */
export const writeFile = async (path: string, data: string, options?: WriteFileOptions): Promise<void> => {
  const dir = await dirname(path);
  await mkdir(dir, { recursive: true, baseDir: options.baseDir });
  const result = await writeTextFile(path, data, options);
  return result;
};

/**
 * 读取文件
 */
export const readFile = async (path: string, options?: ReadFileOptions): Promise<string> => {
  const result = await readTextFile(path, options);
  return result;
};

/**
 * 删除文件
 */
export const deleteFile = async (path: string, options?: RemoveOptions): Promise<void> => {
  const result = await remove(path, options);
  return result;
};

/**
 * 应用路径 - 应用数据目录
 *
 * @returns 应用数据目录路径
 */
export const getAppDataDir = async (): Promise<string> => {
  const result = await appDataDir();
  return result;
};

/**
 * 公共路径 - 桌面目录
 *
 * @returns 桌面目录路径
 */
export const getDesktopDir = async (): Promise<string> => {
  const result = await desktopDir();
  return result;
};

/**
 * 公共路径 - 下载目录
 *
 * @returns 下载目录路径
 */
export const getDownloadDir = async (): Promise<string> => {
  const result = await downloadDir();
  return result;
};

/**
 * 公共路径 - 文档目录
 *
 * @returns 文档目录路径
 */
export const getDocumentDir = async (): Promise<string> => {
  const result = await documentDir();
  return result;
};

/**
 * 公共路径 - 图片目录
 *
 * @returns 图片目录路径
 */
export const getPictureDir = async (): Promise<string> => {
  const result = await pictureDir();
  return result;
};

/**
 * 公共路径 - 视频目录
 *
 * @returns 视频目录路径
 */
export const getVideoDir = async (): Promise<string> => {
  const result = await videoDir();
  return result;
};

/**
 * 公共路径 - 音乐目录
 *
 * @returns 音乐目录路径
 */
export const getAudioDir = async (): Promise<string> => {
  const result = await audioDir();
  return result;
};

/**
 * 路径拼接
 *
 * @param paths 路径
 * @returns 拼接后的路径
 */
export const resolvePath = async (...paths: string[]): Promise<string> => {
  const result = await resolve(...paths);
  return result;
};
