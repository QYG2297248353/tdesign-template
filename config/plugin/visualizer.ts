/**
 * Generation packaging analysis
 * 生成打包分析
 */
import visualizer from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';

import { isReportMode } from '../utils';

export default function configVisualizerPlugin(): Plugin[] | Plugin {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
}
