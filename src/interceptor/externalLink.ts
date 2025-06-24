import router from '@/router';
import { openWindow } from '@/utils/link';

const whitelist = ['lifebus.top', 'lifebus.fun'];

/**
 * 监听 a 标签事件
 */
function interceptWindowOpen() {
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
