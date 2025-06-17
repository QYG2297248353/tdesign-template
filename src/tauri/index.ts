// src/tauri/index.ts
import { setupMenu } from './menu';

export async function setupTauri() {
  await setupMenu();
}
