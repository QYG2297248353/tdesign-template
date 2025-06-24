export function printImage(url: string, size = { width: 300, height: 100 }) {
  const style = [
    `font-size:1px;`,
    `padding:${size.height}px ${size.width}px;`,
    `background:url(${url}) no-repeat center;`,
    `background-size:contain;`,
  ].join('');
  console.log('%c ', style);
}
