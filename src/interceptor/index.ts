import { App } from 'vue';

import interceptWindowOpen from './externalLink';

export default {
  install(_Vue: App) {
    interceptWindowOpen();
  },
};
