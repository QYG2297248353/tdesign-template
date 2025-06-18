export function showCopyWarning() {
  document.addEventListener('copy', () => {
    console.warn('%c警告：请勿粘贴来源不明的代码到控制台，可能导致账号被盗！', 'color:#f44336; font-size:14px;');
  });
}
