export function detectDevtools() {
  const threshold = 160;
  setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
      console.warn('%c警告：开发者工具已开启，请勿粘贴可疑代码！', 'color:red; font-weight:bold;');
    }
  }, 1000);
}
