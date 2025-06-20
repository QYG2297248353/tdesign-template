import { mergeConfig } from 'vite';

import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    watch: {
      ignored: ['**/src-tauri/**'],
    },
    server: {
      open: false,
      host: '127.0.0.1',
      port: 9586,
      fs: {
        strict: true,
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
        '/swagger': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
        },
      },
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
  },
  baseConfig,
);
