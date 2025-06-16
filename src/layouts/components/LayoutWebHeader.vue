<template>
  <l-header
    :show-logo="true"
    :theme="settingStore.displayMode"
    layout="light"
    :is-fixed="true"
    :menu="headerMenu"
    :is-compact="true"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { usePermissionStore, useSettingStore } from '@/store';
import { MenuRoute } from '@/types/interface';

import LHeader from './WebHeader.vue';

const permissionStore = usePermissionStore();
const settingStore = useSettingStore();
const { webRouters: menuRouters } = storeToRefs(permissionStore);
const headerMenu = computed<MenuRoute[]>(() => {
  if (settingStore.layout === 'mix') {
    return menuRouters.value.map((menu) => ({
      ...menu,
      children: menu.children?.filter((item) => item.meta?.showInSidebar),
    }));
  }
  return menuRouters.value;
});
</script>
