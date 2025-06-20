import router from '@/router';
import { isTauriEnv } from '@/tauri/core';
import { createYesNoDialog } from '@/tauri/plugin/dialog';
import { openLink } from '@/tauri/plugin/shell';

type TargetContext = '_self' | '_parent' | '_blank' | '_top';

const whitelist = ['lifebus.top', 'lifebus.fun'];

/**
 * 打开外部链接
 *
 * @param link 链接
 * @param opts 选项
 */
export const triggerLink = async (link: string, opts?: { target?: TargetContext; [key: string]: any }) => {
  const url = new URL(link);
  const isExternal = url.host !== window.location.host;
  const isWhitelisted = whitelist.some((site) => url.host.endsWith(site));
  // 进入中转页面
  if (isTauriEnv()) {
    if (isExternal && !isWhitelisted) {
      const isAllow = await createYesNoDialog(
        `您即将打开外部地址：\n${link}\n请注意：该地址可能包含敏感信息，我们建议您谨慎访问。`,
        {
          title: '您即将打开外部地址',
          kind: 'info',
          okLabel: '允许',
          cancelLabel: '拒绝',
        },
      );
      if (!isAllow) return;
    }
    openLink(link);
    return;
  }
  if (isExternal && !isWhitelisted) {
    const jumpUrl = router.resolve({
      name: 'Jump',
      query: { url: link },
    }).href;
    openWindow(jumpUrl, {
      target: opts?.target || '_blank',
    });
  } else {
    openWindow(link, {
      target: opts?.target || '_blank',
    });
  }
};

/**
 * 打开新窗口
 * @param url 链接
 * @param opts 选项
 * @returns 无
 */
export const openWindow = (url: string, opts?: { target?: TargetContext; [key: string]: any }) => {
  const { target = '_blank', ...others } = opts || {};
  if (isTauriEnv()) {
    openLink(url);
    return;
  }
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(','),
  );
};

export const isUrl = (url: string) => regexUrl.test(url);

// eslint-disable-next-line prefer-regex-literals
export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i',
);
