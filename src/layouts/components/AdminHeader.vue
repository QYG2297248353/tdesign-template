<template>
  <div :class="layoutCls">
    <t-head-menu :class="menuCls" :theme="menuTheme" expand-type="popup" :value="active">
      <template #logo>
        <span v-if="showLogo" class="header-logo-container" @click="handleNav('/dashboard/base')">
          <logo-full class="t-logo" />
        </span>
        <div v-else class="header-operate-left">
          <t-tooltip
            placement="bottom"
            :content="!isSidebarCompact ? t('layout.header.foldMenu') : t('layout.header.unfoldMenu')"
          >
            <t-button theme="default" shape="square" variant="text" @click="changeCollapsed">
              <menu-fold-icon v-show="isSidebarCompact" name="view-list" />
              <menu-unfold-icon v-show="!isSidebarCompact" name="view-list" />
            </t-button>
          </t-tooltip>
          <search :layout="layout" />
        </div>
      </template>
      <template v-if="layout !== 'side'" #default>
        <menu-content class="header-menu" :nav-data="menu" />
      </template>
      <template #operations>
        <div class="operations-container">
          <!-- 搜索框 -->
          <search v-if="layout !== 'side'" :layout="layout" />

          <!-- 全局通知 -->
          <t-tooltip placement="bottom" :content="t('layout.header.notice')">
            <notice />
          </t-tooltip>

          <!-- 全屏 -->
          <t-tooltip
            v-if="!isTauri()"
            placement="bottom"
            :content="isFullscreen ? t('layout.header.exitFullscreen') : t('layout.header.fullscreen')"
          >
            <t-button theme="default" shape="square" variant="text" @click="toggleFullScreen">
              <t-icon v-show="!isFullscreen" name="fullscreen-2" />
              <t-icon v-show="isFullscreen" name="fullscreen-exit" />
            </t-button>
          </t-tooltip>
          <!-- 语言切换 -->
          <t-tooltip placement="bottom" :content="t('layout.header.lang')">
            <t-dropdown trigger="click">
              <t-button theme="default" shape="square" variant="text">
                <translate-icon />
              </t-button>
              <t-dropdown-menu>
                <t-dropdown-item
                  v-for="(lang, index) in langList"
                  :key="index"
                  :value="lang.value"
                  @click="(options) => changeLang(options.value as string)"
                  >{{ lang.content }}</t-dropdown-item
                ></t-dropdown-menu
              >
            </t-dropdown>
          </t-tooltip>
          <!-- 帮助 -->
          <t-tooltip placement="bottom" :content="t('layout.header.help')">
            <t-button theme="default" shape="square" variant="text" @click="navToHelper">
              <t-icon name="help-circle" />
            </t-button>
          </t-tooltip>
          <!-- 配置 -->
          <t-tooltip placement="bottom" :content="t('layout.header.setting')">
            <t-button theme="default" shape="square" variant="text" @click="toggleSettingPanel">
              <setting-icon />
            </t-button>
          </t-tooltip>
          <!-- 用户 -->
          <t-dropdown :min-column-width="120" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleNav('/home')">
                  <home-icon />{{ t('layout.header.toHome') }}
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" divider @click="toggleSpoilerMode">
                  <browse-icon v-if="!spoilerMode" />
                  <browse-off-icon v-else />
                  {{ !spoilerMode ? t('layout.header.openSpoilers') : t('layout.header.closeSpoilers') }}
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleLogout">
                  <poweroff-icon />{{ t('layout.header.signOut') }}
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button class="header-user-btn" theme="default" variant="text">
              <template #icon>
                <t-icon class="header-user-avatar" name="user-circle" />
              </template>
              <div class="header-user-account">{{ user.userInfo.name }}</div>
              <template #suffix><chevron-down-icon /></template>
            </t-button>
          </t-dropdown>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import {
  BrowseIcon,
  BrowseOffIcon,
  ChevronDownIcon,
  HomeIcon,
  MenuFoldIcon,
  MenuUnfoldIcon,
  PoweroffIcon,
  SettingIcon,
  TranslateIcon,
} from 'tdesign-icons-vue-next';
import type { PropType } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import LogoFull from '@/assets/assets-logo-full.svg?component';
import { prefix } from '@/config/global';
import { langList, t } from '@/locales';
import { useLocale } from '@/locales/useLocale';
import { getActive } from '@/router';
import { useSettingStore, useSpoilerStore, useUserStore } from '@/store';
import { isTauriEnv } from '@/tauri/core';
import type { MenuRoute, ModeType } from '@/types/interface';
import { triggerLink } from '@/utils/link';

