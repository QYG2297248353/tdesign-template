export function printAsciiBanner(lines: string[]) {
  for (const line of lines) {
    console.log(`%c${line}`, 'color: #4caf50; font-family: monospace;');
  }
}
