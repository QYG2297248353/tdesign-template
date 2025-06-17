import { Menu } from '@tauri-apps/api/menu';

export async function setupMenu() {
  const menu = await Menu.new({
    items: [
      {
        id: 'quit',
        text: '退出应用',
        action: () => window.close(),
      },
    ],
  });

  await menu.setAsAppMenu();
  console.log('Tauri 菜单初始化完成');
}
