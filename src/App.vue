<template>
  <t-config-provider :global-config="getComponentsLocale">
    <router-view :key="locale" :class="[mode]" />
  </t-config-provider>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useLocale } from '@/locales/useLocale';
import { useSettingStore } from '@/store';

import { initSpoiler } from './directive/spoiler';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});

const { getComponentsLocale, locale } = useLocale();

onMounted(() => {
  const checkImages = () => {
    document.querySelectorAll('img:not([data-spoiler-initialized])').forEach((img) => {
      if (img instanceof HTMLImageElement && img.complete) {
        initSpoiler(img as HTMLImageElement);
      } else {
        img.addEventListener('load', () => initSpoiler(img as HTMLImageElement));
      }
    });
  };

  checkImages();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          checkImages();
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributeFilter: ['src', 'data-src'],
  });
});
</script>
<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
