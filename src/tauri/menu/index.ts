import { Menu } from '@tauri-apps/api/menu';

import { closeAllWindows } from '../windows/operation';

export async function setupMenu() {
  const menu = await Menu.new({
    items: [
      {
        id: 'app',
        text: '应用',
        items: [
          {
            id: 'about',
            text: '关于',
          },
        ],
      },
      {
        id: 'close',
        text: '关闭窗口',
        action: async () => {
          await closeAllWindows();
        },
      },
    ],
  });

  await menu.setAsAppMenu();
  console.log('[Tauri][菜单] 初始化完成');
}
