import { useSpoilerStore } from '@/store';

// class no-spoiler 剧透效果
const skipContainerClasses = ['t-avatar'];
export const initSpoiler = (img: HTMLImageElement) => {
  // 跳过指定容器 no-spoiler
  if (img.classList.contains('no-spoiler')) return;
  // 跳过父类指定名单
  if (skipContainerClasses.some((className) => img.parentElement?.classList.contains(className))) {
    return;
  }
  // 跳过父类的父类指定名单
  if (skipContainerClasses.some((className) => img.parentElement?.parentElement?.classList.contains(className))) {
    return;
  }
  // 跳过已初始化
  if (img.dataset.spoilerInitialized) return;

  // 创建包裹容器
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.display = 'inline-block';

  // 将图片移动到包裹容器内
  img.parentNode?.insertBefore(wrapper, img);
  wrapper.appendChild(img);

  // 创建精准遮罩
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
    zIndex: '666',
  });

  // 同步状态
  const updateOverlay = () => {
    overlay.style.opacity = useSpoilerStore().spoilerMode ? '1' : '0';
    overlay.style.pointerEvents = useSpoilerStore().spoilerMode ? 'auto' : 'none';
  };

  // 点击处理
  overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  });

  // 响应图片尺寸变化
  const ro = new ResizeObserver(() => {
    overlay.style.width = `${img.offsetWidth}px`;
    overlay.style.height = `${img.offsetHeight + 2}px`;
  });
  ro.observe(img);

  wrapper.appendChild(overlay);
  useSpoilerStore().$subscribe(updateOverlay);
  updateOverlay();

  img.dataset.spoilerInitialized = 'true';
};

export default {
  mounted(el: HTMLImageElement) {
    initSpoiler(el);
  },
  updated(el: HTMLImageElement) {
    initSpoiler(el);
  },
};
