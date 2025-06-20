import { getIdentifier, getName, getTauriVersion, getVersion } from '@tauri-apps/api/app';
import { isTauri } from '@tauri-apps/api/core';
/**
 * 是否为 Tauri 环境
 */
export function isTauriEnv(): boolean {
  return isTauri();
}

/**
 * 获取应用标识符
 */
export async function getAppIdentifier(): Promise<string> {
  return getIdentifier();
}

/**
 * 获取应用名称
 */
export async function getAppName(): Promise<string> {
  return getName();
}

/**
 * 获取 Tauri 版本
 */
export async function getTauriAppVersion(): Promise<string> {
  return getTauriVersion();
}

/**
 * 获取程序版本
 */
export async function getAppVersion(): Promise<string> {
  return getVersion();
}

export interface AppInfo {
  identifier: string;
  name: string;
  tauriVersion: string;
  version: string;

  // 动态属性
  [key: string]: any;
}

/**
 * 获取应用信息
 */
export async function getAppInfo(): Promise<AppInfo> {
  return {
    identifier: await getAppIdentifier(),
    name: await getAppName(),
    tauriVersion: await getTauriAppVersion(),
    version: await getAppVersion(),
  };
}
