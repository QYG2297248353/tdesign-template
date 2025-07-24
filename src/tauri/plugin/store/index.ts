import { Store } from '@tauri-apps/plugin-store';

/**
 * 获取存储
 */
export async function getStore(): Promise<Store> {
  let store = await Store.get('store.json');
  if (!store) {
    store = await Store.load('store.json');
  }
  return store;
}

/**
 * 设置存储
 */
export async function setStoreValue<T>(key: string, value: T) {
  const store = await getStore();
  await store.set(key, value);
}

/**
 * 获取存储值
 */
export async function getStoreValue<T>(key: string): Promise<T | undefined> {
  const store = await getStore();
  return store.get(key);
}

/**
 * 获取指定前缀的所有 key
 */
export async function getStoreKeys(prefix: string): Promise<string[]> {
  const store = await getStore();
  const keys = await store.keys();
  return keys.filter((key) => key.startsWith(prefix));
}

/**
 * 保存存储
 */
export async function saveStore() {
  const store = await getStore();
  await store.save();
}

/**
 * 存储 key 是否存在
 */
export async function hasStoreKey(key: string): Promise<boolean> {
  const store = await getStore();
  return store.has(key);
}

/**
 * 删除存储值
 */
export async function deleteStoreValue(key: string): Promise<boolean> {
  const store = await getStore();
  return store.delete(key);
}

/**
 * 清空存储
 */
export async function clearStore() {
  const store = await getStore();
  return store.clear();
}
