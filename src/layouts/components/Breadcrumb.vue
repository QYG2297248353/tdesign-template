<template>
  <t-breadcrumb :max-item-width="'150'" class="tdesign-breadcrumb">
    <t-breadcrumbItem v-for="item in crumbs" :key="item.to" :to="item.to">
      {{ item.title }}
    </t-breadcrumbItem>
  </t-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useLocale } from '@/locales/useLocale';
import { RouteMeta } from '@/types/interface';

const { locale } = useLocale();
const route = useRoute();

const crumbs = computed(() => {
  return route.matched
    .filter((record) => !(record.meta as RouteMeta)?.hiddenBreadcrumb)
    .map((record, index, arr) => {
      const meta = record.meta as RouteMeta;

      let title = record.path;
      if (meta?.title) {
        title =
          typeof meta.title === 'string'
            ? meta.title
            : meta.title[locale.value] || record.name?.toString() || record.path;
      }

      const to = arr
        .slice(0, index + 1)
        .map((r) => r.path.replace(/^\//, ''))
        .filter(Boolean)
        .join('/');

      return {
        path: record.path,
        to: `/${to}`,
        title,
      };
    });
});
</script>
<style scoped>
.tdesign-breadcrumb {
  margin-bottom: 24px;
}
</style>