import MenuContent from './MenuContent.vue';
import Notice from './Notice.vue';
import Search from './Search.vue';

const { theme, layout, showLogo, menu, isFixed, isCompact } = defineProps({
  theme: {
    type: String,
    default: 'light',
  },
  layout: {
    type: String,
    default: 'top',
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: (): MenuRoute[] => [],
  },
  isFixed: {
    type: Boolean,
    default: false,
  },
  isCompact: {
    type: Boolean,
    default: false,
  },
  maxLevel: {
    type: Number,
    default: 3,
  },
});

const router = useRouter();
const settingStore = useSettingStore();
const user = useUserStore();
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true,
  });
};

const isTauri = () => {
  return isTauriEnv();
};

const active = computed(() => getActive());

const layoutCls = computed(() => [`${prefix}-header-layout`]);

const menuCls = computed(() => {
  return [
    {
      [`${prefix}-header-menu`]: !isFixed,
      [`${prefix}-header-menu-fixed`]: isFixed,
      [`${prefix}-header-menu-fixed-side`]: layout === 'side' && isFixed,
      [`${prefix}-header-menu-fixed-side-compact`]: layout === 'side' && isFixed && isCompact,
    },
  ];
});
const menuTheme = computed(() => theme as ModeType);

// 切换语言
const { changeLocale } = useLocale();
const changeLang = (lang: string) => {
  changeLocale(lang);
};

// 当前侧边栏状态
const isSidebarCompact = computed(() => settingStore.isSidebarCompact);

// 切换侧边栏
const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !settingStore.isSidebarCompact,
  });
};

// 剧透
const spoilerStore = useSpoilerStore();
const spoilerMode = computed(() => {
  return spoilerStore.spoilerMode;
});
const toggleSpoilerMode = () => {
  spoilerStore.toggleSpoilerMode();
};

// 跳转
const handleNav = (url: string) => {
  router.push(url);
};

// 退出登录
const handleLogout = () => {
  router.push({
    path: '/login',
    query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) },
  });
};

// 跳转帮助
const navToHelper = () => {
  triggerLink('https://blog.lifebus.top');
};
</script>
<style lang="less" scoped>
.@{starter-prefix}-header {
  &-menu-fixed {
    position: fixed;
    top: 0;
    z-index: 1001;

    &-side {
      left: 232px;
      right: 0;
      z-index: 10;
      width: auto;
      transition: all 0.3s;

      &-compact {
        left: 64px;
      }
    }
  }

  &-logo-container {
    cursor: pointer;
    display: inline-flex;
  }
}

.header-menu {
  flex: 1 1 1;
  display: inline-flex;

  :deep(.t-menu__item) {
    min-width: unset;
  }
}

.operations-container {
  display: flex;
  align-items: center;

  .t-popup__reference {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-button {
    margin-left: var(--td-comp-margin-l);
  }
}

.header-operate-left {
  display: flex;
  align-items: normal;
  line-height: 0;
}

.header-logo-container {
  width: 184px;
  height: 26px;
  display: flex;
  margin-left: 24px;
  color: var(--td-text-color-primary);

  .t-logo {
    width: 100%;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.header-user-account {
  display: inline-flex;
  align-items: center;
  color: var(--td-text-color-primary);
}

:deep(.t-head-menu__inner) {
  border-bottom: 1px solid var(--td-component-stroke);
}

.t-menu--light {
  .header-user-account {
    color: var(--td-text-color-primary);
  }
}

.t-menu--dark {
  .t-head-menu__inner {
    border-bottom: 1px solid var(--td-gray-color-10);
  }

  .header-user-account {
    color: rgb(255 255 255 / 55%);
  }
}

.operations-dropdown-container-item {
  width: 100%;
  display: flex;
  align-items: center;

  :deep(.t-dropdown__item-text) {
    display: flex;
    align-items: center;
  }

  .t-icon {
    font-size: var(--td-comp-size-xxxs);
    margin-right: var(--td-comp-margin-s);
  }

  :deep(.t-dropdown__item) {
    width: 100%;
    margin-bottom: 0;
  }

  &:last-child {
    :deep(.t-dropdown__item) {
      margin-bottom: 8px;
    }
  }
}
</style>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.operations-dropdown-container-item {
  .t-dropdown__item-text {
    display: flex;
    align-items: center;
  }
}
</style>
