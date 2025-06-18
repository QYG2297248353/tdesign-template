import { printAsciiBanner } from './modules/ascii-banner';
import { showCopyWarning } from './modules/copy-warning';
import { detectDevtools } from './modules/devtools-detector';
import { printImage } from './modules/image-logger';
import { printVersionInfo } from './modules/version-info';

export interface ConsoleFlairOptions {
  title?: string;
  subtitle?: string;
  asciiLogo?: string[];
  image?: string;
  imageSize?: { width: number; height: number };
  version?: string;
  buildTime?: string;
  links?: { text: string; url: string }[];
  enableCopyWarning?: boolean;
  enableDevToolsDetect?: boolean;
}

export class ConsoleFlair {
  private options: ConsoleFlairOptions;

  constructor(options: ConsoleFlairOptions = {}) {
    this.options = options;
  }

  public show(): void {
    const {
      title,
      subtitle,
      asciiLogo,
      image,
      imageSize,
      version,
      buildTime,
      links,
      enableCopyWarning,
      enableDevToolsDetect,
    } = this.options;

    if (title) console.log(`%c${title}`, 'color:#42b983; font-size: 20px; font-weight:bold;');
    if (subtitle) console.log(`%c${subtitle}`, 'color:#888; font-size: 14px;');
    if (asciiLogo) printAsciiBanner(asciiLogo);
    if (image) printImage(image, imageSize);
    if (version || buildTime || links) printVersionInfo(version, buildTime, links);
    if (enableCopyWarning) showCopyWarning();
    if (enableDevToolsDetect) detectDevtools();
  }
}

export default ConsoleFlair;
