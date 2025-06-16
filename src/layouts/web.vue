<!-- 前台页面布局 -->
<template>
  <t-layout key="no-side">
    <t-header><layout-header /> </t-header>
    <t-layout>
      <layout-content />
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import '@/style/layout.less';

import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import { prefix } from '@/config/global';
import { useTabsRouterStore } from '@/store';

import LayoutContent from './components/LayoutWebContent.vue';
import LayoutHeader from './components/LayoutWebHeader.vue';

const route = useRoute();
const tabsRouterStore = useTabsRouterStore();

const appendNewRoute = () => {
  const {
    path,
    query,
    meta: { title },
    name,
  } = route;
  tabsRouterStore.appendTabRouterList({ path, query, title: title as string, name, isAlive: true, meta: route.meta });
};

onMounted(() => {
  appendNewRoute();
});

watch(
  () => route.path,
  () => {
    appendNewRoute();
    document.querySelector(`.${prefix}-layout`).scrollTo({ top: 0, behavior: 'smooth' });
  },
);
</script>

<style lang="less" scoped></style>
