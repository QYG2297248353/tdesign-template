<template>
  <div :class="prefix + '-footer'">Copyright © 2023-{{ new Date().getFullYear() }} 新疆萌森软件开发工作室</div>
</template>

<script setup lang="ts">
import { prefix } from '@/config/global';
</script>

<style lang="less" scoped>
.@{starter-prefix}-footer {
  color: var(--td-text-color-placeholder);
  line-height: 20px;
  text-align: center;
}
</style>
