export function printVersionInfo(version?: string, buildTime?: string, links?: { text: string; url: string }[]) {
  if (version) console.log(`%c版本: ${version}`, 'color:#03a9f4;');
  if (buildTime) console.log(`%c构建时间: ${buildTime}`, 'color:#03a9f4;');
  if (links && links.length) {
    for (const link of links) {
      console.log(`%c${link.text}: %c${link.url}`, 'color:#ff9800;', 'color:#2196f3; text-decoration:underline;');
    }
  }
}
