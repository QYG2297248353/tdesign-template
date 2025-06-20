import router from '@/router';
import { isTauriEnv } from '@/tauri/core';
import { createYesNoDialog } from '@/tauri/plugin/dialog';
import { openLink } from '@/tauri/plugin/shell';
import { openWindow } from '@/utils/link';

const whitelist = ['lifebus.top', 'lifebus.fun'];

/**
 * 监听 a 标签事件
 */
function interceptWindowOpen() {
  console.log('[Tauri][外链拦截] 初始化');
  document.addEventListener(
    'click',
    async (e) => {
      // 只处理左键点击、没有 modifier keys
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // 找到最近的 <a>
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;

      const href = a.getAttribute('href');
      const target = a.getAttribute('target');
      if (!href || target !== '_blank') return;

      // 只拦截外链
      if (!/^https?:\/\//.test(href)) return;

      // 拦截原生跳转
      e.preventDefault();
      e.stopImmediatePropagation();

      const url = new URL(href);
      const isExternal = url.host !== window.location.host;
      const isWhitelisted = whitelist.some((site) => url.host.endsWith(site));
      // 进入中转页面
      if (isTauriEnv()) {
        if (isExternal && !isWhitelisted) {
          const isAllow = await createYesNoDialog(
            `您即将打开外部地址：\n${href}\n请注意：该地址可能包含敏感信息，我们建议您谨慎访问。`,
            {
              title: '您即将打开外部地址',
              kind: 'info',
              okLabel: '允许',
              cancelLabel: '拒绝',
            },
          );
          if (!isAllow) return;
        }
        openLink(href);
        return;
      }
      if (isExternal && !isWhitelisted) {
        const jumpUrl = router.resolve({
          name: 'Jump',
          query: { url: href },
        }).href;
        openWindow(jumpUrl, {
          target: '_blank',
        });
      } else {
        openWindow(href, {
          target: '_blank',
        });
      }
    },
    // capture 阶段拦截，确保拿到最原始的事件
    { capture: true },
  );
}

export default interceptWindowOpen;
