<template>
  <div class="jump-container">
    <div class="jump-content">
      <logo-full-icon class="logo" />
      <h2 class="jump-title">即将离开当前应用</h2>
      <p class="jump-desc">
        你访问的网站可能包含未知的安全风险，如需继续访问，请手动复制链接访问，
        <br />并注意保护账号和隐私信息
      </p>
      <div class="jump-link">
        <input :value="url" class="link-input" readonly type="text" />
      </div>
      <t-button class="jump-button" @click="openLink(url)">继续前往</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import LogoFullIcon from '@/assets/assets-logo-full.svg?component';
import { isUrl, openWindow } from '@/utils/link';

const route = useRoute();
const router = useRouter();

const url = ref(route.query.url as string);

if (!url.value) {
  router.back();
}

const openLink = (url: string) => {
  if (isUrl(url)) {
    openWindow(url, {
      target: '_self',
    });
  }
};
</script>

<style lang="less" scoped>
.jump-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.jump-content {
  background: white;
  padding: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 90%;

  .logo {
    width: 220px;
    height: var(--td-comp-size-s);
    margin: 12px 0;
  }
}

.jump-image {
  width: 180px;
  margin-bottom: 24px;
}

.jump-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #333;
}

.jump-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 24px;
}

.jump-link {
  margin-bottom: 24px;

  .link-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #f9f9f9;
    color: #666;
    font-size: 14px;
    text-align: center;
    outline: none;

    &:focus {
      border-color: #ddd;
    }
  }
}

.jump-button {
  display: inline-block;
  padding: 0 24px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
}
</style>
