import { mergeConfig } from 'vite';

import configCompressPlugin from './plugin/compress';
import configImageminPlugin from './plugin/imagemin';
import configTdAutoResolverPlugin from './plugin/tdAutoResolver';
import configTdResolverPlugin from './plugin/tdResolver';
import configVisualizerPlugin from './plugin/visualizer';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configTdResolverPlugin(),
      configTdAutoResolverPlugin(),
      configImageminPlugin(),
    ],
    build: {
      target: process.env.TAURI_ENV_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
      minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
      sourcemap: !!process.env.TAURI_ENV_DEBUG,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig,
);
