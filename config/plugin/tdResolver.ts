/**
 * If you use the template method for development, you can use the unplugin-vue-components plugin to enable on-demand loading support.
 * 按需引入
 */
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default function configTdResolverPlugin() {
  const tdResolverPlugin = Components({
    resolvers: [
      TDesignResolver({
        library: 'vue-next',
      }),
    ],
  });
  return tdResolverPlugin;
}
