import type { Router } from 'vue-router';

import { getCurrentLang, t } from '@/locales';

export default function setupMetaInfo(router: Router) {
  router.beforeEach((to, from, next) => {
    const title = import.meta.env.VITE_GLOB_APP_TITLE || 'TDesign 模板项目';

    let localeTitle = '';
    // 优先使用 i18n 翻译
    if (to.meta.locale) {
      localeTitle = `${t(to.meta.locale)} - ${title}`;
    } else if (to.meta.title) {
      // title可能是字符串或对象
      if (typeof to.meta.title === 'string') {
        localeTitle = `${to.meta.title} - ${title}`;
      } else {
        localeTitle = `${(to.meta.title as Record<string, string>)[getCurrentLang()] || '未知页面'} - ${title}`;
      }
    }

    // 兜底使用原始标题
    if (localeTitle) {
      document.title = localeTitle;
    } else {
      document.title = to.meta.title || title;
    }

    next();
  });
}
