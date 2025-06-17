import { App } from 'vue';

import permission from './permission';
import safeHtml from './safe-html';
import spoiler from './spoiler';

export default {
  install(Vue: App) {
    Vue.directive('permission', permission);
    Vue.directive('safe-html', safeHtml);
    Vue.directive('spoiler', spoiler);
  },
};
