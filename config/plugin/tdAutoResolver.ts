/**
 * If you use the template method for development, you can use the unplugin-vue-components plugin to enable on-demand loading support.
 * 按需引入
 */
import AutoImport from 'unplugin-auto-import/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

export default function configTdAutoResolverPlugin() {
  const tdAutoResolverPlugin = AutoImport({
    resolvers: [
      TDesignResolver({
        library: 'vue-next',
      }),
    ],
  });
  return tdAutoResolverPlugin;
}
